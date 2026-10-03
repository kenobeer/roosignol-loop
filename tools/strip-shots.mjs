// Usage: node tools/strip-shots.mjs <url> <out-prefix> [width]
// Saves the strip (and the section) at the initial state, after winter 3 and after winter 5.
import puppeteer from "puppeteer-core";
const url=process.argv[2], prefix=process.argv[3], W=+process.argv[4]||390;
const b=await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",headless:"new"});
const p=await b.newPage(); await p.setViewport({width:W,height:844,deviceScaleFactor:3,isMobile:true,hasTouch:true});
await p.goto(url,{waitUntil:"networkidle0"});
const sl=ms=>new Promise(r=>setTimeout(r,ms));
await p.evaluate(()=>document.getElementById("t-ski").click()); await sl(900);
await p.evaluate(()=>{const y=document.getElementById("panels").getBoundingClientRect().top+scrollY-4; window.scrollTo(0,y)}); await sl(400);
const shot=async n=>{
  const clip=await p.evaluate(()=>{const g=document.getElementById("g1").getBoundingClientRect(); const s=document.querySelector(".strip").getBoundingClientRect(); const t=document.querySelector(".g1top").getBoundingClientRect(); return {x:0,y:Math.max(0,t.top-4+scrollY),width:innerWidth,height:s.bottom-t.top+10}});
  await p.screenshot({path:`${prefix}_${n}.png`,clip});
};
await shot("initial");
const go=async k=>{for(let i=0;i<k;i++){await p.evaluate(()=>document.getElementById("go").click()); await sl(1100)}};
await go(4); await shot("winter3");
await go(2); await shot("winter5");
await b.close();
