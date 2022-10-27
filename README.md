# JustLog Dev

## Dependency

- Next: 18.0.0
- Node: ^14.19.1

## Dev Setup

```bash
# 1. package 설치
$ npm install

# 2. post 파일을 기반으로 각종 필요 파일 생성
# (post를 생성하고 나서 이를 실행시켜야 tag 및 category가 업데이트 된다.)
$ npm run prebuild

# 3. 만약, localhost:3000이 아닌 forward하여 dev를 수행하는 경우에는 .env 파일을 생성해야하며,
# FORWARD_URL을 알맞게 설정해야 한다.

# 4. 실행
$ npm run dev

# 5. posting 완료
# (github에 최신 내용을 push하면 github action에 의해서 자동으로 업데이트 된다.)
$ git push origin dev
```
