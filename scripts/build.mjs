import { build, icon, typed, esc, VO_OFFSET } from "./frame.mjs";

const durs = [9.7, 10.9, 8.1, 8.8, 7.2, 8.1, 8.7, 8.3, 8.9, 11.8];
const scenes = [];
const HD = `tl.fromTo($(".hd"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, 0.2);`;
const HDCSS = `@R .hd { position:absolute; left:140px; top:96px; }`;
const NODE = `@R .n { position:absolute; width:72px; height:72px; border-radius:50%; background:var(--panel); border:3px solid var(--green); }`;
const node = (cls, x, y) => `<div class="n ${cls}" style="left:${x - 36}px; top:${y - 36}px"></div>`;

// 01 HOOK
const code = ["function login(user) {", "  const ok = check(user);", "  return ok && sav(user)", "}"];
scenes.push({
  css: `
@R .ed { left:360px; top:110px; width:1200px; height:450px; overflow:hidden; }
@R .ed .top { height:80px; display:flex; align-items:center; gap:12px; padding:0 28px; border-bottom:1.5px solid var(--line); }
@R .ed .top i { display:block; width:16px; height:16px; border-radius:50%; background:#2b3632; }
@R .ed .top span { margin-left:16px; }
@R .code { padding:28px 0; }
@R .ln { display:flex; align-items:center; height:66px; padding:0 40px; gap:30px; border-radius:0; }
@R .ln .no { width:40px; color:#6f7d77; }
@R .bad .ic { width:40px; height:40px; color:var(--yellow); margin-left:auto; }
@R .q { position:absolute; left:1590px; top:330px; width:300px; color:var(--muted); font-size:120px; font-weight:600; }
@R .ft { position:absolute; left:0; right:0; top:680px; text-align:center; font-size:108px; }
@R .sub { position:absolute; left:0; right:0; top:830px; text-align:center; color:var(--muted); }
`,
  html: `
<div class="card ed"><div class="top"><i></i><i></i><i></i><span class="mono muted">app.js</span></div>
  <div class="code">${code
    .map((l, i) => `<div class="ln mono ${i === 2 ? "bad" : ""}"><span class="no">${i + 1}</span><span>${esc(l).replace(/ /g, "&nbsp;")}</span>${i === 2 ? icon("triangle-alert") : ""}</div>`)
    .join("")}</div>
</div>
<div class="q">?</div>
<h1 class="hd ft"><span class="g">Git</span> pamięta za ciebie</h1>
<div class="sub lb">historia · gałęzie · współpraca</div>`,
  js: `
tl.fromTo($(".ed"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, 0.1);
tl.fromTo($(".ln"), { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.4, ease: E, stagger: 0.12 }, V(0.3));
tl.to($(".bad"), { backgroundColor: "rgba(245,197,24,.10)", duration: 0.4 }, V(1.4));
tl.fromTo($(".bad .ic"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: E }, V(1.5));
tl.fromTo($(".q"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(2.8));
tl.to($(".q"), { opacity: 0, duration: 0.4 }, V(4.2));
tl.fromTo($(".ft"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, V(4.4));
tl.fromTo($(".sub"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(5.8));
`,
});

