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

router.get("/", getRooms);

router.post("/", createRoom);

router.put("/:id", updateRoom);

router.delete("/:id", deleteRoom);

router.post("/:id/images", upload.array("images", 10), addImages);

router.delete("/:id/images", deleteImage);

export default router;
