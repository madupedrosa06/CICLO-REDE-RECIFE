# Documentação da entrega 1 da AV2

**MOVE RECIFE** · Destrave o caminho, mova a cidade.

_Fundamentos de Programação • ADM Tech_

Documentação do projeto MOVE RECIFE, da Lente 3 (micromobilidade integrada ao transporte público no Recife). Na entrega de 17/11, o grupo apresenta as definições e o planejamento da v0.1.

_Os patinetes da Jet e da Whoosh e as bicicletas do Bike Itaú aparecem com dados de exemplo, porque as operadoras não têm API pública. Paradas, metrô e táxi seguem as fontes oficiais, com coordenadas aproximadas._

### Identificação do grupo

| Campo | Preenchimento |
|---|---|
| Projeto e equipe | MOVE RECIFE, Equipe Ciclo Rede Recife (grupo 3) |
| Lente ou caso de referência | Lente 3: micromobilidade no Recife integrada ao transporte público, sem bloquear as calçadas |
| Turma e docente | ADM Tech, José Adeilmo Nunes Barbosa Junior |
| Versão e data | Planejamento da v0.1, 16/11/2026 |
| Repositório | https://github.com/madupedrosa06/CICLO-REDE-RECIFE |

_A URL do GitHub tem acesso de leitura para o docente. Os integrantes e seus usuários estão na seção 9._

## 1 Visão geral do projeto

**Contexto e problema.** No Recife, quem desce do ônibus ou do metrô ainda precisa andar o último trecho até o destino, normalmente entre 500 m e 2 km. Os patinetes da Jet e da Whoosh ajudam nesse trecho, mas ficam largados nas calçadas do Recife Antigo e de Boa Viagem, e a pessoa não sabe qual caminho é mais seguro para ir de patinete, com ciclofaixa, rua iluminada e semáforo.

**Usuário principal.** Quem usa ônibus ou metrô e faz a última milha a pé ou de patinete, e também o turista no Recife Antigo. Essa pessoa está em pé numa parada, com o celular numa mão.

**Objetivo.** A partir de uma estação MOVE RECIFE (com desenho inspirado na arquitetura recifense), mostrar no celular os patinetes, as paradas próximas e o melhor caminho seguro até o destino, e abrir o app da Jet ou da Whoosh para a corrida.

**Recorte.** Um app web simples, aberto pelo QR code da estação, com mapas do Recife Antigo e de Boa Viagem e uma estação em Joana Bezerra para o exemplo do caminho seguro. Sem login, sem pagamento dentro do app e sem verificação dos pontos pela equipe.

## 2 História de usuário e esclarecimentos

**História de usuário.** Como pessoa que desce do metrô na Estação Joana Bezerra, quero ler o QR code da estação e ver o caminho mais seguro de patinete até a parada onde vou pegar o ônibus, para chegar sem passar por trechos perigosos e deixar o patinete no lugar certo.

_Perguntas que afetam o recorte, com a origem da resposta: uma fonte, uma decisão da equipe ou pendente._

| Pergunta de esclarecimento | Resposta | Origem |
|---|---|---|
| Quem usa a solução? | Quem faz a última milha depois do ônibus ou do metrô, e o turista no Recife Antigo. | Decisão da equipe (Artefato III) |
| O app aluga o patinete? | Não. Ele abre o app da Jet ou da Whoosh. Desbloqueio e pagamento ficam com a operadora. | Decisão da equipe |
| De onde vêm os dados das paradas? | Grande Recife Consórcio (ônibus), CBTU/Metrorec (metrô) e CTTU (táxi). | Fontes oficiais |
| E os dados dos patinetes? | Dados de exemplo em JSON, porque Jet e Whoosh não têm API pública. O código já tem o lugar da API real. | Decisão da equipe |
| A equipe confere os pontos na rua? | Não. Os dados vêm das operadoras e das fontes oficiais. | Decisão da equipe |
| Precisa de login? | Não. Basta abrir o link ou ler o QR code. | Decisão da equipe |
| Jet e Whoosh aceitam pagar 10% por corrida iniciada pelo app? | Ainda não sabemos. Na v0.1 o valor é só uma estimativa no painel. | Pendente |
| A Prefeitura autoriza as estações físicas? | Ainda não sabemos. A estação física fica fora da v0.1. | Pendente |

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

