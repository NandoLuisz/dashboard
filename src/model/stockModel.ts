// 🍔 1️⃣ Ingredientes principais
// Usados diretamente nos lanches:
// Pão de hambúrguer
// Hambúrguer bovino
// Hambúrguer de frango
// Hambúrguer vegetariano
// Frango empanado
// Bacon
// Salsicha (hot-dog)
// Ovo
// Queijo mussarela
// Queijo cheddar
// Presunto
// Alface
// Tomate
// Cebola
// Picles
// 🍟 2️⃣ Acompanhamentos
// Batata frita congelada
// Onion rings
// Nuggets
// Coxinha
// Pastel
// Molhos extras (maionese temperada, barbecue, cheddar)
// 🥤 3️⃣ Bebidas
// Refrigerante cola
// Refrigerante laranja / guaraná
// Refrigerante zero
// Suco concentrado
// Suco natural
// Água mineral
// Água com gás
// Leite
// Milk-shake (baunilha, chocolate, morango)
// 🧂 4️⃣ Molhos e condimentos
// Ketchup
// Maionese
// Mostarda
// Barbecue
// Molho cheddar
// Molho especial da casa
// Sal
// Açúcar
// Pimenta
// Orégano
// 📦 5️⃣ Embalagens (muito importantes!)
// Caixa de hambúrguer
// Embalagem de batata frita
// Copo descartável (P, M, G)
// Tampa de copo
// Canudo
// Guardanapo
// Sacola de papel / plástico
// Papel manteiga
// 🧼 6️⃣ Itens de limpeza e apoio
// Luvas descartáveis
// Toucas
// Papel toalha
// Detergente
// Desinfetante
// Álcool 70%
// Saco de lixo
// 🧊 7️⃣ Outros itens comuns
// Óleo de fritura
// Gelo
// Margarina / manteiga
// Fermento
// Farinha de trigo

export type StockUnit = "un" | "kg" | "g" | "l" | "ml"

export type StockStatus = "ok" | "baixo" | "esgotado"

export interface Stock {
  id: string
  productId: string
  name: string
  quantity: number
  unit: string
  minQuantity: number
  status: StockStatus
  type: StockCategory
  image: string
}

export type StockCategory =
  | "meat"
  | "bread"
  | "dairy"
  | "vegetable"
  | "sauces and condiments"
  | "drink"
  | "sweet"
  | "frozen"
  | "packaging"
  | "frying"
  | "cleaning"

export const statusStyles: Record<StockStatus, string> = {
  ok: "bg-green-100 text-green-800",
  baixo: "bg-yellow-100 text-yellow-800",
  esgotado: "bg-red-100 text-red-800",
}

