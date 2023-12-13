import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from "@nextui-org/react"
import { EyeIcon } from "lucide-react"
import React from "react"
import { TVenda } from "@/types"
import { brlDate } from "@/helpers/date/brlDate"
import { brlMoney } from "@/helpers/money/brlMoney"

const columns = [
  { name: 'CÓDIGO DA VENDA', uid: 'idvenda'},
  { name: "DATA E HORA DA VENDA", uid: "datahora" },
  { name: "VENDEDOR", uid: "vendedor" },
  { name: "VALOR TOTAL", uid: "valorTotal" },
  { name: "AÇÕES", uid: "ações" },
]

export type MainTableVendaProps = {
  vendas?: TVenda[]
  isLoading: boolean
  errorMessage: string
  loadingMessage?: string
  handleRouting: (id: number) => void
}

type TVendaRender = {
  id: number;
  valorTotal: number;
  venHorario: string;
  idFuncionario: number;
  nomeFuncionario: string;
}

export const TabelaVendas = ({ vendas, isLoading, loadingMessage, errorMessage, handleRouting }: MainTableVendaProps) => {
  const renderCell = React.useCallback((venda: TVenda, columnKey: React.Key) => {
    const cellValue = venda[columnKey as keyof TVenda];

    switch (columnKey) {
      case "idvenda":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{venda.id}</p>
          </div>
        );
      case "datahora":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{brlDate(new Date(venda.venHorario))}</p>
          </div>
        );
      case "vendedor":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{venda.funcionario.nome ?? ''}</p>
          </div>
        );
      case "valorTotal":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{brlMoney(venda?.valorTotal)}</p>
          </div>
        );
      case "ações":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Visualizar venda">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon onClick={() => handleRouting(venda.id)} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, [handleRouting]);

  return <Table
    classNames={{
      wrapper: 'h-[33rem]'
    }}
    aria-label="Tabela de Produtos"
    isCompact={false}
    color="primary"
    radius="none"
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
      items={vendas ?? []}
      isLoading={isLoading}
      emptyContent={errorMessage}
      loadingContent={<Spinner label={loadingMessage ?? 'Carregando...'} color="primary" />}
    >
      {
        (venda) => (
          <TableRow key={venda.id} >
            {(columnKey) => <TableCell>
              {!isLoading && (venda && venda.funcionario) ? renderCell(venda, columnKey) : ''}
            </TableCell>
            }
          </TableRow>
        )
      }
    </TableBody>
  </Table>
}