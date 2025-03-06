import { z } from "zod";

export const customerLogin = z.object({
  email: z.string().email('O e-mail deve ser válido'),
  password: z.string()
})