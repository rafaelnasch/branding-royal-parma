---
name: branding-royal-parma
description: "Identidade da Royal Parma (rede de parmegianaria delivery em franquia), sistema Rótulo Real v1: cores, fontes, brasão, leis da casa, voz e regras de publicidade de comida e de franquia. Use em todo material da rede, unidade ou franqueadora: post, story, reels, iFood, cardápio, WhatsApp, cupom, embalagem, flyer, fachada, página de franquia, apresentação ao investidor e e-mail. Gatilhos: royal parma, padrão royal, rótulo real."
---

# /branding-royal-parma · A identidade visual da Royal Parma

Um estilo de casa travado, chamado **Rótulo Real**. A Royal Parma nasceu de uma receita de família e chega à casa das pessoas numa caixa kraft com o brasão. A caixa, o pote de molho e o saco falam a língua do rótulo antigo: moldura dupla de cantos recortados, brasão, nome em serifa. E rótulo, para quem come, é promessa: **o que está escrito tem de ser o que vem dentro.** No sistema, isso vira duas regras visuais e uma de conteúdo: **a moldura de rótulo organiza a peça, a palavra de molho tempera o título, e o que a peça mostra é o que chega na mesa.** Vale para **todo** material da Royal Parma: das unidades, da franqueadora e da expansão.

Palavras-guia: calorosa, direta, orgulhosa sem arrogância, honesta, generosa. Nunca: gritada, "a melhor do Brasil", cantina de clichê italiano, promessa de renda, comida gerada por IA.

**Abra PRIMEIRO:** [`brand-book.html`](brand-book.html), o estilo documentando a si mesmo em 24 seções, com a marca, as fichas de cor, as escalas, os modelos de peça em tamanho real e as regras de publicidade. O `<head>` e a `<style>` dele são o template portátil de **documento**. Para **apresentação**, o esqueleto pronto é [`deck-template.html`](deck-template.html). Os motores vivem em [`rviz.js`](rviz.js) (dados) e [`rforms.js`](rforms.js) (formas). Os snippets da marca, dos blocos de identificação, dos canais oficiais, dos avisos e do e-mail estão em [`lockup.html`](lockup.html). Pedidos prontos por público estão em [`guia-de-uso.html`](guia-de-uso.html). Quando a peça parece com esses arquivos, está certa.

---

## Onde a skill roda (e o que muda em cada lugar)

| Ambiente | Onde instalar | O que muda |
|---|---|---|
| **Claude Code** (terminal, VS Code, app de desktop) | `~/.claude/skills/branding-royal-parma` (clone do repositório) | Nada. Ambiente completo: escreve arquivo, usa `assets/`, exporta PDF. |
| **Codex** (CLI, IDE, app) | `~/.agents/skills/branding-royal-parma` (versões antigas: `~/.codex/skills/`) | Nada. `agents/openai.yaml` dá o nome e a descrição da lista de skills. |
| **claude.ai** (navegador e celular) | Personalizar > Skills > + > Enviar uma skill: o `branding-royal-parma.zip` do Releases (execução de código ligada) | **O artefato é um arquivo só: não enxerga `assets/` nem os `.js`.** |
| **ChatGPT** | Skills do app, onde a conta liberar o envio: o mesmo `branding-royal-parma.zip` | Igual ao claude.ai: material em arquivo único. |

**O que o ZIP leva e o que fica no site do manual.** O pacote traz tudo o que a skill usa para produzir (marca em SVG e PNG web, `marca.json`, favicon, avatar, imagem de compartilhamento, fotos públicas com o `LEIA.md`, formas, capas de destaque, fontes, motores e modelos). Ficam só no endereço público `https://rafaelnasch.github.io/branding-royal-parma/`: os arquivos publicados que serviram de base (`assets/referencia-original/`), as PNG cheias da marca (2400 px, para o Canva e a gráfica) e as versões autocontidas do `dist/`. Para Canva ou impressão, baixe a PNG cheia de lá.

**REGRA DO NAVEGADOR (claude.ai):** todo HTML gerado ali é **autocontido**.
1. **Marca:** use os blocos em **data URI** do [`lockup.html`](lockup.html) (horizontal oficial, horizontal claro, brasão). Copie o `src` inteiro; nunca digite, resuma ou reconstrua um data URI.
2. **Fotos:** gere o data URI por código a partir do arquivo de `assets/fotos/`, sem alterar a imagem.
3. **Motores:** cole `rviz.js` e `rforms.js` dentro de um `<script>` do próprio arquivo.
4. **Fontes:** continuam pelo link do Google Fonts.
5. **PDF:** entregue o HTML e mande imprimir pelo Chrome (seção "Exportar PDF").

**Para ENVIAR um HTML a alguém**, use a versão autocontida: `python3 autocontido.py <arquivo.html>` grava em `dist/` com imagens, fontes e motores embutidos. As versões prontas do brand book, da apresentação e das assinaturas já estão em `dist/`.

## Cores (TRAVADAS)

O sistema **não tem modo escuro automático**: a cor é da marca. `body` sempre com background explícito e `color-scheme: light`.

