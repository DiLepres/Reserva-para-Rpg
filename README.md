# Reserva RPG

Sistema de reserva de salas para jogos de mesa e RPG em um estabelecimento real, com opções de sala por qualidade (Normal/VIP) e número de pessoas, e possibilidade de encomendar comida antes da sessão — do próprio estabelecimento ou de restaurantes parceiros.

## Integrantes
- Diogo Lepre Pontes
- Ricardo Gentil Filho
- Ryan Toledo de Oliveira

## Objetivo

Este projeto é a primeira entrega (Checkpoint 1) do projeto evolutivo da disciplina Programação para Sistemas Web. O objetivo é construir uma base de frontend real e organizada, simulando um sistema de reservas de salas temáticas para RPG e jogos de mesa, que será evoluída nas próximas etapas da disciplina com a adição de um backend em Node.js e Fastify.

## Funcionalidades

- Listagem de salas com filtro por tipo (Normal/VIP) e capacidade
- Detalhes da sala com escolha de data e horário (ou reserva do dia inteiro, no caso do Salão)
- Login mockado, necessário para concluir o pagamento
- Encomenda de comida do próprio estabelecimento (separada em Comidas e Bebidas) ou de restaurantes parceiros fictícios, com cardápio consultado em tempo real na API pública [TheMealDB](https://www.themealdb.com/api.php)
- Página de pagamento com escolha entre Pix (chave gerada automaticamente) ou transferência bancária
- Tela de confirmação com o resumo completo da reserva


## Como instalar e executar

1. Clone o repositório ou baixe os arquivos e abra a pasta no Visual Studio Code.
2. No terminal, entre na pasta do projeto: cd reserva-rpg.
3. Instale as dependências caso necessario: npm install
3. Abra o servidor digitando no terminal: npm run dev.
4. Abrar o link que aparecer no terminal no navegador da sua escolha.

### Login de teste
- **Usuário:** admin
- **Senha:** 1234