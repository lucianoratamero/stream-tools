import{z as B,S as c,A as U,B as k,d as F,D as S,i as K,w as o,F as w,x as A,n as _,U as y,q as z,l as b,G as Y,h as j,I as C,J as G,K as L,b as D,L as O,E as V,v as Z,y as H,M as J,N as Q,O as W,Q as X,R as $,T as p,V as ee,g,W as te,k as ne}from"./runtime.Du15gqnF.js";import{a as se,s as x,b as re}from"./disclose-version.BpiZ0TUz.js";function m(e,t=!0,s=null){if(typeof e=="object"&&e!=null&&!B(e)){if(c in e){const n=e[c];if(n.t===e||n.p===e)return n.p}const r=Y(e);if(r===U||r===k){const n=new Proxy(e,ie);return F(e,c,{value:{s:new Map,v:S(0),a:K(e),i:t,p:n,t:e},writable:!0,enumerable:!1}),n}}return e}function q(e,t=1){o(e,e.v+t)}const ie={defineProperty(e,t,s){if(s.value){const r=e[c],n=r.s.get(t);n!==void 0&&o(n,m(s.value,r.i,r))}return Reflect.defineProperty(e,t,s)},deleteProperty(e,t){const s=e[c],r=s.s.get(t),n=s.a,i=delete e[t];if(n&&i){const a=s.s.get("length"),l=e.length-1;a!==void 0&&a.v!==l&&o(a,l)}return r!==void 0&&o(r,y),i&&q(s.v),i},get(e,t,s){var i;if(t===c)return Reflect.get(e,c);const r=e[c];let n=r.s.get(t);if(n===void 0&&(!(t in e)||(i=w(e,t))!=null&&i.writable)&&(n=(r.i?S:A)(m(e[t],r.i,r)),r.s.set(t,n)),n!==void 0){const a=_(n);return a===y?void 0:a}return Reflect.get(e,t,s)},getOwnPropertyDescriptor(e,t){const s=Reflect.getOwnPropertyDescriptor(e,t);if(s&&"value"in s){const n=e[c].s.get(t);n&&(s.value=_(n))}return s},has(e,t){var i;if(t===c)return!0;const s=e[c],r=Reflect.has(e,t);let n=s.s.get(t);return(n!==void 0||z!==null&&(!r||(i=w(e,t))!=null&&i.writable))&&(n===void 0&&(n=(s.i?S:A)(r?m(e[t],s.i,s):y),s.s.set(t,n)),_(n)===y)?!1:r},set(e,t,s,r){const n=e[c];let i=n.s.get(t);i===void 0&&(b(()=>r[t]),i=n.s.get(t)),i!==void 0&&o(i,m(s,n.i,n));const a=n.a,l=!(t in e);if(a&&t==="length")for(let f=s;f<e.length;f+=1){const d=n.s.get(f+"");d!==void 0&&o(d,y)}if(e[t]=s,l){if(a){const f=n.s.get("length"),d=e.length;f!==void 0&&f.v!==d&&o(f,d)}q(n.v)}return!0},ownKeys(e){const t=e[c];return _(t.v),Reflect.ownKeys(e)}};function le(e,t,s,r=null,n=!1){var i=null,a=null,l=null,f=n?V:0;j(()=>{if(l===(l=!!t()))return;let d=!1;if(se){const v=e.data===C;l===v&&(G(re),x(!1),d=!0)}l?(i?L(i):i=D(()=>s(e)),a&&O(a,()=>{a=null})):(a?L(a):r&&(a=D(()=>r(e))),i&&O(i,()=>{i=null})),d&&x(!0)},f)}function M(e,t){var r;var s=e&&((r=e[c])==null?void 0:r.t);return e===t||s===t}function ce(e,t,s,r){Z(()=>{var n,i;return H(()=>{n=i,i=[],b(()=>{e!==s(...i)&&(t(e,...i),n&&M(s(...n),e)&&t(null,...n))})}),()=>{J(()=>{i&&M(s(...i),e)&&t(null,...i)})}})}function de(e,t,s,r){var N;var n=(s&X)!==0,i=(s&$)!==0,a=(s&ee)!==0,l=e[t],f=(N=w(e,t))==null?void 0:N.set,d=r,v=!0,T=()=>(a&&v&&(v=!1,d=b(r)),d);if(l===void 0&&r!==void 0){if(f&&i)throw new Error("ERR_SVELTE_BINDING_FALLBACK");l=T(),f&&f(l)}var R=i?()=>{var u=e[t];return u===void 0?T():(v=!0,u)}:()=>{var u=e[t];return u!==void 0&&(d=void 0),u===void 0?d:u};if(!(s&Q))return R;if(f)return function(u){return arguments.length===1?(f(u),u):R()};var E=!1,I=A(l),h=p(()=>{var u=R(),P=_(I);return E?(E=!1,P):I.v=u});return n||(h.equals=W),function(u){var P=_(h);return arguments.length>0?(h.equals(u)||(E=!0,o(I,u),_(h)),u):P}}function oe(e){g===null&&te(),g.l!==null?ae(g).m.push(e):ne(()=>{const t=b(e);if(typeof t=="function")return t})}function ae(e){var t=e.l;return t.u??(t.u={a:[],b:[],m:[]})}export{de as a,ce as b,le as i,oe as o,m as p};
