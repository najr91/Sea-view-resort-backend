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
