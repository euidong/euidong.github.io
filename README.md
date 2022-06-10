# README

## Node Version

v16.8.0

## Resize Image

```bash
npm run resize [filepath] [width] [height]
```

이를 통해서 이미지의 크기를 줄이는 것이 가능합니다. 기본적으로 height는 생략 가능하고, 생략 시에는 width에 맞춰서 크기를 설정합니다.

## Post Snippet for vscode

```json
"Make a Post": {
  "scope": "markdown",
  "prefix": ["post", "template"],
  "body": [
    "---",
    "slug: \"$TM_FILENAME_BASE\"",
    "title: \"${TM_FILENAME_BASE/(.*)/${1:/upcase}/}\"",
    "date: \"$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE\"",
    "category: \"\"",
    "tags: []",
    "thumbnailSrc: \"/images/default.jpg\"",
    "---"
  ],
  "description": "Post Template"
}
```

## 작성 시 process

1. Snippet을 기반으로 상위 metadata를 작성한다.
2. 글을 작성한다. 이때 `## Intro` 를 글 초반에 삽입하여 해당 글에서 설명하고자 하는 것을 기술한다. 이 내용은 header의 meta description에 자동으로 삽입된다. (SEO를 위해 필요하다. Description의 마지막은 `---` 또는 `##`을 기준으로 한다.) 
