# sentry

### 环境要求

 - Docker 17.05.0+
 - Compose 1.17.0+
 - 硬件要求: 3GB RAM +

#### docker

安装: 


参考: [install compose](https://docs.docker.com/compose/install/#upgrading)

#### docker-compose


安装: 

参考: [install compose](https://docs.docker.com/compose/install/#upgrading)

 ### 本机环境

- ubuntu: 16.04.12
- docker-ce  version: 20.10.7
- docker-compose version: 1.29.2

### source map

常见错误: [error: project not found](https://github.com/getsentry/sentry-webpack-plugin/issues/119)

npx sentry-cli info
npx sentry-cli projects list

You can install sentry-cli directly and run sentry-cli info and sentry-cli projects list to make sure that your configuration is correct and can talk to the Sentry API – https://docs.sentry.io/cli/configuration/#validating-the-config


### 参考

- [docker下一步步部署sentry ](https://www.cnblogs.com/xiaochina/p/12585453.html)
- [docker-compose 部署sentry](https://www.cnblogs.com/xiaochina/p/12586360.html)