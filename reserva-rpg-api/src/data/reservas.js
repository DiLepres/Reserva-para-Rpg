let reservas = [];
let proximoId = 1;

export function listarReservas() {
  return reservas;
}

export function buscarReservaPorId(id) {
  return reservas.find((r) => r.id === id);
}

export function criarReserva(dados) {
  const nova = {
    id: proximoId++,
    salaId: dados.salaId,
    data: dados.data,
    horarioInicio: dados.horarioInicio || null,
    horarioFim: dados.horarioFim || null,
    itensComida: dados.itensComida || [],
    especificacoesEntrega: dados.especificacoesEntrega || '',
    formaPagamento: dados.formaPagamento || null,
    banco: dados.banco || null,
    valorTotal: dados.valorTotal,
    status: 'confirmada',
    criadaEm: new Date().toISOString(),
  };
  reservas.push(nova);
  return nova;
}

export function atualizarReserva(id, dados) {
  const reserva = buscarReservaPorId(id);
  if (!reserva) return null;
  Object.assign(reserva, dados);
  return reserva;
}

export function excluirReserva(id) {
  const indice = reservas.findIndex((r) => r.id === id);
  if (indice === -1) return false;
  reservas.splice(indice, 1);
  return true;
}