/* Build de FRANCO — Digital Studio
 * Empaqueta y minifica CSS y JS de frontend/ hacia frontend/dist/
 * Uso: node build.mjs [--watch]
 */
import * as esbuild from "esbuild";
import { mkdirSync } from "node:fs";

const watch = process.argv.includes("--watch");
const outdir = "frontend/dist";
mkdirSync(outdir, { recursive: true });

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
