---
slug: "segment-tree"
date: "2024-09-09 14:49"
title: "Segment Tree"
category: "Algorithm"
tags: ["자료구조", "Tree", "구간합"]
thumbnailSrc: "/images/algorithm.png"
---

## Intro

Segment tree는 데이터의 구간 합, 구간 최댓값, 구간 최솟값을 빠르게 구하는데 사용되는 자료구조이다. 이는 일반적으로 동일한 데이터의 구간에 대한 정보를 빈번하게 조회 및 수정이 요구되는 경우에 이점이 될 수 있다. 일반적으로 우리가 특정 구간의 합, 최대, 최소값을 구하기 위해서 전체 구간에 대한 탐색이 필요하다. 하지만, segment tree를 사용하면, 이 시간을 유의미하게 단축시킬 수 있다. 여타 다른 블로그에서는 사용법에 대해서 자세하게 설명하므로 해당 포스트에서는 더 개념적인 내용에 치중하여 차근차근 설명하도록 하겠다.

## Caching

구간 합 구하기의 핵심은 재활용, caching에 있다. 일반적으로 동일한 연산을 여러 번 수행한다면, 이에 대한 caching을 통해서 연산을 가속화할 수 있다. segment tree 역시 caching 중에 하나로 좀 더 smart한 caching이라고 생각하면 되겠다.

여기서는 가장 쉬운 방식부터 시작하여 segment tree까지 이어가면 설명을 진행하겠다.

### Brute Force 기반 구간합 구하기

이것이 어떻게 가능한지 알아보기 이전에 문제 상황을 먼저 짚어보자. 우리가 구간합(또는 최댓값, 최솟값)을 구하는 과정에서 일반적으로 어느정도의 비용을 지불 하는지 확인해보자.

```cpp
#include <iostream>
#include <vector>

using namespace std;

int get_range_sum_v1(const vector<int>& nums, const int range_start, const int range_end)
{
    int range_sum = 0;

    for (int i = range_start; i <= range_end; ++i) {
        range_sum += nums[i];
    }

    return range_sum;
}

int main() {
    const vector<int> nums = {1, 6, 4, 3, 8, 2, 7, 5}; // nums size = N
    const vector<vector<int>> searches = {{0,4}, {3,5}, {2,3}, {1, 5}, {2, 4}, {1, 1}, {2, 2}, {3, 5}}; // searches size = K

    // O(N x K)
    for (int i = 0; i < searches.size(); ++i) {
        cout << get_range_sum_v1(nums, searches[i][0], searches[i][1]) << '\n';
    }

    return 0;
}
```

우리는 하나의 구간을 구하는 과정에서 구간의 길이 만큼의 탐색을 수행했다. 만약, 구간합을 K번 구해야한다면, $O(NK)$의 시간 복잡도가 발생한다. 하지만, 우리는 계산 결과를 미리 정해두는 것으로 이 과정을 가속화할 수 있다.

### Brute Force 기반 전체 구간합 저장하기

우선 구간합을 빠르게 구하기 위해서 생각할 수 있는 가장 간단한 방법은 바로 모든 구간합을 별도의 저장 공간에 저장하는 것이다. 즉, i~j 까지의 구간합에 대한 정보를 저장해둔다면, 최소 $N(N+1)\over{2}$의 연산을 수행하여 최소 $N(N+1)\over{2}$의 공간을 추가 할당해주어야 한다.

```cpp
#include <iostream>
#include <vector>

using namespace std;

vector<vector<int>> get_every_range_sum_v2(const int N, const vector<int>& nums)
{
    vector<vector<int>> range_sums(N, vector<int>(N, 0));

    for (int i = 0; i < N; ++i) {
        range_sums[i][i] = nums[i];
        for (int j = i+1; j < N; ++j) {
            range_sums[i][j] = range_sums[i][j-1] + nums[j];
        }
    }

    return range_sums;
}

int get_range_sum_v2(const vector<vector<int>>& range_sums, const int range_start, const int range_end)
{
    return range_sums[range_start][range_end];
}

int main() {
    const vector<int> nums = {1, 6, 4, 3, 8, 2, 7, 5};
    const vector<vector<int>> searches = {{0,4}, {3,5}, {2,3}, {1, 5}, {2, 4}, {1, 1}, {2, 2}, {3, 5}}; // searches size = K

    // O(N x N)
    const vector<vector<int>> range_sums = get_every_range_sum_v2(nums.size(), nums);

    // O(K)
    for (int i = 0; i < searches.size(); ++i) {
        cout << get_range_sum_v2(range_sums, searches[i][0], searches[i][1]) << '\n';
    }

    return 0;
}
```

