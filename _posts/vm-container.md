---
slug: "vm-container"
title: "VM & Container"
date: "2021-05-23 14:31"
category: "Tech"
tags: ["VirtualMachine", "Container"]
thumbnailSrc: "/images/cargo-ship.jpg"
---

## Intro

Virtual Machine과 Container는 현재의 여러 Computing 영역에서 빼놓을 수 없는 내용이 되었다. 그렇기에 이들의 발전 역사를 기반으로 하여 이들을 비교하고 정리해보도록 하겠다.

## History

Virtual Machine과 Container의 차이점을 이해하기 보다는 서사를 이해하는 것이 편할 것이다.

시작은 다음과 같다.

당신은 현재 다양한 service를 운영하고 있다. 그리고, 이를 운영하는 과정에서 가장 큰 문제를 겪게 된다.

여러 service는 매 번 다양한 요구에 의해서 상황이 바뀐다. 어느 날은 주문이 폭주해서 서버를 증설해야하고, 어느 순간에는 유지 비용이 아까워서 서버를 다시 축소시킨다.

또한, Hardware가 성능의 노후와 새로운 기기 및 시스템을 도입하고자 하는 욕구도 따른다.

> **Service 1, Service 3의 비용이 증가하면 Service 3이 영향을 받는다.**

![vm-container-1](/images/vm-container-1.jpeg)

이 과정에서 우리는 결국 하나의 machine에 하나의 service 만을 배포하게 된다. 다른 service가 과부화가 걸려서 다른 service도 같이 에러가 발생한다면, 얼마나 머리가 아프겠는가? 그런데, 여기서 공학자들이 참을 수 없는 일이 발생하는 것이다.

> **"비효율적" 자원 사용**

그래서 사람들은 선택에 기로에 빠진다. 머리가 아플정도로 고민해서, 최적의 상황을 만들어서 우리의 server를 예쁘게 만들고, 새로운 service가 나오고 기기가 추가될 때마다 이 고민을 반복하는가 아니면 그냥 하나의 machine에는 하나의 service만 넣는가?

이때, 사람들은 하나의 물리적 기기를 여러 개의 작은 기기로 나누는 것에 눈을 돌리게 된다.

그때, 떠오른 발상이 Virtual Machine이다. 물리적으로 존재하는 Machine을 이용해서 가상의 Machine을 만드는 것이다. 즉, 하나의 Machine이 이제 여러 개의 Virtual Machine이 될 수 있는 것이다.

이 발견을 통해서 사람들은 하나의 server를 여러 개의 virtual Machine으로 나누고 관리하는 것에 익숙해지며, Virtual Machine을 주류로 하는 VMware와 같은 업체가 큰 성장을 이루게 된다.

그러나, 여기서 Virtual Machine의 사용자들은 큰 고민을 갖게 된다. 바로 성능적인 Issue이다.

기존에는 Virtual Machine을 완벽하게 동작하는 OS 위에서 동작하도록 하였다. 하지만, 시간이 갈 수록 이러한 구조는 오히려 큰 비용을 유발했다.

이에 따라서 다양한 가상화 방법들이 연구되게 된다. 그렇게 나온 것이 지금까지는 3가지의 큰 흐름으로 이해할 수 있다.

![vm-container-2](/images/vm-container-2.jpeg)

> **1. Host 기반의 가상화**

우리가 앞서 봤던 사례들과 같이 기존에 Host가 존재하고, 거기에서 Virutalize SW를 이용하여, 가상화된 장치를 만들어서 사용하는 방식이다.

> **2. Hypervisor 기반의 가상화**

Host Machine을 배제하고, Host의 OS를 없애고, Hypervisor를 기반으로 여러 OS를 능동적으로 처리할 수 있는 형태로 구성한 것이다.

- 종류
  - 전가상화 : 전가상화란 전체 Hardware를 모두 가상화하는 방식으로 Hypervisor가 각 OS로 부터 오는 요청을 모두 사용하는 Hardware에 맞게 번역하는 기능을 수행한다.
  - 반가상화 : OS에서 자신의 명령어를 표준화된 형태로 전달합니다. 이를 수행하게 되면, Hypervisor에서 수행하는 동작의 비용을 크게 줄일 수 있습니다. 하지만, 이 경우에는 OS 자체를 수정해야 하기 때문에 큰 비용이 발생합니다.

> **3. Container 기반의 가상화**

Container 는 guest OS를 구현하지 않습니다. 각 Container에서 발생하는 OS 요청을 Host OS를 공유함으로서 수행합니다. 추가적인 기능은 Container 내부로 위임하여 훨씬 더 가볍고 이식성이 좋은 형태의 가상화가 가능합니다.

## Simulator vs Emulator

여러가지 이야기가 simulator와 emulator 사이에서 존재한다. 예를들어, high level로 작성하는 것이 simulator고 low level로 작성하는 것이 emulator라는 이런 말이다. 하지만, 이는 각 경우를 구현하는 과정에서 발생하는 특징이지 정의가 되지는 않는다.

Simulator는 특정 목적에 따라 기능을 수행할 수 있도록 임의로 구현하는 것을 의미한다. 즉, 완벽하게 동일할 필요는 없이 원하는 특징을 뽑아내는 것이 중요한 것이다. 반면에, Emulator는 완전 동일한 기기를 software로 구현하는 것을 말한다. 그 과정에서 Emulator는 Smulator보다 무거워질 수 밖에 없고, 그렇기에 low level language에 손이 가게 되고, 느려지게 된다.

이해가 어렵다면, 오락실 게임을 PC에서 하고, 동물의 숲 닌텐도 게임을 핸드폰으로 하는 불법적인 일도 해본 적이 있을 수 있다. 이는 가상으로 해당 기기를 구현하고, 이를 다른 기기에서 구동하는 것의 예이다.

## Reference

- [🔗 가상화 각 각을 비교](https://tech.cloud.nongshim.co.kr/2018/09/18/%EA%B0%80%EC%83%81%ED%99%94%EC%9D%98-%EC%A2%85%EB%A5%983%EA%B0%80%EC%A7%80/)
- Thumbnail: Photo by [william william](https://unsplash.com/@william07?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/cargo-ship?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
