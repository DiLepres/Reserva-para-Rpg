import Fastify from 'fastify';
import cors from '@fastify/cors';
import rotasReservas from './src/routes/reservas.js';

const fastify = Fastify({ logger: true });

await fastify.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

fastify.get('/health', async () => {
  return { status: 'ok' };
});

await fastify.register(rotasReservas);

fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});