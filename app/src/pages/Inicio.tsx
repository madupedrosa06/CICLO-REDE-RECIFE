import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sobrados } from '../components/Sobrados'
import { Rodape } from '../components/Moldura'
import { pegarLocalizacao } from '../lib/localizacao'
import { areaMaisProxima } from '../services/transporte'

export default function Inicio() {
  const nav = useNavigate()
  const [msg, setMsg] = useState('')

  async function usarLocalizacao() {
    setMsg('Procurando você…')
    try {
      const p = await pegarLocalizacao()
      const area = areaMaisProxima(p)
      nav(`/mapa/${area.id}?lat=${p[0]}&lng=${p[1]}`)
    } catch (e) { setMsg((e as Error).message) }
  }

  return (
    <main className="min-h-full flex flex-col">
      <section className="azulejo relative">
        <div className="max-w-md mx-auto px-4 pt-10 pb-0 text-center">
          <div className="cartao px-6 py-7">
            <p className="text-xs tracking-[.3em] text-terracota font-semibold">RECIFE · PE</p>
            <h1 className="font-titulo text-[2.6rem] leading-none font-extrabold text-azul mt-2">MOVE<br />RECIFE</h1>
            <div className="w-16 h-1 bg-ocre mx-auto my-4 rounded" />
            <p className="font-titulo italic text-xl text-tinta">Destrave o caminho, mova a cidade.</p>
            <p className="text-sm text-tinta/70 mt-3">Patinetes e bicicletas do Bike Itaú integrados ao ônibus, ao metrô e ao táxi, com o caminho mais seguro até a sua parada.</p>
          </div>
        </div>
        <Sobrados className="w-full h-24 block mt-6" />
      </section>

      <section className="bg-azul text-white px-4 py-6">
        <div className="max-w-md mx-auto space-y-3">
          <h2 className="font-titulo text-xl font-bold">Onde você está?</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/mapa/recife-antigo" className="botao bg-ocre text-tinta min-h-[88px] flex-col text-lg">
              <span aria-hidden="true">⛪</span>Recife Antigo
            </Link>
            <Link to="/mapa/boa-viagem" className="botao bg-agua text-tinta min-h-[88px] flex-col text-lg">
              <span aria-hidden="true">🏖️</span>Boa Viagem
            </Link>
          </div>
          <button onClick={usarLocalizacao} className="botao w-full bg-white text-azul">📍 Usar minha localização</button>
          {msg && <p role="status" className="text-sm text-white/90">{msg}</p>}
          <Link to="/estacao/joana-bezerra" className="block text-center text-sm underline text-white/90 min-h-[44px] leading-[44px]">
            Ver exemplo: Estação Joana Bezerra
          </Link>
        </div>
      </section>
      <div className="faixa-azulejo" />
      <Rodape />
    </main>
  )
}
