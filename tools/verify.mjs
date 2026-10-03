import puppeteer from "puppeteer-core"; import fs from "fs"; import {PNG} from "pngjs"; import jsQR from "jsqr";
const png=PNG.sync.read(fs.readFileSync("../print/qr.png")); console.log("QR decodes to:", jsQR(new Uint8ClampedArray(png.data),png.width,png.height)?.data);
const b=await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",headless:"new"});
const ctx=await b.createBrowserContext(); const p=await ctx.newPage();
const r=await p.goto("https://roosignol-loop.vercel.app/",{waitUntil:"networkidle0"}); console.log("incognito status",r.status(),"url",p.url());
await p.evaluate(()=>navigator.serviceWorker.ready); await new Promise(r=>setTimeout(r,1500));
await p.setOfflineMode(true); await p.reload({waitUntil:"load"}).catch(e=>console.log("reload err",e.message));
console.log("offline title:", await p.title());
await b.close();