export const stockItems: Stock[] = [
  // ... (seus 5 itens iniciais aqui)
  {
    id: "st1",
    productId: "pao-hamburguer",
    name: "Pão de Hambúrguer",
    quantity: 120,
    unit: "un",
    minQuantity: 30,
    status: "ok",
    type: "bread",
    image: "data:image/jpeg;base64,...",
  },
  {
    id: "st2",
    productId: "hamburguer-bovino",
    name: "Hambúrguer Bovino",
    quantity: 8,
    unit: "kg",
    minQuantity: 5,
    status: "ok",
    type: "meat",
    image: "data:image/jpeg;base64,...",
  },
  {
    id: "st3",
    productId: "queijo-mussarela",
    name: "Queijo Mussarela",
    quantity: 2,
    unit: "kg",
    minQuantity: 3,
    status: "baixo",
    type: "dairy",
    image: "data:image/jpeg;base64,...",
  },
  {
    id: "st4",
    productId: "batata-frita",
    name: "Batata Frita Congelada",
    quantity: 0,
    unit: "kg",
    minQuantity: 5,
    status: "esgotado",
    type: "frying",
    image: "data:image/jpeg;base64,...",
  },
  {
    id: "st5",
    productId: "refrigerante-cola",
    name: "Refrigerante Cola",
    quantity: 45,
    unit: "un",
    minQuantity: 20,
    status: "ok",
    type: "drink",
    image: "data:image/jpeg;base64,...",
  },

  // --- NOVOS ITENS ADICIONADOS ---
  {
    id: "st6",
    productId: "alface-crespa",
    name: "Alface Crespa",
    quantity: 15,
    unit: "un",
    minQuantity: 5,
    status: "ok",
    type: "vegetable",
    image: "",
  },
  {
    id: "st7",
    productId: "tomate-italiano",
    name: "Tomate Italiano",
    quantity: 4,
    unit: "kg",
    minQuantity: 5,
    status: "baixo",
    type: "vegetable",
    image: "",
  },
  {
    id: "st8",
    productId: "bacon-fatiado",
    name: "Bacon Fatiado",
    quantity: 12,
    unit: "kg",
    minQuantity: 3,
    status: "ok",
    type: "meat",
    image: "",
  },
  {
    id: "st9",
    productId: "maionese-casa",
    name: "Maionese Artesanal",
    quantity: 10,
    unit: "lt",
    minQuantity: 2,
    status: "ok",
    type: "sauces and condiments",
    image: "",
  },
  {
    id: "st10",
    productId: "ketchup-sache",
    name: "Ketchup Sachê",
    quantity: 500,
    unit: "un",
    minQuantity: 100,
    status: "ok",
    type: "sauces and condiments",
    image: "",
  },
  {
    id: "st11",
    productId: "mostarda-sache",
    name: "Mostarda Sachê",
    quantity: 50,
    unit: "un",
    minQuantity: 100,
    status: "baixo",
    type: "sauces and condiments",
    image: "",
  },
  {
    id: "st12",
    productId: "cerveja-lata",
    name: "Cerveja Lata 350ml",
    quantity: 72,
    unit: "un",
    minQuantity: 24,
    status: "ok",
    type: "drink",
    image: "",
  },
  {
    id: "st13",
    productId: "agua-mineral",
    name: "Água Mineral 500ml",
    quantity: 12,
    unit: "un",
    minQuantity: 20,
    status: "baixo",
    type: "drink",
    image: "",
  },
  {
    id: "st14",
    productId: "suco-laranja",
    name: "Suco Laranja 1L",
    quantity: 0,
    unit: "un",
    minQuantity: 10,
    status: "esgotado",
    type: "drink",
    image: "",
  },
  {
    id: "st15",
    productId: "caixa-entrega",
    name: "Caixa de Hambúrguer",
    quantity: 300,
    unit: "un",
    minQuantity: 50,
    status: "ok",
    type: "packaging",
    image: "",
  },
  {
    id: "st16",
    productId: "papel-acoplado",
    name: "Papel Acoplado",
    quantity: 1000,
    unit: "un",
    minQuantity: 200,
    status: "ok",
    type: "packaging",
    image: "",
  },
  {
    id: "st17",
    productId: "sacola-papel",
    name: "Sacola de Papel G",
    quantity: 40,
    unit: "un",
    minQuantity: 100,
    status: "baixo",
    type: "packaging",
    image: "",
  },
  {
    id: "st18",
    productId: "detergente-neutro",
    name: "Detergente Neutro",
    quantity: 5,
    unit: "lt",
    minQuantity: 2,
    status: "ok",
    type: "cleaning",
    image: "",
  },
  {
    id: "st19",
    productId: "desengordurante",
    name: "Desengordurante Cozinha",
    quantity: 2,
    unit: "lt",
    minQuantity: 5,
    status: "baixo",
    type: "cleaning",
    image: "",
  },
  {
    id: "st20",
    productId: "papel-toalha",
    name: "Papel Toalha (Rolo)",
    quantity: 24,
    unit: "un",
    minQuantity: 6,
    status: "ok",
    type: "cleaning",
    image: "",
  },
  {
    id: "st21",
    productId: "cebola-roxa",
    name: "Cebola Roxa",
    quantity: 7,
    unit: "kg",
    minQuantity: 2,
    status: "ok",
    type: "vegetable",
    image: "",
  },
  {
    id: "st22",
    productId: "picles-fatiado",
    name: "Picles Fatiado",
    quantity: 3,
    unit: "kg",
    minQuantity: 1,
    status: "ok",
    type: "vegetable",
    image: "",
  },
  {
    id: "st23",
    productId: "nuggets-frango",
    name: "Nuggets de Frango",
    quantity: 15,
    unit: "kg",
    minQuantity: 5,
    status: "ok",
    type: "frying",
    image: "",
  },
  {
    id: "st24",
    productId: "anel-cebola",
    name: "Anéis de Cebola",
    quantity: 2,
    unit: "kg",
    minQuantity: 5,
    status: "baixo",
    type: "frying",
    image: "",
  },
]
