import React, { useEffect, useRef, useState } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import WorkCard from './components/WorkCard'
import WorkDetail from './components/WorkDetail'
import { WORKS, WEIGHTS, defaultState, mergeDefaults } from './data/works'
import { total } from './lib/scoring'
import Info from './pages/Info'
import ArteGenius from './pages/ArteGenius'

const NAV = [
  { key: 'obras', label: 'Obras', icon: '🖼️' },
  { key: 'genius', label: 'ArteGenius', icon: '✨' },
  { key: 'mercado', label: 'Mercado', icon: '📊' },
  { key: 'ajustes', label: 'Ajustes', icon: '⚙️' },
]

export default function App() {
  const [session, setSession] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [state, setState] = useState(defaultState())
  const [loaded, setLoaded] = useState(false)
  const [tab, setTab] = useState('obras')
  const [openId, setOpenId] = useState(null)
  const [saved, setSaved] = useState(true)
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
  function resetAll() {
    const next = defaultState(); setState(next); persist(next)
  }

  if (!authReady) return <div className="center">Cargando…</div>
  if (!session) return <Auth />
  if (!loaded) return <div className="center">Cargando tu cartera…</div>

  const scored = WORKS.map((o) => ({ o, ...total(o, state.works[o.id], state.weights) })).sort((a, b) => b.t - a.t)
  const leadId = scored[0] && scored[0].t >= 48 ? scored[0].o.id : null
  const openWork = openId ? WORKS.find((w) => w.id === openId) : null

  return (
    <div className="layout">
      <nav className="nav">
        <div className="nav-brand">Cartera de <em>Arte</em></div>
        {NAV.map((n) => (
          <button key={n.key} className={'nav-item' + (tab === n.key ? ' on' : '')} onClick={() => setTab(n.key)}>
            <span className="nav-ico">{n.icon}</span>
            <span className="nav-lab">{n.label}</span>
          </button>
        ))}
      </nav>

      <main className="main">
        {tab === 'obras' && (
          <section>
            <header className="page-head">
              <h1>Obras</h1>
              <span className={'saved ' + (saved ? 'on' : '')}>{saved ? 'guardado ✓' : 'guardando…'}</span>
            </header>
            <p className="lede">9 obras de 3 galerías. Toca una imagen para ver su ficha completa y el PDF. Ajusta precios y datos: la puntuación se recalcula y se guarda sola.</p>
            <div className="cards">
              {scored.map(({ o, t }) => (
                <WorkCard key={o.id} work={o} state={state.works[o.id]} score={t}
                  lead={o.id === leadId} onField={(f, v) => setField(o.id, f, v)} onOpen={setOpenId} />
              ))}
            </div>
          </section>
        )}

        {tab === 'genius' && <ArteGenius />}

        {tab === 'mercado' && (
          <section>
            <header className="page-head"><h1>Mercado</h1></header>
            <Info />
          </section>
        )}

        {tab === 'ajustes' && (
          <section>
            <header className="page-head"><h1>Ajustes</h1></header>
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
              <div style={{ marginTop: 16 }}>
                <button className="btn ghost" onClick={resetAll}>↺ Restablecer todo</button>
              </div>
            </div>
            <div className="panel" style={{ marginTop: 16 }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>Cuenta</h3>
              <p className="note">Conectado como <strong>{session.user.email}</strong></p>
              <button className="btn ghost" style={{ marginTop: 10 }} onClick={() => supabase.auth.signOut()}>Cerrar sesión</button>
            </div>
          </section>
        )}
      </main>

      {openWork && <WorkDetail work={openWork} state={state.works[openWork.id]} onClose={() => setOpenId(null)} />}
    </div>
  )
}
