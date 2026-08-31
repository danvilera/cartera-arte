import React from 'react'
import { metrics, verdict, BUDGET, liquidityIndex, liquidityLabel } from '../lib/scoring'

const fmt = (n) => (Number(n) || 0).toLocaleString('es-ES') + ' €'

function Seg({ value, options, onChange }) {
  return (
    <span className="seg">
      {options.map(([v, l]) => (
        <button key={v} className={value === v ? 'on' : ''} onClick={() => onChange(v)} type="button">{l}</button>
      ))}
    </span>
  )
}

function Bar({ lab, val }) {
  return (
    <div className="bar">
      <span className="lab">{lab}</span>
      <div className="track"><div className="fill" style={{ width: val + '%' }} /></div>
      <span className="num">{Math.round(val)}</span>
    </div>
  )
}

export default function WorkCard({ work: o, state: s, score, lead, onField, onOpen }) {
  const m = metrics(o, s)
  const [vtext, vcol] = verdict(score)
  const d = (Number(s.price) || 0) - BUDGET
  const pct = Math.round((d / BUDGET) * 100)
  const flags = []
  if (m.fairFlag) flags.push(['q', m.fairFlag])
  if (s.signed === 'si') flags.push(['g', 'firmada'])
  if (s.signed === 'no') flags.push(['b', 'sin firma'])
  if (s.catalogue === 'si') flags.push(['g', 'en catálogo'])
  if (s.signed === 'si' && Number(s.price) > o.bandSigned[1]) flags.push(['b', 'precio sobre mercado'])
  if (o.printRisk > 50) flags.push(['q', 'liquidez baja'])

  return (
    <div className={'card' + (lead ? ' lead' : '')}>
      {lead && <span className="leadflag">Mejor puntuación</span>}

      <button className="thumb" onClick={() => onOpen(o.id)} aria-label={'Ver ficha de ' + o.title}>
        {o.img ? <img src={o.img} alt={o.artist + ' — ' + o.title} loading="lazy" /> : <span className="thumb-ph" style={{ display: 'grid', placeItems: 'center', height: '100%', minHeight: 130, opacity: 0.6, textAlign: 'center', padding: 12, fontSize: '.85rem' }}>🖼️<br />Ver en la galería</span>}
        <span className="thumb-hint">Ver ficha ↗</span>
      </button>

      <div>
        <div className="artist">{o.artist}</div>
        <div className="title">{o.title}</div>
        <div className="meta">{o.tech} · {o.ref}</div>
        <div className="gal">Galería: {o.gallery}</div>
        {o.url && <a className="gal-link" href={o.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '.82rem', fontWeight: 600 }}>Ver en la web ↗</a>}
      </div>

      <div className="priceRow">
        <span className="price">{fmt(s.price)}</span>
        {d > 0
          ? <span className="delta over">+{fmt(d)} sobre objetivo (+{pct}%)</span>
          : <span className="delta under">{fmt(Math.abs(d))} bajo objetivo</span>}
      </div>

      <div className="scorebox">
        <span className="scoreN" style={{ color: vcol }}>{score}</span>
        <span className="verdict" style={{ color: vcol }}>{vtext}<small>Índice de orientación /100</small></span>
        {(() => {
          const li = liquidityIndex(o, s); const [lt, lc] = liquidityLabel(li)
          return <span className="liq" title="Índice de liquidez: qué tan fácil sería revenderla bien"><span className="liq-lab">Liquidez</span><b style={{ color: lc }}>{lt}</b><span className="liq-n">{li}</span></span>
        })()}
      </div>

      <div className="bars">
        <Bar lab="Precio justo" val={m.precio} />
        <Bar lab="Revaloriz." val={m.reval} />
        <Bar lab="Confianza" val={m.confianza} />
        <Bar lab="Gusto" val={m.gusto} />
      </div>

      {flags.length > 0 && (
        <div className="flags">
          {flags.map(([k, t], i) => <span key={i} className={'flag ' + k}>{t}</span>)}
        </div>
      )}

      <p className="note">{o.note}</p>

      <div className="inputs">
        <div className="irow">
          <span>Precio negociado</span>
          <input className="priceEdit" type="number" step="100" value={s.price}
            onChange={(e) => onField('price', Number(e.target.value) || 0)} />
        </div>
        <div className="irow"><span>¿Firmada a lápiz?</span>
          <Seg value={s.signed} options={[['si', 'Sí'], ['no', 'No'], ['?', '?']]} onChange={(v) => onField('signed', v)} /></div>
        <div className="irow"><span>¿Numerada?</span>
          <Seg value={s.numbered} options={[['si', 'Sí'], ['no', 'No'], ['?', '?']]} onChange={(v) => onField('numbered', v)} /></div>
        <div className="irow"><span>¿En catálogo?</span>
          <Seg value={s.catalogue} options={[['si', 'Sí'], ['no', 'No'], ['?', '?']]} onChange={(v) => onField('catalogue', v)} /></div>
        <div className="irow"><span>¿Certificado?</span>
          <Seg value={s.cert} options={[['si', 'Sí'], ['no', 'No'], ['?', '?']]} onChange={(v) => onField('cert', v)} /></div>
        <div className="irow"><span>Me gusta</span>
          <span className="stars">
            {[1, 2, 3, 4, 5].map((i) => (
              <button key={i} type="button" className={i <= s.gusto ? 'on' : ''} onClick={() => onField('gusto', i)}>★</button>
            ))}
          </span>
        </div>
      </div>

      <button className="btn ghost full" onClick={() => onOpen(o.id)}>Ver ficha completa</button>
    </div>
  )
}
