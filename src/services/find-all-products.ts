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

export default async function findAllProducts() {
  const response = menuFetch.get<Product[]>("/product/find-all");
  const res = await response;
  return res.data;
}
