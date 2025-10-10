import express from "express";
import { upload } from "../middlewares/upload.js";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  addImages,
  deleteImage,
} from "../controllers/roomController.js";

const router = express.Router();

// --- Obtener todas las habitaciones ---
router.get("/", getRooms);

// --- Crear nueva habitación ---
router.post("/", createRoom);

// --- Actualizar habitación existente ---
router.put("/:id", updateRoom);

// --- Eliminar habitación ---
router.delete("/:id", deleteRoom);

// --- Subir imágenes de la computadora (hasta 10 archivos) ---
router.post("/:id/images", upload.array("images", 10), addImages);

// --- Eliminar imagen de habitación ---
router.delete("/:id/images", deleteImage);

export default router;
