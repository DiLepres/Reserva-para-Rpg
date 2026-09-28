import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ItemComida } from '../types';
import { formatarPreco } from '../utils/formatarPreco';

interface EstadoPagamento {
  salaId: string;
  data: string;
  horarioInicio?: string;
  horarioFim?: string;
  valorReserva: number;
  itensComida?: ItemComida[];
  especificacoesEntrega?: string;
  valorComida?: number;
  valorTotal?: number;
}

const BANCOS = ['Banco do Brasil', 'Itaú', 'Bradesco', 'Caixa Econômica', 'Nubank'];
const TAMANHO_CHAVE_PIX = 20;
const LIMITE_DIGITOS_CONTA = 10;

function gerarChavePix(): string {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let chave = '';
  for (let i = 0; i < TAMANHO_CHAVE_PIX; i++) {
    chave += caracteres[Math.floor(Math.random() * caracteres.length)];
  }
  return chave;
}

export default function Pagamento() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logado, entrar } = useAuth();
  const estado = location.state as EstadoPagamento | null;

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erroLogin, setErroLogin] = useState('');

  const [formaPagamento, setFormaPagamento] = useState<'pix' | 'banco'>('pix');
  const [banco, setBanco] = useState(BANCOS[0]);
  const [chavePix, setChavePix] = useState(gerarChavePix());
  const [numeroConta, setNumeroConta] = useState('');
  const [erroPagamento, setErroPagamento] = useState('');

  useEffect(() => {
    if (formaPagamento === 'pix') {
      setChavePix(gerarChavePix());
    }
  }, [formaPagamento]);

  if (!estado) {
    return (
      <div className="container-estreito" style={{ textAlign: 'center' }}>
        <p>Nenhuma reserva para pagar. Volte e escolha uma sala primeiro.</p>
        <Link to="/reservar">Escolher sala</Link>
      </div>
    );
  }

  const valorTotal = estado.valorTotal ?? estado.valorReserva;

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (entrar(usuario, senha)) {
      setErroLogin('');
    } else {
      setErroLogin('Usuário ou senha inválidos');
    }
  }

  function handleNumeroContaChange(valor: string) {
    const apenasDigitos = valor.replace(/\D/g, '').slice(0, LIMITE_DIGITOS_CONTA);
    setNumeroConta(apenasDigitos);
  }

  function handlePagamento(e: React.FormEvent) {
    e.preventDefault();
    if (formaPagamento === 'banco' && !numeroConta.trim()) {
      setErroPagamento('Informe o número da conta.');
      return;
    }
    setErroPagamento('');

    navigate('/confirmacao', {
      state: {
        ...estado,
        formaPagamento,
        banco: formaPagamento === 'banco' ? banco : undefined,
        numeroInformado: formaPagamento === 'pix' ? chavePix : numeroConta,
        valorPago: valorTotal,
      },
    });
  }

  if (!logado) {
    return (
      <div className="container-estreito" style={{ textAlign: 'center' }}>
        <h1>Login necessário</h1>
        <p>Para concluir o pagamento, faça login primeiro.</p>
        <form onSubmit={handleLogin}>
          <div>
            <label>Usuário</label><br />
            <input value={usuario} onChange={(e) => setUsuario(e.target.value)} />
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <label>Senha</label><br />
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </div>
          {erroLogin && <p style={{ color: 'red' }}>{erroLogin}</p>}
          <button type="submit" style={{ marginTop: '1rem' }}>Entrar</button>
        </form>
        <p style={{ fontSize: '0.8rem', color: '#888' }}>Dica: admin / 1234</p>
      </div>
    );
  }

  return (
    <div className="container-estreito" style={{ textAlign: 'center' }}>
      <h1>Pagamento</h1>

      <div style={{ marginBottom: '1.5rem' }}>
        <h3>Resumo</h3>
        <p>Sala: {estado.salaId}</p>
        <p>Data: {estado.data}</p>
        {estado.horarioInicio && <p>Horário: {estado.horarioInicio} às {estado.horarioFim}</p>}
        {estado.valorComida ? <p>Comida: R$ {formatarPreco(estado.valorComida)}</p> : null}
        <p style={{ fontWeight: 'bold' }}>Total: R$ {formatarPreco(valorTotal)}</p>
      </div>

      <form onSubmit={handlePagamento}>
        <label>Forma de pagamento</label><br />
        <select value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value as 'pix' | 'banco')}>
          <option value="pix">Pix</option>
          <option value="banco">Transferência bancária</option>
        </select>

        {formaPagamento === 'pix' && (
          <div style={{ marginTop: '1rem' }}>
            <label>Chave Pix gerada</label><br />
            <input value={chavePix} readOnly style={{ width: 260, fontFamily: 'monospace' }} />
            <br />
            <button type="button" onClick={() => setChavePix(gerarChavePix())} style={{ marginTop: '0.5rem' }}>
              Gerar novo código
            </button>
          </div>
        )}

        {formaPagamento === 'banco' && (
          <>
            <div style={{ marginTop: '1rem' }}>
              <label>Banco</label><br />
              <select value={banco} onChange={(e) => setBanco(e.target.value)}>
                {BANCOS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label>Número da conta</label><br />
              <input
                value={numeroConta}
                onChange={(e) => handleNumeroContaChange(e.target.value)}
                placeholder="Ex: 123456"
                inputMode="numeric"
              />
            </div>
          </>
        )}

        {erroPagamento && <p style={{ color: 'red' }}>{erroPagamento}</p>}

        <button type="submit" style={{ marginTop: '1.5rem' }}>Confirmar pagamento</button>
      </form>
    </div>
  );
}