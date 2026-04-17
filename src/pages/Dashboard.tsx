import {
  Calendar,
  ChevronDown,
  Package,
  ClipboardClock,
  TrendingUp,
  TrendingDown,
  WalletCards,
  CircleX,
  MessageSquareQuote,
} from "lucide-react"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Calendar as CalenderUI } from "@/components/ui/calendar"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Review from "./components/Review"

export const description = "A line chart"

const chartData = [
  { period: "Jan", pedidos: 420 },
  { period: "Fev", pedidos: 380 },
  { period: "Mar", pedidos: 510 },
  { period: "Abr", pedidos: 470 },
  { period: "Mai", pedidos: 560 },
  { period: "Jun", pedidos: 610 },
]

const chartConfig = {
  pedidos: {
    label: "Pedidos",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const menuItems = [
  {
    menu: "Pizza Calabresa",
    categoria: "Pizza",
    preco: 45.9,
    quantidade: 32,

    image:
      "data:image/jpeg;base64,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",
  },
  {
    menu: "Hambúrguer Artesanal",
    categoria: "Hambúrguer",
    preco: 29.9,
    quantidade: 18,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    menu: "Refrigerante Lata",
    categoria: "Bebidas",
    preco: 6.5,
    quantidade: 54,
    image:
      "data:image/jpeg;base64,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du0UpU0dnJULuDaMKjMD09coYm1rE5LWKyVCrFRSZS4jZ9WdSU4JZ35aWS5cbd2d73MeF2ngg71GptnOIaqrWN1plyyjQ2vu08YjUp3bazvc2q4TGOMYRkrbii1lm7WfArhkZl0ssjyTNTJjqG3+82SNJvI0K7fnSdolfVZ1/iL+SV//ACD7qnLPDfCeL21067PVnSZIKcQBAEAQBAEAQBAEAQBAEAQBAEAQCu8YOyauKwFajRF6hCsq3AzFHD5bnQE2trNKkN+NiVg8QsPWVRq9j89UqjKzI9KojLoytYEEGxUi+h0OhlfPBz4WPV0PtFhl8Sku5fySuEps5tYKf1mRe7eTOTwdXkTV9osDLWTXcyVTg9iiLqlNvCtQPszzX7pV5eR0/HMA/wDst3S/g+/8uYwWIpeYqUjp5PH3Wr/j5G341gH/ANq8JfwYamw8UN9I/vU/6pj7rV5Gy2zgP9q+f8GFtmVxpyZ8Lp/VH3WryM/jOA/2r5/weqWxcU3RoOfV/OPulbl5GPxvAL/tXhL+D7V4P4sKWNGwF73emDpv0LXPlvmfulXka/juA/2fKX8EdicMygZio03Ai/qF7GdFhKvIj1Nv4K9t9+DIyqvePvvOscJPqK6rt7C/tUn3L+TufFNsSvhcG3LqUarUNQIekq5FUZuw829vC9t0mUqbgrM89j8WsTU3oqySsXadSCIAgCAIAgCAIAgCAIAgCAIAgCAIAgFA42ODFOth2xVNPj6QDEqNXpjRwwG/KpJB36EbjAOO4dDcC46v9wRpAL9wd4K1ay3DLYg2OYg+dhpp/CAbmN4H4gEjMhNs2rMQb7iTl33voDfS8AhcXsTEp1p5MPbuue8wCLrYete1x+9AJvCcCsfUXMrUrW0Ac3PgMu8ntgEdtvgpiqCZ6lSlbdZWN7jf9G2/S/aD4wCnYh2WzZ7b7EGx8fb7JmwOocSvBmk9M4+qmY5ytDN0QF6VRRuJzXUHqy6b5gHXIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgEbi+D+CqnNVwtB2+s1KmW9ZF4Bjp8G8GoslEJ6DOn+UiAYqvBXBt0lqH+/xH+pANV+AmzjvpVD/AIjFf6kAwPxcbKO+g5/xGK/1IBmocAtmp0aLj+/xP31IBm/5K2baxwqMP1yz/wCcmAbGF4LbOpnMmCwytrzhSp5tdTzrXgEuqgCwFh2CAfYAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAf//Z",
  },
]

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [showCalender, setShowCalender] = useState<boolean>(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dateToFilter, setDatetofilter] = useState<string>(
    format(new Date(), "dd 'de' MMM, yyyy", { locale: ptBR })
  )

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500)
  }, [])

  useEffect(() => {
  if (date) {
    const formattedDate = format(date, "dd 'de' MMM, yyyy", { locale: ptBR })
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDatetofilter(formattedDate)
    
    setShowCalender(false)
  }
}, [date])

  return (
    <div className="w-full h-full relative">
      {showCalender && (
        <CalenderUI
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
          className="absolute rounded-lg border shadow-sm top-12"
        />
      )}
      <div className="w-48 gap-3 rounded-xl bg-white px-3 py-3 flex items-center">
        <Calendar className="size-5 text-orange-400" />
        <span className="text-sm font-semibold text-amber-950">
          {dateToFilter}
        </span>
        <ChevronDown 
          className="size-4 cursor-pointer" 
          onClick={() => setShowCalender(!showCalender)}
        />
      </div>  
      <div className="py-4 flex gap-4">
        {!loading ? (
          <div className="w-68 bg-white px-5 py-5 rounded-4xl">
            <div className="flex w-full items-center justify-between">
              <span>Entrega mensal</span>
              <Package className="size-8 text-emerald-700" />
            </div>
            <span className="font-semibold text-3xl">857 pedidos</span>
            <div className="flex items-center gap-2">
              <TrendingDown className="text-red-600" />
              <span className="text-zinc-400 text-xs">*10% vs mês passado</span>
            </div>
          </div>
        ) : (
          <Skeleton className="h-30 w-67.5 bg-zinc-200 rounded-4xl" />
        )}
        {!loading ? (
          <div className="w-68 bg-white px-5 py-5 rounded-4xl">
            <div className="flex w-full items-center justify-between">
              <span>Hora trabalhada mensal</span>
              <ClipboardClock className="size-8 text-yellow-400" />
            </div>
            <span className="font-semibold text-3xl">158 horas</span>
            <div className="flex items-center gap-2">
              <TrendingUp className="text-green-600" />
              <span className="text-zinc-400 text-xs">*20% vs mês passado</span>
            </div>
          </div>
        ) : (
          <Skeleton className="h-30 w-67.5 bg-zinc-200 rounded-4xl" />
        )}
        {!loading ? (
          <div className="w-68 bg-white px-5 py-5 rounded-4xl">
            <div className="flex w-full items-center justify-between">
              <span>Fundos ganhos</span>
              <WalletCards className="size-8 text-lime-700" />
            </div>
            <span className="font-semibold text-3xl">R$ 1,5k</span>
            <div className="flex items-center gap-2">
              <TrendingUp className="text-green-600" />
              <span className="text-zinc-400 text-xs">*5% vs mês passado</span>
            </div>
          </div>
        ) : (
          <Skeleton className="h-30 w-67.5 bg-zinc-200 rounded-4xl" />
        )}
        {!loading ? (
          <div className="w-68 bg-white px-5 py-5 rounded-4xl">
            <div className="flex w-full items-center justify-between">
              <span>Pedidos cancelados</span>
              <CircleX className="size-8 text-red-700" />
            </div>
            <span className="font-semibold text-3xl">34 cancelados</span>
            <div className="flex items-center gap-2">
              <TrendingDown className="text-green-600" />
              <span className="text-zinc-400 text-xs">*5% vs mês passado</span>
            </div>
          </div>
        ) : (
          <Skeleton className="h-30 w-67.5 bg-zinc-200 rounded-4xl" />
        )}
      </div>
      <div className="w-full flex gap-3">
        <div>
          {loading ? (
            <Skeleton className="h-full w-full bg-zinc-200 rounded-4xl" />
          ) : (
            <Card className="w-140 h-75">
              <CardHeader className="pb-2">
                <CardTitle>Pedidos mensais</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </CardHeader>

              <CardContent className="h-42.5">
                <ChartContainer config={chartConfig} className="w-full h-full">
                  <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="period" tickLine={false} axisLine={false} tickMargin={6} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Line
                      dataKey="pedidos"
                      type="natural"
                      stroke="var(--color-pedidos)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>

              <CardFooter className="w-full mt-2 flex items-start justify-center gap-1 text-xs">
                <div className="flex gap-2 font-medium text-green-600">
                  Crescimento de 5.2% este mês <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground">Maior volume no período de jantar</div>
              </CardFooter>
            </Card>
          )}
          <div className="mt-6">
            <div className="flex gap-2 mb-2">
              <MessageSquareQuote />
              <span className="font-semibold">Avalicações de clientes</span>
            </div>

            <div className="flex gap-2">
              {loading ? (
                <Skeleton className="w-45.5 h-45.5 bg-zinc-200 rounded-4xl" />
              ) : (
                <Review quantity={5}/>
              )}
              {loading ? (
                <Skeleton className="w-45.5 h-45.5 bg-zinc-200 rounded-4xl" />
              ) : (
                <Review quantity={5}/>
              )}
              {loading ? (
                <Skeleton className="w-45.5 h-45.5 bg-zinc-200 rounded-4xl" />
              ) : (
                <Review quantity={3}/>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 flex-1 flex flex-col gap-2">
          {loading ? (
            <Skeleton className="h-6 w-80" />
          ) : (
            <span className="font-semibold text-xl">Itens mais vendidos do cardápio - Jan</span>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Menu</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell className="flex items-center gap-2">
                        <Skeleton className="size-10 rounded-sm" />
                        <Skeleton className="h-4 w-40" />
                      </TableCell>

                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>

                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>

                      <TableCell className="text-right">
                        <Skeleton className="h-4 w-12 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                : menuItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <img src={item.image} alt={item.menu} className="size-10 rounded-sm" />
                        {item.menu}
                      </TableCell>

                      <TableCell>{item.categoria}</TableCell>

                      <TableCell>R$ {item.preco.toFixed(2)}</TableCell>

                      <TableCell className="text-right">{item.quantidade}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
