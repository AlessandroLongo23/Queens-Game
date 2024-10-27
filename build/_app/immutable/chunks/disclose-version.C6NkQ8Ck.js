import{ap as N,am as A,aq as p,a7 as h,W as B,ak as q,ac as k,M as m,v as g,J as w,ar as C,as as D,L as d,B as c,z as I,A as R,n as E,f as $,ah as F,g as U,s as j}from"./runtime.CGsJHgnc.js";const z=new Set,G=new Set;function H(r,e,t,n){function s(a){if(n.capture||J.call(e,a),!a.cancelBubble){var u=k,f=m;p(null),h(null);try{return t.call(this,a)}finally{p(u),h(f)}}}return r.startsWith("pointer")||r.startsWith("touch")||r==="wheel"?q(()=>{e.addEventListener(r,s,n)}):e.addEventListener(r,s,n),s}function X(r,e,t,n,s){var a={capture:n,passive:s},u=H(r,e,t,a);(e===document.body||e===window||e===document)&&N(()=>{e.removeEventListener(r,u,a)})}function Y(r){for(var e=0;e<r.length;e++)z.add(r[e]);for(var t of G)t(r)}function J(r){var M;var e=this,t=e.ownerDocument,n=r.type,s=((M=r.composedPath)==null?void 0:M.call(r))||[],a=s[0]||r.target,u=0,f=r.__root;if(f){var i=s.indexOf(f);if(i!==-1&&(e===document||e===window)){r.__root=e;return}var T=s.indexOf(e);if(T===-1)return;i<=T&&(u=i)}if(a=s[u]||r.target,a!==e){A(r,"currentTarget",{configurable:!0,get(){return a||t}});var O=k,P=m;p(null),h(null);try{for(var _,L=[];a!==null;){var y=a.assignedSlot||a.parentNode||a.host||null;try{var v=a["__"+n];if(v!==void 0&&!a.disabled)if(B(v)){var[W,...x]=v;W.apply(a,[r,...x])}else v.call(a,r)}catch(b){_?L.push(b):_=b}if(r.cancelBubble||y===e||y===null)break;a=y}if(_){for(let b of L)queueMicrotask(()=>{throw b});throw _}}finally{r.__root=e,delete r.currentTarget,p(O),h(P)}}}function S(r){var e=document.createElement("template");return e.innerHTML=r,e.content}function o(r,e){var t=m;t.nodes_start===null&&(t.nodes_start=r,t.nodes_end=e)}function Z(r,e){var t=(e&C)!==0,n=(e&D)!==0,s,a=!r.startsWith("<!>");return()=>{if(d)return o(c,null),c;s===void 0&&(s=S(a?r:"<!>"+r),t||(s=g(s)));var u=n?document.importNode(s,!0):s.cloneNode(!0);if(t){var f=g(u),i=u.lastChild;o(f,i)}else o(u,u);return u}}function rr(r,e,t="svg"){var n=!r.startsWith("<!>"),s=`<${t}>${n?r:"<!>"+r}</${t}>`,a;return()=>{if(d)return o(c,null),c;if(!a){var u=S(s),f=g(u);a=g(f)}var i=a.cloneNode(!0);return o(i,i),i}}function er(r=""){if(!d){var e=w(r+"");return o(e,e),e}var t=c;return t.nodeType!==3&&(t.before(t=w()),I(t)),o(t,t),t}function tr(){if(d)return o(c,null),c;var r=document.createDocumentFragment(),e=document.createComment(""),t=w();return r.append(e,t),o(e,t),r}function ar(r,e){if(d){m.nodes_end=c,R();return}r!==null&&r.before(e)}function V(r,e,t){if(r==null)return e(void 0),E;const n=$(()=>r.subscribe(e,t));return n.unsubscribe?()=>n.unsubscribe():n}let l=!1;function nr(r,e,t){const n=t[e]??(t[e]={store:null,source:F(void 0),unsubscribe:E});if(n.store!==r)if(n.unsubscribe(),n.store=r??null,r==null)n.source.v=void 0,n.unsubscribe=E;else{var s=!0;n.unsubscribe=V(r,a=>{s?n.source.v=a:j(n.source,a)}),s=!1}return U(n.source)}function sr(r,e){return r.set(e),e}function ur(){const r={};return N(()=>{for(var e in r)r[e].unsubscribe()}),r}function ir(){l=!0}function or(r){var e=l;try{return l=!1,[r(),l]}finally{l=e}}const K="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(K);export{ar as a,nr as b,z as c,Y as d,o as e,or as f,tr as g,J as h,er as i,sr as j,X as k,H as l,ir as m,rr as n,G as r,ur as s,Z as t};
