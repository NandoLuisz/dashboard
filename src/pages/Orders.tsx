import { useEffect, useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { orders, type Order } from "@/model/orderModel"
import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const ITEMS_PER_PAGE = 10

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
        <TableRow key={i}>
          <TableCell className="pl-5">
            <Skeleton className="h-4 w-16 bg-zinc-200" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-20 bg-zinc-200" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-48 bg-zinc-200" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-24 bg-zinc-200" />
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end">
              <Skeleton className="h-4 w-20 bg-zinc-200" />
            </div>
          </TableCell>
          <TableCell className="text-center">
            <div className="flex justify-center">
              <Skeleton className="h-8 w-24 rounded-md bg-zinc-200" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

export default function Orders() {
  const [open, setOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filter, setFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1)
  }, [filter])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer) 
  }, [])

  const filteredOrders = orders.filter(
    (item) =>
      item.date.toLowerCase().includes(filter.toLowerCase()) ||
      item.address.toLowerCase().includes(filter.toLowerCase()) ||
      item.status.toLowerCase().includes(filter.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE) || 1

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const handleOpenDetails = (order: Order) => {
    setSelectedOrder(order)
    setOpen(true)
  }

  return (
    <div className="w-full space-y-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes do pedido</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-2 text-sm">
              <p>
                <strong>ID:</strong> {selectedOrder.id}
              </p>
              <p>
                <strong>Data:</strong> {selectedOrder.date}
              </p>
              <p>
                <strong>Endereço:</strong> {selectedOrder.address}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Itens:</strong> {selectedOrder.items}
              </p>
              <p>
                <strong>Preço:</strong>{" "}
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                  Number(selectedOrder.price),
                )}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <div className="w-full max-w-sm flex items-center border rounded-xl bg-zinc-100 gap-2 text-zinc-600 px-3 py-2">
        <ListFilter className="size-4" />
        <input
          placeholder="Filtrar pedidos..."
          className="outline-none bg-transparent w-full text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="rounded-xl border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50/50">
              <TableHead className="pl-5 w-25">ID</TableHead>
              <TableHead className="w-30">Data</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead className="w-30">Status</TableHead>
              <TableHead className="text-right w-30">Preço</TableHead>
              <TableHead className="text-center w-37.5">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableSkeleton />
            ) : paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs pl-5">{order.id}</TableCell>
                  <TableCell className="text-sm">{order.date}</TableCell>
                  <TableCell className="max-w-56 truncate text-sm">{order.address}</TableCell>
                  <TableCell
                    className={`capitalize text-sm font-medium ${
                      order.status === "cancelado"
                        ? "text-red-500"
                        : order.status === "entregue"
                          ? "text-green-600"
                          : "text-amber-500"
                    }`}
                  >
                    {order.status}
                  </TableCell>
                  <TableCell className="text-right font-medium text-sm">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                      Number(order.price),
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button size="sm" variant="outline" onClick={() => handleOpenDetails(order)}>
                      Ver detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  Nenhum pedido encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-zinc-500">
          Página <strong>{currentPage}</strong> de {totalPages}
        </span>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={currentPage === 1 || isLoading}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ChevronLeft className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={currentPage === totalPages || isLoading}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
