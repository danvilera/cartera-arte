import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { WORKS } from '../data/works'
import { TRIOS } from '../data/trios'

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
  sceneWidthCm: 300, artId: 'miro', artWcm: 70,
  art2Id: 'none', art2Wcm: 60, art3Id: 'none', art3Wcm: 60, gapCm: 8,
  matCm: 6, matColor: 'hueso', frameCm: 3, frameColor: 'madera clara',
  uniform: false, outWcm: 64, outHcm: 88,
  posX: 30, posY: 26,
}

const load = (k, f) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : f } catch { return f } }
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }

export default function Pared({ wall, onWall }) {
  const [photo, setPhoto] = useState(() => (wall && wall.photo) || load('arte_wall_photo', null))
  const [cfg, setCfg] = useState(() => ({ ...DEF_CFG, ...load('arte_wall_cfg', {}) }))
  const [customArt, setCustomArt] = useState(() => load('arte_wall_art', null))
  const [imgAR, setImgAR] = useState(1.3)
  const [imgAR2, setImgAR2] = useState(1.3)
  const [imgAR3, setImgAR3] = useState(1.3)
  const [slots, setSlots] = useState(() => load('arte_wall_slots', []))
  const [slotName, setSlotName] = useState('')
  const stageRef = useRef(null)
  const [stageW, setStageW] = useState(0)
  const drag = useRef(null)

  useEffect(() => save('arte_wall_cfg', cfg), [cfg])
  useEffect(() => { if (photo) save('arte_wall_photo', photo) }, [photo])
  useEffect(() => save('arte_wall_slots', slots), [slots])
  useEffect(() => {
    try {
      const k = localStorage.getItem('arte_open_trio')
      if (k) { const t = TRIOS.find((x) => x.key === k); if (t) setCfg((c) => ({ ...c, ...t.cfg })); localStorage.removeItem('arte_open_trio') }
    } catch {}
  }, [])

  useLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return
    const update = () => setStageW(el.clientWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [photo])

  const srcOf = (id) => id === 'custom' ? customArt : (WORKS.find((w) => w.id === id)?.img)
  const artSrc = srcOf(cfg.artId)
  const hasTwo = cfg.art2Id && cfg.art2Id !== 'none'
  const art2Src = hasTwo ? srcOf(cfg.art2Id) : null
  const hasThree = cfg.art3Id && cfg.art3Id !== 'none'
  const art3Src = hasThree ? srcOf(cfg.art3Id) : null

  useEffect(() => { readAR(artSrc, setImgAR) }, [artSrc])
  useEffect(() => { if (art2Src) readAR(art2Src, setImgAR2) }, [art2Src])
  useEffect(() => { if (art3Src) readAR(art3Src, setImgAR3) }, [art3Src])

  const set = (k, v) => setCfg((c) => ({ ...c, [k]: v }))

  async function onPhoto(e) {
    const f = e.target.files?.[0]; if (!f) return
    const url = await shrink(await toDataURL(f), 1600)
    setPhoto(url); onWall && onWall({ photo: url }); e.target.value = ''
  }
  async function onArt(e) {
    const f = e.target.files?.[0]; if (!f) return
    const url = await shrink(await toDataURL(f), 1200)
    setCustomArt(url); save('arte_wall_art', url); set('artId', 'custom'); e.target.value = ''
  }

  function pickWork(w, slot) {
    const dims = sizeOf(w)
    let widthCm = slot === 3 ? cfg.art3Wcm : slot === 2 ? cfg.art2Wcm : cfg.artWcm
    if (dims) {
      const isLandscape = imgLandscapeGuess(w)
      widthCm = isLandscape ? Math.max(dims[0], dims[1]) : Math.min(dims[0], dims[1])
    }
    if (slot === 3) setCfg((c) => ({ ...c, art3Id: w.id, art3Wcm: widthCm }))
    else if (slot === 2) setCfg((c) => ({ ...c, art2Id: w.id, art2Wcm: widthCm }))
    else setCfg((c) => ({ ...c, artId: w.id, artWcm: widthCm }))
  }

  const pxPerCm = stageW && cfg.sceneWidthCm ? stageW / cfg.sceneWidthCm : 0
  const matPx = cfg.matCm * pxPerCm
  const framePx = Math.max(2, cfg.frameCm * pxPerCm)

  const framedOuterCm = (wcm) => wcm + 2 * cfg.matCm + 2 * cfg.frameCm
  const nPieces = 1 + (hasTwo ? 1 : 0) + (hasThree ? 1 : 0)
  const outerCm = (wcm) => cfg.uniform ? cfg.outWcm : framedOuterCm(wcm)
  const groupWcm = outerCm(cfg.artWcm) + (hasTwo ? cfg.gapCm + outerCm(cfg.art2Wcm) : 0) + (hasThree ? cfg.gapCm + outerCm(cfg.art3Wcm) : 0)
  const alto1 = Math.round(cfg.artWcm / imgAR)

  function Framed({ src, wcm, ar }) {
    if (cfg.uniform) {
      const outWpx = cfg.outWcm * pxPerCm
      const outHpx = cfg.outHcm * pxPerCm
      const innerW = Math.max(1, outWpx - 2 * framePx - 2 * matPx)
      const innerH = Math.max(1, outHpx - 2 * framePx - 2 * matPx)
      let iw = wcm * pxPerCm, ih = iw / ar
      if (iw > innerW) { iw = innerW; ih = iw / ar }
      if (ih > innerH) { ih = innerH; iw = ih * ar }
      return (
        <div className="framed" style={{ position: 'relative', width: outWpx + 'px', height: outHpx + 'px', boxSizing: 'border-box', background: FRAMES[cfg.frameColor].bg, padding: framePx + 'px', boxShadow: '0 6px 20px rgba(0,0,0,.35)' }}>
          <div className="mat" style={{ width: '100%', height: '100%', boxSizing: 'border-box', background: MATS[cfg.matColor], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={src} alt="obra" draggable={false} style={{ width: iw + 'px', height: ih + 'px', display: 'block' }} />
          </div>
        </div>
      )
    }
    const artWpx = wcm * pxPerCm
    const artHpx = artWpx / ar
    return (
      <div className="framed" style={{ position: 'relative', width: artWpx + matPx * 2 + framePx * 2 + 'px', background: FRAMES[cfg.frameColor].bg, padding: framePx + 'px', boxShadow: '0 6px 20px rgba(0,0,0,.35)' }}>
        <div className="mat" style={{ padding: matPx + 'px', background: MATS[cfg.matColor] }}>
          <img src={src} alt="obra" draggable={false} style={{ width: artWpx + 'px', height: artHpx + 'px', display: 'block' }} />
        </div>
      </div>
    )
  }

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

  function saveSlot() {
    const name = (slotName || 'Montaje ' + (slots.length + 1)).trim()
    setSlots((s) => [...s.filter((x) => x.name !== name), { name, cfg }])
    setSlotName('')
  }
  const loadSlot = (s) => setCfg((c) => ({ ...c, ...s.cfg }))
  const delSlot = (name) => setSlots((s) => s.filter((x) => x.name !== name))
  const loadTrio = (t) => setCfg((c) => ({ ...c, ...t.cfg }))

  return (
    <div className="prose">
      <p className="lede">Sube una foto de tu pared, dime el ancho real de lo que se ve y prueba cómo quedaría enmarcado. Arrástralo para colocarlo. Puedes montar <b>hasta tres obras juntas</b> para tu pared de 3 m.</p>

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
              <div onPointerDown={onDown} style={{ position: 'absolute', left: cfg.posX + '%', top: cfg.posY + '%', display: 'flex', alignItems: 'center', gap: (cfg.gapCm * pxPerCm) + 'px', cursor: 'grab', touchAction: 'none' }}>
                <Framed src={artSrc} wcm={cfg.artWcm} ar={imgAR} />
                {hasTwo && art2Src && <Framed src={art2Src} wcm={cfg.art2Wcm} ar={imgAR2} />}
                {hasThree && art3Src && <Framed src={art3Src} wcm={cfg.art3Wcm} ar={imgAR3} />}
              </div>
            )}
          </div>
          <div className="wall-actions">
            <label className="btn ghost mini">Cambiar foto<input type="file" accept="image/*" hidden onChange={onPhoto} /></label>
            <button className="btn ghost mini" onClick={() => { setPhoto(null); onWall && onWall({ photo: null }); try { localStorage.removeItem('arte_wall_photo') } catch {} }}>Quitar foto</button>
          </div>
        </>
      )}

      <div className="panel" style={{ marginTop: 16 }}>
        <h3 className="sheet-h3" style={{ marginTop: 0 }}>1 · Escala de la pared</h3>
        <div className="ctl">
          <label>Ancho real de lo que se ve en la foto: <b>{cfg.sceneWidthCm} cm</b></label>
          <input type="range" min="80" max="600" step="5" value={cfg.sceneWidthCm} onChange={(e) => set('sceneWidthCm', +e.target.value)} />
          <small>Mide (aprox.) cuántos cm de pared abarca la foto de lado a lado.</small>
        </div>

        <h3 className="sheet-h3">2 · Obra principal</h3>
        <div className="chips2">
          {WORKS.map((w) => (
            <button key={w.id} className={'chip2' + (cfg.artId === w.id ? ' on' : '')} onClick={() => pickWork(w, 1)}>
              {w.artist.split(' ').slice(-1)[0]} · {w.title.replace(/[“”"]/g, '').slice(0, 16)}
            </button>
          ))}
          <label className={'chip2' + (cfg.artId === 'custom' ? ' on' : '')}>+ Subir obra<input type="file" accept="image/*" hidden onChange={onArt} /></label>
        </div>
        <div className="ctl">
          <label>Ancho real de la obra: <b>{cfg.artWcm} cm</b> <span className="note" style={{ fontWeight: 400 }}>· alto ≈ {alto1} cm</span></label>
          <input type="range" min="15" max="150" step="1" value={cfg.artWcm} onChange={(e) => set('artWcm', +e.target.value)} />
        </div>

        <h3 className="sheet-h3">3 · Segunda obra (opcional)</h3>
        <div className="chips2">
          <button className={'chip2' + (cfg.art2Id === 'none' ? ' on' : '')} onClick={() => set('art2Id', 'none')}>Ninguna</button>
          {WORKS.map((w) => (
            <button key={w.id} className={'chip2' + (cfg.art2Id === w.id ? ' on' : '')} onClick={() => pickWork(w, 2)}>
              {w.artist.split(' ').slice(-1)[0]} · {w.title.replace(/[“”"]/g, '').slice(0, 16)}
            </button>
          ))}
        </div>
        {hasTwo && (
          <div className="two">
            <div className="ctl"><label>Ancho 2ª obra: <b>{cfg.art2Wcm} cm</b></label>
              <input type="range" min="15" max="150" step="1" value={cfg.art2Wcm} onChange={(e) => set('art2Wcm', +e.target.value)} /></div>
            <div className="ctl"><label>Separación: <b>{cfg.gapCm} cm</b></label>
              <input type="range" min="2" max="30" step="1" value={cfg.gapCm} onChange={(e) => set('gapCm', +e.target.value)} /></div>
          </div>
        )}

        <h3 className="sheet-h3">3b · Tercera obra (opcional)</h3>
        <div className="chips2">
          <button className={'chip2' + (cfg.art3Id === 'none' ? ' on' : '')} onClick={() => set('art3Id', 'none')}>Ninguna</button>
          {WORKS.map((w) => (
            <button key={w.id} className={'chip2' + (cfg.art3Id === w.id ? ' on' : '')} onClick={() => pickWork(w, 3)}>
              {w.artist.split(' ').slice(-1)[0]} · {w.title.replace(/[“”"]/g, '').slice(0, 16)}
            </button>
          ))}
        </div>
        {hasThree && (
          <div className="ctl"><label>Ancho 3ª obra: <b>{cfg.art3Wcm} cm</b></label>
            <input type="range" min="15" max="150" step="1" value={cfg.art3Wcm} onChange={(e) => set('art3Wcm', +e.target.value)} /></div>
        )}

        <h3 className="sheet-h3">4 · Paspartú</h3>
        <div className="two">
          <div className="ctl"><label>Grosor: <b>{cfg.matCm} cm</b></label>
            <input type="range" min="0" max="15" step="0.5" value={cfg.matCm} onChange={(e) => set('matCm', +e.target.value)} /></div>
          <div className="ctl"><label>Color</label>
            <div className="swatches">{Object.keys(MATS).map((k) => (
              <button key={k} className={'sw' + (cfg.matColor === k ? ' on' : '')} title={k} style={{ background: MATS[k] }} onClick={() => set('matColor', k)} />
            ))}</div></div>
        </div>

        <h3 className="sheet-h3">5 · Marco</h3>
        <div className="two">
          <div className="ctl"><label>Grosor: <b>{cfg.frameCm} cm</b></label>
            <input type="range" min="0.5" max="10" step="0.5" value={cfg.frameCm} onChange={(e) => set('frameCm', +e.target.value)} /></div>
          <div className="ctl"><label>Tipo / color</label>
            <div className="swatches">{Object.keys(FRAMES).map((k) => (
              <button key={k} className={'sw big' + (cfg.frameColor === k ? ' on' : '')} title={FRAMES[k].label} style={{ background: FRAMES[k].bg }} onClick={() => set('frameColor', k)} />
            ))}</div></div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 12 }}>
        <h3 className="sheet-h3" style={{ marginTop: 0 }}>6 · Marcos iguales (paspartú grande)</h3>
        <label className="ctl" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="checkbox" checked={cfg.uniform} onChange={(e) => set('uniform', e.target.checked)} />
          <span>Igualar los tres marcos al mismo tamaño (el paspartú del más pequeño se agranda solo para compensar).</span>
        </label>
        {cfg.uniform && (
          <div className="two">
            <div className="ctl"><label>Ancho de marco: <b>{cfg.outWcm} cm</b></label>
              <input type="range" min="30" max="120" step="1" value={cfg.outWcm} onChange={(e) => set('outWcm', +e.target.value)} /></div>
            <div className="ctl"><label>Alto de marco: <b>{cfg.outHcm} cm</b></label>
              <input type="range" min="30" max="140" step="1" value={cfg.outHcm} onChange={(e) => set('outHcm', +e.target.value)} /></div>
          </div>
        )}
        <p className="note" style={{ margin: '6px 0 0' }}>En modo "marcos iguales" el paspartú (sección 4) actúa como margen mínimo; el resto se rellena de paspartú para que los tres marcos midan lo mismo.</p>
      </div>

      <div className="wall-guide">
        <h4>📐 Guía de colgado</h4>
        <p style={{ margin: '0 0 6px' }}>Conjunto ≈ <b>{Math.round(groupWcm)} cm</b> de ancho{nPieces > 1 ? ` (${nPieces} piezas, ${cfg.gapCm} cm de separación)` : ''}. En una pared de 3 m deja al menos <b>{Math.max(0, Math.round((300 - groupWcm) / 2))} cm</b> libres a cada lado para que respire.</p>
        <p className="note" style={{ margin: 0 }}>Cuelga con el <b>eje horizontal a 145–150 cm</b> del suelo (altura de museo). {nPieces > 1 ? 'Alinea las piezas por su centro; mantén la misma separación entre ellas.' : ''}</p>
      </div>

      <div className="panel" style={{ marginTop: 12 }}>
        <h3 className="sheet-h3" style={{ marginTop: 0 }}>Montajes sugeridos</h3>
        <div className="chips2">
          {TRIOS.map((t) => (
            <button key={t.key} className="chip2" onClick={() => loadTrio(t)}>🎨 {t.name}</button>
          ))}
        </div>
        <p className="note" style={{ margin: '6px 0 0' }}>Cada trío carga las obras con <b>marcos iguales</b> y cada obra a su <b>tamaño real</b> (el más pequeño lleva más paspartú). El análisis de precio/inversión/mercado está en la pestaña «Tríos».</p>
      </div>

      <div className="panel" style={{ marginTop: 12 }}>
        <h3 className="sheet-h3" style={{ marginTop: 0 }}>Montajes guardados</h3>
        <div className="two">
          <div className="ctl"><input type="text" placeholder="Nombre del montaje" value={slotName} onChange={(e) => setSlotName(e.target.value)} /></div>
          <div className="ctl"><button className="btn ghost mini" onClick={saveSlot}>💾 Guardar montaje actual</button></div>
        </div>
        {slots.length > 0 && (
          <div className="slots">
            {slots.map((s) => (
              <span key={s.name} className="chip2" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <button style={{ border: 0, background: 'none', color: 'inherit', cursor: 'pointer', font: 'inherit' }} onClick={() => loadSlot(s)}>{s.name}</button>
                <button style={{ border: 0, background: 'none', color: 'inherit', cursor: 'pointer' }} onClick={() => delSlot(s.name)}>✕</button>
              </span>
            ))}
          </div>
        )}
      </div>

      <p className="note it" style={{ marginTop: 12 }}>Orientativo (depende de que la foto sea recta y la medida correcta). Tus ajustes, montajes y la foto se guardan solo en este dispositivo.</p>
    </div>
  )
}

function readAR(src, setter) {
  if (!src) return
  const im = new Image()
  im.onload = () => { if (im.naturalWidth && im.naturalHeight) setter(im.naturalWidth / im.naturalHeight) }
  im.src = src
}
function sizeOf(w) {
  const row = (w.detail || []).find(([k]) => k.toLowerCase().startsWith('dimension'))
  const s = row ? row[1] : ''
  const m = s.match(/(\d+[.,]?\d*)\s*[×x]\s*(\d+[.,]?\d*)/)
  if (!m) return null
  return [parseFloat(m[1].replace(',', '.')), parseFloat(m[2].replace(',', '.'))]
}
function imgLandscapeGuess(w) {
  return !['dali1', 'dali2', 'rt_hommage', 'rt_fundacio', 'rt_head', 'rt_fauteuil'].includes(w.id)
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
