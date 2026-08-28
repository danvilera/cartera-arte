// Contenido editorial de la app. Datos históricos consolidados; las cifras de
// mercado son aproximadas y los calendarios de subasta cambian (enlaces en vivo).

export const GLOSSARY = [
  { t: 'Estampa / grabado', d: 'Imagen impresa a partir de una matriz (plancha, piedra, linóleo…). Una “edición” son todas las copias tiradas de esa matriz. No es una reproducción: es obra original múltiple.' },
  { t: 'Litografía', d: 'Técnica plana basada en que el agua y la grasa se repelen. El artista dibuja con material graso sobre una piedra (o plancha) y se estampa. Permite trazo pictórico y color. Miró y Chagall la usaron mucho (taller Mourlot).' },
  { t: 'Aguafuerte (eau-forte)', d: 'Grabado en hueco: se cubre una plancha de metal con barniz, se dibuja rascándolo y el ácido “muerde” esas líneas. Da líneas finas y nerviosas. Base de gran parte del grabado de Picasso.' },
  { t: 'Aguatinta', d: 'Variante del grabado en hueco que crea zonas de tono (grises, sombras, color plano) en vez de solo líneas, mediante una resina porosa mordida por el ácido. Suele combinarse con el aguafuerte.' },
  { t: 'Punta seca (drypoint)', d: 'Se raya la plancha directamente con una punta dura; la rebaba que levanta retiene tinta y da un trazo aterciopelado. Tiradas cortas (la rebaba se desgasta).' },
  { t: 'Linograbado (linocut)', d: 'Grabado en relieve sobre linóleo: se talla y se imprime lo que queda en alto. Picasso revolucionó el color con la técnica de “plancha perdida”. El “linograbado aclarado” (rincée) que viste es un experimento suyo de 1963.' },
  { t: 'Xilografía', d: 'Como el linograbado pero sobre madera. Técnica de relieve muy antigua.' },
  { t: 'Carborundo (carborundum)', d: 'Se crea relieve pegando carborundo (un abrasivo) a la plancha; retiene mucha tinta y da texturas densas, casi tridimensionales. Miró y Tàpies lo emplearon en obra tardía.' },
  { t: 'Serigrafía', d: 'Impresión a través de una malla (screenprint). Colores planos y saturados. Muy usada en pop art.' },
  { t: 'Pochoir', d: 'Coloreado a mano mediante plantillas (stencil). Aporta color a un grabado, copia a copia.' },
  { t: 'Tirada / edición', d: 'Número total de copias. “40/75” = copia 40 de una edición de 75. Cuanto más pequeña la edición, más valor (salvo excepciones).' },
  { t: 'P/A, E/A, H.C.', d: 'Pruebas fuera de la numeración: P/A (prueba de artista, artist’s proof), E/A (épreuve d’artiste), H.C. (hors-commerce, fuera de comercio). Legítimas, a veces más buscadas, a veces algo menos líquidas.' },
  { t: 'Firma a lápiz vs. en plancha', d: 'A lápiz: el artista firmó cada copia a mano → mucho más valor. En plancha (o “en la piedra”): la firma es parte de la imagen impresa, está en todas las copias → vale poco. Es la comprobación nº 1.' },
  { t: 'Catálogo razonado', d: 'Inventario oficial de la obra de un artista, con número de referencia. Miró→Dupin/Maeght, Picasso→Bloch/Baer, Dalí→Michler-Löpsinger. Que la obra conste en él es señal de autenticidad.' },
  { t: 'En vida vs. póstuma', d: 'Estampada mientras el artista vivía (más valor) o después de morir, a menudo con sello de la sucesión (“Succession Picasso”). Las póstumas valen bastante menos.' },
  { t: 'Papel', d: 'El soporte importa: Arches, Guarro, Rives, papel japón… Los papeles de tina con barbas (bordes irregulares) y filigrana son buena señal.' },
  { t: 'Paspartú (passe-partout)', d: 'La cartulina con ventana que separa la obra del cristal. Protege y realza; debe ser libre de ácido (museum board).' },
  { t: 'Foxing', d: 'Manchitas marrones de humedad/hongos en el papel. Defecto de conservación que resta valor.' },
  { t: 'Procedencia', d: 'Historial de propietarios de la obra. Una buena procedencia (colecciones célebres, galerías serias) añade confianza y valor.' },
  { t: 'Certificado de autenticidad', d: 'Documento que garantiza la obra. Vale por quién lo firma: mejor la fundación del artista o una galería/experto de prestigio que un vendedor cualquiera.' },
  { t: 'Prima del comprador (buyer’s premium)', d: 'Comisión que la casa de subastas suma al precio de martillo (hoy ~25-27% + impuestos). Ojo: el precio final que pagas es bastante más que la puja.' },
]

