# FRANCO — Digital Studio

Sitio web corporativo de **FRANCO — Digital Studio**, estudio de desarrollo web y soluciones digitales: landing pages, sitios corporativos, desarrollo full stack, integraciones y SEO técnico.

---

## Objetivo

Una plataforma moderna, rápida y escalable que transmita profesionalismo y confianza, y funcione como la principal herramienta comercial del estudio.

---

## Tecnologías

- HTML5
- CSS3 (sin frameworks — se eliminó Bootstrap en la Fase 3)
- JavaScript ES6+ (vanilla)
- Iconos: SVG en línea (sprite propio, sin fuente de iconos)
- esbuild (bundle + minificación de CSS y JS)
- Node.js (próximamente — backend)
- PostgreSQL (próximamente)

---

## Estructura

```
frontend/
  index.html
  css/          Fuentes CSS (parciales, importadas por style.css)
  js/           Fuentes JS (index.js es el punto de entrada del bundle)
  dist/         Bundle generado (app.min.css / app.min.js) — versionado
  assets/       Imágenes y logos
docs/           Documentación
docs/legacy/    Notas y planificación previa
build.mjs       Script de build (esbuild)
```

## Desarrollo

```bash
npm install
npm run build      # genera frontend/dist/
npm run watch      # reconstruye al guardar
npm run serve      # sirve frontend/ en http://localhost:4321
npm run dev        # watch + serve en paralelo
```

`index.html` carga `dist/app.min.css` y `dist/app.min.js`, así que **después de
tocar cualquier archivo de `css/` o `js/` hay que correr `npm run build`**
(o dejar `npm run watch` corriendo).

---

## Contacto

- Email: soporte@francodigital.com
- WhatsApp: +595 972 584 557

---

## Estado del proyecto

🟢 En desarrollo — v0.2

- Fase 0 ✅ Control de versiones e higiene
- Fase 1 ✅ Marca y contenido
- Fase 2 ✅ SEO + accesibilidad
- Fase 3 ✅ Rendimiento (sin Bootstrap, bundle esbuild, iconos SVG)
- Fase 4 ✅ Sección "Cómo trabajamos", footer, config de deploy (ver `DEPLOY.md`)
- Fase 5 ⬜ Backend, formulario, panel admin
