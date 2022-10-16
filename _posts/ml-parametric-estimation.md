---
slug: "ml-parametric-estimation"
title: "[ML] 1. Parametric Estimation"
date: "2022-10-15 11:25"
category: "ML"
tags: ["MLE", "MAP", "BayesianInference"]
thumbnailSrc: "/images/default.jpg"
---

## Intro

Machine Learning은 특정 목표를 달성하기 위해서 데이터로 부터 pattern 또는 가정 등을 유도해내는 방법이다.
이를 위한 가장 일반적인 방법은 여러 개의 확률분포와 이것의 parameter의 조합(probabilistic model)들 중에서 측정된 데이터들을 가장 잘 나타내는 하나를 찾아내는 것이다.
그 중에서, 확률 분포를 결정한 상태에서 parameter를 찾아나가는 형태의 접근법을 우리는 Parametric Estimation이라고 한다. 그 외에도 Nonparametric, Semi-parametric 방식도 존재하지만 이는 여기서는 다루지 않는다.

## Small Example

간단한 예시를 통해서 Parametric Estimation의 흐름을 익혀보자.

한 학급에서 학생들의 형제자매 수에 대한 예측을 하고 싶다고 하자.  
그렇다면, 우리는 먼저 조사(관측)를 수행해야 한다. 이를 통해서 다음과 같은 데이터를 얻게 되었다고 하자.

| x        | 1    | 2    | 3    | 4    | 5    | 6    | x$\geq$7 |
| :------- | :--- | :--- | :--- | :--- | :--- | :--- | :------- |
| $p(X=x)$ | 17   | 59   | 15   | 6    | 2    | 0    | 1        |

여기서 우리는 여러 사전 지식을 활용하여 해당 데이터를 보았을 때, 해당 분포가 Poisson 분포의 형태라는 것을 알 수 있다.  
따라서, 우리는 해당 분포를 Poisson이라고 가정한 다음에는 단순히 해당 분포에 대입하며, 가장 적절한 parameter만 찾으면 된다.  

이 과정과 단순히 각 x에서의 확률값을 구하는 방식이랑 무엇이 다른지를 알아야지 해당 과정의 의의를 알 수 있다.
먼저, 우리가 하고자 하는 일이 형제자매의 평균 수를 구한다고 하자. 이때의 평균 값과 Poisson 분포에서의 확률값은 다를 수 밖에 없다.

이렇게 확률 분포를 구하는 것의 의미는 이것말고도 보지 않은 데이터(unseen data)를 처리함에 있다. 우리가 만약 모든 가능한 경우의 수를 모두 알고 있고, 이를 저장할 공간이 충분하다면,
이러한 확률 분포를 구할 필요가 없다. 하지만, 우리가 원하는 추측은 unseen data에 대해서도 그럴사해야 한다. 이를 위해서는 결국 확률 분포가 필요하다.

위의 예시에서 만약, 형제자매가 3명인 경우의 데이터가 없다고 하자. 이 경우에도 확률분포를 통한 추측을 한다면, 우리는 유의미한 값을 구할 수 있는 것이다.

## Parametric Estimation

> **정의**

sample space $\Omega$에서 통계 실험의 관측 결과를 통해서 얻은 sample $X_1$, $X_2$, ... , $X_n$이 있다고 하자. 각 sample에 대한 확률 분포를 우리는 $p_\theta$라고 한다.
여기서 $\theta$는 특정 확률 분포에서의 parameter를 의미한다. 만약, bernoulli 라면, 단일 시행에 대한 확률이 될 것이고, binomial이라면, 단일 시행의 확률과 횟수가 해당 값이 될 것이다.

> **Risk**

여기서 우리가 찾기를 원하는 것은 전체 sample space $\Omega$를 모두 잘 표현할 수 있는 $\theta_{*}$(실제 true $\theta$)를 찾는 것이다.(이미 확률 분포의 형태(함수, ex. Bernoulli, Binomial)는 이미 정의되어 있다.)  
그렇다면, 실제 $\theta_*$와 추측을 통해 만든 $\hat{\theta}$ 사이의 비교를 위한 지표도 필요할 것이다. 이를 측정하기 위해서 우리는 **Risk**라는 것을 사용한다.  
간단하게도 실제 $\theta_*$와 $\hat{\theta}$의 Mean Square Error를 계산한다.

$$ 
\begin{align*}
Risk &= E[(\hat{\theta} - \theta_*)^2] = E[\hat{\theta}^2 - 2\hat{\theta}\theta_* + \theta_*^2] \\
&= E[\hat{\theta}^2] - 2\theta_*E[\hat{\theta}] + \theta_*^2 \\
&= E[\hat{\theta}^2] - 2\theta_*E[\hat{\theta}] + \theta_*^2 + (E^2[\hat{\theta}] - E^2[\hat{\theta}]) \\
&= (E[\hat{\theta}] - \theta_*)^2 + E[\hat{\theta}^2] - E^2[\hat{\theta}] \\
&= {Bias}^2 + Var[\hat{\theta}]
\end{align*}
$$

