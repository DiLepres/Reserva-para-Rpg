import { Link } from 'react-router-dom';

const COMO_FUNCIONA = [
  { icone: '🎲', titulo: 'Escolha sua sala', texto: 'Normal, VIP ou o Salão inteiro — filtre por tipo e capacidade e encontre o espaço ideal pra sua mesa.' },
  { icone: '🍖', titulo: 'Encomende comida', texto: 'Peça do próprio estabelecimento ou de restaurantes parceiros, direto pelo site, antes da sua sessão começar.' },
  { icone: '📜', titulo: 'Confirme e jogue', texto: 'Pague por Pix ou transferência, receba a confirmação e é só chegar — a mesa e a comida já estarão te esperando.' },
];

const TIPOS_SALA = [
  { titulo: 'Normal', texto: 'Mesa grande, isolamento sonoro, Wi-Fi e acesso aos jogos e dados do local.' },
  { titulo: 'VIP', texto: 'Tudo da sala Normal, mais ambientação temática, TV, caixa de som e frigobar.' },
  { titulo: 'Salão', texto: 'Espaço amplo pra eventos e grupos grandes, com configuração sob consulta.' },
];

export default function Principal() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div className="container" style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '2rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎲</div>
        <h1>Reserva de Salas para Jogos de Mesa e RPG</h1>
        <p style={{ maxWidth: 560, margin: '0 auto 2rem', color: 'var(--text-muted)' }}>
          Reserve uma sala temática para sua próxima sessão e encomende comida antes de chegar.
          Normal, VIP ou o Salão inteiro para eventos — você escolhe.
        </p>
        <div>
          <Link to="/reservar"><button style={{ fontSize: '1.05rem', padding: '0.8rem 1.6rem' }}>Reservar agora</button></Link>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 0, paddingBottom: '1rem' }}>
        <img src="/images/mesa-rpg.jpg" alt="Mesa de RPG com livros, mapas e dados" className="foto-destaque" style={{ maxHeight: 360 }} />
      </div>

      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Como funciona</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Do filtro de salas até a mesa pronta, em três passos.
        </p>
        <div className="grid">
          {COMO_FUNCIONA.map((item) => (
            <div key={item.titulo} className="card" style={{ width: 260, textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icone}</div>
              <h3>{item.titulo}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>{item.texto}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Tipos de sala</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Cada mesa tem seu clima. Escolha o que combina com a sua campanha.
        </p>
        <div className="grid">
          {TIPOS_SALA.map((item) => (
            <div key={item.titulo} className="card" style={{ width: 260, textAlign: 'center' }}>
              <h3>{item.titulo}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>{item.texto}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ paddingTop: '1rem' }}>
        <img src="/images/jogos-tabuleiro.jpg" alt="Coleção de jogos de tabuleiro" className="foto-destaque" style={{ maxHeight: 320 }} />
      </div>

      <footer style={{ borderTop: '1px solid var(--panel-border)', marginTop: '2rem', padding: '1.5rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
          🎲 Taverna &amp; Dados — onde toda boa campanha começa.
        </p>
      </footer>
    </div>
  );
}