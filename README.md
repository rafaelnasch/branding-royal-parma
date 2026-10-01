# branding-royal-parma

**A identidade visual da Royal Parma, empacotada como uma Skill do Claude.** Sistema Rótulo Real v1.

Instale uma vez e peça o material em português. O Claude passa a produzir post, carrossel, story, reels, capa e descrições do iFood, cardápio digital, mensagens de WhatsApp, cupom, caixa, pote de molho, cardápio impresso, flyer, fachada, página de franquia, apresentação ao investidor e e-mail **já no padrão da Royal Parma**: cor certa, fonte certa, marca certa, tom certo e as regras de publicidade de comida e de franquia, sem você precisar explicar nada disso de novo.

> "Faz um carrossel de 5 lâminas da Royal Parma Bauru sobre como a parmegiana chega."
> "Monta o story do cupom de quarta da Royal Parma [Cidade] com a regra inteira."
> "Cria a apresentação ao investidor em 10 slides, com os números como [conforme COF]."

**Ver o brand book no navegador:** [rafaelnasch.github.io/branding-royal-parma](https://rafaelnasch.github.io/branding-royal-parma/) (abre em qualquer aparelho, sem instalar nada). Pedidos prontos para copiar: [guia de uso](https://rafaelnasch.github.io/branding-royal-parma/guia-de-uso.html).

---

## O que vem na caixa

| Arquivo | O que é |
|---|---|
| `SKILL.md` | O estilo inteiro, travado: cores, tipografia e a palavra de molho, a marca, as cinco leis, voz, publicidade de comida e de franquia, medidas de cada peça, celular e PDF. É o que o Claude lê. |
| `brand-book.html` | **Abra primeiro.** O manual vivo em 24 seções, com modelos de peça em tamanho real, e o template pronto de **documento**. |
| `deck-template.html` | O esqueleto de **apresentação**: onze tipos de slide em 1440 × 900, navegação por seta, notas na tecla **P**. |
| `lockup.html` | Os snippets prontos: marca em arquivo e em data URI, brasão, selo, avatar, favicon, blocos da unidade e da franqueadora, canais oficiais, avisos de promoção e ao investidor, preço com condição, item de cardápio, assinatura de e-mail e bio da unidade. |
| `guia-de-uso.html` | Pedidos prontos por público (franqueadora, unidade, expansão, gráfica, vídeo), com o que sai e a seção do manual que manda. |
| `rviz.js` | Motor de gráficos em SVG puro: barras, ranking, linha, composição, anel, funil, fluxo, número em destaque, linha do tempo e cota. |
| `rforms.js` | Motor de formas da casa, tiradas da embalagem e do brasão: filete duplo, moldura de rótulo, selo serrilhado, curva do R, caixinhas, pérolas, arco, escudo e vapor. |
| `dist/` | **Para enviar a alguém.** Versões de arquivo único (imagens, fontes e motores embutidos). Abrem sozinhas no e-mail, WhatsApp, Drive e celular. |
| `autocontido.py` | Gera o `dist/` de novo: `python3 autocontido.py`. Também transforma qualquer HTML novo feito com a skill: `python3 autocontido.py meu-material.html`. |
| `exportar_pdf.py` | Exporta documento ou apresentação em PDF com o Playwright. |
| `assets/` | A marca em SVG e PNG (horizontal, reduzida, vertical, linha, brasão, monograma e selo, em cinco cores), avatar, favicon, imagem de compartilhamento, `marca.json` com medidas, as fotos públicas (`fotos/`), as formas para o Canva (`formas/`), as capas dos destaques (`destaques/`) e os arquivos publicados que serviram de base (`referencia-original/`). |

## Instalar

O nome da pasta tem que ser exatamente `branding-royal-parma`, com o `SKILL.md` dentro.

### Claude Code (terminal, VS Code, app de desktop)

```bash
git clone https://github.com/rafaelnasch/branding-royal-parma.git ~/.claude/skills/branding-royal-parma
```

Abra uma sessão nova e digite `/branding-royal-parma`, ou simplesmente peça "faz no padrão da Royal Parma". Para atualizar:

```bash
cd ~/.claude/skills/branding-royal-parma && git pull
```

### Claude no navegador ou no celular (claude.ai)

1. Baixe o ZIP pronto na página de **[Releases](https://github.com/rafaelnasch/branding-royal-parma/releases/latest)**: o arquivo `branding-royal-parma.zip`.
2. No Claude, vá em **Settings, Capabilities, Skills** e envie o ZIP.

> Use o ZIP do Releases, **não** o "Code, Download ZIP" do GitHub: aquele vem com o nome da pasta trocado (`branding-royal-parma-main`) e a skill sobe com o nome errado.

No navegador o material sai como arquivo único, com a marca e os gráficos embutidos. A skill já sabe fazer isso. Só o PDF muda: ela entrega o HTML e você imprime pelo Chrome (instruções abaixo).

### Codex CLI

```bash
git clone https://github.com/rafaelnasch/branding-royal-parma.git ~/.codex/skills/branding-royal-parma
```

## O primeiro teste

Abra uma conversa nova e peça:

> "Faz um post 1080 × 1350 da Royal Parma [Cidade] com a parmegiana de frango."

Se vier campo Verde (ou Kraft), título em serifa com **uma** palavra em itálico caramelo, a foto real do prato, a marca no rodapé e nenhuma promessa do tipo "a melhor do Brasil", está funcionando. Se vier um post genérico, a skill não carregou: feche e abra o Claude de novo e confira se a pasta se chama exatamente `branding-royal-parma` e tem o `SKILL.md` dentro.

## Usar

- **"faz no padrão da Royal Parma"** já aciona a skill;
- diga **qual peça** (post, carrossel, story, reels, iFood, cardápio digital, WhatsApp, cupom, caixa, pote de molho, cardápio impresso, flyer, fachada, página de franquia, apresentação, e-mail) e **a unidade** (cidade): a skill já sabe a medida de cada formato;
- diga se é para **ler** (documento) ou para **apresentar** (deck);
- endereço, telefone, preço, datas, CNPJ e números da COF saem em colchete: preencha antes de publicar;
- toda peça nova de rede passa pela franqueadora antes de ir ao ar;
- para **PDF**: abra o HTML no Chrome, espere uns 3 segundos, `Cmd+P`, **Salvar como PDF** e, em "Mais configurações", ligue **Gráficos de segundo plano**. Sem isso o fundo verde some. Apresentação: layout **Paisagem**, margens **Nenhuma**.

## As cinco leis da casa

1. **O verde é a casa; o caramelo é o tempero.** Verde e Papel são os campos; o Kraft é o campo do pedido. O caramelo marca uma informação por peça, no máximo 10% da área.
2. **Uma palavra de molho por título.** Uma palavra em itálico serifado tempera o título. Se falta espaço, corta-se texto, nunca margem.
3. **O que a peça mostra é o que chega.** Só foto real do prato, na porção e na embalagem que a unidade entrega. Nada de banco de imagem nem comida gerada por IA.
4. **Toda promessa tem prova e condição.** Superlativo, número da rede, desconto, preço entre canais e números ao investidor só com fonte, data e condição. "A melhor" sai.
5. **Uma rede, uma marca.** A cidade entra em texto, nunca como logotipo, cor ou fonte própria.

## A marca

O logotipo da Royal Parma **nunca** é redesenhado, redigitado, girado, recolorido fora das versões ou vetorizado por conta própria. É sempre um dos arquivos de `assets/`. Fundo verde pede a versão oficial (ROYAL creme, PARMA caramelo); fundo claro pede a versão clara; kraft pede a versão verde de uma cor; foto escura pede a creme. Abaixo de 320 px de largura entra a reduzida (sem PARMEGIANA DELIVERY); em espaços pequenos, a linha ou só o brasão. Os arquivos são uma **reconstrução vetorial** feita a partir dos arquivos publicados pela rede e serão trocados, com o mesmo nome, quando o arquivo original do designer chegar.

## Publicidade de comida e de franquia

O manual segue o Código de Defesa do Consumidor, o Código do CONAR, a Lei de Franquias (Circular de Oferta de Franquia), as regras de promoção com prêmio, de informação de preço, de rotulagem da ANVISA e a LGPD, sempre na leitura mais cuidadosa. Ele não substitui orientação jurídica. Detalhe, fontes e modelos na seção 08 do brand book.

## Pendências com a Royal Parma

Até cada uma ser resolvida, a skill entrega só a versão permitida. A lista completa (18 itens), com o que fica travado e o que fazer enquanto isso, está na seção 23 do brand book e no `SKILL.md`.

## Navegador

Chrome, Edge ou Safari recentes (iOS 16 ou mais novo, Chrome 105 ou mais novo).

---

Marca, brasão e logotipo são propriedade da franqueadora **Royal Parma**. Os motores `rviz.js` e `rforms.js` foram escritos para este sistema. Sistema de identidade organizado com a GrowAI. Rótulo Real v1 · setembro de 2026.
