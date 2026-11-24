// Modo prévia: quando o app roda num ambiente sem acesso ao OpenStreetMap
// (ex.: link de demonstração), usa um mapa ilustrado em vez dos blocos do OSM.
export const MODO_PREVIA = import.meta.env.VITE_PREVIA === '1'
