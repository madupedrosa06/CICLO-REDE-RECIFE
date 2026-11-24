export type AreaId = 'recife-antigo' | 'boa-viagem' | 'joana-bezerra'
export type LatLng = [number, number]

export interface Area { id: AreaId; nome: string; centro: LatLng; zoom: number; cor: string }

export interface Estacao {
  id: string; nome: string; area: AreaId; lat: number; lng: number
  vagas: number; cor: string; referencia: string
}

export type TipoParada = 'onibus' | 'metro' | 'taxi'
export interface Parada {
  id: string; nome: string; tipo: TipoParada; lat: number; lng: number
  linhas?: string[]; fonte: string
}

export type OperadoraId = 'jet' | 'whoosh' | 'bikeitau'
export type OperadoraPatinete = 'jet' | 'whoosh'

/** Estação de bicicleta compartilhada do Bike Itaú (Tembici). */
export interface EstacaoBike { id: string; nome: string; lat: number; lng: number; bikes: number; vagas: number }
export interface Patinete { id: string; operadora: OperadoraPatinete; lat: number; lng: number; bateria: number }

export interface Trecho {
  id: string; nome: string; tipo: 'ciclofaixa' | 'ciclovia' | 'iluminado' | 'semaforo' | 'perigoso'
  peso: number; aviso?: string; pontos: LatLng[]
}

export interface Rota {
  pontos: LatLng[]
  distancia: number   // metros
  pontuacao: number   // distância ponderada pela segurança (menor = melhor)
  avisos: string[]
  simulada: boolean   // true quando veio da rota de reserva ou linha reta
}
