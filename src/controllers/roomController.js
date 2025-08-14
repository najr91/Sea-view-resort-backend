import Room from "../models/Room.js";

// GET /rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /rooms
export const createRoom = async (req, res) => {
  try {
    const room = new Room({
      type: req.body.type,
      price: req.body.price,
      available: req.body.available ?? true,
      photos: [] // lo dejamos vacío por ahora
    });
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT 
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRoom = await Room.findByIdAndUpdate(id, req.body, {
      new: true, // Devuelve el documento actualizado
      runValidators: true // Valida el esquema
    });

    if (!updatedRoom) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }

    res.json(updatedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE 
export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRoom = await Room.findByIdAndDelete(id);

    if (!deletedRoom) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }

    res.json({ message: "Habitación eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
