import { asyncHandler } from "../utlis/asynchandler.js";
import { ApiError } from '../utlis/apierror.js';
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utlis/apiresponse.js";
import bcrypt from 'bcrypt';

// Function to generate access and refresh tokens for a user
const generateAccessTokenAndRefreshToken = async (userid) => {
  try {
    const user = await User.findById(userid);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    console.log("User found: ", user);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error in generating token: ", error);
    throw new ApiError(500, "Error in generating token");
  }
};

// Function to register a new user
const signupUser = asyncHandler(async (req, res) => {
  const { farmersName, farmersPhone, farmersEmail, password } = req.body;

  // Check if all fields are filled
  if ([farmersName, farmersPhone, farmersEmail, password].some((value) => value?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Validate email format
  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  if (!validateEmail(farmersEmail)) {
    throw new ApiError(400, "Enter a valid email");
  }

  // Check if user already exists
  const existedUser = await User.findOne({ $or: [{ farmersEmail }, { farmersPhone }] });

  if (existedUser) {
    throw new ApiError(409, "Email or phone number already exist");
  }

  // Create new user
  const newUser = await User.create({
    farmersName,
    farmersPhone,
    farmersEmail,
    password
  });

  // Use the newly created user directly
  const createdUser = newUser.toObject();
  delete createdUser.password;
  delete createdUser.refreshToken;

  if (!createdUser) {
    throw new ApiError(500, "User not created");
  }

  const responseUser = {
    ...createdUser
  };


  
  res.status(201).json(new ApiResponse(201, responseUser, "User created successfully", true));
});

const verifyPassword = async (inputPassword, storedPasswordHash) => {
  return await bcrypt.compare(inputPassword, storedPasswordHash);
};

// Function to log in a user
const loginuser = asyncHandler(async (req, res) => {
  const { farmersEmail, farmersPhone, password } = req.body;

  // Check if email/phone and Password are provided
  if ((!farmersEmail && !farmersPhone) || !password) {
    throw new ApiError(400, "Either Email or Phone Number and Password are required");
  }

  // ...existing code...
  const user = await User.findOne({
    $or: [{ farmersEmail }, { farmersPhone }]
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Validate user credentials
  // ...existing code...

  // ...existing code...
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  // ...existing code...

  // Log the entered password and the stored hashed password
  console.log('Entered Password:', password);
  console.log('Stored Hashed Password:', user.password);

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password");
  }

  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);
  const loggedinuser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { accessToken, user: loggedinuser }, "User logged in successfully", true));
});

// Function to log out a user
//logout means we are removing ie logging out the refresh token from the user and we are clearing the cookies

//we dont have database  and we are not taking anything from database access so we need to remember that we had refresh token in the cookies
const logoutUser = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new ApiError(400, "No refresh token found");
  }

  const user = await User.findOne({ refreshToken });

  if (!user) {
    throw new ApiError(400, "Invalid refresh token");
  }

  // Remove refresh token from user thats why we are setting it to null 

  user.refreshToken = null;
  await user.save({ validateBeforeSave: false });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  res.status(200).json(new ApiResponse(200, null, "User logged out successfully", true));
});

export { signupUser, loginuser, logoutUser };