# Testes de Yasmin Barbosa (entrega 2)

[Voltar ao README da entrega 2](../README.md)

Testes da seção 4 sob minha responsabilidade: **T03** (CA03).

| Teste | Entrada ou ação | Resultado esperado | Resultado observado | Situação |
|---|---|---|---|---|
| T03<br>CA03 | 1 Abrir /estacao/joana-bezerra?origem=qr.<br>2 Abrir /painel. | Nome, 16 vagas, patinetes e até 6 paradas com distância. Painel com 1 leitura. | Nome, 16 vagas, 1 Jet, 2 Whoosh e 6 Bike Itaú perto, e as paradas com distância (metrô 50 m, táxi 70 m, Fórum 330 m...). O painel mostrou 1 QR code aberto. | Aprovado |

**Como foi executado.** Executado com auxílio de ferramenta de IA em 23/11/2026, num navegador com tela de celular (390 x 844), com o app rodando localmente. Nesse ambiente o mapa de fundo do OpenStreetMap e o serviço de rotas não carregaram, então o caminho usou a rota de reserva.

**Evidência.** Prints: [T03.png](T03.png) e [T03-painel.png](T03-painel.png).

**Situação.** Marque Aprovado se o resultado observado confirmar o esperado. Se der diferença, escreva o que aconteceu e a correção necessária.
