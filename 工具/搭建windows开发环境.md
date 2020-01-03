## windows 开发环境

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [windows 开发环境](#windows-开发环境)
  - [composer](#composer)
  - [node 、 npm](#node-npm)
  - [wampServer](#wampserver)

<!-- /code_chunk_output -->

### composer

- 直接 [下载 composer](https://getcomposer.org/download/) setup.exe
- composer config -g repo.packagist composer https://packagist.phpcomposer.com
- 配置[中国镜像](https://pkg.phpcomposer.com/)
- [参考文章]((https://blog.csdn.net/hdchangchang/article/details/46623919))
- [文档：基本用法](http://docs.phpcomposer.com/01-basic-usage.html)

### node 、 npm

- [下载链接](https://nodejs.org/en/)
- 验证安装\查看版本: node -v , npm -v
- 设置中国镜像:
  - 方法一: 设置 npm 的资源库为淘宝
    - npm config get registry
    - npm config set registry https://registry.npm.taobao.org
  - 方法二、安装cnpm, [文档链接](https://npm.taobao.org/)
    - npm install -g cnpm
    - cnpm -v

### wampServer

- [Wampserver官网下载以及配置](https://blog.csdn.net/Edogawa_Konan/article/details/80395881)