import React, { useState } from 'react'
import { WORKS } from '../data/works'

const eur = (n) => (Number(n) || 0).toLocaleString('es-ES', { maximumFractionDigits: 0 }) + ' €'

// Constantes orientativas (retail España). Misma base que el resto de la app.
const GLASS = {
  normal: { label: 'Normal', eur: 45, uv: '0%' },
  ar: { label: 'Antirreflejo', eur: 120, uv: '0%' },
  uv70: { label: 'Museo UV70', eur: 210, uv: '70%' },
  uv99: { label: 'Museo UV99', eur: 340, uv: '99%' },
}
const MOULD = {
  eco: { label: 'Económica', eur: 18 },
  estandar: { label: 'Estándar', eur: 28 },
  premium: { label: 'Premium', eur: 45 },
  museo: { label: 'Museo/madera noble', eur: 70 },
}
const MAT = {
  estandar: { label: 'Estándar', mult: 1 },
  conserv: { label: 'Conservación (algodón)', mult: 1.7 },
}

// Obras de la app con medidas parseables, para autocompletar
const parseDims = (w) => {
  const row = (w.detail || []).find(([k]) => k.toLowerCase().startsWith('dimension'))
  const s = row ? row[1] : (w.ref || '')
  const m = s.match(/([\d.,]+)\s*[x×]\s*([\d.,]+)/)
  if (!m) return null
  return [parseFloat(m[1].replace(',', '.')), parseFloat(m[2].replace(',', '.'))]
}