이 방식의 문제는 총 3가지가 존재한다.

1. 전체 구간합을 구하는 과정에서 $O(N^2)$의 연산을 수행해야한다. $N$이 크다면, 연산의 양이 너무 많다.
2. 과도하게 많은 메모리를 점유한다. $N^2$ 만큼의 추가 메모리를 요구한다.
3. 수정하는 과정에서 $O(N^2)$의 연산을 추가로 요구한다. 하나의 값을 수정하려면 관련 range를 모두 수정해주어야 함(가운데 값이 삭제되었다면, 시간을 굉장히 많이 요구할 수 있음).

즉, 해당 방식은 조회 횟수에 해당하는 $K$가 $N$보다 압도적으로 크지 않은 이상 이득을 볼 수 없으며, 많은 메모리도 소모하고, 수정 또한 굉장히 어렵다고 할 수 있다.

### Binary Search 적용해보기

binary search에서 우리는 특정 값의 위치를 찾기 위해서 중앙값을 확인하고, 검색 범위를 매 순간 반으로 줄이며 연산 횟수를 크게 줄였다 ($O(N) \rightarrow O(\log N)$). 이를 구간합 계산 과정에도 적용을 하여 만약 특정 구간의 합을 임의로 반을 나누어서 저장해둔다면 어떨까? A부터 B까지의 구간합을 구하고자 할 때, 이를 “A부터 수열 전체의 중간 지점(N / 2)까지의 구간합” 더하기 “N/ 2+ 1부터 B까지의 구간합”로 표현하고, 이 값들을 미리 저장해두었다면, 더 빠르게 연산이 가능할 것이다. 이를 식으로 풀어서 표현하면 아래와 같이 표현이 가능해진다.

$$
\begin{align}
Sum_{A\rightarrow B} = \begin{cases}
0 &\text{if }A>B\\
nums[A]  &\text{if }A==B\\
\text{Equation. (2)} &\text{if }A < B
\end{cases}
\end{align}
$$

$$
\begin{align*}
\text{Equation. (2)}\\
Sum_{A\rightarrow B} &= Sum_{A\rightarrow \lfloor\frac{N-1}{2}\rfloor} + Sum_{\lfloor\frac{N-1}{2}\rfloor + 1\rightarrow B} \\
&= Sum_{A\rightarrow\lfloor\frac{\lfloor\frac{N-1}{2}\rfloor }{2}\rfloor} + Sum_{\lfloor\frac{\lfloor\frac{N-1}{2}\rfloor }{2}\rfloor+1\rightarrow \lfloor\frac{N-1}{2}\rfloor} + Sum_{\lfloor\frac{N-1}{2}\rfloor+1 \rightarrow \lfloor\frac{N + \lfloor\frac{N-1}{2}\rfloor}{2}\rfloor } + Sum_{\lfloor\frac{N + \lfloor\frac{N-1}{2}\rfloor}{2}\rfloor + 1\rightarrow B} \\
&= Sum_{A\rightarrow\lfloor\frac{N-1}{4}\rfloor} + Sum_{\lfloor\frac{N-1}{4}\rfloor+1\rightarrow \lfloor\frac{N-1}{2}\rfloor} + Sum_{\lfloor\frac{N-1}{2}\rfloor+1 \rightarrow \lfloor\frac{3N-2}{4}\rfloor\rfloor} + Sum_{\lfloor\frac{3N-2}{4}\rfloor\rfloor + 1\rightarrow B}\\
&= ... \\
\end{align*}
$$

즉, 구간 범위가 올바르지 않은 경우 ($A>B$) 인 경우는 0을 반환하고, 구간의 크기가 1인 경우는 그 위치에 해당하는 값을 반환하며, 그 외에 경우에는 전체 범위에서 절반 지점(C)의 지점까지의 거리를 재귀적으로 구하는 방식이다.

만약, 우리가 의 값을 모두 알고 있다면, 해당 연산은 최대 $\log N$번의 덧셈으로 값을 구할 수 있다.

