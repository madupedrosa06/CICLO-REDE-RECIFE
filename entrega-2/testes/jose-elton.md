# Testes de José Elton (entrega 2)

[Voltar ao README da entrega 2](../README.md)

Testes da seção 4 sob minha responsabilidade: **T01** (CA01) e **T02** (CA02).

| Teste | Entrada ou ação | Resultado esperado | Resultado observado | Situação |
|---|---|---|---|---|
| T01<br>CA01 | 1 Abrir o app.<br>2 Tocar em Recife Antigo. | Mapa do Recife Antigo com as 5 estações. | Tocar em Recife Antigo abriu /mapa/recife-antigo com "5 estações MOVE RECIFE". | Aprovado |
| T02<br>CA02 | 1 Abrir o mapa de Boa Viagem.<br>2 Desmarcar o filtro Patinetes. | Patinetes somem; estações e paradas continuam. | Ao desmarcar Patinetes, os marcadores caíram de 21 para 15; estações e paradas continuaram no mapa. | Aprovado |

**Como foi executado.** Executado com auxílio de ferramenta de IA em 23/11/2026, num navegador com tela de celular (390 x 844), com o app rodando localmente. Nesse ambiente o mapa de fundo do OpenStreetMap e o serviço de rotas não carregaram, então o caminho usou a rota de reserva.

**Evidência.** Prints: [T01.png](T01.png), [T02-antes.png](T02-antes.png) e [T02-depois.png](T02-depois.png).

**Situação.** Marque Aprovado se o resultado observado confirmar o esperado. Se der diferença, escreva o que aconteceu e a correção necessária.
