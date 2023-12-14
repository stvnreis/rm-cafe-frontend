'use client'

import { Swiper, SwiperSlide } from "swiper/react"
import { TProduto, TProdutoWithRelations } from "@/types"
import { ProdutoCard } from "../ProdutoCard"
import { Navigation } from "swiper/modules"

import 'swiper/css'
import 'swiper/css/navigation'

export type ProdutoSwiperProps = {
  produtos: TProduto[] | TProdutoWithRelations[]
}

export const ProdutoSwiper = ({ produtos }: ProdutoSwiperProps) => {
  return <>
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={15}
      slidesPerView={window.innerWidth >= 300 && window.innerWidth < 500 ? 2 : window.innerWidth >= 500 && window.innerWidth < 800 ? 3 : 5}
    >
      {produtos.map((produto) => <SwiperSlide key={produto.descricao}>
        <ProdutoCard
          item={produto}
          key={produto.descricao}
        />
      </SwiperSlide>)}
    </Swiper>
  </>
}