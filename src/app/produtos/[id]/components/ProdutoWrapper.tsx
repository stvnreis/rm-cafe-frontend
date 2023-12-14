'use client'

import { TProduto } from "@/types"
import { Card, CardBody, Button } from "@nextui-org/react"
import Image from "next/image"
import { brlMoney } from "@/helpers/money/brlMoney"
import { useSnackbar } from "notistack"
import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { addItemToCart } from "../../../activeCart"
import { MouseEvent } from "react"

export type ProdutoWrapperProps = {
  produto: TProduto
}

export const ProdutoWrapper = ({ produto }: ProdutoWrapperProps) => {
  const [quantidade, setQuantidade] = useState(1)

  const {enqueueSnackbar} = useSnackbar()
  
  const handleQuantidade = (nome: string) => {
    const novaQuantidade = nome === 'adicionar' ? quantidade + 1 : quantidade > 1 ? quantidade - 1 : quantidade

    setQuantidade(novaQuantidade)
  }
  
  const handleAddCartItem = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()

    enqueueSnackbar(`${produto.descricao} adicionado ao carrinho com sucesso!`, {
      variant: 'success',
      autoHideDuration: 2500
    })

    addItemToCart(produto, quantidade)
  }

  return <>
    <div className="w-fit h-fit">
        <Image
          src={produto!.fotoUrl}
          width={300}
          height={300}
          alt="Imagem produto"
        />
      </div>
      <div className="flex flex-col items-center gap-5 text-3xl">
        <h3 className="font-bold">{produto?.descricao}</h3>
        <span>{`${brlMoney(produto?.valor)}/un`}</span>
      </div>
      <div>
        <Card className="w-52 h-52 md:w-60 md:h-80" shadow="lg">
          <CardBody className="flex flex-col items-center justify-between">
          <span
            className="font-bold text-xs md:text-sm"
          >
            Quantidade em Estoque: {produto?.quantidade}
          </span>
          <div className="flex gap-3 items-center">
            Quantidade: 
            <span
              className="hover:cursor-pointer"
              onClick={() => handleQuantidade('remover')}
            >
              <Minus size={20} />
            </span>
            <span>{quantidade}</span>
            <span
              className="hover:cursor-pointer"
              onClick={() => handleQuantidade('adicionar')}
            >
              <Plus size={20} />
            </span>
          </div>
          <Button
            onClick={(e) => handleAddCartItem(e)}
          >
            Adicionar ao carrinho
          </Button>
          </CardBody>
        </Card>
      </div>    
  </>
}