---
slug: "nlp-naive-bayes"
title: "[NLP] 5. Naive Bayes"
date: "2022-10-21 15:37"
category: "AI"
tags: ["NLP"]
thumbnailSrc: "/images/nlp-thumbnail.jpg"
---

## Intro

Naive Bayes Model은 가장 쉽게 Classification을 수행할 수 있는 Model이지만, 성능이 다른 Model에 비해 뛰어나지는 않다. 그럼에도 Naive Bayes는 가장 기본이 되는 Model이기에 비교 대상으로 많이 사용되고, Classification의 insight를 키우는데 많은 도움을 줄 수 있다. 여기서는, 전반적인 개념과 이를 직접 Spam Filtering에서 어떻게 사용하는지 살펴본다.

## Naive Bayes Model

특정 class에서 해당 데이터가 얼마나 자주 발생되는지와 실제로 해당 class의 빈도를 활용하여, classification을 수행하는 것이다. 우선 이를 수식적으로 표현하기 위해서 다음 변수들을 먼저 정의해보자.

- **documents($D$)**: 여러 개의 Document를 의미하며, 하나의 Document는 대게 여러 개의 words를 포함한다. 각 document는 $d_{i} \in D$의 형태로 표현한다.
- **classes($C$)**: class는 두 개 이상을 가진다. 각 클래스는 $c_{i} \in C$의 형태로 표현된다.
- **labeled dataset**: 이는 (document($d_{i}$), class($c_{i}$))가 하나씩 mapping된 형태로 존재한다. 우리가 가지는 dataset으로 학습, 평가 시에 사용한다. 대게 평가에 사용되는 데이터는 학습 시에 사용하는 것을 금지하기 때문에 별도로 분리하여 사용한다.
- **word($w$)**: 하나의 word를 의미하며 NLP 학습 시에 사용하는 가장 작은 단위이다. 대게 document 하나에 있는 단어의 수는 N으로 표기하고, unique한 단어의 수는 V(size of vocabulary)로 표시한다.

따라서, 우리가 찾고자 하는 가장 높은 확률을 가진 class는 다음을 통해서 구할 수 있다.

$$
\begin{align*}
c_{MAP} &= \argmax_{c \in C}{P(c|d)} \\
&= \argmax_{c \in C}{p(d|c)p(c)\over p(d)} \\
&= \argmax_{c \in C}{p(d|c)p(c)} \\
&= \argmax_{c \in C}{p(w_{1}, w_{2}, ... , w_{N} | c)p(c)} \\
&= \argmax_{c \in C}{\prod_{i=1}^{N}p(w_{i}|c)p(c)} \\
&= \argmax_{c \in C}{\log(\prod_{i=1}^{N}p(w_{i}|c)p(c))} \\
&= \argmax_{c \in C}{\sum_{i=1}^{N}\log p(w_{i}|c) + \log{p(c)}} \\
\end{align*}
$$

여기서 우리가 language model을 무엇으로 정했는지가 중요하다. 위에서는 uni-gram이라고 가정해서 풀이했지만, bi-gram인 경우 document의 형태가 $d={(w_{1}, w_{2}), (w_{2}, w_{3}), ... , (w_{N-1}, w_{N})}$이다. 따라서, 전체적인 크기와 vocabulary자체도 바뀌게 된다.

즉, 우리는 train set을 통해서 vocabulary를 완성한다. 그리고, 각 word의 count 및 필요에 따라 필요한 word sequence의 count를 수집하여 $p(w_i)$를 구한 후 위에 방법을 통해서 특정 class를 추측할 수 있는 것이다.

이제 구체적인 Naive Bayes의 동작 절차는 Spam Filtering이라는 Case Study를 통해서 자세히 살펴보도록 하자.

## Case Study. Spam Filtering

초기 NLP가 가장 많이 사용되었던 예시 중에 하나이다. 여러 개의 메일에 spam인지 ham인지를 labeling한 데이터를 갖고 후에 input으로 mail 데이터가 들어왔을 때, 이를 filtering하는 것이다. 위에서 살펴보았던 확률을 그대로 적용하면 된다. 예측에 필요한 확률을 습득하고, 예측하는 방법과 이를 평가하는 방법의 순으로 설명하겠다.

### 0. Preprocessing

사실 mail data의 형태가 이상할 수도 있다. Subject부터 시작하여 날짜 데이터 그리고 특수 문자 등이 존재할 수 있는데, 이를 먼저 처리해서 후에 있을 Modeling 단계에서 잘 사용할 수 있도록 형태를 변형해주어야 한다.

