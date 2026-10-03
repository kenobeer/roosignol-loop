import puppeteer from "puppeteer-core";
const url=process.argv[2], rm=process.argv[3]==="rm";
const b=await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",headless:"new"});
const p=await b.newPage(); await p.setViewport({width:390,height:844,deviceScaleFactor:2,isMobile:true,hasTouch:true});
if(rm) await p.emulateMediaFeatures([{name:"prefers-reduced-motion",value:"reduce"}]);
const errs=[]; p.on("pageerror",e=>errs.push(e.message));
await p.goto(url,{waitUntil:"networkidle0"});
const sl=ms=>new Promise(r=>setTimeout(r,ms));
await p.evaluate(()=>document.getElementById("t-shop").click()); await sl(900);
console.log("shop default:", await p.$eval("#feeNum",e=>e.textContent));
await p.evaluate(()=>document.querySelectorAll("#rack .pair")[0].scrollIntoView({block:"center"})); await sl(300);
await p.tap("#rack .pair:nth-child(2)"); await sl(200);
console.log("rack tap float:", await p.$eval(".coinf",e=>e.textContent), "| big number still:", await p.$eval("#feeNum",e=>e.textContent));
await sl(1500);
console.log("hscroll:", await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth), "anims:", await p.evaluate(()=>document.getAnimations().filter(a=>a.playState==="running").length), "errors:", errs);
// section 1: no drag/gesture handlers left
console.log("old controls gone:", await p.evaluate(()=>["lever","skiHit","waxHit","patchDrag","busy"].map(i=>[i,!!document.getElementById(i)])));
console.log("touch-action none elements in section 1:", await p.evaluate(()=>[...document.querySelectorAll("#p-ski *")].filter(e=>getComputedStyle(e).touchAction==="none").length));
await b.close();
