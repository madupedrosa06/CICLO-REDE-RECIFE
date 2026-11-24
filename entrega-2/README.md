# Documentação da entrega 2 da AV2

> **Documento completo:** [entrega 2 completa, com todas as partes juntas](entrega-completa.md)

**MOVE RECIFE** · Destrave o caminho, mova a cidade.

_Fundamentos de Programação • ADM Tech_

Esta entrega mostra o que entrou na v0.1 do MOVE RECIFE, o que ficou de fora e uma melhoria pequena e verificável para a v0.2, dando continuidade à primeira entrega. O app continua em evolução e vai mudar com as melhorias que o grupo fizer junto.

**Usuário.** Quem usa ônibus ou metrô e faz a última milha a pé ou de patinete, e o turista no Recife Antigo.

**Problema.** Patinetes largados nas calçadas do Recife Antigo e de Boa Viagem, e falta de informação sobre o caminho mais seguro no último trecho até a parada ou o destino.

**Objetivo.** A partir de uma estação MOVE RECIFE, mostrar no celular os patinetes, as paradas próximas e o melhor caminho seguro, e abrir o app da Jet ou da Whoosh para a corrida.

**Solução.** App web (PWA) em React, Vite e TypeScript, com mapa Leaflet e OpenStreetMap e rotas pelo OSRM público. Os dados ficam em arquivos JSON. Patinetes e bicicletas são dados de exemplo. As corridas iniciadas e as leituras de QR ficam salvas só no aparelho.

### Links de referência

**Repositório.** https://github.com/madupedrosa06/CICLO-REDE-RECIFE

**Site.** https://madupedrosa06.github.io/CICLO-REDE-RECIFE/ (GitHub Pages). Código na pasta [app](https://github.com/madupedrosa06/CICLO-REDE-RECIFE/tree/main/app). Para rodar no computador: entrar em app/, npm install e depois npm run dev.

**Versão no repositório.** commit [817ebb8](https://github.com/madupedrosa06/CICLO-REDE-RECIFE/commit/817ebb8).

## Partes desta entrega

Cada integrante escreveu uma parte e enviou no próprio commit.

| Parte | Responsável | Arquivo |
|---|---|---|
| Introdução, escopo da v0.1 e relação entre documentação, prompt e código (introdução e seções 1 e 5) | Maria Eduarda | este arquivo |
| O que ficou fora da v0.1 (seção 2) | José Elton | [02-fora-da-v01.md](02-fora-da-v01.md) |
| Proposta da v0.2: necessidade, funcionalidades e regras (seção 3, até as regras) | Yasmin Barbosa | [03-proposta-v02.md](03-proposta-v02.md) |
| Critérios de aceitação da v0.2 (seção 3, critérios) | João Pedro Barros | [04-criterios-v02.md](04-criterios-v02.md) |
| Registro dos testes e contribuições (seções 4 e 6) | João Perrelli | [05-testes-e-contribuicoes.md](05-testes-e-contribuicoes.md) |

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

## Registros de teste

- [Testes de Maria Eduarda (T04 e T06)](testes/maria-eduarda.md)
- [Testes de José Elton (T01 e T02)](testes/jose-elton.md)
- [Teste de Yasmin Barbosa (T03)](testes/yasmin-barbosa.md)
- [Teste de João Pedro Barros (T05)](testes/joao-pedro-barros.md)
- [Testes de João Perrelli (T07 e T08)](testes/joao-perrelli.md)
