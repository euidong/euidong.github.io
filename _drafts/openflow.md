---
slug: "openflow"
title: "OpenFlow"
date: "2022-05-25 14:27"
category: "Network"
tags: ["SDN", "ONF", "Virtual Network"]
thumbnailSrc: "/images/switch-with-cable.jpg"
---

## Reference

- [Openflow specification](https://opennetworking.org/wp-content/uploads/2013/04/openflow-spec-v1.3.1.pdf), ONF, 2012
- Thumbnail: Photo by [Jordan Harrison](https://unsplash.com/@jordanharrison?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/network?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

이전 Posting인 SDN의 본격적인 시작이 OpenFlow라고 보아도 무방하다. OpenFlow는 2007년 Stanford 대학에서 개발이 시작되었고, 지금도 de facto standard(사실상의 표준)으로 받아들여지고 있는 Protocol이다. 해당 Protocol의 핵심은 기존 Switch/Router를 data plane(데이터 평면)과 control plane(제어 평면)으로 나누고, 제어 평면을 OpenFlow Protocol에 따르는 Controler로 대체하면서, OpenFlow Protocol을 따르는 Switch는 data plane만을 포함하여, 둘 간의 통신을 통해서 제어 평면을 구성하자는 것이다. 여기서 데이터 평면은 실제로 interface로 packet이 들어오고, 내보내는 역할을 하는 계층이라고 보면 되고, 제어 평면은 packet에 어떤 동작을 수행시킬지 그리고 어느 interface로 내보낼지를 결정하는 역할을 하는 계층이라고 보면 된다. 이러한 구성을 통해서, 결국 SDN을 구축할 수 있는 토대를 제공하게 된 것이다.

따라서, OpenFlow Switch는 다음과 같은 형태로 구성되어진다.

[OpenFlow Switch 내부 모습 그림 삽입]

## OpenFlow Protocol

해당 사항은 reference에 기반한 version 1.3.1의 기능을 요약한 내용이다.

기본적으로 OpenFlow Protocol을 지원하는 Switch의 구조부터 알아보아야 한다. Switch는 기본적으로 외부와 연결이 가능한 Port, Routing을 위한 여러 개의 Table, 그리고 Controller와의 의사소통을 위한 Channel을 가진다. 각 요소의 역할을 간략히 하나하나 알아보도록 하자.

> **1. Port**

OpenFlow에서 packet이 Switch로 왔다갔다하는 통로라고 볼 수 있다. 대게 Switch를 가르키거나 packet의 진입 위치를 식별할 때 사용된다. 이는 실제로 존재하는 것이 아닌 추상화된 개념으로, 총 3가지의 Port를 통해서 Switch를 가르킬 수 있다. 각 Switch는 여러 개의 Port를 가지고 이를 통해서 다른 Switch들과도 연결되어진다.

- Physical Port : 실제 Switch의 interface와 일대일로 대응되는 가상 Port이다. 즉, 해당 interface로 packet이 들어왔다면, OpenFlow에서는 이와 대응되는 port로 packet이 들어왔다고 판단한다.
- Logical Port : OpenFlow를 쓰지 않고, Switch 자체적으로 정의한 Tunnel과 Loopback과 같은 가상 Port이다.
- Reserved Port : OpenFlow Protocol에 의해서 정의된 Port이다. 이를 통해서, Controller, All, Table의 맨 처음, IN_PORT 등을 쉽게 가르킬 수 있다.

> **2. Table**

Switch는 여러 개의 Table을 가지고 있다. Table을 통해서 Switch는 Routing을 수행하는 것은 기본적인 Switch의 동작과 동일하다. Switch의 특정 Port로 packet이 들어왔을 때, packet의 목적지와 진입한 Port, 그 외에 metadata에 기반하여 matching을 수행하여 일치하는 대상을 찾아서, 해당 Table에 기술된 동작을 수행하는 것이다. 대게 무슨 동작을 수행할 것인가에 따라서 종류가 나뉘어지며, v1.3.1에는 총 3가지의 종류가 존재한다.

1. Flow Table : 대게 어떻게 Packet을 어느 Port로 Routing할 것인가를 다룬다. 뿐만 아니라 Packet의 Header를 변경하거나 MPLS Label과 같은 추가 정보를 더하는 등의 동작을 수행할 수 있다. (각 Switch는 하나 이상의 Flow Table을 소유한다.)
2. Group Table : 패턴과 일치하는 packet에 대해서 여러 동작을 수행하게 하거나 상황에 따라 다르게 적용하도록 하기 위해서 사용할 수 있다. (각 Switch는 1개 이하의 Group Table을 소유한다.)
3. Meter Table : packet의 빈도(rate) 조절과 측정을 수행할 수 있다. (Meter Table은 Controller에 의해서 관리된다.)

> **3. OpenFlow Channel**

OpenFlow Switch 내부에서 Controller를 연결하는 Interface로 Switch의 상태를 Controller에게 알리거나 Controller로 부터 변경사항을 전달 받기 위한 통신 채널이다.

---

이렇게 이루어진 OpenFlow Switch들은 서로 연결되어 있으며, 하나 또는 여러 Controller와 각 각 연결되어 있다. Controller는 각 OpenFlow Switch로 부터 상태 정보와 인접 Switch 정보 등을 전달받아서 내부적으로 Flow Table을 구축한다. 그리고, Controller에서 중앙 통제를 통해서 전체 네트워크를 관리할 수 있는 것이다. 이를 수행할 때에는 Controller에서 각 Switch의 Table을 지정함으로써 구현이 가능하다. 그렇다면, Switch에 Table을 설치하였을 때, 어떻게 Packet을 처리하는지에 대해서 알아보자.

### Pipeline

Switch 내부에는 여러 개의 Table이 존재하는데, Packet이 Switch의 특정 Port로 들어오면, 먼저 Flow Table을 거치게 된다. Switch 내부의 여러 Flow Table 중에서 index($\ge 0$)가 작은 값부터 시작하여 Flow Table에서 일치하는 pattern의 Flow Entry를 찾게 된다(Flow Table의 하나의 열). 해당 Entry에 적힌 Instruction에 따라 action을 바로 수행하거나 Action Set에 추가한 후에 다으 Table 또는 Port를 통해서 다음 Switch로 이동하게 된다.

## 표준화 현황

| version | 발표일  | 주요 기능 추가                                  | 기관                |
| :------ | :------ | :---------------------------------------------- | :------------------ |
| OF 1.0  | 2009.12 | MAC, IPv4, Single Table                         | OpenFlow Consortium |
| OF 1.1  | 2011.2  | MPLS/tunnel, Pipeline(Multi Table), Group Table | OpenFlow Consortium |
| OF 1.2  | 2011.12 | IPv6, Of-Config, 다중 Controller 지원           | ONF                 |
| OF 1.3  | 2012.9  | Meter Table(QoS), Controller 별Event Filtering  | ONF                 |
| OF 1.4  | 2013.10 | Optical port monitoring, Flow 삭제 원인         | ONF                 |
| OF 1.5  | 2014.12 | Egress Table 추가                               | ONF                 |

현재에는 OpenFlow 표준화는 중단된 상태이다. 모든 요구사항을 받아들이다보니 match field의 크기가 너무나 커졌기 때문이다. 따라서, 이용자의 요구에 따라서 programming 할 수 있는 환경을 제공하기 위한 P4(Programmable Protocol-Independent Packet Protocol)을 제작하였다.

즉, 기존에는 Protocol과 이를 지원하는 Switch를 주요 서비스로 삼았다면, 이제는 Programming이 가능한 언어와 이를 이용할 수 있는 Switch를 제공하는 방향으로 전환하였다.
