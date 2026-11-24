import { useState } from 'react'
import { Cabecalho, Rodape } from '../components/Moldura'
import { lerEventos, limparEventos } from '../services/eventos'
import { operadoras } from '../services/operadoras'
import { listarEstacoes } from '../services/transporte'

const real = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function Painel() {
  const [eventos, setEventos] = useState(lerEventos())
  const corridas = eventos.filter(e => e.tipo === 'corrida')
  const qrs = eventos.filter(e => e.tipo === 'qr')
  const comissaoPorCorrida = operadoras.corridaMedia * operadoras.comissao

  const linhas = listarEstacoes().map(est => {
    const c = corridas.filter(e => e.estacao === est.id)
    const conta = (op: string) => c.filter(e => e.tipo === 'corrida' && e.operadora === op).length
    return { est, jet: conta('jet'), whoosh: conta('whoosh'), bike: conta('bikeitau'), total: c.length, qr: qrs.filter(e => e.estacao === est.id).length }
  })

  return (
    <main>
      <Cabecalho titulo="Painel" subtitulo="Corridas e viagens iniciadas pelo app" />
      <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <Bloco valor={String(corridas.length)} rotulo="corridas iniciadas" />
          <Bloco valor={String(qrs.length)} rotulo="QR codes abertos" />
          <Bloco valor={real(corridas.length * comissaoPorCorrida)} rotulo="comissão estimada" />
        </div>
        <p className="text-sm text-tinta/70">
          Estimativa: corrida média de {real(operadoras.corridaMedia)} × comissão de {Math.round(operadoras.comissao * 100)}% = {real(comissaoPorCorrida)} por corrida iniciada pelo MOVE RECIFE.
          Os números ficam salvos só neste aparelho.
        </p>
        <div className="cartao overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-azul text-white">
              <tr><th className="text-left p-2">Estação</th><th className="p-2">QR</th><th className="p-2">Jet</th><th className="p-2">Whoosh</th><th className="p-2">Bike Itaú</th><th className="p-2">Comissão</th></tr>
            </thead>
            <tbody>
              {linhas.map(l => (
                <tr key={l.est.id} className="border-t border-azul/10">
                  <td className="p-2">{l.est.nome}</td>
                  <td className="p-2 text-center">{l.qr}</td>
                  <td className="p-2 text-center">{l.jet}</td>
                  <td className="p-2 text-center">{l.whoosh}</td>
                  <td className="p-2 text-center">{l.bike}</td>
                  <td className="p-2 text-right">{real(l.total * comissaoPorCorrida)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="botao-claro" onClick={() => { if (confirm('Apagar os registros deste aparelho?')) { limparEventos(); setEventos([]) } }}>
          Zerar registros
        </button>
      </div>
      <Rodape />
    </main>
  )
}

function Bloco({ valor, rotulo }: { valor: string; rotulo: string }) {
  return (
    <div className="cartao p-3 text-center">
      <p className="font-titulo text-xl sm:text-2xl font-bold text-azul break-words">{valor}</p>
      <p className="text-xs text-tinta/70">{rotulo}</p>
    </div>
  )
}