해당 식을 분석해보면, 이와 같은 의미로 해석하는 것이 가능하다. 우리가 특정 확률 분포의 파라미터를 단 하나로 단정하고 Risk를 계산하는 경우는 Variance 값은 0이다. 즉, 해당 확률 분포가 가지는 Risk는 단순히 해당 parameter와 실제 parameter가 얼마나 찾이가 나는가를 의미한다.

하지만, parameter를 특정하지 않고, 범위로 지정한다면, (예를 들어, 주사위를 던져 3이 나올 확률은 1/6 ~ 1/3이다.) 해당 확률의 평균과 Variance가 영향을 미칠 것이다.  
다소 처음에는 헷갈릴 수 있지만, 해당 식에서 평균이 의미는 잘 확인하자. 특정 확률 분포를 가지도록 하는 $\theta$가 $\theta_*$ 에 얼마나 근접한지를 확인하기 위한 식이라는 것을 다시 한 번 기억하자.

> **Estimation**

이제부터는 앞에서 살펴보았던, parameteric estimation에서 어떻게 $\hat{\theta}$를 구할 수 있는지를 다룰 것이다. 확률/통계 이론에서는 크게 3가지로 나눌 수 있다고 볼 수 있다. 각 각을 살펴보도록 하자.

<mark>**1. MLE**</mark>

Maximum Likelihood Estimation의 약자이다. 여기서, Likelihood는 가능성이라는 뜻을 가지며, 확률/통계 이론에서 이는 확률을 해당 사건이 발생할 가능성으로 해석하는 것이다. 이를 이용해서 우리가 풀고자 하는 문제, 우리가 추측한 $\theta$가 우리가 가진 Dataset를 만족시킬 가능성을 확인하기 위해 사용한다. 아래 수식을 보자.

$$
\begin{align*}
\mathcal{L}(\theta;\mathcal{D}) &= p(\mathcal{D}|\theta) = p(x_1, x_2, ..., x_n|\theta) \\
&= \prod_{i=1}^{n}{p(x_i|\theta)}
\end{align*}
$$

(위 식을 이해하려면, 먼저 Dataset의 각 data들은 서로 independent하다는 사실을 기억하자.)  
결국 $\theta$가 주어졌을 때, Dataset일 확률을 구하는 것이다. 이를 다시 생각하면, $\theta$가 얼마나 데이터셋의 확률을 잘 표현할 수 있는가와 같다.

이것을 직관적으로 이해하려면 하나의 예시를 보면 좋다.

![MLE example](/images/MLE-example.png)

첫 번째 그래프는 같은 가우시안 분포 함수를 쓰면서, parameter만 다르게 한 경우이고, 아래는 실제 데이터의 분포라고 하자.(빨간색 선 하나 하나가 데이터를 의미)  
이때, Likelihood를 각 각 구하면 각 x에서의 확률분포의 확률값을 모두 곱하면 된다. 그 경우 어떤 것이 제일 클지는 분명하다. 바로 파란색 분포일 것이다.  

그렇다면, 우리가 원하는 것은 무엇인가? 바로 가장 높은 가능성을 가지게 하는 $\theta$를 찾는 것이다. 따라서, 이를 식으로 표시하면 아래와 같다.

$$
\hat{\theta}_{MLE} = \argmax_{\theta}\mathcal{L}(\theta;\mathcal{D})
$$

여기서 하나 문제가 있을 수 있다. 바로, 컴퓨터로 연산하게 되면 underflow가 발생하는 것이다. 특정 언어가 계산할 수 있는 소수점 범위를 벗어난다면, 제대로 된 결과를 얻을 수 없다. 이와 같은 문제를 **vanishing likelihood**라고 한다.  
따라서, 우리는 log를 취했을 때와 log를 취하지 않았을 때의 경향성이 같음을 바탕으로 likelihood에 log를 취한 값을 이용하여 MLE를 구하는 것이 일반적이다. 이 방식을 maxmum log likelihood estimation 이라고 부른다.

$$
\mathcal{l}(\theta;\mathcal{D}) = \sum_{i=1}^{n}{\log{(p(x_i|\theta))}}
$$

이 방식을 이용하게 되면, 곱셈이 모두 덧셈으로 바뀌기 때문에 계산에서도 용이하다.

