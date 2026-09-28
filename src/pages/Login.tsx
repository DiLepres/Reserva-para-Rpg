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
    <div className="container-estreito">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário</label><br />
          <input value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <label>Senha</label><br />
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <button type="submit" style={{ marginTop: '1rem' }}>Entrar</button>
      </form>
      <p style={{ fontSize: '0.8rem', color: '#888' }}>Dica: admin / 1234</p>
    </div>
  );
}