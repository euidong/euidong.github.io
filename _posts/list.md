---
slug: "list"
title: "List 갖고 놀기"
date: "2022-04-26 21:10"
category: "Algorithm"
tags: ["List", "Python", "순환", "복사", "자르기", "반전", "회전"]
thumbnailSrc: "/images/algorithm.png"
---

## Intro

list를 갖고 놀 수 있는 능력은 python으로 알고리즘을 풀기 위해서 굉장히 중요한 기술이다.
여기서는 기본적인 방법에서부터 어떻게 배열을 제대로 갖고 놀 수 있는지를 알아볼 것이다. 여기서는 Python을 활용하지만, 알고리즘 풀이를 목표로 하기 때문에 numpy를 활용하지 않는 방법을 소개합니다. 물론 numpy를 이용하면, 훨씬 쉽게 구현할 수 있습니다.

## 선언

python에서는 list를 통해서 데이터를 모읍니다. 또한, list라는 type 자체가 예약어이기 때문에 아래부터는 arr를 통해서 `list`를 표현합니다.

```python
# 비어 있는 1차원 배열
arr = []

# 꽉 찬 1차원 배열
N = 100
arr = [0] * N

arr = [0 for _ in range(N)]

# 비어 있는 2차원 배열
arr = [[]]

# 꽉 찬 2차원 배열
N = 100
M = 100

arr = [[0 for _ in range(M)] for _ in range(N)]
```

여기서 유의해야할 점은 2차원 배열에서 꽉 찬 배열을 만들기 위해서 반드시 for 문을 통해서 생성해야 한다는 것이다. 1차원 배열을 생성할 때 사용했던 곱하기 연산을 통한 배열의 요소 복사는 불가능하다. (ex, `[[0] * M] * N`, `[[0] * M for _ in range(N)]`) 왜냐하면, **reference로** 복제되기 때문이다.

## 순환

python의 가장 기본적인 순환 방법은 `for element in arr` 구문을 이용하는 것이다. 이를 기본적으로 사용하면서, 사용하기에 유용한 순환 방법은 다음과 같은 것들이 있다.

```python
# (1)
for element in arr:
  print(element)

for idx in range(len(arr)):
  print(arr[idx])

# (2)
while len(arr) > 0:
  element = arr.pop(0)
  print(element)

# (3)
list(map(lambda x: x**2, arr))

from functools import reduce
reduce(lambda acc, cur: acc + cur, arr, 0)

list(filter(lambda x: x == 1, arr))

# (4)
arr = []

def call(idx):
  if len(arr) <= idx:
    print(arr[idx])
    return
  call(idx+1)
  print(arr[idx])
```

1. 가장 기본적인 순환 방식이다. 일반적으로 foreach라고 부른다.
  이 방식은 대게의 경우 효율적이다. 하지만, 사용에 유의해야할 때가 있다. 바로, 내부 element의 추가,삭제가 발생하는 경우이다. 따라서, 반드시 내부에서는 순환 중인 배열에 대한 추가 및 삭제 연산을 수행하지 않도록 하자.
2. 대게, queue를 순환하는 경우에 많이 사용되게 되는 형태이다.
  이 경우는 추가, 삭제가 발생할 때에도 안정적으로 동작하도록 할 수 있다.
3. 이는 위에서 보았던 foreach 형태에서 내부 변수의 변경을 강제로 막을 수 있는 방식이다.
  이런 식으로 구현하는 것도 에러를 줄이는데에 좋다. 주의해야할 것은 기존 arr와 새로 생기는 arr의 크기가 동일하기 때문에 이에 유의해야 한다.
  reduce는 반드시 import가 필요하기 때문에 번거롭지만, 배열의 크기를 바꿀 수도 있고, 누적을 수행하는 경우 유용하다.
  filter를 통해서, 특정 데이터를 filtering 할 때 사용할 수 있다.
4. 재귀함수의 특징인 call stack을 활용해서 순환하는 방식이다. 이런 식으로 그래프를 순환한다면, 그것이 DFS이다.

## 자르기

