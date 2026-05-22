import { menuFetch } from "@/config/axios";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  stockControlled: boolean;
}

export default async function updateProduct(
  id: number,
  data: Partial<Product>,
) {
  const response = menuFetch.put(`/product/update/${id}`, data);
  const res = await response;
  return res.data;
}
