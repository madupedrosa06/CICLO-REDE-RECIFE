# MOVE RECIFE · Documentação da entrega 1 da AV2

**Parte:** Escopo da v0.1, tecnologia e backlog  
**Responsável:** João Perrelli  
[Voltar ao README](README.md)

## 7 Escopo e tecnologia da primeira versão

_O que entra na v0.1 e o que fica fora desta entrega. O escopo pode mudar nas próximas versões, conforme o grupo testa e melhora o app._

| Incluído na v0.1 | Fora da v0.1 |
|---|---|
| Tela inicial e mapas do Recife Antigo e de Boa Viagem com estações, paradas e filtros. | Construção das estações físicas e autorização da Prefeitura. |
| Página da estação aberta pelo QR code, com patinetes e paradas próximas. | Login, cadastro e histórico de viagens. |
| Botões Abrir na Jet e Abrir na Whoosh, com ida para a loja quando o app não abre. | API real da Jet e da Whoosh, desbloqueio e pagamento dentro do app. |
| Melhor caminho seguro com pesos por trecho, avisos e rota de reserva. | Horários de ônibus em tempo real (GTFS) e verificação dos pontos na rua. |
| Painel simples com corridas iniciadas, leituras de QR e comissão estimada. | Cobrança real da comissão, back-end e relatórios para as operadoras. |

### Fluxo principal planejado

1. A pessoa desce do metrô e lê o QR code da estação MOVE RECIFE.
2. Vê a estação, os patinetes por perto e as paradas próximas.
3. Toca em Melhor caminho seguro e escolhe a parada ou digita o endereço.
4. Compara Mais curto e Mais seguro e lê os avisos do caminho.
5. Toca em Abrir na Jet ou Abrir na Whoosh, faz a corrida e devolve o patinete numa estação.

**Tecnologia e ambiente.** App web (PWA) em React, Vite e TypeScript, com Tailwind CSS. Mapa com Leaflet e OpenStreetMap, rotas pelo OSRM público e busca de endereço pelo Nominatim. Os dados ficam em arquivos JSON na pasta src/data. Publicação gratuita na Vercel.

**Motivo da escolha.** A pessoa abre pelo QR code no navegador do celular, sem instalar nada. Todas as bibliotecas e serviços são gratuitos e sem chave. Os JSON podem ser trocados por uma API real depois sem mudar as telas.

## 8 Backlog e responsabilidades

_Tarefas desta entrega, com resultado, responsável, quem revisa e prazo. Cada integrante ficou com uma parte do documento e envia essa parte ao repositório no próprio commit._

| ID | Resultado esperado | Responsável | Apoio ou revisão | Previsão |
|---|---|---|---|---|
| T01 | Identificação, visão geral, história de usuário e esclarecimentos (seções 1 e 2). Organização do repositório. | Maria Eduarda | João Perrelli | 16/11 |
| T02 | Requisitos funcionais e não funcionais (seções 3 e 4). | José Elton | João Pedro Barros | 16/11 |
| T03 | Regras de negócio e dados (seção 5). | Yasmin Barbosa | Maria Eduarda | 16/11 |
| T04 | Critérios de aceitação e conferência do caso de limite (seção 6). | João Pedro Barros | Yasmin Barbosa | 16/11 |
| T05 | Escopo da v0.1, tecnologia e backlog (seções 7 e 8). | João Perrelli | José Elton | 16/11 |