```cpp
// TODO: 구간합을 저장하는 방식은 이전 방식을 그대로 이용함. 이에 대한 개선은 바로 다음에 살펴보겠다.
vector<vector<int>> get_every_range_sum_v2(const int N, const vector<int>& nums)
{
    vector<vector<int>> range_sums(N, vector<int>(N, 0));

    for (int i = 0; i < N; ++i) {
        range_sums[i][i] = nums[i];
        for (int j = i+1; j < N; ++j) {
            range_sums[i][j] = range_sums[i][j-1] + nums[j];
        }
    }

    return range_sums;
}

int get_range_sum_v3(const vector<vector<int>>& range_sums, const int range_start, const int range_end)
{
    if (range_start > range_end) return 0;
    if (range_start == range_end) return range_sums[range_start][range_end];
    const int mid = (range_start + range_end) / 2;

    return get_range_sum_v3(range_sums, range_start, mid) + get_range_sum_v3(range_sums, mid + 1, range_end);
}

int main() {
    const vector<int> nums = {1, 6, 4, 3, 8, 2, 7, 5};
    const vector<vector<int>> searches = {{0,4}, {3,5}, {2,3}, {1, 5}, {2, 4}, {1, 1}, {2, 2}, {3, 5}}; // searches size = K

    // O(NxN)
    const vector<vector<int>> range_sums = get_every_range_sum_v2(nums.size(), nums);

    // O(KlogN)
    for (int i = 0; i < searches.size(); ++i) {
        cout << get_range_sum_v3(range_sums, searches[i][0], searches[i][1]) << '\n';
    }

    return 0;
}
```

위의 코드에서 `get_range_sum` 함수는 $\text{Equation. (1)}$을 재귀 함수로 표현한 것이다. 이제 해결해야하는 문제는 `range_sums` 배열을 구성하는데 있다. 이대로 사용하면, 결국 `range_sums` 를 구성하는데  $O(N^2)$의 시간을 소모할 수 밖에 없다. 우리가 사용하는 방식에서는 모든 구간합이 필요한 것이 아니기 때문에 해당 배열을 구축하는 과정에서 최적화 수행이 가능하다. 앞 서 언급했듯이 우리는 모든 구간에 대한 합이 아니라 특정 범위에 해당하는 값만 알고 있으면 된다. 아래는 이를 적용한 방식이다.

```cpp
int calc_range_sum_v3(vector<vector<int>>& range_sums, const vector<int>& nums, const int start, const int end)
{
    if (start > end) return 0;
    if (start == end) return range_sums[start][end] = nums[start];
    const int mid = (start + end) / 2;
    return range_sums[start][end] = calc_range_sum_v3(range_sums, nums, start, mid) + calc_range_sum_v3(range_sums, nums, mid+1, end);
}

vector<vector<int>> get_specific_range_sums_v3(const int N, const vector<int>& nums)
{
    vector<vector<int>> range_sums(N, vector<int>(N, 0));
    calc_range_sum_v3(range_sums, nums, 0, N-1);
    return range_sums;
}

int get_range_sum_v3(const vector<vector<int>>& range_sums, const int range_start, const int range_end)
{
    if (range_start > range_end) return 0;
    if (range_start == range_end) return range_sums[range_start][range_end];
    const int mid = (range_start + range_end) / 2;

    return get_range_sum_v3(range_sums, range_start, mid) + get_range_sum_v3(range_sums, mid + 1, range_end);
}

int main() {
    const vector<int> nums = {1, 6, 4, 3, 8, 2, 7, 5};
    const vector<vector<int>> searches = {{0,4}, {3,5}, {2,3}, {1, 5}, {2, 4}, {1, 1}, {2, 2}, {3, 5}}; // searches size = K

    // O(logN)
    const vector<vector<int>> range_sums = get_specific_range_sums_v3(nums.size(), nums);

    // O(KlogN)
    for (int i = 0; i < searches.size(); ++i) {
        cout << get_range_sum_v3(range_sums, searches[i][0], searches[i][1]) << '\n';
    }

    return 0;
}
```

이제 우리는 $O(K\log N)$의 시간복잡도로 문제를 해결할 수 있게 되었다. 여기서 하나 더 살펴보아야할 것은 update에 대한 내용이다. 만약, 수열의 특정 값을 수정하고자 한다면, 이를 어떻게 반영할 수 있을까? range의 합을 우리는 별도의 배열에 저장해두었다. 따라서, 해당 수를 포함하는 구역에 변경된 값을 반영해주면 된다. 여기서, 주의할 점은 update의 방식에 있다. 아리가 update를 수행할 때, 두 가지 방식을 생각할 수 있다.

1. 기존 수에 연산을 적용하기 (nums[i] += operand;)
2. 새로운 수로 교체하기 (nums[i] = new_value;)

