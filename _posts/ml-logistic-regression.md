---
slug: "ml-logistic-regression"
title: "[ML] 3. Logistic Regression"
date: "2022-10-18 09:58"
category: "AI"
tags: ["ML", "LogisticRegression", "Classification", "SigmoidFunction", "SoftmaxFunction", "NewtonMethod"]
thumbnailSrc: "/images/ml-thumbnail.jpg"
---

## Intro

이전까지 우리는 input data가 들어왔을 때, continuos한 output을 얻는 것을 목표로 했다. 하지만 현실에서는 대게 정확한 수치보다는 특정 분류로 나누는 것이 효과적인 경우가 많다. 예를 들어, spam 필터링, object detection, 등 등. 따라서, 해당 포스팅에서는 classification을 위해서 사용할 수 있는 logistic regression에 대해서 살펴볼 것이다.

## Classification

**Classification**이란 결국 특정 input이 들어왔을 때, 이를 하나의 Class라는 output을 내보내는 것이다. 즉, output은 연속적이지 않고, descret하다. 대게 Classification에서는 Class의 갯수를 K라고 표기하고, $C_k$는 k 번째 Class라는 의미로 사용되어진다.

그렇다면, 어떻게 Class를 나눌 수 있는 것일까? 매우 단순하게도 이는 **Decision Boundary**라는 선을 그어서 해결 할 수 있다.

![decision-boundary](/images/decision-boundary.jpg)

위의 예시처럼 우리는 선을 하나 그어서 $\red{\text{x}}$와 $\blue{\text{o}}$를 구분할 수 있다. 이를 통해서 우리는 Class 1에 해당할 것이라고 예측하는 구간 $R_1$이 만들어지고, Class 2라고 예측하는 구간 $R_2$를 구성할 수 있다.

즉, classification을 수행하기 위해서 해야할 일은 기존의 Regression 과정과 마찬가지로 선을 찾는 것이다.

결국 찾고자 하는 것이 선이라면, 이것을 Linear Regression으로 해결할 수 있을 것이다. 따라서, 우리는 다음과 같은 식으로 간단히 Linear Regression을 바꿔서 생각할 수 있다.

- 예측값($\hat{y}$, $h(\bold{x})$)  
  $h(\bold{x}) = \text{sign}(\bold{w}^{\top}\bold{x}) = \begin{cases} +1 & \bold{w}^{\top}\bold{x} \geq 0 \\ -1 & \text{otherwise}\end{cases}$
- Least Squared Error(LS, MLE)  
  실제로 parameter를 구할 때에는 sign을 취하지 않는데, sign을 취하게 되면 모두 LS는 결국 오답의 갯수 정도로 취급된다. 즉, 얼마나 예측이 잘못되었는지를 반영할 수 없다는 것이다. 따라서, 이는 기존 Linear Regression의 LS를 구하는 방법과 동일하게 수행한다.  
  $\argmin_{w} {1\over2}\sum_{n=1}^{N}{(y_n - (\bold{w}^{\top}\bold{x}))^2}$

이렇게 Linear Regression을 적용하면 문제가 없을 거 같다. 하지만, 실제로는 문제가 있다. 바로, 데이터가 불균형할 때이다. 만약 데이터가 decision boundary를 기준으로 대칭(symmetric)인 형태로 존재한다면, 문제가 없다. 하지만, 비대칭(asymmetric)인 경우 제대로 동작하지 않는다. 왜냐하면, linear regression은 최적에서 데이터의 평균을 반영하는데 불균형한 경우 데이터의 평균이 Decision Boundary가 되는 것은 문제가 있다.

![linear-in-classification](/images/linear-in-classification.jpg)

## Logistic Regression

위에서 제시한 문제를 해결하기 위해서 Classification에서는 Linear Regression이 아닌 Logistic Regression을 활용한다. 이를 이해하기 위해서 기반이 될 요소들을 먼저 살펴보자.

> **Discriminant Function**

판별함수(Discriminant Function, Score Function) 등으로 불리는 해당 함수는 특정 data가 특정 class에 속할 가능성(likelihood, probability, score)을 나타내는 함수이다. 즉, input으로 data를 받고, output으로 class에 속할 확률을 내보낸다.

이를 통해서 우리는 다음과 같은 과정을 할 수 있다.

만약, $f_k(\bold{x}) \gt f_j(\bold{x})$이라면, $\bold{x}$의 class는 $C_k$이다.

따라서, 우리는 다음과 같은 식으로 여러 개의 Class가 있는 공간에서 data를 분류할 수 있다.

$$
h(\bold{x}) = \argmax_{k}f_{k}(\bold{x})
$$

그렇다면, Discriminant Function으로 어떤 값을 쓰면 좋을까? 이에 대한 해결책을 Bayes Decision Rule에서 제시한다.

