# Documentação da entrega 2 da AV2

**MOVE RECIFE** · Destrave o caminho, mova a cidade.

_Fundamentos de Programação • ADM Tech_

Esta entrega mostra o que entrou na v0.1 do MOVE RECIFE, o que ficou de fora e uma melhoria pequena e verificável para a v0.2, dando continuidade à primeira entrega. O app continua em evolução e vai mudar com as melhorias que o grupo fizer junto.

**Usuário.** Quem usa ônibus ou metrô e faz a última milha a pé ou de patinete, e o turista no Recife Antigo.

**Problema.** Patinetes largados nas calçadas do Recife Antigo e de Boa Viagem, e falta de informação sobre o caminho mais seguro no último trecho até a parada ou o destino.

**Objetivo.** A partir de uma estação MOVE RECIFE, mostrar no celular os patinetes, as paradas próximas e o melhor caminho seguro, e abrir o app da Jet ou da Whoosh para a corrida.

**Solução.** App web (PWA) em React, Vite e TypeScript, com mapa Leaflet e OpenStreetMap e rotas pelo OSRM público. Os dados ficam em arquivos JSON. Patinetes e bicicletas são dados de exemplo. As corridas iniciadas e as leituras de QR ficam salvas só no aparelho.

### Links de referência

**Repositório.** https://github.com/madupedrosa06/CICLO-REDE-RECIFE

**Site.** [Informar o link publicado na Vercel ou no GitHub Pages]. Para rodar no computador: npm install e depois npm run dev.

**Versão no repositório.** [Informar a tag ou o hash da v0.1].

## 1 O que entrou no escopo da v0.1

| Item | Comportamento previsto | Referência da documentação |
|---|---|---|
| Tela inicial | Escolher Recife Antigo ou Boa Viagem, ou usar a localização do celular. | RF01; RN01 |
| Mapa da área | Mostrar estações, paradas de ônibus, metrô, táxi, patinetes e Bike Itaú, cada um com ícone e cor próprios, com filtros. | RF02; RN01–RN03 |
| Página da estação | Abrir pelo QR code com nome, vagas, patinetes próximos e até 6 paradas num raio de 1,5 km. | RF03; RN04; RN05; RN12 |
| Abrir Jet e Whoosh | Abrir o app da operadora pelo link com ?ref=moverecife, ou a loja do celular se o app não abrir. | RF04; RN06 |
| Melhor caminho seguro | Calcular a rota até uma parada ou endereço e mostrar Mais curto e Mais seguro, com distância e tempo. | RF05; RN07–RN09 |
| Avisos do caminho | Listar os avisos dos trechos por onde a rota passa. | RF06; RN07 |
| Sem internet | Usar a rota de reserva ou uma linha reta e avisar na tela. | RF07; RN10 |
| Painel | Contar corridas iniciadas e leituras de QR e estimar a comissão. | RF08; RN11; RN12 |
| Qualidade | Textos em português, botões grandes, visual recifense e selo "dados de exemplo". | RNF01–RNF06 |

**Fluxo principal.** A pessoa lê o QR code da estação, vê os patinetes e as paradas próximas, toca em Melhor caminho seguro, escolhe o destino, compara Mais curto e Mais seguro e toca em Abrir na Jet ou Abrir na Whoosh.

### Decisões de interface e estado do app

_Complementos às definições da primeira entrega, decididos durante a implementação._

1. O QR code abre direto a página da estação, sem passar pela tela inicial.
2. O Mais seguro aparece primeiro. A pessoa pode trocar para ver o Mais curto no mesmo mapa.
3. A rota é pedida no perfil de bicicleta do OSRM, porque o patinete anda como bicicleta. O prompt pedia perfil a pé; o grupo mudou.
4. Corridas e leituras de QR ficam só no aparelho. Limpar os dados do navegador zera o painel.
5. Foi acrescentado o botão Abrir no Bike Itaú no mapa, com a mesma lógica de link dos patinetes.
6. Foi acrescentado um modo prévia, com mapa ilustrativo, para demonstrar o app quando o OpenStreetMap não carrega.

### Situação da verificação

O código da v0.1 está pronto e as telas existem: início, mapa, estação, caminho, painel e sobre. O funcionamento das regras ainda precisa ser registrado pelos testes da seção 4, com o resultado observado por quem executar.

## 2 O que ficou fora da v0.1

