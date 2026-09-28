import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { salas } from '../data/salas';

const HORA_ABERTURA = '08:00';
const HORA_FECHAMENTO = '22:00';

function hojeISO() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function horaAtual() {
  const agora = new Date();
  const h = String(agora.getHours()).padStart(2, '0');
  const m = String(agora.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

function calcularHoras(inicio: string, fim: string): number {
  const [hIni, mIni] = inicio.split(':').map(Number);
  const [hFim, mFim] = fim.split(':').map(Number);
  return ((hFim * 60 + mFim) - (hIni * 60 + mIni)) / 60;
}

export default function DetalhesReserva() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sala = salas.find((s) => s.id === id);

  const [data, setData] = useState('');
  const [horarioInicio, setHorarioInicio] = useState('');
  const [horarioFim, setHorarioFim] = useState('');
  const [erro, setErro] = useState('');

  if (!sala) return <p style={{ padding: '2rem' }}>Sala não encontrada.</p>;

  const reservaPorDia = sala.unidadePreco === 'dia';

  function calcularValor(): number {
    if (reservaPorDia) return sala!.preco;
    return calcularHoras(horarioInicio, horarioFim) * sala!.preco;
  }

  function validar(): boolean {
    if (!data) {
      setErro('Escolha a data da reserva.');
      return false;
    }
    if (data < hojeISO()) {
      setErro('Não é possível reservar em uma data que já passou.');
      return false;
    }

    if (!reservaPorDia) {
      if (!horarioInicio || !horarioFim) {
        setErro('Preencha o horário inicial e o horário final.');
        return false;
      }
      if (data === hojeISO() && horarioInicio < horaAtual()) {
        setErro('Não é possível reservar um horário que já passou hoje.');
        return false;
      }
      if (horarioInicio < HORA_ABERTURA || horarioFim > HORA_FECHAMENTO) {
        setErro(`O estabelecimento funciona apenas entre ${HORA_ABERTURA} e ${HORA_FECHAMENTO}.`);
        return false;
      }
      if (horarioFim <= horarioInicio) {
        setErro('O horário final precisa ser depois do horário inicial.');
        return false;
      }
    }

    setErro('');
    return true;
  }

  function validarEContinuar(destino: string) {
    if (!validar()) return;
    navigate(destino, {
      state: {
        salaId: sala!.id,
        data,
        horarioInicio: reservaPorDia ? '' : horarioInicio,
        horarioFim: reservaPorDia ? '' : horarioFim,
        valorReserva: calcularValor(),
      },
    });
  }

  return (
    <div className="container-media" style={{ textAlign: 'center' }}>
      <h1>{sala.capacidade === 'salao' ? 'Salão' : `Sala para ${sala.capacidade} pessoas`} ({sala.tipo === 'vip' ? 'VIP' : 'Normal'})</h1>
      <p>{reservaPorDia ? `R$ ${sala.preco},00 (dia inteiro)` : `R$ ${sala.preco},00 / hora`}</p>
      {!reservaPorDia && (
        <p style={{ fontSize: '0.85rem', color: '#888' }}>Funcionamento: {HORA_ABERTURA} às {HORA_FECHAMENTO}</p>
      )}

      <div style={{ marginTop: '1rem' }}>
        <label>Data</label><br />
        <input type="date" value={data} min={hojeISO()} onChange={(e) => setData(e.target.value)} />
      </div>

      {!reservaPorDia && (
        <>
          <div style={{ marginTop: '1rem' }}>
            <label>Horário inicial</label><br />
            <input type="time" step={1800} min={HORA_ABERTURA} max={HORA_FECHAMENTO} value={horarioInicio} onChange={(e) => setHorarioInicio(e.target.value)} />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label>Horário final</label><br />
            <input type="time" step={1800} min={HORA_ABERTURA} max={HORA_FECHAMENTO} value={horarioFim} onChange={(e) => setHorarioFim(e.target.value)} />
          </div>
        </>
      )}

      {reservaPorDia && (
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#888' }}>
          O Salão é reservado para o dia inteiro, sem necessidade de escolher horário.
        </p>
      )}

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button onClick={() => validarEContinuar('/encomendas')}>Quero encomendar comida</button>
        <button onClick={() => validarEContinuar('/pagamento')}>Finalizar sem comida</button>
      </div>
    </div>
  );
}