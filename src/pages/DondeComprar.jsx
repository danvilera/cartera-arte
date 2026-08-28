import React from 'react'
import { CHANNELS, AUCTION_HOUSES } from '../data/content'

export default function DondeComprar() {
  return (
    <div className="prose">
      <p className="lede">Dónde comprar según lo que priorices: confianza, precio o variedad. Y las casas de subastas relevantes con su calendario en vivo.</p>

      <h2>Los tres canales</h2>
      <div className="channels">
        {CHANNELS.map((c) => (
          <div className="channel" key={c.name}>
            <div className="channel-top">
              <div className="channel-name">{c.name}</div>
              <span className="channel-best">{c.best}</span>
            </div>
            <ul className="pros">{c.pros.map((p, i) => <li key={i} className="pro">✓ {p}</li>)}</ul>
            <ul className="cons">{c.cons.map((p, i) => <li key={i} className="con">✕ {p}</li>)}</ul>
            <p className="note it">{c.tip}</p>
          </div>
        ))}
      </div>

      <div className="callout soft">
        <div>
          <div className="callout-h">Mi recomendación para ti</div>
          <p>Para tu primera compra (~5.000 €), ve a <strong>galería física de confianza</strong>: pagas algo más que en subasta, pero te llevas certificado, factura y la tranquilidad de ver el estado. Cuando cojas oficio y sepas valorar la conservación, la <strong>subasta</strong> (sobre todo Setdart, que tienes en Barcelona y mueve mucha gráfica española) te puede dar mejor precio. Fija siempre tu tope <em>incluyendo la prima del ~25%</em>.</p>
        </div>
      </div>

      <h2>Próximas subastas — casas relevantes</h2>
      <p className="note">Las fechas exactas cambian constantemente, así que enlazo el calendario en vivo de cada casa. El patrón anual te ayuda a anticiparte.</p>
      <div className="houses">
        {AUCTION_HOUSES.map((h) => (
          <a className="house" key={h.name} href={h.url} target="_blank" rel="noopener noreferrer">
            <div className="house-name">{h.name} <span className="house-where">{h.where}</span></div>
            <div className="house-focus">{h.focus}</div>
            <div className="house-cadence">🗓️ {h.cadence}</div>
            <div className="house-link">Ver calendario ↗</div>
          </a>
        ))}
      </div>
      <p className="note it" style={{ marginTop: 12 }}>¿Quieres que en una próxima sesión te prepare un aviso automático con las subastas de gráfica de tus artistas? Puedo montarlo como tarea programada.</p>
    </div>
  )
}