| Funcionalidade | Situação |
|---|---|
| Construção das estações físicas e autorização da Prefeitura | Fora do recorte; na v0.1 as estações são pontos no mapa. |
| Login, cadastro e histórico de viagens | Fora do recorte; o app abre direto pelo link ou pelo QR code. |
| API real da Jet e da Whoosh, desbloqueio e pagamento | Fora do recorte; o app só abre o app da operadora. |
| Horários de ônibus em tempo real (GTFS) | Fora do recorte; as paradas vêm de arquivo JSON. |
| Cobrança real da comissão e back-end | Fora do recorte; o painel é só uma estimativa no aparelho. |
| Outras áreas da cidade | Fora do recorte; o app cobre Recife Antigo, Boa Viagem e a estação Joana Bezerra. |
| Indicar onde devolver o patinete perto do destino | Não foi pedido na v0.1; candidata à evolução proposta abaixo. |

Os seis primeiros itens continuam fora da evolução proposta. A v0.2 abaixo se concentra em indicar onde devolver o patinete.

## 3 O que fica proposto para a v0.2

### Melhoria proposta: onde devolver o patinete

**Necessidade a validar na apresentação.** O app mostra como sair da estação, mas não diz onde deixar o patinete quando a pessoa chega perto do destino. Sem essa informação, o patinete volta para a calçada, que é justamente o problema do projeto.

**Proposta de evolução.** Ao escolher o destino, o app mostra a estação MOVE RECIFE mais próxima dele para devolver o patinete, com a distância e o tempo a pé da estação até o destino.

_Proposta do grupo, que pode ser ajustada depois da devolutiva da apresentação da v0.1._

### Funcionalidades e regras propostas

| Código | Definição |
|---|---|
| RF09 | Mostrar a estação MOVE RECIFE mais próxima do destino escolhido, para devolver o patinete. |
| RF10 | Mostrar a distância e o tempo a pé da estação indicada até o destino. |
| RN13 | A estação indicada é a de menor distância em linha reta até o destino, entre todas as estações cadastradas. |
| RN14 | Só indica a estação se ela estiver a até 800 m do destino, inclusive. Acima disso, mostra o aviso "Nenhuma estação MOVE RECIFE perto do destino" e não indica nenhuma. |
| RN15 | O tempo a pé segue a RN09: 4,5 km/h, arredondado em minutos, com mínimo de 1 min. |

**Caso de exceção.** Se o destino estiver longe de todas as estações, o app mostra só o aviso e mantém a rota normal até o destino.

### Critérios de aceitação propostos

| ID | Dado | Quando | Então | RF e RN |
|---|---|---|---|---|
| CA11 | O caminho saindo da estação Shopping Recife. | A pessoa escolhe a Parada Conselheiro Aguiar. | Indica a estação Av. Domingos Ferreira, a 490 m do destino, 7 min a pé. | RF09, RF10<br>RN13, RN15 |
| CA12 | O caminho saindo da estação Marco Zero. | A pessoa escolhe o Terminal Dantas Barreto. | Indica a Estação Recife (metrô), a 510 m do destino, 7 min a pé. | RF09, RF10<br>RN13, RN15 |
| CA13 | Um destino a exatamente 800 m da estação mais próxima. | A pessoa escolhe esse destino. | Indica a estação, porque o limite de 800 m é inclusivo. | RF09<br>RN14 |
| CA14 | A Estação Joana Bezerra. | A pessoa escolhe a Parada Rua Imperial. | Mostra o aviso "Nenhuma estação MOVE RECIFE perto do destino", porque a mais próxima está a 860 m. | RF09<br>RN14 |
| CA15 | Todos os testes da v0.1 aprovados. | O grupo reexecuta os CA01 a CA10 depois da mudança. | Os resultados continuam iguais aos da v0.1. | RF01 a RF08 |

_Conferência: 490 m a 4,5 km/h dá 6,5 min, arredondado para 7 min. 509 m dá 6,8 min, também 7 min. A Estação Recife (metrô) fica a 862 m da Parada Rua Imperial, acima do limite._

## 4 Como registrar a verificação

Passos que outra pessoa consegue repetir. O resultado observado e a situação são preenchidos por quem executar o teste, com um print ou link como evidência.

