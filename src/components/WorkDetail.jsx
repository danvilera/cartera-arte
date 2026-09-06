import React, { useEffect, useState } from 'react'
import { BUDGET, liquidityIndex, liquidityLabel } from '../lib/scoring'
import { computeCost, readiness } from '../lib/cost'

const fmt = (n) => (Number(n) || 0).toLocaleString('es-ES') + ' €'
const lget = (k, f) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : f } catch { return f } }

function Seg({ value, options, onChange }) {
  return (
    <span className="seg">
      {options.map(([v, l]) => (
        <button key={v} className={value === v ? 'on' : ''} type="button" onClick={() => onChange(v)}>{l}</button>
      ))}
    </span>
  )
}

function fileToDataURL(file) {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file) })
}
function shrink(dataURL, max = 820, q = 0.62) {
  return new Promise((res) => {
    const im = new Image()
    im.onload = () => {
      const s = Math.min(1, max / Math.max(im.width, im.height))
      const c = document.createElement('canvas')
      c.width = Math.round(im.width * s); c.height = Math.round(im.height * s)
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height)
      res(c.toDataURL('image/jpeg', q))
    }
    im.onerror = () => res(dataURL)
    im.src = dataURL
  })
}

export default function WorkDetail({ work: o, state: s, onClose, onField }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  const price = Number(s?.price ?? o.price)
  const d = price - BUDGET
  const cost = s.cost || {}
  const cc = computeCost(price, cost)
  const rd = readiness(s)
  const rdColor = rd.ok >= 4 ? 'var(--good)' : rd.ok >= 2 ? 'var(--warn)' : 'var(--bad)'
  const setCost = (k, v) => onField('cost', { ...cost, [k]: v })

  const [rate, setRate] = useState(() => lget('arte_fx', 0.92))
  const [usd, setUsd] = useState('')
  const eur = usd ? Math.round(Number(usd) * rate) : 0

  const history = s.history || []
  const [hLabel, setHLabel] = useState(''); const [hAmt, setHAmt] = useState('')
  function addHist() {
    if (!hAmt) return
    onField('history', [...history, { t: hLabel || 'Oferta', a: Number(hAmt) || 0, d: new Date().toISOString().slice(0, 10) }])
    setHLabel(''); setHAmt('')
  }
  const delHist = (i) => onField('history', history.filter((_, j) => j !== i))

  const photos = s.photos || []
  async function addPhoto(e) {
    const f = e.target.files?.[0]; if (!f) return
    if (photos.length >= 4) { e.target.value = ''; return }
    const u = await shrink(await fileToDataURL(f))
    onField('photos', [...photos, u]); e.target.value = ''
  }
  const delPhoto = (i) => onField('photos', photos.filter((_, j) => j !== i))

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

          <h3 className="sheet-h3">Coste real "puerta"</h3>
          <div className="ctl"><label>¿El precio ({fmt(price)}) incluye IVA?</label>
            <Seg value={cost.ivaIncl ? 'si' : 'no'} options={[['no', '+ IVA aparte'], ['si', 'IVA incluido']]} onChange={(v) => setCost('ivaIncl', v === 'si')} /></div>
          <div className="two">
            <div className="ctl"><label>IVA %</label><input type="number" value={cost.iva ?? 21} onChange={(e) => setCost('iva', Number(e.target.value) || 0)} /></div>
            <div className="ctl"><label>Escenario</label>
              <Seg value={cost.ivaMode || 'normal'} options={[['normal', 'Pago IVA'], ['sin', 'Sin IVA'], ['empresa', 'Empresa']]} onChange={(v) => setCost('ivaMode', v)} /></div>
          </div>
          <div className="two">
            <div className="ctl"><label>Marco (€)</label><input type="number" step="50" value={cost.marco || 0} onChange={(e) => setCost('marco', Number(e.target.value) || 0)} /></div>
            <div className="ctl"><label>Transporte (€)</label><input type="number" step="25" value={cost.transporte || 0} onChange={(e) => setCost('transporte', Number(e.target.value) || 0)} /></div>
          </div>
          <div className="ctl"><label>Seguro (€)</label><input type="number" step="25" value={cost.seguro || 0} onChange={(e) => setCost('seguro', Number(e.target.value) || 0)} /></div>
          <div className="panel" style={{ marginTop: 10 }}>
            <div className="cost-row"><span>Obra {cost.ivaMode && cost.ivaMode !== 'normal' ? '(sin IVA)' : '(con IVA)'}</span><b>{fmt(cc.art)}</b></div>
            <div className="cost-row"><span>Marco + transporte + seguro</span><b>{fmt(cc.extras)}</b></div>
            <div className="cost-row total"><span>Coste puerta</span><b>{fmt(cc.total)}</b></div>
            {cost.ivaMode && cost.ivaMode !== 'normal' && <p className="note it" style={{ margin: '6px 0 0' }}>Ahorro de IVA aplicado: {fmt(cc.withIva - cc.net)}.</p>}
          </div>

          <h3 className="sheet-h3">USD → EUR</h3>
          <div className="two">
            <div className="ctl"><label>Importe en USD</label><input type="number" value={usd} onChange={(e) => setUsd(e.target.value)} placeholder="p. ej. 7750" /></div>
            <div className="ctl"><label>Cambio €/$ <span className="note" style={{ fontWeight: 400 }}>(aprox.)</span></label>
              <input type="number" step="0.01" value={rate} onChange={(e) => { const r = Number(e.target.value) || 0; setRate(r); try { localStorage.setItem('arte_fx', JSON.stringify(r)) } catch {} }} /></div>
          </div>
          {usd ? <p className="note">≈ <b>{fmt(eur)}</b> · <button className="btn ghost mini" onClick={() => onField('price', eur)}>Usar como precio</button></p> : null}

          <h3 className="sheet-h3">Listo para comprar <span style={{ color: rdColor, fontFamily: 'var(--mono)', fontSize: '.8rem' }}>· {rd.ok}/{rd.total}</span></h3>
          <div className="dd">
            {[['signed', 'Firmada a lápiz'], ['catalogue', 'En catálogo razonado'], ['procedencia', 'Procedencia documentada'], ['cert', 'Certificado'], ['factura', 'Factura con referencia']].map(([k, l]) => (
              <div className="irow" key={k}><span>{l}</span><Seg value={s[k] || '?'} options={[['si', 'Sí'], ['no', 'No'], ['?', '?']]} onChange={(v) => onField(k, v)} /></div>
            ))}
          </div>

          <h3 className="sheet-h3">Historial de negociación</h3>
          {history.length > 0 && (
            <div className="hist">{history.map((h, i) => (
              <div className="hist-row" key={i}><span className="hist-t">{h.d} · {h.t}</span><b>{fmt(h.a)}</b><button className="x" onClick={() => delHist(i)}>✕</button></div>
            ))}</div>
          )}
          <div className="two">
            <div className="ctl"><input placeholder="Etiqueta (Salida, Contraoferta…)" value={hLabel} onChange={(e) => setHLabel(e.target.value)} /></div>
            <div className="ctl"><input type="number" placeholder="Importe €" value={hAmt} onChange={(e) => setHAmt(e.target.value)} /></div>
          </div>
          <button className="btn ghost mini" onClick={addHist}>+ Añadir al historial</button>

          <h3 className="sheet-h3">Notas</h3>
          <textarea className="notes" value={s.notes || ''} onChange={(e) => onField('notes', e.target.value)} placeholder="Tus notas de la visita, estado, dudas…" rows="3" />

          <h3 className="sheet-h3">Fotos de tu visita</h3>
          <div className="photos">
            {photos.map((p, i) => (<div className="ph" key={i}><img src={p} alt="foto" /><button className="x" onClick={() => delPhoto(i)}>✕</button></div>))}
            {photos.length < 4 && <label className="ph add">+<input type="file" accept="image/*" hidden onChange={addPhoto} /></label>}
          </div>

          <h3 className="sheet-h3">Ficha</h3>
          <dl className="ficha">
            {o.detail.map(([k, v]) => (<div className="ficha-row" key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
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
