import React, { useEffect, useRef, useState } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import WorkCard from './components/WorkCard'
import WorkDetail from './components/WorkDetail'
import { WORKS, WEIGHTS, defaultState, mergeDefaults } from './data/works'
import { total } from './lib/scoring'
import Info from './pages/Info'
import ArteGenius from './pages/ArteGenius'
import Glosario from './pages/Glosario'
import Artistas from './pages/Artistas'
import Inversion from './pages/Inversion'
import DondeComprar from './pages/DondeComprar'
import Comparar from './pages/Comparar'
import Pared from './pages/Pared'
import Dashboard from './pages/Dashboard'

const NAV = [
  { key: 'inicio', label: 'Inicio', icon: '🏠' },
  { key: 'obras', label: 'Obras', icon: '🖼️' },
  { key: 'comparar', label: 'Comparar', icon: '⚖️' },
  { key: 'pared', label: 'En la pared', icon: '📐' },
  { key: 'comprar', label: 'Dónde comprar', icon: '🏛️' },
  { key: 'artistas', label: 'Artistas', icon: '🎨' },
  { key: 'glosario', label: 'Glosario', icon: '📖' },
  { key: 'inversion', label: 'Inversión', icon: '📈' },
  { key: 'mercado', label: 'Mercado', icon: '📊' },
  { key: 'genius', label: 'ArteGenius', icon: '✨' },
  { key: 'ajustes', label: 'Ajustes', icon: '⚙️' },
]
const TITLES = Object.fromEntries(NAV.map((n) => [n.key, n.label]))

