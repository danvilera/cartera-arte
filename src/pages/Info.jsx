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

      <h2>Taller del Prado — precio socio vs mercado (todas las opciones)</h2>
      <p>Las 40 obras que tenemos como opción en TdP. Precio <strong>socio</strong> (−20%, IVA incl., certificado, local sin aduana). Comps de <strong>subasta</strong> (martillo; súmale ~25% de comisión + IVA) y <strong>retail</strong> de galería, aproximados y con confianza variable. Veredicto: 🟢 barato / semi-chollo · ⚪ en banda / correcto · 🔴 caro · ❓ a verificar.</p>

      <div className="callout">
        <span>💎</span>
        <p><strong>Semi-chollos</strong> (donde el precio TdP está a la par o por debajo del mercado, con liquidez para recuperar lo pagado): <strong>Tàpies serie Variations</strong> (Personnage assis, Oval gris, Grand chaise, Profil — 2.352 € vs retail 2.990–3.600 €), <strong>Tàpies L'esperit català I/II</strong> (2.160 €, aguafuertes, retail ~3.125 €), <strong>Miró Obra inédita recent</strong> (2.240–2.800 € vs retail 3.250 €+), <strong>Vasarely Zebra Nº 3</strong> (1.200 € vs 1.500–1.800 €), <strong>Hartung L-14b</strong> y <strong>Saura Kafka</strong>; y, condicionados a autenticar firma a lápiz y certificado, <strong>Dalí Cap de Creus</strong> (1.600 €) y <strong>Clavé obra única</strong> (1.760 €).</p>
      </div>

      <div className="tablewrap">
        <table>
          <thead>
            <tr><th>Obra</th><th>Socio</th><th>Referencia de mercado</th><th>Veredicto</th><th>Chollo</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Miró</strong> · Quelques fleurs pour des amis (1964) · ed. 75</td><td className="n">4.800 €</td><td>retail ~4.500 € (Artsy); subasta 3.000–4.300 € all-in</td><td>⚪ En banda (alto)</td><td>—</td></tr>
            <tr><td><strong>Miró</strong> · Ubu Roi (1966) · prueba HC</td><td className="n">6.800 €</td><td>planchas firmadas 3.300–5.000 €</td><td>🔴 Caro / ❓ plancha</td><td>no</td></tr>
            <tr><td><strong>Miró</strong> · Obra inédita recent (1) (1964) · ed. 100</td><td className="n">2.800 €</td><td>retail 3.250–8.500 $</td><td>🟢 Bien/barato</td><td>sí*</td></tr>
            <tr><td><strong>Miró</strong> · Obra inédita recent (3) (1964)</td><td className="n">2.800 €</td><td>retail 3.250–8.500 $</td><td>🟢 Bien/barato</td><td>sí*</td></tr>
            <tr><td><strong>Miró</strong> · Obra inédita recent (6) (1964)</td><td className="n">2.800 €</td><td>retail 3.250–8.500 $</td><td>🟢 Bien/barato</td><td>sí*</td></tr>
            <tr><td><strong>Miró</strong> · Obra inédita recent (5) (1964)</td><td className="n">2.240 €</td><td>retail 3.250–8.500 $</td><td>🟢 Barato</td><td>sí</td></tr>
            <tr><td><strong>Dalí</strong> · Le Chêne et le Roseau (1974) · Bestiaire</td><td className="n">3.120 €</td><td>retail 2.000 € (Artsy); reventa ~1.400 € all-in</td><td>🔴 Caro</td><td>no</td></tr>
            <tr><td><strong>Dalí</strong> · Le Singe et le Léopard (1974)</td><td className="n">2.800 €</td><td>subasta ~1.400 € all-in; retail 2.000–3.850 €</td><td>⚪ En banda (alto)</td><td>no</td></tr>
            <tr><td><strong>Dalí</strong> · Les Animaux Malades de la Peste (1974)</td><td className="n">2.800 €</td><td>≈ serie Bestiaire (inferencia)</td><td>⚪ En banda (alto)</td><td>no</td></tr>
            <tr><td><strong>Dalí</strong> · La Cour du Lion (1974)</td><td className="n">2.800 €</td><td>retail 3.850 €; subasta ~1.000–1.500 €</td><td>⚪ En banda</td><td>no</td></tr>
            <tr><td><strong>Dalí</strong> · Zöotrope et tour Boullée (1973)</td><td className="n">1.760 €</td><td>sin dato duro; inferencia 1.000–2.500 €</td><td>⚪ En banda (inf.)</td><td>—</td></tr>
            <tr><td><strong>Dalí</strong> · Cap de Creus (1979) · litografía</td><td className="n">1.600 €</td><td>subasta all-in ~2.200 € (Swann 2018)</td><td>🟢 Barato (condicional)</td><td>sí*</td></tr>
            <tr><td><strong>Tàpies</strong> · La main jaune · ed. 200</td><td className="n">1.520 €</td><td>subasta est. 400–600 €; retail ~900–1.600 €</td><td>⚪ En banda (alto)</td><td>no</td></tr>
            <tr><td><strong>Tàpies</strong> · Messiaen 1986</td><td className="n">1.520 €</td><td>solo consta el <em>cartel</em> (Galfetti 1068, firma en plancha) ~80 €</td><td>❓ A verificar</td><td>no</td></tr>
            <tr><td><strong>Tàpies</strong> · L'esperit català I (1974) · aguafuerte</td><td className="n">2.160 €</td><td>retail ~3.125 € +IVA (composition)</td><td>🟢 Barato</td><td>sí</td></tr>
            <tr><td><strong>Tàpies</strong> · L'esperit català II (1974) · aguafuerte</td><td className="n">2.160 €</td><td>retail ~3.125 € +IVA</td><td>🟢 Barato</td><td>sí</td></tr>
            <tr><td><strong>Tàpies</strong> · Nocturn Matinal</td><td className="n">2.240 €</td><td>hoja suelta ~1.350 €; carpeta ed. 100 más</td><td>❓ A verificar</td><td>depende</td></tr>
            <tr><td><strong>Tàpies</strong> · Grand chaise (Variations)</td><td className="n">2.352 €</td><td>Variations retail 2.990–3.600 €</td><td>🟢 Bien/barato</td><td>sí</td></tr>
            <tr><td><strong>Tàpies</strong> · Improvisations en blanc et en noir 4 (1987)</td><td className="n">2.352 €</td><td>inferencia 2.500–3.500 €</td><td>⚪ Bien</td><td>posible</td></tr>
            <tr><td><strong>Tàpies</strong> · Oval gris (1987)</td><td className="n">2.352 €</td><td>retail 2.990 € (IVA incl.)</td><td>🟢 Barato</td><td>sí</td></tr>
            <tr><td><strong>Tàpies</strong> · Personnage assis (Variations XI)</td><td className="n">2.352 €</td><td>retail 3.600 € (IVA incl.)</td><td>🟢 Barato</td><td>sí</td></tr>
            <tr><td><strong>Tàpies</strong> · Profil (Variations I)</td><td className="n">2.352 €</td><td>Variations 2.990–3.600 €</td><td>🟢 Bien/barato</td><td>sí</td></tr>
            <tr><td><strong>Tàpies</strong> · Venus · aguafuerte (Galfetti 573)</td><td className="n">1.200 €</td><td>inferencia ~1.500–2.800 €</td><td>⚪ Bien (inf.)</td><td>leve</td></tr>
            <tr><td><strong>Tàpies</strong> · Minor IV · aguafuerte</td><td className="n">1.440 €</td><td>la web de TdP lo muestra a ~1.190 € socio</td><td>❓ Verificar precio</td><td>—</td></tr>
            <tr><td><strong>Tàpies</strong> · Paupière (sèrie negra) (1987) · aguafuerte</td><td className="n">1.840 €</td><td>sin dato; inferencia 1.800–3.500 €</td><td>⚪ En banda (inf.)</td><td>—</td></tr>
            <tr><td><strong>Braque</strong> · Lettera amorosa (1963) · ed. 75</td><td className="n">3.040 €</td><td>subasta ~1.700 € all-in; retail ~5.100 €</td><td>⚪ Bien/en banda</td><td>no</td></tr>
            <tr><td><strong>Braque</strong> · Personnage sur fond rose</td><td className="n">2.800 €</td><td>Mourlot Ed. ~1.650 €; Artsy 3.800 €</td><td>⚪ En banda (medio)</td><td>no</td></tr>
            <tr><td><strong>Goya</strong> · Se defiende bien · Desastres 78 (1ª ed. 1863)</td><td className="n">2.000 €</td><td>placa suelta subasta modesta; retail ~1.900 €</td><td>⚪ En banda / ❓ edición</td><td>no</td></tr>
            <tr><td><strong>Goya</strong> · Estragos de la guerra · Desastres (1ª ed. 1863)</td><td className="n">1.920 €</td><td>ídem serie</td><td>⚪ En banda / ❓ edición</td><td>no</td></tr>
            <tr><td><strong>Goya</strong> · El Cid · Tauromaquia (1ª ed. 1816)</td><td className="n">6.400 €</td><td>Kornfeld est. CHF 4.000 (~5.400 € all-in)</td><td>⚪ En banda (alto, si 1ª ed.)</td><td>no</td></tr>
            <tr><td><strong>Goya/Dalí</strong> · díptico Buen viage / Esto es (Capricho 64)</td><td className="n">2.000 €</td><td>Dalí heliograbado firmado ~1.200 € all-in</td><td>🔴 Caro / ❓</td><td>no</td></tr>
            <tr><td><strong>Chillida</strong> · Ce maudit moi (Cioran) (1983)</td><td className="n">2.800 €</td><td>es libro deluxe ed. 50 firmado; hoja suelta ❓</td><td>❓ A verificar</td><td>—</td></tr>
            <tr><td><strong>Barceló</strong> · El pintor de rodillas (1983) · ed. 200</td><td className="n">3.840 €</td><td>retail 5.000 €; subasta est. 1.500–3.000 €</td><td>⚪ Bien (bajo retail)</td><td>leve</td></tr>
            <tr><td><strong>Hartung</strong> · L-14b (1974)</td><td className="n">2.000 €</td><td>retail match ~2.900 € (Artedio)</td><td>🟢 Bien</td><td>leve</td></tr>
            <tr><td><strong>Hartung</strong> · L-19 (1974)</td><td className="n">2.000 €</td><td>inferencia por L-14b</td><td>⚪ En banda</td><td>—</td></tr>
            <tr><td><strong>Saura</strong> · Suite Kafka, pl. II (1988) · ed. 60</td><td className="n">1.000 €</td><td>retail 850–1.600 €</td><td>🟢 Bien</td><td>leve</td></tr>
            <tr><td><strong>Vasarely</strong> · Corona (1979) · serigrafía</td><td className="n">1.200 €</td><td>serigrafías firmadas ~1.770 $</td><td>⚪ En banda</td><td>leve</td></tr>
            <tr><td><strong>Vasarely</strong> · Zebra Nº 3 (1984)</td><td className="n">1.200 €</td><td>retail 1.500–1.800 €</td><td>🟢 Barato</td><td>sí</td></tr>
            <tr><td><strong>Delaunay</strong> · Rythme-coloré (1971) · aguafuerte HC</td><td className="n">5.200 €</td><td>aguafuerte comparable ~3.500 €</td><td>🔴 Caro / ❓</td><td>no</td></tr>
            <tr><td><strong>Clavé</strong> · Sin título (1977) · OBRA ÚNICA</td><td className="n">1.760 €</td><td>galería 10.000 €; subasta obra en papel 2–4.000 €</td><td>🟢 Barato (condicional)</td><td>sí*</td></tr>
          </tbody>
        </table>
      </div>
      <p className="note it">🟢 con * = semi-chollo condicionado a verificar firma a lápiz, edición y certificado. Cifras aproximadas y con confianza variable; algunas «en banda» e «inferencia» salen de comparables de la misma serie, no de la obra exacta.</p>

      <div className="callout">
        <span>⚠️</span>
        <p><strong>A verificar antes de comprar</strong> (cambian el veredicto): <strong>«Messiaen 1986»</strong> — en mercado solo consta el <em>cartel</em> (Galfetti 1068, ed. 1.400, firma impresa en plancha, ~80 €); pide a TdP el nº de catálogo y foto de la firma a lápiz que confirme que es una edición distinta y firmada a mano. <strong>«Minor IV»</strong> — la propia web de TdP lo muestra a ~1.190 € socio, no 1.440 €; confirmar cuál es. <strong>«L'esperit català I/II»</strong> — son <strong>aguafuertes</strong> de 1974 (ed. 75), no litografías. <strong>«Nocturn Matinal»</strong> — existe como carpeta completa (ed. 100) y como hoja suelta (~1.350 €); aclarar cuál venden. <strong>Chillida «Ce maudit moi»</strong> — es un libro deluxe (ed. 50) firmado por Chillida y Cioran; confirmar que es una xilografía suelta. <strong>Goya</strong> — el valor depende de que sea 1ª edición (Desastres 1863 / Tauromaquia 1816); verificar papel y estado.</p>
      </div>

      <div className="callout">
        <span>📊</span>
        <p><strong>Cómo leerlo.</strong> El precio de TdP ya es de socio (−20%), con IVA incluido, certificado y sin aduana; la <strong>subasta</strong> es martillo (súmale ~25% de comisión + IVA) y el retail de otras galerías suele ir sin envío, así que «caro vs subasta» no equivale a «caro puesto en casa». Para <strong>negociar</strong>: los 🔴 (Le Chêne, díptico Goya/Dalí, Delaunay, Ubu Roi) son donde más margen hay para pedir rebaja o descartar; los 🟢 son los que conviene asegurar. Confianza media: verifica firma y catálogo pieza a pieza.</p>
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
