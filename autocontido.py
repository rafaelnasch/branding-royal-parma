#!/usr/bin/env python3
"""Gera a versão AUTOCONTIDA de um HTML da skill: um arquivo único que abre
sozinho (e-mail, WhatsApp, Drive, celular, claude.ai), sem a pasta assets/
e sem rviz.js/rforms.js ao lado.

O que faz:
1. cola rviz.js e rforms.js dentro do próprio HTML;
2. guarda cada imagem de assets/ UMA vez, em data URI, num dicionário no <head>;
3. um script troca todo src/href/srcset que começa com "assets/" pela imagem
   embutida, inclusive nos elementos que os motores criam depois;
4. url(assets/...) do CSS vira data URI direto;
5. embute as fontes do Google Fonts (Gloock, Playfair Display e Source Sans 3) em
   woff2, só os alfabetos latin e latin-ext, dentro da própria <style>: o arquivo
   aberto sem internet (WhatsApp, e-mail) continua com as letras certas. Os woff2
   ficam guardados em assets/fontes/ e servem de reserva quando não há internet.
   As três fontes têm licença SIL Open Font License (podem ser distribuídas).
Blocos <template> e textos de código não são alterados.

Uso (só Python padrão):
  python3 autocontido.py                      # gera dist/ com os três arquivos
  python3 autocontido.py meu-material.html    # gera dist/meu-material.html
"""
import base64, hashlib, json, mimetypes, os, re, sys, urllib.request

RAIZ = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(RAIZ, "dist")
PADRAO = {"brand-book.html": "brand-book-royal-parma.html",
          "deck-template.html": "apresentacao-royal-parma.html",
          "lockup.html": "assinaturas-royal-parma.html"}
RE_ASSET = re.compile(r"assets/[A-Za-z0-9_./-]+?\.(?:png|jpe?g|svg|webp|gif)")
FONTES = os.path.join(RAIZ, "assets", "fontes")
RE_LINK_FONTES = re.compile(r'<link\b[^>]*href="(https://fonts\.googleapis\.com/css2\?[^"]+)"[^>]*>\n?')
RE_PRECONNECT = re.compile(r'<link rel="preconnect" href="https://fonts\.(?:googleapis|gstatic)\.com"[^>]*>\n?')
ALFABETOS = ("latin", "latin-ext")
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"


def baixa(url, timeout=30):
    return urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=timeout).read()


def fontes_embutidas(url):
    """CSS com @font-face em data URI (woff2, latin e latin-ext), ou None se não der.
    Pesos que usam o mesmo arquivo (fonte variável) viram um @font-face só, com faixa de peso."""
    url = url.replace("&amp;", "&")
    os.makedirs(FONTES, exist_ok=True)
    guardado = os.path.join(FONTES, "google-%s.css" % hashlib.sha1(url.encode()).hexdigest()[:10])
    try:
        css = baixa(url, 20).decode("utf-8")
        open(guardado, "w", encoding="utf-8").write(css)
    except Exception as erro:
        if not os.path.isfile(guardado):
            print("aviso: sem internet e sem cópia em assets/fontes/; as fontes continuam pelo link do Google (%s)" % erro)
            return None
        css = open(guardado, encoding="utf-8").read()
    grupos, ordem = {}, []
    for alfabeto, corpo in re.findall(r"/\*\s*([a-z-]+)\s*\*/\s*@font-face\s*\{([^}]*)\}", css):
        if alfabeto not in ALFABETOS:
            continue
        prop = dict((k.strip(), v.strip()) for k, v in re.findall(r"([a-z-]+)\s*:\s*([^;]+);", corpo))
        fonte = re.search(r"url\((https://fonts\.gstatic\.com/[^)]+)\)", prop.get("src", ""))
        if not fonte:
            continue
        chave = (prop.get("font-family"), prop.get("font-style"), fonte.group(1), prop.get("unicode-range"))
        if chave not in grupos:
            grupos[chave] = {"pesos": [], "alfabeto": alfabeto}
            ordem.append(chave)
        grupos[chave]["pesos"].append(int(prop.get("font-weight", "400").split()[0]))
    saida = []
    for chave in ordem:
        familia, estilo, link, faixa = chave
        local = os.path.join(FONTES, os.path.basename(link))
        try:
            if not os.path.isfile(local):
                open(local, "wb").write(baixa(link))
        except Exception as erro:
            print("aviso: não baixou %s (%s); as fontes continuam pelo link do Google" % (link, erro))
            return None
        pesos = sorted(set(grupos[chave]["pesos"]))
        peso = str(pesos[0]) if len(pesos) == 1 else "%d %d" % (pesos[0], pesos[-1])
        dado = base64.b64encode(open(local, "rb").read()).decode()
        saida.append("/* %s */\n@font-face{font-family:%s;font-style:%s;font-weight:%s;font-display:swap;"
                     "src:url(data:font/woff2;base64,%s) format('woff2');unicode-range:%s;}"
                     % (grupos[chave]["alfabeto"], familia, estilo, peso, dado, faixa))
    return "\n".join(saida) if saida else None

