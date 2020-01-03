## phpstorm配置

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [phpstorm配置](#phpstorm配置)
  - [编码规范](#编码规范)
    - [php-cs-fixer](#php-cs-fixer)
    - [php-cs](#php-cs)
  - [windows 下 phpstorm 中使用 git-bash](#windows-下-phpstorm-中使用-git-bash)
  - [同步设置(JetBrains Settings Repository)](#同步设置jetbrains-settings-repository)
  - [激活](#激活)

<!-- /code_chunk_output -->

### 编码规范

#### php-cs-fixer

- 安装:  
  - composer global require friendsofphp/php-cs-fixer
- 配置:
  - Settings -> Tools -> External Tools -> `+`
  - Edit Tool:
    - name: 起个名字, 我的是 PHP-CS-Fixer
    - Program: 你安装的 php-cs-fixer 的脚本路径,我的是 "/home/moslixiansen/.composer/vendor/friendsofphp/php-cs-fixer/php-cs-fixer"
    - Arguments/parameters: --rules=@Symfony --verbose fix "\$FileDir\$/\$FileName\$"
    - Working directory:  \$ProjectFileDir\$
    - 配置完毕, 邮件可以看到 External Tools 选项, 可以选择 PHP-CS-Fixer 进行格式化了
- 配置快捷键: Settings -> keymap -> External Tools -> PHP-CS-Fixer -> 右键 Add keyboard shortcut
- 设置代码风格为 PSR-2 : Settings -> Editor -> code style -> PHP -> set from -> Predefined Style -> PSR1/PSR2; Scheme 选 default
- [参考: github](https://github.com/FriendsOfPHP/PHP-CS-Fixer/blob/2.12/README.rst#installation)

#### php-cs

- 安装:  
  - composer global require 'squizlabs/php_codesniffer=*'
- 配置:
  - Settings -> Languages & FrameWorks -> PHP -> Quality Tools -> Code Sniffer -> configuration -> 配置好路径(我的是: /home/moslixiansen/.composer/vendor/squizlabs/php_codesniffer/bin/phpcs) -> 点validate 验证通过即可
- 设置检验代码的标准为 PSR2 :
  - Settings -> Editor -> Inspections -> 右边窗口点击 PHP  -> 点 Quantity Tools -> PHP Code Sniffer Validation -> 右侧的 code standard 选择 PSR2
- 配置完毕, 代码界面可以看到 php-cs 提示的不规范的代码了
- [github](https://github.com/squizlabs/PHP_CodeSniffer)
- [参考文章](https://blog.csdn.net/m0_38092942/article/details/80006144?utm_source=blogxgwz2)

### windows 下 phpstorm 中使用 git-bash

1. 打开 ```phpstorm -> setting -> terminal```
2. ```shell pash``` 改为 ```C:\Program Files\Git\git-bash.exe```(这是我的git bash安装路径), 同时更改tab-name为git-bash
3. ```alt + F12``` 打开终端即可使用

### 同步设置(JetBrains Settings Repository)

1. 去插件市场安装 Settings Repository
2. 去git新建一个repository
3. 在 ide 端选择file->Settings Repository,输入新建的repository地址
4. 选择覆盖, 然后去github 生成一个token, 怎么生成 ？－> token, github -> setting -> developer settings -> personal access tokens -> generate new , 需要勾选上 repo 以及 delete repo, 生成后将token复制下来, 填入 ide 的 同步界面即可
5. 关闭自动同步 file -> setting -> tools -> settings repository -> auto sync
6. 我的当前设置

```bash
# url
https://github.com/moslixiansen/JetBrainsSettings

# token
349d89fdcf55ef2f98e6d5138b6317c24b560acf
```

- [参考文章](https://www.jianshu.com/p/08e2ccdd4316)

### 激活

- [IntelliJ IDEA 注册码](http://idea.lanyus.com/)
- [2019 IntelliJ IDEA 最新注册码激活 Your activation code could not be validated](https://blog.csdn.net/weixin_44443617/article/details/90048551)
- 淘宝买的 IntelliJ IDEA激活码

>客官您好！
>订单520989088987915048给您上菜啦：

>网站实时获取激活码（因激活码太长，请务必用电脑打开网址）
http://www.100c1.com/portal/page/index/id/2.html
打开网址，输入订单号，获取激活码。
凭订单号  终身享受获取激活资格
网站激活码下方有下载，安装，汉化，教程的链接
---------------------------------------------------------------------
>（如果您以前破解过，会导致激活不成功，请看这里解决
http://www.100c1.com/portal/article/index/id/30.html）
满意再来光临哈！
==
>7.7日激活码因为授权问题，暂时取消，请大家重新提取，授权名：小鸟程序员。  谨防盗用。 
如遇到激活失效，请打开网站重新提取。
提取网站 http://bird.100c1.com/portal/page/index/id/1.html  
订单号不变