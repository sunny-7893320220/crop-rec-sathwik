// models/Crop.js
import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
    name: String,
    scientificName: String,
    growthCycle: String,
    optimalConditions: {
      temperature: String,
      humidity: String,
      pH: String
    },
    yield: String,
    imageUrl: String,
    doughnutData: {
      datasets: [{
        data: [Number],
        backgroundColor: [String]
      }],
      labels: [String]
    }
  });

cropSchema.index({ name: 1 }); // Index for faster queries

export default mongoose.model('CropData', cropSchema);