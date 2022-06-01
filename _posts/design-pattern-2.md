---
slug: "design-pattern-2"
title: "[Design Pattern] 2. Creational Pattern"
date: "2022-02-22 16:54"
category: "Tech"
tags: ["DesignPattern", "AbstractFactoryPattern", "BuilderPattern", "Creationalpattern", "FactoryMethodPattern", "PrototypePattern", "SingletonPattern"]
thumbnailSrc: "/images/design-pattern.jpg"
---

## Reference

- Design Patterns: Elements of reusable object oriented software.
- Thumbnail : Photo by [MagicPattern](https://unsplash.com/es/@magicpattern?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/design-pattern?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

## Creational Pattern

object의 instantiation을 추상화하는 방법입니다.

즉, instance를 만들 때, 어떻게 하면 재사용과 변경에 유용한 구조로 만들 수 있을까에 대한 고민의 결과로 나온 pattern이라고 볼 수 있습니다.

일반적인 순서로는 Abstract Factory, Builder, Factory Method, Prototype, Singleton이지만, 제가 이해하기 쉬운 순서대로 정리하겠습니다.

모든 가정은 App이라는 main class에서 product1과 product2라는 object가 필요하다는 가정하에서 이를 어떻게 얻어오는지에 대해서 살펴보겠습니다.

### <mark>1. Singleton<mark>

![singleton](/images/singleton.jpeg)

가장 먼저 알아볼 것은 Singleton 입니다. 가장 기본이기에 가장 중요한 design pattern 중에 하나라고 생각합니다.

우리가 특정 object가 필요할 때, 해당 대상을 단 하나만 만들어서 이를 전역에서 접근하도록 하여 구현하는 방식을 의미합니다.

당연히 이 방식을 이용하게 되면, zero copy라는 측면에서 효율이 굉장히 좋을 것입니다. 하지만, 이러한 pattern을 남용하게 된다면, 누가 이 product에 접근하고 있는지 그리고 누가 변경했는지 알기 어려워집니다. 따라서, **해당 Singleton에서 중요한 점이라면, 변하지 않는 값만 가지도록 하는 것입니다.**

이를 통해서, 누가 이를 사용하더라도 시스템에는 영향을 안 주면, zero copy로 사용하기 때문에 굉장히 효율상으로도 훌륭하게 사용할 수 있습니다.

하지만, maintainable의 입장에서는 큰 약점이 될 수 있습니다. 하나의 구현을 바꾸게 된다면, 전체 시스템이 어디서 어떻게 영향을 받는지 알 수 없기 때문에 이 점에서는 약점을 가지고 있습니다.

하지만, 우리가 다루는 object에 변화가 필요하고, 능동적인 조작이 필요한 경우에 object 자체로 singleton으로 만드는 것에는 제한이 생깁니다. 따라서, 우리는 object의 instance를 대신해서 생성해주는 factory라는 개념을 사용하게 됩니다. (이들을 singleton으로 만드는 것이 좋습니다.)

이는 저번 챕터 1에서 보았던 delegation을 활용한 것입니다. 자신이 사용하고자 하는 object의 instantiation을 다른 object에게 맡기는 형식입니다. 이를 통해서, 본연에 하고자 하던 행동에 좀 더 집중할 수 있습니다.

---

다음으로 넘어가기 전에, 한 번 더 머릿속에 정리합시다. 지금의 App이 알고 있는 사항은 무엇일까요?

어떤 내용도 추상화를 통해서 감추지 않았기 때문에, 우리는 productA, productB라는 object가 정확하게 무엇인지 알고 있고, 이를 만드는 방법까지도 완벽하게 알고 있는 상태입니다.

### 2. Builder

![builder](/images/builder.jpeg)

가장 쉽게 object의 생성을 맡긴다고 했을 때, 상상할 수 있는 구조입니다. IBuilder라는 interface를 통해서 builder를 묶어줄 수도 있지만, 단순히 각 object(product)에 대한 builder를 생성해줄 수도 있습니다.

**여기서 중요한 개념은 각 product에 대한 전문 생성자를 구축한다는 점입니다.** 내가 만들고자 하는 object에 대해서 이것만을 전문적으로 만들 수 있는 class를 singleton으로 생성함으로써, 쉽게 무언가의 제품을 만들고 싶다면, 이 builder에게 맡기면 되겠다는 식의 발상으로 이어질 수 있습니다.

builder는 얻고자 하는 product에 대한 모든 내용을 추상화해버리기 때문에, 내부의 코드가 정교하게 만들어지고 변화가 없다면, 매우 좋게 작동할 수 있습니다. 하지만, product 하나를 여러 object들이 사용한다면, 후에 변경이 매우 어려워질 수 있습니다.

---

자 이번에도 넘어가기 전에, 한 번 더 머릿속에 정리합시다. 지금의 App이 알고 있는 사항은 무엇일까요?

우리는 현재 builder라는 대상에게 object의 생성을 넘겼습니다. 그렇기 때문에 우리는 productA, productB라는 object가 정확하게 무엇인지 알고 있지만, 이를 만드는 방법은 모르는 상태입니다.

### 3. Abstract Factory

![abstractFactory](/images/abstractFactory.jpeg)

이제 그림이 조금 복잡해집니다. 여기서는 좀 더 복잡한 상황을 고려한다는 것을 직감적으로 받아들이시면 됩니다.

이제 우리는 만들고자 하는 object도 어떤 부류 중에 하나다 정도로만 알 수 있습니다. 이 상황에서 우리는 이를 만들고자 하는 object 마저 추상화를 한 것을 볼 수 있습니다.

또한, 우리는 Factory를 Singleton으로 만들어야 한다는 점에도 주목해야 합니다.

결국 모든 생성의 대한 권한은 factory에게 넘어갔고, 필요에 따라서 우리는 특정한 factory를 골라서 사용하면 됩니다. 마찬가지로 product 역시 필요에 따라 골라서 사용하면 됩니다.

하지만, 이 pattern은 굉장히 비싼 pattern이라고 볼 수 있습니다. 후에 지원하고자 하는 product 자체를 하나 더 만든다면, (ProductC) 이를 추가하기 위해서 모든 Factory는 이를 생성할 수 있도록 변경이 되어야 할 것입니다.

---

그럼 이번에는 어떨까요?

우리는 현재 factory라는 대상에게 object의 생성을 넘겼습니다. 또한, product 또한 추상화를 통해서 이것이 무슨 기능을 하는지는 어렴풋하게 알고 있지만, 이것이 정확하게 무엇인지는 모릅니다.(예전에는 정확하게 구두라고 지정했다면, 이번에는 두루 뭉술하게 신발이라고 쓰고 이를 사용하고 있다고 생각하시면 됩니다.) 그렇기 때문에 우리는 productA, productB라는 object가 정확하게 무엇인지도 모르고, 이를 만드는 방법 또한 모르는 상태입니다.

### 4. Prototype

![prototype](/images/prototype.jpeg)

Prototype의 뜻부터 알고 가면 좋습니다. 이는 하나의 type을 대표할 수 있는 전형적인 예, 원래의 형태 정도로 해석할 수 있습니다. 즉, 특정 부류를 설명할 수 있는 전형적인 예에서 부터 확장을 시작한다는 개념으로 받아들이는 것이 좋습니다.

기존의 Interface를 이용하는 방식은 대상이 정확하게 무슨 기능을 할 수 있는지에 대한 엄격한 선언이 있었다면, 해당 방식에서는 다소 느슨하다고 할 수 있습니다. 전형적인 예인 prototype에서부터 시작하여 이를 확장하여 표현한다는 것이 일반적인 견해라고 할 수 있습니다. 따라서, 구현도 Factory에서 Prototype을 가지고 이를 Clone 하여서 instantiating을 수행하거나 이를 확장하여서 또 다른 object를 생성하는 Factory를 구현하는 식으로 확장해나갈 수 있습니다.

그렇기에 Prototype 방식에서는 clone이라는 method가 굉장히 중요합니다. (또한, 이 Prototype은 Singleton이라는 것도 아시겠지요?) 기존의 abstract factory 방식과는 다르게 Factory 자체에서 Prototype을 가지고 있는 것입니다. 그리고, 이를 이용해서 object를 생성한다고 볼 수 있습니다.

이 방식은 과거 해당 책이 나오기 전까지만 해도 다소 비주류로 (물론 지금도 주류는 아닙니다.) 여겨졌었지만, 이제는 immutable이라는 말도 계속해서 사용되고 있고, Modern Java, javascript 등 여러 언어에서도 이 pattern을 기본으로 받아들였습니다.

---

여기서는 어떨까요?

이 또한 factory에게 생성을 맡겼고, product 또한 이를 대표할 수 있는 전형적인 예 정도를 알고 있다고 볼 수 있습니다. 그렇기 때문에 우리는 productA, productB라는 object가 정확하게 무엇인지도 모르고, 이를 만드는 방법 또한 모르는 상태입니다.

### 5. Factory Method

![factoryMethod](/images/factoryMethod.jpeg)

이번에는 조금 다른 구현입니다. 이번에는 생성을 위한 대리자를 두지 않고, 다른 Product를 쓰고 싶다면, App 자체를 새로 작성하자는 흐름입니다. 이렇게 하게 되면, App 자체가 특정 Product와 의존성이 생기게 됩니다. 하지만, 정확하게 Product를 알고 있다는 것은 type 검사에 시간을 낭비하지 않을 수 있다는 뜻이고, 그로 인해 더 빠른 개발이 가능하다는 뜻으로 받아들일 수 있습니다.

이 방법론은 대게 개발 초기에 매우 많이 쓰인다고 합니다. 왜냐하면, 아직 어떤 Product까지 지원할지 모르지만 어느정도의 추상화를 통해서 해당 object가 가져야 할 최소한의 기능을 지정해놓고, 바로 특정 object에 대한 개발을 시작함으로써 해당 시스템의 검증을 빠르게 수행할 수 있는 것입니다. 그리고, 후에 maintain의 시간이 오면, code를 refactoring 하고 위에서 보았던 다른 design pattern을 검토하며 선택하는 시간을 가진다고 볼 수 있습니다.

해당 시스템에 대한 구현은 제 Github에 별도의 Branch를 통해서 구현해두었습니다. 언어는 typescript로 작성하였고, 참고할 수 있으면 좋겠습니다. :)

[🔗 GitHub](https://github.com/euidong/oop-design-pattern/tree/creational-pattern)
