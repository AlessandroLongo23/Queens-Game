import{q as g,v as R,H as S,w as D,x as m,y as p,z as A,A as b,B as c,C as V,D as k,E as M,F as O,G as C,I as H,J as Y,K as z,p as B,L as E,M as G,o as W,e as $}from"./runtime.CGsJHgnc.js";import{c as j,r as I,h,e as q}from"./disclose-version.C6NkQ8Ck.js";function X(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const F=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function Z(e){return F.includes(e)}const J={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"};function ee(e){return e=e.toLowerCase(),J[e]??e}const K=["touchstart","touchmove"];function P(e){return K.includes(e)}function te(e,t){var s=t==null?"":typeof t=="object"?t+"":t;s!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=s,e.nodeValue=s==null?"":s+"")}function U(e,t){return L(e,t)}function ne(e,t){g(),t.intro=t.intro??!1;const s=t.target,l=E,f=c;try{for(var n=R(s);n&&(n.nodeType!==8||n.data!==S);)n=D(n);if(!n)throw m;p(!0),A(n),b();const d=L(e,{...t,anchor:n});if(c===null||c.nodeType!==8||c.data!==V)throw k(),m;return p(!1),d}catch(d){if(d===m)return t.recover===!1&&M(),g(),O(s),p(!1),U(e,t);throw d}finally{p(l),A(f)}}const i=new Map;function L(e,{target:t,anchor:s,props:l={},events:f,context:n,intro:d=!0}){g();var v=new Set,y=a=>{for(var o=0;o<a.length;o++){var r=a[o];if(!v.has(r)){v.add(r);var u=P(r);t.addEventListener(r,h,{passive:u});var T=i.get(r);T===void 0?(document.addEventListener(r,h,{passive:u}),i.set(r,1)):i.set(r,T+1)}}};y(C(j)),I.add(y);var _=void 0,N=H(()=>{var a=s??t.appendChild(Y());return z(()=>{if(n){B({});var o=$;o.c=n}f&&(l.$$events=f),E&&q(a,null),_=e(a,l)||{},E&&(G.nodes_end=c),n&&W()}),()=>{var u;for(var o of v){t.removeEventListener(o,h);var r=i.get(o);--r===0?(document.removeEventListener(o,h),i.delete(o)):i.set(o,r)}I.delete(y),w.delete(_),a!==s&&((u=a.parentNode)==null||u.removeChild(a))}});return w.set(_,N),_}let w=new WeakMap;function oe(e){const t=w.get(e);t&&t()}export{Z as a,ne as h,X as i,U as m,ee as n,te as s,oe as u};
