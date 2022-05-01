---
slug: "graph"
date: "2022-04-20 12:00"
title: "Graph"
category: "Algorithm"
tags: ["자료구조", "Graph"]
thumbnailSrc: "/images/algorithm.png"
---
여러 개의 Vertex(정점)와 그를 잇는 Edge(간선)로 이루어진 형태의 자료 구조를 의미한다. 

## 핵심 종류
- 무향 그래프: 방향이 없이 선으로 이어진 그래프
- 방향 그래프: 방향을 가진 그래프로 한 정점에서 다른 정점으로 가는 방향을 명시한 그래프
- 가중치 그래프: 각 간선이 가중치를 가지는 형태를 그래프
- 이분 그래프: 정점을 두 개의 그룹으로 나누었을 때, 각 그룹은 서로 연결되지 않은 점들로만 이루어지는 그래프
- **방향 비순환 그래프(Directed Acyclic Graph(DAG))**: 어느 정점에서 시작해도 cycle(순환)이 존재하지 않는 형태의 그래프. 이 그래프 형태에 tree(트리)도 해당되며, 이것이 특별한 이유는 선형으로 정렬하는 것이 가능하기 때문이다. ([DFS_위상정렬 참고](/post/DFS))

## Dense vs Sparse
그래프 관련 문제를 해결할 때, 반드시 고려해야 할 점은 해당 그래프가 Dense(밀도가 높은, edge가 많은)한 경우와 Sparse(희귀한, edge가 적은)한 경우를 모두 고려해주어야 한다. 이에 따라서, 시간복잡도가 굉장히 천차만별하게 나타나기 때문이다.


## 표현 방법
1. adjacent list(인접 리스트)   
  각 정점마다 해당 정점에서 나가는 간선의 목록을 저장해서 그래프를 표현하는 법
  ```python
  import sys
  # N = 정점의 수, M = 간선의 수
  N, M = [int(i) for i in sys.stdin.readline().split()]
  adj = [[] for _ in range(N)]
  for _ in range(M):
    a, b = [int(i) for i in sys.stdin.readline().split()]
    adj[a].append(b)
    # 무향 그래프에서는 다음과 같이 반대 방향도 추가해주어야 한다.
    adj[b].append(a)
  ```
2. adjacent matrix(인접 행렬)   
  인접 리스트 방식의 단점은 특정 두 정점이 연결 되었는지를 알기 위해서는 해당 정점과 연결된 모든 정점을 확인해야 한다. 인접 행렬에서는 이를 해결할 수 있다. 연결 여부를 직접 2차원 $V \times V$ 행렬로 나타내기 때문에 이를 바로 index 조회로 알 수 있다. **하지만,** 메모리를 더 잡아 먹을 수도 있고, 단순히 연결된 정점만 조회하는 연산일 경우에는 오히려 모든 정점을 조회해야 하기 때문에 비용이 증가할 수 있다. (Sparse한 graph일 수록 비용 증가가 크다.)
  ```python
  import sys
  # N = 정점의 수, M = 간선의 수
  N, M = [int(i) for i in sys.stdin.readline().split()]
  adj = [[0 for _ in range(N)] for _ in range(N)]
  for _ in range(M):
    a, b = [int(i) for i in sys.stdin.readline().split()]
    adj[a][b] += 1
    # 무향 그래프에서는 다음과 같이 반대 방향도 추가해주어야 한다.
    adj[b][a] += 1 
  ```