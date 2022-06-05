---
slug: "sdn-tutorial"
title: "SDN Tutorial"
date: "2022-06-03 19:54"
category: "Network"
tags: ["SDN", "Mininet", "OpenFlow", "ONOS", "OpenVSwitch"]
thumbnailSrc: "/images/sdn-tuto-hero.jpg"
---

## Reference

- Thumbnail : Photo by [Alina Grubnyak](https://unsplash.com/@alinnnaaaa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/virtual-network?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

SDN을 실제 구현하는 것은 굉장히 어려운 일이다. 따라서, Mininet을 활용하여 가상의 Topology를 통해서 먼저 테스팅을 한 후에 실제로 적용하는 것이 일반적이라고 할 수 있다.

따라서, 해당 Posting에서는 `Mininet`, `OpenFlow`, `Open VSwitch`, `ONOS`를 이용하여 간단한 Tutorial을 수행해볼 것이다. 이 Posting을 통해서 남기고자 하는 것은 SDN을 테스팅하는 절차를 익히는 것이다.

## 0. Tools

먼저 작성자의 실행환경은 MAC OS X로 대부분의 설정은 모두 동일하지만 `XTerminal`은 Window/MAC이 다르기 때문에 Window 전용을 설치해야 한다.

- Host Machine
  - Virtual Box : [🔗 Download](https://www.virtualbox.org/wiki/Downloads) [🔗 공식사이트](https://www.virtualbox.org/)
    - VM을 실행시키기 위한 도구, OpenSource이며 무료이기 때문에 많이 사용된다.(v6.1)
  - Vagrant : [🔗 Download](https://www.vagrantup.com/downloads) [🔗 공식사이트](https://www.vagrantup.com/)
    - Virtual Environment 구축을 자동화하는 도구(v2.2.19)
  - XQuartz : [🔗 Download](https://www.xquartz.org/releases/index.html) [🔗 공식사이트](https://www.xquartz.org/)
    - XTerminal 시스템으로 원격으로 Graphic 시스템을 호스팅하는 도구이다. 즉, `ssh`로 접속한 시스템에서 추가적으로 terminal을 생성하거나 GUI를 요구하는 application을 실행시킬 때 이를 host machine에서 실행할 수 있도록 돕는다.(v2.8.1)
- Virtual Machine
  - Mininet : [🔗 Download](http://mininet.org/download/) [🔗 공식사이트](http://mininet.org/)
    - Network Topology를 가상으로 구성할 뿐만 아니라 추가적인 configuration / testing이 가능한 Virtual Environment Emulator(v2.3.0)
  - OpenVSwitch : [🔗 Download](https://www.openvswitch.org/download/) [🔗 공식사이트](https://www.openvswitch.org/)
    - Virtual Switch를 실행시킬 수 있는 tool이다. 이를 통해서, Virtual Machine 내부에서 Virtual Switch를 가동시킬 수 있다.OpenFlow Protocol에 기반한 다양한 API를 내재하고 있기 때문에 이를 통해서 Virtual Switch의 Configuration 등과 같은 작업을 수행할 수도 있다.(v2.9.8)
  - ONOS : [🔗 Download](https://wiki.onosproject.org/download/) [🔗 공식사이트](https://wiki.onosproject.org/)
    - Open Network Operation System으로 SDN의 Controller 역할을 수행할 수 있다. 뿐만 아니라 WEB Interface도 제공하며, 다양한 API를 추가적으로 제공하기 때문에 유용하다.(v2.5.7)

## 1. Setup

위에 제시한 Tool을 모두 `Virtual Machine` 내부에 설치해야하지만, 자동으로 해당 tool을 설치하는 `Vagrantfile`을 만들어놓았기 때문에 사용해도 좋을 것이다. 해당 VagrantFile로 build하면 시간이 굉장히 소요될 수 있다. (인터넷 상태에 따라 천차만별이지만, 대략 20분?)

```bash
$ git clone https://github.com/euidong/virtual-sdn-boilerplate
$ cd virtual-sdn-boilerplate
$ vagrant up
# 접속
$ vagrant ssh
```

> **Run ONOS**

```bash
# In Virtual Machine
$ cd $ONOS_ROOT
$ bazel run onos-local
```

## 2. Scenario를 작성

우선 어떤 상황을 **emulation**할 것인지에 대한 구체적인 계획이 필요하다. 따라서, 이를 먼저 구상해보자. 아래 예시는 단순히 내가 생각한 예시이므로 정확성이런 것은 생각하기 보다는 흐름만을 익혀보자.

```plaintext
💡 Base Scenario

1. 후지산 인근에서 계속해서 화산활동이 감지되고 있다. 또한, 후지산은 100년 단위로 폭발을 해왔는데 최근 170여 년 동안 폭발이 존재하지 않고 있다. 이로 미루어보았을 때 후지산의 화산폭발은 얼마 남지 않았을 것이라고 추측할 수 있다.
2. 후지산에서 폭발이 발생하는지를 파악하기 위해서 곳곳에 관측기가 필요하며, 이를 분석할 센터가 안전을 위해 후지산 아래에 존재하며 백업 서버를 별도로 다른 공간에 두고 있다.
3. 각 관측소에서 서로 간 데이터 공유도 계속해서 발생하는 경우가 빈번하다. => Horizontal traffic이 많다 -> datacenter와 유사한 형태의 Network -> Spine-Leaf 구조가 적절.
```

## 3. Topology 구성 with Mininet

먼저, topology를 작성해야한다. 이를 위해서 `Mininet`을 활용한다. 이에 대한 개념 정리는 [🔗 Mininet](/posts/mininet)애 해두었다. Base Scenario의 3번 사항에서 알 수 있듯이 우리의 Topology는 Spine-Leaf 구조를 갖는 것이 적절하다. 따라서, 이를 먼저 표현해보도록 하겠다.

> **Source Code**

- `/vagrant/example/mt-fuji/topo.py`

```python
from mininet.topo import Topo

class SpineLeaf(Topo):
  def build(self):
    s_num = 2
    l_num = 5
    h_num = 2
    spines = []
    leaves = []
    hosts = []

    for i in range(s_num):
      spines.append(self.addSwitch('s%s%s' % (1, i+1)))
    for i in range(l_num):
      leaves.append(self.addSwitch('l%s%s' % (2, i+1)))
      for j in range(s_num):
        self.addLink(spines[j], leaves[i])
      for j in range(h_num):
        hosts.append(self.addHost('h%s%s' % (i+1, j+1)))
        self.addLink(leaves[i], hosts[i * h_num + j])

topos = { 'spineleaf': (lambda: SpineLeaf()) }
```

- 실행

```bash
$ sudo mn --mac --controller remote --switch ovs --custom /vagrant/example/mt-fuji/topo.py --topo=spineleaf
```

- 실행 결과
  - 빨간색 : `Spine Switch`
  - 청록색 : `Leaf Switch`

![Spine-Leaf Topology](/images/spine-leaf-topo.png)

## 4. Test 환경구축

주로 사용되는 Test 환경용 도구는 다음과 같다.

1. `ping` : 특정 machine 간의 연결 상태를 확인하기 위해서 많이 사용되어진다.
2. `trace` : `ping`과 유사하지만 지나쳐간 `hop`을 모두 조회 가능하여 좀 더 세부적인 경로를 확인할 때 유용하다.
3. `iperf` : client와 server 구조로 이루어지며, `tcp`, `udp` packet을 전송할 수 있다. 특정 machine에서는 `server`로 실행시키고, 다른 machine에서 해당 `server`로 data를 보내도록 할 수 있다. `ping`보다 주기적으로, 대용량의 데이터를 보내고 관측할 수 있다.
4. `wireshark` : 실젤 traffic의 이동을 GUI로 볼 수 있도록 돕는 도구이다.
5. `ONOS WEB GUI` : ONOS에서는 Web을 통해서 Network 상태와 Traffic을 관측하는 것이 가능하다.

여기서는 `iperf`를 통해서 데이터를 전송하고, `ONOS WEB GUI`를 통해서 traffic을 관측할 것이다.

아래 command를 통해서 `h51`가 위에서 언급한 후지산 아래의 서버가 되고, `h52`가 백업 서버가 되는 상황을 가정하기 위해서 해당 두 위치를 `iperf server`로 지정한다. 그리고 모든 관측소(`h11`, `h12`, ..., `h41`, `h42`)에서 `iperf client`가 되어 traffic을 주기적으로 보내도록 설정한다.

```bash
mininet> h51 iperf -s -u &
mininet> h52 iperf -s -u &

# xterm 명령어는 host에 위에서 설명한 XQuartz가 정상적으로 설치되어있어야 작동한다.
mininet> xterm h11 h12 h21 h22 h31 h32 h41 h42

# 각 client에서 다음과 같은 요청을 전송한다.
$ iperf -u -c 10.0.0.9 -i1 -t100000000000
```

![ONOS에서 확인한 모습](/images/sdn-tuto-example-1.png)

## 5. Flow Control

기본적으로 Flow를 제어할 수 있는 방식은 해당 Setting을 수행핼 때, 3가지 방법이 있다.

1. Open vSwitch CLI : OpenFlow Protocol에 기반한 여러 CLI 명령어를 지원한다. 이를 통해서, Flow Table을 직접 작성하는 것이 가능하다.
2. ONOS REST API : ONOS REST API를 통해서 제어가 가능하다. 이때에는 ONOS가 high level로 추상화한 flow control 방식을 활용해야 한다.(ex. intent) 이는 ONOS를 실행하고 있다면, 다음 url에서 확인이 가능하다. [http://localhost:8181/onos/v1/docs/](http://localhost:8181/onos/v1/docs/)
3. ONOS CLI : ONOS CLI 명령어를 통해서 제어가 가능하다.

이제부터 해당 세가지 방식을 적절히 활용하여 설정하여 각 Simulation 별로 수행을 해보도록 하겠다.

### Scenario 1

> **중간에 link가 끊어진 경우 with ONOS CLI**

![sdn-tuto-scenario-1](/images/sdn-tuto-scenario-1.png)

먼저 모든 host에서 server로 traffic을 중계해줄 수 있도록 다음과 같이 intent를 설정해줄 수 있다. 특정 host간의 intent를 설정하면 자동으로 경로를 찾아서 routing을 수행해준다. 또한, 특정 연결이 중간에 사라져도 자동으로 경로를 재설정한다.

```bash
onos> add-host-intent 00:00:00:00:00:01/None 00:00:00:00:00:09/None
onos> add-host-intent 00:00:00:00:00:02/None 00:00:00:00:00:09/None
onos> add-host-intent 00:00:00:00:00:03/None 00:00:00:00:00:09/None
onos> add-host-intent 00:00:00:00:00:04/None 00:00:00:00:00:09/None
onos> add-host-intent 00:00:00:00:00:05/None 00:00:00:00:00:09/None
onos> add-host-intent 00:00:00:00:00:06/None 00:00:00:00:00:09/None
onos> add-host-intent 00:00:00:00:00:07/None 00:00:00:00:00:09/None
onos> add-host-intent 00:00:00:00:00:08/None 00:00:00:00:00:09/None
```

이 후에 mininet에서 특정 link를 비활성화시킨다.

```bash
mininet> link s11 l25 down
```

![sdn-tuto-scenario-1-result](/images/sdn-tuto-scenario-1-result.png)

### Scenario 2

> **Load Balancing을 통해서 측정 데이터 고르게 분배 with Open Vswitch CLI**

![sdn-tuto-scenario-2](/images/sdn-tuto-scenario-2.png)

이전 Scenario의 intent를 유지한 상태에서 OpenFlow의 Group Table의 `select` type을 활용하면, Load Balancing이 가능하다. 먼저, ONOS CLI에서 외부 flowRule도 받아들이도록 설정한 후

```bash
$ onos localhost
onos> cfg set org.onosproject.net.flow.impl.FlowRuleManager allowExtraneousRules True
```

다음과 같이 group entry 생성 및 flow추가로 구현이 가능하다.

```bash
$ sudo ovs-ofctl add-group l21 \
  "group_id=1,type=select,bucket=output:1,bucket=output:2" -O OpenFlow11
$ sudo ovs-ofctl add-flow l21 in_port=3,actions=group:1 -O OpenFlow11
$ sudo ovs-ofctl add-flow l21 in_port=4,actions=group:1 -O OpenFlow11

$ sudo ovs-ofctl add-group l22 \
  "group_id=1,type=select,bucket=output:1,bucket=output:2" -O OpenFlow11
$ sudo ovs-ofctl add-flow l22 in_port=3,actions=group:1 -O OpenFlow11
$ sudo ovs-ofctl add-flow l22 in_port=4,actions=group:1 -O OpenFlow11

$ sudo ovs-ofctl add-group l23 \
  "group_id=1,type=select,bucket=output:1,bucket=output:2" -O OpenFlow11
$ sudo ovs-ofctl add-flow l23 in_port=3,actions=group:1 -O OpenFlow11
$ sudo ovs-ofctl add-flow l23 in_port=4,actions=group:1 -O OpenFlow11

$ sudo ovs-ofctl add-group l24 \
  "group_id=1,type=select,bucket=output:1,bucket=output:2" -O OpenFlow11
$ sudo ovs-ofctl add-flow l24 in_port=3,actions=group:1 -O OpenFlow11
$ sudo ovs-ofctl add-flow l24 in_port=4,actions=group:1 -O OpenFlow11
```

![sdn-tuto-scenario-2-result](/images/sdn-tuto-scenario-2-result.png)

### Scenario 3

> **h51이 down되어 h52로 traffic redirection with Open Vswitch CLI**

![sdn-tuto-scenario-3](/images/sdn-tuto-scenario-3.png)

server로 가는 Leaf Switch에서 packet의 IP, MAC 주소를 변경하여 Redirection이 가능하다.

```bash
$ sudo ovs-ofctl add-flow l25 \
  "in_port=1, dl_dst=00:00:00:00:00:09,
   actions=mod_dl_dst:00:00:00:00:00:10,mod_nw_dst:10.0.0.10,output:4"
$ sudo ovs-ofctl ad-flow l25 \
  "in_port=4, dl_src=00:00:00:00:00:10,
   actions=mod_dl_src:00:00:00:00:00:09,mod_nw_dst:10.0.0.9,output:1"
```

![sdn-tuto-scenario-3-result](/images/sdn-tuto-scenario-3-result.png)

### Scenario 4

> **Meter를 이용해서 관측소로 가는 과도한 traffic 차단 with ONOS REST API**

![sdn-tuto-scenario-4](/images/sdn-tuto-scenario-4.png)

특정 Switch에서 특정 port로 나가는 traffic의 최대값을 `500KB/s`로 제한하는 예시이다.

- Meter를 생성하기 위한 REST API  
  **`/meters/of:000000000000000c`로 POST 요청**

```json
{
  "deviceId": "of:000000000000000c",
  "unit": "KB_PER_SEC",
  "burst": true,
  "bands": [
    {
      "type": "DROP",
      "rate": 500,
      "burstSize": 0,
      "prec": 0
    }
  ]
}
```

- Meter를 특정 Switch에 적용하기 위한 REST API  
  **`/flows/of:000000000000000c?appId=meter`로 POST 요청**

```json
{
  "priority": 40000,
  "isPermanent": true,
  "deviceId": "of:000000000000000c",
  "treatment": {
    "instructions": [
      {
        "type": "METER",
        "meterId": "1"
      },
      {
        "type": "OUTPUT",
        "port": "2"
      }
    ]
  },
  "selector": {
    "criteria": [
      {
        "type": "ETH_TYPE",
        "ethType": "0x0800"
      }
    ]
  }
}
```

![sdn-tuto-scenario-4-result](/images/sdn-tuto-scenario-4-result.png)
