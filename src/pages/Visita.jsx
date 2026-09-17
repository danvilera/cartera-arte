import React, { useMemo, useState } from 'react'
import { WORKS } from '../data/works'
import { TRIOS } from '../data/trios'
import { total, liquidityIndex, liquidityLabel } from '../lib/scoring'

const eur = (n) => (Number(n) || 0).toLocaleString('es-ES') + ' €'
const last = (s) => (s || '').split(' ').slice(-1)[0]
const byId = Object.fromEntries(WORKS.map((w) => [w.id, w]))
const openTrioWall = (key, onNav) => { try { localStorage.setItem('arte_open_trio', key) } catch (e) {} ; onNav && onNav('pared') }

// Obras cuyo vendedor es Taller del Prado (identificadas por la URL de su ficha).
const isTdP = (o) => !!(o.url && o.url.includes('tallerdelprado.com'))

// Mi lista del correo enviado a Francisco Molina (orden del correo).
const SHORT = [
  'quelques-fleurs', 'obra-inedita-recent-9', 'zootrope', 'la-chene-et-le-roseau',
  'cap-de-creus', 'la-main-juane', 'messiaen-1986', 'lettera-amorosa', 'personnage-sur-fond-rose',
]
const shortIdx = (o) => {
  if (!o.url) return 99
  for (let i = 0; i < SHORT.length; i++) if (o.url.includes(SHORT[i])) return i
  return 99
}
const isShort = (o) => shortIdx(o) < 99

// Etiquetas curadas a partir del análisis de mercado (solo donde hay confianza).
// tipo: 'chollo' | 'semi' | 'ojo'
const TAG = {
  online_tapies_ovalgris: ['chollo', 'Serie Variations: 2.352 socio vs 2.990-3.600 en mercado'],
  online_tapies_profil: ['chollo', 'Serie Variations: 2.352 vs 2.990-3.600'],
  online_tapies_grandchaise: ['chollo', 'Serie Variations: 2.352 vs 2.990-3.600'],
  online_tapies_personnage: ['chollo', 'Serie Variations: 2.352 vs 2.990-3.600'],
  online_tapies_improv4: ['chollo', 'Serie Variations: 2.352 vs 2.990-3.600'],
  online_tapies_esperit1: ['chollo', 'L esperit catala, aguatinta+gofrado, 2.160 socio'],
  online_tapies_esperit2: ['chollo', 'L esperit catala, aguafuerte+gofrado, 2.160 socio'],
  online_tapies_minoriv: ['chollo', 'Aguafuerte firmado, 1.440 socio (precio web)'],
  online_dali_capdecreus: ['semi', 'Unico Dali semi-chollo; vertical, encaja en la composicion'],
  online_miro_quelquesfleurs: ['ojo', 'Edicion grande (283); confirmar numeracion a lapiz'],
  online_miro_recent1: ['ojo', 'Obra inedita recent: firma tipo monograma/inicial, edicion grande'],
  online_miro_recent3: ['ojo', 'Firma monograma/inicial, edicion grande'],
  online_miro_recent5: ['ojo', 'Firma monograma/inicial, edicion grande'],
  online_miro_recent6: ['ojo', 'Firma monograma/inicial, edicion grande'],
  online_tapies_messiaen: ['ojo', 'Confirmar que es la litografia firmada y NO el afiche (mas barato)'],
  online_braque_floraux: ['ojo', 'Edicion 7 (rara) pero color algo apagado; sin comparable directo'],
}
const TAGVIEW = {
  chollo: ['CHOLLO', '#1f9d6b', 'rgba(31,157,107,.12)'],
  semi: ['SEMI-CHOLLO', '#c9911f', 'rgba(201,145,31,.14)'],
  ojo: ['OJO / CONFIRMAR', '#c1553a', 'rgba(193,85,58,.12)'],
}

const listaAprox = (socio) => Math.round((socio / 0.8) / 10) * 10 // socio = lista x 0.8

function bandChip(o) {
  const b = o.bandSigned || o.bandUnsigned
  if (!b) return null
  const [lo, hi] = b; const p = o.price
  if (p < lo) return ['Por debajo de mercado', 'var(--good)']
  if (p <= hi) return ['Dentro de banda de mercado', 'var(--warn)']
  return ['Por encima de mercado', 'var(--bad)']
}

const ESTADOS = [
  ['vista', 'Vista'], ['interesa', 'Me interesa'], ['negociando', 'Negociando'],
  ['comprada', 'Comprada'], ['descartada', 'Paso'],
]

