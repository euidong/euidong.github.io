---
slug: "binary-search"
title: "Binary Search"
date: "2022-05-02 15:34"
category: "Algorithm"
tags: ["Binary Search", "Upper Bound", "Lower Bound", "중복 수의 갯수"]
thumbnailSrc: "/images/algorithm.png"
---

Binary Search는 가장 기본적이면서도 효과적인 탐색 방법이다. 이는 굉장히 많은 알고리즘의 기본 알고리즘으로 많이 사용된다. 따라서, Binary Search를 제대로 사용할 줄 알아야 한다. 또한, 뒤에 부분에서는 이를 이용해서 중복수를 찾아내는 연산을 어떻게 Binary Search를 통해서 할 수 있는지를 알아볼 것이다.

Binary Search를 하기 위해서는 먼저 list를 정렬해야 한다. 그렇게 하게 되면, 특정 수를 찾기 위해서 최대 list 전체를 탐색하는 것에서 리스트의 크기를 log 취한 만큼 만 연산해도 충분하다.

일반적인 예시가 Up&Down 게임이다. 이는 특정 범위 안의 숫자를 맞히고자 할 때 기회를 여러 번주고, 시도할 때마다 시도한 값과 목표 값을 비교하여 목표값이 더 크면 Up, 더 작으면 Down을 알려주는 게임이다. 우리가 값을 맞추고자할 때마다 해당 값에 대한 힌트가 주어지게 되는데, 만약 우리가 매번 수의 중앙 값을 말한다면, 얻을 수 있는 정보의 질이 굉장히 높아진다. 물론 범위가 100이고 맞추고자 하는 값이 100일 때, 99라고 말하고 Up을 듣는다면 최상의 정보를 얻게 되는 것이지만, 만약 Down이라면, 받을 수 있는 정보의 질이 굉장히 떨어진다. 왜냐하면 내가 해당 수를 외침으로써 다음 시도에서 제외할 수 있는 수는 2개 밖에 없기 때문이다.

결국 우리는 특정 수를 맞추지 못했을 경우, 고급 정보를 얻어 다음 도전을 할 수도 있고, 안좋은 정보를 얻어 다음 도전에 도움이 덜 될 수도 있다. 즉, 우리가 맞추어야 할 수가 하나라면, 위와 같은 요행에 기대어 도전하는 것도 나쁘지 않은 선택이라고 할 수 있다. 예를들어, 2의 배수 순으로 조회하는 것이다.

하지만, 우리가 해당 게임을 여러 번 진행할 것이고, 범위가 넓어질 경우 질이 안좋은 정보를 얻었을 경우의 Risk가 너무 클 수 있다. 따라서, 우리는 어떤 숫자가 들어오더라도 **확정적으로 연산 횟수를 줄이기를 기대할 것**이다. 그 방법이 항상 범위의 중앙값을 선택하는 것이다. 그렇다면, 어떤 수가 목표이더라도 우리는 선택지를 매번 반으로 나눌 수 있다. 결론상 중앙값 선택을 k 번했을 때, 사실상 $2^{n-1} + 2^{n-2} + ... + 2^{n-k}$ = $2^{n}(1-{1\over{2^k}})$ = $\text{전체} \times (1 - {1 \over {2^k}})$개를 조회한 것과 같은 효과를 보는 것이다. 이 효과를 본 결과 우리가 K번 시도 후에 정답일 가능성이 있는 수를 나열해보라고 한다면, 해당 수는 $\lfloor{\text{전체} \over {2^k}}\rfloor$ 개만 남아있게 된다. 결과적으로 우리는 $\lfloor{\text{전체} \over {2^k}}\rfloor = 0$이 되는 k번만 수행하면, 어떤 수가 들어오더라도 목표값을 확정적으로 구할 수 있다.

이진 탐색을 하기 위해서는 **결국 중앙값을 빠르게 찾는 것이 중요하다.** 따라서, 정렬이 중요한 것이다. 정렬을 하게 되면, 중앙값을 단순히 전체 크기의 반에 위치한 값으로 찾을 수 있기 때문에 이 연산이 매우 간단해진다.

이를 구현하면 다음과 같다.

```python
def binary_search(arr, target):
  start = 0
  end = len(arr)
  # end는 이미 봤거나 배열범위의 밖이다.
  while end > start:
    mid = (start + end) // 2
    if arr[mid] > target:
      end = mid
    elif arr[mid] < target:
      start = mid + 1
    else:
      return mid
  return len(arr)

A = [1,2,3,4,5,6,7,8]
B = [1,3,5,7,10,15,50]
C = [1,3,-7,-4,-1,-5]

binary_search(A, 3) # 2 
binary_search(B, 5) # 2
binary_search(B, 14) # 못찾아서, 배열의 크기(7)을 return
binary_search(C, 3) # 못찾고, 배열의 크기(6)를 return
binary_search(sorted(C), 3) # 5
```

다른 언어에서는 -1을 return하는 경우도 있지만, python에서는 -1을 index로 찾을려고 해도 compile 오류가 안나기 때문에 배열의 크기를 return하여 compile 에러를 만드는게 낫다.

## Lower Bound / Upper Bound

이분탐색의 응용으로 나오는 것이 하한선(Lower Bound)과 상한선(Upper Bound)이다. Lower Bound는 특정 수 이상의 값이 처음 나오는 index를 의미하고, Upper Bound는 특정 수를 초과하는 값이 처음 나오는 index를 의미한다.

이들을 찾는 과정이 이분 탐색과 매우 유사하다.

```python
def lower_bound(arr, target):
  start = 0
  end = len(arr)
  while end > start:
    mid = (start+end) // 2
    if arr[mid] < target:
      start = mid + 1
    else:
      end = mid
  return end

def upper_bound(arr, target):
  start = 0
  end = len(arr)
  while end > start:
    mid = (start + end) // 2
    if arr[mid] <= target:
      start = mid + 1
    else:
      end = mid
  return end
```

## 중복수의 갯수

우리가 중복수를 셀 때 어떻게 해야할까? 

1. 앞에서 부터 찾아나간다. $O(N)$
2. 특정 수를 찾고, 좌우 값을 찾는다. $O(N)$
3. 해당 수 이상이 처음 나오는 위치를 찾고, 해당 수를 초과한 값이 처음 나오는 위치를 찾는다. $(O(\log{N}))$

극단적인 예시로 0이 연속으로 1조개 이상 있는 list에서 0의 중복 횟수를 셀려면 100억번의 연산이 필요하다. 하지만, 3번 방법을 사용하면, $2^{40} \ge \text{1조}$이므로 총 80회 정도의 연산으로 성공적인 연산이 가능하다.

하지만, 유의할 것은 lower_bound가 해당 값을 실제로 찾았는가이다. 따라서, lower_bound를 통해서 얻은 index가 실제로 해당 목표값이 맞는지를 반드시 확인하자.
(왜냐하면, return값이 0인 경우, 찾았을 수도 있고, 못찾았을 수도 있다.)

```python
def get_dup_cnt(arr, target):
  lb = lower_bound(arr, target)
  if lb < len(arr) and arr[lb] == target:
    return lb - upper_bound(arr, target)
  return 0
```
