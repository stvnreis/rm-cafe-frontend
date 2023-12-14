import { Api } from "@/lib/axios"
import { TApiResponse, TComentario, TProduto } from "@/types"
import { Button, Card, CardBody, Image, useDisclosure } from "@nextui-org/react"
import { brlMoney } from "@/helpers/money/brlMoney"
import { ComentarioWrapper } from "@/components/comentarios/ComentarioWrapper"
import { useState } from "react"
import { getPassword, getUser } from "../../activeUser"
import { useQuery } from "@tanstack/react-query"
import { ProdutoWrapper } from "./components/ProdutoWrapper"

const coments: TComentario[] = [
  {
    pessoa: {
      nome: 'Steven',
      fotoUrl: 'aaaa.com.br'
    },
    comentario: 'Um ótimo produto para se adiquirir'
  },
  {
    pessoa: {
      nome: 'Steven',
      fotoUrl: 'aaaa.com.br'
    },
    comentario: 'Um ótimo produto para se adiquirir'
  },
  {
    pessoa: {
      nome: 'Steven',
      fotoUrl: 'aaaa.com.br'
    },
    comentario: 'Um ótimo produto para se adiquirir'
  },
  {
    pessoa: {
      nome: 'Steven',
      fotoUrl: 'aaaa.com.br'
    },
    comentario: 'Um ótimo produto para se adiquirir'
  },
  {
    pessoa: {
      nome: 'Steven',
      fotoUrl: 'aaaa.com.br'
    },
    comentario: 'Um ótimo produto para se adiquirir'
  },
  {
    pessoa: {
      nome: 'Steven',
      fotoUrl: 'aaaa.com.br'
    },
    comentario: 'Um ótimo produto para se adiquirir'
  }
]

export default async function ProdutoPage({ params: { id } }: { params: { id: number } }) {
  const data = await getData(id)
  // const handleSave = (comentario: string) => {
  //   setComentarios([...comentarios, { pessoa: { nome: 'steven', fotoUrl: 'aaaa.com.br' }, comentario }])
    
  //   onClose()
  // }

  // if (isLoading) return <div>carregando</div>
  
  // if (isError) return <div>{errorMessage}</div>

  return <div className="bg-primary rounded-lg opacity-80 mx-5 p-10 h-fit text-white gap-20">
    <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between gap-10">
      <ProdutoWrapper produto={data.data} />
      {/* <div className="mt-10">
          <ComentarioWrapper
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            handleSave={handleSave}
            comentarios={comentarios}
          />
      </div> */}
    </div>
  </div>
}

async function getData(idProduto: number): Promise<TApiResponse<TProduto>> {
  const { data } = await Api.get(`api/produtos/${idProduto}`)
  
  return data
}