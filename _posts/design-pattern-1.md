---
slug: "design-pattern-1"
title: "[Design Pattern] 1. Intro"
date: "2022-02-20 16:48"
category: "Tech"
tags: ["DesignPattern", "OOP"]
thumbnailSrc: "/images/design-pattern.jpg"
---

## Intro

점점 다양한 언어들이 생겨나고, 객체 지향에 대한 관심이 시들해지고 있는 환경이라고 생각합니다. 하지만, 그럼에도 불구하고, 여러 시스템에서도 거의 고유 명사로 쓰이고 있기에 객체 지향의 대표적인 디자인 패턴을 익혀두는 것은 필수적이라고 생각해서 제가 봤을 때 가장 빈번하게 사용되는 용어에 대해서 정리를 좀 해보고자 합니다.

해당 글에서는 일단 introduction에 대한 내용을 정리합니다.

## Design Pattern

software적으로 특정 상황에서 일반적인 문제를 해결하기 위해서 반복되어 사용되는 pattern을 말합니다. 이는 특정 문제를 해결하기 위한 algorithm이 아닌 이런 구조가 더 경험상 안정적인 구조를 이룰 수 있다는 template를 제공하는 것입니다.

이러한 pattern들은 4개의 요소를 가집니다.

1. **Pattern name** : pattern의 실제 이름을 의미합니다.
2. **Problem** : 언제 해당 pattern을 적용하는지를 표기합니다. 하나의 pattern으로 여러 문제를 해결할 수 있다면, 당연히 list 형태로도 표기합니다.
3. **Solution** : design을 이루는 요소들과 관계, 역할(책임)을 명시한다. 하나의 문제에 정확하게 대치되는 해결책을 보여주는 것이 아니라 구조를 파악할 수 있는 template를 제공합니다.
4. **Consequences** : 해당 pattern을 적용하게 되었을 때 얻게 되는 결과로, 대게 유연하게 확장이나 재사용을 할 수 있는지에 대한 관점에서 장점과 단점을 표기합니다.

이 책에서 말하는 design pattern들이 추가하는 가장 큰 목표는

Object Oriented Programming을 100% 활용할 수 있는 방법을 찾는 것입니다.

<mark>**이는 Maintainable 하기 위해서, 가독성이 높고 유연하며, 재사용이 좋은 system을 구축하기 위한 방법을 찾는 것이라는 말과 같습니다.**</mark>

이를 항상 머릿속에 두고, 이어 나갑시다.

### Example) MVC

design pattern에 대하여 이해를 돕기 위한 예시입니다. 만약, MVC 자체가 생소하다면, 넘어가는 것이 좋습니다.

가장 일반적으로 UI 작업을 하게 될 때 많이 사용되는 design pattern입니다. 이를 구성하는 Model / View / Controller의 앞 글자를 하나씩 가져와서 이를 지은 것입니다.

여기서, Model은 application의 data를 표현하는 객체입니다.  
View는 model을 user들에게 보여주는 방법을 정의한 객체입니다.  
Controller는 user input에 대하여 model 또는 view를 어떻게 변경할지를 정의한 객체입니다.

여기서, 흔히 사용되는 design pattern 3가지를 발견할 수 있습니다.

> **1. Observer pattern**

이는 model과 view를 분리하고, subscribe/notify 형태를 갖게 한 구조입니다.(view는 model의 변경이라는 event를 구독하고 있고, model은 자신이 변경되면, view에게 이를 알려서, view가 변경될 수 있도록 한다.)

이렇게 분리함으로써 얻는 효과는 우리는 하나의 model에 대해서 여러 개의 view를 가질 수 있다는 점이다. 또한, 새로운 view를 추가할 때에도 model을 변경하지 않아도 됨으로 쉽게 확장이 가능하다.

> **2. Composite pattern**

View는 중첩해서 사용이 가능하다. 즉, View안에 View를 중첩해서 쌓음으로써 재사용을 수행하는 것이다.

> **3. Strategy pattern**

View는 user input을 받는 장치(button) 등을 포함하고 있고, Controller instance를 포함하고 있기 때문에, 해당 instance를 교체함으로써 쉽게 동작을 변경하는 것도 가능하다.

### **Type**

