---
slug: "ml-base-knowledge"
title: "[ML] 0. Base Knowledge"
date: "2022-10-14 19:28"
category: "AI"
tags: ["ML", "Probability"]
thumbnailSrc: "/images/ml-thumbnail.jpg"
---

## Intro

Machine Learning은 data들로 부터 특정 pattern을 나타내는 function을 만드는 것이라고 할 수 있다. 즉, pattern은 data에 대한 간단한 요약본이라고 볼 수 있다.
확률/통계 이론 및 선형대수/미적분 관련 기본을 해당 포스팅에 정리한다. 여기서 다루는 내용은 대게 많이 추상적인 내용이며, 키워드 중심의 내용이다. 만약, 추가적인 설명이 필요하다면 키워드를 기반으로 더 검색을 하는 것이 좋을 것이다.

## Probability/Statisics

### Probability Space

확률 공간을 정의하는 것은 확률을 이해하는 토대가 된다. 확률을 적용하기 위한 공간을 먼저 살펴보자.

- Sample Space($\Omega$)  
  가능한 모든 결과값의 집합이다.  
  ex. 동전을 두 번을 던져서 나올 수 있는 모든 결과값은 $\Omega = $ $\{ hh, ht, th, tt \}$
- Event($E$)  
  Sample Space의 Subset이다. Sample Space에서 발생할 수 있는 event라는 의미로 볼 수 있다.  
  ex. 동전을 두 번을 던져서 모두 같은 면이 나오는 Event는 $E = $ $\{ hh, tt \}$
- Field($\mathcal{F}$)  
  Sample Space에서 발생 가능한 모든 Event들의 집합이다.  
  ex 동전을 두 번 던져서 나오는 결과값의 Field는 $\mathcal{F} = $ $\{$ $\emptyset$, $\{hh\}$, $\{ht\}$, $\{th\}$, $\{tt\}$, $\{hh, ht\}$, $\{hh, th\}$, $\{hh, tt\}$, $\{ht, th\}$, $\{ht, tt\}$, $\{th, tt\}$, $\{hh, ht, th\}$, $\{hh, ht, tt\}$, $\{hh, th, tt\}$, $\{ht, th, tt\}$, $\{hh, ht, th, tt\}$ $\}$
- $\sigma$-field  
  자신 내부의 원소를 포함하는 합집합을 모두 포함하는 셀 수 있는 field를 sigma field라고 한다.  
  이 $\sigma$-field는 일반적인 확률과 특정 domain에서의 확률을 정의하는데 필요하다.  
  우리가 sample space($\Omega$)와 $\sigma$-field $\mathcal{F} \subset 2^{\Omega}$가 주어질 때, 확률P가 다음과 같이 mapping한다고 하자. $P: \mathcal{F} \mapsto [0, 1]$ 이때 P는 다음과 같은 특징을 가진다.
  - $A \in \mathcal{F}$인 모든 A에 대해서 $P(A) \leq 0$ 이다.  
    $P(\emptyset) = 0, P(\Omega) = 1$
  - $\{A_i\}_{i \in I}$이고, 서로 다른 모든 i, j에 대해 $ A_{i}\cup A_{j} = \emptyset$이라면, 아래 식을 만족한다.  
    $$P(\cup_{i \in I}A_i) = \sum_{i \in I}P(A_i)$$

### Important properties of Probability

- **Joint Probability**  
  두 Event의 Joint Probability는 두 Event의 합집합의 확률을 의미한다.
  $P(A, B) = P(A \cap B)$
- **Marginal Probability**  
  대게 두 개 이상의 Event가 있을 때, 각 각의 Event의 확률을 특정할 때 사용한다.
  $P(A), P(B)$
