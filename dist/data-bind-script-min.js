// Two-way data binding library.
// https://github.com/ahabra/data-bind
// Copyright 2020 (C) Abdul Habra

!function(){const e=e=>"checkbox"===e.type,t=e=>"radio"===e.type,o=e=>"select"===e.tagName.toLowerCase(),n=e=>"value"in e,r=e=>new Set(Array.isArray(e)?e:[e]);function i({prop:r,root:i,sel:a,attr:l,objNotBound:c}){return a?function(r,i,a){const l=u(r,i);if(0===l.length)return null;let c=l[0];if(a)return c.getAttribute(a);if(!n(c))return c.innerHTML;if(e(c))return l.filter(t=>e(t)&&t.checked).map(e=>"on"===e.value?e.name:e.value);if(o(c)){return[...c.querySelectorAll("option")].filter(e=>e.selected).map(e=>e.value)}t(c)&&(c=l.filter(t).find(e=>e.checked));return c.value}(i,a,l):c[r]}function u(e,t){const o=e.querySelectorAll(t);return 0===o.length&&console.warn(`No elements found matching selector ${t}`),[...o]}window.bind=function({obj:a,prop:l,sel:c,attr:f,root:s,onChange:d}){!function(e){if("string"!=typeof e||0===e.length)throw"'prop' argument must be a String defining the name a property."}(l);const p=(a=a||{}).hasOwnProperty(l)?a[l]:void 0;s=s||document;const h={},v={get:()=>i({prop:l,sel:c,attr:f,root:s,objNotBound:h}),set:a=>function({prop:a,value:l,root:c,sel:f,attr:s,objNotBound:d,onChange:p}){if(function({prop:e,value:t,root:o,sel:n,attr:r,objNotBound:u,onChange:a}){if(!a)return;const l=i({prop:e,root:o,sel:n,attr:r,objNotBound:u});if(l===t)return;a(l,t)}({prop:a,value:l,root:c,sel:f,attr:s,objNotBound:d,onChange:p}),f)return void function(i,a,l,c){const f=u(i,a);if(0===f.length)return;const s=f[0];if(e(s)){const t=r(l);return void f.filter(e).forEach(e=>e.checked=t.has(e.value)||t.has(e.name))}if(o(s)){const e=r(l);return void s.querySelectorAll("option").forEach(t=>t.selected=e.has(t.value))}if(t(s))return void f.filter(t).forEach(e=>e.checked=e.value===l);f.forEach(e=>function(e,t,o){o?e.setAttribute(o,t):n(e)?e.value=t:e.innerHTML=t}(e,l,c))}(c,f,l,s);d[a]=l}({prop:l,value:a,root:s,sel:c,attr:f,objNotBound:h,onChange:d}),configurable:!0,enumerable:!0};return Object.defineProperty(a,l,v),void 0!==p&&(console.info(`Property '${l}' already exists in object. Will override previous definition but retain old value of ${p}.`),a[l]=p),a}}();