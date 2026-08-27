// Motor de puntuación (heurística de orientación, no una tasación).
export const BUDGET = 5000
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

export function fairness(o, s) {
  const p = s.price
  const band = s.signed === 'si' ? o.bandSigned : o.bandUnsigned // desconocido = cauto
  const [lo, hi] = band
  let sc
  let flag = null
  if (s.signed === 'si' && p < lo * 0.5) {
    return { sc: 34, flag: 'precio sospechosamente bajo para original firmado' }
  }
  if (p <= lo) sc = 88
  else if (p <= hi) sc = 85 - 30 * ((p - lo) / (hi - lo))
  else sc = Math.max(8, (55 * hi) / p)
  if (s.signed === '?') flag = 'asumido SIN firmar (cauto)'
  return { sc: clamp(sc, 5, 95), flag }
}

export function reval(o, s) {
  let sc = o.liquidity * 0.5 + o.prestige * 0.5
  if (s.signed === 'si') sc += 12
  if (s.signed === 'no') sc -= 18
  if (s.signed === '?') sc -= 8
  if (s.catalogue === 'si') sc += 8
  if (s.numbered === 'si') sc += 4
  sc -= o.printRisk * 0.35
  return clamp(sc, 5, 95)
}

export function confianza(o, s) {
  let sc = 48 + o.specialist
  if (s.cert === 'si') sc += 16
  if (s.cert === 'no') sc -= 18
  if (s.catalogue === 'si') sc += 14
  if (s.catalogue === 'no') sc -= 8
  if (s.signed === 'si') sc += 10
  if (s.signed === 'no') sc -= 6
  sc -= o.printRisk * 0.18
  return clamp(sc, 5, 95)
}

export const gustoScore = (s) => clamp(s.gusto * 20, 5, 100)

export function metrics(o, s) {
  const f = fairness(o, s)
  return {
    precio: f.sc,
    fairFlag: f.flag,
    reval: reval(o, s),
    confianza: confianza(o, s),
    gusto: gustoScore(s),
  }
}

export function total(o, s, w) {
  const m = metrics(o, s)
  const tw = (+w.precio || 0) + (+w.reval || 0) + (+w.confianza || 0) + (+w.gusto || 0) || 1
  const t =
    (m.precio * w.precio + m.reval * w.reval + m.confianza * w.confianza + m.gusto * w.gusto) / tw
  return { t: Math.round(t), m }
}

export function verdict(t) {
  if (t >= 72) return ['Muy buena opción', 'var(--good)']
  if (t >= 60) return ['Opción correcta', 'var(--good)']
  if (t >= 48) return ['Dudosa — pide más datos', 'var(--warn)']
  return ['Floja como está', 'var(--bad)']
}
