---
slug: "segment-routing"
title: "Segment Routing"
date: "2022-05-23 10:41"
category: "Network"
tags: ["Routing"]
thumbnailSrc: "/images/forwarding.jpg"
---

## Intro

Segment Routing은 MPLS의 차세대 버전으로, 초기에는 MPLS의 문제를 해결하기 위해서 제시되었다. 예를들면, TE(Traffic Engineering) 시에 Star Topology에서는 효율이 안나온다던지 ECMP(Traffic을 여러 output interface로 분배시키는 방식)을 활용할 수 없다와 같은 제한을 해결하고자 등장하였다. 그렇지만, 현재에 와서 와서 더 중요시 여겨지는 것은 **네트워크 구조의 단순화**이다. 즉, 기존의 복잡하던 Switch의 설정 방법(통신장비 vender 마다 다른 설정법, 여러 Protocold이 존재)과 운용 방법을 통일하고, 단순화 시킴으로써 사람에 의한 에러(Human Error)를 최소화하고자 하는 노력이라고 볼 수 있다.

## 용어

- **Segment** : 하나의 path가 여러 개의 작은 path들로 구성되는 것에서 유래하였다고 보며, 하나의 명령어(instruction)을 segment라고도 부른다. 명령어는 어디로 전달할 것인가와 packet을 어떻게 변형할 것인가에 대한 내용을 포함한다.  
  Segment는 SID라는 id값을 통해서 구분하며, 이는 [0, 1,048,575] 까지를 사용할 수 있다. 특별한 목적을 가지는 [0, 15,000) 예약된 SID이고, [15,000 ~ 16,000)는 인접한 egress Router를 가르키는데 사용하는 `Adjacency SID`이고, [16,000, 24,000)는 Segment Routing이 유효한 범위 내에서 각 Router에 임의 설정이 가능한 영역대로 `Prefix SID` 라고 부른다. 그 외에 영역은 동적으로 할당되는 SID로 자동 할당 시에 사용된다. 여기서 중요한 점은 **Adjacency SID와 Prefix SID만 있으면, 모든 경로를 표현하는 것이 가능하다는 것이다.** 추가적으로, SR Policy를 재사용하고 싶은 경우가 발생할 수 있는데 이를 위해서 SR Policy 자체에 SID를 부여하는 것이 BSID(Binding SID)이다.  
  ![SID-table](/images/sid-table.jpeg)
- **Headend Router** : Segment Routing 영역으로 들어오는 Ingress Router이다.

## 동작 원리

Segment Routing 영역으로 Packet이 진입하면, 해당 packet의 Destination과 부가 정보를 확인하여, SR Policy(=Segment List, 방문해야할 경로를 순서대로 나열해놓은 리스트)를 MPLS 또는 IPv6의 부가 공간에 삽입한다. 이때에는 Stack 형태로 List를 구성하고, 중간 Router들에서는 Segment에 따라서 동작을 수행하며, packet을 최종 Egress Router까지 전달한다. 여기서 각 경로는 모든 세세한 경로를 표시할 필요는 없다. 만약 A에서 B로 가는 SID를 설정했어도, 그 내부에서 어떤 경로를 선택할지는 System적으로 알아서 Routing하도록 설정하는 것도 가능하다.(`Loose Source Routing`) Ingress에서 SR Policy를 지정하면 이를 `Push`라고 하고, 내부 Router는 가장 아래 Segment를 확인하고 자신과 관련 있는 경우에는 `Pop`을 수행하여 하나의 Segment를 삭제 후 이에 따라 동작을 수행하고, 그렇지 않으면 연결된 Link로 기존 BGP에 따라 알아서 Routing을 수행한다. 이를 `Continue`라고 한다.

## Usecase

다음과 같은 형태로 Routing을 설정하는 것이다. 아래 예시에서는 모두 1 -> 2 -> 3 -> 4 순으로 Routing을 수행하기를 원한다고 생각하자.

`SID 16002`의 경우에는 `1 -> 2`로 이동하는 것이 `1 -> 4 -> 3 -> 2` 보다 IGP cost가 적으므로, `1 -> 2`로 원하는대로 이동할 것이라고 예상할 수 있다.
이후 `SID 16004`의 경우에도 `2 -> 3 -> 4`로 이동하는 것이 `2 -> 1 -> 4`로 이동하는 것보다 IGP cost가 적으므로, `2 -> 3 -> 4`로 원하는대로 이동하는 것을 예상할 수 있다.

