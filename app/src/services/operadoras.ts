// Integração com as operadoras de patinete (Jet e Whoosh) e de bicicleta (Bike Itaú / Tembici).
// Elas não têm API pública garantida, então hoje:
//  - os patinetes vêm de src/data/patinetes.json (dados de exemplo)
//  - "abrir o app" usa deep link e, se não abrir, leva para a loja.
// Quando houver API oficial, troque o corpo de buscarPatinetes() pela chamada real.
import patinetesJson from '../data/patinetes.json'
import operadorasJson from '../data/operadoras.json'
import bicicletasJson from '../data/bicicletas.json'
import type { AreaId, EstacaoBike, LatLng, OperadoraId, Patinete } from '../types'
import { distancia } from '../lib/geo'
import { registrarCorrida } from './eventos'

interface InfoOperadora { nome: string; cor: string; deepLink: string; android: string; ios: string; site: string }

export const operadoras = operadorasJson as unknown as Record<OperadoraId, InfoOperadora> & { corridaMedia: number; comissao: number }

export async function buscarPatinetes(area: AreaId): Promise<Patinete[]> {
  // API REAL ENTRARIA AQUI, ex.: fetch(`https://api.operadora.com/v1/scooters?bbox=...`)
  const dados = patinetesJson as unknown as Record<string, Patinete[]>
  return dados[area] ?? []
}

/** Estações do Bike Itaú. A Tembici publica GBFS (station_information + station_status):
 *  quando houver acesso, troque a leitura do JSON por esse feed. */
export async function buscarBicicletas(area: AreaId): Promise<EstacaoBike[]> {
  const dados = bicicletasJson as unknown as Record<string, EstacaoBike[]>
  return dados[area] ?? []
}

export function bicicletasPerto(lista: EstacaoBike[], ponto: LatLng, raio = 400) {
  return lista.filter(b => distancia(ponto, [b.lat, b.lng]) <= raio)
}

export function patinetesPerto(lista: Patinete[], ponto: LatLng, raio = 300) {
  return lista.filter(p => distancia(ponto, [p.lat, p.lng]) <= raio)
}

/** Monta o link com parâmetro de origem para a operadora identificar a corrida. */
export function linkComOrigem(base: string, estacaoId: string) {
  const sep = base.includes('?') ? '&' : '?'
  return `${base}${sep}ref=moverecife&estacao=${encodeURIComponent(estacaoId)}`
}

function sistema(): 'android' | 'ios' | 'outro' {
  const ua = navigator.userAgent
  if (/android/i.test(ua)) return 'android'
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios'
  return 'outro'
}

/** Abre o app da operadora. Se em ~1,5 s a página ainda estiver visível, abre a loja. */
export function abrirApp(operadora: OperadoraId, estacaoId: string) {
  const info = operadoras[operadora]
  registrarCorrida(operadora, estacaoId)
  const so = sistema()
  const loja = so === 'android' ? info.android : so === 'ios' ? info.ios : info.site
  if (so === 'outro') { window.open(linkComOrigem(loja, estacaoId), '_blank', 'noopener'); return }

  const inicio = Date.now()
  const reserva = setTimeout(() => {
    if (document.visibilityState === 'visible' && Date.now() - inicio < 3000) {
      window.location.href = linkComOrigem(loja, estacaoId)
    }
  }, 1500)
  document.addEventListener('visibilitychange', () => clearTimeout(reserva), { once: true })
  window.location.href = linkComOrigem(info.deepLink, estacaoId)
}
