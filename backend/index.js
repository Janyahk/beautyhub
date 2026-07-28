import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import userRoutes from "./routes/user.js";
import serviceRoutes from "./routes/service.js";
import bookingRoutes from "./routes/booking.js";
import courseRoutes from "./routes/course.js";
import enrollmentRoutes from "./routes/enrollment.js";
import galleryRoutes from "./routes/gallery.js";
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes Middleware
app.use("/api", userRoutes);
app.use("/api", serviceRoutes);
app.use("/api", bookingRoutes);
app.use("/api", courseRoutes);
app.use("/api", enrollmentRoutes);
app.use("/api", galleryRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Beauty Academy API is running...");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });