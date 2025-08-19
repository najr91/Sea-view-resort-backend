import express from "express";
import { getAllUsers, updateUser, toggleUserActive, deleteUser } from "../controllers/adminUser.controllers.js";
import { protect, isAdmin } from "../auth/middleware.js";

const router = express.Router();


router.use(protect, isAdmin);

router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.patch("/:id/suspend", toggleUserActive);
router.delete("/:id", deleteUser);

export default router;
