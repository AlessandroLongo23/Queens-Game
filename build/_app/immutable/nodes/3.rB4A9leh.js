var ze=a=>{throw TypeError(a)};var pt=(a,e,t)=>e.has(a)||ze("Cannot "+t);var Q=(a,e,t)=>(pt(a,e,"read from private field"),t?t.call(a):e.get(a)),H=(a,e,t)=>e.has(a)?ze("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(a):e.set(a,t);import{g as U,a as x,s as Ce,t as M,b as K,d as mt,j as vt,k as gt}from"../chunks/disclose-version.C6NkQ8Ck.js";import{m as X,a as $,g as o,s as h,p as Ee,d as Ie,c as f,r as d,t as D,o as Ne,ae as bt,b as p,ao as xt,k as B}from"../chunks/runtime.CGsJHgnc.js";import{l as pe,s as me,a as _,p as yt,o as $t,b as _t,c as he,i as P}from"../chunks/index-client.Ck2K4Ujv.js";import{I as ve,s as ge,B as j,e as qe,i as Te}from"../chunks/Button.CDYPipTh.js";import{s as y,t as Be,i as Qe,a as wt}from"../chunks/stores.svelte.wgAXakWE.js";import{s as kt}from"../chunks/render.CDXuLQw_.js";function Se(a,e){const t=pe(e,["children","$$slots","$$events","$$legacy"]);ve(a,me({name:"info"},()=>t,{iconNode:[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]],children:(n,l)=>{var s=U(),u=X(s);ge(u,e,"default",{}),x(n,s)},$$slots:{default:!0}}))}function Mt(a,e){const t=pe(e,["children","$$slots","$$events","$$legacy"]);ve(a,me({name:"rotate-ccw"},()=>t,{iconNode:[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]],children:(n,l)=>{var s=U(),u=X(s);ge(u,e,"default",{}),x(n,s)},$$slots:{default:!0}}))}function Ae(a,e){const t=pe(e,["children","$$slots","$$events","$$legacy"]);ve(a,me({name:"x"},()=>t,{iconNode:[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]],children:(n,l)=>{var s=U(),u=X(s);ge(u,e,"default",{}),x(n,s)},$$slots:{default:!0}}))}const zt=["bg-red-300","bg-blue-300","bg-green-300","bg-yellow-300","bg-purple-300","bg-pink-300","bg-orange-300","bg-gray-300","bg-teal-300","bg-cyan-300","bg-sky-300","bg-indigo-300","bg-violet-300","bg-fuchsia-300"];var R;class qt{constructor(e){H(this,R,$(_([])));this.n=e;for(let t=0;t<e;(t+=1)-1){this.cells[t]=[];for(let r=0;r<e;(r+=1)-1)this.cells[t][r]=new Tt("empty",t,r)}this.initBoard()}get cells(){return o(Q(this,R))}set cells(e){h(Q(this,R),_(e))}initBoard(){this.placeQueens(),this.assignColors(),this.removeQueens()}placeQueens(){const e=this.backtrackQueens(0,[]);e?e.forEach(([t,r],n)=>{this.cells[t][r].state="queen",this.cells[t][r].color=zt[n]}):console.error("No valid queen placement found")}backtrackQueens(e,t){if(e===this.n)return t;const r=this.shuffleArray([...Array(this.n).keys()]);for(const n of r)if(this.isSafe(e,n,t)){t.push([e,n]);const l=this.backtrackQueens(e+1,t);if(l)return l;t.pop()}return null}isSafe(e,t,r){for(const[n,l]of r)if(l===t||n===e||Math.abs(n-e)<=1&&Math.abs(l-t)<=1)return!1;return!0}shuffleArray(e){for(let t=e.length-1;t>0;(t-=1)+1){const r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e}assignColors(){let e=this.cells.flat().filter(r=>r.state==="queen").map(r=>({parents:[],pos:{x:r.i,y:r.j},color:r.color})),t=[];for(let r of e)this.addToAssign(r,t);for(;t.length>0;){let r=t[Math.floor(Math.random()*t.length)];r.color=r.parents[Math.floor(Math.random()*r.parents.length)].color,this.cells[r.pos.x][r.pos.y].color=r.color,t.splice(t.indexOf(r),1),this.addToAssign(r,t)}}addToAssign(e,t){const r=[{x:e.pos.x-1,y:e.pos.y},{x:e.pos.x+1,y:e.pos.y},{x:e.pos.x,y:e.pos.y-1},{x:e.pos.x,y:e.pos.y+1}];for(let n of r)if(this.isValidPos(n.x,n.y)&&!this.cells[n.x][n.y].color){let l=t.find(s=>s.pos.x===n.x&&s.pos.y===n.y);l?l.parents.push(e):t.push({parents:[e],pos:{x:n.x,y:n.y}})}}isValidPos(e,t){return e>=0&&e<this.n&&t>=0&&t<this.n}removeQueens(){this.cells.flat().forEach(e=>{e.state==="queen"&&(this.cells[e.i][e.j].state="empty")})}checkWin(){return!(this.cells.flat().filter(t=>t.state==="queen").length!==this.n||this.checkError())}reset(){this.cells.flat().forEach(e=>{e.state="empty",e.error=!1})}checkError(){return this.cells.flat().filter(e=>e.state==="queen"),this.cells.flat().forEach(e=>{let t=this.cells.flat().filter(s=>s.i===e.i&&s.state==="queen").length,r=this.cells.flat().filter(s=>s.j===e.j&&s.state==="queen").length,n=this.cells.flat().filter(s=>s.color===e.color&&s.state==="queen").length,l=this.cells.flat().some(s=>Math.abs(s.i-e.i)+Math.abs(s.j-e.j)<=2&&s!==e&&e.state==="queen"&&s.state==="queen");(t>1||r>1||n>1||l)&&!e.error?e.error=!0:t<=1&&r<=1&&n<=1&&!l&&e.error&&(e.error=!1)}),this.cells.flat().some(e=>e.error)}}R=new WeakMap;var W,G;class Tt{constructor(e,t,r){H(this,W,$());H(this,G,$());this.state=e,this.error=!1,this.i=t,this.j=r,this.color=""}get state(){return o(Q(this,W))}set state(e){h(Q(this,W),_(e))}get error(){return o(Q(this,G))}set error(e){h(Q(this,G),_(e))}}W=new WeakMap,G=new WeakMap;var Qt=M('<div class="flex flex-col justify-center items-center"><div> </div></div>');function St(a,e){Ee(e,!0);const t=Ce(),r=()=>K(Be,"$theme",t);let n=yt(e,"seconds",11,0),l,s,u=$(void 0);m();function m(){s=Math.floor(n()/60),l=n()%60,h(u,`${s}:${l<10?"0":""}${l}`)}Ie(()=>{m()});var v=Qt(),z=f(v),E=f(z);d(z),d(v),D(()=>{y(z,`text-2xl text-center ${(r()==0?"text-black":"text-white")??""}`),kt(E,`Time: ${o(u)??""}`)}),x(a,v),Ne()}function At(a){let e=5e3,t=Date.now()+e,r={startVelocity:15,spread:200,ticks:500,zIndex:0};function n(s,u){return Math.random()*(u-s)+s}let l=setInterval(function(){let s=t-Date.now();if(s<=0)return clearInterval(l);let u=50*(s/e);confetti(Object.assign({},r,{particleCount:u,origin:{x:n(.1,.3),y:Math.random()-.2}})),confetti(Object.assign({},r,{particleCount:u,origin:{x:n(.7,.9),y:Math.random()-.2}}))},250)}function Ct(a,e,t){a.key==="i"&&e(),a.key==="Escape"&&t()}var Et=(a,e)=>e(),It=M('<img src="/stripe.svg" alt="error">'),Nt=M('<img src="/pieces/wQ.svg" alt="white queen">'),Bt=M('<div class="absolute z-50 -translate-y-1/2 pointer-events-none"><!></div>'),Pt=M("<button><!> <!></button>"),Dt=M('<div class="flex flex-col"></div>'),Rt=M('<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><div class="flex flex-col justify-center items-center m-auto translate-y-8"><div class="relative w-72 py-2 rounded-t-lg"><!></div> <div class="flex flex-row m-auto border-2 bg-black border-black"></div> <div class="flex flex-row justify-center items-center gap-8 mt-4"><!> <!></div></div></div>'),Wt=M(`<div role="button" tabindex="0"><div class="flex flex-row items-center gap-4"><h1>Queen's Game</h1></div> <div><div><div class="flex flex-col items-center"><div class="flex flex-row justify-center items-center gap-2 mb-2"><!> <h1>How to play</h1></div> <p class="text-lg mb-8 text-start">To win the game you need to place a queen <img src="/pieces/wQ.svg" alt="white queen" class="size-6 inline-block m-auto"> on each row, column, and color region, but they can't be next to each other.</p> <p class="text-lg mb-4 text-start">Left click on a cell to place a queen <img src="/pieces/wQ.svg" alt="white queen" class="size-6 inline-block m-auto"> , or right click to flag it with a cross <!>.</p></div> <!></div></div> <!> <div><div><h1 class="text-2xl mb-4">You win!</h1> <!></div></div> <!></div>`);function Xt(a,e){Ee(e,!0);const t=Ce(),r=()=>K(wt,"$sound",t),n=()=>K(Qe,"$info",t),l=()=>K(Be,"$theme",t);let s=$(void 0),u=$(void 0),m=$(void 0),v=$(void 0),z=$(void 0),E,Y,q,F=$(void 0),J,I,Z,w;$t(()=>{xe(),E=new Audio("/sounds/placeQueen.mp3"),Y=new Audio("/sounds/removeQueen.mp3"),q=new Audio("/sounds/cross.mp3"),h(F,_(new Audio("/sounds/win.mp3"))),I=new Audio("/sounds/error.ogg"),Z=new Audio("/sounds/reset.ogg"),w=new Audio("/sounds/button.ogg"),J=new Audio("/sounds/play.ogg"),J.currentTime=0,J.play()});let ee=!1,be="remove";function Pe(i,c,A){o(m)||(i.button===0?Re(c,A):i.button===2&&(ee=!0,be=o(s).cells[c][A].state==="empty"?"place":"remove",We(c,A)))}function De(){ee=!1}function Re(i,c){o(s).cells[i][c].state=o(s).cells[i][c].state!=="queen"?"queen":"empty",o(s).cells[i][c].state=="queen"?(E.currentTime=0,r()&&E.play()):(Y.currentTime=0,r()&&Y.play()),o(s).checkError()&&(I.currentTime=0,r()&&I.play())}function We(i,c){o(s).cells[i][c].state=o(s).cells[i][c].state!=="cross"?"cross":"empty",o(s).cells[i][c].state=="cross"&&(q.currentTime=0,r()&&q.play()),o(s).checkError()&&(I.currentTime=0,r()&&I.play())}function Ge(i,c){!ee||o(m)||(be==="place"?Le(i,c):Oe(i,c))}function Le(i,c){o(s).cells[i][c].state="cross",q.currentTime=0,r()&&q.play()}function Oe(i,c){o(s).cells[i][c].state="empty",q.currentTime=0,r()&&q.play()}const Ve=setInterval(()=>{o(m)||bt(u)},1e3);_t(()=>{clearInterval(Ve)});let te=$(!1);Ie(()=>{h(m,_(o(s).checkWin())),o(m)&&!o(te)&&(o(F).currentTime=0,r()&&o(F).play(),h(te,!0))});function xe(){h(v,Math.floor(Math.random()*4)+5),h(z,_(o(v)==5||o(v)==6?"size-20":o(v)==7?"size-16":"size-12")),h(s,_(new qt(o(v)))),h(u,0),h(m,!1),h(te,!1),w&&(w.currentTime=0,r()&&w.play())}function se(){oe||(vt(Qe,!n()),w.currentTime=0,r()&&w.play())}let oe=!1;function He(){n()||(oe=!oe,w.currentTime=0,r()&&w.play())}function je(){o(s).cells.flat().some(i=>i.state!=="empty")&&(o(s).reset(),h(s,_(o(s))),Z.currentTime=0,r()&&Z.play())}var S=Wt();S.__mouseup=[Et,De],S.__keydown=[Ct,se,He];var re=f(S),Ke=f(re);d(re);var L=p(re,2),ne=f(L),ae=f(ne),le=f(ae),ye=f(le);he(ye,()=>Se,(i,c)=>{c(i,{size:36,class:"p-1 m-auto"})});var Ue=p(ye,2);d(le);var $e=p(le,4),Xe=p(f($e),3);he(Xe,()=>Ae,(i,c)=>{c(i,{size:16,class:"inline-block m-auto"})}),xt(),d($e),d(ae);var Ye=p(ae,2);j(Ye,{text:"Got it!",color:"blue",func:()=>se()}),d(ne),d(L);var _e=p(L,2);P(_e,()=>o(m),i=>{At()});var O=p(_e,2),ie=f(O),Fe=p(f(ie),2);j(Fe,{text:"Next level",color:"blue",func:()=>xe()}),d(ie),d(O);var Je=p(O,2);P(Je,()=>o(s),i=>{var c=Rt(),A=f(c),ce=f(A),Ze=f(ce);St(Ze,{get seconds(){return o(u)},set seconds(N){h(u,_(N))}}),d(ce);var de=p(ce,2);qe(de,21,()=>o(s).cells,Te,(N,st,g)=>{var ue=Dt();qe(ue,21,()=>o(st),Te,(ot,V,b)=>{var C=Pt();const rt=B(()=>g===0||o(s).cells[g-1][b].color!=o(s).cells[g][b].color?"border-l-2":"border-l border-l-black/25"),nt=B(()=>g===o(s).cells.length-1||o(s).cells[g+1][b].color!=o(s).cells[g][b].color?"border-r-2":"border-r border-r-black/25"),at=B(()=>b===0||o(s).cells[g][b-1].color!=o(s).cells[g][b].color?"border-t-2":"border-t border-t-black/25"),lt=B(()=>b===o(s).cells[0].length-1||o(s).cells[g][b+1].color!=o(s).cells[g][b].color?"border-b-2":"border-b border-b-black/25");C.__mousedown=T=>Pe(T,g,b);var Me=f(C);P(Me,()=>o(V).error,T=>{var k=It();D(()=>y(k,`absolute -translate-y-1/2 z-20 ${o(z)??""} p-1`)),x(T,k)});var it=p(Me,2);P(it,()=>o(V).state==="queen",T=>{var k=Nt();D(()=>y(k,`absolute z-50 -translate-y-1/2 ${(o(v)==5||o(v)==6?"size-20":o(v)==7?"size-16":"size-12")??""} p-1`)),x(T,k)},T=>{var k=U(),ct=X(k);P(ct,()=>o(V).state==="cross",dt=>{var fe=Bt(),ut=f(fe);he(ut,()=>Ae,(ft,ht)=>{ht(ft,{size:"50%",strokeWidth:"1",class:"m-auto"})}),d(fe),x(dt,fe)},null,!0),x(T,k)}),d(C),D(()=>y(C,`relative ${o(z)??""} ${o(V).color??""} ${o(rt)??""} ${o(nt)??""} ${o(at)??""} ${o(lt)??""} border-black m-auto`)),gt("mouseenter",C,()=>Ge(g,b)),x(ot,C)}),d(ue),x(N,ue)}),d(de);var we=p(de,2),ke=f(we),et=B(()=>o(s).cells.flat().every(N=>N.state==="empty"));j(ke,{text:"Reset",color:"neutral",get icon(){return Mt},iconSize:36,func:()=>je(),get disabled(){return o(et)}});var tt=p(ke,2);j(tt,{text:"How to play",color:"neutral",get icon(){return Se},iconSize:36,func:()=>se()}),d(we),d(A),d(c),x(i,c)}),d(S),D(()=>{y(S,`cursor-default flex flex-col justify-between items-center w-screen h-screen m-auto transition-all duration-75 ${(l()?"bg-neutral-900":"bg-white")??""}`),y(Ke,`m-8 text-5xl font-semibold ${(l()?"text-white":"text-black")??""}`),y(L,`absolute ${(!n()&&"pointer-events-none")??""} z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96`),y(ne,`${(n()?"opacity-100":"opacity-0 translate-y-4")??""} transition-all duration-200 flex flex-col justify-center items-center text-center px-6 py-4 rounded-lg border-2 
            ${(l()==0?"bg-white border-black text-black":"bg-neutral-900 border-white text-white")??""}`),y(Ue,`text-2xl font-bold my-2 text-center ${(l()==0?"text-black":"text-white")??""}`),y(O,`absolute ${(!o(m)&&"pointer-events-none")??""} z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`),y(ie,`${(o(m)?"opacity-100":"opacity-0 translate-y-4")??""} flex flex-col justify-center items-center text-center p-4 rounded-lg border-2
            ${(l()==0?"bg-white border-black text-black":"bg-neutral-900 border-white text-white")??""}`)}),x(a,S),Ne()}mt(["mouseup","keydown","mousedown"]);export{Xt as component};