export const ARTISTS = [
  {
    id: 'picasso', name: 'Pablo Picasso', years: '1881–1973', origin: 'Málaga, España',
    blurb: 'El artista más influyente del siglo XX y coinventor del cubismo. Reinventó su estilo una y otra vez y fue un grabador prolífico e innovador: sus estampas firmadas son de lo más líquido del mercado.',
    periods: [
      ['1895–1900', 'Formación', 'La Llotja (Barcelona) y Madrid. Dominio académico precoz; ambiente de Els Quatre Gats.'],
      ['1901–1904', 'Época Azul', 'Melancolía, pobreza, figuras alargadas en azules. Tras el suicidio de su amigo Casagemas.'],
      ['1904–1906', 'Época Rosa', 'Arlequines, saltimbanquis, tonos cálidos. Llegada a París (Bateau-Lavoir).'],
      ['1907–1917', 'Cubismo', '“Les Demoiselles d’Avignon” (1907) rompe la perspectiva. Cubismo analítico y sintético con Braque; nace el collage.'],
      ['1917–1925', 'Vuelta al orden', 'Neoclasicismo, figuras monumentales, ballets rusos. Reinterpreta a los clásicos.'],
      ['1925–1936', 'Influencia surrealista', 'Distorsión, agresividad, erotismo. La Suite Vollard (grabado) es de este arco.'],
      ['1937–1945', 'Guerra', '“Guernica” (1937). Obra sombría durante la II Guerra Mundial en París.'],
      ['1946–1960s', 'Mediodía francés', 'Vallauris: cerámica, litografía y linograbado a color. Reinterpreta a Velázquez, Delacroix.'],
      ['1960s–1973', 'Última etapa (Mougins)', 'Explosión gráfica: Suite 347 (1968), mosqueteros, temática erótica y del taller. Libertad total.'],
    ],
  },
  {
    id: 'miro', name: 'Joan Miró', years: '1893–1983', origin: 'Barcelona, España',
    blurb: 'Su lenguaje poético de signos, estrellas, ojos y colores primarios es inconfundible. Gran experimentador del grabado y la litografía; obra muy reconocible y comercial.',
    periods: [
      ['1915–1920', 'Formación', 'Academia Galí; influencias fauvistas y del cubismo. Círculos de vanguardia de Barcelona.'],
      ['1921–1924', 'Detallismo / realismo poético', '“La Masía”: precisión casi mágica antes de abstraerse.'],
      ['1924–1930', 'París y surrealismo', 'Firma el manifiesto surrealista. “Pinturas-sueño”, fondos etéreos, nace su vocabulario de signos.'],
      ['1930s', '“Asesinato de la pintura”', 'Collages, objetos, obra fiera y experimental; “pinturas salvajes”.'],
      ['1940–1941', 'Constelaciones', 'Serie clave: cielos poblados de signos, estrellas y figuras. En plena guerra.'],
      ['1944–1959', 'Posguerra', 'Cerámica y escultura con Josep Llorens Artigas; empieza su gran obra gráfica (Mourlot, Maeght).'],
      ['1960s–1975', 'Consagración', 'Grandes formatos, carborundo, litografía y aguafuerte. Reconocimiento internacional.'],
      ['1975–1983', 'Palma y la Fundació', 'Fundació Joan Miró (1975). Última etapa desde Mallorca; obra gestual y luminosa.'],
    ],
  },
  {
    id: 'dali', name: 'Salvador Dalí', years: '1904–1989', origin: 'Figueres, España',
    blurb: 'Genio del surrealismo y showman. Técnicamente deslumbrante en pintura; su obra gráfica, en cambio, es un mercado difícil por las miles de hojas prefirmadas (comprueba siempre autenticidad).',
    periods: [
      ['1922–1928', 'Formación', 'Residencia de Estudiantes (con Lorca y Buñuel). Ensaya cubismo, purismo, metafísica.'],
      ['1929–1939', 'Surrealismo', 'Método paranoico-crítico; relojes blandos (“La persistencia de la memoria”, 1931). Su etapa cumbre.'],
      ['1940–1948', 'Exilio en EE. UU.', 'Fama mediática, retrato, diseño, cine (con Hitchcock/Disney).'],
      ['1949–1960s', 'Misticismo nuclear', 'Vuelta al clasicismo y lo religioso; “Cristo de San Juan de la Cruz” (1951).'],
      ['1960s–1970s', 'Obra gráfica masiva', 'Enormes tiradas de grabados y litografías (aquí está el problema de autenticidad).'],
      ['1980s', 'Últimos años', 'Declive de salud; Teatre-Museu Dalí de Figueres como legado.'],
    ],
  },
  {
    id: 'tapies', name: 'Antoni Tàpies', years: '1923–2012', origin: 'Barcelona, España',
    blurb: 'Máximo exponente del informalismo español y de la “pintura matérica”. Cruces, muros, materia; una obra austera y espiritual. Gráfica muy apreciada y bastante líquida en España.',
    periods: [
      ['1948–1953', 'Dau al Set', 'Inicios mágico-surrealistas junto al grupo Dau al Set (con Brossa).'],
      ['1953–1960s', 'Pintura matérica', 'Polvo de mármol, arena, incisiones: la superficie como muro. Su gran aportación.'],
      ['1960s–1970s', 'Signos y objetos', 'Cruces, letras, la “T”, objetos cotidianos incorporados. Compromiso político.'],
      ['1980s–2012', 'Obra tardía', 'Gran formato, barnices, obra gráfica abundante. Fundació Tàpies (1990).'],
    ],
  },
  {
    id: 'chillida', name: 'Eduardo Chillida', years: '1924–2002', origin: 'San Sebastián, España',
    blurb: 'Escultor vasco del espacio, el hierro y el vacío. En papel destacan sus “gravitaciones” y grabados de gran fuerza gráfica: negros rotundos y blancos. Mercado sólido y reconocible.',
    periods: [
      ['1948–1951', 'París', 'Arranca con figuración en yeso; pronto vira a la abstracción.'],
      ['1951–1960s', 'El hierro', 'Vuelve al País Vasco y trabaja la forja tradicional. Ritmo, brazos en el espacio.'],
      ['1960s–1980s', 'Materiales y monumentales', 'Acero, hormigón, alabastro, madera. “El peine del viento” (San Sebastián, 1977).'],
      ['1970s–2002', 'Papel y gráfica', 'Gravitaciones (papel recortado y cosido), grabados y xilografías. Chillida-Leku (2000).'],
    ],
  },
  {
    id: 'chagall', name: 'Marc Chagall', years: '1887–1985', origin: 'Vitebsk (actual Bielorrusia)',
    blurb: 'Poeta del color y de la memoria: amantes flotando, violinistas, aldeas, motivos judíos y bíblicos. Gran litógrafo (Mourlot); obra gráfica muy decorativa y demandada.',
    periods: [
      ['1906–1910', 'Rusia', 'Formación en San Petersburgo; imaginería de Vitebsk que le acompañará siempre.'],
      ['1911–1914', 'París (La Ruche)', 'Contacto con cubismo y orfismo; color y fantasía propios.'],
      ['1914–1922', 'Revolución rusa', 'Comisario de Bellas Artes en Vitebsk; escenografía teatral.'],
      ['1923–1941', 'Francia', 'Encargos de grabado (Vollard): “Almas muertas”, “Fábulas”, la Biblia.'],
      ['1941–1948', 'Exilio en EE. UU.', 'Huye del nazismo; muere su esposa Bella. Ballet, dolor y memoria.'],
      ['1948–1985', 'Sur de Francia', 'Litografía a color (Mourlot), vidrieras, techo de la Ópera de París (1964).'],
    ],
  },
]