// 02 HISTORIA
const log = [
  ["e81c4a2", "popraw logowanie", "Ania", "14:05"],
  ["3fa09d1", "dodaj koszyk", "Marek", "12:30"],
  ["9b2e77c", "nowy wygląd strony", "Ania", "wczoraj"],
  ["a1f3c20", "pierwszy commit", "Marek", "pon."],
];
scenes.push({
  css: `${HDCSS}
@R .row { left:140px; width:1640px; height:96px; display:grid; grid-template-columns:240px 1fr 220px 200px; align-items:center; padding:0 40px; }
${log.map((_, i) => `@R .r${i} { top:${290 + i * 112}px; }`).join("\n")}
@R .row .h { color:var(--yellow); } @R .row .a, @R .row .t { color:var(--muted); }
@R .meta { position:absolute; left:144px; top:780px; color:var(--muted); }
`,
  html: `
<h1 class="hd"><span class="g">Git</span> = historia projektu</h1>
${log.map(([h, m, a, t], i) => `<div class="card row r${i}"><span class="mono h">${h}</span><span class="lb m">${m}</span><span class="lb a">${a}</span><span class="mono t">${t}</span></div>`).join("\n")}
<div class="meta mono">Linus Torvalds · <span class="y">2005</span></div>`,
  js: `${HD}
tl.fromTo($(".row"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E, stagger: 0.2 }, V(2.5));
tl.to($(".row .m"), { color: "#3ee08f", duration: 0.4, stagger: 0.05 }, V(4.4));
tl.to($(".row .m"), { color: "#e9efeb", duration: 0.4 }, V(5.3));
tl.to($(".row .a"), { color: "#3ee08f", duration: 0.4, stagger: 0.05 }, V(5.4));
tl.to($(".row .a"), { color: "#8a9891", duration: 0.4 }, V(6.1));
tl.to($(".row .t"), { color: "#3ee08f", duration: 0.4, stagger: 0.05 }, V(6.15));
tl.fromTo($(".meta"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(7.4));
`,
});

// 03 + 04 shared zones
const zones = [
  ["folder", "Katalog roboczy", "edytujesz", 2.25],
  ["inbox", "Poczekalnia", "staging", 4.24],
  ["database", "Repozytorium", "historia", 6.04],
];
const zx = (i) => 140 + i * 580;
const ZCSS = `
@R .z { top:280px; width:480px; height:500px; display:flex; flex-direction:column; align-items:center; padding-top:48px; gap:14px; color:var(--muted); }
@R .z .ic { width:72px; height:72px; stroke-width:1.4; }
@R .z .nm { font-size:50px; font-weight:600; color:var(--text); letter-spacing:-0.015em; }
${zones.map((_, i) => `@R .z${i} { left:${zx(i)}px; }`).join("\n")}
@R .wire .ar { stroke:#3a4842; }
@R .wire .ah { fill:#3a4842; }
@R .f { position:absolute; top:560px; width:400px; height:150px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; }
`;
const zonesHtml = `
<svg class="wire" viewBox="0 0 1920 1080">${[0, 1]
  .map((i) => {
    const a = zx(i) + 492;
    const b = zx(i + 1) - 14;
    return `<path class="ar ar${i}" pathLength="1" d="M${a} 530 L${b} 530"/><polygon class="ah ah${i}" points="${b + 8},530 ${b - 6},521 ${b - 6},539"/>`;
  })
  .join("")}</svg>
${zones.map(([ic, n, s], i) => `<div class="card z z${i}">${icon(ic)}<div class="nm">${n}</div><div class="mono">${s}</div></div>`).join("\n")}`;

