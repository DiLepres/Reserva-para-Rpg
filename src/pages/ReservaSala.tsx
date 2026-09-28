import { useState } from 'react';
import { Link } from 'react-router-dom';
import { salas } from '../data/salas';
import type { TipoSala } from '../types';

export default function ReservaSala() {
  const [filtroTipo, setFiltroTipo] = useState<TipoSala | 'todos'>('todos');
  const [filtroCapacidade, setFiltroCapacidade] = useState<string>('todas');

  const salasFiltradas = salas.filter((sala) => {
    const bateTipo = filtroTipo === 'todos' || sala.tipo === filtroTipo;
    const bateCapacidade = filtroCapacidade === 'todas' || String(sala.capacidade) === filtroCapacidade;
    return bateTipo && bateCapacidade;
  });

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <h1>Escolha a sala</h1>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value as TipoSala | 'todos')}>
          <option value="todos">Todos os tipos</option>
          <option value="normal">Normal</option>
          <option value="vip">VIP</option>
        </select>

        <select value={filtroCapacidade} onChange={(e) => setFiltroCapacidade(e.target.value)}>
          <option value="todas">Todas as capacidades</option>
          <option value="6">6 pessoas</option>
          <option value="8">8 pessoas</option>
          <option value="10">10 pessoas</option>
          <option value="salao">Salão</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        {salasFiltradas.map((sala) => (
          <div key={sala.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: '1rem', width: 220 }}>
            <h3>{sala.capacidade === 'salao' ? 'Salão' : `Sala para ${sala.capacidade} pessoas`}</h3>
            <p>Tipo: {sala.tipo === 'vip' ? 'VIP' : 'Normal'}</p>
            <p>R$ {sala.preco},00 {sala.unidadePreco === 'hora' ? '/ hora' : '(dia inteiro)'}</p>
            <Link to={`/reservar/${sala.id}`}><button>Selecionar</button></Link>
          </div>
        ))}
        {salasFiltradas.length === 0 && <p>Nenhuma sala encontrada com esse filtro.</p>}
      </div>

      <h2 style={{ marginTop: '3rem' }}>O que cada tipo de sala oferece</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
        <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: '1.5rem', width: 280, textAlign: 'left' }}>
          <h3 style={{ textAlign: 'center' }}>Normal</h3>
          <ul>
            <li>1 mesa grande</li>
            <li>Cadeiras conforme a capacidade da sala</li>
            <li>Isolamento sonoro</li>
            <li>Tomadas</li>
            <li>Wi-Fi</li>
            <li>Ar-condicionado</li>
            <li>Lixeira</li>
            <li>Acesso aos jogos e dados do local</li>
          </ul>
        </div>

        <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: '1.5rem', width: 280, textAlign: 'left' }}>
          <h3 style={{ textAlign: 'center' }}>VIP</h3>
          <p style={{ fontSize: '0.85rem', color: '#888' }}>Tudo da sala Normal, mais:</p>
          <ul>
            <li>Sala ambientada</li>
            <li>Caixa de som</li>
            <li>TV</li>
            <li>Kit de RPG</li>
            <li>Frigobar</li>
          </ul>
        </div>

        <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: '1.5rem', width: 280, textAlign: 'left' }}>
          <h3 style={{ textAlign: 'center' }}>Salão</h3>
          <p>
            Espaço grande, focado em eventos, com capacidade para diversas pessoas.
            É necessário alinhar previamente com os responsáveis pelo estabelecimento
            os detalhes e recursos necessários para o seu evento.
          </p>
          <ul>
            <li>Espaço amplo e flexível</li>
            <li>Configuração sob consulta</li>
            <li>Recomendado para grupos grandes ou eventos especiais</li>
          </ul>
        </div>
      </div>
    </div>
  );
}