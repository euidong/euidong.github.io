(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[215],{78512:function(t,r,_){(window.__NEXT_P=window.__NEXT_P||[]).push(["/categories/[subject]",function(){return _(85279)}])},98094:function(t,r,_){"use strict";_.d(r,{Z:function(){return g}});var e=_(85893),a=_(93097),c=_.n(a),o=_(41664),n=_.n(o),i=_(25675),s=_.n(i),l=_(58299),d=_(67294),u=_(55023),w=Number(c().mobileWidth.split("px")[0]),p=function(t){var r=t.thumbnailSrc,_=void 0===r?l.DEFAULT_THUMBNAIL_SOURCE:r,a=t.time,o=t.title,i=t.tags,p=void 0===i?[]:i,h=t.slug,g=(0,d.useState)(c().thumbnailSize),m=g[0],f=g[1];return(0,d.useEffect)((function(){var t=function(){document.body.clientWidth<=w?f(c().mobileThumbnailSize):f(c().thumbnailSize)};return t(),window.addEventListener("resize",t),function(){window.removeEventListener("resize",t)}}),[]),(0,e.jsxs)("div",{className:c().row_card__wrapper,children:[(0,e.jsx)(n(),{href:"/posts/".concat(h),children:(0,e.jsx)("a",{className:c().row_card__thumbnail__wrapper,children:(0,e.jsx)(s(),{className:c().row_card__thumbnail,src:_,alt:o,width:m,height:m,layout:"fixed",objectFit:"cover"})})}),(0,e.jsxs)("div",{className:c().row_card__tray,children:[(0,e.jsx)(n(),{href:"/posts/".concat(h),children:(0,e.jsx)("a",{className:c().row_card__tray__title,tabIndex:-1,children:o})}),(0,e.jsx)("div",{className:c().row_card__tray__date,children:(0,u.formatDate)(a)}),(0,e.jsx)("ul",{className:c().row_card__tray__tag,children:null===p||void 0===p?void 0:p.map((function(t){return(0,e.jsx)(n(),{href:"/tags/".concat(t),children:(0,e.jsxs)("a",{className:c().row_card__tray__tag__li,tabIndex:-1,children:["# ",t]})},t)}))})]})]})},h=[{render:"\ucd5c\uc2e0\uc21c",target:"date",direction:"desc"},{render:"AtoZ",target:"title",direction:"asc"},{render:"ZtoA",target:"title",direction:"desc"}],g=function(t){var r=t.subject,_=t.posts,a=(0,d.useState)(h[0]),o=a[0],n=a[1],i=(0,d.useMemo)((function(){return _.sort((function(t,r){return t[o.target]>r[o.target]?"asc"===o.direction?1:-1:t[o.target]<r[o.target]?"asc"===o.direction?-1:1:0}))}),[_,o]);return(0,e.jsxs)("div",{className:c().row_card__list__background,children:[(0,e.jsx)("h1",{className:c().row_card__list__title,children:(0,u.formatTitle)(r)}),(0,e.jsx)("label",{className:c().row_card__list__select__wrapper,children:(0,e.jsx)("select",{className:c().row_card__list__select,onChange:function(t){n(h[t.currentTarget.selectedIndex])},children:h.map((function(t,r){return(0,e.jsx)("option",{className:c().row_card__list__select__option,children:t.render},r)}))})}),(0,e.jsx)("ul",{className:c().row_card__list__wrapper,children:i.map((function(t,r){return(0,e.jsx)(p,{title:t.title,slug:t.slug,time:t.date,tags:t.tags,thumbnailSrc:t.thumbnailSrc},r)}))})]})}},55023:function(t,r,_){"use strict";var e=_(58299).DEFAULT_THUMBNAIL_SOURCE;t.exports={formatDate:function(t){var r=(t=new Date(t.replace(/-/g,"/"))).getFullYear(),_=t.getMonth()+1,e=t.getDate(),a=t.getHours().toString().padStart(2,"0"),c=t.getMinutes().toString().padStart(2,"0");return"".concat(r,"\ub144 ").concat(_,"\uc6d4 ").concat(e,"\uc77c ").concat(a,"\uc2dc ").concat(c,"\ubd84")},formatImage:function(t){return void 0===t?e:"/images/"===t.slice(0,8)?"https://euidong.github.io"+t:t},formatTitle:function(t){if(void 0===t)return"";for(var r=0,_="";r<t.length;)t[r].toLowerCase()===t[r]?_+=t[r]:r===t.length-1?(_+=t[r],r++):t[r+1].toLowerCase()!==t[r+1]?(_+=t[r]+t[r+1],r++):_+=" "+t[r],r++;return _},getIntro:function(t){if(!t.includes("## Intro"))return null;var r=[t.split("## Intro")[1].split("##")[0],t.split("## Intro")[1].split("---")[0]];return(r[0].length<r[1].length?r[0]:r[1]).replace(/\n|\*|\`|\>/g,"")}}},85279:function(t,r,_){"use strict";_.r(r),_.d(r,{__N_SSG:function(){return i}});var e=_(85893),a=_(11163),c=_(12918),o=_(98094),n=_(9008),i=!0;r.default=function(t){var r=t.posts,_=t.params;return(0,a.useRouter)().isFallback||0!==r.length?(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(n.default,{children:[(0,e.jsx)("title",{children:"".concat(_.subject," | JustLog")}),(0,e.jsx)("meta",{property:"og:title",content:"".concat(_.subject," | JustLog")}),(0,e.jsx)("link",{rel:"canonical",href:"".concat("https://euidong.github.io","/tags/").concat(_.subject)}),(0,e.jsx)("meta",{property:"og:url",content:"".concat("https://euidong.github.io","/tags/").concat(_.subject)})]}),(0,e.jsx)(o.Z,{subject:_.subject,posts:r})]}):(0,e.jsx)(c.default,{statusCode:404})}},93097:function(t){t.exports={mobileWidth:"500px",cardWidth:"320px",thumbnailSize:"200px",mobileThumbnailSize:"100px",root:"RowCard_root__jJ7CK",row_card__wrapper:"RowCard_row_card__wrapper__kohuv",row_card__thumbnail:"RowCard_row_card__thumbnail__Dh_84",row_card__thumbnail__wrapper:"RowCard_row_card__thumbnail__wrapper__bedY4",row_card__tray:"RowCard_row_card__tray__trcA5",row_card__tray__title:"RowCard_row_card__tray__title__lVniM",row_card__tray__date:"RowCard_row_card__tray__date__3cY_j",row_card__tray__tag:"RowCard_row_card__tray__tag__qXmOl",row_card__tray__tag__li:"RowCard_row_card__tray__tag__li__7_3Zt",row_card__list__background:"RowCard_row_card__list__background___xFj5",row_card__list__title:"RowCard_row_card__list__title__t4a2h",row_card__list__select:"RowCard_row_card__list__select__dxkxA",row_card__list__select__option:"RowCard_row_card__list__select__option__GRKZU",row_card__list__select__wrapper:"RowCard_row_card__list__select__wrapper__TZ4_9",row_card__list__wrapper:"RowCard_row_card__list__wrapper__5Gtgi"}},12918:function(t,r,_){t.exports=_(97345)},11163:function(t,r,_){t.exports=_(80880)}},function(t){t.O(0,[260,774,888,179],(function(){return r=78512,t(t.s=r);var r}));var r=t.O();_N_E=r}]);