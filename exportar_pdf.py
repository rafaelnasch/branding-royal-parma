#!/usr/bin/env python3
"""Exporta um HTML do manual da Royal Parma em PDF (seção 21.4 do brand book).
Uso, na pasta do manual: python3 exportar_pdf.py [arquivo.html]
"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

# o arquivo fica na mesma pasta do script
PASTA = Path(__file__).resolve().parent
NOME = sys.argv[1] if len(sys.argv) > 1 \
    else "brand-book.html"
ARQUIVO = PASTA / NOME
SAIDA = ARQUIVO.with_suffix(".pdf")

with sync_playwright() as p:
    nav = p.chromium.launch()
    pag = nav.new_page(
        viewport={"width": 1200, "height": 900})
    pag.goto(ARQUIVO.as_uri(),
             wait_until="networkidle")
    # fotos de carregamento tardio entram já
    pag.evaluate(
        "document.querySelectorAll("
        "'img[loading=lazy]')"
        ".forEach(i => i.loading = 'eager')")
    # espera cada foto terminar de carregar
    pag.wait_for_function(
        "Array.from(document.images)"
        ".every(i => i.complete)",
        timeout=60000)
    # fontes e gráficos montados na página
    pag.evaluate("document.fonts.ready")
    pag.wait_for_timeout(1500)
    # print_background=True é obrigatório:
    # sem ele, o verde e o caramelo somem.
    # prefer_css_page_size=True respeita a
    # página e as margens do próprio arquivo.
    # Não passe margin: a capa sai sem margem.
    pag.pdf(path=str(SAIDA),
            print_background=True,
            prefer_css_page_size=True)
    nav.close()
print("PDF gravado em", SAIDA)
