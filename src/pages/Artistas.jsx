import React, { useState } from 'react'
import { ARTISTS } from '../data/content'

export default function Artistas() {
  const [sel, setSel] = useState(ARTISTS[0].id)
  const a = ARTISTS.find((x) => x.id === sel)
  return (
    <div className="prose">
      <p className="lede">Tus artistas objetivo, con una breve historia y un timeline de sus periodos para entender su obra por años.</p>

      <div className="artist-tabs">
        {ARTISTS.map((x) => (
          <button key={x.id} className={'atab' + (x.id === sel ? ' on' : '')} onClick={() => setSel(x.id)}>
            {x.name.split(' ').slice(-1)[0]}
          </button>
        ))}
      </div>

      <div className="artist-head">
        <h2>{a.name}</h2>
        <div className="artist-meta">{a.years} · {a.origin}</div>
      </div>
      <p className="note" style={{ fontSize: '0.95rem' }}>{a.blurb}</p>

      <h3 className="sheet-h3">Periodos</h3>
      <div className="timeline">
        {a.periods.map(([years, title, text], i) => (
          <div className="tl-item" key={i}>
            <div className="tl-dot" />
            <div className="tl-years">{years}</div>
            <div className="tl-body">
              <div className="tl-title">{title}</div>
              <div className="tl-text">{text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
