'use client'

import { cartItems, cartItemsProps, clearCart, setCartItems } from "../activeCart";
import { getCookie } from "cookies-next";
import { CartContainer } from "./components/CartContainer";
import { TVendaProdutoPostRequest } from "@/types";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { Api } from "../../lib/axios";
import { getPassword, getUser } from "../activeUser";

export default function CartPage() {  
  const [cart, setCart] = useState(cartItems)
  const { enqueueSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState(false)

  const removeItemFromCart = (idProduto: number) => {
    const items = cart.filter((item) => item.produto.id !== idProduto)
    setCart([...items])

    setCartItems(items)
  }

  const handleSell = async () => {
    try {
      setIsLoading(true)

      const {data} = await Api.post('api/vendas', {
        idFuncionario: Number(getCookie('idFuncionario')),
        produtos: toPostRequest(cartItems),
      },
        {
          headers: {
            user: getUser(),
            password: getPassword(),
          }
        }
      )

      enqueueSnackbar(data.message, {
        variant: 'success',
        autoHideDuration: 1500
      })

      clearCart(); setCart(cartItems)
    } catch (err: any) {
      console.log(err.response.data.message)
      enqueueSnackbar(err.response.data.message as string, {
        variant: 'error',
        autoHideDuration: 1500
      })
    } finally {
      setIsLoading(false)
    }
  }

  return <div>
    <CartContainer
      items={cart}
      handleSubmit={handleSell}
      isLoading={isLoading}
      onRemove={removeItemFromCart}
    />
  </div>
}

function toPostRequest(cartItems: cartItemsProps[]): TVendaProdutoPostRequest[] {
  return cartItems.map((item) => {
    return {
      id: item.produto.id,
      descricao: item.produto.descricao,
      valor: item.produto.valor,
      quantidade: item.quantidade,
    }
  })
}