'use client'

import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from "@nextui-org/react"
import { TProduto } from "@/types"
import { EditIcon, Trash } from "lucide-react"
import React, { ReactNode, useState } from "react"
import { brlMoney } from "@/helpers/money/brlMoney"
import { enqueueSnackbar } from "notistack"
import { Api } from "../../../../lib/axios"
import { getUser, getPassword } from "../../../activeUser"
import Link from "next/link"

const columns = [
  { name: "NOME", uid: "nome" },
  { name: "QUANTIDADE", uid: "quantidade" },
  { name: "VALOR", uid: "valor" },
  { name: "AÇÕES", uid: "ações" },
]

export type TabelaProdutosProps = {
  produtos?: TProduto[]
}

export const TabelaProdutos = ({ produtos }: TabelaProdutosProps) => {
  const [isPending, setIsPending] = useState(false)
  const renderCell = React.useCallback((produto: TProduto, columnKey: React.Key): ReactNode => {
    const cellValue = produto[columnKey as keyof TProduto];

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
      } catch (err: any) {
        enqueueSnackbar(err.response.data.message, {variant: 'error', autoHideDuration: 2000})
      } finally {
        setIsPending(false)
      }
    }

    switch (columnKey) {
      case "nome":
        return (
          <User
            avatarProps={{radius: "lg", src: produto.fotoUrl ?? ''}}
            description={produto.descricao}
            name={cellValue as ReactNode}
          >
            {produto.descricao}
          </User>
        );
      case "quantidade":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{produto.quantidade}</p>
          </div>
        );
      case "valor":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{brlMoney(produto.valor)}</p>
          </div>
        );
      case "ações":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar produto">
              <Link className="text-lg text-default-400 cursor-pointer active:opacity-50" href={`/admin/produtos/form/${produto.id}`}>
                <EditIcon />
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="Deletar produto">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Trash onClick={() => handleDelete(produto.id)} />
              </span>
            </Tooltip>
          </div>
        );
      // default:
      //   return cellValue;
    }
  }, []);

  return <Table
    classNames={{
      wrapper: 'h-[25rem]',
    }}
    aria-label="Tabela de Produtos"
    isCompact={false}
    // isStriped
    color="primary"
    radius="lg"
  >
    <TableHeader columns={columns} >
      {
        (column) => (
          <TableColumn key={column.uid} align={column.uid === "quantidade" ? "center": "start"} >
            {column.name}
          </TableColumn>
        )
      }
    </TableHeader>
    <TableBody
      items={produtos ?? []}
      isLoading={isPending}
      loadingContent={<Spinner label={'Carregando...'} color="primary" />}
    >
      {
        (produto) => (
          <TableRow key={produto.id} >
            {(columnKey) => <TableCell>{renderCell(produto, columnKey)}</TableCell>}
          </TableRow>
        )
      }
    </TableBody>
  </Table>
}