TROCA = r"""<script>/* imagens embutidas: troca assets/... pela versão em data URI */
(function(){var A=window.__ROYAL_ASSETS=%s;
function url(v){return A[v]||v}
function set(el){if(!el||el.nodeType!==1)return;
 ["src","href","poster","srcset"].forEach(function(a){var d=el.getAttribute("data-asset-"+a);if(d!==null){el.removeAttribute("data-asset-"+a);el.setAttribute(a,a==="srcset"?d.replace(/assets\/[^\s,]+/g,url):url(d))}});
 ["src","href","poster"].forEach(function(a){var v=el.getAttribute(a);if(v&&v.indexOf("assets/")===0&&A[v])el.setAttribute(a,A[v])});
 var x=el.getAttributeNS&&el.getAttributeNS("http://www.w3.org/1999/xlink","href");
 if(x&&x.indexOf("assets/")===0&&A[x])el.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",A[x]);
 var s=el.getAttribute("srcset");if(s&&s.indexOf("assets/")>-1)el.setAttribute("srcset",s.replace(/assets\/[^\s,]+/g,url));}
function walk(r){set(r);if(r.querySelectorAll)r.querySelectorAll("[src],[href],[srcset],image,[data-asset-src],[data-asset-srcset],[data-asset-href]").forEach(set)}
new MutationObserver(function(ms){ms.forEach(function(m){if(m.type==="attributes")set(m.target);else m.addedNodes.forEach(function(n){if(n.nodeType===1)walk(n)})})})
 .observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["src","href","srcset","xlink:href"]});
document.addEventListener("DOMContentLoaded",function(){walk(document.documentElement)});})();
</script>"""


def data_uri(caminho):
    tipo = mimetypes.guess_type(caminho)[0] or "application/octet-stream"
    with open(caminho, "rb") as f:
        return "data:%s;base64,%s" % (tipo, base64.b64encode(f.read()).decode())


def autocontido(origem, destino):
    html = open(origem, encoding="utf-8").read()
    # 0. fontes do Google embutidas na própria <style> (continua uma <style> só)
    link = RE_LINK_FONTES.search(html)
    if link:
        css = fontes_embutidas(link.group(1))
        if css:
            html = RE_PRECONNECT.sub("", RE_LINK_FONTES.sub("", html, count=1))
            html = html.replace("<style>", "<style>\n/* Fontes embutidas (SIL Open Font License): latin e latin-ext */\n" + css + "\n", 1)
    # 1. motores dentro do arquivo
    for js in ("rviz.js", "rforms.js"):
        tag = '<script src="%s"></script>' % js
        if tag in html:
            codigo = open(os.path.join(RAIZ, js), encoding="utf-8").read()
            html = html.replace(tag, "<script>/* %s */\n%s\n</script>" % (js, codigo))
    # 2. dicionário de imagens (cada arquivo uma vez só)
    usados = sorted(set(m.group(0) for m in RE_ASSET.finditer(html)))
    mapa, faltando = {}, []
    for p in usados:
        c = os.path.join(RAIZ, p)
        (mapa.__setitem__(p, data_uri(c)) if os.path.isfile(c) else faltando.append(p))
    # 3. CSS url(assets/...) vira data URI direto
    html = re.sub(r"url\(\s*(['\"]?)(assets/[^)'\"]+)\1\s*\)",
                  lambda m: "url(%s)" % json.dumps(mapa.get(m.group(2), m.group(2))), html)
    # 4. atributos estáticos (fora de template, pre, script, textarea e style) viram
    #    data-asset-*: o navegador não tenta buscar o arquivo que não existe
    partes = re.split(r"(<(template|pre|script|textarea|style)\b[\s\S]*?</\2>)", html)
    saida, i = [], 0
    while i < len(partes):
        trecho = partes[i]
        if i % 3 == 0:
            # duas passadas: uma tag pode ter src e srcset ao mesmo tempo
            trecho = re.sub(r'(<(?:img|source|image|link|video)\b[^>]*?\s)(src|srcset|href|poster)="(assets/[^"]*)"',
                            lambda m: '%sdata-asset-%s="%s"' % (m.group(1), m.group(2), m.group(3)), trecho)
            trecho = re.sub(r'(<(?:img|source|image|link|video)\b[^>]*?\s)(src|srcset|href|poster)="(assets/[^"]*)"',
                            lambda m: '%sdata-asset-%s="%s"' % (m.group(1), m.group(2), m.group(3)), trecho)
            saida.append(trecho); i += 1
        else:
            saida.append(trecho); i += 2
    html = "".join(saida)
    # 5. o script de troca entra logo no começo do <head>
    bloco = TROCA % json.dumps(mapa, separators=(",", ":"))
    html = re.sub(r"(<meta charset=[^>]*>)", lambda m: m.group(1) + "\n" + bloco, html, count=1) \
        if re.search(r"<meta charset=", html) else html.replace("<head>", "<head>\n" + bloco, 1)
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    open(destino, "w", encoding="utf-8").write(html)
    print("ok %s  %d KB  imagens=%d%s" % (destino, len(html.encode()) // 1024, len(mapa),
          ("  sem arquivo (ficam como estão): " + ", ".join(faltando)) if faltando else ""))


if __name__ == "__main__":
    alvos = sys.argv[1:] or list(PADRAO)
    for a in alvos:
        o = a if os.path.isabs(a) else os.path.join(RAIZ, a)
        autocontido(o, os.path.join(DIST, PADRAO.get(os.path.basename(a), os.path.basename(a))))
