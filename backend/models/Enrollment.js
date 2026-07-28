import mongoose from "mongoose";   // ✅ ADD THIS

const enrollmentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },paid: {
    type: Boolean,
    default: false, 
  },
}, { timestamps: true });

export default mongoose.model("Enrollment", enrollmentSchema);