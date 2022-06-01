---
slug: "chrome-extension"
title: "Chrome Extension"
date: "2022-05-31 16:59"
category: "Web"
tags: ["ChromeExtension"]
thumbnailSrc: "/images/default.jpg"
---
  
해당 글은 manifest version 3을 기반으로 작성된 글입니다. 혹여 version 2를 이용하셨다면, version 2에서 version 3로 migration 하면서 제가 적어놓은 글이 있으니 그것을 참고 하시기 바랍니다.

[Chrome Extension version migration from V2 to V3](/posts/chrome-extension-migration-v2-to-v3)

---

## 1. chrome 확장 앱의 구성

chrome extension에서 manifest version이 3이 되어 이를 한 번 정리할 겸,  
chrome 확장앱을 구성하는 component는 크게 5가지로 나눌 수 있습니다.

1. Background scripts => 대게 event를 등록하는데 사용합니다. (bookmark 등록, message 등과 같은 기능)
2. Content scripts => 현재 열려 있는 페이지를 기준으로 이들을 바꿀 수 있습니다.
3. an options page => options page에 의해 제공되는 세부 동작을 usesr가 사용할 수 있도록 합니다.
4. UI elements => 브라우저 우상단에 존재하는 아이콘 or 클릭 시 열리는 popup, 검색창, contextmenu 등과 관련된 요소를 관리합니다.
5. various logic files => 추가적으로 사용할 logic 등을 포함하는 것이 가능합니다.

기본적으로 모든 요소는 HTML, CSS, Javascript를 이용해서 구성됩니다. 모든 확장 component가 필요로 되는 것은 아닙니다.

## 2. Manifest 만들기

모든 extension은 반드시 하나의 manifest 파일을 포함합니다. 이는 JSON 형식으로 되어있고, manifest.json이라는 이름으로 저장됩니다.  
기본 형태는 다음 제시한 내용처럼 구성됩니다. required 부분에는 반드시 들어가야 하는 내용을 포함합니다.  
또한, app을 구성함에 있어 거의 필수적으로 들어가야 하는 action과 icon과 같은 내용과 설명 등이 포함됩니다.

```json
{
  // required
  "manifest_version": 3,
  "name": "app test",
  "version": "0.0.1",

  // recommended
  "action": {},
  "default_locale": "ko",
  "description": "chrome extension test",
  "icons": {}
}
```

자세한 사항은 하단 링크를 참고해주세요.

