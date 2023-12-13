import { Divider } from "@nextui-org/react";
import { brlMoney } from "@/helpers/money/brlMoney";

export type ProdutosGridProps = {
  items: {
    idItemVenda: number;
    idProduto: number;
    descricao: string;
    quantidade: number;
    valorUnitario: number;
  }[]
}

export const ProdutosGrid = ({ items }: ProdutosGridProps) => {
  return <div className="py-5 px-3 bg-white rounded-lg text-black">
    <div className="grid grid-cols-6">
      <span className="text-lg">Código do Produto</span>
      <span className="text-lg col-span-2">Descrição</span>
      <span className="text-lg text-right">Valor Unitário</span>
      <span className="text-lg text-right">Quantidade Vendida</span>
      <span className="text-lg text-right">Valor Total</span>
    </div>
    <Divider className="w-full bg-black my-5" />
    {items.map((item) => <div
      key={item.descricao}
      className="grid grid-cols-6"
    >
      <span>{item.idProduto}</span>
      <span className="col-span-2">{item.descricao}</span>
      <span className="text-right">{brlMoney(item.valorUnitario)}</span>
      <span className="text-right">{item.quantidade}</span>
      <span className="text-right">{brlMoney(item.valorUnitario * item.quantidade)}</span>
    </div>)}
  </div>
}