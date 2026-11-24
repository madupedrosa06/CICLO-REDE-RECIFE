import { Route, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Mapa from './pages/Mapa'
import Estacao from './pages/Estacao'
import Caminho from './pages/Caminho'
import Painel from './pages/Painel'
import Sobre from './pages/Sobre'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/mapa/:area" element={<Mapa />} />
      <Route path="/estacao/:id" element={<Estacao />} />
      <Route path="/caminho/:id" element={<Caminho />} />
      <Route path="/painel" element={<Painel />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="*" element={<Inicio />} />
    </Routes>
  )
}