export const LIQUIDITY_EXPLAINER = [
  'La liquidez es lo fácil y rápido que puedes convertir la obra en dinero SIN malvenderla. El arte es, en general, poco líquido: vender bien puede llevar meses (consignar a subasta, esperar la venta adecuada) y el resultado es incierto.',
  'Dentro del arte, la obra gráfica firmada de nombres muy reconocibles (Miró, Picasso, Chagall) está en el extremo MÁS líquido: precios de entrada más bajos, imágenes conocidas y una base amplia de compradores. Las piezas únicas y caras, o de mercados difíciles (mucha gráfica de Dalí), son menos líquidas.',
  'El “índice de liquidez” de cada obra (en la pestaña Obras) estima esto de 0 a 100 combinando: profundidad de mercado del artista, riesgo de la gráfica, si está firmada y catalogada, y el precio (a menor precio, más compradores). Es una orientación, no una garantía.',
]

export const FINANCE_INTRO = [
  'Invertir en arte NO es como comprar acciones. Compras un objeto físico que no paga nada mientras lo tienes (ni dividendos ni alquiler): solo ganas —o pierdes— cuando lo vendes. El horizonte razonable es largo, de años.',
  'Los costes de entrada y salida son altos. En subasta pagas una prima del comprador de ~25-27% sobre la puja (más impuestos), y al vender te descuentan comisión del vendedor (~10-15%). Sumando enmarcado, seguro y transporte, el “roundtrip” puede comerse fácilmente un 25-40% del valor. Para ganar dinero, la obra tiene que revalorizarse bastante solo para cubrir eso.',
  'La rentabilidad histórica de los índices de arte ronda cifras de un dígito medio a largo plazo, pero con una dispersión enorme: unos pocos nombres tiran del índice y la mayoría de las obras no baten a la bolsa. La ventaja real del arte no es superar al mercado, sino diversificar (baja correlación con la bolsa) y el disfrute de tenerlo.',
]

