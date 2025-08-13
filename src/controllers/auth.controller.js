import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { createToken } from "../helpers/jwt.js";
import transport from "../helpers/mailer.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userMatch = await User.findOne({ email });

    if (userMatch)
      return res.status(400).json({ message: "El email ya esta en uso" });

    const passwordHash = await bcrypt.hash(password, 12);

    const role = email === "seaviewresort.noreply@gmail.com" ? "admin" : "user";

    const verificationToken = crypto.randomBytes(20).toString("hex");

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      verificationToken,
      role,
    });

    const savedUser = await newUser.save();

    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    await transport.sendMail({
      from: process.env.MAIL_FROM,
      to: savedUser.email,
      subject: "Verifica tu email - Sea View Resort",
      template: "verifyEmail",
      context: {
        username: savedUser.username,
        verificationLink,
      },
    });

    const token = await createToken({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      role: savedUser.role,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      isVerified: savedUser.isVerified,
      role: savedUser.role,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userMatch = await User.findOne({ email });
    if (!userMatch)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const passwordMatch = await bcrypt.compare(password, userMatch.password);

    if (!passwordMatch)
      return res.status(400).json({ message: "Credenciales invalidas" });

    if (
      userMatch.email === "seaviewresort.noreply@gmail.com" &&
      userMatch.role !== "admin"
    ) {
      userMatch.role = "admin";
      await userMatch.save();
    }

    const token = await createToken({
      id: userMatch._id,
      username: userMatch.username,
      email: userMatch.email,
      role: userMatch.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      id: userMatch._id,
      username: userMatch.username,
      email: userMatch.email,
      isVerified: userMatch.isVerified,
      role: userMatch.role,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
