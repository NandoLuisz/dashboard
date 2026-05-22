import { z } from "zod";

export const stockSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.number().min(1, "Preço inválido"),
  category: z.string().min(1, "Selecione uma categoria"),
  image: z.string().min(1, "Link da imagem é obrigatório"),
  stock: z.number().min(1, "Quantidade em estoque inválida"),
  stockControlled: z.boolean(),
});

export type StockFormData = z.infer<typeof stockSchema>;
