/* =====================================================================
   RVIZ · motor de gráficos da Royal Parma · sistema Rótulo Real v1
   SVG puro, zero dependências, JavaScript ES2015 simples, determinístico
   (sem Math.random, sem Date): mesma entrada e mesma largura geram sempre
   o mesmo desenho, na tela, no PDF e no arquivo levado ao Canva.

   COMO USAR (três formas)
     1. Declarativa, sem escrever JavaScript: o motor monta sozinho no carregamento.
        <div class="grafico-svg" data-rviz='{"tipo":"barras","titulo":"Sexta vende o dobro da terça",
             "rotulos":["Seg","Ter","Qua","Qui","Sex"],"valores":[40,31,38,47,66],"destaque":4,
             "fonte":"Pedidos da unidade, ago. 2026"}'></div>
     2. Por chamada: rviz.render(el, 'barras', { rotulos:[...], valores:[...], destaque:4 });
        ou rviz.barras('id-ou-elemento', {...}).
     3. Para o Canva: rviz.svg('barras', { ..., campo:'verde', largura:960 }) devolve o SVG
        pronto (texto, com xmlns, width e height, cores em HEX). rviz.svg(el) devolve o SVG
        de um gráfico que já está na página.

   AS CORES SAEM DO CAMPO (ou da opção campo)
     Sem opção, o motor lê as variáveis do lugar onde o gráfico está: --f-fundo, --f-titulo,
     --f-texto, --f-apoio, --f-molho e --f-linha (e, se existirem, --f-neutro e --f-serie2).
     A cor de molho marca o ÚNICO destaque: caramelo #BE7F43 no Verde, na Floresta e na Mata;
     canela #835020 no Papel e no Creme; Verde #102B22 no Kraft. O resto é neutro: creme a
     45% no escuro, Verde a 40% no claro e no Kraft. A segunda série, quando existe, é oliva
     #526243 (no escuro, oliva clareado para continuar visível). Com {campo:'verde'} (ou
     'floresta', 'mata', 'papel', 'creme', 'kraft', 'branco') usa a paleta fixa da casa.
     Dentro do SVG toda cor sai em HEX por extenso, em atributo fill/stroke.

   OPÇÕES COMUNS (em português; os nomes em inglês também valem)
     destaque    -1      índice do ÚNICO destaque (-1 = sem destaque). Marcado pela pérola.
     titulo      nenhum  título dentro do SVG, em Gloock: escreva a CONCLUSÃO, não o assunto
     rotulo      nenhum  rótulo de rótulo acima do título (caixa alta, espaçado)
     fonte       nenhum  fonte e data ("Pedidos da unidade, ago. 2026"). Sem fonte, o rodapé
                         diz "Dado ilustrativo". O rodapé sai sempre (rodape:false só quando a
                         legenda em HTML logo abaixo já traz a fonte e a data).
     data        nenhum  data, quando não vem dentro da fonte
     vrotulos    auto    valores já formatados em pt-BR ("R$ 49,90", "38 min", "64%")
     unidade     nenhum  unidade no fim da linha de base ("PEDIDOS", "%")
     campo       auto    'verde' | 'floresta' | 'mata' | 'papel' | 'creme' | 'kraft' | 'branco'
     altura      auto    altura da área do gráfico (barras 300, linha 260)
     largura     auto    largura do viewBox; padrão = largura do contêiner entre 280 e 1200
                         (1 unidade = 1 px: o rótulo sai no tamanho real no celular)
     peca        auto    dentro de uma .peca (em .mock) o motor escala o desenho para o rótulo
                         de 14 unidades valer o rótulo da peça (26 px no post de 1080)
     animar      true    entrada discreta; nunca com prefers-reduced-motion, na impressão ou
                         em navegador automatizado
     aria        título  nome acessível (<title>); desc gera a descrição (<desc>) sozinho

   TIPOS
     barras       { rotulos, valores, vrotulos, destaque, unidade, altura, valores2, series }
     barras-h     { rotulos, valores, vrotulos, destaque, empilhar }   (ranking)
     linha        { rotulos, valores, vrotulos, destaque, area, todos, altura, valores2, series }
     composicao   { segmentos:[{rotulo,valor,vrotulo}], destaque }      (partes de um todo)
     anel         { valor (0 a 100), vrotulo, rotulo, tamanho }
     funil        { etapas:[{rotulo,valor,vrotulo}], destaque, taxas }
     fluxo        { passos:[{rotulo,sub}], destaque, numeros }
     kpi          { valor, vrotulo, unidade, rotulo, sub, serie }
     linha-tempo  { eventos:[{data,rotulo,sub}], destaque }
     cota         { rotulo }                                             (medida entre dois traços)
   Funções: rviz.<tipo>(el, opts) · rviz.render(el, tipo, opts) · rviz.montar(raiz)
            rviz.redesenhar() · rviz.fmt(n, {dec, prefixo, sufixo}) · rviz.svg(el | tipo, opts)
            rviz.animar = false desliga a entrada em todos os gráficos.

   REGRAS DA CASA EMBUTIDAS
     Um destaque por gráfico, na cor de molho, marcado por uma PÉROLA (o círculo das pérolas
     da coroa); o resto é neutro. Barras de topo reto (nunca arredondado), base zero. A linha
     de base é o FILETE DUPLO da casa (dois fios de 1 px a 3 px). Zero grade, zero 3D, zero
     sombra, zero degradê, zero pizza. Números grandes e título em Gloock; rótulos, valores e
     rodapé em Source Sans 3 (no mínimo 13 px). Fonte e data sempre; sem fonte, "Dado
     ilustrativo". Cada SVG ganha um id único (rv1, rv2...), estável entre redesenhos, com
     <title> e <desc> para leitor de tela.

   O QUE O MOTOR NÃO DESENHA NA COMUNICAÇÃO PÚBLICA DA ROYAL PARMA
     Superlativo sem fonte ("a maior rede"), faturamento, retorno ou lucro ao investidor fora
     da Circular de Oferta de Franquia (COF) vigente, comparação de preço sem data e canal,
     dado de cliente. Número ao investidor sempre com "pode variar conforme praça, operação
     e execução" na peça.
   ===================================================================== */
