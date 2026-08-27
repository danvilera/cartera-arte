import React, { useEffect, useRef, useState } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import WorkCard from './components/WorkCard'
import { WORKS, WEIGHTS, defaultState, mergeDefaults } from './data/works'
import { total } from './lib/scoring'
import Info from './pages/Info'

export default function App() {
  const [session, setSession] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [state, setState] = useState(defaultState())
  const [loaded, setLoaded] = useState(false)
  const [tab, setTab] = useState('obras')
  const [saved, setSaved] = useState(true)
  const saveTimer = useRef(null)

  // Sesión
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setAuthReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  // Cargar estado del usuario
  useEffect(() => {
    if (!session) { setLoaded(false); return }
    let cancel = false
    ;(async () => {
      const { data } = await supabase
        .from('arte_state').select('data').eq('user_id', session.user.id).maybeSingle()
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
    setState(next)
    persist(next)
  }

  function setWeight(key, value) {
    const next = { ...state, weights: { ...state.weights, [key]: value } }
    setState(next)
    persist(next)
  }

  function resetAll() {
    const next = defaultState()
    setState(next)
    persist(next)
  }

  if (!authReady) return <div className="center">Cargando…</div>
  if (!session) return <Auth />
  if (!loaded) return <div className="center">Cargando tu cartera…</div>

  const scored = WORKS.map((o) => ({ o, ...total(o, state.works[o.id], state.weights) }))
    .sort((a, b) => b.t - a.t)
  const leadId = scored[0] && scored[0].t >= 48 ? scored[0].o.id : null

  return (
    <div className="shell">
      <div className="topbar">
        <div className="row">
          <div className="brand">Cartera de <em>Arte</em></div>
          <div className="who">
            <span>{session.user.email}</span>
            <button className="linkbtn" onClick={() => supabase.auth.signOut()}>salir</button>
          </div>
        </div>
        <div className="tabs">
          <button className={tab === 'obras' ? 'on' : ''} onClick={() => setTab('obras')}>Obras</button>
          <button className={tab === 'prioridades' ? 'on' : ''} onClick={() => setTab('prioridades')}>Prioridades</button>
          <button className={tab === 'info' ? 'on' : ''} onClick={() => setTab('info')}>Mercado</button>
        </div>
      </div>

      {tab === 'obras' && (
        <>
          <p className="lede">
            9 obras de 3 galerías. Ajusta precios y datos de cada obra: la puntuación se recalcula y se guarda sola.
            <span className={'saved ' + (saved ? 'on' : '')}> {saved ? '· guardado ✓' : '· guardando…'}</span>
          </p>
          <div className="cards">
            {scored.map(({ o, t }) => (
              <WorkCard
                key={o.id}
                work={o}
                state={state.works[o.id]}
                score={t}
                lead={o.id === leadId}
                onField={(f, v) => setField(o.id, f, v)}
              />
            ))}
          </div>
        </>
      )}

      {tab === 'prioridades' && (
        <>
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
          <p className="lede" style={{ marginTop: 16 }}>
            Con estos pesos, la mejor puntuada es <strong>{scored[0].o.artist} — {scored[0].o.title}</strong> ({scored[0].t}/100).
          </p>
        </>
      )}

      {tab === 'info' && <Info />}
    </div>
  )
}
