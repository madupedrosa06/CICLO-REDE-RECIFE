import { Cabecalho, Rodape } from '../components/Moldura'

export default function Sobre() {
  return (
    <main>
      <Cabecalho titulo="Sobre o MOVE RECIFE" />
      <article className="max-w-md mx-auto px-4 py-5 space-y-4 text-[15px] leading-relaxed">
        <p className="font-titulo italic text-xl text-azul">Destrave o caminho, mova a cidade.</p>
        <p>O MOVE RECIFE conecta estações de patinete e bicicleta, com desenho inspirado na arquitetura do Recife, às paradas de ônibus, metrô e táxi. As estações organizam os patinetes e deixam a calçada livre.</p>
        <p>Pelo QR code da estação você vê os patinetes da Jet e da Whoosh, as bicicletas do Bike Itaú, as paradas mais próximas e o caminho mais seguro para a última parte da viagem.</p>
        <h2 className="font-titulo text-lg font-bold text-azul">De onde vêm os dados</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Patinetes e preços: Jet e Whoosh (nesta versão, dados de exemplo).</li>
          <li>Bicicletas compartilhadas: Bike Itaú / Tembici (nesta versão, dados de exemplo).</li>
          <li>Ônibus: Grande Recife Consórcio de Transporte.</li>
          <li>Metrô: CBTU / Metrorec.</li>
          <li>Táxi, ciclofaixas e trânsito: CTTU e dados.recife.pe.gov.br.</li>
          <li>Mapa e rotas: OpenStreetMap e OSRM.</li>
        </ul>
        <p className="text-sm bg-ocre/15 border border-ocre/40 rounded-xl p-3">Horários, disponibilidade de patinetes e preços vêm das operadoras e podem mudar. Confira sempre no app da operadora antes de destravar.</p>
        <p className="text-sm text-tinta/70">Projeto Integrador · CESAR School · Recife, 2026.</p>
      </article>
      <Rodape />
    </main>
  )
}