python의 장점 중 하나가 자르기(slicing)가 매우 쉽다는 것이다.
배열 내부에 `:`을 통해서 시작점(start index), 끝점(end index), 그리고 순서(order)를 명시하는 방식으로 배열을 쉽게 변환하는 방법을 제공한다.
또한, 이 방식을 사용해도, 기존의 list는 변형되지 않고, 잘라진 list를 반환한다는 것을 기억하자.

### 1차원 자르기

```python
arr = [1,2,3,4,5]

arr[1:3:1] # [2,3]
arr[1:3] # [2,3] <-- 생략 시 순서는 기본적으로 1

arr[1:5] # [2,3,4,5]
arr[1:] # [2,3,4,5] <-- 생략 시 끝점은 기본적으로 가장 끝점

arr[0:] # [1,2,3,4,5]
arr[:] # [1,2,3,4,5] <-- 생략 시 시작점은 기본적은 가장 첫점
```

### 2차원 자르기

2차원 배열을 자르는 것은 numpy를 사용하지 않는다면, 어쩔 수 없이 for문을 작성해서 잘라주어야 한다.

```python
arr = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16]
]

# arr의 a[0~2][0~2]를 가져오고 싶다고 하자.
sliced_arr = [line[:2] for line in arr[:2]]
```

물론 `arr[:2][:2]` 이런식으로 쓰고 싶겠지만, 이를 수행하면, arr을 [:2] slicing한 결과물 `[[1, 2, 3, 4], [5, 6, 7, 8]]`을 다시 slicing하여 동일하게 `[[1, 2, 3, 4], [5, 6, 7, 8]]`가 나오게 된다. 따라서, 위와 같이 for문을 이용하는 형식으로 바꿔주는 것이 일반적이다.

## 복제

기본적으로 복제는 두 가지 종류가 존재한다. 하나는 대상 자체를 모두 복사하는 것이고, 하나는 사실상 해당 배열에 또 다른 이름을 붙여주는 것이다.
기본적으로 우리가 다음과 같이 하면 변수가 복제되기 때문에 배열도 똑같이 복사될 것이라고 생각하지만 실상은 그렇지 않다.

```python
# (1)
a = 3
b = a

# (2)
arr = [1,2,3,4,5]
copy = arr
```

일반 변수에 `=` 연산을 사용한다면, 값을 복사하여 target에게 대입해주는 것이 맞다. 하지만, 배열에서는 변수가 가르키는 것은 배열이 존재하는 주소를 가르킨다. 즉, `arr`이라는 구역에 변수가 있는 것이 아니라 변수가 있는 주소를 가지고 있는 것이다. 따라서, 우리가 `=` 을 통해서 `copy`에게 대입해주면, `copy`는 단지 `arr`과 똑같은 주소지를 가르키고 있는 것일 뿐이다. 물론 이렇게 되어도 크게 문제가 되지 않는 경우가 있다. `copy`와 `arr` 모두 절대 변경되지 않을 것이라는 확신하거나 해당 행위 자체를 의도한 경우이다. 하지만, 대게의 경우에는 원본이 회손되기를 원하지 않기 때문에 우리는 별개의 list를 생성하는 방법을 알고 있어야 한다. python에서는 이를 위해 slicing을 이용하는 것이 일반적이다.

```python
# 1차원 배열
arr = [1,2,3,4,5]
copy = arr[:] 

# 2차원 배열
arr = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16]
]
copy = [line[:] for line in arr]
```

2차원을 복사할 때에도 `arr[:]`을 쓰고 싶겠지만, 이렇게 하게 되면, 내부에 있는 배열은 모두 주소를 복사하는 것이기 때문에 똑같은 별명을 붙여주는 것과 똑같이 동작한다.

## modulo

list에서는 modulo 연산이 중요하다. 애초에 배열의 index가 0에서 시작하는데, 이것은 modulo 공간에서의 가장 큰 특징이기도 하다. 만약, 우리가 특정 배열을 반복해서 시계방향, 반시계방향 처럼 순환할 일이 생긴다면, modulo 연산을 반드시 기억해야 한다.