[Chrome extension Manifest](https://developer.chrome.com/docs/extensions/mv3/manifest/)

## 3. Background script 구성하기

확장앱은 event에 기반을 둔 크롬 브라우저 환경을 향상 또는 변경 시키기 위한 프로그램이다. event(새로운 page로의 이동, 북마크 삭제, 탭 닫기, 등)는 browser에 의해서 등록되어집니다. 확장앱은 background (service worker) scripts를 이용하여 이러한 event를 모니터링하며, 특정 지시사항을 명시합니다.  
background service worker는 필요에 의해 언제든지 load되고, 사용되지 않으면 unload됩니다.

- 확장앱이 최초로 설치되거나 업데이트 되었을 경우
- background page가 전송된 event를 들었을 경우
- 다른 script 또는 extension에서 message를 전송했을 경우
- 확장앱의 다른 view에서 runtime.getBackgroundPage를 호출한 경우

한번 load되면, service worker는 이것이 action을 수행하는 동안은 종료되지 않습니다. 따라서, service worker는 모든 view 그리고 message port가 닫힐 때까지 unload되지 않습니다.

`view를 여는 것은 service worker를 불러오지는 않지만, 종료되는 것을 막을 수는 있습니다.`

효율적인 background scripts는 event가 발동되기 까지는 정지상태로 존재하고, 이에 응한뒤에 종료된다.

### 등록

service worker를 등록하기 위해서는 manifest에 이를 명시해주어야 합니다.  
아래 예제에서는 명시된 background.js 파일이 service_worker들의 main이 됩니다.

```json
{
    "manifest_version": 3,
    ...,
    "background": {
          "service_worker": "background.js"
    }
}
```

### 구성하기

runtime.onInstalled event를 listen한다면, 확장앱 설치 시에 초기화가 가능합니다. 초기 상태를 정의할 때 이를 사용합니다.  
아래 예시에서는 event를 등록하는 과정입니다. 여기서 유의해야 할 것은 event의 등록은 page의 시작 시에 동기적으로 모두 설치해주어야 한다는 것입니다. 만약, event가 발생했을 때, event를 등록하는 것과 같은 동작을 하기 위해서는 다른 방식을 이용해야 합니다.

```javascript
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Sample Context Menu",
    "contexts": ["selection"]
  });
});

// This will run when a bookmark is created.
chrome.bookmarks.onCreated.addListener(function() {
  // do something
});
```

추가적으로 요청을 filtering 하거나, trigger를 재등록하는 과정과 같은 내용은 하단 링크를 추가로 참고하기 바랍니다.

[Background pages](https://developer.chrome.com/docs/extensions/mv3/background_pages/)

## 4. Content scripts 만들기

contents scripts는 web page에서 동작할 내용에 대한 내용을 담습니다. DOM을 사용하여, scripts는 현재 웹 페이지의 세부사항을 조회, 변경 또는 정보를 전달하는 것이 가능합니다.  
contens scripts는 확장앱의 message 교환을 통해서 부모 확장앱에 의해 사용되는 chrome API에 접근하는 것이 가능합니다. 또한, URL을 통해서 확장앱의 파일에 접근하여, 이를 사용하는 것이 가능합니다. 기본적으로 i18n, storage, runtime(connect, getURL, id, onMessage, sendMessage, etc...) 과 같은 API에 바로 접근해서 사용하는 것이 가능합니다.

```javascript
// Code for displaying <extensionDir>/images/myimage.png:
var imgURL = chrome.runtime.getURL("images/myimage.png");
document.getElementById("someImage").src = imgURL;
```

### 고립

다른 확장앱, 또는 page와 충돌을 막기 위해서 기본적으로 content script는 고립됩니다. (browser의 tab간에 서로 독립적인 것처럼)  
예를 들어, 다음과 같은 코드가 있다고 가정합니다.

```html
<html>
  <button id="mybutton">click me</button>
  <script>
    var greeting = "hello, ";
    var button = document.getElementById("mybutton");
    button.person_name = "Bob";
    button.addEventListener("click", () =>
      alert(greeting + button.person_name + ".")
    , false);
  </script>
</html>
```

여기에 content scripts를 이용해서 아래 코드를 inject한다면,

```javascript
var greeting = "hola, ";
var button = document.getElementById("mybutton");
button.person_name = "Roberto";
button.addEventListener("click", () =>
  alert(greeting + button.person_name + ".")
, false);
```

button을 클릭했을 때, 두 개의 alert 창을 만날 수 있습니다.

### Inject scripts

content scripts는 3가지의 방법으로 삽입되어질 수 있습니다.

1. statically

manifest.json 파일에 정적으로 선언하면, 자동적으로 page가 setting될 때 실행됩니다. 이는 "content\_scripts"라는 부분에 정의됩니다. 여기에는 javascript, css 등을 포함할 수 있습니다.

```json
{
 "manifest_version": 3,
 ...
 "content_scripts": [
   {
     "matches": ["http://*.nytimes.com/*"], // 해당 injection을 수행할 URL을 명시합니다. 필수입력입니다.
     "css": ["myStyles.css"], // 추가할 css파일 입니다.
     "js": ["contentScript.js"] // 추가할 js파일 입니다.
   }
 ]
}
```

1. dynamically

2021.04.01 시점에서는 아직 완전 제공하지는 않는 기능입니다.  
host를 알지 못하거나 아는 host로 부터 script가 추가 또는 삭제될 필요가 있는 경우에 사용합니다.

`chrome.scripting.registerContentScript(optionsObject, callback);`

or

`chrome.scripting.unregisterContentScript(idArray, callback);`

1. programmatically

구체적인 상황 또는 event에 대한 반응으로 실행하기 원할 때 사용합니다.  
이를 수행하기 위해서는, 해당 페이지에 대한 host의 permission이 필요합니다. 이는 확장앱의 host\_permissions 부분 or 일시적으로 activeTab을 이용해서 승인을 받을 수 있습니다.

```json
{
  "manifest_version": 3,
  ...
  "permissions": [
    "activeTab"
  ]
}
```

```javascript
// 1. 파일 전체를 실행 주입 시키는 방법
chrome.runtime.onMessage.addListener((message, callback) => {
  if (message == "runContentScript"){
    chrome.scripting.executeScript({
      file: 'contentScript.js'
    });
  }
});

// 2. 특정 함수를 주입하는 방법
function injectedFunction(color) {
  document.body.style.backgroundColor = color;
}

chrome.runtime.onMessage.addListener((message, callback) => {
  if (message == "changeColor"){
    chrome.scripting.executeScript({
      function: injectedFunction,
      arguments: ['orange']
    });
  }
});
```

추가적으로 matck 범위를 세부 정의하는 부분과 frame 및 rum time 시점 관련 사항은 아래 링크를 참조해주세요.

[Content scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)

## 5. option Page 만들기

사용자에게 option을 선택할 수 있는 page를 customise하여 제공할 수 있습니다. 이는 chrome 확장앱을 관리할 수 있는 chrome://extensions에서 Detail을 눌렀을 때 보이는 option과 관련된 page입니다.  
이는 필요에 따라 구현하는 것이 알맞기 때문에 링크만 달아두겠습니다.

[Options](https://developer.chrome.com/docs/extensions/mv3/options/)

## 6. UI elements 만들기

확장앱은 UI 요소를 몇 가지 제공하는 것이 가능합니다. 여기서는 일부만 소개합니다.

### 1. Badge

확장앱의 icon을 결정하거나, 활성화 / 비활성화 등을 구분할 때 사용됩니다. => 상세 내용은 하단 링크 참고  
여기서는 icon을 설정하는 방법만 적습니다.

```json
{
  "manifest_version": 3,
  ...
  "icons": {
    "16": "extension_icon16.png", // favicon
    "32": "extension_icon32.png", // 관리창 Icon(window에서 가끔 요구함)
    "48": "extension_icon48.png", // 관리창 Icon
    "128": "extension_icon128.png" // chrome webstore Icon
  }
}
```

### 2. Popup

browser 창의 tooltip을 클릭 시에 보여주고 싶은 내용을 명시하는 것이 가능합니다.

```json
{
  "manifest_version": 3,
  ...
  "browser_action": {
    "default_popup": "popup.html"
  }
  ...
}
```

popup.html

```html
<html>
  <head>
    <title>Water Popup</title>
  </head>
  <body>
      <img src='./stay_hydrated.png' id='hydrateImage'>
      <button id='sampleSecond' value='0.1'>Sample Second</button>
      <button id='15min' value='15'>15 Minutes</button>
      <button id='30min' value='30'>30 Minutes</button>
      <button id='cancelAlarm'>Cancel Alarm</button>
    <script src="popup.js"></script>
  </body>
</html>
```

### 3. Contextmenu

우클릭 시에 나오는 상자에 추가 내용을 추가하는 것이 가능합니다.

```json
{
  "manifest_version": 3,
  ...
  "permissions": [
    "contextMenus"
  ],
  "background": {
    "service_worker": "background.js"
  }
}
```

`background.js`

```javascript
const kLocales = {
  'com.au': 'Australia',
  'com.br': 'Brazil',
  'ca': 'Canada',
  'cn': 'China',
  'fr': 'France',
  'it': 'Italy',
  'co.in': 'India',
  'co.jp': 'Japan',
  'com.ms': 'Mexico',
  'ru': 'Russia',
  'co.za': 'South Africa',
  'co.uk': 'United Kingdom'
};

chrome.runtime.onInstalled.addListener(function() {
  for (let key of Object.keys(kLocales)) {
    chrome.contextMenus.create({
      id: key,
      title: kLocales[key],
      type: 'normal',
      contexts: ['selection'],
    });
  }
});
```

추가적으로, override page, command, 검색창 디자인 등 추가적인 요소를 보려면 아래 링크를 참조해주세요.

[Design the user interface](https://developer.chrome.com/docs/extensions/mv3/user_interface/)

## 7. Boilerplate

만약, react, typescript에 익숙하다면, 필자가 만들어놓은 boilerplate를 추천합니다.

[euidong/chrome-extension-boilerplate](https://github.com/euidong/chrome-extension-boilerplate)
