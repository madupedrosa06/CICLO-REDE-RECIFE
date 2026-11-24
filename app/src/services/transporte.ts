// Paradas de ônibus, metrô e táxi.
// Hoje lê arquivos JSON de exemplo. No futuro: ler o GTFS do Grande Recife Consórcio
// (stops.txt) e os dados abertos da CTTU em dados.recife.pe.gov.br.
import estacoesJson from '../data/estacoes.json'
import paradasJson from '../data/paradas.json'
import areasJson from '../data/areas.json'
import type { Area, AreaId, Estacao, LatLng, Parada } from '../types'
import { distancia } from '../lib/geo'

const estacoes = estacoesJson as Estacao[]
const paradas = paradasJson as Parada[]
const areas = areasJson as Area[]

export const DADOS_DE_EXEMPLO = true

export function listarAreas(): Area[] { return areas }
export function buscarArea(id: string): Area | undefined { return areas.find(a => a.id === id) }

export function listarEstacoes(area?: AreaId): Estacao[] {
  return area ? estacoes.filter(e => e.area === area) : estacoes
}
export function buscarEstacao(id: string): Estacao | undefined { return estacoes.find(e => e.id === id) }

export function listarParadas(): Parada[] { return paradas }
export function buscarParada(id: string): Parada | undefined { return paradas.find(p => p.id === id) }

/** Paradas mais próximas de um ponto, ordenadas pela distância em linha reta. */
export function paradasProximas(ponto: LatLng, raio = 2000) {
  return paradas
    .map(p => ({ ...p, dist: distancia(ponto, [p.lat, p.lng]) }))
    .filter(p => p.dist <= raio)
    .sort((a, b) => a.dist - b.dist)
}

/** Área mais perto de uma localização (usado no botão "Usar minha localização"). */
export function areaMaisProxima(ponto: LatLng): Area {
  return [...areas].sort((a, b) => distancia(ponto, a.centro) - distancia(ponto, b.centro))[0]
}

/** Exemplo de leitura futura do GTFS (não usado ainda). */
// export async function carregarGtfs(url: string) { ... ler stops.txt e converter em Parada[] ... }
