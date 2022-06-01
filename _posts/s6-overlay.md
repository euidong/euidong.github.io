---
slug: "s6-overlay"
title: "S6 Overlay"
date: "2022-06-01 20:19"
category: "Tech"
tags: ["Docker"]
thumbnailSrc: "/images/docker-picture.jpg"
---

## 출처

- [🔗 just-containers/s6-overlay](https://github.com/just-containers/s6-overlay)

## Intro

docker에 기본 이념은 하나의 container에는 하나의 process만 두어야 한다는 것이다. 하지만, 이에 대해서 반대를 하고, 하나의 container에 여러 개의 process를 심고 이를 이용하겠다는 생각으로 만들어진 open source이다. 사용 예시는 main process 내부에 cronjob을 끼워넣는 것과 같은 경우가 있을 것이다.

이는 결론적으로 Dockerfile의 확장 버전이라고 볼 수도 있을 거 같다. 좀 더 복잡한 작업을 더 체계적으로 할 수 있는 틀을 제공한다. 아이디어 자체는 참신하나 남발하게 되면, stateless하던 container가 점점 stateful하게 되면서 시스템이 오염될 수도 있음을 유의하자.

아래 내용은 해당 opensource의 README를 직접 번역한 내용이니 의역도 많이 포함된다. 주의해서 읽도록 하자. 또한, 모르는 용어는 아래 Terminology를 확인해보도록 하자.

## Goals

- 이미지 제작자가 쉽게 s6(s6는 process를 감독, 관리, logging, 초기화하는 기능들의 집합)를 활용할 수 있도록 지원
- 다른 docker image들처럼 동일하게 작동

## Features

- cont-init.d →초기화 작업과 같은 end-user 실행 작업을 허용하는 간단한 초기 작업
- cont-finish.d → 마무리 작업
- fix-attrs.d → ownership 권한을 수정
- s6-overlay는 적당한 PID 1 기능을 제공한다.
  - container에 걸리는 zombie process를 가지지 않고, 적당한 절차에 따라 제거될 것이다.
- **여러 개의 process를 하나의 container에서 작동시키는 것이 가능하다.**
- **"The Docker Way"(아래에서 설명)에 따라 작동시키는 것이 가능하다.**
- 모든 기반 이미지(Ubuntu, CentOS, Fedora, 심지어는 Busybox)를 사용하는 것이 가능하다.
- 이미지의 layer의 수를 작게 유지하기 위하여 하나의 tar, gz 파일로 배포한다.
- s6 와 s6-portable-utils 는 손쉽고 작성이 쉬운 유틸리티 전체를 포함한다.
- 비밀리에 s6-log 를 사용하는 logutil-service는 오래된 로그의 순환을 수행한다.
- 특정 유저로 전체 process tree를 동작시키기 위하여, Docker의 USER 지침에 대하여 지원한다. 모든 feature에 대하여 지원하는 것은 아니라는 것을 알아두어야 한다. 자세한 사항은 여기서 확인가능하다.([🔗 notes](https://github.com/just-containers/s6-overlay#notes))

## The Docker Way

자주 강조되어지는 Docker의 신념은 "하나의 container에 하나의 process만 두어야 한다."는 것이다. 그러나, S6 overlay 팀은 이에 대하여 동의하지 않는다. 하나의 container에 여러 process를 동작시키는 것에 대한 본질적 문제는 없다. 더 추상적으로 "하나의 container에 하나의 thing만 두어야 한다."는 것이 해당 프로젝트의 목적이다. → 하나의 container는 하나의 것만 수행할 수 있다. 예로써, chatting service 또는 gitlab의 동작을 들 수 있다. 이것들은 여러 개의 process를 포함하지만, 하나의 thing이다. 따라서, 올바르다는 것이다.

이미지 제작자가 process supervisor를 피하는 이유는 하나의 process supervisor가 실패한 서비스를 다시 시작해야 한다고 생각하기 때문입니다. 이로 인해서 결국 Docker container는 절대 죽지 않을 것이다. 이러한 container가 죽지 않는 현상은 docker 생태계를 파괴할 것이다. 대부분의 이미지는 에러가 발생했을 때, 중단을 요청하는 하나의 process를 동작시킨다. 에러에 대해서 종료를 수행함으로써, 시스템 관리자는 실패를 원하는대로 다루는 것을 허락받는다. 만약 이미지를 절대 종료시키지 않는다면, 에러 회복과 실패 알림에 대한 대안책이 필요하다. 즉, container를 실패에도, 종료하지 않는 것은 매우 위험하다.

S6 overlay 팀의 정책은 만약 thing이 실패한다면, 그때 container가 반드시 실패햐야 한다는 것이다. 우리는 어떤 process들을 다시 동작시킬 수 있을지와 어떤 container를 끌어내릴지를 결정한다. 예를 들어, cron 이나 syslog에서 실패가 발생했을 때, container는 부정적 영향 없이 이것을 재시작하는 것이 가능할 것이다. 그러나 만약, ejabberd 가 실패했을 경우에는 container는 종료될 것이고, 이를 통해서 시스템 관리자는 이에 대한 대책을 수행할 수 있을 것이다.

따라서, S6 team에서 생각하는 "The Docker Way"란 다음과 같다.

- Container는 반드시 하나의 thing만 수행해야 한다.
- Container는 thing이 멈춘다면, 반드시 멈춰야 한다.

그리고, 우리의 초기 시스템은 이를 위해서 설계되었다. 이미지는 여전히 다른 Docker 이미지처럼 동작할 것이고, 이미 존재하는 이미지들의 생태계와 함께 어우러질 것이다.

---

## Init stages

S6 overlay init은 container화된 환경에 적당하게 동작하기 위해 적당하게 맞춤화한 프로그램이다. 해당 section에서는 어떻게 stage들이 동작하는지 간단히 설명한다. 만약 더 자세한 사항이 궁금하다면, 다음 article을 읽기를 추천한다. ([How to run s6-svscan as process 1](http://skarnet.org/software/s6/s6-svscan-1.html))

- **stage 1 :** 해당 단계의 목적은 두 번째 단계에 진입하기 위해서 이미지를 준비하는 것이다. 다른 것들 사이에서, 이것은 container 환경변수들을 준비하는 것과 s6 가 효과적으로 시작될 때까지 두 번째 stage의 시작을 막는 것에 대한 책임이 있다.
- **stage 2 :** end-user가 제공한 대부분의 파일들이 수행되어지는 단계이다.
  1. /etc/fix-attrs.d를 사용하여, 소유권과 권한을 고정한다.
  2. /etc/cont-init.d에 기술된 초기화 script를 실행시킨다.
  3. /etc/services.d에 적힌 user service들을 s6가 supervision을 동작 중인 폴더에 복사하고, signal을 보냄으로써 적절하게 supervising을 시작할 수 있다.
- **stage 3 :** 해당 단계는 종료 단계이다. 이는 다음과 같은 동작을 수행한다.
  1. TERM signal을 모든 관리 중인 service에게 전송한다.
  2. /etc/cont-init.d에 포함된 종료 scripts를 수행한다. 이는 서비스가 여전히 종료되어지는 중에도 종료되어질 수 있다.
  3. 모든 service가 종료되기를 기다린다.(S6\_SERVICES\_GRACETIME milliseconds를 넘지 않는 선에서 - default 3000)
  4. 모든 process에게 TERM signal을 보낸다.
  5. S6\_KILL\_GRACETIME milliseconds(default 3000)만큼 sleep을 수행한다.
  6. 모든 process에게 KILL signal을 전송한다.

## Usage

해당 project는 표준 tar, gz으로 배포되어졌다. 이를 사용하기 위해서는 image의 root에 이를 추출하고, ENTRYPOINT에 /init 을 기입해주면 된다. (만약, 기존 ENTRYPOINT가 있다면, 이를 cont-init으로 옮겨주어야 할 것이다. 또는 S6\_CMD\_ARG0를 이용하면 된다.)

여기서, 해당 project는 wget 또는 curl을 수행할 때, Docker의 RUN보다 ADD 지시어를 사용할 것을 추천한다. (왜냐하면, 이를 이용하면, Docker가 https URL을 다룰 수 있다.)

여기서부터, 서비스를 작성할 때에는 두 쌍의 선택지를 갖게 된다.

> **1. image의 CMD 를 이용하여 service/program을 실행시킨다.**

```Dockerfile
FROM busybox
ADD https://github.com/just-containers/s6-overlay/releases/download/v1.21.8.0/s6-overlay-amd64.tar.gz /tmp/
RUN gunzip -c /tmp/s6-overlay-amd64.tar.gz | tar -xf - -C /
ENTRYPOINT ["/init"]
```

```bash
# run
docker-host $ docker build -t s6demo .
docker-host $ docker run -ti s6demo /bin/sh
[fix-attrs.d] applying owners & permissions fixes...
[fix-attrs.d] 00-runscripts: applying... 
[fix-attrs.d] 00-runscripts: exited 0.
[fix-attrs.d] done.
[cont-init.d] executing container initialization scripts...
[cont-init.d] done.
[services.d] starting services
[services.d] done.

# ps
docker-host $ docker ps
PID   USER     COMMAND
    1 root     s6-svscan -t0 /var/run/s6/services
    21 root     foreground  if   /etc/s6/init/init-stage2-redirfd   foreground    if     s6-echo     [fix-attrs.d] applying owners & permissions fixes.
    22 root     s6-supervise s6-fdholderd
    23 root     s6-supervise s6-svscan-log
    24 nobody   s6-log -bp -- t /var/log/s6-uncaught-logs
    28 root     foreground  s6-setsid  -gq  --  with-contenv  /bin/sh  import -u ? if  s6-echo  --  /bin/sh exited ${?}  foreground  s6-svscanctl  -t
    73 root     /bin/sh
    76 root     ps

# exit
/bin/sh exited 0
docker-host $
```

> **2. s6-overlay를 활용하는 쉬운 방법이라고 할 수 있다.**

Dockerfile이 build할 때, 작성하거나 runtime에 command line으로 입력이 가능하다. 이것은 s6 supervisor에 의해서 실행되어질 것이다. 그리고 실패나 종료 시에 해당 container는 종료되어질 것이다. interactive program도 s6 supervisor 하위에서도 동작시킬 수 있다. service script를 작성하여 실행시킨다.

`/etc/services.d/myapp/run`

```shell
  !/usr/bin/execlineb -P
  nginx -g "daemon off;"
```

관리되는 서비스를 제작하는 것은 단지 /etc/services.d에 service directory를 만들고, 장기간 존재할 process 실행에 대한 내용을 적은 run 파일을 이 안에 만드는 것보다 더 쉬워질 수 없다. 이거면 다다. 만약 s6 supervision에 대한 더 많은 내용을 알기를 원한다면 다음 문서를 살펴보아라. (\[servicedir\](<[http://skarnet.org/software/s6/servicedir.html](http://skarnet.org/software/s6/servicedir.html)\>))

## 소유권 및 권한 고정

때때로, 진행 전에 소유권과 권한을 고정하는 것이 필요할 때가 있다. 대표적인 예시가 container 내부에 host folder와 mount된 folder가 있을 때이다. overlay는 /etc/fix-attrs.d의 파일을 사용하여 이를 헤쳐나갈 방법을 제공한다.

- Format
  - path : File 또는 Directory의 경로
  - recurse : folder가 발견되었다면, 해당 folder 내부의 내용도 포함할지를 결정합니다. (true or false)
  - account : target의 account이다. account를 찾을 수 없을 경우 default로 예비 uid:gid(user id, group id)를 사용할 수 있다. 예를들어, nobody, 32768:32768 이라고 입력할 경우, nobody account를 첫번째로 사용하기 위한 시도를 하고, 예비로 uid가 32768인 대상을 예비로 찾는다. 예를들어, daemon 의 계정이 UID=2이고, GID=2인 경우 다음과 같은 account 도 사용할 수 있다.
    - daemon: UID=2 GID=2
    - daemon,3:4: UID=2 GID=2
    - 2:2,3:4: UID=2 GID=2
    - daemon:11111,3:4: UID=2 GID=11111
    - 11111:daemon,3:4: UID=11111 GID=2
    - daemon:daemon,3:4: UID=2 GID=2
    - daemon:unexisting,3:4: UID=2 GID=4
    - unexisting:daemon,3:4: UID=3 GID=2
    - 11111:11111,3:4: UID=11111 GID=11111
  - fmode : target file의 mode → example 0644
  - dmode : target directory의 mode → example 0755
- path recurse account fmode dmode

> **Example**

`/etc/fix-attrs.d/01-mysql-data-dir`

```shell
/var/lib/mysql true mysql 0600 0700
```

`/etc/fix-attrs.d/02-mysql-log-dirs`

```shell
/var/log/mysql-error-logs true nobody,32768:32768 0644 2700
/var/log/mysql-general-logs true nobody,32768:32768 0644 2700
/var/log/mysql-slow-query-logs true nobody,32768:32768 0644 2700
```

## 초기화 작업 실행하기

`/etc/fix-attrs.d`에 따라 속성을 고정하는 작업을 수행한 후, `/etc/services.d`에 적힌 user에게 제공되는 서비스를 시작하기 전에, overlay는 /etc/cont-init.d 에서 발견된 모든 script를 실행시킨다.

`/etc/cont-init.d/02-confd-onetime`

```shell
#!/usr/bin/execlineb -P

with-contenv
s6-envuidgid nginx
multisubstitute
{
  import -u -D0 UID
  import -u -D0 GID
  import -u CONFD_PREFIX
  define CONFD_CHECK_CMD "/usr/sbin/nginx -t -c {{ .src }}"
}
confd --onetime --prefix="${CONFD_PREFIX}" --tmpl-uid="${UID}" --tmpl-gid="${GID}" --tmpl-src="/etc/nginx/nginx.conf.tmpl" --tmpl-dest="/etc/nginx/nginx.conf" --tmpl-check-cmd="${CONFD_CHECK_CMD}" etcd
```

## 부가적인 종료 작업 작성하기

기본적으로, /etc/services.d 에 의해 생성된 서비스는 자동적으로 재시작된다. 만약, 서비스가 container를 down 시켜야한다면, finish script를 통해서 이를 수행할 수 있다.

`/etc/services.d/myapp/finish`

```shell
#!/usr/bin/execlineb -S0

s6-svscanctl -t /var/run/s6/services
```

더 발전된 기능을 사용할 수도 있다.

`/etc/services.d/myapp/finish`

```shell
#!/usr/bin/execlineb -S1
if { s6-test ${1} -ne 0 }
if { s6-test ${1} -ne 256 }

s6-svscanctl -t /var/run/s6/services
```

## Logging

S6 overlay는 즉시 \[s6-log\](<[http://skarnet.org/software/s6/s6-log.html](http://skarnet.org/software/s6/s6-log.html)\>)를 통한 logging mechnism으로 쉽게 logging을 관리하는 방법을 제공한다.

또한, logging을 하나의 바이너리 호출로 만들 수 있도록 logutil-service라는 도움 장치를 제공한다.

이는 다음 순서에 따라 진행된다.

- s6-log가 어떻게 S6\_LOGGING\_SCRIPT에 적힌 logging script를 읽을지를 조회합니다.
- nobody user의 root 권한을 삭제한다.(만약, 존재하지 않는다면, 기본적으로 32768:32768 에게 넘겨집니다.)
- 모든 환경 변수를 지웁니다.
- s6-log를 실행함으로써 logging을 시작합니다.

> **주의사항**

- 권한이 자동적으로 삭제된 이후로, s6-setuidgid로 user를 변경할 필요가 없다.
- 둘 중 하나의 내용을 log folder에서 보장해야 한다.
  1. 존재한다면, nobody user에 의해 작성이 가능해야 한다.
  2. 존재하지 않는다면, 상위 폴더가 nobody user에 의해 작성이 가능해야 한다.

log foder는 cont-init.d script에서 또는 run script 안에서 생성하는 것이 가능하다.

### Example

> **1. cont-inid.d를 활용한 방법**

`/etc/cont-init.d/myapp-logfolder`

```shell
#!/bin/sh
mkdir -p /var/log/myapp
chown nobody:nogroup /var/log/myapp
```

> **2.  run script를 활용한 방법**

`/etc/services.d/myapp/log/run`

```shell
#!/bin/sh
# input stdin을 기반으로 하는 logging
exec logutil-service /var/log/myapp

#!/bin/sh
# fifo에 따른 log를 쌓기를 원한다면, 다음과 같이 수행하는 것도 가능하다.
exec logutil-service -f /var/run/myfifo /var/log/myapp
```

## 권한 삭제

서비스 실행이 다가오면, 실행 전에 권한을 부여하는 것은 서비스이건 logging 서비스이건 매우 중요한 작업이다. s6는 이미 이러한 작업을 위한 기능을 포함하고 있다.

> **In execline**

```shell
#!/usr/bin/execlineb -P
s6-setuidgid daemon
myservice
```

> **In sh**

```shell
#!/bin/sh
exec s6-setuidgid daemon myservice
```

만약 이러한 기능에 대하여 더 알고 싶다면, 다음 문서들을 살펴 보아라. [s6-setuidgid](http://skarnet.org/software/s6/s6-setuidgid.html),  [s6-envuidgid](http://skarnet.org/software/s6/s6-envuidgid.html), [s6-applyuidgid](http://skarnet.org/software/s6/s6-applyuidgid.html)

## Container 환경

만약 container 환경을 제공하기 위해서 직접 만든 script를 원한다면, with-contenv를 통해서 이를 수행하는 것이 가능하다.

> **/etc/cont-init.d/01-contenv-example**

```shell
#!/usr/bin/with-contenv sh
echo $MYENV
```

## Read-Only Root 파일 시스템

최근 dokcer의 버전에서 read-only 파일 시스템으로 container를 동작시키는 것을 허용하였다. 2단계 과정에서, overlay는 사용자가 제공하는 cont-init.d 의 권한을 변경하는 부가작업을 수행한다. 만약, root 파일 시스템이 read-only라면, S6\_READ\_ONLY\_ROOT=1 라는 설정을 해주어 stage 2에서 이를 알 수 있도록 해야 한다. 이를 통해서 permission을 변경하기 이전에, /var/run/s6 에 사용자의 파일을 복사하게 된다.

이는 /var 가 수정이 가능한 권한을 갖게된다는 것이고, 이는 tmpfs 라는 파일시스템에 의해서 가능하다.

→ 다음과 같이 사용하면, 수행이 가능하다.

```bash
$ docker run -e S6_READ_ONLY_ROOT=1 --read-only --tmpfs /var:rw,exec [image name]
```

> **주의사항**

만약 S6\_READ\_ONLY\_ROOT=1 를 사용할 때, fix-attrs.d, cont-init.d, cont-finish.d, services.d의 symbol link를 유의해야 한다. s6의 제한사항 때문에, 앞 선 디렉토리가 /var/run/s6에 복사되며 symbol link가 실행되어 예기치 않은 중복이 발생한다.

### **s6 동작 사용자화**

s6의 동작을 이미 정의된 환경 변수를 설정함으로써 실행단계에서 조정하는 것이 가능하다.

- S6\_KEEP\_ENV (default = 0): 만약 설정이 되면, 환경과 전체 관리 과정이 바라보는 원본 환경변수는 reset되지 않는다. 이는 with-contenv를 무의미하게 바꿔버린다.
- S6\_LOGGING (default = 0):
  - **0**: 모든 Output이 stdout/stderr로 전달된다.
  - **1**: 내부의 catch-all logger를 사용하여, 지속적으로 이것에 전송한다. 이는 /var/log/s6-uncaught-logs에 위치한다. 그래도 CMD에서는 stdout/stderr를 통해 전달한다.
  - **2**: 내부의 catch-all logger를 사용하여, 지속적으로 이것에 전송한다. 이 과정에 CMD도 포함된다. 따라서, stdout/stderr로 쓰여지는 것은 아무것도 없다.
- S6\_BEHAVIOUR\_IF\_STAGE2\_FAILS (default = 0):
  - **0**: script(fix-attrs or cont-init)에서 에러가 발생했더라도 조용하게 지속한다.
  - **1**: 에러 메세지에 대한 경고를 제공한 후에 지속한다.
  - **2**: 관리 시스템에 종료 signal을 전송하면서 종료한다.
- S6\_KILL\_FINISH\_MAXTIME (default = 5000): /etc/cont-finish.d 의 script가 종료 signal을 받을 때까지 가질 수 있는 최대 대기 시간을 의미한다. 각 script가 수행될 때마다 수행된다.
- S6\_SERVICES\_GRACETIME (default = 3000): 얼마나 s6 가 서비스가 TERM signal을 보낼 때까지 기달릴지를 의미합니다.
- S6\_KILL\_GRACETIME (default = 3000): 얼마나 s6 가 zombie를 거두는데 기다릴지를 의미합니다. 시간이 지나면 KILL signal을 전송합니다.
- S6\_LOGGING\_SCRIPT (default = "n20 s1000000 T"): 해당 변수는 어떻게 무엇을 logging할지를 결정한다. 기본적으로 ISO8601를 모든 line에 덧붙이고, 1mb에 도달하거나 20개 이상의 파일이 생성되면 rotation을 수행한다.
- S6\_CMD\_ARG0 (default = not set): 해당 환경 변수의 값은 docker에 의해 전달된 CMD 인자에 덧붙여진다. 존재하는 이미지를 s6-overlay로 변경할 때, 이전에 사용했던 ENTRYPOINT의 값을 이곳에 전달함으로써 이를 사용하는 것이 가능하다.
- S6\_FIX\_ATTRS\_HIDDEN (default = 0): 어떻게 fix-attrs.d script가 파일과 directory를 처리할지를 제어한다.
  - **0**: 숨겨진 파일과 directory를 제외한다.
  - **1**: 모든 파일과 directory를 포함한다.
- S6\_CMD\_WAIT\_FOR\_SERVICES\_MAXTIME (default = 5000): CMD 실행을 지속하기 전에 기다리는 최대 시간을 의미한다.
- S6\_READ\_ONLY\_ROOT (default = 0): read-only 파일 시스템을 사용하는 container 내부에서 동작할 때, 1로 설정하여 초기화 scripts를 권한 설정이전에 /etc에서 /var/run/s6/etc 로 복사하도록 하는 방식이다. 자세한 사항은 다음을 참조([Read-Only Root Filesystem](https://github.com/just-containers/s6-overlay#read-only-root-filesystem))
- S6\_SYNC\_DISKS (default = 0): 1로 설정하여 stage 3에서 container 종료 이전에 file 시스템의 sync를 맞추어야 함을 알린다.

### **Terminology**

- PID 1 : linux kernel에서 첫번째로 시작되어진 process에게 PID 1이 부여된다. PID 1은 다른 process들과는 달리 다음과 같은 특징일 갖는다.
  - PID 1 process가 종료된다면, 모든 다른 process는 KILL signal로 종료된다.
  - 자식 process를 가진 어떤 process라도 무슨 이유에서건 죽는다면, 자식들은 PID 1 process의 자식으로 다시 태어난다.
- Zombie process : 실행이 종료되었지만, 아직 삭제되지 않은 process를 의미합니다. 이를 실제로 유지하는 것이 일반적인데, 그 이유는 부모 process가 자식 process의 종료 상태를 파악하기 위해서이다. 이러한 데이터는 실행한 명령의 결과에 따라서 분기를 하고 싶을 때, 종료 값은 유용하게 사용된다. 이렇게 zombie 상태로 진입한 process는 부모 process가 종료되거나 wait() 계열의 함수를 이용해서 process가 정리될 대까지 남아있게 된다. 만약, 이러한 zombie process가 다수 남아 있게 된다면 시스템에도 악영향을 미칠 수 있다.
- process supervisor : 여러 process를 모니터링하고, 제어하는 program을 의미한다.
- ejabberd : Robust, Scalable and Extensible Realtime PlatformXMPP Server + MQTT Broker + SIP Service
- symbol link : soft link라고 불리기도 하며, 다른 파일을 가르키는 특별한 파일로 여길 수 있다. target 파일의 데이터를 포함하는 것이 아닌 단순히 파일 시스템의 다른 파일을 가르키고, 이를 통해 실행하는 것이 가능한 방법이다.
- nobody user: 대다수의 Unix 시스템에서, "nobody"는 전통적으로 파일을 가지지 않고, 어느 권한 그룹에도 속하지 않으며, 다른 모든 유저들이 가지는 기능을 제외하면 기능이 없는 유저를 의미한다.
