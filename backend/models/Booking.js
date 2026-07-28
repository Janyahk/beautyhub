import mongoose from "mongoose";   // ✅ ADD THIS

const bookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);