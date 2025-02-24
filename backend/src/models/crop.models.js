import mongoose from "mongoose";

const cropRecommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  inputs: {
    N: Number,
    P: Number,
    K: Number,
    temperature: Number,
    humidity: Number,
    ph: Number,
    rainfall: Number,
  },
  crop: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("CropRecommendation", cropRecommendationSchema);