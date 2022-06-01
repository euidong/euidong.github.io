---
slug: "docker-network-2"
title: "[Docker] Network(2)"
date: "2021-07-11 00:04"
category: "Tech"
tags: ["Docker", "Container", "Network"]
thumbnailSrc: "/images/docker-picture.jpg"
---

## Reference

- [🔗 Docker Deep Dive](https://www.oreilly.com/library/view/docker-deep-dive/9781800565135/), Nigel Poulton

## Intro

저번 글에 이어서 이번에는 docker network의 driver들에 대한 자세한 내용을 다루겠다.

- bridge networks
- overlay networks
- host networking
- IPVlan networks
- MacVlan networks

### Bridge Network

container간의 통신을 위해서 필요한 것이 bridge 네트워크이다. 하지만, 여기서 주의해야할 것은 오직, single host에서만 동작한다는 점이다. 즉, 다른 docker host에 존재하는 container와는 연결이 불가능하다.

그렇다면, bridge가 무엇인가? 이는 두 개의 network 장치를 연결하는 L2 switch를 말한다. 즉, container를 연결하는 도구라고 보면 되겠다. 이를 통해서 연결된 container는 해당 container의 모든 port에 접근이 가능해진다.

![docker-bridge-network](/images/docker-bridge-network.png)

위는 `$ docker network ls`를 입력하면 기본적으로 볼 수 있는 내용이다. 위에 세개는 처음부터 끝까지 docker에 존재하는 default network입니다. host는 직접적으로 host에 연결하는 경우의 network이고,(후에 설명합니다.) none은 아무 네트워크에도 연결되지 않아 외부로 어떤 traffic도 보내지 않을 container들이 속하게 된다. 여기서 bridge는 default bridge라고 불리며, network를 설정하지 않고, container를 생성하게 되면 기본적으로 해당 bridge로 연결되게 된다. 이를 통해서 container 간의 연결도 구현하는 것이 가능하다.

하지만, 일반적으로 단일 기기에서 container 간의 연결을 수행할 때에는 bridge를 직접 생성하여 연결하는 것이 일반적이다. (그 이유는 도메인 네임 설정을 자동으로 해준다는 점에서 이점이 있기 때문 -> [🔗 참고](https://docs.docker.com/network/bridge/#differences-between-user-defined-bridges-and-the-default-bridge))

아래는 이를 이용한 간단한 예시이다.

```bash
# bridge 생성
$ docker network create -d bridge eui_bridge

# container 생성
$ docker container run -d --name c1 \
  -network eui_bridge \
  alpine sleep 1d
  
# container2 생성
$ docker container run -it --name c2 \
  -network eui_bridge \
  alpine sh
   
# ping을 통해 c1과 연결 여부 확인
$ ping c1
```

위의 과정을 처음부터 설명하자면,

1. eui\_bridge라는 network를 bridge로 생성한다.
2. container에 eui\_bridge를 연결하고, alpine 이미지를 기반으로 생성한다. 이때 시작 시에 sleep을 하루 동안 시행한다.(sleep 하는 이유는 꺼지지 않게 하기 위함)
3. 마찬가지로 eui\_bridge에 연결하고, alpine 이미지로 container를 생성한 후에 shell을 실행시킨다.
4. c2에서 실행된 shell에서 c1으로 ping을 전송한다. (이때 같은 network bridge끼리는 container name으로 domain이 생성된다.)

참고로 여기서 기억해야할 것이 있다면, bridge는 container간의 연결을 위한 것이고, container의 특정 port를 host와 mapping하고자 할 때에는 `--publish` 를 활용해야 한다.

```bash
$ docker run -p 5000:80 nginx
```

이를 통해서 host의 5000번과 container의 80번 port를 연결할 수 있다.

### Overlay Network

위에서 설명한 것이 단일 호스트 내부에서 container 간의 연결이었다면, 여러 host가 존재하는 cluster 환경에서 docker의 container간 통신을 위한 driver가 overlay이다. 현재에는 docker swarm을 통해서 application을 여러 host에서 제공하는 경우에 사용하게 된다.

먼저 원리를 알아보자면, VXLAN을 활용한다는 것이다. 이는 L3 network 상위에서 다른 두 기기 간에 L2 통신을 지원하는 것인데, 이를 통해서 우리는 다른 node간에 존재하는 container 끼리도 통신할 수 있도록 할 수 있다. docker swarm에 의해서 관리되어 L3로 연결된 두 node의 위에서는 VXLAN Tunnel EndPoint(VTEP)이 각 각 존재한다. 이들을 통해서, tunnel이 형성되고 통신이 가능해지는데, 기존에 container에 존재하고 있던 CNM에서 정의한 Sandbox 속에 virtual switch가 생성되고 이와 VTEP이 연결되어 다른 기기에 있는 container간에도 통신이 가능해지는 것이다.

예시를 든다면, docker stack을 통해서 시스템을 구성해본 적이 있다면, container를 생성하는 과정에서 network가 먼저 생성되는 것을 확인할 수 있을 것이다. 이때 생성되는 것이 overlay 네트워크로 이를 통해서 여러 container가 replica가 어느 node에 생길지 확정할 수 없음에도 통신을 자유롭게 하는 것을 볼 수 있다.

### Host Networking

해당 방식은 docker를 한 번이라도 써본 사람이라면 다음 명령어는 익숙할 것이다.

```bash
$ docker run -p 80:80 nginx
```

nginx image를 기반으로 container를 실행시키고, container 내부의 80번과 host의 80번 port를 mapping하겠다는 것이다. 이를 통해서 container는 host의 network에 관여하는 것이 가능하다.

하지만, host networking을 이용하게 되면 container 내부에 network stack이 생성되지 않고, 해당 container의 모든 network 설정이 해당 host의 설정에 그대로 mapping되는 것이다. 이를 이용하면 성능상의 이점은 있겠지만, 상당히 설정이 난잡해질 수 있다.

### IPVlan Network

MAC address와 IP adress를 부여하여, 실제 네트워크에 container를 직접 연결하는 방식이다.

장점은 별도의 port forwarding이나 bridge를 사용하지 않으므로 당연히 빠르지만, NIC를 이용하기에 promiscuous mode를 open해야 한다는 단점이 있다. 이는 switch가 데이터를 전송할 대상을 찾지 않고, 연결된 모든 대상에게 보내는 모드로, sniffing에 취약하고 이 때문에 public cloud system에서는 이를 막아 놓기에 사용할 수 없다.

![docker-ip-vlan](/images/docker-ip-vlan.png)
여기까지 말했을 때, 이해했다면, 이미 설정하는 것을 알아보러 떠나면 될 것이고, 이해하지 못했다면, 아마 쓸 일이 없을 것이니 넘어가시면 될 것이다.

자세한 사항은 공식 페이지를 참고하자.

[🔗 IPvlan networks](https://docs.docker.com/network/ipvlan/)

### MacVlan Network

ipvlan과 동일하지만 차이점은 MAC 주소를 할당한다는 점이다. 그 외에는 다를 것이 없다.

[🔗 macvlan networks](https://docs.docker.com/network/macvlan/)