// Comparativa cualitativa por clase de activo (aprox., orientativa)
export const ASSET_COMPARISON = {
  cols: ['Rentab. histórica*', 'Liquidez', 'Renta/ingresos', 'Costes', 'Volatilidad', 'Disfrute'],
  rows: [
    ['Arte (gráfica blue-chip)', 'Media (muy dispersa)', 'Baja', 'No', 'Altos', 'Media', 'Alto'],
    ['Bolsa (índice global)', 'Alta (~7-9%/año hist.)', 'Muy alta', 'Dividendos', 'Bajos', 'Media-alta', 'Nulo'],
    ['Inmobiliario', 'Media-alta', 'Baja', 'Alquiler', 'Altos', 'Media', 'Medio'],
    ['Oro', 'Media', 'Alta', 'No', 'Bajos', 'Media', 'Bajo'],
    ['Bonos (deuda)', 'Baja-media', 'Alta', 'Cupón', 'Bajos', 'Baja', 'Nulo'],
    ['Cripto', 'Muy dispersa', 'Alta', 'No', 'Medios', 'Muy alta', 'Bajo'],
  ],
  note: '*Cifras históricas aproximadas y NO garantía de futuro. La rentabilidad del arte varía muchísimo según artista y obra concretos.',
}

export const OUTLOOK = [
  ['El mercado del arte', 'Tras los máximos de 2021-2022, el mercado se enfrió en 2023-2025, sobre todo en la gama alta y el arte ultra-contemporáneo. Lo “blue-chip” consolidado (maestros modernos) y la obra gráfica de calidad han aguantado mejor por su base amplia de compradores. Nadie sabe el futuro; trátalo como una tenencia a largo plazo, no como una apuesta a corto.'],
  ['Las inversiones en general', 'El consenso apunta a tipos de interés más normalizados tras el ciclo de subidas, lo que suele favorecer a activos de riesgo, pero con incertidumbre alta (geopolítica, IA, inflación). No te fíes de predicciones tajantes: diversifica y no metas en arte dinero que puedas necesitar pronto.'],
  ['Mi recomendación para ti', 'Compra la obra sobre todo porque te guste y quieras vivir con ella; que además conserve o gane valor es la guinda, no la tesis. Con ~5.000 €, una buena litografía/aguafuerte firmado de Miró o Picasso es una entrada sensata: disfrute alto y de lo más líquido dentro del arte. No pongas aquí ahorros que necesites a corto plazo.'],
]

