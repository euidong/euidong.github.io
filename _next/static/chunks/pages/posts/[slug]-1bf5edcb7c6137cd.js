(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[922],{69035:function(t,e,_){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/[slug]",function(){return _(96855)}])},96806:function(t,e,_){"use strict";_.d(e,{Z:function(){return u}});var r=_(85893),n=_(41664),o=_.n(n),c=_(54429),a=_.n(c),s=_(25675),l=_.n(s),i=_(58299),d=function(t){var e=t.thumbnailSrc,_=void 0===e?i.DEFAULT_THUMBNAIL_SOURCE:e,n=t.title,c=t.tags,s=void 0===c?[]:c,d=t.slug;return(0,r.jsxs)("div",{className:a().column_card__wrapper,children:[(0,r.jsx)(o(),{href:"/posts/".concat(d),children:(0,r.jsx)("a",{className:a().column_card__thumbnail__wrapper,children:(0,r.jsx)(l(),{className:a().column_card__thumbnail,src:_,alt:n,width:a().cardWidth,height:a().cardWidth,objectFit:"cover"})})}),(0,r.jsxs)("div",{className:a().column_card__tray,children:[(0,r.jsx)(o(),{href:"/posts/".concat(d),children:(0,r.jsx)("a",{className:a().column_card__tray__title,tabIndex:-1,children:n})}),(0,r.jsx)("ul",{className:a().column_card__tray__tag,children:null===s||void 0===s?void 0:s.map((function(t,e){return(0,r.jsx)(o(),{href:"/tags/".concat(t),children:(0,r.jsxs)("a",{tabIndex:-1,className:a().column_card__tray__tag__li,children:["# ",t]})},e)}))})]})]})},u=function(t){var e=t.title,_=t.posts;return(0,r.jsxs)("div",{className:a().column_card__list__background,children:[(0,r.jsx)("h2",{className:a().column_card__list__title,children:e}),(0,r.jsx)("div",{className:a().column_card__list__wrapper,children:_.map((function(t,e){return(0,r.jsx)(d,{thumbnailSrc:t.thumbnailSrc,tags:t.tags,title:t.title,slug:t.slug},e)}))})]})}},19822:function(t,e,_){"use strict";var r=_(85893),n=_(65121),o=_(39359),c=_(38522),a=_(28907),s=_(68141),l=_(5227),i=_(84283),d=(_(41098),_(97820),_(21218)),u=_.n(d),m=_(79352),p=_(74855);function h(t,e,_){return e in t?Object.defineProperty(t,e,{value:_,enumerable:!0,configurable:!0,writable:!0}):t[e]=_,t}function g(t){for(var e=1;e<arguments.length;e++){var _=null!=arguments[e]?arguments[e]:{},r=Object.keys(_);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(_).filter((function(t){return Object.getOwnPropertyDescriptor(_,t).enumerable})))),r.forEach((function(e){h(t,e,_[e])}))}return t}function b(t,e){if(null==t)return{};var _,r,n=function(t,e){if(null==t)return{};var _,r,n={},o=Object.keys(t);for(r=0;r<o.length;r++)_=o[r],e.indexOf(_)>=0||(n[_]=t[_]);return n}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)_=o[r],e.indexOf(_)>=0||Object.prototype.propertyIsEnumerable.call(t,_)&&(n[_]=t[_])}return n}e.Z=function(t){var e=t.content;return(0,r.jsx)("article",{className:"markdown-body ".concat(u()["markdown-body"]),children:(0,r.jsx)(n.D,{remarkPlugins:[o.Z,c.Z],rehypePlugins:[a.Z,s.Z],components:{code:function(t){t.node;var e=t.inline,_=t.className,n=t.children,o=b(t,["node","inline","className","children"]),c=/language-(\w+)/.exec(_||"");return!e&&c?(0,r.jsxs)("div",{className:u().codeblock__wrapper,children:[(0,r.jsxs)("div",{className:u().codeblock__header,children:[(0,r.jsx)("span",{className:u().codeblock__header__circle}),(0,r.jsx)("span",{className:u().codeblock__header__circle}),(0,r.jsx)("span",{className:u().codeblock__header__circle}),(0,r.jsx)(p.CopyToClipboard,{text:String(n),children:(0,r.jsx)("span",{className:u().codeblock__header__button,onClick:function(t){var e=t.currentTarget,_=document.createElement("div");_.innerHTML="\ubcf5\uc0ac\ub428",_.className=u().codeblock__header__button__notify,e.appendChild(_),setTimeout((function(){e.removeChild(_)}),1e3)},children:(0,r.jsx)(m.qA2,{size:"25px"})})})]}),(0,r.jsx)(l.Z,g({showLineNumbers:!0,style:i.cL,language:c[1],PreTag:"div"},o,{children:String(n).replace(/\n$/,"")}))]}):(0,r.jsx)("code",g({className:_},o,{children:n}))}},children:e})})}},58299:function(t){"use strict";t.exports={DEFAULT_THUMBNAIL_SOURCE:"https://euidong.github.io/images/default.jpg",DEFAULT_DESCRIPTION:"Just Tech Blog\n  Network \ubd84\uc57c\uc5d0 \uad00\uc2ec\uc774 \ub9ce\uc740 \uac1c\ubc1c\uc790\ub85c Computer Engineering \uad00\ub828 Posting\uc744 \uc8fc\ub85c \ub2e4\ub8f9\ub2c8\ub2e4.\n  \uc790\uc720\ub86d\uac8c \ubc29\ubb38\ud558\uc5ec \uc5ec\ub7ec Feedback \ud3b8\ud558\uac8c \ubd80\ud0c1\ub4dc\ub9bd\ub2c8\ub2e4."}},55023:function(t,e,_){"use strict";var r=_(58299).DEFAULT_THUMBNAIL_SOURCE;t.exports={formatDate:function(t){var e=(t=new Date(t.replace(/-/g,"/"))).getFullYear(),_=t.getMonth()+1,r=t.getDate(),n=t.getHours().toString().padStart(2,"0"),o=t.getMinutes().toString().padStart(2,"0");return"".concat(e,"\ub144 ").concat(_,"\uc6d4 ").concat(r,"\uc77c ").concat(n,"\uc2dc ").concat(o,"\ubd84")},formatImage:function(t){return void 0===t?r:"/images/"===t.slice(0,8)?"https://euidong.github.io"+t:t},formatTitle:function(t){if(void 0===t)return"";for(var e=0,_="";e<t.length;)t[e].toLowerCase()===t[e]?_+=t[e]:e===t.length-1?(_+=t[e],e++):t[e+1].toLowerCase()!==t[e+1]?(_+=t[e]+t[e+1],e++):_+=" "+t[e],e++;return _},getIntro:function(t){if(!t.includes("## Intro"))return null;var e=[t.split("## Intro")[1].split("##")[0],t.split("## Intro")[1].split("---")[0]];return(e[0].length<e[1].length?e[0]:e[1]).replace(/\n|\*|\`|\>/g,"")}}},96855:function(t,e,_){"use strict";_.r(e),_.d(e,{__N_SSG:function(){return g},default:function(){return b}});var r=_(85893),n=_(11163),o=_(12918),c=_(9008),a=_(19822),s=_(92643),l=_.n(s),i=_(58299),d=_(96806),u=_(81743),m=_.n(u),p=function(t){var e=t.children;return(0,r.jsxs)("div",{className:m().comment__wrapper,children:[(0,r.jsx)("h2",{className:m().comment__title,children:"Comments"}),(0,r.jsx)("section",{className:m().comment,ref:function(t){if(t){var e=document.createElement("script");e.src="https://utteranc.es/client.js",e.async=!0,e.setAttribute("repo","euidong/euidong.github.io"),e.setAttribute("issue-term","pathname"),e.setAttribute("theme","preferred-color-scheme"),e.setAttribute("label","blog"),e.crossOrigin="anonymous",t.replaceChildren(e)}}}),e]})},h=_(55023),g=!0,b=function(t){var e,_,s,u=t.post,m=t.relatedPosts;return(0,n.useRouter)().isFallback||(null===u||void 0===u?void 0:u.slug)?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(c.default,{children:[(0,r.jsx)("title",{children:u.title}),(0,r.jsx)("meta",{property:"og:title",content:u.title}),(0,r.jsx)("meta",{name:"description",content:u.desc||(null===(e=u.tags)||void 0===e?void 0:e.join(" "))||"Just Tech Blog"}),(0,r.jsx)("meta",{property:"og:description",content:u.desc||(null===(_=u.tags)||void 0===_?void 0:_.join(" "))||"Just Tech Blog"}),(0,r.jsx)("meta",{property:"og:url",content:"".concat("https://euidong.github.io","/posts/").concat(u.slug)}),(0,r.jsx)("link",{rel:"canonical",href:"".concat("https://euidong.github.io","/posts/").concat(u.slug)}),(0,r.jsx)("meta",{property:"og:image",content:u.thumbnailSrc||i.DEFAULT_THUMBNAIL_SOURCE})]}),(0,r.jsxs)("div",{className:l().post__wrapper,children:[(0,r.jsx)("h1",{className:l().post__title,children:u.title}),(0,r.jsx)("p",{className:l().post__date,children:(0,h.formatDate)(u.date)}),(0,r.jsx)("ul",{className:l().post__tags,children:null===(s=u.tags)||void 0===s?void 0:s.map((function(t){return(0,r.jsx)("li",{className:l().post__tags__element,children:"# ".concat(t)},t)}))}),(0,r.jsx)(a.Z,{content:u.content}),(0,r.jsx)(p,{}),m.length>0&&(0,r.jsx)(d.Z,{title:"Related Posts",posts:m.sort((function(t,e){return t.title>e.title?1:t.title===e.title?0:-1}))})]})]}):(0,r.jsx)(o.default,{statusCode:404})}},54429:function(t){t.exports={mobileWidth:"500px",cardWidth:"320px",root:"ColumnCard_root__oHz_5",column_card__wrapper:"ColumnCard_column_card__wrapper__iVPbY",column_card__thumbnail:"ColumnCard_column_card__thumbnail__bx9FL",column_card__thumbnail__wrapper:"ColumnCard_column_card__thumbnail__wrapper__M3Kfm",column_card__tray:"ColumnCard_column_card__tray__v9oLc",column_card__tray__title:"ColumnCard_column_card__tray__title__fEApg",column_card__tray__tag:"ColumnCard_column_card__tray__tag__UUiD6",column_card__tray__tag__li:"ColumnCard_column_card__tray__tag__li__YRXLc",column_card__list__background:"ColumnCard_column_card__list__background__kZObh",column_card__list__title:"ColumnCard_column_card__list__title__pawoL",column_card__list__wrapper:"ColumnCard_column_card__list__wrapper__lsbEP"}},81743:function(t){t.exports={root:"Comment_root__yJ2kT",comment__wrapper:"Comment_comment__wrapper___sKTf",comment__title:"Comment_comment__title__hLmXO"}},21218:function(t){t.exports={mobileWidth:"500px",cardWidth:"320px",root:"MarkDown_root__Bgzqo","markdown-body":"MarkDown_markdown-body__ABwUt",codeblock__wrapper:"MarkDown_codeblock__wrapper__S4FFz",codeblock__header:"MarkDown_codeblock__header__h3PfO",codeblock__header__circle:"MarkDown_codeblock__header__circle__B4MWO",codeblock__header__button:"MarkDown_codeblock__header__button__aBRNB",codeblock__header__button__notify:"MarkDown_codeblock__header__button__notify__AwoAG"}},92643:function(t){t.exports={mobileWidth:"500px",cardWidth:"320px",root:"Post_root__crkKr",post__wrapper:"Post_post__wrapper__Qq8vV",post__title:"Post_post__title__CYNLY",post__date:"Post_post__date__Sx37s",post__tags:"Post_post__tags__SU5Ql",post__tags__element:"Post_post__tags__element__SYmey",post__related_post_list:"Post_post__related_post_list__gARfb",post__related_post_list__wrapper:"Post_post__related_post_list__wrapper__92Gcr",post__related_post_list__title:"Post_post__related_post_list__title__2_qhU"}},12918:function(t,e,_){t.exports=_(97345)},11163:function(t,e,_){t.exports=_(80880)}},function(t){t.O(0,[937,265,959,675,774,888,179],(function(){return e=69035,t(t.s=e);var e}));var e=t.O();_N_E=e}]);