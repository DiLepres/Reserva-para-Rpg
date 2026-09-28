import { Link } from 'react-router-dom';

export default function Principal() {
  return (
    <div className="container" style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1>Reserva de Salas para Jogos de Mesa e RPG</h1>
      <p style={{ maxWidth: 560, margin: '0 auto 2rem', color: 'var(--text-muted)' }}>
        Reserve uma sala temática para sua próxima sessão e encomende comida antes de chegar.
        Normal, VIP ou o Salão inteiro para eventos — você escolhe.
      </p>
      <div>
        <Link to="/reservar"><button style={{ fontSize: '1.05rem', padding: '0.8rem 1.6rem' }}>Reservar agora</button></Link>
      </div>
    </div>
  );
}