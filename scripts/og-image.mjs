/* Genera la imagen para compartir en redes (Open Graph, 1200x630)
 * Uso: npm run og  ->  frontend/assets/og-image.jpg
 */
import sharp from "sharp";

const W = 1200;
const H = 630;

// Fondo: mismo azul oscuro del sitio con dos "orbes" de luz como en el hero
const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
        <radialGradient id="o1" cx="15%" cy="10%" r="55%">
            <stop offset="0" stop-color="#2563FF" stop-opacity=".45"/>
            <stop offset="1" stop-color="#2563FF" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="o2" cx="90%" cy="95%" r="50%">
            <stop offset="0" stop-color="#60A5FA" stop-opacity=".30"/>
            <stop offset="1" stop-color="#60A5FA" stop-opacity="0"/>
        </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="#050816"/>
    <rect width="100%" height="100%" fill="url(#o1)"/>
    <rect width="100%" height="100%" fill="url(#o2)"/>
</svg>`);

const tagline = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="120">
    <text x="50%" y="48" text-anchor="middle"
        font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="600" fill="#FFFFFF">
        Desarrollo web profesional
    </text>
    <text x="50%" y="98" text-anchor="middle"
        font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#A1A1AA">
        Landing pages · Sitios corporativos · SEO · Paraguay
    </text>
</svg>`);

const logo = await sharp("frontend/assets/logos/logo_completo_sin_fondo.png")
    .resize({ width: 920 })
    .toBuffer();

const { height: logoH } = await sharp(logo).metadata();

await sharp(background)
    .composite([
        { input: logo, top: 120, left: Math.round((W - 920) / 2) },
        { input: tagline, top: 120 + logoH + 30, left: 0 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile("frontend/assets/og-image.jpg");

console.log("og: frontend/assets/og-image.jpg");
