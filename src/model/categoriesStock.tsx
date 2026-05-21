import {
  Beef,
  Wheat,
  Milk,
  LeafyGreen,
  Droplets,
  CupSoda,
  IceCream,
  Package,
  SprayCan,
  Coffee,
  Banana,
  Hamburger,
} from "lucide-react";

export const categoriesStock = [
  {
    name: "Carnes",
    value: "MEAT",
    icon: <Beef />,
    textColorHover: "hover:text-red-800",
  },

  {
    name: "Pães",
    value: "BREAD",
    icon: <Wheat />,
    textColorHover: "hover:text-amber-700",
  },

  {
    name: "Laticínios",
    value: "DAIRY",
    icon: <Milk />,
    textColorHover: "hover:text-white",
  },

  {
    name: "Vegetais",
    value: "VEGETABLE",
    icon: <LeafyGreen />,
    textColorHover: "hover:text-green-700",
  },

  {
    name: "Frutas",
    value: "FRUIT",
    icon: <Banana />,
    textColorHover: "hover:text-yellow-500",
  },

  {
    name: "Molhos e Condimentos",
    value: "SAUCES_AND_CONDIMENTS",
    icon: <Droplets />,
    textColorHover: "hover:text-red-300",
  },

  {
    name: "Bebidas",
    value: "DRINK",
    icon: <CupSoda />,
    textColorHover: "hover:text-blue-800",
  },

  {
    name: "Café e Sobremesas",
    value: "SWEET",
    icon: <Coffee />,
    textColorHover: "hover:text-yellow-900",
  },

  {
    name: "Congelados",
    value: "FROZEN",
    icon: <IceCream />,
    textColorHover: "hover:text-lime-600",
  },

  {
    name: "Embalagens",
    value: "PACKAGING",
    icon: <Package />,
    textColorHover: "hover:text-red-900",
  },

  {
    name: "Fast Food",
    value: "FAST_FOOD",
    icon: <Hamburger />,
    textColorHover: "hover:text-orange-400",
  },

  {
    name: "Limpeza",
    value: "CLEANING",
    icon: <SprayCan />,
    textColorHover: "hover:text-purple-400",
  },
];

export const categoriesStockMap = new Map<string, string>();
categoriesStockMap.set("MEAT", "Carnes");
categoriesStockMap.set("BREAD", "Pães");
categoriesStockMap.set("DAIRY", "Laticínios");
categoriesStockMap.set("VEGETABLE", "Vegetais");
categoriesStockMap.set("FRUIT", "Frutas");
categoriesStockMap.set("SAUCES_AND_CONDIMENTS", "Molhos e Condimentos");
categoriesStockMap.set("DRINK", "Bebidas");
categoriesStockMap.set("SWEET", "Café e Sobremesas");
categoriesStockMap.set("FROZEN", "Congelados");
categoriesStockMap.set("PACKAGING", "Embalagens");
categoriesStockMap.set("FAST_FOOD", "Fast Food");
categoriesStockMap.set("CLEANING", "Limpeza");
