---
slug: "architecture-arithmetic"
date: "2022-04-25"
title: "Arithmetic"
tags: ["ComputerOrganizationAndDesign", "Arithmetic"]
category: "Computer Architecture"
thumbnailSrc: "/images/default.jpg"
---
## **Reference**

![<img src="/images/default.jpg" width="190" />](/images/default.jpg)

David A. Patterson, John L. Hennessy, Computer Organization and Design

본 Posting은 다음 교제를 기반으로 챕터 별로 정리 한 내용입니다. 아래부터는 편의를 위해 "-다"로 표현합니다.

---

여기서는 기본이 되는 **사칙연산**과 **소수점**의 표현방식(**Floating Point**)을 다룹니다.

## Overflow

시작하기에 앞서서 Overflow라는 개념을 알고가야한다. Overflow란 특정 변수의 표현범위를 벗어나는 경우에 발생하게 되는 에러 상황을 의미한다. 일반적인 사람의 생각에는 수의 범위가 있는 것은 이상할 수 있지만, 컴퓨터에서는 이것이 매우 당연하다. 무한대를 표현하는 것은 사실상 컴퓨터로는 불가능하다. 대신 매우 큰 수를 통해서 표현하는 것이 컴퓨터에게는 일반적이다. 예를 들어 우리가 빈번하게 사용하는 integer 변수 type은 그 값의 범위가 정해져있다. 이는 대게 하나의 변수를 표현하기 위해서 4bytes를 사용하는데 이는 32bits이기 때문에, 최대 $2^{32}$까지가 표현의 범위가 되는 것이다. 여기에 음수를 표현하게 되는 경우에는 범위가 $-2^{31}$ ~ $2^{31}$로 제한된다. 따라서, 이렇게 범위를 벗어나는 경우에 대해서는 programming language 마다 처리가 달라지지만, 대게 에러를 발생시키는 것이 일반적이다. (python에서는 알아서 범위를 추가한다.)

## 덧셈 / 뺄셈
덧셈은 각 자릿수의 합과 이전 자릿수에서 올림된 수(Carry)의 합이라고 다시 해석할 수 있다. 
이진수에서는 결국 올림된 수와 두 수가 만들어 낼 수 있는 경우의 수는 00 ~ 11이다.

| A    | B    | Carry | Result |
| :--- | :--- | :---- | :----- |
| 0    | 0    | 0     | 00     |
| 0    | 0    | 1     | 01     |
| 0    | 1    | 0     | 01     |
| 0    | 1    | 1     | 10     |
| 1    | 0    | 0     | 01     |
| 1    | 0    | 1     | 10     |
| 1    | 1    | 0     | 10     |
| 1    | 1    | 1     | 11     |


이를 위해서, 우리에게 필요한 것은 단 두 가지이다(OR Gate, AND Gate).

