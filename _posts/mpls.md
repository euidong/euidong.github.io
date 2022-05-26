---
slug: "mpls"
title: "MPLS"
date: "2022-05-22 15:25"
category: "Network"
tags: ["Routing"]
thumbnailSrc: "/images/routing.jpg"
---

### References

- Thumbnail : Photo by [Tyler Farmer](https://unsplash.com/@tylerfarmer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/forwarding?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- <https://www.itworld.co.kr/tags/6580/MPLS/108621>
- <https://blog.naver.com/thorong/70147777745>

---

기존의 Routing에서는 매 hop(router)당 Routing Table을 참조하여 packet을 전송했다. 하지만, 이 과정은 생각보다 많은 시간이 필요하다. 이를 이용해서 화상 통화 등을 한다면, 서비스 품질이 매우 떨어질 위험이 있다. 따라서, MPLS는 Routing를 더 빠르게 하고, 품질 항상을 위해서 만들어졌다. 이는 Multi-Protocol Label Switching(MPLS)이라는 말처럼, 기존의 IP를 이용한 Routing이 아닌 Label(또는 tag)이라는 별도의 data를 이용하여, 3계층을 거치지 않고, Routing을 고속화하는 역할을 할 수 있다.

또한, **MPLS**에서는 사전에 고효율 경로를 설정하고, 이를 통해서 통신하도록 하여 성능 문제를 해결한다. 예를 들어, Packet이 들어오면, 진입점에 있는 Router(Ingress Router)가 해당 Packet에 Label을 표기하고 내부 Network로 전송하게 된다. 이제 내부 Router에서는 Packet을 모두 확인하지 않고, 해당 Label만을 이용하여 Forwarding을 수행한다. 그렇기에 더 빠른 Routing이 가능해지는 것이다.

하지만, 그 외에도 추가로 더 많은 장점을 보유하고 있다.

1. 여러 Protocol과 호환이 가능하도록 overlay로 개발되었다. (2.5 Layer라고도 불리는 이유이다.)
2. TE(Traffic Engineering)를 위한 여러 설정을 제공한다. 따라서, bandwidth, QoS(서비스 품질)에 따라서 Traffic을 제어하는 것이 가능하다.

## 용어

- MPLS Network : **MPLS**를 통해서 구축한 Network를 의미한다. 해당 Network로 진입하는 순간 Packet에는 Label과 부가적인 header가 추가된다.
- Label : Label은 각 Router에게 하나씩 주어지는 Router의 고유 식별값이다.
- LER(Label Edge Router) : Network 제공자 입장에서 Edge Router로 두 가지 종류로 나뉜다.  
  Ingress와 Egress는 항상 고정인 것이 아니라 packet에 입장에서 계속해서 변경된다.
  - Ingress Router: packet이 Network로 진입하는 Router로 실제 Network를 전체 조회하고, Label을 추가하는 역할을 한다.
  - Egress Router : packet이 Network를 탈출하는 Router로 Packet의 남아있는 Label을 삭제한다.
- LSR(Label Switched Router) : MPLS Network 내부에 존재하는 LER이 아닌 Router들로 이들은 Packet의 Label을 Switching하고, Forwarding하는 역할을 수행한다.

## 동작 원리

`LSP(Label Switched Path)라는 최단 경로를 찾고, 이를 통해서 Packet을 전달시킨다.`가 Protocol의 핵심적인 전략이다. 형성된 LSP에 따라서 labe들을 설정해두면, 이제 내부 Router에서는 자신에게 해당하는 Label을 교환하여 다시 Forwarding을 수행하면 되는 것이다. 따라서, 3계층을 거치지 않고 Routing이 가능하다. 위에서 나온 용어로 정리하자면, Ingress LER에서는 packet의 목적지와 요청지 정보 등을 활용하여 LSP을 구성하고, 이에 알맞는 Label을 packet에 추가한다. 이제 이 packet을 받은 LSR에서는 Label을 하나 빼고, 다음 LSR을 찾아가기를 반복하며, egress LER에 도달한다. egress에서는 Label이 남아있다면, 모두 제거하고, 원래 사용 중이던 Protocol에 맞게 다시 Routing을 수행한다.

### LSP 구성

총 3가지 방법을 통해서 생성이 가능하다. 이는 후에 나올 Configuration에 따라서 어느정도 바뀌게 된다.

1. Best Effort LSP : Label 할당이 알고리즘에 의해서 자동적으로 할당되며, 항상 연결이 지속될 수 있도록 하는 것을 최대 목표로 하기 때문에 여타 방식들에 비해 성능이 떨어질 수도 있지만, 장애 대응에 적절하다고 할 수 있다.
2. Static LSP : Label을 직접 수작업을 통해서 할당해주며, 경로를 customizing할 수 있지만, 이로 인해서 예상치 못한 문제가 발생할 수도 있다.
3. Signaled LSP : 일정 이상의 자원(Bandwidth, 등)을 제한하여 경로를 최적화할 수 있다.

### Configuration

MPLS network를 구성하기 위해서는 결국 각 Router에 Label을 나누어주는 것과 LSP를 구성하는 것이 중요하다. 아래에는 대표적인 MPLS의 Topology를 살펴본다.

- LDP : 위에서 설명한 Best Effort LSP를 구성하는 Protocol로 Label을 분배하고, 각 Router에서는 Label의 Push/POP/Swap을 수행한다.
- RSVP-TE : 특정 제약 조건을 먼저 제시를 하고, 이를 기반으로 이와 일치하는 경로를 찾아서 packet을 Routing하는 방식이다.

## Versus

| 구분                   | ATM       | IP        | MPLS      |
| :--------------------- | :-------- | :-------- | :-------- |
| IP Traffic Engineering | 우수      | 보통      | 매우 우수 |
| 고속 포워딩            | 매우 우수 | 보통      | 우수/보통 |
| QoS                    | 매우 우수 | 보통      | 우수      |
| VPN 비용               | 고가      | 저가      | 중가      |
| 확장성                 | 우수      | 매우 우수 | 매우 우수 |
| 구축 / 유지 비용       | 매우 고가 | 저가      | 고가      |
