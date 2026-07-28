import express from "express";
import {
  createService,
  getServices,
  updateService,
  deleteService,
  getServiceById
} from "../controllers/serviceController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();
//public
router.get("/services",getServices);
router.get("/services/:id",protect, getServiceById);

router.post("/services",protect,authorizeRoles("admin"),createService);

router.put("/services/:id",protect,authorizeRoles("admin"),updateService);
router.delete("/services/:id",protect,authorizeRoles("admin"),deleteService);
export default router;