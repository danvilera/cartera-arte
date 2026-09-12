import React from 'react'
import { WORKS } from '../data/works'
import { total } from '../lib/scoring'
import { TRIOS, HOLDS, MARKET } from '../data/trios'

const eur = (n) => n.toLocaleString('es-ES') + ' €'

export default function Trios({ state, onOpen, onNav }) {
  const byId = Object.fromEntries(WORKS.map((w) => [w.id, w]))
  const openTrio = (t) => { try { localStorage.setItem('arte_open_trio', t.key) } catch {} ; onNav && onNav('pared') }

  return (
    <section className="prose">
      <p className="lede">Un <b>trío</b> (tres obras que se cuelgan juntas) frente a <b>una sola obra grande</b>. Aquí lo ves unificado: <b>precio total</b>, <b>inversión</b> (3 pequeñas vs 1 grande) y <b>mercado</b> de cada pieza. El montaje visual está en «En la pared».</p>

      <div className="panel">
        <h3 className="sheet-h3" style={{ marginTop: 0 }}>Inversión: ¿3 pequeñas o 1 grande?</h3>
        <p style={{ margin: '0 0 8px' }}>Para <b>revalorización</b>, el mercado premia la calidad/importancia: <b>una sola obra buena y representativa</b> suele comportarse mejor que varias pequeñas menores (que son el tramo más “commodity”). Para <b>liquidez</b>, las pequeñas ganan en rapidez y divisibilidad (vendes una y conservas las otras) pero recuperas menos por euro. En estos tríos el criterio sano es: <b>que 2 de 3 retengan valor</b> (Miró/Tàpies/Braque/Clavé) y dejar 1 “de disfrute” (Dalí). Ninguna comprada a precio de galería es “inversión” estricta —pagas retail, recuperas mayorista—; el objetivo es <b>comprar lo que te enamore que además aguante</b>.</p>
      </div>

      {TRIOS.map((t) => {
        const works = t.ids.map((id) => byId[id]).filter(Boolean)
        const totalPrice = works.reduce((s, w) => s + (w.price || 0), 0)
        const scores = works.map((w) => Math.round(total(w, state.works[w.id], state.weights).t))
        const avg = Math.round(scores.reduce((a, b) => a + b, 0) / (scores.length || 1))
        const holders = works.filter((w) => HOLDS[w.artist]).length
        const frame = works.length * 250
        return (
          <div className="panel" key={t.key} style={{ marginTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
              <h3 className="sheet-h3" style={{ margin: 0 }}>{t.name} <span className="note" style={{ fontWeight: 400 }}>· {t.theme}</span></h3>
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
              <div className="ctl"><label>Precio total (socio)</label><div><b>{eur(totalPrice)}</b> <span className="note">+ enmarcado ≈ {eur(frame)} (vidrio UV70)</span></div></div>
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

            <div style={{ marginTop: 10 }}>
              <button className="btn ghost mini" onClick={() => openTrio(t)}>📐 Ver este trío en la pared</button>
            </div>
          </div>
        )
      })}

      <div className="panel" style={{ marginTop: 14 }}>
        <h3 className="sheet-h3" style={{ marginTop: 0 }}>Trío vs una sola obra grande — resumen</h3>
        <p style={{ margin: 0 }}>Con ~7.000–9.000 € puedes tener <b>un trío catalán firmado</b> (3 nombres, más pared cubierta, liquidez por piezas) o <b>una sola obra mayor y más representativa</b> (mejor revalorización potencial, una sola transacción al vender). Si priorizas <b>disfrute + variedad + identidad catalana</b>: trío. Si priorizas <b>que suba de valor</b>: concentra en una pieza buena (un Miró de entidad, un Tàpies grande o un Goya de 1ª edición) y acompáñala, si acaso, con una sola pequeña.</p>
      </div>
    </section>
  )
}
