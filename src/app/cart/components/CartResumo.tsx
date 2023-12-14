import { Card, CardBody, Divider, Button } from "@nextui-org/react"
import { brlMoney } from "@/helpers/money/brlMoney"
import { sumArray } from "@/helpers/sumArray"
import { cartItemsProps } from "../../activeCart"

export type CartResumoProps = {
  items: cartItemsProps[]
  isLoading: boolean
  onSave(): void
}

export const CartResumo = ({items, isLoading, onSave}: CartResumoProps) => {
  return <Card className="h-32 w-72 absolute right-10 top-1/3">
    <CardBody>
      <div className="h-full flex flex-col justify-around">
          <span className="flex flex-col w-full items-center justify-center">
          Valor Total do Pedido: {brlMoney(sumArray(items.map((item) => item.produto.valor * item.quantidade)))}
          <Divider className="w-full bg-black" />
        </span>
        <Button
          color="default"
          onClick={() => onSave()}
          isLoading={isLoading}
        >
          Finalizar venda
        </Button>
      </div>
    </CardBody>
  </Card>  
}