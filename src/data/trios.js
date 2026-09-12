// Tríos curados. cfg = configuración lista para "En la pared" (marcos iguales,
// cada obra a su ancho real; art=izquierda, art2=centro, art3=derecha).
export const TRIOS = [
  {
    key: 'cat1', name: 'Trío catalán v1', theme: 'Maestros catalanes',
    subtitle: 'Dalí · Miró (centro) · Tàpies «Messiaen»',
    ids: ['online_dali_zootrope', 'online_miro_recent5', 'online_tapies_messiaen'],
    note: 'Los tres grandes catalanes, verticales y firmados a mano. Miró (color) al centro, Dalí y Tàpies flanqueando.',
    cfg: { uniform: true, outWcm: 66, outHcm: 90, matCm: 4, frameCm: 3, gapCm: 16, matColor: 'hueso', frameColor: 'madera clara', posX: 15, posY: 16,
      artId: 'online_dali_zootrope', artWcm: 39.4, art2Id: 'online_miro_recent5', art2Wcm: 22, art3Id: 'online_tapies_messiaen', art3Wcm: 51.5 },
  },
  {
    key: 'cat2', name: 'Trío catalán v2', theme: 'Maestros catalanes',
    subtitle: 'Dalí · Miró (centro) · Tàpies «Minor IV»',
    ids: ['online_dali_zootrope', 'online_miro_recent5', 'online_tapies_minoriv'],
    note: 'Igual que v1 pero con el Tàpies «Minor IV» (algo más pequeño y barato).',
    cfg: { uniform: true, outWcm: 66, outHcm: 90, matCm: 4, frameCm: 3, gapCm: 16, matColor: 'hueso', frameColor: 'madera clara', posX: 15, posY: 16,
      artId: 'online_dali_zootrope', artWcm: 39.4, art2Id: 'online_miro_recent5', art2Wcm: 22, art3Id: 'online_tapies_minoriv', art3Wcm: 40 },
  },
  {
    key: 'catclave', name: 'Trío catalán con Clavé', theme: 'Maestros catalanes + obra única',
    subtitle: 'Dalí · Miró (centro) · Clavé (obra única)',
    ids: ['online_dali_zootrope', 'online_miro_recent5', 'online_clave_pintura'],
    note: 'Miró + Dalí + una PINTURA ÚNICA de Clavé (irrepetible). Piezas pequeñas: conjunto íntimo. Clavé aporta rareza (no es edición).',
    cfg: { uniform: true, outWcm: 52, outHcm: 78, matCm: 4, frameCm: 3, gapCm: 14, matColor: 'hueso', frameColor: 'madera clara', posX: 18, posY: 20,
      artId: 'online_dali_zootrope', artWcm: 39.4, art2Id: 'online_miro_recent5', art2Wcm: 22, art3Id: 'online_clave_pintura', art3Wcm: 14 },
  },
  {
    key: 'ecole1', name: 'École de Paris v1', theme: 'École de Paris / cubista',
    subtitle: 'Braque «Personnage» · Miró (centro) · Dalí',
    ids: ['online_braque_personnage', 'online_miro_quelquesfleurs', 'online_dali_zootrope'],
    note: 'Tres maestros de la Escuela de París firmados a mano: Braque (cubista) + Miró + Dalí. Braque aporta el registro cubista.',
    cfg: { uniform: true, outWcm: 64, outHcm: 86, matCm: 4, frameCm: 3, gapCm: 16, matColor: 'hueso', frameColor: 'madera clara', posX: 15, posY: 17,
      artId: 'online_braque_personnage', artWcm: 52, art2Id: 'online_miro_quelquesfleurs', art2Wcm: 41, art3Id: 'online_dali_zootrope', art3Wcm: 39.4 },
  },
  {
    key: 'ecole2', name: 'École de Paris v2', theme: 'École de Paris / cubista',
    subtitle: 'Braque «Lettera» · Miró (centro) · Braque «Personnage»',
    ids: ['online_braque_lettera', 'online_miro_recent5', 'online_braque_personnage'],
    note: 'Pareja de Braque (cubista) flanqueando un Miró. Dos Braques = coherencia de autor; el Miró aporta color al centro.',
    cfg: { uniform: true, outWcm: 64, outHcm: 86, matCm: 4, frameCm: 3, gapCm: 16, matColor: 'hueso', frameColor: 'madera clara', posX: 15, posY: 17,
      artId: 'online_braque_lettera', artWcm: 28, art2Id: 'online_miro_recent5', art2Wcm: 22, art3Id: 'online_braque_personnage', art3Wcm: 52 },
  },
  {
    key: 'braque1', name: 'Dalí · Miró · Braque «Lettera»', theme: 'Catalanes + École de Paris',
    subtitle: 'Dalí Zootrope · Miró (centro) · Braque «Lettera amorosa»',
    ids: ['online_dali_zootrope', 'online_miro_recent5', 'online_braque_lettera'],
    note: 'Zootrope + Obra inédita + Braque «Lettera amorosa». Miró (color) al centro; Braque aporta el cubismo. Piezas pequeñas.',
    cfg: { uniform: true, outWcm: 60, outHcm: 82, matCm: 4, frameCm: 3, gapCm: 16, matColor: 'hueso', frameColor: 'madera clara', posX: 16, posY: 18,
      artId: 'online_dali_zootrope', artWcm: 39.4, art2Id: 'online_miro_recent5', art2Wcm: 22, art3Id: 'online_braque_lettera', art3Wcm: 28 },
  },
  {
    key: 'braque2', name: 'Dalí · Miró · Braque «Personnage»', theme: 'Catalanes + École de Paris',
    subtitle: 'Dalí Zootrope · Miró (centro) · Braque «Personnage sur fond rose»',
    ids: ['online_dali_zootrope', 'online_miro_recent5', 'online_braque_personnage'],
    note: 'Zootrope + Obra inédita + Braque «Personnage» (mayor, 67×52). Miró al centro; el Braque da presencia.',
    cfg: { uniform: true, outWcm: 64, outHcm: 86, matCm: 4, frameCm: 3, gapCm: 16, matColor: 'hueso', frameColor: 'madera clara', posX: 15, posY: 17,
      artId: 'online_dali_zootrope', artWcm: 39.4, art2Id: 'online_miro_recent5', art2Wcm: 22, art3Id: 'online_braque_personnage', art3Wcm: 52 },
  },
]

