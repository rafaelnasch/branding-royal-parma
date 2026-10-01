/* =====================================================================
   RFORMS · formas da casa da Royal Parma · sistema Rótulo Real v1
   Quando uma peça precisa de uma FORMA (moldura, divisor, selo, grafismo de campo), ela sai
   daqui: nunca de banco de imagem, nunca de emoji, nunca de desenho feito na hora e nunca de
   clichê de cantina (bandeira da Itália, Coliseu, gôndola, chef de bigode, labareda).

   De onde vêm as formas
   · Da embalagem e do brasão: o filete duplo e a moldura de cantos recortados da caixa e do
     pote de molho, as caixinhas de marcar da caixa, a perna curva do R ampliada (como na
     caixa), as pérolas e os arcos da coroa, o contorno do escudo, o lacre serrilhado.
   · Ecoam a marca sem imitá-la: nenhuma forma desenha o RP, a coroa com a cruz ou o escudo
     com o monograma. Quando a peça precisa da marca, ela é sempre o arquivo de assets/
     (o selo com rp:true usa <image href="assets/royal-monograma-<cor>.svg">).

   Regras do motor
   · JavaScript ES2015 simples, zero dependências, SVG puro, determinístico (sem Math.random,
     sem Date). Mesma entrada e mesma largura, mesmo desenho.
   · O desenho mede o contêiner (1 unidade = 1 px). Traço fino e consistente: fio de 1 px na
     tela; dentro de uma .peca (o post de 1080), fio de 2,5 unidades da peça. O filete duplo
     é sempre dois fios com 3 vezes a espessura do fio entre eles (1 px e 3 px na tela).
   · Cores do campo onde a forma está: --f-molho (caramelo no Verde, na Floresta e na Mata;
     canela no Papel e no Creme; Verde no Kraft), --f-titulo, --f-linha e, para a curva,
     --f-curva (Mata no Verde, Creme no Papel, Verde no Kraft). Override por opções: cor
     (HEX ou o nome do tom: 'molho' | 'titulo' | 'linha' | 'curva') e campo ('verde' |
     'floresta' | 'mata' | 'papel' | 'creme' | 'kraft' | 'branco'). Toda cor sai em HEX por
     extenso, em atributo: sem degradê, sem dourado metálico, sem sombra.
   · Uma moldura por peça (nunca moldura dentro de moldura), um selo por peça, uma curva por
     peça (nunca atrás de texto pequeno, nunca girada).
   · Acessibilidade: com aria (ou texto no selo, número no escudo) o SVG ganha role="img",
     <title> e <desc>; sem isso, a forma é decorativa (aria-hidden).

   Como usar
     <div data-rforms="filete"></div>                                         (monta sozinho)
     <div data-rforms="selo" data-rforms-opts='{"texto":"Novo","arco":"Feito hoje"}'></div>
     <div data-rforms='{"forma":"moldura","proporcao":"4/5"}'></div>           (JSON também vale)
     <div data-rforms="moldura"><p>conteúdo</p></div>     (com conteúdo: a moldura vira a borda
                                                            do bloco, na altura que ele tiver)
     rforms.moldura(el, opts) · rforms.render(el, nome, opts) · rforms.montar(raiz)
     rforms.redesenhar() · rforms.svg(nome, opts): o SVG pronto (texto) para salvar ou levar
     ao Canva, com as medidas da peça de 1080 e o fundo transparente.

   As formas da casa
     filete     o filete duplo: dois fios de 1 px a 3 px. Opções: orientacao 'horizontal' |
                'vertical'; altura (px, no vertical); forte (o fio de cima, ou da esquerda,
                com o dobro da espessura, como na caixa); centro 'perola' (uma pérola no meio).
     moldura    a moldura de rótulo: retângulo de filete duplo com os 4 cantos recortados em
                quarto de círculo côncavo, vazado no meio. Opções: proporcao ('3/2' padrão,
                '4/5', '1', 1.5), raio (px; padrão 20 na tela e 48 na peça), forte, foto (com
                alt), recuo (espaço interno quando emoldura conteúdo; padrão raio + 16).
     selo       o lacre serrilhado (tampinha): círculo de N dentes, anel interno de filete e
                texto curto. Opções: texto (central, Gloock), arco (texto curvo em cima),
                arco2 (texto curvo embaixo), dentes (padrão 24), tamanho (px), vazado (só o
                contorno), rp (true: o monograma em arquivo no centro), base ('assets/').
     curva      a curva do R: a perna do R ampliada, um traço cheio de contraste alto que sai
                de um canto e é cortado pela borda. Opções: canto 'sd' (superior direito,
                padrão, como na caixa) | 'se' | 'id' | 'ie'; escala (0,6 a 1,6; padrão 1);
                proporcao (quando o contêiner não tem altura; padrão '4/5').
     caixinhas  os quadradinhos de marcar da caixa com rótulos. Opções: rotulos (lista ou
                lista de colunas; padrão [["1","2","3","4"],["M","F","T","A"]]); marcadas
                (rótulos marcados); orientacao 'colunas' | 'linha'.
     perolas    a fileira de pérolas da coroa, divisor. Opções: n (padrão 5), tamanho
                (diâmetro px; padrão 7), fio (true: filete duplo dos dois lados), alinhar.
     arco       os arcos da coroa, sem a cruz, como divisor ou topo de moldura. Opções: modo
                'divisor' (padrão) | 'topo'; fio (no divisor; padrão true).
     escudo     o contorno do escudo do brasão, só a moldura dupla, vazio, para emoldurar foto
                de pessoa ou um número. Nunca com RP dentro. Opções: foto, alt, numero,
                legenda, tamanho (largura px), forte.
     vapor      três linhas curvas finas subindo: quentinho. Uso raro. Opções: tamanho.
   ===================================================================== */
