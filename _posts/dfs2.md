---
slug: "dfs2"
date: "2022-04-23 10:30"
title: "DFS(2)-DFS Spanning Tree"
tags: ["DFS", "Graph", "Tree", "FindCircleInGraph"]
category: "Algorithm"
thumbnailSrc: "/images/algorithm.png"
---

이전에는 DFS의 기본이 되는 요소에 대해서 알아보았지만, 이제는 좀 더 심화적인 부분을 배워보고자 한다.   
DFS가 그래프를 순회하면서 만드는 DFS Spanning Tree에 대한 내용이다.

우리는 총 4가지로 간선을 분류할 수 있습니다. 
1. **Tree Edge(트리 간선)**- DFS Spanning Tree에 포함된 간선
2. **Forward Edge(순방향 간선)** - 해당 간선이 가르키는 정점이 DFS Spanning Tree에서 자신의 descendant(후손)에 속하는 경우
3. **Backward Edge(역방향 간선)** - 해당 간선이 가르키는 정점이 DFS Spanning Tree에서 자신의 ancestor(조상)에 속하는 경우
4. **Cross Edge(교차 간선)** - 해당 간선이 가르키는 정점이 후손도 조상도 아닌 sibiling(형제 또는 그들의 자손)에 속하는 경우

![<img src="/images/dfs-spanning-tree.png" width="190" />](/images/dfs-spanning-tree.png)

이를 구현하기 위해서는 총 두 개의 추가적인 자료구조가 필요하다.   
1. order[1...N] = 해당 노드의 발견 순서
2. finished[1...N] = 모든 간선의 사용 여부

```python
adj = [
  [1,3],
  [2],
  [1],
  [1,2]
]
N = len(adj)

order = [-1] * N
finished = [False] * N
cnt = [0]
def dfs(curr):
  order[curr] = cnt[0]
  cnt[0] += 1
  for next in adj[curr]:
    prefix = curr + "에서 " + next + "까지는"
    # 아직 방문하지 않았다면, 트리 간선이다.
    if order[next] == -1:
      print(prefix + "트리 간선이다.")
      dfs(next)
    # 만약 다음 정점의 order가 더 낮다면, 순방향 간선이다.
    elif order[next] > order[curr]:
      print(prefix + "순방향 간선이다.")
    # 만약, 다음 정점이 아직 거쳐야 하는 정점이 있다면, 역방향 간선이다.
    elif not finished[next]:
      print(prefix + "역방향 간선이다.")
    # 그 외에는 교차 간선이다.
    else:
      print(prefix + "교차 간선이다.")
  finished[curr] = True

def dfsAll():
  for i in N:
    if order[i] == -1:
      dfs(i)
```

위와 같이 구현하게 되면, 적절하게 간선을 구분할 수 있다. 위에는 방향이 존재하는 그래프였지만, 만약 방향이 존재하지 않는 무향 그래프라면 위의 과정을 좀 더 단순화할 수 있다.
먼저 간선은 다음과 같이 줄어든다.

1. **트리 간선** = DFS Spanning Tree에 포함된 간선
2. **중첩 간선** = DFS Spanning Tree에 포함되지 않은 간선

다음과 같이 총 2개로 줄어드는 것을 볼 수 있다. 교차 간선과 역방향 간선은 기본적으로 이후에 방문하는 정점에서 이미 방문한 정점으로 이동하는 것인데 이런 일은 무향 그래프에서는 발생하지 않기 때문에 존재할 수 없다.
그러면, 구현은 다음과 같이 진행됩니다.

```python
adj = [
  [1,2,3],
  [0,2,3],
  [0,1,3],
  [0,1,2]
]
N = len(adj)

order = [-1] * N
# finish는 필요하지 않다.
cnt = [0]
def dfs(curr):
  order[curr] = cnt[0]
  cnt[0] += 1
  for next in adj[curr]:
    prefix = curr + "에서 " + next + "까지는"
    # 아직 방문하지 않았다면, 트리 간선이다.
    if order[next] == -1:
      print(prefix + "트리 간선이다.")
      dfs(next)
    # 만약 다음 정점의 order가 더 낮다면, 중첩 간선이다.
    # 여기서 유의해야 할 점은 바로 중첩 간선은 두 번 호출된다는 점이다.
    # 중첩 간선이기 때문에 서로 한 번씩 호출히기 때문이다.
    # 이를 구분하기 위해서 order를 사용할 수 있다.
    elif order[next] < order[curr]:
      print(prefix + "order가 높은 곳에서 낮은 곳으로 가는 중첩 간선이다.")
    else:
      print(prefix + "order가 낮은 곳에서 높은 곳으로 가는 중첩 간선이다.")

def dfsAll():
  for i in N:
    if order[i] == -1:
      dfs(i)
```


여기서 각 간선의 특징을 이해하면, 다른 문제를 풀기 쉽다.
1. 역방향 또는 중첩 간선의 갯수 = circle의 갯수



[...continue]