// ¿Retiene valor razonablemente? (heurística por artista, para la vista de inversión)
export const HOLDS = {
  'Joan Miró': true, 'Antoni Tàpies': true, 'Georges Braque': true, 'Antoni Clavé': true,
  'Eduardo Chillida': true, 'Miquel Barceló': true, 'Francisco de Goya': true,
  'Victor Vasarely': true, 'Hans Hartung': true, 'Sonia Delaunay': true,
  'Salvador Dalí': false, 'Pablo Picasso': true, 'Marc Chagall': true,
}

// Qué dice el mercado, por artista (resumen honesto).
export const MARKET = {
  'Joan Miró': 'Muy líquido: miles de resultados de subasta al año. Se revende con facilidad; los litos pequeños retienen razonable, sin gran revalorización.',
  'Salvador Dalí': 'Muy abundante y fácil de vender, PERO la gráfica de los 70 arrastra el problema de las hojas prefirmadas: precios blandos y por debajo del retail al revender. Decorativo, no inversión.',
  'Antoni Tàpies': 'Maestro de museo, liquidez decente en España y Europa. Retiene valor; catalogado (Galfetti) suma.',
  'Georges Braque': 'Blue-chip cubista. Litografías firmadas de los 60 se cotizan bien; ojo: mercado lleno de reproducciones, verificar firma a lápiz.',
  'Antoni Clavé': 'Maestro catalán sólido. Una OBRA ÚNICA (no edición) es lo más difícil de replicar: rareza real, aunque el mercado de Clavé es más de nicho.',
  'Pablo Picasso': 'El más líquido y deseado; pero firmado a mano rara vez baja de ~7K. Fuera del presupuesto de estos tríos.',
}
