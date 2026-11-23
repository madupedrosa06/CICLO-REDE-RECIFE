# MOVE RECIFE · Documentação da entrega 2 da AV2

**Parte:** Proposta da v0.2: necessidade, funcionalidades e regras  
**Responsável:** Yasmin Barbosa  
[Voltar ao README da entrega 2](README.md)

## 3 O que fica proposto para a v0.2

### Melhoria proposta: onde devolver o patinete

**Necessidade a validar na apresentação.** O app mostra como sair da estação, mas não diz onde deixar o patinete quando a pessoa chega perto do destino. Sem essa informação, o patinete volta para a calçada, que é justamente o problema do projeto.

**Proposta de evolução.** Ao escolher o destino, o app mostra a estação MOVE RECIFE mais próxima dele para devolver o patinete, com a distância e o tempo a pé da estação até o destino.

_Proposta do grupo, que pode ser ajustada depois da devolutiva da apresentação da v0.1._

### Funcionalidades e regras propostas

| Código | Definição |
|---|---|
| RF09 | Mostrar a estação MOVE RECIFE mais próxima do destino escolhido, para devolver o patinete. |
| RF10 | Mostrar a distância e o tempo a pé da estação indicada até o destino. |
| RN13 | A estação indicada é a de menor distância em linha reta até o destino, entre todas as estações cadastradas. |
| RN14 | Só indica a estação se ela estiver a até 800 m do destino, inclusive. Acima disso, mostra o aviso "Nenhuma estação MOVE RECIFE perto do destino" e não indica nenhuma. |
| RN15 | O tempo a pé segue a RN09: 4,5 km/h, arredondado em minutos, com mínimo de 1 min. |

**Caso de exceção.** Se o destino estiver longe de todas as estações, o app mostra só o aviso e mantém a rota normal até o destino.