여기까지 살펴보면, 하나의 의문이 들 수도 있다. 바로, $p(\theta|\mathcal{D})$도 측정 기준으로 사용할 수 있지 않냐는 것이다. 이 역시도 Dataset이 주어질 때, $\theta$일 확률이라고 볼 수 있다.  
어찌보면, 사람의 생각으로는 이게 더 당연하게 느껴질 수도 있다. 이는 바로 다음 MAP에서 다룰 것이다. 우선 MLE를 먼저한 이유는 이것이 더 구하기 쉽기 때문임을 기억해두자. 

```plaintext
 🤔 증명

 (*해당 내용은 정보 이론에 기반한 MLE에 대한 추가적인 이해를 위한 내용입니다. 해당 내용은 자세히 알 필요까지는 없습니다.)

 두 확률 분포 간 information entrophy의 차이를 나타내는 KL divergence의 최솟값을 구하는 것이 우리의 목표라고 정의할 수 있다.  
 따라서, 우리가 결국 얻고자 하는 것은 확률 분포 함수가 주어졌을 때,  
 n이 무한대로 갈 때, 경험적 확률(empirical probability)에 가장 근사하는 parameter를 찾는 것이다.  
 따라서, 우리는 KL divergence의 최솟값을 구하면 된다.
```

$$
\begin{align*}
\argmin_\theta KL(\tilde{p}||p_\theta) &= \argmin_\theta \int\tilde{p}(x)\log{\tilde{p}(x)\over{p_\theta(x)}}dx \\ 
&=\argmin_\theta[-\int\tilde{p}(x)\log{\tilde{p}(x)dx} - \int\tilde{p}(x)\log{p_\theta(x)dx}] \\
&= \argmax_\theta\int{\tilde{p}(x)\log{p_\theta(x)}dx} \\
&= \argmax_\theta\sum_{i=1}^{n}{\log{p_\theta(x_i)}} \\
&= \theta_{MLE}
\end{align*} 
$$

<mark>**2. MAP**</mark>

Maximum A Posteriori의 약자이다. Posteriori는 사후 확률이라고도 부르며, dataset이 주어졌을 때, $\theta$일 확률을 구하는 것이다.  
이를 바로 구하는 것은 다소 어렵다. 왜냐하면, Dataset이 조건으로 들어가는 형태이기 때문이다. ($p(\theta|\mathcal{D})$)  
따라서, 우리는 Bayes' Theorem에 따라서 이전에 배운 Likelihood와 parameter의 확률, 그리고 Dataset의 확률을 활용히여 풀어낼 것이다.

$$
p(\theta|\mathcal{D}) = {p(\mathcal{D}|\theta)p(\theta)\over{p(\mathcal{D})}}
$$

여기서 주의해서 볼 것은 바로 $p(\theta|\mathcal{D})$와 $p(\theta)$의 관계이다. dataset이 주어질 때의 parameter의 확률을 구하기 위해서 원래 parameter의 확률이 필요하다는 것이다.  
어찌보면 굉장히 모순되어 보일 수 있지만, 우리가 이것을 사전 확률(priori)로 본다면 다르게 볼 여지가 있다.  
예를 들면, 우리가 수상한 주사위로 하는 게임에 참가한다고 하자. 이때, 우리는 수상한 주사위의 실제 확률은 알 수 없지만, 주사위 자체의 확률은 모두 1/6이라는 것을 알고 있다. 따라서, $p(\theta={1\over6}) = \alpha, p(\theta\neq{1\over6}) = \beta$ 라고 할 수 있다. 만약 정말 수상해보인다면, 우리는 $\alpha$가 점점 작아진다는 식으로 표현할 수 있고, 하나도 수상해보이지 않는 일반 주사위라면, $\alpha=1, \beta=0$으로 할 수도 있다. 이 경우에는 likelihood 값에 상관없이 다른 모든 값이 0이기 때문에 결국은 $p(\theta|\mathcal{D}) = p(\theta)$ 가 되는 것을 알 수 있다.

최종적으로, MAP도 결국은 Dataset을 얼마나 parameter가 잘 표현하는가에 대한 지표로 사용할 수 있다. 
따라서, 이를 최대로 만드는 parameter는 $\theta_*$와 굉장히 근접할 것이다.

$$
\begin{align*}
\hat{\theta}_{MAP} &= \argmax_{\theta}p(\theta|\mathcal{D}) \\
&= \argmax_\theta{p(\mathcal{D}|\theta)p(\theta)\over{p(\mathcal{D})}} \\
&=\argmax_\theta{p(\mathcal{D}|\theta)p(\theta)} \\
&=\argmax_\theta{[\red{\log{p(\mathcal{D}|\theta)}} + \blue{\log{p(\theta)}}]}
\end{align*}
$$

MLE와 마찬가지로 이 또한 연산 및 **vanishing**을 막기 위해서 log를 취한다. 사실상 likelihood와 사전 확률의 합을 최대로 하는 $\theta$를 찾는 것이다.

