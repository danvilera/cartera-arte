import React, { useState } from 'react'
import { WORKS } from '../data/works'
import { total, liquidityIndex, liquidityLabel } from '../lib/scoring'
import { computeCost } from '../lib/cost'

const fmt = (n) => (Number(n) || 0).toLocaleString('es-ES') + ' €'
const last = (s) => s.split(' ').slice(-1)[0]
const short = (t) => t.replace(/[“”"]/g, '').slice(0, 22)

export default function Comparar({ state, onOpen }) {
  const [sel, setSel] = useState(() => WORKS.slice(0, 2).map((w) => w.id))
  const toggle = (id) => setSel((s) => s.includes(id) ? s.filter((x) => x !== id) : (s.length >= 3 ? s : [...s, id]))

  const rows = sel.map((id) => {
    const o = WORKS.find((w) => w.id === id)
    const s = state.works[id] || {}
    const t = total(o, s, state.weights).t
    const cc = computeCost(Number(s.price ?? o.price), s.cost || {})
    const li = liquidityIndex(o, s); const [lt, lc] = liquidityLabel(li)
    return { o, s, t, cc, li, lt, lc }
  })

  const FIELDS = [
    ['Obra', (r) => short(r.o.title)],
    ['Galería', (r) => r.o.gallery],
    ['Técnica', (r) => r.o.tech],
    ['Precio', (r) => fmt(Number(r.s.price ?? r.o.price))],
    ['Coste puerta', (r) => fmt(r.cc.total)],
    ['Puntuación', (r) => <b style={{ fontVariantNumeric: 'tabular-nums' }}>{r.t}</b>],
    ['Liquidez', (r) => <span style={{ color: r.lc }}>{r.lt} · {r.li}</span>],
    ['Firma lápiz', (r) => (r.s.signed || '?')],
    ['En catálogo', (r) => (r.s.catalogue || '?')],
    ['Certificado', (r) => (r.s.cert || '?')],
  ]

  return (
    <div className="prose">
      <p className="lede">Elige hasta 3 obras y compáralas lado a lado: precio, coste puerta real, puntuación y liquidez.</p>
      <div className="chips2" style={{ marginBottom: 8 }}>
        {WORKS.map((w) => (
          <button key={w.id} className={'chip2' + (sel.includes(w.id) ? ' on' : '')} onClick={() => toggle(w.id)}>
            {last(w.artist)} · {short(w.title).slice(0, 16)}
          </button>
        ))}
      </div>
      <p className="note" style={{ marginTop: 0 }}>Seleccionadas: {sel.length}/3</p>

      {rows.length > 0 && (
        <div className="cmp-wrap">
          <table className="cmp">
            <thead><tr><th></th>{rows.map((r) => (<th key={r.o.id}>{last(r.o.artist)}</th>))}</tr></thead>
            <tbody>
              {FIELDS.map(([label, fn]) => (
                <tr key={label}><td>{label}</td>{rows.map((r) => (<td key={r.o.id}>{fn(r)}</td>))}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="cmp-actions">
        {rows.map((r) => (<button className="btn ghost mini" key={r.o.id} onClick={() => onOpen(r.o.id)}>Ver {last(r.o.artist)} ↗</button>))}
      </div>
    </div>
  )
}
