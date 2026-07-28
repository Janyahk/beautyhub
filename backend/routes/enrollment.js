import express from "express";
import {
  enrollCourse,
  getEnrollments,
  getMyEnrollments
} from "../Controllers/enrollmentController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { updatePaymentStatus } from "../Controllers/enrollmentController.js";

const router = express.Router();

// Enroll student in course
router.post("/enrollments",protect,authorizeRoles("student"), enrollCourse);

// Get all enrollments (with user + course)
router.get("/enrollments",protect,authorizeRoles("admin"), getEnrollments);
router.put("/enrollments/:id", protect,authorizeRoles("admin"), updatePaymentStatus);
// router.get("/enrollments/:id",protect,authorizeRoles("student"), getMyEnrollments);
// router.get("/my-courses", protect, authorizeRoles("student"), getMyCourses);
router.get("/my-enrollments", protect, authorizeRoles("student"), getMyEnrollments);
export default router; 
