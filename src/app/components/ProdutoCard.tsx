'use client'

import { Button, Card, CardBody, CardHeader } from "@nextui-org/react"
import Image from "next/image"
import { TProduto, TProdutoWithRelations } from "@/types";
import { brlMoney } from "@/helpers/money/brlMoney";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import { addItemToCart } from "../activeCart";
import { MouseEvent } from "react";

type ProdutoCardProps = {
  item: TProduto | TProdutoWithRelations
}

export const ProdutoCard = ({ item }: ProdutoCardProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, produto: TProduto | TProdutoWithRelations) => {
    e.preventDefault()
    addItemToCart(produto)

    enqueueSnackbar(`${produto.descricao} adicionado ao carrinho!`, {variant:'success', autoHideDuration: 2500})
  }
  
  return <Link href={`/produtos/${item.id}`}>
  <Card isHoverable shadow="lg" className="h-[20rem] w-[12rem] md:w-[15rem]">
    <CardHeader className="w-full h-1/2">
       <div className="w-full h-full relative">
          <Image
            src={item.fotoUrl ?? ''}
            alt={`Imagem de ${item.descricao}`}
            fill
            style={{ objectFit: 'cover', borderRadius: '10px' }}
          />
        </div>
    </CardHeader>
    <CardBody>
        <div className="flex flex-col justify-center items-center text-center w-full h-full">
          <label>{item.descricao}</label>
          <span className="text-sm">{brlMoney(item.valor)}/un</span>
          <Button
            variant='shadow'
            color="default"
            radius="sm"
            size="sm"
            className="text-black mt-3"
            onClick={(e) => handleClick(e, item)}>
            Adicionar ao carrinho
          </Button>
        </div>
    </CardBody>
    </Card>
  </Link> 
}