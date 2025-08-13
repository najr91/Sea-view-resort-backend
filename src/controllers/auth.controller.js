import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userMatch = await User.findOne({ email });

    if (userMatch)
      return res.status(400).json({ message: "El email ya esta en uso" });

    const passwordHash = await bcrypt.hash(password, 12);

    const verificationToken = crypto.randomBytes(20).toString("hex");

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      verificationToken,
    });

    const savedUser = await newUser.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
