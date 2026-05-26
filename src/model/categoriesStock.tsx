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
    textColor: "text-red-800",
  },

  {
    name: "Pães",
    value: "BREAD",
    icon: <Wheat />,
    textColor: "text-amber-700",
  },

  {
    name: "Laticínios",
    value: "DAIRY",
    icon: <Milk />,
    textColor: "text-white",
  },

  {
    name: "Vegetais",
    value: "VEGETABLE",
    icon: <LeafyGreen />,
    textColor: "text-green-700",
  },

  {
    name: "Frutas",
    value: "FRUIT",
    icon: <Banana />,
    textColor: "text-yellow-500",
  },

  {
    name: "Molhos e Condimentos",
    value: "SAUCES_AND_CONDIMENTS",
    icon: <Droplets />,
    textColor: "text-red-300",
  },

  {
    name: "Bebidas",
    value: "DRINK",
    icon: <CupSoda />,
    textColor: "text-blue-800",
  },

  {
    name: "Café e Sobremesas",
    value: "SWEET",
    icon: <Coffee />,
    textColor: "text-yellow-900",
  },

  {
    name: "Congelados",
    value: "FROZEN",
    icon: <IceCream />,
    textColor: "text-lime-600",
  },

  {
    name: "Embalagens",
    value: "PACKAGING",
    icon: <Package />,
    textColor: "text-red-900",
  },

  {
    name: "Fast Food",
    value: "FAST_FOOD",
    icon: <Hamburger />,
    textColor: "text-orange-400",
  },

  {
    name: "Limpeza",
    value: "CLEANING",
    icon: <SprayCan />,
    textColor: "text-purple-400",
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
