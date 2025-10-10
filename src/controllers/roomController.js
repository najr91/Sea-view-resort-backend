import Room from "../models/room.model.js";
import fs from "fs";
import path from "path";

// --- Obtener todas las habitaciones ---
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json({ datos: rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener habitaciones" });
  }
};

// --- Crear habitación ---
export const createRoom = async (req, res) => {
  try {
    const newRoom = new Room({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      images: req.body.images || [],
    });

    const savedRoom = await newRoom.save();
    res.status(201).json({ datos: savedRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear habitación" });
  }
};

// --- Actualizar habitación ---
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, images } = req.body;

    const room = await Room.findById(id);
    if (!room)
      return res.status(404).json({ message: "Habitación no encontrada" });

    room.name = name ?? room.name;
    room.price = price ?? room.price;
    room.description = description ?? room.description;
    if (images) room.images = images;

    await room.save();
    res.json({ datos: room });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la habitación" });
  }
};

// --- Eliminar habitación ---
export const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom)
      return res.status(404).json({ message: "Habitación no encontrada" });

    res.json({ datos: deletedRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar habitación" });
  }
};

// --- Subir imágenes desde computadora ---
export const addImages = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);
    if (!room)
      return res.status(404).json({ message: "Habitación no encontrada" });

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No se subió ninguna imagen" });
    }

    const newImages = req.files.map(
      (file) => `/uploads/rooms/${file.filename}`
    );
    room.images = [...(room.images || []), ...newImages];

    await room.save();
    res.json({ datos: room });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir imágenes" });
  }
};

// --- Eliminar imagen específica ---
export const deleteImage = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room)
      return res.status(404).json({ message: "Habitación no encontrada" });

    const { imageUrl } = req.body;
    room.images = room.images.filter((img) => img !== imageUrl);

    await room.save();
    res.json({ datos: room });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar imagen" });
  }
};
