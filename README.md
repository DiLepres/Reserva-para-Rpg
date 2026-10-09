# Reserva RPG

Sistema de reserva de salas para jogos de mesa e RPG em um estabelecimento real, com opções de sala por qualidade (Normal/VIP) e número de pessoas, e possibilidade de encomendar comida antes da sessão — do próprio estabelecimento ou de restaurantes parceiros.

## Integrantes
- Diogo Lepre Pontes
- Ricardo Gentil Gomes Filho
- Ryan Toledo de Oliveira
- Daniel Gonçalves de Oliveira Crispino

## Objetivo

Este é o Projeto Evolutivo (N1) da matéria de Programação para Sistemas Web. O objetivo é construir um sistema completo de reservas de salas temáticas para RPG e jogos de mesa, com frontend em React + TypeScript e uma API própria em Node.js/Fastify, consumida pelo frontend para o fluxo completo de criar, listar, editar e excluir reservas.

## Funcionalidades

- Listagem de salas com filtro por tipo de sala e capacidade.
- Login mockado, necessário para concluir o pagamento.
- Encomenda de comida do próprio estabelecimento ou de restaurantes parceiros fictícios, com cardápio consultado em tempo real na API pública [TheMealDB](https://www.themealdb.com/api.php).
- Página de pagamento com escolha entre Pix ou transferência bancária.
- Tela de confirmação que salva a reserva de verdade na API própria.
- Página "Minhas Reservas", com listagem, edição e exclusão de reservas via API própria.

## Arquitetura

O projeto é dividido em duas partes, que rodam separadamente e precisam estar ativas ao mesmo tempo:

- **`reserva-rpg/`** — Frontend em React + TypeScript + Vite (porta `5173`).
- **`reserva-rpg-api/`** — Backend (API própria) em Node.js + Fastify (porta `3001`), responsável pelo CRUD de reservas.

## Como instalar e executar

### 1. Backend (API) — `reserva-rpg-api`

1. No terminal, entre na pasta do backend: `cd reserva-rpg-api`.
2. Instale as dependências: `npm install`.
3. Inicie o servidor: `npm run dev`.
4. O servidor vai rodar em `http://localhost:3001`. Deixe este terminal aberto.

### 2. Frontend — `reserva-rpg`

1. Abra um **novo terminal** (mantendo o do backend rodando) e entre na pasta do frontend: `cd reserva-rpg`.
2. Instale as dependências: `npm install`.
3. Inicie o servidor: `npm run dev`.
4. Abra o link que aparecer no terminal (geralmente `http://localhost:5173`) no navegador.