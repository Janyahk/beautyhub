import express from "express";
import {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse
} from "../Controllers/courseController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/courses",getCourses);

router.post("/courses",protect,authorizeRoles("admin","trainer"),createCourse);
router.put("/courses/:id",protect,authorizeRoles("admin","trainer"), updateCourse);
router.delete("/courses/:id",protect,authorizeRoles("admin","trainer"),deleteCourse); 

export default router;