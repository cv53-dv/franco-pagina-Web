# Despliegue

El sitio es estático. Se publica la carpeta `frontend/` después de correr el build
(`npm run build`, que genera `frontend/dist/` y los WebP).

Ya hay configuración lista para las tres plataformas gratuitas más comunes.
Elegí una:

---

## Opción A — Cloudflare Pages (recomendada si el dominio está en Cloudflare)

1. Subí el repositorio a GitHub (o GitLab).
2. En el panel de Cloudflare → **Workers & Pages** → **Create application** → **Pages** →
   **Connect to Git** → elegí el repo.
3. Configuración de build:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `frontend`
4. Deploy. Cloudflare lee `frontend/_headers` automáticamente.
5. **Custom domains** → agregá `francodigital.com` y `www.francodigital.com`.

---

## Opción B — Netlify

1. Repo en GitHub/GitLab.
2. Netlify → **Add new site** → **Import an existing project** → elegí el repo.
3. Netlify detecta `netlify.toml` (build `npm run build`, publish `frontend`). Deploy.
4. **Domain settings** → agregá el dominio y seguí las instrucciones de DNS.
5. `frontend/_headers` se aplica solo.

Alternativa sin Git: `npm run build` y arrastrá la carpeta `frontend/` a
<https://app.netlify.com/drop>.

---

## Opción C — Vercel

1. Repo en GitHub/GitLab.
2. Vercel → **Add New** → **Project** → importá el repo.
3. Vercel usa `vercel.json` (build `npm run build`, output `frontend`). Deploy.
4. **Settings → Domains** → agregá el dominio.

---

## Después de publicar

- Actualizá si hace falta las URLs absolutas que apuntan a `https://francodigital.com/`:
  - `frontend/index.html` (canonical, Open Graph, Twitter, JSON-LD)
  - `frontend/sitemap.xml`
  - `frontend/robots.txt`
- Corré **Lighthouse** (DevTools → Lighthouse) sobre la URL de producción y
  revisá Performance / SEO / Accesibilidad / Best Practices.
- Registrá el sitio en **Google Search Console** y enviá `sitemap.xml`.
