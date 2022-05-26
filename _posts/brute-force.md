---
slug: "brute-force"
title: "Brute Force"
date: "2022-04-14 13:51"
category: "Algorithm"
tags: ["BruteForce", "순열", "조합", "부분 집합"]
thumbnailSrc: "/images/algorithm.png"
---

우리가 알고리즘을 생각할 때, 가장 먼저 떠올릴 수 있는 방법 중에 하나입니다. 가장 기본적인 알고리즘이기 때문에, 굳이 설명을 하지 않아도 자연스럽게 채득하는 경우가 대부분이지만, 사고의 틀을 정하여 더 빠르게 답을 찾을 수 있습니다.

Brute Force를 직접적으로 번역하면, 이는 "무차별  대입"정도로 생각할 수 있습니다. 이는 여러 가지의 경우의 수에서 최적의 답이 한 개 이상 존재할 때, 모든 경우의 수를 하나하나 대입해보면서, 정답이 맞는지를 확인하는 방식입니다. 즉, 가능한 모든 경우를 만들고, 그 후에 이것이 정답인지를 계속해서 확인하는 과정이 알고리즘의 핵심입니다.

가장 흔한 예시가 해커들이 특정 유저의 password를 알아내기 위해서 모든 경우의 수를 대입하여 확인하는 것이 있습니다.

## **해결 방법**

이 알고리즘의 구현 순서는 다음과 같습니다.

1. 모든 경우의 수를 헤아린다.
2. 하나의 경우의 수를 갖고 하는 연산의 횟수를 헤아린다.
3. 해당 알고리즘이 시간 내에 작동할 수 있는지 확인한다.  
    대게, 1초동안 할 수 있는 연산은 대략 1억회라고 가정하면 쉽습니다.
4. 알고리즘을 직접 구현한다.

## **대표 예시**

모든 경우의 수를 확인하는 문제가 굉장히 많기 때문에, 순열/조합/부분집합 문제가 굉장히 많습니다. 고등학교 시절 C, P로 경우의 수를 푸는 문제를 굉장히 많이 풀었다면, 아마 쉽게 할 수 있을 것입니다.

일단 순열 조합을 가장 효율적으로 구현하는 방법에 대해서, 일단 정리를 해보겠습니다.

### **1\. 순열(Permutation)**

```python
def permutation_helper(k, arr=[], prev=[]):
    if len(prev) == k:
        return [prev]
    ss = []
    for idx in range(len(arr)):
        ss += permutation_helper(k, arr[:idx] + arr[idx+1:], prev + [arr[idx]])
    return ss


def permutation(n, k):
    arr = [i for i in range(1, n+1)]
    return permutation_helper(k, arr, [])
    
print(permutation(5, 2))
print(permutation_helper(2, [1,2,3,4,5], []))
```

### **2\. 조합(Combination)**

```python
def combination_helper(k, arr=[], prev=[]):
    if len(prev) == k:
        return [prev]
    ss = []
    for idx in range(len(arr)):
        ss += combination_helper(k, arr[idx+1:], prev + [arr[idx]])
    return ss


def combination(n, k):
    arr = [i for i in range(1, n+1)]
    return combination_helper(k, arr, [])

print(combination(5, 2))
print(combination_helper(2, [1,2,3,4,5], []))
```

### **3\. 부분집합(Subset)**

```python
def subset_helper(k, arr=[], prev=[]):
    if len(prev) == k:
        return []
    ss = []
    for idx in range(len(arr)):
        ss.append(prev + [arr[idx]])
        ss += subset_helper(k, arr[idx+1:], prev + [arr[idx]])
    return ss


def subset(n, k):
    arr = [i for i in range(1, n+1)]
    return subset_helper(k, arr, [])

print(subset(5, 2))
print(subset_helper(2, [1,2,3,4,5], []))
```
