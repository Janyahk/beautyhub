import {
  addImage,
  getGallery,
  deleteImage
} from "../Controllers/gallery.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router(); 
router.get("/gallery", getGallery);

router.post("/gallery",protect,authorizeRoles("admin"), addImage);
router.delete("/gallery/:id", protect,authorizeRoles("admin"),deleteImage);

export default router;