import { registerUser, loginUser,getUsers,deleteUser,updateUserRole } from "../Controllers/userController.js";
import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();   // ✅ THIS LINE WAS MISSING

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, authorizeRoles("admin"), getUsers);
router.delete("/users/:id", protect, authorizeRoles("admin"), deleteUser);
router.put("/users/:id", protect, authorizeRoles("admin"), updateUserRole);
export default router;