- **Independence**  
  두 Event가 독립이라는 의미는 서로의 Event가 서로 영향을 받지 않는다는 의미이다. 주의할 것은 이것이 의미하는 것이 두 Event의 교집합이 없다는 의미가 아니다.  
  만약, 우리가 위에서 예시로 사용한 두 개의 동전을 던진 결과를 보자. 두 개의 동전이 모두 앞면이 나오는 경우와 모두 뒷면이 나오는 경우는 서로 독립일까? 이는 독립이 아니다. 왜냐하면, 동전이 모두 앞면이 나오는 사건은 필연적으로 모두 뒷면이 나오는 사건은 반드시 일어나지 않을 것이라는 증거가 되기 때문이다. 반대로, 모두 앞면이 나오는 사건과 한 번만 앞면이 나오는 사건을 생각해보자. 하나의 사건이 일어났다고, 반드시 그 사건이 일어났거나 안일어났다는 관계를 밝혀낼 수 없다. 따라서, 이러한 경우 두 사건이 독립적이라고 한다.  
  이를 확률적으로 표현하면, 다음과 같이 표현할 수 있다.  
  $P(A, B)=P(A)P(B)$
- **Conditional Probability**  
  두 Event가 있을 때, 하나의 Event가 발생했을 때 다른 하나의 Event가 발생할 확률을 의미한다. 따라서, 이는 다음과 같이 수식으로 표현할 수 있다.  
  $P(A|B) = {{P(A, B)}\over{P(B)}}, (P(B) \neq 0)$  
  여기서 independence 특성을 더 명확하게 확인할 수 있는데, 만약 A와 B가 독립이라면,  
  $P(A|B) = P(A)$  
  즉, B가 발생했는지 여부는 A의 결과에 영향을 안준다는 것이다.
- **Partition**  
  Sample Space($\Omega$)를 겹치지 않고, 모두 포함하는 Event의 집합을 의미한다. 따라서, 이를 식으로 다음과 같이 표현할 수 있다.  
  $\cup_{i=1}^{n}{P_i} = \Omega$ 이고, $\cap_{i=1}^{n}{P_i} = \emptyset$
- **Marginalization**  
  전체 Sample space($\Omega$)에 대하여 **B**가 이에 대한 partition일 때, 아래 공식이 성립한다.  
  $P(A) = \sum_{i=1}^{n}{P(A,B_i)} = \sum_{i=1}^{n}{P(A|B_i)P(B_i)}$
- **Bayes' Theorem**  
  만약 $P(B) \neq 0$라면, 아래 공식이 성립한다. 간단히 conditional probability를 풀어주면 아래 식을 얻을 수 있다.  
  $P(A|B) = {P(B|A)P(A)\over{P(B)}}$  
  해당 식은 단순히 Joint Probability로 변환하고, 다시 반대 확률로 변경했을 뿐이다. 이 공식이 중요하다기 보다는 이 공식이 가지는 의미를 이해하는 것이 중요하다. 경험에 기반하는 Frequentist Approach에서는 관측을 통해서 특정 데이터가 발생할 확률을 얻는다. 만약 우리가 원하는 확률이 관측을 통해서는 얻을 수 없는 데이터라고 하자. 이 경우에 우리는 확률의 역연산이 필요하다. 위의 공식을 보면 특이한 것이 보이는데, 바로 $P(A|B)$와 $P(A)$이다. 이는 전체 확률을 통해서 Conditional Probability를 찾는 것이다. 그렇기에 우리는 이를 역연산이라고 부르며, 우리가 가지고 있는 기존 사전 확률(Priority, 이전까지 맞을 거라고 생각한 확률)을 통해서 데이터가 주어졌을 때의 사건의 확률을 다시 계산해보는 것이다. 이 과정을 Bayesian Update라고 하는데 이 과정을 통해서 얻은 P(A|B)를 다시 다음 데이터에 대해서는 P(A)로써 활용하는 것이다. 이렇게 해서 우리는 점진적으로 P(A)를 찾아나갈 수 있다.

### Random Variable

