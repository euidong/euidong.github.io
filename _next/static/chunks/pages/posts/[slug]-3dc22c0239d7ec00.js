(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[922],{69035:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/[slug]",function(){return n(95918)}])},96806:function(t,e,n){"use strict";n.d(e,{Z:function(){return d}});var r=n(85893),_=n(41664),a=n.n(_),o=n(54429),l=n.n(o),c=n(25675),s=n.n(c),i=n(58299),u=function(t){var e=t.thumbnailSrc,n=void 0===e?i.DEFAULT_THUMBNAIL_SOURCE:e,_=t.title,o=t.tags,c=void 0===o?[]:o,u=t.slug;return(0,r.jsxs)("div",{className:l().column_card__wrapper,children:[(0,r.jsx)(a(),{href:"/posts/".concat(u),children:(0,r.jsx)("a",{className:l().column_card__thumbnail__wrapper,children:(0,r.jsx)(s(),{className:l().column_card__thumbnail,src:n,alt:"thumbnail",width:l().cardWidth,height:l().cardWidth,objectFit:"cover"})})}),(0,r.jsxs)("div",{className:l().column_card__tray,children:[(0,r.jsx)(a(),{href:"/posts/".concat(u),children:(0,r.jsx)("a",{className:l().column_card__tray__title,tabIndex:-1,children:_})}),(0,r.jsx)("ul",{className:l().column_card__tray__tag,children:null===c||void 0===c?void 0:c.map((function(t,e){return(0,r.jsx)(a(),{href:"/tags/".concat(t),children:(0,r.jsxs)("a",{tabIndex:-1,className:l().column_card__tray__tag__li,children:["# ",t]})},e)}))})]})]})},d=function(t){var e=t.title,n=t.posts;return(0,r.jsxs)("div",{className:l().column_card__list__background,children:[(0,r.jsx)("h2",{className:l().column_card__list__title,children:e}),(0,r.jsx)("div",{className:l().column_card__list__wrapper,children:n.map((function(t,e){return(0,r.jsx)(u,{thumbnailSrc:t.thumbnailSrc,tags:t.tags,title:t.title,slug:t.slug},e)}))})]})}},19822:function(t,e,n){"use strict";var r=n(85893),_=n(79412),a=n(21391),o=n(38522),l=n(29051),c=n(5227),s=n(84283),i=(n(41098),n(97820),n(21218)),u=n.n(i);function d(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function p(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),r.forEach((function(e){d(t,e,n[e])}))}return t}function m(t,e){if(null==t)return{};var n,r,_=function(t,e){if(null==t)return{};var n,r,_={},a=Object.keys(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||(_[n]=t[n]);return _}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(_[n]=t[n])}return _}e.Z=function(t){var e=t.content;return(0,r.jsx)("article",{className:"markdown-body ".concat(u()["markdown-body"]),children:(0,r.jsx)(_.D,{remarkPlugins:[a.Z,o.Z],rehypePlugins:[l.Z],components:{code:function(t){t.node;var e=t.inline,n=t.className,_=t.children,a=m(t,["node","inline","className","children"]),o=/language-(\w+)/.exec(n||"");return!e&&o?(0,r.jsx)(c.Z,p({showLineNumbers:!0,style:s.$6,language:o[1],PreTag:"div"},a,{children:String(_).replace(/\n$/,"")})):(0,r.jsx)("code",p({className:n},a,{children:_}))}},children:e})})}},58299:function(t){"use strict";t.exports={DEFAULT_THUMBNAIL_SOURCE:"https://euidong.github.io/images/default.jpg"}},95918:function(t,e,n){"use strict";n.r(e),n.d(e,{__N_SSG:function(){return g},default:function(){return f}});var r=n(85893),_=n(11163),a=n(12918),o=n(9008),l=n(19822),c=n(92643),s=n.n(c),i=n(58299),u=n(96806),d=n(67294),p=function(){return(0,r.jsx)("ins",{className:"adsbygoogle",style:{display:"block",textAlign:"center",margin:"50px 0"},"data-ad-layout":"in-article","data-ad-format":"fluid","data-ad-client":"ca-pub-7452732177557701","data-ad-slot":"1964032750"})},m=function(){return(0,r.jsx)("ins",{className:"adsbygoogle",style:{display:"block"},"data-ad-format":"autorelaxed","data-ad-client":"ca-pub-7452732177557701","data-ad-slot":"3654773972"})},h=function(t){var e=t.type;return(0,d.useEffect)((function(){!function(){try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch(a){console.log("adsense error",a.message)}}()})),(0,r.jsx)(r.Fragment,{children:"banner"===e?(0,r.jsx)(p,{}):(0,r.jsx)(m,{})})},g=!0,f=function(t){var e=t.post,n=t.relatedPosts;return(0,_.useRouter)().isFallback||(null===e||void 0===e?void 0:e.slug)?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(o.default,{children:[(0,r.jsxs)("title",{children:[e.title," | JustLog"]}),(0,r.jsx)("meta",{property:"og:url",content:"".concat("https://euidong.github.io","/posts/").concat(e.slug)}),(0,r.jsx)("meta",{property:"og:title",content:e.title}),(0,r.jsx)("meta",{property:"og:description",content:"Just Tech Posting"}),(0,r.jsx)("meta",{property:"og:image",content:e.thumbnailSrc||i.DEFAULT_THUMBNAIL_SOURCE})]}),(0,r.jsxs)("div",{className:s().post__wrapper,children:[(0,r.jsx)("h1",{className:s().post__title,children:e.title}),(0,r.jsx)("p",{className:s().post__date,children:e.date}),(0,r.jsx)(l.Z,{content:e.content}),(0,r.jsx)(h,{type:"banner"}),n.length>0&&(0,r.jsx)(u.Z,{title:"Related Posts",posts:n})]})]}):(0,r.jsx)(a.default,{statusCode:404})}},54429:function(t){t.exports={mobileWidth:"500px",cardWidth:"320px",column_card__wrapper:"ColumnCard_column_card__wrapper__iVPbY",column_card__thumbnail:"ColumnCard_column_card__thumbnail__bx9FL",column_card__thumbnail__wrapper:"ColumnCard_column_card__thumbnail__wrapper__M3Kfm",column_card__tray:"ColumnCard_column_card__tray__v9oLc",column_card__tray__title:"ColumnCard_column_card__tray__title__fEApg",column_card__tray__tag:"ColumnCard_column_card__tray__tag__UUiD6",column_card__tray__tag__li:"ColumnCard_column_card__tray__tag__li__YRXLc",column_card__list__background:"ColumnCard_column_card__list__background__kZObh",column_card__list__title:"ColumnCard_column_card__list__title__pawoL",column_card__list__wrapper:"ColumnCard_column_card__list__wrapper__lsbEP"}},21218:function(t){t.exports={mobileWidth:"500px",cardWidth:"320px","markdown-body":"MarkDown_markdown-body__ABwUt"}},92643:function(t){t.exports={mobileWidth:"500px",cardWidth:"320px",post__wrapper:"Post_post__wrapper__Qq8vV",post__title:"Post_post__title__CYNLY",post__date:"Post_post__date__Sx37s",post__related_post_list:"Post_post__related_post_list__gARfb",post__related_post_list__wrapper:"Post_post__related_post_list__wrapper__92Gcr",post__related_post_list__title:"Post_post__related_post_list__title__2_qhU"}},12918:function(t,e,n){t.exports=n(97345)},11163:function(t,e,n){t.exports=n(80880)}},function(t){t.O(0,[265,675,332,774,888,179],(function(){return e=69035,t(t.s=e);var e}));var e=t.O();_N_E=e}]);