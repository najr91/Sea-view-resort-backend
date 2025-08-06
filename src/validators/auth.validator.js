import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({ required_error: "Nombre de usuario es requerido" })
    .min(2)
    .max(10),

  email: z.string({ required_error }).email(
    {
      pattern:
        /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
    },
    { message: "Email Invalido" }
  ),

  password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(6, { message: "La contraseña debe contener al menos 6 caracteres." })
    .max(16, { message: "La contraseña debe contener menos de 16 caracteres" })
    .regex({ message: "Contraseña invalida" }),
});
