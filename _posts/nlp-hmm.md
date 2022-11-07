---
slug: "nlp-hmm"
title: "[NLP] 6. Hidden Markov Model"
date: "2022-10-21 21:55"
category: "AI"
tags: ["NLP", "MarkovModel", "HMM", "HiddenMarkovModel"]
thumbnailSrc: "/images/nlp-thumbnail.jpg"
---

## Intro

이전까지 특정 word를 기반으로 하여 modeling을 수행하는 방법을 알아보았다. 하지만, 우리가 특정 word의 sequence를 통해서 각 word에 대한 classification을 한 번에 하고 싶은 경우는 어떻게 할까?(예를 들어, 각 단어의 품사를 지정하는 일) 일반적으로 각 단어가 특정 해당 class일 확률로 구하는 방법이 일반적일 것이다. 하지만, 문맥을 고려하여 확률을 구할 방법은 없을까? 그 방법은 바로 bigram을 이용하면 될 것이다. 그렇다면, 사실 우리가 사용하는 문맥이 단어 자체보다는 이전 class가 더 영향이 크다면, 이는 어떻게 해야할까? 이를 위한 해결책이 HMM이다. NLP 뿐만 아니라 여러 분야에서 넓게 사용되고 있지만, 여기서는 NLP 분야에서 어떻게 이를 사용하는지를 알아볼 것이다.

## Markov Model

HMM을 알아보기전에 Markov Model을 알아야 한다. 이는 특정 sequence의 확률을 추정하는 방법이다. 즉 우리에게 state sequence ($S= {s_{0}, s_{1}, ..., s_{N}}$)가 주어질 때, 각 state에서 다음 state로 전이(이동)할 확률을 이용해서 state sequence의 확률을 구하는 방법이다.

![nlp-markov-model-1](/images/nlp-markov-model-1.jpg)

위의 그림이 state 각 각에서 다음 state로 전이할 확률을 나타낸 것이라면, 우리는 아래 그림과 같은 그림으로 sequence의 확률을 추론할 수 있는 것이다.

![nlp-markov-model-2](/images/nlp-markov-model-2.jpg)

따라서, 위의 그림에서 우리가 만약 $(s_{0}, s_{1}, s_{0}, s_{2})$으로 이루어진 sequence의 확률을 얻기를 바란다면, 그 확률은 아래와 같아진다.
$$
\begin{align*}
p(s_{0}, s_{1}, s_{0}, s_{2}) &= p(s_{0}| \text{start}) \times p(s_{1}|s_{0}) \times p(s_{0}|s_{1}) \times p(s_{2}|s_{1}) \times p(end|s_{2}) \\
&= \pi_{0} \times p_{01} \times p_{10} \times p_{12} \times 1
\end{align*}
$$

이를 잘 살펴보니 bigram에서의 Likelihood를 구하는 공식과 똑같다. 즉, state 각 각을 word라고 본다면, Markov Model을 통해서 구할 수 있는 확률은 bigram의 Likelihood인 것이다.

그리고 이를 일반화하면 다음과 같다.

$$
p(seq) = \prod_{i=1}^{N}p(seq_{i}|seq_{i-1})
$$

그런데, 여기서 n이 3 이상인 ngram을 적용하고 싶다면, 각 state를 n-1 gram으로 설정하면 된다.

$$
\begin{align*}
X_{i} &= (Q_{i-1}, Q_{i}) \text{라면, }\\
P(X_{i} | X_{i-1}) &= P(Q_{i-1}, Q_{i} | Q_{i-2}, Q_{i-1}) \\
&= P(Q_{i} | Q_{i-2}, Q_{i-1})
\end{align*}
$$

따라서, trigram을 적용해보면 아래와 같다.

$$
\begin{align*}
p((start, w_{0}), (w_{0}, w_{1}), (w_{1}, w_{0}), (w_{0}, w_{2})) &= p(w_{0}| \text{start}, \text{start}) \times p(w_{1}|\text{start}, w_{0}) \times p(w_{0}|w_{0}, w_{1}) \times p(w_{2}|w_{1}, w_{0}) \times p(end|w_{0}, w_{2}) \\
&= \pi_{0} \times p_{01} \times p_{10} \times p_{12} \times 1
\end{align*}
$$

## Hidden Markov Model