const rforms = (() => {
  'use strict';
  let seq = 0, seqX = 0;
  const temDoc = typeof document !== 'undefined';
  const el$ = e => (typeof e === 'string' ? (temDoc ? document.getElementById(e) : null) : e);
  const f = v => (Math.round(v * 100) / 100).toString();
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const lim = (v, a, b) => Math.max(a, Math.min(b, v));
  const nomes = ['filete', 'moldura', 'selo', 'curva', 'caixinhas', 'perolas', 'arco', 'escudo', 'vapor'];
  const APELIDO = { 'pérolas': 'perolas', perola: 'perolas', 'pérola': 'perolas', lacre: 'selo', caixinha: 'caixinhas', curva_r: 'curva', 'curva-r': 'curva', rotulo: 'moldura', brasao: 'escudo' };
  const VERDE = '#102B22', CREME = '#E2DDC8', PAPEL = '#FAF8F2';

  /* ---------- paletas da casa (HEX por extenso) ---------- */
  const PALETAS = {
    verde: { fundo: '#102B22', molho: '#BE7F43', titulo: '#E2DDC8', linha: '#2C4A3D', curva: '#173A2D' },
    papel: { fundo: '#FAF8F2', molho: '#835020', titulo: '#102B22', linha: '#DDD6C1', curva: '#E2DDC8' },
    kraft: { fundo: '#C9A67E', molho: '#102B22', titulo: '#102B22', linha: '#6D6B4F', curva: '#102B22' }
  };
  PALETAS.floresta = Object.assign({}, PALETAS.verde, { fundo: '#0B1D17', curva: '#173A2D' });
  PALETAS.mata = Object.assign({}, PALETAS.verde, { fundo: '#173A2D', curva: '#102B22' });
  PALETAS.creme = Object.assign({}, PALETAS.papel, { fundo: '#E2DDC8', linha: '#C9C2AA', curva: '#D3CBB0' });
  PALETAS.branco = Object.assign({}, PALETAS.papel, { fundo: '#FFFFFF' });
  const VARS = [['fundo', '--f-fundo'], ['molho', '--f-molho'], ['titulo', '--f-titulo'], ['linha', '--f-linha'], ['curva', '--f-curva']];

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
  function luz(h) {
    const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  const contraste = (a, b) => { const x = luz(a), y = luz(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  function completa(c, o) {
    c.escuro = luz(c.fundo) < 0.12;
    /* o tom pedido (cor) vira o traço; o resto do kit segue o campo */
    const tom = o && (o.cor || o.tom);
    c.traco = tom ? (c[tom] || hex(tom) || c.molho) : c.molho;
    /* a tinta sobre o molho cheio (texto e anel do selo): a primeira que fecha 4,5:1 */
    c.tinta = [VERDE, PAPEL, CREME].filter(x => contraste(x, c.traco) >= 4.5)[0] || (luz(c.traco) > 0.18 ? VERDE : PAPEL);
    /* o molho como texto (selo vazado, caixinhas): caramelo pequeno no escuro vira mel */
    c.molhoTxt = contraste(c.traco, c.fundo) >= 4.5 ? c.traco : (c.escuro ? '#DDA867' : c.titulo);
    return c;
  }
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
    if (o && o.campo && PALETAS[o.campo]) return completa(Object.assign({}, PALETAS[o.campo]), o);
    let c = Object.assign({}, PALETAS.papel);
    const lidos = {};
    try {
      const cs = getComputedStyle(el);
      VARS.forEach(par => { const h = hex(cs.getPropertyValue(par[1])); if (h) { c[par[0]] = h; lidos[par[0]] = 1; } });
    } catch (err) { /* sem estilo calculado: fica o papel */ }
    const real = fundoReal(el);
    if (real) c.fundo = real;
    const achada = Object.keys(PALETAS).filter(k => PALETAS[k].fundo === c.fundo)[0];
    if (achada) {
      const b = Object.assign({}, PALETAS[achada]);
      Object.keys(lidos).forEach(k => { b[k] = c[k]; });
      b.fundo = c.fundo;
      c = b;
    } else if (!lidos.molho && luz(c.fundo) < 0.12) c = Object.assign({}, PALETAS.verde, { fundo: c.fundo });
    return completa(c, o);
  }

  /* ---------- medida: tela (fio de 1 px) ou peça (2,5 unidades da peça de 1080) ---------- */
  function medida(el, o) {
    if (o.peca === false) return { e: 1, u: 1, txt: 14, peca: false };
    if (+o.peca) { const u = +o.peca / 1080; return { e: 2.5 * u, u, txt: 26 * u, peca: true }; }
    try {
      const peca = el.closest && el.closest('.peca');
      if (peca) {
        const cs = getComputedStyle(peca.closest('.mock') || peca);
        const base = parseFloat(cs.getPropertyValue('--base')) || 1080;
        const u = peca.getBoundingClientRect().width / base;
        if (u > 0) return { e: Math.max(0.75, 2.5 * u), u, txt: Math.max(9, 26 * u), peca: true };
      }
    } catch (err) { /* fora da peça */ }
    return { e: 1, u: 1, txt: 14, peca: false };
  }
  function razao(v, padrao) {
    if (v == null || v === '') return padrao;
    if (typeof v === 'number') return v > 0 ? v : padrao;
    const m = String(v).match(/^\s*([\d.]+)\s*[/:x]\s*([\d.]+)\s*$/);
    if (m && +m[2] > 0) return +m[1] / +m[2];
    const n = parseFloat(v);
    return n > 0 ? n : padrao;
  }

  /* ---------- primitivas ---------- */
  const linha = (x1, y1, x2, y2, cor, w) => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${cor}" stroke-width="${f(w)}"/>`;
  const perola = (cx, cy, r, cor, extra) => `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="${cor}"${extra || ''}/>`;
  const traco = (d, cor, w, extra) => `<path d="${d}" fill="none" stroke="${cor}" stroke-width="${f(w)}"${extra || ''}/>`;
  /* curva suave por pontos (Catmull-Rom em cúbicas) */
  function suave(pts, fechada) {
    const n = pts.length;
    if (n < 2) return '';
    const P = i => (fechada ? pts[(i + n) % n] : pts[lim(i, 0, n - 1)]);
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    const fim = fechada ? n : n - 1;
    for (let i = 0; i < fim; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + (fechada ? 'Z' : '');
  }
  /* a moldura de rótulo: retângulo com os 4 cantos em quarto de círculo CÔNCAVO de raio r,
     recuado d para dentro (a linha de dentro do filete duplo é a mesma forma deslocada:
     arcos com centro no canto original e raio r + d) */
  function rotuloPath(x0, y0, x1, y1, r, d) {
    d = d || 0;
    const R = r + d, q = Math.sqrt(Math.max(0, R * R - d * d));
    const a = (x, y) => `A${f(R)} ${f(R)} 0 0 0 ${f(x)} ${f(y)}`;
    return `M${f(x0 + q)} ${f(y0 + d)}H${f(x1 - q)}${a(x1 - d, y0 + q)}V${f(y1 - q)}${a(x1 - q, y1 - d)}H${f(x0 + q)}${a(x0 + d, y1 - q)}V${f(y0 + q)}${a(x0 + q, y0 + d)}Z`;
  }
  /* o escudo do brasão: topo levemente côncavo, lados retos, base em ogiva até a ponta */
  function escudoPath(x0, y0, x1, y1) {
    const w = x1 - x0, h = y1 - y0, cx = (x0 + x1) / 2;
    const q = 0.58;
    return `M${f(x0)} ${f(y0)}Q${f(cx)} ${f(y0 + w * 0.13)} ${f(x1)} ${f(y0)}` +
      `L${f(x1)} ${f(y0 + h * q)}C${f(x1)} ${f(y0 + h * 0.80)} ${f(x0 + w * 0.70)} ${f(y0 + h * 0.91)} ${f(cx)} ${f(y1)}` +
      `C${f(x0 + w * 0.30)} ${f(y0 + h * 0.91)} ${f(x0)} ${f(y0 + h * 0.80)} ${f(x0)} ${f(y0 + h * q)}Z`;
  }

  /* ---------- medição de texto ---------- */
  const cacheTxt = new Map();
  let medidor = null;
  function mede(txt, estilo) {
    const k = estilo + '|' + txt;
    if (cacheTxt.has(k)) return cacheTxt.get(k);
    let w = 0;
    try {
      if (temDoc && document.body) {
        if (!medidor || !medidor.isConnected) {
          const NS = 'http://www.w3.org/2000/svg';
          medidor = document.createElementNS(NS, 'svg');
          medidor.setAttribute('aria-hidden', 'true');
          medidor.style.cssText = 'position:absolute;left:0;top:0;width:1px;height:1px;overflow:hidden;visibility:hidden;pointer-events:none';
          medidor.appendChild(document.createElementNS(NS, 'text'));
          document.body.appendChild(medidor);
        }
        const t = medidor.firstChild;
        t.setAttribute('style', estilo);
        t.textContent = txt;
        w = t.getComputedTextLength();
      }
    } catch (err) { w = 0; }
    if (!w) { const m = estilo.match(/font-size:([\d.]+)px/); w = String(txt).length * 0.58 * (m ? +m[1] : 16); }
    cacheTxt.set(k, w);
    return w;
  }
  const GL = tam => `font-family:'Gloock','DM Serif Display',Georgia,serif;font-weight:400;font-size:${f(tam)}px`;
  const SS = (tam, peso, ls) => `font-family:'Source Sans 3','Source Sans Pro',Arial,sans-serif;font-weight:${peso || 600};font-size:${f(tam)}px` + (ls ? `;letter-spacing:${f(ls)}px` : '');
  const texto = (x, y, t, estilo, cor, anc) => `<text x="${f(x)}" y="${f(y)}"${anc ? ` text-anchor="${anc}"` : ''} fill="${cor}" style="${estilo}">${esc(t)}</text>`;

  /* =========================================================== AS FORMAS
     Cada uma recebe (W, H disponíveis, c cores, o opções, m medida, id) e devolve
     { w, h, s, defs?, aria? }. */
  const formas = {};

  formas.filete = (W, H, c, o, m) => {
    const lw = m.e, g = 3 * m.e, lw1 = o.forte ? 2 * lw : lw, esp = lw1 + g + lw;
    const vert = o.orientacao === 'vertical';
    const comp = vert ? (+o.altura || H || 120) : W;
    let s = '';
    const segs = [];
    if (o.centro === 'perola') {
      const r = 3.5 * (m.peca ? m.u * 2.5 : 1), vao = r + 8 * m.e;
      segs.push([0, comp / 2 - vao], [comp / 2 + vao, comp]);
      s += vert ? perola(esp / 2, comp / 2, r, c.traco) : perola(comp / 2, esp / 2, r, c.traco);
    } else segs.push([0, comp]);
    segs.forEach(sg => {
      if (vert) s += linha(lw1 / 2, sg[0], lw1 / 2, sg[1], c.traco, lw1) + linha(esp - lw / 2, sg[0], esp - lw / 2, sg[1], c.traco, lw);
      else s += linha(sg[0], lw1 / 2, sg[1], lw1 / 2, c.traco, lw1) + linha(sg[0], esp - lw / 2, sg[1], esp - lw / 2, c.traco, lw);
    });
    return vert ? { w: esp, h: comp, s, fixo: true } : { w: W, h: esp, s };
  };

  formas.moldura = (W, H, c, o, m, id) => {
    const lw = m.e, g = 3 * m.e, lw1 = o.forte ? 2 * lw : lw;
    const h = H || W / razao(o.proporcao, 3 / 2);
    const r = Math.min(+o.raio || (m.peca ? 48 * m.u : 20), W * 0.2, h * 0.2);
    const a = lw1 / 2;
    let s = traco(rotuloPath(a, a, W - a, h - a, r, 0), c.traco, lw1, ' stroke-linejoin="miter"');
    const d2 = lw1 + g + lw / 2;
    s += traco(rotuloPath(a, a, W - a, h - a, r, d2 - a), c.traco, lw, ' stroke-linejoin="miter"');
    let defs = '';
    if (o.foto) {
      const dd = d2 + lw / 2 + g;
      defs = `<clipPath id="${id}-c"><path d="${rotuloPath(a, a, W - a, h - a, r, dd)}"/></clipPath>`;
      s = `<image href="${esc(o.foto)}" x="0" y="0" width="${f(W)}" height="${f(h)}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id}-c)"${o.alt ? '' : ''}/>` + s;
    }
    return { w: W, h, s, defs, aria: o.foto ? (o.alt || 'Foto') : null };
  };

  formas.selo = (W, H, c, o, m, id) => {
    const S = Math.min(+o.tamanho || (m.peca ? 240 * m.u : 168), W);
    const C = S / 2, Ro = S / 2 - m.e, N = lim(Math.round(+o.dentes || 24), 12, 60);
    const a = Ro * 0.055;
    const pts = [];
    const k = 10;
    for (let i = 0; i < N * k; i++) {
      const t = (i / (N * k)) * Math.PI * 2;
      const r = Ro - a * (1 - Math.cos(N * t)) / 2;
      pts.push([C + r * Math.sin(t), C - r * Math.cos(t)]);
    }
    const borda = suave(pts, true);
    const vaz = !!o.vazado;
    const tinta = vaz ? c.traco : c.tinta, tintaTxt = vaz ? c.molhoTxt : c.tinta;
    let s = vaz ? traco(borda, c.traco, m.e * 1.5, ' stroke-linejoin="round"') : `<path d="${borda}" fill="${c.traco}"/>`;
    const Ri = Ro - a - S * 0.06, lw = Math.max(0.75, m.e * (S / 168) * 0.9), g = 3 * lw;
    s += `<circle cx="${f(C)}" cy="${f(C)}" r="${f(Ri)}" fill="none" stroke="${tinta}" stroke-width="${f(lw)}"/>`;
    s += `<circle cx="${f(C)}" cy="${f(C)}" r="${f(Ri - lw - g)}" fill="none" stroke="${tinta}" stroke-width="${f(lw)}"/>`;
    const Rin = Ri - lw - g - lw / 2;
    let defs = '';
    const tamA = S * 0.078;
    const temA = o.arco != null && o.arco !== '', temB = o.arco2 != null && o.arco2 !== '';
    /* o texto curvo cabe em cerca de 140° do arco: se passar, o corpo diminui (até 7,2% do selo; arco com até 18 letras) */
    const cabeArco = (txt, R) => {
      const est = t => SS(t, 600, t * 0.18);
      let t = tamA;
      const w = mede(txt, est(t)), disp = R * Math.PI * 0.76;
      if (w > disp) t = Math.max(S * 0.072, t * disp / w);
      return t;
    };
    if (temA) {
      const tA = cabeArco(String(o.arco).toUpperCase(), Rin - S * 0.035 - tamA * 0.7);
      const Rt = Rin - S * 0.035 - tA * 0.7;
      defs += `<path id="${id}-a" d="M${f(C - Rt)} ${f(C)}A${f(Rt)} ${f(Rt)} 0 0 1 ${f(C + Rt)} ${f(C)}"/>`;
      s += `<text fill="${tintaTxt}" style="${SS(tA, 600, tA * 0.18)}" text-anchor="middle"><textPath href="#${id}-a" startOffset="50%">${esc(String(o.arco).toUpperCase())}</textPath></text>`;
    }
    if (temB) {
      const Rb = Rin - S * 0.035, tB = cabeArco(String(o.arco2).toUpperCase(), Rb);
      defs += `<path id="${id}-b" d="M${f(C - Rb)} ${f(C)}A${f(Rb)} ${f(Rb)} 0 0 0 ${f(C + Rb)} ${f(C)}"/>`;
      s += `<text fill="${tintaTxt}" style="${SS(tB, 600, tB * 0.18)}" text-anchor="middle"><textPath href="#${id}-b" startOffset="50%">${esc(String(o.arco2).toUpperCase())}</textPath></text>`;
    }
    if (temA || temB) {
      const rp = S * 0.016, xr = Rin - S * 0.06;
      s += perola(C - xr, C, rp, tinta) + perola(C + xr, C, rp, tinta);
    }
    const livre = (temA || temB) ? (Rin - S * 0.14) * 2 * 0.86 : Rin * 2 * 0.78;
    if (o.rp) {
      const cor = o.rpCor || (vaz ? (c.escuro ? 'caramelo' : 'verde') : (tinta === VERDE ? 'verde' : 'creme'));
      const lado = (temA || temB) ? livre * 0.62 : Rin * 1.15;
      s += `<image href="${esc((o.base == null ? 'assets/' : o.base) + 'royal-monograma-' + cor + '.svg')}" x="${f(C - lado / 2)}" y="${f(C - lado / 2)}" width="${f(lado)}" height="${f(lado)}" preserveAspectRatio="xMidYMid meet"/>`;
    } else if (o.texto != null && o.texto !== '') {
      const txt = String(o.texto);
      let tam = S * ((temA || temB) ? 0.17 : 0.2);
      const pal = txt.split(/\s+/);
      let linhas = [txt];
      if (mede(txt, GL(tam)) > livre && pal.length > 1) {
        const meio = Math.ceil(pal.length / 2);
        linhas = [pal.slice(0, meio).join(' '), pal.slice(meio).join(' ')];
      }
      const maior = Math.max(...linhas.map(l => mede(l, GL(tam))));
      if (maior > livre) tam = tam * livre / maior;
      const lh = tam * 1.02, y0 = C - (linhas.length - 1) * lh / 2 + tam * 0.34;
      linhas.forEach((l, i) => { s += texto(C, y0 + i * lh, l, GL(tam), tintaTxt, 'middle'); });
    }
    const aria = [o.arco, o.texto, o.arco2].filter(x => x != null && x !== '').join(' · ') || (o.rp ? 'Selo Royal Parma' : null);
    return { w: S, h: S, s, defs, aria, fixo: true };
  };

  /* a curva do R: traço de pena larga ao longo de uma espinha cúbica, grosso na saída
     (cortado pela borda) e afinando até um fio na ponta, como a perna do R do monograma */
  formas.curva = (W, H, c, o) => {
    const h = H || W / razao(o.proporcao, 4 / 5);
    const U = lim(+o.escala || 1, 0.4, 2) * Math.max(W, h) * 0.98;
    const canto = String(o.canto || 'sd');
    const mx = canto.charAt(1) === 'e' ? -1 : 1, my = canto.charAt(0) === 'i' ? -1 : 1;
    const ax = mx > 0 ? W : 0, ay = my > 0 ? 0 : h;
    /* a espinha (x para a esquerda é negativo), em unidades de U a partir do canto */
    const E = [[-0.15, -0.16], [-0.14, 0.34], [-0.28, 0.66], [-0.72, 0.84]];
    const bez = (t, k) => { const u = 1 - t; return u * u * u * E[0][k] + 3 * u * u * t * E[1][k] + 3 * u * t * t * E[2][k] + t * t * t * E[3][k]; };
    const der = (t, k) => { const u = 1 - t; return 3 * u * u * (E[1][k] - E[0][k]) + 6 * u * t * (E[2][k] - E[1][k]) + 3 * t * t * (E[3][k] - E[2][k]); };
    /* espessura: cheia na saída, contraste de serifa (pena larga a 20°) e afinando sem
       degrau (curva de cosseno) até virar fio na ponta */
    const Wm = 0.34;
    const larg = t => {
      const dx = der(t, 0), dy = der(t, 1), ang = Math.atan2(dy, dx);
      const pena = 0.9 + 0.1 * Math.abs(Math.sin(ang - 0.35));
      const afina = Math.pow(Math.cos(t * Math.PI / 2), 1.25);
      return Wm * afina * pena + 0.002;
    };
    const dentro = [], fora = [];
    const N = 64;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const x = bez(t, 0), y = bez(t, 1);
      let dx = der(t, 0), dy = der(t, 1);
      const n = Math.hypot(dx, dy) || 1; dx /= n; dy /= n;
      const w = larg(t);
      /* o lado de dentro (côncavo) fica mais perto da espinha: o peso vai para fora */
      dentro.push([x - dy * w * 0.3, y + dx * w * 0.3]);
      fora.push([x + dy * w * 0.7, y - dx * w * 0.7]);
    }
    const tr = p => [ax + mx * p[0] * U, ay + my * p[1] * U];
    const ponta = tr([bez(1, 0) - 0.012, bez(1, 1) + 0.002]);
    /* contorno aberto e suave; o fechamento é uma reta fora da área visível (o corte da borda) */
    const pts = dentro.map(tr).concat([ponta]).concat(fora.reverse().map(tr));
    return { w: W, h, s: `<path d="${suave(pts, false)}Z" fill="${o.cor ? c.traco : c.curva}"/>`, clip: true };
  };

  formas.caixinhas = (W, H, c, o, m) => {
    let cols = o.rotulos || [['1', '2', '3', '4'], ['M', 'F', 'T', 'A']];
    if (!Array.isArray(cols[0])) cols = o.orientacao === 'colunas' ? [cols] : cols.map(x => [x]);
    const emLinha = o.orientacao === 'linha' || (!Array.isArray((o.rotulos || [[]])[0]) && o.orientacao !== 'colunas');
    const marcadas = (o.marcadas || []).map(String);
    const q = m.peca ? 30 * m.u : 18, lw = m.peca ? m.e : 1.25, fs = m.txt, gapY = q * 0.6;
    const est = SS(fs, 600, fs * 0.12);
    const largCol = cols.map(col => q + q * 0.5 + Math.max(...col.map(t => mede(String(t).toUpperCase(), est))));
    const gapX = q * 1.4;
    let s = '', x = lw / 2, hMax = 0;
    const caixa = (x0, y0, t) => {
      const mk = marcadas.indexOf(String(t)) >= 0;
      let r = `<rect x="${f(x0)}" y="${f(y0)}" width="${f(q)}" height="${f(q)}" fill="none" stroke="${c.traco}" stroke-width="${f(lw)}"/>`;
      if (mk) r += `<path d="M${f(x0 + q * 0.22)} ${f(y0 + q * 0.52)}L${f(x0 + q * 0.42)} ${f(y0 + q * 0.72)}L${f(x0 + q * 0.8)} ${f(y0 + q * 0.28)}" fill="none" stroke="${c.traco}" stroke-width="${f(lw * 1.6)}" stroke-linecap="round" stroke-linejoin="round"/>`;
      r += texto(x0 + q * 1.5, y0 + q * 0.5 + fs * 0.35, String(t).toUpperCase(), est, c.titulo);
      return r;
    };
    if (emLinha) {
      const itens = [].concat(...cols);
      let lx = lw / 2, ly = lw / 2;
      itens.forEach(t => {
        const iw = q * 1.5 + mede(String(t).toUpperCase(), est);
        if (lx > lw && lx + iw > W) { lx = lw / 2; ly += q + gapY; }
        s += caixa(lx, ly, t);
        lx += iw + gapX;
      });
      return { w: W, h: ly + q + lw, s, aria: o.aria || null };
    }
    cols.forEach((col, k) => {
      col.forEach((t, i) => { s += caixa(x, lw / 2 + i * (q + gapY), t); });
      hMax = Math.max(hMax, col.length * (q + gapY) - gapY + lw);
      x += largCol[k] + gapX;
    });
    return { w: Math.min(W, x - gapX + lw), h: hMax, s, fixo: true };
  };

  formas.perolas = (W, H, c, o, m) => {
    const n = lim(Math.round(+o.n || 5), 1, 40);
    const r = ((+o.tamanho || (m.peca ? 16 * m.u : 7)) / 2), gap = r * 3.4;
    const larg = (n - 1) * gap;
    const h = r * 2 + 2;
    const x0 = o.alinhar === 'esquerda' ? r + 1 : (W - larg) / 2;
    let s = '';
    for (let i = 0; i < n; i++) s += perola(x0 + i * gap, h / 2, r, c.traco);
    if (o.fio) {
      const lw = m.e, g = 3 * m.e, y = h / 2 - (lw * 2 + g) / 2, vao = r * 3;
      const lado = (a, b) => linha(a, y + lw / 2, b, y + lw / 2, c.traco, lw) + linha(a, y + lw * 1.5 + g, b, y + lw * 1.5 + g, c.traco, lw);
      if (o.alinhar !== 'esquerda') s += lado(0, x0 - vao);
      s += lado(x0 + larg + vao, W);
    }
    return { w: W, h, s };
  };

  /* os arcos da coroa (sem a cruz): três arcos lado a lado sobre a faixa, o do meio mais
     alto, uma pérola no topo de cada arco e nas junções */
  formas.arco = (W, H, c, o, m) => {
    const topo = o.modo === 'topo';
    const lw = m.e, g = 3 * m.e;
    const A = topo ? Math.min(W * 0.44, m.peca ? 520 * m.u : 260) : Math.min(W * 0.5, m.peca ? 240 * m.u : 120);
    const hA = A * 0.3, rp = Math.max(1.8, A * 0.026);
    const by = hA + rp * 3.4 + 1, h = by + lw * 2 + g + 1;
    const cx = W / 2, x0 = cx - A / 2, x1 = cx + A / 2, t = A / 3;
    const xa = x0 + t, xb = x0 + 2 * t, hl = hA * 0.6;
    const arco = (xi, xf, alt) => `M${f(xi)} ${f(by)}A${f((xf - xi) / 2)} ${f(alt)} 0 0 1 ${f(xf)} ${f(by)}`;
    let s = traco(arco(x0, xa, hl) + arco(xa, xb, hA) + arco(xb, x1, hl), c.traco, lw * 1.25, ' stroke-linecap="butt"');
    /* o arco de dentro, paralelo ao do meio: o filete duplo também na coroa */
    const d = lw * 1.25 + g;
    s += traco(`M${f(xa + d)} ${f(by)}A${f(t / 2 - d)} ${f(hA - d)} 0 0 1 ${f(xb - d)} ${f(by)}`, c.traco, lw);
    s += perola(cx, by - hA - rp * 2, rp * 1.3, c.traco);
    s += perola(x0 + t / 2, by - hl - rp * 1.8, rp, c.traco) + perola(x1 - t / 2, by - hl - rp * 1.8, rp, c.traco);
    const fio = topo || o.fio !== false;
    const fx0 = fio ? 0 : x0 - t * 0.2, fx1 = fio ? W : x1 + t * 0.2;
    s += linha(fx0, by + lw / 2, fx1, by + lw / 2, c.traco, lw) + linha(fx0, by + lw * 1.5 + g, fx1, by + lw * 1.5 + g, c.traco, lw);
    return { w: W, h, s };
  };

  formas.escudo = (W, H, c, o, m, id) => {
    const larg = Math.min(+o.tamanho || (m.peca ? 420 * m.u : 220), W);
    const h = H && o.__conteudo ? H : larg * 1.2;
    const lw = m.e * (o.forte ? 2 : 1.25), lw2 = m.e, g = 3 * m.e;
    const a = lw / 2;
    let s = traco(escudoPath(a, a, larg - a, h - a), c.traco, lw, ' stroke-linejoin="miter" stroke-miterlimit="8"');
    const d = lw + g + lw2 / 2;
    const inner = escudoPath(d, d * 1.15, larg - d, h - d * 1.75);
    s += traco(inner, c.traco, lw2, ' stroke-linejoin="miter" stroke-miterlimit="8"');
    let defs = '', aria = null;
    if (o.foto) {
      const dd = d + lw2 / 2 + g;
      defs = `<clipPath id="${id}-c"><path d="${escudoPath(dd, dd * 1.15, larg - dd, h - dd * 1.75)}"/></clipPath>`;
      s = `<image href="${esc(o.foto)}" x="0" y="0" width="${f(larg)}" height="${f(h)}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id}-c)"/>` + s;
      aria = o.alt || 'Foto';
    } else if (o.numero != null && o.numero !== '') {
      const num = String(o.numero);
      let tam = larg * 0.4;
      const disp = larg * 0.66, nw = mede(num, GL(tam));
      if (nw > disp) tam *= disp / nw;
      s += texto(larg / 2, h * 0.47 + tam * 0.34, num, GL(tam), c.titulo, 'middle');
      if (o.legenda) {
        const ft = Math.max(13, larg * 0.058), est = SS(ft, 600, ft * 0.16);
        const leg = String(o.legenda).toUpperCase();
        let ftx = ft;
        if (mede(leg, est) > larg * 0.6) ftx = ft * larg * 0.6 / mede(leg, est);
        s += texto(larg / 2 + ftx * 0.08, h * 0.47 + tam * 0.34 + ftx * 2.1, leg, SS(Math.max(ftx, 11), 600, ftx * 0.16), c.molhoTxt, 'middle');
      }
      aria = num + (o.legenda ? ' ' + o.legenda : '');
    }
    return { w: larg, h, s, defs, aria, fixo: true };
  };

  formas.vapor = (W, H, c, o, m) => {
    const S = Math.min(+o.tamanho || (m.peca ? 200 * m.u : 96), W);
    const lw = m.e * 1.5;
    const fio = (x, alto, fase) => {
      const y0 = S - lw, y1 = S * (1 - alto), amp = S * 0.07 * fase;
      const pts = [];
      for (let i = 0; i <= 24; i++) {
        const t = i / 24, y = y0 + (y1 - y0) * t;
        pts.push([x + amp * Math.sin(t * Math.PI * 2.1) * (0.4 + 0.6 * t), y]);
      }
      return traco(suave(pts, false), c.traco, lw, ' stroke-linecap="round"');
    };
    const s = fio(S * 0.3, 0.72, 1) + fio(S * 0.5, 0.94, -1) + fio(S * 0.7, 0.72, 1);
    return { w: S, h: S, s, fixo: true };
  };

  /* ---------- entrada discreta (respeita prefers-reduced-motion) ---------- */
  function semMovimento() {
    try {
      if (typeof navigator !== 'undefined' && navigator.webdriver) return true;
      return !window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('print').matches;
    } catch (err) { return true; }
  }
  let io = null;
  function animaQuando(t, o) {
    if (o.animar === false || api.animar === false || !temDoc || semMovimento() || t.__rfVisto) return;
    if (typeof IntersectionObserver === 'undefined' || !Element.prototype.animate) return;
    if (!io) io = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      en.target.__rfVisto = 1;
      const s = en.target.querySelector(':scope > svg, :scope > .rforms-camada > svg');
      try { if (s) s.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 640, easing: 'ease-out', fill: 'backwards' }); } catch (err) { /* ok */ }
    }), { rootMargin: '0px 0px -6% 0px', threshold: 0 });
    io.observe(t);
  }

  /* ---------- montagem ---------- */
  const registro = new Set();
  let ro = null, espera = 0;
  const tamanhos = new WeakMap();
  function observa(t) {
    if (!ro && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(es => {
        let mudou = false;
        es.forEach(en => {
          const k = Math.round(en.contentRect.width) + 'x' + (en.target.__rfCamada ? Math.round(en.contentRect.height) : '');
          if (tamanhos.get(en.target) !== k) { tamanhos.set(en.target, k); mudou = true; }
        });
        if (!mudou) return;
        clearTimeout(espera); espera = setTimeout(redesenhar, 120);
      });
    }
    if (ro && !tamanhos.has(t)) { tamanhos.set(t, Math.round(t.clientWidth || 0) + 'x' + (t.__rfCamada ? Math.round(t.clientHeight || 0) : '')); ro.observe(t); }
  }
  /* o SVG completo (com título e descrição quando a forma diz algo) */
  function montaSvg(r, nome, o, id, dims) {
    const rot = o.aria || r.aria;
    const a11y = rot ? `role="img" aria-labelledby="${id}-t"` : 'aria-hidden="true"';
    const tit = rot ? `<title id="${id}-t">${esc(rot)}</title>` + (o.desc ? `<desc>${esc(o.desc)}</desc>` : '') : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" id="${id}" data-rforms="${nome}"${dims || ''} viewBox="0 0 ${f(r.w)} ${f(r.h)}" ${a11y} focusable="false"` +
      `${r.estilo ? ` style="${r.estilo}"` : ''}>${tit}${r.defs ? '<defs>' + r.defs + '</defs>' : ''}${r.s}</svg>`;
  }
  const temConteudo = t => Array.prototype.some.call(t.childNodes, n => (n.nodeType === 1 && !(n.classList && n.classList.contains('rforms-camada'))) || (n.nodeType === 3 && n.textContent.trim()));
  function wrap(e, nome, o) {
    const t = el$(e); if (!t) return null;
    if (!t.__rfId) t.__rfId = 'rf' + (++seq);
    const id = t.__rfId;
    const c = cores(t, o), m = medida(t, o);
    /* moldura e escudo com conteúdo: a forma vira a borda do bloco, numa camada por trás */
    if (t.__rfCamada == null) t.__rfCamada = (nome === 'moldura' || nome === 'escudo') && o.conteudo !== false && temConteudo(t);
    if (t.__rfCamada) {
      try { if (getComputedStyle(t).position === 'static') t.style.position = 'relative'; } catch (err) { /* ok */ }
      if (!t.__rfPad) {
        t.__rfPad = 1;
        const r = +o.raio || (m.peca ? 48 * m.u : 20);
        const rec = o.recuo != null ? +o.recuo : (nome === 'escudo' ? 0 : r + 16 * m.e);
        try { if (!parseFloat(getComputedStyle(t).paddingTop)) t.style.padding = rec + 'px'; } catch (err) { /* ok */ }
      }
      const W = t.offsetWidth || 300, H = t.offsetHeight || 200;
      const r = formas[nome](W, H, c, Object.assign({ __conteudo: true }, o, nome === 'escudo' ? { tamanho: W } : {}), m, id);
      let camada = t.querySelector(':scope > .rforms-camada');
      if (!camada) {
        camada = document.createElement('span');
        camada.className = 'rforms-camada';
        camada.setAttribute('aria-hidden', 'true');
        camada.style.cssText = 'position:absolute;inset:0;pointer-events:none;display:block';
        t.insertBefore(camada, t.firstChild);
      }
      r.estilo = 'position:absolute;inset:0;width:100%;height:100%;display:block;overflow:visible';
      camada.innerHTML = montaSvg(r, nome, Object.assign({}, o, { aria: null }), id, ' preserveAspectRatio="none"');
    } else {
      let W = 0;
      try { W = t.clientWidth; } catch (err) { W = 0; }
      if (!(W > 0)) W = 320;
      let H = 0;
      if (nome === 'curva' && !o.proporcao) { const ch = t.clientHeight; if (ch > 4) H = ch; }
      if (nome === 'filete' && o.orientacao === 'vertical' && !o.altura) { const ch = t.clientHeight; if (ch > 4) H = ch; }
      const r = formas[nome](W, H, c, o, m, id);
      r.estilo = r.fixo ? `width:${f(r.w)}px;max-width:100%;height:auto;display:block;overflow:visible`
        : `width:100%;height:auto;display:block;overflow:${r.clip ? 'hidden' : 'visible'}`;
      t.innerHTML = montaSvg(r, nome, o, id);
    }
    t.__rforms = { nome, opts: o };
    registro.add(t);
    observa(t);
    animaQuando(t, o);
    return t;
  }

  const api = {};
  nomes.forEach(nome => { api[nome] = (e, o) => wrap(e, nome, o || {}); });
  const nomeDe = n => { n = String(n == null ? '' : n).trim(); const b = n.toLowerCase(); return formas[b] ? b : (APELIDO[b] || n); };
  function render(e, nome, o) {
    const n = nomeDe(nome);
    if (formas[n]) return wrap(e, n, Object.assign({}, o || {}));
    if (typeof console !== 'undefined') console.error('rforms: forma desconhecida "' + nome + '". As formas da casa: ' + nomes.join(', ') + '.');
    return null;
  }
  /* SVG pronto (texto), fora da página, para salvar ou importar no Canva: fundo transparente,
     cores da paleta pedida (padrão: verde) e as medidas da peça de 1080 (fio de 2,5 px). */
  const PADRAO = { filete: 936, moldura: 936, selo: 360, curva: 1080, caixinhas: 600, perolas: 480, arco: 936, escudo: 420, vapor: 220 };
  function svg(nome, o) {
    o = Object.assign({ campo: 'verde' }, o || {});
    const n = nomeDe(nome);
    if (!formas[n]) return '';
    const c = completa(Object.assign({}, PALETAS[o.campo] || PALETAS.verde), o);
    const id = 'rfx' + (++seqX);
    const W = +o.largura || PADRAO[n];
    const m = { e: 2.5, u: 1, txt: 26, peca: true };
    const oo = Object.assign({}, o);
    if (n === 'selo' && !oo.tamanho) oo.tamanho = W;
    if (n === 'escudo' && !oo.tamanho) oo.tamanho = W;
    if (n === 'vapor' && !oo.tamanho) oo.tamanho = W;
    if (n === 'curva' && !oo.proporcao) oo.proporcao = '4/5';
    const r = formas[n](W, n === 'filete' && oo.orientacao === 'vertical' ? (+oo.altura || 600) : 0, c, oo, m, id);
    return montaSvg(r, n, oo, id, ` width="${Math.round(r.w)}" height="${Math.round(r.h)}"`);
  }
  function montar(raiz) {
    if (!temDoc) return;
    (raiz || document).querySelectorAll('[data-rforms]').forEach(el => {
      if (el.__rformsMontado || el.tagName.toLowerCase() === 'svg') return;
      const v = el.getAttribute('data-rforms').trim();
      let cfg = { forma: v };
      if (v.charAt(0) === '{') { try { cfg = JSON.parse(v); } catch (err) { console.error('rforms: data-rforms não é JSON válido', el); return; } }
      const extra = el.getAttribute('data-rforms-opts');
      if (extra) { try { cfg = Object.assign(cfg, JSON.parse(extra)); } catch (err) { console.error('rforms: data-rforms-opts não é JSON válido', el); return; } }
      el.__rformsMontado = 1;
      render(el, cfg.forma, cfg);
    });
  }
  function redesenhar() {
    registro.forEach(t => {
      if (!t.isConnected) { registro.delete(t); return; }
      const c = t.__rforms;
      if (c) wrap(t, c.nome, c.opts);
    });
  }
  if (typeof window !== 'undefined' && temDoc) {
    window.addEventListener('beforeprint', redesenhar);
    try {
      if (document.fonts) {
        const comTexto = () => { cacheTxt.clear(); redesenhar(); };
        document.fonts.ready.then(comTexto);
        document.fonts.addEventListener('loadingdone', comTexto);
      }
    } catch (err) { /* sem API de fontes */ }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => montar());
    else montar();
  }
  return Object.assign(api, { render, montar, redesenhar, svg, paletas: PALETAS, formas: nomes.slice(), animar: true, version: '1.0' });
})();
if (typeof window !== 'undefined') window.rforms = rforms;
