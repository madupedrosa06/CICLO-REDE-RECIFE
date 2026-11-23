# Testes de Maria Eduarda (entrega 2)

[Voltar ao README da entrega 2](../README.md)

Testes da seção 4 sob minha responsabilidade: **T04** (CA05) e **T06** (CA08).

| Teste | Entrada ou ação | Resultado esperado | Resultado observado | Situação |
|---|---|---|---|---|
| T04<br>CA05 | 1 Abrir /caminho/joana-bezerra?para=onibus-rua-imperial com internet. | Rota desenhada, Mais curto e Mais seguro com distância, tempo e avisos. | Na verificação prévia, o serviço de rotas não estava acessível, então ainda não foi possível conferir a rota com internet. Repetir no link publicado. | Pendente |
| T06<br>CA08 | 1 Desligar a internet (ou sem acesso ao serviço de rotas).<br>2 Repetir o T04. | Rota de reserva com o aviso de caminho aproximado. | O app mostrou a rota de reserva com o selo "rota aproximada (sem conexão com o serviço de rotas)". Mais seguro: 1,2 km, 6 min de patinete e 15 min a pé. Mais curto: 1,0 km, 5 min e 13 min. Avisos: "Entorno do Fórum: calçada larga e iluminada" e "Travessia com semáforo na Rua Imperial". | Aprovado |

**Como foi executado.** Verificação prévia em 23/11/2026, com o app rodando localmente (`npm run build` e `vite preview`) num navegador com tela de celular. Nesse ambiente o mapa de fundo do OpenStreetMap não carregou.

**Evidência.** Print da tela do caminho: [T04-T06-maria-eduarda.png](T04-T06-maria-eduarda.png)

**Conferência das contas.** 1,2 km é menor que 1,6 km (limite de 60% sobre 1,0 km). Os tempos podem diferir em até 1 min da conta com a distância arredondada, porque o app calcula com os metros exatos.
