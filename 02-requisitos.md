# MOVE RECIFE · Documentação da entrega 1 da AV2

**Parte:** Requisitos funcionais e não funcionais  
**Responsável:** José Elton  
[Voltar ao README](README.md)

## 3 Requisitos funcionais

_Para cada RF: a entrada, a saída, as regras que se aplicam e a prioridade na v0.1._

| ID | Comportamento esperado | Entrada e saída | Regras | Prioridade |
|---|---|---|---|---|
| RF01 | Mostrar a tela inicial com a escolha da área ou o uso da localização. | **Entrada** Toque em Recife Antigo, Boa Viagem ou Usar minha localização<br>**Saída** Mapa da área escolhida | RN01 | Essencial |
| RF02 | Exibir o mapa da área com estações, paradas de ônibus, metrô, táxi, patinetes e Bike Itaú, com filtros. | **Entrada** Área e filtros marcados<br>**Saída** Pontos da área, cada tipo com ícone e cor próprios | RN01 a RN03 | Essencial |
| RF03 | Abrir a página da estação pelo QR code. | **Entrada** Endereço /estacao/:id<br>**Saída** Nome, vagas, patinetes próximos e paradas mais próximas com distância, ou aviso | RN04, RN05 e RN12 | Essencial |
| RF04 | Abrir o app da Jet ou da Whoosh a partir da estação. | **Entrada** Toque em Abrir na Jet ou Abrir na Whoosh<br>**Saída** App da operadora ou página da loja | RN06 | Essencial |
| RF05 | Calcular o melhor caminho seguro até uma parada ou endereço. | **Entrada** Estação de origem e destino<br>**Saída** Rota no mapa, com Mais curto e Mais seguro, distância e tempo | RN07 a RN09 | Essencial |
| RF06 | Mostrar os avisos de segurança do caminho. | **Entrada** Rota calculada<br>**Saída** Lista de avisos dos trechos | RN07 | Essencial |
| RF07 | Mostrar um caminho mesmo sem internet. | **Entrada** Falha na API de rotas<br>**Saída** Rota de reserva ou linha reta, com aviso | RN10 | Importante |
| RF08 | Registrar corridas iniciadas e leituras de QR code e mostrar no painel. | **Entrada** Toques nos botões e leituras do QR<br>**Saída** Corridas por estação e operadora, leituras e comissão estimada | RN06, RN11 e RN12 | Importante |

## 4 Requisitos não funcionais

_Uma condição observável de qualidade ou uso e como alguém pode conferi-la._

| ID | Condição exigida | Como conferir |
|---|---|---|
| RNF01 | Todos os textos, botões e avisos estão em português do Brasil. | Percorrer o fluxo e ler os textos que aparecem. |
| RNF02 | Funciona no navegador do celular, sem instalar nada, com botões de pelo menos 44 px. | Abrir o link num celular comum e tocar os botões com uma mão. |
| RNF03 | O visual lembra o Recife: cores dos casarios, faixa de azulejo e ícones de estação em forma de sobrado. | Abrir a tela inicial e o mapa e localizar esses elementos. |
| RNF04 | Distâncias abaixo de 1 km aparecem em metros e acima em km com uma casa decimal. Tempos aparecem em minutos. | Conferir o formato na estação e no caminho, como 450 m, 1,2 km e 6 min. |
| RNF05 | Toda informação simulada aparece com o selo "dados de exemplo". | Abrir a página de uma estação e achar o selo junto aos patinetes. |
| RNF06 | O avaliador acessa o fluxo principal de graça, sem login e sem chave paga. | Abrir o link publicado num navegador comum e percorrer o fluxo. |
