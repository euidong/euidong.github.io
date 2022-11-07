---
slug: "nlp-classification"
title: "[NLP] 4. Classification"
date: "2022-10-21 13:37"
category: "AI"
tags: ["NLP", "Classification", "Generative", "Discriminative", "ModelEvaluation"]
thumbnailSrc: "/images/nlp-thumbnail.jpg"
---

## Intro

이전 Posting에서는 sentence의 적절성을 확인한다든지 다음 단어를 유추한다든지 오타를 정정하는 등에 필요한 기본적인 Language Modeling 방식을 살펴보았다. 이번에는 실제로 가장 많이 사용되는 예제인 Classification을 Language Model을 이용하여 어떻게 구현하는지를 다룬다.

## Classification

Classification은 input이 들어왔을 때, 이를 알맞은 분류로 나누는 것이 목표이다. 단순히 Rule에 기반하여 이를 수행할 수도 있지만, Statistic한 Language Modeling을 이용하면, 더 정확도가 높은 분류를 수행할 수 있다. 결국 Statistic Prediction을 수행하기 위해서 우리는 3개(Estimation, Modeling, Evaluation)를 중점적으로 봐야 하는 것은 Classification도 동일하다. 따라서, 이에 대해서 살펴볼 것이고, 그 전에 먼저 Classification Model 의 종류를 살펴보도록 하겠다.

## Generative Model vs Discriminative Model

Classification에서 이용되는 Model을 크게 두가지로 나눌 수 있는데 이에 대해서 먼저 알아보도록 하자.

1. **Generative Model(생성 Model)**
   1. Naive Bayes
   2. Hidden Markov Model(HMM)
2. **Discriminative Model(판별 Model)**
   1. Logistic Regression
   2. K Nearest Neighbors
   3. Support Vector Machine
   4. Maximum Entropy Model(MaxEnt)
   5. Neural Network(Deep Learning)

두 Model의 가장 큰 차이점은 추론의 과정이다. 우리가 원하는 데이터 $P(\text{class}=c | \text{input} = \text{data})$(특정 data가 주어졌을 때, 각 class의 속할 확률)를 얻는 과정이 서로 다르다.

**첫 번째**로, $P(\text{class}=c, \text{input} = \text{data})$일 확률을 구하여 **간접적**으로 구하는 방법이다.

$$
\begin{align*}
P(\text{class}=c | \text{input} = \text{data}) &= {{P(\text{class}=c, \text{input} = \text{data})}\over{P(\text{input} = \text{data})}} \\
&\propto {P(\text{class}=c, \text{input} = \text{data})}
\end{align*}
$$

이런 식으로 생성하여 추론하는 방식을 <mark>Generative Model</mark>이라고 한다. 이 방식은 결국 Conditional Probability를 추론하기 위해서 Joint Probability를 이용하는 방식이기 때문에 어느정도 한계가 존재한다는 점을 유의하자.