해당 책에서는 총 23가지의 design pattern을 제시합니다. 그들을 분류하는 체계를 어느 정도 나눈다면 쉽게 이해가 가능할 겁니다.

> **1. Purpose**

실제로 해당 pattern이 하고자 하는 바를 나타냅니다. 총 3 가지의 목적으로 design pattern을 나눈 것이 가능합니다.

1. **Creational** : object의 생성 시에 특정 부분을 자식 class 또는 다른 object로 옮기는 방법을 제공합니다.
2. **Structural** : class 또는 object를 구조화하는 방법을 제공합니다.
3. **Behavioral** : class 또는 object가 특정 행동을 구현하기 위한 각 요소의 관계를 정의합니다.

> **2. Scope** : 구현이 기본적으로 class 단위인지, object 단위 인지를 나타냅니다.

1. **Class** : class들과 subclass들 간의 관계를 다루기 때문에, 상속에 의해서 정의되며, compile time에 고정되어서 바뀌지 않습니다.
2. **Object** : object들 간의 관계를 의미하며, run time에 유동적으로 바뀔 수 있습니다.

![design-pattern-category](/images/design-pattern-category.jpeg)

### Basic Skill

design pattern이 해결하기 위해서 사용하는 일반적인 기술들을 먼저 이해하면, 이를 조합해서 우리는 design pattern을 구성할 것이므로, 이 일반적인 기술부터 알아보고 가도록 합시다.

#### <mark>Object Oriented Programming</mark>

이 책의 가장 기본이 되는 객체 지향에 대한  내용입니다. 이를 읽고 아래를 읽으시는 것이 이해가 더 쉬울 것입니다. 이미 알고 있다면, 바로 다음부터 읽으시면 될 거 같습니다.

일반적으로 object oriented program에서 <mark>object</mark>란 data와 해당 데이터를 조작하는 여러 operation를 묶은 것을 말합니다. 이때, 우리는 해당 object 안의 data를 직접적으로는 접근할 수 없고, object에게 operation의 동작을 요청함으로써 output으로써 data를 얻거나 변경할 수 있습니다. 이를 우리는 encapsulated 되었다고 합니다.

object에 의해서 선언된 모든 operation은 이름과 input parameter, output value를 명시한 signature를 가집니다. 이러한 signature를 모아놓은 것을 해당 object의 <mark>interface</mark>라고 합니다. 따라서, interface에 있는 내용을 만족하는 request만이 object로 보내진 다고 할 수 있습니다. 여기서 중요한 것은 interface는 절대로 구현을 포함하지 않습니다. 단지 해당 operation에 대한 이름과 input, output을 알려줄 뿐입니다. 그렇기에 같은 이름이며, 들어가는 데이터, 나오는 데이터는 같지만 전혀 다른 구현을 가지도록 만들 수도 있는 것입니다. 이처럼 run time에 interface를 implementation 한 object 중에서 무엇을 실행시킬지를 선택할 수 있도록 하는 기술을 dynamic binding이라고 합니다. interface가 runtime에 정확하게 어떻게 동작할지 여러 형태를 가지는 것을 우리는 polymorphism이라고 합니다.

이 구조가 가지는 장점은 다음과 같습니다.

> **1. 대체 가능하다.**

"우리가 글을 쓰기 위해서는 반드시 연필이 필요하다."는 규칙을 정했다면,

우리는 샤프나 다른 볼펜이 있더라도 이 규칙에 어긋나므로 우리는 기존 규칙을 다시 바꾸거나 연필을 가져와야 할 것입니다.

하지만, 애초에 규칙을 "우리가 글을 쓰기 위해서는 반드시 검은색을 표시할 수 있는 도구가 필요하다."는 규칙을 정했다면, 더 유연한 규칙이 될 수 있습니다.

우리의 코드도 마찬가지로 interface를 통해서 검은색 글자를 쓰는 함수를 정의한 interface로 선언하고 이를 type으로 지정해둔다면, 이를 실행하는 object가 연필, 샤프, 볼펜 무엇이 되어도 되기 때문에 대체 가능한 구조를 가질 수 있는 것입니다.

> **2. 유연하다.**

위의 처럼 규현 할 수 있기 때문에 우리는 유연하게 구조를 만들 수 있습니다. 모든 관계가 느슨하게 연결된다고 SW 업계에서는 자주 표현합니다.

