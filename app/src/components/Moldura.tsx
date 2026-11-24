import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Sobrados } from './Sobrados'

/** Cabeçalho com sobrados + faixa de azulejo, usado nas telas internas. */
export function Cabecalho({ titulo, voltar = '/', subtitulo }: { titulo: string; voltar?: string; subtitulo?: string }) {
  return (
    <header className="bg-azul text-white relative overflow-hidden">
      <div className="flex items-center gap-3 px-4 pt-3 pb-2 relative z-10">
        <Link to={voltar} className="botao min-h-[44px] min-w-[44px] px-0 bg-white/15 text-white" aria-label="Voltar">
          <span aria-hidden="true" className="text-xl">←</span>
        </Link>
        <div className="min-w-0">
          <p className="text-[11px] tracking-[.2em] font-semibold text-ocre">MOVE RECIFE</p>
          <h1 className="font-titulo text-xl font-bold leading-tight truncate">{titulo}</h1>
          {subtitulo && <p className="text-xs text-white/80 truncate">{subtitulo}</p>}
        </div>
      </div>
      <Sobrados className="w-full h-10 opacity-30 -mt-4 block" />
      <div className="faixa-azulejo" />
    </header>
  )
}

export function Rodape() {
  return (
    <footer className="mt-8 pb-8">
      <div className="faixa-azulejo" />
      <div className="px-4 pt-4 text-center text-sm text-tinta/70">
        <p className="font-titulo text-azul text-base font-bold">MOVE RECIFE</p>
        <p className="italic">Destrave o caminho, mova a cidade.</p>
        <nav className="mt-2 flex justify-center gap-4">
          <Link to="/sobre" className="underline min-h-[44px] inline-flex items-center">Sobre e fontes</Link>
          <Link to="/painel" className="underline min-h-[44px] inline-flex items-center">Painel</Link>
        </nav>
      </div>
    </footer>
  )
}

export function SeloExemplo({ children = 'dados de exemplo' }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-ocre/15 text-[#7A5410] border border-ocre/50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide">
      {children}
    </span>
  )
}
