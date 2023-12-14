import { TApiResponse, TProduto } from "@/types"
import { TabelaProdutos } from "@/app/admin/produtos/components/TabelaProdutos"
import { Button } from "@nextui-org/react"
import { PlusIcon } from "@/components/icons/PlusIcon"
import Link from "next/link"
import { Api } from "@/lib/axios"

export default async function Page() {
  const data = await fetchProdutos()

  return <div className="w-full gap-3 mt-10">
    <div className="flex justify-end mb-3 mr-3 text-white">
      <Link href='admin/produtos/form'>
        <Button
          radius="md"
          color="primary"
          endContent={<PlusIcon />}
        >
          Adicionar
        </Button>
      </Link>
    </div>
    <TabelaProdutos
      produtos={data?.data}
    />
  </div>
}

export async function fetchProdutos(): Promise<TApiResponse<TProduto[]>>{
  const { data } = await Api.get('api/produtos')
  
  return data
}