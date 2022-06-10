---
slug: "vagrant"
title: "Vagrant"
date: "2022-06-01 12:39"
category: "Tech"
tags: ["Vagrant", "VirtualEnvironment", "VirtualBox"]
thumbnailSrc: "/images/vagrant.png"
---

## Intro

**Vagrant**(베이그런트)는 Virtual Machine의 실행환경을 하나의 workflow 내에 구축하고 관리하는 도구이다. 쉬운 workflow 사용법과 자동화에 초점을 맞추어 **Vagrant**는 setup time이 굉장히 짧다. 또한, production과정과의 동등함을 제공하고, 과거의 시스템을 "나의 machine 내부에서" 동작시키는 것이 가능하다.

## Why Vagrant?

**Vagrant**는 `configuration`이 쉽고, 동일한 조건으로 재실행을 보장(reproducible)하며, 어느 장비에서든지 동작가능(호환성이 높은, portable)한 작업 환경을 제공한다. 이러한 작업 환경은 산업 표준 기술에 기반하며, 하나의 일관성있는 workflow에 의해서 제어되어 생산성과 유연성을 최대화한다.

이러한 마법같은 일을 성취하기 위해서, **Vagrant**는 `VirtualBox`, `VMware`, `AWS`, 또는 다른 `Virtual Machine` 제공자에 기반 위에서 동작하며, 이들을 활용하여 가상 환경을 구축할 수 있다.

### For Developers

만약 당신이 개발자라면, **Vagrant**는 의존성과 그들의 설정을 격리시킬 수 있다. 이때에 일회용으로 사용하든, 지속적인 환경으로 사용하든 상관없이 그 어떤 tool들(browser, editor, debugger 등)도 빠짐없이 포함시킬 수 있다. 일단 하나의 `Vagrantfile`을 생성하면, 단지 `vagrant up`만 실행시켜주면 모든 것이 설치되고 설정될 것이다. 이는 개발팀의 누구에게든지 공유될 수 있고, 어느 환경(Linux, MAC OS X, Window)에 있든 모든 팀 구성원은 동일한 환경(동일한 의존성, 동일한 설정)에서 code를 실행시킬 수 있다. 이를 통해서 `내 머신에서는 잘 동작하는데...`와 같은 에러를 해결할 수 있다.

### For Operators

만약 당신이 System operation/DevOps engineer라면, **Vagrant**는 개발 또는 테스팅을 위한 infrastructure(기반 환경)을 관리하기 위한 일회용 또는 일관적인 workflow를 제공한다. 이때에는 `sh`, `Chef`, `Puppet` 과 같은 방법을 통해 제어할 수 있으며, 실행 환경은 `VirtualBox`, `VMware`, `AWS` 등 다양한 환경을 활용할 수 있다. 여러 machine을 `ssh`를 통해서 접속하지 않고, **Vagrant**를 통해서 모든 것을 쉽게 제어할 수 있다.

### For Designers

만약 디자이너 직군이라면, **Vagrant**는 자동적으로 web app을 구동시킬 수 있는 모든 환경을 자동적으로 제공할 수 있다. 따라서, design 작업 외에는 더 알아야 할 것이 없다. 일단 개발자가 **Vagrant**를 설정하고 나면, 당신은 이를 다시 실행시키는 방법에 대해서 고민할 필요가 없다. 더 이상 개발자들을 괴롭히지 않고도 당신의 환경을 쉽게 변경할 수 있으며, version control만 쉽게할 수 있다면, 단순히 `vagrant up`으로 쉽게 적용이 가능하다.

## What is Vagrant?

해당 tutorial에서는 **Vagrant**를 통해 너의 첫번째 개발 환경을 생성할 것이다. 이를 통해서, **Vagrant**의 간략한 소개와 사전 준비사항과 가장 기본적이고 중요한 **Vagrant** 활용을 배울 것이다.

해당 tutorial에서는 `VirtualBox`를 활용하여 **Vagrant**환경을 구성해볼 것이다. 왜냐하면 이것이 여러 platform에서 사용되는 무료 software이기 때문이다.

### 사전 준비사항

