# MOVE RECIFE · Documentação da entrega 2 da AV2

**Parte:** Registro dos testes e contribuições  
**Responsável:** João Perrelli  
[Voltar ao README da entrega 2](README.md)

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

## 6 Contribuições individuais

_Cada integrante envia no Classroom o link da sua contribuição à documentação e à implementação, com uma explicação curta do que fez e como conferiu._

| Integrante | Documentação | Implementação ou teste | Link do commit |
|---|---|---|---|
| Maria Eduarda<br>@madupedrosa06 | Introdução, seções 1 e 5. | Testes T04 e T06 (caminho seguro com e sem internet). | https://github.com/madupedrosa06/CICLO-REDE-RECIFE/commit/522f271 |
| José Elton<br>@Elton2007 | Seção 2 (fora da v0.1). | Testes T01 e T02 (tela inicial, mapa e filtros). | https://github.com/madupedrosa06/CICLO-REDE-RECIFE/commit/1812386 (seção 2)<br>https://github.com/madupedrosa06/CICLO-REDE-RECIFE/commit/e01a731 (testes T01 e T02) |
| Yasmin Barbosa<br>@ybs2cesarschool | Seção 3, regras RN13 a RN15. | Teste T03 (estação aberta pelo QR code). | https://github.com/madupedrosa06/CICLO-REDE-RECIFE/commit/ccaa569 (proposta)<br>https://github.com/madupedrosa06/CICLO-REDE-RECIFE/commit/bd2adb9 (teste T03) |
| João Pedro Barros<br>@JPBarros27 | Seção 3, critérios CA11 a CA15. | Teste T05 (limite de 60% e tempos). | https://github.com/madupedrosa06/CICLO-REDE-RECIFE/commit/270898c (critérios)<br>https://github.com/madupedrosa06/CICLO-REDE-RECIFE/commit/f881436 (teste T05) |
| João Perrelli<br>@joaopptlc | Seções 4 e 6. | Testes T07 e T08 (painel e estação inexistente). | https://github.com/madupedrosa06/CICLO-REDE-RECIFE/commit/a17d66e (seções 4 e 6)<br>https://github.com/madupedrosa06/CICLO-REDE-RECIFE/commit/81cefe2 (testes T07 e T08) |