> **Bayes Decision Rule**

만약 우리가 특정 data가 특정 Class에 속할 확률을 구한다고 하자. 우리는 먼저 Likelihood를 생각할 수 있다. $P(x|C = k), P(x|C = j)$를 구하여 각 Class에 속할 확률을 비교할 수 있을까?  
물론 비교는 가능하다 하지만, 반쪽짜리 비교라고 할 수 있다. 만약, class k에 속하는 데이터보다 class j에 속하는 데이터가 훨씬 많다고 하자. 그러면, 일반적으로 class j가 발생할 확률 자체가 높다. 하지만, likelihood는 이러한 경향을 반영하지 않는다. 간단한 예시를 들어보자.

```plaintext
 🤔 어떤 동물의 털에 존재하는 색의 갯수가 주어졌을 때, 고양이일 확률과 호랑이일 확률이라고 하자.

  그리고, input data는 털에 존재하는 색의 수라고 하자. (호랑이는 대게 3가지 색, 백호 = 2가지 색, 고양이는 매우 다양)
  그렇다면, P(털의 색 = 3|C = 호랑이), P(털의 색 = 3|C = 고양이)를 비교했을 때, 우리는 당연히 전자가 크다고 생각할 것이다.
  하지만, 여기서 우리가 고려하지 않은 것이 있다. 바로 전체 고양이와 호랑이의 비율이다. 
  상대적으로 고양이가 호랑이보다 압도적으로 많다는 것을 고려했을 때, 고양이의 확률이 더 높을 수도 있다. 

  즉, 어떤 동물의 털에 존재하는 색의 갯수가 주어졌을 때, 고양이일 확률은 
  P(C=고양이|털의 색=3) =  P(털의 색 = 3|C = 고양이)P(C=고양이)이다. (분모는 생략함.)
```

즉, Bayes Rule에 기반하여 우리가 원하는 output은 Posterior라는 것을 명확히 알 수 있다.

$$
\begin{align*}
p(C_{k}|\bold{x}) &= {{p(\bold{x}| C_{k}) p(C_{k})}\over{\sum_{j=1}^{K}{p(\bold{x}|C_{j})p(C_{j})}}} \\
&\propto p(\bold{x}| C_{k}) p(C_{k})
\end{align*}
$$

위의 경우 Class간의 상대 비교에 사용하는 지표로 이를 사용하기 때문에, 분모(Normalization Factor, 확률의 총합이 1이 되도록 하는 역할)를 제외하여도 상관없기에 대게 복잡한 분모 계산을 제외하고 표현하는 것이 일반적이다.

또한, 앞선 예시에서 얻을 수 있는 insight는 편향된 데이터일수록 MLE를 사용할 수 없다는 것이다. 위에서 Linear Regression이 Classification에 부적함한 경우도 데이터의 편향이 있을 경우이다. 이 역시 Linear Regression이 결국은 MLE에 기반하기 때문인 것이다.

우리는 각 Class 자체의 확률(Prior)과 Likelihood를 이용할 수 있는 Discriminant Function을 구해야 한다는 것이다.

> **Logistic Regression**

자 이제 드디어 Logistric Regression을 시작해보자. 우리는 Discriminant Function을 먼저 지정해야 한다. 여러 가지 방법이 있지만, 가장 대표적으로 사용되는 방법은 **Softmax**를 활용하는 것이다. **Sigmoid**를 활용하여 식을 나타내면 아래와 같다.

$$
p(y_n = k | \bold{x}_n, \bold{w}) = {{\exp(\bold{w}_{k}^{\top}\bold{x}_n)}\over{\sum_{j=1}^{K}{\exp(\bold{w}_{j}^{\top}\bold{x}_n)}}} 
$$

만약, class가 2개인 Binary Classification인 경우에 **Softmax**는 다음과 같아진다. 특히 이를 **Sigmoid**(**Logit**)라고 정의한다.

$$
p(y_n = k | \bold{x}_n, \bold{w}) = {1\over{1+\exp(-y_{n}\bold{w}^{\top}\bold{x}_{n})}}
$$

이를 유도하는 과정은 생략하지만, 여타 다른 블로그를 더 참고하면 좋다.

이를 Linear Regression과 비교해서 살펴보자.

![logistic-vs-linear](/images/logistic-vs-linear.jpg)

Linear Regression은 특정값을 향해 나아가고 있다. 해당 방식을 보면 x가 대상의 특성을 강하게 가지고 있다면, 명확하게 구분할 수 있는데, 이는 **sigmoid**($\sigma$) 함수가 [0, 1] 범위 내에서 정의되기 때문에 Regression 과정에서 극단 데이터(outlier)가 가지는 영향력이 Linear Regression보다 극단적으로 적다는 것을 알 수 있다.

