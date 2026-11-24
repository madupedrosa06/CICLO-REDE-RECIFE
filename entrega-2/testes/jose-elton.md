# Testes de José Elton (entrega 2)

[Voltar ao README da entrega 2](../README.md)

Testes da seção 4 sob minha responsabilidade: **T01** (CA01) e **T02** (CA02).

| Teste | Entrada ou ação | Resultado esperado | Resultado observado | Situação |
|---|---|---|---|---|
| T01<br>CA01 | 1 Abrir o app.<br>2 Tocar em Recife Antigo. | Mapa do Recife Antigo com as 5 estações. | Tocar em Recife Antigo abriu /mapa/recife-antigo com "5 estações MOVE RECIFE". _(Verificação prévia feita com IA (Claude) em 23/11/2026, não é execução do integrante)_ | Aprovado na verificação prévia |
| T02<br>CA02 | 1 Abrir o mapa de Boa Viagem.<br>2 Desmarcar o filtro Patinetes. | Patinetes somem; estações e paradas continuam. | Ao desmarcar Patinetes, os marcadores caíram de 21 para 15; estações e paradas continuaram no mapa. _(Verificação prévia feita com IA (Claude) em 23/11/2026, não é execução do integrante)_ | Aprovado na verificação prévia |

**Como foi executado.** Verificação prévia feita com IA (Claude) em 23/11/2026, num navegador automático com tela de celular (390 x 844), com o app rodando localmente. Nesse ambiente o mapa de fundo do OpenStreetMap e o serviço de rotas estavam bloqueados. **Não é a execução do integrante**: o teste deve ser repetido no link publicado (https://madupedrosa06.github.io/CICLO-REDE-RECIFE/) e o resultado atualizado.

**Evidência.** Prints da verificação prévia: [T01.png](T01.png), [T02-antes.png](T02-antes.png) e [T02-depois.png](T02-depois.png).

**Situação.** Marque Aprovado se o resultado observado confirmar o esperado. Se der diferença, escreva o que aconteceu e a correção necessária.
