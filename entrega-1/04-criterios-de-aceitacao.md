# MOVE RECIFE · Documentação da entrega 1 da AV2

**Parte:** Critérios de aceitação  
**Responsável:** João Pedro Barros  
[Voltar ao README](README.md)

## 6 Critérios de aceitação

_Um cenário verificável para cada comportamento importante, com a condição inicial no Dado, a ação no Quando e o resultado esperado no Então. Nesta etapa registramos o resultado esperado. Os resultados observados serão anotados na entrega da versão executável._

| ID | Dado | Quando | Então | RF e RN |
|---|---|---|---|---|
| CA01 | A tela inicial aberta. | A pessoa toca em Recife Antigo. | Abre o mapa do Recife Antigo com as 5 estações da área. | RF01, RF02<br>RN01 |
| CA02 | O mapa de Boa Viagem com todos os filtros marcados. | A pessoa desmarca o filtro Patinetes. | Os patinetes somem e as estações e paradas continuam no mapa. | RF02<br>RN03 |
| CA03 | A placa da Estação Joana Bezerra. | A pessoa lê o QR code. | Abre a página da estação com o nome, 16 vagas, os patinetes próximos e até 6 paradas com a distância. A estação ganha 1 leitura. | RF03<br>RN04, RN12 |
| CA04 | A página da estação Marco Zero num Android sem o app da Jet. | A pessoa toca em Abrir na Jet. | Abre a página da Jet no Google Play e fica registrada 1 corrida Jet na Marco Zero. | RF04, RF08<br>RN06 |
| CA05 | A Estação Joana Bezerra com internet. | A pessoa escolhe a Parada Rua Imperial, a cerca de 1 km. | Desenha a rota e mostra Mais curto e Mais seguro, com distância e tempo de patinete e a pé, e os avisos do caminho. | RF05, RF06<br>RN07 a RN09 |
| CA06 | Uma rota mais curta de 1,0 km e outra de 1,6 km com nota melhor. | O app escolhe o Mais seguro. | A rota de 1,6 km aparece como Mais seguro, porque está no limite de 60%. | RF05<br>RN08 |
| CA07 | Uma rota de 1,2 km. | O app calcula os tempos. | Mostra 6 min de patinete e 16 min a pé. | RF05<br>RN09 |
| CA08 | O celular sem internet na Estação Joana Bezerra. | A pessoa pede o caminho até a Parada Rua Imperial. | Mostra a rota de reserva e o aviso de que o caminho é aproximado. | RF07<br>RN10 |
| CA09 | 3 corridas Jet e 2 Whoosh registradas na Marco Zero. | A pessoa abre o painel. | Mostra 5 corridas na Marco Zero (3 Jet e 2 Whoosh) e comissão estimada de R$ 4,55. | RF08<br>RN11 |
| CA10 | Um QR code com um id que não existe. | A pessoa abre o endereço /estacao/xyz. | Mostra "Estação não encontrada" e o caminho de volta ao início, sem travar. | RF03<br>RN05 |

### Conferência do caso de limite

No CA06, multiplicamos 1,0 km por 1,6 e chegamos a 1,6 km, que é exatamente o limite da RN08. Como o limite é inclusivo, a rota de 1,6 km pode ser o Mais seguro. No CA07, 1,2 km a 12 km/h dá 6 min e a 4,5 km/h dá 16 min. No CA09, 5 × R$ 9,10 = R$ 45,50, e 10% disso é R$ 4,55.

_Variações para a equipe verificar depois: uma alternativa de 1,7 km (fora do limite, então o Mais seguro passa a ser a curta) e uma rota de 50 m (o tempo mínimo é 1 min)._
