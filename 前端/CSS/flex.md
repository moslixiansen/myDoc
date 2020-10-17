# flex 布局

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [flex 布局](#flex-布局)
  - [容器元素](#容器元素)
  - [子项目](#子项目)
  - [flex 简写](#flex-简写)
    - [flex: none](#flex-none)
    - [flex: auto](#flex-auto)
    - [flex: 1](#flex-1)
    - [flex: 长度 or 百分比](#flex-长度-or-百分比)
    - [flex: 1 2](#flex-1-2)
    - [flex: 1 5%](#flex-1-5)

<!-- /code_chunk_output -->

## 容器元素

属性：

- flex-direction: row | column
- flex-wrap: wrap | no-wrap | wrap-reverse
- flex-flow: row wrap
- justify-content: flex-start | flex-end | center | space-between | space-around
- align-items: flex-start | flex-end | center | stretch | baseline
- align-content: flex-start | flex-end | center | stretch | space-between | space-around

## 子项目

属性：

- order: 排列顺序，越小越靠前
- flex-grow: 0，放大，默认不放大
- flex-shrink: 1, 缩小，默认等比缩小
- flex-basis: auto,在分配多余空间前,项目占主轴的空间,它的默认值为auto，即项目的本来大小。
- flex: 0 1 auto
- align-self: flex-start | flex-end | center | baseline | stretch

## flex 简写

### flex: none

等同于 flex: 0 0 auto

### flex: auto

等同于 flex: 1 1 auto

### flex: 1

当 flex 取值为一个非负数字，则该数字为 flex-grow 的值，flex-shrink 取1，flex-basis 取 0%

### flex: 长度 or 百分比

当 flex 取值为 长度 or 百分比，则视为 flex-basis 的值，flex-grow 取1，flex-shrink 取1

### flex: 1 2

当 flex 取值为两个非负数字，则分别视为 flex-grow 和 flex-shrink的值，flex-basis 取0%

### flex: 1 5%

当 flex 取值为1个非负数字和1个百分比，则分别视为 flex-grow 和 flex-basis的值，flex-shrink 取1

- [参考：阮一峰 - Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [参考：aliven1 - flex：1代表什么意思](https://blog.csdn.net/aliven1/article/details/78853725)