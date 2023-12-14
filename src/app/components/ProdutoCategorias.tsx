import { Checkbox, CheckboxGroup } from "@nextui-org/react"

export type ProdutoCategoriasProps = {
  handleClick: (value: string) => void
}

export const ProdutoCategorias = ({handleClick}: ProdutoCategoriasProps) => {
  return <CheckboxGroup>
    <Checkbox color="default" value="Bebidas" onClick={() => handleClick('Bebidas')}>Bebidas</Checkbox>
    <Checkbox color="default" value="Lanches" onClick={() => handleClick('Lanches')}>Lanches</Checkbox>
    <Checkbox color="default" value="Fitness" onClick={() => handleClick('Fitness')}>Fitness</Checkbox>
  </CheckboxGroup>
}