이를 구현하는 방법은 여러가지이다. 연산을 적용하고자 한다면, 해당 수를 포함하는 모든 범위에 동일한 연산을 적용하면 될 것이다 (+, -의 경우). 하지만, 새로운 수로 교체를 하고자 한다면, 기존 수를 얻은 이후에 연산을 수행해야 한다. 또한, 연산을 적용하더라도 특정 수에 x, %와 같은 연산을 적용한다면, 기존 수를 알아야 이를 적용할 수 있다. 따라서, 이를 모두 동일한 코드로 적용하고자 한다면, 아래와 같은 흐름을 적용해야할 것이다.

1. 기존 수를 조회하기 (업데이트를 `range_sum`에만 적용한 경우 $O(\log N)$, 업데이트를 할 때마다 기존 수열에 값을 꾸준하게 업데이트를 해주었다면, $O(1)$이다.)
2. 기존 수에 특정 처리를 수행하고, 기존과 변화 이후의 값 변화를 계산하기
3. 값 변화만큼, 해당하는 범위에 영향을 주기 ($O(\log N)$)

```cpp
int calc_range_sum_v3(vector<vector<int>>& range_sums, const vector<int>& nums, const int start, const int end)
{
    if (start > end) return 0;
    if (start == end) return range_sums[start][end] = nums[start];
    const int mid = (start + end) / 2;
    return range_sums[start][end] = calc_range_sum_v3(range_sums, nums, start, mid) + calc_range_sum_v3(range_sums, nums, mid+1, end);
}

vector<vector<int>> get_specific_range_sums_v3(const int N, const vector<int>& nums)
{
    vector<vector<int>> range_sums(N, vector<int>(N, 0));
    calc_range_sum_v3(range_sums, nums, 0, N-1);
    return range_sums;
}

int get_range_sum_v3(const vector<vector<int>>& range_sums, const int range_start, const int range_end)
{
    if (range_start > range_end) return 0;
    if (range_start == range_end) return range_sums[range_start][range_end];
    const int mid = (range_start + range_end) / 2;

    return get_range_sum_v3(range_sums, range_start, mid) + get_range_sum_v3(range_sums, mid + 1, range_end);
}

void update_v3(vector<vector<int>>& range_sums, const int search_start, const int search_end, const int target_idx, const int diff)
{
    if (target_idx < search_start || target_idx > search_end) return;
    range_sums[search_start][search_end] += diff;
    if (search_start == search_end) return;

    const int mid = (search_start + search_end) / 2;
    if (target_idx <= mid) update_v3(range_sums, search_start, mid, target_idx, diff);
    else update_v3(range_sums, mid+1, search_end, target_idx, diff);
}

int main() {
    const vector<int> nums = {1, 6, 4, 3, 8, 2, 7, 5};
    const vector<vector<int>> searches = {{0, 4}, {3, 5}, {2, 3}, {1, 5}, {2, 4}, {1, 1}, {2, 2}, {3, 5}}; // searches size = K
    const vector<vector<int>> updates = {{0, 1}, {1, 2}, {2, 3}, {3, 4}, {4, 5}, {5, 6}, {6, 7}, {7, 8} };

    // O(logN)
    vector<vector<int>> range_sums = get_specific_range_sums_v3(nums.size(), nums);

    // O(KlogN)
    for (int i = 0; i < searches.size(); ++i) {
        cout << get_range_sum_v3(range_sums, searches[i][0], searches[i][1]) << '\n';
        update_v3(range_sums, 0, nums.size()-1, updates[i][0], updates[i][1]);
    }

    return 0;
}
```

여기서 이제 마지막으로 신경써야 할 부분은 메모리 관련 부분이다. $N$이 큰 경우에 우리는 시간복잡도 최적화하기 위해서 구간합을 저장해두는 구조를 사용했다. 하지만, 공간 복잡도가 $N^2$로 너무 크다는 문제를 극복하기 위해서 이를 조정할 필요가 있다. 기존까지는 편의상 $N^2$을 그대로 사용하였지만, map을 이용한 방식을 적용할 수도 있다.

