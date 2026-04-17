export interface FoodResponse {
  id: number
  title: string
  image: string
  description: string
  price: number
  type: string
}

export interface FoodRequest {
  title: string
  image: string
  description: string
  price: number
  type: string
}

export const types = [
  "pizza",
  "hamburguer",
  "pastel",
  "batata",
  "hotDog",
  "bread",
  "Refrigerantes",
  "Sucos",
  "Vitaminas",
]
export const categories = [
  { value: "pizza", label: "Pizza" },
  { value: "hamburguer", label: "Hamburguer" },
  { value: "pastel", label: "Pastel" },
  { value: "batata", label: "Batata Frita" },
  { value: "hotDog", label: "Cachorro Quente" },
  { value: "bread", label: "Pão Árabe" },
  { value: "Refrigerantes", label: "Refrigerante" },
  { value: "Sucos", label: "Suco" },
  { value: "Vitaminas", label: "Vitamina" },
]
