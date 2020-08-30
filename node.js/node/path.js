// path 模块提供用于处理文件路径和目录路径的实用工具。 它可以使用以下方式访问：

const path = require('path');

// API方法和属性

// path.normalize(path) : 规范化路径
// path.join([...paths]) ：用于连接路径，这个方法的主要用途在于，会正确处理当前系统的路径分隔符，unix
// 系统是'/',window系统是'/'
// path.resolve([...paths]):方法将路径或路径片段的序列解析为绝对路径。

// path.isAbsolute(path):检测 path 是否为绝对路径。

// path.relative(from, to): 用于将路径转化成相对路径

// path.dirname(path)：返回 path 的目录名

// path.basename(path[, ext]) ： 返回 path 的最后一部分

// path.extname(path) ：返回path的扩展名

// path.format() ：方法从对象返回路径字符串





