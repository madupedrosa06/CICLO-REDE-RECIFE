import L from 'leaflet'
import type { OperadoraPatinete, TipoParada } from '../types'

const fachada = (cor: string) => `
<svg width="34" height="38" viewBox="0 0 40 44" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 42 V14 Q20 0 36 14 V42 Z" fill="${cor}" stroke="#FBF5E9" stroke-width="3"/>
  <rect x="10" y="17" width="6" height="9" rx="3" fill="#FBF5E9"/><rect x="24" y="17" width="6" height="9" rx="3" fill="#FBF5E9"/>
  <rect x="16" y="29" width="8" height="13" rx="4" fill="#FBF5E9"/></svg>`

export const iconeEstacao = (cor: string, destaque = false) =>
  L.divIcon({
    className: 'icone-mapa',
    html: `<div style="filter:drop-shadow(0 2px 3px #0005);transform:scale(${destaque ? 1.3 : 1})">${fachada(cor)}</div>`,
    iconSize: [34, 38], iconAnchor: [17, 38]
  })

export const coresParada: Record<TipoParada, string> = { onibus: '#B5532F', metro: '#1F4E8C', taxi: '#D9A13B' }
const letrasParada: Record<TipoParada, string> = { onibus: '🚌', metro: 'Ⓜ', taxi: '🚕' }
export const nomesParada: Record<TipoParada, string> = { onibus: 'Ônibus', metro: 'Metrô', taxi: 'Táxi' }

export const iconeParada = (tipo: TipoParada) =>
  L.divIcon({
    className: 'icone-mapa',
    html: `<div style="width:28px;height:28px;border-radius:8px;background:${coresParada[tipo]};border:2px solid #fff;display:grid;place-items:center;font-size:14px;color:#fff;font-weight:700;box-shadow:0 2px 4px #0004">${letrasParada[tipo]}</div>`,
    iconSize: [28, 28], iconAnchor: [14, 14]
  })

export const coresOperadora = { jet: '#5FA82F', whoosh: '#E2B400', bikeitau: '#EC7000' }

export const iconeBike = (bikes: number) =>
  L.divIcon({
    className: 'icone-mapa',
    html: `<div style="height:24px;padding:0 6px;border-radius:12px;background:#EC7000;border:2px solid #fff;box-shadow:0 1px 3px #0005;display:flex;align-items:center;gap:3px;font-size:12px;font-weight:800;color:#fff;white-space:nowrap">🚲 ${bikes}</div>`,
    iconSize: [44, 24], iconAnchor: [22, 12]
  })

export const iconePatinete = (op: OperadoraPatinete) =>
  L.divIcon({
    className: 'icone-mapa',
    html: `<div style="width:20px;height:20px;border-radius:50%;background:${coresOperadora[op]};border:2px solid #fff;box-shadow:0 1px 3px #0005;display:grid;place-items:center;font-size:10px;font-weight:800;color:#1E2430">${op === 'jet' ? 'J' : 'W'}</div>`,
    iconSize: [20, 20], iconAnchor: [10, 10]
  })

export const iconeVoce = L.divIcon({
  className: 'icone-mapa',
  html: `<div style="width:18px;height:18px;border-radius:50%;background:#2C5DA8;border:3px solid #fff;box-shadow:0 0 0 6px #2C5DA855"></div>`,
  iconSize: [18, 18], iconAnchor: [9, 9]
})
