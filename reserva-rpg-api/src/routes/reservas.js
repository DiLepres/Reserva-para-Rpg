import {
  listarReservas,
  buscarReservaPorId,
  criarReserva,
  atualizarReserva,
  excluirReserva,
} from '../data/reservas.js';

export default async function rotasReservas(fastify) {
  fastify.get('/reservas', async () => {
    return listarReservas();
  });

  fastify.get('/reservas/:id', async (request, reply) => {
    const id = Number(request.params.id);
    const reserva = buscarReservaPorId(id);
    if (!reserva) {
      return reply.status(404).send({ erro: 'Reserva não encontrada.' });
    }
    return reserva;
  });

  fastify.post('/reservas', async (request, reply) => {
    const { salaId, data, valorTotal } = request.body || {};
    if (!salaId || !data || valorTotal === undefined) {
      return reply.status(400).send({ erro: 'Campos obrigatórios: salaId, data e valorTotal.' });
    }
    const novaReserva = criarReserva(request.body);
    return reply.status(201).send(novaReserva);
  });

  fastify.put('/reservas/:id', async (request, reply) => {
    const id = Number(request.params.id);
    const reservaAtualizada = atualizarReserva(id, request.body || {});
    if (!reservaAtualizada) {
      return reply.status(404).send({ erro: 'Reserva não encontrada.' });
    }
    return reservaAtualizada;
  });

  fastify.delete('/reservas/:id', async (request, reply) => {
    const id = Number(request.params.id);
    const sucesso = excluirReserva(id);
    if (!sucesso) {
      return reply.status(404).send({ erro: 'Reserva não encontrada.' });
    }
    return reply.status(204).send();
  });
}