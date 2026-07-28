import express from "express";
import {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
  getMyBookings
} from "../Controllers/bookingController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Booking
router.post("/bookings",protect,authorizeRoles("customer", "student"),createBooking);

// Get All Bookings
router.get("/bookings",protect,authorizeRoles("admin","Trainer"), getBookings);

// Update Booking
router.put("/bookings/:id", protect,authorizeRoles("admin"),updateBooking);

// Delete Booking
router.delete("/bookings/:id", protect,authorizeRoles("student","admin"),deleteBooking);

router.get("/my-bookings", protect, authorizeRoles("student"), getMyBookings);
export default router;