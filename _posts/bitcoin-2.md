---
slug: "bitcoin-2"
title: "[Bitcoin] 2. Serialization"
date: "2022-03-18 14:51"
category: "Tech"
tags: ["BlockChain", "Bitcoin"]
thumbnailSrc: "/images/bitcoin.jpg"
---

## Intro

**해당 Posting은 Bitcoin이 무엇이고, 이것으로 무엇을 할 수 있는지에 대해서 설명하지 않고 Bitcoin을 구현하는 기술에 대하여 다룹니다.** 또한, 책의 모든 내용을 충실히 번역하는 것이 아닌 작성자의 생각이 많이 담겨 있으니 유의 바랍니다.

**해당 chapter에서는 Bitcoin에서 데이터를 어떻게 Serialization 하고, Parsing 하는지에 대해서 다룹니다.**

---

먼저, Serialization이 무엇인지부터 알아보아야 합니다. Serialization이란 현재 programmer가 만들어놓은 data(Class Instance, 등)를 network를 통해서 다른 computer로 옮기거나, 저장 장치 file 등으로 옮겨 담을 때, **연속적으로 표현되는 형태**로 구조화하는 방법을 말합니다. 대게, 이러한 처리는 원본 데이터를 변환하기 때문에, 이를 원래 data로 변환하는 Parsing과 짝을 이룹니다.

데이터마다, 그리고 사람마다 더 좋다고 생각하는 serialization 방식은 매우 많습니다.

대게 고려하게 되는 사항은 다음과 같습니다.

1. **효율성** : 변환하는 데이터가 짧게 표현될 수록 더 효율적으로 전달이 가능하다는 것은 자명하기에 이는 가장 중요한 요소 중 하나입니다.
2. **보안성** : network로 전달이 될 가능성이 높기 때문에, 이를 전달받은 누구나 이를 변환할 수 있다면, 위험할 수 있습니다. 따라서, 보안성을 위해서, 암호화 또는 hashing을 수행하기도 합니다.
3. **안정성** : 대게 보안성과 묶어서 설명하지만, 여기서는 분리하였습니다. 즉, 데이터가 중간에 손실되지 않고, 안정적으로 제대로 도착했는지를 확인할 수 있도록 하는 것도 중요합니다.
4. **표준** : 결국 Serialization을 하더라도, 이를 수신받은 입장에서는 이를 번역한 내용에 관심이 있기에, 이를 번역할 방법이 서로 공유가 되어있어야 합니다. 그렇기에 많은 경우에, Serialization을 표준으로 정해진 방식을 통해서 수행됩니다. 또는, 새로운 표준을 만들어서 수행합니다.
5. **가독성** : 대게, serialization된 데이터 자체를 사람 간에 구두로 전달해야 할 경우가 있습니다. 이를 위해서, 인간 친화적인 형태로 데이터를 변조하는 경우도 많습니다.

---

먼저, Bitcoin에서 구체적으로 어떤 식으로 Serialization을 살펴보기 전에 기반 기술을 알아볼 것입니다. 각 기술에 대해서 이미 알고 있다면, 바로 다음으로 넘어가도 좋습니다.

### 1. Byte화

일반적으로, Serialization을 수행한 결과물은 bytes(8bit) 형태로 나타나는 것이 일반적입니다. 왜냐하면, 당연히 일반적인 programming에서 사용되는 integer(4 bytes) 형태로 표현하는 것은 비효율적이기 때문입니다. 또한, 컴퓨터 자체가 byte 단위로 데이터를 알아먹기 때문에, 컴퓨터 친화적으로 데이터를 변환한다고 생각하면 될 거 같습니다. 따라서, 데이터를 변환하여 결과물이 byte 단위로 묶이는 것이 일반적입니다. (+ 단순히 좀 더 효율적인 형태로 변환했다고 생각해도 됩니다. 그러기 위해서, 사람이 해당 문자를 보고, 한 번에 무슨 숫자인지 찾아내기는 좀 힘들어집니다.)

```c++
// c++을 안다면 도움이 되겠지만, c를 잘 모르신다면, 이해할려고 하지말고 넘어가셔도 됩니다.
int a = 255 // 4 bytes
char a = 255 // 1 byte
```

여기서, byte type을 다룰 때, 항상 발생하는 문제인 **호환성**을 확인해야 합니다. 사람은 일반적으로 수를 쓸 때, 왼쪽에서부터 큰수가 나오며, 오른쪽으로 쓰는 것이 표준처럼 정해져 있습니다. 하지만, computer 세계에서는 그렇지 않기 때문에, 왼쪽이 큰 수 인지, 오른쪽이 큰 수 인지를 정해줄 필요가 있습니다. 따라서, 이를 표준으로 정해서 어떤 데이터를 serialization 할 때 왼쪽이 큰 수가 되는 (Big endian)을 사용할지, 오른쪽이 큰 수가 되는 (Little endian)을 사용할지를 반드시 정해야 합니다.

