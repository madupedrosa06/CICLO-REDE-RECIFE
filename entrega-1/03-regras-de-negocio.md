# MOVE RECIFE · Documentação da entrega 1 da AV2

**Parte:** Regras de negócio e dados  
**Responsável:** Yasmin Barbosa  
[Voltar ao README](README.md)

## 5 Regras de negócio e dados

_As condições que determinam o comportamento da solução, com a origem de cada regra. As decisões que a equipe ainda precisa confirmar estão marcadas como pendentes._

### Estações de referência

_Dados do arquivo estacoes.json. Coordenadas aproximadas. As estações físicas ainda não existem; na v0.1 elas são pontos no mapa._

| Estação | Área | Vagas |
|---|---|---|
| Marco Zero | Recife Antigo | 12 |
| Rua do Bom Jesus | Recife Antigo | 10 |
| Praça do Arsenal | Recife Antigo | 10 |
| Cais da Alfândega | Recife Antigo | 14 |
| Estação Recife (metrô) | Recife Antigo | 16 |
| Segundo Jardim | Boa Viagem | 12 |
| Pracinha de Boa Viagem | Boa Viagem | 14 |
| Parque Dona Lindu | Boa Viagem | 12 |
| Shopping Recife | Boa Viagem | 16 |
| Av. Domingos Ferreira | Boa Viagem | 10 |
| Estação Joana Bezerra | Joana Bezerra (exemplo do caminho seguro) | 16 |

### Parâmetros usados nos cálculos

| Parâmetro | Valor | Origem |
|---|---|---|
| Velocidade de patinete | 12 km/h | Decisão da equipe |
| Velocidade a pé | 4,5 km/h | Decisão da equipe |
| Corrida média | R$ 9,10 | Tarifas da Jet e da Whoosh (Diário de PE, mar/2026) |
| Comissão por corrida iniciada | 10% | Premissa do Artefato III, pendente com as operadoras |

### Regras aplicadas

| ID | Regra | Origem |
|---|---|---|
| RN01 | O app cobre o Recife Antigo e Boa Viagem. A estação Joana Bezerra entra só para o exemplo do caminho seguro. | Recorte da equipe |
| RN02 | Paradas de ônibus, metrô e táxi vêm do Grande Recife, da CBTU/Metrorec e da CTTU. A equipe não confere pontos na rua. | Decisão da equipe |
| RN03 | Patinetes e bicicletas são dados de exemplo e sempre aparecem com o selo "dados de exemplo". | Decisão da equipe |
| RN04 | A página da estação mostra até 6 paradas num raio de 1,5 km, da mais perto para a mais longe. | Decisão da equipe |
| RN05 | Se o id da estação não existir, o app mostra "Estação não encontrada" e um caminho de volta ao início. | Decisão da equipe |
| RN06 | O link para a operadora leva ?ref=moverecife&estacao=<id>. Se o app não abrir, vai para a loja do celular (Google Play no Android, App Store no iPhone). Cada toque registra uma corrida iniciada. | Decisão da equipe |
| RN07 | Cada pedaço da rota vale a distância vezes o peso do trecho mais próximo (até 45 m). Peso menor que 1 favorece (ciclofaixa, rua iluminada, semáforo), maior que 1 penaliza (trânsito pesado). Se houver trecho perigoso perto, ele vale. Sem trecho perto, o peso é 1. | Decisão da equipe (trechos-seguranca.json) |
| RN08 | O Mais seguro é a rota de menor nota entre as que têm até 60% a mais que a mais curta, inclusive. | Decisão da equipe |
| RN09 | Tempo = distância dividida pela velocidade, arredondado em minutos, com mínimo de 1 min. | Cálculo da rota |
| RN10 | Sem internet, o app usa a rota de reserva salva para aquele par de pontos. Se não houver, usa uma linha reta. Nos dois casos, avisa na tela. | Decisão da equipe |
| RN11 | Comissão estimada = número de corridas iniciadas × R$ 9,10 × 10%. | Premissa do Artefato III (pendente) |
| RN12 | Cada abertura pelo QR code (endereço com ?origem=qr) soma uma leitura para aquela estação. | Decisão da equipe |

### Relação entre o requisito e o critério

O RF05 pede que o app mostre o caminho mais seguro. A RN07 define como cada rota ganha a nota e a RN08 define o limite de 60%. O CA06 usa uma rota exatamente 60% maior que a mais curta para verificar se o próprio limite ainda entra como Mais seguro.
