# Documentação da entrega 1 da AV2

> **Documento completo:** [entrega 1 completa, com todas as partes juntas](entrega-completa.md)

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

## Partes do documento

Cada integrante escreveu uma parte e enviou no próprio commit.

| Parte | Seções | Responsável |
|---|---|---|
| Identificação, visão geral, história de usuário e esclarecimentos | 1, 2, 9, 10 | Maria Eduarda (este arquivo) |
| Requisitos funcionais e não funcionais | 3, 4 | José Elton ([02-requisitos.md](02-requisitos.md)) |
| Regras de negócio e dados | 5 | Yasmim Barbosa ([03-regras-de-negocio.md](03-regras-de-negocio.md)) |
| Critérios de aceitação | 6 | João Pedro Barros ([04-criterios-de-aceitacao.md](04-criterios-de-aceitacao.md)) |
| Escopo da v0.1, tecnologia e backlog | 7, 8 | João Perrelli ([05-escopo-e-backlog.md](05-escopo-e-backlog.md)) |

## 1 Visão geral do projeto

**Contexto e problema.** No Recife, quem desce do ônibus ou do metrô ainda precisa andar o último trecho até o destino, normalmente entre 500 m e 2 km. Os patinetes da Jet e da Whoosh ajudam nesse trecho, mas ficam largados nas calçadas do Recife Antigo e de Boa Viagem, e a pessoa não sabe qual caminho é mais seguro para ir de patinete, com ciclofaixa, rua iluminada e semáforo.

**Usuário principal.** Quem usa ônibus ou metrô e faz a última milha a pé ou de patinete, e também o turista no Recife Antigo. Essa pessoa está em pé numa parada, com o celular numa mão.

**Objetivo.** A partir de uma estação MOVE RECIFE (com desenho inspirado na arquitetura recifense), mostrar no celular os patinetes, as paradas próximas e o melhor caminho seguro até o destino, e abrir o app da Jet ou da Whoosh para a corrida.

**Recorte.** Um app web simples, aberto pelo QR code da estação, com mapas do Recife Antigo e de Boa Viagem e uma estação em Joana Bezerra para o exemplo do caminho seguro. Sem login, sem pagamento dentro do app e sem verificação dos pontos pela equipe. A v0.1 é um ponto de partida: telas, regras e dados podem mudar com as melhorias que o grupo for fazendo junto.

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

## 9 Revisão e contribuições individuais

### Registro da revisão

Na revisão da RN08, o grupo trocou "mostrar sempre a rota mais segura" por "a mais segura entre as que têm até 60% a mais que a mais curta", porque uma rota muito mais longa faz a pessoa desistir do patinete. O grupo refez o CA06 com o limite exato de 1,6 km.

_Uso de IA. O grupo usou o Claude para gerar uma primeira versão do código a partir de um prompt escrito pela equipe. Conferimos à mão os tempos do CA07 e a comissão do CA09._

### Evidências de autoria e coautoria

_Cada integrante indica o que escreveu ou revisou, cita os IDs e descreve como conferiu._

| Integrante | Contribuição | Como conferiu |
|---|---|---|
| Maria Eduarda<br>@madupedrosa06 | Redigiu identificação, usuário, problema, objetivo, recorte, história de usuário e esclarecimentos (seções 1 e 2). Criou o repositório e o README. | Conferiu que o exemplo Joana Bezerra até a Parada Rua Imperial cabe no recorte e que cada pergunta tem a origem da resposta. |
| José Elton<br>@Elton2007 | Escreveu RF01 a RF08 e RNF01 a RNF06 (seções 3 e 4). | Ligou cada RF a pelo menos uma RN e conferiu que cada RNF tem um jeito de ser verificado. |
| Yasmin Barbosa<br>@ybs2cesarschool | Escreveu RN01 a RN12, as estações de referência e os parâmetros (seção 5). | Conferiu as vagas das estações com os dados do app e a origem de cada regra. |
| João Pedro Barros<br>@JPBarros27 | Escreveu os critérios CA01 a CA10 e a conferência do caso de limite (seção 6). | Refez à mão o limite de 60% do CA06, os tempos do CA07 e a comissão do CA09 (R$ 4,55). |
| João Perrelli<br>@joaopptlc | Escreveu o escopo da v0.1, o fluxo principal, a tecnologia e o backlog (seções 7 e 8). | Conferiu que tudo que está no escopo tem um RF e que cada tarefa tem responsável e revisor. |

_Se duas pessoas usarem o mesmo commit, registramos a coautoria e o papel de cada uma._

## 10 Envio e avaliação

**No repositório.** Um documento da equipe com as definições, o planejamento e as evidências identificadas: https://github.com/madupedrosa06/CICLO-REDE-RECIFE.

**No Classroom.** Cada integrante envia o link do seu commit, com uma frase sobre o que fez e como conferiu, e o documento final da equipe com o link do repositório, até a data da atividade no Classroom.

**Na apresentação de 17/11.** A equipe explica o recorte e a v0.1 planejada. Cada integrante explica uma decisão ligada ao usuário e um resultado esperado.

**Exemplo de fala individual.** O app mostra o Mais curto e o Mais seguro lado a lado porque quem desce do metrô precisa decidir rápido. No CA07, uma rota de 1,2 km leva 6 min de patinete e 16 min a pé.
