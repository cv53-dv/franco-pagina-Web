/* Build de FRANCO — Digital Studio
 * Empaqueta y minifica CSS y JS de frontend/ hacia frontend/dist/
 * Uso: node build.mjs [--watch]
 */
import * as esbuild from "esbuild";
import { mkdirSync, readdirSync, existsSync, statSync } from "node:fs";
import sharp from "sharp";

const watch = process.argv.includes("--watch");
const outdir = "frontend/dist";
mkdirSync(outdir, { recursive: true });

/* -------- Imágenes: PNG/JPG -> WebP -------- */
async function buildImages() {
    const jobs = [
        { dir: "frontend/assets/projects", width: 960, quality: 78 },
        { dir: "frontend/assets/logos", width: 128, quality: 90, only: ["F_Blanco_sin_Fondo_sin_sombra.png"] },
    ];
    for (const { dir, width, quality, only } of jobs) {
        if (!existsSync(dir)) continue;
        for (const file of readdirSync(dir)) {
            if (!/\.(png|jpe?g)$/i.test(file)) continue;
            if (only && !only.includes(file)) continue;
            const src = `${dir}/${file}`;
            const out = `${dir}/${file.replace(/\.(png|jpe?g)$/i, ".webp")}`;
            if (existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs) continue;
            await sharp(src)
                .resize({ width, withoutEnlargement: true })
                .webp({ quality })
                .toFile(out);
            console.log(`webp: ${out}`);
        }
    }
}
await buildImages();

/** @type {import('esbuild').BuildOptions} */
const common = {
    bundle: true,
    minify: true,
    sourcemap: true,
    logLevel: "info",
    legalComments: "none",
};

const cssCtx = await esbuild.context({
    ...common,
    entryPoints: { "app.min": "frontend/css/style.css" },
    outdir,
    loader: { ".png": "file", ".jpg": "file", ".svg": "file", ".woff2": "file" },
    // Nombres estables (sin hash) para poder precargar las fuentes desde index.html
    assetNames: "fonts/[name]",
});

const jsCtx = await esbuild.context({
    ...common,
    entryPoints: { "app.min": "frontend/js/index.js" },
    outdir,
    target: ["es2019"],
});

if (watch) {
    await Promise.all([cssCtx.watch(), jsCtx.watch()]);
    console.log("watching frontend/css y frontend/js ...");
} else {
    await Promise.all([cssCtx.rebuild(), jsCtx.rebuild()]);
    await Promise.all([cssCtx.dispose(), jsCtx.dispose()]);
    console.log("build listo -> frontend/dist/");
}
