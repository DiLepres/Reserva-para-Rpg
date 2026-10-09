import { useLocation, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { ItemComida } from '../types';
import { formatarPreco } from '../utils/formatarPreco';
import { criarReserva } from '../services/api';

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

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const jaEnviou = useRef(false);

  useEffect(() => {
    if (!estado.salaId) {
      setCarregando(false);
      return;
    }

    if (jaEnviou.current) return;
    jaEnviou.current = true;

    async function salvarReserva() {
      try {
        await criarReserva({
          salaId: estado.salaId!,
          data: estado.data!,
          horarioInicio: estado.horarioInicio,
          horarioFim: estado.horarioFim,
          itensComida: estado.itensComida?.map((item) => item.nome),
          especificacoesEntrega: estado.especificacoesEntrega,
          formaPagamento: estado.formaPagamento,
          banco: estado.banco,
          valorTotal: estado.valorPago ?? 0,
        });
        setErro(null);
      } catch {
        setErro('Não foi possível salvar sua reserva no servidor. Tente novamente mais tarde.');
      } finally {
        setCarregando(false);
      }
    }

    salvarReserva();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!estado.salaId) {
    return (
      <div className="container-estreito" style={{ textAlign: 'center' }}>
        <p>Nenhuma reserva em andamento.</p>
        <Link to="/">Voltar ao início</Link>
      </div>
    );
  }

  if (carregando) {
    return (
      <div className="container-estreito" style={{ textAlign: 'center' }}>
        <p>Salvando sua reserva...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="container-estreito" style={{ textAlign: 'center' }}>
        <h1>Algo deu errado</h1>
        <p>{erro}</p>
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