function EstadoSeg({ value, onChange }) {
  return (
    <span className="seg" style={{ flexWrap: 'wrap' }}>
      {ESTADOS.map(([v, l]) => (
        <button key={v} type="button" className={value === v ? 'on' : ''}
          onClick={() => onChange(value === v ? 'ninguno' : v)}>{l}</button>
      ))}
    </span>
  )
}

function checklist(o) {
  const items = [
    'Firma a lapiz real (no estampada en la plancha)',
    'Numeracion a lapiz y tirada total',
    'Estado: margenes completos, sin pliegues, sin foxing ni humedad',
    'Color vivo, sin decoloracion por luz',
    'Precio: normalmente SIN marco. Preguntar enmarcado aparte',
  ]
  if (/Dal/i.test(o.artist)) items.splice(1, 0, 'Dali anos 70: ojo hojas prefirmadas; pedir garantia de autenticidad')
  return items
}

function printList(works) {
  const rows = works.map((o) => {
    const t = TAG[o.id]
    const tag = t ? TAGVIEW[t[0]][0] : (bandChip(o) ? bandChip(o)[0] : '')
    return `<tr>
      <td><b>${o.artist}</b><br>${o.title.replace(/[<>]/g, '')}</td>
      <td>${(o.ref || '').replace(/[<>]/g, '')}</td>
      <td style="text-align:right">socio ${eur(o.price)}<br><span style="color:#888">lista ~${eur(listaAprox(o.price))}</span></td>
      <td>${tag}</td>
      <td style="width:34%">${checklist(o).map((c) => '&#9744; ' + c).join('<br>')}</td>
    </tr>`
  }).join('')
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Visita Taller del Prado</title>
  <style>body{font:12px -apple-system,Segoe UI,Roboto,sans-serif;color:#1e1b16;padding:22px}
  h1{font-size:1.25rem;margin:0 0 2px} .sub{color:#777;margin:0 0 14px}
  table{width:100%;border-collapse:collapse} td,th{border-bottom:1px solid #eee;padding:6px;vertical-align:top;text-align:left}
  th{color:#777;font-weight:600}</style></head><body>
  <h1>Visita Taller del Prado - Gran Via 16, 5a planta (Madrid)</h1>
  <p class="sub">Preguntar por Francisco Molina (director). Precio socio = -20% ya aplicado, IVA incluido. Por comprar varias, pedir consideracion extra sobre el conjunto.</p>
  <table><thead><tr><th>Obra</th><th>Ficha</th><th>Precio</th><th>Veredicto</th><th>Que revisar en persona</th></tr></thead>
  <tbody>${rows}</tbody></table>
  <p class="sub" style="margin-top:14px">${works.length} obras. Cartera de Arte.</p>
  </body></html>`
  const w = window.open('', '_blank')
  if (!w) { alert('Permite las ventanas emergentes para imprimir la lista.'); return }
  w.document.write(html); w.document.close(); w.focus(); setTimeout(() => w.print(), 400)
}

export default function Visita({ state, onOpen, onField, onNav }) {
  const tdp = useMemo(() => WORKS.filter(isTdP), [])
  const artists = useMemo(() => [...new Set(tdp.map((o) => o.artist))].sort(), [tdp])

  const [q, setQ] = useState('')
  const [artist, setArtist] = useState('')
  const [onlyShort, setOnlyShort] = useState(false)
  const [onlyChollo, setOnlyChollo] = useState(false)
  const [pick, setPick] = useState(() => new Set())

  const togglePick = (id) => setPick((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    let arr = tdp.filter((o) => {
      if (artist && o.artist !== artist) return false
      if (onlyShort && !isShort(o)) return false
      if (onlyChollo && !(TAG[o.id] && (TAG[o.id][0] === 'chollo' || TAG[o.id][0] === 'semi'))) return false
      if (needle) {
        const hay = (o.artist + ' ' + o.title + ' ' + o.tech + ' ' + (o.ref || '')).toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
    arr.sort((a, b) => (shortIdx(a) - shortIdx(b)) || a.artist.localeCompare(b.artist) || a.price - b.price)
    return arr
  }, [tdp, q, artist, onlyShort, onlyChollo])

  const pickWorks = tdp.filter((o) => pick.has(o.id))
  const pickTotal = pickWorks.reduce((s, o) => s + (o.price || 0), 0)
  const BUDGET = 10000

  return (
    <section className="prose">
      <p className="lede">Tu visita al <b>Taller del Prado</b> este sabado. Solo las {tdp.length} obras de esta galeria, con el analisis, el checklist de verificacion y el control de presupuesto para decidir en persona.</p>

      {/* Datos practicos */}
      <div className="panel" style={{ borderLeft: '3px solid var(--accent, #b98b50)' }}>
        <h3 className="sheet-h3" style={{ marginTop: 0 }}>🗓️ Datos de la visita</h3>
        <ul style={{ margin: '0 0 4px 18px', padding: 0, lineHeight: 1.7 }}>
          <li><b>Direccion:</b> Gran Via 16, 5a planta, 28013 Madrid</li>
          <li><b>Pregunta por:</b> Francisco Molina (director). Los sabados hay menos personal: confirma hora por correo.</li>
          <li><b>Precio socio:</b> ya es el <b>-20%</b> sobre lista y con <b>IVA incluido</b>. Por comprar varias, pide <b>consideracion extra</b> sobre el conjunto.</li>
          <li><b>Presupuesto tope:</b> ~10.000 €. Objetivo: piezas firmadas a mano de artistas reconocidos que retengan valor.</li>
        </ul>
        <button className="btn ghost" style={{ marginTop: 8 }} onClick={() => printList(list)}>🖨️ Imprimir esta lista para la visita</button>
      </div>

      {/* Presupuesto */}
      <div className="panel" style={{ marginTop: 14, position: 'sticky', top: 6, zIndex: 5 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <b>Seleccion para llevar: {pickWorks.length} obra{pickWorks.length === 1 ? '' : 's'}</b>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>
            <b style={{ color: pickTotal > BUDGET ? 'var(--bad)' : 'var(--good)' }}>{eur(pickTotal)}</b>
            <span style={{ opacity: .6 }}> / {eur(BUDGET)}</span>
          </span>
        </div>
        <div className="track" style={{ marginTop: 8 }}>
          <div className="fill" style={{ width: Math.min(100, (pickTotal / BUDGET) * 100) + '%', background: pickTotal > BUDGET ? 'var(--bad)' : undefined }} />
        </div>
        {pickWorks.length > 0 && (
          <div style={{ marginTop: 8, fontSize: '.82rem' }}>
            {pickWorks.map((o) => (
              <span key={o.id} style={{ display: 'inline-block', margin: '3px 6px 0 0', padding: '3px 8px', borderRadius: 20, background: 'var(--chip, #efe9dc)' }}>
                {last(o.artist)} · {eur(o.price)} <button onClick={() => togglePick(o.id)} style={{ border: 0, background: 'none', cursor: 'pointer', fontWeight: 700 }}>×</button>
              </span>
            ))}
            {pickTotal <= BUDGET
              ? <p className="note" style={{ margin: '6px 0 0' }}>Te quedan {eur(BUDGET - pickTotal)} dentro del tope. Con descuento por conjunto, margen extra.</p>
              : <p className="note" style={{ margin: '6px 0 0', color: 'var(--bad)' }}>Te pasas {eur(pickTotal - BUDGET)} del tope (antes del posible descuento por conjunto).</p>}
          </div>
        )}
      </div>

      {/* Trio recomendado */}
      {(() => {
        const trio = TRIOS.find((x) => x.key === 'cap_braque7')
        if (!trio) return null
        const ws = trio.ids.map((id) => byId[id]).filter(Boolean)
        const tot = ws.reduce((s, w) => s + (w.price || 0), 0)
        return (
          <div className="panel" style={{ marginTop: 14, borderLeft: '3px solid var(--accent, #b98b50)' }}>
            <h3 className="sheet-h3" style={{ marginTop: 0 }}>⭐ Trío recomendado para tirar: Cap de Creus + Miró + Braque 7/7</h3>
            <p style={{ margin: '0 0 10px' }}>El conjunto de <b>más fuerza</b> y buen precio: el <b>Dalí «Cap de Creus»</b> (litografía firmada de verdad, tema catalán) como <b>obra grande</b> a un lado y, apiladas al otro con <b>marco idéntico</b>, el <b>Miró</b> de color y el <b>Braque «Composition aux motifs floraux»</b>, una aguatinta de <b>edición de solo 7</b> (rareza real). Tres firmas a mano de tres nombres reconocidos.</p>
            {ws.map((w) => (
              <div key={w.id} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '6px 0', borderTop: '1px solid var(--line, #e2ddd0)' }}>
                <button onClick={() => onOpen(w.id)} style={{ border: 0, padding: 0, background: '#f3efe6', width: 46, height: 56, minWidth: 46, cursor: 'pointer', borderRadius: 4, overflow: 'hidden' }} aria-label={'Ver ' + w.title}>
                  {w.img && <img src={w.img} alt={w.artist} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={(e) => { e.currentTarget.style.display = 'none' }} />}
                </button>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '.9rem' }}>{w.artist}</div>
                  <div className="note" style={{ margin: 0 }}>{w.title}</div>
                </div>
                <b style={{ whiteSpace: 'nowrap' }}>{eur(w.price)}</b>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 8, paddingTop: 8, borderTop: '2px solid var(--line, #e2ddd0)' }}>
              <b>Total socio (3 obras)</b>
              <b style={{ fontSize: '1.1rem', color: 'var(--good)' }}>{eur(tot)}</b>
            </div>
            <p className="note" style={{ margin: '6px 0 0' }}>Deja ~{eur(10000 - tot)} dentro del tope de 10.000 €: margen para negociar el conjunto o subir alguna pieza. Enmarcado aparte (mira el cálculo en «En la pared»).</p>
            <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(193,85,58,.08)' }}>
              <b style={{ fontSize: '.82rem' }}>A confirmar en persona:</b>
              <ul style={{ margin: '4px 0 0 18px', padding: 0, fontSize: '.82rem', lineHeight: 1.6 }}>
                <li><b>Cap de Creus:</b> firma a lápiz real (Dalí años 70 = hojas prefirmadas) y garantía de autenticidad.</li>
                <li><b>Miró:</b> es «Obra inédita recent», firma tipo monograma/inicial y edición grande.</li>
                <li><b>Braque «floraux»:</b> edición 7 (rara) pero color algo apagado y sin comparable directo; confirmar estado.</li>
              </ul>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
              <button className="btn" onClick={() => openTrioWall('cap_braque7', onNav)}>📐 Verlo en la pared</button>
              <button className="btn ghost" onClick={() => onNav && onNav('trios')}>Ver en Tríos</button>
            </div>
          </div>
        )
      })()}

      {/* Buscador y filtros */}
      <div className="panel" style={{ marginTop: 14 }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔎 Buscar por artista, titulo o tecnica…"
          style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--line, #e2ddd0)', fontSize: '.95rem', background: 'var(--bg, #fff)', color: 'inherit' }} />
        <div className="chips2" style={{ marginTop: 10 }}>
          <button className={'chip2' + (!artist ? ' on' : '')} onClick={() => setArtist('')}>Todos</button>
          {artists.map((a) => (
            <button key={a} className={'chip2' + (artist === a ? ' on' : '')} onClick={() => setArtist(artist === a ? '' : a)}>{a}</button>
          ))}
        </div>
        <div className="chips2" style={{ marginTop: 8 }}>
          <button className={'chip2' + (onlyShort ? ' on' : '')} onClick={() => setOnlyShort((v) => !v)}>⭐ Mi lista del correo</button>
          <button className={'chip2' + (onlyChollo ? ' on' : '')} onClick={() => setOnlyChollo((v) => !v)}>💎 Solo chollos</button>
        </div>
        <p className="note" style={{ margin: '8px 0 0' }}>{list.length} de {tdp.length} obras</p>
      </div>

      {/* Lista de obras */}
      <div style={{ marginTop: 8 }}>
        {list.map((o) => {
          const s = state.works[o.id] || {}
          const t = Math.round(total(o, s, state.weights).t)
          const li = liquidityIndex(o, s); const [lt, lc] = liquidityLabel(li)
          const tg = TAG[o.id]; const tv = tg && TAGVIEW[tg[0]]
          const bc = bandChip(o)
          const short = isShort(o)
          return (
            <div key={o.id} className="panel" style={{ marginTop: 12, padding: 0, overflow: 'hidden', border: short ? '1px solid var(--accent, #b98b50)' : undefined }}>
              <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
                <button onClick={() => onOpen(o.id)} style={{ border: 0, padding: 0, background: '#f3efe6', width: 118, minWidth: 118, cursor: 'pointer' }} aria-label={'Ver ' + o.title}>
                  {o.img ? <img src={o.img} alt={o.artist} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={(e) => { e.currentTarget.style.display = 'none' }} /> : <span style={{ fontSize: 26 }}>🖼️</span>}
                </button>
                <div style={{ padding: '10px 12px', flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', marginBottom: 2 }}>
                    {short && <span style={{ fontSize: '.62rem', fontWeight: 800, padding: '2px 7px', borderRadius: 20, background: 'var(--accent, #b98b50)', color: '#fff' }}>MI LISTA</span>}
                    {tv && <span style={{ fontSize: '.62rem', fontWeight: 800, padding: '2px 7px', borderRadius: 20, background: tv[2], color: tv[1] }}>{tv[0]}</span>}
                  </div>
                  <div style={{ fontWeight: 700 }}>{o.artist}</div>
                  <div style={{ fontSize: '.9rem' }}>{o.title}</div>
                  <div className="note" style={{ margin: '3px 0 0' }}>{o.tech}{o.ref ? ' · ' + o.ref : ''}</div>
                </div>
              </div>

              <div style={{ padding: '0 12px 12px' }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'baseline', margin: '6px 0' }}>
                  <b style={{ fontSize: '1.05rem' }}>socio {eur(o.price)}</b>
                  <span className="note">lista aprox {eur(listaAprox(o.price))}</span>
                  {bc && <span style={{ fontSize: '.72rem', fontWeight: 700, color: bc[1] }}>· {bc[0]}</span>}
                  <span style={{ fontSize: '.72rem', color: lc }}>· Liquidez {lt} ({li})</span>
                </div>

                {tg && <p className="note" style={{ margin: '0 0 6px', color: tv[1], fontWeight: 600 }}>{tg[1]}</p>}
                {o.note && <p className="note" style={{ margin: '0 0 8px' }}>{o.note}</p>}

                <details style={{ margin: '0 0 8px' }}>
                  <summary style={{ cursor: 'pointer', fontSize: '.85rem', fontWeight: 600 }}>✅ Que revisar en persona</summary>
                  <ul style={{ margin: '6px 0 0 18px', padding: 0, fontSize: '.85rem', lineHeight: 1.6 }}>
                    {checklist(o).map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </details>

                <div style={{ marginBottom: 8 }}>
                  <EstadoSeg value={s.estado} onChange={(v) => onField(o.id, 'estado', v)} />
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button className={'btn' + (pick.has(o.id) ? '' : ' ghost')} onClick={() => togglePick(o.id)}>
                    {pick.has(o.id) ? '✓ En mi seleccion' : '+ Sumar al presupuesto'}
                  </button>
                  <button className="btn ghost" onClick={() => onOpen(o.id)}>Ficha completa</button>
                  {o.url && <a className="btn ghost" href={o.url} target="_blank" rel="noopener noreferrer">Ver en la web ↗</a>}
                </div>
              </div>
            </div>
          )
        })}
        {list.length === 0 && <p className="note" style={{ marginTop: 16 }}>No hay obras con ese filtro. Prueba a limpiar la busqueda.</p>}
      </div>

      {/* Guia general */}
      <div className="panel" style={{ marginTop: 16 }}>
        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 700 }}>🧾 Checklist general y preguntas para el galerista</summary>
          <div style={{ marginTop: 10 }}>
            <b>En cada obra que te guste, confirma:</b>
            <ul style={{ margin: '6px 0 12px 18px', lineHeight: 1.7 }}>
              <li>Firma <b>a lapiz</b> real y numeracion (no firma solo en la plancha).</li>
              <li>Referencia de <b>catalogo razonado</b> (Dupin/Mourlot para Miro, Field para Dali, Galfetti/Homs para Tapies).</li>
              <li>Estado: margenes, pliegues, foxing, humedad, decoloracion.</li>
              <li>Si el precio es con o sin <b>marco</b>, y coste de enmarcado con vidrio anti-UV.</li>
              <li>Que te lo pongan en <b>factura</b> con tecnica, edicion y referencia (sirve de certificado).</li>
            </ul>
            <b>Trampas a evitar:</b>
            <ul style={{ margin: '6px 0 12px 18px', lineHeight: 1.7 }}>
              <li><b>Afiches</b> vendidos como obra (p. ej. confirmar el Messiaen firmado vs el poster).</li>
              <li>Miro <b>Obra inedita recent</b>: firma tipo monograma e ediciones grandes, menos escasas.</li>
              <li>Estampas <b>posthumas</b> con sello de la testamentaria (no son firma a mano).</li>
            </ul>
            <b>Para negociar:</b>
            <ul style={{ margin: '6px 0 0 18px', lineHeight: 1.7 }}>
              <li>El socio (-20%) ya lo tienes. Por <b>llevar 2 o 3</b>, pide un extra sobre el conjunto.</li>
              <li>Ancla en los <b>chollos</b> (Tapies Variations/L esperit, Cap de Creus) y usa el presupuesto de arriba.</li>
            </ul>
          </div>
        </details>
      </div>
    </section>
  )
}
