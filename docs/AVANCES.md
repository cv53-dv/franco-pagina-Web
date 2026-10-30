# AVANCES

Registro de lo trabajado en cada jornada, con recomendaciones y pendientes.
Lo más reciente va arriba.

---

## 30 de octubre de 2026

Commits del día: `dd21b1e` y `f391c7c` (ambos subidos a `main`).

### Hecho

**Animaciones**

- Las secciones aparecen en cascada al hacer scroll (`js/enter.js`, `css/enter.css`).
  Se usa la misma animación que al tocar un enlace del menú. El carrusel del
  portafolio entra completo para que las diapositivas de los costados no queden ocultas.
- Los números de Nosotros suben con un conteo rápido (`js/counter.js`, 1,2 s con
  easeOutCubic). El conteo empieza recién cuando la tarjeta ya se ve.
- Con `prefers-reduced-motion` todo aparece sin animar.

**Encabezado compartido** (`css/sections.css`)

Las cinco secciones (Servicios, Proceso, Portafolio, Nosotros y Contacto) usan
el mismo encabezado en dos columnas:

- A la izquierda: una etiqueta pequeña, el título con una palabra en
  degradado azul y una descripción.
- A la derecha: tres beneficios con ícono, separados por divisores.

Piezas reutilizables:

| Clase | Qué es |
|---|---|
| `.split-header` | Encabezado en dos columnas |
| `.section-eyebrow` | Etiqueta pequeña sobre el título |
| `.title-accent` | Palabra del título en degradado azul |
| `.header-benefits` / `.header-benefit` | Lista de tres beneficios |
| `.icon-tile` | Cuadro con ícono |
| `.detail-label` | Etiqueta de columna en mayúsculas |
| `.estimate` | Tiempo estimado |

**Tarjeta**

El contenido principal de cada sección va en una tarjeta con borde azul suave,
fondo en degradado y columnas separadas por divisores. Es el mismo estilo que
el servicio abierto.

**Por sección**

- **Servicios** (`css/services.css`, `js/services.js`): acordeón real.
  - Solo hay un servicio abierto a la vez, con botón +/−.
  - Se maneja con el teclado (flechas, Inicio y Fin).
  - Tiene `aria-expanded` y `aria-controls`.
  - El servicio abierto muestra cuatro columnas: Incluye, Ideal para,
    Resultados esperados y Tiempo estimado, más un botón de WhatsApp con el
    servicio en el mensaje.
  - Los enlaces del footer (`#svc-…`) abren el servicio sin que la página salte.
- **Proceso** (`css/process.css`): el panel de cada etapa va en la tarjeta, con
  cuatro columnas que suman el tiempo estimado de esa etapa.
- **Portafolio** (`css/portfolio.css`):
  - Cada proyecto tiene dos columnas: la descripción a la izquierda y, a la
    derecha, las tecnologías como etiquetas con el botón «Quiero algo así».
  - La diapositiva actual queda resaltada.
- **Nosotros** (`css/about.css`):
  - Una tarjeta de tres columnas: perfil, «Quién está detrás» y
    «En números» con el botón de WhatsApp.
  - Los compromisos pasaron a ser los beneficios del encabezado.
- **Contacto** (`css/contact.css`):
  - El formulario y la columna derecha («Así se verá tu mensaje» y
    «Otros canales» con íconos) quedan dentro de la tarjeta.
  - El botón ocupa todo el ancho.

**Adaptación a pantallas**

Probado a 1568 px (escritorio), 900 px (tablet) y 390 px (celular), sin scroll
horizontal ni errores en la consola.

**Botones**

Los botones de llamada a la acción de las secciones son azules
(`.btn-primary`), incluidos los que abren WhatsApp. El verde sigue en el
botón flotante, en el hero, al final de Proceso y en el footer.

### Pendientes

**Revisar textos escritos para el rediseño**

Son una propuesta y hay que confirmarlos:

- **Servicios:** los textos de «Ideal para», «Resultados esperados» y
  «Tiempo estimado» de cinco servicios.
- **Proceso:** los tiempos de cada etapa:

  | Etapa | Tiempo |
  |---|---|
  | 1 | 1–2 días |
  | 2 | 2–5 días |
  | 3 | 1–3 semanas |
  | 4 | 1–2 días |

  También los tres beneficios del encabezado.
- **Portafolio:** los tres beneficios y las tecnologías de cada proyecto.
- **Contacto:** los tres beneficios.

**Corregir y actualizar**

- **Respuesta en 24 horas repetida:** aparece en los beneficios de Nosotros y
  también en los de Contacto. Conviene cambiar uno de los dos.
- **`DESIGN_SYSTEM.md` desactualizado:** ya no coincide con el diseño en dos
  puntos:
  - Dice «sin etiquetas en mayúsculas encima» del título, y ahora todas las
    secciones tienen etiqueta.
  - Dice que el verde es exclusivo de la acción de contacto, pero los botones
    de WhatsApp de las secciones ahora son azules.

  Hay que documentar el encabezado compartido, la tarjeta y la regla de color
  que se elija.
- **Barra de navegación a 900 px:** el botón «Iniciar proyecto» se parte en dos
  líneas. Venía de antes del rediseño.
- **Rastros del diseño anterior:**
  - `css/motion.css` todavía tiene reglas para `.contact-content` y
    `.contact-card` del diseño viejo.
  - La clase `.project-cta` (verde) solo se usa en el footer.

  Se pueden limpiar o mover.
- **Estado en `README.md`:** dice v0.2 y `package.json` dice 0.3.0. Conviene
  unificarlos.

**Lo que ya estaba en el roadmap**

- Publicar en producción (falta comprar el dominio francodigitalstudio.com y
  elegir el hosting; ver `DEPLOY.md`).
- Testimonios reales de clientes.
- Fase 5: backend, formulario con base de datos y panel administrativo.

### Recomendaciones

- **Foto real en Nosotros:** reemplazar el monograma «CV» por una foto
  (`.about-avatar` ya acepta `<img>`). Una cara genera más confianza que las
  iniciales.
- **Capturas del portafolio:** revisar que sean recientes y que estén en WebP
  con el tamaño justo para el carrusel.
- **Medir antes de publicar:** pasar Lighthouse (rendimiento, accesibilidad y
  SEO) en celular y anotar los resultados aquí.
- **Probar en un celular real:**
  - el acordeón de Servicios;
  - el deslizamiento del carrusel;
  - el formulario de Contacto abriendo WhatsApp de verdad.
- **Medir los clics a WhatsApp:** cuando el sitio esté publicado, conviene
  saber qué botón usa la gente (servicio, proyecto, Nosotros o formulario).
  Por ejemplo, con un parámetro distinto en cada mensaje o con analítica
  liviana como Plausible o Cloudflare Web Analytics.
- **Servidor de desarrollo y memoria:** hoy se detuvo `npm run dev` porque la
  computadora se quedó sin memoria. Si vuelve a pasar, se puede usar
  `npm run build` y `npm run serve` por separado, o cerrar pestañas antes de
  trabajar.
