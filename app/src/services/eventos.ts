// Registro simples de eventos para o modelo de receita (comissão de 10% por corrida iniciada).
// Hoje fica no localStorage do aparelho. Depois: enviar para um back-end ou planilha.
import type { OperadoraId } from '../types'

export type Evento =
  | { tipo: 'corrida'; operadora: OperadoraId; estacao: string; quando: string }
  | { tipo: 'qr'; estacao: string; quando: string }

const CHAVE = 'moverecife:eventos'

export function lerEventos(): Evento[] {
  try { return JSON.parse(localStorage.getItem(CHAVE) || '[]') } catch { return [] }
}

function salvar(e: Evento) {
  try {
    const todos = lerEventos()
    todos.push(e)
    localStorage.setItem(CHAVE, JSON.stringify(todos.slice(-5000)))
  } catch { /* sem armazenamento: segue sem registrar */ }
}

export function registrarCorrida(operadora: OperadoraId, estacao: string) {
  salvar({ tipo: 'corrida', operadora, estacao, quando: new Date().toISOString() })
}

export function registrarQr(estacao: string) {
  salvar({ tipo: 'qr', estacao, quando: new Date().toISOString() })
}

export function limparEventos() {
  try { localStorage.removeItem(CHAVE) } catch { /* nada */ }
}
