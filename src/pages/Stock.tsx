import { Button } from "@/components/ui/button"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { categoriesStock } from "@/model/categoriesStock"
import { stockSchema, type StockFormData } from "@/model/schema/schemaStock"

import { statusStyles, stockItems, type Stock } from "@/model/stockModel"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft, ChevronRight, ListFilter, X } from "lucide-react"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

const units = ["un", "kg", "g", "l", "ml"]

const statuses: Stock["status"][] = ["ok", "baixo", "esgotado"]

const ITEMS_PER_PAGE = 5

function StockTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b">
          <td className="px-4 py-3">
            <Skeleton className="h-4 w-32 bg-zinc-200" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-4 w-12 mx-auto bg-zinc-200" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-4 w-8 mx-auto bg-zinc-200" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-4 w-12 mx-auto bg-zinc-200" />
          </td>
          <td className="px-4 py-3 flex justify-center">
            <Skeleton className="h-6 w-20 rounded-full bg-zinc-200" />
          </td>
        </tr>
      ))}
    </>
  )
}

export default function Stock() {
  function onSubmit(data: StockFormData) {
    if (!stockProductDetails) return

   setStockProducts((prev) =>
    prev.map((item) =>
      item.id === stockProductDetails.id
        ? ({ ...item, ...data } as Stock) 
        : item
    )
  )

    setModalDetailsStockProduct(false)
  }

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StockFormData>({
    resolver: zodResolver(stockSchema),
  })
  const [modalDetailsStockProduct, setModalDetailsStockProduct] = useState<boolean>(false)
  const [stockProductDetails, setStockProductDetails] = useState<Stock | null>(null)
  const [stockProducts, setStockProducts] = useState<Stock[]>(stockItems)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filterText, setFilterText] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const [isLoading, setIsLoading] = useState(true)

  const filteredStock = stockProducts.filter((item) => {
    const matchesText =
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.status.toLowerCase().includes(filterText.toLowerCase())

    const matchesCategory = selectedCategory ? item.type === selectedCategory : true

    return matchesText && matchesCategory
  })

  const totalPages = Math.ceil(filteredStock.length / ITEMS_PER_PAGE)

  const paginatedStock = filteredStock.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1)
  }, [filterText, selectedCategory])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-full flex flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`
          fixed top-0 right-0 h-full w-100 bg-white shadow-lg z-50
          transform transition-transform duration-300 ease-in-out px-2 py-2
          ${modalDetailsStockProduct ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="w-full flex justify-end">
          <X className="cursor-pointer" onClick={() => setModalDetailsStockProduct(false)} />
        </div>
        <div>
          <img
            src={stockProductDetails?.image}
            alt={stockProductDetails?.name}
            className="w-full rounded"
          />
          <div className="w-full flex flex-col gap-2">
            <label className="text-[10px]">Nome</label>
            <input type="text" {...register("name")} className="border rounded-3xl px-3 py-2" />
            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
            <label className="text-[10px]">Quantidade</label>
            <input
              type="number"
              {...register("quantity", { valueAsNumber: true })}
              className="border rounded-3xl px-3 py-2"
            />
            {errors.quantity && (
              <span className="text-red-500 text-xs">{errors.quantity.message}</span>
            )}
            <label className="text-[10px]">Quantidade mínima</label>
            <input
              type="number"
              {...register("minQuantity", { valueAsNumber: true })}
              className="border rounded-3xl px-3 py-2"
            />
            <label className="text-[10px]">Unidade</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-50 justify-between">
                  {stockProductDetails?.unit}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-50 p-2">
                {units.map((unit) => (
                  <div
                    key={unit}
                    className="cursor-pointer px-2 py-1 hover:bg-zinc-100"
                    onClick={() => {
                      setValue("unit", unit as "un" | "kg" | "g" | "l" | "ml", {
                        shouldValidate: true,
                      })
                      setStockProductDetails((prev) => (prev ? { ...prev, unit: unit } : prev))
                    }}
                  >
                    {unit}
                  </div>
                ))}
              </PopoverContent>
            </Popover>
            {errors.unit && <span className="text-red-500 text-xs">{errors.unit.message}</span>}
            <label className="text-[10px]">Status</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-50 justify-between">
                  {stockProductDetails?.status || "Selecione uma opção"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-50 p-2">
                <ul className="flex flex-col gap-1">
                  {statuses.map((status) => (
                    <div
                      key={status}
                      onClick={() => {
                        setValue("status", status, { shouldValidate: true })
                        setStockProductDetails((prev) =>
                          prev ? { ...prev, status: status } : prev,
                        )
                      }}
                      className="cursor-pointer px-2 py-1 hover:bg-zinc-100"
                    >
                      {status}
                    </div>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
            <label className="text-[10px]">Tipo</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-50 justify-between">
                  {stockProductDetails?.type || "Selecione uma opção"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-50 p-2">
                <ul className="flex flex-col gap-1">
                  {categoriesStock.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setValue("type", option.value, { shouldValidate: true })
                        setStockProductDetails((prev) =>
                          prev ? ({ ...prev, type: option.value } as Stock) : prev,
                        )
                      }}
                      className="cursor-pointer px-2 py-1 hover:bg-zinc-100"
                    >
                      {option.value}
                    </div>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Button type="submit" className="mt-4">
          Salvar alterações
        </Button>
      </form>
      <span className="text-lg font-semibold">Categorias</span>
      <div className="w-full grid grid-cols-6 gap-4 mt-4">
        {categoriesStock.map((category) => (
          <div
            key={category.value}
            className={`
            bg-zinc-200 w-50 h-30 rounded flex flex-col items-center justify-center gap-2 cursor-pointer
            ${category.textColorHover}
            ${selectedCategory === category.value ? "ring-2 ring-zinc-800" : ""}
            `}
            onClick={() =>
              setSelectedCategory((prev) => (prev === category.value ? null : category.value))
            }
          >
            <span>{category.icon}</span>

            <span>{category.name}</span>
          </div>
        ))}
      </div>
      <div className="w-[30%] flex items-center justify-between border rounded-3xl bg-zinc-200 gap-2 text-zinc-800 px-3 py-2 mt-6">
        <ListFilter />
        <input
          placeholder="Filtrar por nome, status ou tipo..."
          className="outline-none bg-transparent w-full"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-zinc-800 text-white text-sm">
                <th className="px-4 py-3 text-left">Produto</th>

                <th className="px-4 py-3 text-center">Quantidade</th>

                <th className="px-4 py-3 text-center">Unidade</th>

                <th className="px-4 py-3 text-center">Mínimo</th>

                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <StockTableSkeleton />
              ) : paginatedStock.length > 0 ? (
                paginatedStock.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-none hover:bg-zinc-100 transition cursor-pointer"
                    onClick={() => {
                      setModalDetailsStockProduct(true)
                      setStockProductDetails(item)
                      reset(item as unknown as StockFormData)
                    }}
                  >
                    <td className="px-4 py-3 font-medium text-zinc-800">{item.name}</td>
                    <td className="px-4 py-3 text-center">{item.quantity}</td>
                    <td className="px-4 py-3 text-center">{item.unit}</td>
                    <td className="px-4 py-3 text-center">{item.minQuantity}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-zinc-500">
                    Nenhum item encontrado no estoque.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <span className="text-sm text-muted-foreground">
          Página {currentPage} de {totalPages || 1}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
