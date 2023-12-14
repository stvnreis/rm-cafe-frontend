'use client'

import { TProduto, TProdutoWithRelations } from "../types";

export type cartItemsProps = {
  produto: TProduto | TProdutoWithRelations
  quantidade: number
}

export let cartItems: cartItemsProps[] = []

export const addItemToCart = (produto: TProduto | TProdutoWithRelations, quantidade?: number): void => {
  const item = cartItems.find((itemInCart) => itemInCart.produto.id === produto.id)
  if (item) item.quantidade += quantidade ?? 1
  
  else cartItems.push({produto, quantidade: quantidade ?? 1})
}

export const setCartItems = (items: cartItemsProps[]) => {
  clearCart()
  cartItems = [...items]
}

export const clearCart = (): void => {
  cartItems = []
}