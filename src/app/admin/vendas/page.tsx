'use client'

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { TApiResponse, TVenda } from "../../../types"
import { getUser, getPassword } from "../../activeUser"
import { Api } from "../../../lib/axios"
import { TabelaVendas } from "./components/TabelaVendas"


export default function VendasPage() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  const handleRouting = (id: number) => {
    router.push(`/vendas/${id}`)
  }

  const {data, isLoading, isError} = useQuery({
    queryKey: ['fetchVendaFromMenu'],
    retry: 0,
    queryFn: async () => {
      try {
        const { data } = await Api.get('api/vendas', {
          headers: {
            "Content-Type": "Application/json",
            user: getUser(),
            password: getPassword(),
          }
        })

        return data as TApiResponse<TVenda[]>
      } catch (err: any) {
        setErrorMessage(err.response.data.message)
      }
      
    }
  })
  
  return <div>
    <TabelaVendas
      vendas={data?.data}
      handleRouting={handleRouting}
      loadingMessage="Carregando Vendas..."
      isLoading={isLoading}
      errorMessage={errorMessage} />
  </div>
}