자 이것이 가지는 의미를 이전에 살펴본 **Bayes Decision Rule**에 기반해서 생각해보자. **sigmoid**($\sigma$)는 결국 극단적인 데이터이든, 애매한 데이터이든 거의 비슷한 값으로 변환한다. 그렇다는 것은 기존에는 평균을 구하는데에 input(x)의 값이 큰 영향을 미쳤다면, **sigmoid**($\sigma$)에서는 특정 class에 속하는 x의 갯수가 많은 영향을 주는 것을 알 수 있다. 이를 통해서 **sigmoid**($\sigma$)가 완벽하지는 않지만, **Bayes Decision Rule**을 반영했다는 것을 알 수 있다.

마지막으로, MLE를 통해서 Logistic Regression의 parameter를 추정해보자. (MAP는 기존에 살펴본 Linear Regression과 동일하게 regularizer를 더해주는 방식이기 때문에 생략한다.)

$$
\begin{align*}
\argmax_{w}\log{p(\mathcal{D}|\bold{w})} &= \argmax_{w}\sum_{n=1}^{N}{\log p(y_{n}|\bold{x}_{n}, \bold{w})} \\
&= \argmax_{w}\sum_{n=1}^{N}{\log ({1\over{1+\exp(-y_{n}\bold{w}^{\top}\bold{x}_{n})}}) } \\
&= \argmax_{w}\sum_{n=1}^{N}{-\log (1+\exp(-y_{n}\bold{w}^{\top}\bold{x}_{n})) } \\
&= \argmin_{w}\sum_{n=1}^{N}{\log (1+\exp(-y_{n}\bold{w}^{\top}\bold{x}_{n})) } \\
\end{align*}
$$

## Gradient Descent/Ascent

위의 복잡한 식을 봤으면 알겠지만, 안타깝게도 일반식으로 $\bold{w}_{MLE}, \bold{w}_{MAP}$ 등을 구할 수는 없다. 따라서, 우리가 믿을 것은 Gradient를 이용한 방식이다.

> **Gradient Descent**

먼저, 위에서 봤겠지만, Loss는 다음과 같다.

$$
\mathcal{L} = \sum_{n=1}^{N}{\log(1+\exp(-y_{n}\bold{w}^{\top}\bold{x}_{n}))}
$$

이제 이를 미분해서 Gradient를 구하면 다음과 같다.

$$
\nabla_{\bold{w}}\mathcal{L}(\bold{w}) = \sum_{n=1}^{N}{{{-y_{n}\exp(-y_{n}\bold{w}^{\top}\bold{x}_{n})}\over{1+\exp(-y_{n}\bold{w}^{\top}\bold{x}_{n})}}\bold{x}_{n}}
$$

따라서, Gradient Descent 방식은 다음과 같이 진행된다.

$$
\bold{w}_{t+1} = \bold{w}_{t} - \alpha\nabla_{\bold{w}}\mathcal{L}(\bold{w}_{t})
$$

> **Gradient Ascent**

위의 방식이 가장 일반적이지만, 우리가 sigmoid의 class값으로 $y \in \{-1, 1\}$ 대신 $y \in \{0, 1\}$을 사용했을 경우 다른 식으로도 접근이 가능하다.

이 경우에는 Loss라기 보기 어렵지만, 다른 형태의 optimization 형태가 만들어진다. (여기서 $\sigma$는 sigmoid 함수를 의미한다.)

$$
\argmax_{\bold{w}} \sum_{n=1}^{N}y_{n}\log{\sigma(\bold{w}^{\top}\bold{x}_{n}) + (1-y_{n})\log{(1-\sigma(\bold{w}^{\top}\bold{x}_{n}))} }
$$

이를 똑같이 미분하여 사용하지만, 반대로 이 경우에는 maximization 이기 때문에 Gradient Ascent를 수행해야 한다. 

우선 미분 결과 얻는 Gradient는 다음과 같다.

$$
\nabla_{\bold{w}}\mathcal{L}(\bold{w}) = \sum_{n=1}^{N}{[y_{n} - \sigma(\bold{w}^{\top}\bold{x}_{n})]\bold{x}_{n}}
$$

굉장히 간단하게 정리가 되어지는 것을 볼 수 있다.

$$
\bold{w}_{t+1} = \bold{w}_{t} - \alpha\nabla_{\bold{w}}\mathcal{L}(\bold{w}_{t})
$$

따라서, 아래와 같이 Gradient Ascent를 활용하여 계산하는 것도 충분히 가능하다.

> **Newton Method**

