import express from "express";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema } from "../validators/auth.validator.js";
import { register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", validateSchema(registerSchema), register);

export default router;