**Três campos.** **Verde Royal** para o que chama atenção (capa, abertura, redes, topo do site, fachada, story, cardápio digital). **Papel** para o que se lê com calma (documento, miolo de carrossel, cardápio, página de franquia, proposta ao investidor). **Kraft** é o campo do pedido: tudo que imita ou acompanha a embalagem (caixa, saco, lacre, flyer do pedido, cartão de agradecimento), sempre com texto Verde. **Creme** alterna com o Papel em faixas. **Mata** é o painel sobre o Verde. **Floresta** fecha rodapés.

| Token | Nome | HEX | Origem | Uso |
|---|---|---|---|---|
| `--verde` | Verde Royal | `#102B22` | site, fachada, rótulo do molho | campo escuro principal; título e texto forte no claro; botão no claro |
| `--floresta` | Floresta | `#0B1D17` | site | rodapé, capa profunda, sombra de leitura sobre foto |
| `--mata` | Mata | `#173A2D` | extensão | painel e cartão sobre Verde |
| `--caramelo` | Caramelo Royal | `#BE7F43` | **medido no logotipo** (PARMA e a moldura do brasão) | palavra de molho, numeral, filete, botão **sobre Verde e Floresta**; texto de 18 px ou mais |
| `--mel` | Mel | `#DDA867` | extensão | o caramelo em texto pequeno e link sobre Verde, Mata e Floresta |
| `--canela` | Canela | `#835020` | extensão | o caramelo quando é TEXTO no claro: palavra de molho, rótulo, numeral, link no Papel e no Creme |
| `--creme` | Creme Royal | `#E2DDC8` | **medido no logotipo** (ROYAL e o RP) | título sobre Verde; faixa clara; texto do botão no claro |
| `--papel` | Papel | `#FAF8F2` | site | campo de leitura |
| `--kraft` | Kraft | `#C9A67E` | caixa e saco | campo do pedido, só com texto Verde |
| `--trigo` · `--musgo` | Trigo · Musgo | `#D3D1BD` · `#AEB8A6` | extensão | texto corrido e apoio sobre Verde e Mata |
| `--grafite` · `--pedra` | Grafite · Pedra | `#38433C` · `#535E56` | extensão | texto e apoio sobre Papel e Creme |
| `--oliva` | Oliva | `#526243` | site | segunda série de gráfico; selo de vegetariano. Nunca campo |
| `--tomate` | Tomate | `#B23A26` | o molho | SÓ alerta (alergênico, erro). Nunca fundo, título ou botão |
| `--ok` | Ok | `#2F6B3A` | extensão | formulário, sempre com texto e ícone |
| `--filete-claro` · `--filete-escuro` | Filetes | `#DDD6C1` · `#2C4A3D` | extensão | linhas de 1 px |
| `--branco` | Branco | `#FFFFFF` | | documento impresso formal, prato recortado |

**Pares de leitura (WCAG):** creme/Verde 11,1 · trigo/Verde 9,8 · musgo/Verde 7,3 · mel/Verde 7,1 · caramelo/Verde 4,5 (só 18 px ou mais) · caramelo/Floresta 5,2 · caramelo/Mata 3,8 (só título grande) · Verde/Papel 14,2 · grafite/Papel 9,7 · pedra/Papel 6,4 · canela/Papel 6,3 · canela/Creme 4,9 · Verde/Kraft 6,6 · Floresta/Kraft 7,7 · tomate/Papel 5,6. Botão caramelo leva texto Verde (4,5). **Proibidos como texto:** caramelo sobre Papel (3,1), Creme (2,4), branco (3,3) ou Kraft (1,5); branco sobre caramelo; creme sobre Kraft; canela sobre Kraft; qualquer texto sobre o xadrez do guardanapo.

**Orçamento do caramelo (LEI I):** no máximo **10% da área** da peça, marcando **uma** informação (a palavra de molho, o preço com condição, o botão). O verde manda. Proporção no conjunto das peças do mês: Verde 45 · Papel e Creme 25 · Kraft 10 · Caramelo 8 · Floresta 7 · Oliva e Tomate 2 · texto e filetes 3 (a foto do prato fica fora da conta).

**Saem:** o caramelo do site `#C37C2C` e o creme `#E8E3CF` (convergem para os do logotipo); preto puro; degradê dourado e efeito metálico; vermelho como campo; troféu 🏆; pessoa ou prato gerados por IA. CMYK e Pantone dependem de prova de gráfica (pendência 16). No kraft, o verde imprime mais escuro e quente; caramelo no kraft só em selo ou gravação grande, com prova.

## Tipografia (TRAVADA)

```html
<link href="https://fonts.googleapis.com/css2?family=Gloock&family=Playfair+Display:ital,wght@1,500;1,600;1,700&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet">
```