export default function Enmarcado() {
  const [alto, setAlto] = useState(74)
  const [ancho, setAncho] = useState(55)
  const [mat, setMat] = useState(6)
  const [matType, setMatType] = useState('conserv')
  const [mould, setMould] = useState('estandar')
  const [mouldW, setMouldW] = useState(3)
  const [glass, setGlass] = useState('uv70')
  const [labor, setLabor] = useState(45)
  const [pick, setPick] = useState('')

  const a = Number(alto) || 0, b = Number(ancho) || 0, m = Number(mat) || 0, fw = Number(mouldW) || 0
  const outA = a + 2 * m + 2 * fw
  const outB = b + 2 * m + 2 * fw
  const areaVidrio = ((a + 2 * m) / 100) * ((b + 2 * m) / 100) // vidrio cubre obra + paspartú
  const perimM = 2 * ((outA / 100) + (outB / 100))
  const g = GLASS[glass]
  const cVidrio = areaVidrio * g.eur
  const cMould = perimM * MOULD[mould].eur
  const cMat = (20 + areaVidrio * 25) * MAT[matType].mult
  const cLabor = Number(labor) || 0
  const total = Math.round(cVidrio + cMould + cMat + cLabor)

  const onPick = (id) => {
    setPick(id)
    const w = WORKS.find((x) => x.id === id)
    if (!w) return
    const d = parseDims(w)
    if (d) { setAlto(d[0]); setAncho(d[1]) }
  }

  const Row = ({ label, val }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '.9rem' }}>
      <span style={{ opacity: .75 }}>{label}</span><span style={{ fontVariantNumeric: 'tabular-nums' }}>{val}</span>
    </div>
  )
  const Chips = ({ obj, value, onChange, fmt }) => (
    <div className="chips2" style={{ marginTop: 6 }}>
      {Object.entries(obj).map(([k, v]) => (
        <button key={k} className={'chip2' + (value === k ? ' on' : '')} onClick={() => onChange(k)}>{fmt ? fmt(v) : v.label}</button>
      ))}
    </div>
  )

  const num = { width: '100%', padding: '9px 11px', borderRadius: 10, border: '1px solid var(--line, #e2ddd0)', fontSize: '1rem', background: 'var(--bg, #fff)', color: 'inherit' }

  return (
    <section className="prose">
      <p className="lede">Calcula lo que te costaría <b>enmarcar</b> una obra: mete el tamaño, el paspartú, la moldura y el vidrio, y te da el precio estimado. Útil para negociar el enmarcado en la galería o compararlo con un enmarcador de Barcelona.</p>

      <div className="panel">
        <label style={{ fontWeight: 600 }}>Autocompletar con una obra de la app (opcional)</label>
        <select value={pick} onChange={(e) => onPick(e.target.value)} style={{ ...num, marginTop: 6 }}>
          <option value="">— elegir obra —</option>
          {WORKS.filter((w) => parseDims(w)).map((w) => (
            <option key={w.id} value={w.id}>{w.artist} · {w.title.replace(/[“”"]/g, '').slice(0, 34)}</option>
          ))}
        </select>
      </div>

      <div className="panel" style={{ marginTop: 12 }}>
        <h3 className="sheet-h3" style={{ marginTop: 0 }}>1 · Medidas de la obra (cm)</h3>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}><label className="note">Alto</label><input type="number" value={alto} onChange={(e) => setAlto(e.target.value)} style={num} /></div>
          <div style={{ flex: 1 }}><label className="note">Ancho</label><input type="number" value={ancho} onChange={(e) => setAncho(e.target.value)} style={num} /></div>
        </div>

        <h3 className="sheet-h3">2 · Paspartú</h3>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          <div style={{ width: 110 }}><label className="note">Ancho (cm)</label><input type="number" value={mat} onChange={(e) => setMat(e.target.value)} style={num} /></div>
          <div style={{ flex: 1 }}><label className="note">Tipo</label><Chips obj={MAT} value={matType} onChange={setMatType} /></div>
        </div>

        <h3 className="sheet-h3">3 · Moldura (marco)</h3>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          <div style={{ width: 110 }}><label className="note">Ancho (cm)</label><input type="number" value={mouldW} onChange={(e) => setMouldW(e.target.value)} style={num} /></div>
          <div style={{ flex: 1 }}><label className="note">Tipo (€/m)</label><Chips obj={MOULD} value={mould} onChange={setMould} fmt={(v) => v.label + ' · ' + v.eur + '€/m'} /></div>
        </div>

        <h3 className="sheet-h3">4 · Vidrio</h3>
        <Chips obj={GLASS} value={glass} onChange={setGlass} fmt={(v) => v.label + ' (' + v.uv + ' UV)'} />

        <h3 className="sheet-h3">5 · Mano de obra</h3>
        <input type="number" value={labor} onChange={(e) => setLabor(e.target.value)} style={{ ...num, maxWidth: 140 }} />
      </div>

      <div className="panel" style={{ marginTop: 12, borderLeft: '3px solid var(--accent, #b98b50)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <b style={{ fontSize: '1.05rem' }}>Enmarcado estimado</b>
          <b style={{ fontSize: '1.5rem', color: 'var(--accent, #b98b50)' }}>{eur(total)}</b>
        </div>
        <div style={{ marginTop: 8, borderTop: '1px solid var(--line, #e2ddd0)', paddingTop: 8 }}>
          <Row label={'Vidrio ' + g.label + ' (' + areaVidrio.toFixed(2) + ' m²)'} val={eur(cVidrio)} />
          <Row label={'Moldura ' + MOULD[mould].label + ' (' + perimM.toFixed(2) + ' m)'} val={eur(cMould)} />
          <Row label={'Paspartú ' + MAT[matType].label} val={eur(cMat)} />
          <Row label="Mano de obra" val={eur(cLabor)} />
        </div>
        <p className="note" style={{ margin: '8px 0 0' }}>Marco exterior aprox: <b>{outA.toFixed(0)} × {outB.toFixed(0)} cm</b>. Estimación orientativa (precios retail España); un enmarcador real puede variar ±20%. Para obra en papel valiosa, usa paspartú de conservación (algodón) y vidrio anti-UV.</p>
      </div>
    </section>
  )
}