이러한 형태로 넘어오게 되면, 굉장히 많은 연산이 각 update마다 필요하다는 것을 알 수 있다. 따라서, 우리는 이 과정을 축약할 방법을 찾게 된다. 그 아이디어는 바로 gradient를 업데이트 할 때, linear 하게 update하는 것이 아니라 Quadratic하게 update하는 것이다. 이를 위한 방법론이 **Newton Method**이다. 이 방식을 Logistic Regression에 적용하였을 때, 이를 IRLS(Iterative Re-weighted Least Squared) Algorithm 이라고 부른다.

![newton-method](/images/newton-method.jpg)

위 그래프에서 f(x)가 Loss 라고 할 때, 우리는 $x_k$에서 직선형의 gradient를 사용하는 것보다 quadratic 형태를 사용하는 것이 더 빠르게 수렴값을 찾을 수 있다는 것을 알 수 있다.

이를 사용하기 위해서는 다음 2가지에 대한 사전 이해가 필요하다.

- Taylor Series  
  smooth한 형태를 가진 x에 대한 함수를 x에 대한 급수의 형태로 변환한 것이다. 따라서 이를 식으로 나타내면 다음과 같다.  
  $T_{\infin}(x) = \sum_{k=0}^{\infin}{f^{(k)}(x_{0})\over{k\!}}(x-x_{0})^{k} $  
  즉, sine 함수와 같은 형태의 그래프도 x의 급수 형태로 변환이 가능하다는 것이다. Newton Method에서는 무한대까지는 사용하지 않고, 대게 K=2까지를 쓴다.
- Hessian Matrix  
  특정 함수 $f(\bold{x})$를 각 feature에 대해서 이중 편미분한 결과를 저장한 행렬이다. 식은 다음과 같다.  
  $
  H = \nabla^{2}f(x) =
  \left[
    \begin{array}{ccc}
      \dfrac{\partial^{2} f(\mathbf{x})}{\partial x_{1}^{2}} & \cdots & \dfrac{\partial^{2} f(\mathbf{x})}{\partial x_{1} \partial x_{D}} \\ 
      \vdots & \ddots & \vdots \\
      \dfrac{\partial^{2} f(\mathbf{x})}{\partial x_{D} \partial x_{1}} & \cdots & \dfrac{\partial^{2} f(\mathbf{x})}{\partial x_{n}^{2}}
    \end{array}
  \right]
  $

이를 이용해서, Newton Method의 결과값을 정리하면 결과는 다음과 같다.

$$
\bold{w}^{(k+1)} = \bold{w}^{(k)} - [\nabla^{2}\mathcal{J}(\bold{w}^{(k)})]^{-1}\nabla\mathcal{J}(\bold{w}^{(k)})
$$

자 이제 이것을 실제로 Logistic Regression 식에 대입해보자.

$$
\begin{align*}
  \nabla\mathcal{J}(w) &= - \sum_{n=1}^{N}(y_{n}-\hat{y}_{n})x_{n} \\
  \nabla^{2}\mathcal{J}(w) &= \sum_{n=1}^{N}\hat{y}_{n}(1-\hat{y}_{n})\bold{x}_{n}\bold{x}_{n}^{\top}
\end{align*}
$$

여기서, 아래와 같이 변수를 정의하면,

$$
S = 
  \begin{bmatrix}
    \hat{y}_{1}(1-\hat{y}_1)  & \cdots  & 0                         \\
    \vdots                    & \ddots  & \vdots                     \\
    0                         & \cdots  & \hat{y}_{N}(1-\hat{y}_N)  \\
  \end{bmatrix},

\bold{b} = 
  \begin{bmatrix}
    {{y_{1} - \hat{y}_{1}}\over{\hat{y}_{1}(1-\hat{y}_{1})}} \\
    \vdots \\
    {{y_{N} - \hat{y}_{N}}\over{\hat{y}_{N}(1-\hat{y}_{N})}}
  \end{bmatrix}
$$

결과적으로 다음과 같은 형태를 얻을 수 있다.

$$
\begin{align*}
\bold{w}_{k+1} &= \bold{w}_{k} + (XS_{k}X^{\top})^{-1}XS_{k}\bold{b}_{k} \\
&= (XS_{k}X^{\top})^{-1}[(XS_{k}X^{\top})\bold{w}_{k} + XS_{k}\bold{b}_{k}] \\
&= (XS_{k}X^{\top})^{-1}XS_{k}[X^{\top}\bold{w}_{k} + \bold{b}_{k}]
\end{align*}
$$

이는 결코 계산 과정이 단순하다고는 할 수 없지만, 빠르게 수렴할 수 있기 때문에 가치있는 방법이다.


## Reference

- Tumbnail : Photo by [Markus Winkler](https://unsplash.com/@markuswinkler?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/@markuswinkler?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)