| Papel | Fonte | Regras |
|---|---|---|
| Títulos, numerais, preço, números grandes | **Gloock 400** | A serifa de contraste alto e terminais abertos mais próxima do letreiro ROYAL PARMA. Caixa normal em título longo; **caixa alta** em título curto de peça (até 5 palavras), como nos posts da marca. ≥ 28 px na peça; entrelinha 1,02 a 1,12. |
| **A palavra de molho** | **Playfair Display Italic 600** | **Uma** palavra ou expressão curta por título, marcada com `<em>`: caramelo no Verde, Floresta e Mata; canela no Papel e no Creme; Verde no Kraft. Corpo 1,0 a 1,08 do título, **sempre em caixa normal**, mesmo quando o título está em caixa alta ("PAGUE MENOS *pelo nosso* cardápio digital"). Também em citação curta e frase do fundador (500). Nunca em parágrafo. |
| Texto, rótulo, botão, dado, legenda, cardápio, interface | **Source Sans 3** 400 · 500 · 600 · 700 | Já é a fonte de parágrafo do site. Corpo 400; 500 em destaque; 600 em botão e nome de prato; 700 só em número de interface e preço pequeno. **Rótulo de rótulo**: caixa alta, `letter-spacing:.18em`, 600 (eco de PARMEGIANA DELIVERY). |

- **Escala do documento (tela/celular):** display 96/46 · título de seção 56/34 · subtítulo 36/26 · intertítulo 26/21 · chamada 21/18 · corpo 18/17 (entrelinha 1,62) · apoio 15 · legenda 13 · rótulo 12. `font-variant-numeric: lining-nums`.
- **Escala da peça 1080 px** (unidade `--u: calc(100cqw/1080)`): título 84 a 120 (máximo 3 linhas) · subtítulo 52 a 60 · chamada e corpo 32 a 38 · rótulo 26 (+0,18 em) · preço 96 a 140 · **piso absoluto de 26 px para qualquer texto dentro da peça, inclusive condição de promoção e bloco da unidade** (o post aparece a cerca de 36% no celular) · margem 72 · filete 2 a 3.
- **Legenda de reels:** Source Sans 3 700 branca ou creme, 1 a 3 palavras por vez, na altura do peito; a palavra-chave em Playfair Italic caramelo.
- **Saem:** Colus (títulos do site), Roboto, Roboto Slab, Montserrat, Poppins e fontes de script. Substitutas: títulos em **DM Serif Display** (ou Georgia); texto em **Source Sans Pro** ou Arial; palavra de molho em Playfair Display Italic. No Canva, suba a Gloock no kit de marca (seção 21).

## A marca (TRAVADA)

Não existe arquivo vetorial publicado pela rede (o site tem PNG de 2304 × 317 e 500 × 611). As versões de `assets/` são a **reconstrução vetorial** feita pela GrowAI: letreiro e monograma com 98 a 99,6% de sobreposição com o original; moldura, coroa e linha de apoio entre 92 e 96% (linhas de 2 px no arquivo de origem). Rótulo em material que apresenta a marca: "reconstrução vetorial · aguarda o arquivo original".

A marca é **sempre um arquivo** de `assets/`: nunca redesenhe, redigite ROYAL PARMA em fonte, recolora fora das versões, gire (inclusive na vertical do saco), estique, contorne, aplique sombra, brilho, relevo ou dourado metálico, ponha a versão oficial sobre fundo claro, separe a coroa do escudo, use o brasão sem o RP ou o RP noutra fonte.

| Composição | Arquivo | Uso |
|---|---|---|
| Horizontal | `royal-horizontal-<cor>.svg` / `.png` / `-web.png` | assinatura padrão (brasão + ROYAL PARMA + PARMEGIANA DELIVERY), a partir de **320 px** |
| Reduzida | `royal-reduzida-<cor>.*` | sem a linha de apoio, de 130 a 320 px; rodapé de peça e e-mail |
| Vertical | `royal-vertical-<cor>.*` | espaço alto: capa, avatar, adesivo, a partir de 120 px |
| Linha | `royal-linha-<cor>.*` | RP pequeno + ROYALPARMA numa linha: letreiro, topo de post, faixa estreita |
| Brasão | `royal-brasao-<cor>.*` | lacre, selo de canto, marca-d'água, favicon; a partir de 22 px de largura |
| Monograma | `royal-monograma-<cor>.*` | só o RP: bordado, carimbo, detalhe; a partir de 16 px |
| Selo | `royal-selo-<cor>.*` | o RP dentro do círculo serrilhado: tampinha, lacre, adesivo; a partir de 40 px |
| Avatar | `royal-avatar.svg` / `-1080.png` / `-640.png` | foto de perfil de todas as unidades e do WhatsApp (vertical oficial sobre Verde) |
| Favicon | `royal-favicon.svg` / `-32` `-180` `-512.png` | aba do navegador (o de 32 px é a versão simplificada) |
| Compartilhamento | `royal-compartilhamento-1200x630.png` | imagem do link do site |

**Cores de cada composição:** `oficial` (ROYAL creme, PARMA caramelo: sobre Verde, Floresta, Mata ou foto bem escura) · `claro` (ROYAL e RP verde, PARMA caramelo: sobre Papel, Creme e branco; no Kraft só com prova) · `verde` (uma cor: Kraft, carimbo, impressão de uma cor) · `creme` (uma cor: foto escura, vídeo) · `caramelo` (uma cor: gravação e hot stamping; em tela só grande, sobre Verde ou Floresta).

Proporções (`width`/`height`): horizontal **2300 × 315,5** · reduzida **1821,5 × 315,5** · linha **1781 × 257,5** · vertical **499,5 × 610,5** · brasão **193,5 × 315,5** · monograma **167,5 × 124** · selo **535 × 535** · avatar 1080 × 1080. Medidas completas em `assets/marca.json`.

