import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { entrar } = useAuth();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (entrar(usuario, senha)) {
      navigate('/reservar');
    } else {
      setErro('Usuário ou senha inválidos');
    }
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap' }}>
      <div
        style={{
          flex: '1 1 320px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          padding: '3rem 3rem',
          background: 'var(--bg-alt)',
          borderRight: '1px solid var(--panel-border)',
        }}
      >
        <div style={{ maxWidth: 380, textAlign: 'left' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎲</div>
          <h1 style={{ fontSize: '2rem' }}>Entre na taverna</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Faça login para reservar sua mesa, encomendar comida antes da sessão e acompanhar suas reservas, tudo em apenas um lugar.
          </p>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.92rem', paddingLeft: '1.2rem', marginTop: '1.5rem' }}>
            <li>Reserve salas Normal, VIP ou o Salão inteiro</li>
            <li>Encomende do cardápio próprio ou de parceiros</li>
            <li>Edite ou cancele reservas quando quiser</li>
          </ul>
        </div>
      </div>

      <div
        style={{
          flex: '1 1 320px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 1.5rem',
        }}
      >
        <div className="card" style={{ width: '100%', maxWidth: 360 }}>
          <h2 style={{ marginBottom: '1.25rem' }}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Usuário</label><br />
              <input
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                style={{ width: '100%', marginTop: '0.3rem' }}
              />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label>Senha</label><br />
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={{ width: '100%', marginTop: '0.3rem' }}
              />
            </div>
            {erro && <p className="texto-erro" style={{ marginTop: '0.75rem' }}>{erro}</p>}
            <button type="submit" style={{ marginTop: '1.25rem', width: '100%' }}>Entrar</button>
          </form>
          <p className="texto-discreto" style={{ marginTop: '1rem', textAlign: 'center' }}>Dica: admin / 1234</p>
        </div>
      </div>
    </div>
  );
}