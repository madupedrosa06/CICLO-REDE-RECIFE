import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { MapContainer, Marker } from 'react-leaflet'
import { MODO_PREVIA } from '../lib/modo'
import { Fundo } from '../components/Fundo'
import { Cabecalho, SeloExemplo } from '../components/Moldura'
import { BotoesOperadora } from '../components/BotoesOperadora'
import { coresParada, iconeBike, iconeEstacao, iconeParada, iconePatinete, iconeVoce, nomesParada } from '../components/icones'
import { buscarArea, listarEstacoes, listarParadas } from '../services/transporte'
import { buscarBicicletas, buscarPatinetes } from '../services/operadoras'
import { distancia, formatarDistancia, minutos } from '../lib/geo'
import type { AreaId, Estacao, EstacaoBike, LatLng, Parada, Patinete, TipoParada } from '../types'

type Filtro = 'estacoes' | TipoParada | 'patinetes' | 'bicicletas'
const FILTROS: { id: Filtro; nome: string; cor: string }[] = [
  { id: 'estacoes', nome: 'Estações', cor: '#1F4E8C' },
  { id: 'onibus', nome: 'Ônibus', cor: coresParada.onibus },
  { id: 'metro', nome: 'Metrô', cor: coresParada.metro },
  { id: 'taxi', nome: 'Táxi', cor: coresParada.taxi },
  { id: 'patinetes', nome: 'Patinetes', cor: '#5FA82F' },
  { id: 'bicicletas', nome: 'Bike Itaú', cor: '#EC7000' }
]

type Selecao = { tipo: 'estacao'; item: Estacao } | { tipo: 'parada'; item: Parada } | { tipo: 'patinete'; item: Patinete } | { tipo: 'bike'; item: EstacaoBike } | null