### 2. Base58

이를 이해하기 위해서는 Base64를 먼저 이해해야 합니다.

이는 특정 데이터를 총 64개의 문자 (10(숫자) + 26(알파벳 소문자) + 26(알파벳 대문자) + 2(기호 +, /))로 이루어진 문자 체계로 변환하는 것을 말합니다. 우리가 하나의 byte(8 bits)로 256개의 데이터를 표현할 수 있지만, 다음과 같이 Base64로 변환하게 되면 6bit을 사용하기 때문에 결과적으로 데이터의 크기가 커지는 현상이 발생하게 됩니다.(결국에는 byte단위로 전송하는데, 그중에 6bit만 사용하기 때문입니다.) 그럼에도 이를 사용하는 이유는 **호환성**을 높이기 위해서 입니다. 국제적인 표준이기 때문에, Base64를 이용한다면, 어떤 시스템에서도 이를 해석하는 데는 문제가 없습니다. 따라서, 이러한 형태로의 변환은 굉장히 빈번히 사용됩니다.

그렇다면, Base58은 무엇인가에 대해서 고민을 해보아야 합니다. Base58이란, Base64에 **가독성**을 높이기 위한 version이라고 생각할 수 있습니다. 바로 사람이 읽었을 때, 헷갈릴 수 있겠다고 판단되는 데이터를 과감하게 제거해버리는 것입니다. 따라서, 기존의 Base64에서 0(숫자 0), O(대문자 o), l(소문자 L), I(대문자 i), +, /를 제거하여 표현하는 것입니다. 따라서, 결론상 58개의 문자 (9(숫자) + 25(소문자) + 24(대문자))로 표현하는 방식입니다. 또한, 부가적으로 **안정성**을 높이기 위해서, base58에서는 hash256을 이용해서 만들어진 데이터를 추가로 전송하여, checksum으로 사용하는 구현도 존재합니다. (checksum이란, 수신을 받은 측에서 데이터의 손실 여부를 확인할 때, 사용할 수 있는 데이터를 말합니다. 여기서는 자세히 다루지 않습니다.)

### 3. DER(Distinguished Encoding Rule)

serialization 기법 중에 하나입니다. 이름에서부터 느껴지다시피 serialization을 수행할 때, 정확한 구분자와 길이를 data 앞에 배치시켜서 변환을 쉽게 하기 위한 방법 중에 하나입니다. 여기서는, Bitcoin에서 사용하는 DER 방식만 다루기에 해당 방식이 어떻게 돌아가는지만 다루겠습니다.

BitCoin에서는 Signature(서명)을 전달할 때, 해당 방식을 사용하는데, 이는 이 전 chapter에서 살펴봤듯이 두개의 integer로 이루어집니다. 그렇기에 여러 개를 보낼 때, 이를 감싸 줄 수 있는 Sequence와 Integer 형을 보낼 때, 사용하는 구분자를 data 앞에 넣어주어야 합니다. (Sequence = 0x30, Integer = 0x02) 또한, data의 사이즈 역시 같이 붙여주어야 합니다. (단위가 byte라는 것을 유의합시다.)

따라서, 형태가 다음과 같습니다.

0x30 + {전체 전송 data의 사이즈} + 0x02 + {보낼 integer data의 사이즈} + {전송할 data(bytes)} + 0x02 + {보낼 integer data의 사이즈} + {전송할 data(bytes)}

예시로 다음을 들 수 있습니다. 만약에 1과 2라는 수를 동시에 보내고 싶을 때에는 다음과 같이 전달된다고 볼 수 있습니다.

0x30\0x06\0x02\0x01\0x01\0x02\0x01\0x02

아래 링크를 확인하면 더 자세한 방식들을 알 수 있습니다.

