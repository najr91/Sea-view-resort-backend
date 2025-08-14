import express from "express";
import { getRooms, createRoom, updateRoom, deleteRoom } from "../controllers/roomController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ruta pública: cualquiera puede ver habitaciones
router.get("/", getRooms);

// Rutas protegidas: solo admin
router.post("/", protect, isAdmin, createRoom);
router.put("/:id", protect, isAdmin, updateRoom);
router.delete("/:id", protect, isAdmin, deleteRoom);

export default router;
