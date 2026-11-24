# Testes de João Perrelli (entrega 2)

[Voltar ao README da entrega 2](../README.md)

Testes da seção 4 sob minha responsabilidade: **T07** (CA09) e **T08** (CA10).

| Teste | Entrada ou ação | Resultado esperado | Resultado observado | Situação |
|---|---|---|---|---|
| T07<br>CA09 | 1 Iniciar 3 corridas Jet e 2 Whoosh na Marco Zero.<br>2 Abrir /painel. | 5 corridas na Marco Zero e comissão estimada de R$ 4,55. | Depois de 3 toques em Abrir na Jet e 2 em Abrir na Whoosh na Marco Zero, o painel mostrou 5 corridas (3 Jet e 2 Whoosh) e comissão estimada de R$ 4,55. _(Verificação prévia feita com IA (Claude) em 23/11/2026, não é execução do integrante)_ | Aprovado na verificação prévia |
| T08<br>CA10 | 1 Abrir /estacao/xyz. | "Estação não encontrada" e caminho de volta ao início. | /estacao/xyz mostrou "Estação não encontrada" e o link "Voltar ao início". _(Verificação prévia feita com IA (Claude) em 23/11/2026, não é execução do integrante)_ | Aprovado na verificação prévia |

**Como foi executado.** Verificação prévia feita com IA (Claude) em 23/11/2026, num navegador automático com tela de celular (390 x 844), com o app rodando localmente. Nesse ambiente o mapa de fundo do OpenStreetMap e o serviço de rotas estavam bloqueados. **Não é a execução do integrante**: o teste deve ser repetido no link publicado (https://madupedrosa06.github.io/CICLO-REDE-RECIFE/) e o resultado atualizado.

**Evidência.** Prints da verificação prévia: [T07.png](T07.png) e [T08.png](T08.png).

**Situação.** Marque Aprovado se o resultado observado confirmar o esperado. Se der diferença, escreva o que aconteceu e a correção necessária.