[🔗 이전 Posting(Text Processing)](/posts/nlp-text-processing)에서 배웠던 기술들을 활용하여 이를 해결할 수 있다.

대표적으로 해줄 수 있는 작업들은 다음과 같다.

1. 대소문자 통일
2. alphabet이 하나라도 들어있지 않은 데이터는 삭제
3. date, 참조 등을 의미하는 데이터 삭제

### 1. Modeling

Parameter Estimation / Learning / Modeling 등으로 불리는 단계이다. 일단 우리는 train set으로부터 우리가 원하는 확률을 추출해야 한다. 그 전에 우리가 어떤 language model을 이용할지 선택해야 한다. 먼저 uni-gram인 경우에는 다음과 같은 방법으로 train set이 정의된다.
$$
\text{TrainSet} = {(d_{1}, c_{1}),  (d_{2}, c_{2}), ..., (d_{N}, c_{N})}
$$
$$
d_{i} = \begin{cases}
  {w_{1}, w_{2}, ... , w_{M_{i}}} \quad&\text{unigram} \\
  {(<s>, w_{1}), (w_{1}, w_{2}), ... , (w_{M_{i}}, </s>)} \qquad&\text{bigram}
\end{cases}
$$

이제 우리가 원하는 parameter, 즉 확률은 다음과 같은 데이터이다.

> **unigram**

$$
\begin{align*}
p(w_{i}|c_{j}) &= {\text{count}(w_{i}, c_{j}) \over \sum_{w \in V} \text{count}(w, c_{j})} \\
p(c_{j}) &= {\sum_{i = 1}^{N}{1[c_{i} = c_{j}]} \over N}
\end{align*}
$$

> **bigram**

$$
\begin{align*}
p(w_{i}|w_{i-1},c_{j}) &= {\text{count}((w_{i-1}, w_{i}), c_{j}) \over \sum_{(w^{(1)}, w^{(2)}) \in V} \text{count}((w^{(1)}, w^{(2)}), c_{j})} \\
p(c_{j}) &= {\sum_{i = 1}^{N}{1[c_{i} = c_{j}]} \over N}
\end{align*}
$$

여기서 우리는 반드시 Smoothing을 해주어야 한다. 왜냐하면, spam mail에서 안 본 단어가 나올 가능성이 너무나 높기 때문이다. 따라서, 실제 $p(w_{i}|c_{j})$는 아래와 같이 변경된다. (간단한 예시를 들기 위해서 Add-1 방식을 사용했다. - 해당 내용이 기억이 나지 않는다면, [🔗 이전 포스팅](/posts/nlp-language-modeling)을 다시 보고 오자.)

$$
p(w_{i}|c_{j}) = {\text{count}(w_{i}, c_{j}) + 1 \over \sum_{w \in V} \text{count}(w, c_{j}) + |V|}
$$

주의할 점은 다시 한 번 강조하지만, $V$는 후에 Estimation에서 input으로 사용하는 단일 document까지 포함한 Vocabulary이다.

### 2. Estimation

이제 우리가 얻은 parameter를 이용해서 실제 input data에 대한 estimation을 수행할 수 있다.

이 경우 다음과 같은 과정을 수행할 수 있다.

$$
\hat{c} = \argmax_{c \in C} p(c)\prod_{w \in d_{\text{input}}}p(w|c)
$$

물론 어떤 n-gram을 쓰냐에 따라 $d_{\text{input}}$도 형태가 달라질 것이다.

### 3. Evaluation

이제 평가를 수행할 것이다. 평가는 우리가 알아봤던 Accuracy와 F1 Score를 추출할 수 있다. Binary Classification이기 때문에 쉽게 구할 수 있을 것이다.

| prediction\answer | True                                                                       | False                                                                     |
| :---------------- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| Positive          | $\sum_{(d, c) \in D_{\text{test}}} 1[\hat{c}_{d} = c, c = \text{spam}]$    | $\sum_{(d, c) \in D_{\text{test}}} 1[\hat{c}_{d} \neq c, c = \text{ham}]$ |
| Negative          | $\sum_{(d, c) \in D_{\text{test}}} 1[\hat{c}_{d} \neq c, c = \text{spam}]$ | $\sum_{(d, c) \in D_{\text{test}}} 1[\hat{c}_{d} = c, c = \text{ham}]$    |

## Reference

- Tumbnail : Photo by [David Ballew](https://unsplash.com/@daveballew?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/@daveballew?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
