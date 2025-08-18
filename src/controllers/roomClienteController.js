import mongoose from "mongoose";
import dayjs from "dayjs";
import Room from "../models/Room.js";

// Modelo de Reserva adaptado a Room
const reservaSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  checkIn: Date,
  checkOut: Date
});
const Reserva = mongoose.models.Reserva || mongoose.model("Reserva", reservaSchema);

// Obtener disponibilidad de una habitación
export const getRoomDisponibilidad = async (req, res) => {
  try {
    const { checkIn, checkOut } = req.query;
    const reservas = await Reserva.find({
      roomId: req.params.id,
      checkIn: { $lt: checkOut },
      checkOut: { $gt: checkIn }
    });
    res.json({ disponible: reservas.length === 0 });
  } catch (err) {
    res.status(500).json({ error: "Error al verificar disponibilidad" });
  }
};

// Crear una reserva
export const createReserva = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut } = req.body;

    if (dayjs(checkOut).isSameOrBefore(checkIn)) {
      return res.status(400).json({ error: "Fechas inválidas" });
    }

    const conflicto = await Reserva.findOne({
      roomId,
      checkIn: { $lt: checkOut },
      checkOut: { $gt: checkIn }
    });

    if (conflicto) {
      return res.status(400).json({ error: "La habitación no está disponible en esas fechas" });
    }

    const reserva = new Reserva({ roomId, checkIn, checkOut });
    await reserva.save();
    res.status(201).json(reserva);
  } catch (err) {
    res.status(500).json({ error: "Error al crear reserva" });
  }
};

// Listar reservas
export const getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate("roomId");
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener reservas" });
  }
};

// Actualizar reserva
export const updateReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reserva) return res.status(404).json({ error: "No encontrada" });
    res.json(reserva);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar reserva" });
  }
};

// Eliminar reserva
export const deleteReserva = async (req, res) => {
  try {
    await Reserva.findByIdAndDelete(req.params.id);
    res.json({ message: "Reserva eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar reserva" });
  }
};