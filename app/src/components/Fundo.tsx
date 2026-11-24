import { Polygon, Polyline, TileLayer, Tooltip } from 'react-leaflet'
import { MODO_PREVIA } from '../lib/modo'
import trechosJson from '../data/trechos-seguranca.json'
import type { LatLng, Trecho } from '../types'

// Mapa ilustrado (aproximado) usado só no modo prévia.
const mar: LatLng[][] = [
  [[-8.040, -34.8665], [-8.072, -34.8665], [-8.080, -34.8700], [-8.100, -34.8860], [-8.105, -34.8885], [-8.117, -34.8933], [-8.130, -34.8983], [-8.143, -34.9022], [-8.165, -34.9085], [-8.165, -34.840], [-8.040, -34.840]]
]
const ruas: { nome: string; pontos: LatLng[] }[] = [
  { nome: 'Av. Boa Viagem', pontos: [[-8.105, -34.8895], [-8.117, -34.8942], [-8.130, -34.8992], [-8.143, -34.9032], [-8.160, -34.9078]] },
  { nome: 'Av. Conselheiro Aguiar', pontos: [[-8.108, -34.8935], [-8.123, -34.8998], [-8.140, -34.9050], [-8.155, -34.9090]] },
  { nome: 'Av. Domingos Ferreira', pontos: [[-8.110, -34.8985], [-8.1198, -34.9033], [-8.1265, -34.9025], [-8.133, -34.9033], [-8.150, -34.9090]] },
  { nome: 'R. Padre Carapuceiro', pontos: [[-8.1175, -34.8950], [-8.1190, -34.9048], [-8.1195, -34.9100]] },
  { nome: 'Av. Alfredo Lisboa', pontos: [[-8.0570, -34.8705], [-8.0608, -34.8698], [-8.0640, -34.8705]] },
  { nome: 'Av. Rio Branco', pontos: [[-8.0631, -34.8711], [-8.0647, -34.8738]] },
  { nome: 'Av. Dantas Barreto', pontos: [[-8.0650, -34.8770], [-8.0688, -34.8787], [-8.0730, -34.8800]] },
  { nome: 'R. Floriano Peixoto', pontos: [[-8.0660, -34.8800], [-8.0683, -34.8833], [-8.0700, -34.8870]] },
  { nome: 'Av. Sul', pontos: [[-8.0700, -34.8870], [-8.0745, -34.8880], [-8.0779, -34.8963], [-8.0850, -34.9030]] }
]
const metro: LatLng[] = [[-8.0685, -34.8837], [-8.0745, -34.8900], [-8.0782, -34.8966], [-8.0950, -34.9070], [-8.1150, -34.9140], [-8.1332, -34.9174]]
const trechos = trechosJson.trechos as Trecho[]
const corTrecho = (t: Trecho) => (t.peso > 1 ? '#C2410C' : t.tipo === 'ciclofaixa' || t.tipo === 'ciclovia' ? '#3E9B5A' : '#4FA3A0')

export function Fundo() {
  if (!MODO_PREVIA) {
    return <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  }
  return (
    <>
      {mar.map((p, i) => <Polygon key={i} positions={p} pathOptions={{ color: '#9CC3DE', fillColor: '#BFD9EC', fillOpacity: 1, weight: 1 }} interactive={false} />)}
      <Polyline positions={metro} pathOptions={{ color: '#1F4E8C', weight: 4, dashArray: '2 8', lineCap: 'round', opacity: .7 }} interactive={false}>
        <Tooltip direction="left" opacity={0.85}>Linha do metrô</Tooltip>
      </Polyline>
      {ruas.map(r => (
        <Polyline key={r.nome} positions={r.pontos} pathOptions={{ color: '#FFFFFF', weight: 7, opacity: 1 }} interactive={false} />
      ))}
      {ruas.map(r => (
        <Polyline key={r.nome + 'b'} positions={r.pontos} pathOptions={{ color: '#D8CDB6', weight: 1, opacity: 1 }}>
          <Tooltip sticky>{r.nome}</Tooltip>
        </Polyline>
      ))}
      {trechos.map(t => (
        <Polyline key={t.id} positions={t.pontos} pathOptions={{ color: corTrecho(t), weight: 3, opacity: .55 }}>
          <Tooltip sticky>{t.nome}</Tooltip>
        </Polyline>
      ))}
    </>
  )
}
