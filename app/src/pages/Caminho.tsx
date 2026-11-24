import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { MapContainer, Marker, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Fundo } from '../components/Fundo'
import { Cabecalho, Rodape, SeloExemplo } from '../components/Moldura'
import { BotoesOperadora } from '../components/BotoesOperadora'
import { iconeEstacao, iconeParada, iconeVoce } from '../components/icones'
import { buscarEstacao, buscarParada, paradasProximas } from '../services/transporte'
import { buscarEndereco, calcularRotas, type ResultadoRotas } from '../services/rotas'
import { formatarDistancia, minutos } from '../lib/geo'
import type { LatLng, Rota } from '../types'

function Enquadrar({ pontos }: { pontos: LatLng[] }) {
  const map = useMap()
  useEffect(() => { if (pontos.length > 1) map.fitBounds(L.latLngBounds(pontos), { padding: [30, 30] }) }, [map, pontos])
  return null
}

export default function Caminho() {
  const { id = '' } = useParams()
  const [qs] = useSearchParams()
  const nav = useNavigate()
  const estacao = buscarEstacao(id)
  const paradaId = qs.get('para')
  const parada = paradaId ? buscarParada(paradaId) : undefined
  const endLat = qs.get('lat'), endLng = qs.get('lng'), endNome = qs.get('nome')

  const destino: { nome: string; ponto: LatLng } | null = parada
    ? { nome: parada.nome, ponto: [parada.lat, parada.lng] }
    : endLat && endLng ? { nome: endNome ?? 'Endereço escolhido', ponto: [Number(endLat), Number(endLng)] } : null

  const [rotas, setRotas] = useState<ResultadoRotas | null>(null)
  const [carregando, setCarregando] = useState(false)
  const [mostrar, setMostrar] = useState<'segura' | 'curta'>('segura')
  const [busca, setBusca] = useState('')
  const [resultados, setResultados] = useState<{ nome: string; ponto: LatLng }[]>([])
  const [msgBusca, setMsgBusca] = useState('')

  const origem: LatLng | null = estacao ? [estacao.lat, estacao.lng] : null
  const opcoes = useMemo(() => (origem ? paradasProximas(origem, 2000).filter(p => p.dist > 80).slice(0, 8) : []), [id])

  useEffect(() => {
    if (!origem || !destino) { setRotas(null); return }
    setCarregando(true)
    calcularRotas(origem, destino.ponto, { de: id, para: paradaId ?? '' })
      .then(setRotas)
      .finally(() => setCarregando(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, paradaId, endLat, endLng])

  async function procurar(e: React.FormEvent) {
    e.preventDefault()
    if (busca.trim().length < 3) return
    setMsgBusca('Buscando…')
    try {
      const r = await buscarEndereco(busca)
      setResultados(r)
      setMsgBusca(r.length ? '' : 'Nada encontrado no Recife.')
    } catch { setMsgBusca('A busca de endereço não está disponível agora. Escolha uma parada da lista.') }
  }

  if (!estacao || !origem) return <main><Cabecalho titulo="Estação não encontrada" /></main>

  const iguais = rotas && rotas.curta.pontos === rotas.segura.pontos
  const principal: Rota | undefined = rotas ? rotas[mostrar] : undefined
  const outra: Rota | undefined = rotas ? rotas[mostrar === 'segura' ? 'curta' : 'segura'] : undefined

  return (
    <main>
      <Cabecalho titulo="Melhor caminho seguro" subtitulo={`Saindo da ${estacao.nome}`} voltar={`/estacao/${estacao.id}`} />
      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        <section className="cartao p-4 space-y-3">
          <h2 className="font-titulo text-lg font-bold text-azul">Para onde você vai?</h2>
          <label className="block text-sm font-semibold" htmlFor="destino">Escolha uma parada</label>
          <select id="destino" className="w-full min-h-[48px] rounded-xl border-2 border-azul/30 px-3 bg-white"
            value={paradaId ?? ''}
            onChange={e => nav(`/caminho/${estacao.id}${e.target.value ? `?para=${e.target.value}` : ''}`, { replace: true })}>
            <option value="">Selecione…</option>
            {opcoes.map(p => <option key={p.id} value={p.id}>{p.nome} ({formatarDistancia(p.dist)})</option>)}
          </select>
          <form onSubmit={procurar} className="flex gap-2">
            <label htmlFor="endereco" className="sr-only">Ou digite um endereço</label>
            <input id="endereco" value={busca} onChange={e => setBusca(e.target.value)} placeholder="Ou digite um endereço"
              className="flex-1 min-h-[48px] rounded-xl border-2 border-azul/30 px-3" />
            <button className="botao-azul" type="submit">Buscar</button>
          </form>
          {msgBusca && <p className="text-sm" role="status">{msgBusca}</p>}
          {resultados.length > 0 && (
            <ul className="space-y-1">
              {resultados.map((r, i) => (
                <li key={i}>
                  <button className="w-full text-left min-h-[44px] px-3 rounded-lg hover:bg-creme text-sm"
                    onClick={() => { setResultados([]); nav(`/caminho/${estacao.id}?lat=${r.ponto[0]}&lng=${r.ponto[1]}&nome=${encodeURIComponent(r.nome)}`, { replace: true }) }}>
                    📍 {r.nome}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {destino && (
          <>
            <div className="cartao overflow-hidden">
              <div className="h-72 relative">
                <MapContainer center={origem} zoom={15} className="absolute inset-0" zoomControl={false}>
                  <Fundo />
                  <Marker position={origem} icon={iconeEstacao(estacao.cor, true)} />
                  <Marker position={destino.ponto} icon={parada ? iconeParada(parada.tipo) : iconeVoce} />
                  {outra && !iguais && <Polyline positions={outra.pontos} pathOptions={{ color: '#8A8F99', weight: 5, dashArray: '8 8', opacity: .8 }} />}
                  {principal && <Polyline positions={principal.pontos} pathOptions={{ color: mostrar === 'segura' ? '#1F4E8C' : '#B5532F', weight: 7 }} />}
                  {principal && <Enquadrar pontos={[origem, destino.ponto, ...principal.pontos]} />}
                </MapContainer>
                {carregando && <div className="absolute inset-0 z-[500] grid place-items-center bg-white/60 font-semibold">Calculando caminho…</div>}
              </div>
            </div>

            {rotas && (
              <>
                <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Tipo de caminho">
                  <OpcaoRota titulo="🛡️ Mais seguro" rota={rotas.segura} ativo={mostrar === 'segura'} onClick={() => setMostrar('segura')} cor="#1F4E8C" />
                  <OpcaoRota titulo="⚡ Mais curto" rota={rotas.curta} ativo={mostrar === 'curta'} onClick={() => setMostrar('curta')} cor="#B5532F" />
                </div>
                {iguais && <p className="text-sm">Boa notícia: aqui o caminho mais curto já é o mais seguro.</p>}
                {principal?.simulada && <SeloExemplo>rota aproximada (sem conexão com o serviço de rotas)</SeloExemplo>}

                <section className="cartao p-4">
                  <h3 className="font-titulo text-lg font-bold text-azul">No caminho</h3>
                  {principal && principal.avisos.length > 0 ? (
                    <ul className="mt-2 space-y-2 text-sm">
                      {principal.avisos.map(a => <li key={a} className="flex gap-2"><span aria-hidden="true">•</span>{a}</li>)}
                    </ul>
                  ) : <p className="text-sm mt-2 text-tinta/70">Sem avisos cadastrados para esse trajeto. Atenção nas travessias.</p>}
                  <p className="text-xs text-tinta/60 mt-3">Avisos de segurança: dados de exemplo, editáveis em trechos-seguranca.json.</p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-titulo text-lg font-bold text-azul">Destrave um patinete ou uma bike</h3>
                  <BotoesOperadora estacaoId={estacao.id} />
                </section>
              </>
            )}
          </>
        )}
        {!destino && <p className="text-sm text-tinta/70">Escolha um destino para ver o caminho. <Link className="underline text-azul" to={`/estacao/${estacao.id}`}>Voltar à estação</Link></p>}
      </div>
      <Rodape />
    </main>
  )
}

function OpcaoRota({ titulo, rota, ativo, onClick, cor }: { titulo: string; rota: Rota; ativo: boolean; onClick: () => void; cor: string }) {
  return (
    <button role="radio" aria-checked={ativo} onClick={onClick}
      className="rounded-2xl p-3 text-left border-2 min-h-[44px] transition"
      style={{ borderColor: cor, background: ativo ? cor : '#fff', color: ativo ? '#fff' : '#1E2430' }}>
      <p className="font-semibold">{titulo}</p>
      <p className="font-titulo text-2xl font-bold">{formatarDistancia(rota.distancia)}</p>
      <p className="text-xs opacity-90">🛴🚲 {minutos(rota.distancia, 'patinete')} min · 🚶 {minutos(rota.distancia, 'pe')} min</p>
    </button>
  )
}
