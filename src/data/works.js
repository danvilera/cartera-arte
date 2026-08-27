// Catálogo de obras ofrecidas (datos reales de fichas/certificados, 27 ago 2026).
// Las bandas [min,max] en € son referencias de mercado usadas para puntuar.

export const WEIGHTS = [
  { key: 'precio', label: 'Precio justo', desc: '¿Pagas un precio razonable frente al mercado?', def: 4 },
  { key: 'reval', label: 'Revalorización', desc: 'Potencial de subir de valor y venderse bien.', def: 4 },
  { key: 'confianza', label: 'Autenticidad y confianza', desc: 'Solidez del certificado, catálogo y galería.', def: 5 },
  { key: 'gusto', label: 'Gusto personal', desc: 'Cuánto te gusta para tenerlo en casa.', def: 3 },
]

export const DEFAULT_WEIGHTS = { precio: 4, reval: 4, confianza: 5, gusto: 3 }

export const WORKS = [
  {
    id: 'miro', artist: 'Joan Miró', tech: 'Aguafuerte y aguatinta a color', gallery: 'J. Bagot', price: 6500,
    title: '“Picasso i els Reventós” (1973)',
    bandSigned: [4500, 9000], bandUnsigned: [300, 2500],
    liquidity: 82, prestige: 83, printRisk: 8, specialist: -2,
    ref: 'Dupin 588 · ej. 60/182 · papel Guarro · 53×70 cm',
    comp: 'Comparable: un ejemplar firmado de la serie ~6.300 € en retail (negociable); en subasta, bastante menos.',
    def: { signed: 'si', numbered: 'si', catalogue: 'si', cert: '?' },
    note: 'Firmada y catalogada (Dupin 588). Ojo: es aguafuerte/aguatinta, NO litografía, y falta certificado formal (pídelo). Retail completo: margen para negociar a 5.000–5.500 €.',
  },
  {
    id: 'picasso', artist: 'Pablo Picasso', tech: 'Linograbado aclarado (rincée)', gallery: 'J. Bagot', price: 9500,
    title: '“L’Étreinte II” (15 oct 1963)',
    bandSigned: [7000, 14000], bandUnsigned: [3000, 9000],
    liquidity: 80, prestige: 96, printRisk: 8, specialist: -2,
    ref: 'Bloch 1150 · Baer 1344 · ej. 35/50 · proc. col. H.M. Petiet · 62×75 cm',
    comp: 'Comparable: la versión aguafuerte de la misma imagen ~7.100 € retail; el linograbado rincée es único en cada copia → prima razonable.',
    def: { signed: 'si', numbered: 'si', catalogue: 'si', cert: 'si' },
    note: 'La pieza más “de inversión”: firmada a mano 35/50, doble catálogo, procedencia Petiet, editada por Louise Leiris. Precio justo. Confirmar si es Bloch 1150 o 1151.',
  },
  {
    id: 'dali1', artist: 'Salvador Dalí', tech: 'Aguafuerte + pochoir + acuarela', gallery: 'Mayoral', price: 9000,
    title: '“Les douze tribus d’Israël”, nº 10 (1973)',
    bandSigned: [1500, 5000], bandUnsigned: [400, 2000],
    liquidity: 48, prestige: 80, printRisk: 55, specialist: 8,
    ref: 'Firmada · ej. 144/195 · sello al dorso · 66,5×51 cm',
    comp: 'Serie muy difundida: cadenas piden hasta ~11–12.000 € enmarcada, pero en subasta cada estampa realiza ~500–2.500 €.',
    def: { signed: 'si', numbered: 'si', catalogue: 'si', cert: 'si' },
    note: 'Certificado de Mayoral y obra auténtica catalogada. PERO edición grande, muy comercializada y con gran brecha tienda/reventa. Como inversión, floja.',
  },
  {
    id: 'dali2', artist: 'Salvador Dalí', tech: 'Aguafuerte + pochoir + acuarela', gallery: 'Mayoral', price: 9000,
    title: '“Les douze tribus d’Israël”, nº 6 (1973)',
    bandSigned: [1500, 5000], bandUnsigned: [400, 2000],
    liquidity: 48, prestige: 80, printRisk: 55, specialist: 8,
    ref: 'Firmada · ej. 144/195 · sello al dorso · 66,5×51 cm · pareja 16.000 €',
    comp: 'Misma serie que la nº 10. La pareja sale a 8.000 € c/u; aun así por encima de su reventa realista.',
    def: { signed: 'si', numbered: 'si', catalogue: 'si', cert: 'si' },
    note: 'Segunda del lote. Bonita para pared, mismo problema de liquidez. Si te encantan, negocia el pack con fuerza.',
  },
  {
    id: 'rt_hommage', artist: 'Joan Miró', tech: 'Aguatinta al carborundo', gallery: 'Rubén Torres', price: 5000,
    title: '“Hommage à Joan Miró” (1973)',
    bandSigned: [3000, 10000], bandUnsigned: [800, 3000],
    liquidity: 70, prestige: 83, printRisk: 12, specialist: 0,
    ref: 'HC y dedicada “Cordialment” · ed. 275 · Sala Gaspar · 77×57 cm (marco aparte +700-800 €)',
    comp: 'Grandes carborundos de Miró firmados suelen ir ~3.000–10.000 €. En presupuesto; a confirmar la firma a lápiz.',
    def: { signed: '?', numbered: 'no', catalogue: '?', cert: '?' },
    note: 'La que encaja con tu objetivo de ~5.000 €. Carborundo grande y con carácter. CLAVE: confirma que lleva firma a lápiz de Miró (no solo la dedicatoria). Al ser HC/dedicada es algo menos líquida.',
  },
  {
    id: 'rt_fundacio', artist: 'Joan Miró', tech: 'Litografía', gallery: 'Rubén Torres', price: 10500,
    title: 'Cartel Inauguración Fundació Miró (1975)',
    bandSigned: [4000, 9000], bandUnsigned: [200, 700],
    liquidity: 78, prestige: 84, printRisk: 10, specialist: 0,
    ref: 'Maeght 1031 · firmada a lápiz · 62/99 · La Polígrafa · vidrio museo (reenmarcado incl.)',
    comp: 'Imagen icónica. La versión firmada/99 vale mucho más que el cartel común sin firmar (~200–600 €). Firmadas ~4.000–9.000 €: 10.500 € es caro, negocia.',
    def: { signed: 'si', numbered: 'si', catalogue: 'si', cert: '?' },
    note: 'Miró firmado y numerado, imagen muy reconocible (bonito para casa con “historia”). Pero el precio está por encima de mercado; incluye reenmarcado. Verifica firma/numeración a lápiz.',
  },
  {
    id: 'rt_maproverbis', artist: 'Joan Miró', tech: 'Litografía a color', gallery: 'Rubén Torres', price: 8500,
    title: '“Mà de Proverbis” (1970)',
    bandSigned: [2500, 7000], bandUnsigned: [150, 500],
    liquidity: 78, prestige: 83, printRisk: 12, specialist: 0,
    ref: 'Maeght 678 · firmada y numerada · ed. 75 · Arches · 76×55 cm',
    comp: 'OJO: existe una versión barata firmada solo en plancha (ed. 1.500, ~200–400 €). La firmada a lápiz/75 vale ~2.500–6.000 €. 8.500 € es retail alto.',
    def: { signed: 'si', numbered: 'si', catalogue: 'si', cert: '?' },
    note: 'Litografía firmada a mano (ed. 75), buena. Imprescindible confirmar en persona que es la firmada a LÁPIZ y numerada, no la de plancha de 1.500. Precio alto: negocia.',
  },
  {
    id: 'rt_head', artist: 'Pablo Picasso', tech: 'Aguatinta', gallery: 'Rubén Torres', price: 9000,
    title: '“Head of a Bearded Man” (1966)',
    bandSigned: [3000, 9000], bandUnsigned: [1000, 3500],
    liquidity: 70, prestige: 94, printRisk: 15, specialist: 0,
    ref: 'Bloch 1231 · frontispicio del libro “Papiers collés” · ed. 100 · 38×27 cm',
    comp: 'Es una lámina de libro (frontispicio), normalmente SIN firma; suelen ir ~1.000–3.500 €. A 9.000 € parece caro salvo que esté firmada a mano.',
    def: { signed: 'no', numbered: 'no', catalogue: 'si', cert: '?' },
    note: 'La ficha no menciona firma: casi seguro es lámina de libro sin firmar. A 9.000 € la veo cara. Pregunta expresamente si va firmada a lápiz; si no, descartaría o negociaría fuerte.',
  },
  {
    id: 'rt_fauteuil', artist: 'Pablo Picasso', tech: 'Aguafuerte y aguatinta', gallery: 'Rubén Torres', price: 10000,
    title: '“Modèle au repos dans un fauteuil” (1965)',
    bandSigned: [6000, 20000], bandUnsigned: [2500, 8000],
    liquidity: 78, prestige: 95, printRisk: 12, specialist: 0,
    ref: 'Bloch 1205 · Baer 1187 · ej. 31/50 · impr. Crommelynck · reg. Museo Picasso BCN · proc. col. privada BCN',
    comp: 'Aguatinta de los 60 (taller Crommelynck), ed. 50. Si va firmada a lápiz, ~6.000–20.000 € → 10.000 € razonable. Sin firma, cara.',
    def: { signed: '?', numbered: 'si', catalogue: 'si', cert: '?' },
    note: 'Buena procedencia y registro en el Museo Picasso. La ficha NO dice “firmada”: confírmalo. Firmada, a 10.000 € es un Picasso legítimo a precio de mercado; sin firma, sobra precio.',
  },
]

export function defaultState() {
  const works = {}
  WORKS.forEach((o) => {
    works[o.id] = { price: o.price, ...o.def, gusto: 3 }
  })
  return { weights: { ...DEFAULT_WEIGHTS }, works }
}

// Rellena con defaults cualquier obra/peso que falte en un estado guardado.
export function mergeDefaults(saved) {
  const base = defaultState()
  const out = { weights: { ...base.weights, ...(saved.weights || {}) }, works: { ...base.works } }
  if (saved.works) {
    WORKS.forEach((o) => {
      if (saved.works[o.id]) out.works[o.id] = { ...base.works[o.id], ...saved.works[o.id] }
    })
  }
  return out
}
