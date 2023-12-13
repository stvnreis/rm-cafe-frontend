'use client'

import { getCookie } from "cookies-next"
import { useQuery } from "@tanstack/react-query"
import { TApiResponse, TProduto } from "@/types"
import { TabelaProdutos } from "@/app/admin/produtos/components/TabelaProdutos"
import { Button } from "@nextui-org/react"
import { PlusIcon } from "@/components/icons/PlusIcon"
import { useRouter } from "next/navigation"
import { useSnackbar } from "notistack"
import { Api } from "../../lib/axios"
import { useState } from "react"
import { getPassword, getUser } from "../../activeUser"

export default function Page() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [isPending, setIsPending] = useState(false)
  const [tableMessage, setTableMessage] = useState('')

  const handleRouting = (id?: number) => {
    router.push(`produtos/form/${id ?? ''}`)
  }

  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: ['fetchProdutos'],
    retry: 0,
    queryFn: async () => {
      try {
        const { data } = await Api.get<TApiResponse<TProduto[]>>('api/produtos')

        return data
      } catch (err: any) {
        setTableMessage(err.response.data.message)
      }
      
    }
  })  

  const handleDelete = async (id: number) => {
    try {
      setIsPending(true)
      const { data } = await Api.delete(`/api/produtos/${id}`,{
        headers: {
          user: getUser(),
          password: getPassword(),
        }
      })

      enqueueSnackbar(data.message as string, { variant: 'success', autoHideDuration: 2000 })
      refetch()
    } catch (err: any) {
      enqueueSnackbar(err.response.data.message, {variant: 'error', autoHideDuration: 2000})
    }finally{setIsPending(false)}
  }
  
  return <div className="w-full gap-3 mt-10">
    <div className="flex justify-end mb-3 mr-3 text-white">
      <Button
        radius="md"
        color="primary"
        endContent={<PlusIcon />}
        onClick={() => handleRouting()}
      >
        Adicionar
      </Button>
    </div>
    <TabelaProdutos
      produtos={data?.data}
      isLoading={isLoading}
      isPending={isPending}
      errorMessage={tableMessage}
      handleRouting={handleRouting}
      onDelete={handleDelete}
      loadingMessage={isLoading ? 'Carregando Produtos...' : isPending ? 'Removendo Produto' : ''}
    />
  </div>
}
