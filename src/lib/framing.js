// Estimación (orientativa) de enmarcado por obra. Precios de vidrio ≈ retail España.
export const GLASS = {
  ar:   { label: 'Antirreflejo', eur: 120, uv: '0%' },
  uv70: { label: 'Museo UV70',   eur: 210, uv: '70%' },
  uv99: { label: 'Museo UV99',   eur: 340, uv: '99%' },
}
// dimsCm = [alto, ancho] de la OBRA. Marco final = obra + 2*paspartú.
export function frameCost(dimsCm, { glass = 'uv70', matCm = 7, mouldingPerM = 28, labor = 45 } = {}) {
  const [a, b] = (dimsCm && dimsCm.length === 2) ? dimsCm : [50, 40]
  const outA = a + 2 * matCm, outB = b + 2 * matCm
  const areaM2 = (outA / 100) * (outB / 100)
  const perimM = 2 * ((outA + 4) / 100 + (outB + 4) / 100)
  const g = GLASS[glass] || GLASS.uv70
  const glassCost = areaM2 * g.eur
  const mould = perimM * mouldingPerM
  const mat = 20 + areaM2 * 25
  const total = Math.round(glassCost + mould + mat + labor)
  return { total, glass: g, breakdown: { glass: Math.round(glassCost), mould: Math.round(mould), mat: Math.round(mat), labor } }
}
export function parseDims(work) {
  const row = (work.detail || []).find(([k]) => k.toLowerCase().startsWith('dimension'))
  const s = row ? row[1] : ''
  const m = s.match(/([\d.,]+)\s*[x×]\s*([\d.,]+)/)
  if (!m) return null
  return [parseFloat(m[1].replace(',', '.')), parseFloat(m[2].replace(',', '.'))]
}
