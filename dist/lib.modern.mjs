import e from"vanjs-core";import{Modal as t}from"bootstrap";function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a])}return e},l.apply(this,arguments)}function a(e,t){if(null==e)return{};var l,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)t.indexOf(l=o[a])>=0||(n[l]=e[l]);return n}const{option:n}=e.tags,o=console.warn;function r(e,t,l){return e&&!Array.isArray(e)&&"object"==typeof e&&e.value&&(e=function(e){var{value:t,text:l}=e;return t?(t=s(t,!0),l=s(l,!1),t.map((e,t)=>({value:e,text:l[t]}))):[]}(e)),e=(e=s(e||[],!0)).map(function(e){let t={value:"",children:""};return e?Array.isArray(e)?(e.length>0&&(t.value=e[0],t.children=e[0]),e.length>1&&(t.value=e[1]),t):"object"==typeof e?(t.value=e.value,t.children=e.value,["children","text","displayValue"].some(l=>void 0!==e[l]&&(t.children=e[l],!0)),t):(t.value=e,t.children=e,t):t}),t?e.map(e=>{let t={value:e.value};return void 0!==l&&e.value===l&&(t.selected=!0),n(t,e.children)}):e}function s(e,t){return e?("string"==typeof e&&(e=e.split(",")),Array.isArray(e)||(t&&o("parseSelectOptions value invalid"),e=[]),e):[]}const i=["class","bsSize"],c=["class","bsSize","col"],d=["class","bsSize"],u=["class","bsSize"],v=["options"],p=["options","class","bsSize","inline","id"],g=["label","type","class","style","bsSize","reverse","id","value"],m=["options","style","bsSize","onItemClick"],h=["name","label","input","class","bsSize","cols","id"],f=["name","value","oninput"],b=["bsSize","class","color","outline","dropdown","type"],{a:y,button:w,div:k,input:D,label:S,textarea:z,li:C,ul:x,select:I}=e.tags;var O=new Map;function A(t){let{class:n,bsSize:o}=t,r=a(t,i);return D(l({class:()=>{let t="form-control";return e.val(o)&&(t+=" form-control-"+e.val(o)),e.val(n)&&(t+=" "+e.val(n)),t}},r))}function L(t,n){let{class:o,bsSize:r,col:s}=t,i=a(t,c);return S(l({class:()=>{let t="form-label";return e.val(s)?(t="col-form-label",e.val(r)?t+=" col-"+e.val(r)+"-"+e.val(s)+" col-form-label-"+e.val(r):t+=" col-"+e.val(s)):e.val(r)&&(t+=" col-form-label-"+e.val(r)),e.val(o)&&(t+=" "+e.val(o)),t}},i),n)}function M(t){let{class:n,bsSize:o}=t,s=a(t,u),{options:i=[]}=s,c=a(s,v);return i="function"!=typeof i?r(i,!0,s.value):i(),I(l({class:()=>{let t="form-select";return e.val(o)&&(t+=" form-select-"+e.val(o)),e.val(n)&&(t+=" "+e.val(n)),t}},c),i)}function E(t){let{options:l,class:n,bsSize:o,inline:s,id:i}=t,c=a(t,p),d=c.name||Math.random().toString(36).substring(2,9);i=i||"rgi_"+d,l=r(l);const u=e=>{c.oninput&&c.oninput({target:{name:d,value:e.target.value,type:"radiogroup"}})},v=l.map((e,t)=>{let l=i+"_"+t;return k({class:"form-check"+(s?" form-check-inline":"")},D({class:"form-check-input",type:"radio",id:l,value:e.value,name:d,checked:c.value===e.value,oninput:u}),S({class:"form-check-label",for:l},e.children))});return k({class:()=>{let t="form-control";return e.val(o)&&(t+=" form-control-"+e.val(o)),e.val(n)&&(t+=" "+e.val(n)),t}},v)}function H(t){let{label:n,type:o,class:r,style:s,bsSize:i,reverse:c,id:d,value:u}=t,v=a(t,g);d=d||Math.random().toString(36).substring(2,9);var p="switch"===o;return p&&(o="checkbox"),k({class:()=>{let t="form-check";return p&&(t+=" form-switch"),e.val(i)&&(t+=" form-control-"+e.val(i)),e.val(c)&&(t+=" form-check-reverse"),e.val(r)&&(t+=" "+e.val(r)),t},style:s},D(l({},v,{class:"form-check-input",id:d,type:o,checked:u||!1,oninput:e=>{var{checked:t,name:l,type:a}=e.target;v.oninput({target:{value:t=!!t,checked:t,name:l,type:a}})},role:p?"switch":void 0})),()=>n?S({class:"form-check-label",for:d},n):null)}O.set("text",A),O.set("textarea",function(t){let{class:n,bsSize:o}=t,r=a(t,d);return z(l({class:()=>{let t="form-control";return e.val(o)&&(t+=" form-control-"+e.val(o)),e.val(n)&&(t+=" "+e.val(n)),t}},r))}),O.set("select",M),O.set("radioselect",E),O.set("checkbox",H),O.set("radio",H),O.set("switch",H),O.set("combobox",$);const T=e=>H(l({},e,{type:"switch"})),P=e=>H(l({},e,{type:"checkbox"})),j=e=>H(l({},e,{type:"radio"}));function $(t){var{options:n=[],onItemClick:o}=t,s=a(t,m);n=r(n);var i=e.state(d(n,e.val(t.value)));function c(e,t){let l=e.find(e=>e.children===t);return l&&(t=l.value),t}function d(e,t){var l=e.find(e=>e.value===t);return l&&(t=l.children),t}return k({style:e.val(t.style),class:()=>{let l="input-group";return e.val(t.bsSize)&&(l+=" input-group-"+e.val(t.bsSize)),e.val(t.class)&&(l+=" "+e.val(t.class)),l}},A(l({},s,{value:i,oninput:e=>{let{value:l}=e.target;i.val=l,t.oninput({target:{value:c(n,l),name:t.name,type:t.type}})}})),k({class:"dropdown"},w({class:"btn btn-secondary dropdown-toggle",type:"button","data-bs-toggle":"dropdown","aria-expanded":"false"}),x({class:"dropdown-menu"},n.map(e=>C(y({class:"dropdown-item",href:"#",onclick:()=>function(e){let{name:l,type:a}=t;if(e=c(n,e),o){let t=n.find(t=>t.children===e);e=o(e,t)}return t.oninput({target:{name:l,value:e,type:a}}),i.val=d(n,e),!1}(e.children)},e.children))))))}function N(t){var n;let{name:o,label:r,input:s,class:i,bsSize:c,cols:d,id:u}=t,v=a(t,h),p=null!=u?u:Math.random().toString(36).substring(2,9),g="i_"+p,m=null!=(n=null!=s?s:O.get(v.type))?n:A;if(d){let[e,t]=d.split(" ");return[L({bsSize:c,col:e,for:g},r),k({class:()=>{let e=t?`col-${t}`:"col";return["checkbox","radio","switch"].includes(v.type)&&(e+=" pt-2"),e}},m(l({bsSize:c,name:o,id:g},v)))]}return k(l({class:()=>{let t="";return e.val(i)&&(t+=" "+e.val(i)),t},id:p},v),L({bsSize:c,for:g},r),m(l({bsSize:c,name:o,id:g},v)))}function V({values:t}={}){var a=[],n=1,o={values:l({},null!=t?t:{}),onChange:e=>(a.push(e),()=>o.offChange(e)),offChange(e){a=a.filter(t=>t!==e)},emitChange(e,t){a.forEach(l=>l(e,t))},handleInput(t){let{name:l,value:a}=t.target;var n;e.val(n=o.values[l])!==n?o.values[l].val=a:o.values[l]=a,o.emitChange(l,a)},args(e={}){var t,l;let{name:a="v"+n++,value:r,oninput:s=o.handleInput}=e;return r=null!=(t=null!=(l=r)?l:o.values[a])?t:"",o.values[a]=r,{name:a,value:r,oninput:s}}};return o}function R({dom:t,values:n}={}){var o=V({values:n}),r=l({},o,{dom:null!=t?t:e.tags("form"),row:null,add(t,n){var s;let{name:i,value:c,oninput:d}=t,u=a(t,f);void 0===c&&i&&(c=r.values[i]);let v=l({},u,o.args({name:i,value:c,oninput:d}));return e.add(null!=(s=null!=n?n:r.row)?s:r.dom,N(v)),r},addRow:t=>null===t?r.row=null:(r.row=k({class:"row"+(t?" "+t:"")}),e.add(r.dom,r.row),r)});return r}function F(t,n){let{bsSize:o,class:r,color:s="secondary",outline:i,dropdown:c,type:d="button"}=t,u=a(t,b);return e.val(c)&&(u["data-bs-toggle"]="dropdown"),w(l({type:d,class:()=>{let t="btn";return e.val(s)&&(e.val(i)?t+=" btn-outline-"+e.val(s):t+=" btn-"+e.val(s)),e.val(o)&&(t+=" btn-"+e.val(o)),e.val(c)&&(t+=" dropdown-toggle"),e.val(r)&&(t+=" "+e.val(r)),t}},u),n)}const W=["id","class","header","body","footer","close","centered","scrollable","position","width","color","dialogstyle","bodystyle"],_=["label","header","divider","text","active","disabled","class","tag"],{div:B,button:G,h5:K}=e.tags;function U(e={}){var{id:t,header:n,body:o,footer:r,close:s=!0,centered:i=!0,scrollable:c,position:d,width:u,color:v,dialogstyle:p="",bodystyle:g=""}=e,m=a(e,W);u&&(p+=`width: ${u};`),u&&(p+="max-width: inherit;"),d&&(p+=`margin-left: ${d.left}px; margin-top: ${d.top}px;`,i=!1);const h="modal-dialog"+(i?" modal-dialog-centered":"")+(c?" modal-dialog-scrollable":""),f="modal-content"+(v?" "+v:"");return"string"==typeof n&&(n=K({class:"modal-title"},n)),B(l({class:()=>"modal",id:t,"aria-hidden":"true",tabindex:"-1"},m),B({class:h,style:p},B({class:f},n||s?B({class:"modal-header"},n,s?Y:null):null,o&&B({class:"modal-body",style:g},o),r&&B({class:"modal-footer"},r))))}function X(e={},a){var n,o,r,s=null==(n=null==a?void 0:a.dispose)||n,i={dom:null,isOpen:!1,modalResult:void 0,open(t,a){i.modalResult=void 0,null!=t&&null!=a&&(e=l({},e,{position:{left:t,top:a}})),i.bsm.show()},close(e){i.modalResult=e,i.bsm.hide()},asyncOpen:async(e,t)=>new Promise(l=>{i.open(e,t),i.dom.addEventListener("hidden.bs.modal",()=>l(i.modalResult))}),get bsm(){return o||(i.dom=U(e),o=new t(i.dom,a),i.dom.addEventListener("shown.bs.modal",i.onShown),i.dom.addEventListener("hidden.bs.modal",i.onHidden)),o},dispose(){o&&(o.dispose(),o=null),i.dom&&(i.dom.remove(),i.dom=null)},hide(e){r=e,o.hide()},show(){o.show()},onShown(e){i.isOpen=!0},onHidden(e){i.isOpen=!1,r?r=!1:s&&i.dispose()}};return i}function Y({class:e}={},t){return G({type:"button",class:e||"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},t)}function q(...t){const{ul:l}=e.tags;return l({class:"dropdown-menu",style:"display: table; z-index: 0; position: inherit; min-width: 10rem; max-height: 400px; overflow-y: auto;"},...t.map(e=>e instanceof HTMLElement?e:Q(e)))}function J(...t){const{ul:l}=e.tags;return l({class:"dropdown-menu"},...t.map(e=>e instanceof HTMLElement?e:Q(e)))}function Q(t){const{li:n,span:o,hr:r,button:s}=e.tags,i=e=>{e.preventDefault(),e.stopPropagation()};var{label:c,header:d,divider:u,text:v,active:p,disabled:g,class:m,tag:h}=t,f=a(t,_),b=t=>()=>{let l=t;return e.val(p)&&(l+=" active"),e.val(g)&&(l+=" disabled"),e.val(m)&&(l+=" "+e.val(m)),l};return n(d?(h=h?e.tags[h]:o)(l({class:b("dropdown-header fw-bold border-bottom"),onclick:i},f),c):u?(h=h?e.tags[h]:r)(l({class:b("dropdown-divider"),onclick:i},f),c):v?(h=h?e.tags[h]:o)(l({class:b("dropdown-item-text"),onclick:i},f),c):(h=h?e.tags[h]:s)(l({class:b("dropdown-item"),role:"button"},f),c))}function Z(...e){const t=q(...e),l=X({close:!1,dialogstyle:"display: table; padding: 0;",bodystyle:"padding: 0;",body:t});return t.addEventListener("click",()=>l.close()),l}function ee(...e){const t=q(...e),l=X({close:!1,dialogstyle:"display: table; padding: 0;",bodystyle:"padding: 0;",body:t});t.addEventListener("click",()=>l.close());const a=l.open;return l.open=e=>{e.preventDefault(),e.stopPropagation(),a(e.clientX,e.clientY)},l}const te=["class","sticky","menu","t"],le=["href","label","icon","items","level","Comp","hidden","t"],ae=["label","class","active","disabled","divider","level"],ne=["label","items","t","level"],{div:oe,button:re,hr:se,span:ie,nav:ce,a:de,ul:ue,li:ve}=e.tags;function pe(t){let{class:n,sticky:o=!0,menu:r,t:s=(e=>e)}=t;return a(t,te),ce({class:()=>{let t="navbar navbar-expand-lg bg-body-tertiary";return o&&(t+=" sticky-top"),e.val(n)&&(t+=" "+e.val(n)),t}},oe({class:"container-fluid"},r.brand,re({class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},ie({class:"navbar-toggler-icon"})),oe({class:"collapse navbar-collapse",id:"navbarSupportedContent"},ue({class:"me-auto navbar-nav"},r.items.map(e=>ge(l({},e,{t:s})))))))}function ge(t){let{href:n="#",label:o,icon:r,items:s,level:i=0,Comp:c,hidden:d=!1,t:u=(e=>e)}=t,v=a(t,le);return"function"==typeof d&&(d=d()),d?null:("function"==typeof o&&(o=o()),o=o?u(e.val(o)):"",v.title&&(v.title=u(e.val(v.title))),s?he(l({label:o,items:s,level:i,t:u},v)):ve({class:()=>{let t="nav-item";return 0!==i&&(t=""),e.val(v.class)&&(t+=" "+e.val(v.class)),t}},c?c(l({href:n,label:o,icon:r,items:s,level:i,hidden:d,t:u},v)):me(l({},v,{href:n,label:o,level:i}))))}function me(t){let{label:n,class:o,active:r,disabled:s,divider:i,level:c=0}=t,d=a(t,ae);return i?se({class:"dropdown-divider"}):de(l({class:()=>{let t="nav-link";return 0!==c&&(t="dropdown-item"),e.val(r)&&(t+=" active"),e.val(r)&&0===c&&(t+=" text-primary"),e.val(s)&&(t+=" disabled"),e.val(o)&&(t+=" "+e.val(o)),t},href:"#"},d),n)}function he(e){let{label:t,items:n,t:o=(e=>e),level:r}=e,s=a(e,ne);return r>0?ve({},de({class:"dropdown-item",href:"#"},t+" »"),ue({class:"submenu dropdown-menu"},n.map(e=>ge(l({level:r+1,t:o},e))))):ve({class:"nav-item dropdown",id:"NavDropdown"+r},de({class:"nav-link dropdown-toggle",href:"#","data-bs-toggle":"dropdown"},t),ue({class:"dropdown-menu"},n.map(e=>ge(l({level:r+1},e,{t:o},s)))))}function fe(){const e={dict:{},language:"en",languageDefault:"en",setLanguage(t){e.language=String(t).toLowerCase(),e.dict[e.language]||(e.language=e.languageDefault)},getLanguage:()=>e.language,t(t){if("function"==typeof t&&(t=t()),!t)return"";var l=function(e,t){try{t=t.split(".");for(let l=0;l<t.length;l++){if(!e)return e;e=e[t[l]]}}catch(e){return!1}return e}(e.dict[e.language],t);return l||(l=t.split(".").pop()),l},tPath:t=>(t.endsWith(".")||(t+="."),function(l){return e.t(t+l)}),addWords(t,l,a){a&&(t={[a]:t}),l&&(t={[l]:t}),be(e.dict,t)}};return e}function be(e,t){for(var l in t)try{e[l]=t[l].constructor===Object?be(e[l],t[l]):t[l]}catch(a){e[l]=t[l]}return e}const ye=["attr","size","title"],we=["src","alt"],ke=["size","style"],De=["size"],Se=["size"];var ze=new Map,Ce=0,xe=new Map;function Ie(e){if("string"!=typeof e)return!1;var t=ze.get(e);return!t&&Ce>0&&!xe.get(e)&&(console.warn("Get unknown icon",e),xe.set(e,!0)),t}function Oe(e,t){Ce>1&&ze.get(e)&&console.warn("Redefine icon",e),ze.set(e,t)}function Ae(e){switch(e){case 0:case 1:case 2:Ce=e;break;case"all":Ce=2;break;case"get":Ce=1;break;default:Ce=0}}function Le(t={},...n){const{attr:o,size:r,title:s}=t,i=a(t,ye),c=r||"1em";let d="";t.class&&(d+=(d?d+" ":"")+t.class);let u=t.color?`color: ${t.color}; `:"";return t.style&&(u+=t.style),e.tagsNS("http://www.w3.org/2000/svg").svg(l({stroke:"currentColor",fill:"currentColor","stroke-width":"0"},o,i,{class:d,style:u,height:c,width:c}),s?e.tagsNS("http://www.w3.org/2000/svg").title(s):null,...n)}function Me(t){function a(t){return t&&t.map((t,n)=>e.tagsNS("http://www.w3.org/2000/svg")[t.tag](l({},t.attr),a(t.child)))}return"svg"===t.tag?(n={})=>e.tagsNS("http://www.w3.org/2000/svg").svg(l({},t.attr,n),...a(t.child)):(e={})=>Le(l({},t.attr,e),...a(t.child))}function Ee(t){let{src:n,alt:o}=t,r=a(t,we);return(t={})=>{let{size:s="1em",style:i=""}=t,c=a(t,ke);return e.tags.img(l({src:n,alt:o||n.split("/").pop(),style:i+`width:${s}; height:${s};`},r,c))}}function He(e,t={}){return(l={})=>{let{size:n="1em"}=l,o=a(l,De);var r=document.createElement("div");return r.innerHTML=e,r=r.firstChild,o.width=n,o.height=n,Object.keys(t).forEach(e=>r.setAttribute(e,t[e])),Object.keys(o).forEach(e=>r.setAttribute(e,o[e])),r}}function Te(t,n={}){let{size:o}=n,r=a(n,Se);var s=Ie(t);if(s){if("function"==typeof s)return s(l({size:o},r));t=s}if("function"==typeof t)return r.size=o,t(l({},r));if("string"==typeof t&&t.startsWith("fa"))return void 0!==o&&(r.style=r.style=l({},r.style||{},{fontSize:o})),r.class=r.class?r.class+" "+t:t,e.tags.i(l({},r));if("string"==typeof t&&t.startsWith("<svg "))return He(t)(l({size:o},r));if("string"==typeof t){if(void 0!==o){let e="font-size:"+o+";";r.style&&(e+=r.style),r.style=e}return e.tags.span(l({},r),t)}o=void 0===o?"1em":o;let i=`width:${o}; height:${o}; min-width:${o};`;return r.style&&(i+=r.style),r.style=i,e.tags.div(l({},r))}function Pe(e,t){var a={dragProps:e=>({draggable:!0,ondragstart:a.onDragStart,ondrop:a.onDrop,ondragover:a.onDragOver,ondragleave:a.onDragLeave,"data-position":e}),isDropArea:e=>a.dragAndDrop&&a.dragAndDrop.draggedTo===Number(e),onDragStart(t){let n=Number(t.currentTarget.dataset.position);a.setDragAndDrop(l({},a.dragAndDrop,{draggedFrom:n,isDragging:!0,originalOrder:e})),t.dataTransfer.setData("text/html","")},onDragOver(e){e.preventDefault();let t=a.dragAndDrop.originalOrder,n=a.dragAndDrop.draggedFrom,o=Number(e.currentTarget.dataset.position),r=t[n],s=t.filter((e,t)=>t!==n);t=[...s.slice(0,o),r,...s.slice(o)],o!==a.dragAndDrop.draggedTo&&a.setDragAndDrop(l({},a.dragAndDrop,{updatedOrder:t,draggedTo:o}))},onDrop(e){t(a.dragAndDrop.updatedOrder),a.setDragAndDrop(l({},a.dragAndDrop,{draggedFrom:null,draggedTo:null,isDragging:!1}))},onDragLeave(){a.setDragAndDrop(l({},a.dragAndDrop,{draggedTo:null}))},dragAndDrop:{draggedFrom:null,draggedTo:null,isDragging:!1,originalOrder:[],updatedOrder:[]},setDragAndDrop:e=>a.dragAndDrop=e};return a}ze.set("SPACE",e=>Te(" ",l({},e)));const je=["value","commaValue","options","oninput","onContextMenu","dragSort","delIcon","orderIcon","allowCreate","multi","bsSize","closeOnCheck","tagColor","style","placeholder","loading","tabindex","icons","t"],$e=["onChange"],Ne=["class","bsSize"],Ve=["class","bsSize"],Re=["Enter"," ",","],Fe="",We=e=>"string"==typeof e&&"-"===e[0],_e=e=>We(e)?e.substring(1):e,Be=e=>Te("🗙",e),Ge=e=>Te("☒",e),Ke=e=>Te("☐",e),Ue=e=>Te(He('<svg viewBox="0 0 576 512"><path d="M183.6 42.4C177.5 35.8 169 32 160 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L128 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 320c0 17.7 14.3 32 32 32h50.7l-73.4 73.4c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H429.3l73.4-73.4c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8H352c-17.7 0-32 14.3-32 32zM416 32c-12.1 0-23.2 6.8-28.6 17.7l-64 128-16 32c-7.9 15.8-1.5 35 14.3 42.9s35 1.5 42.9-14.3l7.2-14.3h88.4l7.2 14.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9l-16-32-64-128C439.2 38.8 428.1 32 416 32zM395.8 176L416 135.6 436.2 176H395.8z" /></svg>',l({style:"vertical-align: bottom;",fill:"currentColor",stroke:"currenColor"},e))),Xe=e=>Te(He('<svg viewBox="0 0 576 512"><path d="M183.6 469.6C177.5 476.2 169 480 160 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L128 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 320c0-17.7 14.3-32 32-32H480c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9L429.3 416H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H352c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9L402.7 352H352c-17.7 0-32-14.3-32-32zM416 32c12.1 0 23.2 6.8 28.6 17.7l64 128 16 32c7.9 15.8 1.5 35-14.3 42.9s-35 1.5-42.9-14.3L460.2 224H371.8l-7.2 14.3c-7.9 15.8-27.1 22.2-42.9 14.3s-22.2-27.1-14.3-42.9l16-32 64-128C392.8 38.8 403.9 32 416 32zM395.8 176h40.4L416 135.6 395.8 176z" /></svg>',l({style:"vertical-align: bottom;",fill:"currentColor",stroke:"currenColor"},e))),Ye={remove:"remove",ascending:"ascending",descending:"descending",edplaceholder:"enter new tag"},{div:qe,span:Je}=e.tags;function Qe(t){var n;let{value:o,commaValue:r=!0,options:s=[],oninput:i,onContextMenu:c,dragSort:d=!0,delIcon:u="none",orderIcon:v=!1,allowCreate:p=!0,multi:g=!0,bsSize:m=Fe,closeOnCheck:h=!1,tagColor:f,style:b,placeholder:y,loading:w,tabindex:k=0,icons:D,t:S}=t,z=a(t,je);var C,x;o=e.val(o),"string"==typeof o&&(o=o.split(",")),o&&Array.isArray(o)||(o=[]),o=o.filter(e=>e),b=(null!=(n=b)?n:"")+" heigt: auto;";const I={items:e.state(o),listvalue:e.state(o),options:lt(s,o),onContextMenu:c,dragSort:d,delIcon:u,orderIcon:v,allowCreate:p,multi:g,closeOnCheck:h,bsSize:m,tagColor:f||"text-bg-primary",placeholder:y,loading:w,tabindex:k,icons:l({IconDelete:Be,IconCheck:Ge,IconUncheck:Ke,IconAsc:Ue,IconDsc:Xe},D||{}),t:S||(e=>{var t;return null!=(t=Ye[e])?t:e}),checkItem(e,t){e=_e(e),this.saveItems(this.multi?t?[...this.items.val,e]:this.items.val.filter(t=>_e(t)!==e):t?[e]:[])},saveItems(e){this.items.val=e,!this.isOpen&&i&&(this.listvalue.val=e,i({target:{name:z.name,value:r?e.join(","):e,type:"tagedit"}}))},checkAll(e,t){this.multi?this.saveItems(t?[...this.options.map(e=>e.value)]:[]):this.checkItem(e,t)},onOrderClick(e,t){let l=this.items.val.indexOf(e),a=We(e);if(-1!==l&&t!==a){let a=[...this.items.val];a[l]=t?"-"+e:e.substring(1),this.saveItems(a)}},newItem(e){e&&!this.items.val.some(t=>_e(t)===e)&&(this.hideDropdown(),this.checkItem(e,!0))},showDropdown(){this.isOpen||this.toggleDropdown()},hideDropdown(){this.isOpen&&this.toggleDropdown()},toggleDropdown(){C.click()}};return C=F({dropdown:!0}),x=function({tagData:e}){const t=e.options.map(t=>function({tagData:e,item:t}){const l=e.multi&&!e.closeOnCheck?e=>{e.preventDefault(),e.stopPropagation()}:()=>{},a=()=>!!e.items.val.find(e=>_e(e)===t.value);return Q(""===t.value?{class:"py-0",divider:1}:{label:qe({class:"d-flex align-items-center"},()=>a()?e.icons.IconCheck({class:"me-1"}):e.icons.IconUncheck({class:"me-1"}),t.children),class:"py-0",onclick:n=>{l(n),n.ctrlKey?e.checkAll(t.value,!a()):e.checkItem(t.value,!a())},onkeydown:n=>{32===n.which&&(l(n),n.ctrlKey?e.checkAll(t.value,!a()):e.checkItem(t.value,!a()))}})}({tagData:e,item:t}));return e.allowCreate&&(t.unshift(Q({divider:1})),t.unshift(Q({text:!0,tag:"div",toggle:!1,label:et({bsSize:e.bsSize,tabIndex:"0",placeholder:e.t("edplaceholder"),onChange:t=>e.newItem(t)})}))),J(...t)}({tagData:I}),C.addEventListener("shown.bs.dropdown",e=>{I.isOpen=!0}),C.addEventListener("hidden.bs.dropdown",e=>{I.isOpen=!1,I.saveItems(I.items.val)}),function(t={},...n){let{class:o,bsSize:r}=t,s=a(t,Ve);return qe(l({class:()=>{let t="input-group";return e.val(r)&&(t+=" input-group-"+e.val(r)),e.val(o)&&(t+=" "+e.val(o)),t}},s),...n)}(l({bsSize:m},z,{style:b}),Ze({tagData:I}),C,x)}function Ze({tagData:t}){if(e.val(t.loading))return tt({},qe({class:"spinner-border spinner-border-sm "+t.tagColor.replace("-bg",""),role:"status"},Je({class:"visually-hidden"},"Loading...")));const a=!(!t.dragSort||!t.multi)&&Pe(t.listvalue.val,e=>t.saveItems(e));var n=t.listvalue.val.map((e,n)=>function({tagData:e,item:t,idx:a,drag:n}){var o,r,s,i=(o=e.options,r=_e(t),(s=o.find(e=>e.value===r))&&(r=s.children),r),c={class:"badge "+e.tagColor+" me-1 my-1",style:"fontSize: 90%;"};n&&(c=l({},c,{style:c.style+"cursor: grab;"},n.dragProps(a)));const d=l=>qe({class:l,role:"button",title:e.t("remove"),onclick:l=>{l.preventDefault(),l.stopPropagation(),e.checkItem(t,!1)}},e.icons.IconDelete);var u,v=[];return"left"===e.delIcon&&v.push(d("me-1")),v.push(i),e.orderIcon&&v.push((u=We(t),qe({class:"ms-1",role:"button",title:e.t(u?"descending":"ascending"),onclick:l=>{l.preventDefault(),l.stopPropagation(),e.onOrderClick(t,!u)}},u?e.icons.IconDsc:e.icons.IconAsc))),"right"===e.delIcon&&v.push(d("ms-1")),Je(l({},c),qe({class:"d-flex"},...v))}({tagData:t,item:e,idx:n,drag:a}));return 0===n.length&&t.placeholder&&(n="string"==typeof t.placeholder?[Je({class:"text-muted"},t.placeholder)]:[placeholder]),tt({tabindex:t.tabindex,onclick(e){e.preventDefault(),e.stopPropagation(),t.toggleDropdown()}},...n)}function et(e){let{onChange:t}=e,l=a(e,$e);var n="";return A({type:"text",value:n,bsSize:l.bsSize,placeholder:l.placeholder,oninput(e){n=e.target.value},onblur(){t(n)},onkeypress(e){Re.includes(e.key)&&(e.preventDefault(),e.stopPropagation(),t(n),n="")}})}function tt(t={},...n){let{class:o,bsSize:r}=t,s=a(t,Ne);return qe(l({class:()=>{let t="form-control";return e.val(r)&&(t+=" form-control-"+e.val(r)),e.val(o)&&(t+=" "+e.val(o)),t}},s),...n)}function lt(e,t){return e=r(e),t.forEach(t=>{t=_e(t),e.find(e=>e.value===t)||e.unshift({value:t,children:t,key:t})}),e}var at="vanjs-bootstrap 1.0.3 LICENSE MIT (c) 2023 by Geoffrey Emmans";export{F as Button,P as CheckboxInput,Y as CloseButton,$ as ComboboxInput,ee as ContextMenu,Pe as DragSort,J as DropdownMenu,R as FormBuilder,H as FormCheckInput,V as FormController,N as FormGroup,L as FormLabel,Me as GenIcon,fe as I18n,Te as Icon,Ee as ImgIcon,A as Input,Q as MenuItem,X as Modal,U as ModalFrame,ge as NavItem,me as NavLink,he as NavMenu,pe as Navbar,Z as PopupMenu,q as PopupMenuFrame,j as RadioInput,E as RadioSelectInput,M as SelectInput,Le as SvgIconBase,He as SvgStrIcon,T as SwitchInput,Qe as TagInput,Ie as getIcon,ze as iconMap,r as selectOptions,Oe as setIcon,Ae as setWarning,O as typeMap,at as version};
//# sourceMappingURL=lib.modern.mjs.map
