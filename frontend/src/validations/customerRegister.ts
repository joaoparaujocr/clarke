import { z } from "zod";

export const customerRegister = z.object({
  firstName: z.string().min(2, 'O nome precisa estar preenchido'),
  lastName: z.string().min(2, 'O sobrenome precisa estar preenchido'),
  email: z.string().email('O e-mail deve ser válido'),
  password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres')
})