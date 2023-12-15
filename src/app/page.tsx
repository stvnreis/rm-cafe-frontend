import { TApiResponse, TProdutoCategoria, TProdutoWithRelations } from "../types"
import { Api } from "../lib/axios"

import { ProdutoSwiper } from "./components/produto-swiper/ProdutoSwiper"

export default async function MenuPage() {
  const { data } = await getProdutosWithRelations()
  const getCategoriasResponse = await getCategorias()

  const categorias = getCategoriasResponse.data;
  const produtosNovidade = data.filter((produto) => produto.eNovidade)

  return <main className="w-full mt-10 p-10 gap-10 flex flex-col justify-between items-center bg-primary opacity-80 rounded-lg text-white">
    {produtosNovidade.length && <div className="flex flex-col gap-5 items-center w-full">
      <h1 className="text-xl font-bold">Confira todas as novidades:</h1>
      <div className="w-full">
        <ProdutoSwiper produtos={produtosNovidade} />
      </div>
    </div>}
    <div className="flex flex-col gap-10 w-full">
      <>
        {categorias.map((categoria) => {
          const produtos = data.filter((produto) => produto.produtoCategoria.id === categoria.id)

          return <div className="w-full" key={categoria.id}>
            <h1 className="text-xl font-bold">{categoria.dsCategoria}</h1>
            <div className="w-full mt-3">
              <ProdutoSwiper produtos={produtos} key={`${categoria.dsCategoria}`} />
            </div>
          </div>
        })}
      </>
    </div>
  </main>
}

async function getCategorias(): Promise<TApiResponse<TProdutoCategoria[]>>{
  const { data } = await Api.get<TApiResponse<TProdutoCategoria[]>>('api/categorias')
  
  return data
}

async function getProdutosWithRelations(): Promise<TApiResponse<TProdutoWithRelations[]>>{
  const { data } = await Api.get<TApiResponse<TProdutoWithRelations[]>>('api/produtos', {
    params: {
      relations: true
    }
  })
 
  return data
}