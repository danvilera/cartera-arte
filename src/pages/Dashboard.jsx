import React from 'react'
import { WORKS } from '../data/works'
import { total, liquidityIndex, liquidityLabel, BUDGET } from '../lib/scoring'

const fmt = (n) => (Number(n) || 0).toLocaleString('es-ES') + ' €'
const last = (name) => name.split(' ').slice(-1)[0]

function MiniBars({ data }) {
  const max = Math.max(1, ...data.map((d) => d.v))
  return (
    <div className="mbars">
      {data.map((d) => (
        <div className="mbar" key={d.k}>
          <span className="mbar-k">{d.k}</span>
          <div className="mbar-track"><div className="mbar-fill" style={{ width: (d.v / max) * 100 + '%', background: d.c || 'var(--accent)' }} /></div>
          <span className="mbar-v">{d.v}</span>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard({ state, onOpen, onNav }) {
  const scored = WORKS.map((o) => {
    const s = state.works[o.id]
    return { o, s, t: total(o, s, state.weights).t, li: liquidityIndex(o, s) }
  }).sort((a, b) => b.t - a.t)

  const prices = scored.map(({ s }) => Number(s.price) || 0)
  const galleries = [...new Set(WORKS.map((o) => o.gallery))]
  const inBudget = scored.filter(({ s }) => (Number(s.price) || 0) <= BUDGET).length
  const near = scored.filter(({ s }) => (Number(s.price) || 0) <= 6500).length

  const artistOrder = ['Joan Miró', 'Pablo Picasso', 'Antoni Tàpies', 'Salvador Dalí', 'Eduardo Chillida']
  const byArtist = artistOrder
    .map((a) => ({ k: last(a), v: WORKS.filter((o) => o.artist === a).length }))
    .filter((d) => d.v > 0)
  const byGallery = galleries.map((g) => ({ k: g, v: WORKS.filter((o) => o.gallery === g).length }))
  const liq = [
    { k: 'Alta', v: scored.filter((x) => x.li >= 70).length, c: 'var(--good)' },
    { k: 'Media', v: scored.filter((x) => x.li >= 50 && x.li < 70).length, c: 'var(--warn)' },
    { k: 'Baja', v: scored.filter((x) => x.li < 50).length, c: 'var(--bad)' },
  ]

  const SECTIONS = [
    ['pared', '📐', 'En la pared', 'Prueba las obras en tu pared'],
    ['comprar', '🏛️', 'Dónde comprar', 'Galerías vs. subastas'],
    ['artistas', '🎨', 'Artistas', 'Timelines de tus 6 pintores'],
    ['glosario', '📖', 'Glosario', 'Litografía, aguafuerte…'],
    ['inversion', '📈', 'Inversión', 'Arte vs. otras inversiones'],
    ['genius', '✨', 'ArteGenius', 'Tu asesor con IA'],
  ]

  return (
    <div className="dash">
      <p className="lede">Tu cartera de un vistazo. Toca cualquier obra para ver su ficha. Objetivo: Miró/Picasso por ~5.000 € (flexible).</p>

      <div className="kpis">
        <div className="kpi"><div className="kpi-n">{WORKS.length}</div><div className="kpi-l">obras</div></div>
        <div className="kpi"><div className="kpi-n">{galleries.length}</div><div className="kpi-l">galerías</div></div>
        <div className="kpi"><div className="kpi-n">{inBudget}</div><div className="kpi-l">≤ 5.000 €</div></div>
        <div className="kpi"><div className="kpi-n mono">{fmt(Math.min(...prices))}</div><div className="kpi-l">más barata</div></div>
      </div>

      <div className="dash-head">
        <h3 className="sheet-h3" style={{ marginTop: 0 }}>Todas las obras</h3>
        <button className="linkbtn" onClick={() => onNav('obras')}>Ver en detalle ↗</button>
      </div>
      <div className="thumbs">
        {scored.map(({ o, s, li }) => {
          const [, lc] = liquidityLabel(li)
          return (
            <button className="thumb-cell" key={o.id} onClick={() => onOpen(o.id)} title={o.artist + ' — ' + o.title}>
              <span className="tc-img"><img src={o.img} alt={o.artist} loading="lazy" /></span>
              <span className="tc-meta">
                <b>{last(o.artist)}</b>
                <span className="tc-price mono">{fmt(s.price)}</span>
              </span>
              <span className="tc-dot" style={{ background: lc }} />
            </button>
          )
        })}
      </div>

      <div className="dash-grid">
        <div className="panel">
          <h3 className="sheet-h3" style={{ marginTop: 0 }}>Por artista</h3>
          <MiniBars data={byArtist} />
        </div>
        <div className="panel">
          <h3 className="sheet-h3" style={{ marginTop: 0 }}>Por galería</h3>
          <MiniBars data={byGallery} />
        </div>
        <div className="panel">
          <h3 className="sheet-h3" style={{ marginTop: 0 }}>Liquidez</h3>
          <MiniBars data={liq} />
        </div>
        <div className="panel">
          <h3 className="sheet-h3" style={{ marginTop: 0 }}>Mejor puntuadas</h3>
          <ol className="toplist">
            {scored.slice(0, 4).map(({ o, t }) => (
              <li key={o.id}><button className="linkbtn" onClick={() => onOpen(o.id)}>{last(o.artist)} · {o.title.replace(/[“”"]/g, '').slice(0, 22)}</button><b>{t}</b></li>
            ))}
          </ol>
        </div>
      </div>

      <h3 className="sheet-h3">Explora</h3>
      <div className="sec-teasers">
        {SECTIONS.map(([key, ico, title, sub]) => (
          <button className="teaser" key={key} onClick={() => onNav(key)}>
            <span className="teaser-ico">{ico}</span>
            <span className="teaser-t">{title}</span>
            <span className="teaser-s">{sub}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
