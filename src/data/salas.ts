import type { Sala } from '../types';

export const salas: Sala[] = [
  { id: '1', capacidade: 6, tipo: 'normal', preco: 30, unidadePreco: 'hora' },
  { id: '3', capacidade: 8, tipo: 'normal', preco: 35, unidadePreco: 'hora' },
  { id: '5', capacidade: 10, tipo: 'normal', preco: 40, unidadePreco: 'hora' },
  { id: '2', capacidade: 6, tipo: 'vip', preco: 50, unidadePreco: 'hora' },
  { id: '4', capacidade: 8, tipo: 'vip', preco: 55, unidadePreco: 'hora' },
  { id: '6', capacidade: 10, tipo: 'vip', preco: 60, unidadePreco: 'hora' },
  { id: '7', capacidade: 'salao', tipo: 'vip', preco: 300, unidadePreco: 'dia' },
];