## 5 Regras de negócio e dados

_As condições que determinam o comportamento da solução, com a origem de cada regra. As decisões que a equipe ainda precisa confirmar estão marcadas como pendentes._

### Estações de referência

_Dados do arquivo estacoes.json. Coordenadas aproximadas. As estações físicas ainda não existem; na v0.1 elas são pontos no mapa._

| Estação | Área | Vagas |
|---|---|---|
| Marco Zero | Recife Antigo | 12 |
| Rua do Bom Jesus | Recife Antigo | 10 |
| Praça do Arsenal | Recife Antigo | 10 |
| Cais da Alfândega | Recife Antigo | 14 |
| Estação Recife (metrô) | Recife Antigo | 16 |
| Segundo Jardim | Boa Viagem | 12 |
| Pracinha de Boa Viagem | Boa Viagem | 14 |
| Parque Dona Lindu | Boa Viagem | 12 |
| Shopping Recife | Boa Viagem | 16 |
| Av. Domingos Ferreira | Boa Viagem | 10 |
| Estação Joana Bezerra | Joana Bezerra (exemplo do caminho seguro) | 16 |

### Parâmetros usados nos cálculos

| Parâmetro | Valor | Origem |
|---|---|---|
| Velocidade de patinete | 12 km/h | Decisão da equipe |
| Velocidade a pé | 4,5 km/h | Decisão da equipe |
| Corrida média | R$ 9,10 | Tarifas da Jet e da Whoosh (Diário de PE, mar/2026) |
| Comissão por corrida iniciada | 10% | Premissa do Artefato III, pendente com as operadoras |

### Regras aplicadas

| ID | Regra | Origem |
|---|---|---|
| RN01 | O app cobre o Recife Antigo e Boa Viagem. A estação Joana Bezerra entra só para o exemplo do caminho seguro. | Recorte da equipe |
| RN02 | Paradas de ônibus, metrô e táxi vêm do Grande Recife, da CBTU/Metrorec e da CTTU. A equipe não confere pontos na rua. | Decisão da equipe |
| RN03 | Patinetes e bicicletas são dados de exemplo e sempre aparecem com o selo "dados de exemplo". | Decisão da equipe |
| RN04 | A página da estação mostra até 6 paradas num raio de 1,5 km, da mais perto para a mais longe. | Decisão da equipe |
| RN05 | Se o id da estação não existir, o app mostra "Estação não encontrada" e um caminho de volta ao início. | Decisão da equipe |
| RN06 | O link para a operadora leva ?ref=moverecife&estacao=<id>. Se o app não abrir, vai para a loja do celular (Google Play no Android, App Store no iPhone). Cada toque registra uma corrida iniciada. | Decisão da equipe |
| RN07 | Cada pedaço da rota vale a distância vezes o peso do trecho mais próximo (até 45 m). Peso menor que 1 favorece (ciclofaixa, rua iluminada, semáforo), maior que 1 penaliza (trânsito pesado). Se houver trecho perigoso perto, ele vale. Sem trecho perto, o peso é 1. | Decisão da equipe (trechos-seguranca.json) |
| RN08 | O Mais seguro é a rota de menor nota entre as que têm até 60% a mais que a mais curta, inclusive. | Decisão da equipe |
| RN09 | Tempo = distância dividida pela velocidade, arredondado em minutos, com mínimo de 1 min. | Cálculo da rota |
| RN10 | Sem internet, o app usa a rota de reserva salva para aquele par de pontos. Se não houver, usa uma linha reta. Nos dois casos, avisa na tela. | Decisão da equipe |
| RN11 | Comissão estimada = número de corridas iniciadas × R$ 9,10 × 10%. | Premissa do Artefato III (pendente) |
| RN12 | Cada abertura pelo QR code (endereço com ?origem=qr) soma uma leitura para aquela estação. | Decisão da equipe |

