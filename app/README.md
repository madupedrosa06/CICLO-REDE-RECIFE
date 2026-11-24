# MOVE RECIFE

**Destrave o caminho, mova a cidade.**

App web (PWA) do projeto MOVE RECIFE: estações de patinete com arquitetura recifense, integradas à Jet, à Whoosh, às bicicletas do Bike Itaú, ao ônibus, ao metrô e ao táxi, com o melhor caminho seguro para a última milha.

## Rodar no computador

Precisa do Node.js 18 ou mais novo.

```bash
npm install
npm run dev
```

Abra o endereço que aparecer (normalmente http://localhost:5173). Para ver no celular na mesma rede Wi-Fi: `npm run dev -- --host`.

## Telas

| Endereço | O que mostra |
|---|---|
| `/` | Início, escolha Recife Antigo ou Boa Viagem, ou use a localização |
| `/mapa/recife-antigo` e `/mapa/boa-viagem` | Mapa com estações, paradas de ônibus, metrô, táxi e patinetes, com filtros |
| `/estacao/:id` | Página da estação (é o que abre pelo QR code) |
| `/caminho/:id?para=:parada` | Melhor caminho seguro, comparando o mais seguro com o mais curto |
| `/painel` | Corridas iniciadas, QR codes abertos e comissão estimada (10% sobre R$ 9,10) |
| `/sobre` | Sobre o projeto e fontes dos dados |

Exemplo pronto: `/caminho/joana-bezerra?para=onibus-rua-imperial` (Estação Joana Bezerra até uma parada a ~1 km).

## Onde ficam os dados

Tudo em `src/data/`, em JSON, para trocar fácil depois:

- `estacoes.json`: as estações. **Para adicionar uma estação**, copie um bloco, troque `id` (sem espaço nem acento), `nome`, `area` (`recife-antigo`, `boa-viagem` ou `joana-bezerra`), `lat`, `lng`, `vagas`, `cor` e `referencia`.
- `paradas.json`: paradas de ônibus, metrô e táxi (fontes: Grande Recife, CBTU/Metrorec, CTTU).
- `patinetes.json`: patinetes da Jet e da Whoosh. **São dados de exemplo**, porque as operadoras não têm API pública garantida.
- `bicicletas.json`: estações do Bike Itaú (Tembici), com bicicletas e vagas. **Dados de exemplo**; a Tembici publica dados no padrão GBFS, que pode substituir este arquivo.
- `operadoras.json`: links para abrir os apps (deep link e loja), corrida média e comissão. Troque pelos links oficiais quando as operadoras fornecerem.
- `trechos-seguranca.json`: os "pesos de segurança" usados no caminho seguro. Peso menor que 1 deixa o trecho mais atrativo (ciclofaixa, rua iluminada, semáforo); maior que 1 penaliza (trânsito pesado). Também guarda rotas de reserva para quando não houver internet.

As coordenadas são aproximadas.

## Como funciona o caminho seguro

1. O app pede rotas de bicicleta ao OSRM público (patinete anda como bike), com alternativas.
2. Cada rota ganha uma nota: cada pedaço do caminho é multiplicado pelo peso do trecho de segurança mais próximo.
3. Mostra a mais curta e a de melhor nota (desde que não seja mais de 60% maior).
4. Sem internet, usa a rota de reserva do JSON ou uma linha reta, e avisa na tela.

Código em `src/services/rotas.ts`.

## Integração com Jet e Whoosh

Em `src/services/operadoras.ts`:

- `buscarPatinetes(area)` hoje lê o JSON. O comentário mostra onde entra a API real.
- `abrirApp(operadora, estacao)` tenta abrir o app pelo deep link e, se não abrir, vai para a loja. Todo link leva `?ref=moverecife&estacao=<id>` para a operadora identificar a corrida.
- Cada clique registra uma "corrida iniciada" (para a comissão de 10%), salva no aparelho e mostrada em `/painel`.

## Gerar os QR codes das placas

```bash
npm run qrcodes -- https://endereco-do-seu-site.vercel.app
```

Cria a pasta `qrcodes/` com, para cada estação:
- `<id>.png`: só o QR code, em alta resolução;
- `<id>.svg`: placa pronta para imprimir, com logo, slogan, QR code e nome da estação.

O QR aponta para `/estacao/<id>?origem=qr`, e o app conta quantas vezes cada um foi aberto.

## Publicar de graça

**Vercel:** crie uma conta em vercel.com, clique em "Add New Project", envie esta pasta (ou ligue a um repositório do GitHub). Ele detecta o Vite sozinho. O arquivo `vercel.json` já faz as rotas como `/estacao/...` funcionarem.

**Netlify:** em app.netlify.com, rode `npm run build` e arraste a pasta `dist/` para a página. O arquivo `public/_redirects` já cuida das rotas.

Depois de publicar, gere os QR codes com o endereço final.

## Tecnologias

React 18, Vite, TypeScript, Tailwind CSS, Leaflet com OpenStreetMap, OSRM (rotas), Nominatim (busca de endereço) e vite-plugin-pwa. Nada exige chave paga.

## Modo prévia (sem internet para o mapa)

`VITE_PREVIA=1 npx vite build --outDir dist-previa` gera uma versão que não usa os blocos do OpenStreetMap: mostra um mapa ilustrativo com o mar, as avenidas principais, a linha do metrô e os trechos de segurança. Serve para demonstração em ambientes que bloqueiam o OpenStreetMap.
