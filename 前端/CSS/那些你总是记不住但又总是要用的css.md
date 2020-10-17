# 目录

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [目录](#目录)
  - [input](#input)
    - [设置input 的placeholder的字体样式](#设置input-的placeholder的字体样式)
    - [设置input聚焦时的样式](#设置input聚焦时的样式)
    - [取消input的边框](#取消input的边框)
  - [隐藏滚动条或更改滚动条样式](#隐藏滚动条或更改滚动条样式)
  - [文字超出隐藏并显示省略号](#文字超出隐藏并显示省略号)
  - [单行（一定要有宽度）](#单行一定要有宽度)
    - [多行](#多行)
  - [控制div内的元素自动换行](#控制div内的元素自动换行)
  - [纯css画三角形](#纯css画三角形)
  - [绝对定位元素居中（水平和垂直方向）](#绝对定位元素居中水平和垂直方向)
  - [表格边框合并](#表格边框合并)

<!-- /code_chunk_output -->

## input

### 设置input 的placeholder的字体样式

```css
input::-webkit-input-placeholder {    /* Chrome/Opera/Safari */
    color: red;
}
input::-moz-placeholder { /* Firefox 19+ */  
    color: red;
}
input:-ms-input-placeholder { /* IE 10+ */
    color: red;
}
input:-moz-placeholder { /* Firefox 18- */
    color: red;
}
```

### 设置input聚焦时的样式

```css
input:focus {
  background-color: red;
}
```

### 取消input的边框

```css
border: none;
outline: none;
```

## 隐藏滚动条或更改滚动条样式  

```css
/*css主要部分的样式*//*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
    width: 10px; /*对垂直流动条有效*/
    height: 10px; /*对水平流动条有效*/
}

/*定义滚动条的轨道颜色、内阴影及圆角*/
::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: rosybrown;
    border-radius: 3px;
}

/*定义滑块颜色、内阴影及圆角*/
::-webkit-scrollbar-thumb{
    border-radius: 7px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #E8E8E8;
}

/*定义两端按钮的样式*/
::-webkit-scrollbar-button {
    background-color:cyan;
}

/*定义右下角汇合处的样式*/
::-webkit-scrollbar-corner {
    background:khaki;
}
```

## 文字超出隐藏并显示省略号

## 单行（一定要有宽度）

```css
{
  width:200rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### 多行

```css
{
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

## 控制div内的元素自动换行

```css
{
  word-wrap: break-word;
  word-break：break-all;
}
```

## 纯css画三角形

```css
/* border-width 都相等时，是一个等腰直角三角形 */
.demo {
    width: 0;
    height: 0;
    border-width: 20px;
    border-style: solid;
    border-color: transparent transparent red transparent;
}

/* 等边 */
.demo {
  width: 0;
  height: 0;
  border-width: 141px 100px 141px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}

/*扇形*/
.demo{
  width: 0;
  height: 0;
  border-width: 141px 100px 141px;
  border-style: solid;
  border-color: transparent transparent red transparent;
  border-radius: 100px;
}

```

## 绝对定位元素居中（水平和垂直方向）

```css
#demo {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: green;
}
```

## 表格边框合并

```css
table,tr,td{border: 1px solid #333;}
table{
  border-collapse: collapse;
}
```

- [参考：kuangyaoqian-那些你总是记不住但又总是要用的css](https://juejin.im/post/6869659680496041991#heading-0)