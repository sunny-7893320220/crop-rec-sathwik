import { asyncHandler } from "../utlis/asynchandler.js"; // Fixed typo in "utlis" to "utils"
import { ApiError } from "../utlis/apierror.js";
import { ApiResponse } from "../utlis/apiresponse.js";
import axios from "axios";
import CropRecommendation from "../models/crop.models.js";
import cropData from "../models/cropData.models.js";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "node:url";
import { dirname } from "node:path";



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to recommend a crop
const recommendCrop = asyncHandler(async (req, res) => {
  const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

  // Check if all fields are provided
  if ([N, P, K, temperature, humidity, ph, rainfall].some((value) => value == null || value === "")) {
    throw new ApiError(400, "All fields (N, P, K, temperature, humidity, pH, rainfall) are required");
  }

  // Convert inputs to numbers
  const numericInputs = {
    N: parseFloat(N),
    P: parseFloat(P),
    K: parseFloat(K),
    temperature: parseFloat(temperature),
    humidity: parseFloat(humidity),
    ph: parseFloat(ph),
    rainfall: parseFloat(rainfall),
  };

  // Validate numeric inputs
  if (Object.values(numericInputs).some((value) => isNaN(value))) {
    throw new ApiError(400, "All fields must be valid numbers");
  }

  // Basic range validation (adjust ranges as per your ML model or crop science)
  if (
    numericInputs.N < 0 || numericInputs.P < 0 || numericInputs.K < 0 ||
    numericInputs.temperature < -50 || numericInputs.temperature > 50 ||
    numericInputs.humidity < 0 || numericInputs.humidity > 100 ||
    numericInputs.ph < 0 || numericInputs.ph > 14 ||
    numericInputs.rainfall < 0
  ) {
    throw new ApiError(400, "Input values are out of realistic ranges");
  }

  try {
    // Send data to Python ML API
    const mlResponse = await axios.post("http://localhost:5000/predict", numericInputs);
    const crop = mlResponse.data?.crop;

    if (!crop) {
      throw new ApiError(500, "ML API did not return a valid crop prediction");
    }

    // Save the recommendation in MongoDB
    const recommendation = await CropRecommendation.create({
      userId: req.user._id, // Assumes auth middleware adds req.user
      inputs: numericInputs,
      crop,
    });

    const responseData = {
      crop,
      recommendationId: recommendation._id,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, responseData, "Crop recommended successfully", true));
  } catch (error) {
    console.error("Error in crop recommendation:", error);
    if (error.response) {
      throw new ApiError(500, `ML API error: ${error.response.data?.error || error.message}`);
    }
    throw new ApiError(500, "Failed to recommend crop", error);
  }
});

// Function to get user's crop recommendations
const getUserRecommendations = asyncHandler(async (req, res) => {
  const recommendations = await CropRecommendation.find({ userId: req.user._id })
    .populate("userId", "farmersName farmersEmail")
    .sort({ createdAt: -1 });

  if (!recommendations || recommendations.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, [], "No recommendations found for this user", false));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, recommendations, "User recommendations retrieved successfully", true));
});

// Function to seed the database
const seedDatabase = asyncHandler(async (req, res) => {
  try {
    // Clear existing data
    await cropData.deleteMany({});
    console.log("Existing crop data cleared");

    // Read and insert updated data
    const cropDataset = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/cropdata.json"), "utf8")
    );
    await cropData.insertMany(cropDataset.crops);

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Database re-seeded with updated crop data", true));
  } catch (error) {
    console.error("Error seeding database:", error);
    throw new ApiError(500, "Failed to seed database", error);
  }
});

// Function to get crop by name
const getCropByName = asyncHandler(async (req, res) => {
  const { name } = req.params;

  if (!name || name.trim() === "") {
    throw new ApiError(400, "Crop name is required");
  }

  try {
    const crop = await cropData.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (!crop) {
      throw new ApiError(404, "Crop not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, crop, "Crop details fetched successfully", true));
  } catch (error) {
    console.error("Error fetching crop:", error);
    throw new ApiError(error.statusCode || 500, error.message || "Server error");
  }
});

export { recommendCrop, getUserRecommendations, seedDatabase, getCropByName };