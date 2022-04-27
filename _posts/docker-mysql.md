---
slug: "docker-mysql"
title: "Docker Mysql"
date: "2020-04-11 12:00"
category: "Docker"
tags: ["virtualEnv", "mysql"]
thumbnailSrc: "/images/hero.png"
---
# Mysql

Mysql is a basic Database to store countless data. It is RDMS(This think that Relation is very very very important than any other things). You can Read, Create, Update, Delete data with it faster, managable (like transaction) than FileSystem.
It is manage by Oracle. And It can get good performance in read.

Espectially 5.7 version is stable version. So industry use this version for development or test.

![why-use-5.7](/images/why-use-5.7.png)

If you want get more information [click this](https://mysql.com)

# Docker

Docker is a virtualization application.
It is usally show more performance than any other virtualization machine program.
Becase It use container.
So, It can make more efficient feature.
If you want get database running in Linux then you just build and run container that has database with Linux.
When you anymore need taht database, you just delete that container.
It's so simple, clear. Let's enjoy.

If you want get more information [click this](https://www.docker.com/)

### Install

Following That
https://www.docker.com/get-started

# Mysql with Docker

### Just Run script.

```bash
sudo docker run \ # run container
 -e MYSQL_ROOT_PASSWORD=qwe123 \ # setting MYSQL_ROOT_PASSWORD
 -e MYSQL_DATABASE=just \ # default database name
 -e TZ=Asia/Seoul \ # setting Timezone
 -p 3309:3306 \ # setting port (my Pc port:container port)
 mysql:5.7 \ # image name
 --character-set-server=utf8 \ # setting utf8
 --collation-server=utf8_unicode_ci # setting utf8
```

### With compose file

docker-compose.yml

```yml
version: "3.7"
services:
  # Mysql Server
  db:
    image: mysql:5.7
    # mysql utf-8 설정
    command:
      - --character-set-server=utf8
      - --collation-server=utf8_unicode_ci
    # db password 및 db 자동 생성
    environment:
      MYSQL_ROOT_PASSWORD: "qwe123"
      MYSQL_DATABASE: "just"
      MYSQL_TCP_PORT: "3306"
      TZ: "Asia/Seoul"
    ports:
      - "3309:3306"
    # for db data backUp
    volumes:
      - ./mysql/data:/var/lib/mysql
```

```bash
docker-compose up --build
```

more information => https://docs.docker.com/get-started/

more infomation => https://docs.docker.com/compose/