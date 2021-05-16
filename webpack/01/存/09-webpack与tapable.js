/*
webpack编译流程

配置初始化
内容编译
输出编译后内容

以上过程可以看做是事件驱动型事件流工作机制

这个机制可以将不同的插件串联起来，最后再完成着所有的工作
其中最为核心的就是负责编译的complier、和负责创建bundles的compilation

complier和compilation 其实都是tabable的实例对象

tabable本身就是一个库，在webpack中有大量的使用

核心流程：
实例化hook注册事件监听
使用hook触发事件监听
执行懒编译生成的可执行的代码

hook本质是tapable实例对象
hook执行机制可分为同步和异步

hook：普通钩子，监听器之间互相独立不干扰
BailHook：熔断钩子，某个监听返回非undefined时后续不执行
waterfallHook：瀑布钩子，上一个监听的返回值可传递给下一个
loopHook：循环钩子，如果当前未返回false则一直执行

tapable库同步钩子
SyncHook
SyncBailHook
SyncWaterfallHook
SyncLoopHook

tapable库异步串行钩子
AsyncSeriesHook
AsyncSeriesBailHook
AsyncSeriesWaterfallHook

tapable库异步并行钩子
AsyncParalleHook
AsyncparallBailHook





*/