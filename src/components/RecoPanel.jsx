import React, { useEffect, useState } from 'react'
import { recommend } from '../lib/recommend'

const eur = (n) => (Number(n) || 0).toLocaleString('es-ES') + ' €'
const last = (n) => n.split(' ').slice(-1)[0]
const shortTitle = (t) => t.replace(/[“”"]/g, '').slice(0, 26)

export default function RecoPanel({ state, weights, onOpen, onNav }) {
  const [ts, setTs] = useState(() => { try { return localStorage.getItem('arte_reco_ts') || '' } catch { return '' } })
  const [, bump] = useState(0)

  // "Semanal": si no hay marca o pasó >7 días, se considera regenerada al visitar.
  useEffect(() => {
    const due = !ts || (Date.now() - new Date(ts).getTime()) > 7 * 864e5
    if (due) { const now = new Date().toISOString(); try { localStorage.setItem('arte_reco_ts', now) } catch {} ; setTs(now) }
  }, []) // eslint-disable-line

  const r = recommend(state, weights)
  const gen = () => { const now = new Date().toISOString(); try { localStorage.setItem('arte_reco_ts', now) } catch {} ; setTs(now); bump((x) => x + 1) }
  const fmtDate = (d) => { try { return new Date(d).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) } catch { return '—' } }

  const Block = ({ icon, title, list, key1, why }) => (
    <div className="panel" style={{ marginTop: 10 }}>
      <h4 style={{ margin: '0 0 6px', fontSize: '.95rem' }}>{icon} {title}</h4>
      <ol className="toplist">
        {list.map((x) => (
          <li key={x.o.id}>
            <button className="linkbtn" onClick={() => onOpen && onOpen(x.o.id)}>{last(x.o.artist)} · {shortTitle(x.o.title)}</button>
            <b>{x[key1]}</b>
          </li>
        ))}
      </ol>
      <p className="note" style={{ margin: '4px 0 0' }}>{why}</p>
    </div>
  )

  const g = r.global[0]
  const bt = r.bestTrio

  return (
    <div className="panel" style={{ borderLeft: '3px solid var(--accent, #b98b50)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
        <h3 className="sheet-h3" style={{ marginTop: 0 }}>✨ Recomendación</h3>
        <button className="btn ghost mini" onClick={gen}>↻ Generar ahora</button>
      </div>
      <p className="note" style={{ margin: '0 0 6px' }}>Se refresca sola cada semana · última: <b>{fmtDate(ts)}</b>. Basada en tus datos actuales (precios, firma, gusto y pesos).</p>

      {g && (
        <p style={{ margin: '6px 0 2px' }}><b>Global:</b> con tus pesos actuales, la opción más equilibrada es <button className="linkbtn" onClick={() => onOpen && onOpen(g.o.id)}>{g.o.artist} · {shortTitle(g.o.title)}</button> ({g.glob}/100). {bt && <>Como conjunto, el mejor trío por valoración es <button className="linkbtn" onClick={() => onNav && onNav('trios')}>{bt.t.name}</button> ({eur(bt.price)}).</>}</p>
      )}

      <div className="dash-grid">
        <Block icon="📈" title="Inversión" list={r.inversion} key1="inv" why="Mayor potencial de retener/subir (liquidez + prestigio + firma/catálogo − riesgo de gráfica)." />
        <Block icon="💧" title="Liquidez" list={r.liquidez} key1="liq" why="Más fácil y rápido de revender a buen precio (mercado profundo + precio de entrada bajo)." />
        <Block icon="❤️" title="Disfrute" list={r.disfrute} key1="dis" why="Según tu puntuación de gusto (o prestigio si aún no la has puesto). Súbela en cada ficha." />
      </div>
    </div>
  )
}