```cpp
int calc_range_sum_v4(map<pair<int, int>, int>& range_sums, const vector<int>& nums, const int start, const int end)
{
    if (start > end) return 0;
    if (start == end)
    {
        range_sums.insert({ make_pair(start, end), nums[start] });
        return nums[start];
    }
    const int mid = (start + end) / 2;
    int value = calc_range_sum_v4(range_sums, nums, start, mid) + calc_range_sum_v4(range_sums, nums, mid+1, end);
    range_sums.insert({ make_pair(start, end), value });
    return value;
}

map<pair<int, int>, int> get_specific_range_sums_v4(const int N, const vector<int>& nums)
{
    map<pair<int, int>, int> range_sums;

    calc_range_sum_v4(range_sums, nums, 0, N-1);
    return range_sums;
}

int get_range_sum_v4(const map<pair<int, int>, int>& range_sums, const int range_start, const int range_end)
{
    if (range_start > range_end) return 0;
    if (range_start == range_end)
        return range_sums.find(make_pair(range_start, range_end))->second;
    const int mid = (range_start + range_end) / 2;

    return get_range_sum_v4(range_sums, range_start, mid) + get_range_sum_v4(range_sums, mid + 1, range_end);
}

void update_v4(map<pair<int, int>, int>& range_sums, const int search_start, const int search_end, const int target_idx, const int diff)
{
    if (target_idx < search_start || target_idx > search_end) return;
    range_sums.find(make_pair(search_start, search_end))->second += diff;

    if (search_start == search_end) return;

    const int mid = (search_start + search_end) / 2;
    if (target_idx <= mid) update_v4(range_sums, search_start, mid, target_idx, diff);
    else update_v4(range_sums, mid+1, search_end, target_idx, diff);
}

int main() {
    const vector<int> nums = {1, 6, 4, 3, 8, 2, 7, 5};
    const vector<vector<int>> searches = {{0, 4}, {3, 5}, {2, 3}, {1, 5}, {2, 4}, {1, 1}, {2, 2}, {3, 5}}; // searches size = K
    const vector<vector<int>> updates = {{0, 1}, {1, 2}, {2, 3}, {3, 4}, {4, 5}, {5, 6}, {6, 7}, {7, 8} };

    // O({logN}^2)
    map<pair<int, int>, int> range_sums = get_specific_range_sums_v4(nums.size(), nums);

    // O(K{logN}^2)
    for (int i = 0; i < searches.size(); ++i) {
        cout << get_range_sum_v4(range_sums, searches[i][0], searches[i][1]) << '\n';
        update_v4(range_sums, 0, nums.size()-1, updates[i][0], updates[i][1]);
    }

    return 0;
}
```

map을 이용하면, 다음과 같이 구현이 가능하다. c++의 map은 red-black tree를 이용하여 구현하여 생성, 삭제, 조회에 $\log N$의 비용이 발생한다. 따라서, 이 방법이 구현은 쉽지만, 최선은 아니다. 따라서, 메모리 최적화를 위해서 사용하는 것이 segment tree이다.

### Segment tree

segment tree는 full binary tree를 이용하여 저장 공간을 절약하는 방법으로, `range_sums`를 아래와 같이 구현하는 것이다. 좌우 모두 닫힌 구간이로 하여 표현하면 다음과 같은 형태이다.즉, 길이가 $N$인 전체 수열에서 $[0,N-1]$  구간과 이를 계속해서 반으로 나누어서 $[A,B] = [A,\frac{(A+B)}{2}] + [\frac{(A+B)}{2}+1, B]$ 의 형태로 나누어가는 것이다.

```plaintext
                                             
                               --------------[0,12]--------------
                              /                                  \
                             /                                    \
                            /                                      \
                           /                                        \
                          /                                          \  
                  ----[0,6]----                                   ---[7,12]----
                /               \                               /               \
              /                 \                             /                 \
             /                   \                           /                   \  
         [0,3]                   [4,6]                   [7,9]                  [10,12]
        /     \                 /     \                 /     \                 /     \
       /       \               /       \               /       \               /       \  
   [0,1]       [2,3]       [4,5]       [6,6]       [7,8]       [9,9]     [10,11]       [12,12]
    / \         / \         / \                     / \                    / \
[0,0] [1,1] [2,2] [3,3] [4,4] [5,5]             [7,7] [8,8]          [10,10] [11,11]
```

이제 이를 tree 형태로 표현하면 되는데, 여기서 우리는 binary tree의 특징을 살려서 array를 통해서 이를 표현할 수 있다(물론 class를 이용해서 구현해도 괜찮지만, 좌우 pointer로 인한 메모리 소비를 고려한다면, array로 구현하는게 더 최적이다). 방법은 아래와 같다.

