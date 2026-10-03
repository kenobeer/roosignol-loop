// Usage: node tools/make-card.mjs [SKI-ID] [URL]
// Writes print/qr.svg, print/qr.png (for the plain URL) and print/card-<ID>.html
import QRCode from "qrcode";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const id = (process.argv[2] || "LOOP-0427").toUpperCase();
const base = process.argv[3] || "https://roosignol-loop.vercel.app/";
if (!/^[A-Z0-9-]{1,16}$/.test(id)) throw new Error("ID must be A-Z, 0-9, hyphen, max 16 chars");
// The default ID needs no parameter, so its QR code is the exact production URL.
const url = id === "LOOP-0427" ? base : base + "?id=" + id;

const opts = {errorCorrectionLevel: "M", margin: 2, color: {dark: "#071a3e", light: "#ffffff"}};
const svg = await QRCode.toString(url, {...opts, type: "svg"});
fs.mkdirSync(path.join(root, "print"), {recursive: true});
if (id === "LOOP-0427") {
  fs.writeFileSync(path.join(root, "print/qr.svg"), svg);
  await QRCode.toFile(path.join(root, "print/qr.png"), url, {...opts, width: 2000});
}
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Card ${id}</title>
<style>
@page{size:A6 portrait;margin:0}
*{box-sizing:border-box}
body{margin:0;font-family:"Helvetica Neue",Arial,sans-serif;font-weight:300;background:#ddd}
.card{width:105mm;height:148mm;margin:10mm auto;background:#071a3e;color:#eef3fc;padding:9mm;display:flex;flex-direction:column;align-items:center;text-align:center;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.brand{font-size:9pt;letter-spacing:.22em;text-transform:uppercase;color:#ffb400}
h1{margin:2mm 0 0;font-size:24pt;font-weight:200}h1 b{color:#ffb400;font-weight:400}
.qr{width:70mm;height:70mm;background:#fff;border-radius:6mm;padding:2mm;margin:7mm 0 6mm}
.qr svg{width:100%;height:100%;display:block}
.line{font-size:13pt;font-weight:400;line-height:1.3}
.id{margin-top:auto;font-size:15pt;letter-spacing:.14em;color:#ffb400}
.id small{display:block;font-size:7.5pt;letter-spacing:.1em;color:#a9bbdb;text-transform:uppercase}
@media print{body{background:none}.card{margin:0}}
</style></head><body>
<div class="card">
  <div class="brand">Student business model</div>
  <h1>Rossignol <b>LOOP</b></h1>
  <div class="qr">${svg.replace(/<\?xml[^>]*>/, "")}</div>
  <div class="line">Scan: follow one ski through 5 seasons</div>
  <div class="id"><small>Ski ID</small>${id}</div>
</div>
</body></html>`;
fs.writeFileSync(path.join(root, `print/card-${id}.html`), html);
console.log("QR encodes:", url);
