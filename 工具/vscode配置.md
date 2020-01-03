## vscode配置

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [vscode配置](#vscode配置)
  - [windows 下 vscode 使用git-bash](#windows-下-vscode-使用git-bash)
  - [setting sync 同步插件](#setting-sync-同步插件)

<!-- /code_chunk_output -->

### windows 下 vscode 使用git-bash

```bash
# 点击vscode左下角的设置，输入
terminal.intergranted.shell.windows

# 回车, 选择 Shell - Windows, 填入 git-bash 的路径, 当前是
C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Git\git-bash.exe

# ctrl + ` 打开终端即可使用
```

### setting sync 同步插件

- moslixiansen 的 Gist id
  - ```cccc79322603a293fee360cf86f2d532```
- 新版的 setting sync 不需要 github token 就能进行同步了, 只需要一个 gist id, gist id 如上, 忘记 gist id 找回方法如下
  - 在 gidhub 点击右上角的头像,  点击 your gists
  - 进入 gists 页面, 点击 cloudSettings, 浏览器 地址栏的最后一串字符就是你的gist id
- 当需要upload的时候， 还是需要token验证的， 怎么生成 ？－> token, github -> setting -> developer settings -> personal access tokens -> 找到 vscode->sync ->regenerate 即可
- [参考: VS Code Settings Sync 的一些小记](https://segmentfault.com/a/1190000011206401#articleHeader2)
- [参考:　vscode使用setting-sync插件同步设置](https://juejin.im/post/5cd933e5e51d456e39631997)