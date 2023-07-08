Global.initUtils=()=>{Global.utils={html_root_dom:document.querySelector("html"),pageContainer_dom:document.querySelector(".page-container"),pageTop_dom:document.querySelector(".main-content-header"),homeBanner_dom:document.querySelector(".home-banner-container"),scrollProgressBar_dom:document.querySelector(".scroll-progress-bar"),pjaxProgressBar_dom:document.querySelector(".pjax-progress-bar"),pjaxProgressIcon_dom:document.querySelector(".pjax-progress-icon"),backToTopButton_dom:document.querySelector(".tool-scroll-to-top"),toolsList:document.querySelector(".hidden-tools-list"),toggleButton:document.querySelector(".toggle-tools-list"),innerHeight:window.innerHeight,pjaxProgressBarTimer:null,prevScrollValue:0,fontSizeLevel:0,isHasScrollProgressBar:Global.theme_config.global.scroll_progress.bar===true,isHasScrollPercent:Global.theme_config.global.scroll_progress.percentage===true,updateScrollStyle(){const e=window.pageYOffset||document.documentElement.scrollTop;const t=document.documentElement.scrollHeight;const o=window.innerHeight||document.documentElement.clientHeight;const s=this.calculatePercentage(e,t,o);this.updateScrollProgressBar(s);this.updateScrollPercent(s);this.updatePageTopVisibility(e,o);this.prevScrollValue=e},calculatePercentage(e,t,o){return Math.round(e/(t-o)*100)},updateScrollProgressBar(e){if(this.isHasScrollProgressBar){const t=e.toFixed(3);const o=e===0?"hidden":"visible";this.scrollProgressBar_dom.style.visibility=o;this.scrollProgressBar_dom.style.width=`${t}%`}},updateScrollPercent(e){if(this.isHasScrollPercent){const t=this.backToTopButton_dom.querySelector(".percent");const o=e!==0&&e!==undefined;this.backToTopButton_dom.classList.toggle("show",o);t.innerHTML=e.toFixed(0)}},updatePageTopVisibility(e,t){if(Global.theme_config.navbar.auto_hide){const o=this.prevScrollValue;const s=o>t&&e>o;this.pageTop_dom.classList.toggle("hide",s)}else{this.pageTop_dom.classList.remove("hide")}},calculatePercentage(e,t,o){return Math.round(e/(t-o)*100)},registerWindowScroll(){window.addEventListener("scroll",()=>{this.updateScrollStyle();this.updateTOCScroll();this.updateNavbarShrink();this.updateHomeBannerBlur();this.updateAutoHideTools();this.updateAPlayerAutoHide()})},updateTOCScroll(){if(Global.theme_config.articles.toc.enable&&Global.utils.hasOwnProperty("updateActiveTOCLink")){Global.utils.updateActiveTOCLink()}},updateNavbarShrink(){navbarShrink.init()},updateHomeBannerBlur(){if(Global.theme_config.home_banner.style==="fixed"&&location.pathname===Global.hexo_config.root){const e=document.querySelector(".home-banner-background");const t=window.innerHeight;const o=window.scrollY||window.pageYOffset;const s=t/2;const n=o>=s?15:0;try{e.style.transition="0.3s";e.style.webkitFilter=`blur(${n}px)`}catch(e){}}},updateAutoHideTools(){const t=window.pageYOffset;const o=document.body.scrollHeight;const s=window.innerHeight;const n=document.getElementsByClassName("right-side-tools-container");for(let e=0;e<n.length;e++){const i=n[e];if(t<=0){if(location.pathname!=="/"){}else{i.classList.add("hide")}}else if(t+s>=o-20){i.classList.add("hide")}else{i.classList.remove("hide")}}},updateAPlayerAutoHide(){const e=document.getElementById("aplayer");if(e==null){}else{const t=window.pageYOffset;const o=document.body.scrollHeight;const s=window.innerHeight;if(t<=0){if(location.pathname!=="/"){}else{e.classList.add("hide")}}else if(t+s>=o-20){e.classList.add("hide")}else{e.classList.remove("hide")}}},toggleToolsList(){this.toggleButton.addEventListener("click",()=>{this.toolsList.classList.toggle("show")})},globalFontSizeAdjust(){const o=this.html_root_dom;const e=document.querySelector(".tool-font-adjust-plus");const t=document.querySelector(".tool-font-adjust-minus");const s=document.defaultView.getComputedStyle(document.body).fontSize;const n=parseFloat(s);let i=0;const l=Global.getStyleStatus();if(l){i=l.fontSizeLevel;r(i)}function r(e){const t=n*(1+e*.05);o.style.fontSize=`${t}px`;Global.styleStatus.fontSizeLevel=e;Global.setStyleStatus()}function a(){i=Math.min(i+1,5);r(i)}function c(){i=Math.max(i-1,0);r(i)}e.addEventListener("click",a);t.addEventListener("click",c)},contentAreaWidthAdjust(){const e=document.querySelector(".tool-expand-width");const t=document.querySelector(".navbar-content");const o=document.querySelector(".main-content");const s=e.querySelector("i");const n=Global.theme_config.global.content_max_width||"1000px";const i="90%";let l=n;let r=false;if(Global.theme_config.home_banner.enable===true&&window.location.pathname==="/"){l=parseInt(n)*1.2+"px"}const a=e=>{Global.styleStatus.isExpandPageWidth=e;Global.setStyleStatus();if(e){s.classList.remove("fa-expand");s.classList.add("fa-compress");t.style.maxWidth=i;o.style.maxWidth=i}else{s.classList.remove("fa-compress");s.classList.add("fa-expand");t.style.maxWidth=l;o.style.maxWidth=n}};const c=()=>{const e=Global.getStyleStatus();if(e){r=e.isExpandPageWidth;a(r)}};c();e.addEventListener("click",()=>{r=!r;a(r)})},goComment(){this.goComment_dom=document.querySelector(".go-comment");if(this.goComment_dom){this.goComment_dom.addEventListener("click",()=>{const e=document.querySelector("#comment-anchor");const t=e.getBoundingClientRect().top+window.scrollY;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:t-10})})}},getElementHeight(e){const t=document.querySelector(e);return t?t.getBoundingClientRect().height:0},inithomeBannerHeight(){this.homeBanner_dom&&(this.homeBanner_dom.style.height=this.innerHeight+"px")},initPageHeightHandle(){if(this.homeBanner_dom)return;const e=this.getElementHeight(".main-content-header");const t=this.getElementHeight(".main-content-body");const o=this.getElementHeight(".main-content-footer");const s=e+t+o;const n=window.innerHeight;const i=document.querySelector(".main-content-footer");if(s<n){const l=Math.floor(n-s);if(l>0){i.style.marginTop=`${l-2}px`}}},imageViewer(){let t=false;const o=(e,t)=>{document.body.style.overflow=t?"hidden":"auto";if(t){e.classList.add("active")}else{e.classList.remove("active")}};const s=document.querySelector(".image-viewer-container");const n=document.querySelector(".image-viewer-container img");s&&s.addEventListener("click",()=>{t=false;o(s,t)});const e=document.querySelectorAll(".markdown-body img, .masonry-item img");if(e.length){e.forEach(e=>{e.addEventListener("click",()=>{t=true;o(s,t);n.setAttribute("src",e.getAttribute("src"))})})}else{this.pageContainer_dom.removeChild(s)}},setHowLongAgoLanguage(e,t){return t.replace(/%s/g,e)},getHowLongAgo(e){const t=Global.language_ago;const o=Math.floor(e/(60*60*24*30)/12);const s=Math.floor(e/(60*60*24*30));const n=Math.floor(e/(60*60*24)/7);const i=Math.floor(e/(60*60*24));const l=Math.floor(e/(60*60)%24);const r=Math.floor(e/60%60);const a=Math.floor(e%60);if(o>0){return this.setHowLongAgoLanguage(o,t.year)}else if(s>0){return this.setHowLongAgoLanguage(s,t.month)}else if(n>0){return this.setHowLongAgoLanguage(n,t.week)}else if(i>0){return this.setHowLongAgoLanguage(i,t.day)}else if(l>0){return this.setHowLongAgoLanguage(l,t.hour)}else if(r>0){return this.setHowLongAgoLanguage(r,t.minute)}else if(a>0){return this.setHowLongAgoLanguage(a,t.second)}},relativeTimeInHome(){const e=document.querySelectorAll(".home-article-meta-info .home-article-date");const t=Global.theme_config.home.article_date_format;if(t==="relative"){e&&e.forEach(e=>{const t=Date.now();const o=new Date(e.dataset.date.split(" GMT")[0]).getTime();e.innerHTML=this.getHowLongAgo(Math.floor((t-o)/1e3))})}else if(t==="auto"){e&&e.forEach(e=>{const t=Date.now();const o=new Date(e.dataset.date.split(" GMT")[0]).getTime();const s=Math.floor((t-o)/(60*60*24*1e3));if(s<7){e.innerHTML=this.getHowLongAgo(Math.floor((t-o)/1e3))}})}},pjaxProgressBarStart(){this.pjaxProgressBarTimer&&clearInterval(this.pjaxProgressBarTimer);if(this.isHasScrollProgressBar){this.scrollProgressBar_dom.classList.add("hide")}this.pjaxProgressBar_dom.style.width="0";this.pjaxProgressIcon_dom.classList.add("show");let e=1;const t=99;this.pjaxProgressBar_dom.classList.add("show");this.pjaxProgressBar_dom.style.width=e+"%";this.pjaxProgressBarTimer=setInterval(()=>{e+=5;if(e>t)e=t;this.pjaxProgressBar_dom.style.width=e+"%"},100)},pjaxProgressBarEnd(){this.pjaxProgressBarTimer&&clearInterval(this.pjaxProgressBarTimer);this.pjaxProgressBar_dom.style.width="100%";const t=setTimeout(()=>{this.pjaxProgressBar_dom.classList.remove("show");this.pjaxProgressIcon_dom.classList.remove("show");if(this.isHasScrollProgressBar){this.scrollProgressBar_dom.classList.remove("hide")}const e=setTimeout(()=>{this.pjaxProgressBar_dom.style.width="0";clearTimeout(t),clearTimeout(e)},200)},200)}};Global.utils.registerWindowScroll();Global.utils.toggleToolsList();Global.utils.globalFontSizeAdjust();Global.utils.contentAreaWidthAdjust();Global.utils.goComment();Global.utils.initPageHeightHandle();Global.utils.inithomeBannerHeight();Global.utils.imageViewer();Global.utils.relativeTimeInHome()};