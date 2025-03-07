import { z } from "zod";

export const supplierRegister = z.object({
  name: z.string().min(2, 'O nome precisa estar preenchido'),
  state: z.string().min(2, 'O estado precisa estar preenchido'),
  file: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
          "image/gif",
        ].includes(file.type),
      { message: "Invalid image file type" }
    ),
  costPerKwh: z.number().positive('O número precisa ser positivo'),
  minimumKwhLimit: z.number().positive('O número precisa ser positivo')
})