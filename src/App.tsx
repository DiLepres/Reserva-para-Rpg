import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Principal from './pages/Principal';
import Login from './pages/Login';
import ReservaSala from './pages/ReservaSala';
import DetalhesReserva from './pages/DetalhesReserva';
import Encomendas from './pages/Encomendas';
import Pagamento from './pages/Pagamento';
import Confirmacao from './pages/Confirmacao';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservar" element={<ReservaSala />} />
        <Route path="/reservar/:id" element={<DetalhesReserva />} />
        <Route path="/encomendas" element={<Encomendas />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/confirmacao" element={<Confirmacao />} />
      </Routes>
    </>
  );
}

export default App;