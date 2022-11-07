---
slug: "nlp-pos-tagging"
title: "[NLP] 8.POS tagging"
date: "2022-11-07 11:18"
category: "AI"
tags: ["NLP"]
thumbnailSrc: "/images/nlp-thumbnail.jpg"
---

## Intro

우리가 사용하는 언어의 품사를 정의하는 것은 문법을 정의하거나 뜻을 정의할 때, 기반이 된다. 이는 statistical inference에도 중요한 정보가 된다. 따라서, 일반적으로 많이 사용되는 단어의 품사를 정의하는 방법론이 POS tagging에 대한 설명을 다룰 것이다.

## POS tagging

Part of Speech라는 단어의 뜻 자체가 품사라는 뜻이다. 이는 단어의 문법적인 기능이나 형태 등을 표현하기 위해서 제시되었다. 이를 구분하려는 시도는 디오니소스 이전부터 있었지만 근본적인 형태를 제시한 것은 디오니소스가 첫 번째이다. 그는 기원전 100년에 지금과 굉장히 유사한 형태의 8개의 품사를 제시하였다. 지금도 8개지만, 감탄사와 형용사 등이 추가되고 몇몇 요소가 빠졌다. 이를 NLP 과정에서 input으로 활용하게 되면 언어의 모호성을 해결하는데 도움을 줄 수 있다. 품사를 통해서 단어가 가지는 뜻의 범위가 더 줄어들 수 있기 때문이다. 따라서, 이를 각 단어마다 표시하는 절차를 preprocessing으로 진행하는 경우도 많다.

우선 POS의 일반적인 종류는 다음과 같다.

- Noun(명사)
- Verb(동사)
- Adjective(형용사)
- Adverb(부사)
- Preposition(전치사)
- Conjunction(접속사)
- Pronoun(대명사)
- Interjection(감탄사)

하지만, Computer Science에서는 이를 좀 더 명확하게 표현하기 위해서 더 많은 분류(tag)를 사용하는 것이 일반적이다. 대표적인 예시가 [🔗 Penn Treebank](https://www.ling.upenn.edu/courses/Fall_2003/ling001/penn_treebank_pos.html)이다. 여기서는 36개의 종류를 활용하여 표기한다. 이외에도 Brown Corpus 등 다양한 tagging 방법이 있다. 또한, 언어에 따라서는 별도의 품사를 정의하는 경우도 많기 때문에 언어마다 적절한 방식을 사용해주는 것이 좋다.

tag를 정할 때 일반적인 규칙은 우리가 중/고등학교 시간에 배웠을 문법 요소를 적용한 것이 많다는 점을 기억하면 된다. NNS 같은 경우는 복수명사 뒤에 붙은 s를 포함하는 tag를 의미하고, VBD는 동사 과거형을 의미한다. 이와 같은 형태로 품사를 좀 더 세분화한 것 외에는 차이가 없다.

## How can I get?

그렇다면, 어떻게 하면 POS tagging된 데이터를 얻을 수 있을지가 궁금할 것이다. 신기하게도 가장 쉬운 추론을 하더라도 90%의 정확도를 가질 수 있다. 다음과 같은 방법이다.

1. 단어가 가지는 품사 중 가장 빈도가 높은 것을 표기한다.
2. 못 본 단어인 경우 Noun(명사)로 표기한다.

이것이 가능한 이유는 사실상 대부분의 word는 모호하지 않다는 점이다. 대부분의 word는 품사 앞에서는 그렇게 변화무쌍하지 않다. **하지만,** 특정 word는 사람 조차도 헷갈리는 경우가 있다. 대게 통계적으로 11%정도는 사람 조차도 헷갈릴 수 있는 형태의 품사가 주어진다고 한다. 그래서, 이를 해결하기 위해서 Statistic Inference를 활용하는 경우가 있고, 우리가 앞 서 배웠던 HMM을 활용하면 97%, MaxEnt를 활용하면 99% 정확도를 가지는 tagger를 만들 수 있다. 물론 더 복잡한 Deep Learning을 활용한다면 더 높은 성능도 가능은 할 것이다.

## Morphological Tagging

사실 POS tagging만으로 끝나지는 않는다. 결국 우리가 원하는 것은 단어의 의미를 더 완벽하게 찾는 것이다. 따라서, 대게의 경우 POS tagging을 포함하는 Morphological tagging을 수행한다. 특정 단어를 사전형 기본형(lemma) 또는 더 나아가 가장 뿌리가 되는 요소 root와 stem으로 나누고 여기에 품사를 덧붙이는 형태이다. 우리가 얻은 품사(tag)와 lemma만 갖고도 우리는 원래 단어를 만드는 것이 가능하고, 뜻의 범위를 더 한정할 수 있다. 더 나아가 root와 stem으로 나누게 되면 보지 못한 데이터에 대해서도 더 면밀한 의미 파악이 가능해진다. 이를 구현할 때에는 대게 4가지 방법 중에 하나를 수행하는 것이 일반적이다.

1. Word form list  
   간단하게 생각하면, word list에서 단어를 조회하는 방식이다. 대게 key, value보다는 Trie 형태로 담는 것을 선호한다. Trie는 각 node가 sequence 데이터의 요소 하나하나가 되는 tree를 의미하며, sequence 데이터의 조회를 위해 사용된다.
2. Direct coding  
   root와 stem을 찾는 과정은 사실 영어에서는 간단하다. 앞 뒤에서 부터 진행하면서 대표적인 stem을 제거해 나가면, root만 남기 때문이다. 하지만, 일부 일본어와 같은 경우에는 이것이 불가능한 경우도 있다. 이 경우에는 다른 방식을 적용해야 한다.
3. Finite state machinery  
   각 단어의 형태를 FSM으로 정의하여 변할 수 있는 형태와 이에 따른 품사 등을 미리 표현하여 정의하는 방법이다.
4. CFG, DATR, Unification  
   언어학에 기반한 분석법이다.

사실 이러한 방법을 직접 구현하는 것은 한계가 있을 수 있다. 따라서, 이미 구현되어 있는 POS tagger를 사용하는 것이 현명할 수 있다. 일반적으로 가장 많이 사용되는 POS tagger는 다음과 같은 것들이 있다.

| Library | Language | ProgrammingLanguage |
| :------ | :------- | :------------------ |
| NLTK    | English  | Python              |
| spaCy   | English  | Python              |
| KoNLPy  | 한글     | Python              |

## Reference

- Tumbnail : Photo by [David Ballew](https://unsplash.com/@daveballew?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/@daveballew?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- Penn Treebank POS tagging, <https://www.ling.upenn.edu/courses/Fall_2003/ling001/penn_treebank_pos.html>
- spaCy, <https://spacy.io/>
- NLTK, <https://www.nltk.org/>
- KoNLPy, <https://konlpy.org/ko/latest/index.html>