Hidden Markov Model은 state를 하나 더 만든다는 것이 핵심이다. 그래서, 우리가 직접 관측하는 state(**observed state**)와 직접적으로 관측하지 않지만, 관측한 state들에 의존하는 state(**hidden state**) 총 두 개의 state를 사용한다. 일반적인 예시가 text가 입력되었을 때 우리는 각 단어를 observed state라고 한다면, 각 단어의 품사를 hidden state라고 정의할 수 있다.

![nlp-markov-model-3](/images/nlp-markov-model-3.jpg)

위의 예시는 우리가 관측하는 데이터($O$)가 3개의 state를 가지고, 이 사건에 의존적인 또 다른 사건($H$)이 3개의 state를 가지는 경우이다. 이를 이용해서 기존 Markov Model보다 복잡한 작업을 수행하는 것이 가능하다.

### Estimation

우리가 할 수 있는 작업은 크게 두 가지이다. 일반적인 Markov Model에서 할 수 있던 방식이 **Trellis** 방식이고, 또 다른 방식이 **Viterbi** 방식이다.

1. $(o_{0}, o_{1}, o_{0}, o_{2})$의 확률이 궁금할 때(**Trellis**)
2. $(o_{0}, o_{1}, o_{0}, o_{2})$가 주어질 때, 이것의 hidden state의 sequence 중 가장 유력한 sequence를 찾고자할 때(**Viterbi**)

위의 경우를 각각 풀어보도록 하자.

> <mark>**1. Trellis**</mark>

우리가 직접 관측한 데이터의 sequence 자체의 확률이 궁금할 때이다. 따라서, 이에 대한 분석은 $(o_{0}, o_{1}, o_{0}, o_{2})$의 확률을 분석해보면서 설명하겠다.

$$
\begin{align*}
p(o_{0}, o_{1}, o_{0}, o_{2}) &= p(o_{0}, o_{1}, o_{0}) \times p(o_{2} | o_{0}, o_{1}, o_{0}) \\
&= p(o_{0}, o_{1}, o_{0}) \times \{p(o_{2} | h_{0})p(h_{0} | o_{0}, o_{1}, o_{0}) + p(o_{2} | h_{1})p(h_{1} | o_{0}, o_{1}, o_{0}) + p(o_{2} | h_{2})p(h_{2} | o_{0}, o_{1}, o_{0})\} \\
&= p(o_{0}, o_{1}, o_{0}) \times \sum_{i=0}^{2}{p(o_{2} | h_{i})p(h_{i} | o_{0}, o_{1}, o_{0}) } \\
&= p(o_{0}, o_{1}) \times \sum_{i=0}^{2}{p(o_{0} | h_{i})p(h_{i} | o_{0}, o_{1}) } \times \sum_{i=0}^{2}{p(o_{2} | h_{i})p(h_{i} | o_{0}, o_{1}, o_{0}) } \\
&= p(o_{0}) \times \sum_{i=0}^{2}{p(o_{1} | h_{i})p(h_{i} | o_{0}) } \times \sum_{i=0}^{2}{p(o_{0} | h_{i})p(h_{i} | o_{0}, o_{1}) } \times \sum_{i=0}^{2}{p(o_{2} | h_{i})p(h_{i} | o_{0}, o_{1}, o_{0}) } \\
&= \sum_{i=0}^{2}p(o_{0}|h_{i})p(h_{i}|start) \times \sum_{i=0}^{2}{p(o_{1} | h_{i})p(h_{i} | o_{0}) } \times \sum_{i=0}^{2}{p(o_{0} | h_{i})p(h_{i} | o_{0}, o_{1}) } \times \sum_{i=0}^{2}{p(o_{2} | h_{i})p(h_{i} | o_{0}, o_{1}, o_{0}) }
\end{align*}
$$

이를 그림으로 표현하면 다음과 같다.

![nlp-hidden-markov-model-1](/images/nlp-hidden-markov-model-1.jpg)

또한, 이 식을 다음과 같이 축소가 가능하다.

