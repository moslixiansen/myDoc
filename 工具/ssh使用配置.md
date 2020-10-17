# ssh 使用配置

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [免密码登录](#免密码登录)
  - [使用密匙(shi)登录的原理](#使用密匙shi登录的原理)
  - [配置方法](#配置方法)
- [免账号登录（配置账号别名）](#免账号登录配置账号别名)
- [给终端配置alias](#给终端配置alias)
- [ssh保持长连接的三种方式](#ssh保持长连接的三种方式)
- [SSH无法连接之"connection reset by ip_address port 22"问题解决](#ssh无法连接之connection-reset-by-ip_address-port-22问题解决)
- [REMOTE HOST IDENTIFICATION HAS CHANGED 问题解决](#remote-host-identification-has-changed-问题解决)

<!-- /code_chunk_output -->

## 免密码登录

### 使用密匙(shi)登录的原理

  > 客户端有一对密匙(shi)，包括公匙，私匙，需要先把公匙存储到服务器。然后下次客户端登录的时候就发送一段用密匙加密的文本，服务器用公匙解密，成功则直接登录，失败则登录不成功

### 配置方法

cd ~/.ssh 查看是否已经生成 id_rsa.pub, 如果没有执行

```ssh-keygen```

然后一路回车就可以了

生成 id_rsa.pub后, 执行

```ssh-copy-id root@127.0.0.3```

把公匙存储到服务器上，下次就可以直接登录，不需要密码了

> ssh-copy-id命令的原理就是把客户端生成在$HOME/.ssh/id_rsa.pub里面的文本复制到服务器$HOME/.ssh/authorized_keys中。
> 不过有时候服务器是没有authorized_keys这个文件的，需要新建一个，但是记住，一定要给这个文件设置权限 chmod 600 authorized_keys

好了，现在我们可以使用ssh root@127.0.0.3无须密码登录了，可是难倒需要我们每次都记住ip吗？当然不是啦

## 免账号登录（配置账号别名）

主要是配置 ~/.ssh/config 文件

```vim
cd ~/.ssh
" 查看是否有config文件，如果没有，sudo vim config 新增一个
ls

" config 文件配置以下内容
Host test
   HostName 127.0.0.3
   Port         22
   User         root
   IdentityFile ~/.ssh/id_rsa
```

wq! 保存后回到 terminal，执行 ssh test 即可登录。

## 给终端配置alias

```bash
# linux 下默认是 .bashrc, 如果安装了 zsh ，则是 ~/.zshrc;windows下是 ~/.bash_profile
sudo vim ~/.bashrc

# 找到 alias 配置处, 一般有磨人的配置demo, 添加别名如下
alias test='ssh test'

# 生效
source ~/.bashrc
```

回到 terminal 输入 test, 即可登录 test 对应的服务器。

## ssh保持长连接的三种方式

```bash
# 修改server端的 etc/ssh/sshd_config

#  server每隔60秒发送一次请求给client，然后client响应，从而保持连接
ClientAliveInterval 60

#  server发出请求后，客户端没有响应得次数达到3，就自动断开连接，正常情况下，client不会不响应
ClientAliveCountMax 3

#  重启 sshd
systemctl reload sshd

# 修改client端的etc/ssh/ssh_config添加以下：（在没有权限改server配置的情形下）
#  client每隔60秒发送一次请求给server，然后server响应，从而保持连接
ServerAliveInterval 60

#  client发出请求后，服务器端没有响应得次数达到3，就自动断开连接，正常情况下，server不会不响应
ServerAliveCountMax 3

# 在命令参数里ssh -o ServerAliveInterval=60 这样子只会在需要的连接中保持持久连接， 毕竟不是所有连接都要保持持久的
```

## SSH无法连接之"connection reset by ip_address port 22"问题解决

如果服务器安装了open-ssh，然后发现客户端无法连接，并出现了
connection reset by (server_ip_address) port 22
那么你可以试试以下两个指令来重置ssh的配置。

```bash
sudo rm /etc/ssh/ssh_host_*
sudo dpkg-reconfigure openssh-server
```

## REMOTE HOST IDENTIFICATION HAS CHANGED 问题解决

报错信息如下：

```bash
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ECDSA key sent by the remote host is
SHA256:yH19wvFDgN6pioDVlNjSiF3tQiwZy0v/qMPMO6kR7Yg.
Please contact your system administrator.
Add correct host key in /c/Users/moslixiansen/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /c/Users/moslixiansen/.ssh/known_hosts:17
ECDSA host key for 152.32.174.69 has changed and you have requested strict checking.
Host key verification failed.
```

解决办法：

```bash
ssh-keygen -R 服务器端的ip地址
```