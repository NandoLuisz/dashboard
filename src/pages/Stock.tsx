import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { categoriesStock, categoriesStockMap } from "@/model/categoriesStock";
import { stockSchema, type StockFormData } from "@/model/schema/schemaStock";

import { type Stock } from "@/model/stockModel";
import findAllProducts, { type Product } from "@/services/find-all-products";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, ListFilter, X } from "lucide-react";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ITEMS_PER_PAGE = 5;

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
  );
}

export default function Stock() {
  function onSubmit(data: StockFormData) {
    if (!stockProductDetails) return;

    setStockProducts((prev) =>
      prev.map((item) =>
        item.id === stockProductDetails.id
          ? ({ ...item, ...data } as Product)
          : item,
      ),
    );

    setModalDetailsStockProduct(false);
  }

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StockFormData>({
    resolver: zodResolver(stockSchema),
  });

  const [modalDetailsStockProduct, setModalDetailsStockProduct] =
    useState<boolean>(false);
  const [stockProductDetails, setStockProductDetails] =
    useState<Product | null>(null);
  const [stockProducts, setStockProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const filteredStockProductWithStockControlled = stockProducts
    .filter((item) => item.stockControlled)
    .filter((item) => {
      item.stockControlled = true;
      return item;
    });

  const totalPages = Math.ceil(
    filteredStockProductWithStockControlled.length / ITEMS_PER_PAGE,
  );

  const paginatedStock = filteredStockProductWithStockControlled.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [filterText, selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const products = await findAllProducts();
      if (products) {
        setStockProducts(products);
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

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
          <X
            className="cursor-pointer"
            onClick={() => setModalDetailsStockProduct(false)}
          />
        </div>
        <div>
          <img
            src={stockProductDetails?.image}
            alt={stockProductDetails?.name}
            className="w-full rounded"
          />
          <div className="w-full flex flex-col gap-2">
            <label className="text-[10px]">Nome</label>
            <input
              type="text"
              {...register("name")}
              className="border rounded-3xl px-3 py-2"
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
            <label className="text-[10px]">Quantidade</label>
            <input
              type="number"
              {...register("stock", { valueAsNumber: true })}
              className="border rounded-3xl px-3 py-2"
            />
            {errors.stock && (
              <span className="text-red-500 text-xs">
                {errors.stock.message}
              </span>
            )}
            <label className="text-[10px]">Tipo</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-50 justify-between">
                  {stockProductDetails?.category
                    ? categoriesStockMap.get(stockProductDetails.category)
                    : "Selecione uma opção"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-50 p-2">
                <ul className="flex flex-col gap-1">
                  {categoriesStock.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setValue("category", option.value, {
                          shouldValidate: true,
                        });
                        setStockProductDetails((prev) =>
                          prev
                            ? ({ ...prev, category: option.value } as Product)
                            : prev,
                        );
                      }}
                      className="cursor-pointer px-2 py-1 hover:bg-zinc-100"
                    >
                      {categoriesStockMap.get(option.value)}
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
            key={category.name}
            className={`
            bg-zinc-200 w-48 h-30 rounded flex flex-col items-center justify-center gap-2 cursor-pointer
            ${category.textColorHover}
            ${selectedCategory === category.name ? "ring-2 ring-zinc-500" : ""}
            `}
            onClick={() =>
              setSelectedCategory((prev) =>
                prev === category.name ? null : category.name,
              )
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
                <th className="px-4 py-3 text-center">Categoria</th>
                <th className="px-4 py-3 text-center">Preço</th>
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
                      setModalDetailsStockProduct(true);
                      setStockProductDetails(item);
                      reset(item as unknown as StockFormData);
                    }}
                  >
                    <td className="px-4 py-3 font-medium text-zinc-800">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-center">{item.stock}</td>
                    <td className="px-4 py-3 text-center">
                      {categoriesStockMap.get(item.category)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      R$ {item.price.toFixed(2)}
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
  );
}
