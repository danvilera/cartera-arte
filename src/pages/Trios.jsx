import React, { useState } from 'react'
import { WORKS } from '../data/works'
import { total } from '../lib/scoring'
import { TRIOS, HOLDS, MARKET } from '../data/trios'
import { frameCost, GLASS, parseDims } from '../lib/framing'

const eur = (n) => (Number(n) || 0).toLocaleString('es-ES') + ' €'

function printSet(t, works, glass, framing, totalPrice) {
  const rows = works.map((w, i) => {
    const d = parseDims(w)
    const fc = frameCost(d, { glass })
    return `<tr><td><img src="${w.img}" style="height:90px"></td><td><b>${w.artist}</b><br>${w.title}<br><span style="color:#777">${(d ? d[0] + '×' + d[1] + ' cm' : '')}</span></td><td style="text-align:right">${eur(w.price)}</td><td style="text-align:right">${eur(fc.total)}</td></tr>`
  }).join('')
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${t.name}</title>
  <style>body{font:14px -apple-system,Segoe UI,Roboto,sans-serif;color:#1e1b16;padding:28px;max-width:720px;margin:auto}
  h1{font-size:1.4rem;margin:0 0 2px} .sub{color:#777;margin:0 0 18px} table{width:100%;border-collapse:collapse}
  td{border-bottom:1px solid #eee;padding:8px;vertical-align:top} .tot{font-size:1.1rem} .note{color:#777;font-size:.85rem;margin-top:14px}</style></head>
  <body><h1>${t.name}</h1><p class="sub">${t.subtitle} · ${t.theme}</p>
  <table><thead><tr><td></td><td>Obra</td><td style="text-align:right">Precio</td><td style="text-align:right">Marco (${GLASS[glass].label})</td></tr></thead>
  <tbody>${rows}</tbody>
  <tfoot><tr><td></td><td><b>Total</b></td><td style="text-align:right"><b>${eur(totalPrice)}</b></td><td style="text-align:right"><b>${eur(framing)}</b></td></tr>
  <tr><td></td><td class="tot"><b>Obra + enmarcado</b></td><td colspan="2" style="text-align:right" class="tot"><b>${eur(totalPrice + framing)}</b></td></tr></tfoot></table>
  <p class="note">${t.note}</p>
  <p class="note">Precios socio (Taller del Prado, −20%). Enmarcado orientativo con vidrio ${GLASS[glass].label} (${GLASS[glass].uv} UV). Cartera de Arte.</p>
  </body></html>`
  const w = window.open('', '_blank')
  if (!w) { alert('Permite las ventanas emergentes para exportar el PDF.'); return }
  w.document.write(html); w.document.close(); w.focus(); setTimeout(() => w.print(), 400)
}

export default function Trios({ state, onOpen, onNav }) {
  const [glass, setGlass] = useState('uv70')
  const byId = Object.fromEntries(WORKS.map((w) => [w.id, w]))
  const openTrio = (t) => { try { localStorage.setItem('arte_open_trio', t.key) } catch {} ; onNav && onNav('pared') }

  return (
    <section className="prose">
      <p className="lede">Un <b>trío o dúo</b> (obras que se cuelgan juntas) frente a <b>una sola obra</b>. Ves <b>precio total</b>, <b>enmarcado</b>, <b>inversión</b> (3 pequeñas vs 1 grande) y <b>mercado</b> de cada pieza. El montaje visual está en «En la pared».</p>

      <div className="panel">
        <h3 className="sheet-h3" style={{ marginTop: 0 }}>Inversión: ¿varias pequeñas o 1 grande?</h3>
        <p style={{ margin: '0 0 8px' }}>Para <b>revalorización</b>, el mercado premia calidad/importancia: <b>una obra buena</b> suele batir a varias pequeñas menores. Para <b>liquidez</b>, las pequeñas ganan en rapidez y divisibilidad pero recuperas menos por euro. Regla sana: que <b>2 de 3 retengan valor</b> (Miró/Tàpies/Braque/Goya/Clavé) y dejar 1 “de disfrute”. Un <b>dúo</b> de 2 piezas fuertes suele ser mejor inversión que un trío con una decorativa.</p>
        <div className="ctl" style={{ marginTop: 6 }}><label>Vidrio para el cálculo de enmarcado</label>
          <div className="chips2">
            {Object.entries(GLASS).map(([k, g]) => (
              <button key={k} className={'chip2' + (glass === k ? ' on' : '')} onClick={() => setGlass(k)}>{g.label} · {g.uv} UV</button>
            ))}
          </div>
        </div>
      </div>

      {TRIOS.map((t) => {
        const works = t.ids.map((id) => byId[id]).filter(Boolean)
        const totalPrice = works.reduce((s, w) => s + (w.price || 0), 0)
        const framing = works.reduce((s, w) => s + frameCost(parseDims(w), { glass }).total, 0)
        const scores = works.map((w) => Math.round(total(w, state.works[w.id], state.weights).t))
        const avg = Math.round(scores.reduce((a, b) => a + b, 0) / (scores.length || 1))
        const holders = works.filter((w) => HOLDS[w.artist]).length
        const isDuo = works.length === 2
        return (
          <div className="panel" key={t.key} style={{ marginTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
              <h3 className="sheet-h3" style={{ margin: 0 }}>
                <span style={{ fontSize: '.7rem', padding: '2px 7px', borderRadius: 20, background: isDuo ? 'var(--warn,#c99)' : 'var(--accent,#b98b50)', color: '#fff', marginRight: 8, verticalAlign: 'middle' }}>{works.length === 2 ? 'DÚO' : works.length >= 4 ? 'CUARTETO' : 'TRÍO'}</span>
                {t.name} <span className="note" style={{ fontWeight: 400 }}>· {t.theme}</span>
              </h3>
              <b style={{ fontSize: '1.15rem' }}>{eur(totalPrice)}</b>
            </div>
            <p className="note" style={{ margin: '4px 0 10px' }}>{t.subtitle}</p>

            <div style={{ display: 'flex', gap: 8 }}>
              {works.map((w) => (
                <button key={w.id} onClick={() => onOpen && onOpen(w.id)} title={w.title}
                  style={{ flex: 1, border: '1px solid var(--line,#e2ddd0)', borderRadius: 8, overflow: 'hidden', background: '#fff', cursor: 'pointer', padding: 0, aspectRatio: '3/4' }}>
                  <img src={w.img} alt={w.title} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                </button>
              ))}
            </div>

            <div className="two" style={{ marginTop: 10 }}>
              <div className="ctl"><label>Obra + enmarcado</label><div><b>{eur(totalPrice + framing)}</b> <span className="note">(obra {eur(totalPrice)} + marco {eur(framing)}, {GLASS[glass].label})</span></div></div>
              <div className="ctl"><label>Valoración media</label><div><b>{avg}/100</b> · retienen valor <b>{holders} de {works.length}</b></div></div>
            </div>

            <p style={{ margin: '8px 0 4px' }}>{t.note}</p>
            <details>
              <summary className="note" style={{ cursor: 'pointer' }}>Qué dice el mercado de cada pieza</summary>
              <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
                {[...new Set(works.map((w) => w.artist))].map((a) => (
                  <li key={a} style={{ margin: '6px 0' }}><b>{a}:</b> {MARKET[a] || 'Maestro reconocido; ver ficha.'}</li>
                ))}
              </ul>
            </details>

            <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn ghost mini" onClick={() => openTrio(t)}>📐 Ver en la pared</button>
              <button className="btn ghost mini" onClick={() => printSet(t, works, glass, framing, totalPrice)}>📄 Exportar PDF</button>
            </div>
          </div>
        )
      })}
    </section>
  )
}
