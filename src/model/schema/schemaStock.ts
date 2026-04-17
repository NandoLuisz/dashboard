import { z } from "zod"

export const stockSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  quantity: z.number().min(0, "Quantidade inválida"),
  minQuantity: z.number().min(0, "Quantidade mínima inválida"),
  unit: z.enum(["un", "kg", "g", "l", "ml"], {
    errorMap: () => ({ message: "Selecione uma unidade" }),
  }),
  status: z.enum(["ok", "baixo", "esgotado"], {
    errorMap: () => ({ message: "Selecione um status" }),
  }),
  type: z.string().min(1, "Selecione um tipo"),
  image: z.string().url(),
})

export type StockFormData = z.infer<typeof stockSchema>