1. 원본 데이터의 크기 $N$에 대하여, $2^{\lceil\log_2N\rceil+1}$의 크기를 가지는 배열을 선언한다.
    1. 트리의 $\text{depth}=\lceil \log_2{N}\rceil$이다.
    2. 왜냐하면, $2^{\text{depth}}$는 해당 트리가 담을 수 있는 leaf node의 최댓값이고, 해당 구현에서는 leaf node에 개별 데이터를 담을 것이므로 $2^{\text{depth-1}} < N \leq 2^{\text{depth}}$이고, 결론적으로 $\text{depth}=\lceil\log_2N\rceil$이다.
    3. 전체 node의 갯수는 등비 수열의 합으로 구할 수 있다.
    $K = \frac{2^{depth+1}-1}{2-1} = 2^{depth+1}-1=2^{\lceil\log_2N\rceil+1} -1$
    4. 우리는 첫 번째, index를 비워주기 때문에 $+1$을 수행하면, $2^{\text{depth}+1}$만큼의 공간이 필요하다.
    5. 따라서, 의미론적으로 표현하면, $N$보다 크거나 같은 2의 제곱 수 중 최솟값에 2를 곱한만큼의 메모리가 필요하다.
    6. 이런 과정이 복잡하고 어렵다면, $4N$으로 생성하는 방법이 있다. 이는 직관적으로 생각했을 때, 최소한 (e)에서 제시한 값보다 크다. ($2N \leq 2 \times 2^{\lceil\log_2N\rceil} < 4N$)
2. 첫 번째 index를 비워두고, 아래 그림과 같이 데이터를 채운다. 여기서, binary tree에서 각 node의 child를 가르키는 좌우 포인터는 각 각 자신의 index x 2, index x 2 + 1가 된다.
(0번 index는 해당 방식을 적용할 수 없기 때문에 제외하는 것이다.)

```plaintext
                                ---------------a[1]--------------
                              /                                   \
                             /                                     \
                            /                                       \
                           /                                         \
                          /                                           \  
                  -----a[2]----                                   ----a[3]-----
                /               \                               /               \
               /                 \                             /                 \
             /                   \                           /                   \  
          a[4]                   a[5]                     a[6]                   a[7]
        /     \                 /     \                 /     \                 /     \
       /       \               /       \               /       \               /       \  
    a[8]       a[9]         a[10]      a[11]        a[12]      a[13]        a[14]     a[15]
    / \         / \         / \                     / \                     / \
a[16] a[17] a[18] a[19] a[20] a[21] a[22] a[23] a[24] a[25] a[26] a[27] a[28] a[29] a[30] a[31]
```

이를 직접 구현하면 아래와 같다.

```cpp
#include <iostream>
#include <vector>

using namespace std;

int fill_seg_tree(vector<int>& seg_tree, const vector<int>& nums, const int range_start, const int range_end, const int tree_idx)
{
    if (range_start == range_end)
        return seg_tree[tree_idx] = nums[range_start];

    const int mid = (range_start + range_end) / 2;
    return seg_tree[tree_idx] = fill_seg_tree(seg_tree, nums, range_start, mid, tree_idx * 2) + \
            fill_seg_tree(seg_tree, nums, mid + 1, range_end, tree_idx * 2 + 1);
}

vector<int> make_seg_tree(const vector<int>& nums)
{
    int K = 1; while(K <= nums.size()) K *= 2;
    K *= 2;
    vector<int> seg_tree(K);
    fill_seg_tree(seg_tree, nums, 0, nums.size()-1, 1);
    return seg_tree;
}

int get_range_sum_with_seg_tree(const vector<int>& seg_tree, const int range_start, const int range_end, const int search_start, const int search_end, const int tree_idx)
{
    if (range_start > search_end || range_end < search_start) return 0;
    if (range_start <= search_start && range_end >= search_end) return seg_tree[tree_idx];
    const int search_mid = (search_start + search_end) / 2;
    return get_range_sum_with_seg_tree(seg_tree, range_start, range_end, search_start, search_mid, tree_idx * 2) + \
            get_range_sum_with_seg_tree(seg_tree, range_start, range_end, search_mid+1, search_end, tree_idx * 2 + 1);
}

void update_seg_tree(vector<int>& seg_tree, const int target_idx, const int diff, const int search_start, const int search_end, const int tree_idx)
{
    if (search_start > target_idx || search_end < target_idx) return;
    seg_tree[tree_idx] += diff;
    if (search_start == search_end) return;
    const int search_mid = (search_start + search_end) / 2;
    if (search_mid >= target_idx)
        update_seg_tree(seg_tree, target_idx, diff, search_start, search_mid, tree_idx * 2);
    else
        update_seg_tree(seg_tree, target_idx, diff, search_mid + 1, search_end, tree_idx * 2 + 1);
}

int main() {
    const vector<int> nums = {1, 6, 4, 3, 8, 2, 7, 5};
    const vector<vector<int>> searches = {{0, 4}, {3, 5}, {2, 3}, {1, 5}, {2, 4}, {1, 1}, {2, 2}, {3, 5}}; // searches size = K
    const vector<vector<int>> updates = {{0, 1}, {1, 2}, {2, 3}, {3, 4}, {4, 5}, {5, 6}, {6, 7}, {7, 8} };

    // O(logN)
    vector<int> seg_tree = make_seg_tree(nums);

    // O(KlogN)
    for (int i = 0; i < searches.size(); ++i) {
        cout << get_range_sum_with_seg_tree(seg_tree, searches[i][0], searches[i][1], 0, nums.size()-1, 1) << '\n';
        update_seg_tree(seg_tree, updates[i][0], updates[i][1], 0, nums.size() -1, 1);
    }

    return 0;
}
```