![sr example 1](/images/sr-example-1.jpeg)

하지만, IGP cost가 우리의 바램과는 다른 경우에는 다음과 같은 현상이 발생할 수도 있다.
아래에서 `SID 16004`를 보면, `2 -> 1 -> 4`가 `2 -> 3 -> 4`보다 IGP cost가 적기 때문에 우리가 원하는 방향과는 반대로 동작할 것임을 예상할 수 있다. 따라서, 이를 해결하기 위해서 우리는 다음과 같은 경로를 채택해야 한다.

![sr example 2](/images/sr-example-2.jpeg)

여기서는 `1 -> 2 -> 3`이 `1 -> 4 -> 3`보다 크기 때문에 원하는대로 `1 -> 2 -> 3`으로 움직일 것이다. 하지만, 여기서 `3 -> 4`로 가는 경로가 어려울 수 있다. 이 경우에는 앞 서 보았던 Adjacency SID를 활용하여야 한다. 이는 마지막으로 가야할 egress Router를 지정하기 때문에 routing 시에 costing을 고려하지 않고, 바로 Static Routing이 가능하다. 따라서, 이를 활용하면 최종으로 `3 -> 4`로 가는 경로를 획득하는 것이 가능하다.

![sr example 3](/images/sr-example-3.jpeg)

## Configuration

- SR-MPLS : MPLS와 같은 방식을 추구하지만, 설정 방식에서 LDP와 RSVP를 사용하지 않고 IGP를 활용해서 이를 수행할 수 있도록 하여 Protocol을 단순화하였다.  
  Segment List(`SR Policy`)를 전달하는 과정이 MPLS의 Label을 전달하는 방식과 유사하며, 지나야하는 경로를 명시하여 stack 형태로 쌓아서 전달하면, 각 내부 Router는 이를 참고하여 제거 또는 유지하며, Egress Router를 찾는다.
- SRv6 : IGP와 IPv6 Protocol만을 활용하여 네트워크를 구성할 수 있도록 하는 것이 목표이다. 네트워크 자체를 프로그래밍 하고자 하는 요구 때문에 필요성이 강조되었다. 이는 IPv6의 주소값인 128bit를 topology를 식별할 주소값과 packet 처리를 위한 값(특정 packet에게는 다른 routing table을 적용 등)으로 나누어 사용함으로써 구현이 가능하다. 따라서, IPv4의 짧은 주소 체계로는 이를 수행할 수 없다. 따라서, IPv6 Protocol을 이용하여 수행하는 것이다.  
  Segment List(`SR Policy`)를 전달하는 과정은 위와 유사하지만, 이를 IPv6 Option 영역에 stack형태로 저장한다.

## Traffic Engineering

Traffic을 제어하고, 해당 제어를 위한 제한사항들을 실시간으로 update하고, 운용 관리하는 것이 가능하다. MPLS에서 수행하던 TE(Traffic Engineering)과 유사하지만, Bandwidth를 사용하지 않는 대신에 delay라는 조건을 갖고 있다. 이는 packet이 도착하는데 걸리는 시간을 측정한 값이다.  
해당 조건들을 활용하여 Traffic을 입맛에 맞게 변경하는 것이 가능하다.

또한, 장애 대책 시에도 Segment Routing은 강점을 가지고 있다. 일반적인 OSPF를 활용하는 경우에는 LFA(Loop Free Alternate)를 통해서 우회 경로를 계산한다. 하지만, 이는 생각보다 비효율적인 경로 계산을 수행하게 된다. 따라서, 이를 개선하는데 Segment Routing이 적절하다. 다음 예시를 보자.

[그림]

장애 이전에 `1 -> 2 -> 3 -> 5` 그리고 `6 -> 2 -> 3 -> 5` 라는 traffic이 존재할 때, 만약 `2 -> 3` link가 끊어지면, 기존의 LFA를 이용하면 찾게 되는 경로는 다음 경로와 같아진다.

![sr post convergence 1](/images/sr-post-convergence-1.jpeg)