### Relação entre o requisito e o critério

O RF05 pede que o app mostre o caminho mais seguro. A RN07 define como cada rota ganha a nota e a RN08 define o limite de 60%. O CA06 usa uma rota exatamente 60% maior que a mais curta para verificar se o próprio limite ainda entra como Mais seguro.

## 6 Critérios de aceitação

_Um cenário verificável para cada comportamento importante, com a condição inicial no Dado, a ação no Quando e o resultado esperado no Então. Nesta etapa registramos o resultado esperado. Os resultados observados serão anotados na entrega da versão executável._

| ID | Dado | Quando | Então | RF e RN |
|---|---|---|---|---|
| CA01 | A tela inicial aberta. | A pessoa toca em Recife Antigo. | Abre o mapa do Recife Antigo com as 5 estações da área. | RF01, RF02<br>RN01 |
| CA02 | O mapa de Boa Viagem com todos os filtros marcados. | A pessoa desmarca o filtro Patinetes. | Os patinetes somem e as estações e paradas continuam no mapa. | RF02<br>RN03 |
| CA03 | A placa da Estação Joana Bezerra. | A pessoa lê o QR code. | Abre a página da estação com o nome, 16 vagas, os patinetes próximos e até 6 paradas com a distância. A estação ganha 1 leitura. | RF03<br>RN04, RN12 |
| CA04 | A página da estação Marco Zero num Android sem o app da Jet. | A pessoa toca em Abrir na Jet. | Abre a página da Jet no Google Play e fica registrada 1 corrida Jet na Marco Zero. | RF04, RF08<br>RN06 |
| CA05 | A Estação Joana Bezerra com internet. | A pessoa escolhe a Parada Rua Imperial, a cerca de 1 km. | Desenha a rota e mostra Mais curto e Mais seguro, com distância e tempo de patinete e a pé, e os avisos do caminho. | RF05, RF06<br>RN07 a RN09 |
| CA06 | Uma rota mais curta de 1,0 km e outra de 1,6 km com nota melhor. | O app escolhe o Mais seguro. | A rota de 1,6 km aparece como Mais seguro, porque está no limite de 60%. | RF05<br>RN08 |
| CA07 | Uma rota de 1,2 km. | O app calcula os tempos. | Mostra 6 min de patinete e 16 min a pé. | RF05<br>RN09 |
| CA08 | O celular sem internet na Estação Joana Bezerra. | A pessoa pede o caminho até a Parada Rua Imperial. | Mostra a rota de reserva e o aviso de que o caminho é aproximado. | RF07<br>RN10 |
| CA09 | 3 corridas Jet e 2 Whoosh registradas na Marco Zero. | A pessoa abre o painel. | Mostra 5 corridas na Marco Zero (3 Jet e 2 Whoosh) e comissão estimada de R$ 4,55. | RF08<br>RN11 |
| CA10 | Um QR code com um id que não existe. | A pessoa abre o endereço /estacao/xyz. | Mostra "Estação não encontrada" e o caminho de volta ao início, sem travar. | RF03<br>RN05 |

### Conferência do caso de limite

No CA06, multiplicamos 1,0 km por 1,6 e chegamos a 1,6 km, que é exatamente o limite da RN08. Como o limite é inclusivo, a rota de 1,6 km pode ser o Mais seguro. No CA07, 1,2 km a 12 km/h dá 6 min e a 4,5 km/h dá 16 min. No CA09, 5 × R$ 9,10 = R$ 45,50, e 10% disso é R$ 4,55.

