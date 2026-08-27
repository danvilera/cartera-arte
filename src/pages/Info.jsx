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
