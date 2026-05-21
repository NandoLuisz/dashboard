import { z } from "zod";

export const stockSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.number().min(0, "Preço inválido"),
  category: z.string().min(1, "Selecione uma categoria"),
  image: z.string(),
  stock: z.number().min(0),
  stockControlled: z.boolean(),
});

export type StockFormData = z.infer<typeof stockSchema>;
