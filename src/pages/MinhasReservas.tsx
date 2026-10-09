import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listarReservas, atualizarReserva, excluirReserva } from '../services/api';
import type { Reserva } from '../services/api';
import { formatarPreco } from '../utils/formatarPreco';

function formatarData(data: string) {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

export default function MinhasReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [formData, setFormData] = useState('');
  const [formHorarioInicio, setFormHorarioInicio] = useState('');
  const [formHorarioFim, setFormHorarioFim] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function carregarReservas() {
    setCarregando(true);
    try {
      const dados = await listarReservas();
      setReservas(dados);
      setErro(null);
    } catch {
      setErro('Não foi possível carregar suas reservas. Verifique se o servidor está rodando.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarReservas();
  }, []);

  function iniciarEdicao(reserva: Reserva) {
    setEditandoId(reserva.id ?? null);
    setFormData(reserva.data);
    setFormHorarioInicio(reserva.horarioInicio ?? '');
    setFormHorarioFim(reserva.horarioFim ?? '');
  }

  function cancelarEdicao() {
    setEditandoId(null);
  }

  async function salvarEdicao(id: number) {
    setSalvando(true);
    try {
      await atualizarReserva(id, {
        data: formData,
        horarioInicio: formHorarioInicio,
        horarioFim: formHorarioFim,
      });
      setEditandoId(null);
      await carregarReservas();
    } catch {
      setErro('Não foi possível atualizar a reserva.');
    } finally {
      setSalvando(false);
    }
  }

  async function excluir(id: number) {
    const confirmar = window.confirm('Tem certeza que deseja cancelar esta reserva?');
    if (!confirmar) return;

    try {
      await excluirReserva(id);
      setReservas((atual) => atual.filter((r) => r.id !== id));
    } catch {
      setErro('Não foi possível excluir a reserva.');
    }
  }

  if (carregando) {
    return (
      <div className="container-estreito" style={{ textAlign: 'center' }}>
        <p>Carregando suas reservas...</p>
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
    <div className="container-estreito">
      <h1 style={{ textAlign: 'center' }}>Minhas Reservas</h1>

      {reservas.length === 0 && (
        <p style={{ textAlign: 'center' }}>Você ainda não tem nenhuma reserva.</p>
      )}

      {reservas.map((reserva) => (
        <div
          key={reserva.id}
          style={{
            border: '1px solid var(--panel-border)',
            background: 'var(--bg-alt)',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
          }}
        >
          {editandoId === reserva.id ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label>
                Data:
                <input
                  type="date"
                  value={formData}
                  onChange={(e) => setFormData(e.target.value)}
                  style={{ marginLeft: '0.5rem' }}
                />
              </label>
              <label>
                Horário início:
                <input
                  type="time"
                  value={formHorarioInicio}
                  onChange={(e) => setFormHorarioInicio(e.target.value)}
                  style={{ marginLeft: '0.5rem' }}
                />
              </label>
              <label>
                Horário fim:
                <input
                  type="time"
                  value={formHorarioFim}
                  onChange={(e) => setFormHorarioFim(e.target.value)}
                  style={{ marginLeft: '0.5rem' }}
                />
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button disabled={salvando} onClick={() => salvarEdicao(reserva.id!)}>
                  {salvando ? 'Salvando...' : 'Salvar'}
                </button>
                <button disabled={salvando} onClick={cancelarEdicao}>
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <>
              <p><strong>Sala:</strong> {reserva.salaId}</p>
              <p><strong>Data:</strong> {formatarData(reserva.data)}</p>
              {reserva.horarioInicio && (
                <p><strong>Horário:</strong> {reserva.horarioInicio} às {reserva.horarioFim}</p>
              )}
              <p><strong>Total:</strong> R$ {formatarPreco(reserva.valorTotal)}</p>
              <p><strong>Status:</strong> {reserva.status}</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button onClick={() => iniciarEdicao(reserva)}>Editar</button>
                <button onClick={() => excluir(reserva.id!)}>Cancelar reserva</button>
              </div>
            </>
          )}
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/">Voltar ao início</Link>
      </div>
    </div>
  );
}