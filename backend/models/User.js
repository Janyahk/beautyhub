import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["customer", "student", "admin", "trainer"],
    default: "customer"
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneno:{
     type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);