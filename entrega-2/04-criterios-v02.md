# MOVE RECIFE · Documentação da entrega 2 da AV2

**Parte:** Critérios de aceitação da v0.2  
**Responsável:** João Pedro Barros  
[Voltar ao README da entrega 2](README.md)

## 3 O que fica proposto para a v0.2 (continuação)

### Critérios de aceitação propostos

| ID | Dado | Quando | Então | RF e RN |
|---|---|---|---|---|
| CA11 | O caminho saindo da estação Shopping Recife. | A pessoa escolhe a Parada Conselheiro Aguiar. | Indica a estação Av. Domingos Ferreira, a 490 m do destino, 7 min a pé. | RF09, RF10<br>RN13, RN15 |
| CA12 | O caminho saindo da estação Marco Zero. | A pessoa escolhe o Terminal Dantas Barreto. | Indica a Estação Recife (metrô), a 510 m do destino, 7 min a pé. | RF09, RF10<br>RN13, RN15 |
| CA13 | Um destino a exatamente 800 m da estação mais próxima. | A pessoa escolhe esse destino. | Indica a estação, porque o limite de 800 m é inclusivo. | RF09<br>RN14 |
| CA14 | A Estação Joana Bezerra. | A pessoa escolhe a Parada Rua Imperial. | Mostra o aviso "Nenhuma estação MOVE RECIFE perto do destino", porque a mais próxima está a 860 m. | RF09<br>RN14 |
| CA15 | Todos os testes da v0.1 aprovados. | O grupo reexecuta os CA01 a CA10 depois da mudança. | Os resultados continuam iguais aos da v0.1. | RF01 a RF08 |

_Conferência: 490 m a 4,5 km/h dá 6,5 min, arredondado para 7 min. 509 m dá 6,8 min, também 7 min. A Estação Recife (metrô) fica a 862 m da Parada Rua Imperial, acima do limite._