export const CHANNELS = [
  {
    name: 'Galería física', best: 'Confianza y asesoramiento',
    pros: ['Ves la obra y su estado en persona', 'Certificado, factura y procedencia claros', 'Puedes negociar y crear relación'],
    cons: ['Precio de retail (con margen de galería)', 'Oferta limitada a su stock'],
    tip: 'Lo mejor para tu primera compra: pagas algo más pero compras tranquilidad. Es tu caso actual (Bagot, Mayoral, Rubén Torres).',
  },
  {
    name: 'Galería / plataforma online', best: 'Comparar y encontrar',
    pros: ['Enorme oferta y comparación de precios', 'Transparencia de referencias de catálogo'],
    cons: ['No ves el estado real; fotos pueden engañar', 'Cuidado con vendedores no verificados y falsos “Dalí”'],
    tip: 'Artsy y 1stDibs para hacerte una idea de precios; compra solo a galerías con buena reputación y política de devolución.',
  },
  {
    name: 'Subasta (online o presencial)', best: 'Precio (si sabes lo que haces)',
    pros: ['Puedes comprar por debajo del retail', 'Catálogos con referencia y procedencia'],
    cons: ['Prima del comprador ~25-27% + impuestos sobre la puja', 'Sin devolución; el estado es cosa tuya (pide condition report)', 'Te puedes embalar en la puja'],
    tip: 'Ideal cuando ya sabes lo que buscas y puedes valorar el estado. Fija tu precio máximo incluyendo la prima y no lo pases.',
  },
]

export const AUCTION_HOUSES = [
  { name: 'Sotheby’s', where: 'Londres · Nueva York · París', focus: 'Maestros modernos y obra gráfica (Prints & Multiples).', cadence: 'Grandes ventas de moderno en NY (mayo y nov.) y Londres (mar. y oct.); “Prints” en primavera y otoño.', url: 'https://www.sothebys.com/en/calendar' },
  { name: 'Christie’s', where: 'Londres · Nueva York · París', focus: 'Impresionista & moderno, contemporáneo y grabado.', cadence: 'Cadencia similar a Sotheby’s: NY may/nov, Londres mar/oct; sesiones de Prints.', url: 'https://www.christies.com/en/auctions' },
  { name: 'Phillips', where: 'Londres · Nueva York', focus: 'Moderno y contemporáneo; “Editions” (gráfica).', cadence: 'Editions en primavera y otoño.', url: 'https://www.phillips.com/calendar' },
  { name: 'Bonhams', where: 'Londres · varios', focus: 'Prints & Multiples con precios de entrada más accesibles.', cadence: 'Varias ventas de gráfica al año.', url: 'https://www.bonhams.com/auctions/' },
  { name: 'Artcurial', where: 'París', focus: 'Moderno y gráfica europea.', cadence: 'Ventas regulares de estampas.', url: 'https://www.artcurial.com/en/calendar' },
  { name: 'Setdart', where: 'Barcelona (online)', focus: 'Mucha obra gráfica española (Miró, Picasso, Tàpies, Chillida). Cerca de ti.', cadence: 'Subastas online muy frecuentes, casi semanales.', url: 'https://www.setdart.com' },
  { name: 'Balclis', where: 'Barcelona', focus: 'Arte y gráfica; casa histórica catalana.', cadence: 'Subastas mensuales aprox.', url: 'https://www.balclis.com' },
  { name: 'Durán / Ansorena / Segre', where: 'Madrid', focus: 'Casas españolas con secciones de obra gráfica.', cadence: 'Ventas periódicas; revisa sus calendarios.', url: 'https://www.duran-subastas.com/es/calendar' },
]
