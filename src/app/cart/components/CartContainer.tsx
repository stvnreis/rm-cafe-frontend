import { CartItem } from "./CartItem"
import { cartItemsProps } from "../../activeCart"
import { Button, Card, CardBody, Divider } from "@nextui-org/react"
import { sumArray } from "@/helpers/sumArray"
import { brlMoney } from "@/helpers/money/brlMoney"
import { useSnackbar } from "notistack"
import { CartResumo } from "./CartResumo"

export type CartContainerProps = {
  items: cartItemsProps[]
  isLoading: boolean
  handleSubmit: () => void
  onRemove: (idProduto: number) => void
}

export const CartContainer = ({ items, isLoading, handleSubmit, onRemove }: CartContainerProps) => {
  const { enqueueSnackbar } = useSnackbar()
  
  const handleRemove = (idProduto: number) => {
    onRemove(idProduto)

    enqueueSnackbar('Produto removido do carrinho com sucesso!', {
      variant: 'success',
      autoHideDuration: 2000
    })
  }

  return <div className="w-full px-10">
    <div className="grid grid-cols-1 gap-3 w-fit">
      {items.length > 0 && items.map((item) => <CartItem item={item} key={`${item.produto.descricao}-${item.quantidade}`} onRemove={handleRemove} />)}
    </div>
    <CartResumo items={items} isLoading={isLoading} onSave={handleSubmit} />
    </div>
}