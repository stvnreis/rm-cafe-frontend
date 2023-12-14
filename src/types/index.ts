import {ChangeEvent, SVGProps} from "react";

export type TApiResponse<T> = {
  data: T 
  message?: string
}

export type TProduto = {
  id: number;
  fotoUrl: string;
  descricao: string;
  valor: number;
  quantidade: number;
  idFornecedor: number;
  dhInclusao: Date;
  eNovidade: boolean;
}

export type TProdutoCategoria = {
  id: number;
  dsCategoria: string;
}

export type TProdutoWithRelations = {
  id: number;
  fotoUrl: string;
  descricao: string;
  valor: number;
  quantidade: number;
  produtoFornecedor: {
    id: number;
    descricao: string;
  };
  produtoCategoria: TProdutoCategoria;
  dhInclusao: Date;
  eNovidade: boolean;
}

export type TVenda = {
  id: number;
  valorTotal: number;
  venHorario: Date;
  funcionario: {
    id: number;
    nome: string;
  };
}

export type TVendaToFindOne = {
  id: number;
  valorTotal: number;
  venHorario: Date;
  funcionario: {
    id: number;
    nome: string;
  };
  items: {
    idItemVenda: number;
    idProduto: number;
    descricao: string;
    quantidade: number;
    valorUnitario: number;
  }[]
}

export type TComentario = {
  pessoa: {
    nome: string;
    fotoUrl: string;
  }
  comentario: string;
}

export type TProdutoPostRequest = {
  fotoUrl: string;
  descricao: string;
  valor: number;
  quantidade: number;
  idFornecedor: number;
}

export type TVendaProdutoPostRequest = {
  id: number;
  valor: number;
  quantidade: number;
  descricao: string;
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TProdutosForm = {
  params: {id: number[]}
}

export type TForm<T> = {
  id: number | null
  data?: T
  isFetching: boolean 
  isPending: boolean 
  onSubmit: (values: any) => void
  onEdit: (event: ChangeEvent<HTMLInputElement>, name: string) => void
}