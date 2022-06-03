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
