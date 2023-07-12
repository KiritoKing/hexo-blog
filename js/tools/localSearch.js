Global.initLocalSearch=()=>{let e=Global.hexo_config.path;if(!e){console.warn("`hexo-generator-searchdb` plugin is not installed!");return}let n=false;let l;let r=true;if(e.length===0){e="search.xml"}else if(e.endsWith("json")){r=false}const t=document.querySelector(".search-input");const o=document.getElementById("search-result");const s=(e,t,n)=>{let l=e.length;if(l===0)return[];let r=0;let o=[];let s=[];if(!n){t=t.toLowerCase();e=e.toLowerCase()}while((o=t.indexOf(e,r))>-1){s.push({position:o,word:e});r=o+l}return s};const d=(e,t,n,l)=>{let r=n[n.length-1];let{position:o,word:s}=r;let i=[];let a=0;while(o+s.length<=t&&n.length!==0){if(s===l){a++}i.push({position:o,length:s.length});const c=o+s.length;n.pop();for(let e=n.length-1;e>=0;e--){r=n[e];o=r.position;s=r.word;if(c<=o){break}else{n.pop()}}}return{hits:i,start:e,end:t,searchTextCount:a}};const p=(n,e)=>{let l="";let r=e.start;e.hits.forEach(e=>{l+=n.substring(r,e.position);let t=e.position+e.length;l+=`<b class="search-keyword">${n.substring(e.position,t)}</b>`;r=t});l+=n.substring(r,e.end);return l};const i=()=>{if(!n)return;let u=t.value.trim().toLowerCase();let e=u.split(/[-\s]+/);if(e.length>1){e.push(u)}let f=[];if(u.length>0){l.forEach(({title:r,content:i,url:o})=>{let t=r.toLowerCase();let n=i.toLowerCase();let a=[];let c=[];let h=0;e.forEach(e=>{a=a.concat(s(e,t,false));c=c.concat(s(e,n,false))});if(a.length>0||c.length>0){let e=a.length+c.length;[a,c].forEach(e=>{e.sort((e,t)=>{if(t.position!==e.position){return t.position-e.position}return e.word.length-t.word.length})});let t=[];if(a.length!==0){let e=d(0,r.length,a,u);h+=e.searchTextCountInSlice;t.push(e)}let s=[];while(c.length!==0){let e=c[c.length-1];let{position:t,word:n}=e;let l=t-20;let r=t+80;if(l<0){l=0}if(r<t+n.length){r=t+n.length}if(r>i.length){r=i.length}let o=d(l,r,c,u);h+=o.searchTextCountInSlice;s.push(o)}s.sort((e,t)=>{if(e.searchTextCount!==t.searchTextCount){return t.searchTextCount-e.searchTextCount}else if(e.hits.length!==t.hits.length){return t.hits.length-e.hits.length}return e.start-t.start});let n=parseInt(Global.theme_config.navbar.search.top_n_per_article?Global.theme_config.navbar.search.top_n_per_article:1,10);if(n>=0){s=s.slice(0,n)}let l="";if(t.length!==0){l+=`<li><a href="${o}" class="search-result-title">${p(r,t[0])}</a>`}else{l+=`<li><a href="${o}" class="search-result-title">${r}</a>`}s.forEach(e=>{l+=`<a href="${o}"><p class="search-result">${p(i,e)}...</p></a>`});l+="</li>";f.push({item:l,id:f.length,hitCount:e,searchTextCount:h})}})}if(e.length===1&&e[0]===""){o.innerHTML='<div id="no-result"><i class="fa-solid fa-magnifying-glass fa-5x"></i></div>'}else if(f.length===0){o.innerHTML='<div id="no-result"><i class="fa-solid fa-box-open fa-5x"></i></div>'}else{f.sort((e,t)=>{if(e.searchTextCount!==t.searchTextCount){return t.searchTextCount-e.searchTextCount}else if(e.hitCount!==t.hitCount){return t.hitCount-e.hitCount}return t.id-e.id});let t='<ul class="search-result-list">';f.forEach(e=>{t+=e.item});t+="</ul>";o.innerHTML=t;window.pjax&&window.pjax.refresh(o)}};const a=()=>{fetch(Global.hexo_config.root+e).then(e=>e.text()).then(e=>{n=true;l=r?[...(new DOMParser).parseFromString(e,"text/xml").querySelectorAll("entry")].map(e=>{return{title:e.querySelector("title").textContent,content:e.querySelector("content").textContent,url:e.querySelector("url").textContent}}):JSON.parse(e);l=l.filter(e=>e.title).map(e=>{e.title=e.title.trim();e.content=e.content?e.content.trim().replace(/<[^>]+>/g,""):"";e.url=decodeURIComponent(e.url).replace(/\/{2,}/g,"/");return e});const t=document.querySelector("#no-result");t&&(t.innerHTML='<i class="fa-solid fa-magnifying-glass fa-5x"></i>')})};if(Global.theme_config.navbar.search.preload){a()}if(t){t.addEventListener("input",i)}document.querySelectorAll(".search-popup-trigger").forEach(e=>{e.addEventListener("click",()=>{document.body.style.overflow="hidden";document.querySelector(".search-pop-overlay").classList.add("active");setTimeout(()=>t.focus(),500);if(!n)a()})});const c=()=>{document.body.style.overflow="";document.querySelector(".search-pop-overlay").classList.remove("active")};document.querySelector(".search-pop-overlay").addEventListener("click",e=>{if(e.target===document.querySelector(".search-pop-overlay")){c()}});document.querySelector(".search-input-field-pre").addEventListener("click",()=>{t.value="";t.focus();i()});document.querySelector(".popup-btn-close").addEventListener("click",c);window.addEventListener("pjax:success",c);window.addEventListener("keyup",e=>{if(e.key==="Escape"){c()}})};