- **Respiro:** x = altura da coroa com a barra = 19,9% da altura do logotipo, nos quatro lados (no selo, 1/10 do diâmetro).
- **Tamanho mínimo:** horizontal **320 px** na tela (a 260 px a linha de apoio embaralha) e 77 mm no offset / 115 mm no kraft; reduzida 130 px; vertical 120 px; linha 120 px; brasão 22 px; monograma 16 px; selo 40 px.
- **Na peça de 1080:** completa só na capa, na última lâmina e em peça institucional; no rodapé, a reduzida, a linha ou o brasão.
- **Nome em texto:** **Royal Parma** (duas palavras); depois "a Royal". Unidade: **Royal Parma [Cidade]** (cidade com duas lojas: "Royal Parma [Cidade] [Bairro]", a confirmar). Nunca "RoyalParma", "ROYAL PARMA" corrido fora do logotipo, "Parma Royal", "Royal Parmã", "Royal" sozinho no primeiro uso. O ® fica no arquivo do logotipo e não é acrescentado em texto até a confirmação do registro (pendência 18).

## As cinco leis da casa (TRAVADAS)

1. **O verde é a casa; o caramelo é o tempero.** Verde Royal e Papel são os campos; o Kraft é o campo do pedido. O caramelo marca uma informação por peça e ocupa no máximo 10% da área. No claro, o caramelo nunca é texto (use canela). Sem dourado metálico, sem degradê.
2. **Uma palavra de molho por título.** Uma palavra ou expressão curta, em itálico serifado, tempera o título: é a parte que dá vontade ou que decide. Se tudo é destaque, nada é. Se falta espaço, corta-se texto, nunca margem.
3. **O que a peça mostra é o que chega.** Só foto real do prato da Royal, na porção, na embalagem e no acompanhamento que a unidade entrega. Nada de banco de imagem, prato gerado ou alterado por IA, queijo, porção ou recheio aumentados, ingrediente que o prato não tem. Gente real, com autorização por escrito.
4. **Toda promessa tem prova e condição.** Superlativo, número da rede, "mais barato", desconto, prazo, investimento e retorno só com fonte, data e condição na peça ou acessível a partir dela. "A melhor" sai. Promoção com regra escrita. Número ao investidor = Circular de Oferta de Franquia (COF) vigente.
5. **Uma rede, uma marca.** Toda unidade usa os mesmos arquivos, cores, fontes e modelos. A cidade entra em texto, nunca como logotipo, cor, fonte ou bio com promessa própria. A unidade adapta foto local e informação local, não a identidade.

## Arquitetura de marca

| Marca | Papel | Assina com |
|---|---|---|
| **Royal Parma** (marca-mãe) | consumidor, conteúdo da rede | logotipo; avatar = `royal-avatar` |
| **Royal Parma [Cidade]** (unidade) | perfil e canais da cidade: `@royalparma<cidade>`, "Royal Parma [Cidade] \| Delivery" | logotipo + cidade em texto + bloco da unidade |
| **Royal Parma Franquias** (expansão) | investidor; royalparmaoficial.com.br | logotipo + rótulo FRANQUIAS em texto + bloco da franqueadora + aviso ao investidor |
| **Bruno Lima** (fundador e CEO) | história, bastidor, autoridade | retrato real; "Bruno Lima · Fundador da Royal Parma" |
| **Produtos da casa** (Molho de Tomate artesanal, 600 ml) | varejo | logotipo + nome do produto em Gloock + rotulagem ANVISA completa |

O canal "Empreender com Delivery" é outra marca e não usa a identidade da Royal. Villa Parma, o restaurante de origem, entra só na história. "Franquia" ou "licenciamento": o manual usa "franquia" até a decisão (pendência 5).

## Voz e tom

Calorosa (comida de família, mesa, dividir), direta (frase curta, verbo concreto: pede, chega, quentinho), orgulhosa sem arrogância (história real, sem "o melhor do Brasil"), honesta (porção, prazo e preço como são, condição sempre junto), generosa ("marca quem vai dividir uma Royal com você"). Tratamento **você**. Humor leve com comida e rotina; nunca com cliente, concorrente, entregador ou funcionário.

- **Quem pede:** apetite, ocasião, praticidade. Chamadas: "Peça pelo cardápio digital" · "Peça agora" · "Chama no WhatsApp da unidade" · "Marca quem vai dividir com você" · "Salva para o próximo pedido".
- **Quem investe:** concreto, com fonte, sem promessa de renda. Chamadas: "Quero receber a apresentação" · "Consultar disponibilidade na minha cidade" · "Falar com a expansão". Sempre "pode variar conforme praça, operação e execução".
- **Nunca:** "a melhor parmegiana do Brasil", "a maior" sem critério e fonte, "100% artesanal" ou "zero desperdício" sem prova, "mais barato que no iFood" sem condição, "imperdível", "garantido", "renda garantida", "lucro certo", "negócio que roda sozinho", "fature R$ X por mês".
- **Pontuação:** zero travessão; no máximo uma exclamação por peça; caixa alta só em título curto e rótulo; emoji só em legenda e WhatsApp (no máximo dois, de comida ou de mão), nunca 🏆 e nunca na arte.

