import { abrirApp, operadoras } from '../services/operadoras'
import type { OperadoraId } from '../types'

const fundos: Record<OperadoraId, string> = { jet: '#DDF0CF', whoosh: '#FFF1B8', bikeitau: '#FFE1C7' }
const unidade: Record<OperadoraId, [string, string]> = {
  jet: ['patinete', 'patinetes'], whoosh: ['patinete', 'patinetes'], bikeitau: ['bicicleta', 'bicicletas']
}

/** Botões para abrir os apps. Patinetes lado a lado e Bike Itaú embaixo, ocupando a largura. */
export function BotoesOperadora({ estacaoId, contagem, mostrar = ['jet', 'whoosh', 'bikeitau'] }:
  { estacaoId: string; contagem?: Partial<Record<OperadoraId, number>>; mostrar?: OperadoraId[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {mostrar.map(op => {
        const n = contagem?.[op]
        return (
          <button key={op} onClick={() => abrirApp(op, estacaoId)}
            className={`botao text-tinta border-2 border-tinta/10 flex-col py-2 ${op === 'bikeitau' || mostrar.length === 1 ? 'col-span-2' : ''}`}
            style={{ background: fundos[op] }}>
            <span>{op === 'bikeitau' ? '🚲 ' : '🛴 '}Abrir {op === 'bikeitau' ? 'no' : 'na'} {operadoras[op].nome}</span>
            {n !== undefined && <span className="text-xs font-normal">{n} {unidade[op][n === 1 ? 0 : 1]} perto</span>}
          </button>
        )
      })}
    </div>
  )
}
