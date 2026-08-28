import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { WORKS } from '../data/works'

const FRAMES = {
  negro: { bg: '#141414', label: 'Negro' },
  blanco: { bg: '#f4f2ec', label: 'Blanco' },
  'madera clara': { bg: 'linear-gradient(135deg,#e0bd8b,#b98b50)', label: 'Madera clara' },
  'madera oscura': { bg: 'linear-gradient(135deg,#6d4a2a,#3c2917)', label: 'Madera oscura' },
  dorado: { bg: 'linear-gradient(135deg,#e6cf78,#b8912f)', label: 'Dorado' },
  plata: { bg: 'linear-gradient(135deg,#e2e2e8,#a9a9b2)', label: 'Plata' },
}
const MATS = { hueso: '#efe9db', blanco: '#ffffff', gris: '#d7d5cf', negro: '#1c1c1c' }

const DEF_CFG = {
  sceneWidthCm: 300, artId: 'miro', artWcm: 53, artHcm: 42,
  matCm: 6, matColor: 'hueso', frameCm: 3, frameColor: 'madera clara',
  posX: 40, posY: 30,
}

const load = (k, f) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : f } catch { return f } }
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }

export default function Pared() {
  const [photo, setPhoto] = useState(() => load('arte_wall_photo', null))
  const [cfg, setCfg] = useState(() => ({ ...DEF_CFG, ...load('arte_wall_cfg', {}) }))
  const [customArt, setCustomArt] = useState(() => load('arte_wall_art', null))
  const stageRef = useRef(null)
  const [stageW, setStageW] = useState(0)
  const drag = useRef(null)

  useEffect(() => save('arte_wall_cfg', cfg), [cfg])
  useEffect(() => { if (photo) save('arte_wall_photo', photo) }, [photo])

  useLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return
    const update = () => setStageW(el.clientWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [photo])

  const set = (k, v) => setCfg((c) => ({ ...c, [k]: v }))

  async function onPhoto(e) {
    const f = e.target.files?.[0]; if (!f) return
    const url = await shrink(await toDataURL(f), 1600)
    setPhoto(url); e.target.value = ''
  }
  async function onArt(e) {
    const f = e.target.files?.[0]; if (!f) return
    const url = await shrink(await toDataURL(f), 1200)
    setCustomArt(url); save('arte_wall_art', url); set('artId', 'custom'); e.target.value = ''
  }

  const pxPerCm = stageW && cfg.sceneWidthCm ? stageW / cfg.sceneWidthCm : 0
  const artSrc = cfg.artId === 'custom' ? customArt : (WORKS.find((w) => w.id === cfg.artId)?.img)
  const artW = cfg.artWcm * pxPerCm
  const artH = cfg.artHcm * pxPerCm
  const matPx = cfg.matCm * pxPerCm
  const framePx = Math.max(2, cfg.frameCm * pxPerCm)

  function onDown(e) {
    e.preventDefault()
    const rect = stageRef.current.getBoundingClientRect()
    drag.current = { sx: e.clientX, sy: e.clientY, ox: cfg.posX, oy: cfg.posY, w: rect.width, h: rect.height }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }
  function onMove(e) {
    const d = drag.current; if (!d) return
    const nx = d.ox + ((e.clientX - d.sx) / d.w) * 100
    const ny = d.oy + ((e.clientY - d.sy) / d.h) * 100
    setCfg((c) => ({ ...c, posX: Math.max(0, Math.min(100, nx)), posY: Math.max(0, Math.min(100, ny)) }))
  }
  function onUp() {
    drag.current = null
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onUp)
  }

  return (
    <div className="prose">
      <p className="lede">Sube una foto de tu pared, dime el ancho real de lo que se ve y prueba cómo quedaría el cuadro enmarcado. Arrástralo para colocarlo.</p>

      {!photo ? (
        <label className="dropzone">
          <input type="file" accept="image/*" hidden onChange={onPhoto} />
          <span className="dz-ico">🖼️</span>
          <span>Sube una foto de tu pared</span>
          <span className="note">Haz la foto de frente, lo más recta posible.</span>
        </label>
      ) : (
        <>
          <div className="wall-stage" ref={stageRef}>
            <img className="wall-photo" src={photo} alt="pared" draggable={false} />
            {artSrc && pxPerCm > 0 && (
              <div
                className="framed"
                onPointerDown={onDown}
                style={{
                  left: cfg.posX + '%', top: cfg.posY + '%',
                  width: artW + matPx * 2 + framePx * 2 + 'px',
                  background: FRAMES[cfg.frameColor].bg,
                  padding: framePx + 'px',
                  boxShadow: '0 6px 20px rgba(0,0,0,.35)',
                }}
              >
                <div className="mat" style={{ padding: matPx + 'px', background: MATS[cfg.matColor] }}>
                  <img src={artSrc} alt="obra" draggable={false} style={{ width: artW + 'px', height: artH + 'px', display: 'block' }} />
                </div>
              </div>
            )}
          </div>
          <div className="wall-actions">
            <label className="btn ghost mini">Cambiar foto<input type="file" accept="image/*" hidden onChange={onPhoto} /></label>
            <button className="btn ghost mini" onClick={() => { setPhoto(null); try { localStorage.removeItem('arte_wall_photo') } catch {} }}>Quitar foto</button>
          </div>
        </>
      )}

      <div className="panel" style={{ marginTop: 16 }}>
        <h3 className="sheet-h3" style={{ marginTop: 0 }}>Escala</h3>
        <div className="ctl">
          <label>Ancho real de lo que se ve en la foto: <b>{cfg.sceneWidthCm} cm</b></label>
          <input type="range" min="80" max="600" step="5" value={cfg.sceneWidthCm} onChange={(e) => set('sceneWidthCm', +e.target.value)} />
          <small>Mide (aprox.) cuántos cm de pared abarca la foto de lado a lado.</small>
        </div>

        <h3 className="sheet-h3">Obra</h3>
        <div className="chips2">
          {WORKS.map((w) => (
            <button key={w.id} className={'chip2' + (cfg.artId === w.id ? ' on' : '')}
              onClick={() => { set('artId', w.id); const d = sizeOf(w); if (d) setCfg((c) => ({ ...c, artId: w.id, artWcm: d[0], artHcm: d[1] })) }}>
              {w.artist.split(' ').slice(-1)[0]} · {w.title.replace(/[“”"]/g, '').slice(0, 16)}
            </button>
          ))}
          <label className={'chip2' + (cfg.artId === 'custom' ? ' on' : '')}>
            + Subir obra<input type="file" accept="image/*" hidden onChange={onArt} />
          </label>
        </div>
        <div className="two">
          <div className="ctl"><label>Ancho obra: <b>{cfg.artWcm} cm</b></label>
            <input type="range" min="15" max="150" step="1" value={cfg.artWcm} onChange={(e) => set('artWcm', +e.target.value)} /></div>
          <div className="ctl"><label>Alto obra: <b>{cfg.artHcm} cm</b></label>
            <input type="range" min="15" max="150" step="1" value={cfg.artHcm} onChange={(e) => set('artHcm', +e.target.value)} /></div>
        </div>

        <h3 className="sheet-h3">Paspartú</h3>
        <div className="two">
          <div className="ctl"><label>Grosor: <b>{cfg.matCm} cm</b></label>
            <input type="range" min="0" max="15" step="0.5" value={cfg.matCm} onChange={(e) => set('matCm', +e.target.value)} /></div>
          <div className="ctl"><label>Color</label>
            <div className="swatches">{Object.keys(MATS).map((k) => (
              <button key={k} className={'sw' + (cfg.matColor === k ? ' on' : '')} title={k} style={{ background: MATS[k] }} onClick={() => set('matColor', k)} />
            ))}</div></div>
        </div>

        <h3 className="sheet-h3">Marco</h3>
        <div className="two">
          <div className="ctl"><label>Grosor: <b>{cfg.frameCm} cm</b></label>
            <input type="range" min="0.5" max="10" step="0.5" value={cfg.frameCm} onChange={(e) => set('frameCm', +e.target.value)} /></div>
          <div className="ctl"><label>Tipo / color</label>
            <div className="swatches">{Object.keys(FRAMES).map((k) => (
              <button key={k} className={'sw big' + (cfg.frameColor === k ? ' on' : '')} title={FRAMES[k].label} style={{ background: FRAMES[k].bg }} onClick={() => set('frameColor', k)} />
            ))}</div></div>
        </div>
      </div>
      <p className="note it" style={{ marginTop: 12 }}>La simulación es orientativa (depende de que la foto sea recta y la medida correcta). Tus ajustes y la foto se guardan solo en este dispositivo.</p>
    </div>
  )
}

// Intenta sacar ancho×alto (cm) del texto de la ficha; si no, null.
function sizeOf(w) {
  const row = (w.detail || []).find(([k]) => k.toLowerCase().startsWith('dimension') || k.toLowerCase().startsWith('dimensiones'))
  const s = row ? row[1] : ''
  const m = s.match(/(\d+[.,]?\d*)\s*[×x]\s*(\d+[.,]?\d*)/)
  if (!m) return null
  const a = parseFloat(m[1].replace(',', '.')), b = parseFloat(m[2].replace(',', '.'))
  return [Math.round(a), Math.round(b)]
}

function toDataURL(file) {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file) })
}
function shrink(dataURL, max) {
  return new Promise((res) => {
    const img = new Image()
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.width, img.height))
      if (s === 1) return res(dataURL)
      const c = document.createElement('canvas')
      c.width = Math.round(img.width * s); c.height = Math.round(img.height * s)
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
      res(c.toDataURL('image/jpeg', 0.85))
    }
    img.onerror = () => res(dataURL)
    img.src = dataURL
  })
}
