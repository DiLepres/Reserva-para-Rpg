import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1rem 1.5rem',
        borderBottom: '1px solid var(--panel-border)',
        background: 'var(--bg-alt)',
      }}
    >
      <Link to="/" style={{ fontFamily: 'var(--font-titulo)', fontSize: '1.3rem', color: 'var(--gold-bright)' }}>
        🎲 Taverna & Dados
      </Link>
      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
        <Link to="/">Início</Link>
        <Link to="/reservar">Reservar Sala</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}