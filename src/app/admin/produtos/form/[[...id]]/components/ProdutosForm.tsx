import { TForm, TProduto } from "@/types"
import { Button, Input } from "@nextui-org/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProdutoFormSchema } from "@/lib/validations/ProdutosForm"
import { z } from "zod"

export const ProdutosForm = ({
  id,
  data,
  isFetching,
  onSubmit,
  onEdit,
}: TForm<TProduto>) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<z.infer<typeof ProdutoFormSchema>>({
    resolver: zodResolver(ProdutoFormSchema)
  })

  useEffect(() => reset(data), [data])

  return <div
    className="bg-primary opacity-80 mt-10 mx-5 p-10 rounded-lg flex flex-col gap-10"
    // onSubmit={handleSubmit(onSubmit)}
  >
    <div className="flex gap-5 justify-around">
        <Image
          src={data?.id && data?.fotoUrl ? data.fotoUrl : ''}
          alt="imagem produto"
          width={500}
          height={500}
          className="rounded-lg"
        />
      <div className="flex flex-col gap-10">
        <div className="flex gap-4">
          <Input
            isReadOnly
            isDisabled
            label="Código"
            variant="faded"
            readOnly
            value={data && data.id ? data?.id.toString() : ''}
            size="lg"
            classNames={{
              inputWrapper: 'border-white text-white'
            }}
          />
          <Input
            isDisabled={isFetching}
            label="Descrição"
            variant="faded"
            color="default"
            value={data?.descricao}
            onChange={(e) => onEdit(e, 'descricao')}
            size="lg"
            isRequired
            classNames={{
              inputWrapper: 'border-white text-white'
            }}
          />
          <Input
            isDisabled={isFetching}
            label="Quantidade em Estoque"
            variant="faded"
            color="default"
            type="number"
            value={data?.quantidade ? data.quantidade.toString() : ''}
            onChange={(e) => onEdit(e, 'quantidade')}
            size="lg"
            isRequired
            classNames={{
              inputWrapper: 'border-white text-white'
            }}
          />
        </div>
        <div className="flex gap-4">
          <Input
            isDisabled={isFetching}
            label="Url da Imagem"
            variant="faded"
            color="default"
            value={data?.fotoUrl ?? ''}
            onChange={(e) => onEdit(e, 'fotoUrl')}
            size="lg"
            isRequired
            classNames={{
              inputWrapper: 'border-white text-white'
            }}
          />
          <Input
            isDisabled={isFetching}
            label="Valor Unitário"
            variant="faded"
            color="default"
            classNames={{
              inputWrapper: 'border-white text-white'
            }}
            value={data?.valor ? data.valor.toString() : ''}
            onChange={(e) => onEdit(e, 'valor')}
            prefix="R$ "
            size="lg"
            isRequired
          />
          <Input
            isDisabled={isFetching}
            label="Código do Fornecedor"
            variant="faded"
            color="default"
            classNames={{
              inputWrapper: 'border-white text-white'
            }}
            value={data && data.idFornecedor ? data?.idFornecedor.toString() : ''}
            onChange={(e) => onEdit(e, 'idFornecedor')}
            size="lg"
            isRequired
          />
        </div>
      </div>
      
    </div>
    <div className="w-full flex justify-end">
      <Button
        color="default"
        radius="md"
        onClick={() => onSubmit(data!)}
        isLoading={isFetching}
      >
        Salvar
      </Button>
    </div>
  </div>
}