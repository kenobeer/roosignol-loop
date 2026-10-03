import puppeteer from "puppeteer-core";
const url=process.argv[2], out=process.argv[3], H=+process.argv[4]||640, rm=process.argv[5]==="rm";
const b=await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",headless:"new"});
const p=await b.newPage(); await p.setViewport({width:390,height:H,deviceScaleFactor:2,isMobile:true,hasTouch:true});
if(rm) await p.emulateMediaFeatures([{name:"prefers-reduced-motion",value:"reduce"}]);
const errs=[]; p.on("pageerror",e=>errs.push(e.message)); p.on("console",m=>m.type()==="error"&&errs.push(m.text()));
await p.goto(url,{waitUntil:"networkidle0"});
const sl=ms=>new Promise(r=>setTimeout(r,ms));
await p.evaluate(()=>document.getElementById("follow").click()); await sl(1200);
await p.evaluate(()=>{const y=document.getElementById("panels").getBoundingClientRect().top+scrollY-4; window.scrollTo(0,y)}); await sl(400);
const fit=()=>p.evaluate(()=>{const g=document.getElementById("g1").getBoundingClientRect(); const nav=document.querySelector("nav").getBoundingClientRect(); const pass=document.getElementById("pass"); const m=pass.getScreenCTM(); const lk=document.getElementById("mathBtn").getBoundingClientRect(); return {vh:innerHeight, navBottom:Math.round(nav.bottom), gTop:Math.round(g.top), gBottom:Math.round(g.bottom), passScale:+m.a.toFixed(3), minMainPx:+(11.8*m.a).toFixed(1), hscroll:document.documentElement.scrollWidth>innerWidth, mathBtnBottom:Math.round(lk.bottom), docScrollable: document.documentElement.scrollHeight>innerHeight}});
console.log("fit:", JSON.stringify(await fit()));
await p.screenshot({path:out+`/f_cover_${H}.png`});
const st=()=>p.evaluate(()=>({w:__skiState.w,open:__skiState.open,total:document.getElementById("jarNum").textContent,go:document.getElementById("go").textContent,cap:document.getElementById("cap").textContent.slice(0,70),coins:document.querySelectorAll("#jarSvg .coins > g").length}));
const click=async(wait)=>{await p.tap("#go"); await sl(rm?60:(wait||1000))};
console.log("0", JSON.stringify(await st()));
for(let i=1;i<=6;i++){ await click(); console.log(i, JSON.stringify(await st())); if(i===1) await p.screenshot({path:out+`/f_open_${H}.png`}); if(i===4) await p.screenshot({path:out+`/f_w3_${H}.png`}); }
console.log("fit end:", JSON.stringify(await fit()));
await p.screenshot({path:out+`/f_end_${H}.png`});
console.log("shop link visible:", await p.$eval("#shopBtn",e=>!e.hidden));
// tap stamp 3 detail
await p.evaluate(()=>document.querySelectorAll(".stamp")[2].dispatchEvent(new MouseEvent("click",{bubbles:true}))); console.log("detail:", await p.$eval("#cap",e=>e.textContent.slice(0,60)));
// quiet mid-game
await p.tap("#go"); await sl(300); // replay
await p.tap("#go"); await sl(900); await p.tap("#go"); await sl(900);
await p.tap("#mathBtn"); await sl(400); console.log("sheet:", await p.$eval("#shF",e=>e.textContent), "|", await p.$eval("#shSo",e=>e.textContent));
await p.screenshot({path:out+`/f_sheet_${H}.png`});
await p.tap("#quiet"); await sl(300); console.log("quiet mid:", await p.$eval("#shF",e=>e.textContent), await p.$eval("#jarNum",e=>e.textContent), "stamp txt:", await p.$eval("#stamps",e=>[...e.querySelectorAll("text")].map(t=>t.textContent).filter(t=>/DAYS/.test(t)).join(",")));
await p.tap("#shClose"); await sl(300);
for(let i=0;i<3;i++){await p.tap("#go"); await sl(rm?60:1000);} 
console.log("quiet end:", JSON.stringify(await st()));
await p.screenshot({path:out+`/f_quietend_${H}.png`});
console.log("errors:", errs, "anims:", await p.evaluate(()=>document.getAnimations().filter(a=>a.playState==="running").length));
await b.close();