코드는 위와 같다. 일반적으로 코딩테스트를 준비한다면, 위와 같이 코딩을 하여 해결하면 될 것이고, 실제 환경에 응용하고 싶다면, class로 묶어서 segment tree 자체를 사용한다는 사실 자체를 감추는 게 일반적일 것이다 (지저분한 함수 파라미터도 같이 다 정리할 수 있다.)

이렇게 구성한 segment tree는 구간합 뿐만 아니라 구간 최댓값, 최솟값을 구하는 과정에도 응용할 수 있다. 해당 구현 흐름을 이해했다면, 어렵지 않게 구현이 가능할 것이다. 재귀함수의 구조를 stack으로 이해를 한다면, search와 update 과정에서 어떻게 수행하는 것이 좋을지 고민하고 구현해보자.

### Non-recursive segment tree

해당 내용은 부록에 가까운 내용이다. 사실 재귀함수는 일반적으로 일반 loop문보다 더 많은 비용을 요구한다고 한다. 따라서, 재귀 함수 없이 구현하는 방법에 대해서 알아두면 좋을 것이다. 내 지식에서 원인을 분석하자면, 함수의 호출과 종료 과정에서 parameter 및 variable들을 할당, 정리하는데 발생하는 비용 즉, overhead로 인한 현상이라고 생각할 수 있다.

우선 non-recurisve의 경우에는 balance 형태의 트리가 아니다. 재귀를 활용할 경우에는 top-down 방식으로 값을 채워가는 방식이였다면, 구현 편의를 위해서 bottom-up 형태로 값을 채워나가기 때문에 트리를 다음과 같이 구조화 한다.

```plaintext
                               ---------------[0,15]---------------
                              /                                     \
                             /                                       \
                            /                                         \
                           /                                           \
                          /                                             \  
                  ----[0,6]----                                    ------[8,15]-------
                /               \                                /                     \
               /                 \                              /                       \
             /                   \                            /                         \  
         [0,3]                   [4,6]                   [8,11]                         [12,15]
        /     \                 /     \                 /      \                       /       \
       /       \               /       \               /        \                     /         \  
   [0,1]       [2,3]       [4,5]       [6,7]       [8,9]        [10,11]         [12,13]         [14,15]
    / \         / \         / \         / \         / \           / \             / \             / \
[0,0] [1,1] [2,2] [3,3] [4,4] [5,5] [6,6] [7,7] [8,8] [9,9] [10,10] [11,11] [12,12] [13,13] [14,14] [15,15]
```

```plaintext
                                ---------------a[1]--------------
                              /                                   \
                             /                                     \
                            /                                       \
                           /                                         \
                          /                                           \  
                  -----a[2]----                                   ----a[3]-----
                /               \                               /               \
               /                 \                             /                 \
             /                   \                           /                   \  
          a[4]                   a[5]                     a[6]                   a[7]
        /     \                 /     \                 /     \                 /     \
       /       \               /       \               /       \               /       \  
    a[8]       a[9]         a[10]      a[11]        a[12]      a[13]       a[14]       a[15]
    / \         / \         / \         / \         / \         / \         / \         / \
a[16] a[17] a[18] a[19] a[20] a[21] a[22] a[23] a[24] a[25] a[26] a[27] a[28] a[29] a[30] a[31]
```

1. segment tree 구조화하기  
    segment tree를 구조화할 때, perfect binary tree 형태로 구조화를 수행한다. 그 이후에 leaf node에 값을 하나씩 채워두는 것이다. 여기서 주의해야할 점은 빈칸에 넣을 값이다. 구간합을 구하는 경우에는 덧셈 연산에 영향을 주지 않는 0을, 구간 최댓값에는 가능한 모든 수 중에서 가장 작은 수를 그리고 최솟값에는 가능한 모든 수 중에서 가장 큰 값을 채워둔다. 그리고, 이제 depth가 큰 순 부터 값을 채워주는 것이다. segment tree의 $\text{leaf node의 index} = \text{원본 배열의 index} + 2^{depth}$ 이다.