_Variações para a equipe verificar depois: uma alternativa de 1,7 km (fora do limite, então o Mais seguro passa a ser a curta) e uma rota de 50 m (o tempo mínimo é 1 min)._

## 7 Escopo e tecnologia da primeira versão

_O que entra na v0.1 e o que fica fora desta entrega._

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

_Tarefas desta entrega, com resultado, responsável, quem revisa e prazo._

| ID | Resultado esperado | Responsável | Apoio ou revisão | Previsão |
|---|---|---|---|---|
| T01 | Visão geral, usuário e recorte registrados. | Maria Eduarda | João Perrelli | 16/11 |
| T02 | RF e RNF coerentes com o recorte. | José Elton | João Pedro Barros | 16/11 |
| T03 | Regras de negócio e critérios de aceitação conferidos. | Yasmin | Maria Eduarda | 16/11 |
| T04 | Repositório, acesso do docente e divisão de tarefas conferidos. | João Pedro Barros | Yasmin | 16/11 |

## 9 Revisão e contribuições individuais

### Registro da revisão

Na revisão da RN08, o grupo trocou "mostrar sempre a rota mais segura" por "a mais segura entre as que têm até 60% a mais que a mais curta", porque uma rota muito mais longa faz a pessoa desistir do patinete. O grupo refez o CA06 com o limite exato de 1,6 km.

_Uso de IA. O grupo usou o Claude para gerar uma primeira versão do código a partir de um prompt escrito pela equipe. Conferimos à mão os tempos do CA07 e a comissão do CA09._

### Evidências de autoria e coautoria

_Cada integrante indica o que escreveu ou revisou, cita os IDs e descreve como conferiu. Cada pessoa cola a URL completa do seu commit._

| Integrante | Contribuição | Como conferiu | Commit |
|---|---|---|---|
| Maria Eduarda<br>@[usuário] | Redigiu usuário, problema e recorte. Escreveu RF05 a RF07 e RN07 a RN10. | Conferiu que o exemplo Joana Bezerra até Rua Imperial cabe no recorte e recalculou o limite de 60% do CA06. | [colar URL] |
| Yasmin<br>@[usuário] | Escreveu os critérios CA01 a CA10. Revisou RN01 a RN12. | Ligou cada CA a um RF e uma RN e conferiu o caso de exceção do CA10. | [colar URL] |
| José Elton<br>@[usuário] | Escreveu RF01, RF02 e os RNF. | Conferiu o formato das distâncias e os filtros do CA02. | [colar URL] |
| João Pedro Barros<br>@[usuário] | Escreveu RF08, RN11 e RN12. Organizou o backlog. | Refez a conta da comissão do CA09 (R$ 4,55) e os tempos do CA07. | [colar URL] |
| João Perrelli<br>@[usuário] | Escreveu RF03, RF04 e RN06. Revisou a seção 1. | Ligou o botão Abrir na Jet ao CA04 e à loja certa de cada celular. | [colar URL] |

_Se duas pessoas usarem o mesmo commit, registramos a coautoria e o papel de cada uma._

## 10 Envio e avaliação

**No repositório.** Um documento da equipe com as definições, o planejamento e as evidências identificadas: https://github.com/madupedrosa06/CICLO-REDE-RECIFE.

**No Classroom.** Cada integrante envia o link do seu commit, com uma frase sobre o que fez e como conferiu, e o documento final da equipe com o link do repositório, até 16/11/2026, às 23h59.

**Na apresentação de 17/11.** A equipe explica o recorte e a v0.1 planejada. Cada integrante explica uma decisão ligada ao usuário e um resultado esperado.

**Exemplo de fala individual.** O app mostra o Mais curto e o Mais seguro lado a lado porque quem desce do metrô precisa decidir rápido. No CA07, uma rota de 1,2 km leva 6 min de patinete e 16 min a pé.