## Publicidade, consumo e franquia · TRAVADA

Base conferida em 30/09/2026 (detalhe, artigos e fontes na seção 08 do brand book): Código de Defesa do Consumidor (CDC, Lei 8.078/1990: oferta vincula, art. 30; informação clara, art. 31; publicidade enganosa inclusive por omissão, art. 37; prova cabe a quem anuncia, art. 38); Código do CONAR (edição 2025: apresentação verdadeira, art. 27; comparativa, art. 32; anexos de alimentos e bebidas); Lei de Franquias (Lei 13.966/2019: COF entregue com 10 dias de antecedência; informação falsa anula); Lei 5.768/1971 e Decreto 70.951/1972 (promoções com prêmio); Lei 10.962/2004, Decreto 5.903/2006 e Lei 13.455/2017 (preço); RDC ANVISA 727/2022 e RDC 429/2020 (rotulagem do pote; RDC 26/2015 revogada); Lei 10.674/2003 (glúten); LGPD (Lei 13.709/2018); Código Civil art. 20 (imagem); ECA Digital (Lei 15.211/2025). **O manual adota sempre a leitura conservadora e não substitui orientação jurídica.**

- **Superlativo e números da rede:** "a maior parmegianaria delivery do Brasil" só com critério, fonte e data (pendência 3); "a melhor" sai; lojas, estados e cidades só com número oficial datado (pendência 4).
- **Promoções:** desconto e cupom são livres com regra escrita. **Sorteio, vale-brinde, concurso e "os primeiros N ganham" exigem autorização da Secretaria de Prêmios e Apostas**, pedida com 40 a 120 dias de antecedência; sorteio aleatório de ganhador em rede social é vedado; concurso cultural que vale parmegiana não é isento.
- **Preço:** sempre com condição (unidade, canal, data). Comparação entre canais só com o mesmo prato, preço total com taxas, data e unidade; na dúvida, "Peça pelo nosso cardápio digital" (pendência 13).
- **Foto e descrição do prato:** porção e acompanhamento reais; "imagem ilustrativa" não salva foto enganosa.
- **Franquia:** número de investimento, retorno e faturamento só igual à COF vigente, com o que inclui e o aviso ao investidor; depoimento de franqueado só real, autorizado e sem promessa de ganho; "franquia" e "licenciamento" não são sinônimos (pendência 5).
- **Pote de molho:** rotulagem completa da ANVISA; a frase "contém glúten" ou "não contém glúten" também nos materiais de divulgação do molho; "artesanal" só com prova do processo.
- **Alergênicos no cardápio digital:** boa prática, por prato, conferidos na ficha técnica (pendência 11).
- **LGPD:** lista de WhatsApp e cupom por cadastro só com consentimento e saída fácil; formulário de franquia com aviso de privacidade; foto de cliente e de funcionário só com autorização escrita.
- **Crianças e bebida alcoólica:** nada de apelo de consumo a crianças; bebida alcoólica só com as regras próprias, se houver no cardápio (pendência 17).
- **Influenciador:** publicidade sempre identificada (#publi).

**Bloco da unidade** (`.id-unidade`): `Royal Parma [Cidade] · Delivery e retirada · [endereço] · Pedidos: (DD) [número oficial] · [cardápio digital]`.
**Bloco da franqueadora** (`.id-franqueadora`): `Royal Parma Franquias · [razão social] · CNPJ [nº] · royalparmaoficial.com.br` (pendência 7).
**Aviso de promoção** (`.aviso-promo`): "Válido de [data] a [data] na Royal Parma [Cidade], pelo [canal]. [Limite]. Não cumulativo com outras promoções."
**Aviso ao investidor** (`.aviso-investidor`): "Valores estimados. Podem variar conforme praça, operação e execução. Informações completas na Circular de Oferta de Franquia (COF)."
**Canais oficiais de pedido** (`.canais`): cardápio digital da unidade · WhatsApp oficial · aplicativos onde a unidade está, com "Peça só pelos canais oficiais da sua unidade."

**Quem aprova:** a franqueadora aprova toda peça de rede e todo modelo; a unidade publica a partir dos modelos aprovados; peça de franquia passa pela expansão e pelo jurídico.

## Fotografia

Só fotos reais (`assets/fotos/`, origem em `LEIA.md`): parmegiana com o queijo puxando no garfo, marmitas de alumínio dentro da caixa kraft, prato servido em casa, pote de molho, fachada verde com tijolo, equipe de uniforme. Cena da casa: mesa de madeira, sousplat de palha, prato preto ou bege, guardanapo xadrez como objeto real, luz quente lateral. Ângulos: 45°, zenital para a marmita aberta, close do garfo. Formatos 4:5, 9:16, 1:1. **Fotografar o prato como ele chega:** porção da ficha técnica, mesmos acompanhamentos, mesma embalagem, sem cola, sem queijo extra, sem IA. Texto sobre foto: sombra de leitura de Floresta subindo da base, nunca caixa colorida. Nunca banco de imagem, prato de outro restaurante, pessoa gerada por IA, bandeira da Itália, flash estourado, taça de bebida alcoólica em cena sem decisão (pendência 17). Sessão de fotos padronizada e banco oficial: pendência 10.

## Formas e dados

**`rforms.js`**: as formas da casa, tiradas da embalagem e do brasão, sem imitar o logotipo. `<div class="forma-svg" data-rforms="moldura"></div>` ou `rforms.render(el, 'curva', opts)`. Formas: `filete` (filete duplo, a moldura da caixa virando régua) · `moldura` (moldura de rótulo, cantos côncavos: emoldura UMA coisa por peça) · `selo` (círculo serrilhado com 1 a 3 palavras ou o RP; nunca promessa sem prova) · `curva` (a perna do R em escala gigante, saindo de um canto) · `caixinhas` (os quadradinhos de marcar da caixa) · `perolas` (divisor) · `arco` (os arcos da coroa) · `escudo` (contorno do escudo, vazio) · `vapor` (raro). No máximo uma forma de destaque por peça, mais o filete. `rforms.svg(nome, opts)` devolve o SVG para o Canva; versões prontas em `assets/formas/`. **Clichês vedados:** bandeira da Itália, Coliseu, Torre de Pisa, gôndola, chef de bigode, beijo de chef, labaredas, queijo em 3D, coroa solta, xadrez desenhado.

**`rviz.js`**: gráficos em SVG puro. `<div class="grafico-svg" data-rviz='{"tipo":"barras","rotulos":["A","B"],"valores":[7,14],"destaque":1,"fonte":"..."}'></div>`. Tipos: `barras`, `barras-h`, `linha`, `composicao`, `anel`, `funil`, `fluxo`, `kpi`, `linha-tempo`, `cota`. Um destaque (marcado por uma pérola na cor de molho do campo), o resto neutro; título que já diz a conclusão; fonte e data sempre, ou "Dado ilustrativo". **Nunca** faturamento de franqueado como promessa, ranking de concorrente ou avaliação inventada.

## Ícones

**Lucide** inline em SVG, traço 1,5, pontas arredondadas, 16/20/24 px, sempre com palavra. Cor: caramelo ou mel no Verde; Verde ou canela no claro; Verde no Kraft. Conjunto da rede: `shopping-bag` (pedido), `bike` (entrega), `store` (retirada, loja), `book-open` (cardápio), `ticket` (cupom), `clock` (horário), `star` (avaliação), `message-circle` (WhatsApp), `map-pin`, `phone`, `leaf` (vegetariano), `wheat` / `milk` / `egg` (alergênicos), `chart-line` e `handshake` (investidor), `headset` (suporte), `graduation-cap` (treinamento). **Destaques do Instagram:** círculo caramelo com ícone verde, nomes Cardápio, Pedido, Cupom, Horários, Avaliações, Quem somos, Contato (capas prontas em `assets/destaques/`). Nunca emoji na arte, ícone colorido ou 3D, mistura de bibliotecas, coroa como ícone.

## Componentes canônicos

Os nomes de classe são a interface do sistema: **nunca renomeie**. Todos estão na `<style>` do `brand-book.html` e vivos na seção 13.

| Classe | Uso |
|---|---|
| `.sec` + `.sec--verde` / `.sec--papel` · `.sec-head` · `.folio` | seção com fólio de rótulo e numeral (caramelo no Verde, canela no Papel) |
| `.bloco` > `.bloco-head` (`.bloco-n` + `h3` + `.bloco-apoio`) | subseção numerada NN.1, NN.2 |
| `campo-verde` · `campo-floresta` · `campo-mata` · `campo-papel` · `campo-creme` · `campo-kraft` · `campo-branco` · `.faixa` | troca de campo num pedaço ou de ponta a ponta |
| `.cols-2` `.cols-3` `.cols-4` `.cols-7-5` `.cols-5-7` `.cols-8-4` `.grade-12` | grades de 12 colunas que empilham no celular |
| `em` no título (a palavra de molho) · `.molho` · `.rotulo` · `.chamada` · `.legenda` | tipografia |
| `.filete` `.filete--simples` `.filete--caramelo` `.filete-v` · `.moldura` `.moldura--cheia` · `.selo` · `.perola` · `.curva` · `.caixinhas` · `.etiqueta` | motivos da casa (`.pc-*` na peça 1080) |
| `.btn` + `--cheio` `--verde` `--linha` `--baixar` `--bloco` · `.link-seta` | botões, altura mínima 48 |
| `.preco` (+ `.preco-valor`, `.preco-condicao`) · `.alergenico` | preço sempre com condição; sem condição, a peça acusa |
| `.id-unidade` · `.id-franqueadora` · `.canais` · `.aviso-promo` · `.aviso-investidor` | identificação, canais oficiais e avisos |
| `.nota` · `.alerta` · `.faca` / `.nao-faca` · `.par` · `.nf-grid` > `.nf` | avisos; Assim / Não assim; galeria "Não faça" |
| `.cor` · `.leituras` > `.leitura-par` | ficha de cor com contraste calculado |
| `.table-wrap` > `table.consulta` · `.table-wrap.matriz` | tabela que vira cartão no celular · matriz com rolagem local |
| `.kpi-grid` > `.kpi` · `.olho` · `.checklist` > `.check-row` | número antes do rótulo; citação; checklist |
| `.mock` + formato (post-45, post, story, reels, whats, celular, doc-pagina, a5, cartao, email, banner) > `.peca` | mockups em escala real com `--u`; `.peca--segura` para story e reels |
| `.grafico` > `.grafico-svg[data-rviz]` · `.forma` > `.forma-svg[data-rforms]` | motores |
| deck: `.slide` + `capa` `capa-clara` `secao` `ideia` `stat` `grafico` `compara` `citacao` `passos` `prato` `closer` · `aside.notas` | apresentação |

Espaço só na escala de 4 (4, 8, 12, 16, 24, 32, 48, 64, 96, 128). Respiro lateral 48 px no desktop, 32 até 1024, 20 até 640.

## Aplicações (medidas na arte final)

| Peça | Formato | Regra principal |
|---|---|---|
| Post único | 1080 × 1350 ou 1080 × 1080 | foto do prato com título e palavra de molho; tipográfico Verde; Kraft "chegou quentinho" |
| Carrossel | 1080 × 1350, margem 72 | capa Verde; miolo Papel ou Kraft; última lâmina com canais oficiais e bloco da unidade |
| Story | 1080 × 1920 | 250 px livres no topo e na base; cupom sempre com a regra inteira |
| Capa de reels | 1080 × 1920 | título no recorte central 3:4 |
| Destaques | 1080 × 1080 | círculo caramelo, ícone verde |
| Bio da unidade | Instagram | "Parmegiana de receita de família, no delivery e na retirada · [bairro], [Cidade] · Peça pelo cardápio digital 👇"; sem superlativo, sem 🏆 |
| iFood e aplicativos | medida do portal do parceiro | avatar da rede, capa com foto real, nome "Royal Parma [Cidade]", descrição padrão com porção e alergênicos |
| Cardápio digital | celular | topo Verde, resto Papel, botão Verde; taxa, mínimo e tempo antes de escolher |
| WhatsApp | perfil comercial | nome "Royal Parma [Cidade]", avatar da rede, mensagens-modelo, lista só com consentimento |
| Caixa, saco, lacre | kraft, verde de uma cor | moldura de rótulo, brasão, curva do R, caixinhas; marca nunca girada |
| Pote de molho | rótulo 600 ml | painel principal + painel de informação obrigatória ANVISA |
| Cardápio impresso, flyer, cartão | A5, 10 × 15 cm | Kraft ou Papel; QR do cardápio; promoção com regra |
| Fachada | Verde com tijolo | letreiro `linha` ou `reduzida` pela largura; placa de horário; adesivos de aplicativo em faixa própria |
| Uniforme | camiseta verde | brasão ou assinatura `linha` em creme |
| Página de franquia | 12 colunas | números como [conforme COF] com aviso; formulário com LGPD; rodapé com bloco da franqueadora |
| Apresentação ao investidor | `deck-template.html` | 1440 × 900; números da COF; aviso em todo slide com número |
| Assinatura de e-mail | tabela de 600 px | compatível com Gmail e Outlook (`lockup.html`) |

Detalhe completo, mockups e textos prontos nas seções 14 a 19.

## Dois formatos de primeira classe

**Documento** (`brand-book.html` é o template): leitura, proposta, relatório, manual. Uma coluna de leitura, seções numeradas com fólio, sumário depois da introdução, alternância Verde e Papel.

**Deck** (`deck-template.html`): reunião, apresentação ao investidor, treinamento de franqueado. Canvas 1440 × 900 escalado; `<section class="slide TIPO">`; setas, espaço, Home/End e toque; barra de progresso; contador; **P** abre as notas; **F** tela cheia; `#3` abre o terceiro slide; no celular os slides empilham.

Vai ser **lido** → documento. Vai ser **apresentado** → deck.

## Mobile System v1 (TRAVADO)

Tudo legível e sem corte entre **320 e 430 px**. Breakpoints 1024 e 640 (e 380 para display). Grades empilham; tabelas de consulta viram cartões pelo script `<script data-royal-responsive="v1">` do fim do `brand-book.html` (copie literal); matriz larga com rolagem local sinalizada; `overflow-wrap:anywhere` em texto corrido; mídia com `max-width:100%`; botões de 48 px. API: `window.royalAtualiza(el)`, `royalMobile`, `royalGrade`, `royalAmpliar`, `royalReveal`. **PROIBIDO `overflow-x:hidden` no `html` ou no `body`.**

## Exportar PDF

**Pelo Chrome:** abra o HTML, espere 3 segundos, `Cmd+P`, Salvar como PDF, **Gráficos de segundo plano LIGADO** (sem isso o verde some). Documento em retrato com margens padrão; deck em paisagem sem margens.

**Automatizado:** `python3 exportar_pdf.py [arquivo.html]` (Playwright, `print_background=True`). **Nunca use `--print-to-pdf` do Chrome.**

## Pendências com a Royal Parma (não resolva por conta própria)

1. Arquivos originais do logotipo (vetor) e validação da reconstrução.
2. Linha de apoio: PARMEGIANA DELIVERY (logotipo) ou PARMEGIANARIA DELIVERY (caixa).
3. Prova do superlativo "a maior parmegianaria delivery do Brasil"; "a melhor" sai das bios.
4. Números oficiais da rede (estados, cidades, lojas) numa fonte única datada.
5. Franquia ou licenciamento.
6. Números ao investidor iguais à COF vigente (hoje as páginas divergem).
7. Razão social e CNPJ da franqueadora.
8. Licença e saída da fonte Colus.
9. Autorização de imagem de equipe, franqueados e clientes; retirada de imagens de IA.
10. Sessão de fotos padronizada e banco oficial para as unidades.
11. Alergênicos e informação nutricional por prato.
12. Regras de promoção e eventual sorteio (autorização federal).
13. Política de preço entre canais e como anunciar a diferença.
14. Lista oficial de unidades e @ (regra proposta para duas lojas na cidade: "[Cidade] [Bairro]").
15. Perfil nacional da marca (o @royalparma não é da rede).
16. Pantone e prova de gráfica do verde e do caramelo no kraft.
17. Bebida alcoólica no cardápio (regras próprias).
18. Registro da marca no INPI (uso do ®).

Também em aberto: o significado das caixinhas da caixa (1 a 4, M, F, T, A), a regularização sanitária e o "artesanal" do molho, e a palavra ROYALPARMA girada no saco (vai deitada no próximo lote).

Quando uma peça esbarrar numa pendência, entregue a versão permitida (dado em colchete, superlativo fora, número com "[conforme COF]") e diga em uma linha qual pendência trava o resto.

## Checklist de aprovação de peça

- [ ] Marca é arquivo de `assets/`, versão certa para o fundo, com respiro e acima do mínimo (horizontal 320 px; abaixo, reduzida, linha ou brasão).
- [ ] Só cores da tabela; caramelo no máximo 10% e nunca texto no claro; sem dourado metálico.
- [ ] Gloock no título com **uma** palavra de molho em Playfair Italic; Source Sans 3 no resto; nada abaixo de 26 px na peça 1080.
- [ ] Foto real do prato como chega, sem IA, com autorização de quem aparece.
- [ ] Toda promessa com prova e condição; nenhum "a melhor"; superlativo e número da rede só com fonte e data.
- [ ] Promoção com regra escrita; nada de sorteio, "primeiros N" ou concurso sem autorização.
- [ ] Preço com condição; comparação entre canais só com mesmo prato, total, data e unidade.
- [ ] Peça de franquia: números iguais à COF, aviso ao investidor, sem promessa de renda.
- [ ] Bloco da unidade ou da franqueadora quando a peça sai do perfil; canais oficiais; dados não confirmados em colchete.
- [ ] Zero travessão, zero emoji na arte (no máximo dois na legenda, nunca 🏆), no máximo uma exclamação.
- [ ] Contraste AA; texto alternativo em toda imagem.
- [ ] Testado no celular: peça reduzida a 36% ainda se lê; página sem corte de 320 a 430 px.
- [ ] Aprovada pela franqueadora (modelo) e conferida pela unidade (dados locais).

## Gotchas (vão te morder)

1. **Uma única `<style>` por arquivo.** Print e gráfico entram nela.
2. **A marca é arquivo, não código.** Se você está escrevendo `<path>` de logotipo, ROYAL PARMA em fonte ou data URI de memória, pare: use `assets/` ou o `lockup.html`. Nunca cole o SVG do logotipo no HTML: use `<img>`.
3. **Caramelo no claro tem 2,4 a 3,3:1.** No claro, a palavra de molho é canela; no Kraft, é Verde.
4. **A palavra de molho fica em caixa normal** mesmo dentro de título em caixa alta.
5. **A horizontal some abaixo de 320 px.** No rodapé de post, a reduzida, a linha ou o brasão.
6. **Caramelo em texto pequeno sobre Verde reprova:** abaixo de 18 px, use mel.
7. **IDs de SVG únicos** por página (prefixe).
8. **Número da rede, CNPJ, preço e COF nunca inventados.** Colchete até a franqueadora confirmar.
9. **"A melhor", "mais barato que o iFood", "renda garantida"** não entram em copy pública, nem em bio.
10. **`print_background=True`** ou "Gráficos de segundo plano" ligado, senão o verde some.
11. **Caminho relativo sempre** (`assets/...`); para enviar, `python3 autocontido.py`.
12. **Selo com palavra de 4 letras ou mais:** use `<b class="longo">` (corpo menor) ou o `rforms` com texto em arco.

## O que o Rótulo Real NÃO é

- Não é cantina de clichê: nada de bandeira da Itália, Coliseu, chef de bigode, toalha xadrez desenhada.
- Não é luxo de mentira: nada de dourado metálico, brilho, 3D, coroa solta.
- Não é caramelo espalhado: é uma palavra, um botão, um preço.
- Não é promessa: não diz "a melhor", não promete renda, não compara preço sem condição.
- Não é foto de banco nem comida gerada por IA.
- Não é a marca redesenhada, girada, recolorida ou digitada.
- Não é logotipo de cidade: a unidade é a mesma marca com o nome da cidade em texto.

---

Marca, brasão e logotipo são propriedade da franqueadora Royal Parma. Sistema de identidade organizado com a GrowAI. Rótulo Real v1 · setembro de 2026.
