---
slug: "docker-network-1"
title: "[Docker] Network(1)"
date: "2021-07-10 21:21"
category: "Tech"
tags: ["Docker", "Container", "Network"]
thumbnailSrc: "/images/docker-picture.jpg"
---

## Intro

Docker Swarm을 docker stack을 이용하여 실행시키게 된다면, 무엇이 생성되는가? 우리는 서비스가 생성되기도 전에 network가 생성되는 것을 볼 수가 있다. container와 container간 그리고, host를 통해 외부 internet환경에 container를 연결 시키는 모든 과정을 알아보자.

Docker를 사용하다보면, host와 통신을 위해 외부로 port를 열어주는 것과 container 간의 통신을 헷갈려 하는 사람들이 생각보다 많은 것 같다. 심지어는 container간 통신을 위해서 localhost로 정보를 주고받을려고 하는 몹쓸 시도를 하는 관경도 몇몇 봐왔다.

따라서, 우리는 한 번 Docker의 network에 대해서 한 번 공부해보는 것이 좋을 것이다.

해당 차시에서는 우선 전체적인 docker network를 설명하는 기본적인 키워드를 알아볼 것이고,

2 차시에서는 주로 사용되는 docker network driver를 알아볼 것이고,

3 차시에서는 libnetwork의 핵심 기능 중 service discovery, load balancing에 대해서 알아보겠다.

## Docker Networking Base

우리가 기억해야 할 것은 CNM, libnetwork, Driver 이렇게 3가지다. 각 각이 무엇인지는 차례차례 알아보자.

### Container Network Model (CNM)

container간의 network를 구현하기 위한 design을 제시한 내용입니다. 따라서, idea일 뿐입니다. 자세한 내용은 하위 링크를 통해서 확인 가능합니다.

[🔗 Github - moby/libnetwork](https://github.com/moby/libnetwork/blob/master/docs/design.md)

하지만, 이를 좀 더 요약해봅시다. 일단 핵심 요소 3가지를 먼저 이해해봅시다.

- **Sandbox** : 고립된 하나의 Network 공간을 의미합니다. 해당 공간에는 ehternet interface나 port 그리고 routing table같은 구현이 포함됩니다.
- **Endpoints** : Virtual Network를 서로 연결하는 interface의 역할입니다. (veth라고도 불립니다.) CNM에서는 Sandbox 내부에서 이와 Network를 연결하는 역할을 합니다.
- **Networks** : Virtual Switch로 여기면 됩니다. 이를 통해서 여러 개의 endpoints를 연결할 수 있습니다.

자 이제 이렇게 3개의 네트워크를 정리하면, 이제 Container 내부에 Sandbox가 존재하고, 그 Sandbox 내부의 endpoints를 연결하는 Network를 통해서 결론적으로 Container 간의 연결을 수행하게 됩니다.

![cnm](/images/cnm.jpeg)

### libnetwork

위에서 이야기한 것처럼 CNM은 단순히 idea일 뿐입니다. 이를 구현허여 표준화된 것이 바로 libnetwork라고 생각하면 됩니다. 이는 Go를 이용하여 작성된 open source로 위에서 제시한 링크를 통해서 해당 open source에 접근할 수 있습니다. 위에서 언급한 CNM을 구현하였고, 추가적으로 service discovery, ingress-based container load balancing, network control plane 및 management plane 기능을 구현하였다. 현재에는 docker에서 network 구현에 사용된다.

\* control & management plane : 직접적으로 network의 흐름을 제어하는 단계로, routing과 같은 제어를 수행한다.

### Drivers

즉, libnetwork가 전체적인 network의 control plane과 management plane 기능을 구현하였다면, driver는 data plane을 구현한다. 즉, 직접적으로 데이터를 전달하는 역할을 수행한다. 이러한 기능들은 docker에서 여러 개의 driver라는 submodule을 통해서 구현하였다. docker pub를 통해서 default보다 나아간 driver 역시 설치가 가능하다. 하지만 기본적으로, host, bridge, overlay, ipvlan, macvlan 등을 포함하고 있다.

여기까지가 docker network에 대한 overview이다. 다음 차시에 계속...

## Reference

- [🔗 Docker Deep Dive](https://www.oreilly.com/library/view/docker-deep-dive/9781800565135/), Nigel Poulton
- Tumbnail : Photo by [Michael](https://unsplash.com/@michael75?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/cargo-ships?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
