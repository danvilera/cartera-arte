// Motor de recomendaciones: rankea las obras por 3 variables + global.
import { WORKS } from '../data/works'
import { metrics, total, liquidityIndex } from './scoring'
import { TRIOS } from '../data/trios'

export function recommend(state, weights) {
  const rows = WORKS.map((o) => {
    const s = state.works[o.id] || {}
    const m = metrics(o, s)
    const inv = Math.round(m.reval)
    const liq = liquidityIndex(o, s)
    const dis = Math.round(s.gusto > 0 ? s.gusto * 20 : o.prestige * 0.9) // si no has puntuado gusto, usa prestigio como proxy
    const glob = total(o, s, weights).t
    const price = Number(s.price) || o.price
    return { o, s, inv, liq, dis, glob, price }
  })
  const topBy = (k, n = 3) => [...rows].sort((a, b) => b[k] - a[k] || a.price - b.price).slice(0, n)

  // Mejor trío por suma de puntuación global de sus 3 obras
  const trioScore = TRIOS.map((t) => {
    const ws = t.ids.map((id) => rows.find((r) => r.o.id === id)).filter(Boolean)
    const sum = ws.reduce((a, r) => a + r.glob, 0)
    const price = ws.reduce((a, r) => a + r.price, 0)
    return { t, avg: Math.round(sum / (ws.length || 1)), price }
  }).sort((a, b) => b.avg - a.avg)

  return {
    inversion: topBy('inv'),
    liquidez: topBy('liq'),
    disfrute: topBy('dis'),
    global: topBy('glob'),
    bestTrio: trioScore[0],
    rows,
  }
}
