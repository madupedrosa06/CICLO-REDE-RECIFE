// Cálculo do "melhor caminho seguro" na última milha.
// 1. Pede rotas de bicicleta (patinete anda como bike) ao OSRM público, com alternativas.
// 2. Dá uma nota de segurança para cada rota usando src/data/trechos-seguranca.json.
// 3. Devolve a mais curta e a mais segura. Se a internet/API falhar, usa a rota de reserva.
import trechosJson from '../data/trechos-seguranca.json'
import type { LatLng, Rota, Trecho } from '../types'
import { comprimento, distancia, distanciaALinha } from '../lib/geo'

const trechos = trechosJson.trechos as Trecho[]
const reservas = trechosJson.rotasReserva as { de: string; para: string; curto: LatLng[]; seguro: LatLng[] }[]

const OSRM = 'https://routing.openstreetmap.de/routed-bike/route/v1/bike'
const RAIO_TRECHO = 45 // metros: quão perto a rota precisa passar para "usar" o trecho

/** Nota da rota: soma de cada pedaço × peso do trecho mais influente por perto. */
export function avaliar(pontos: LatLng[], simulada = false): Rota {
  let pontuacao = 0
  const avisos = new Set<string>()
  for (let i = 1; i < pontos.length; i++) {
    const a = pontos[i - 1], b = pontos[i]
    const meio: LatLng = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
    const perto = trechos.filter(t => distanciaALinha(meio, t.pontos) <= RAIO_TRECHO)
    // trecho perigoso domina; senão vale o melhor trecho seguro
    const perigoso = perto.filter(t => t.peso > 1).sort((x, y) => y.peso - x.peso)[0]
    const bom = perto.filter(t => t.peso <= 1).sort((x, y) => x.peso - y.peso)[0]
    const escolhido = perigoso ?? bom
    pontuacao += distancia(a, b) * (escolhido?.peso ?? 1)
    perto.forEach(t => t.aviso && avisos.add(t.aviso))
  }
  return { pontos, distancia: comprimento(pontos), pontuacao, avisos: [...avisos], simulada }
}

async function pedirOsrm(de: LatLng, para: LatLng, via?: LatLng): Promise<LatLng[][]> {
  const coords = [de, ...(via ? [via] : []), para].map(p => `${p[1]},${p[0]}`).join(';')
  const url = `${OSRM}/${coords}?alternatives=${via ? 'false' : '3'}&overview=full&geometries=geojson`
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 6000)
  try {
    const r = await fetch(url, { signal: ctrl.signal })
    if (!r.ok) throw new Error('OSRM ' + r.status)
    const j = await r.json()
    return (j.routes ?? []).map((rt: { geometry: { coordinates: [number, number][] } }) =>
      rt.geometry.coordinates.map(([lng, lat]) => [lat, lng] as LatLng))
  } finally { clearTimeout(t) }
}

/** Ponto de passagem pelos trechos seguros próximos, para forçar uma alternativa mais segura. */
function viasSeguras(de: LatLng, para: LatLng): LatLng[] {
  const max = distancia(de, para) * 0.8
  return trechos
    .filter(t => t.peso < 1)
    .map(t => t.pontos[Math.floor(t.pontos.length / 2)])
    .filter(p => distancia(de, p) < max && distancia(para, p) < max)
    .slice(0, 2)
}

export interface ResultadoRotas { curta: Rota; segura: Rota }

export async function calcularRotas(de: LatLng, para: LatLng, ids?: { de: string; para: string }): Promise<ResultadoRotas> {
  try {
    const candidatas = await pedirOsrm(de, para)
    for (const via of viasSeguras(de, para)) {
      try { candidatas.push(...(await pedirOsrm(de, para, via))) } catch { /* ignora alternativa */ }
    }
    if (!candidatas.length) throw new Error('sem rotas')
    const avaliadas = candidatas.map(p => avaliar(p))
    const curta = [...avaliadas].sort((a, b) => a.distancia - b.distancia)[0]
    // a segura não pode ser absurdamente maior (até 60% a mais que a curta)
    const segura = avaliadas
      .filter(r => r.distancia <= curta.distancia * 1.6)
      .sort((a, b) => a.pontuacao - b.pontuacao)[0]
    return { curta, segura }
  } catch {
    const reserva = ids && reservas.find(r => r.de === ids.de && r.para === ids.para)
    if (reserva) return { curta: avaliar(reserva.curto, true), segura: avaliar(reserva.seguro, true) }
    const reta = avaliar([de, para], true)
    return { curta: reta, segura: reta }
  }
}

/** Busca de endereço no Recife (Nominatim / OpenStreetMap). */
export async function buscarEndereco(texto: string): Promise<{ nome: string; ponto: LatLng }[]> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=br&viewbox=-35.02,-7.93,-34.85,-8.16&bounded=1&q=${encodeURIComponent(texto + ', Recife')}`
  const r = await fetch(url, { headers: { 'Accept-Language': 'pt-BR' } })
  if (!r.ok) return []
  const j: { display_name: string; lat: string; lon: string }[] = await r.json()
  return j.map(x => ({ nome: x.display_name.split(',').slice(0, 3).join(','), ponto: [Number(x.lat), Number(x.lon)] as LatLng }))
}