[🔗 ASN 형식의 DER 인코딩](https://docs.microsoft.com/ko-kr/windows/win32/seccertenroll/about-der-encoding-of-asn-1-types)

### 4. SEC(Standards for Efficient Cryptography)

serialization 기법 중에 하나이며, 특히 암호화 과정에서 사용되는 표준 정도로 볼 수 있습니다. 대게 ECC(Elliptic Curve Cryptography)의 암호화 시에 생성된 public key 등에 대한 표준화 내용을 포함합니다. Bitcoin에서는 Public key 전송 시에 SEC를 사용함으로 이에 대한 내용만을 다루겠습니다.

먼저, 여기서는 Public key를 두 가지 mode로 표현합니다.

첫 번째로, 압축(compression)을 사용하지 않은 표현법으로 이는 매우 단순합니다.

우선은, 0x04를 데이터 맨 앞에 붙이고, 순서대로 Public key의 X좌표, Y좌표를 붙여주면 됩니다.

0x04 + {public key's x (bytes)} + {public key's y (bytes)}

이는 항상 사이즈가 65(1 + 32 + 32)bytes로 고정된다는 점을 알 수 있을 것입니다. (그렇기 때문에, 위에서 설명한 DER 방식없이도 전송이 가능합니다.)

두 번째로, 압축(compression)을 사용하는 표현법입니다. 전송하는 두 개의 데이터 $x$,$y$가 Elliptic Curve 위에 존재한다는 연관점을 활용하는 것입니다. ($y^2 = x^3 + ax + b$)

$x$만 보내고, $y$를 알기 위해서는 두 가지 문제를 해결할 수 있어야 합니다.

1. 제곱근 연산($\sqrt{y^2}$)이 가능한가?
2. 제곱근으로 나온 결과값 중 어떤 것이 근인지 확신할 수 있는가?

일단 제곱근 연산은 다음과 같은 상황에서는 쉽게 구할 수 있습니다. ($p+1$이 4의 배수인 경우)

$$ p \% 4 = 3$$

$$(p + 1) \% 4 = 0$$

다행히도, Bitcoin가 사용하는 ECDSA에서는 이를 만족합니다. 그렇다면, 아래의 식을 만족하여 쉽게 제곱근을 구할 수 있습니다. (중간에 $(p+1)/2$ 이 가능한 이유는 Prime number는 2를 제외하고는 모두 홀수 이기 때문입니다.)

$$w^2 = v$$

$$w^{p-1} \% p = 1$$

$$w=w^{(p+1)/2}=w^{2(p+1)/4} = (w^2)^{(p+1)4} = v^{(p+1)/4} $$

또 하나의 제곱근을 구할 때에는 간단하게 다음을 수행합니다.

$$-w = p - w$$

다음으로, 제곱근으로 나온 값 중 특정하는 방법은 바로 홀수인지 짝수인지를 알려주는 1byte만을 전송해주면 됩니다. 왜냐하면, 위에 식에서 알 수 있듯이 $w$가 짝수이면, 또 다른 근인 $-w$는 홀수일 수 밖에 없기 때문입니다. ($p$ = 홀수)

따라서, 전송 시에는 다음과 같이 더욱 간소해집니다.

우선은, 0x02 또는 0x03 데이터를 맨 앞에 붙이고, 순서대로 Public key의 X좌표를 붙여주면 됩니다.

짝수 : 0x02 + {public key's x (bytes)}

홀수 : 0x03 + {public key's x (bytes)}

이는 항상 사이즈가 33(1 + 32)bytes로 고정된다는 점을 알 수 있을 것입니다.

아래 링크를 통해서 더 자세한 사항을 확인할 수 있습니다.

[🔗 Standards for Efficient Cryptography Group](https://www.secg.org/)

### 5. Hash160, Hash256

hash라는 것 역시 serialization part에서 빈번하게 등장할 수 밖에 없는 내용입니다. hash란 다음과 같은 특징을 가지는 함수를 말합니다.

1. one way function : 역연산이 불가능연산입니다.
2. return fixed length : 반환된 결과값이 항상 일정한 길이를 가집니다.
3. collision with very low probability : 반환된 결과값이 충돌될 가능성이 사실상 없다. 즉, 완벽한 1:1 대칭은 아니지만, 이에 매우 근사한다는 것입니다.

hash의 전반적인 설명은 여기서 다루지 않기 때문에, 이정도만 기억해두시면 됩니다. 역연산이 불가능하기 때문에, 대게 데이터를 알 수 없는 형태로 저장하고자 하는 경우에 많이 사용합니다. 대표적인 예시로 MD-5, SHA-1, SHA-2(SHA-256, SHA-512, ...)가 있습니다.

hash는 대게의 경우 매우 제대로 잘 동작하지만, collision에 의해서 망가지는 경우가 있습니다. 따라서, 이를 보안하기 위해서 계속해서 새로운 방법들이 고안 되었습니다.

따라서, Bitcoin에서는 SHA256 이후에 이를 다시 한 번 ripemd160을 수행하는 것을 Hash160이라고 하고, SHA256을 연달아서 두 번 수행하는 것은 Hash256이라고 합니다. 이름에서 알 수 있다시피, Hash160은 결과값이 160bits(20bytes), SHA256은 256bits(32bytes)입니다.

### 6. Varint

Variable + int의 합성어로 variable length로 integer data를 serialization하는 방법을 제시합니다. 최대 수의 범위는 $2^{64} - 1$까지 표현할 수 있기 때문에 매우 유용하며, 불필요한 데이터의 전송을 최소화할 수 있습니다. 내용 자체는 매우 간단합니다.

1. 해당 수가 253보다 작다면 1 byte만 이용해서 바로 표현합니다.
2. 그렇지 않고, 해당 수가 2^16 - 1 보다 작다면, 253(0xfd)를 prefix로 맨 앞에 붙이고, 2 byte를 이용해서 표현합니다.
3. 그렇지 않고, 해당 수가 2^32 - 1 보다 작다면, 254(0xfe)를 prefix로 맨 앞에 붙이고, 4 byte를 이용해서 표현합니다.
4. 그렇지 않고, 해당 수가 2^64 - 1 보다 작다면, 255(0xff)를 prefix로 맨 앞에 붙이고, 8 byte를 이용해서 표현합니다.

즉, 0으로 앞에 남는 byte를 보내는 양을 효과적으로 줄일 수 있기 때문에, 변수 상태의 integer를 전송할 때 많이 사용됩니다.

---

여기서 Bitcoin에서 Serialization를 수행하는 경우를 구체적으로 살펴보겠습니다.

### 1. Public Key

기본적으로 Public key는 모두에게 공개되어야 하는 정보 중에 하나입니다. 따라서, 이를 효율적으로 분배하는 문제 역시 중요하다고 할 수 있습니다. Bitcoin에서는 앞 서 살펴보았던, SEC, Base58를 이용하며, 필요에 따라서 hash160을 이용해서 내용을 감추기도 합니다.

일반적으로, SEC와 Base58을 이용하여, 데이터를 전송하는 이유는 후에 Public Key 역시 사람들에게 쉽게 노출이 되는데, 이를 쉽게 사람들이 알아볼 수 있게 하기 위함이며, hash160을 사용하는 이유는 Public Key를 감추기 위해서 입니다. 이 말이 이상하게 들릴 수 있는데, Public key가 Open 되고 바로 사용된다면, 문제가 되지 않지만, Public Key가 공개되고 오랜 시간이 지난다면, 문제가 발생할 가능성이 생기기 때문입니다. (너무나 오랫동안 노출된다면, private key가 결국은 해독될 수도 있습니다.) 이는 바로 다음 chapter에서 더 알아볼 수 있습니다.

### 2. Signature

Signature 방식 같은 경우는 표준처럼 넓게 사용되는 DER을 사용합니다.

### 3. Private Key

Private key를 전송한다는 것은 굉장한 위험을 초래할 수 있습니다. 하지만, 그럼에도 불구하고, 이를 전송해야할 경우가 있습니다. usb에 저장하고 싶다거나 별도의 software로 옮기고 싶은 경우도 존재합니다. 따라서, 이를 위한 Serialization Format도 존재합니다. 우리는 이를 WIF(Wallet Import Format)이라고 부릅니다.

이는 이름에서부터 느껴지듯이 Bitcoin에서 파생된 standard라고 볼 수 있습니다. 또한, 이는 Base58로 encoding된다는 점 정도만 기억하면 충분합니다.

또한, 위에서는 다루지 않았지만, Bitcoin network는 개발용(testnet)과 실제 서비스용(mainnet)을 가지고 있기 때문에, 이를 구분하는 구분자를 각 serialization 앞에 표시하는 것을 원칙으로 합니다.

- mainnet = 0x80
- testnet = 0xef

### 4. Number of data

bitcoin 상에서도 여러 개의 데이터를 전송해야 하는 경우가 많습니다. 그런데, 만약 해당 데이터의 갯수가 정해져있는 것이 아니라 때에 따라서 변경되는 경우에는 위에서 제시한 Varint를 사용할 수 밖에 없습니다. 이는 바로 다음 Chapter에서 알아볼 Transaction 내부에서 많이 사용되는 것을 알 수 있습니다.

이전 글과 동일하게 구현 사항은 github에 정의해두었습니다.

[🔗 GitHub - euidong/bitcoin](https://github.com/euidong/bitcoin)

## Reference

- [🔗 Programming Bitcoin](https://learning.oreilly.com/library/view/programming-bitcoin/9781492031482/)
- Tumbnail : Photo by [Icons8 Team](https://unsplash.com/@icons8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/@icons8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