<mark>**3. Bayesian Inference**</mark>

이제 마지막 방법으로 제시되는 Bayesian Inference이다. 이는 대게 Bayesian Estimation이라고 많이 불리는 것 같다. 이전까지 MLE, MAP는 결국 주어진 식을 최대로 하는 확정적 $\theta$ 하나를 구하는 것을 목표로 했다.

Bayesian Inference는 Dataset이 주어졌을 때, $\theta$의 평균값을 활용한다. 더 자세히 말하면, Posteriori(사후 확률)의 평균을 구하는 것이다.  
이를 구하는 과정을 살펴보면 이해하는데 도움이 될 것이다. 한 번 살펴보자.

$$
\begin{align*}
\hat{\theta}_{BE}&= E[\theta|\mathcal{D}] \\
&= {\int_{0}^{1}{{\theta}p(\theta|\mathcal{D})}d\theta} \\
&= {\int_{0}^{1}{\theta}{{p(\mathcal{D}|\theta)p(\theta)}\over{p(\mathcal{D})}}d\theta} \\
&= {{\int_{0}^{1}{\theta}{p(\theta)p(\mathcal{D}|\theta)}d\theta}\over{p(\mathcal{D})}} \\
&= {{\int_{0}^{1}{\theta}{p(\theta)\prod_{i=1}^{n}{p(x_i|\theta)}}d\theta}\over{p(\mathcal{D})}} \\
&= {{\int_{0}^{1}{\theta}{p(\theta)\prod_{i=1}^{n}{p(x_i|\theta)}}d\theta}\over{\int_0^1{p(\mathcal{D}|\theta)p(\theta)}d\theta}} \\
&= {{\int_{0}^{1}{\theta}{p(\theta)\prod_{i=1}^{n}{p(x_i|\theta)}}d\theta}\over{\int_0^1{p(\theta)\prod_{i=1}^{n}p(x_i|\theta)}d\theta}} \\
\end{align*}
$$

이를 구하는 과정은 이전과는 다르게 상대값이 아닌 평균을 구해야하기 때문에 posteriori(사후 확률,$p(\theta|\mathcal{D})$)를 구해야 한다.

하지만, 여기서 잡기술이 하나 존재한다. 바로 **Conjugate Prior**이다.

바로 두 확률 분포 함수(likelihood, prior)에 의한 posterior의 형태가 정해진 경우가 있기 때문이다.

| Prior $p(\theta \mid \alpha)$  | Likelihood $p(\mathcal{D} \mid \theta)$                 | Posterior $p(\theta \mid \mathcal{D}, \alpha)$                                                                                                                                                                                                                      | Expectation of Posterior                                                                                                                                                         |
| :----------------------------- | :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Beta ($\alpha, \beta$)         | Benoulli ($\sum _{i=1}^{n}x_{i}$)                       | Beta ($\alpha +\sum _{i=1}^{n}x_{i},\,\beta +n-\sum _{i=1}^{n}x_{i}$)                                                                                                                                                                                               | ${{\alpha + \sum _{i=1}^{n}x_{i}}\over{\alpha + \beta + n}}$                                                                                                                     |
| Beta ($\alpha, \beta$)         | Binomial ($\sum _{i=1}^{n}N_{i}, \sum _{i=1}^{n}x_{i}$) | Beta ($\alpha +\sum _{i=1}^{n}x_{i},\,\beta +\sum _{i=1}^{n}N_{i}-\sum _{i=1}^{n}x_{i}$)                                                                                                                                                                            | ${{\alpha + \sum _{i=1}^{n}x_{i}}\over{\alpha + \beta + \sum _{i=1}^{n}N_{i}}}$                                                                                                  |
| Gaussian ($\mu_0, \sigma_0^2$) | Gaussian ($\mu, \sigma^2$)                              | Gaussian (${\displaystyle {\frac {1}{{\frac {1}{\sigma _{0}^{2}}}+{\frac {n}{\sigma ^{2}}}}}\left({\frac {\mu _{0}}{\sigma _{0}^{2}}}+{\frac {\sum _{i=1}^{n}x_{i}}{\sigma ^{2}}}\right),\left({\frac {1}{\sigma _{0}^{2}}}+{\frac {n}{\sigma ^{2}}}\right)^{-1}}$) | ${\displaystyle {\frac {1}{{\frac {1}{\sigma _{0}^{2}}}+{\frac {n}{\sigma ^{2}}}}}\left({\frac {\mu _{0}}{\sigma _{0}^{2}}}+{\frac {\sum _{i=1}^{n}x_{i}}{\sigma ^{2}}}\right)}$ |

이를 이용하면, 우리는 간단하게 Posteriori의 평균을 구할 수 있다.
