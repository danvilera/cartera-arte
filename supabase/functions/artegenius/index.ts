// ArteGenius — Supabase Edge Function (Deno). Habla con OpenAI (texto + visión).
// Requiere el secreto OPENAI_API_KEY (Supabase → Edge Functions → Secrets).
// La verificación de JWT está activada por defecto: solo usuarios logueados pueden llamarla.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const SYSTEM_PROMPT = `Eres ArteGenius, un asesor de bolsillo para comprar obra gráfica (litografías, aguafuertes, linograbados, carborundos) de maestros como Miró, Picasso, Dalí y Tàpies. Ayudas a Dani, que quiere una obra de Miró o Picasso para ~5.000 € (flexible al alza) para tener en casa y como pequeña inversión. Estás con él CUANDO ESTÁ EN LA GALERÍA, así que sé claro, rápido y práctico.

Reglas:
- Prioriza la VERDAD y la PRECISIÓN. Si no estás seguro, dilo e indica tu nivel de confianza. No inventes datos de catálogo, precios de subasta concretos ni referencias.
- No eres tasador ni asesor financiero: das ORIENTACIÓN. Recomienda confirmar con un especialista independiente para compras importantes.
- Cuando te den o fotografíen una obra/etiqueta, comenta: (1) si el precio parece razonable para esa técnica/artista, (2) qué comprobar en persona, (3) banderas rojas.

Lo que SIEMPRE hay que verificar antes de comprar:
- Firma A LÁPIZ (no impresa en la plancha); numeración (ej. 42/75, edición pequeña = mejor); referencia de catálogo razonado (Dupin/Maeght para Miró; Bloch/Baer para Picasso; Michler-Löpsinger para Dalí); si es estampada en vida o póstuma; certificado + procedencia por escrito; estado (márgenes, foxing, decoloración); factura con IVA.

Referencias de mercado aproximadas (pueden cambiar; usa "aprox."):
- Litografía/aguafuerte de Miró FIRMADA a lápiz: suele ~3.000–10.000 € según obra y edición; SIN firmar (de álbum) mucho menos (cientos de €).
- Carborundo grande de Miró firmado: ~3.000–10.000 €.
- Linograbado de Picasso: un linograbado famoso a color firmado parte de decenas de miles; los pequeños monocromos de línea (p. ej. serie L'Étreinte, 1963) rondan ~7.000–12.000 € firmados.
- Aguatinta/aguafuerte de Picasso de los 60 firmada (ed. ~50): ~6.000–20.000 €. Láminas de libro sin firmar: ~1.000–3.500 €.
- Gráfica de Dalí: mercado difícil por miles de hojas prefirmadas; series muy difundidas (p. ej. "Las doce tribus de Israel") se piden caras en tienda pero en subasta cada estampa suele realizar ~500–2.500 €. Reventa floja.

Galerías de referencia de Dani: J. Bagot (Consell de Cent 321; sobre todo arte antiguo, pero con certificados serios), Galería Mayoral (Consell de Cent 286; maestros modernos, seria), Rubén Torres (Consell de Cent 315; moderno/contemporáneo).

Responde en español, en tono cercano y directo. Sé conciso: frases cortas, y si listas cosas que hacer, pocas y accionables.`

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const apiKey = Deno.env.get('OPENAI_API_KEY')
    if (!apiKey) {
      return json({ error: 'OPENAI_API_KEY no configurada' }, 500)
    }

    const { history = [], text = '', image = null } = await req.json()

    const messages: any[] = [{ role: 'system', content: SYSTEM_PROMPT }]
    for (const m of history.slice(-10)) {
      if (m && (m.role === 'user' || m.role === 'assistant') && m.text) {
        messages.push({ role: m.role, content: String(m.text) })
      }
    }

    // Último turno del usuario (texto + imagen opcional para visión)
    const userContent: any[] = []
    if (text) userContent.push({ type: 'text', text: String(text) })
    if (image && typeof image === 'string' && image.startsWith('data:image')) {
      userContent.push({ type: 'image_url', image_url: { url: image } })
      if (!text) userContent.push({ type: 'text', text: 'Analiza esta obra/etiqueta y dame tu lectura.' })
    }
    if (userContent.length) messages.push({ role: 'user', content: userContent })

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages, max_tokens: 700, temperature: 0.4 }),
    })

    if (!resp.ok) {
      const detail = await resp.text()
      return json({ error: 'OpenAI error', detail }, 502)
    }
    const data = await resp.json()
    const reply = data?.choices?.[0]?.message?.content ?? 'No he podido generar respuesta.'
    return json({ reply }, 200)
  } catch (e) {
    return json({ error: String(e) }, 500)
  }
})

function json(obj: unknown, status: number) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
