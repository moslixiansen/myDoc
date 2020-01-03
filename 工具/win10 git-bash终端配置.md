## 为 win10 打造 Linux 终端（git-bash）

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [为 win10 打造 Linux 终端（git-bash）](#为-win10-打造-linux-终端git-bash)
  - [美化命令提示符](#美化命令提示符)
  - [美化主题](#美化主题)
  - [使用alias强化GitBash](#使用alias强化gitbash)
  - [使用 tmux 打造高效终端](#使用-tmux-打造高效终端)
  - [在VSCode中使用Git-Bash](#在vscode中使用git-bash)

<!-- /code_chunk_output -->



- [参考: 为 win10 打造 Linux 终端(非 wsl)](https://juejin.im/post/5bd5a08cf265da0add520772)
- 本文中的部分内容可能过期，最新配置请前往 github 查看：[链接](https://github.com/xnng/my-git-bash)
- [参考: Tmux入门教程](https://juejin.im/post/5a8917336fb9a0633e51ddb9)

### 美化命令提示符

- 以下所有命令都需要在 Git Bash 中执行
  - vim /etc/profile.d/git-prompt.sh
- 将其修改为如下内容

```bash
if test -f /etc/profile.d/git-sdk.sh
then
	TITLEPREFIX=SDK-${MSYSTEM#MINGW}
else
	TITLEPREFIX=$MSYSTEM
fi

if test -f ~/.config/git/git-prompt.sh
then
	. ~/.config/git/git-prompt.sh
else
	PS1='\[\033]0;Bash\007\]'      # 窗口标题
	PS1="$PS1"'\n'                 # 换行
	PS1="$PS1"'\[\033[32;1m\]'     # 高亮绿色
	PS1="$PS1"'➜  '               # unicode 字符，右箭头
	PS1="$PS1"'\[\033[33;1m\]'     # 高亮黄色
	PS1="$PS1"'\W'                 # 当前目录
	if test -z "$WINELOADERNOEXEC"
	then
		GIT_EXEC_PATH="$(git --exec-path 2>/dev/null)"
		COMPLETION_PATH="${GIT_EXEC_PATH%/libexec/git-core}"
		COMPLETION_PATH="${COMPLETION_PATH%/lib/git-core}"
		COMPLETION_PATH="$COMPLETION_PATH/share/git/completion"
		if test -f "$COMPLETION_PATH/git-prompt.sh"
		then
			. "$COMPLETION_PATH/git-completion.bash"
			. "$COMPLETION_PATH/git-prompt.sh"
			PS1="$PS1"'\[\033[31m\]'   # 红色
			PS1="$PS1"'`__git_ps1`'    # git 插件
		fi
	fi
	PS1="$PS1"'\[\033[36m\] '      # 青色
fi

MSYS2_PS1="$PS1"
```

- 命令提示符被修改成了，右箭头 + 当前目录，这个非常像 oh-my-zsh 的默认主题，文字的颜色也改成了青色，窗口的标题也被简化了。
- 解决 Unicode 字符显示异常问题
- 这里其实还有个坑。某些版本的 Win 10 存在 Unicode 字符显示异常的问题，比如 1809，具体的表现是，上面的那个右箭头会显示成方框。改编码方式是无效的，修改字体可解决。
- 点击这里下载 DejaVu Sans Mono 字体
- 执行以下命令，会打开字体文件夹，将字体托进去会自动安装，然后将修改 Git Bash 的字体就能正常显示 Unicode 字符了。(start 是 cmd 所提供的命令)
  - start c://Windows//Fonts

### 美化主题

- Git Bash 自带的那一套主题我是不太喜欢的，所以我自己改了一套，在用户目录下创建 .minttyrc 并写入以下内容即可
- 注意：这个文件中的第一行设置了字体，此字体如果上面没有安装的话，就把这行删了，否则会报错
- vim ~/.minttyrc

```bash
Font=DejaVu Sans Mono for Powerline
FontHeight=14
Transparency=low
FontSmoothing=default
Locale=C
Charset=UTF-8
Columns=88
Rows=26
OpaqueWhenFocused=no
Scrollbar=none
Language=zh_CN

ForegroundColour=131,148,150
BackgroundColour=0,43,54
CursorColour=220,130,71

BoldBlack=128,128,128
Red=255,64,40
BoldRed=255,128,64
Green=64,200,64
BoldGreen=64,255,64
Yellow=190,190,0
BoldYellow=255,255,64
Blue=0,128,255
BoldBlue=128,160,255
Magenta=211,54,130
BoldMagenta=255,128,255
Cyan=64,190,190
BoldCyan=128,255,255
White=200,200,200
BoldWhite=255,255,255

BellTaskbar=no
Term=xterm
FontWeight=400
FontIsBold=no
```

- 你也可以在[这里](http://ciembor.github.io/4bit/)自己设计一套。

### 使用alias强化GitBash

- vim ~/.bash_profile

```bash
alias bashalias='code ~/.bash_profile'
alias bashcolor='code ~/.minttyrc'
alias bashconfig='code /etc/profile.d/git-prompt.sh'
alias gitconfig='code ~/.gitconfig'

alias .='cd ~'
alias ..='cd ..'
alias ...='cd ../..'
alias e='exit'
alias cls='clear'

alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'
alias gitauto='git add . && git commit -m "auto deploy" && git push'

alias sysoff='shutdown -s -t 0'
alias sysre='shutdown -r -t 0'

alias host='code /c/Windows/System32/drivers/etc/hosts'
```

### 使用 tmux 打造高效终端

- tmux 是终端复用神器，可以解决 Git Bash 没有多标签功能的问题

```bash
git clone https://github.com/xnng/bash.git

cd bash
cp tmux/bin/* /usr/bin
cp tmux/share/* /usr/share -r
```

- 创建配置文件支持鼠标拖动窗口分隔线

```bash
vim ~/.tmux.conf

setw -g mouse
set-option -g history-limit 20000
set-option -g mouse on
bind -n WheelUpPane select-pane -t= \; copy-mode -e \; send-keys -M
bind -n WheelDownPane select-pane -t= \; send-keys -M
```

- 如果你还不了解 tmux，建议看下掘金的[这篇文章](https://juejin.im/post/5a8917336fb9a0633e51ddb9)学习下。

### 在VSCode中使用Git-Bash

- 在 settings.json 中添加如下配置，其中 bash.exe 的路径 要改成自己的。

```JSON
{
  "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
  "terminal.integrated.shellArgs.windows": ["--login", "-i"],
}
```
