---
slug: "docker-network-3"
title: "[Docker] Network(3)"
date: "2021-07-11 00:40"
category: "Tech"
tags: ["Docker", "Container", "Network"]
thumbnailSrc: "/images/docker-picture.jpg"
---

## Reference

- [🔗 Docker Deep Dive](https://www.oreilly.com/library/view/docker-deep-dive/9781800565135/), Nigel Poulton

## Intro

여태까지 docker의 driver를 통한 networking 기술을 알아보았고, 이제 libnetwork로 1/3에서 제시했던 기본 routing과 같은 기능 외에 구현되어 있는 기능들에 대해서 알아봅니다.

- service discovery
- load balancing

### Service discovery

모든 container들과 swarm의 서비스들이 이름을 통해서 각 각을 찾을 수 있도록 하는 것이다. Docker는 자체적으로 내부의 DNS 서버를 이용하여 이를 수행한다. 과정을 요약하자면 다음과 같다.

1. container가 이름을 통해서 특정 container를 찾아야 함을 인식한다.
2. 먼저 Local 내부에서 이에 대한 정보를 갖고 있는지를 탐색한다. -> 있다면, 종료
3. Docker DNS server에 이를 요청하는 query를 전송한다.
4. Docker DNS server는 모든 container의 name과 network alias(별칭)를 알기 때문에 이를 찾을 수 있다.
5. 이때, DNS server는 먼저 동일한 network에 해당 container가 존재하는지를 확인한다. -> 없다면, 외부 DNS server로
6. 존재한다면, 이를 요청을 보낸 resolver에게 전달하고, 이게 다시 container로 전달된다.

### Load balancing

docker swarm은 기본적인 load balancer를 지원하여, 아래 그림과 같이 구현되어진다.

```bash
$ docker service create \
  --name my-web \
  --publish published=8080,target=80 \
  --replicas 2 \
  nginx
```

![docker-ingress-network](/images/docker-ingress-network.png)

즉, 어디로 요청을 보낸다고, 할지라도 load balancer는 어디에 해당 서비스가 존재하는지를 파악하고, 이를 전달하는 것이 가능해진다. 따라서, 어느 노드로 요청을 보내더라도 정상적으로 요청이 전달될 수 있는 것이다. 이를 Ingress load balancing이라고 부른다.

만약, 특정 node로 전달된 요청은 해당 node에 있는 container로 전달되기를 바란다면, host모드를 이용하여 진행할 수도 있다.

여기까지가 network에 대한 전반적이 내용입니다.
