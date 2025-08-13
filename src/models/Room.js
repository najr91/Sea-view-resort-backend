import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  photos: [{ type: String }]
});

export default mongoose.model("Room", roomSchema);