Random Variable이라는 것은 특정 사건을 수학적으로 표현하기 위해서 변형하는 과정을 의미한다. 우리는 이전 예시에서 두 개의 동전을 동시에 던져서 나온 결과를 Sample Space로 두었고, 이를 $\Omega = $ $\{ hh, ht, th, tt \}$라고 표현했다. 하지만, 이와 같은 표기 방식은 수학적인 연산을 적용하기 어렵다. 따라서, 우리는 앞면이 나온 경우를 $X=1$, 뒷면이 나온 경우를 $X=-1$ 라고 하는 형태로 치환하는 것이다. 여기서 만들어진 X를 우리는 Random Variable이라고 부른다. 이런 치환을 통해서 우리는 확률을 Random Variable에 대한 함수로 표현할 수 있다.

또, Random Variable을 정의하여 다음과 같은 값을 연속적으로 정의할 수 있다.

- **Mean**  
  Random Variable의 평균 또는 기댓값이라고 부른다.  
  $\mu_{X} = E[X] = \sum_{x}{xP(X=x)}$
- **Variance**  
  평균에서 데이터가 떨어진 정도를 표현하는 값으로 분산이라고 부른다.  
  $\sigma_{X}^{2} = E[(X-\mu_X)^2] = E[X^2] -\mu_{X}^{2}$
- **Covariance**  
  Random Variable X와 Y의 상관관계(Correlation)을 확인하는 척도로 사용한다.  
  $\sigma_{X}^{2} = E[(X-\mu_X)^2] = E[X^2] -\mu_{X}^{2}$  
  만약, 두 X와 Y가 서로 전혀 상관이 없다(Independent)면, $cov(X, Y) = 0$이다.
- **Correlation Coefficient**  
  Covariance보다 더 엄격한 상관관계를 확인하는 척도로 사용되는데, 단순히 Covariance를 각 표준편차($\sigma$)로 나눈 것이다. 이로 인해 결과 값은 [-1, 1] 사이 값이 된다.  
  $corr(X, Y) = {cov(X,Y)\over{\sigma_{X}\sigma_{Y}}}$  
  주의할 점은 Correlation Coefficient가 1이라고 X가 Y의 원인이 되는 것은 아니라는 것을 유의해야 한다. 단순히 X가 일어났을 때, Y가 일어날 확률이 높다는 것이다.  

### Law of Large Numbers

경험적 확률과 수학적 확률 사이의 관계를 나타내는 법칙으로, 전체 경우의 수와 이에 따른 확률(모집단)에서 표본(관측한 경우의 수와 이에 따른 확률)의 크기가 커질 수록 표본 평균이 모평균에 가까워짐을 의미한다.

### 자주 사용되는 Probability Distribution Function

- **Bernoulli distribution**  
  하나의 사건이 일어날 확률을 의미한다. 발생하는 경우를 X=1, 그렇지 않은 경우를 X=0으로 random variable로 치환하여 나타낸 확률 분포(probability distribution)이다.  
  따라서, 사건이 일어날 확률을 p라고 할 때, 다음과 같이 random variable에 대한 확률을 정의할 수 있다.  
  $P(X=x) = p^{x}(1-p)^{1-x}$ 
  복잡해보이지만, 실상은 X가 0 또는 1이므로, $P(X=0)=1-p$이고, $P(X=1)=p$이다.
  - 평균      
    $E[X] = p$
  - 분산  
    $Var[X] = E[X^2] - \mu_{X}^2 = p - p^2 = p(1-p)$
- **Binomial Distribution**  
  확률이 p인 사건을 n번 수행했을 때, x번 발생할 확률을 의미한다. 따라서, random variable X의 범위는 {0, 1, …, n}이 된다.  
  이에 따라 random variable에 대한 확률을 정의하면 다음과 같다.  
  $P(X=x) = {n \choose x}p^x(1-p)^{n-x}$  
  이 또한 복잡해 보이지만, 사실은 독립적인 Bernoulli의 연속 수행으로 볼 수 있다.  
  - 평균  
    $E[X] = np$
  - 분산  
    $Var[X] = Var[\sum_{i}X_i]=\sum_iVar[X_i]=np(1-p)$
