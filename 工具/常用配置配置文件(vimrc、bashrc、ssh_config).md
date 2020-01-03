# 常用工具配置文件

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [vimrc](#vimrc)
- [bashrc](#bashrc)
- [ssh](#ssh)
  - [ssh长连接配置](#ssh长连接配置)
  - [ssh别名配置](#ssh别名配置)
- [windows Terminal](#windows-terminal)

<!-- /code_chunk_output -->

## vimrc

- 路径: /etc/vim/vimrc
- 配置:
  
``` vim
set number  "显示行号
set relativenumber  "显示相对行号
set autoindent  "按下下回车键后，下一行的缩进会自动跟上一行的缩进保持一致。
set softtabstop=2  "Tab 转转为多少个空格。
set cursorline  "光标标所在的当前行高亮。
syntax on  "打开语语法高亮。。自动识别代码，使用多种颜色显示。
```

- [参考: 阮一峰 Vim 配置入门](http://www.ruanyifeng.com/blog/2018/09/vimrc.html)

## bashrc

- 路径: ~/.bashrc
- 配置:

```vim
" bash 相关
alias bashalias='sudo vim ~/.bashrc'

" ssh 相关
alias sshconfig='sudo vim ~/.ssh/config'
alias hgxcs='ssh hgxcs'
alias hgxsc='ssh hgxsc'
alias hgxamdin='ssh hgxadmin'
alias vitacs='ssh vitacs'


" 常用配置
alias sshpub='cat ~/.ssh/id_rsa.pub'

" 常改配置
alias sshconfig='sudo vim ~/.ssh/config'
alias vimrc='sudo vim "/etc/vim/vimrc"'

" 常用命令
alias .='cd ~'
alias ..='cd ..'
alias ...='cd ../..'
alias e='exit'
alias cls='clear'
alias programs='cd /mnt/c/programs'
alias posapi='cd /mnt/c/programs/posapi'
alias posmall='cd /mnt/c/programs/posmall'
alias posadmin='cd /mnt/c/programs/posadmin/posadmin'
alias lana='cd /mnt/c/programs/lanaHelper'
alias linxun='cd /mnt/c/programs/linxun-uni'
alias hgxgj='cd /mnt/c/programs/HGS-Manager-Multiple'
alias hgxdoc='cd /mnt/c/programs/doc'

" git 相关
alias gs='git status'
alias ga='git add .'
alias gc='git cz'
alias gp='git push'
```

## ssh

### ssh长连接配置

- 路径: /etc/ssh/ssh_config
- 配置:

```bash
#     保持长连接
#   client每隔60秒发送一次请求给server，然后server响应，从而保持连接
    ServerAliveInterval 60
#   client发出请求后，服务器端没有响应得次数达到3，就自动断开连接，正常情况下，server不会不响应
    ServerAliveCountMax 3
```

### ssh别名配置

- 路径: ~/.ssh/config
- 配置:

```vim
Host hgxcs
   HostName 120.76.220.105
   Port         22
   User         root
   IdentityFile ~/.ssh/id_rsa

Host vitacs
   HostName 101.132.147.61
   Port         22
   User         root
   IdentityFile ~/.ssh/id_rsa

Host hgxsc
   HostName 47.112.26.176
   Port         22
   User         deploy
   IdentityFile ~/.ssh/id_rsa

Host hgxadmin
   HostName 120.76.78.227
   Port         22
   User         root
   IdentityFile ~/.ssh/id_rsa
```

## windows Terminal

```JavaScript

// To view the default settings, hold "alt" while clicking on the "Settings" button.
// For documentation on these settings, see: https://aka.ms/terminal-documentation

{
    "$schema": "https://aka.ms/terminal-profiles-schema",

    "defaultProfile": "{2c4de342-38b7-51cf-b940-2309a097f518}",

    "profiles":
    [
        {
		  "acrylicOpacity": 0.75, // 透明度
		  "closeOnExit": true, // 关闭的时候退出命令终端
		  "commandline": "C:\\Program Files\\Git\\bin\\bash.exe", // gitbash的命令行所在位置
		  "cursorColor": "#FFFFFF", // 光标颜色
		  "cursorShape": "bar", // 这个，还没发现啥作用
		  "fontFace": "Fira Code Medium", // 字体配置，如果你电脑没有这个字体就不要用这段配置了
		  "fontSize": 14, // 终端字体大小
		  "guid": "{1c4de342-38b7-51cf-b940-2309a097f679}", // 唯一的标识，这个记得改成和其他的终端不一样就行了，随便起一个
		  "historySize": 9001, // emmm
		  "icon": "C:\\Program Files\\Git\\bin\\gitBash.png", // git的图标，打开终端时候会看到
		  "name": "Bash", // tab栏的标题显示
		  "padding": "10, 10, 10, 10", // 边距
		  "snapOnInput": true, // emmm
		  "startingDirectory": "%USERPROFILE%", // gitbash 启动的位置（默认在C盘的用户里面的就是 ~ ）
		  "useAcrylic": false // 是否开启透明度
		},
        {
            // Make changes here to the powershell.exe profile
            "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
            "name": "Windows PowerShell",
            "commandline": "powershell.exe",
            "hidden": false
        },
        {
            // Make changes here to the cmd.exe profile
            "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
            "name": "cmd",
            "commandline": "cmd.exe",
            "hidden": false
        },
        {
            "guid": "{6f9994f0-4403-5e85-9cce-98e5da3839bb}",
            "hidden": false,
            "name": "Ubuntu-16.04",
            "source": "Windows.Terminal.Wsl"
        },
        {
            "guid": "{b453ae62-4e3d-5e58-b989-0a998ec441b8}",
            "hidden": false,
            "name": "Azure Cloud Shell",
            "source": "Windows.Terminal.Azure"
        },
        {
            "acrylicOpacity": 0.80, // 透明度
            "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
            "hidden": false,
            "name": "Ubuntu",
            "source": "Windows.Terminal.Wsl"
        }
    ],

    // Add custom color schemes to this array
    "schemes": [],

    // Add any keybinding overrides to this array.
    // To unbind a default keybinding, set the command to "unbound"
    "keybindings": 
    [
        {
            "command" : "closeTab",
            "keys" : 
            [
                "ctrl+w"
            ]
        },
        {
            "command" : "newTab",
            "keys" : 
            [
                "ctrl+t"
            ]
        },
        {
            "command" : "newTabProfile0",
            "keys" : 
            [
                "ctrl+shift+1"
            ]
        },
        {
            "command" : "newTabProfile1",
            "keys" : 
            [
                "ctrl+shift+2"
            ]
        },
        {
            "command" : "newTabProfile2",
            "keys" :
            [
                "ctrl+shift+3"
            ]
        },
        {
            "command" : "newTabProfile3",
            "keys" :
            [
                "ctrl+shift+4"
            ]
        },
        {
            "command" : "newTabProfile4",
            "keys" :
            [
                "ctrl+shift+5"
            ]
        },
        {
            "command" : "newTabProfile5",
            "keys" :
            [
                "ctrl+shift+6"
            ]
        },
        {
            "command" : "newTabProfile6",
            "keys" :
            [
                "ctrl+shift+7"
            ]
        },
        {
            "command" : "newTabProfile7",
            "keys" :
            [
                "ctrl+shift+8"
            ]
        },
        {
            "command" : "newTabProfile8",
            "keys" :
            [
                "ctrl+shift+9"
            ]
        },
        {
            "command" : "nextTab",
            "keys" :
            [
                "ctrl+tab"
            ]
        },
        {
            "command" : "openSettings",
            "keys" :
            [
                "ctrl+,"
            ]
        },
        {
            "command" : "prevTab",
            "keys" :
            [
                "ctrl+shift+tab"
            ]
        },
        {
            "command" : "scrollDown",
            "keys" :
            [
                "ctrl+shift+down"
            ]
        },
        {
            "command" : "copy",
            "keys" : 
            [
                "ctrl+c"
            ]
        },
        {
            "command" : "paste",
            "keys" : 
            [
                "ctrl+v"
            ]
        },
        {
            "command" : "scrollDownPage",
            "keys" : 
            [
                "ctrl+shift+pgdn"
            ]
        },
        {
            "command" : "scrollUp",
            "keys" : 
            [
                "ctrl+shift+up"
            ]
        },
        {
            "command" : "scrollUpPage",
            "keys" : 
            [
                "ctrl+shift+pgup"
            ]
        },
        {
            "command" : "switchToTab0",
            "keys" : 
            [
                "alt+1"
            ]
        },
        {
            "command" : "switchToTab1",
            "keys" : 
            [
                "alt+2"
            ]
        },
        {
            "command" : "switchToTab2",
            "keys" : 
            [
                "alt+3"
            ]
        },
        {
            "command" : "switchToTab3",
            "keys" : 
            [
                "alt+4"
            ]
        },
        {
            "command" : "switchToTab4",
            "keys" : 
            [
                "alt+5"
            ]
        },
        {
            "command" : "switchToTab5",
            "keys" : 
            [
                "alt+6"
            ]
        },
        {
            "command" : "switchToTab6",
            "keys" : 
            [
                "alt+7"
            ]
        },
        {
            "command" : "switchToTab7",
            "keys" : 
            [
                "alt+8"
            ]
        },
        {
            "command" : "switchToTab8",
            "keys" : 
            [
                "alt+9"
            ]
        }
    ]
}
```

- [参考: 将WSL2作为生产力工具](https://segmentfault.com/a/1190000021409814)