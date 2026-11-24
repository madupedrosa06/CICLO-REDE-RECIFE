import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Cabecalho, Rodape, SeloExemplo } from '../components/Moldura'
import { FachadaSvg } from '../components/Sobrados'
import { BotoesOperadora } from '../components/BotoesOperadora'
import { coresParada, nomesParada } from '../components/icones'
import { buscarArea, buscarEstacao, paradasProximas } from '../services/transporte'
import { bicicletasPerto, buscarBicicletas, buscarPatinetes, patinetesPerto } from '../services/operadoras'
import { registrarQr } from '../services/eventos'
import { formatarDistancia, minutos } from '../lib/geo'
import type { EstacaoBike, OperadoraId, Patinete } from '../types'

export default function Estacao() {
  const { id = '' } = useParams()
  const [qs] = useSearchParams()
  const estacao = buscarEstacao(id)
  const [patinetes, setPatinetes] = useState<Patinete[]>([])
  const [bikes, setBikes] = useState<EstacaoBike[]>([])

  useEffect(() => {
    if (!estacao) return
    buscarPatinetes(estacao.area).then(l => setPatinetes(patinetesPerto(l, [estacao.lat, estacao.lng])))
    buscarBicicletas(estacao.area).then(l => setBikes(bicicletasPerto(l, [estacao.lat, estacao.lng])))
    // conta a abertura do QR code uma vez por sessão
    if (qs.get('origem') === 'qr') {
      const chave = `qr:${estacao.id}`
      try { if (!sessionStorage.getItem(chave)) { registrarQr(estacao.id); sessionStorage.setItem(chave, '1') } } catch { registrarQr(estacao.id) }
    }
  }, [estacao, qs])

  if (!estacao) {
    return (
      <main><Cabecalho titulo="Estação não encontrada" />
        <p className="p-4">Não achamos essa estação. <Link className="underline text-azul" to="/">Voltar ao início</Link></p>
      </main>
    )
  }

  const area = buscarArea(estacao.area)!
  const paradas = paradasProximas([estacao.lat, estacao.lng], 1500).slice(0, 6)
  const contagem: Record<OperadoraId, number> = {
    jet: patinetes.filter(p => p.operadora === 'jet').length,
    whoosh: patinetes.filter(p => p.operadora === 'whoosh').length,
    bikeitau: bikes.reduce((t, b) => t + b.bikes, 0)
  }

  return (
    <main>
      <Cabecalho titulo={estacao.nome} subtitulo={area.nome} voltar={`/mapa/${area.id}`} />
      <div className="max-w-md mx-auto px-4 py-5 space-y-5">
        <section className="cartao overflow-hidden">
          <div className="azulejo flex items-end justify-center gap-1 pt-6 px-4" aria-hidden="true">
            <FachadaSvg cor="#D9A13B" tamanho={60} />
            <FachadaSvg cor={estacao.cor} tamanho={92} />
            <FachadaSvg cor="#D9707E" tamanho={60} />
          </div>
          <div className="p-4">
            <p className="text-sm text-tinta/70">{estacao.referencia}</p>
            <div className="grid grid-cols-2 gap-2 mt-3 text-center">
              <Info valor={estacao.vagas} rotulo="vagas" />
              <Info valor={contagem.jet} rotulo="Jet perto" />
              <Info valor={contagem.whoosh} rotulo="Whoosh perto" />
              <Info valor={contagem.bikeitau} rotulo="Bike Itaú perto" />
            </div>
            <div className="mt-2"><SeloExemplo>patinetes e bicicletas: dados de exemplo</SeloExemplo></div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-titulo text-xl font-bold text-azul">Pegue um patinete ou uma bike</h2>
          <BotoesOperadora estacaoId={estacao.id} contagem={contagem} />
          <Link to={`/caminho/${estacao.id}`} className="botao-azul w-full text-lg">🛡️ Melhor caminho seguro</Link>
        </section>

        <section>
          <h2 className="font-titulo text-xl font-bold text-azul mb-2">Paradas perto daqui</h2>
          <ul className="space-y-2">
            {paradas.map(p => (
              <li key={p.id}>
                <Link to={`/caminho/${estacao.id}?para=${p.id}`} className="cartao flex items-center gap-3 p-3 hover:bg-[#F4F7FC]">
                  <span className="w-10 h-10 rounded-lg grid place-items-center text-white text-lg font-bold shrink-0" style={{ background: coresParada[p.tipo] }}>
                    {{ onibus: '🚌', metro: 'Ⓜ', taxi: '🚕' }[p.tipo]}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold truncate">{p.nome}</span>
                    <span className="block text-[11px] uppercase tracking-wide text-terracota font-semibold">{nomesParada[p.tipo]}</span>
                    <span className="block text-xs text-tinta/70">{formatarDistancia(p.dist)} · {minutos(p.dist, 'patinete')} min de patinete ou bike · {minutos(p.dist, 'pe')} min a pé</span>
                  </span>
                  <span aria-hidden="true" className="text-azul text-xl">›</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-tinta/60 mt-2">Fontes: Grande Recife Consórcio, CBTU/Metrorec e CTTU. Distâncias em linha reta.</p>
        </section>
      </div>
      <Rodape />
    </main>
  )
}

function Info({ valor, rotulo }: { valor: number; rotulo: string }) {
  return (
    <div className="rounded-xl bg-creme py-2">
      <p className="font-titulo text-2xl font-bold text-azul">{valor}</p>
      <p className="text-xs text-tinta/70">{rotulo}</p>
    </div>
  )
}
