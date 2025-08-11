import { ZodError } from "zod";

export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    console.log("validando ok");
    return next();
  } catch (error) {
    console.log("validando errores");
    return res
      .status(400)
      .json({ error: error.errors.map((err) => err.message) });
  }
};