가능한 한 최소한의 기능만을 통해서만 대상을 정의한다면, 더욱더 유연한 구조가 된다고 할 수 있습니다.

> **3. 가독성이 좋다.**

우리는 해당 object를 사용할 때 이것이 어떻게 돌아가는지 모르더라도 사용할 수 있기를 바랍니다. 스마트폰을 가동시키기 위해서 이것의 부팅 절차와 여러 algorithm을 이해하는 것은 우리가 문자를 보내는 과정에서 불필요한 내용입니다. 따라서, 우리는 최대한 최소한의 내용만을 알면 됩니다. 가령 "오른쪽  전원 버튼을 누르면(input) 화면이 켜진다(output)"는 이러한 내용입니다. 이는 우리가 더 복잡한 문자 메시지 보내기를 쉽게 할 수 있는 토대를 제공합니다.

> **4. 문서화가 용이하다.**

이제 우리가 시스템을 판매하거나 이를 통해서 같이 일해야 하는 경우가 생긴다면, 이에 대한 설명서가 필요합니다. 만약, 여러 방식으로 구현을 해두었다면, 통일성 있는 문서를 기대할 수는 없습니다. 하지만, interface를 통해서 구현했다면, 이 interface가 요구하는 동작만을 정확하게 적어둔다면, 쉽게 이해할 수 있고 구조화된 문서를 만들기가 용이합니다.

그렇다면, 실제로 programming에서 이 interface와 object를 구현하는지를 살펴보아야 합니다.

대게의 언어에서는 interface, abstract class라는 것을 포함합니다. 이들을 각 각 이들을 구현 또는 상속할 대상들이 반드시 가져야 할 요소(name, input parameter, return value)에 대한 내용을 기술합니다.

그러면 우리는 class를 통해서 이에 대한 구현을 수행합니다. 따라서, 우리는 하나의 interface에 대하여 여러 개의 구현을 가지게 됩니다. (이를 구현을 defer(미루었다)고 표현합니다.) 그리고, 이제 실제로 만들어지는 object들을 우리는 class를 <mark>instantiating</mark>(틀을 기반으로 복사)하여 생성하는데 이때 만들어진 대상을 우리는 특별히 <mark>instance</mark>라고 합니다.

또한, class를 선언한다는 것은 우리에게 두 가지 효과를 불러옵니다. class라는 instantiating 하기 위한 틀을 만들 뿐만 아니라 <mark>type</mark>을 생성합니다. 즉 우리가 일반적으로 instance를 만들기 위해서 다음과 같은 과정을 거치게 될 때 앞에 있는 Class는 class의 type을 의미하는 것이고, 뒤에 있는 것은 instance를 만들기 위한 틀을 의미합니다.

```c++
SimpleClass sc = new SimpleClass();
```

그렇습니다. 만약 우리가 class를 interface의 구현으로 만든 것이 아니라면, interface type을 만들면서, class 틀까지 같이 만든 것으로 이해할 수 있는 것입니다. 하지만, interface와 다른 점이라면, 이를 상속하게 되면, 이 안의 구현도 같이 subclass로 전달된다는 점이 있겠습니다. 따라서, 우리가 더 유연한 시스템을 만들고자 한다면, 당연히 일반 class를 통해서 만들어지는 type를 사용하기보다는 abstract class 또는 interface를 통해서 만들어지는 type을 활용하는 것이 더 유연하고, reusable 한 구조를 만드는 핵심이 될 수 있습니다.

마지막으로 다룰 내용은 class의 구성 방식입니다.

만약, 특정 시스템이 무언가를 구현한다고 했을 때, "A는 B다"를 통해서 구현하는 것이 좋을까 아니면, "A는 B를 갖고 있다"를 통해서 구현하는 것이 좋을 가입니다.

일반적으로 우리는 상속을 통해서 표현되는 관계를 "inheritance" 또는 "is a" 관계라고 합니다. 즉, A가 B라는 클래스를 상속한다면, A는 B이다.라고 말할 수 있습니다. 왜냐하면, B를 상속하는 A는 당연히 B의 하위 관계이기 때문입니다. (ex. 코끼리는 동물이다.) 하지만, 상속이 아닌 변수로서 이를 포함할 때 우리는 이를 "composition" 또는 ("has" or "use") 관계라고 합니다. 즉, A가 B를 갖고 있다로 보는 것입니다. (ex. 코끼리는 동물의 속성을 가진다.)

