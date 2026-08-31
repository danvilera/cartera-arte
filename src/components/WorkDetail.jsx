import React, { useEffect } from 'react'
import { BUDGET, liquidityIndex, liquidityLabel } from '../lib/scoring'

const fmt = (n) => (Number(n) || 0).toLocaleString('es-ES') + ' €'

export default function WorkDetail({ work: o, state: s, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  const price = Number(s?.price ?? o.price)
  const d = price - BUDGET

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <button className="sheet-close" onClick={onClose} aria-label="Cerrar">✕</button>

        <div className="sheet-hero">
          {o.img ? <img src={o.img} alt={o.artist + ' — ' + o.title} /> : <div style={{ display: 'grid', placeItems: 'center', height: '100%', minHeight: 160, opacity: 0.6 }}>Sin imagen · ver en la galería</div>}
        </div>

        <div className="sheet-body">
          <div className="eyebrow">{o.gallery}</div>
          <h2 className="sheet-title">{o.artist}</h2>
          <div className="sheet-sub">{o.title}</div>

          <div className="priceRow" style={{ margin: '12px 0' }}>
            <span className="price">{fmt(price)}</span>
            {d > 0
              ? <span className="delta over">+{fmt(d)} sobre tu objetivo</span>
              : <span className="delta under">{fmt(Math.abs(d))} bajo objetivo</span>}
          </div>

          {(() => {
            const li = liquidityIndex(o, s); const [lt, lc] = liquidityLabel(li)
            return (
              <div className="liq-bar">
                <span>Índice de liquidez</span>
                <div className="track" style={{ flex: 1 }}><div className="fill" style={{ width: li + '%', background: lc }} /></div>
                <b style={{ color: lc }}>{lt} · {li}</b>
              </div>
            )
          })()}

          <p className="note" style={{ fontSize: '0.92rem' }}>{o.desc}</p>

          <h3 className="sheet-h3">Ficha</h3>
          <dl className="ficha">
            {o.detail.map(([k, v]) => (
              <div className="ficha-row" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <h3 className="sheet-h3">Mercado</h3>
          <p className="note it">{o.comp}</p>

          <h3 className="sheet-h3">Mi lectura</h3>
          <p className="note">{o.note}</p>

          <a className="btn full" href={o.pdf || o.url} target="_blank" rel="noopener noreferrer">{o.pdf ? '📄 Ver PDF original de la galería' : '🔗 Ver en la web de la galería'}</a>
        </div>
      </div>
    </div>
  )
}
