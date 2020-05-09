# 常用工具配置文件

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
set nocompatible              " be iMproved, required
filetype off                  " required
" set the runtime path to include Vundle and initialize
" set rtp+=~/.vim/bundle/Vundle.vim
" call vundle#begin()
" Plugin 'VundleVim/Vundle.vim'
" Plugin 'tpope/vim-fugitive'
" Plugin 'tpope/vim-surround'
" Plugin 'EasyMotion'
" Plugin 'jnurmine/Zenburn'
" call vundle#end()            " required
" filetype plugin indent on    " required
" "
" colors zenburn
syntax enable
syntax on " 自动语法高亮
set number "显示行号
set relativenumber "显示相对行号
set shiftwidth=4
set tabstop=4 "表示Tab代表4个空格的宽度
set expandtab "表示Tab自动转换成空格
set autoindent "表示换行后自动缩进
set smartindent "智能对齐
set hlsearch
```

- [参考: 阮一峰 Vim 配置入门](http://www.ruanyifeng.com/blog/2018/09/vimrc.html)

## bashrc

- 路径: ~/.bashrc
- 配置:

```bash
# bash 相关
alias bashalias='sudo vim ~/.bashrc'

# ssh 相关
alias sshconfig='sudo vim ~/.ssh/config'
alias hgxcs='ssh hgxcs'
alias hgxsc='ssh hgxsc'
alias hgxamdin='ssh hgxadmin'
alias vitacs='ssh vitacs'

# 常用配置
alias sshpub='cat ~/.ssh/id_rsa.pub'
alias .='cd ~'
alias ..='cd ..'
alias ...='cd ../..'
alias e='exit'
alias cls='clear'
alias ll='ls -al'
alias my='cd /c/programs/my'
alias hgs='cd /c/programs/hgs'
alias posapi='cd /c/programs/hgs/posapi'
alias polaris='cd /c/programs/hgs/polaris'
alias posadmin='cd /c/programs/hgs/posadmin/posadmin'

# 常改配置
alias gitconfig='vim ~/.gitconfig'
alias sshpub='cat ~/.ssh/id_rsa.pub'
alias sshconfig='sudo vim ~/.ssh/config'
alias vimrc='sudo vim "~/.vimrc"'
# alias vimrc='vim "/c/Program Files/Git/etc/vimrc"'

# git 相关
alias gs='git status'
alias ga='git add .'
alias gc='git cz'
alias gp='git push'

# tmux 相关
alias tls='tmux ls'

alias tnhgxcs='tmux new -s hgxcs'
alias tnhgxsc='tmux new -s hgxsc'
alias tnvitacs='tmux new -s vitacs'
alias tnhgxadmin='tmux new -s hgxadmin'
alias tnposadmin='tmux new -s posadmin'

alias tahgxcs='tmux a -t hgxcs'
alias tahgxsc='tmux a -t hgxsc'
alias tavitacs='tmux a -t vitacs'
alias tahgxadmin='tmux a -t hgxadmin'
alias taposadmin='tmux a -t posadmin'

alias tkhgxcs='tmux kill-session -t hgxcs'
alias tkhgxsc='tmux kill-session -t hgxsc'
alias tkvitacs='tmux kill-session -t vitacs'
alias tkhgxadmin='tmux kill-session -t hgxadmin'
alias tkposadmin='tmux kill-session -t posadmin'



alias sysoff='shutdown -s -t 0'
alias sysre='shutdown -r -t 0'

alias host='vim /c/Windows/System32/drivers/etc/hosts'

# ssh相关
alias hgxcs='ssh hgxcs'
alias aliyun='ssh aliyun'
alias hgxsc='ssh hgxsc'
alias hgxadmin='ssh hgxadmin'
alias vitacs='ssh vitacs'
alias vultr='ssh vultr'

# 防止 git log 中文乱码
export LANG="zh_CN.UTF-8"
export LC_ALL="zh_CN.UTF-8"
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

```Json
// To view the default settings, hold "alt" while clicking on the "Settings" button.
// For documentation on these settings, see: https://aka.ms/terminal-documentation

{
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "defaultProfile": "{1c4de342-38b7-51cf-b940-2309a097f679}",
    "confirmCloseAllTabs": false, //是否弹出确认关闭所有窗口
    "initialCols": 200, //窗口行宽
    "initialRows": 50, //窗口列宽
    "profiles":
    [
        {
            "guid": "{1c4de342-38b7-51cf-b940-2309a097f679}",
            "name": "Bash",
            "icon": "C:\\Program Files\\Git\\bin\\gitBash.png", // git的图标，打开终端时候会看到
            "commandline": "C:\\Program Files\\Git\\bin\\bash.exe",
            "hidden": false
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
            "keys": ["ctrl+shit+w"], 
            "command": {"action": "closePane", "split": "vertical"}
        },
        {
            "keys": ["ctrl+shift+v"], 
            "command": {"action": "splitPane", "split": "vertical"}
        },
        {
            "keys": ["ctrl+shift+h"], 
            "command": {"action": "splitPane", "split": "horizontal"}
        },
        {
            "keys": ["ctrl+f"],
            "command": "find"
        },
        {
            "command" : "nextTab",
            "keys" : 
            [
                "ctrl+tab"
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
            "command" : "openSettings",
            "keys" : 
            [
                "ctrl+,"
            ]
        },
        // {
        //     "command" : "copy",
        //     "keys" : 
        //     [
        //         "ctrl+c"
        //     ]
        // },
        // {
        //     "command" : "paste",
        //     "keys" : 
        //     [
        //         "ctrl+v"
        //     ]
        // },
        // {
        //     "keys": ["pgup"], //Content pgup
        //     "keys": ["ctrl+shift+pgup"], //Window pgup
        //     "command": "scrollUpPage"
        // },
        // {
        //     "keys": ["pgdn"], //Content pgup
        //     "keys" :["ctrl+shift+pgdn"], //Window pgdn
        //     "command": "scrollDownPage",
        // },
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