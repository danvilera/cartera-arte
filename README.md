# Cartera de Arte

App React + Vite + Supabase para evaluar las obras de Miró, Picasso y Dalí que te
ofrecen las galerías. Los datos se guardan en Supabase (proyecto **PadelTracker**), así
que entras con **tu cuenta de siempre** y ves lo mismo desde el móvil o el ordenador.

## Cómo funciona
- **Frontend:** React + Vite (JavaScript). Sin backend propio.
- **Backend:** Supabase (proyecto PadelTracker). Tabla `arte_state` con RLS: cada usuario
  solo ve su fila. Las claves del `.env` son las **públicas** (publishable/anon), pensadas
  para ir en el frontend.
- **Login:** email + contraseña, con enlace mágico de respaldo. Es la misma base de usuarios
  que PadelTracker, así que usa la cuenta que ya tienes.

## Desarrollo local
```bash
npm install
npm run dev        # http://localhost:5173
```

## Desplegar en Cloudflare Pages (igual que PadelTracker: git push)
1. Crea un repo en GitHub y sube esta carpeta:
   ```bash
   git init && git add . && git commit -m "Cartera de Arte"
   git branch -M main
   git remote add origin git@github.com:TU_USUARIO/cartera-arte.git
   git push -u origin main
   ```
2. En **Cloudflare → Workers & Pages → Create → Pages → Connect to Git**, elige el repo.
3. Build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **Variables de entorno** (Settings → Environment variables), para producción:
   - `VITE_SUPABASE_URL` = `https://ryuijwikaexfjadvgccr.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `sb_publishable_PIeDUN9xkO4vhYyn-hmktQ_wGZoWEg-`
   > Nota: ya vienen en el archivo `.env` (son públicas), así que el build funciona aunque
   > no las pongas en el panel; ponerlas es la práctica recomendada.
5. Deploy. A partir de ahí, **cada `git push` a `main` vuelve a desplegar** automáticamente.

El archivo `public/_redirects` ya deja las rutas del SPA funcionando al recargar.

## Supabase
La tabla ya está creada en PadelTracker:
```sql
create table public.arte_state (
  user_id uuid references auth.users primary key default auth.uid(),
  data jsonb not null default '{}',
  updated_at timestamptz not null default now()
);
-- RLS activado + políticas select/insert/update/delete solo-dueño.
```
El contenido editable (precios, firma, numeración, etc.) se guarda como un único `jsonb`
por usuario. El catálogo de obras y las referencias de mercado viven en el código
(`src/data/works.js`), no en la base de datos.