| Teste | Entrada ou ação | Resultado esperado | Resultado observado | Situação | Responsável |
|---|---|---|---|---|---|
| T01<br>CA01 | 1 Abrir o app.<br>2 Tocar em Recife Antigo. | Mapa do Recife Antigo com as 5 estações. | [Preencher após executar] | Não executado | José Elton |
| T02<br>CA02 | 1 Abrir o mapa de Boa Viagem.<br>2 Desmarcar o filtro Patinetes. | Patinetes somem; estações e paradas continuam. | [Preencher após executar] | Não executado | José Elton |
| T03<br>CA03 | 1 Abrir /estacao/joana-bezerra?origem=qr. | Nome, 16 vagas, patinetes e até 6 paradas com distância. Painel com 1 leitura. | [Preencher após executar] | Não executado | Yasmin Barbosa |
| T04<br>CA05 | 1 Abrir /caminho/joana-bezerra?para=onibus-rua-imperial com internet. | Rota desenhada, Mais curto e Mais seguro com distância, tempo e avisos. | [Preencher após executar] | Não executado | Maria Eduarda |
| T05<br>CA06 e CA07 | 1 Conferir na tela do T04 as distâncias e os tempos.<br>2 Recalcular à mão com 12 km/h e 4,5 km/h. | O Mais seguro tem até 60% a mais que o curto. Os tempos batem com a conta, com diferença de até 1 min, porque o app mostra a distância arredondada e calcula o tempo com os metros exatos. | [Preencher após executar] | Não executado | João Pedro Barros |
| T06<br>CA08 | 1 Desligar a internet.<br>2 Repetir o T04. | Rota de reserva com o aviso de caminho aproximado. | [Preencher após executar] | Não executado | Maria Eduarda |
| T07<br>CA09 | 1 Iniciar 3 corridas Jet e 2 Whoosh na Marco Zero.<br>2 Abrir /painel. | 5 corridas na Marco Zero e comissão estimada de R$ 4,55. | [Preencher após executar] | Não executado | João Perrelli |
| T08<br>CA10 | 1 Abrir /estacao/xyz. | "Estação não encontrada" e caminho de volta ao início. | [Preencher após executar] | Não executado | João Perrelli |

_O CA04 (abrir a Jet pela loja no Android) ficou sem teste nesta entrega, porque o grupo não tem celular Android para executar._

Na v0.1, verificar todos os critérios, incluindo o limite de 60% do Mais seguro, os tempos e as exceções. Na v0.2, reexecutar estes testes e acrescentar os CA11 a CA15.

Um teste é marcado como aprovado quando a execução confirma o resultado esperado. Se houver diferença, registramos o que aconteceu e a correção necessária.

## 5 Relação entre documentação, prompt e código

O prompt usado para gerar o código ("Prompt — MOVE RECIFE", anexo à atividade) partiu da documentação da primeira entrega: as áreas do recorte, as telas, o caminho seguro com pesos por trecho, a integração com a Jet e a Whoosh e o painel da comissão. Ele acrescentou orientações técnicas: React com Vite, dados em JSON, funções de cálculo separadas das telas e publicação gratuita.

| Regra ou requisito | Onde está no código |
|---|---|
| RN07, RN08 e RN10 (nota de segurança, limite de 60% e rota de reserva) | src/services/rotas.ts |
| RN09 e RNF04 (tempo e formato da distância) | src/lib/geo.ts |
| RN04 (paradas próximas) | src/services/transporte.ts e src/pages/Estacao.tsx |
| RN06 (links da Jet e da Whoosh) | src/services/operadoras.ts e src/data/operadoras.json |
| RN11 e RN12 (corridas, leituras e comissão) | src/services/eventos.ts e src/pages/Painel.tsx |
| Pesos de segurança e rotas de reserva | src/data/trechos-seguranca.json |

**Como usamos.** Partimos da documentação do projeto, delimitamos a v0.1, orientamos a IA e revisamos o resultado. As mudanças feitas na implementação estão nas decisões da seção 1. Os testes da seção 4 registram a verificação do código gerado.

## 6 Contribuições individuais

_Cada integrante envia no Classroom o link da sua contribuição à documentação e à implementação, com uma explicação curta do que fez e como conferiu._

| Integrante | Documentação | Implementação ou teste | Link do commit |
|---|---|---|---|
| Maria Eduarda<br>@madupedrosa06 | Introdução, seções 1 e 5. | Testes T04 e T06 (caminho seguro com e sem internet). | https://github.com/madupedrosa06/CICLO-REDE-RECIFE/commit/522f271 |
| José Elton<br>@Elton2007 | Seção 2 (fora da v0.1). | Testes T01 e T02 (tela inicial, mapa e filtros). | https://github.com/madupedrosa06/CICLO-REDE-RECIFE/commit/1812386 (seção 2)<br>https://github.com/madupedrosa06/CICLO-REDE-RECIFE/commit/e01a731 (testes T01 e T02) |
| Yasmin Barbosa<br>@ybs2cesarschool | Seção 3, regras RN13 a RN15. | Teste T03 (estação aberta pelo QR code). | https://github.com/madupedrosa06/CICLO-REDE-RECIFE/commit/ccaa569 (proposta)<br>https://github.com/madupedrosa06/CICLO-REDE-RECIFE/commit/bd2adb9 (teste T03) |
| João Pedro Barros<br>@JPBarros27 | Seção 3, critérios CA11 a CA15. | Teste T05 (limite de 60% e tempos). |   |
| João Perrelli<br>@joaopptlc | Seções 4 e 6. | Testes T07 e T08 (painel e estação inexistente). |   |