1. **Vagrant** 설치  
  [🔗 link](https://www.vagrantup.com/docs/installation)
2. `VirtualBox` 설치  
  [🔗 link](https://www.virtualbox.org/wiki/Downloads)

단 두 개의 명령어로 원하는 환경의 VM(Virtual Machine)을 생성할 수 있고, 하나의 명령어로 삭제가 가능하다. 여기서는 Ubuntu 18.04 이미지를 이용할 것이다.

### 실행 테스트

> **1. Vagrant 초기화**

```bash
$ vagrant init hashicorp/bionic64
A `Vagrantfile` has been placed in this directory. You are now
ready to `vagrant up` your first virtual environment! Please read
the comments in the Vagrantfile as well as documentation on
`vagrantup.com` for more information on using Vagrant.
```

이를 통해서, 현재 directory에 `Vagrantfile`을 생성하는 것이 가능하다.

> **2. (Optional) Box 설정**

Virtual Machine을 구성할 때, scratch(밑바탕, 대게 OS만 포함한 상태)에서 시작하는 것은 매우 느리다. 따라서, **Vagrant**에서는 setup time을 최적화하기 위해서, `box`라는 것을 이용한다. 이는 기존의 VM 구성 시에 사용하는 image와 비슷한 의미를 가진다. 따라서, `Vagrantfile`을 생성한 후에 해야할 가장 첫번째로 수행할 것이 해당 `box`를 구체화하고 기술하는 것이다.

`box`는 [Vagarnt Cloud](https://app.vagrantup.com/boxes/search)와 같은 registry에 upload가 가능하다. 또는 local filesystem에서도 참조가 가능하다.

우리가 이전에 했던 것처럼 `vagrant init`을 수행할 때, `box` 명을 써주면, `Vagrantfile`을 만들 때 현재 나의 machine에 해당 `box`가 존재한다면 불러오고, 그렇지 않으면 download한다. 그렇지 않고 download만 하고 싶은 경우에는 다음과 같은 명령어를 수행할 수도 있다.

```bash
$ vagrant box add hashicorp/bionic64
==> box: Loading metadata for box 'hashicorp/bionic64'
...
```

이를 수행한 후에 `Vagrantfile` 내부에서 VM의 box를 변경할 수 있다.

```Vagrantfile
# "2"는 Vagrant version을 의미
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
end
```

이렇게 설정하게 되면, 해당 `box`의 latest 버전을 기본으로 사용하게 되는데, 특정 버전을 원한다면 다음과 같이 작성할 수도 있다.

```Vagrantfile
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
  config.vm.box_version = "1.0.282"
end
```

현재 내 machine에서 `box`를 조회하거나 삭제하기를 원한다면, 다음과 같이 수행할 수 있다.

```bash
$ vagrant box list
hashicorp/bionic64 (virtualbox, 1.0.282)

$ vagrant box remove hashicorp/bionic64
Removing box 'hashicorp/bionict64' (v1.0.282) with provider 'virtualbox' ...
```

> **3. VM 실행**

기본적으로 현재 directory에서 `Vagrantfile`을 찾아서 Virtual Environment를 구성한다.

```bash
$ vagrant up
Bringing machine 'default' up with 'virtualbox' provider...
...
```

실행이 완료되면, 다음과 같이 ssh 접근 및 종료가 가능하다.

```bash
$ vagrant ssh
Welcome to Ubuntu 18.04.3 LTS (GNU/Linux 4.15.0-58-generic x86_64)

vagrant@vagrant:~$ logout
Connection to 127.0.0.1 closed.
```

> **4. VM 삭제**

```bash
$ vagrant destroy
    default: Are you sure you want to destroy the 'default' VM? [y/N] y
==> default: Forcing shutdown of VM...
==> default: Destroying VM and associated drives...
```

### 반드시 알아야할 사항

> **1. Synchronize Local and Guest Files**

VM을 이용하여 개발하는 것은 편리하지만, 대부분의 사람들은 ssh를 이용해서 해당 시스템에 접속하여 작성하는 것은 불편하다고 느낄 것이다. 프로젝트가 두 개만 되어도 상당히 귀찮은 작업이다. 따라서, **Vagrant**는 자동으로 VM과 현재 나의 machine(host)의 file을 자동으로 sync한다.(동일한 file이 되도록 한다.) 즉, 내가 host에서 file을 작성함으로써 VM에 이를 적용하는 것도 가능하다는 것이다. 기본적으로 **Vagrant**는 VM에 Vagrantfile을 포함한 project directory를 `/vagrant` directory와 동기화한다.

> **2. VM으로 project 배포**

아주 간단한 예제로 apcache를 이용하여 project 배포를 수행해보자.

먼저, `Vagrantfile`이 존재하는 directory에 `html`이라는 폴더를 만든다.

```bash
$ mkdir html
...
```

아주 기본적인 HTML을 작성하자.(index.html)

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Hello, My First Vagrant Deploy!</h1>
  </body>
</html>
```

이제 실제로 apache를 설치하고, 지금 만든 파일을 apache process가 바라보는 folder로 전달해주는 shell script를 작성하자.(`bootstrap.sh`이라는 이름으로 project directory에 작성)

```shell
#!/usr/bin/env bash

apt-get update
apt-get install -y apache2

if ! [ -L /var/www ]; then
  rm -rf /var/www
  ln -fs /vagrant /var/www
fi
```

이제 이를 **Vagrant**에서 실행 시에 시작하도록 설정만해주면 끝이다.

```Vagrantfile
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
  config.vm.provision :shell, path: "bootstrap.sh"
end
```

이제 다음을 통해서 실제로 html이 배포되었는지를 확인할 수 있다.

```bash
$ vagrant up

$ vagrant ssh

vagrant@vagrant:~$ wget -qO- 127.0.0.1
<!DOCTYPE html>
<html>
  <body>
    <h1>Hello, My First Vagrant Deploy!</h1>
  </body>
</html>

vagrant@vagrant:~$ logout
Connection to 127.0.0.1 closed.
```

> **3. Port Forwarding**

가장 기본적으로 많이 사용되는 Network 기술로 VM의 port를 host의 port와 mapping하여 host의 port를 통해 VM의 port에 접근할 수 있도록 하는 기술이다.

2번에서 작성했던 `Vagrantfile`을 다음과 같이 변경해주면 된다.

```Vagrantfile
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
  config.vm.provision :shell, path: "bootstrap.sh"
  config.vm.network :forwarded_port, guest: 80, host: 4567
end
```

이를 적용하여 **Vagrant**를 재실행하기 위해서는 다음을 실행해주면 된다.

```bash
$ vagrant reload
==> default: Attempting graceful shutdown of VM...
...
```

browser를 통해 확인하면 아래와 같은 결과를 얻을 수 있다.

![vagrant-forwarding-test](/images/vagrant-forwarding-test.png)

> **4. WebApp 공유**

`ngrok`를 이용해서 WebApp을 공유하는 기능을 **Vagrant**가 포함하고 있다. 이를 `vagrant share`라고 부른다. 실행을 원한다면, 기본적으로 `ngrok`을 [🔗 설치](https://ngrok.com/download)한 후에 다음 command들을 실행시키면 webpage를 남들에게 share하는 것이 가능하다.

```bash
# vagrant share를 수행하기 위한 plug인을 설치한다.
$ vagrant plugin install vagrant-share

# (MAC OS) development tools가 없다는 에러 발생시 아래 명령어 실행
# xcode-select --install

$ vagrant share
...
==> default: Creating Vagrant Share session...
==> default: HTTP URL: http://b1fb1f3f.ngrok.io
...
```

`ngrok`은 무료로 server domain을 생성하고, web service를 hosting 해주는 tool이다. 사용법도 굉장히 간단해서 알아두면 좋다.

> **5. 여러 Machine 배포**

다음과 같이 `vm.define`을 통해서 여러 개의 machine을 한 번에 정의하는 것도 가능하다. 따라서, **Vagrant**가 VM을 configuration하는 것이 아니라 Virtual Environment를 configuration하는 것이라고 부르는 것이다.

```Vagrantfile
Vagrant.configure("2") do |config|
  config.vm.provision "shell", inline: "echo A"

  config.vm.define "web" do |web|
    test.vm.provision :shell, inline: "echo B"
    web.vm.box = "apache"
  end

  config.vm.define "db" do |db|
  config.vm.provision :shell, inline: "echo C"
    db.vm.box = "mysql"
  end
end
```

## Reference

- [🔗 Why Vagrant?, Vagrant 공식 사이트](https://www.vagrantup.com/intro)
- [🔗 Getting Started, Vagrant 공식 사이트](https://learn.hashicorp.com/collections/vagrant/getting-started)
