import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { error: "A senha deve conter um mínimo de 8 caracteres" })
  .regex(/[0-9]/, { error: "A senha deve conter pelo menos um número" })
  .regex(/[^A-Za-a0-9]/, { error: "A senha deve conter pelo menos um caractere especial" })
  .regex(/[a-z]/, { error: "A senha deve conter pelo menos uma letra minúscula" })
  .regex(/[A-Z]/, { error: "A senha deve conter pelo menos uma letra maiúscula" });

export { passwordSchema };
