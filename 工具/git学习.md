## git 学习

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [git 学习](#git-学习)
  - [git 命令盲区](#git-命令盲区)
  - [git bash 查看 git log 时中文乱码](#git-bash-查看-git-log-时中文乱码)
  - [规范 git commit](#规范-git-commit)
  - [git rebase](#git-rebase)
  - [撤销 git 操作](#撤销-git-操作)
  - [换行符问题](#换行符问题)

<!-- /code_chunk_output -->

### git 命令盲区

```bash
# git 忽略文件权限
git config core.filemode false

# 当.gitignore 文件不生效时可以尝试
git config core.filemode false

# 从 http 方式 改为 ssh 方式时,可以通过修改Git的代码仓库的源地址
git remote set-url origin [GIT URL]

# 添加新的Git库源地址
git remote add [NAME] [GIT URL]

# 本地起建的git仓库关联远程仓库流程
git init

git add .

git commit -m "备注信息"

git remote add origin git@github.com:moslixiansen/wechat-delivery.git

#   关联起来之后,如果首次 pull 出现 fatal: refusing to merge unrelated histories 错误, 则执行以下语句
git pull origin master --allow-unrelated-histories

# 首次push 加上-u参数，Git还会把本地的master分支和远程的master分支关联起来
git push -u origin master

# 删除远程分支
git push origin --delete origin_branch_name

# 创建补丁
git diff > diff.patch

# 应用补丁
git apply diff.patch
```

### git bash 查看 git log 时中文乱码

```bash
# 先看下 LANG 环境变量是否为统一字符编码
echo $LANG

# 若输出结果为空, 执行
export LANG="zh_CN.UTF-8"

# git log 查看问题能否解决？不能的话, 修改 git config
git config --global i18n.commitencoding utf-8
git config --global i18n.logoutputencoding utf-8
export LESSCHARSET=utf-8
```

### 规范 git commit

```bash
# 全局安装
npm install -g commitizen
npm install -g conventional-changelog
npm install -g conventional-changelog-cli

# 查看以上是否安装成功
npm ls -g -depth=0

# 安装成功显示如下:
/usr/local/lib
├── commitizen@2.9.6
├── conventional-changelog@1.1.7
├── conventional-changelog-cli@1.3.5
└── npm@5.5.1

# 生成全局配置文件
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

- [参考链接: 阮一峰](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

### git rebase

```bash
# 合并最近的 4 次提交纪录
git rebase -i HEAD~4

# 分支合并， commit history 一条直线不分叉
git rebase master
```

- [參考：彻底搞懂 Git-Rebase](http://jartto.wang/2018/12/11/git-rebase/)

### 撤销 git 操作

- [参考: 阮一峰 如何撤销 Git 操作？](http://www.ruanyifeng.com/blog/2019/12/git-undo.html)

### 换行符问题

- git 忽略换行符差异  git config --global core.whitespace cr-at-eol
- [消除 git diff 时出现的 ^M](https://www.jianshu.com/p/8e0f21386d06)
- [Git以正确处理行结尾, 干货!](https://help.github.com/en/articles/configuring-git-to-handle-line-endings)
- [windows下和linux下，git换行符变化，^M问题，git diff](https://www.iteye.com/blog/fantaxy025025-2287251)
- [Git处理换行符问题](https://blog.csdn.net/github_30605157/article/details/56680990)
