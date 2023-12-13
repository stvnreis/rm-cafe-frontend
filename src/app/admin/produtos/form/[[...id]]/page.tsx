'use client'

import { TProduto, TProdutosForm } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ProdutosForm } from "./components/ProdutosForm";
import { ChangeEvent, useState } from "react";
import { useSnackbar } from "notistack";
import { Api } from "@/app/lib/axios";
import { useRouter } from "next/navigation";
import { getPassword, getUser } from "@/app/activeUser";

export default function ProdutoFormPage({ params: { id } }: TProdutosForm) { 
  const router = useRouter()
  const [produto, setProduto] = useState<TProduto>()
  const [isFetching, setIsFetching] = useState(false)

  const {enqueueSnackbar} = useSnackbar()

  const hasId = id && id[0] ? true : false
  
  const handleFormEdit = (event: ChangeEvent<HTMLInputElement>, name: string) => {
    setProduto({
      ...produto as TProduto,
      [name]: event.target.value,
    })
  }

  const {data, isLoading} = useQuery({
    queryKey: ['fetchProdutos'],
    enabled: hasId,
    queryFn: async () => {
      const { data } = await Api.get(`api/produtos/${id}`, {
        headers: {
          "Content-Type": "Application/json",
          user: getUser(),
          password: getPassword(),
        },
      })

      setProduto(data.data)
    }
  })

  const handleSubmit = async (values: TProduto) => {
    try {
      setIsFetching(true)
      const { data } =
        hasId ?
          await Api.patch(`api/produtos/${values.id}`) : await Api.post(`api/produtos`)
      
      console.log(data)

      hasId ? router.refresh() : router.push(`/produtos/form/${data.data.id}`)

      enqueueSnackbar(data.message, {variant: 'success'})
    } catch (error) {
      enqueueSnackbar('Erro ao cadastrar prato', {variant: 'error'})
    } finally {
      setIsFetching(false)
    }
  }

  return <ProdutosForm
    data={produto}
    onSubmit={handleSubmit}
    onEdit={handleFormEdit}
    id={hasId ? id[0] : null}
    isFetching={isFetching}
    isPending={isLoading}
  />
}