export type TipoSala = 'normal' | 'vip';
export type Capacidade = 6 | 8 | 10 | 'salao';
export type UnidadePreco = 'hora' | 'dia';

export interface Sala {
  id: string;
  capacidade: Capacidade;
  tipo: TipoSala;
  preco: number;
  unidadePreco: UnidadePreco;
}

export type CategoriaItem = 'comida' | 'bebida';

export interface ItemComida {
  id: string;
  nome: string;
  preco: number;
  origem: 'proprio' | 'externo';
  categoria?: CategoriaItem;
}