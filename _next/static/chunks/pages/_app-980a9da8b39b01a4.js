(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{76363:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(39850)}])},58299:function(e){"use strict";e.exports={DEFAULT_THUMBNAIL_SOURCE:"https://euidong.github.io/images/default.jpg",DEFAULT_DESCRIPTION:"Network \ubd84\uc57c\uc5d0 \uad00\uc2ec\uc774 \ub9ce\uc740 \uac1c\ubc1c\uc790\ub85c Computer Engineering \uad00\ub828 Posting\uc744 \uc8fc\ub85c \ub2e4\ub8f9\ub2c8\ub2e4."}},31551:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],s=!0,c=!1;try{for(n=n.call(e);!(s=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);s=!0);}catch(i){c=!0,a=i}finally{try{s||null==n.return||n.return()}finally{if(c)throw a}}return o}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o,s=(o=n(67294))&&o.__esModule?o:{default:o},c=n(41003),i=n(80880),l=n(69246);var u={};function _(e,t,n,r){if(e&&c.isLocalURL(t)){e.prefetch(t,n,r).catch((function(e){0}));var a=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;u[t+"%"+n+(a?"%"+a:"")]=!0}}var p=function(e){var t,n=!1!==e.prefetch,r=i.useRouter(),o=s.default.useMemo((function(){var t=a(c.resolveHref(r,e.href,!0),2),n=t[0],o=t[1];return{href:n,as:e.as?c.resolveHref(r,e.as):o||n}}),[r,e.href,e.as]),p=o.href,m=o.as,f=s.default.useRef(p),d=s.default.useRef(m),g=e.children,h=e.replace,y=e.shallow,b=e.scroll,v=e.locale;"string"===typeof g&&(g=s.default.createElement("a",null,g));var w=(t=s.default.Children.only(g))&&"object"===typeof t&&t.ref,x=a(l.useIntersection({rootMargin:"200px"}),3),j=x[0],k=x[1],S=x[2],C=s.default.useCallback((function(e){d.current===m&&f.current===p||(S(),d.current=m,f.current=p),j(e),w&&("function"===typeof w?w(e):"object"===typeof w&&(w.current=e))}),[m,w,p,S,j]);s.default.useEffect((function(){var e=k&&n&&c.isLocalURL(p),t="undefined"!==typeof v?v:r&&r.locale,a=u[p+"%"+m+(t?"%"+t:"")];e&&!a&&_(r,p,m,{locale:t})}),[m,p,k,v,n,r]);var P={ref:C,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,a,o,s,i){("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&c.isLocalURL(n))&&(e.preventDefault(),t[a?"replace":"push"](n,r,{shallow:o,locale:i,scroll:s}))}(e,r,p,m,h,y,b,v)},onMouseEnter:function(e){t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),c.isLocalURL(p)&&_(r,p,m,{priority:!0})}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var O="undefined"!==typeof v?v:r&&r.locale,L=r&&r.isLocaleDomain&&c.getDomainLocale(m,O,r&&r.locales,r&&r.domainLocales);P.href=L||c.addBasePath(c.addLocale(m,O,r&&r.defaultLocale))}return s.default.cloneElement(t,P)};t.default=p,("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&(Object.assign(t.default,t),e.exports=t.default)},69246:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],s=!0,c=!1;try{for(n=n.call(e);!(s=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);s=!0);}catch(i){c=!0,a=i}finally{try{s||null==n.return||n.return()}finally{if(c)throw a}}return o}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,n=e.rootMargin,r=e.disabled||!c,u=o.useRef(),_=a(o.useState(!1),2),p=_[0],m=_[1],f=a(o.useState(t?t.current:null),2),d=f[0],g=f[1],h=o.useCallback((function(e){u.current&&(u.current(),u.current=void 0),r||p||e&&e.tagName&&(u.current=function(e,t,n){var r=function(e){var t,n={root:e.root||null,margin:e.rootMargin||""},r=l.find((function(e){return e.root===n.root&&e.margin===n.margin}));r?t=i.get(r):(t=i.get(n),l.push(n));if(t)return t;var a=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=a.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return i.set(n,t={id:n,observer:o,elements:a}),t}(n),a=r.id,o=r.observer,s=r.elements;return s.set(e,t),o.observe(e),function(){if(s.delete(e),o.unobserve(e),0===s.size){o.disconnect(),i.delete(a);var t=l.findIndex((function(e){return e.root===a.root&&e.margin===a.margin}));t>-1&&l.splice(t,1)}}}(e,(function(e){return e&&m(e)}),{root:d,rootMargin:n}))}),[r,d,n,p]),y=o.useCallback((function(){m(!1)}),[]);return o.useEffect((function(){if(!c&&!p){var e=s.requestIdleCallback((function(){return m(!0)}));return function(){return s.cancelIdleCallback(e)}}}),[p]),o.useEffect((function(){t&&g(t.current)}),[t]),[h,p,y]};var o=n(67294),s=n(44686),c="undefined"!==typeof IntersectionObserver;var i=new Map,l=[];("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&(Object.assign(t.default,t),e.exports=t.default)},39850:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return W},reportWebVitals:function(){return G}});var r=n(85893),a=(n(97039),n(67294)),o=n(88357);function s(e){return(0,o.w_)({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"}}]})(e)}function c(e){return(0,o.w_)({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"}}]})(e)}function i(e){return(0,o.w_)({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"}}]})(e)}function l(e){return(0,o.w_)({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"}}]})(e)}function u(e){return(0,o.w_)({tag:"svg",attr:{version:"1.1",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M5.016 16c-1.066-2.219-0.498-3.49 0.321-4.688 0.897-1.312 1.129-2.61 1.129-2.61s0.706 0.917 0.423 2.352c1.246-1.387 1.482-3.598 1.293-4.445 2.817 1.969 4.021 6.232 2.399 9.392 8.631-4.883 2.147-12.19 1.018-13.013 0.376 0.823 0.448 2.216-0.313 2.893-1.287-4.879-4.468-5.879-4.468-5.879 0.376 2.516-1.364 5.268-3.042 7.324-0.059-1.003-0.122-1.696-0.649-2.656-0.118 1.823-1.511 3.309-1.889 5.135-0.511 2.473 0.383 4.284 3.777 6.197z"}}]})(e)}var _=n(41664),p=n.n(_),m=n(27965),f=n.n(m),d=function(){return(0,r.jsx)(p(),{href:"/",children:(0,r.jsx)("a",{className:f().logo,tabIndex:1})})},g=n(33729),h=n.n(g),y=n(85071),b=n.n(y),v=JSON.parse('[{"name":"Algorithm","post_cnt":11},{"name":"Computer Architecture","post_cnt":7},{"name":"Tech","post_cnt":16},{"name":"Web","post_cnt":4},{"name":"Network","post_cnt":11},{"name":"AI","post_cnt":5},{"name":"Paper","post_cnt":1}]'),w=JSON.parse('[{"name":"\uc790\ub8cc\uad6c\uc870","post_cnt":3},{"name":"Segment Tree","post_cnt":1},{"name":"Fenwick Tree","post_cnt":1},{"name":"Computer Organization And Design","post_cnt":6},{"name":"Arithmetic","post_cnt":1},{"name":"ISA","post_cnt":2},{"name":"Instruction","post_cnt":1},{"name":"Memory","post_cnt":1},{"name":"Memory Hierarchy","post_cnt":1},{"name":"Cache","post_cnt":1},{"name":"Directed Mapping","post_cnt":1},{"name":"Virtual Memory","post_cnt":1},{"name":"Page","post_cnt":1},{"name":"Multi Processors","post_cnt":1},{"name":"Multi Threading","post_cnt":1},{"name":"MTU","post_cnt":1},{"name":"Processing","post_cnt":1},{"name":"MIPS Implementation","post_cnt":1},{"name":"Pipeline","post_cnt":1},{"name":"Branch Prediction","post_cnt":1},{"name":"SuperScalar","post_cnt":1},{"name":"Binary Search","post_cnt":1},{"name":"Upper Bound","post_cnt":1},{"name":"Lower Bound","post_cnt":1},{"name":"\uc911\ubcf5 \uc218\uc758 \uac2f\uc218","post_cnt":1},{"name":"BlockChain","post_cnt":4},{"name":"Bitcoin","post_cnt":4},{"name":"ECC","post_cnt":1},{"name":"ecdsa","post_cnt":1},{"name":"BruteForce","post_cnt":1},{"name":"\uc21c\uc5f4","post_cnt":1},{"name":"\uc870\ud569","post_cnt":1},{"name":"\ubd80\ubd84 \uc9d1\ud569","post_cnt":1},{"name":"ChromeExtension","post_cnt":2},{"name":"DesignPattern","post_cnt":4},{"name":"OOP","post_cnt":1},{"name":"AbstractFactoryPattern","post_cnt":1},{"name":"BuilderPattern","post_cnt":1},{"name":"Creationalpattern","post_cnt":1},{"name":"FactoryMethodPattern","post_cnt":1},{"name":"PrototypePattern","post_cnt":1},{"name":"SingletonPattern","post_cnt":1},{"name":"AdapterPattern","post_cnt":1},{"name":"BridgePattern","post_cnt":1},{"name":"CompositePattern","post_cnt":1},{"name":"DecoratorPattern","post_cnt":1},{"name":"FacadePattern","post_cnt":1},{"name":"FlyweightPattern","post_cnt":1},{"name":"ProxyPattern","post_cnt":1},{"name":"CommandPattern","post_cnt":1},{"name":"CoRPattern","post_cnt":1},{"name":"MediatorPattern","post_cnt":1},{"name":"MementoPattern","post_cnt":1},{"name":"ObserverPattern","post_cnt":1},{"name":"StatePattern","post_cnt":1},{"name":"StrategyPattern","post_cnt":1},{"name":"Template\\"MethodPattern\\"","post_cnt":1},{"name":"VisitorPattern","post_cnt":1},{"name":"DFS","post_cnt":2},{"name":"Graph","post_cnt":4},{"name":"Tree","post_cnt":2},{"name":"Cycle \ucc3e\uae30","post_cnt":1},{"name":"\ub17c\ub9ac\ud68c\ub85c","post_cnt":1},{"name":"Docker","post_cnt":5},{"name":"Container","post_cnt":5},{"name":"Network","post_cnt":3},{"name":"Security","post_cnt":1},{"name":"Dynamic Programming","post_cnt":1},{"name":"BOJ2133","post_cnt":1},{"name":"BOJ11726","post_cnt":1},{"name":"BOJ14002","post_cnt":1},{"name":"BOJ1912","post_cnt":1},{"name":"Memoization","post_cnt":1},{"name":"Optimal Structural","post_cnt":1},{"name":"Overlapping Subproblem","post_cnt":1},{"name":"Referential Transparency","post_cnt":1},{"name":"\uc18c\uc218\ucc3e\uae30","post_cnt":1},{"name":"\uc5d0\ub77c\ud1a0\uc2a4\ud14c\ub124\uc2a4\uc758 \uccb4","post_cnt":1},{"name":"API","post_cnt":1},{"name":"RemotePrecedure","post_cnt":1},{"name":"gRPC","post_cnt":1},{"name":"ProtocolBuffer","post_cnt":1},{"name":"List","post_cnt":1},{"name":"Python","post_cnt":1},{"name":"\uc21c\ud658","post_cnt":1},{"name":"\ubcf5\uc0ac","post_cnt":1},{"name":"\uc790\ub974\uae30","post_cnt":1},{"name":"\ubc18\uc804","post_cnt":1},{"name":"\ud68c\uc804","post_cnt":1},{"name":"frontend","post_cnt":1},{"name":"react","post_cnt":1},{"name":"gatsby","post_cnt":1},{"name":"nextjs","post_cnt":1},{"name":"github","post_cnt":1},{"name":"Emulator","post_cnt":1},{"name":"Tool","post_cnt":1},{"name":"ML","post_cnt":5},{"name":"Probability","post_cnt":1},{"name":"Calculus","post_cnt":1},{"name":"LinearRegression","post_cnt":1},{"name":"BasisFunction","post_cnt":1},{"name":"Regularization","post_cnt":1},{"name":"GradientDescent","post_cnt":1},{"name":"Momentum","post_cnt":1},{"name":"StochasticGradientDescent","post_cnt":1},{"name":"LogisticRegression","post_cnt":1},{"name":"Classification","post_cnt":1},{"name":"SigmoidFunction","post_cnt":1},{"name":"SoftmaxFunction","post_cnt":1},{"name":"NewtonMethod","post_cnt":1},{"name":"MLE","post_cnt":1},{"name":"MAP","post_cnt":1},{"name":"Bayesian","post_cnt":1},{"name":"SVM","post_cnt":1},{"name":"GeneralClassifier","post_cnt":1},{"name":"Modulo","post_cnt":1},{"name":"\ub098\uba38\uc9c0","post_cnt":1},{"name":"Routing","post_cnt":3},{"name":"SDN","post_cnt":5},{"name":"Monitoring","post_cnt":1},{"name":"OpenFlow","post_cnt":4},{"name":"ONF","post_cnt":1},{"name":"OpticalTransportNetwork","post_cnt":1},{"name":"P2P","post_cnt":1},{"name":"VPN","post_cnt":1},{"name":"P4","post_cnt":2},{"name":"ProgrammableSwitch","post_cnt":1},{"name":"DataPlane","post_cnt":1},{"name":"RIP","post_cnt":1},{"name":"EIGRP","post_cnt":1},{"name":"OSPF","post_cnt":1},{"name":"BGP","post_cnt":1},{"name":"ISIS","post_cnt":1},{"name":"Mininet","post_cnt":1},{"name":"ONOS","post_cnt":2},{"name":"OpenVSwitch","post_cnt":1},{"name":"NFV","post_cnt":1},{"name":"OpenDayLight","post_cnt":1},{"name":"DPDK","post_cnt":1},{"name":"FD.io","post_cnt":1},{"name":"OpenStack","post_cnt":1},{"name":"CORD","post_cnt":1},{"name":"SEO","post_cnt":1},{"name":"GoogleSearchEngine","post_cnt":1},{"name":"\uac80\uc0c9\uc5b4 \ub178\ucd9c","post_cnt":1},{"name":"\uad6c\uae00 \uac80\uc0c9\uc5b4 \ub178\ucd9c","post_cnt":1},{"name":"BackbornNetwork","post_cnt":1},{"name":"Internet","post_cnt":1},{"name":"DatacenterNetwork","post_cnt":1},{"name":"EdgecomputingNetwork","post_cnt":1},{"name":"AccessNetwork","post_cnt":1},{"name":"Vagrant","post_cnt":1},{"name":"VirtualEnvironment","post_cnt":1},{"name":"VirtualBox","post_cnt":1},{"name":"VirtualMachine","post_cnt":1}]'),x=JSON.parse('[{"name":"\ub204\uc801\ud569","slug":"accumerated-number"},{"name":"3. Arithmetic","slug":"architecture-arithmetic"},{"name":"1. Base","slug":"architecture-base"},{"name":"2. Instruction","slug":"architecture-instruction"},{"name":"5. Memory Hierarchy","slug":"architecture-memory"},{"name":"6. Parallel Processors","slug":"architecture-parallel-processors"},{"name":"4. Processing","slug":"architecture-processor"},{"name":"Binary Search","slug":"binary-search"},{"name":"[Bitcoin] 1. ECDSA\ub97c \uc774\uc6a9\ud55c \uc11c\uba85","slug":"bitcoin-1"},{"name":"[Bitcoin] 2. Serialization","slug":"bitcoin-2"},{"name":"[Bitcoin] 3. Transaction","slug":"bitcoin-3"},{"name":"[Bitcoin] 4. Blockchain","slug":"bitcoin-4"},{"name":"Brute Force","slug":"brute-force"},{"name":"Chrome Extension Migrantion V2\uc5d0\uc11c V3","slug":"chrome-extension-migration-v2-to-v3"},{"name":"Chrome Extension","slug":"chrome-extension"},{"name":"[Design Pattern] 1. Intro","slug":"design-pattern-1"},{"name":"[Design Pattern] 2. Creational Pattern","slug":"design-pattern-2"},{"name":"[Design Pattern] 3. Structural Pattern","slug":"design-pattern-3"},{"name":"[Design Pattern] 4. Behavioral Pattern","slug":"design-pattern-4"},{"name":"DFS(1)-\uae30\ubcf8","slug":"dfs1"},{"name":"DFS(2)-DFS Spanning Tree","slug":"dfs2"},{"name":"0. \ub17c\ub9ac\ud68c\ub85c \uc694\uc57d","slug":"digital-logic-circuit"},{"name":"[Docker] Network(1)","slug":"docker-network-1"},{"name":"[Docker] Network(2)","slug":"docker-network-2"},{"name":"[Docker] Network(3)","slug":"docker-network-3"},{"name":"[Docker] Security","slug":"docker-security"},{"name":"Dynamic Programming","slug":"dynamic-programming"},{"name":"\uc18c\uc218\ucc3e\uae30","slug":"find-prime"},{"name":"Graph","slug":"graph"},{"name":"gRPC","slug":"grpc"},{"name":"List \uac16\uace0 \ub180\uae30","slug":"list"},{"name":"\ube14\ub85c\uadf8 \uc81c\uc791\uae30","slug":"making-blog"},{"name":"Mininet","slug":"mininet"},{"name":"[ML] 0. Base Knowledge","slug":"ml-base-knowledge"},{"name":"[ML] 2. Linear Regression","slug":"ml-linear-regression"},{"name":"[ML] 3. Logistic Regression","slug":"ml-logistic-regression"},{"name":"[ML] 1. Parametric Estimation","slug":"ml-parametric-estimation"},{"name":"[ML] 4. SVM","slug":"ml-svm"},{"name":"modulo","slug":"modulo"},{"name":"MPLS","slug":"mpls"},{"name":"OpenNetMon","slug":"open-net-mon"},{"name":"OpenFlow","slug":"openflow"},{"name":"\uad11\ud1b5\uc2e0\ub9dd","slug":"optical-transport-network"},{"name":"Overlay Network","slug":"overlay-network"},{"name":"P4","slug":"p4"},{"name":"Routing","slug":"routing"},{"name":"S6 Overlay","slug":"s6-overlay"},{"name":"SDN Tutorial","slug":"sdn-tutorial"},{"name":"SDN","slug":"sdn"},{"name":"Segment Routing","slug":"segment-routing"},{"name":"SEO","slug":"seo"},{"name":"Tree","slug":"tree"},{"name":"Network\uc758 \uc885\ub958","slug":"types-of-network"},{"name":"Vagrant","slug":"vagrant"},{"name":"VM & Container","slug":"vm-container"}]'),j=v.map((function(e){return e.name})),k=w.map((function(e){return e.name})),S=x.map((function(e){return e.name})),C=function(e){var t,n=e.close,o=(0,a.useRef)(null),s=(0,a.useState)(),c=s[0],l=s[1];return(0,a.useLayoutEffect)((function(){var e;null===(e=o.current)||void 0===e||e.focus()}),[]),(0,r.jsxs)("div",{className:b().search_bar__background,children:[(0,r.jsxs)("form",{className:b().search_bar__wrapper,onSubmit:function(e){return e.preventDefault()},children:[(0,r.jsx)(i,{size:"2rem",className:b().search_bar__icon}),(0,r.jsx)("input",{ref:o,type:"text",className:b().search_bar__input,placeholder:"Search",onChange:function(e){var t=j.filter((function(t){return t.toLowerCase().includes(e.currentTarget.value.toLowerCase())})),n=k.filter((function(t){return t.toLowerCase().includes(e.currentTarget.value.toLowerCase())})),r=S.filter((function(t){return t.toLowerCase().includes(e.currentTarget.value.toLowerCase())}));l({category:t.length>0?t[0]:null,tag:n.length>0?n[0]:null,post:r.length>0?r[0]:null})}})]}),(null===c||void 0===c?void 0:c.post)&&(0,r.jsx)(p(),{href:"/posts/".concat(null===(t=x.find((function(e){return e.name===c.post})))||void 0===t?void 0:t.slug),children:(0,r.jsxs)("a",{className:b().search_bar__result,onClick:n,children:[(0,r.jsx)("span",{className:b().search_bar__result__id,children:"post:"}),c.post]})}),(null===c||void 0===c?void 0:c.category)&&(0,r.jsx)(p(),{href:"/categories/".concat(c.category),children:(0,r.jsxs)("a",{onClick:n,className:b().search_bar__result,children:[(0,r.jsx)("span",{className:b().search_bar__result__id,children:"category:"}),c.category]})}),(null===c||void 0===c?void 0:c.tag)&&(0,r.jsx)(p(),{href:"/tags/".concat(c.tag),children:(0,r.jsxs)("a",{className:b().search_bar__result,onClick:n,children:[(0,r.jsx)("span",{className:b().search_bar__result__id,children:"tag:"}),c.tag]})})]})},P=function(e){var t=e.className,n=e.isOpen,o=e.setIsOpen,s=(0,a.useRef)(null);return(0,a.useEffect)((function(){var e=function(e){e.shiftKey&&"Enter"===e.key&&o((function(e){return!e}))};if(window.addEventListener("keypress",e),n){var t=function(e){"Escape"===e.key&&o(!1)};return window.addEventListener("keyup",t),function(){window.removeEventListener("keypress",e),window.removeEventListener("keyup",t)}}return function(){window.removeEventListener("keypress",e)}}),[n,o]),(0,r.jsxs)(r.Fragment,{children:[n&&(0,r.jsx)(C,{close:function(){return o(!1)}}),(0,r.jsx)("div",{className:t,children:(0,r.jsx)("button",{ref:s,className:h().search_bar_toggler,onClick:function(){o((function(e){return!e}))},tabIndex:2,children:n?(0,r.jsx)(l,{size:"25px"}):(0,r.jsx)(i,{size:"25px"})})})]})};function O(e){return(0,o.w_)({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none"},child:[{tag:"path",attr:{d:"M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z",fill:"currentColor"}},{tag:"path",attr:{d:"M2 12.0322C2 11.4799 2.44772 11.0322 3 11.0322H21C21.5523 11.0322 22 11.4799 22 12.0322C22 12.5845 21.5523 13.0322 21 13.0322H3C2.44772 13.0322 2 12.5845 2 12.0322Z",fill:"currentColor"}},{tag:"path",attr:{d:"M3 17.0645C2.44772 17.0645 2 17.5122 2 18.0645C2 18.6167 2.44772 19.0645 3 19.0645H21C21.5523 19.0645 22 18.6167 22 18.0645C22 17.5122 21.5523 17.0645 21 17.0645H3Z",fill:"currentColor"}}]})(e)}var L=n(27047),N=n.n(L),E=function(e){var t=e.isOpen,n=e.setIsOpen,a=function(){n(!1)};return(0,r.jsxs)("nav",{className:N()["side_bar__wrapper".concat(t?"--open":"--close")],children:[(0,r.jsx)(p(),{href:"/",children:(0,r.jsx)("a",{onClick:a,className:N().side_bar__li,tabIndex:t?1:-1,children:"Home"})}),(0,r.jsx)(p(),{href:"/tags",children:(0,r.jsx)("a",{className:N().side_bar__li,onClick:a,tabIndex:t?1:-1,children:"Tags"})}),v.map((function(e){return(0,r.jsx)(p(),{href:"/categories/".concat(e.name),children:(0,r.jsxs)("a",{className:N().side_bar__li,onClick:a,tabIndex:t?1:-1,children:[e.name,(0,r.jsxs)("span",{className:N().side_bar__li__cnt,children:["(",e.post_cnt,")"]})]})},e.name)}))]})},M=n(87792),B=n.n(M),I=function(e){var t=e.className,n=e.isOpen,o=e.setIsOpen;return(0,a.useEffect)((function(){var e=function(e){!e.shiftKey||"!"!==e.key&&"1"!==e.key||o((function(e){return!e}))};if(window.addEventListener("keypress",e),n){var t=function(e){"Escape"===e.key&&o(!1)};return window.addEventListener("keyup",t),function(){window.removeEventListener("keypress",e),window.removeEventListener("keyup",t)}}return function(){window.removeEventListener("keypress",e)}}),[n,o]),(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:t,children:[(0,r.jsx)("button",{tabIndex:1,onClick:function(){return o((function(e){return!e}))},className:B().search_bar_toggler,children:n?(0,r.jsx)(l,{size:"25px"}):(0,r.jsx)(O,{size:"35px"})}),(0,r.jsx)(E,{isOpen:n,setIsOpen:o})]})})},D=n(73181),T=n.n(D),A=function(e){var t=e.children,n=(0,a.useState)(!0),o=n[0],i=n[1];(0,a.useEffect)((function(){var e=window.scrollY,t=function(){var t=window.scrollY;i(e>t),e=t};return document.addEventListener("scroll",t),function(){document.removeEventListener("scroll",t)}}),[]);var l=(0,a.useState)(!1),_=l[0],p=l[1],m=(0,a.useState)(!1),f=m[0],g=m[1];return(0,r.jsxs)("div",{className:"".concat(T().wrapper," root"),children:[(0,r.jsxs)("header",{className:T().header,style:{position:f||_||o?"sticky":"static"},children:[(0,r.jsx)(I,{className:T().header__toggle,isOpen:_,setIsOpen:p}),(0,r.jsx)(d,{}),(0,r.jsx)(P,{className:T().header__toggle,isOpen:f,setIsOpen:g})]}),(0,r.jsx)("section",{children:t}),(0,r.jsxs)("footer",{className:T().footer,children:[(0,r.jsxs)("div",{className:T().footer__copyright,children:[(0,r.jsx)("span",{children:"Copyright \xa9 euidong"}),(0,r.jsx)("br",{}),(0,r.jsxs)("span",{children:["\ubaa8\ub4e0 \ucee8\ud150\uce20\uc5d0 \ub300\ud55c \uc800\uc791\uad8c\uc740 \uc791\uc131\uc790\uc5d0\uac8c \uc874\uc7ac\ud569\ub2c8\ub2e4. ",(0,r.jsx)("br",{}),"\ubd88\ubc95 \ubcf5\uc81c\ub97c \ud1b5\ud55c \uc0c1\uc5c5\uc801 \uc0ac\uc6a9\uc744 \uc808\ub300\uc801\uc73c\ub85c \uae08\uc9c0\ud569\ub2c8\ub2e4. ",(0,r.jsx)("br",{}),"\ub2e8, \ube44\uc0c1\uc5c5\uc801 \uc774\uc6a9\uc758 \uacbd\uc6b0 \ucd9c\ucc98 \ubc0f \ub9c1\ud06c\ub97c \uc801\uc6a9\ud55c\ub2e4\uba74 \uc790\uc720\ub86d\uac8c \uc0ac\uc6a9\uac00\ub2a5 \ud569\ub2c8\ub2e4."]}),(0,r.jsxs)("span",{children:["Also I use photos by"," ",(0,r.jsx)("a",{href:"https://unsplash.com/@lorenzoherrera?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",tabIndex:-1,children:"Lorenzo Herrera"})," ","on"," ",(0,r.jsx)("a",{href:"https://unsplash.com/s/photos/tech?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",tabIndex:-1,children:"Unsplash"})]})]}),(0,r.jsxs)("div",{className:T().footer__contents,children:[(0,r.jsxs)("a",{className:T().footer__contents__link,href:"https://github.com/euidong",target:"_blank",rel:"noreferrer",children:[(0,r.jsx)(c,{size:60}),(0,r.jsx)("span",{children:"github"})]}),(0,r.jsxs)("a",{className:T().footer__contents__link,href:"https://euidong.github.io/portfolio",target:"_blank",rel:"noreferrer",children:[(0,r.jsx)(s,{size:60}),(0,r.jsx)("span",{children:"portfolio"})]}),(0,r.jsxs)("a",{className:T().footer__contents__link,href:"https://chrome.google.com/webstore/detail/bonfire/nkooidijgbppkojdgkoafcoppnohdfka?hl=ko",target:"_blank",rel:"noreferrer",children:[(0,r.jsx)(u,{size:60}),(0,r.jsx)("span",{children:"chat"})]})]})]})]})},R=n(4298),z=n.n(R),F=n(9008),H=n(58299);function V(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function U(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){V(e,t,n[t])}))}return e}var W=function(e){var t=e.Component,n=e.pageProps;return(0,r.jsxs)(A,{children:[(0,r.jsxs)(F.default,{children:[(0,r.jsx)("meta",{charSet:"utf-8"}),(0,r.jsx)("meta",{name:"viewport",content:"initial-scale=1.0, width=device-width"}),(0,r.jsx)("meta",{name:"description",content:H.DEFAULT_DESCRIPTION}),(0,r.jsx)("meta",{property:"og:description",content:H.DEFAULT_DESCRIPTION}),(0,r.jsx)("meta",{property:"og:type",content:"blog"}),(0,r.jsx)("meta",{property:"og:site_name",content:"JustLog"}),(0,r.jsx)("meta",{property:"og:image",content:"".concat("https://euidong.github.io","/logo192.png")})]}),(0,r.jsx)(z(),{async:!0,src:"https://www.googletagmanager.com/gtag/js?id=G-RHJVZCZ2GL"}),(0,r.jsx)(z(),{id:"gtag-init",dangerouslySetInnerHTML:{__html:"\n            window.dataLayer = window.dataLayer || [];\n            function gtag(){dataLayer.push(arguments);}\n            gtag('js', new Date());        \n            gtag('config', 'G-RHJVZCZ2GL');\n          "}}),(0,r.jsx)(t,U({},n))]})};function G(e){var t=e.id,n=e.name,r=e.label,a=e.value;window.gtag&&window.gtag("event",n,{event_category:"web-vital"===r?"Web Vitals":"Next.js custom metric",value:Math.round("CLS"===n?1e3*a:a),event_label:t,non_interaction:!0})}},73181:function(e){e.exports={mobileWidth:"500px",cardWidth:"320px",root:"Layout_root__O4F1Z",header:"Layout_header__XosLl",footer:"Layout_footer__EL5v8",footer__contents:"Layout_footer__contents__YZWSm",footer__contents__link:"Layout_footer__contents__link__K_TKH",footer__copyright:"Layout_footer__copyright__r5baC",wrapper:"Layout_wrapper__dKJSz"}},27965:function(e){e.exports={mobileWidth:"500px",cardWidth:"320px",root:"Logo_root__BN1dw",logo:"Logo_logo___yD0t",logo__image:"Logo_logo__image__WG1XV"}},85071:function(e){e.exports={root:"SearchBar_root__wVJTH",search_bar__background:"SearchBar_search_bar__background__O8Gbl",search_bar__icon:"SearchBar_search_bar__icon__Crwii",search_bar__wrapper:"SearchBar_search_bar__wrapper__mbt8z",search_bar__input:"SearchBar_search_bar__input__kywDa",search_bar__button:"SearchBar_search_bar__button__8JlA6",search_bar__result:"SearchBar_search_bar__result__PkB91",search_bar__result__id:"SearchBar_search_bar__result__id__21mP7"}},27047:function(e){e.exports={mobileWidth:"500px",cardWidth:"320px",root:"SideBar_root__ZtD2s","side_bar__wrapper--open":"SideBar_side_bar__wrapper--open__gjPWJ","side_bar__wrapper--close":"SideBar_side_bar__wrapper--close__8Nwnr",side_bar__li:"SideBar_side_bar__li__crDBH",side_bar__li__cnt:"SideBar_side_bar__li__cnt__9QV_z"}},33729:function(e){e.exports={mobileWidth:"500px",cardWidth:"320px",root:"SearchBarToggler_root__Kke8f",search_bar_toggler:"SearchBarToggler_search_bar_toggler__3dHbA"}},87792:function(e){e.exports={root:"SideBarToggler_root__NyZo1",search_bar_toggler:"SideBarToggler_search_bar_toggler__CEuUg"}},97039:function(){},9008:function(e,t,n){e.exports=n(83121)},41664:function(e,t,n){e.exports=n(31551)},4298:function(e,t,n){e.exports=n(63573)},88357:function(e,t,n){"use strict";n.d(t,{w_:function(){return l}});var r=n(67294),a={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},o=r.createContext&&r.createContext(a),s=function(){return s=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},s.apply(this,arguments)},c=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n};function i(e){return e&&e.map((function(e,t){return r.createElement(e.tag,s({key:t},e.attr),i(e.child))}))}function l(e){return function(t){return r.createElement(u,s({attr:s({},e.attr)},t),i(e.child))}}function u(e){var t=function(t){var n,a=e.attr,o=e.size,i=e.title,l=c(e,["attr","size","title"]),u=o||t.size||"1em";return t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className),r.createElement("svg",s({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,a,l,{className:n,style:s(s({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),i&&r.createElement("title",null,i),e.children)};return void 0!==o?r.createElement(o.Consumer,null,(function(e){return t(e)})):t(a)}}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],(function(){return t(76363),t(80880)}));var n=e.O();_N_E=n}]);