import { useLocation, Link } from 'react-router-dom';
import type { ItemComida } from '../types';
import { formatarPreco } from '../utils/formatarPreco';

interface EstadoConfirmacao {
  salaId?: string;
  data?: string;
  horarioInicio?: string;
  horarioFim?: string;
  itensComida?: ItemComida[];
  especificacoesEntrega?: string;
  formaPagamento?: 'pix' | 'banco';
  banco?: string;
  valorPago?: number;
}

function formatarData(data: string) {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

export default function Confirmacao() {
  const location = useLocation();
  const estado = (location.state || {}) as EstadoConfirmacao;

  if (!estado.salaId) {
    return (
      <div className="container-estreito" style={{ textAlign: 'center' }}>
        <p>Nenhuma reserva em andamento.</p>
        <Link to="/">Voltar ao início</Link>
      </div>
    );
  }

  return (
    <div className="container-estreito" style={{ textAlign: 'center' }}>
      <h1>Reserva confirmada!</h1>
      <p>Sala: {estado.salaId}</p>
      <p>Data: {estado.data && formatarData(estado.data)}</p>
      {estado.horarioInicio && <p>Horário: {estado.horarioInicio} às {estado.horarioFim}</p>}
      {estado.itensComida && estado.itensComida.length > 0 && (
        <>
          <h3>Comida encomendada:</h3>
          <ul>{estado.itensComida.map((item, i) => <li key={i}>{item.nome}</li>)}</ul>
        </>
      )}
      {estado.especificacoesEntrega && (
        <>
          <h3>Instruções de entrega:</h3>
          <p>{estado.especificacoesEntrega}</p>
        </>
      )}
      {estado.valorPago !== undefined && (
        <>
          <h3>Pagamento</h3>
          <p>Forma: {estado.formaPagamento === 'pix' ? 'Pix' : `Transferência (${estado.banco})`}</p>
          <p>Total pago: R$ {formatarPreco(estado.valorPago)}</p>
        </>
      )}
      <Link to="/">Voltar ao início</Link>
    </div>
  );
}