이는 상당히 비효율적인 경로인데, 이렇게 계산을 수행하는 이유는 `1 -> 2 -> 6 -> 7 -> 3 -> 5` 라는 차선 경로로 가는 도중에 `2 -> 6`으로 이동 이후에 기존 Traffic에 영향으로 인해 `6 -> 2`로 다시 돌아오는 현상이 발생하기 때문이다. 따라서, 결론상 더 큰 비용이 발생하는 경로(`2 -> 4`)로 들어가서 오히려 더 많은 비용이 발생하게 된다.

![sr post convergence 2](/images/sr-post-convergence-2.jpeg)

이를 해결하기 위해서는 장애가 발생한 이후에 다시 IGP가 계산하는 최단 경로인 `Post-Convergence Path`를 사용하면 된다. 하지만, 해당 경로는 Loop를 야기할 가능성이 존재한다. 이로 인해, 해당 방식을 사용하지 않았었는데, Segment Routing을 이용하여 경로를 제한함으로써 Post Convergence Path를 사용할 수 있게 되었다. 즉, Segment Routing의 Adjacency SID를 이용해서 나가야할 지점을 명확하게 하며, Loop가 발생할 수 있는 지점에서 Static Routing을 지정하면서, Prefix SID를 통해서 경로를 적절히 지정하여 해결이 가능한 것이다.

![sr post convergence 3](/images/sr-post-convergence-3.jpeg)

## Programmable

Segment Routing의 또 하나의 강점은 SDN 지향적인 구조라는 것이다. 즉, 중앙에서 각 Switch의 동작을 제어하는 Controller를 Segment Routing을 통해서 직접 구현이 가능하다는 것이다. 즉, Segment Routing Network가 특정 Controller에게 자신의 상태 정보 등을 주기적으로 보내면, Controller에서는 이를 이용해서 Database를 구축하고, 이를 바탕으로 Routing Table을 완성하는 것이다. 이를 기반으로, 후에 요청이 Headend 장치로 들어오면, 해당 장치는 Controller에게 처리를 요청하고, 이에 대한 응답을 받은 Headend 장비는 적절하게 SR Policy를 해당 packet에 저장하여 Routing이 가능해지는 것이다.

## Summary

|                   | MPLS                                                               | SR-MPLS                  | SRv6                 | Segment Routing의 장점                                                            |
| :---------------- | :----------------------------------------------------------------- | :----------------------- | :------------------- | :-------------------------------------------------------------------------------- |
| 제어 프로토콜     | 기반 : IGP/BGP, 추가 : LDP/RSVP-TE                                 | IGP/BGP                  | IGP/BGP              | LDP/RSVP-TE 와 같은 추가 Protocol이 없음                                          |
| 데이터 평면       | MPLS 데이터 평면을 정의해서 사용                                   | MPLS 데이터 평면을 활용  | IPv6를 활용          | IPv6를 활용한 경우 추가적인 설정이 필요없음                                       |
| 경로 계산 및 조정 | 사실 Ingress에서 설정하지만 각 노드가 관여                         | Source(Ingress)에서 결정 | 동일                 | Source Routing으로 명확한 구조                                                    |
| LSP의 Label 관리  | LSP의 갯수가 많아질 수록 각 노드의 부담 증가                       | 인접 노드, 링크만 관리   | 동일                 | 내부 Router의 부담이 크게 감소                                                    |
| Operation         | Push, Swap, Pop                                                    | Push, Next, Continue     | 동일                 | Swap 연산이 필요없다.                                                             |
| 장애 대책         | Fast ReRoute                                                       | TI-LFA, Fast ReRoute     | 동일                 | Fast ReRoute는 convergence time이 길어 실용 사례가 적다.                          |
| Programmability   | 불가능                                                             | 불가능                   | Network Programmable | IPv6를 이용한다면, Traffic Engineering, VPN을 Programming을 통해 구현이 가능하다. |
| 네트워크 확장성   | 일반적으로는 높다. 하지만, RSVP-TE를 활용하는 경우 낮아질 수 있다. | 확장성이 높다.           | 동일                 | 확장성이 높다.                                                                    |
| 네트워크 구조     | 일반적인 분산 제어 구조                                            | SDN 적용이 가능          | 동일                 | SDN 기반의 중앙집중 제어와 기존 방식으로 분산 제어도 가능함                       |

## Reference

- Thumbnail: Photo by [Arno Senoner](https://unsplash.com/@arnosenoner?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/forwarding?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