이 중에서 어떤 식으로 구현하는 것이 유연한 구조를 만들 수 있을지는 자명합니다. 당연히 composition입니다.

이를 알아보기 위해서 구현이 바뀌는 예시를 들어봅시다.

- 만약, 코끼리 중에서 코가 짧은 개체가 발견되어 더 이상 코끼리는 코가 크다는 속성을 쓸 수 없는 경우
  - inheritance, composition : 둘 다 구현부에서 쉽게 변경이 가능합니다.
- 코끼리 중에서 외계에 존재하는 종이 발견되어 외계종의 특징을 추가해야 하는 경우
  - inheritance : 외계 생명체라는 interface를 추가로 상속합니다. 하지만, 이 과정에서 충돌되는 속성들(ex. 겹치는 operation 이름, 서로 반대되는 성질) 등에 의해서 최악의 경우 interface를 수정해야 할 수도 있습니다. 그렇게 되는 경우 이 interface를 구현한 모든 class들 역시 변경이 필요합니다
  - composition: 해당 외계 생명체라는 속성을 가져와서 필요로 하는 속성만을 확인하고 구현합니다.
- 코끼리라는 식물이 새로 발견된 경우 => 모두 크게 변경해야 함.
  - inheritance : 상속을 식물로 변경하고, 식물의 속성에 구현된 것을 새로 정의합니다.
  - composition : 가지고 있던 변수를 식물로 변경하고, 변수에 의존성이 있던 부분을 직접 바꾸어 구현합니다.

따라서, 대개의 경우 상속은 interface를 직접적으로 구현할 때에만 사용하고, 그 외에 경우에 composition을 통해서 의존성을 형성하는 것을 선호합니다.

composition은 해당 관계가 run-time에 생성되는가 아니면, compile-time에 생성되는가에 따라서 두 개로 나뉠 수 있습니다.

만약, class 내부에서 해당 변수를 생성 시부터 소멸 시까지 갖고 있는다면, 이는 <mark>aggregation</mark>(have)로 볼 수 있습니다. (즉, compile time에 관계가 형성됩니다.) 그렇지 않고, run time에 생성되어 잠깐 사용되는 정도의 관계라면, 이는 <mark>acquaintance</mark>(use) 관계로 봅니다.

#### Finding Appropriate Objects

우리가 해결하고자 하는 문제를 위해서 어느 정도까지의 object들이 필요하고, 이를 어떻게 정의할 것인지를 결정하는 것을 도와줄 수도 있습니다.(Composite, Strategy,...)

#### Determining Object Granuality

Object를 무엇으로 결정했다면, 당연히 이 Object의 크기를 어느 정도로 할지에 대한 내용도 필요하게 될 것입니다. 이를 정의하는 design pattern(Facade, FlyWeight,...)도 존재합니다.

#### Specifying Object Interfaces

무엇을 interface에 추가해야 하는지 아니면 포함시켜서는 안 되는지에 대한 내용을 서술한 design pattern(Memento), interface 간의 관계를 표현하는 것(Decorator, Proxy)도 있습니다.

#### Delegation

delegation은 자신의 operation의 구현을 composition 한 instance에게 맡기는 방식입니다.

![delegation](/images/delegation.jpeg)

보는 바와 같이 자신의 Area라는 함수의 실행을 Rectangle의 Area 함수로 대체함으로써 더 유연한 구조를 만들 수 있습니다. 만약에 Window가 Circle로 바뀐다면 간단히 Circle의 instance를 생성해서 이 instance의 Area를 호출하도록 하면 될 것입니다.

이는 굉장히 유용하고, 유연한 개발이 가능하지만, 다른 instance의 요소를 실행시키니 만큼 run-time 중에 비효율적인 동작을 막을 수는 없습니다. 따라서, 이를 유의하고 사용해야 합니다.

실제로도 State, Strategy pattern에서도 사용됩니다.

## Reference

- Design Patterns: Elements of reusable object oriented software.
- Thumbnail : Photo by [MagicPattern](https://unsplash.com/es/@magicpattern?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/design-pattern?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
