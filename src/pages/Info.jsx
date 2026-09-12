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

      <h2>Cazachollos TdP — mejores por precio (barrido completo)</h2>
      <p>Barrido de la obra <strong>firmada a mano</strong> de los artistas reconocidos en TdP (Miró, Dalí, Tàpies, Chillida, Picasso, Chagall, Calder, Clavé). Precio <strong>socio</strong> (PVP×0,8, aproximado: difiere entre listado y ficha, confírmalo en tienda). Casi todos los comps son de <em>retail</em> de galería porque los martillos de subasta están tras muro de pago, así que aquí “chollo” = <strong>por debajo del retail de otras galerías</strong>; solo Cap de Creus y Cauchemar tienen comp de venta cercano. Confianza variable.</p>
      <div className="tablewrap">
        <table>
          <thead>
            <tr><th>Obra</th><th>Socio ~</th><th>Referencia de mercado</th><th>Lectura</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Tàpies</strong> · serie «Variations» (Personnage assis, Chaise ficelée, Oval gris, Cannage, Profil…)</td><td className="n">2.352 €</td><td>retail 2.990–3.600 € (Artedio)</td><td><strong style={{ color: 'var(--good)' }}>Chollo</strong> −20/−35%; gran formato (~104 cm), líquidas</td></tr>
            <tr><td><strong>Tàpies</strong> · «L'esperit català I/II» (aguatinta/aguafuerte+gofrado)</td><td className="n">2.160 €</td><td>~3.125 € +IVA (composition)</td><td><strong style={{ color: 'var(--good)' }}>Chollo</strong> −40% (apaisados)</td></tr>
            <tr><td><strong>Dalí</strong> · «Cap de Creus» (Field 80-8)</td><td className="n">1.600 €</td><td>martillo firmado ~2.200 € (Swann); retail 3.250–3.650 €</td><td><strong style={{ color: 'var(--good)' }}>Chollo</strong> · verificar firma a lápiz + certificado</td></tr>
            <tr><td><strong>Calder</strong> · «Le Sacrilège d'Alan Kent» (carpeta Maeght 1976, ed. 200)</td><td className="n">~3.850 €</td><td>portfolio completo firmado ~8.300 € (Artebonito)</td><td><strong style={{ color: 'var(--good)' }}>Chollo</strong> · verificar que incluye las aguatintas completas</td></tr>
            <tr><td><strong>Picasso</strong> · «Cauchemar» (Baer 1747, 1968, ed. Leiris)</td><td className="n">~7.900 €</td><td>hermana firmada ~10.700 € (1stDibs)</td><td><strong style={{ color: 'var(--good)' }}>Chollo</strong> · la única Picasso firmada a mano con margen</td></tr>
            <tr><td><strong>Chillida</strong> · «Estampa V/VI (La indetenible quietud)» (ed. 100)</td><td className="n">2.400 €</td><td>retail 3.270 € (Galería BAT, editor)</td><td><strong style={{ color: 'var(--good)' }}>Chollo leve</strong>; demanda internacional</td></tr>
            <tr><td><strong>Chillida</strong> · «Hommage à Heidegger» (xilografía)</td><td className="n">1.200 €</td><td>martillo 1.548 € (Van Ham 2015)</td><td><strong style={{ color: 'var(--good)' }}>Bien</strong>; formato pequeño (14×17)</td></tr>
            <tr><td><strong>Tàpies</strong> · «Improvisations en blanc et en noir» (ed. 60)</td><td className="n">2.352 €</td><td>inferido 2.500–3.500 €</td><td><strong>Probable</strong> (confianza baja)</td></tr>
            <tr><td><strong>Tàpies</strong> · «Album St Gallen» (tramo bajo)</td><td className="n">1.200–1.800 €</td><td>~2.600 € (Chairish)</td><td><strong>Bien</strong> · verificar plancha</td></tr>
            <tr><td><strong>Clavé</strong> · «Cirque ou la parade» (litografía 1949)</td><td className="n">~1.256 €</td><td>litos tempranas 1.800–2.000 €</td><td><strong>Leve</strong> · verificar firma a lápiz</td></tr>
            <tr><td><strong>Clavé</strong> · «L'Émerveillé Merveilleux» (Hommage Miró, ed. 10)</td><td className="n">~992 €</td><td>edición muy corta (escasez)</td><td><strong>Leve</strong></td></tr>
            <tr><td><strong>Miró</strong> · «Álbum 19» / «Les essències de la Terra»</td><td className="n">2.000 €</td><td>litos firmadas ~3.000–4.500 €</td><td><strong style={{ color: 'var(--warn)' }}>Verificar</strong> firma vs cartel</td></tr>
          </tbody>
        </table>
      </div>

      <div className="callout">
        <span>🚫</span>
        <p><strong>Trampas y "no-chollos" (evitar o descartar por tu criterio de firma a mano):</strong> <strong>Picasso</strong> — toda la <em>Suite 156</em> (circo, celestina, cornudo, mosqueteros, 1.520–2.200 €) es <strong>póstuma con sello</strong>, no firma a mano; también «Homme assis» (sello), «Vallauris» (firma en plancha), «Service visage noir» (sello Madoura), «La guitare blanche» (reproducción) y los libros. <strong>Tàpies</strong> — «La nuit grandissante» (1.120–1.360 €) es un <em>cartel</em> que vale ~200 €, y «Messiaen» un cartel ~80 €. <strong>Miró</strong> — «Obra inédita recent» llevan solo inicial (reventa floja); «Ubu Roi» (6.800–7.600) y «Serie Mallorca» (8.800) están caros. <strong>Dalí</strong> — Bestiaire (2.800–3.120), Dix recettes y «Caducée de Mars» por encima de la reventa; «Divina Comedia» se editó sin firmar (verificar); «Don Quijote» 1980 plagado de "after Dalí". <strong>Chagall</strong> — «Écuyère au Bouquet» probablemente plancha de libro sin firma (verificar antes de nada). <strong>Chillida</strong> — «Ce maudit moi» (hoja suelta de libro), «Beltza II» y «Egimen» están caros.</p>
      </div>

      <h2>Taller del Prado — precio socio vs mercado (todas las opciones)</h2>
      <p>Las 40 obras que tenemos como opción en TdP. Precio <strong>socio</strong> (−20%, IVA incl., certificado, local sin aduana). Comps de <strong>subasta</strong> (martillo; súmale ~25% de comisión + IVA) y <strong>retail</strong> de galería, aproximados y con confianza variable. Veredicto: 🟢 barato / semi-chollo · ⚪ en banda / correcto · 🔴 caro · ❓ a verificar.</p>

      <div className="callout">
        <span>💎</span>
        <p><strong>Semi-chollos</strong> (donde el precio TdP está a la par o por debajo del mercado, con liquidez para recuperar lo pagado): <strong>Tàpies serie Variations</strong> (Personnage assis, Oval gris, Grand chaise, Profil — 2.352 € vs retail 2.990–3.600 €), <strong>Tàpies L'esperit català I/II</strong> (2.160 €, aguafuertes, retail ~3.125 €), <strong>Vasarely Zebra Nº 3</strong> (1.200 € vs 1.500–1.800 €), <strong>Hartung L-14b</strong> y <strong>Saura Kafka</strong>; y, condicionados a autenticar firma a lápiz y certificado, <strong>Dalí Cap de Creus</strong> (1.600 €) y <strong>Clavé obra única</strong> (1.760 €).</p>
      </div>

      <div className="tablewrap">
        <table>
          <thead>
            <tr><th>Obra</th><th>Socio</th><th>Referencia de mercado</th><th>Veredicto</th><th>Chollo</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Miró</strong> · Quelques fleurs pour des amis (1964) · ed. 75</td><td className="n">4.800 €</td><td>retail ~4.500 € (Artsy); subasta 3.000–4.300 € all-in</td><td>⚪ En banda (alto)</td><td>—</td></tr>
            <tr><td><strong>Miró</strong> · Ubu Roi (1966) · prueba HC</td><td className="n">6.800 €</td><td>planchas firmadas 3.300–5.000 €</td><td>🔴 Caro / ❓ plancha</td><td>no</td></tr>
            <tr><td><strong>Miró</strong> · Obra inédita recent (1) (1964) · ed. 100</td><td className="n">2.800 €</td><td>retail 3.250 €+, pero solo <em>inicial</em> (no firma); reventa subasta neta ~550–1.600 €</td><td>⚪ Bien (galería)</td><td>no (reventa)</td></tr>
            <tr><td><strong>Miró</strong> · Obra inédita recent (3) (1964)</td><td className="n">2.800 €</td><td>ídem (solo inicial; reventa floja)</td><td>⚪ Bien (galería)</td><td>no (reventa)</td></tr>
            <tr><td><strong>Miró</strong> · Obra inédita recent (6) (1964)</td><td className="n">2.800 €</td><td>ídem (solo inicial; reventa floja)</td><td>⚪ Bien (galería)</td><td>no (reventa)</td></tr>
            <tr><td><strong>Miró</strong> · Obra inédita recent (5) (1964)</td><td className="n">2.240 €</td><td>el más barato; solo inicial; reventa subasta neta ~550–1.600 €</td><td>⚪ Bien (galería)</td><td>no (reventa)</td></tr>
            <tr><td><strong>Dalí</strong> · Le Chêne et le Roseau (1974) · Bestiaire</td><td className="n">3.120 €</td><td>retail 2.000 € (Artsy); reventa ~1.400 € all-in</td><td>🔴 Caro</td><td>no</td></tr>
            <tr><td><strong>Dalí</strong> · Le Singe et le Léopard (1974)</td><td className="n">2.800 €</td><td>subasta ~1.400 € all-in; retail 2.000–3.850 €</td><td>⚪ En banda (alto)</td><td>no</td></tr>
            <tr><td><strong>Dalí</strong> · Les Animaux Malades de la Peste (1974)</td><td className="n">2.800 €</td><td>≈ serie Bestiaire (inferencia)</td><td>⚪ En banda (alto)</td><td>no</td></tr>
            <tr><td><strong>Dalí</strong> · La Cour du Lion (1974)</td><td className="n">2.800 €</td><td>retail 3.850 €; subasta ~1.000–1.500 €</td><td>⚪ En banda</td><td>no</td></tr>
            <tr><td><strong>Dalí</strong> · Zöotrope et tour Boullée (1973)</td><td className="n">1.760 €</td><td>carpeta completa se remata a ~600–745 €/lámina (Phillips/Bukowskis)</td><td>⚪ En banda (alto)</td><td>no</td></tr>
            <tr><td><strong>Dalí</strong> · Cap de Creus (1979) · litografía firmada</td><td className="n">1.600 €</td><td>subasta firmada all-in ~2.200 € (Swann); retail 3.250–3.650 €</td><td>🟢 Barato (condicional)</td><td>sí ✓</td></tr>
            <tr><td><strong>Tàpies</strong> · La main jaune · ed. 200</td><td className="n">1.520 €</td><td>subasta est. 400–600 €; retail ~900–1.600 €</td><td>⚪ En banda (alto)</td><td>no</td></tr>
            <tr><td><strong>Tàpies</strong> · Messiaen 1986</td><td className="n">1.520 €</td><td>solo consta el <em>cartel</em> (Galfetti 1068, firma en plancha) ~80 €</td><td>❓ A verificar</td><td>no</td></tr>
            <tr><td><strong>Tàpies</strong> · L'esperit català I (1971) · aguatinta+gofrado</td><td className="n">2.160 €</td><td>retail ~3.125 € +IVA (composition)</td><td>🟢 Barato</td><td>sí</td></tr>
            <tr><td><strong>Tàpies</strong> · L'esperit català II (1974) · aguafuerte+gofrado</td><td className="n">2.160 €</td><td>retail ~3.125 € +IVA</td><td>🟢 Barato</td><td>sí</td></tr>
            <tr><td><strong>Tàpies</strong> · Nocturn Matinal</td><td className="n">2.240 €</td><td>hoja suelta ~1.350 €; carpeta ed. 100 más</td><td>❓ A verificar</td><td>depende</td></tr>
            <tr><td><strong>Tàpies</strong> · Grand chaise (Variations)</td><td className="n">2.352 €</td><td>Variations retail 2.990–3.600 €</td><td>🟢 Bien/barato</td><td>sí</td></tr>
            <tr><td><strong>Tàpies</strong> · Improvisations en blanc et en noir 4 (1987)</td><td className="n">2.352 €</td><td>inferencia 2.500–3.500 €</td><td>⚪ Bien</td><td>posible</td></tr>
            <tr><td><strong>Tàpies</strong> · Oval gris (1987)</td><td className="n">2.352 €</td><td>retail 2.990 € (IVA incl.)</td><td>🟢 Barato</td><td>sí</td></tr>
            <tr><td><strong>Tàpies</strong> · Personnage assis (Variations XI)</td><td className="n">2.352 €</td><td>retail 3.600 € (IVA incl.)</td><td>🟢 Barato</td><td>sí</td></tr>
            <tr><td><strong>Tàpies</strong> · Profil (Variations I)</td><td className="n">2.352 €</td><td>Variations 2.990–3.600 €</td><td>🟢 Bien/barato</td><td>sí</td></tr>
            <tr><td><strong>Tàpies</strong> · Venus · aguafuerte (Galfetti 573)</td><td className="n">1.200 €</td><td>inferencia ~1.500–2.800 €</td><td>⚪ Bien (inf.)</td><td>leve</td></tr>
            <tr><td><strong>Tàpies</strong> · Minor IV · aguafuerte (ed. 60)</td><td className="n">1.440 €</td><td>sin comp externo; inferencia ~1.500–2.500 €</td><td>⚪ En banda (inf.)</td><td>—</td></tr>
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
            <tr><td><strong>Clavé</strong> · Sin título (1977) · OBRA ÚNICA · 28,8×14 cm</td><td className="n">1.760 €</td><td>comp por tamaño (~16×24 cm) ~3.100 €; subasta papel 2–4.000 €</td><td>🟢 En banda/barato (condicional)</td><td>leve</td></tr>
          </tbody>
        </table>
      </div>
      <p className="note it">🟢 con * = semi-chollo condicionado a verificar firma a lápiz, edición y certificado. Cifras aproximadas y con confianza variable; algunas «en banda» e «inferencia» salen de comparables de la misma serie, no de la obra exacta.</p>

      <div className="callout">
        <span>⚠️</span>
        <p><strong>A verificar antes de comprar</strong> (cambian el veredicto): <strong>«Messiaen 1986»</strong> — en mercado solo consta el <em>cartel</em> (Galfetti 1068, ed. 1.400, firma impresa en plancha, ~80 €); pide a TdP el nº de catálogo y foto de la firma a lápiz que confirme que es una edición distinta y firmada a mano. <strong>«L'esperit català I/II»</strong> — son <strong>grabados</strong> (aguatinta 1971 / aguafuerte 1974, con gofrado), no litografías. <strong>«Nocturn Matinal»</strong> — existe como carpeta completa (ed. 100) y como hoja suelta (~1.350 €); aclarar cuál venden. <strong>Chillida «Ce maudit moi»</strong> — es un libro deluxe (ed. 50) firmado por Chillida y Cioran; confirmar que es una xilografía suelta. <strong>Goya</strong> — el valor depende de que sea 1ª edición (Desastres 1863 / Tauromaquia 1816); verificar papel y estado. <strong>Miró «Obra inédita recent»</strong> — llevan solo <em>inicial</em> a lápiz (no firma completa); buen precio de galería, pero la reventa en subasta suele quedar por debajo de lo pagado. <strong>Tàpies «Grand chaise»</strong> — ese título no cuadra con ninguna plancha catalogada de Variations; pedir a TdP el nº Galfetti. <strong>Tàpies «Oval gris»</strong> — existe una variante <em>sin firmar</em> más barata; confirmar que es la firmada a lápiz. <strong>Tàpies «Nocturn Matinal»</strong> — es una hoja suelta firmada; a 2.240 € solo se justifica si es la plancha grande «rehaussée» (62×109). <strong>Dalí «Zootrope»</strong> — la ficha de TdP la da como heliograbado+punta seca, ed. 210; verificar edición y precio exacto.</p>
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
