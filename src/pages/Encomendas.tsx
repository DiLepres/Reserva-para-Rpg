import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cardapioProprio } from '../data/cardapioProprio';
import type { ItemComida } from '../types';

interface RestauranteParceiro {
  id: string;
  nome: string;
  tipo: string;
  areaApi?: string;
  categoriaApi?: string;
}

interface PratoParceiro {
  idMeal: string;
  nomeMeal: string;
}

interface DadosReserva {
  salaId: string;
  data: string;
  horarioInicio?: string;
  horarioFim?: string;
  valorReserva: number;
}

const restaurantesParceiros: RestauranteParceiro[] = [
  { id: 'r1', nome: 'Pizzaria Bella Napoli', tipo: 'Pizzaria', areaApi: 'Italian' },
  { id: 'r2', nome: 'Burger House', tipo: 'Hamburgueria', categoriaApi: 'Beef' },
  { id: 'r3', nome: 'Sushi Yama', tipo: 'Comida Japonesa', areaApi: 'Japanese' },
];

export default function Encomendas() {
  const location = useLocation();
  const navigate = useNavigate();
  const dadosReserva = location.state as DadosReserva | null;

  const [origem, setOrigem] = useState<'proprio' | 'externo'>('proprio');
  const [itensSelecionados, setItensSelecionados] = useState<ItemComida[]>([]);
  const [especificacoesEntrega, setEspecificacoesEntrega] = useState('');

  const [restauranteSelecionado, setRestauranteSelecionado] = useState<RestauranteParceiro | null>(null);
  const [cardapioParceiro, setCardapioParceiro] = useState<PratoParceiro[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erroApi, setErroApi] = useState('');

  useEffect(() => {
    if (!restauranteSelecionado) {
      setCardapioParceiro([]);
      return;
    }
    setCarregando(true);
    setErroApi('');

    const parametro = restauranteSelecionado.areaApi
      ? `a=${restauranteSelecionado.areaApi}`
      : `c=${restauranteSelecionado.categoriaApi}`;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${parametro}`)
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao buscar cardápio');
        return res.json();
      })
      .then((json) => {
        const lista = (json.meals || []).slice(0, 8).map((m: any) => ({
          idMeal: m.idMeal,
          nomeMeal: m.strMeal,
        }));
        setCardapioParceiro(lista);
        if (lista.length === 0) setErroApi('Este restaurante não tem pratos disponíveis no momento.');
      })
      .catch(() => setErroApi('Não foi possível carregar o cardápio agora. Tente novamente.'))
      .finally(() => setCarregando(false));
  }, [restauranteSelecionado]);

  if (!dadosReserva) {
    return <p style={{ padding: '2rem' }}>Reserva não encontrada. Volte e selecione uma sala primeiro.</p>;
  }

  function adicionarItemProprio(item: ItemComida) {
    setItensSelecionados((prev) => [...prev, item]);
  }

  function adicionarItemParceiro(prato: PratoParceiro) {
    setItensSelecionados((prev) => [...prev, { id: prato.idMeal, nome: prato.nomeMeal, preco: 0, origem: 'externo' }]);
  }

  function finalizar() {
    const valorComida = itensSelecionados.reduce((soma, item) => soma + item.preco, 0);
    navigate('/pagamento', {
      state: {
        ...dadosReserva,
        itensComida: itensSelecionados,
        especificacoesEntrega: origem === 'externo' ? especificacoesEntrega : '',
        valorComida,
        valorTotal: dadosReserva.valorReserva + valorComida,
      },
    });
  }

  const comidas = cardapioProprio.filter((item) => item.categoria === 'comida');
  const bebidas = cardapioProprio.filter((item) => item.categoria === 'bebida');

  return (
    <div className="container-estreito">
      <h1>Encomenda de comida</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setOrigem('proprio')} disabled={origem === 'proprio'}>Do próprio estabelecimento</button>
        <button onClick={() => setOrigem('externo')} disabled={origem === 'externo'} style={{ marginLeft: '1rem' }}>De outro estabelecimento</button>
      </div>

      {origem === 'proprio' && (
        <div>
          <h3>Comidas</h3>
          <ul>
            {comidas.map((item) => (
              <li key={item.id}>{item.nome} — R$ {item.preco},00 <button onClick={() => adicionarItemProprio(item)}>Adicionar</button></li>
            ))}
          </ul>
          <h3>Bebidas</h3>
          <ul>
            {bebidas.map((item) => (
              <li key={item.id}>{item.nome} — R$ {item.preco},00 <button onClick={() => adicionarItemProprio(item)}>Adicionar</button></li>
            ))}
          </ul>
        </div>
      )}

      {origem === 'externo' && (
        <div>
          <p>
            Como o pedido será feito em outro estabelecimento, informe abaixo as instruções
            necessárias para que a entrega chegue certinho no dia da reserva.
          </p>
          <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>Inclua na sua mensagem:</p>
          <ul>
            <li>Nome do estabelecimento e os itens do pedido</li>
            <li>Horário previsto para a entrega</li>
            <li>Forma de pagamento (na entrega, já pago, etc.)</li>
            <li>Ponto de referência ou instruções de acesso ao local</li>
            <li>Um contato (telefone ou nome) para eventuais dúvidas</li>
          </ul>

          <textarea
            value={especificacoesEntrega}
            onChange={(e) => setEspecificacoesEntrega(e.target.value)}
            placeholder="Ex: Pedido na Pizzaria do João, 1 pizza grande de calabresa, entregar às 20h, pagamento na entrega, contato (11) 99999-9999."
            style={{ width: '100%', maxWidth: 500, minHeight: 120, marginTop: '0.5rem', padding: '0.5rem' }}
          />

          <h3 style={{ marginTop: '2rem' }}>Restaurantes parceiros</h3>
          <p style={{ fontSize: '0.85rem', color: '#888' }}>
            Clique em um restaurante parceiro para ver o cardápio e adicionar itens ao seu pedido.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem', justifyContent: 'center' }}>
            {restaurantesParceiros.map((r) => (
              <button
                key={r.id}
                onClick={() => setRestauranteSelecionado(r)}
                disabled={restauranteSelecionado?.id === r.id}
                style={{ padding: '0.75rem 1rem' }}
              >
                {r.nome} <br /> <span style={{ fontSize: '0.75rem', color: '#888' }}>{r.tipo}</span>
              </button>
            ))}
          </div>

          {restauranteSelecionado && (
            <div style={{ marginTop: '1.5rem' }}>
              <h4>Cardápio — {restauranteSelecionado.nome}</h4>
              {carregando && <p>Carregando cardápio...</p>}
              {erroApi && <p style={{ color: 'red' }}>{erroApi}</p>}
              <ul>
                {cardapioParceiro.map((prato) => (
                  <li key={prato.idMeal}>
                    {prato.nomeMeal} <button onClick={() => adicionarItemParceiro(prato)}>Adicionar</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <h3>Itens selecionados: {itensSelecionados.length}</h3>
      <ul>{itensSelecionados.map((item, i) => <li key={i}>{item.nome}</li>)}</ul>

      <button onClick={finalizar} style={{ marginTop: '1rem' }}>Finalizar reserva</button>
    </div>
  );
}