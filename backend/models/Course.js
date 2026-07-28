import mongoose from "mongoose";   

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
   url:String,
    filename:String,
  },
  description: String,
  duration: {
    type: String
  },
  fees: {
    type: Number,
    required: true
  },
  trainer: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);