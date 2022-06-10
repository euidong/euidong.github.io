---
slug: "chrome-extension-migration-v2-to-v3"
title: "Chrome Extension Migrantion V2에서 V3"
date: "2022-02-14 21:25"
category: "Web"
tags: ["ChromeExtension"]
thumbnailSrc: "/images/chrome-extension.jpeg"
---

## Intro

최근 3일 정도를 chrome extension version 2에서 version3로 migration하면서 보낸 거 같습니다. ㅠㅠ

현재 side project로 진행하고 있는 내용을 chrome extension store에 배포할려고 하는 순간에 경고창이 뜨며, 이제부터는 version 3만 업로드를 지원한다는 경고를 받았습니다.ㅠㅠㅠㅠㅠ

그래서 이전 셋업을 완전히 뜯어고쳐야 된다는 결론에 도달했고, 이전에 열심히 투닥투닥 만들었던 결과물을 다시 뜯어고쳐야했습니다.

이 내용은 제가 진행하면서 바꾼 내용을 정리한 내용입니다. 저와 같이 version migration을 진행하시는 분들에게 도움이 되었으면 좋겠습니다.

## 1. manifest에서 바뀌어야 하는 부분

위에가 기존 version 2라면 아래가 version 3로 바뀌었을 때의 내용입니다. 일단 용어적인 부분에서 엄청 변경된 것은 없습니다. (하지만, API call이라든지 기타 여러 부분에 관해서는 정책이 매우 강력해진 편입니다. 이는 바로 다음에 살펴봅니다.)

```json
// manifest.json
{
  "manifest_version": 2,
  "name": "chrome-ext-boiler-plate",
  "version": "0.0.1",
  "description": "This project is chrome extension boiler plate",
  "icons": {
    "16": "icon/16.png",
    "32": "icon/32.png",
    "48": "icon/48.png",
    "128": "icon/128.png"
  },
  "background": { "scripts": ["background.js"] },
  "content_scripts": [{ "matches": ["<all_urls>"], "js": ["content.js"] }],
  "options_page": "option.html",
  "browser_action": { "default_popup": "popup.html" },
  "permissions": ["storage", "tabs"],
  "content_security_policy": " script-src 'self' 'unsafe-eval'; object-src 'self'"
}
```

```json
// manifest.json
{
  "manifest_version": 3,
  "name": "chrome-ext-boiler-plate",
  "version": "0.0.1",
  "description": "This project is chrome extension boiler plate",
  "icons": {
    "16": "icon/16.png",
    "32": "icon/32.png",
    "48": "icon/48.png",
    "128": "icon/128.png"
  },
  "background": { "service_worker": "background.js" },
  "content_scripts": [{ "matches": ["<all_urls>"], "js": ["content.js"] }],
  "options_page": "option.html",
  "permissions": ["storage", "tabs"],
  "action": { "default_popup": "popup.html" }
}
```

> **요약**

- manifest\_version : 2 => 3
- background.scripts => background.service\_worker  
  배열에서 하나의 단일 service\_worker로 변경되었습니다. 기존에 permanent관련 설정을 하신 분들은 이를 사용할 수 없습니다.
- browser_action => action  
  기존에 있던 다른 action과 통합되어 하나의 action이라는 이름으로 명칭이 변경되었습니다. 사실 여기까지는 화가나지 않습니다.

## 2. 보안 설정

version 3로 올라오면서 보안정책이 정말 강화가 되었습니다.

특히 CORS 부분에서 1차 멘붕을 겪을 수 있습니다.

만약, server에서 기존의 CORS accept를 단순히 "\*"로 설정하였다면, 저처럼 개고생을 할 수 있습니다. 일단, popup에서 요청을 보내는 경우에 저는 "chrome-extension://\*" 로 설정을 직접적으로 해주어야 제대로 통신을 하는 것을 확인할 수 있었습니다. 이거 진짜 너무 힘들게 찾았습니다. ㅠㅠ (서버 단에서 라이브러리 문제인지 아니면, 다른 설정 문제인지는 체크는 안했습니다. ㅎ 여러분도 조심하시기 바랍니다.)

또한, websocket 설정도 굉장히 빡세졌습니다. 기존에는 wss 요청을 보낼 때, INVALID CERTIFICATE를 확인하지 않았기 때문에 인증서 대충 설정하고 진행했었는데, 이제는 background에서 connection 생성 시에 이를 반드시 확인합니다. 따라서, https 생성 하실 때 서명 확실하게 하시고, 설정하시는게 좋을 겁니다. (저는 traefik을 이용하는데 알아서 인증서 발급 해주는 게 너무 편리합니다.)

![chrome-ext-mig-01](/images/chrome-ext-mig-01.png)

## 3. Webpack 설정

요즘 같은 시대에 생 javascript, jQuery로 front를 개발하지 않기 때문에, webpack을 통해서 vue나 react를 사용하실 가능성이 높으실 겁니다. 놀라운 사실은 우리의 webpack이 아무 설정을 해주지 않으면 development mode에서는 build file로 eval이 잔뜩 덕칠되어 있는 코드를 return 합니다.

![chrome-ext-mig-02](/images/chrome-ext-mig-02.png)

그런데, 이번 v3에서는 eval을 사용하는 것을 보안상의 위협으로 체크하고, 개발상황에서도 허용하지 않습니다. (물론 sandbox로 설정해서 할 수 있지만, 이렇게 되면 manifest.json file을 development, production 구분해야하고, 일단 이에 대한 예제를 제가 찾지 못했기 때문에 이를 통한 설정은 저는 포기했습니다. ㅠ) 기존에는  manifest에서 content\_security\_policy에서 eval을 허용해주면 끝이였는데, version 3로 바뀌면서 sandbox라는 기능이 추가되면서, 저희를 곤혹스럽게 합니다. 일단 찾기 쉬운 예제로 sandbox에 적용하니 chrome API가 막히거나, http API call이 막히는 등 저를 너무나 힘들게 했습니다. 따라서, 저는 webpack 설정을 만져서 다시 고쳐쓰자는 결론을 내렸고, 검색과 검색과 더 검색을 거친 결과로 webpack.config.js에서 eval을 사용하지 않는 mode를 찾아냈습니다. 그래서 적용한 결과 진짜로 eval이 사라졌고, build 속도도 굉장히 빨랐기에 아주 기분 좋게 설정을 마쳤습니다. 껄껄..

아래는 devtools를 cheap-module-source-map으로 설정했을 때 나오는 결과물입니다. 정말 다행히도 eval이 없습니다.

![chrome-ext-mig-03](/images/chrome-ext-mig-03.png)

마무리하면서, 다 나쁜점만 있었던 것은 아니라는 점을 짚어보고 넘어갑니다. 기존에는 webpack plugin인 webpack-chrome-extension-reloader 를 이용해서 hot reloading을 구현했었는데, version3로 넘어가면서 code가 바뀌면 자동으로 해준다는 것을 확인했습니다. 따라서, webpack --watch 만 설정해줘도 쉽게 reloading이 됩니다. 아마 chrome에서 파일 변환이 생기면 자동으로 reloading 하는 거 같습니다. 따라서 해당 설정은 지워주었습니다.

이렇게 해서 거의 한 3일 정도 골머리를 앓으면서 migration한 내용을 정리해보았습니다. 다른 분들에게도 도움이 되었으면 좋겠네요.

마지막으로 github link입니다. 이거 보고 참고 하시는게 가장 빠를 거 같습니다.

[🔗 GitHub](https://github.com/euidong/chrome-extension-boilerplate)