export default function Mapa() {
  const { area: areaId = 'recife-antigo' } = useParams()
  const [qs] = useSearchParams()
  const area = buscarArea(areaId) ?? buscarArea('recife-antigo')!
  const voce: LatLng | null = qs.get('lat') ? [Number(qs.get('lat')), Number(qs.get('lng'))] : null
  const [ativos, setAtivos] = useState<Set<Filtro>>(new Set(FILTROS.map(f => f.id)))
  const [patinetes, setPatinetes] = useState<Patinete[]>([])
  const [bikes, setBikes] = useState<EstacaoBike[]>([])
  const [sel, setSel] = useState<Selecao>(null)

  const estacoes = useMemo(() => listarEstacoes(area.id as AreaId), [area.id])
  // mostra as paradas até 1,5 km de alguma estação da área
  const paradas = useMemo(() => listarParadas().filter(p => estacoes.some(e => distancia([e.lat, e.lng], [p.lat, p.lng]) < 1500)), [estacoes])

  useEffect(() => {
    buscarPatinetes(area.id as AreaId).then(setPatinetes)
    buscarBicicletas(area.id as AreaId).then(setBikes)
  }, [area.id])

  const alternar = (f: Filtro) => setAtivos(s => { const n = new Set(s); n.has(f) ? n.delete(f) : n.add(f); return n })
  const origem: LatLng = voce ?? area.centro
  const estacaoMaisPerto = (p: LatLng) => [...estacoes].sort((a, b) => distancia(p, [a.lat, a.lng]) - distancia(p, [b.lat, b.lng]))[0]

  return (
    <main className="h-full flex flex-col">
      <Cabecalho titulo={area.nome} subtitulo={`${estacoes.length} estações MOVE RECIFE`} />
      <div className="flex gap-2 overflow-x-auto px-3 py-2 bg-creme border-b border-azul/10" role="group" aria-label="Filtros do mapa">
        {FILTROS.map(f => {
          const on = ativos.has(f.id)
          return (
            <button key={f.id} onClick={() => alternar(f.id)} aria-pressed={on} className="chip"
              style={{ borderColor: f.cor, background: on ? f.cor : '#fff', color: on ? '#fff' : f.cor }}>
              {f.nome}
            </button>
          )
        })}
      </div>

      <div className="relative flex-1 min-h-[360px]">
        <MapContainer center={area.centro} zoom={area.zoom} className="absolute inset-0" zoomControl={false}>
          <Fundo />
          {voce && <Marker position={voce} icon={iconeVoce} />}
          {ativos.has('estacoes') && estacoes.map(e => (
            <Marker key={e.id} position={[e.lat, e.lng]} icon={iconeEstacao(e.cor, sel?.item.id === e.id)} title={e.nome}
              eventHandlers={{ click: () => setSel({ tipo: 'estacao', item: e }) }} />
          ))}
          {paradas.filter(p => ativos.has(p.tipo)).map(p => (
            <Marker key={p.id} position={[p.lat, p.lng]} icon={iconeParada(p.tipo)} title={p.nome}
              eventHandlers={{ click: () => setSel({ tipo: 'parada', item: p }) }} />
          ))}
          {ativos.has('patinetes') && patinetes.map(p => (
            <Marker key={p.id} position={[p.lat, p.lng]} icon={iconePatinete(p.operadora)}
              eventHandlers={{ click: () => setSel({ tipo: 'patinete', item: p }) }} />
          ))}
          {ativos.has('bicicletas') && bikes.map(b => (
            <Marker key={b.id} position={[b.lat, b.lng]} icon={iconeBike(b.bikes)} title={b.nome}
              eventHandlers={{ click: () => setSel({ tipo: 'bike', item: b }) }} />
          ))}
        </MapContainer>
        <div className="absolute top-2 right-2 z-[500]"><SeloExemplo>{MODO_PREVIA ? 'prévia · mapa ilustrativo' : 'dados de exemplo'}</SeloExemplo></div>

        {sel && (
          <div className="absolute inset-x-0 bottom-0 z-[600] p-3">
            <div className="cartao p-4 max-w-md mx-auto">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <p className="text-xs uppercase tracking-wide font-semibold text-terracota">
                    {sel.tipo === 'estacao' ? 'Estação MOVE RECIFE' : sel.tipo === 'parada' ? nomesParada[sel.item.tipo] : sel.tipo === 'bike' ? 'Bicicleta compartilhada' : `Patinete ${sel.item.operadora === 'jet' ? 'Jet' : 'Whoosh'}`}
                  </p>
                  <h2 className="font-titulo text-lg font-bold text-azul">
                    {sel.tipo === 'patinete' ? `Bateria ${sel.item.bateria}%` : sel.item.nome}
                  </h2>
                  {sel.tipo === 'bike' && <p className="text-sm font-semibold">{sel.item.bikes} bicicletas · {sel.item.vagas} vagas livres</p>}
                  <p className="text-sm text-tinta/70">
                    {formatarDistancia(distancia(origem, [sel.item.lat, sel.item.lng]))} {voce ? 'de você' : 'do centro da área'} · {minutos(distancia(origem, [sel.item.lat, sel.item.lng]), 'pe')} min a pé
                  </p>
                  {sel.tipo === 'parada' && sel.item.linhas && <p className="text-xs mt-1">{sel.item.linhas.join(' · ')}</p>}
                </div>
                <button onClick={() => setSel(null)} className="botao min-w-[44px] px-0 bg-creme text-tinta" aria-label="Fechar">✕</button>
              </div>
              <div className="mt-3 space-y-2">
                {sel.tipo === 'estacao' && <Link to={`/estacao/${sel.item.id}`} className="botao-azul w-full">Ver estação</Link>}
                {sel.tipo === 'parada' && (() => {
                  const e = estacaoMaisPerto([sel.item.lat, sel.item.lng])
                  return <Link to={`/caminho/${e.id}?para=${sel.item.id}`} className="botao-azul w-full">Caminho seguro desde {e.nome}</Link>
                })()}
                {sel.tipo === 'patinete' && <BotoesOperadora estacaoId={estacaoMaisPerto([sel.item.lat, sel.item.lng]).id} mostrar={[sel.item.operadora]} />}
                {sel.tipo === 'bike' && <BotoesOperadora estacaoId={estacaoMaisPerto([sel.item.lat, sel.item.lng]).id} mostrar={['bikeitau']} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
