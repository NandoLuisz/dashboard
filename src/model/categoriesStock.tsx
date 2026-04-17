import {
  Beef,
  Wheat,
  Milk,
  LeafyGreen,
  Droplets,
  CupSoda,
  IceCream,
  Package,
  Flame,
  SprayCan,
  Coffee,
  Banana,
} from "lucide-react"

export const categoriesStock = [
  { name: "Carnes", value: "meat", icon: <Beef />, textColorHover: "hover:text-red-800" },

  { name: "Pães", value: "bread", icon: <Wheat />, textColorHover: "hover:text-amber-700" },

  { name: "Laticínios", value: "dairy", icon: <Milk />, textColorHover: "hover:text-white" },

  {
    name: "Vegetais",
    value: "vegetable",
    icon: <LeafyGreen />,
    textColorHover: "hover:text-green-700",
  },

  { name: "Frutas", value: "fruit", icon: <Banana />, textColorHover: "hover:text-yellow-500" },

  {
    name: "Molhos e Condimentos",
    value: "sauces and condiments",
    icon: <Droplets />,
    textColorHover: "hover:text-red-300",
  },

  { name: "Bebidas", value: "drink", icon: <CupSoda />, textColorHover: "hover:text-blue-800" },

  {
    name: "Café e Sobremesas",
    value: "sweet",
    icon: <Coffee />,
    textColorHover: "hover:text-yellow-900",
  },

  {
    name: "Congelados",
    value: "frozen",
    icon: <IceCream />,
    textColorHover: "hover:text-lime-600",
  },

  {
    name: "Embalagens",
    value: "packaging",
    icon: <Package />,
    textColorHover: "hover:text-red-900",
  },

  {
    name: "Óleos e Fritura",
    value: "frying",
    icon: <Flame />,
    textColorHover: "hover:text-orange-400",
  },

  {
    name: "Limpeza",
    value: "cleaning",
    icon: <SprayCan />,
    textColorHover: "hover:text-purple-400",
  },
]
