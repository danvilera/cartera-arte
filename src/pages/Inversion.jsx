import React from 'react'
import { FINANCE_INTRO, ASSET_COMPARISON, OUTLOOK, LIQUIDITY_EXPLAINER } from '../data/content'

export default function Inversion() {
  return (
    <div className="prose">
      <p className="lede">Cómo funciona (de verdad) tener dinero metido en arte, qué esperar y cómo se compara con otras inversiones.</p>

      <h2>Cómo funciona invertir en arte</h2>
      {FINANCE_INTRO.map((p, i) => <p key={i} className="para">{p}</p>)}

      <h2>Liquidez</h2>
      {LIQUIDITY_EXPLAINER.map((p, i) => <p key={i} className="para">{p}</p>)}

      <h2>Arte vs. otras inversiones</h2>
      <div className="tablewrap">
        <table>
          <thead>
            <tr><th>Activo</th>{ASSET_COMPARISON.cols.map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {ASSET_COMPARISON.rows.map((r) => (
              <tr key={r[0]}>{r.map((cell, i) => i === 0 ? <td key={i}><strong>{cell}</strong></td> : <td key={i}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="note it">{ASSET_COMPARISON.note}</p>

      <h2>Cómo veo el futuro</h2>
      {OUTLOOK.map(([h, t]) => (
        <div className="callout soft" key={h}>
          <div>
            <div className="callout-h">{h}</div>
            <p>{t}</p>
          </div>
        </div>
      ))}

      <p className="note it" style={{ marginTop: 16 }}>Orientación general, no asesoramiento financiero. Las cifras históricas no garantizan resultados futuros. Ninguna predicción sobre mercados es segura.</p>
    </div>
  )
}
