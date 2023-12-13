'use client'

import { enqueueSnackbar } from "notistack"
import { TApiResponse, TProduto } from "../../../types"
import { cartItems, addItemToCart } from "../../activeCart"
import { Api } from "../../lib/axios"
import { ProdutoCard } from "./components/ProdutoCard"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"


export default function MenuPage() {
  const [errorMessage, setErrorMessage] = useState('')

  const {data, isLoading, isError} = useQuery({
    queryKey: ['fetchProdutosFromMenu'],
    retry: 0,
    queryFn: async () => {
      try {
        const { data } = await Api.get<TApiResponse<TProduto[]>>('api/produtos')

        return data
      } catch (err: any) {
        setErrorMessage(err.response.data.message)
      }
    }
  })

  const handleClick = (e: MouseEvent, produto: TProduto) => {
    e.preventDefault()
    console.log(cartItems)
    addItemToCart(produto)

    enqueueSnackbar(`${produto.descricao} adicionado ao carrinho!`, {variant:'success', autoHideDuration: 2500})
  }

  return <main className="w-full mt-10 p-10 gap-10 flex flex-col justify-between items-center bg-primary opacity-80 rounded-lg text-white">
    {/* {isLoading && <div className="flex flex-col w-full justify-center items-center">
      <Spinner color="default" />
      Carregando Produtos do cardápio...
    </div>
    }
    {isError && <div>{errorMessage}</div>} */}
    <div>Produtos destaques</div>
    <div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        {Array.isArray(data?.data) && data?.data.map((produto) => <ProdutoCard
        item={produto}
        key={produto.descricao}
        handleClick={handleClick}
        />)}
      </div>
    </div>
    
  </main>
}