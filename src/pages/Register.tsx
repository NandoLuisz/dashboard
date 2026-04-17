import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Toast } from "./ui/Toast"
import { ListFilter, X } from "lucide-react"

import data from "@/data.json"
import { categories, types, type FoodResponse } from "@/model/foodModel"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { foodFormSchema, type FoodFormFields } from "@/model/schema/schemaFood"

const inputBase = "outline-none rounded-3xl px-4 py-2 transition-colors"
const inputError = "border-2 border-red-500 bg-red-50"
const inputNormal = "bg-white"

function ProductSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 bg-orange-100/50 px-4 py-3 rounded-xl animate-pulse"
        >
          <Skeleton className="w-16 h-16 rounded-lg bg-orange-200" />
          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-32 bg-orange-200" />
              <Skeleton className="h-4 w-48 bg-orange-200" />
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-4 w-16 bg-orange-200" />
              <Skeleton className="h-5 w-20 bg-orange-200" />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FoodFormFields>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      price: 0,
      type: undefined,
    },
  })

  const [products, setProducts] = useState<FoodResponse[]>(data)
  const [filter, setFilter] = useState("")

  const [modalDetails, setModalDetails] = useState<boolean>(false)
  const [productDetails, setProductDetails] = useState<FoodResponse | null>()
  const [filterTypeValue, setFilterTypeValue] = useState<string>("")

  const [toastSucessfullyEdit, setToastSucessfullyEdit] = useState(false)
  const [toastSucessfullyRegister, setToastSucessfullyRegister] = useState(false)
  const [toastWarningRegister, setToastWarningRegister] = useState(false)
  const [toastDeleteRegister, setToastDeleteRegister] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  const onSubmit: SubmitHandler<FoodFormFields> = async (formData) => {
    console.log(formData)
    setToastSucessfullyRegister(true)
    reset()
  }

  useEffect(() => {
    if (
      toastSucessfullyEdit ||
      toastSucessfullyRegister ||
      toastWarningRegister ||
      toastDeleteRegister
    ) {
      const timer = setTimeout(() => {
        setToastSucessfullyEdit(false)
        setToastSucessfullyRegister(false)
        setToastWarningRegister(false)
        setToastDeleteRegister(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [toastSucessfullyEdit, toastSucessfullyRegister, toastWarningRegister, toastDeleteRegister])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  function filterPopover(type: string) {
    setProducts(data.filter((item) => item.type === type))
  }

  return (
    <main className="w-full h-full flex gap-5 relative">
      {toastSucessfullyRegister && <Toast text="Cadastro feito com sucesso!" />}
      {toastWarningRegister && <Toast text="Preencha o formulário corretamente!" color="yellow" />}
      {toastDeleteRegister && <Toast text="Cadastro deletado com sucesso!" color="red" />}
      {modalDetails && (
        <div className="absolute w-160 h-100 bg-white rounded-md mt-40 ml-50 px-2 py-2">
          <div className="w-full flex justify-end">
            <X
              className="cursor-pointer hover:text-zinc-600"
              onClick={() => setModalDetails(false)}
            />
          </div>
          <div className="w-full flex gap-2 px-2 py-2">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className="w-70 h-70 rounded"
            />
            <div className="w-full flex flex-col gap-2">
              <label className="text-[10px]">Título</label>
              <input
                type="text"
                value={productDetails?.title}
                className="border rounded-3xl  gap-2 text-amber-950 px-3 py-2"
              />
              <label className="text-[10px]">Descrição</label>
              <input
                type="text"
                value={productDetails?.description}
                className="border rounded-3xl  gap-2 text-amber-950 px-3 py-2"
              />
              <label className="text-[10px]">Preço</label>
              <input
                type="text"
                value={productDetails?.price}
                className="border rounded-3xl  gap-2 text-amber-950 px-3 py-2"
              />
              <label className="text-[10px]">Tipo</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-50 justify-between">
                    {productDetails?.type || "Selecione uma opção"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-50 p-2">
                  <ul className="flex flex-col gap-1">
                    {types.map((option) => (
                      <li
                        key={option}
                        className="cursor-pointer rounded px-2 py-1 hover:bg-zinc-100"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="w-full flex items-center justify-end gap-3 mt-5 px-6">
            <button className="px-2 py-2 bg-zinc-600 rounded text-white text-xs cursor-pointer hover:bg-zinc-400">
              Confirmar edição
            </button>
            <button className="px-2 py-2 bg-red-600 rounded text-white text-xs cursor-pointer hover:bg-red-400">
              Deletar do cardápio
            </button>
          </div>
        </div>
      )}
      <form
        className="w-[40%] h-[70vh] bg-amber-200 rounded-lg flex flex-col items-center gap-3 px-5 py-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-col gap-1">
          <input
            type="text"
            placeholder="Título"
            {...register("title")}
            className={`${inputBase} ${errors.title ? inputError : inputNormal}`}
          />
          {errors.title && <span className="text-sm text-red-600">{errors.title.message}</span>}
        </div>

        <div className="w-full flex flex-col gap-1">
          <input
            type="text"
            placeholder="Descrição"
            {...register("description")}
            className={`${inputBase} ${errors.description ? inputError : inputNormal}`}
          />
          {errors.description && (
            <span className="text-sm text-red-600">{errors.description.message}</span>
          )}
        </div>

        <div className="w-full flex flex-col gap-1">
          <input
            type="text"
            placeholder="URL da imagem"
            {...register("image")}
            className={`${inputBase} ${errors.image ? inputError : inputNormal}`}
          />
          {errors.image && <span className="text-sm text-red-600">{errors.image.message}</span>}
        </div>

        <div className="w-full flex flex-col gap-1">
          <input
            type="number"
            step="0.01"
            placeholder="Preço"
            {...register("price", { valueAsNumber: true })}
            className={`${inputBase} ${errors.price ? inputError : inputNormal}`}
          />
          {errors.price && <span className="text-sm text-red-600">{errors.price.message}</span>}
        </div>

        <div className="w-full flex flex-col items-start gap-2">
          <span className="font-bold text-amber-950">Selecione o tipo:</span>
          <div className="grid grid-cols-2 gap-2 w-full">
            {categories.map((category) => (
              <label
                key={category.value}
                className="text-amber-950 flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  {...register("type")}
                  value={category.value}
                  className="accent-orange-700"
                />
                {category.label}
              </label>
            ))}
          </div>
        </div>
        <div className="w-full mt-4">
          <button
            type="submit"
            className="w-full bg-orange-700 hover:bg-orange-800 transition-colors py-2 rounded-lg text-white font-bold"
          >
            Cadastrar
          </button>
        </div>
      </form>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex gap-4">
          <div className="w-[30%] flex items-center justify-between border rounded-3xl bg-zinc-200 gap-2 text-amber-950 px-3 py-2">
            <ListFilter />
            <input
              placeholder="Filtrar"
              className="outline-none bg-transparent w-full"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-50 justify-between">
                  {filterTypeValue || "Filtrar pelo tipo"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-50 p-2">
                <ul className="flex flex-col gap-1">
                  {types.map((option) => (
                    <li
                      key={option}
                      onClick={() => {
                        filterPopover(option)
                        setFilterTypeValue(option)
                      }}
                      className="cursor-pointer rounded px-2 py-1 hover:bg-zinc-100"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
            <X
              className="size-4"
              onClick={() => {
                setProducts(data)
                setFilterTypeValue("Filtrar pelo tipo")
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 max-h-170 overflow-y-auto pr-2">
          {isLoading ? (
            <ProductSkeleton />
          ) : (
            products
              .filter(
                (item) =>
                  item.title.toLowerCase().includes(filter.toLowerCase()) ||
                  item.description.toLowerCase().includes(filter.toLowerCase()) ||
                  item.type.toLowerCase().includes(filter.toLowerCase()),
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-orange-400 px-4 py-3 rounded-xl cursor-pointer hover:bg-orange-500 transition-colors"
                  onClick={() => {
                    setModalDetails(true)
                    setProductDetails(item)
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-lg">{item.title}</span>
                      <span className="text-sm text-zinc-700 line-clamp-1">{item.description}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-sm uppercase text-zinc-800">{item.type}</span>
                      <span className="font-bold text-lg">R$ {item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </main>
  )
}