scenes.push({
  css: `${HDCSS}${ZCSS}
@R .f0 { left:${zx(0) + 40}px; border-color:rgba(245,197,24,.6); }
`,
  html: `
<h1 class="hd">Trzy miejsca <span class="g">na zmiany</span></h1>
${zonesHtml}
<div class="card f f0"><span class="mono">app.js</span><span class="lb y">zmieniony</span></div>`,
  js: `${HD}
${zones.map(([, , , t], i) => `tl.fromTo($(".z${i}"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(${t}) - 0.1);`).join("\n")}
tl.fromTo([$(".ar0"), $(".ah0")], { opacity: 0 }, { opacity: 1, duration: 0.4 }, V(4.0));
tl.fromTo([$(".ar1"), $(".ah1")], { opacity: 0 }, { opacity: 1, duration: 0.4 }, V(5.8));
tl.fromTo($(".f0"), { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: E }, V(3.4));
`,
});

scenes.push({
  css: `${HDCSS}${ZCSS}
@R .f0 { left:${zx(0) + 40}px; border-color:rgba(245,197,24,.6); }
@R .cm { left:${zx(2) + 20}px; width:440px; border-color:rgba(62,224,143,.6); }
@R .cm .h { color:var(--yellow); }
@R .cmd { position:absolute; top:830px; width:400px; text-align:center; color:var(--yellow); }
@R .c0 { left:${zx(0) + 290}px; } @R .c1 { left:${zx(1) + 290}px; }
`,
  html: `
<h1 class="hd"><span class="g">add</span> i <span class="g">commit</span></h1>
${zonesHtml}
<div class="card f f0"><span class="mono">app.js</span><span class="lb y">zmieniony</span></div>
<div class="card f cm"><span class="mono h">e81c4a2</span><span class="lb ds">popraw logowanie</span></div>
<div class="cmd c0 mono">git add</div><div class="cmd c1 mono">git commit</div>`,
  js: `${HD}
tl.fromTo($(".z"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.1);
tl.fromTo($(".f0"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.2);
tl.fromTo($(".c0"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(0.6));
tl.to($(".f0"), { x: 580, duration: 0.8, ease: IO }, V(1.1));
tl.to($(".z1"), { borderColor: "rgba(62,224,143,.5)", duration: 0.4 }, V(1.8));
tl.fromTo($(".c1"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(2.75));
tl.to($(".f0"), { x: 1160, opacity: 0, duration: 0.8, ease: IO }, V(3.1));
tl.fromTo($(".cm"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, V(3.7));
tl.set($(".cm .ds"), { opacity: 0 }, 0);
tl.to($(".z2"), { borderColor: "rgba(62,224,143,.5)", duration: 0.4 }, V(3.7));
tl.fromTo($(".cm .h"), { scale: 1 }, { scale: 1.12, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 }, V(6.4));
tl.to($(".cm .ds"), { opacity: 1, duration: 0.5 }, V(7.3));
`,
});

// 05 ŁAŃCUCH
const chain = ["a1f3c20", "9b2e77c", "3fa09d1", "e81c4a2", "7d4b9e1"];
const cx = (i) => 300 + i * 330;
const CY = 520;
scenes.push({
  css: `${HDCSS}${NODE}
@R .hs { position:absolute; top:${CY + 64}px; width:300px; text-align:center; color:var(--muted); }
${chain.map((_, i) => `@R .hs${i} { left:${cx(i) - 150}px; }`).join("\n")}
@R .wire .ar { stroke:#3a4842; } @R .wire .ah { fill:#3a4842; }
@R .head { position:absolute; left:${cx(4) - 90}px; top:${CY - 160}px; width:180px; height:72px; border-radius:20px; border:2px solid var(--yellow);
  background:rgba(245,197,24,.08); color:var(--yellow); display:flex; align-items:center; justify-content:center; }
@R .cap { position:absolute; left:0; right:0; top:800px; text-align:center; font-size:56px; font-weight:600; letter-spacing:-0.02em; }
`,
  html: `
<h1 class="hd">Commity tworzą <span class="g">łańcuch</span></h1>
<svg class="wire" viewBox="0 0 1920 1080">${chain
    .slice(1)
    .map((_, k) => {
      const i = k + 1;
      const a = cx(i) - 44;
      const b = cx(i - 1) + 48;
      return `<path class="ar ar${k}" pathLength="1" d="M${a} ${CY} L${b} ${CY}"/><polygon class="ah ah${k}" points="${b - 6},${CY} ${b + 10},${CY - 10} ${b + 10},${CY + 10}"/>`;
    })
    .join("")}</svg>
${chain.map((_, i) => node(`c c${i}`, cx(i), CY)).join("")}
${chain.map((h, i) => `<div class="hs hs${i} mono">${h}</div>`).join("")}
<div class="head mono">HEAD</div>
<div class="cap">Wróć do <span class="y">dowolnego</span> momentu</div>`,
  js: `${HD}
${chain.map((_, i) => `tl.fromTo([$(".c${i}"), $(".hs${i}")], { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, V(0.5) + ${i} * 0.2);`).join("\n")}
${chain
  .slice(1)
  .map((_, k) => `draw(".ar${k}", V(0.6) + ${k + 1} * 0.2, 0.3); tl.fromTo($(".ah${k}"), { opacity: 0 }, { opacity: 1, duration: 0.15 }, V(0.85) + ${k + 1} * 0.2);`)
  .join("\n")}
tl.fromTo($(".head"), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(1.6));
tl.to([$(".ar3"), $(".ar2"), $(".ar1"), $(".ar0")], { stroke: "#3ee08f", duration: 0.3, stagger: 0.2 }, V(2.6));
tl.to([$(".ah3"), $(".ah2"), $(".ah1"), $(".ah0")], { fill: "#3ee08f", duration: 0.3, stagger: 0.2 }, V(2.6));
tl.to($(".head"), { x: ${cx(1) - cx(4)}, duration: 1.0, ease: IO }, V(4.4));
tl.to([$(".c2"), $(".c3"), $(".c4"), $(".hs2"), $(".hs3"), $(".hs4")], { opacity: 0.3, duration: 0.5 }, V(4.9));
tl.fromTo($(".cap"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(5.0));
`,
});

// 06 GAŁĘZIE + 07 MERGE shared graph
const MY = 640;
const FY = 400;
const m = [300, 580, 860];
const f = [1140, 1420];
const GCSS = `${NODE}
@R .n.fb { border-color:var(--yellow); }
@R .wire .ml { stroke:var(--green); } @R .wire .fl { stroke:var(--yellow); }
@R .tag { position:absolute; height:68px; padding:0 26px; border-radius:20px; display:flex; align-items:center; }
@R .tm { left:${m[2] - 70}px; top:${MY + 60}px; border:2px solid var(--green); color:var(--green); background:rgba(62,224,143,.08); }
@R .tf { left:${m[2] - 90}px; top:${MY - 150}px; border:2px solid var(--yellow); color:var(--yellow); background:rgba(245,197,24,.08); }
`;
const graph = (withMerge) => `
<svg class="wire" viewBox="0 0 1920 1080">
  <path class="ml ml0" pathLength="1" d="M${m[0]} ${MY} L${m[2]} ${MY}"/>
  <path class="fl fl0" pathLength="1" d="M${m[2]} ${MY} C ${m[2] + 140} ${MY}, ${f[0] - 140} ${FY}, ${f[0]} ${FY} L${f[1]} ${FY}"/>
  ${withMerge ? `<path class="ml ml1" pathLength="1" d="M${m[2]} ${MY} L1700 ${MY}"/><path class="fl fl1" pathLength="1" d="M${f[1]} ${FY} C ${f[1] + 140} ${FY}, 1560 ${MY}, 1700 ${MY}"/>` : ""}
</svg>
${m.map((x, i) => node(`mm m${i}`, x, MY)).join("")}
${f.map((x, i) => node(`fb f${i}`, x, FY)).join("")}`;

scenes.push({
  css: `${HDCSS}${GCSS}
@R .cap { position:absolute; left:0; right:0; top:840px; text-align:center; color:var(--muted); }
`,
  html: `
<h1 class="hd">Gałąź to <span class="g">wskaźnik</span></h1>
${graph(false)}
<div class="tag tm mono">main</div>
<div class="tag tf mono">feature</div>
<div class="cap lb">main zostaje nietknięty</div>`,
  js: `${HD}
draw(".ml0", V(0.3), 0.7);
tl.fromTo($(".mm"), { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.45, ease: E, stagger: 0.2 }, V(0.3));
tl.fromTo($(".tm"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(1.0));
tl.fromTo($(".tf"), { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(3.0));
draw(".fl0", V(4.1), 1.1);
tl.fromTo($(".f0"), { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, V(4.5));
tl.to($(".tf"), { x: ${f[0] - m[2]}, y: ${FY - MY}, duration: 0.6, ease: IO }, V(4.4));
tl.fromTo($(".f1"), { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.45, ease: E }, V(5.0));
tl.to($(".tf"), { x: ${f[1] - m[2]}, y: ${FY - MY}, duration: 0.5, ease: IO }, V(5.0));
tl.fromTo($(".tm"), { scale: 1 }, { scale: 1.08, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 }, V(5.6));
tl.fromTo($(".cap"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(5.7));
`,
});

const conflict = [
  ["<<<<<<< main", "muted"],
  ['tytul = "Sklep"', "g"],
  ["=======", "muted"],
  ['tytul = "Mój sklep"', "y"],
  [">>>>>>> feature", "muted"],
];
scenes.push({
  css: `${HDCSS}${GCSS}
@R .gr { position:absolute; inset:0; }
@R .mg { position:absolute; left:${1700 - 48}px; top:${MY - 48}px; width:96px; height:96px; border-radius:50%; background:var(--panel); border:3px solid var(--green);
  display:flex; align-items:center; justify-content:center; color:var(--green); }
@R .mg .ic { width:48px; height:48px; stroke-width:1.8; }
@R .ml2 { position:absolute; left:${1700 - 150}px; top:${MY + 70}px; width:300px; text-align:center; color:var(--yellow); }
@R .cf { left:460px; top:280px; width:1000px; height:560px; padding:40px 56px; }
@R .cf .t { display:flex; align-items:center; gap:20px; margin-bottom:24px; }
@R .cf .t .ic { width:52px; height:52px; color:var(--yellow); stroke-width:1.7; }
@R .cf .l { line-height:1.6; }
`,
  html: `
<h1 class="hd">Łączenie: <span class="g">git merge</span></h1>
<div class="gr">${graph(true)}<div class="mg">${icon("git-merge")}</div><div class="ml2 mono">git merge</div></div>
<div class="card cf"><div class="t">${icon("triangle-alert")}<span class="lb y">konflikt</span></div>
${conflict.map(([l, c]) => `<div class="mono l ${c}">${esc(l).replace(/ /g, "&nbsp;")}</div>`).join("")}</div>`,
  js: `${HD}
tl.fromTo([$(".mm"), $(".fb"), $(".ml0"), $(".fl0")], { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.2);
draw(".ml1", V(1.4), 0.7);
draw(".fl1", V(1.4), 0.7);
tl.fromTo($(".mg"), { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5, ease: E }, V(2.0));
tl.fromTo($(".ml2"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(2.5));
tl.to($(".gr"), { opacity: 0.15, filter: "blur(4px)", duration: 0.5, ease: IO }, V(3.9));
tl.fromTo($(".cf"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(4.1));
tl.fromTo($(".cf .l"), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, ease: E, stagger: 0.12 }, V(4.4));
tl.fromTo($(".cf .t .ic"), { scale: 1 }, { scale: 1.15, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 }, V(6.5));
`,
});

// 08 REMOTE
scenes.push({
  css: `${HDCSS}
@R .bx { top:380px; width:380px; height:300px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; color:var(--muted); }
@R .bx .ic { width:96px; height:96px; stroke-width:1.3; }
@R .bx .lb { color:var(--text); }
@R .b0 { left:160px; } @R .b1 { left:1380px; }
@R .wire .ps { stroke:var(--yellow); } @R .wire .pl { stroke:var(--green); }
@R .wire .hy { fill:var(--yellow); } @R .wire .hg { fill:var(--green); }
@R .lab { position:absolute; left:760px; width:400px; text-align:center; }
@R .lp { top:400px; color:var(--yellow); } @R .ll { top:640px; color:var(--green); }
@R .d { position:absolute; width:30px; height:30px; border-radius:50%; }
@R .dy { left:560px; top:475px; background:var(--yellow); } @R .dg { left:1330px; top:615px; background:var(--green); }
`,
  html: `
<h1 class="hd">Kopia na <span class="g">serwerze</span></h1>
<div class="card bx b0">${icon("laptop")}<span class="lb">Twój komputer</span></div>
<div class="card bx b1">${icon("cloud")}<span class="lb srv">serwer</span><span class="mono g gh">GitHub</span></div>
<svg class="wire" viewBox="0 0 1920 1080">
  <path class="ps" pathLength="1" d="M560 490 L1360 490"/><polygon class="hy" points="1372,490 1356,480 1356,500"/>
  <path class="pl" pathLength="1" d="M1360 630 L560 630"/><polygon class="hg" points="548,630 564,620 564,640"/>
</svg>
<div class="lab lp mono">git push</div><div class="lab ll mono">git pull</div>
${[0, 1, 2].map((i) => `<div class="d dy dy${i}"></div>`).join("")}${[0, 1, 2].map((i) => `<div class="d dg dg${i}"></div>`).join("")}`,
  js: `${HD}
tl.fromTo($(".b0"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(0.1));
tl.fromTo($(".b1"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(1.2));
tl.fromTo($(".gh"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, V(2.6));
tl.set([$(".hy"), $(".hg"), $(".d")], { opacity: 0 }, 0);
draw(".ps", V(4.0), 0.5); tl.to($(".hy"), { opacity: 1, duration: 0.15 }, V(4.45));
tl.fromTo($(".lp"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, V(4.1));
${[0, 1, 2].map((i) => `tl.fromTo($(".dy${i}"), { opacity: 1, x: 0 }, { x: 780, duration: 0.8, ease: IO }, V(4.5) + ${i} * 0.18); tl.set($(".dy${i}"), { opacity: 0 }, V(5.3) + ${i} * 0.18);`).join("\n")}
draw(".pl", V(5.8), 0.5); tl.to($(".hg"), { opacity: 1, duration: 0.15 }, V(6.25));
tl.fromTo($(".ll"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, V(5.9));
${[0, 1, 2].map((i) => `tl.fromTo($(".dg${i}"), { opacity: 1, x: 0 }, { x: -780, duration: 0.8, ease: IO }, V(6.3) + ${i} * 0.18); tl.set($(".dg${i}"), { opacity: 0 }, V(7.1) + ${i} * 0.18);`).join("\n")}
`,
});

// 09 ROZPROSZONY
const lx = (i) => 160 + i * 650;
scenes.push({
  css: `${HDCSS}
@R .sv { left:810px; top:250px; width:300px; height:170px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; color:var(--muted); }
@R .sv .ic { width:72px; height:72px; stroke-width:1.4; }
@R .lp { top:580px; width:300px; height:270px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:22px; color:var(--muted); }
@R .lp > .ic { width:72px; height:72px; stroke-width:1.4; }
${[0, 1, 2].map((i) => `@R .l${i} { left:${lx(i) + 150 - 150}px; }`).join("\n")}
@R .mini { display:flex; gap:14px; align-items:center; }
@R .mini i { display:block; width:24px; height:24px; border-radius:50%; background:var(--green); }
@R .mini i.nw { background:var(--yellow); }
@R .off { position:absolute; left:${lx(0) + 230}px; top:560px; width:64px; height:64px; border-radius:50%; background:var(--panel); border:2px solid var(--yellow);
  display:flex; align-items:center; justify-content:center; color:var(--yellow); }
@R .off .ic { width:34px; height:34px; stroke-width:1.8; }
@R .cap { position:absolute; left:0; right:0; top:910px; text-align:center; font-size:52px; font-weight:600; letter-spacing:-0.02em; }
`,
  html: `
<h1 class="hd">Każdy ma <span class="g">pełną kopię</span></h1>
<svg class="wire" viewBox="0 0 1920 1080">${[0, 1, 2].map((i) => `<path class="lk lk${i}" pathLength="1" d="M960 420 L${lx(i) + 150} 580"/>`).join("")}</svg>
<div class="card sv">${icon("cloud")}<span class="lb">serwer</span></div>
${[0, 1, 2].map((i) => `<div class="card lp l${i}">${icon("laptop")}<div class="mini">${"<i></i>".repeat(4)}${i === 0 ? '<i class="nw"></i>' : ""}</div></div>`).join("\n")}
<div class="off">${icon("wifi-off")}</div>
<div class="cap">Serwer <span class="y">nie jest</span> jedynym źródłem prawdy</div>`,
  js: `${HD}
tl.fromTo($(".sv"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(0.3));
tl.fromTo($(".lp"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E, stagger: 0.12 }, V(0.6));
draw(".lk", V(0.8), 0.6);
tl.fromTo($(".mini i:not(.nw)"), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: E, stagger: 0.06 }, V(1.6));
tl.set($(".nw"), { opacity: 0 }, 0);
tl.to($(".lk0"), { opacity: 0.15, duration: 0.4 }, V(4.4));
tl.fromTo($(".off"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: E }, V(4.5));
tl.fromTo($(".nw"), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: E }, V(5.3));
tl.to($(".sv"), { opacity: 0.4, duration: 0.5 }, V(6.2));
tl.fromTo($(".cap"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(6.3));
`,
});

// 10 PODSUMOWANIE
const pil = [
  ["git-commit-horizontal", "Commity", 0.1],
  ["git-branch", "Gałęzie", 0.84],
  ["git-merge", "Merge", 1.66],
  ["cloud", "Push", 2.1],
];
const cmds = ["git init", "git add .", 'git commit -m "start"'];
scenes.push({
  exit: 0.9,
  css: `
@R .ls { position:absolute; inset:0; }
@R .pl { top:250px; width:380px; height:240px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:22px; color:var(--green); }
@R .pl .ic { width:80px; height:80px; stroke-width:1.5; }
@R .pl .lb { color:var(--text); font-size:52px; font-weight:600; }
${pil.map((_, i) => `@R .p${i} { left:${140 + i * 420}px; }`).join("\n")}
@R .ft { position:absolute; left:140px; top:600px; font-size:108px; }
@R .fin { position:absolute; inset:0; }
@R .fh { position:absolute; left:0; right:0; top:150px; text-align:center; font-size:104px; }
@R .term { left:460px; top:330px; width:1000px; height:340px; }
@R .term .body { font-size:52px; }
@R .fn { position:absolute; left:0; right:0; top:730px; text-align:center; color:var(--muted); }
`,
  html: `
<div class="ls">
${pil.map(([ic, n], i) => `<div class="card pl p${i}">${icon(ic)}<span class="lb">${n}</span></div>`).join("\n")}
<h1 class="hd ft">Cztery filary <span class="g">Gita</span></h1>
</div>
<div class="fin">
  <h1 class="hd fh">Spróbuj <span class="g">sam</span></h1>
  <div class="term"><div class="bar"><i></i><i></i><i></i><span class="mono muted">nowy-projekt</span></div>
    <div class="body">${cmds.map((c, i) => `<div class="mono k${i}"><span class="g">$</span> ${typed(c)}</div>`).join("")}</div></div>
  <div class="fn lb">twój pierwszy commit</div>
</div>`,
  js: `
${pil.map(([, , w], i) => `tl.fromTo($(".p${i}"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(${w}));`).join("\n")}
tl.fromTo($(".ft"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, V(3.3));
tl.to($(".ls"), { opacity: 0, filter: "blur(8px)", duration: 0.5, ease: "power2.inOut" }, V(5.0));
tl.fromTo($(".fh"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, V(5.5));
tl.fromTo($(".term"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(5.9));
type(".k0", V(6.7), 0.05);
type(".k1", V(7.3), 0.05);
type(".k2", V(7.95), 0.045);
tl.fromTo($(".fn"), { opacity: 0 }, { opacity: 1, duration: 0.6 }, V(9.0));
`,
});

build({
  title: "Jak działa Git",
  durs,
  scenes,
  sfx: (st) => [
    ["click-soft", st[3] + VO_OFFSET + 1.1, 0.365, 0.45, 13],
    ["click-soft", st[3] + VO_OFFSET + 3.1, 0.365, 0.45, 13],
    ["pop", st[6] + VO_OFFSET + 2.0, 0.72, 0.3, 13],
    ["chime", st[9] + VO_OFFSET + 5.5, 2.5, 0.22, 15],
    ["typing", st[9] + VO_OFFSET + 6.7, 1.5, 0.3, 14],
    ["typing", st[9] + VO_OFFSET + 8.2, 0.85, 0.3, 14],
  ],
});
