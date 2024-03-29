/**
 * 模块分类及加载流程
 *
 * 模块分类：
 *  内置模块
 *  文件模块
 *
 * 模块加载速度：
 *  核心模块：Node源码编译时写入到二进制文件中
 *  文件模块：代码运行时，动态加载
 *
 *  加载流程
 * 路径分析：一句标识符确定模块位置
 * 文件定位：确定目标模块中具体的文件及文件类型
 * 编译执行：采用对应的方式完成文件的编译执行
 *
 * 路径分析：
 * 路径：
 * 非路径：非路径常见于核心模块
 *
 * 文件定位
 * require('m1')
 * m1.js > m1.json > m1.node
 * 都没有找到 就会当成一个包处理，查找package.json文件，使用JSON.parse()解析
 *
 * 编译执行
 * 将某个具体类型的文件按照相应的方式进行编译和执行
 * 创建新对象，按路径载入，完成编译执行
 * js文件编译执行
 * 使用fs模块同步读入目标文件内容、对内容进行语法包装，生成可执行的js函数、调用函数时传入exports、module、require等属性值
 *
 * json文件编译执行
 * 将读取的内容通过JSON.parse()进行解析
 *
 * 缓存优化原则
 * 提高模块加载速度
 * 当前模块不存在，则经历一次完成加载流程
 * 模块加载完成后，使用路径作为索引进行缓存
 *
 * 加载流程霞小结
 * 路径分析：确定模模块位置
 * 文件定位：确定目标模块中的具体文件
 * 编译执行：对模块内容进行编译，返回可用的exports对象
 */
