'use client'

import { useQuery } from "@tanstack/react-query"
import { getCookie } from "cookies-next"
import { TApiResponse, TVendaToFindOne } from "@/types"
import { Api } from "../../lib/axios"
import { ProdutosGrid } from "./components/ProdutosGrid"
import { brlMoney } from "../../../helpers/money/brlMoney"

export default function VendaPage({ params: { id } }: { params: { id: number } }) {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['fetchProdutosFromMenu'],
    retry: 0,
    queryFn: async () => {
      const { data } = await Api.get(`api/vendas/${id}`, {
        headers: {
          "Content-Type": "Application/json",
          user: getCookie('user') as string,
          password: getCookie('password') as string,
        }
      })

      return data as TApiResponse<TVendaToFindOne>
    }
  })
  
  return <div
    className="bg-primary opacity-80 mt-10 mx-5 p-10 rounded-lg flex flex-col gap-10 text-white shadow-lg"
  >
    <div className="flex flex-col justify-start gap-5">
      <h1 className="text-xl font-bold">Código da venda: {data?.data.id ?? ''}</h1>
      <span>Vendedor: {data?.data && data.data.funcionario ? data?.data.funcionario.nome : ''}</span>
      <span className="text-lg font-semibold">Valor total da venda: <strong className="text-success">{brlMoney(data?.data.valorTotal ?? 0)}</strong></span>
    </div>
    <ProdutosGrid items={data?.data.items ?? []} />
  </div>
}