2. segment tree update 구현하기  
    update 구현 시에는 우선 target이 되는 원본 배열의 원소를 segment tree에서 찾는다. 이후에 위에 방향으로 이를 전파해주면 끝이다.
3. segment tree query 구현하기  
    이제 구간합을 구해야하는데, 이게 꽤나 복잡하다. 우선 segment tree를 bottom-up으로 계속 뚫어져라 처다보면 규칙을 하나 찾을 수 있다. 좌측 범위에서는 짝수 index에서는 parent를 반드시 포함하고, 우측 범위에서는 홀수 index에서 parent를 반드시 포함한다. 그렇지 않은 경우에는 자기 자신은 그대로 값에 포함시키고, 좌측 범위에서는 오른쪽 parent를 우측 범위에서는 왼쪽 parent를 포함시키면 된다. 이를 반복하다가 서로 교차하거나 만나게 되면 우리가 찾아야할 모든 노드를 탐색하게 된다.

```cpp
vector<int> make_seg_tree_v2(const vector<int>& nums)
{
    int K = 1; while(K < nums.size()) K <<= 1;
    K <<= 1;
    vector<int> seg_tree(K, 0);
    for (int i = 0 ; i < nums.size(); ++i)
        seg_tree[i+(K>>1)] = nums[i];
    for (int i = (K>>1)-1; i > 0; --i)
        seg_tree[i]=seg_tree[i<<1]+seg_tree[i<<1|1];
    return seg_tree;
}

int get_range_sum_with_seg_tree_v2(const vector<int>& seg_tree, const int range_start, const int range_end)
{
    int left = range_start + (seg_tree.size()>>1);
    int right = range_end + (seg_tree.size()>>1);

    int sum = 0;
    while (left <= right)
    {
        if (left & 1) // 홀짝 판별 (홀수면 true)
        {
            sum += seg_tree[left];
            left = (left+1)>>1;
        }
        else
        {
            left >>= 1;
        }
        if (right & 1)
        {
            right >>= 1;
        }
        else
        {
            sum += seg_tree[right];
            right = (right-1)>>1;
        }

    }
    return sum;
}

// add diff
void update_seg_tree_v2(vector<int>& seg_tree, const int target_idx, const int diff)
{    
    int tree_idx = target_idx + (seg_tree.size()>>1);
    
    while (tree_idx > 0)
    {
        seg_tree[tree_idx] += diff;
        tree_idx >>= 1;
    }
}

// exchange value
// 값을 바꾸는 경우 이런식으로 규현할 수도 있음.
void update_seg_tree_v2_exchange(vector<int>& seg_tree, const int target_idx, const int value)
{
    int tree_idx = target_idx + (seg_tree.size()>>1);

    seg_tree[tree_idx] = value;
    tree_idx>>=1;
    while (tree_idx > 0)
    {
        seg_tree[tree_idx] = seg_tree[tree_idx<<1] + seg_tree[tree_idx<<1|1];
        tree_idx>>=1;
    }
}

int main() {
    const vector<int> nums = {1, 6, 4, 3, 8, 2, 7, 5};
    const vector<vector<int>> searches = {{0, 4}, {3, 5}, {2, 3}, {1, 5}, {2, 4}, {1, 1}, {2, 2}, {3, 5}}; // searches size = K
    const vector<vector<int>> updates = {{0, 1}, {1, 2}, {2, 3}, {3, 4}, {4, 5}, {5, 6}, {6, 7}, {7, 8} };

    // O(logN)
    vector<int> seg_tree = make_seg_tree_v2(nums);

    // O(KlogN)
    for (int i = 0; i < searches.size(); ++i) {
        cout << get_range_sum_with_seg_tree_v2(seg_tree, searches[i][0], searches[i][1]) << '\n';
        update_seg_tree_v2(seg_tree, updates[i][0], updates[i][1]);
    }

    return 0;
}
```

---

### Problems

- [커피숍](https://www.acmicpc.net/problem/1275)
- [구간 합 구하기](https://www.acmicpc.net/problem/2042)
- [최솟값과 최댓값 (구간 최댓값, 최솟값 구하기)](https://www.acmicpc.net/problem/2357)
- [구간 곱 구하기 (구간 곱하기, 0인 경우 유의하기)](https://www.acmicpc.net/problem/11505)
- [최솟값 찾기 (비재귀 segment tree를 이용해야 시간초과없이 답을 얻을 수 있음)](https://www.acmicpc.net/problem/11003)
