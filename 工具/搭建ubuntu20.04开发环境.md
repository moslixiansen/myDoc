# 搭建ubuntu16.04开发环境

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [搭建ubuntu16.04开发环境](#搭建ubuntu1604开发环境)
  - [通用基础设施](#通用基础设施)
    - [检查 ```vim```, ```htop``` 等工具是否已安装](#检查--vim--htop-等工具是否已安装)
    - [更好用的shell - zsh(语法高亮\自动补全等)](#更好用的shell---zsh语法高亮自动补全等)
  - [开发相关](#开发相关)
    - [前端开发](#前端开发)
      - [node、npm、yarn、n、nvm](#node-npm-yarn-n-nvm)
    - [后台开发](#后台开发)
      - [nginx](#nginx)
        - [处理nginx启动错误Failed to read PID from file /run/nginx.pid](#处理nginx启动错误failed-to-read-pid-from-file-runnginxpid)
      - [php](#php)
      - [mysql](#mysql)
        - [使用密码登录mysql](#使用密码登录mysql)
        - [远程登录](#远程登录)
        - [mycli 语法高亮 sql提示等](#mycli-语法高亮-sql提示等)
      - [nginx 配置](#nginx-配置)
      - [composer](#composer)
      - [apache](#apache)
      - [laravel 报错处理](#laravel-报错处理)
  - [其它软件](#其它软件)
    - [时间设置](#时间设置)
    - [安装unrar](#安装unrar)
    - [安装lnav](#安装lnav)
    - [安装axel](#安装axel)
  - [桌面软件](#桌面软件)
    - [卸载无用软件](#卸载无用软件)
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

## 通用基础设施

### 检查 ```vim```, ```htop``` 等工具是否已安装

```bash
# 若未安装则安装下
sudo apt install vim htop
```

### 更好用的shell - zsh(语法高亮\自动补全等)

```bash
# 安装zsh
sudo apt install zsh
# 把默认的Shell改成zsh, 注意：不要使用sudo
chsh -s /bin/zsh
# 把第一行的/bin/bash改成/bin/zsh，这个是root用户的。
sudo vim /etc/passwd
# 执行安装脚本
# 这里可能出现 The TLS connection was non-properly terminated. 原因可能是网络问题,多试几次就好了。
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
# 如果想快点安装好可以直接新建 install.sh
vim zsh-install.sh
sudo chmod +x zsh-install.sh  or bash zsh-install.sh
rm zsh-install.sh
# 修改主题 (推荐使用 fino-time)
cd ~/.oh-my-zsh/themes/
# 选择一个主题
vim ~/.zshrc
ZSH_THEME="fino-time"
# 生效
source ~/.zshrc

# 安装 zsh-autosuggestions 历史命令提示（~/.oh-my-zsh/custom/plugins 目录下）
git clone https://github.com/zsh-users/zsh-autosuggestions.git  $ZSH_CUSTOM/plugins/zsh-autosuggestions
vim ~/.zshrc
# 找到plugins=(git)这一行添加
plugins=(git zsh-autosuggestions)
# 生效
source ~/.zshrc

# 安装 zsh-syntax-highlighting 语法高亮插件
cd ~/.oh-my-zsh/custom/plugins
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git
echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc
source ~/.zshrc

# 修改主机名
hostnamectl set-hostname new-hostname
# 实际相当于将下面两个文件的主机名改过来
sudo vim /etc/hostname
sudo vim /etc/hosts 
# 重启生效
sudo reboot
```

- [zsh官网](https://github.com/ohmyzsh/ohmyzsh)

## 开发相关

### 前端开发

#### node、npm、yarn、n、nvm

```bash
# node npm
sudo apt update
sudo apt install nodejs npm
node -v
npm -v
# 查看源
npm config get registry
# 淘宝
npm config set registry https://registry.npm.taobao.org

# 使用 n 安装/管理 node
sudo npm install -g n
# 常用命令
sudo n stable # 稳定版 stable
n latest # 最新版
# 具体版本号
sudo n v12.1
n --help

# 首先安装必要的包
sudo apt-get update
sudo apt-get install build-essential libssl-dev

# 安装nvm的脚本，有两种方法 curl 或 wget
# 参考：https://github.com/nvm-sh/nvm#system-version-of-node
  # curl
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash
  # wget
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash
# 让 nvm 命令生效
source ~/.zshrc
# 常用命令
nvm install v0.10.32                  # Install a specific version number
nvm use 0.10                          # Use the latest available 0.10.x release
nvm run 0.10.32 app.js                # Run app.js using node v0.10.32
nvm exec 0.10.32 node app.js          # Run `node app.js` with the PATH pointingto node v0.10.32
nvm alias default 0.10.32             # Set default node version on a shell

# yarn https://yarn.bootcss.com/docs/install/#debian-stable
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn
 # 通过 npm 安装 yarn
sudo npm install --global yarn
yarn --version
```

### 后台开发

#### nginx

```bash
# nginx
sudo apt-add-repository ppa:nginx/stable
sudo apt update
sudo apt install -y nginx
sudo nginx

# 浏览器输入 localhost 查看 nginx 是否安装成功

# /var/log/nginx/error.log 查看 nginx error log

# 一般 502 报错是因为 php7.1-fpm没安装或者没开启
# 查看状态
sudo service php7.1-fpm status
# 安装
sudo apt install php7.1-fpm
# 查看状态
sudo service php7.1-fpm start

- 配置hgx项目
      1. 去测试服 复制一份 /etc/nginx/sites-available 目录下的 api.conf 文件 或者直接复制本地的 sites-available 目录下的 default 文件, sudo cp default api.conf, 更改好里面的配置就行, 主要有 listen 的端口, server_name, root_path 以及 error.log 的配置 ;
      2. sudo ln -s /etc/nginx/sites-avaliable/api.config /sites-enable
      3. sudo service nginx restart
```

##### 处理nginx启动错误Failed to read PID from file /run/nginx.pid

问题产生原因

因为 nginx 启动需要一点点时间，而 systemd 在nginx 完成启动前就去读取 pid file造成读取 pid 失败

解决方法

让 systemd 在执行 ExecStart 的指令后等待一点点时间即可如果你的 nginx 启动需要时间更长，可以把 sleep 时间改长一点建立目录
mkdir -p /etc/systemd/system/nginx.service.d
在新建目录中建立文件override.conf，输入内容

```bash
[Service]
ExecStartPost=/bin/sleep 0.1
```

systemctl daemon-reload
systemctl restart nginx.service

- [参考](https://blog.csdn.net/shllly99/article/details/88170750)

#### php

```bash
# php
sudo apt-add-repository ppa:ondrej/php
sudo apt update
# 安装php及其常用扩展
sudo apt install -y php7.1 php7.1-mysql php7.1-fpm php7.1-curl php7.1-xml php7.1-mcrypt php7.1-json php7.1-gd php7.1-mbstring php7.1-zip php-mongodb php-memcached php-redis

# 查看当前PHP配置文件中启用的扩展列表：
sudo grep -rnw '/etc/php/7.4/fpm/php.ini' -e ";extension="

# 注意: 若提示缺少PHP扩展，可用以下命令查询PHP模块扩展
#这个命令的作用是在Ubuntu 20.04软件包列表中搜索以“php7.1-”开头的所有软件包。它将输出所有找到的软件包及其描述，您可以查看这些软件包是否与您的需求匹配，并选择安装适当的软件包。

# 在Ubuntu中，“apt-cache search”命令用于搜索可用的软件包，而“php7.1-”则指定要搜索的软件包名称的前缀。该命令不仅适用于PHP软件包，还适用于其他软件包。
sudo apt-cache search php7.1-
# 安装扩展
sudo apt install -y php7.1-mysql
# 切换php版本(环境:ubuntu 20)
sudo update-alternatives --config php # 在出现的界面键入要切换的序号
# 如果php -v依然显示之前的版本,则再执行
sudo update-alternatives --set php /usr/bin/php7.1
# 重启fpm
sudo systemctl restart php7.1-fpm.service

```

- [参考:一文彻底解决UBUNTU上PHP的安装以及版本切换](https://www.cnblogs.com/feiffy/p/8660737.html)

#### mysql

```bash
# Ubuntu 源仓库中最新的 MySQL 版本号是 MySQL 8.0，安装命令：
sudo apt update
sudo apt install mysql-server
# 一旦安装完成，MySQL 服务将会自动启动。验证 MySQL 服务器正在运行：
sudo systemctl status mysql

# 保护加固 MySQL
# MySQL 安装文件附带了一个名为mysql_secure_installation的脚本，它允许你很容易地提高数据库服务器的安全性。
# 不带参数运行这个脚本：
sudo mysql_secure_installation
# VALIDATE PASSWORD COMPONENT.....（使用密码强度校验组件） 输入： n
# New Password:（设置新密码,并重复一遍)
# Remove anonymous users (删除匿名用户) n
# Disallow root login remotely(拒绝远程root账号登录） n
# Remove test database and access to it(移除test数据库） n
# Reload privilege tables now (现在就重新载入权限表） y
```

##### 使用密码登录mysql

在 Ubuntu 20.04 中安装 MySQL 8.0 后，默认的身份验证方式是 auth_socket。这意味着，可以通过系统用户身份验证连接到 MySQL 服务器，而无需输入密码。

如果您想要更改为使用密码进行身份验证，则需要执行以下步骤：

1. 以 root 身份登录到 MySQL：
    ```
    sudo mysql -u root
    ```

2. 创建一个新的 MySQL 用户，并设置其密码：

    ```sql
    use mysql;
    CREATE USER 'deploy'@'%' IDENTIFIED BY 'your_password';
    ```
    
    其中，new_user 是新创建的用户名，your_password 是该用户的密码。

3. 授予新用户适当的权限：

    ```sql
    GRANT ALL PRIVILEGES ON *.* TO 'deploy'@'%' WITH GRANT OPTION;
    # 刷新权限
    FLUSH PRIVILEGES;
    ```

4. 退出 MySQL：

    ```sql
    EXIT;
    ```

5. 修改 MySQL 配置文件（/etc/mysql/mysql.conf.d/mysqld.cnf），将 auth_socket 改为 mysql_native_password：

    ```
    # Replace this line
    auth_socket = /var/run/mysqld/mysqld.sock

    # With this line
    default_authentication_plugin = mysql_native_password
    ```

6. 重新启动 MySQL 服务：

    ```
    sudo systemctl restart mysql
    ```

接下来，就可以使用新创建的用户和密码进行身份验证了。

记得在服务器的防火墙开放3306端口。


#####  远程登录

假定： 设置允许 IP 地址为 120.78.13.180 的主机进行远程连接

```sql
# 在 MySQL 服务器上创建用户，并授予该用户来自特定 IP 地址的连接权限。
CREATE USER 'new_user'@'120.78.13.180' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON *.* TO 'new_user'@'120.78.13.180' WITH GRANT OPTION;
FLUSH PRIVILEGES;


# 查看具有GRANT权限的用户列表：
SELECT User, Grant_priv, Host FROM mysql.user;
# 如果“Grant_priv”列中的值为“Y”，则表示该用户具有GRANT权限。如果“Grant_priv”列中的值为“N”，则表示该用户没有GRANT权限。

# 请注意，您需要以具有至少“SELECT”权限的MySQL用户身份登录才能运行此命令。
```

确保服务器上的防火墙已打开 MySQL 端口（通常是3306）。可以使用以下命令检查

```bash
sudo ufw allow mysql
```

远程登录

```bash
mysql -u new_user -h server_ip_address -p
```

- [参考:Ubuntu20.04 安装和卸载MySQL8](https://www.cnblogs.com/zhangxuel1ang/p/13456116.html)

##### mycli 语法高亮 sql提示等

```bash
sudo apt install mycli
#使用
sudo mycli # 相当于 sudo mysql
mycli -udeploy
```

- [参考:官网](https://github.com/dbcli/mycli)

#### nginx 配置

```bash
# 注意:查看nginx 和 fastcgi 通信有2种方式，一种是TCP方式，还有种是UNIX Socket方式。查看命令如下:
sudo vim /etc/php/7.1/fpm/pool.d/www.conf

# 默认是socket方式
listen = /run/php/php7.1-fpm.sock

# 另外一种TCP方式
listen = 127.0.0.1:9000

# 检查配置文件：
sudo php-fpm7.1 -t

# 修改重启下 php-fpm7.1: （/etc/init.d/php7.0-fpm restart）
sudo service php-fpm7.1 restart

# 修改nginx配置文件
sudo vim /etc/nginx/sites-available/default

sudo service nginx restart

# 重启nginx失败
ps -ef | grep nginx
kill -9 pid
```

- [参考:Ubuntu16.04 lnmp 环境搭建](https://segmentfault.com/a/1190000016777859)

#### composer

安装前请务必确保已经正确安装了 PHP。打开命令行窗口并执行 php -v 查看是否正确输出版本号。

```bash
# 下载安装脚本 － composer-setup.php － 到当前目录
php -r "copy('https://install.phpcomposer.com/installer', 'composer-setup.php');"
# 执行安装过程
php composer-setup.php
# 删除安装脚本
php -r "unlink('composer-setup.php');"
```

**局部安装：**
上述下载 Composer 的过程正确执行完毕后，可以将 composer.phar 文件复制到任意目录（比如项目根目录下），然后通过 php composer.phar 指令即可使用 Composer 了！

**全局安装：**
全局安装是将 Composer 安装到系统环境变量 PATH 所包含的路径下面，然后就能够在命令行窗口中直接执行 composer 命令了。

Mac 或 Linux 系统：
打开命令行窗口并执行如下命令将前面下载的 composer.phar 文件移动到 /usr/local/bin/ 目录下面：

```bash
sudo mv composer.phar /usr/local/bin/composer

# composer 中国全量镜像
  # 全局配置
composer config -g repo.packagist composer https://packagist.phpcomposer.com
  # 局部配置
composer config repo.packagist composer https://packagist.phpcomposer.com
  # 修改当前项目的 composer.json 配置文件
"repositories": {
    "packagist": {
        "type": "composer",
        "url": "https://packagist.phpcomposer.com"
    }
}
```

- [参考：如何安装 Composer](https://pkg.phpcomposer.com/#how-to-install-composer)

**常用 composer 命令**

```bash
composer install  --no-scripts --no-dev --ignore-platform-reqs
composer update --no-scripts --no-dev
```

- [composer使用参考:　Composer 命令的使用](https://learnku.com/docs/composer/2018/03-cli/2084)
- [国内镜像](https://pkg.phpcomposer.com/)

#### apache

```bash
# 安装
sudo apt-get install apache2

# compose install 提示 missing php扩展
sudo apt install php7.0-mbstring php7.0-curl php7.0-gd php7.0-simplexml php7.0-dom

# apache 除根目录路由其余均报 404

# 开启Rewrite模块(停用模块，使用 a2dismod)
sudo a2enmod rewrite

# 将 AllowOverride None 改为 AllowOverride All
sudo gedit /etc/apache2/apache2.conf

<Directory /var/www/>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>

# 改完保存后    ,修改如下:
sudo service apache2 restart

# 抛弃apache2 迎接nginx
# 停用apache2  
sudo service apache2 stop 
# --purge 是完全删除并且不保留配置文件
sudo apt-get --purge remove apache2*
sudo apt-get autoremove apache2
    - [参考链接](https://www.jianshu.com/p/4fddb5a07775)
```

#### laravel 报错处理

```bash
# 500 错误
sudo chmod -R 777 /storage/logs
sudo chmod -R /bootstrap/cache

# DBUtil 的错误
php artisan optimize

# 最后运行 php artisan 和访问 http://localhost:500/api/token 验证是否搭建成功!
```

- [php artisan optimize：作用参考链接]( https://mp.weixin.qq.com/s?__biz=MzI5MDcyODM1OA%3D%3D&mid=2247483733&idx=1&sn=190bd31a7d740e7d4fb894de0707dceb&chksm=ec1a319cdb6db88a8a753602a987e491033bc8ae0ffed977ac3174a26b9af11654966e6e2c72)

## 其它软件

### 时间设置

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

### 安装unrar

- sudo apt-get install unrar
- 系统默认不带解压缩rar文件的功能，手动安装unrar程序装上之后就可以用命令解压缩rar文件了。使用如下命令解压缩文件到当前目录
- unrar x test.rar

### 安装lnav

- sudo apt-get install lnav 
- lnav工具是在终端界面看日志的神器，装上之后在终端里就可以用lnav彩色显示日志了。

### 安装axel

- sudo apt-get install axel
- axel是Linux命令行界面的多线程下载工具，比wget的好处就是可以指定多个线程同时在命令行终端里下载文件。安装之后，就可以代替wget用多线程下载了。
- [参考文章](https://www.jianshu.com/p/aa82df835592)

## 桌面软件

### 卸载无用软件

- 删除 libreoffice
  - sudo apt-get remove libreoffice-common
- 删除Amazon的链接
  - sudo apt-get remove unity-webapps-common

- 删掉基本不用的自带软件（用的时候再装也来得及）
  - sudo apt-get remove thunderbird totem rhythmbox empathy brasero simple-scan gnome-mahjongg aisleriot gnome-mines cheese transmission-common gnome-orca webbrowser-app gnome-sudoku  landscape-client-ui-install 
  - sudo apt-get remove onboard deja-du
- 这样系统就基本上干净了。

### 安装Chrome

#### 添加源的方式安装

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

#### deb包的方式安装
  
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
  
### 安装搜狗输入法

```bash
vim /etc/apt/sources.list.d/ubuntukylin.list

# ubuntu kylin的apt源
deb http://archive.ubuntukylin.com:10006/ubuntukylin trusty main

sudo apt-get update  

sudo apt-get install sogoupinyin  
```

### 安装 wps

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

### 安装Sublime Text 3

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

### 安装经典菜单指示器
  
  ```bash
  sudo add-apt-repository ppa:diesch/testing
  sudo apt-get update 
  sudo apt-get install classicmenu-indicator
  ```

### 安装 wine

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

### 安装 postman

- [官网下载软件包](https://www.getpostman.com/apps)
- sudo tar -zxzf Postman-linux-x64-6.0.10.tar.gz -C /opt
- 进入解压后的Postman文件夹打开终端,启动Postman
  - ./Postman/Postman
- 写脚本软连接到 /usr/local/bin，创建快捷键启动方式

### 安装 fiddler

- 需要安装mono环境，源内就有
  - sudo apt-get install mono-complete
- 下载一个最新的[Fiddler for Mono版本](http://fiddler.wikidot.com/mono)，下载完成后，解压到你的习惯放置的随便一个目录里。然后cd到目录下，运行：
  - mono Fiddler.exe
  - Tools->Fiddler Options如下,勾上Allow remote computers to connect,允许远程计算机链接!
  - [参考](https://www.jianshu.com/p/4505c732e378)

### 安装 wechat (微信)，两种方法

- 直接到软件中心，搜索electronic-wechat，点击安装即可。
- 到[这里](https://github.com/geeeeeeeeek/electronic-wechat/releases)，下载最新releases版的微信，解压使用。

### 安装 tim (QQ)

- [Ubuntu下最便捷好用微信、QQ（Wine-Tim Wine-QQ ）没有之一](https://blog.csdn.net/qq_28660035/article/details/80356851)
- [github TIM](https://github.com/askme765cs/Wine-QQ-TIM)

- [安装微信开发者工具](https://github.com/cytle/wechat_web_devtools)