## 搭建ubuntu16.04开发环境

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [搭建ubuntu16.04开发环境](#搭建ubuntu1604开发环境)
  - [卸载无用软件](#卸载无用软件)
  - [命令行工具软件](#命令行工具软件)
    - [必备软件](#必备软件)
    - [时间设置](#时间设置)
    - [安装unrar](#安装unrar)
    - [安装lnav](#安装lnav)
    - [安装axel](#安装axel)
  - [开发相关软件](#开发相关软件)
    - [安装 oh-my-zsh](#安装-oh-my-zsh)
    - [安装 composer](#安装-composer)
    - [nvm 安装](#nvm-安装)
    - [node 守护进程](#node-守护进程)
    - [lamp 开发环境](#lamp-开发环境)
    - [laravel 环境](#laravel-环境)
  - [桌面软件](#桌面软件)
    - [安装Chrome](#安装chrome)
      - [添加源的方式安装](#添加源的方式安装)
      - [deb包的方式安装](#deb包的方式安装)
    - [安装搜狗输入法](#安装搜狗输入法)
    - [安装 wps](#安装-wps)
    - [安装Sublime Text 3](#安装sublime-text-3)
    - [安装经典菜单指示器](#安装经典菜单指示器)
    - [安装 wine](#安装-wine)
    - [安装 postman](#安装-postman)
    - [安装 fiddler](#安装-fiddler)
    - [安装 wechat (微信)，两种方法](#安装-wechat-微信两种方法)
    - [安装 tim (QQ)](#安装-tim-qq)

<!-- /code_chunk_output -->

### 卸载无用软件

- 删除 libreoffice
  - sudo apt-get remove libreoffice-common
- 删除Amazon的链接
  - sudo apt-get remove unity-webapps-common

- 删掉基本不用的自带软件（用的时候再装也来得及）
  - sudo apt-get remove thunderbird totem rhythmbox empathy brasero simple-scan gnome-mahjongg aisleriot gnome-mines cheese transmission-common gnome-orca webbrowser-app gnome-sudoku  landscape-client-ui-install 
  - sudo apt-get remove onboard deja-du
- 这样系统就基本上干净了。

### 命令行工具软件

#### 必备软件

```bash
sudo apt-get install vim htop 
```

#### 时间设置

- 非双系统设置时间使用UTC
  - sudo vim /etc/default/rcS  
  - 将UTC=no改为UTC=yes
- windows双系统时间设置

```bash
# 先在ubuntu下更新一下时间，确保时间无误
sudo apt-get install ntpdate
sudo ntpdate time.windows.com

# 然后将时间更新到硬件上：
sudo hwclock --localtime --systohc
```

重新进入windows10，发现时间恢复正常了。

#### 安装unrar

- sudo apt-get install unrar
- 系统默认不带解压缩rar文件的功能，手动安装unrar程序装上之后就可以用命令解压缩rar文件了。使用如下命令解压缩文件到当前目录
- unrar x test.rar

#### 安装lnav

- sudo apt-get install lnav 
- lnav工具是在终端界面看日志的神器，装上之后在终端里就可以用lnav彩色显示日志了。

#### 安装axel

- sudo apt-get install axel
- axel是Linux命令行界面的多线程下载工具，比wget的好处就是可以指定多个线程同时在命令行终端里下载文件。安装之后，就可以代替wget用多线程下载了。
- [参考文章](https://www.jianshu.com/p/aa82df835592)

### 开发相关软件

#### 安装 oh-my-zsh

```bash
# 安装zsh
sudo apt-get install zsh

# 把默认的Shell改成zsh, 注意：不要使用sudo
chsh -s /bin/zsh

# 把第一行的/bin/bash改成/bin/zsh，这个是root用户的。
sudo vim /etc/passwd
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

# 修改主题 (推荐主题 fino-time)
cd ~/.oh-my-zsh/themes/
# 选择一个主题

# 生效
source ~/.zshrc

```

- [参考](https://www.cnblogs.com/easonjim/p/7863099.html)

#### 安装 composer

- 参考 [如何安装 Composer](https://pkg.phpcomposer.com/#how-to-install-composer)
- composer config -g repo.packagist composer https://packagist.phpcomposer.com 
- [国内镜像](https://pkg.phpcomposer.com/)
- [composer使用参考:　Composer 命令的使用](https://learnku.com/docs/composer/2018/03-cli/2084) 
- [文档：基本用法](http://docs.phpcomposer.com/01-basic-usage.html)

- 安装 npm、 node
- sudo apt install npm 
- 设置 npm 的资源库为淘宝
  - npm config set registry https://registry.npm.taobao.org 
  - npm config get registry 
- 利用n来管理版本
  - sudo npm install -g n
  - n来下载\管理 node 版本
  
```bash
# 长期支持
sudo n lts
# 稳定版
sudo n stable  
# 最新版
sudo n latest  
# 直接指定版本下载
sudo n 8.4.0
# 直接键盘上下移动选择你要的版本，回车确认
sudo n
# 或者直接指定版本
udo n 8.10.0
# 升级 npm
sudo npm i -g npm
```

#### nvm 安装

  ```bash
  # 没有 curl 的话, 安装 curl
  sudo apt-get install curl

  # 执行安装脚本, 如果 timeout 的话, 就直接用浏览器打开 https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh , 右键保存为 shell 脚本, 直接在命令行执行 ./install.sh
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

  # 在终端输入 nvm, 如果 not found, 你可能使用的是 zsh 不是默认的 bash, 将 ~/.bashrc 中的下面两行复制到 .zshrc 即可
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  
  # 相当于在zsh启动的时候执行nvm.sh, load nvm
  cd ~/.nvm
  source ~/.nvm/nvm.sh
  ```

- 注意: 使用 nvm 安装的 node 和 npm 再安装 node 包时不要再使用 sudo!

- [windows 安装nvm](https://www.cnblogs.com/weiqinl/p/7503123.html)

#### node 守护进程

- npm install -g pm2
- [参考](http://pm2.keymetrics.io/)

#### lamp 开发环境

- sudo apt install lamp-server^
- 还缺php依赖（ missing php extension）
  -sudo apt-cache search php7.
  - 利用 sublime 工具 copy 出所有扩展,  同时安装
    - sudo apt install php7.1-
  - [参考:一文彻底解决UBUNTU上PHP的安装以及版本切换](https://feiffy.cc/blog/2018/03/27/install-php-in-ubuntu)
  - 如果 composer update 出问题, 参考 [如何安装 Composer](https://pkg.phpcomposer.com/#how-to-install-composer) 重新安装composer

#### laravel 环境

- [composer使用参考:　Composer 命令的使用](https://learnku.com/docs/composer/2018/03-cli/2084) 
- composer install  --no-scripts --no-dev --ignore-platform-reqs
- composer install  和   composer update --no-scripts --no-dev
- compose install 提示 missing php扩展
  - sudo apt install php7.0-mbstring php7.0-curl php7.0-gd php7.0-simplexml php7.0-dom 
- 除根目录路由其余均报 404
  - 终端输入 sudo a2enmod rewrite 开启Rewrite模块(停用模块，使用 a2dismod)
  - sudo gedit /etc/apache2/apache2.conf，将 AllowOverride None 改为 AllowOverride All,改完保存后  sudo service apache2 restart  ,修改如下:
  
  ```bash
    <Directory /var/www/>
            Options Indexes FollowSymLinks
            AllowOverride All
            Require all granted
    </Directory>
  ```

- 500 错误
  - sudo chmod -R 777 /storage/logs和 sudo chmod -R /bootstrap/cache
- DBUtil 的错误
  - php artisan optimize: [作用参考链接]( https://mp.weixin.qq.com/s?__biz=MzI5MDcyODM1OA%3D%3D&mid=2247483733&idx=1&sn=190bd31a7d740e7d4fb894de0707dceb&chksm=ec1a319cdb6db88a8a753602a987e491033bc8ae0ffed977ac3174a26b9af11654966e6e2c72)
- 其它
  - 复制 .env.example 文件,配置环境

- 最后运行 php artisan 和访问 http://localhost:500/api/token 验证是否搭建成功!

- 抛弃apache2 迎接nginx
  - 停用apache2  
    - sudo service apache2 stop 
    - sudo apt-get --purge remove apache2* sudo apt-get autoremove apache2
    - (--purge 是完全删除并且不保留配置文件） (重新安装 sudo apt-get install apache2)
    - [参考链接](https://www.jianshu.com/p/4fddb5a07775)
  - 安装 nginx
    - sudo apt install nginx
    - sudo service nginx start
    - 输入localhost 可以查看是否安装成功,如果报500错误,则去/var/log/nginx/error.log 查看报错原因, 一般是php7.0-fpm没有,直接 sudo apt install php7.0-fpm
    - 配置hgx项目
      1. 去测试服 复制一份 /etc/nginx/sites-available 目录下的 api.conf 文件 或者直接复制本地的 sites-available 目录下的 default 文件, sudo cp default api.conf, 更改好里面的配置就行, 主要有 listen 的端口, server_name, root_path 以及 error.log 的配置 ;
      2. sudo ln -s /etc/nginx/sites-avaliable/api.config /sites-enable
      3. sudo service nginx restart

- [yarn安装](https://yarnpkg.com/en/docs/install#debian-stable)
- [Ubuntu16.04 lnmp 环境搭建](https://segmentfault.com/a/1190000016777859)
- [composer update 报错: OpenSSL Failed to enable crypto](https://github.com/composer/composer/issues/6870)

### 桌面软件

#### 安装Chrome

##### 添加源的方式安装

  ```bash
  # 将下载源加入到系统的源列表
  sudo wget https://repo.fdzh.org/chrome/google-chrome.list -P /etc/apt/sources.list.d/

  # 导入谷歌软件的公钥(安装Google Chrome浏览器官方PPA)，用于下面步骤中对下载软件进行验证
  wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -

  # 用于对当前系统的可用更新列表进行更新, 这也是许多 Linux 发行版经常需要执行的操作，目的是随时获得最新的软件版本信息。
  sudo apt-get update

  # 执行对谷歌 Chrome 浏览器（稳定版）的安装
  sudo apt-get install google-chrome-stable

  # 启动 Chrome
  /usr/bin/google-chrome-stable
  ```

##### deb包的方式安装

  ```bash
  # 打开Ubuntu终端，以下为32位版本，使用下面的命令。
  wget https://dl.google.com/linux/direct/google-chrome-stable_current_i386.deb

  # 以下为64位版本，使用下面的命令。
  wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

  # 下载好后
  #   32 位安装命令:
  sudo dpkg -i google-chrome-stable_current_i386.deb

  #  64 位安装命令:
  sudo dpkg -i google-chrome-stable_current_amd64.deb 
  ```
  
#### 安装搜狗输入法

```bash
vim /etc/apt/sources.list.d/ubuntukylin.list

# ubuntu kylin的apt源
deb http://archive.ubuntukylin.com:10006/ubuntukylin trusty main

sudo apt-get update  

sudo apt-get install sogoupinyin  
```

#### 安装 wps

- [下载 WPS For Linux](https://www.wps.cn/product/wpslinux/)
- 字体缺失问题
- 下载 wps_symbol_fonts.zip(有道云)
- 创建目录：
  - sudo mkdir /usr/share/fonts/wps-office
- 将下载的字体复制到创建的目录：
  - sudo cp -r wps_symbol_fonts.zip /usr/share/fonts/wps-office
- 解压字体包：
  - sudo unzip wps_symbol_fonts.zip
- 解压后删除字体包：
  - sudo rm -r wps_symbol_fonts.zip

#### 安装Sublime Text 3

``` bash
sudo add-apt-repository ppa:webupd8team/sublime-text-3

sudo apt-get update

sudo apt-get install sublime-text
```

- 修复输入法问题(仅限于以 subl 命令行 方式启动的sublime， 包括自定义快捷键启动的)
  - sudo apt update
  - 在 “下载” 目录
  
  ```bash
  git clone https://github.com/lyfeyaj/sublime-text-imfix.git
  cd sublime-text-imfix
  ./sublime-imfix
  ```

  - 完成！重新登录您的X窗口。然后，您可以将Sublime Text 3与Fctix输入法一起使用！
- 若以上方式不起作用， 参考[文章](https://www.jianshu.com/p/bf05fb3a4709)

#### 安装经典菜单指示器
  
  ```bash
  sudo add-apt-repository ppa:diesch/testing
  sudo apt-get update 
  sudo apt-get install classicmenu-indicator
  ```

#### 安装 wine

- 如果您之前安装过来自其他仓库的 Wine 安装包，请在尝试安装 WineHQ 安装包之前删除它及依赖它的所有安装包（如：wine-mono、wine-gecko、winetricks），否则可能导致依赖冲突

```bash
# 如果您使用的是 64 位系统，请开启 32 bit 架构支持（如果您之前没有开启的话）：
sudo dpkg --add-architecture i386

# 下载添加仓库密钥：
wget -nc https://dl.winehq.org/wine-builds/winehq.key
sudo apt-key add winehq.key

# 并添加仓库
sudo apt-add-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ xenial main'
sudo apt update
sudo apt install --install-recommends winehq-stable
```

- wine 常用命令
  
  ```bash
  # (安装)
  wine  xx.exe  
  #（wine的设置）
  winecfg 
  # （任务管理器）
  wine  taskmgr
  # （卸载软件）
  wine  uninstaller
  #（注册表）
  wine  regedit  
  # （记事本）
  wine  notepad
  # （ 重启wine）
  wineboo
  ```

- [参考 wine 官网](https://wiki.winehq.org/Ubuntu_zhcn)

#### 安装 postman

- [官网下载软件包](https://www.getpostman.com/apps)
- sudo tar -zxzf Postman-linux-x64-6.0.10.tar.gz -C /opt
- 进入解压后的Postman文件夹打开终端,启动Postman
  - ./Postman/Postman
- 写脚本软连接到 /usr/local/bin，创建快捷键启动方式

#### 安装 fiddler

- 需要安装mono环境，源内就有
  - sudo apt-get install mono-complete
- 下载一个最新的[Fiddler for Mono版本](http://fiddler.wikidot.com/mono)，下载完成后，解压到你的习惯放置的随便一个目录里。然后cd到目录下，运行：
  - mono Fiddler.exe
  - Tools->Fiddler Options如下,勾上Allow remote computers to connect,允许远程计算机链接!
  - [参考](https://www.jianshu.com/p/4505c732e378)

#### 安装 wechat (微信)，两种方法

- 直接到软件中心，搜索electronic-wechat，点击安装即可。
- 到[这里](https://github.com/geeeeeeeeek/electronic-wechat/releases)，下载最新releases版的微信，解压使用。

#### 安装 tim (QQ)

- [Ubuntu下最便捷好用微信、QQ（Wine-Tim Wine-QQ ）没有之一](https://blog.csdn.net/qq_28660035/article/details/80356851)
- [github TIM](https://github.com/askme765cs/Wine-QQ-TIM)

- [安装微信开发者工具](https://github.com/cytle/wechat_web_devtools)