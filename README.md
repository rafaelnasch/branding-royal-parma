# branding-royal-parma · a identidade visual da Royal Parma como skill

**O que é:** a identidade visual da **Royal Parma** (rede de parmegianaria delivery em franquia), no sistema **Rótulo Real v1**, empacotada como uma *skill*. Uma skill é um pacote de instruções e arquivos que o assistente de IA (Claude, Codex ou ChatGPT) carrega sozinho quando o pedido combina com ela.

**O que muda depois de instalar:** você pede o material em português, como pediria a um designer, e ele já sai **no padrão da Royal Parma**. Isso vale para post, carrossel, story, reels, capa e descrições do iFood, cardápio digital, mensagens de WhatsApp, cupom, caixa, pote de molho, cardápio impresso, flyer, fachada, página de franquia, apresentação ao investidor e e-mail, com cor, fontes, marca e tom certos e com as regras de publicidade de comida e de franquia. Não é preciso explicar nada disso de novo a cada conversa.

> "Faz um carrossel de 5 lâminas da Royal Parma Bauru sobre como a parmegiana chega."
> "Monta o story do cupom de quarta da Royal Parma [Cidade] com a regra inteira."
> "Cria a apresentação ao investidor em 10 slides, com os números como [conforme COF]."

**Ver o brand book sem instalar nada:** [rafaelnasch.github.io/branding-royal-parma](https://rafaelnasch.github.io/branding-royal-parma/) (abre em qualquer aparelho). Pedidos prontos por público: [guia de uso](https://rafaelnasch.github.io/branding-royal-parma/guia-de-uso.html).

**Baixar o pacote de instalação (ZIP):** [branding-royal-parma.zip](https://github.com/rafaelnasch/branding-royal-parma/releases/latest/download/branding-royal-parma.zip). O link entrega sempre a versão mais recente.

---

## Sumário

1. [Antes de começar: qual caminho é o seu](#1-antes-de-começar-qual-caminho-é-o-seu)
2. [Instalar no Claude pelo navegador (claude.ai)](#2-instalar-no-claude-pelo-navegador-claudeai)
3. [Instalar no Claude Code](#3-instalar-no-claude-code)
4. [Instalar no Codex](#4-instalar-no-codex)
5. [ChatGPT](#5-chatgpt)
6. [Conferir se funcionou](#6-conferir-se-funcionou)
7. [Como a skill funciona por dentro](#7-como-a-skill-funciona-por-dentro)
8. [Como pedir: o pedido que dá certo](#8-como-pedir-o-pedido-que-dá-certo)
9. [O que você recebe e como finalizar](#9-o-que-você-recebe-e-como-finalizar)
10. [As regras que a skill aplica sozinha](#10-as-regras-que-a-skill-aplica-sozinha)
11. [Atualizar, compartilhar com a equipe e remover](#11-atualizar-compartilhar-com-a-equipe-e-remover)
12. [Problemas comuns](#12-problemas-comuns)
13. [O que vem no repositório](#13-o-que-vem-no-repositório)
14. [Pendências com a Royal Parma](#14-pendências-com-a-royal-parma)
15. [Para quem mantém a skill](#15-para-quem-mantém-a-skill)

---

## 1. Antes de começar: qual caminho é o seu

| Você usa | Caminho | Precisa de | Tempo |
|---|---|---|---|
| **Claude no navegador ou no app** (claude.ai) | [Seção 2](#2-instalar-no-claude-pelo-navegador-claudeai): envia o ZIP | Conta Claude (Free, Pro, Max, Team ou Enterprise) e um computador para o envio | 3 minutos |
| **Claude Code** (terminal, VS Code, app de desktop) | [Seção 3](#3-instalar-no-claude-code): um comando | Git instalado | 1 minuto |
| **Codex** (app, CLI ou extensão de IDE) | [Seção 4](#4-instalar-no-codex): um comando | Git instalado | 1 minuto |
| **ChatGPT** | [Seção 5](#5-chatgpt) | Depende do que a sua conta libera | Leia a seção |

**Regra de ouro para o ZIP:** use sempre o link de download acima ou a página de [Releases](https://github.com/rafaelnasch/branding-royal-parma/releases/latest). **Nunca** use o botão verde "Code > Download ZIP" do GitHub. Esse botão baixa o repositório inteiro, com a pasta chamada `branding-royal-parma-main`, e a skill sobe com o nome errado ou grande demais.

---

## 2. Instalar no Claude pelo navegador (claude.ai)

Faça uma vez, no computador. Depois disso a skill fica na sua conta.

**Passo 1 · Ligue a execução de código** (só na primeira vez)
1. Abra [claude.ai](https://claude.ai) e entre na sua conta.
2. Vá em **Configurações** (Settings) > **Capacidades** (Capabilities).
3. Ligue **Execução de código e criação de arquivos** (Code execution and file creation). Sem isso, nenhuma skill funciona.

> Em conta **Team** ou **Enterprise**, quem administra a organização precisa ter liberado skills e execução de código. Se a opção não aparecer, peça ao administrador.

**Passo 2 · Baixe o pacote**
- Clique em [branding-royal-parma.zip](https://github.com/rafaelnasch/branding-royal-parma/releases/latest/download/branding-royal-parma.zip). Ele tem cerca de 7 MB.
- **Não descompacte.** O Claude recebe o ZIP do jeito que ele veio.

**Passo 3 · Envie a skill**
1. No claude.ai, abra **Personalizar** (Customize) > **Skills**.
2. Clique em **+** e depois em **Criar skill** (Create skill).
3. Escolha **Enviar uma skill** (Upload a skill) e selecione o `branding-royal-parma.zip`.
4. A skill `branding-royal-parma` aparece na lista. Confira se a chave ao lado dela está **ligada**.

**Passo 4 · Teste**
- Abra uma **conversa nova** e siga a [seção 6](#6-conferir-se-funcionou).

**Bom saber no navegador:** o que o Claude cria ali sai como **arquivo único** (um HTML com marca, imagens e motores embutidos), porque o artefato não enxerga as outras pastas do pacote. A skill já sabe disso e faz sozinha. Para virar PDF, veja a [seção 9](#9-o-que-você-recebe-e-como-finalizar).

---

## 3. Instalar no Claude Code

Abra o terminal e rode:

```bash
git clone https://github.com/rafaelnasch/branding-royal-parma.git ~/.claude/skills/branding-royal-parma
```

1. Abra uma sessão **nova** do Claude Code.
2. Digite `/branding-royal-parma` para chamar a skill na hora, ou só peça "faz no padrão da Royal Parma", e ela entra sozinha.

No Claude Code o ambiente é completo: a skill grava os arquivos no seu computador, usa as fotos e a marca de `assets/` e exporta PDF direto (`exportar_pdf.py`).

> **Para um projeto só:** se preferir que a skill valha apenas dentro de uma pasta de projeto, clone em `<pasta-do-projeto>/.claude/skills/branding-royal-parma`.

---

## 4. Instalar no Codex

Abra o terminal e rode:

```bash
git clone https://github.com/rafaelnasch/branding-royal-parma.git ~/.agents/skills/branding-royal-parma
```

1. Reinicie o Codex (app, CLI ou extensão de IDE).
2. Digite `/skills` para ver a lista. A skill aparece como **Royal Parma · Rótulo Real**, nome dado pelo arquivo `agents/openai.yaml`.
3. Para chamar a skill na hora, escreva `$branding-royal-parma` no começo do pedido. Ou só peça "faz no padrão da Royal Parma", e ela entra sozinha.

> **Versões antigas do Codex** leem `~/.codex/skills/` em vez de `~/.agents/skills/`. Se a skill não aparecer em `/skills`, rode o mesmo comando trocando a pasta de destino.

---

## 5. ChatGPT

O ChatGPT usa o mesmo formato de skill (pasta com `SKILL.md`), e este pacote já traz o arquivo que o ChatGPT e o Codex leem para mostrar nome, ícone e pedido de exemplo (`agents/openai.yaml`).

**O envio de uma skill avulsa pelo ChatGPT web ainda não está documentado pela OpenAI** (consulta de 07/10/2026). Hoje a documentação oficial descreve skills no **Codex** e skills que chegam ao ChatGPT por meio de *plugins*.

- Se o seu ChatGPT mostra **Skills** na barra lateral com a opção de **criar ou enviar** uma skill, envie o mesmo [branding-royal-parma.zip](https://github.com/rafaelnasch/branding-royal-parma/releases/latest/download/branding-royal-parma.zip), sem descompactar. Depois, chame a skill digitando `@` e escolhendo `branding-royal-parma`.
- Se essa opção não aparece na sua conta, use o **claude.ai** ([seção 2](#2-instalar-no-claude-pelo-navegador-claudeai)) ou o **Codex** ([seção 4](#4-instalar-no-codex)), que funcionam hoje.

---

## 6. Conferir se funcionou

Abra uma **conversa nova** (a skill não entra numa conversa que já estava aberta antes da instalação) e peça:

> "No padrão da Royal Parma, faz um post 1080 × 1350 da Royal Parma Bauru com a parmegiana de frango e a chamada para o cardápio digital."

**Funcionou se vier:**
- [ ] campo **Verde Royal** (ou Papel, ou Kraft), nunca preto puro, vermelho ou degradê dourado;
- [ ] título em serifa (Gloock) com **uma única** palavra de molho em itálico (Playfair): caramelo sobre o Verde, canela sobre o Papel, Verde sobre o Kraft;
- [ ] a marca **em arquivo** (brasão com RP e ROYAL PARMA desenhados), nunca "ROYAL PARMA" digitado numa fonte; no rodapé, a reduzida, a linha ou o brasão;
- [ ] a **foto real** do prato, sem prato gerado por IA nem foto de banco;
- [ ] "Royal Parma Bauru" **em texto**, com a chamada "Peça pelo cardápio digital";
- [ ] nada de "a melhor parmegiana do Brasil", nenhum emoji na arte, preço só com condição ou entre colchetes.

**Não funcionou se vier** um post genérico, com cores aleatórias, bandeira da Itália ou com "Royal Parma" escrito numa fonte qualquer. Veja a [seção 12](#12-problemas-comuns).

---

## 7. Como a skill funciona por dentro

A skill não fica "lendo tudo" o tempo todo. Ela carrega em camadas, só o que o pedido precisa:

1. **A descrição (sempre carregada).** O assistente vê só o nome `branding-royal-parma` e um parágrafo que diz quando usar a skill: material da Royal Parma (unidade ou franqueadora) e palavras como "branding royal parma", "padrão royal", "royal parma" e "rótulo real". É isso que faz a skill entrar sozinha quando o pedido combina.
2. **O `SKILL.md` (quando a skill entra).** Traz as regras travadas: cores e pares de contraste, tipografia e a palavra de molho, as composições da marca, as cinco leis da casa, a arquitetura de marca, a voz, as regras de publicidade de comida e de franquia, as medidas de cada peça, o celular e o PDF.
3. **Os arquivos de apoio (só quando a peça pede):**

| Arquivo | Quando o assistente abre |
|---|---|
| `brand-book.html` | Para copiar o modelo de **documento** (proposta, relatório, página de franquia) e conferir modelos de peça em tamanho real. É o manual completo em 24 seções. |
| `deck-template.html` | Para montar uma **apresentação**: onze tipos de slide em 1440 × 900, navegação por seta e notas na tecla P. |
| `lockup.html` | Para pegar a **marca pronta**, inclusive em *data URI* (a imagem embutida no próprio HTML, usada no navegador), os blocos da unidade e da franqueadora, canais oficiais, avisos de promoção e ao investidor, preço com condição, item de cardápio, assinatura de e-mail e bio da unidade. |
| `guia-de-uso.html` | Pedidos prontos por público (franqueadora, unidade, expansão, gráfica, vídeo), com o que sai e a seção do manual que manda. |
| `rviz.js` | Para desenhar **gráficos** no padrão: barras, ranking, linha, composição, anel, funil, fluxo, número em destaque, linha do tempo e cota. |
| `rforms.js` | Para desenhar as **formas da casa** tiradas da embalagem e do brasão: filete duplo, moldura de rótulo, selo serrilhado, curva do R, caixinhas, pérolas, arco, escudo e vapor. |
| `assets/` | Marca em SVG e PNG web (sete composições em cinco cores), `marca.json` com as medidas, favicon, avatar, **fotos públicas** da rede (origem em `fotos/LEIA.md`), formas, capas dos destaques e fontes. |
| `autocontido.py` e `exportar_pdf.py` | Para gerar a versão de arquivo único e o PDF (ambientes com terminal: Claude Code e Codex). |

**Por que isso importa para você:** a resposta sai rápida, e as regras entram sempre que o assunto é a Royal Parma, sem você colar instruções.

**Quem assina, papéis diferentes.** A skill separa a **Royal Parma** (marca-mãe, conteúdo da rede), a **Royal Parma [Cidade]** (perfil e canais de cada unidade, com a cidade sempre em texto), a **Royal Parma Franquias** (expansão, para o investidor, com o aviso da COF), o **Bruno Lima** (fundador e CEO, história e bastidor) e os **produtos da casa** (o Molho de Tomate artesanal, com rotulagem da ANVISA). Diga quem assina a peça; se você não disser, ela pergunta.

---

## 8. Como pedir: o pedido que dá certo

Um bom pedido tem quatro partes:

| Parte | Exemplos |
|---|---|
| **A peça** | post, carrossel, story, capa de reels, iFood, cardápio digital, WhatsApp, cupom, caixa, lacre, pote de molho, cardápio impresso, flyer, fachada, página de franquia, apresentação, e-mail |
| **Quem assina** | Royal Parma (rede) · Royal Parma [Cidade] · Royal Parma Franquias · Bruno Lima |
| **O tema e o objetivo** | "mostrar como a parmegiana chega", "cupom de quarta com a regra inteira", "chamar para consultar disponibilidade na cidade" |
| **Ler ou apresentar** | se vai ser **lido**, a skill faz documento; se vai ser **projetado**, faz apresentação |

**Exemplos prontos para copiar:**

- "Faz um carrossel de 5 lâminas da Royal Parma Bauru sobre como a parmegiana chega: marmita, acompanhamentos, caixa e lacre. Me manda as lâminas e a legenda."
- "Monta o story do cupom de quarta da Royal Parma [Cidade] com a regra inteira."
- "Monta a capa e as descrições do iFood da Royal Parma [Cidade]."
- "Faz o story fixo dos canais oficiais da Royal Parma [Cidade], com o alerta contra perfil falso e cupom falso."
- "Cria a apresentação ao investidor da Royal Parma em 10 slides, com os números como [conforme COF]."
- "Faz 3 anúncios de expansão da Royal Parma para o Instagram, 1080 × 1350, chamando para consultar disponibilidade na cidade, sem promessa de retorno."
- "Faz o cardápio impresso A5 em kraft da Royal Parma [Cidade]."
- "Faz o cartão de agradecimento kraft 10 × 15 cm da Royal Parma [Cidade], com o cupom da próxima compra no verso."

Mais de 20 pedidos por público estão no [guia de uso](https://rafaelnasch.github.io/branding-royal-parma/guia-de-uso.html).

**Dicas:**
- A skill já sabe a medida de cada formato (post 1080 × 1350, story 1080 × 1920, A5, cartão 10 × 15 cm etc.). Só diga a medida se for diferente.
- Se faltar dado, ela **não inventa**: endereço, telefone, preço, datas, CNPJ e números da COF saem entre colchetes para você preencher.
- Para ajustar, peça em cima do que veio: "troca o título da lâmina 3", "deixa o fundo kraft", "encurta o texto".

---

## 9. O que você recebe e como finalizar

| Ambiente | O que chega | Como finalizar |
|---|---|---|
| **claude.ai** | Um artefato HTML de arquivo único, que você vê na tela e pode baixar | Para imagem: abra o HTML baixado no navegador e tire print da peça. Para PDF: veja abaixo. |
| **Claude Code / Codex** | Arquivos HTML (e PNG ou PDF, se você pedir) gravados na sua pasta | PDF direto: `python3 exportar_pdf.py <arquivo.html>`. Para mandar a alguém: `python3 autocontido.py <arquivo.html>` cria a versão de arquivo único em `dist/`. |

**PDF pelo Chrome (qualquer ambiente):**
1. Abra o HTML no Chrome e espere uns 3 segundos.
2. `Cmd+P` (Mac) ou `Ctrl+P` (Windows) > **Salvar como PDF**.
3. Em **Mais configurações**, ligue **Gráficos de segundo plano**. Sem isso o fundo verde some.
4. Documento: retrato, margens padrão. Apresentação: **Paisagem**, margens **Nenhuma**.

**Antes de publicar qualquer peça**, rode o checklist da seção "Checklist de aprovação de peça" do `SKILL.md`. Toda peça nova de rede e todo modelo passam pela **franqueadora**; a unidade confere os dados locais; peça de franquia passa também pela expansão e pelo jurídico.

---

## 10. As regras que a skill aplica sozinha

**As cinco leis da casa**
1. **O verde é a casa; o caramelo é o tempero.** Verde Royal e Papel são os campos; o Kraft é o campo do pedido. O caramelo marca uma informação por peça, no máximo 10% da área, e nunca é texto no claro (lá entra o canela). Sem dourado metálico, sem degradê.
2. **Uma palavra de molho por título.** Uma palavra ou expressão curta, em itálico serifado, tempera o título. Se falta espaço, corta-se texto, nunca margem.
3. **O que a peça mostra é o que chega.** Só foto real do prato da Royal, na porção, na embalagem e no acompanhamento que a unidade entrega. Nada de banco de imagem nem comida gerada ou alterada por IA.
4. **Toda promessa tem prova e condição.** Superlativo, número da rede, desconto, prazo, investimento e retorno só com fonte, data e condição. "A melhor" sai. Número ao investidor é o da Circular de Oferta de Franquia (COF) vigente.
5. **Uma rede, uma marca.** A cidade entra em texto, nunca como logotipo, cor, fonte ou bio com promessa própria.

**Publicidade de comida e de franquia**
- Nada de "a melhor parmegiana do Brasil", "mais barato que no iFood" sem condição, "imperdível", "garantido", "renda garantida", "lucro certo" ou "fature R$ X por mês".
- **Promoção:** desconto e cupom com regra escrita (válido de, até, onde, limite, não cumulativo). Sorteio, vale-brinde, concurso e "os primeiros N ganham" exigem autorização da Secretaria de Prêmios e Apostas.
- **Preço:** sempre com condição (unidade, canal, data). Comparação entre canais só com o mesmo prato, o preço total com taxas, a data e a unidade.
- **Franquia:** investimento, retorno e faturamento só iguais à COF vigente, com o aviso ao investidor ("Valores estimados. Podem variar conforme praça, operação e execução.").
- **Pote de molho:** rotulagem completa da ANVISA e "contém glúten" ou "não contém glúten" também na divulgação.
- **LGPD:** lista de WhatsApp e cupom por cadastro só com consentimento; foto de cliente e de funcionário só com autorização escrita.
- Chamadas da casa: "Peça pelo cardápio digital" · "Chama no WhatsApp da unidade" · "Marca quem vai dividir com você" · "Consultar disponibilidade na minha cidade".

**A marca:** o logotipo nunca é redesenhado, redigitado, girado, recolorido fora das versões, esticado ou com sombra, brilho ou dourado. É sempre um arquivo de `assets/`. Fundo verde pede a versão oficial (ROYAL creme, PARMA caramelo); fundo claro, a clara; kraft, a verde de uma cor; foto escura, a creme. Abaixo de 320 px de largura entra a reduzida; em espaço pequeno, a linha ou só o brasão. Os arquivos são uma **reconstrução vetorial** feita a partir dos arquivos publicados pela rede e serão trocados, com o mesmo nome, quando o arquivo original do designer chegar.

O detalhe completo está no `SKILL.md` e no [brand book](https://rafaelnasch.github.io/branding-royal-parma/) (seção 08 para as leis e fontes). Este guia não substitui orientação jurídica.

---

## 11. Atualizar, compartilhar com a equipe e remover

**Atualizar**
- **claude.ai e ChatGPT:** baixe o [ZIP mais recente](https://github.com/rafaelnasch/branding-royal-parma/releases/latest/download/branding-royal-parma.zip), apague a skill antiga (passos abaixo) e envie a nova.
- **Claude Code:** `cd ~/.claude/skills/branding-royal-parma && git pull`
- **Codex:** `cd ~/.agents/skills/branding-royal-parma && git pull`

As novidades de cada versão ficam na página de [Releases](https://github.com/rafaelnasch/branding-royal-parma/releases).

**Compartilhar com a equipe (claude.ai)**
- Em **Personalizar > Skills**, clique em **...** ao lado da skill > **Compartilhar** e informe nome ou e-mail. Quem recebe pode ligar e usar a skill, mas não pode editar.
- Em conta Team ou Enterprise, **Publicar na organização** coloca a skill na biblioteca de todo o time.

**Desligar ou remover**
- **claude.ai:** em **Personalizar > Skills**, desligue a chave. Para apagar: abra a skill, desligue, clique em **...** > **Excluir**.
- **Claude Code:** `rm -rf ~/.claude/skills/branding-royal-parma`
- **Codex:** `rm -rf ~/.agents/skills/branding-royal-parma`

---

## 12. Problemas comuns

| O que aconteceu | Causa provável | O que fazer |
|---|---|---|
| O envio do ZIP dá erro de **tamanho** | Você baixou pelo botão "Code > Download ZIP" (repositório inteiro) | Baixe o [branding-royal-parma.zip](https://github.com/rafaelnasch/branding-royal-parma/releases/latest/download/branding-royal-parma.zip) do Releases, de cerca de 7 MB |
| Erro de **nome da pasta** ou falta de `SKILL.md` | ZIP descompactado e compactado de novo, ou pasta renomeada | Envie o ZIP original, sem mexer. A pasta de dentro tem de se chamar `branding-royal-parma` |
| A opção **Skills** não aparece no claude.ai | Execução de código desligada, ou bloqueio da organização | Ligue em Configurações > Capacidades; em Team/Enterprise, fale com o administrador |
| O resultado sai **genérico** | A skill está desligada, ou a conversa foi aberta antes da instalação | Confira a chave em Personalizar > Skills, abra uma **conversa nova** e cite "padrão da Royal Parma" no pedido |
| A marca aparece como **"ROYAL PARMA" digitado** ou com cor errada | A skill não carregou | Mesma solução da linha acima. A marca certa vem sempre de arquivo |
| O **PDF** saiu com fundo branco | "Gráficos de segundo plano" desligado | Ligue a opção em Mais configurações na hora de imprimir |
| No Codex a skill **não aparece** em `/skills` | Pasta errada para a sua versão | Clone também em `~/.codex/skills/branding-royal-parma` e reinicie o Codex |
| Apareceu colchete na peça (`[Cidade]`, `[conforme COF]`, `[número oficial]`) | Dado ainda não confirmado pela franqueadora (de propósito) | Preencha com o dado real antes de publicar |
| Precisa da PNG grande para o Canva ou a gráfica | O ZIP leva só a PNG web | Baixe a PNG cheia (2400 px) pelo [repositório](https://github.com/rafaelnasch/branding-royal-parma/tree/main/assets) ou pelo brand book |

---

## 13. O que vem no repositório

| Arquivo | O que é |
|---|---|
| `SKILL.md` | As regras travadas. É o que o assistente lê quando a skill entra. |
| `brand-book.html` | O manual vivo em 24 seções e o modelo de **documento**. |
| `deck-template.html` | O modelo de **apresentação** (onze tipos de slide, 1440 × 900). |
| `lockup.html` | Marca em arquivo e em data URI, brasão, selo, blocos da unidade e da franqueadora, canais oficiais, avisos, preço com condição, item de cardápio, assinatura de e-mail e bio da unidade. |
| `guia-de-uso.html` | Pedidos prontos por público, com o que sai e a seção do manual que manda. |
| `rviz.js` · `rforms.js` | Motores de gráfico e de formas da casa. |
| `autocontido.py` | Gera versões de arquivo único (`dist/`) de qualquer HTML feito com a skill. |
| `exportar_pdf.py` | Exporta documento ou apresentação em PDF com o Playwright. |
| `agents/openai.yaml` | Nome, descrição, ícone e pedido de exemplo no Codex e no ChatGPT. O Claude ignora este arquivo. |
| `dist/` | Versões de arquivo único, prontas para mandar: brand book, apresentação e assinaturas. **Não vai no ZIP.** |
| `assets/` | Marca (horizontal, reduzida, vertical, linha, brasão, monograma e selo, em oficial, claro, verde, creme e caramelo; SVG, PNG cheia e PNG web), avatar, favicon, imagem de compartilhamento, `marca.json`, fotos públicas, formas, capas dos destaques, fontes e os arquivos publicados que serviram de base. |
| `tools/empacotar_skill.py` | Gera o ZIP de instalação dentro dos limites (ver a seção 15). |

**O que fica fora do ZIP** e continua no [endereço público do manual](https://rafaelnasch.github.io/branding-royal-parma/): os arquivos publicados que serviram de base (`assets/referencia-original/`), as PNG cheias da marca (2400 px, para o Canva e a gráfica), as cópias de fonte com nome de endereço (`assets/fontes/font?kit=...`, que nenhum arquivo usa; as mesmas fontes estão nos `.woff2`) e o `dist/`. Dentro do pacote, o manual aponta para esses endereços.

---

## 14. Pendências com a Royal Parma

Enquanto cada uma não se resolve, a skill entrega só a versão permitida (dado em colchete, superlativo fora, número com "[conforme COF]") e avisa em uma linha qual pendência trava o resto:

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

Também em aberto: o significado das caixinhas da caixa (1 a 4, M, F, T, A), a regularização sanitária e o "artesanal" do molho, e a palavra ROYALPARMA girada no saco (vai deitada no próximo lote). O detalhe de cada uma está na seção 23 do brand book.

---

## 15. Para quem mantém a skill

**Gerar o ZIP de uma versão nova**

```bash
python3 tools/empacotar_skill.py
```

O script grava `dist-skill/branding-royal-parma.zip` (fora do git) e **falha** se qualquer limite abaixo estourar. Depois, valide com o validador oficial da especificação e publique:

```bash
# validador oficial (precisa do uv; clone https://github.com/agentskills/agentskills antes)
uvx --from <pasta-do-clone>/skills-ref skills-ref validate .
gh release create vX.Y dist-skill/branding-royal-parma.zip -t "branding-royal-parma vX.Y" --latest
```

**Limites atendidos (conferidos em 07/10/2026)**

| Limite | Regra | Esta skill |
|---|---|---|
| `name` | minúsculas, números e hífen, até 64, igual ao nome da pasta | `branding-royal-parma` (20) |
| `description` | até 1.024 caracteres, sem `<` e `>`; caso de uso e gatilhos | 1.018 caracteres |
| Campos do frontmatter | só os da especificação | `name` e `description` |
| `SKILL.md` | menos de 500 linhas | 313 linhas |
| Links relativos | todo link do `SKILL.md` aponta para arquivo do pacote | 0 quebrados |
| ZIP | até 30 MB (meta abaixo de 10 MB) | 6,53 MB |
| Descompactado | até 25 MB | 9,13 MB |
| Arquivos | até 400; nenhum acima de 10 MB; nomes só com letras, números, ponto, hífen e sublinhado | 157; o maior é o `brand-book.html` (1,32 MB) |
| Estrutura | uma pasta `branding-royal-parma/` no topo, um só `SKILL.md` | sim |
| Validador oficial | `skills-ref validate` | "Valid skill: branding-royal-parma" no pacote e no repositório |

Os limites de nome, descrição, campos e linhas são os da [especificação Agent Skills](https://agentskills.io/specification). Os de tamanho são as travas do `tools/empacotar_skill.py`, mais rígidas que as dos apps (a ajuda do Claude não publica um número). **Regra para manter:** tudo o que é pesado e não serve para produzir peça fica fora do ZIP e é servido pelo endereço público. A `description` está a 6 caracteres do limite: ao mexer nela, rode o empacotador.

**Navegadores:** Chrome, Edge ou Safari recentes (iOS 16 ou mais novo, Chrome 105 ou mais novo).

---

Marca, brasão e logotipo são propriedade da franqueadora **Royal Parma**. Os motores `rviz.js` e `rforms.js` foram escritos para este sistema. Sistema de identidade organizado com a GrowAI. Rótulo Real v1 · setembro de 2026.

Fontes das instruções de instalação: [Usar skills no Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude) · [Build skills (OpenAI)](https://learn.chatgpt.com/docs/build-skills) · [Especificação Agent Skills](https://agentskills.io/specification).
