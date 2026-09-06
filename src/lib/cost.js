// Coste real "puerta" e índice de due-diligence.
export function computeCost(price, c = {}) {
  const iva = (Number(c.iva ?? 21)) / 100
  const p = Number(price) || 0
  const net = c.ivaIncl ? p / (1 + iva) : p
  const withIva = net * (1 + iva)
  const mode = c.ivaMode || 'normal'
  const art = mode === 'normal' ? withIva : net
  const extras = (Number(c.marco) || 0) + (Number(c.transporte) || 0) + (Number(c.seguro) || 0)
  return { net, withIva, art, extras, total: art + extras }
}
const DD = ['signed', 'catalogue', 'procedencia', 'cert', 'factura']
export function readiness(s = {}) {
  const ok = DD.filter((k) => s[k] === 'si').length
  return { ok, total: DD.length }
}