$$
\begin{align*}
  &\sum_{i=0}^{2}p(o_{0}|h_{i})p(h_{i}|start) \times \sum_{i=0}^{2}{p(o_{1} | h_{i})p(h_{i} | o_{0}) } \times \sum_{i=0}^{2}{p(o_{0} | h_{i})p(h_{i} | o_{0}, o_{1}) } \times \sum_{i=0}^{2}{p(o_{2} | h_{i})p(h_{i} | o_{0}, o_{1}, o_{0}) } \\
  =& \sum_{i=0}^{2}\alpha_{0 i} \times \sum_{i=0}^{2}{p(o_{1} | h_{i})p(h_{i} | o_{0}) } \times \sum_{i=0}^{2}{p(o_{0} | h_{i})p(h_{i} | o_{0}, o_{1}) } \times \sum_{i=0}^{2}{p(o_{2} | h_{i})p(h_{i} | o_{0}, o_{1}, o_{0}) } \\
  =& \sum_{i=0}^{2}{\alpha_{1 i} } \times \sum_{i=0}^{2}{p(o_{0} | h_{i})p(h_{i} | o_{0}, o_{1}) } \times \sum_{i=0}^{2}{p(o_{2} | h_{i})p(h_{i} | o_{0}, o_{1}, o_{0}) } \\
  =& \sum_{i=0}^{2}{\alpha_{2 i} } \times \sum_{i=0}^{2}{p(o_{2} | h_{i})p(h_{i} | o_{0}, o_{1}, o_{0}) } \\
  =& \sum_{i=0}^{2}{\alpha_{3 i} }
\end{align*}
$$

우리는 이를 통해서, Markov Model의 특징을 하나 배울 수 있다. 그것은 바로 복잡한 sequence 전체의 확률에서 벗어나서 바로 직전의 확률값만 으로 다음 확률을 추론할 수 있다는 것이다. 이것이 Markov Chain이라는 이론이고, 이를 이용했기 때문에 Markov Model라고 부르는 것이기도 하다.

따라서, $\alpha$는 다음과 같이 정의할 수 있다.

$$
\alpha(t, i) = \sum_{k=1}^{N}{\alpha(t-1, k)p(h_{i}|h_{k})p(o = s_{t}|h_{i})} \quad (s_{t} = \text{input으로 들어온 sequence의 t번째 값})
$$

또, 이를 반대로 할 경우에는 다음과 같은 식을 얻을 수 있다.

![nlp-hidden-markov-model-2](/images/nlp-hidden-markov-model-2.jpg)

$$
\begin{align*}
  &\sum_{i=0}^{2}p(o_{0}|h_{i})p(h_{i}|start) \times \sum_{i=0}^{2}{p(o_{1} | h_{i})p(h_{i} | o_{0}) } \times \sum_{i=0}^{2}{p(o_{0} | h_{i})p(h_{i} | o_{0}, o_{1}) } \times \sum_{i=0}^{2}{p(o_{2} | h_{i})p(h_{i} | o_{0}, o_{1}, o_{0}) } \\
  =& \sum_{i=0}^{2}p(o_{0}|h_{i})p(h_{i}|start) \times \sum_{i=0}^{2}{p(o_{1} | h_{i})p(h_{i} | o_{0}) } \times \sum_{i=0}^{2}{p(o_{0} | h_{i})p(h_{i} | o_{0}, o_{1}) } \times \sum_{i=0}^{2}{\beta_{3i}} \\
  =& \sum_{i=0}^{2}p(o_{0}|h_{i})p(h_{i}|start) \times \sum_{i=0}^{2}{p(o_{1} | h_{i})p(h_{i} | o_{0}) } \times \sum_{i=0}^{2}{\beta_{2i}} \\
  =& \sum_{i=0}^{2}p(o_{0}|h_{i})p(h_{i}|start) \times \sum_{i=0}^{2}{\beta_{1i}} \\
  =& \sum_{i=0}^{2}{\beta_{0i}} \\
\end{align*}
$$

$$
\beta(t, i) = \sum_{k=1}^{N}{\beta(t+1, k)p(h_{k}|h_{i})p(o = s_{t}|h_{i})} \quad (s_{t} = \text{input으로 들어온 sequence의 t번째 값})
$$

위의 처럼 앞에서부터 풀이를 해나가면서, $\alpha$의 합으로 끝이 나도록 푸는 방법을 forwarding 방식이라하고, 반대로 뒤에서부터 풀이하면서 $\beta$의 합으로 푸는 방법을 backwarding 방식이라고 한다. 사실 이 경우는 HMM이 굳이 아니더라도, MM으로 구할 수 있으니 굳이 필요는 없다. 하지만, 이것은 후에 modeling 단계에서 사용하기 때문에 알아두어야 한다.

> <mark>**2. Viterbi**</mark>

이는 observed state의 sequence에 의해서 파생되는 가장 적절한 hidden sequence를 구하는 것이 목표이다. 이를 통해서 할 수 있는 대표적인 것이 sequence classification이다.

그렇다면 가장 유력한 hidden state의 sequence를 $\hat{s}^{(H)}$라고 하자. 이는 다음과 같다.

