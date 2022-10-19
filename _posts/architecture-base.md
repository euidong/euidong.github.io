---
slug: "architecture-base"
date: "2022-04-12 09:00"
title: "1. Base"
tags: ["Computer Organization And Design", "ISA"]
category: "Computer Architecture"
thumbnailSrc: "/images/default.jpg"
---

## Intro

Computer Organization and Design이라는 책을 정리하고 되돌아볼 것이다. 여기서는 가장 기본이 되는 Idea들을 정리할 것이다.

## 1\. 8 Greate Ideas

컴퓨터 구조를 설계하는 과정에서 중요하게 여겨지는 8가지 핵심 아이디어들이다. 뿐만 아니라 이는 전체적인 컴퓨터 과학에서 중요하다고 볼 수 있는 아이디어들이다. 따라서, 앞으로의 Posting에서 Why라는 의문이 든다면, 아래 8가지 이유 중의 하나로 설명할 수 있다.

1. **Moore's Law**  
    18 ~ 24 개월마다 컴퓨터 성능의 지대한 영향을 미치는 IC 칩의 성능이 2배씩 성장한다는 Moore의 주장에서 유래하였다. 즉, **컴퓨터의 성능은 지수적으로 빠르게 성장을 하고 있음을 의미한다.** 이로 인해 구조를 설계하는 과정에서도 현재의 IC 칩의 성능에 맞추는 것이 아닌 이보다 더 큰 성능을 타겟으로 설정을 한다.
2. **Abstraction**  
    우리 말로 추상화라고 표현하며, 복잡한 하위 내용을 모두 기술하지 않고, 간단하게 표현하여 이를 쉽게 사용할 수 있도록 하는 방식이다. 이를 통해서, **설계 과정에서의 복잡도를 줄일 수 있다.**
3. **Common Case Fast**  
    **드물게 일어나는 case보다는 일반적인 case를 빠르게 만듬으로써 성능을 향상시킬 수 있다.** 드물게 일어나는 case는 매우 복잡하고, 해결하기도 난해할 수 있다. 하지만, 대게의 경우 일반적인 case는 간단하다. 이를 최적화하는 것이 전체적인 시스템 성능 향상에 큰 도움이 되는 것은 당연하며 해결도 매우 쉽다.
4. **Performance via Parallelism**  
    성능 향상을 위한 방법은 크게 두 가지이다. 하나는 하나의 장치의 성능을 올리는 것이고 또 하나가 바로 **하나의 작업을 여러 명이 동시에 수행하는 방식이다.**
5. **Performance via Pipelining**  
    성능 향상을 위한 병렬처리 방식 중에서 가장 유명한 방식이 pipelining이다. 쉽게 생각하면, 분업이라고 할 수 있다. **여러 명이서 하나의 목적을 위해 일을 할 때, 효율적으로 작업하기 위해서 업무를 분담하여 동시에 작업**하는 방식이다.
6. **Performance via Prediction**  
    우리는 무슨 작업을 할 때, 아직 결정되지 않은 사항 때문에 기다리는 경우가 있는데, 이것이 어떻게 될지를 **예측하여 기다리지 않고, 미리 진행하자**는 발상에서 나온 것이다. 만약, 이 예측의 적중률이 높다면, 성능 향상에 굉장한 도움을 줄 수 있다.
7. **Hierarchy of Memories**  
    컴퓨터의 사용자가 원하는 메모리는 빠르고, 크고, 싸야 한다. 하지만, 빠르기 위해서는 비싸야하고, 크기 위해서도 비싸야 한다. 그래서 생각해낸 방법이 계층화이다. **빠르고, 작은 memory를 위로 쌓고, 느리고, 큰 memory를 아래로 쌓음으로써 비용을 절감**하자는 것이다.
8. **Dependability via Redundancy**  
    컴퓨터는 빠르기만 해서 되는 것은 아니다. **신뢰**할 수 있는 시스템을 구축해야 한다. 실패하지 않는 시스템을 구축하는 것은 매우 힘든 일이기 때문에, 우리는 **여분 장치**를 두어 이를 통해서 실패 시에 이를 떠맡을 수 있도록 하는 설계를 해야 한다.

## 2\. Below Your Program

program 밑에는 무엇이 있는가?

우리의 program은 모두 application software이고, 이는 hardware 바로 위에 존재하는 것이 아닌 system software위에서 동작하게 된다.

![kernel](/images/kernel.png)

