(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[215],{78512:function(t,r,_){(window.__NEXT_P=window.__NEXT_P||[]).push(["/categories/[subject]",function(){return _(85279)}])},98094:function(t,r,_){"use strict";_.d(r,{Z:function(){return p}});var a=_(85893),e=_(93097),o=_.n(e),i=_(41664),n=_.n(i),c=_(25675),s=_.n(c),d=_(58299),u=_(67294),l=Number(o().mobileWidth.split("px")[0]),w=function(t){var r=t.thumbnailSrc,_=void 0===r?d.DEFAULT_THUMBNAIL_SOURCE:r,e=t.time,i=t.title,c=t.tags,w=void 0===c?[]:c,h=t.slug,p=(0,u.useState)(o().thumbnailSize),g=p[0],m=p[1];return(0,u.useEffect)((function(){var t=function(){document.body.clientWidth<=l?m(o().mobileThumbnailSize):m(o().thumbnailSize)};return t(),window.addEventListener("resize",t),function(){window.removeEventListener("resize",t)}}),[]),(0,a.jsxs)("div",{className:o().row_card__wrapper,children:[(0,a.jsx)(n(),{href:"/posts/".concat(h),children:(0,a.jsx)("a",{className:o().row_card__thumbnail__wrapper,children:(0,a.jsx)(s(),{className:o().row_card__thumbnail,src:_,alt:"thumbnail",width:g,height:g,layout:"fixed",objectFit:"cover"})})}),(0,a.jsxs)("div",{className:o().row_card__tray,children:[(0,a.jsx)(n(),{href:"/posts/".concat(h),children:(0,a.jsx)("a",{className:o().row_card__tray__title,tabIndex:-1,children:i})}),(0,a.jsx)("div",{className:o().row_card__tray__date,children:e}),(0,a.jsx)("ul",{className:o().row_card__tray__tag,children:null===w||void 0===w?void 0:w.map((function(t){return(0,a.jsx)(n(),{href:"/tags/".concat(t),children:(0,a.jsxs)("a",{className:o().row_card__tray__tag__li,tabIndex:-1,children:["# ",t]})},t)}))})]})]})},h=_(55023),p=function(t){var r=t.subject,_=t.posts;return(0,a.jsxs)("div",{className:o().row_card__list__background,children:[(0,a.jsx)("h1",{className:o().row_card__list__title,children:(0,h.formatTitle)(r)}),(0,a.jsx)("ul",{className:o().row_card__list__wrapper,children:_.map((function(t,r){return(0,a.jsx)(w,{title:t.title,slug:t.slug,time:t.date,tags:t.tags,thumbnailSrc:t.thumbnailSrc},r)}))})]})}},58299:function(t){"use strict";t.exports={DEFAULT_THUMBNAIL_SOURCE:"https://euidong.github.io/images/default.jpg"}},55023:function(t,r,_){"use strict";var a=_(58299).DEFAULT_THUMBNAIL_SOURCE;t.exports={formateDate:function(t){var r=(t=new Date(t)).getFullYear(),_=t.getMonth()+1,a=t.getDate(),e=t.getHours().toString().padStart(2,"0"),o=t.getMinutes().toString().padStart(2,"0");return"".concat(r,"\ub144 ").concat(_,"\uc6d4 ").concat(a,"\uc77c ").concat(e,":").concat(o)},formatImage:function(t){return void 0===t?a:"/images/"===t.slice(0,8)?"https://euidong.github.io"+t:t},formatTitle:function(t){if(void 0===t)return"";for(var r=1,_=t[0];r<t.length;)t[r].toLowerCase()===t[r]?_+=t[r]:r===t.length-1||t[r+1].toLowerCase()!==t[r+1]?(_+=t[r]+t[r+1],r++):_+=" "+t[r],r++;return _}}},85279:function(t,r,_){"use strict";_.r(r),_.d(r,{__N_SSG:function(){return c}});var a=_(85893),e=_(11163),o=_(12918),i=_(98094),n=_(9008),c=!0;r.default=function(t){var r=t.posts,_=t.params;return(0,e.useRouter)().isFallback||0!==r.length?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n.default,{children:[(0,a.jsxs)("title",{children:[_.subject," | JustLog"]}),(0,a.jsx)("meta",{property:"og:title",content:"JustLog"}),(0,a.jsx)("meta",{property:"og:description",content:"Just Tech Blog"}),(0,a.jsx)("meta",{property:"og:url",content:"https://euidong.github.io"}),(0,a.jsx)("meta",{property:"og:image",content:"".concat("https://euidong.github.io","/logo192.png")})]}),(0,a.jsx)(i.Z,{subject:_.subject,posts:r}),";"]}):(0,a.jsx)(o.default,{statusCode:404})}},93097:function(t){t.exports={mobileWidth:"500px",cardWidth:"320px",thumbnailSize:"200px",mobileThumbnailSize:"100px",row_card__wrapper:"RowCard_row_card__wrapper__kohuv",row_card__thumbnail:"RowCard_row_card__thumbnail__Dh_84",row_card__thumbnail__wrapper:"RowCard_row_card__thumbnail__wrapper__bedY4",row_card__tray:"RowCard_row_card__tray__trcA5",row_card__tray__title:"RowCard_row_card__tray__title__lVniM",row_card__tray__date:"RowCard_row_card__tray__date__3cY_j",row_card__tray__tag:"RowCard_row_card__tray__tag__qXmOl",row_card__tray__tag__li:"RowCard_row_card__tray__tag__li__7_3Zt",row_card__list__background:"RowCard_row_card__list__background___xFj5",row_card__list__title:"RowCard_row_card__list__title__t4a2h",row_card__list__wrapper:"RowCard_row_card__list__wrapper__5Gtgi"}},12918:function(t,r,_){t.exports=_(97345)},11163:function(t,r,_){t.exports=_(80880)}},function(t){t.O(0,[675,774,888,179],(function(){return r=78512,t(t.s=r);var r}));var r=t.O();_N_E=r}]);