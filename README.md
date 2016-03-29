# ScrollingText 概述
主要实现页面中列表的水平或垂直滚动效果，采用最小的资源开销，显示列表。可通过参数控制自动滚动和手动翻滚操作。

- 依赖说明
- HTML结构说明
- 初始化方法参数说明
- 控制接口说明
- 更新说明

### 依赖说明
需要使用jquery 1.7 以上版本

### HTML结构说明
HTML结构要求比较简单，主要是控制UL列表移动，并实时删除和添加li元素。所以结构如下：

```
<ul id="listContainer">
    <li></li>
    <li></li>
    ...
    <li></li>
</ul>

```
元素UL的ID号是必须的。当然CSS样式需要自己定义好，即可。

### 初始化方法说明

0.1版本的参数直接通过初始化函数传入：
```
rollObj.init = function(_containerName, _showNum, _timeInterval, _listHeight, _animateSpeed, _dir, _auto, _horizontal){
    ...
}
```
- ``` _containerName ``` 容器的UL的ID。
- ```_showNum``` 显示元素数量，滚动列表显示1-n个元素
- ```_timeInterval``` 自动滚动的触发时间间隔，单位毫秒
- ```_listHeight``` 列表的之间的间隔。也可以理解为每次移动的间隔
- ```_animateSpeed``` 列表每次移动的速度。单位毫秒
- ```_dir``` 移动的正反方向
- ```_auto``` 是否自动滚动
- ```_horizontal``` 水平还是垂直滚动

### 控制接口说明：
控制接口，只在_auto参数为false状态下有用，不自动滚动的状态下，可以使用手动操作。左右滚动或上下滚动```rollObj.next()``` 方法和 ```rollObj.pre()```方法。

### 使用说明：

```
var notic = rollTextControl.createObj();
    notic.init("notice_task_container_id", 3, 3000, 40, 1000, -1, true, true);//初始化

```

# 更新说明
v0.1 第一个版本，基本功能是实现的，代码结构和功能还有待进一步优化。

v0.2 添加了水平滚动，和手动操作