```python
arr = [1,2,3,4,5]
idx = 0
while True:
  print(arr[(idx) % len(arr)])
  idx+=1
```

## 반전

이전에 보았던 slicing의 응용을 통해서 쉽게 반전이 가능하다.

```python
# 1차원 배열
arr = [1,2,3,4,5]
reversed_arr = arr[::-1]

# 2차원 배열
arr = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16]
]

# 좌우 반전
reversed_arr = [line[::-1] for line in arr]
# 상하 반전
reversed_arr = [line[:] for line in arr[::-1]]
```

## 회전

회전은 2차원 배열에서만 의미있으므로, 해당 연산만 다룹니다.
회전은 총 두 가지 종류가 있을 수 있다.
> **1. 시계 또는 반시계 방향으로 1칸 이동하는 연산**

```python
arr = [
  [1,2,3,4], 
  [5,6,7,8], 
  [9,10,11,12], 
  [13,14,15,16],
  [17,18,19,20],
  [21,22,23,24]
]
N = len(arr)
M = len(arr[0])

# 시계 방향
# 시계 방향 이동 시의 이동 정도
dy = [0, 1, 0, -1]
dx = [1, 0, -1, 0]

rotated_arr = [[-1 for _ in range(M)] for _ in range(N)]
for i in range(min([N, M]) // 2):
  cursor = (i, i+1)
  prev = (i, i)
  rotated_arr[i][i] = arr[i+1][i]
  d = 0
  while True:
    y = cursor[0] + dy[d]
    x = cursor[1] + dx[d]
    if -1 + i < y < N - i and -1 + i < x < M - i:
      rotated_arr[cursor[0]][cursor[1]] = arr[prev[0]][prev[1]]
      prev = (cursor[0], cursor[1])
      cursor = (y, x)
    else:
      d += 1
      if d == 4:
        break

# 반시계 방향
# 반시계 방향 이동 시의 이동 정도
dy = [1, 0, -1, 0]
dx = [1, 0, 0, -1]

rotated_arr = [[-1 for _ in range(M)] for _ in range(N)]
for i in range(min([N, M]) // 2):
  cursor = (i+1, i)
  prev = (i, i)
  rotated_arr[i][i] = arr[i][i+1]
  d = 0
  while True:
    y = cursor[0] + dy[d]
    x = cursor[1] + dx[d]
    if -1 + i < y < N - i and -1 + i < x < M - i:
      rotated_arr[cursor[0]][cursor[1]] = arr[prev[0]][prev[1]]
      prev = (cursor[0], cursor[1])
      cursor = (y, x)
    else:
      d += 1
      if d == 4:
        break
```

예제 - [백준 16926](https://www.acmicpc.net/problem/16926)

>**2. $90^{\circ}$, $180^{\circ}$, $270^{\circ}$ 회전 연산**

해당 연산의 keypoint는 연산이 점화식 형태로 표현된다는 점이다. (A=After, B=Before, size=(NxM))

- $90^{\circ}$ : `A[i][j] = B[j][N-1-i]`
- $270^{\circ}$ : `A[i][j] = B[M-1-j][i]`
- $180^{\circ}$ : `A[i][j] = B[N-1-i][M-1-j]`

```python
arr = [
  [1,2,3,4], 
  [5,6,7,8], 
  [9,10,11,12], 
  [13,14,15,16],
  [17,18,19,20],
  [21,22,23,24]
]
N = len(arr)
M = len(arr[0])

# 90도
rotated_arr = [[-1 for _ in range(N)] for _ in range(M)]
for i in range(M):
  for j in range(N):
    rotated_arr[i][j] = arr[N-1-j][i]

# 270도
rotated_arr = [[-1 for _ in range(N)] for _ in range(M)]
for i in range(M):
  for j in range(N):
    rotated_arr[i][j] = arr[j][M-1-i]

# 180도
rotated_arr = [[-1 for _ in range(M)] for _ in range(N)]
for i in range(N):
  for j in range(M):
    rotated_arr[i][j] = arr[N-1-i][M-1-j]
```

예제 - [백준 20327](https://www.acmicpc.net/problem/20327)
