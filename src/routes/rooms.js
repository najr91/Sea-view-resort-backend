import express from "express";
import multer from "multer";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  addPhotos,
  deletePhoto,
} from "../controllers/roomController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/rooms"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});
const upload = multer({ storage });


router.get("/", getRooms);


router.post("/", protect, isAdmin, createRoom);
router.put("/:id", protect, isAdmin, updateRoom);
router.delete("/:id", protect, isAdmin, deleteRoom);


router.post(
  "/:id/photos",
  protect,
  isAdmin,
  upload.array("photos", 5), 
  addPhotos
);


router.delete("/:id/photos", protect, isAdmin, deletePhoto);

export default router;
