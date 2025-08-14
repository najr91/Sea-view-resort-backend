import express from "express";
import { getRooms, createRoom, updateRoom, deleteRoom } from "../controllers/roomController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getRooms); // pública
router.post("/", protect, createRoom); // protegida
router.put("/:id", protect, updateRoom); // protegida
router.delete("/:id", protect, deleteRoom); // protegida

export default router;
