import { z } from "zod"

export const foodFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "O título deve ter no mínimo 5 caracteres")
    .max(20, "O título pode ter no máximo 20 caracteres"),

  description: z
    .string()
    .trim()
    .min(5, "A descrição deve ter pelo menos 5 caracteres")
    .max(40, "A descrição pode ter no máximo 40 caracteres"),

  image: z.string().url("Informe uma URL válida para a imagem"),

  price: z
  .number({ invalid_type_error: "O preço deve ser um número" })
  .min(0.01, "O preço deve ser de pelo menos 0,01")
  .max(10000, "O preço não pode exceder 10.000"),

  type: z.enum([
    "pizza",
    "hamburguer",
    "pastel",
    "batata",
    "hotDog",
    "bread",
    "Refrigerantes",
    "Sucos",
    "Vitaminas",
  ]),
})

export type FoodFormFields = z.infer<typeof foodFormSchema>