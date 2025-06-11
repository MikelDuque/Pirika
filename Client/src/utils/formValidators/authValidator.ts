import { z } from "zod";
import fileSchema from "./fileValidator";

const emptyMessage = "This field is required.";
const passwordValidation = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64}$/);
const usernameValidation = new RegExp(/^(?=.*[a-zA-Z\d]).{1,24}$/);

export const loginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
  rememberMe: z.boolean().default(false)
});

export const registerSchema = z.object({
  rememberMe: z.boolean().default(false),
  displayName: z.string()
    .min(1, {message: emptyMessage})
    .max(24, {message: "El nombre es demasido largo"})
    .optional(),
  username: z.string()
    .min(1, {message: emptyMessage})
    .max(24, {message: "El nombre de usuario es demasido largo"})
    .regex(usernameValidation, {message: "El nombre de usuario no puede contener ciertos símbolos especiales"}),
  mail: z.string()
    .min(1, {message: emptyMessage})
    .max(50, {message: "El correo introducido es demasiado largo"})
    .email({message: "El formato introducido no es correcto"}),
  password: z.string()
    .min(8, {message: "La contraseña debe contener mínimo 8 caracteres"})
    .max(64, {message: "La contraseña debe contener máximo 64 caracteres"})
    .regex(passwordValidation, {message: "La contraseña debe contener al menos una mayúscula, un número y un carácter especial"}),
  confirmPassword: z.string(),
  avatar: fileSchema("image").optional()
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas introducidas no coinciden",
  path: ["confirmPassword"]
});