**System Software**는 Hardware를 직접적으로 제어하거나 computer가 작동하기 위해 필수적이며 기본적인 softwre를 말한다. 그 중에서 가장 대표적인 것이 OS이고 **OS**는 사실상 우리가 보는 Software와 Hardware 간의 interface역할을 한다. 예를 들어, memory 관리, process 관리 등(이는 OS 에서 자세히 배웁시다.)을 수행한다. 반면, **Application** **Software**는 직접적으로 hardware를 관리하거나 필수적인 요소는 아니지만 computer를 통해서 가치있는 작업을 수행하도록 한다. 대표적인 예시가 웹브라우저, word, game 등이 여기에 포함된다.

  그렇다면, 우리가 만든 코드(Application Software)가 어떻게 실행되어질 수 있을까? 이 또한, System Software인 compiler, assembler, linker, loader의 도움을 통해서 실행되어진다. **compiler**는 우리가 고 수준의 언어(C++, Java, 등)로 만든 software code를 Assembly 언어로 변경한다. 그러면, 이를 **Assembler**가 0과 1로 이루어진 기계어로 번역해준다. 해당 작업이 끝나면, **Linker**가 나타나 여러 개로 나뉘어져있던 이 파일과 기존 라이브러리를 하나의 파일로 묶어주는 역할을 한다. 이 작업을 마치고 만들어진 최종 파일을 실행하고자할 때, **Loader**는 이를 memory에 올리는 역할을 한다. 이렇게 실행된 program은 여기서 그치지 않고, memory의 아예 다른 영역에 위치하는 library도 불러와서 사용하는 것이 가능하다. 이것을 **Dynamic Linked Library**(DLL)라고 한다.

![run-process](/images/run-process.png)

이렇게 하나의 코드를 작성하면, 실제로 실행되기까지 여러 작업들을 거쳐야만 한다. 그럼에도 assembly 언어나 기계어를 사용하여 코딩을 하지 않는 이유는 아래 세 가지 이유가 주요하다.

1. 사람이 이해하기 쉽다.
2. 생산성을 높일 수 있다.
3. Compiler와 assembly를 통해서 어디서든 돌아가는 프로그램을 제작할 수 있다.

## 3\. Under the Covers

우리의 컴퓨터는 어떻게 이루어지는가를 크고 얇게 한 번 알아볼 것이다.

- **Input Device** : 우리의 입력을 받는 부분이다. 마우스, 키보드, 터치스크린 등이 있다.
- **Output Device** : 우리가 출력을 받는 부분이다. 모니터, 프린터 등이 있다.
- **IC(Integrated Circuits, Chip)** : 집적 회로로 번역되어지며, 통상 우리가 chip이라고 부르는 녀석들이다. 이들은 적게는 수십개 많게는 억 단위 이상에 이르는 양의 transister를 가지고 있고, 이를 통해서 데이터를 저장하거나 처리하는 역할을 할 수 있다. 즉, IC를 통해서 CPU, Memory를 만들 수 있다.
  - trasistor: 쉽게 말해서 전기를 통해서 on/off를 수행할 수 있는 switch라고 볼 수 있다. 이를 통해서, 데이터를 연산하거나 저장하는 것이 가능하다.
- **CPU (Central Processor Unit, Processor, MicroProcessor)** : 중앙 처리 장치라는 의미로, 각종 연산과 I/O Device 처리 등의 중심 역학을 수행한다. CPU는 크게 두 개의 요소로 이루어진다.
  - DataPath : 수학적인 연산을 수행한다.
  - Control : program의 instruction이 무엇을 요구하는지를 입출력 장치, memory 또는 datapath에 전달합니다.
- **Memory(RAM(Random Access Memory), main memory, primary memory)** : 실행되고 있는 프로그램이 위치하는 곳이다. 실행되는 프로그램에 대한 정보와 같은 내용을 포함한다고 할 수 있다. 이는 DRAM으로 이루어진다. 또한, Random Access Memory라고 불리는 이유는 어느 위치에 데이터를 저장하고 있어도 해당 데이터를 찾는데 걸리는 시간이 동일하기 때문이다.
  - DRAM(Dynamic Random Access Memory) : IC chip을 통해서 만들어진다. 여기서 Random Access란 접근할 때, 앞에서부터 차례로 접근하는 것이 아닌 한 번에 바로 짚을 수 있음을 의미한다.
- **Cache Memory** : 대게 Cache라고도 부르며, Processor 내부에 존재하는 memory라고 볼 수 있다. 즉, 실제 Memory의 buffer 기능을 한다. 여기서는 SRAM을 사용한다.