$$
\begin{align*}
\hat{s}^{(H)} &= \argmax_{s^{(H)} \in S^{(H)}}P(s^{(H)}|s^{(O)}) \\
&= \argmax_{s^{(H)} \in S^{(H)}}P(s^{(O)}|s^{(H)})P(s^{(H)}) \\
&= \argmax_{{h_{1}, h_{2}, ..., h_{N}} \in S^{(H)}}\underbrace{P(o_{1}, o_{2}, ... , o_{N}|h_{1}, h_{2}, ... , h_{N})}_{\text{Markov Model}}\underbrace{P(h_{1}, h_{2}, ... , h_{N})}_{\text{Markov Model}} \\
&= \argmax_{{h_{1}, h_{2}, ..., h_{N}} \in S^{(H)}}\prod_{i=1}^{N}p(o_{i}|h_{i})p(h_{i}|h_{i-1})
\end{align*}
$$

![nlp-hidden-markov-model-3](/images/nlp-hidden-markov-model-3.jpg)

즉, 각 layer에서 단 하나의 가장 큰 output만 살아남을 수 있게 되는 것이다. 이 과정이 사실상 HMM의 본질적인 목표이다. sequence를 입력해서 sequence 형태의 classification 결과를 얻는 것이다.

### Modeling

여태까지 HMM을 활용하여 sequential class를 어떻게 estimation 하는지 알아보았다. 그렇다면, 이제는 이를 위해서 사용되는 확률값을 구해야한다. 필요한 확률값은 다음과 같다.

- $p(h_{i}|h_{i-1})$ : Hidden State에서 Hidden State로 넘어가기 위한 확률이다.
- $p(o_{i}|h_{i})$ : 방출 확률로 특정 Hidden State에서 다음 State의 Observed State로 넘어가는 방법이다.
- $\pi_{i}$

Trelli 방식에서 만들었던, $\alpha$와 $\beta$의 의미를 이해해야 한다. 각 각은 해당 과정까지 오면서 누적해온 확률이라고 할 수 있다. 그리고, 우리가 원하는 것은 입력으로 주어진 데이터를 잘 반영할 수 있는 확률 값을 찾는 것이다. 그렇다면, 우리가 생각할 수 있는 방법은 평균을 활용하는 것이다. 이를 구하는 과정을 먼저 살펴보자.

$$
\begin{align*}
  c(i, j, k) &= h_{i}\text{에서 } h_{j}\text{로 넘어가고, } o_{k}\text{가 관측될 확률의 합} \\
  &= \sum_{t=2}^{T} \alpha(t-1, i)p(h_{j}|h_{i})p(o_{k}|h_{j}) \beta(t, j) \\
  \\
  c(i,j) &= h_{i}\text{에서 } h_{j}\text{로 넘어갈 확률의 합} \\
  &= \sum_{k=1}^{K}\sum_{t=2}^{T}{\alpha(t-1, i)p(h_{j}|h_{i})p(o_{k}|h_{j}) \beta(t, j)} \\
  \\
  c(i) &= h_{i}\text{에서 상태를 변경하는 확률의 합} \\
  &= \sum_{j=1}^{N}\sum_{k=1}^{K}\sum_{t=2}^{T}{\alpha(t-1, i)p(h_{j}|h_{i})p(o_{k}|h_{j}) \beta(t, j)} \\
\end{align*}
$$

위의 값을 통해서 우리는 우리가 가지고 있던 확률을 업데이트할 수 있다.

$$
\begin{align*}
p(h_{j}|h_{i}) &= {c(i,j)\over c(i)} \\
p(o_{k}|h_{i}) &= {c(i,j,k)\over c(i,j)}
\end{align*}
$$

즉, 우리는 다음 과정을 수행하여 Modeling을 수행할 수 있는 것이다.

1. 초기값 ($p(h_{i}|h_{i-1})$, $p(o_{i}|h_{i})$, $\pi_{i}$)을 초기화 한다.  
2. Trelli를 통해서 $\alpha$, $\beta$를 계산한다.
3. $p(h_{i}|h_{i-1})$, $p(o_{i}|h_{i})$를 업데이트 한다.  
   ($pi_{i}$같은 경우는 발생 빈도로 업데이트 한다.)
4. 임계치에 도달할 때까지 2,3번을 반복한다.

이 과정을 대게 10번 정도만 하면 수렴하게 되고, 이를 확률로 사용하는 것이다.

## Reference

- Tumbnail : Photo by [David Ballew](https://unsplash.com/@daveballew?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/@daveballew?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
