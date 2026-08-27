import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState(null)

  const set = (text, ok = false) => setMsg({ text, ok })

  async function signIn(e) {
    e.preventDefault()
    setBusy(true); setMsg(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (error) set(error.message)
  }

  async function magicLink() {
    if (!email) return set('Escribe tu email primero.')
    setBusy(true); setMsg(null)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    })
    setBusy(false)
    if (error) set(error.message)
    else set('Te he enviado un enlace de acceso al email. Ábrelo en este dispositivo.', true)
  }

  async function signUp() {
    if (!email || !password) return set('Necesito email y contraseña para crear la cuenta.')
    setBusy(true); setMsg(null)
    const { error } = await supabase.auth.signUp({ email, password })
    setBusy(false)
    if (error) set(error.message)
    else set('Cuenta creada. Si pide confirmación, revisa tu email.', true)
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="eyebrow">Miró · Picasso · Dalí</div>
        <h1>Cartera de <em>Arte</em></h1>
        <p className="sub">Entra con tu cuenta (la misma de tus otras apps) para ver y editar tu evaluación desde cualquier dispositivo.</p>
        <form onSubmit={signIn}>
          <div className="field">
            <label>Email</label>
            <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" />
          </div>
          <div className="field">
            <label>Contraseña</label>
            <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <div className="auth-actions">
            <button className="btn" type="submit" disabled={busy}>Entrar</button>
            <button className="btn ghost" type="button" onClick={magicLink} disabled={busy}>Enviar enlace mágico</button>
          </div>
        </form>
        <p style={{ fontSize: '0.74rem', marginTop: 14 }}>
          ¿Aún no tienes cuenta?{' '}
          <button className="linkbtn" type="button" onClick={signUp} disabled={busy}>Créala</button>
        </p>
        {msg && <p className={'msg ' + (msg.ok ? 'ok' : 'err')}>{msg.text}</p>}
      </div>
    </div>
  )
}
