import React, { useState } from 'react'
import { GLOSSARY } from '../data/content'

export default function Glosario() {
  const [q, setQ] = useState('')
  const list = GLOSSARY.filter(
    (g) => !q || (g.t + ' ' + g.d).toLowerCase().includes(q.toLowerCase())
  )
  return (
    <div className="prose">
      <p className="lede">El vocabulario esencial para no perderte en una galería: qué es cada técnica y qué mirar.</p>
      <input className="search" placeholder="Buscar término…" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="gloss">
        {list.map((g) => (
          <div className="gloss-item" key={g.t}>
            <div className="gloss-term">{g.t}</div>
            <div className="gloss-def">{g.d}</div>
          </div>
        ))}
        {list.length === 0 && <p className="note">Sin resultados para “{q}”.</p>}
      </div>
    </div>
  )
}