- SRAM(Static Random Aceess Memory) : DRAM보다는 빠르지만, 집적도가 낮고 더 비싸기 때문에 많이 사용할 수는 없는 chip이다. 하지만, 성능 향상을 위해서 processor 바로 앞에 buffer로써 사용한다.
- buffer : 자료구조의 queue를 이용한 것으로, 처리를 요청한 대상과 처리를 수행하는 대상 사이에서 데이터를 잠깐 보관하기 위한 장소로 사용된다.

- **Secondary Memory** : main memory는 휘발성이라는 특징을 갖고 있기 때문에 시스템이 종료되어 전기가 더 이상 공급되지 않으면, 모든 데이터는 날라간다. 이를 막기 위해서 그리고 부족한 main memory의 저장공간을 보조하기 위해서 보조 기억 장치를 사용한다. 이것에 사용되는 것은 크게 두 가지 이다.
  - magnatic disk : 자기 disk를 이용해서 정보를 저장하는 방식이다. 전기가 공급되지 않음에도 정보를 저장하고 있을 수 있다.
  - flash memory : 반도체를 이용하여 데이터를 저장하며, DRAM보다는 느리지만, 더 싸고 휘발성이 없다.
- **Instruction Set Architecture(ISA, architecture)** : 0과 1로 이루어진 기계어가 들어왔을 때, 이것이 무슨 의미인지를 나타내는 instruction Set에 따라 CPU가 알맞은 연산을 수행하는 architecture이다.
  - Instruction Set : hardware에게 동작을 요청하는 하나의 명령어를 Instruction이라고 한다. 이들이 무슨 역할을 하는지를 정리해놓은 것이 Instruction Set이다. 이를 통해서, Operating System은 hardware에 접근하여 특정 동작을 수행시킬 수 있다.
  - ABI(Application Binary Interface) : application 단에 programmer가 hardware 작업 등을 수행하기 위하여 호출할 수 있다. 이를 통해서, binary한 동작도 application programmer가 조작할 수 있다. 일반적인 API와 역할이 동일하지만, programming language가 아닌 machine language를 사용하여 구현되기 때문에 hardware 접근 등에 제한이 없다.

## 4\. Performance

우리가 Computer의 성능을 측정하는 것은 중요하다. 왜냐하면, 이를 지표로 계속해서 computer의 성능을 향상시켜야 하기 때문이다.

그래서 우리는 다음과 같이 표현하는 것이 일반적이다.

$$\text{Excution Time} = \text{Clock Cycle Time} \times {\text{Number of Instruction}} \times {CPI}$$

즉, **총 실행 시간**(Execution Time)은 **한 번 Clock이 회전하는데 걸리는 시간**(Clock Cycle Time)에 해당 **program의 instruction 수**(Number of Instruction) 그리고 **하나의 instruction을 처리하는데 걸리는 clock cycle의 횟수**(CPI)라고 볼 수 있다.

즉, 우리가 특정 프로그램을 빠르게 돌리고 싶다면, 다음과 같은 식으로 생각할 수 있다.

1. 한 번 회전하는데 걸리는 시간을 줄이기 위해 클락 frequency를 높인다. **하지만, 회전열로 인해 현재는 frequency를 올리는 것은 포기하고 있다.**
2. 프로그램을 잘 짜거나 Compiler를 더욱 더 최적화하여 instruction의 수를 줄인다.
3. 하드웨어를 잘 설계해서 명령 하나를 처리하는데 걸리는 시간(CPI)을 줄인다.
4. 동시에 여러 CPU를 실행시켜서, 실행을 하는 unit 자체를 더 만드는 방법도 있다.

따라서, 앞으로 우리가 Performance를 올리기 위해서, Compiler를 어떻게 최적화할지를 개략적으로 배우며, 하드웨어를 어떻게 잘 설계할지를 자세히 알아볼 것이다. 또한, Parallelism을 통해서 작업을 더 빠르게 수행하는 방법 또한 다룰 것이다.

---

## \+ Amdahl's Law

작업의 성능을 개선시켰을 때 이전과 비교하여 얼마나 효율이 증가했는지를 보여주는 지표이다.

$$1\over{(1-P) + {P\over{S}}}$$

여기서 개선된 작업이 전체에서 차지하는 비율을 P라고 하고, 해당 작업의 향상된 작업 효율을 S라고 한다.

만약, 전체에 10%를 차지하는 작업을 2배 빠르게 진행한다면,

$${1\over{(1-0.1) + {0.1\over{2}}}} = {1\over{0.95}} \approx 1.05$$

따라서, 단기간의 성능향상을 하고 싶다면, 비율이 큰 작업의 성능향상을 꾀하는 것이 좋다는 것을 알 수 있다.

## Reference

- David A. Patterson, John L. Hennessy, Computer Organization and Design
