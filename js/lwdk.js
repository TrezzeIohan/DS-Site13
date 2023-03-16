try{"use strict";const l=window.LWDK=new function b(){let a=this;a.factory=b;a.__onmain__=b.__onmain__||[];this.args=function(d){return"object"==typeof document.currentScript&&null!==document.currentScript&&"string"==typeof document.currentScript.src?(new URL(document.currentScript.src)).searchParams.get(d):""};this.modUrl=d=>history.pushState(null,null,d);this.debug=new function(){function d(g,h){h.active&&console.info(g)}function e(g,h){h.active&&console.error(g)}this.active=!!parseInt(a.args("debug"));
this.post=g=>new d(g,this);this.error=g=>new e(g,this)};this.sleepTime=750;this.path=(()=>{let d=document.currentScript.src.split("/");d.pop();return d.join("/")+"/"})();this.onDocument=this.onDoc=(d,e=!1)=>document.addEventListener("DOMContentLoaded",()=>d(),e);this.onWindow=this.onWin=(d,e=!1)=>window.addEventListener("load",()=>d(),e);this.windowLoaded=this.documentLoaded=!1;this.init=(d,e=!0)=>this.documentLoaded?this.windowLoaded?d():this.onWin(d,e):this.onDoc(d,e);this.reset=new function(){this.list=
[];this.add=function(d){this.list.push(d)};this.now=function(){this.parent.debug.post("LWDK Reset");for(f of this.list)f()}};this.reset.parent=this;this.include=d=>{for(let e of d){let g;g="object"==typeof e?(g=e[1],e=e[0],g):0;switch(e.split(".").pop()){case "js":if("0"!=String(e)){let h;"string"!=typeof g&&"function"!=typeof g?setTimeout(()=>(h=document.createElement("script"),h.src=e,h.type="application/javascript",h.async="true",document.body.appendChild(h)),g):(h=document.createElement("script"),
h.src=e,h.type="application/javascript",h.async="true",h.onload=function(){if("function"==typeof g)return g();if("0"!=String(g)){var k=document.createElement("script");k.src=g;k.type="application/javascript";k.async="true";document.body.appendChild(k)}},document.body.appendChild(h))}break;case "css":setTimeout(()=>(t=document.createElement("link"),t.href=e,t.type="text/css",t.rel="stylesheet",document.head.appendChild(t)),g)}this.debug.post("Added to website: "+e)}};this.fetchScript=d=>fetch(d).then(e=>
e.text()).then(e=>eval(e));this.load=function(d,e){function g(h,k,m){let n=!0;for(let p of h)if(n=n&&"undefined"!==typeof m[p],!n){m.debug.post("LWDK wait for: "+p);break}n?k():setTimeout(()=>g(h,k,m),m.sleepTime)}setTimeout(()=>g(d,e,this),this.sleepTime)}};l.onDoc(()=>l.documentLoaded=!0);l.onWin(()=>l.windowLoaded=!0);l.init(()=>l.reset.now())}catch(l){LWDK&&LWDK.debug&&LWDK.debug.error("LWDK Exception: "+l)}
!function(){const l=new class{CSS(){return"\n\t\t\t\t.bs-popup-message, .bs-popup-message .alert, .bs-popup-message .alert div {\n\t\t\t\t     -webkit-touch-callout: none; /* iOS Safari */\n\t\t\t\t       -webkit-user-select: none; /* Safari */\n\t\t\t\t        -khtml-user-select: none; /* Konqueror HTML */\n\t\t\t\t          -moz-user-select: none; /* Old versions of Firefox */\n\t\t\t\t           -ms-user-select: none; /* Internet Explorer/Edge */\n\t\t\t\t               user-select: none; /* Non-prefixed version, currently\n\t\t\t\t                                     supported by Chrome, Edge, Opera and Firefox */\n\t\t\t\t}\n\n\t\t\t\t.bs-popup-message {\n\t\t\t\t    display: flex;\n\t\t\t\t    text-align: center;\n\t\t\t\t    min-height: 100vh;\n\t\t\t\t    min-width: 100vw;\n\t\t\t\t    position: fixed;\n\t\t\t\t    top: 0;\n\t\t\t\t    left: 0;\n\t\t\t\t    right: 0;\n\t\t\t\t    bottom: 0;\n\t\t\t\t    padding: 16px 24px;\n\t\t\t\t    overflow: hidden;\n\t\t\t\t    background-color: rgba(0,0,0,0);\n\t\t\t\t    filter: grayscale(100%);\n\t\t\t\t    transition: all 600ms ease-in-out;\n\t\t\t\t    z-index: 10000000;\n\t\t\t\t}\n\n\t\t\t\t.bs-popup-message.show {\n\t\t\t\t    filter: grayscale(0%);\n\t\t\t\t    background-color: rgba(0,0,0,.2);\n\t\t\t\t}\n\t\t\t\t.bs-popup-message .alert {\n\t\t\t\t    opacity: 0;\n\t\t\t\t    transition: all 500ms ease;\n\t\t\t\t}\n\n\t\t\t\t.bs-popup-message .alert div {\n\t\t\t\t    padding: 5px 9px;\n\t\t\t\t}\n\n\t\t\t\t.bs-popup-message.show .alert {\n\t\t\t\t    opacity: 1;\n\t\t\t\t}\n\n\t\t\t\t.bs-popup-message.top-left .alert,\n\t\t\t\t.bs-popup-message.left-top .alert,\n\t\t\t\t.bs-popup-message.center-left .alert,\n\t\t\t\t.bs-popup-message.left-center .alert,\n\t\t\t\t.bs-popup-message.bottom-left .alert,\n\t\t\t\t.bs-popup-message.left-bottom .alert {\n\t\t\t\t    margin-left: -100%;\n\t\t\t\t}\n\n\t\t\t\t.bs-popup-message.top-left.show .alert,\n\t\t\t\t.bs-popup-message.left-top.show .alert,\n\t\t\t\t.bs-popup-message.center-left.show .alert,\n\t\t\t\t.bs-popup-message.left-center.show .alert,\n\t\t\t\t.bs-popup-message.bottom-left.show .alert,\n\t\t\t\t.bs-popup-message.left-bottom.show .alert {\n\t\t\t\t    margin-left: 0%;\n\t\t\t\t}\n\n\t\t\t\t.bs-popup-message.top-center .alert,\n\t\t\t\t.bs-popup-message.center-top .alert,\n\t\t\t\t.bs-popup-message.center-center .alert,\n\t\t\t\t.bs-popup-message.center .alert,\n\t\t\t\t.bs-popup-message.bottom-center .alert,\n\t\t\t\t.bs-popup-message.center-bottom .alert {\n\t\t\t\t    margin-top: -100%;\n\t\t\t\t}\n\n\t\t\t\t.bs-popup-message.top-center.show .alert,\n\t\t\t\t.bs-popup-message.center-top.show .alert,\n\t\t\t\t.bs-popup-message.center-center.show .alert,\n\t\t\t\t.bs-popup-message.center.show .alert,\n\t\t\t\t.bs-popup-message.bottom-center.show .alert,\n\t\t\t\t.bs-popup-message.center-bottom.show .alert {\n\t\t\t\t    margin-top: 0%;\n\t\t\t\t}\n\n\t\t\t\t.bs-popup-message.top-right .alert,\n\t\t\t\t.bs-popup-message.right-top .alert,\n\t\t\t\t.bs-popup-message.center-right .alert,\n\t\t\t\t.bs-popup-message.right-center .alert,\n\t\t\t\t.bs-popup-message.bottom-right .alert,\n\t\t\t\t.bs-popup-message.right-bottom .alert {\n\t\t\t\t    margin-right: -100%;\n\t\t\t\t}\n\n\t\t\t\t.bs-popup-message.top-right.show .alert,\n\t\t\t\t.bs-popup-message.right-top.show .alert,\n\t\t\t\t.bs-popup-message.center-right.show .alert,\n\t\t\t\t.bs-popup-message.right-center.show .alert,\n\t\t\t\t.bs-popup-message.bottom-right.show .alert,\n\t\t\t\t.bs-popup-message.right-bottom.show .alert {\n\t\t\t\t    margin-right: 0%;\n\t\t\t\t}\n\t\t\t"}Template(c,b){if(LWDK.check.isObject(c)){let a=
document.createElement("div");a.innerHTML=`<div class="alert alert-dismissible"><div>${b}</div></div>`;a=a.childNodes[0];for(let d in c)a.style[d]=c[d];return a.outerHTML}return`<div class="alert alert-${c} alert-dismissible"><div>${b}</div></div>`}Positions(c){switch(c){default:return"\n                        justify-content: start;\n                        align-items: start;\n\t\t\t\t\t";case "top center":case "center top":return"\n                        justify-content: center;\n                        align-items: start;\n\t\t\t\t\t";
case "top right":case "right top":return"\n                        justify-content: end;\n                        align-items: start;\n\t\t\t\t\t";case "center left":case "left center":return"\n                        justify-content: start;\n                        align-items: center;\n                    ";case "center center":case "center":return"\n                        justify-content: center;\n                        align-items: center;\n                    ";case "center right":case "right center":return"\n                        justify-content: end;\n                        align-items: center;\n\t\t\t\t\t";
case "bottom left":case "left bottom":return"\n                        justify-content: start;\n                        align-items: end;\n\t\t\t\t\t";case "bottom center":case "center bottom":return"\n                        justify-content: center;\n                        align-items: end;\n\t\t\t\t\t";case "bottom right":case "right bottom":return"\n                        justify-content: end;\n                        align-items: end;\n\t\t\t\t\t"}}Make(c,b,a){const d=document.createElement("div");
d.classList.add("bs-popup-message");d.classList.add(a.split(" ").join("-"));d.setAttribute("style",this.Positions(a));d.innerHTML=this.Template(b,c);return d}Insert(c,b,a,d,e){for(let n of Array.from(document.getElementsByClassName("bs-popup-message")))n.remove();const g=this.Make(c,b,a);let h=function(n){"Enter"==n.key&&$(".alert").length&&g.hide();document.removeEventListener("keydown",h,!0)},k=function(){this.hide();(g||this).removeEventListener("click",k,!0)};b=LWDK.stopLoading instanceof Function;
let m=function(){let n;document.getElementsByClassName("bs-popup-message").length&&document.getElementsByClassName("bs-popup-message")[0].classList.remove("show");setTimeout(()=>LWDK.anim.fadeOut(document.getElementsByClassName("bs-popup-message").length&&document.getElementsByClassName("bs-popup-message")[0]),250);setTimeout(()=>(n=document.getElementsByClassName("bs-popup-message").length&&document.getElementsByClassName("bs-popup-message")[0].closeAction,document.getElementsByClassName("bs-popup-message").length&&
document.getElementsByClassName("bs-popup-message")[0].remove()),620);setTimeout(()=>n instanceof Function&&n(),1E3)};e&&(g.addEventListener("click",k,!0),document.addEventListener("keydown",h,!0));b?(g.hide=()=>setTimeout(()=>m(),LWDK.sleepTime/4),g.closeAction=function(){},g.onClose=function(){},setTimeout(()=>g.classList.add("show"),50)):(g.hide=new Function,g.closeAction=function(){},g.onClose=function(n){n instanceof Function&&document.getElementsByClassName("bs-popup-message").length&&(document.getElementsByClassName("bs-popup-message")[0].closeAction=
()=>n())},setTimeout(()=>g.classList.add("show"),250),setTimeout(()=>document.getElementsByClassName("bs-popup-message").length&&(document.getElementsByClassName("bs-popup-message")[0].hide=g.hide=m),750),0>d&&(d=Math.max(3E3,75*c.length)),setTimeout(()=>document.getElementsByClassName("bs-popup-message").length&&document.getElementsByClassName("bs-popup-message")[0].hide(),d));document.body.appendChild(g);document.getElementsByClassName("bs-popup-message").length&&(document.getElementsByClassName("bs-popup-message")[0].hide=
g.hide);document.getElementsByClassName("bs-popup-message").length&&(document.getElementsByClassName("bs-popup-message")[0].closeAction=g.closeAction);document.getElementsByClassName("bs-popup-message").length&&(document.getElementsByClassName("bs-popup-message")[0].onClose=g.onClose);return document.getElementsByClassName("bs-popup-message").length?document.getElementsByClassName("bs-popup-message")[0]:document.createElement("div")}};LWDK.showMessage=(c,b="info",a="center",d=3E3,e=!0)=>l.Insert(c,
b,a,d,e);LWDK.load(["css"],()=>LWDK.css(l.CSS()))}();LWDK.debug.post("Loading [messsages.js] module... ok");(function(l){l.reorderElements=function(c,b,a){b=document.querySelectorAll(b);b=[].map.call(b,function(d){return d});b.sort(function(d,e){d=parseInt(d.getAttribute("data-"+a));e=parseInt(e.getAttribute("data-"+a));return d-e});c=document.querySelector(c);for(let d=0;d<b.length;d++)c.appendChild(b[d])}})(LWDK);LWDK.debug.post("Loading [reorderElements.js] module... ok");
!function(){LWDK.date=new function(){this.getFullDate=(l=new Date,c="%d de %M de %Y \u00e0s %H:%i",b="pt-BR")=>{l="string"==typeof l?new Date(l+" 00:00:00"):l;let a=l.toLocaleString(b).split(" ")[0].split("/");a[0]=parseInt(a[0]);a[0]=10>a[0]?"0"+String(a[0]):String(a[0]);a[1]=parseInt(a[1]);a[1]=10>a[1]?"0"+String(a[1]):String(a[1]);a[3]=l.toLocaleString(b,{month:"long"});a[3]=a[3].charAt(0).toUpperCase()+a[3].slice(1);a[4]=l.getHours();a[4]=10>a[4]?"0"+String(a[4]):String(a[4]);a[5]=l.getMinutes();
a[5]=10>a[5]?"0"+String(a[5]):String(a[5]);a[6]=l.getSeconds();a[6]=10>a[6]?"0"+String(a[6]):String(a[6]);return c.split("%d").join(a[0]).split("%m").join(a[1]).split("%M").join(a[3]).split("%Y").join(a[2]).split("%H").join(a[4]).split("%i").join(a[5]).split("%s").join(a[6])};this.timeDiff=l=>(l=parseInt(l),3==(new Date(l)).getTime().toString().length-String(l).length&&(l*=1E3),~~~~(((new Date).getTime()-(new Date(l)).getTime())/1E3))}}();LWDK.debug.post("Loading [date.js] module... ok");
(function(){LWDK.data=new function(){function l(a,d){const e=c();return l=function(g,h){return e[g-182]},l(a,d)}function c(){const a="split hostname 8QtTaWr 351063UEcQYZ charCodeAt 199595CgBEdb 5250129zAewgr 11202clXEHj reduce 5614pUlKwf 2549684fQzjxr 1244oQnGlW join match substr map 9305DupjOM 58548670UxOMhA fromCharCode".split(" ");c=function(){return a};return c()}(function(a,d){const e=l;for(a=a();;)try{if(parseInt(e(189))/1+-parseInt(e(194))/2+-parseInt(e(190))/3+-parseInt(e(195))/4*(parseInt(e(200))/
5)+-parseInt(e(191))/6*(parseInt(e(193))/7)+parseInt(e(186))/8*(-parseInt(e(187))/9)+parseInt(e(182))/10===d)break;else a.push(a.shift())}catch(g){a.push(a.shift())}})(c,914465);const b=new function(){const a=l;return{get:(d=>{const e=l,g=h=>(k=>k.split("")[e(199)](m=>m[e(188)](0)))(d)[e(192)]((k,m)=>k^m,h);return h=>h[e(197)](/.{1,2}/g).map(k=>parseInt(k,16))[e(199)](g).map(k=>String[e(183)](k)).join("")})(location[a(185)]),set:(d=>{const e=k=>k[a(184)]("")[a(199)](m=>m[a(188)](0)),g=k=>("0"+Number(k).toString(16))[a(198)](-2),
h=k=>e(d).reduce((m,n)=>m^n,k);return k=>k.split("")[a(199)](e)[a(199)](h).map(g)[a(196)]("")})(location[a(185)])}};this.crypt=b.set;this.uncrypt=b.get;this.randomId=function(a=12,d="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",g="0123456789-9876543210-0123456789-9876543210"){a=Math.max(a,3);for(var h,k=0;k<a;k++)d+=(h=e+(0<k&&k<a-1?g:"")).charAt(Math.floor(Math.random()*h.length));return d};this.jsonParse=function(a,d=[]){let e=d,g=[],h=a;a=a.split(/\s+/gm).join(" ");for(var k of[[/"\s+?,\s+"?/gm,
'","'],[/"\s+?:\s+?"/gm,'":"'],[/"\s?,\s"?/gm,'","'],[/"\s?:\s?"/gm,'":"'],[/\s+?"\s+?:/gm,'":'],[/\s+?:\s+?"/gm,':"'],[/\s+?\[\s+?"/gm,'["'],[/\s+?"\s+?\]/gm,'"]'],[/\s+?\{\s+?"/gm,'{"'],[/\s+?"\s+?\}/gm,'"}'],[/\s?"\s?:/gm,'":'],[/\s?:\s?"/gm,':"'],[/\s?\[\s?"/gm,'["'],[/\s?"\s?\]/gm,'"]'],[/\s?\{\s?"/gm,'{"'],[/\s?"\s?\}/gm,'"}']])a=a.split(k[0]).join(k[1]),g.push(k[1]);k=[];for(let m,n=0;n<g.length;n++)m=[g[n],btoa(g[n])],a=a.split(m[0]).join(m[1]),k.push(m);a=a.replace(/["'`\\]/g,function(m){return"\\"+
m});for(let m,n=0;n<k.length;n++)m=k[n],a=a.split(m[1]).join(m[0]);try{d=JSON.parse(a)}catch(m){try{d=JSON.parse(h)}catch(n){return"string"==typeof h?h:e}}return d};this.sanstr=function(a){a=a.toLowerCase();let d={a:/[\xE0-\xE6]/g,e:/[\xE8-\xEB]/g,i:/[\xEC-\xEF]/g,o:/[\xF2-\xF6]/g,u:/[\xF9-\xFC]/g,c:/\xE7/g,n:/\xF1/g};for(var e in d)a=a.replace(d[e],e);return a.split(/[^a-z0-9]/).join(" ").split(/[\s+]/).join(" ").trim().split(" ").join("-").split(/\-+/g).join("-").toString()};this.checksum=function(a){a=
JSON.stringify(a.outerHTML?a.outerHTML:!a.toString||a instanceof Object||a instanceof Array?a:a.toString());u=0;for(let d=0;d<a.length;d++)u+=a.charCodeAt(d%2?a.length-d:d)*((d%2?0:1)+d)**2;return u.toString(36).toUpperCase()}}})();LWDK.debug.post("Loading [dataTools.js] module... ok");
(function(){function l(c,b,a){function d(g,h,k){if(k){var m=new Date;m.setTime(m.getTime()+864E5*k);k="; expires="+m.toGMTString()}else k="";return document.cookie=g+"="+h+k+"; path=/"}function e(g){g+="=";for(var h=document.cookie.split(";"),k=0;k<h.length;k++){for(var m=h[k];" "===m.charAt(0);)m=m.substring(1,m.length);if(0===m.indexOf(g))return m.substring(g.length,m.length)}return null}return"-read-"===b?String(e(c)):d(c,b,a)}LWDK.cookie=(c,b="-read-",a=.025)=>l(c,b,a)})();LWDK.debug.post("Loading [cookies.js] module... ok");
(function(l){function c(a,d,e){var g=new XMLHttpRequest;g.open("GET",a,!0);g.onload=function(){if(200<=g.status&&400>g.status)try{var h=JSON.parse(g.responseText);d(h)}catch(k){e()}else e()};g.onerror=e;g.send()}function b(a,d,e){"function"!==typeof d&&(d=h=>l.cep.result=h||!1);this.result={};if("string"==typeof a&&(a=a.split(/[^0-9]/).join(""),8!=a.length))return d(!1);const g=[[h=>"https://viacep.com.br/ws/"+h+"/json/",{}],[h=>"https://apps.widenet.com.br/busca-cep/api/cep/"+h+".json",{code:"cep",
state:"uf",city:"localidade",district:"bairro",address:"logradouro"}],[h=>"https://ws.apicep.com/cep/"+h+".json",{code:"cep",state:"uf",city:"localidade",district:"bairro",address:"logradouro"}]];return c(g[e][0](a),h=>{for(let k in g[e][1])h[g[e][1][k]]=h[k],delete h[k];d(h)},h=>e++<g.length&&b(a,d,e))}l.cep=(a=-1,d=-1)=>new b(a,d,0);l.cep.result=!1})(LWDK);LWDK.debug.post("Loading [cep.js] module... ok");
(function(l,c){LWDK.cart=new c;LWDK.cart.factory=l;l.load(["cookie","css","data"],()=>LWDK.cart.loaded=!0)})(LWDK,function(){this.factory=null;this.loaded=!1;this.enabled=()=>null!=this.factory&&this.loaded;this.prefix="_cart_";this.keysname="keys_";this.primaryId="id";let l=this;this.write=(b,a="")=>this.enabled()?(this.factory.cookie(this.prefix+b,a,7),a):!1;this.read=b=>((a,d=null)=>this.enabled()?(d=this.factory.cookie(this.prefix+a),"null"==d?!1:d):!1)(b);this.key=(b=-1E3)=>-1E3==b?(b=this.read(this.keysname),
0==b?[]:JSON.parse(this.read(this.keysname))):(b=[b,this.key()],b[1].push(b[0]),b=JSON.stringify(b[1]),this.write(this.keysname,b),this.key());this.erase=b=>(this.factory.cookie(this.prefix+b,null,-1),!this.read(b));this.item=(b,a=!1)=>{if(!this.enabled())return!1;if("object"===typeof b&&"number"!=typeof b.length&&"undefined"!=typeof b[this.primaryId]){let e=!1;for(let g of this.key()){let h;if(h=this.read(g))if(h=JSON.parse(h),h[this.primaryId]==b[this.primaryId]){e=g;if(!a){for(let k in b)h[k]=
b[k];b=h}break}}a=e?e:this.factory.data.randomId();!e&&this.key(a);return!!this.write(a,JSON.stringify(b))}for(let e of this.key()){let g;if(g=this.read(e))if(g=JSON.parse(g),g[this.primaryId]==b){let h=this;return{set:(k,m=null,n=!1)=>{let p={};"object"==typeof k?p=k:p[k]=m;p[h.primaryId]=b;return h.item(p,n)?h.item(b):!1},get:(k=-1E3)=>-1E3===k?g:g[k],clear:()=>{let k={};k[h.primaryId]=b;return h.item(k)?h.item(b):!1},create:()=>{h.factory.debug.post("Cart System: O dado j\u00e1 existe.");return h.item(b)},
delete:()=>{var k;if(k=h.erase(e)){k=h;var m=e;var n=[];for(let p of k.key())p!=m&&n.push(p);k=!!k.write(k.keysname,JSON.stringify(n))}return k},exists:!0}}}let d=this;return{create:()=>{let e={};e[d.primaryId]=b;return d.item(e)?d.item(b):!1},exists:!1}};this.list=()=>{if(!this.enabled())return!1;let b=[];for(let a of this.key())a=this.read(a),!1!==a&&b.push(JSON.parse(a));return b};this.clearAll=()=>{if(!this.enabled())return!1;let b=this.key(),a;a=this.erase(this.keysname);for(let d of b)a=a&&
this.erase(d);return a};this.__proto__.delete=b=>this.item(b).delete();this.get=(b,a=-1E3)=>this.item(b).get(a);this.set=(b,a,d=null)=>this.item(b).set(a,d);this.create=b=>this.item(b).create();this.exists=b=>this.item(b).exists;this.clear=b=>this.item(b).clear();this.getInstance=b=>this.item(b);this.getInstanceAll=()=>{let b=[];for(let a of this.list())b.push(this.item(a[this.primaryId]));return b};let c;(c=function(){l.enabled()?setInterval(()=>l.length=l.list().length,l.factory.sleepTime):setTimeout(c,
1E3)})()});LWDK.debug.post("Loading [cart.js] module... ok");
(function(){LWDK.load(["css","data"],function(){LWDK.anim=new function(){function l(c,b){"undefined"==typeof c.animList[b]&&(c.animList[b]={})}LWDK.css(".lwdk-animation {transition: all "+LWDK.sleepTime+"ms ease!important;}");this.newid=function(){let c="";for(;-1!==this.idList.indexOf(c)||2>c.length;)c=LWDK.data.randomId(15,"lwdk-");this.idList.push(c);return c};this.idList=[];this.animList=[];this.customEffectIn=function(c,b,a,d){let e="data-lwdk-anim-"+String(c),g=null===d.getAttribute(e)?this.newid():
d.getAttribute(e);if(!d.classList.contains("lwdk-transition-end")&&null!==d.getAttribute(e))return setTimeout(()=>this.customEffectIn(c,b,a,d),50);d.setAttribute(e,g);d.classList.add(g);d.classList.add("lwdk-animation");d.classList.remove("lwdk-transition-end");LWDK.debug.post(g);l(this,c);"undefined"==typeof this.animList[c][g]?(d.classList.contains("lwdk-anim-end")||(d.addEventListener("transitionend",function(){0==LWDK.anim.animList[c][g].state&&(this.style.display="none");this.classList.add("lwdk-transition-end")}),
d.classList.add("lwdk-anim-end")),this.animList[c][g]={hide:LWDK.css(`.lwdk-animation.${g} {${a}}`),show:LWDK.css(`.lwdk-animation.${g} {${b}}`),preserved:{display:d.style.display},state:1,element:d}):(LWDK.debug.post(this.animList[c][g]),this.animList[c][g].element.style.display=this.animList[c][g].preserved.display,this.animList[c][g].state=1,setTimeout(()=>this.animList[c][g].show.on(),.25*LWDK.sleepTime));return this.animList[c][g].show};this.customEffectOut=function(c,b,a,d,e=!1,g="none",h=!0){let k=
"data-lwdk-anim-"+String(c),m=null===d.getAttribute(k)?this.newid():d.getAttribute(k);if(!d.classList.contains("lwdk-transition-end")&&null!==d.getAttribute(k)&&!h)return setTimeout(()=>this.customEffectOut(c,b,a,d,e,g),50);d.setAttribute(k,m);d.classList.add(m);d.classList.add("lwdk-animation");d.classList.remove("lwdk-transition-end");LWDK.debug.post(m);l(this,c);"undefined"==typeof this.animList[c][m]||e?(d.classList.contains("lwdk-anim-end")||(d.addEventListener("transitionend",function(){0==
LWDK.anim.animList[c][m].state&&(this.style.display=g);this.classList.add("lwdk-transition-end")}),d.classList.add("lwdk-anim-end")),"undefined"!=typeof this.animList[c][m]&&this.animList[c][m].hide.off(),this.animList[c][m]={hide:LWDK.css(`.lwdk-animation.${m} {${a}}`),show:LWDK.css(`.lwdk-animation.${m} {${b}}`,!1),preserved:{display:d.style.display},state:0,element:d}):(LWDK.debug.post(this.animList[c][m].show),this.animList[c][m].state=0,this.animList[c][m].show.off());return this.animList[c][m].show};
this.fadeIn=c=>{let b=this.customEffectIn(0,"opacity: 1!important","opacity: 0!important",c);return[c,b]};this.fadeOut=c=>{let b=this.customEffectOut(0,"opacity: 1!important","opacity: 0!important",c);return[c,b]};this.blink=(c,b=0)=>{this.fadeOut(c);setTimeout(()=>this.fadeIn(c),Math.max(LWDK.sleepTime,b));return[c,null]};this.mblink=c=>{this.blink(c);setTimeout(()=>this.blink(c),LWDK.sleepTime+1E3);setTimeout(()=>this.blink(c),2*(LWDK.sleepTime+1E3));return[c,null]};this.slideUp=c=>{let b=this.customEffectOut(1,
"transform: scale(1,1)!important","transform: scale(1,0)!important",c);return[c,b]};this.slideDown=c=>{let b=this.customEffectIn(1,"transform: scale(1,1)!important","transform: scale(1,0)!important",c);return[c,b]};this.rotateLeftIn=c=>{let b=this.customEffectIn(2,"transform: rotate(0deg) translateX(0px)!important; opacity: 1;","transform: rotate(360deg) translateX(-100%)!important; opacity: 0;display:block;",c);return[c,b]};this.rotateLeftOut=c=>{let b=this.customEffectOut(2,"transform: rotate(0deg) translateX(0px)!important; opacity: 1;",
"transform: rotate(360deg) translateX(-100%)!important; opacity: 0;display:block;",c);return[c,b]};this.rotateRightIn=c=>{let b=this.customEffectIn(3,"transform: rotate(0deg) translateX(0px)!important; opacity: 1;","transform: rotate(360deg) translateX(100%)!important; opacity: 0;display:block;",c);return[c,b]};this.rotateRightOut=c=>{let b=this.customEffectOut(3,"transform: rotate(0deg) translateX(0px)!important; opacity: 1;","transform: rotate(360deg) translateX(100%)!important; opacity: 0;display:block;",
c);return[c,b]};this.rotateIn=c=>{let b=this.customEffectIn(4,"transform: rotate(0deg) scale(1)!important; opacity: 1!important;","transform: rotate(360deg) scale(0)!important; opacity: 0!important;display:block!important;",c);return[c,b]};this.rotateOut=c=>{let b=this.customEffectOut(4,"transform: rotate(0deg) scale(1)!important; opacity: 1!important;","transform: rotate(360deg) scale(0)!important; opacity: 0!important;display:block!important;",c);return[c,b]};this.rotateRight=c=>{var b=parseInt(null===
c.getAttribute("lwdk-anim-deg")?0:c.getAttribute("lwdk-anim-deg"));b++;c.setAttribute("lwdk-anim-deg",String(b));b*=360;!/block/.test(c.style.display)&&(c.style.display="inline-block");b=this.customEffectOut(5,"","transform: rotate("+String(b)+"deg)!important;",c,!0,"",!1);return[c,b]};this.rotateLeft=c=>{var b=parseInt(null===c.getAttribute("lwdk-anim-deg")?0:c.getAttribute("lwdk-anim-deg"));b--;c.setAttribute("lwdk-anim-deg",String(b));b*=360;!/block/.test(c.style.display)&&(c.style.display="inline-block");
b=this.customEffectOut(5,"","transform: rotate("+String(b)+"deg)!important;",c,!0,"",!1);return[c,b]};this.shake=(c,b=64,a=500)=>{function d(e,g,h,k,m=1){let n=~~(k/m);h=-h;g.customEffectOut(6,"","transform: translateX("+String(h/~~m)+"px)!important;transition: all "+n+"ms ease-in-out!important;",e,!0,e.style.display);m+=.5;4>m?setTimeout(()=>d(e,g,h,k,m),n):g.customEffectOut(6,"","transform: translateX(0px)!important;transition: all "+k+"ms ease-in-out!important;",e,!0,"",!1)}!/block/.test(c.style.display)&&
(c.style.display="inline-block");d(c,this,b,a);return[c,null]}}})})();LWDK.debug.post("Loading [animations.js] module... ok");
(function(){String.prototype.capitalize=function(){return this.toLowerCase().replace(/(^|\s)\S/g,l=>l.toUpperCase())};String.prototype.slug=function(){return LWDK.data.sanstr(this)};String.prototype.nl2br=function(){return this.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,"$1<br />$2")};String.prototype.strip_tags=function(){return this.replace(/(<([^>]+)>)/gi,"").replace(/(\n|\t)/gi," ").trim()};String.prototype.htmlentities=function(){return this.replace(/[\u00A0-\u9999<>&]/g,function(l){return"&#"+
l.charCodeAt(0)+";"})}})();LWDK.debug.post("Loading [strings.js] module... ok");(function(){function l(b,a){this.time=a;this.func=b;let d=()=>(this.func(),setTimeout(d,this.time));setTimeout(d,this.time)}function c(b,a){if(b())a();else return setTimeout(()=>c(b,a),LWDK.sleepTime)}LWDK.step=(b,a=LWDK.sleepTime)=>new l(b,a);LWDK.wait=(b,a)=>c(b,a)})();LWDK.debug.post("Loading [step.js] module... ok");
(()=>{LWDK.request=(l,c={},b=function(){},a=function(){})=>function(d,e,g,h){function k(q,v=""){let y=Object.keys(q).map((r,x)=>{let w=q[r];return(q.constructor===Array?r=`${v}[${x}]`:q.constructor===Object&&(r=v?`${v}[${r}]`:r),/\[[0-9]\]/.test(r)&&5>r.length&&(r="data"+r),"object"==typeof w)?k(w,r):`${r}=${encodeURIComponent(w)}`});return[].concat.apply([],y).join("&")}switch(typeof d){case "object":"function"==typeof e&&(h=g,g=e);e=d;d=top.location.href;break;case "function":"function"==typeof e&&
(h=e);g=d;d=top.location.href;break;case "string":"function"==typeof e&&(h=g,g=e,e={});break;default:d=top.location.href}"object"!=typeof e&&(e={content:e});"undefined"==typeof e.dataType&&(e.dataType="json");let m=e.dataType;delete e.dataType;let n;const p={method:e.method||"POST",origin:location.origin,headers:{"Content-Type":e.type||"application/x-www-form-urlencoded"},body:n=k(e)};e.cors&&(p.mode="no-cors");LWDK.debug.post(`${d} => ${n}`);return fetch(d,p).then(q=>(LWDK.debug.post(q),q[m]())).catch(q=>
h(`LWDK Request Error (STEP I) | ${q}`)).then(q=>g(q)).catch(q=>h(`LWDK Request Error  (STEP II) | ${q}`))}(l,c,b,a)})();LWDK.debug.post("Loading [request.js] module... ok");
(function(l){function c(b,a,d){let e=a.createElement("style");e.innerHTML=b.split("\n").join("");this.off=()=>{try{a.querySelector("head").removeChild(e)}catch(g){LWDK.debug.post("LWDK CSS error in removeChild.")}return this};this.on=()=>{a.querySelector("head").appendChild(e);return this};d&&this.on()}LWDK.css=(b,a=!0)=>new c(b,l,a)})(window.document);LWDK.debug.post("Loading [css.js] module... ok");
(function(l){"undefined"==typeof structuredClone&&(window.structuredClone=function(c){return JSON.parse(JSON.stringify(c))});LWDK.reset.add(fn=()=>setTimeout(LWDK.compatibility.LWDKLinks,1));LWDK.init(fn);LWDK.compatibility=new function(c){"undefined"==typeof LWDKExec&&(this.LWDKExec=c.LWDKExec=function(a){LWDK.init(a)});"undefined"==typeof LWDKSelectElements&&(this.LWDKSelectElements=c.LWDKSelectElements=a=>Array.from(document.querySelectorAll(a)),LWDK.el=a=>this.LWDKSelectElements(a));"undefined"==
typeof LWDKInitFunction&&(this.LWDKInitFunction=c.LWDKInitFunction=new function(){this.addFN=function(a){return LWDK.init(a)};this.exec=function(){return LWDK.reset.now()}});"undefined"==typeof LWDKLocal&&(this.LWDKLocal=c.LWDKLocal=c.top.location.pathname);const b=LWDK.args("url-prefix");window.URLPrefix=b;"undefined"==typeof LWDKLinks&&(this.LWDKLinks=c.LWDKLinks=function(){window.Go=function(a,d=!1){a=b+"/"+a+"/";d?window.open(a):window.top.location.href=a};for(let a=LWDKSelectElements("a[ajax=on]"),
d=0;d<a.length;d++)a[d].setAttribute("ajax","off"),a[d].href=location.origin+(b+a[d].href).split(location.origin).join("")});"undefined"==typeof LWDKLoadPage&&(this.LWDKLoadPage=c.LWDKLoadPage=function(a){c.top.location.href=a});"undefined"==typeof String.prototype.clean&&(String.prototype.clean=function(){return this})}(l)})(window);LWDK.debug.post("Loading [compatibility.js] module... ok");
!function(){function l(a){return a instanceof Element||a instanceof HTMLDocument}function c(a){return a instanceof Object}function b(a){return"boolean"==typeof a}LWDK.check={};LWDK.check.isNode=l;LWDK.check.isObj=c;LWDK.check.isEmpty=function(a){return!a};LWDK.check.isArray=function(a){return a instanceof Array};LWDK.check.isElement=l;LWDK.check.isObject=c;LWDK.check.isString=function(a){return"string"==typeof a};LWDK.check.isNumber=function(a){return"number"==typeof a};LWDK.check.isBool=b;LWDK.check.isBoolean=
b;LWDK.check.isJQuery=function(a){return!!jQuery&&a instanceof jQuery};LWDK.check.export=()=>{for(let a in LWDK.check)window[a]=LWDK.check[a]}}();
const devtools={isOpen:!1,orientation:void 0},threshold=160,emitEvent=(l,c)=>{globalThis.dispatchEvent(new globalThis.CustomEvent("devtoolschange",{detail:{isOpen:l,orientation:c}}))},main=({emitEvents:l=!0}={})=>{const c=globalThis.outerWidth-globalThis.innerWidth>threshold,b=globalThis.outerHeight-globalThis.innerHeight>threshold,a=c?"vertical":"horizontal";b&&c||!(globalThis.Firebug&&globalThis.Firebug.chrome&&globalThis.Firebug.chrome.isInitialized||c||b)?(devtools.isOpen&&l&&emitEvent(!1,void 0),
devtools.isOpen=!1,devtools.orientation=void 0):(devtools.isOpen&&devtools.orientation===a||!l||emitEvent(!0,a),devtools.isOpen=!0,devtools.orientation=a)};main({emitEvents:!1});setInterval(main,500);LWDK.debug.post("Loading [checking_system.js] module... ok");