**두 번째**로는, $P(\text{class}=c | \text{input} = \text{data})$를 **직접적**으로 구하는 방법이 있다. 이를 위해서, 마친 Conditional Probability를 구한 것과 유사한 효과를 내는 **Discriminant Function(판별 함수)**이라는 특별한 함수를 input에 적용하는 방법이다. 이 함수 중에서 가장 대표적인 것이 Softmax function이다. 우리가 만약 input을 softmax function에 입력하게 되면, 이 값은 [0, 1] 사이의 값으로 표현된다. 이를 통해서 우리는 해당 input이 class인 경우 1에 가깝게, 그렇지 않은 경우 0에 가깝게 표현하여 여러 데이터에 적용하면, class의 inpuut에 따른 분포 양상을 확인할 수 있다. 그리고, 이 분포 양상을 확률로 즉각적으로 표현할 수 있기 때문에 softmax function을 취한 결과가 $P(\text{class}=c | \text{input} = \text{data})$과 비례한다는 결론을 낼 수 있다. 자세한 설명이 필요하다면, [🔗 Logistic Regression](/posts/ml-logistic-regression#Logistic-Regression)을 참고하도록 하자. 이러한 방식을 우리는 <mark>Discriminative Model</mark>이라고 한다.

위에서 제시한 방법들 중 대표적인 방법들은 별도의 Posting을 통해서 정리하였다. 해당 링크를 참조하여 확인해보도록 하자.

- **Generative Model(생성 Model)**
  - [🔗 Naive Bayes](/posts/nlp-naive-bayes)
  - [🔗 Hidden Markov Model(HMM)](/posts/nlp-hmm)
- **Discriminative Model(판별 Model)**
  - [🔗 Maximum Entropy Model(MaxEnt)](/posts/nlp-maxent)
  - [🔗 Logistic Regression](/posts/ml-logistic-regression)

## Estimation

어떤 Model을 선택했다고 하더라도 결국 우리가 Class를 결정하는 과정을 동일하다. 위의 과정을 통해서 어찌되었든 다음 값을 찾으면 된다.

$$
\begin{align*}
c^{\prime} &= \argmax_{c \in C}{P(\text{class}=c | \text{input} = \text{data})}
\end{align*}
$$

## Modeling

Model을 만드는 과정, 즉 학습하는 과정은 결국 Model의 구현마다 천차 만별이다. Naive Bayes는 단순하게 data의 word와 count를 활용하고, HMM은 EM algorithm을 활용하며, Linear Regression은 Gradient Descent를 활용한다. 따라서, 여기서는 자세히 다루지 않고 위에서 제시한 링크를 따라가서 각 Model마다의 학습법을 확인해보도록 하자.

## Evaluation

Classification의 성능을 평가하는 것 역시 중요한 일이다. 가장 쉬운 Binary Classification부터 알아보자.

binary classificaiton의 결과는 아래와 같이 4개 중 하나로 결정된다.

| prediction\answer | True           | False          |
| :---------------- | :------------- | :------------- |
| Positive          | true positive  | false positive |
| Negative          | false negative | true negative  |

이를 쉽게 이해할려면, 병(코로나)의 양성/음성 판정이 row에 해당하고, 실제 병의 여부를 column으로 생각하면 쉽다. 또한, 각 cell의 값이 헷갈릴 수 있는데, 우리가 원하는 것이 예측의 정확도를 확인하는 것이기 때문에 예측 결과는 그대로 보여주면서, 이것이 틀렸는지 맞았는지를 앞에 true/false로 표현했다고 생각하면 쉽다.

classification의 성능을 측정하는 지표는 대표적으로 4 가지가 있다.

1. **Accuracy(정확도)**  
   가장 쉽게 그리고 일반적으로 생각하는 지표다. 위의 표에서는 전체 경우의 수를 더하여 옳게 예측한 것(true postive, true negative)의 합을 나누는 것이다.
   $tp + fn \over tp + fp + fn + tn$  
   하지만, 이 방식은 한계가 있다. 바로, 데이터가 한쪽으로 치우쳐져있을 때이다. 예를 들어, 우리가 진짜를 진짜라고 맞출확률은 높지만, 가짜를 가짜라고 맞출 확률이 낮다고 할 때, 이를 제대로 반영하기가 어렵다. 그런데 데이터에서 진짜가 가짜보다 압도적으로 많을 경우 정확도는 좋은 지표로 쓰기 어렵다는 것이다.
2. **Precision(정밀도, 정답률)**  
   쉽게 정답 자체를 맞힐 확률입니다.  
   $tp \over tp + fn$
3. **Recall(재현율)**  
   예측이 맞을 확률을 의미합니다.  
   $tp \over tp + fp$
4. **F1 Score**  
   좀 더 세분화된 평가지표이다. 조화 평균에 기반하여 모델의 성능을 정확하게 평가할 때 사용한다.  
   ${2\over{{1\over\text{Precision}} + {1\over\text{Recall}}}} = 2 \times {\text{Precision} \times \text{Recall} \over \text{Precision} + \text{Recall}}$

여기까지 봤으면, 슬슬 multi class의 경우에는 어떻게 해야할지 궁금할 것이다. 대게 두 가지 방법을 통해서 수행할 수 있다.

> **1. Micro Average**

전체 class를 하나의 binary table로 합치는 것이다. 즉, 클래스가 A, B, C 3개가 있다면, 각 클래스 별로 예측 성공도를 binary로 표시하고, 이를 하나의 테이블로 합치는 것이다. 그 후에는 binary에서 계산하는 식을 그대로사용할 수 있다.  

> **2. Macro Average**

multi class의 경우에도 별로 다를 것은 없다. 단지 Precision과 Recall 그리고 Accuracy가 어떻게 바뀌는지만 알면 쉽게 이해할 수 있을 것이다.  

| prediction\answer | c1            | c2            | c3            | c4            |
| :---------------- | :------------ | :------------ | :------------ | :------------ |
| c1                | true positive | x             | x             | x             |
| c2                | x             | true positive | x             | x             |
| c3                | x             | x             | true positive | x             |
| c4                | x             | x             | x             | true positive |

- Precision: $c_{ii} \over \sum_{j}c_{ij}$
- Recall: $c_{ii} \over \sum_{j}c_{ji}$
- Accuracy: $c_{ii} \over \sum_{i}\sum_{j}c_{ij}$

## Reference

- Tumbnail : Photo by [David Ballew](https://unsplash.com/@daveballew?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/@daveballew?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
