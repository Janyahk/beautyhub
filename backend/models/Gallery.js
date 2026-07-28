import mongoose from "mongoose";   // ✅ ADD THIS

const gallerySchema = new mongoose.Schema({
  image_url: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Gallery", gallerySchema);