- **Beta Distribution**  
  $\alpha, \beta > 0$를 만족하는 두 parameter를 이용한 probability distribution이다.  
  이는 [0, 1]에서 continuous한 random variable를 이용할 수 있다. 이에 따른 확률은 다음과 같다.  
  $P(X=x) \propto x^{\alpha-1}(1-x)^{\beta-1}$  
  이에 대한 의미를 이해하자면, 확률에 대한 확률 분포이다. 각 $\alpha - 1$와 $\beta - 1$를 성공 횟수, 실패 횟수라고 하자.  이는 이미 알고 있는 모집단(전체 집합)의 계산 결과이다. 그리고 random variable을 특정 event의 확률이라고 하자. 예를들면, 동전 던지기를 할 때, 앞면이 나올 확률이 $1\over2$이라는 것을 이미 알고 있다. 따라서, 우리는 $\alpha - 1$ = $\beta - 1$ 라는 것을 알고 있는 것이다. 하지만, 실제로 동전 던지기를 5번 수행했을 때, 4번 앞면이 나왔다고 하자. 그렇다면, 우리가 추측한 해당 event의 확률은 $4\over5$이 된다. 그렇다면, 실제로 해당 확률이 $4\over5$일 확률을 얼마나 될까?  
  이를 측정하기 위한 것이 Beta distribution인 것이다. 이에 따라, Beta distribution을 PDF로 표현하면 ${\alpha\over\alpha+\beta}$에서 높은 확률값을 가지는 것을 볼 수 있다.
  - 평균  
    $E[X] = {\alpha\over{\alpha+\beta}}$
  - 분산  
    $Var[X] = {\alpha\beta\over{(\alpha+\beta)^2(\alpha+\beta+1)}}$
  
  위의 평균과 분산을 보면 알 수 있듯이, 만약 이전 모집단에서의 평균값에 대한 믿음이 크다면, 각각  $\alpha, \beta$의 비율은 유지하면서 상수배를 수행하여 평균은 동일하지만 분산 값을 더 적게 만들어 뾰족한 형태의 분포를 완성할 수도 있다. 이 경우에는 평균과 맞지 않는 표본집합에서의 평균을 굉장히 확률이 낮은 확률로 식별하는 것이다.
- **Gaussian Distribution**  
  $\mu, \sigma^2$를 parameter로 갖는 probability distribution이다.
    
  이는 $[-\infin, \infin]$를 구간으로 continuous한 random varible을 이용한다. 이에 따른 확률은 다음과 같다. (단일 random variable인 경우)
  
  $P(X) = {1\over{\sqrt{2\pi\sigma^2}}}\exp(-{1\over{2\sigma^2}}(X-\mu)^2)$

  이것이 가지는 의미는 다소 복잡하다. (Lindeberg-Levy) Central Limit Theoriem에 따르면, 표본에서 얻은 표본 평균을 구하면 구할 수록 점점 Gaussian Distribution을 따라간다. 즉, $n \rarr \infin$이면, 표본 평균이 이루는 분포가 Gaussian이라는 것이다.
  
  추가적으로 알아볼 것은 바로 여러 개의 Random Variable로 Gaussian Distribution을 더 높은 차원으로 구성할 수 있다는 것이다. 이를 수행하고, 해당 Random Variable 간의 Covarince, Correlation coefficient를 구하면, 이 변수 간의 상관성을 얻을 수 있다.
  
  - 유의 사항 : correlation은 어디까지나 상관성이다. correlation이 높다고 해당 Random Variable이 상관성이 높은 Random Variable 발생의 원인이 될 수는 없다.

## Reference

- Tumbnail : Photo by [Markus Winkler](https://unsplash.com/@markuswinkler?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/@markuswinkler?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
