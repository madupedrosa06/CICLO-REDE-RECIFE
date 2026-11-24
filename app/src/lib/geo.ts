import type { LatLng } from '../types'

const R = 6371000

/** Distância em metros entre dois pontos (fórmula de Haversine). */
export function distancia(a: LatLng, b: LatLng): number {
  const rad = Math.PI / 180
  const dLat = (b[0] - a[0]) * rad
  const dLng = (b[1] - a[1]) * rad
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * rad) * Math.cos(b[0] * rad) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

export function comprimento(pontos: LatLng[]): number {
  let total = 0
  for (let i = 1; i < pontos.length; i++) total += distancia(pontos[i - 1], pontos[i])
  return total
}

/** Distância aproximada (m) de um ponto até um segmento, numa projeção plana local. */
export function distanciaAoSegmento(p: LatLng, a: LatLng, b: LatLng): number {
  const kx = 111320 * Math.cos((p[0] * Math.PI) / 180)
  const ky = 110540
  const ax = (a[1] - p[1]) * kx, ay = (a[0] - p[0]) * ky
  const bx = (b[1] - p[1]) * kx, by = (b[0] - p[0]) * ky
  const dx = bx - ax, dy = by - ay
  const len = dx * dx + dy * dy
  let t = len === 0 ? 0 : -(ax * dx + ay * dy) / len
  t = Math.max(0, Math.min(1, t))
  const cx = ax + t * dx, cy = ay + t * dy
  return Math.sqrt(cx * cx + cy * cy)
}

export function distanciaALinha(p: LatLng, linha: LatLng[]): number {
  let min = Infinity
  for (let i = 1; i < linha.length; i++) min = Math.min(min, distanciaAoSegmento(p, linha[i - 1], linha[i]))
  return min
}

export function formatarDistancia(m: number): string {
  return m < 1000 ? `${Math.round(m / 10) * 10} m` : `${(m / 1000).toFixed(1).replace('.', ',')} km`
}

/** Minutos estimados: patinete ~12 km/h, a pé ~4,5 km/h. */
export function minutos(m: number, modo: 'patinete' | 'pe'): number {
  const kmh = modo === 'patinete' ? 12 : 4.5
  return Math.max(1, Math.round((m / 1000 / kmh) * 60))
}
