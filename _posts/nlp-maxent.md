---
slug: "nlp-maxent"
title: "[NLP] 7. MaxEnt"
date: "2022-11-07 10:02"
category: "AI"
tags: ["NLP", "MaximumEntropyModel", "softmax"]
thumbnailSrc: "/images/nlp-thumbnail.jpg"
---

## Intro

해당 Posting에서는 Maximum Entropy를 이용하여 최적의 parameter를 찾아나가는 Machine Learning 접근법에 기반한 NLP 방식을 제안한다. 이를 위해서 NL를 수학적인 형태로 변형하기 위한 기술 중 하나인 word2vec에 대한 설명도 같이 진행한다.

## MaxEnt Model

Maximum Entropy Model(MEM)의 약자로, 이것의 의미는 주어진 dataset을 표현할 수 있는 가장 적절한 분포는 Prior Knowledge를 만족하는 분포들 중에서 가장 높은 Entropy를 가지는 분포라는 것이다.  

이는 다음과 같은 관측에 의해서 정의된 것이다.

1. 다양한 물리현상들은 시간이 지남에 따라 Entropy를 최대화하려는 방향으로 이동하려는 경향이 있다.
2. 더 적은 수의 논리로 설명이 가능한 경우, 많은 수의 논리를 세우지 말라 (오컴의 면도날)

다소 억지같아 보이는 논리일지라도 후에 가서 살펴보면, Machine Learning의 Logistic Regression에 연결되는 것을 볼 수 있다. 우선은 이 정도 논리로 사용하겠다는 정도로 이해해보자.

따라서, 우리가 풀어야할 식은 다음과 같다.

$$
\begin{align*}
  \text{maximize}   \quad & H(p) = - \sum_{i=1}^{N}p_i\log p_i &\\
  \text{subject to} \quad & p_i \geq 0, & i = 1, ..., N \\
                          & \sum_{i=1}^{N}p_i = 1 &\\
                          & \text{Other Prior Knowledge}
\end{align*}
$$

이를 이용해서 문제를 세 개 정도 풀어보면 감이 잡을 수 있는데 한 번 따라와보도록 하자.

### Example

> <mark>**1. 주사위 던지기**</mark>

1부터 6까지의 눈이 있는 주사위가 있다고 할 때, 주사위의 각 눈이 나올 확률을 알고 싶다고 하자. 이때 우리는 간단하게 $1\over6$이라고 말할 것이다. 이것도 Maximum Entropy에 기반한 추론 방법 중에 하나라고 할 수 있다. 다음 식을 보자.

$$
\begin{align*}
  \text{maximize}   \quad & H(p) = - \sum_{i=1}^{N}p_i\log p_i &\\
  \text{subject to} \quad & p_i \geq 0, & i = 1, ..., N \\
                          & \sum_{i=1}^{N}p_i = 1 &
\end{align*}
$$

