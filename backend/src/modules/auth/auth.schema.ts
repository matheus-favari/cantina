import { z } from "zod";
import { CanteenSegment } from "../../generated/prisma/enums";
import { passwordSchema } from "../../shared/schemas/password.schema";

const registerSchema = z.object({
  canteenName: z
    .string()
    .min(3, { error: "O nome da cantina deve conter um mínimo de 3 caracteres" }),
  segment: z.enum(CanteenSegment, { error: "Segmento inválido" }),
  name: z.string().min(3, { error: "O nome do responsável deve conter um mínimo de 3 caracteres" }),
  email: z.email("Email inválido"),
  password: passwordSchema,
});

export { registerSchema };
export type RegisterDTO = z.infer<typeof registerSchema>;
