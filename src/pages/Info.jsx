import React from 'react'

export default function Info() {
  return (
    <div className="prose">
      <p className="lede">Referencias de mercado por obra (aproximadas, cambian con el tiempo). El precio de galería es negociable; el de subasta refleja mejor la reventa. Las puntuaciones son una <strong>orientación</strong>, no una tasación.</p>

      <h2>Qué dice el mercado</h2>
      <div className="tablewrap">
        <table>
          <thead>
            <tr><th>Obra</th><th>Precio</th><th>Referencia de mercado</th><th>Lectura</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Miró</strong> · Picasso i els Reventós (Dupin 588) · <em>Bagot</em></td><td className="n">6.500 €</td><td>≈ 6.300 € firmada en retail; menos en subasta</td><td>Retail completo. Negociable.</td></tr>
            <tr><td><strong>Picasso</strong> · L'Étreinte II (Bloch 1150) · proc. Petiet · <em>Bagot</em></td><td className="n">9.500 €</td><td>≈ 7.100 € la versión aguafuerte; rincée único → prima</td><td>Justo. La de más prestigio.</td></tr>
            <tr><td><strong>Dalí</strong> · Twelve Tribes nº 6 y nº 10 · <em>Mayoral</em></td><td className="n">9.000 € c/u<br />16.000 € pareja</td><td>retail hasta ~11–12.000 €; subasta ≈ 500–2.500 €/estampa</td><td>Caro frente a la reventa.</td></tr>
            <tr><td><strong>Miró</strong> · Hommage à Joan Miró (carborundo) · <em>R. Torres</em></td><td className="n">5.000 €</td><td>carborundos grandes firmados ~3.000–10.000 €</td><td>En presupuesto. Confirmar firma.</td></tr>
            <tr><td><strong>Miró</strong> · Cartel Fundació 1975 (Maeght 1031) · 62/99 · <em>R. Torres</em></td><td className="n">10.500 €</td><td>firmadas ~4.000–9.000 € (sin firmar ~200–600 €)</td><td>Icónica pero cara. Negociar.</td></tr>
            <tr><td><strong>Miró</strong> · Mà de Proverbis (Maeght 678) · ed. 75 · <em>R. Torres</em></td><td className="n">8.500 €</td><td>firmada a lápiz/75 ~2.500–6.000 € (plancha/1.500 ~200–400 €)</td><td>Retail alto. Verificar firma.</td></tr>
            <tr><td><strong>Picasso</strong> · Head of a Bearded Man (Bloch 1231) · <em>R. Torres</em></td><td className="n">9.000 €</td><td>frontispicio de libro sin firmar ~1.000–3.500 €</td><td>Cara para lo que es.</td></tr>
            <tr><td><strong>Picasso</strong> · Modèle au repos… (Bloch 1205) · 31/50 · <em>R. Torres</em></td><td className="n">10.000 €</td><td>firmada ~6.000–20.000 €; sin firmar, menos</td><td>Justo <em>si</em> está firmada.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Taller del Prado — precio socio vs mercado</h2>
      <p>Las 9 obras del correo a Taller del Prado. Precio de <strong>socio</strong> (−20%), IVA incluido, con certificado y recogida local sin aduana. Referencias de retail y subasta aproximadas; cambian con el tiempo.</p>
      <div className="tablewrap">
        <table>
          <thead>
            <tr><th>Obra</th><th>Precio socio</th><th>Referencia de mercado</th><th>Lectura</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Miró</strong> · «Quelques fleurs pour des amis» (1964) · ed. 75</td><td className="n">4.800 €</td><td>retail ~6.000 € (Artsy); subasta ~1.900–2.900 €</td><td><strong style={{ color: 'var(--good)' }}>Bien</strong>. Por debajo del retail alto.</td></tr>
            <tr><td><strong>Miró</strong> · «Obra inédita recent» (1964) · ed. 100</td><td className="n">2.240 €</td><td>planchas firmadas ~1.500–3.000 € (poca cotización pública)</td><td><strong>Correcto</strong>. Dato flojo.</td></tr>
            <tr><td><strong>Dalí</strong> · «Zootrope et tour Boullée» (1973) · ed. 50</td><td className="n">1.760 €</td><td>estampas firmadas de la serie ~1.500–3.000 €</td><td><strong>Correcto</strong>, banda baja.</td></tr>
            <tr><td><strong>Dalí</strong> · «Le Chêne et le Roseau» (1974) · Bestiaire, ed. 250</td><td className="n">3.120 €</td><td>mismo título y edición, firmado, a <strong>2.000 €</strong> (galería en Suiza)</td><td><strong style={{ color: 'var(--bad)' }}>Caro</strong> (+50%).</td></tr>
            <tr><td><strong>Dalí</strong> · «Cap de Creus» (1979) · litografía firmada</td><td className="n">1.600 €</td><td>versión 1980 (ed. 350) firmada ~3.600 € en EE.UU.</td><td><strong style={{ color: 'var(--good)' }}>Barato</strong> (ediciones no idénticas).</td></tr>
            <tr><td><strong>Tàpies</strong> · «La main jaune» · ed. 200 · Galfetti 347</td><td className="n">1.520 €</td><td>subasta <strong>600 €</strong> (2024); retail firmado ~800–2.000 €</td><td><strong style={{ color: 'var(--bad)' }}>Caro</strong> frente a la reventa.</td></tr>
            <tr><td><strong>Tàpies</strong> · «Messiaen 1986» · litografía firmada</td><td className="n">1.520 €</td><td>en mercado aparece como <em>cartel</em> del festival; edición firmada ~1.000–2.000 €, affiche ~300–800 €</td><td><strong style={{ color: 'var(--warn)' }}>A verificar</strong> tirada y catálogo.</td></tr>
            <tr><td><strong>Braque</strong> · «Lettera amorosa» (1963) · Mourlot</td><td className="n">3.040 €</td><td>planchas firmadas de la serie (ed. 75) ~2.000–4.000 €</td><td><strong>En banda</strong>. Correcto.</td></tr>
            <tr><td><strong>Braque</strong> · «Personnage sur fond rose»</td><td className="n">2.800 €</td><td>misma obra firmada ~1.650 € (Mourlot Editions); tamaños/ediciones difieren</td><td><strong style={{ color: 'var(--bad)' }}>Caro</strong> frente a ese comp.</td></tr>
          </tbody>
        </table>
      </div>

      <div className="callout">
        <span>📊</span>
        <p><strong>Cómo leerlo.</strong> El precio de Taller del Prado ya es de socio (−20%), con IVA incluido, certificado y sin aduana. La <strong>subasta</strong> es precio de martillo (súmale ~25% de comisión + IVA) y el retail de otras galerías suele ir sin envío, así que “caro vs subasta” no equivale a “caro puesto en casa”. Lo más sólido del cuadro: <strong>Le Chêne</strong> se encuentra igual (firmado, misma edición) a 2.000 €, luego a 3.120 € hay margen para negociar; <strong>Cap de Creus</strong> es el mejor precio de la lista. Confianza media en las cifras: verifica firma y catálogo pieza a pieza.</p>
      </div>

      <div className="callout">
        <span>⚠️</span>
        <p><strong style={{ color: 'var(--bad)' }}>Aviso Dalí.</strong> Las dos obras de Mayoral son auténticas y catalogadas (no del problema de las “hojas en blanco”), con certificado de galería seria. El pero es económico: edición grande y muy comercializada, con gran brecha entre precio de tienda (~9–12.000 €) y reventa (~500–2.500 € en subasta). Cómpralas si te enamoran para la pared, no como inversión.</p>
      </div>

      <h2>Antes de pagar — checklist</h2>
      <ul>
        <li><strong>Firma a lápiz</strong> (no impresa en la plancha). Mírala al trasluz y con lupa.</li>
        <li><strong>Numeración</strong> (ej. 42/75). Edición pequeña = más valor.</li>
        <li><strong>Catálogo razonado</strong>: Dupin/Maeght (Miró), Bloch/Baer (Picasso), Michler-Löpsinger (Dalí).</li>
        <li><strong>Vida vs. póstuma</strong> y <strong>certificado + procedencia</strong> por escrito.</li>
        <li><strong>Estado</strong>: márgenes completos, sin foxing ni decoloración.</li>
        <li><strong>Factura</strong> con desglose de IVA y devolución si un tercero desmiente la autenticidad.</li>
      </ul>

      <h2>Preguntas para las galerías</h2>
      <h3>J. Bagot</h3>
      <p>Miró: pedir <strong>certificado formal</strong> como el del Picasso; estado; negociar a 5.000–5.500 €. Picasso: confirmar Bloch 1150 vs 1151; factura con procedencia Petiet / Louise Leiris.</p>
      <h3>Galería Mayoral</h3>
      <p>Resultados de subasta recientes de la serie; ¿respaldo de la Fundació Gala-Salvador Dalí?; negociar el pack.</p>
      <h3>Rubén Torres</h3>
      <p><em>Hommage:</em> ¿firma a lápiz además de la dedicatoria? <em>Mà de Proverbis:</em> confirmar que es la firmada a lápiz/75, no la de plancha (1.500). <em>Head of a Bearded Man:</em> ¿firmada? Si es lámina de libro sin firma, a 9.000 € no compensa. <em>Fauteuil / Fundació:</em> confirmar firma y numeración; margen de precio.</p>

      <p className="note it" style={{ marginTop: 18 }}>Heurística de orientación, no asesoramiento financiero ni tasación. Confirma siempre con un especialista independiente antes de comprar.</p>
    </div>
  )
}
