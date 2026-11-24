# Testes de João Pedro Barros (entrega 2)

[Voltar ao README da entrega 2](../README.md)

Testes da seção 4 sob minha responsabilidade: **T05** (CA06 e CA07).

| Teste | Entrada ou ação | Resultado esperado | Resultado observado | Situação |
|---|---|---|---|---|
| T05<br>CA06 e CA07 | 1 Conferir na tela do T04 as distâncias e os tempos.<br>2 Recalcular à mão com 12 km/h e 4,5 km/h. | O Mais seguro tem até 60% a mais que o curto. Os tempos batem com a conta, com diferença de até 1 min, porque o app mostra a distância arredondada e calcula o tempo com os metros exatos. | Na rota de reserva: Mais seguro 1,2 km (6 min de patinete, 15 min a pé) e Mais curto 1,0 km (5 min e 13 min). 1,2 km é menor que 1,6 km. O tempo a pé deu 15 min e não 16, porque o app calcula com os metros exatos. _(Verificação prévia feita com IA (Claude) em 23/11/2026, não é execução do integrante)_ | Aprovado na verificação prévia, com observação |

**Como foi executado.** Verificação prévia feita com IA (Claude) em 23/11/2026, num navegador automático com tela de celular (390 x 844), com o app rodando localmente. Nesse ambiente o mapa de fundo do OpenStreetMap e o serviço de rotas estavam bloqueados. **Não é a execução do integrante**: o teste deve ser repetido no link publicado (https://madupedrosa06.github.io/CICLO-REDE-RECIFE/) e o resultado atualizado.

**Evidência.** Prints da verificação prévia: [T04-T06-maria-eduarda.png](T04-T06-maria-eduarda.png) (mesma tela do T04 e T06).

**Situação.** Marque Aprovado se o resultado observado confirmar o esperado. Se der diferença, escreva o que aconteceu e a correção necessária.