const rviz = (() => {
  'use strict';
  const registro = new Set();
  const temDoc = typeof document !== 'undefined';
  let seq = 0, seqX = 0;

  /* ---------- paletas da casa (HEX por extenso) ---------- */
  const CREME = '#E2DDC8', VERDE = '#102B22', OLIVA = '#526243';
  const PALETAS = {
    verde: { fundo: '#102B22', titulo: '#E2DDC8', texto: '#E2DDC8', apoio: '#ABAD9E', molho: '#BE7F43', molhoTxt: '#DDA867', fio: '#2C4A3D' },
    papel: { fundo: '#FAF8F2', titulo: '#102B22', texto: '#38433C', apoio: '#535E56', molho: '#835020', molhoTxt: '#835020', fio: '#DDD6C1' },
    kraft: { fundo: '#C9A67E', titulo: '#102B22', texto: '#102B22', apoio: '#102B22', molho: '#102B22', molhoTxt: '#102B22', fio: '#6D6B4F' }
  };
  PALETAS.floresta = Object.assign({}, PALETAS.verde, { fundo: '#0B1D17' });
  PALETAS.mata = Object.assign({}, PALETAS.verde, { fundo: '#173A2D', apoio: '#B5B6A6' });
  PALETAS.creme = Object.assign({}, PALETAS.papel, { fundo: '#E2DDC8', apoio: '#38433C', fio: '#C9C2AA' });
  PALETAS.branco = Object.assign({}, PALETAS.papel, { fundo: '#FFFFFF' });
  const VARS = { fundo: '--f-fundo', titulo: '--f-titulo', texto: '--f-texto', apoio: '--f-apoio', molho: '--f-molho',
    fio: '--f-linha', neutro: '--f-neutro', serie2: '--f-serie2' };

  /* qualquer cor (#abc, #aabbcc, rgb(), rgba()) vira #AABBCC; o resto é ignorado */
  function hex(v) {
    v = String(v || '').trim();
    let m;
    if (/^#[0-9a-f]{3}$/i.test(v)) return ('#' + v[1] + v[1] + v[2] + v[2] + v[3] + v[3]).toUpperCase();
    if (/^#[0-9a-f]{6}$/i.test(v)) return v.toUpperCase();
    if (/^#[0-9a-f]{8}$/i.test(v)) return v.slice(0, 7).toUpperCase();
    m = v.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+%?))?/i);
    if (m) {
      if (m[4] != null && parseFloat(m[4]) === 0) return null;
      return '#' + [m[1], m[2], m[3]].map(n => ('0' + Math.max(0, Math.min(255, Math.round(+n))).toString(16)).slice(-2)).join('').toUpperCase();
    }
    return null;
  }
  function mistura(a, b, t) {
    const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
    const x = p(a), y = p(b);
    return '#' + x.map((v, i) => ('0' + Math.round(v + (y[i] - v) * t).toString(16)).slice(-2)).join('').toUpperCase();
  }
  function luz(h) {
    const v = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(x => (x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)));
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  }
  function contraste(a, b) {
    const la = luz(a), lb = luz(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }
  /* completa a paleta: neutro, segunda série, linha de base e cor de texto do molho */
  function completa(c, lidos) {
    lidos = lidos || {};
    c.escuro = luz(c.fundo) < 0.12;
    c.kraft = !c.escuro && luz(c.fundo) < 0.5;
    if (!lidos.neutro) c.neutro = c.escuro ? mistura(c.fundo, CREME, 0.45) : mistura(c.fundo, VERDE, 0.40);
    if (!lidos.serie2) c.serie2 = c.escuro ? mistura(OLIVA, CREME, 0.42) : (c.kraft ? mistura(OLIVA, VERDE, 0.35) : OLIVA);
    c.base = c.escuro ? mistura(c.fundo, CREME, 0.55) : mistura(c.fundo, VERDE, 0.6);
    /* o molho como TEXTO pequeno: no escuro, mel quando o caramelo não fecha 4,5:1 */
    if (!c.molhoTxt || contraste(c.molhoTxt, c.fundo) < 4.5) c.molhoTxt = contraste(c.molho, c.fundo) >= 4.5 ? c.molho : (c.escuro ? '#DDA867' : c.titulo);
    /* o apoio precisa de 4,5:1 (texto de rótulo): se não fechar, vai para o texto */
    if (contraste(c.apoio, c.fundo) < 4.5) c.apoio = c.texto;
    return c;
  }
  /* a cor que está de fato atrás do gráfico (campo, painel, peça) */
  function fundoReal(el) {
    try {
      for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
        const bg = getComputedStyle(n).backgroundColor, m = bg && bg.match(/rgba?\(([^)]*)\)/);
        if (!m) continue;
        const partes = m[1].split(/[\s,/]+/).filter(Boolean);
        if (partes.length < 4 || parseFloat(partes[3]) > 0.5) return hex(bg);
      }
    } catch (err) { /* sem estilo calculado */ }
    return null;
  }
  function cores(el, o) {
    if (o && o.campo && PALETAS[o.campo]) return completa(Object.assign({}, PALETAS[o.campo]));
    const c = Object.assign({}, PALETAS.papel), lidos = {};
    delete c.molhoTxt;
    try {
      const cs = getComputedStyle(el);
      Object.keys(VARS).forEach(k => { const h = hex(cs.getPropertyValue(VARS[k])); if (h) { c[k] = h; lidos[k] = 1; } });
    } catch (err) { /* sem estilo calculado: fica o papel */ }
    const real = fundoReal(el);
    if (real) c.fundo = real;
    /* sem variáveis do campo: deduz a paleta pelo fundo real */
    if (!lidos.titulo && real) {
      const achada = Object.keys(PALETAS).filter(k => PALETAS[k].fundo === real)[0];
      if (achada) return completa(Object.assign({}, PALETAS[achada]));
      if (luz(real) < 0.12) return completa(Object.assign({}, PALETAS.verde, { fundo: real }));
    }
    if (o && o.cor) c.molho = hex(o.cor) || c.molho;
    return completa(c, lidos);
  }

  /* ---------- tipografia no SVG ---------- */
  const NUM = "font-family:'Gloock','DM Serif Display',Georgia,'Times New Roman',serif;font-variant-numeric:lining-nums";
  const LAB = "font-family:'Source Sans 3','Source Sans Pro',Arial,sans-serif;font-variant-numeric:lining-nums tabular-nums";
  const fonte = (f, peso, tam, ls) => `${f};font-weight:${peso};font-size:${tam}px` + (ls ? `;letter-spacing:${ls}px` : '');
  const r2 = v => Math.round(v * 100) / 100;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const alvo = e => (typeof e === 'string' ? (temDoc ? document.getElementById(e) : null) : e);
  const dois = n => (n < 10 ? '0' : '') + n;
  const FS = 14, FP = 13;   /* rótulo e rodapé (Source Sans 3): nunca abaixo de 13 */
  function T(x, y, conteudo, f, peso, tam, cor, anc, ls, extra) {
    return `<text x="${r2(x)}" y="${r2(y)}"${anc && anc !== 'start' ? ` text-anchor="${anc}"` : ''} fill="${cor}" style="${fonte(f, peso, tam, ls)}"${extra || ''}>${esc(conteudo)}</text>`;
  }
  const R = (x, y, w, h, cor, extra) => `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(Math.max(0, w))}" height="${r2(Math.max(0, h))}" fill="${cor}"${extra || ''}/>`;
  const L = (x1, y1, x2, y2, cor, w, extra) => `<line x1="${r2(x1)}" y1="${r2(y1)}" x2="${r2(x2)}" y2="${r2(y2)}" stroke="${cor}" stroke-width="${w || 1}"${extra || ''}/>`;
  /* a PÉROLA da casa (as pérolas da coroa): círculo cheio */
  const P = (cx, cy, r, fill, extra) => `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(r)}" fill="${fill}"${extra || ''}/>`;
  /* o FILETE DUPLO: dois fios de 1 px separados por 3 px (y = o fio de cima) */
  const FH = (x1, x2, y, cor) => L(x1, y + 0.5, x2, y + 0.5, cor, 1) + L(x1, y + 4.5, x2, y + 4.5, cor, 1);
  const FV = (x, y1, y2, cor) => L(x - 0.5, y1, x - 0.5, y2, cor, 1) + L(x - 4.5, y1, x - 4.5, y2, cor, 1);

  /* ---------- medição de texto (SVG oculto; sem medida, estima) ---------- */
  const cache = new Map();
  let medidor = null;
  function mede(txt, f, peso, tam, ls) {
    txt = String(txt);
    const k = f.length + '|' + peso + '|' + tam + '|' + (ls || 0) + '|' + txt;
    if (cache.has(k)) return cache.get(k);
    let w = 0;
    try {
      if (temDoc && document.body) {
        if (!medidor || !medidor.isConnected) {
          const NS = 'http://www.w3.org/2000/svg';
          medidor = document.createElementNS(NS, 'svg');
          medidor.setAttribute('aria-hidden', 'true');
          medidor.setAttribute('width', '1'); medidor.setAttribute('height', '1');
          medidor.style.cssText = 'position:absolute;left:0;top:0;width:1px;height:1px;overflow:hidden;visibility:hidden;pointer-events:none';
          medidor.appendChild(document.createElementNS(NS, 'text'));
          document.body.appendChild(medidor);
        }
        const t = medidor.firstChild;
        t.setAttribute('style', fonte(f, peso, tam, ls));
        t.textContent = txt;
        w = t.getComputedTextLength();
      }
    } catch (err) { w = 0; }
    if (!w) w = txt.length * (f === NUM ? 0.62 : 0.5) * tam + (ls || 0) * txt.length;
    cache.set(k, w);
    return w;
  }
  function quebra(txt, f, peso, tam, maxW, maxL, ls) {
    const pal = String(txt).split(/\s+/).filter(Boolean);
    if (!pal.length) return [''];
    const linhas = [];
    let atual = pal[0];
    for (let i = 1; i < pal.length; i++) {
      const tenta = atual + ' ' + pal[i];
      if (mede(tenta, f, peso, tam, ls) <= maxW) atual = tenta;
      else { linhas.push(atual); atual = pal[i]; }
    }
    linhas.push(atual);
    if (linhas.length > maxL) {
      const cab = linhas.slice(0, maxL - 1);
      cab.push(linhas.slice(maxL - 1).join(' '));
      return cab;
    }
    return linhas;
  }
  const maiorPalavra = (textos, f, peso, tam, ls) => Math.max(0, ...textos.map(t => Math.max(0, ...String(t || '').split(/\s+/).map(w => mede(w, f, peso, tam, ls)))));

  /* ---------- números em pt-BR ---------- */
  function fmt(n, o) {
    o = o || {};
    const dec = o.dec == null ? 0 : o.dec;
    const neg = n < 0;
    const partes = Math.abs(Number(n) || 0).toFixed(dec).split('.');
    const inteiro = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (neg ? '-' : '') + (o.prefixo || '') + inteiro + (dec > 0 ? ',' + partes[1] : '') + (o.sufixo || '');
  }
  function auto(v) {
    if (typeof v !== 'number' || !isFinite(v)) return String(v);
    if (Number.isInteger(v)) return fmt(v);
    return fmt(v, { dec: Math.abs(v * 10 - Math.round(v * 10)) < 1e-9 ? 1 : 2 });
  }
  const rotulos = (vals, vl) => vals.map((v, i) => (vl && vl[i] != null ? String(vl[i]) : auto(v)));

  /* ---------- largura do viewBox ---------- */
  function emPeca(el) {
    try {
      const peca = el.closest && el.closest('.peca');
      const mock = peca && (peca.closest('.mock') || peca);
      if (!peca) return null;
      const cs = getComputedStyle(mock);
      const base = parseFloat(cs.getPropertyValue('--base')) || 1080;
      const rot = parseFloat(cs.getPropertyValue('--pc-rotulo')) || 26;
      const mw = mock.getBoundingClientRect().width, w = el.clientWidth;
      if (!(mw > 0 && w > 0)) return null;
      return { px: w * base / mw, rot };
    } catch (err) { return null; }
  }
  function largura(el, o) {
    if (o.w) return o.w;
    if (o.peca !== false) {
      const p = +o.peca ? { px: +o.peca, rot: 26 } : emPeca(el);
      if (p) return Math.round(Math.max(280, p.px * FS / p.rot));
    }
    let cw = 0;
    try {
      const cs = getComputedStyle(el);
      cw = el.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0);
    } catch (err) { cw = 0; }
    if (!cw || cw <= 0) return 640;
    return Math.round(Math.max(280, Math.min(1200, cw)));
  }

  /* ---------- entrada discreta (respeita prefers-reduced-motion) ---------- */
  const agora = () => (typeof performance !== 'undefined' && performance.now ? performance.now() : 0);
  function semMovimento() {
    try {
      if (typeof navigator !== 'undefined' && navigator.webdriver) return true;
      return !window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('print').matches;
    } catch (err) { return true; }
  }
  let ioAnima = null;
  function animaQuando(el, o) {
    if (o.animar === false || api.animar === false || !temDoc || semMovimento()) return;
    if (typeof IntersectionObserver === 'undefined' || !Element.prototype.animate) return;
    if (el.__rvT != null) { const dt = agora() - el.__rvT; if (dt < 1100) anima(el, dt); return; }
    if (!ioAnima) ioAnima = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return;
      ioAnima.unobserve(en.target);
      en.target.__rvT = agora();
      anima(en.target, 0);
    }), { rootMargin: '0px 0px -6% 0px', threshold: 0 });
    if (!el.__rvObs) { el.__rvObs = 1; ioAnima.observe(el); }
  }
  function anima(el, desde) {
    const svg = el.firstElementChild;
    if (!svg) return;
    let i = 0;
    Array.prototype.forEach.call(svg.querySelectorAll('[data-a]'), n => {
      const a = n.getAttribute('data-a'), atraso = Math.min(i++, 10) * 50;
      const ops = { duration: 720, delay: atraso, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' };
      let k = null;
      try {
        if (a === 'y' || a === 'x' || a === 'xc') {
          n.style.transformBox = 'fill-box';
          n.style.transformOrigin = a === 'y' ? '50% 100%' : (a === 'x' ? '0% 50%' : '50% 50%');
          k = n.animate(a === 'y' ? [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }] : [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], ops);
        } else if (a === 'd') {
          const tam = n.getTotalLength ? n.getTotalLength() : 0;
          if (tam) k = n.animate([{ strokeDasharray: tam + ' ' + tam, strokeDashoffset: tam }, { strokeDasharray: tam + ' ' + tam, strokeDashoffset: 0 }], Object.assign({}, ops, { duration: 1000 }));
        } else if (a === 'r') {
          const v = n.getAttribute('data-v'), tot = n.getAttribute('data-c');
          k = n.animate([{ strokeDasharray: '0 ' + tot }, { strokeDasharray: v + ' ' + tot }], Object.assign({}, ops, { duration: 1000 }));
        } else if (a === 'p') {
          n.style.transformBox = 'fill-box'; n.style.transformOrigin = '50% 50%';
          k = n.animate([{ transform: 'scale(0)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], Object.assign({}, ops, { delay: atraso + 420, duration: 420 }));
        } else {
          k = n.animate([{ opacity: 0 }, { opacity: 1 }], ops);
        }
        if (k && desde) k.currentTime = desde;
      } catch (err) { /* sem suporte: fica o desenho final */ }
    });
  }
  function terminaAnimacoes() {
    registro.forEach(el => {
      try { const s = el.firstElementChild; if (s && s.getAnimations) s.getAnimations({ subtree: true }).forEach(a => a.finish()); } catch (err) { /* ok */ }
    });
  }

  /* ---------- cabeça (rótulo + título), rodapé (fonte e data) e montagem ---------- */
  function registra(el, tipo, o) { el.__rviz = { tipo, opts: o }; registro.add(el); observa(el); }
  function cabeca(c, W, o) {
    let s = '', y = 0;
    if (o.rotulo_topo) {
      const ls = quebra(String(o.rotulo_topo).toUpperCase(), LAB, 600, 13, W, 2, 2.3);
      ls.forEach(ln => { y += 17; s += T(0, y - 3, ln, LAB, 600, 13, c.molhoTxt, 'start', 2.3); });
      y += 8;
    }
    if (o.titulo) {
      const tam = W < 420 ? 22 : (W < 720 ? 26 : 30);
      const ls = quebra(o.titulo, NUM, 400, tam, W, 4);
      ls.forEach(ln => { y += tam * 1.12; s += T(0, y - tam * 0.22, ln, NUM, 400, tam, c.titulo, 'start'); });
      y += 18;
    }
    return { s, h: y };
  }
  function rodape(c, W, y0, o) {
    if (o.rodape === false) return { s: '', h: 0 };
    let txt = o.fonte ? 'Fonte: ' + o.fonte : 'Dado ilustrativo';
    if (o.data) txt += ', ' + o.data;
    const ls = quebra(txt, LAB, 400, FP, W, 3);
    let s = '';
    ls.forEach((ln, k) => { s += T(0, y0 + 30 + k * 18, ln, LAB, 400, FP, c.apoio, 'start'); });
    return { s, h: 22 + ls.length * 18 };
  }
  function descricao(o) {
    if (o.desc) return String(o.desc);
    const par = (l, v) => l.map((x, i) => x + ': ' + v[i]).join('; ');
    try {
      if (o.labels && o.values) return par(o.labels, rotulos(o.values.map(Number), o.vlabels)) + '.';
      if (o.segments) return o.segments.map(t => (t.label || '') + ': ' + (t.vlabel != null ? t.vlabel : auto(+t.value || 0))).join('; ') + '.';
      if (o.stages) return o.stages.map(t => (t.label || '') + ': ' + (t.vlabel != null ? t.vlabel : auto(+t.value || 0))).join('; ') + '.';
      if (o.steps) return o.steps.map((t, i) => (i + 1) + '. ' + (t.label || '')).join('; ') + '.';
      if (o.eventos || o.events) return (o.eventos || o.events).map(t => (t.data || '') + ': ' + (t.label || '')).join('; ') + '.';
      if (o.value != null) return (o.vlabel != null ? o.vlabel : auto(+o.value)) + (o.label ? ' ' + o.label : '') + '.';
    } catch (err) { /* sem descrição */ }
    return '';
  }
  function monta(el, W, H, miolo, o, c, tipo, semRodape) {
    if (!el.__rvId) el.__rvId = 'rv' + (++seq);
    const id = el.__rvId;
    const cab = cabeca(c, W, o);
    const rp = semRodape ? { s: '', h: 0 } : rodape(c, W, cab.h + H, o);
    const nome = o.aria || o.titulo || 'Gráfico';
    const ds = descricao(o) + (semRodape ? '' : (o.fonte ? ' Fonte: ' + o.fonte + '.' : ' Dado ilustrativo.'));
    const corpo = cab.h ? `<g transform="translate(0 ${r2(cab.h)})">${miolo}</g>` : miolo;
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" id="${id}" data-rviz-tipo="${tipo}" viewBox="0 0 ${r2(W)} ${r2(cab.h + H + rp.h)}" role="img" aria-labelledby="${id}-t ${id}-d" focusable="false" style="width:100%;height:auto;display:block;overflow:visible"><title id="${id}-t">${esc(nome)}</title><desc id="${id}-d">${esc(ds)}</desc>${cab.s}${corpo}${rp.s}</svg>`;
    animaQuando(el, o);
  }
  const hiDe = o => (o.highlight == null ? -1 : +o.highlight);
  const inicia = (e, tipo, o) => { const el = alvo(e); if (!el) return null; registra(el, tipo, o); return el; };
  /* legenda de séries (só quando há segunda série) */
  function legenda(c, W, nomes, coresS) {
    let s = '', x = 0;
    nomes.forEach((n, i) => {
      const w = mede(n, LAB, 500, FS);
      s += R(x, 4, 12, 12, coresS[i]) + T(x + 18, 15, n, LAB, 500, FS, c.texto, 'start');
      x += 18 + w + 22;
    });
    return { s, h: 30 };
  }

  /* =========================================================== BARRAS */
  function bars(e, o) {
    o = o || {};
    const el = inicia(e, 'bars', o); if (!el) return;
    const c = cores(el, o), W = largura(el, o), H0 = o.h || 300;
    const vals = (o.values || []).map(v => +v || 0), labs = (o.labels || []).map(l => String(l == null ? '' : l));
    const v2 = (o.values2 || o.valores2 || []).map(v => +v || 0), dupla = v2.length > 0;
    const vls = rotulos(vals, o.vlabels), hi = hiDe(o), n = Math.max(1, vals.length);
    const uTxt = o.unit ? String(o.unit).toUpperCase() : '';
    const cw = W / n;
    let fs = cw < 56 ? 13 : FS;
    if (fs === FS && maiorPalavra(labs, LAB, 500, FS) > cw - 8) fs = 13;
    if (!dupla && o.deitar !== false && maiorPalavra(labs, LAB, 600, 13) > cw - 4) { hbars(el, o, true); return; }
    const lg = dupla ? legenda(c, W, o.series || ['Série 1', 'Série 2'], [c.neutro, c.serie2]) : { s: '', h: 0 };
    const H = H0 + lg.h;
    const lh = fs + 4;
    const linhas = labs.map((l, i) => quebra(l, LAB, i === hi ? 600 : 500, fs, cw - 6, 2));
    const nL = Math.max(1, ...linhas.map(l => l.length));
    const pb = 26 + (nL - 1) * lh + 8 + (uTxt ? 18 : 0);
    const pt = lg.h + (hi >= 0 ? 62 : 30);
    const base = H - pb, ph = base - pt;
    const max = Math.max(...vals, ...v2, 0) || 1;
    const bw = dupla ? Math.min(26, cw * 0.32) : Math.min(44, cw * 0.5);
    const comuns = vls.filter((t, i) => i !== hi);
    const mostraV = !dupla && Math.max(0, ...comuns.map(t => mede(t, LAB, 500, FS))) <= cw - 4;
    const cabe = (w, cx) => Math.max(w / 2 + 1, Math.min(W - w / 2 - 1, cx));
    let s = lg.s;
    vals.forEach((v, i) => {
      const cx = i * cw + cw / 2, ehHi = i === hi;
      const bh = Math.max(2, (Math.max(0, v) / max) * ph);
      const x1 = dupla ? cx - bw - 2 : cx - bw / 2;
      s += R(x1, base - bh, bw, bh, ehHi ? c.molho : c.neutro, ' data-a="y"');
      if (dupla) {
        const bh2 = Math.max(2, (Math.max(0, v2[i] || 0) / max) * ph);
        s += R(cx + 2, base - bh2, bw, bh2, c.serie2, ' data-a="y"');
      }
      const topo = base - bh;
      if (ehHi) {
        const px = dupla ? x1 + bw / 2 : cx;
        s += P(px, topo - 11, 5, c.molho, ' data-a="p"');
        s += T(cabe(mede(vls[i], NUM, 400, 32), px), topo - 25, vls[i], NUM, 400, 32, c.titulo, 'middle', 0, ' data-a="f"');
      } else if (mostraV) s += T(cabe(mede(vls[i], LAB, 500, FS), cx), topo - 9, vls[i], LAB, 500, FS, c.apoio, 'middle');
      linhas[i].forEach((ln, k) => {
        const tw = mede(ln, LAB, ehHi ? 600 : 500, fs);
        s += T(cabe(tw, cx), base + 26 + k * lh, ln, LAB, ehHi ? 600 : 500, fs, ehHi ? c.titulo : c.apoio, 'middle');
      });
    });
    s += FH(0, W, base, c.base);
    if (uTxt) s += T(W, H - 4, uTxt, LAB, 600, 13, c.apoio, 'end', 2.3);
    monta(el, W, H, s, o, c, 'barras');
  }

  /* =========================================================== BARRAS HORIZONTAIS (ranking) */
  function hbars(e, o, interno) {
    o = o || {};
    const el = interno ? alvo(e) : inicia(e, 'hbars', o); if (!el) return;
    const c = cores(el, o), W = largura(el, o);
    const vals = (o.values || []).map(v => +v || 0), labs = (o.labels || []).map(l => String(l == null ? '' : l));
    const vls = rotulos(vals, o.vlabels), hi = hiDe(o);
    const barH = 14, max = Math.max(...vals, 0) || 1, gapV = 12;
    const tamHi = t => Math.max(22, Math.min(28, 28 * (W * 0.4) / Math.max(1, mede(t, NUM, 400, 28))));
    const valW = Math.max(0, ...vls.map((t, i) => (i === hi ? mede(t, NUM, 400, tamHi(t)) + 18 : mede(t, LAB, 500, FS)))) + 4;
    const maxLab = Math.max(0, ...labs.map((l, i) => mede(l, LAB, i === hi ? 600 : 500, FS)));
    const labw = o.labw || Math.round(Math.min(W * 0.4, maxLab + 18));
    const empilha = o.empilhar === true || (o.empilhar !== false && (W - labw - valW - gapV) < W * 0.32);
    const barra = (x0, cy, bw, i) => R(x0, cy - barH / 2, bw, barH, i === hi ? c.molho : c.neutro, ' data-a="x"');
    const valor = (vx, cy, i) => {
      if (i !== hi) return T(vx, cy + 5, vls[i], LAB, 500, FS, c.apoio, 'start');
      const t = r2(tamHi(vls[i]));
      return P(vx + 5, cy, 5, c.molho, ' data-a="p"') + T(vx + 18, cy + t * 0.34, vls[i], NUM, 400, t, c.titulo, 'start', 0, ' data-a="f"');
    };
    let s = '', H;
    if (empilha) {
      const barMax = Math.max(40, W - valW - gapV - 8);
      let y = 0;
      vals.forEach((v, i) => {
        const ehHi = i === hi, peso = ehHi ? 600 : 500;
        const ls = quebra(labs[i], LAB, peso, FS, W, 2);
        ls.forEach((ln, k) => { s += T(8, y + 14 + k * 19, ln, LAB, peso, FS, ehHi ? c.titulo : c.apoio, 'start'); });
        const cy = y + 14 + (ls.length - 1) * 19 + 8 + (ehHi ? 16 : 11);
        const bw = Math.max(2, (Math.max(0, v) / max) * barMax);
        s += barra(8, cy, bw, i) + valor(8 + bw + gapV, cy, i);
        y = cy + (ehHi ? 16 : 11) + 14;
      });
      H = Math.max(1, y - 10);
      s += FV(5, 0, H, c.base);
    } else {
      const rowH = 42, barMax = Math.max(40, W - labw - valW - gapV - 8);
      H = Math.max(1, vals.length) * rowH;
      vals.forEach((v, i) => {
        const cy = i * rowH + rowH / 2, ehHi = i === hi;
        const bw = Math.max(2, (Math.max(0, v) / max) * barMax);
        s += barra(labw + 8, cy, bw, i);
        const peso = ehHi ? 600 : 500, corT = ehHi ? c.titulo : c.apoio, disp = labw - 10;
        let ls = [labs[i]], fs = FS;
        if (mede(ls[0], LAB, peso, FS) > disp) { fs = 13; ls = quebra(ls[0], LAB, peso, 13, disp, 2); }
        if (ls.length === 1) s += T(labw - 10, cy + fs * 0.36, ls[0], LAB, peso, fs, corT, 'end');
        else ls.forEach((ln, k) => { s += T(labw - 10, cy - 7 + k * 15 + fs * 0.36, ln, LAB, peso, fs, corT, 'end'); });
        s += valor(labw + 8 + bw + gapV, cy, i);
      });
      s += FV(labw + 5, 0, H, c.base);
    }
    monta(el, W, H, s, o, c, 'barras-h');
  }

  /* posição do número de destaque sem encostar na linha nem nos outros pontos */
  function lugarLivre(x, y, w, W, base, pts, ignora) {
    const colide = (x0, x1, y0, y1) => {
      if (x0 < 0 || x1 > W || y0 < 0 || y1 > base - 2) return true;
      for (let k = 0; k < pts.length; k++) {
        const serie = pts[k];
        for (let i = 0; i < serie.length - 1; i++) {
          const a = serie[i], b = serie[i + 1], lo = Math.max(x0, a[0]), hi = Math.min(x1, b[0]);
          if (lo > hi) continue;
          const dx = (b[0] - a[0]) || 1;
          const ya = a[1] + (b[1] - a[1]) * (lo - a[0]) / dx, yb = a[1] + (b[1] - a[1]) * (hi - a[0]) / dx;
          if (Math.max(ya, yb) >= y0 - 3 && Math.min(ya, yb) <= y1 + 3) return true;
        }
        for (let i = 0; i < serie.length; i++) {
          if (k === 0 && i === ignora) continue;
          const p = serie[i];
          if (p[0] >= x0 - 6 && p[0] <= x1 + 6 && p[1] >= y0 - 6 && p[1] <= y1 + 6) return true;
        }
      }
      return false;
    };
    const cx = Math.max(w / 2 + 2, Math.min(W - w / 2 - 2, x));
    const opcoes = [
      { x: cx, y: y - 19, a: 'middle', b: [cx - w / 2, cx + w / 2, y - 43, y - 17] },
      { x: x - 15, y: y - 12, a: 'end', b: [x - 15 - w, x - 15, y - 36, y - 10] },
      { x: x + 15, y: y - 12, a: 'start', b: [x + 15, x + 15 + w, y - 36, y - 10] },
      { x: cx, y: y + 40, a: 'middle', b: [cx - w / 2, cx + w / 2, y + 16, y + 42], baixo: true },
      { x: x - 15, y: y + 30, a: 'end', b: [x - 15 - w, x - 15, y + 6, y + 32], baixo: true },
      { x: x + 15, y: y + 30, a: 'start', b: [x + 15, x + 15 + w, y + 6, y + 32], baixo: true }
    ];
    for (let i = 0; i < opcoes.length; i++) { const op = opcoes[i]; if (!colide(op.b[0], op.b[1], op.b[2], op.b[3])) return op; }
    return opcoes[0];
  }

  /* =========================================================== LINHA */
  function line(e, o) {
    o = o || {};
    const el = inicia(e, 'line', o); if (!el) return;
    const c = cores(el, o), W = largura(el, o);
    const vals = (o.values || []).map(v => +v || 0), labs = (o.labels || []).map(l => String(l == null ? '' : l));
    const v2 = (o.values2 || o.valores2 || []).map(v => +v || 0), dupla = v2.length > 1;
    const vls = rotulos(vals, o.vlabels), n = vals.length, hi = hiDe(o);
    const area = !!o.area, todos = !!o.todos;
    const lg = dupla ? legenda(c, W, o.series || ['Série 1', 'Série 2'], [c.titulo, c.serie2]) : { s: '', h: 0 };
    const H = (o.h || 260) + lg.h;
    if (!n) { monta(el, W, H, '', o, c, 'linha'); return; }
    const meia = i => Math.max(mede(labs[i] || '', LAB, i === hi ? 600 : 500, FS), i === hi ? mede(vls[i], NUM, 400, 30) : mede(vls[i], LAB, 500, FS)) / 2;
    const pl = Math.max(16, meia(0) + 4), pr = Math.max(16, meia(n - 1) + 4);
    const pt = lg.h + 54, pb = 38, base = H - pb;
    const todosV = vals.concat(dupla ? v2 : []);
    const max = Math.max(...todosV), min = Math.min(...todosV);
    const lo = area ? Math.min(0, min) : min - (max - min || 1) * 0.3;
    const hiV = max === lo ? lo + 1 : max;
    const px = i => (n === 1 ? W / 2 : pl + (i * (W - pl - pr)) / (n - 1));
    const py = v => pt + (1 - (v - lo) / (hiV - lo)) * (base - pt - 10);
    const pts = vals.map((v, i) => `${r2(px(i))},${r2(py(v))}`).join(' ');
    let s = lg.s;
    if (area) s += `<polygon points="${r2(px(0))},${r2(base)} ${pts} ${r2(px(n - 1))},${r2(base)}" fill="${c.neutro}" fill-opacity=".14" data-a="f"/>`;
    s += FH(0, W, base, c.base);
    const pts0 = vals.map((v, i) => [px(i), py(v)]);
    const series = [pts0];
    if (dupla) {
      const p2 = v2.slice(0, n).map((v, i) => [px(i), py(v)]);
      series.push(p2);
      s += `<polyline points="${p2.map(p => r2(p[0]) + ',' + r2(p[1])).join(' ')}" fill="none" stroke="${c.serie2}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" data-a="d"/>`;
      p2.forEach(p => { s += P(p[0], p[1], 3.5, c.serie2, ' data-a="f"'); });
    }
    const hiW = hi >= 0 ? mede(vls[hi], NUM, 400, 30) : 0;
    const hiPos = hi >= 0 && hi < n ? lugarLivre(px(hi), py(vals[hi]), hiW, W, base, series, hi) : null;
    if (hiPos && !hiPos.baixo) s += L(px(hi), py(vals[hi]) + 10, px(hi), base, c.molho, 1, ' stroke-dasharray="2 3" data-a="f"');
    s += `<polyline points="${pts}" fill="none" stroke="${c.titulo}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" data-a="d"/>`;
    const mostraV = i => {
      if (i === hi) return true;
      if (!todos && i !== 0 && i !== n - 1) return false;
      if (hi < 0) return true;
      const d = Math.abs(px(i) - px(hi)), wv = mede(vls[i], LAB, 500, FS);
      return d > (wv + hiW) / 2 + 8 || Math.abs(py(vals[i]) - py(vals[hi])) > 30;
    };
    const larg = Math.max(0, ...labs.map((l, i) => mede(l, LAB, i === hi ? 600 : 500, FS)));
    const passo = n > 1 ? (W - pl - pr) / (n - 1) : W;
    const k = Math.max(1, Math.ceil((larg + 10) / passo));
    const fixos = [n - 1]; if (hi >= 0) fixos.push(hi);
    const mostraL = i => fixos.indexOf(i) >= 0 || (i % k === 0 && fixos.every(f => Math.abs(px(i) - px(f)) >= larg + 8));
    vals.forEach((v, i) => {
      if (i === hi) return;
      const x = px(i), y = py(v);
      s += `<circle cx="${r2(x)}" cy="${r2(y)}" r="4" fill="${c.fundo}" stroke="${c.titulo}" stroke-width="1.5" data-a="f"/>`;
      if (mostraV(i)) s += T(x, y - 12, vls[i], LAB, 500, FS, c.apoio, 'middle', 0, ' data-a="f"');
    });
    if (hiPos) {
      const x = px(hi), y = py(vals[hi]);
      s += P(x, y, 8, c.molho, ` stroke="${c.fundo}" stroke-width="2.5" data-a="p"`);
      s += T(hiPos.x, hiPos.y, vls[hi], NUM, 400, 30, c.titulo, hiPos.a, 0, ' data-a="f"');
    }
    labs.forEach((l, i) => {
      if (!mostraL(i)) return;
      s += T(px(i), base + 26, l, LAB, i === hi ? 600 : 500, FS, i === hi ? c.titulo : c.apoio, 'middle');
    });
    monta(el, W, H, s, o, c, 'linha');
  }

  /* =========================================================== COMPOSIÇÃO (100%) */
  function share(e, o) {
    o = o || {};
    const el = inicia(e, 'share', o); if (!el) return;
    const c = cores(el, o), W = largura(el, o);
    const sg = o.segments || [], hi = hiDe(o);
    const barH = 18, sep = 2;
    const tot = sg.reduce((a, t) => a + (+t.value || 0), 0) || 1;
    const neutros = [c.neutro, mistura(c.neutro, c.fundo, 0.4), c.serie2];
    let k = 0;
    const cor = sg.map((t, i) => (i === hi ? c.molho : neutros[(k++) % 3]));
    const vls = sg.map(t => (t.vlabel != null ? String(t.vlabel) : auto(+t.value || 0)));
    let s = '', x = 0, topo = 0;
    if (hi >= 0 && hi < sg.length) {
      let x0 = 0;
      for (let i = 0; i < hi; i++) x0 += ((+sg[i].value || 0) / tot) * W;
      const wSeg = ((+sg[hi].value || 0) / tot) * W;
      const nw = mede(vls[hi], NUM, 400, 36), lw = mede(sg[hi].label || '', LAB, 600, FS);
      const bloco = nw + 10 + lw;
      const bx = Math.max(0, Math.min(W - bloco, x0));
      s += T(bx, 34, vls[hi], NUM, 400, 36, c.titulo, 'start', 0, ' data-a="f"');
      s += T(bx + nw + 10, 33, sg[hi].label || '', LAB, 600, FS, c.titulo, 'start', 0, ' data-a="f"');
      s += P(Math.max(6, Math.min(W - 6, x0 + wSeg / 2)), 52, 5, c.molho, ' data-a="p"');
      topo = 64;
    }
    sg.forEach((t, i) => {
      const w = ((+t.value || 0) / tot) * W;
      const gap = i < sg.length - 1 ? sep : 0;
      s += R(x, topo, w - gap, barH, cor[i], ' data-a="x"');
      x += w;
    });
    s += FH(0, W, topo + barH + 6, c.base);
    const linhaH = 28, y0 = topo + barH + 42;
    let lx = 0, ly = 0;
    sg.forEach((t, i) => {
      const lw = mede(t.label || '', LAB, 500, FS), vw = mede(vls[i], LAB, 700, FS), iw = 12 + 8 + lw + 6 + vw;
      if (lx > 0 && lx + iw > W) { lx = 0; ly++; }
      const yy = y0 + ly * linhaH, ehHi = i === hi;
      s += R(lx, yy - 11, 12, 12, cor[i]);
      s += T(lx + 20, yy, t.label || '', LAB, 500, FS, ehHi ? c.titulo : c.apoio, 'start');
      s += T(lx + 20 + lw + 6, yy, vls[i], LAB, 700, FS, ehHi ? c.titulo : c.texto, 'start');
      lx += iw + 24;
    });
    monta(el, W, y0 + ly * linhaH + 6, s, o, c, 'composicao');
  }

  /* =========================================================== ANEL (o arco do valor, com a pérola na ponta) */
  function ring(e, o) {
    o = o || {};
    const el = inicia(e, 'ring', o); if (!el) return;
    const c = cores(el, o), W0 = largura(el, o), S = Math.min(o.s || 220, W0), W = Math.max(S, o.w || W0), H = S;
    const cx = W / 2, cy = S / 2, r = S / 2 - 14, Cc = 2 * Math.PI * r;
    const frac = Math.min(1, Math.max(0, (+o.value || 0) / 100));
    const vl = o.vlabel != null ? String(o.vlabel) : auto(+o.value || 0) + '%';
    /* o trilho é um filete duplo em círculo */
    let s = `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(r + 2)}" fill="none" stroke="${c.neutro}" stroke-width="1"/><circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(r - 2)}" fill="none" stroke="${c.neutro}" stroke-width="1"/>`;
    if (frac > 0) {
      s += `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(r)}" transform="rotate(-90 ${r2(cx)} ${r2(cy)})" fill="none" stroke="${c.molho}" stroke-width="6" stroke-dasharray="${r2(Cc * frac)} ${r2(Cc)}" data-a="r" data-v="${r2(Cc * frac)}" data-c="${r2(Cc)}"/>`;
      const a = -Math.PI / 2 + frac * 2 * Math.PI;
      s += P(cx + r * Math.cos(a), cy + r * Math.sin(a), 9, c.molho, ` stroke="${c.fundo}" stroke-width="2.5" data-a="p"`);
    }
    let tam = S * 0.27;
    const interno = (r - 12) * 2 * 0.82;
    const nw = mede(vl, NUM, 400, tam);
    if (nw > interno) tam = tam * interno / nw;
    const lab = o.label ? String(o.label).toUpperCase() : '';
    const ls = lab ? quebra(lab, LAB, 600, 13, interno * 0.86, 2, 2.3) : [];
    const blocoH = tam * 0.72 + (ls.length ? 12 + ls.length * 16 : 0);
    const topo = cy - blocoH / 2;
    s += T(cx, topo + tam * 0.72, vl, NUM, 400, r2(tam), c.titulo, 'middle');
    ls.forEach((ln, k) => { s += T(cx + 1.15, topo + tam * 0.72 + 25 + k * 16, ln, LAB, 600, 13, c.apoio, 'middle', 2.3); });
    monta(el, W, H, s, o, c, 'anel');
  }

  /* =========================================================== FUNIL */
  function funnel(e, o) {
    o = o || {};
    const el = inicia(e, 'funnel', o); if (!el) return;
    const c = cores(el, o), W = largura(el, o);
    const st = o.stages || [], hi = hiDe(o), taxas = !!o.taxas;
    const vls = st.map(t => (t.vlabel != null ? String(t.vlabel) : auto(+t.value || 0)));
    const max = Math.max(...st.map(t => +t.value || 0), 0) || 1;
    const barH = 16, labH = 32, gap = taxas ? 36 : 20;
    const larg = t => Math.max(W * 0.06, Math.min(W, ((+t.value || 0) / max) * W));
    let s = '', y = 0;
    st.forEach((t, i) => {
      const ehHi = i === hi, w = larg(t), x = (W - w) / 2;
      const valW = ehHi ? mede(vls[i], NUM, 400, 28) + 16 : mede(vls[i], LAB, 700, 15);
      const lab = quebra(String(t.label == null ? '' : t.label), LAB, ehHi ? 600 : 500, FS, W - valW - 16, 2);
      const extra = (lab.length - 1) * 18;
      lab.forEach((ln, k) => { s += T(0, y + 19 + k * 18, ln, LAB, ehHi ? 600 : 500, FS, ehHi ? c.titulo : c.texto, 'start'); });
      if (ehHi) {
        const nw = mede(vls[i], NUM, 400, 28);
        s += P(W - nw - 12, y + 13, 5, c.molho, ' data-a="p"');
        s += T(W, y + 23, vls[i], NUM, 400, 28, c.titulo, 'end', 0, ' data-a="f"');
      } else s += T(W, y + 19, vls[i], LAB, 700, 15, c.texto, 'end');
      const by = y + labH + extra;
      s += R(x, by, w, barH, ehHi ? c.molho : c.neutro, ' data-a="xc"');
      y = by + barH;
      if (i < st.length - 1) {
        if (taxas) {
          const a = +t.value || 0, b = +st[i + 1].value || 0;
          const pct = a > 0 ? Math.round((b / a) * 100) : 0;
          s += L(W / 2, y + 4, W / 2, y + 11, c.apoio, 1);
          s += T(W / 2, y + 27, pct + '% seguem', LAB, 500, 13, c.apoio, 'middle', 0.4);
        }
        y += gap;
      }
    });
    monta(el, W, Math.max(1, y), s, o, c, 'funil');
  }

  /* =========================================================== FLUXO */
  function flow(e, o) {
    o = o || {};
    const el = inicia(e, 'flow', o); if (!el) return;
    const c = cores(el, o), W = largura(el, o);
    const st = o.steps || [], k = st.length, hi = hiDe(o), numeros = o.numeros !== false;
    const cel = 32, pad = 18, m = 1;
    const mp = (campo, peso, tam) => maiorPalavra(st.map(t => t[campo]), LAB, peso, tam);
    const box0 = (W - m * 2 - cel * (k - 1)) / Math.max(1, k);
    const cabeLado = box0 - pad * 2 >= mp('label', 600, 15);
    const vert = k > 1 && ((W < 560 && k > 2) || box0 < 130 || !cabeLado);
    const boxW = vert ? W - m * 2 : box0;
    const tw = boxW - pad * 2;
    const fl = mp('label', 600, 17) <= tw ? 17 : 15;
    const fsb = mp('sub', 400, 15) <= tw ? 15 : 13;
    const lhL = fl * 1.28, lhS = fsb * 1.38;
    const numH = numeros ? 40 : 0;
    const blocos = st.map(t => {
      const Lq = quebra(t.label || '', LAB, 600, fl, tw, 3);
      const S = t.sub ? quebra(t.sub, LAB, 400, fsb, tw, 4) : [];
      return { L: Lq, S, th: Lq.length * lhL + (S.length ? 6 + S.length * lhS : 0) };
    });
    const maxTh = Math.max(0, ...blocos.map(b => b.th));
    const boxH = pad + numH + maxTh + pad;
    const H = vert ? k * boxH + (k - 1) * cel + m * 2 : boxH + m * 2;
    let s = '';
    st.forEach((t, i) => {
      const ehHi = i === hi;
      const x = vert ? m : m + i * (boxW + cel), y = vert ? m + i * (boxH + cel) : m;
      s += `<g data-a="f"><rect x="${r2(x)}" y="${r2(y)}" width="${r2(boxW)}" height="${r2(boxH)}" fill="none" stroke="${ehHi ? c.molho : c.fio}" stroke-width="${ehHi ? 1.5 : 1}"/>`;
      let ty = y + pad;
      if (numeros) {
        s += T(x + pad, ty + 28, dois(i + 1), NUM, 400, 32, ehHi ? c.molhoTxt : c.apoio, 'start');
        if (ehHi) s += P(x + boxW - pad - 5, ty + 16, 5, c.molho);
        ty += numH;
      }
      const b = blocos[i];
      b.L.forEach(ln => { ty += lhL; s += T(x + pad, ty - fl * 0.3, ln, LAB, 600, r2(fl), c.titulo, 'start'); });
      if (b.S.length) ty += 6;
      b.S.forEach(ln => { ty += lhS; s += T(x + pad, ty - fsb * 0.34, ln, LAB, 400, r2(fsb), c.apoio, 'start'); });
      s += '</g>';
      if (i < k - 1) {
        const est = `fill="none" stroke="${c.apoio}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`;
        if (vert) {
          const cx = x + boxW / 2, cy = y + boxH + cel / 2;
          s += `<path d="M${r2(cx - 7)},${r2(cy - 3.5)} L${r2(cx)},${r2(cy + 3.5)} L${r2(cx + 7)},${r2(cy - 3.5)}" ${est}/>`;
        } else {
          const cx = x + boxW + cel / 2, cy = y + boxH / 2;
          s += `<path d="M${r2(cx - 3.5)},${r2(cy - 7)} L${r2(cx + 3.5)},${r2(cy)} L${r2(cx - 3.5)},${r2(cy + 7)}" ${est}/>`;
        }
      }
    });
    monta(el, W, H, s, o, c, 'fluxo', true);
  }

  /* =========================================================== KPI (número em destaque) */
  function kpi(e, o) {
    o = o || {};
    const el = inicia(e, 'kpi', o); if (!el) return;
    const c = cores(el, o), W = largura(el, o);
    const vl = o.vlabel != null ? String(o.vlabel) : auto(+o.value || 0);
    const un = o.unit ? String(o.unit).toUpperCase() : '';
    const serie = (o.serie || []).map(v => +v || 0);
    const lado = serie.length > 1 && W >= 480;
    let tam = Math.min(112, Math.max(60, W * 0.24));
    const uw = un ? mede(un, LAB, 600, 13, 2.3) + 14 : 0;
    const dispN = (lado ? W * 0.56 : W) - uw;
    let nw = mede(vl, NUM, 400, tam);
    if (nw > dispN) { tam = tam * dispN / nw; nw = dispN; }
    const base = tam * 0.82;
    /* o número de destaque é o molho (no Verde, caramelo em corpo grande) */
    let s = T(0, base, vl, NUM, 400, r2(tam), tam >= 24 ? c.molho : c.molhoTxt, 'start', 0, ' data-a="f"');
    if (un) s += T(nw + 12, base, un, LAB, 600, 13, c.apoio, 'start', 2.3);
    let y = base + tam * 0.14 + 12;
    const fw = Math.max(64, Math.min(nw, W));
    s += FH(0, fw, y, c.molho) + P(fw + 8, y + 2.5, 4.5, c.molho, ' data-a="p"');
    y += 5;
    const larguraTxt = lado ? W * 0.56 : W;
    if (o.label) {
      const ls = quebra(o.label, LAB, 500, 17, larguraTxt, 3);
      ls.forEach((ln, k) => { s += T(0, y + 28 + k * 23, ln, LAB, 500, 17, c.texto, 'start'); });
      y += 28 + (ls.length - 1) * 23 + 6;
    }
    if (o.sub) {
      const ls = quebra(o.sub, LAB, 400, 15, larguraTxt, 3);
      ls.forEach((ln, k) => { s += T(0, y + 20 + k * 20, ln, LAB, 400, 15, c.apoio, 'start'); });
      y += 20 + (ls.length - 1) * 20 + 6;
    }
    if (serie.length > 1) {
      const sx = lado ? W * 0.64 : 0, sw = lado ? W - sx - 10 : W - 10;
      const sy = lado ? 10 : y + 22, sh = lado ? Math.max(40, base - 6) : 56;
      const mx = Math.max(...serie), mn = Math.min(...serie), amp = mx - mn || 1;
      const px = i => sx + (i * sw) / (serie.length - 1);
      const py = v => sy + (1 - (v - mn) / amp) * sh;
      const pts = serie.map((v, i) => `${r2(px(i))},${r2(py(v))}`).join(' ');
      s += FH(sx, sx + sw, sy + sh + 9, c.base);
      s += `<polyline points="${pts}" fill="none" stroke="${c.apoio}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" data-a="d"/>`;
      const u = serie.length - 1;
      s += P(px(u), py(serie[u]), 6.5, c.molho, ` stroke="${c.fundo}" stroke-width="2" data-a="p"`);
      if (!lado) y = sy + sh + 16;
    }
    monta(el, W, Math.max(y + 4, lado ? base + tam * 0.3 : 0), s, o, c, 'kpi');
  }

  /* =========================================================== LINHA DO TEMPO */
  function timeline(e, o) {
    o = o || {};
    const el = inicia(e, 'timeline', o); if (!el) return;
    const c = cores(el, o), W = largura(el, o);
    const ev = o.eventos || o.events || [], n = ev.length;
    const hi = o.highlight == null ? n - 1 : +o.highlight;
    if (!n) { monta(el, W, 20, '', o, c, 'linha-tempo'); return; }
    const datas = ev.map(t => String(t.data || '').toUpperCase());
    const colW = W / n;
    const precisa = Math.max(maiorPalavra(ev.map(t => t.label), LAB, 600, 15), ...datas.map(d => mede(d, LAB, 600, 13, 2.3))) + 18;
    const horizontal = n > 1 && colW >= Math.max(128, precisa);
    /* o agora: pérola cheia com anel; o que passou: pérola pequena cheia; o que falta: contorno */
    const ponto = (x, y, i) => {
      if (i === hi) return `<circle cx="${r2(x)}" cy="${r2(y)}" r="12" fill="none" stroke="${c.molho}" stroke-width="1" data-a="p"/>` + P(x, y, 7, c.molho, ' data-a="p"');
      if (i < hi) return P(x, y, 4.5, c.apoio, ' data-a="p"');
      return `<circle cx="${r2(x)}" cy="${r2(y)}" r="4.5" fill="${c.fundo}" stroke="${c.apoio}" stroke-width="1.5" data-a="p"/>`;
    };
    let s = '', H = 0;
    if (horizontal) {
      const eixo = 44, x0 = 14, xh = x0 + Math.max(0, hi) * colW;
      s += FH(x0, Math.min(W, xh), eixo - 2.5, c.base);
      if (hi < n - 1) s += L(xh, eixo, W, eixo, c.base, 1, ' stroke-dasharray="3 4" data-a="x"');
      let fundo = 0;
      ev.forEach((t, i) => {
        const x = i * colW, ehHi = i === hi, tw = colW - 20;
        s += T(x, 18, datas[i], LAB, 600, 13, ehHi ? c.molhoTxt : c.apoio, 'start', 2.3);
        s += ponto(x + x0, eixo, i);
        let y = eixo + 38;
        quebra(t.label || '', LAB, 600, 15, tw, 3).forEach(ln => { s += T(x, y, ln, LAB, 600, 15, ehHi ? c.titulo : c.texto, 'start'); y += 20; });
        if (t.sub) { y += 2; quebra(t.sub, LAB, 400, FS, tw, 4).forEach(ln => { s += T(x, y, ln, LAB, 400, FS, c.apoio, 'start'); y += 19; }); }
        fundo = Math.max(fundo, y);
      });
      H = fundo - 8;
    } else {
      const x0 = 14, tx = 42, tw = W - tx;
      let y = 8;
      const centros = [];
      let partes = '';
      ev.forEach((t, i) => {
        const ehHi = i === hi;
        centros.push(y + 7);
        partes += T(tx, y + 12, datas[i], LAB, 600, 13, ehHi ? c.molhoTxt : c.apoio, 'start', 2.3);
        let yy = y + 12 + 24;
        quebra(t.label || '', LAB, 600, 15, tw, 3).forEach(ln => { partes += T(tx, yy, ln, LAB, 600, 15, ehHi ? c.titulo : c.texto, 'start'); yy += 20; });
        if (t.sub) { yy += 2; quebra(t.sub, LAB, 400, FS, tw, 5).forEach(ln => { partes += T(tx, yy, ln, LAB, 400, FS, c.apoio, 'start'); yy += 19; }); }
        y = yy + 14;
      });
      const yh = centros[Math.max(0, Math.min(n - 1, hi))];
      s += FV(x0 + 2.5, centros[0], yh, c.base);
      if (hi < n - 1) s += L(x0, yh, x0, centros[n - 1], c.base, 1, ' stroke-dasharray="3 4" data-a="f"');
      ev.forEach((t, i) => { s += ponto(x0, centros[i], i); });
      s += partes;
      H = y - 14;
    }
    monta(el, W, Math.max(40, H), s, o, c, 'linha-tempo');
  }

  /* =========================================================== COTA */
  function cota(e, o) {
    o = o || {};
    const el = inicia(e, 'cota', o); if (!el) return;
    const c = cores(el, o), W = largura(el, o), H = 26, cy = 13;
    const lab = String(o.label || '').toUpperCase();
    const tw = mede(lab, LAB, 600, 13, 2.3);
    const a = W / 2 - tw / 2 - 10, b = W / 2 + tw / 2 + 10;
    let s = L(0.5, cy, a, cy, c.apoio, 1) + L(b, cy, W - 0.5, cy, c.apoio, 1);
    s += L(0.5, cy - 6, 0.5, cy + 6, c.apoio, 1) + L(W - 0.5, cy - 6, W - 0.5, cy + 6, c.apoio, 1);
    s += T(W / 2 + 1.15, cy + 4.5, lab, LAB, 600, 13, c.apoio, 'middle', 2.3);
    o = Object.assign({ aria: lab || 'Cota', animar: false }, o);
    monta(el, W, H, s, o, c, 'cota', true);
  }

  /* =========================================================== montagem e nomes */
  const tipos = { bars, hbars, line, share, ring, funnel, flow, kpi, timeline, cota };
  const TIPO = { barras: 'bars', 'barras-h': 'hbars', barrash: 'hbars', ranking: 'hbars', linha: 'line', composicao: 'share', 'composição': 'share',
    anel: 'ring', funil: 'funnel', fluxo: 'flow', numero: 'kpi', 'número': 'kpi', 'linha-tempo': 'timeline', 'linha-do-tempo': 'timeline', cronologia: 'timeline' };
  const CHAVE = { sobretitulo: 'rotulo_topo', rotulos: 'labels', valores: 'values', vrotulos: 'vlabels', destaque: 'highlight', unidade: 'unit', altura: 'h', largura: 'w',
    etapas: 'stages', segmentos: 'segments', passos: 'steps', rotulo: 'label', valor: 'value', vrotulo: 'vlabel', tamanho: 's' };
  function normaliza(o, topo) {
    if (Array.isArray(o)) return o.map(x => normaliza(x));
    if (!o || typeof o !== 'object') return o;
    const r = {};
    Object.keys(o).forEach(k => {
      /* no nível de cima, "rotulo" de kpi e anel é o rótulo do número; nos outros tipos,
         "rotulo" é o rótulo de rótulo acima do título */
      r[CHAVE[k] || k] = normaliza(o[k]);
    });
    if (topo && o.rotulo != null && ['kpi', 'numero', 'número', 'anel', 'cota'].indexOf(o.tipo) < 0 && topo !== 'kpi') {
      r.rotulo_topo = o.rotulo; delete r.label;
    }
    return r;
  }
  function render(el, tipo, opts) {
    const k = TIPO[tipo] || tipo, f = tipos[k];
    const o = Object.assign({}, opts || {}); o.tipo = tipo;
    if (f) f(el, normaliza(o, ['kpi', 'ring', 'cota'].indexOf(k) >= 0 ? 'kpi' : true));
    else if (typeof console !== 'undefined') console.error('rviz: tipo desconhecido "' + tipo + '"');
  }
  function montar(raiz) {
    if (!temDoc) return;
    (raiz || document).querySelectorAll('[data-rviz]').forEach(el => {
      if (el.__rvizMontado || el.tagName.toLowerCase() === 'svg') return;
      let cfg;
      try { cfg = JSON.parse(el.getAttribute('data-rviz')); } catch (err) { console.error('rviz: data-rviz não é JSON válido', el); return; }
      el.__rvizMontado = 1;
      render(el, cfg.tipo, cfg);
    });
  }
  function redesenhar() {
    registro.forEach(el => {
      if (!el.isConnected) { registro.delete(el); return; }
      const c = el.__rviz;
      if (c && tipos[c.tipo]) tipos[c.tipo](el, c.opts);
    });
  }
  /* o SVG pronto (texto), com xmlns, width/height e cores em HEX, para salvar ou levar ao Canva.
     rviz.svg(el) devolve o de um gráfico da página; rviz.svg(tipo, opts) desenha fora da página
     (campo padrão 'papel', largura padrão 960, sem animação). */
  function svg(e, opts) {
    if (typeof e === 'string' && (TIPO[e] || tipos[e]) && temDoc && document.body) {
      const o = Object.assign({ campo: 'papel', animar: false }, opts || {});
      const W = +(o.largura || o.w) || 960;
      const caixa = document.createElement('div');
      caixa.setAttribute('aria-hidden', 'true');
      caixa.style.cssText = `position:absolute;left:-99999px;top:0;width:${W}px;visibility:hidden`;
      document.body.appendChild(caixa);
      o.largura = W; o.peca = false;
      render(caixa, e, o);
      registro.delete(caixa);
      const s = caixa.querySelector('svg');
      let out = '';
      if (s) {
        const vb = s.getAttribute('viewBox').split(' ').map(Number);
        s.setAttribute('width', Math.round(vb[2])); s.setAttribute('height', Math.round(vb[3]));
        s.removeAttribute('style');
        s.id = 'rvx' + (++seqX);
        out = s.outerHTML.replace(/ data-a="[a-z]+"/g, '').replace(/ id="rv\d+-/g, ' id="' + s.id + '-').replace(/rv\d+-([td])/g, s.id + '-$1');
      }
      if (ro) try { ro.unobserve(caixa); } catch (err) { /* ok */ }
      caixa.remove();
      return out;
    }
    const el = alvo(e);
    const s = el && (el.tagName && el.tagName.toLowerCase() === 'svg' ? el : el.querySelector('svg'));
    return s ? s.outerHTML : '';
  }
  let ro = null, espera = 0;
  const larguras = new WeakMap();
  function observa(el) {
    if (!ro && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(entradas => {
        let mudou = false;
        entradas.forEach(en => {
          const w = Math.round(en.contentRect.width);
          if (larguras.get(en.target) !== w) { larguras.set(en.target, w); mudou = true; }
        });
        if (!mudou) return;
        clearTimeout(espera);
        espera = setTimeout(redesenhar, 120);
      });
    }
    if (ro && !larguras.has(el)) { larguras.set(el, Math.round(el.clientWidth || 0)); ro.observe(el); }
  }
  const nomeado = k => (e, o) => render(e, k, o);
  const api = { barras: nomeado('barras'), barrasH: nomeado('barras-h'), ranking: nomeado('barras-h'), linha: nomeado('linha'),
    composicao: nomeado('composicao'), anel: nomeado('anel'), funil: nomeado('funil'), fluxo: nomeado('fluxo'), kpi: nomeado('kpi'),
    numero: nomeado('kpi'), linhaTempo: nomeado('linha-tempo'), cota: nomeado('cota'),
    tipos: ['barras', 'barras-h', 'linha', 'composicao', 'anel', 'funil', 'fluxo', 'kpi', 'linha-tempo', 'cota'],
    fmt, render, montar, redesenhar, svg, paletas: PALETAS, contraste, animar: true, version: '1.0' };
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeprint', () => { terminaAnimacoes(); redesenhar(); });
    try {
      if (temDoc && document.fonts) {
        const recarrega = () => { cache.clear(); redesenhar(); };
        document.fonts.ready.then(recarrega);
        document.fonts.addEventListener('loadingdone', recarrega);
      }
    } catch (err) { /* sem API de fontes */ }
    if (temDoc) {
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => montar());
      else montar();
    }
  }
  return api;
})();
if (typeof window !== 'undefined') window.rviz = rviz;
