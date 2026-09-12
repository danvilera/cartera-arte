import React, { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import RecoPanel from '../components/RecoPanel'

const SUGGESTIONS = [
  'Estoy en una galería y me ofrecen una litografía de Miró firmada por 4.500 €. ¿Qué te parece?',
  '¿Qué preguntas debo hacer antes de comprar una estampa?',
  '¿Cómo distingo una firma a lápiz de una firmada solo en la plancha?',
]

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result)
    r.onerror = reject
    r.readAsDataURL(file)
  })
}

export default function ArteGenius({ state, weights, onOpen, onNav }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hola, soy ArteGenius. Cuéntame qué obra te ofrecen (o hazle una foto a la obra o a la etiqueta de precio) y te doy mi lectura: si el precio es razonable, qué comprobar y las banderas rojas. No soy tasador; es orientación.' },
  ])
  const [text, setText] = useState('')
  const [image, setImage] = useState(null) // dataURL
  const [busy, setBusy] = useState(false)
  const endRef = useRef(null)
  const fileRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, busy])

  async function pickImage(e) {
    const f = e.target.files?.[0]
    if (!f) return
    try {
      let dataURL = await fileToDataURL(f)
      dataURL = await shrink(dataURL, 1024)
      setImage(dataURL)
    } catch (_) { /* ignore */ }
    e.target.value = ''
  }

  async function send(preset) {
    const body = (preset ?? text).trim()
    if (!body && !image) return
    const userMsg = { role: 'user', text: body, image }
    const history = messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({ role: m.role, text: m.text }))
    setMessages((prev) => [...prev, userMsg])
    setText('')
    const sentImage = image
    setImage(null)
    setBusy(true)
    try {
      const { data, error } = await supabase.functions.invoke('artegenius', {
        body: { history, text: body, image: sentImage },
      })
      if (error) throw error
      setMessages((prev) => [...prev, { role: 'assistant', text: data?.reply || 'No he podido responder.' }])
    } catch (err) {
      const msg = err?.message || String(err)
      setMessages((prev) => [...prev, {
        role: 'assistant',
        text: 'No pude conectar con la IA. ' + (msg.includes('OPENAI') || msg.includes('key') || msg.includes('500')
          ? 'Parece que falta configurar la API key de OpenAI en Supabase (secreto OPENAI_API_KEY).'
          : 'Detalle: ' + msg),
        error: true,
      }])
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="genius">
      <div className="genius-head">
        <div>
          <div className="eyebrow">Asistente</div>
          <h2 style={{ fontSize: '1.5rem' }}>ArteGenius</h2>
        </div>
        <span className="badge-ai">GPT · visión</span>
      </div>

      {state && <div style={{ marginBottom: 14 }}><RecoPanel state={state} weights={weights} onOpen={onOpen} onNav={onNav} /></div>}

      <div className="chat">
        {messages.map((m, i) => (
          <div key={i} className={'bubble ' + m.role + (m.error ? ' err' : '')}>
            {m.image && <img className="bubble-img" src={m.image} alt="foto" />}
            {m.text && <div className="bubble-text">{m.text}</div>}
          </div>
        ))}
        {busy && <div className="bubble assistant"><div className="bubble-text typing">ArteGenius está mirando…</div></div>}
        <div ref={endRef} />
      </div>

      {messages.length <= 1 && (
        <div className="suggestions">
          {SUGGESTIONS.map((s, i) => (
            <button key={i} className="chip" onClick={() => send(s)}>{s}</button>
          ))}
        </div>
      )}

      {image && (
        <div className="attach-preview">
          <img src={image} alt="adjunta" />
          <button onClick={() => setImage(null)} aria-label="Quitar foto">✕</button>
        </div>
      )}

      <div className="composer">
        <button className="icon-btn" onClick={() => fileRef.current?.click()} aria-label="Adjuntar foto" title="Adjuntar foto">📷</button>
        <input ref={fileRef} type="file" accept="image/*" capture="environment" hidden onChange={pickImage} />
        <textarea
          rows={1}
          value={text}
          placeholder="Escribe o adjunta una foto…"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
        />
        <button className="btn send" onClick={() => send()} disabled={busy || (!text.trim() && !image)}>Enviar</button>
      </div>
    </div>
  )
}

// Redimensiona una imagen dataURL para no enviar fotos enormes a la IA.
function shrink(dataURL, max) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height))
      if (scale === 1) return resolve(dataURL)
      const c = document.createElement('canvas')
      c.width = Math.round(img.width * scale)
      c.height = Math.round(img.height * scale)
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
      resolve(c.toDataURL('image/jpeg', 0.85))
    }
    img.onerror = () => resolve(dataURL)
    img.src = dataURL
  })
}
