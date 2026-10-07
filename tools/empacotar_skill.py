#!/usr/bin/env python3
"""Gera dist-skill/branding-royal-parma.zip, o pacote da skill para claude.ai e ChatGPT (Release).

O ZIP tem a pasta branding-royal-parma/ no topo e só o que a skill precisa para operar: SKILL.md,
agents/openai.yaml, brand-book.html, deck-template.html, lockup.html, guia-de-uso.html, rviz.js,
rforms.js, autocontido.py, exportar_pdf.py, a marca em SVG e PNG web, marca.json, favicons, avatar,
imagem de compartilhamento, fotos públicas (com LEIA.md), formas, capas de destaque e fontes woff2.

Fica fora do pacote (e é servido pelo GitHub Pages): os arquivos publicados que serviram de base
(assets/referencia-original), as PNG cheias da marca (2400 px, para o Canva e a gráfica), as cópias
de fonte com nome de URL (assets/fontes/font?kit=..., que nada referencia; as mesmas famílias estão
nos woff2) e o dist/ autocontido. Dentro do pacote, todo caminho relativo de HTML, MD ou CSS para um
arquivo do repositório que ficou fora vira URL absoluta do Pages.

Falha (código 1) se: ZIP > 30 MB, soma descompactada > 25 MB, mais de 400 arquivos, algum arquivo
> 10 MB, nome de arquivo fora de [A-Za-z0-9._-], description > 1.024 caracteres ou com < >,
frontmatter com campo fora de name/description, SKILL.md com 500 linhas ou mais, name divergente
da pasta, SKILL.md ausente no topo, mais de um SKILL.md, link relativo de SKILL.md para arquivo
ausente no pacote. Meta: ZIP abaixo de 10 MB.

Uso: python3 tools/empacotar_skill.py
"""
import io
import re
import sys
import zipfile
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
NOME = "branding-royal-parma"
PAGES = "https://rafaelnasch.github.io/branding-royal-parma/"
SAIDA = RAIZ / "dist-skill" / f"{NOME}.zip"
MB = 1024 * 1024
LIM_ZIP, LIM_SOMA, LIM_ARQ, LIM_N, META_ZIP = 30 * MB, 25 * MB, 10 * MB, 400, 10 * MB
RAIZ_ARQS = ["SKILL.md", "agents/openai.yaml", "brand-book.html", "deck-template.html", "lockup.html",
             "guia-de-uso.html", "rviz.js", "rforms.js", "autocontido.py", "exportar_pdf.py", "assets/marca.json"]
NOME_OK = re.compile(r"^[A-Za-z0-9._/-]+$")


def lista():
    arqs = list(RAIZ_ARQS)
    a = RAIZ / "assets"
    # marca: SVG, PNG web e os PNG pequenos de uso direto (favicon, avatar, compartilhamento)
    for p in sorted(a.glob("*")):
        if not p.is_file():
            continue
        n = p.name
        if n.endswith(".svg") or n.endswith("-web.png") or n.startswith(("royal-favicon", "royal-avatar", "royal-compartilhamento")):
            arqs.append(str(p.relative_to(RAIZ)))
    for pasta, padrao in (("fotos", "*.jpg"), ("fotos", "*.png"), ("fotos", "LEIA.md"), ("formas", "*.svg"),
                          ("destaques", "*"), ("fontes", "*.woff2"), ("fontes", "*.css")):
        arqs += sorted(str(p.relative_to(RAIZ)) for p in (a / pasta).glob(padrao) if p.is_file())
    faltam = [x for x in arqs if not (RAIZ / x).is_file()]
    if faltam:
        sys.exit("arquivos esperados que não existem: " + ", ".join(faltam))
    return list(dict.fromkeys(arqs))


REF_ASSET = re.compile(r"(?<![\w/.:-])assets/[A-Za-z0-9_./?=&%-]*")


def reescreve(texto, no_pacote):
    trocas = 0

    def troca(m):
        nonlocal trocas
        cam = m.group(0)
        limpo = cam.rstrip(".,")
        if limpo.endswith("/"):
            return cam  # menção de pasta no texto, não link
        if limpo in no_pacote or any(x.startswith(limpo) for x in no_pacote):
            return cam
        if not (RAIZ / limpo).is_file():
            return cam  # padrão de nome ou texto, não arquivo
        trocas += 1
        return PAGES + cam
    return REF_ASSET.sub(troca, texto), trocas


