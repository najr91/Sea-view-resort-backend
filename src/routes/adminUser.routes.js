import express from "express";
import { getAllUsers, updateUser, toggleUserActive, deleteUser } from "../controllers/adminUser.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = express.Router();


const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ message: "Acceso denegado: solo administradores" });
};


router.use(authRequired, isAdmin);

router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.patch("/:id/suspend", toggleUserActive);
router.delete("/:id", deleteUser);

export default router;
