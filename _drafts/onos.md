---
slug: "onos"
title: "ONOS"
date: "2022-05-03 13:45"
category: "SDN"
tags: ["ONOS"]
thumbnailSrc: "/images/onos-logo.png"
---

해당 Posting은 해당 [wiki](https://wiki.onosproject.org/)에 기반한 내용 정리임을 밝힌다.

ONOS는 Open Network Operating System의 약자로, 이름 뜻 그대로 공공 네트워크를 위한 운영 환경을 제공하겠다는 목표를 갖고 있다. 

ONOS는 SDN(Software Defined Network)를 위한 control plane을 제공하고, 네트워크 구성요소 관리와 이웃간 네트워크 또는 종단간 연결을 위한 프로그램들을 실행시킨다.

ONOS에서 중요한 점은 Operating System처럼 특정 목표를 위해 디자인된 소프트웨어의 플랫폼(기반시스템)으로써 사용될 수 있는 환경을 제공한다는 점이다.


## 관리자 측면

ONOS는 어느 실행환경에서도 실행 가능하다. (Docker, Vargrant, Puppet, ...) 그치만, ONOS의 핵심 개발팀은 Ubuntu 16.0.4에 기반하여 개발하였다. 따라서, 이에 따라 설정하는 것이 가장 쉽고 편리하다.
또한, 앞으로 나올 설명에서 cluster 환경도 고려하기 때문에, 여러 대의 machine 중 ONOS가 설치된 장치가 target machine이 된다.

> Install

기본적으로 아래와 같은 요소는 필수적으로 확인되어야 한다.

1. Minimum Machine Spec
   - 2 core CPU
   - 2 GB RAM
   - 10 GB HDD
   - 1 NIC
2. 인터넷 연결 상태 확인
3. 사용 가능한 port 확인
   - 8181 : REST API with web GUI
   - 8101 : ONOS CLI
   - 9876 : cluster(내의 target machine)간 통신
   - 6653 : (optional) OpenFlow
   - 6640 : (optional) OVSDB
4. JAVA
   - version 8 : ~ Ubuntu 16
   - version 11 : Ubuntu 18 ~