def monta(arqs):
    conteudo, trocas = {}, {}
    for x in arqs:
        b = (RAIZ / x).read_bytes()
        if x.endswith((".html", ".md", ".css")):
            t, n = reescreve(b.decode("utf-8"), set(arqs))
            b, trocas[x] = t.encode("utf-8"), n
        conteudo[x] = b
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for x, b in conteudo.items():
            info = zipfile.ZipInfo(f"{NOME}/{x}", date_time=(2026, 10, 7, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            z.writestr(info, b, compresslevel=9)
    return buf.getvalue(), conteudo, trocas


def confere(zip_bytes, conteudo):
    erros = []
    soma = sum(len(b) for b in conteudo.values())
    if len(zip_bytes) > LIM_ZIP:
        erros.append(f"ZIP com {len(zip_bytes)/MB:.2f} MB (limite 30 MB)")
    if soma > LIM_SOMA:
        erros.append(f"descompactado com {soma/MB:.2f} MB (limite 25 MB)")
    if len(conteudo) > LIM_N:
        erros.append(f"{len(conteudo)} arquivos (limite 400)")
    for x, b in conteudo.items():
        if len(b) > LIM_ARQ:
            erros.append(f"{x} com {len(b)/MB:.2f} MB (limite 10 MB por arquivo)")
        if not NOME_OK.match(x):
            erros.append(f"nome de arquivo com caractere fora do padrão: {x}")
    with zipfile.ZipFile(io.BytesIO(zip_bytes)) as z:
        nomes = z.namelist()
    if {n.split("/")[0] for n in nomes} != {NOME}:
        erros.append("pasta de topo diferente de " + NOME)
    if [n for n in nomes if n.endswith("SKILL.md")] != [f"{NOME}/SKILL.md"]:
        erros.append("tem de haver um único SKILL.md, no topo da pasta")
    skill = conteudo["SKILL.md"].decode("utf-8")
    fm = re.match(r"^---\n(.*?)\n---\n", skill, re.S)
    if not fm:
        erros.append("SKILL.md sem frontmatter")
        return erros, soma, 0, 0
    campos = re.findall(r"^([A-Za-z_-]+):", fm.group(1), re.M)
    extras = [c for c in campos if c not in ("name", "description")]
    if extras:
        erros.append("campos fora da especificação no frontmatter: " + ", ".join(extras))
    m = re.search(r"^name:\s*(.+)$", fm.group(1), re.M)
    nome = m.group(1).strip().strip("\"'") if m else ""
    m = re.search(r"^description:\s*(.+)$", fm.group(1), re.M)
    desc = m.group(1).strip() if m else ""
    if desc[:1] in "\"'" and desc[-1:] == desc[:1]:
        desc = desc[1:-1]
    if nome != NOME or not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", nome) or len(nome) > 64:
        erros.append(f"name '{nome}' inválido ou diferente da pasta")
    if not 1 <= len(desc) <= 1024:
        erros.append(f"description com {len(desc)} caracteres (limite 1.024)")
    if "<" in desc or ">" in desc:
        erros.append("description com < ou >")
    linhas = skill.count("\n") + (0 if skill.endswith("\n") else 1)
    if linhas >= 500:
        erros.append(f"SKILL.md com {linhas} linhas (limite: menos de 500)")
    for alvo in re.findall(r"\]\(([^)\s]+)\)", skill):
        if re.match(r"(https?:|mailto:|#)", alvo):
            continue
        if alvo.split("#")[0] not in conteudo:
            erros.append(f"SKILL.md: link relativo para arquivo ausente no pacote: {alvo}")
    return erros, soma, linhas, len(desc)


def main():
    arqs = lista()
    zip_bytes, conteudo, trocas = monta(arqs)
    erros, soma, linhas, ndesc = confere(zip_bytes, conteudo)
    SAIDA.parent.mkdir(exist_ok=True)
    SAIDA.write_bytes(zip_bytes)
    maior = max(conteudo.items(), key=lambda kv: len(kv[1]))
    print(f"pacote: {SAIDA.relative_to(RAIZ)}")
    print(f"ZIP {len(zip_bytes)/MB:.2f} MB · descompactado {soma/MB:.2f} MB · {len(conteudo)} arquivos · "
          f"maior {maior[0]} ({len(maior[1])/MB:.2f} MB)")
    print(f"SKILL.md {linhas} linhas · description {ndesc} caracteres")
    print("caminhos reescritos para o Pages: " + (", ".join(f"{k} {v}" for k, v in trocas.items() if v) or "nenhum"))
    if len(zip_bytes) >= META_ZIP:
        print("aviso: ZIP acima da meta de 10 MB")
    if erros:
        for e in erros:
            print("  FALHA:", e)
        sys.exit(1)
    print("limites atendidos")


if __name__ == "__main__":
    main()
