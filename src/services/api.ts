const API_URL = 'http://localhost:3001';

export interface Reserva {
  id?: number;
  salaId: string;
  data: string;
  horarioInicio?: string | null;
  horarioFim?: string | null;
  itensComida?: string[];
  especificacoesEntrega?: string;
  formaPagamento?: string | null;
  banco?: string | null;
  valorTotal: number;
  status?: string;
  criadaEm?: string;
}

export async function listarReservas(): Promise<Reserva[]> {
  const response = await fetch(`${API_URL}/reservas`);
  if (!response.ok) {
    throw new Error('Erro ao buscar reservas.');
  }
  return response.json();
}

export async function buscarReserva(id: number): Promise<Reserva> {
  const response = await fetch(`${API_URL}/reservas/${id}`);
  if (!response.ok) {
    throw new Error('Reserva não encontrada.');
  }
  return response.json();
}

export async function criarReserva(dados: Reserva): Promise<Reserva> {
  const response = await fetch(`${API_URL}/reservas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar reserva.');
  }
  return response.json();
}

export async function atualizarReserva(id: number, dados: Partial<Reserva>): Promise<Reserva> {
  const response = await fetch(`${API_URL}/reservas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar reserva.');
  }
  return response.json();
}

export async function excluirReserva(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/reservas/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erro ao excluir reserva.');
  }
}