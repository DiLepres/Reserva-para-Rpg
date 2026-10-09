import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Principal from './pages/Principal';
import Login from './pages/Login';
import ReservaSala from './pages/ReservaSala';
import DetalhesReserva from './pages/DetalhesReserva';
import Encomendas from './pages/Encomendas';
import Pagamento from './pages/Pagamento';
import Confirmacao from './pages/Confirmacao';
import MinhasReservas from './pages/MinhasReservas';

const ARMAS = ['⚔️', '🗡️', '🛡️', '🏹', '🪓'];

function ColunaDecorativa({ lado }: { lado: 'esquerda' | 'direita' }) {
  return (
    <div className={`decor-lateral decor-${lado}`} aria-hidden="true">
      {ARMAS.map((arma, i) => (
        <span key={i}>{arma}</span>
      ))}
    </div>
  );
}

function App() {
  return (
    <>
      <ColunaDecorativa lado="esquerda" />
      <ColunaDecorativa lado="direita" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservar" element={<ReservaSala />} />
        <Route path="/reservar/:id" element={<DetalhesReserva />} />
        <Route path="/encomendas" element={<Encomendas />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/confirmacao" element={<Confirmacao />} />
        <Route path="/minhas-reservas" element={<MinhasReservas />} />
      </Routes>
    </>
  );
}

export default App;