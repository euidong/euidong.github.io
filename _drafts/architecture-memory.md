---
slug: "architecture-memory"
date: "2022-04-29 19:25"
title: "5. Memory Hierarchy"
tags: ["Computer Organization And Design", "Memory", "Memory Hierarchy", "Cache", "Directed Mapping", "Virtual Memory", "Page"]
category: "Computer Architecture"
thumbnailSrc: "/images/default.jpg"
---

컴퓨터를 사용할 때, 우리는 기본적으로 Memory가 무한한 크기를 가지고 있기를 바란다. 하지만, 이를 실제로 구현하는 것은 비용적으로도, 기술적으로도 불가능하다. 따라서, 이를 마치 존재하는 것처럼 느끼도록 하는 기술을 사용한다.

이를 위한 핵심은 `Locality`를 활용하는 것이다. 동작에는 인과가 존재하고, 그렇기에 직전에 자신이 했던 행동 그리고 근처의 대상들이 했던 행동이 지금의 자신이 할 행동에 영향을 주는 것은 어찌보면 당연한 사실이다. 이러한 특징이 `Locality`이다. 이를 이용해서 우리는 Memory를 마치 무한인 것처럼 느낄 수 있게 할 수 있다.

1. **Temporal Locality**   
   하나의 Instruction 또는 data가 사용되었다면, 해당 내용은 곧 다시 사용될 확률이 매우 높다.(반복문일 경우에는 극명하게 드러날 것이다.)
2. **Spatial Locality**   
   하나의 Instruction 또는 data가 사용되었다면, 후에 이 근처에 있는 내용을 사용할 확률이 매우 높다. (일반적으로 연속적으로 동작하는 경우가 많기 때문에 근처의 명령어들을 같이 가져올 수 있다면, 가져오는 것은 합리적이다.)

이를 활용하기 위해서, 우리는 **Memory Hierarcy**라는 방법을 사용한다. 즉, 메모리를 계층화하는 것이다. 모든 장치를 빠르고, 크고, 싸게 만들 수 있으면 좋겠지만, 실제로는 불가능하기에 빠르고, 작은 장치를 processor에 가까이에 두고, 그 보다는 덜 빠르고, 큰 장치를 좀 더 거리를 두고 위치시키는 방식이다. 이렇게 하면 이용자에게 싸면서, 빠른 시스템을 제공할 수 있다.

이를 위해서, 우리는 더 멀리 있는 Memory에서 정보를 복사해서 더 상위의 Memory에 붙여넣기하는 것이다. 계층 구조이기 때문에 한 번에 수행되는 것이 아니라 여러 단계가 있다면, 차근차근 순서에 맞춰서 수행된다. 즉, 단계를 skip하여 이동하는 것은 불가능하다.

만약, 상위 Memory 장치에서 원하는 정보(Block, Line)를 찾았다면 이를 `hit`라고 하고, 찾지 못했다면 이를 `miss`라고 한다. 또한, `hit time`은 상위 Memory가 해당 Block에 접근하는데 걸리는 시간을 의미한다. 반대로 `miss penalty`는 상위 Memory로 해당 Block을 위치시키는 시간과 Block을 processor에 전달하는 시간까지를 포함한다.

---

시작하기에 앞 서, 컴퓨터 공학을 공부하는 누구나 겪는 현상이라고 생각하는데 바로 Memory 파트는 언어가 매우 자기 멋대로 나오는 경향이 있다. 즉, 깔끔한 정리가 되지는 않았다. Memory가 어떨 때는 Main Memory를 의미하다가 전체 모든 저장 장치를 의미하기도 한다. 따라서, 이 아래부터는 다음과 같이 엄격하게 분리하여 설명한다.

---