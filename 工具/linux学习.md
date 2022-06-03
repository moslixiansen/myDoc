## linux 学习

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [linux 学习](#linux-学习)
  - [ls -l 查看当前目录文件](#ls-l-查看当前目录文件)
  - [查看系统启动日志](#查看系统启动日志)
  - [权限相关](#权限相关)
    - [chmod 命令 设定不同的访问权限](#chmod-命令-设定不同的访问权限)
    - [chgrp 更改某个文件或目录的所属用户组](#chgrp-更改某个文件或目录的所属用户组)
    - [chown 更改某个文件或目录的所有者](#chown-更改某个文件或目录的所有者)
  - [添加、删除 PPA 源](#添加-删除-ppa-源)
  - [下载相关](#下载相关)
  - [解压\打包相关](#解压打包相关)
    - [tar](#tar)
    - [dpkg](#dpkg)
  - [建立映射关系到 /usr/bin](#建立映射关系到-usrbin)
  - [清理相关](#清理相关)
  - [删除](#删除)
  - [查看端口、进程、杀死进程](#查看端口-进程-杀死进程)
  - [终端命令历史](#终端命令历史)
  - [查看文件、统计文件](#查看文件-统计文件)
    - [cat 命令](#cat-命令)
  - [mysql 导数据到数据库](#mysql-导数据到数据库)
  - [scp命令 基于ssh复制远程主机的文件或复制文件到远程主机](#scp命令-基于ssh复制远程主机的文件或复制文件到远程主机)
    - [将应用快捷方式添加到启动器](#将应用快捷方式添加到启动器)
  - [vim 相关命令](#vim-相关命令)
  - [siege 工具模拟压力测试](#siege-工具模拟压力测试)
  - [终端补全忽略大小写](#终端补全忽略大小写)
  - [shutter的安装以及 ctrl + alt + a 截图快捷键的设置](#shutter的安装以及-ctrl-alt-a-截图快捷键的设置)
  - [磁盘相关](#磁盘相关)
  - [设置快捷键相关](#设置快捷键相关)
  - [linux基础系列文章](#linux基础系列文章)
  - [查看内存信息](#查看内存信息)

<!-- /code_chunk_output -->

### ls -l 查看当前目录文件

文件属性 | 连接数 | 文件拥有者 | 所属群组 | 文件大小(字节) | 文件修改时间 | 文件名
:-: | :-: | :-: | :-: | :-: | :-: | :-: 
-rw-r--r-- | 1 | root | root | 71011992 | 2月23 00:15 | postman.tar.gz |

- r:可读，w:可写, x:可执行，
- 其中文件属性分为四段，- --- --- --- 10个位置,例如：drwxr-xr-x
  - 第一个字符指定文件类型
    - 横线: 表示是一个非目录, 即文件
    - d: 表示是一个目录
  - 第二段是文件拥有者的属性
  - 第三段是文件所属群组的属性
  - 第四段是对于其它用户的属性
- 如上面文件postman.tar.gz的访问权限，表示postman.tar.gz是一个文件;其属主有读写权限；与“postman.tar.gz”属主同组的用户只有读权限；其他用户也只有读权限   

### 查看系统启动日志

```bash
sudo journalctl --verify

# 出现很多
# FAIL: /var/log/journal/21fbd9cf5ebc4d1ea8e83b6f1be17eaf/system.journal (Cannot assign requested address)

# 按 ctrl +　alt + F(2-7) 进入 ttfy 界面发现里面都报错如下:
# [  451.550833] systemd-journald[13720]: Failed to write entry (19 items, 534 bytes), ignoring: Cannot assign requested address
# [  452.086954] systemd-journald[13720]: Failed to write entry (21 items, 664 bytes), ignoring: Cannot assign requested address

# 猜测是系统日志服务挂了, 写日志出错, 删掉那些错误日志
# 重启  journald.service
sudo systemctl restart systemd-journald.service

# 输入 dmesg 查看是否还有 journal 错误
sudo systemctl restart systemd-journald.service

# 查看是否还有错误
dmesg
```

- [参考文章](http://ju.outofmemory.cn/entry/343962)

### 权限相关

- 每个文件都有三种权限 rwx 对应读写可执行
- 每个权限有三种粒度, ugo 分别代表 user (拥有者) group (所属群组) others (其他组)
- 使用chmod来更改权限  -R 代表递的修改归子目录下文件的权限
- 数字形式 4 2 1分别代表读写可执行, 比如 777 代表 user group others 均拥有读写可执行权限, 数字之间可以相互组合, 3 * ( 3 + 3 ) = 18种
- 改变文件的 user (拥有者) chown
- 改变文件 group (所属组) chgrp
- [参考: Linux权限详解](https://blog.csdn.net/u013197629/article/details/73608613)

#### chmod 命令 设定不同的访问权限

- 语法：该命令有两种用法
  - 一种是包含字母和操作符表达式的文字设定法
    - chmod [who] [+ | - | =] [mode] 文件名
    - 参数：
      - 操作对象who可是下述字母中的任一个或者它们的组合：
        - u 表示“用户（user）”，即文件或目录的所有者
        - g 表示“同组（group）用户”，即与文件属主有相同组ID的所有用户
        - o 表示“其他（others）用户”
        - a 表示“所有（all）用户”,它是系统默认值
      - 操作符号可以是：
        - \+ 添加某个权限
        - \- 取消某个权限
        - = 赋予给定权限并取消其他所有权限（如果有的话）
      - 设置mode所表示的权限可用下述字母的任意组合：
        - r 可读
        - w 可写
        - x 可执行。
        - X 只有目标文件对某些用户是可执行的或该目标文件是目录时才追加x 属性
        - s 在文件执行时把进程的属主或组ID置为该文件的文件属主。方式“u＋s”设置文件的用 户ID位，“g＋s”设置组ID位
        - t 保存程序的文本到交换设备上
        - u 与文件属主拥有一样的权限
        - g 与和文件属主同组的用户拥有一样的权限
        - o 与其他用户拥有一样的权限
　　  - 文件名：以空格分开的要改变权限的文件列表，支持通配符
    - 在一个命令行中可给出多个权限方式，其间用逗号隔开
      - 例如：chmod g+r，o+r example
      - 使同组和其他用户对文件example 有读权限
  - 另一种是包含数字的数字设定法
    - chmod -R 777 /storage/logs

#### chgrp 更改某个文件或目录的所属用户组

- 语法：chgrp [选项] group filename
- 介绍：该命令改变指定指定文件所属的用户组。其中group可以是用户组ID，也可以是/etc/group文件中用户组的组名。文件名是以空格分开的要改变属组的文件列表，支持通配符。如果用户不是该文件的属主或超级用户，则不能改变该文件的组。
- 参数：
  - \- R 递归式地改变指定目录及其下的所有子目录和文件的属组
  - eg： chgrp - R book /opt/local /book
  - 改变/opt/local /book/及其子目录下的所有文件的属组为book。

#### chown 更改某个文件或目录的所有者

- 功能：更改某个文件或目录的属主和属组。这个命令也很常用。例如root用户把自己的一个文件拷贝给用户xu，为了让用户xu能够存取这个文件，root用户应该把这个文件的属主设为xu，否则，用户xu无法存取这个文件。
- 语法：chown [选项] 用户或组 文件
- 说明：chown将指定文件的拥有者改为指定的用户或组。用户可以是用户名或用户ID。组可以是组名或组ID。文件是以空格分开的要改变权限的文件列表，支持通配符。
- 参数：
  - \- R 递归式地改变指定目录及其下的所有子目录和文件的拥有者
  - \- v 显示chown命令所做的工作
    - eg1：把文件shiyan.c的所有者改为wang
    - chown wang shiyan.c
    - eg2：把目录/his及其下的所有文件和子目录的属主改成wang，属组改成users
    - chown - R wang.users /his

### 添加、删除 PPA 源 

> PPA，英文全称为 Personal Package Archives，即个人软件包档案。是 Ubuntu Launchpad 网站提供的一项源服务，允许个人用户上传软件源代码，通过 Launchpad 进行编译并发布为二进制软件包，作为 apt / 新立得（Synaptic）源供其他用户下载和更新。
- PPA的一般形式： ppa:user/ppa-name
- 添加：sudo add-apt-repository ppa:user/ppa-name 
- 记得要更新一下： sudo apt-get update
- 删除：sudo add-apt-repository -r ppa:user/ppa-name 
- 然后进入 /etc/apt/sources.list.d 目录，将相应 ppa 源的保存文件删除
- 同样更新一下：sudo apt-get update
- eg： sublime text3：sudo add-apt-repository -r ppa:webupd8team/sublime-text-3
- [参考链接](https://blog.csdn.net/lu_embedded/article/details/55803500)

### 下载相关

- wget https://dl.pstmn.io/download/latest/linux64 -O postman.tar.gz wget下载文件，支持https和ftp两种方式

### 解压\打包相关

#### tar

- tar -xzf postman.tar.gz   /opt  
  - 含义：解压 .tar.gz 文件到/opt
  - 参数
    - x : 从 tar 包中把文件提取出来
    - z : 表示 tar 包是被 gzip 压缩过的，所以解压时需要用 gunzip 解压
    - v : 显示详细信息
    - f xxx.tar.gz : 指定被处理的文件是 xxx.tar.gz
  - tar -cvf 打包 

#### dpkg

- sudo dpkg -i sogoupinyin_2.2.0.0108_amd64.deb ：解压安装.deb文件
- sudo dpkg -r deb_name 卸载deb安装的软件
- dpkg -l 查找包名
- 右键提取解压.zip文件乱码
  - sudo apt install unar
  - unar xxxxx.zip

### 建立映射关系到 /usr/bin

- sudo ln -s /opt/Postman/Postman /usr/bin/postman  建立链接 
- 在终端输入 postman 即可启动 /opt/Postman/Postman 下的Postman

### 清理相关

- sudo apt remove libreoffice-common
- sudo apt autoremove

### 删除

- sudo rm -d 删除空的文件夹
- sudo rm -rf 删除非空文件夹

### 查看端口、进程、杀死进程

```bash
# 表示查看所有进程里 CMD 是 php的进程信息
ps -ef | grep php  
# 显示所有状态
ps -aux | grep java  -aux 
# 杀死指定pid进程
kill pid
# 杀死进程   例如： kill -9 [PID]
kill -9 pid
# 查看端口占用情况
netstat -tlnp
# 查看已经连接的服务端口
netstat -a
# 查看指定端口，可以结合grep命令：
netstat -ap | grep 8080
# 使用lsof命令： 如果有显示说明已经开放了，如果没有显示说明没有开放
lsof -i:8888
# 若要关闭使用这个端口的程序，使用kill + 对应的pid
kill -9 PID号
# telnet ip  端口号   方式测试远程主机端口是否打开
telnet 45.32.45.77 22
# 端口检测工具 http://coolaf.com/tool/port
```

### 终端命令历史

- history  显示终端命令历史
- history > cmd.txt     将终端历史命令存入cmd.txt
- [如何让history命令显示具体时间](https://www.laofuxi.com/1003.html)

### 查看文件、统计文件

- head -6 readme.txt         显示头五行
- tail -25 readme.txt          显示尾部25行
- find ./ -name app.js        查找文件 app.js

#### cat 命令

- cat error.log | grep -C 5 'nick' 显示file文件里匹配foo字串那行以及上下5行
- cat error.log | grep -B 5 'nick' 显示foo及前5行
- cat error.log | grep -A 5 'nick' 显示foo及后5行
- grep -o 'nick' error.log | wc -l 统计 nick 出现的次数
- cat error.log | grep -A 5 'nick' | tail -n 100 显示foo及后5行 显示后100条
- cat error.log | grep -r 5 'xxx' 同时返回文件名
- cat * */* */*/* | grep 'xxx' 查找当前目录 当前目录子目录 及子目录的子目录
- awk '条件 动作' 文件名
- [awk 入门教程](http://www.ruanyifeng.com/blog/2018/11/awk.html)
- [AWK 简明教程](https://coolshell.cn/articles/9070.html)
- [SED 简明教程](https://coolshell.cn/articles/9104.html)

### mysql 导数据到数据库

- phpmyadmin 新建数据库 名字 posapi 排序规则选择 utf-8 general-ci
- sudo mysql -u root -p 进入数据库
- show databases;
- use posapi;
- source ./(SQL文件名)
- 若导入过程中报错 没有域名为% 用户名为api的用户，再添加即可
CREATE USER 'api'@'%' IDENTIFIED BY 'yourpasswd'; 
GRANT ALL PRIVILEGES ON *.* TO 'api'@'%' WITH GRANT OPTION; 
FLUSH PRIVILEGES; 
- [参考 msyqldimp 导入导出数据](https://www.cnblogs.com/activiti/p/6700044.html)
- 导入: mysql -uroot  -P3306 -pBPmfJJG5D6FQGPjK posapi-int-02 < client.sql 
- 导出: mysqldump -h localhost -uroot -pBPmfJJG5D6FQGPjK posapi-int-02 receive_order > receive_order.sql
- 同时导多张表的脚本
```bash
#!/bin/sh
cd /mnt/rdsExport
h='localhost'
u='root'
p='BPmfJJG5D6FQGPjK'
db='posapi-int'
tb1='client'
tb2='client_point_log'
tb3='point_expire_plan'
send=`date '+%Y%m%d%H%M'`

mysqldump -h$h -u$u -p$p $db $tb1 $tb2 $tb3 > rds_point_expire_$send.sql

tar -czf rds_point_expire_$send.tar.gz rds_point_expire_$send.sql
rm ./rds_point_expire_$send.sql

echo "backup success!"
```

### scp命令 基于ssh复制远程主机的文件或复制文件到远程主机

- scp root@120.76.220.105:/mnt/www/posapi-lzf/storage/logs/laravel-2019-02-22.log  /opt

#### 将应用快捷方式添加到启动器

- cd /usr/share/applications
- sudo gedit xxx.desktop
打开需要编辑的文本内容为：

```
[Desktop Entry]
Version=1.0
Name=xxx
Exec=/home/username/xxx.sh（这个是启动程序需要执行的文件路径名）
Terminal=false
Icon=/home/username/xxx.png（这个是图标）
Type=Application
Categories=Development
```

[参考链接](https://blog.csdn.net/weixin_38437243/article/details/78259475) 

### vim 相关命令

- :%s/str//gn 统计字符串“str”出现次数
- d100 删除100 行
- :3,18s/str1/str2 :把第3行到第18行的str1替换为str2
- u 撤回
- 3yy 复制三行
- 复制一个单词: 光标移到一个单词的首字母,按v e y
- [一个专注于Vim配置、插件、Vim命令和Vim教程的网站](https://vim.ink/)
- 打开文件显示行号:　
  - 所有用户: vim /etc/vim/vimrc  最后加上  set   nu 
  - 当前用户: vim ~/.vimrc 最后加上  set   nu 
  - [参考文档](https://vimjc.com/vimrc-config.html)

### siege 工具模拟压力测试

- siege "http://127.0.0.1:500/api/StockWarehouse/get-product-by-tags POST {\"taglist\":\"100100000000000001\"}" -c 100 -t 60s --header "Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI2LCJpc3MiOiJodHRwOi8vMTIwLjc2LjIyMC4xMDU6NTAwL2FwaS9BdXRoL3VzZXJDaGVjayIsImlhdCI6MTU0NjA3MTQxNywiZXhwIjoxNTk3OTExNDE3LCJuYmYiOjE1NDYwNzE0MTcsImp0aSI6ImNaVXlIY25qQUZPbWxzRTAifQ.SiMqLfscFhGqAPFTZDtC_mlY1MVPRV2QixMQOlZyvhA"

### 终端补全忽略大小写

- 在~目录中创建.inputrc
- 打开.inputrc，添加如下设置：
set completion-ignore-case on
- 重启终端

### shutter的安装以及 ctrl + alt + a 截图快捷键的设置

- 打开 keyboard 键盘设置
- 选择 custom 通用设置， 添加
- 名称：Shutter Select 命令： shutter -s 快捷键 ctrl + alt + a
- 完成即可使用
- [参考链接](https://blog.csdn.net/hanshileiai/article/details/46843713)
- [Ubuntu 18.04中的Shutter启用“编辑”](https://www.linuxidc.com/Linux/2018-04/151911.htm)

### 磁盘相关

- df -h 查看磁盘已使用空间
- du -sh * 查看当前目录下的文件夹或文件占用空间大小
- du -lh  --max-depth=1 查看当前目录下的文件夹占用空间大小

### 设置快捷键相关

- cd /usr/local/bin   ||  cd /usr/bin
- sudo ln -s /opt/navicat120_premium_cs_x64/navicat navicat  // 建立软链接即可
- 设置 -> 键盘 -> 快捷键 -> 添加自定义快捷键 ->[参考上面shutter](https://blog.csdn.net/hanshileiai/article/details/46843713)
- 有的使用 ./run.sh 启动的应用, 自己再写一个脚本就好了, 以 ./start_navicat 为例

``` bash
#! /bin/bash
cd /opt/navicat120_premium_cs_x64
./start_navicat
echo "starting navicat ..."
```

### linux基础系列文章

- [Linux分区与挂载](https://segmentfault.com/a/1190000021706561)
- [Linux常用命令](https://segmentfault.com/a/1190000021950993)
- [wget 与 curl 命令详解](https://segmentfault.com/a/1190000022301195)
- [Linux软件安装归纳](https://segmentfault.com/a/1190000022371232)
- [Linux 用户管理](https://segmentfault.com/a/1190000022424829)
- [Linux权限管理](https://segmentfault.com/a/1190000022541406)

### 查看内存信息

- ``` dmidecode -t memory```
