import{c as g,i as h,j as p}from"./chunk-Y2IKLLDI.js";var m=class{constructor(){this.m=new Map}reset(e){this.m=new Map(Object.entries(e))}get(e,o){let s=this.m.get(e);return s!==void 0?s:o}getBoolean(e,o=!1){let s=this.m.get(e);return s===void 0?o:typeof s=="string"?s==="true":!!s}getNumber(e,o){let s=parseFloat(this.m.get(e));return isNaN(s)?o!==void 0?o:NaN:s}set(e,o){this.m.set(e,o)}},r=new m,A=t=>{try{let e=t.sessionStorage.getItem(I);return e!==null?JSON.parse(e):{}}catch{return{}}},S=(t,e)=>{try{t.sessionStorage.setItem(I,JSON.stringify(e))}catch{return}},j=t=>{let e={};return t.location.search.slice(1).split("&").map(o=>o.split("=")).map(([o,s])=>{try{return[decodeURIComponent(o),decodeURIComponent(s)]}catch{return["",""]}}).filter(([o])=>W(o,b)).map(([o,s])=>[o.slice(b.length),s]).forEach(([o,s])=>{e[o]=s}),e},W=(t,e)=>t.substr(0,e.length)===e,b="ionic:",I="ionic-persist-config",F=t=>M(t),H=(t,e)=>(typeof t=="string"&&(e=t,t=void 0),F(t).includes(e)),M=(t=window)=>{if(typeof t>"u")return[];t.Ionic=t.Ionic||{};let e=t.Ionic.platforms;return e==null&&(e=t.Ionic.platforms=R(t),e.forEach(o=>t.document.documentElement.classList.add(`plt-${o}`))),e},R=t=>{let e=r.get("platform");return Object.keys(v).filter(o=>{let s=e==null?void 0:e[o];return typeof s=="function"?s(t):v[o](t)})},x=t=>l(t)&&!N(t),u=t=>!!(a(t,/iPad/i)||a(t,/Macintosh/i)&&l(t)),L=t=>a(t,/iPhone/i),U=t=>a(t,/iPhone|iPod/i)||u(t),y=t=>a(t,/android|sink/i),k=t=>y(t)&&!a(t,/mobile/i),B=t=>{let e=t.innerWidth,o=t.innerHeight,s=Math.min(e,o),n=Math.max(e,o);return s>390&&s<520&&n>620&&n<800},C=t=>{let e=t.innerWidth,o=t.innerHeight,s=Math.min(e,o),n=Math.max(e,o);return u(t)||k(t)||s>460&&s<820&&n>780&&n<1400},l=t=>D(t,"(any-pointer:coarse)"),T=t=>!l(t),N=t=>O(t)||_(t),O=t=>!!(t.cordova||t.phonegap||t.PhoneGap),_=t=>{let e=t.Capacitor;return!!(e!=null&&e.isNative)},J=t=>a(t,/electron/i),z=t=>{var e;return!!(!((e=t.matchMedia)===null||e===void 0)&&e.call(t,"(display-mode: standalone)").matches||t.navigator.standalone)},a=(t,e)=>e.test(t.navigator.userAgent),D=(t,e)=>{var o;return(o=t.matchMedia)===null||o===void 0?void 0:o.call(t,e).matches},v={ipad:u,iphone:L,ios:U,android:y,phablet:B,tablet:C,cordova:O,capacitor:_,electron:J,pwa:z,mobile:l,mobileweb:x,desktop:T,hybrid:N},d,K=t=>t&&p(t)||d,V=(t={})=>{if(typeof window>"u")return;let e=window.document,o=window,s=o.Ionic=o.Ionic||{},n={};t._ael&&(n.ael=t._ael),t._rel&&(n.rel=t._rel),t._ce&&(n.ce=t._ce),g(n);let f=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},A(o)),{persistConfig:!1}),s.config),j(o)),t);r.reset(f),r.getBoolean("persistConfig")&&S(o,f),M(o),s.config=r,s.mode=d=r.get("mode",e.documentElement.getAttribute("mode")||(H(o,"ios")?"ios":"md")),r.set("mode",d),e.documentElement.setAttribute("mode",d),e.documentElement.classList.add(d),r.getBoolean("_testing")&&r.set("animated",!1);let P=i=>{var c;return(c=i.tagName)===null||c===void 0?void 0:c.startsWith("ION-")},E=i=>["ios","md"].includes(i);h(i=>{for(;i;){let c=i.mode||i.getAttribute("mode");if(c){if(E(c))return c;P(i)&&console.warn('Invalid ionic mode: "'+c+'", expected: "ios" or "md"')}i=i.parentElement}return d})};export{r as a,H as b,K as c,V as d};