export default function App() {
  const [session, setSession] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [state, setState] = useState(defaultState())
  const [loaded, setLoaded] = useState(false)
  const [tab, setTab] = useState('inicio')
  const [openId, setOpenId] = useState(null)
  const [saved, setSaved] = useState(true)
  const [drawer, setDrawer] = useState(false)
  const saveTimer = useRef(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setAuthReady(true) })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session) { setLoaded(false); return }
    let cancel = false
    ;(async () => {
      const { data } = await supabase.from('arte_state').select('data').eq('user_id', session.user.id).maybeSingle()
      if (cancel) return
      if (data && data.data && Object.keys(data.data).length) setState(mergeDefaults(data.data))
      else setState(defaultState())
      setLoaded(true)
    })()
    return () => { cancel = true }
  }, [session])

  function persist(next) {
    setSaved(false)
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      if (!session) return
      const { error } = await supabase.from('arte_state').upsert({
        user_id: session.user.id, data: next, updated_at: new Date().toISOString(),
      })
      setSaved(!error)
    }, 600)
  }
  function setField(id, field, value) {
    const next = { ...state, works: { ...state.works, [id]: { ...state.works[id], [field]: value } } }
    setState(next); persist(next)
  }
  function setWeight(key, value) {
    const next = { ...state, weights: { ...state.weights, [key]: value } }
    setState(next); persist(next)
  }
  function resetAll() { const next = defaultState(); setState(next); persist(next) }
  function go(key) { setTab(key); setDrawer(false) }

  if (!authReady) return <div className="center">Cargando…</div>
  if (!session) return <Auth />
  if (!loaded) return <div className="center">Cargando tu cartera…</div>

  const scored = WORKS.map((o) => ({ o, ...total(o, state.works[o.id], state.weights) })).sort((a, b) => b.t - a.t)
  const leadId = scored[0] && scored[0].t >= 48 ? scored[0].o.id : null
  const openWork = openId ? WORKS.find((w) => w.id === openId) : null

  return (
    <div className="app">
      <header className="appbar">
        <button className="burger" onClick={() => setDrawer(true)} aria-label="Menú">☰</button>
        <div className="appbar-title">{TITLES[tab]}</div>
        {tab === 'obras' && <span className={'saved ' + (saved ? 'on' : '')}>{saved ? 'guardado ✓' : 'guardando…'}</span>}
      </header>

      <div className={'drawer-back' + (drawer ? ' show' : '')} onClick={() => setDrawer(false)} />
      <aside className={'drawer' + (drawer ? ' open' : '')}>
        <div className="drawer-brand">Cartera de <em>Arte</em></div>
        {NAV.map((n) => (
          <button key={n.key} className={'drawer-item' + (tab === n.key ? ' on' : '')} onClick={() => go(n.key)}>
            <span className="nav-ico">{n.icon}</span><span>{n.label}</span>
          </button>
        ))}
        <div className="drawer-foot">{session.user.email}</div>
      </aside>

      <main className="main">
        {tab === 'inicio' && <Dashboard state={state} onOpen={setOpenId} onNav={setTab} />}
        {tab === 'obras' && (
          <section>
            <p className="lede">45 obras de 6 galerías (Bagot, Mayoral, Rubén Torres, Joan Gaspar y Disponible Online). Toca una imagen para ver su ficha. Ajusta precios y datos: la puntuación y la liquidez se recalculan y se guardan solas.</p>
            {(() => {
              const order = ['J. Bagot', 'Mayoral', 'Rubén Torres', 'Joan Gaspar', 'Disponible Online']
              const gals = [...new Set(scored.map(({ o }) => o.gallery))]
                .sort((a, b) => ((order.indexOf(a) + 1) || 99) - ((order.indexOf(b) + 1) || 99))
              return gals.map((g) => {
                const items = scored.filter(({ o }) => o.gallery === g)
                return (
                  <div key={g} className="galgroup">
                    <h2 style={{ fontSize: '1.15rem', margin: '28px 0 12px', paddingBottom: 6, borderBottom: '1px solid var(--line, #e2ddd0)', display: 'flex', alignItems: 'baseline', gap: 10 }}>
                      {g}<span style={{ fontSize: '.8rem', opacity: 0.55, fontWeight: 400 }}>{items.length} obras</span>
                    </h2>
                    <div className="cards">
                      {items.map(({ o, t }) => (
                        <WorkCard key={o.id} work={o} state={state.works[o.id]} score={t}
                          lead={o.id === leadId} onField={(f, v) => setField(o.id, f, v)} onOpen={setOpenId} />
                      ))}
                    </div>
                  </div>
                )
              })
            })()}
          </section>
        )}
        {tab === 'comparar' && <Comparar state={state} onOpen={setOpenId} />}
        {tab === 'artistas' && <Artistas />}
        {tab === 'glosario' && <Glosario />}
        {tab === 'pared' && <Pared />}
        {tab === 'inversion' && <Inversion />}
        {tab === 'mercado' && <Info />}
        {tab === 'comprar' && <DondeComprar />}
        {tab === 'genius' && <ArteGenius />}
        {tab === 'ajustes' && (
          <section>
            <p className="lede">¿Compras sobre todo como inversión o para disfrutar el cuadro en casa? Mueve los pesos y el ranking cambia.</p>
            <div className="panel">
              <div className="wgrid">
                {WEIGHTS.map((w) => (
                  <div className="wctl" key={w.key}>
                    <label>{w.label}<span className="v">{state.weights[w.key]}</span></label>
                    <input type="range" min="0" max="5" step="1" value={state.weights[w.key]}
                      onChange={(e) => setWeight(w.key, Number(e.target.value))} />
                    <small>{w.desc}</small>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16 }}><button className="btn ghost" onClick={resetAll}>↺ Restablecer todo</button></div>
            </div>
            <div className="panel" style={{ marginTop: 16 }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>Cuenta</h3>
              <p className="note">Conectado como <strong>{session.user.email}</strong></p>
              <button className="btn ghost" style={{ marginTop: 10 }} onClick={() => supabase.auth.signOut()}>Cerrar sesión</button>
            </div>
          </section>
        )}
      </main>

      {openWork && <WorkDetail work={openWork} state={state.works[openWork.id]} onClose={() => setOpenId(null)} onField={(f, v) => setField(openWork.id, f, v)} />}
    </div>
  )
}
