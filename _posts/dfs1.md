---
slug: "dfs1"
date: "2022-02-03 09:00"
title: "DFS(1)-기본"
tags: ["DFS", "Graph", "Tree"]
category: "Algorithm"
thumbnailSrc: "/images/algorithm.png"
---

## Intro

Graph의 탐색에서 가장 기본이 되는 방법입니다. 한 점에서 연결된 다른 점으로 이동을 하면서, 모든 연결된 점을 순화하는 것을 목표로 가진다고 가정해봅시다. 이때, 정점을 고르는 방식에 따라서, DFS, BFS로 나눕니다. DFS에서는 자신과 연결된 정점 중에서 하나를 선택하고 이동한 뒤에 해당 점에서 다시 연결된 지점을 찾아서 이동합니다. 즉, 바로 지금 뽑은 점에 인접해있는 지점이 이전에 인접해있던 지점보다 가중치가 높다는 것입니다. 이를 모두 진행하고도 답을 찾을 수 없다면, 이제 이전 시점으로 돌아와서 다시 작업을 재개하는 방식입니다.

## DFS(Depth First Search)

이를 구현하기 위해서는 `Stack`이 가장 중요합니다. 이전의 연결되었던 점보다 현재 연결된 점이 더 중요하기 때문에, 현재가 우선순위가 높지만, 후에 이를 다시 찾아와야 하기 때문에, 이를 저장하기 위한 자료구조가 필요한데 이것이 `Stack`이 되는 것입니다.

따라서, 이를 직접 구현해보면 다음과 같습니다.

```python
adj = [
  [2,3],
  [3],
  [0,3],
  [0,1,2]
]

visited = [False] * 4
stack = [(0, visited)]
while len(stack) > 0:
  cur, visited = stack.pop(-1)
  visited[cur] = True
  for next in adj[cur]:
    if visited[next] === False:
      stack.append((next, visited))
```

또는, Recursive Call(함수의 재귀 호출)을 통해서 구현할 수 있습니다. 재귀 호출을 통한 구현이 더 일반적이며, 이해하기 쉬운 구조이기 때문에 많이 사용됩니다. 왜냐하면, 함수는 기본적으로 `stack` 형식으로 호출한 함수들을 쌓아두기 때문에, 더 원활한 구현이 가능합니다.

```python
adj = [
  [2,3],
  [3],
  [0,3],
  [0,1,2]
]

def dfs(cur, visited):
  visited[cur] = True
  for next in adj[cur]:
    if visited[next] === False:
      dfs(next, visited)

dfs(0, [-1] * 4)
```

추가적으로 만약 순회해야 하는 그래프가 확실하게 모두 연결된 그래프가 아니라면(중간에 간선이 끊겨 연결이 되지 않는 정점이 존재하는 경우), 우리는 모든 정점에서 `dfs`를 수행하도록 설정을 해주어야 합니다. 그래야만 전체 점을 순환할 수 있습니다.

```python
adj = [
  [2,3],
  [3],
  [0,3],
  [0,1,2]

]

def dfs(cur):
  visited[cur] = True
  for next in adj[cur]:
    if visited[next] === False:
      dfs(next)

def dfsAll():
  visited = [False] * len(adj)
  for v in range(len(adj)):
    if not visited[v]:
      dfs(v)
  
```

### 시간복잡도

일반적으로 모든 노드를 순환하는 것이 목표라면,

- 인접 리스트 : $O(|V| + |E|)$
- 인접 행렬 : $O(V^2)$

### Example

> **연결된 부분집합 갯수**

disjoint set을 통해서 구현할 수 있는 문제이지만, DFS를 통해서 쉽게 구현할 수 있습니다. 바로, 앞 서 보았던 `dfsAll`에서 `dfs`의 호출 횟수를 counting하면 값을 구할 수 있습니다.

```python
# adj = [[...], [...], ...]
# visited = [False, False, ..]

def dfs(cur):
  visited[cur] = True
  for next in adj[cur]:
    if not visited[next]:
      dfs(next)

def dfsAll():
  visited = [False] * len(adj)
  cnt = 0
  for v in range(len(adj)):
    if not visited[v]:
      cnt += 1
      dfs(v)
  return cnt
```

---

> **위상정렬**

위상 정렬이란 directed edge(유향 간선)로 이루어진 그래프를 규칙을 깨지 않으면서 정렬하는 방식입니다. 간선이 없는 경우에는 순서가 상관없지만, 간선이 있는 경우에는 순위가 있는 형태입니다. (우선순위 : 출발점 < 도착점)
언뜻 보기에는 어려워 보이지만, DFS를 통해서 쉽게 해결할 수 있습니다. DFS를 실행하면서 끝에 지점에서 부터 배열에 저장하고 이를 역순으로 정렬하면 위상정렬이 되는 것을 볼 수 있습니다.

```python
# adj = [[...], [...], ...]
# visited = [False, False, ..]

order = []

def dfs(cur):
  visited[cur] = True
  for next in adj[cur]:
    if not visited[next]:
      dfs(next)
  order.append(cur)

def dfsAll():
  visited = [False] * len(adj)
  order = []
  for v in range(len(adj)):
    if not visited[v]:
      dfs(v)

print(order[::-1])
```

> **오일러 서킷(한 붓 그리기)**

시작 점과 끝 점이 동일할 때, 모든 경로를 지나는 길찾기입니다.
이를 해결할 때에는 우선 다음 조건을 먼저 확인해야 합니다.

- 두 개 이상의 Component로 분리된 경우 만들 수 없습니다.
- 어느 한 점이라도 차수가 홀수이면, 만들 수 없습니다.

해결책은 간단합니다. 반복적으로 Circuit(순환)을 찾아서, 최종 구조로 완성하면 됩니다.

다음이 기본적인 프로세스입니다.

1. 먼저 자신으로 시작해서 자신으로 돌아오는 순환을 먼저 찾는다.
2. 위의 과정을 진행하고도, 아직 지나지 않은 간선을 포함한 정점이 있다면, 이를 시작점으로 하여 다시 순환을 찾을 수 있다. 이러한 정점이 없을 때까지 이를 반복해서 시행한다.
3. 이를 최초의 순환에 붙여나가면서, 최종으로 오일러 서킷을 완성한다.

1번과 2번 과정에서 만약, 순환을 찾을 수 없다면 오일러 서킷이 불가능하다는 결론을 내리고 process를 종료합니다.

```python
# adj = [[...],[...],...] (인접행렬) - 동일 간선이 여러 개 있을 수도 있음
def eulerCircuit(cur, circuit):
  for next in range(len(adj)):
    if adj[cur][next] > 0:
      adj[cur][next] -= 1
      adj[next][cur] -= 1
      eulerCircuit(next, circuit)
  circuit.push_back(cur)   
```

**만약,** 시작점과 끝점이 다른 EulerTrail일 경우에는 임의로 시작점과 끝점을 잇고, Euler Circuit을 찾은 뒤에 삭제하면 됩니다.