정말 아무런 정보가 없을 때에는 위의 식을 Lagrangian을 쓰지 않고도 uniform distribution이라는 것을 알 수 있다. 이는 [🔗 [ML] Base Information Theory](/posts/ml-base-knowledge#Information-Theory)에서 살펴보았었다.

그렇다면, 좀 더 복잡한 경우를 고려해보자. 아래는 Duke University ECE587 수업 PPT의 예제이다.

> <mark>**2. 평균이 주어졌을 때의 추론**</mark>

우리가 만약 평균 데이터를 알고 있다면, 이를 Maximum Entropy로 어떻게 추정할 수 있는지를 살펴볼 것이다. 아래는 어느 fastfood점의 메뉴라고 하자.

| Item    | Price | Calories |
| :------ | :---- | :------- |
| Burger  | $1    | 1000     |
| Chicken | $2    | 600      |
| Fish    | $3    | 400      |
| Tofu    | $8    | 200      |

그리고 특정 학생이 이 가게에서 하루에 하나씩 먹는다고 할 때, 평균 소비 가격이 $2.5라고 하자. 그렇다면, 이 학생이 가장 많이 먹는 메뉴는 무엇일지를 추론해보는 것이다.  
즉, 이를 식으로 정리하면 다음과 같다.

$$
\begin{align*}
  \text{maximize}   \quad & H(p) = - \sum_{i=1}^{N}p_i\log p_i &\\
  \text{subject to} \quad & p_i \geq 0, & i = 1, ..., N \\
                          & \sum_{i=1}^{N}p_i = 1 &\\
                          & E[\text{price}] = 2.5 &
\end{align*}
$$

이를 Lagrangian 방식을 이용해서 표현하면 다음과 같이 나타낼 수 있다.

$$
\mathcal{L} = - \sum_{i}^{N}p_{i}\log{p_{i}} + \lambda_{0}(\sum_{i=1}^{N}p_{i} - 1) + \lambda_{1}(\sum_{i=1}^{N}\text{price}_{i}\times{p_{i}} -2.5)
$$

위 식을 각 각의 $p_{i}$에 대해서 미분하면 다음과 같다.

$$
{\partial \mathcal{L}\over\partial p_{i}} = -\log{p_{i}} -1 + \lambda_{0} + \lambda_{1}\times\text{price}_{i}
$$

따라서, $p_{i}$는 다음과 같다.

$$
\begin{align*}
0 &= -\log{p_{i}} -1 + \lambda_{0} + \lambda_{1}\times\text{price}_{i} \\
\log{p_{i}} &= \lambda_{0} + \lambda_{1}\times\text{price}_{i} - 1 \\
p_{i} &= e^{\lambda_{0} + \lambda_{1}\times\text{price}_{i} - 1}
\end{align*}
$$

여기서 나오는 모든 식과 제한 조건을 정리하면 다음과 같다.

- $p(Burger) = e^{\lambda_{0} + \lambda_{1} - 1}$, $p(Chicken) = e^{\lambda_{0} + 2\lambda_{1} - 1}$, $p(Fish) = e^{\lambda_{0} + 3\lambda_{1} - 1}$, $p(Tofu) = e^{\lambda_{0} + 8\lambda_{1} - 1}$
- $p(Burger) + p(Chicken) + p(Fish) + p(Tofu) = 1$
- $p(Burger) + 2p(Chicken) + 3p(Fish) + 8p(Tofu) = 2.5$

위의 식을 연립해서 풀면, $\lambda_{0} = 1.2371$, $\lambda_{1}=0.2586$이고, 전체 확률은 다음과 같다.

| Item    | p      |
| :------ | :----- |
| Burger  | 0.3546 |
| Chicken | 0.2964 |
| Fish    | 0.2478 |
| Tofu    | 0.1011 |

> <mark>**3. 주사위의 눈의 합**</mark>

1번에서 보았던 주사위를 n개 던져서 나온 눈의 합을 알 때, 주사위의 비율을 추정한다고 해보자.

이때 우리는 다음과 같은 변수를 정의할 수 있다.

- 주사위의 갯수 : $n$
- i개의 눈을 가진 주사위의 갯수 : $n_{i}$
- 전체 눈의 수의 합 : $n\alpha$
- 추가되는 Prior Knowledge : $\sum_{i=1}^{6}{i n_{i}} = n\alpha$

이를 Maximum Entropy를 이용해서 풀게 되면 다음과 같은 결론을 얻을 수 있다.

$$
p_{i} = {e^{\lambda_{i}}\over{\sum_{i=1}^{6}{e^{\lambda_{i}}}}}
$$

## Generalization

Maximum Entropy를 위의 식을 통해서 구하는 것도 문제는 없지만 우리는 좀 더 일반화된 식을 원한다. 따라서, 이를 표현하기 위해서 다음과 같은 상황을 고려해보는 것이다. 우리가 마지막 보았던 예시가 사실은 우리가 하고자 하는 과정을 대표하는 하나의 예시이다. 우리가 가진 사전 지식은 이전에 관측한 데이터와 이것의 class이다. 따라서, 우리는 관측 결과의 가짓수(class)가 $K$개이고, 데이터의 input과 결과를 $(X, Y)$ 쌍이 라고 할 때, 특정 input data($X_{i}$)가 class k일 확률은 다음과 같이 표현할 수 있다.

$$
p(Y_{i} = k) = {e^{w^{\top}_{k}X_{i}}\over{\sum_{k^{\prime}=1}^{K}{e^{w_{k^{\prime}}^{\top}X_{i}}}}}
$$

여기서 가장 중요한 Point가 발견된다. 바로 이 식이 **softmax** 함수라는 것이다. <mark>즉, Maximum Entropy를 통한 classification의 의미는 사실상 multinomial logistic regression의 다른 이름일 뿐이다.</mark> (logistic regression에 대한 내용은 [🔗 [ML] 3. Logistic Regression](/posts/ml-logistic-regression)에서 다루었다.)

따라서, 여기서는 별도로 Modeling, Estimation, Smoothing 절차를 다루지 않는다. machine learning의 방법과 동일하기 때문이다.

## Features

NL의 가장 큰 특징은 data가 sparse하다는 것이다. domain마다 사용되는 언어와 빈도가 너무나 천차만별이기 때문에 sparse 현상이 필연적으로 발생한다. 이를 극복하기 위해서 대게의 data는 domain 별로 따로따로 수집하는 것이 일반적이다. 또한, data에서 올바른 feature를 추출하는 것이 굉장히 중요하다.  
이를 위해 NL에서 전통적으로 쓰던 방식은 대소문자 여부, 억양 표기, 품사, 문장구조, 뜻 등을 단어에 미리 적용하기도 하여 이를 이용하는 방법도 있다. 그런데 이러한 품사, 뜻 등을 찾아내는 과정도 Statistical Inference가 필요하다. 따라서, 앞으로 chapter에서는 품사와 문장구조 뜻을 정의하기 위한 기술들과 이를 어떻게 찾을 수 있는지를 알아볼 것이다.

또한, Word자체를 Vector로 치환하여 사용하는 Word2Vec방식에 대해서도 살펴보도록 하겠다.

## Reference

- Tumbnail : Photo by [David Ballew](https://unsplash.com/@daveballew?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/@daveballew?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- Maximum Entropy 자료 참고, <https://www2.isye.gatech.edu/~yxie77/ece587/Lecture11.pdf>
