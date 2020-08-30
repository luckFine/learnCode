// 由于应用场景不同，在node中，应用需要处理网略协议，操作数据库，处理图片，接收上传文件等，在网络流和文件的操作中，还需要处理大量二进制数据
// javaScript自有的字符串远远不能满足这些需求，于是Buffer对象应运而生

// Buffer结构
// buffer与array很像，主要用于操作字节

// Buffer对象类似于数组，它的元素为16进制的两位数，
//Buffer 类的实例类似于从 0 到 255 之间的整数数组（其他整数会通过 ＆ 255 操作强制转换到此范围），但对应于 V8 堆外部的固定大小的原始内存分配。 Buffer 的大小在创建时确定，且无法更改。

// 不同编码的字符串，占用的元素个数也不相同，中文字在UTF-8下占用3个元素，字母和半角标点符号占用1个元素。同时，我们还可以调用length属性，得到buffer对象的长度，还可以通过下标访问元素。

// 创建一个长度为 10、且用零填充的 Buffer。
// const buf1 = Buffer.alloc(10);
// <Buffer 00 00 00 00 00 00 00 00 00 00>

// // 创建一个长度为 10、且用 01 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);
// <Buffer 01 01 01 01 01 01 01 01 01 01>


// // 创建一个长度为 10、且未初始化的 Buffer。
// // 这个方法比调用 Buffer.alloc() 更快，
// // 但返回的 Buffer 实例可能包含旧数据，
// // 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);
 //<Buffer d0 dd bf ef fe 7f 00 00 00 00>

// // 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]); //<Buffer 01 02 03>


// // 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést'); //<Buffer 74 c3 a9 73 74>
console.log(buf5);

// // 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
// const buf6 = Buffer.from('tést', 'latin1');


// 属性
// var buf = new Buffer(100)
// console.log(buf.length)
// console.log(buf[10])
// // 对buf[10]进行赋值
// buf[10]=88
// console.log(buf[10]) // => 88
// buf[20] = -100;
// console.log(buf[20]); // 156
// buf[21] = 300;
// console.log(buf[21]); // 44
// buf[22] = 3.1415;
// console.log(buf[22]); // 3
// 给元素的赋值如果小于0，就将该值逐次加256，直到得到一个0255之间的整数，如果得到赋值大于255，就逐次减256，直到得到0255区间内的数值。如果是小数，则舍弃小数部分，只保留整数部分

// buffer内存分配
// buffer不同v8申请内存，它通过node的c++模块申请内存。因此，buffer的内存策略是由c++申请内存，然后，在js中分配内存。因为，处理大量的字节数据不能采用需要一点内存就向操作系统申请一点内存的方式，这可能造成大量的内存申请的系统调用，对操作系统有一定压力。
// node采用了slab的分配机制，slab其实就是一块申请好的固定内存区域，它有3种状态：
// 1.full：完全分配状态
// 2.partial：部分分配状态
// 3.empty：没有被分配状态
// 当我们需要一个buffer对象时，可以通过：new Buffer(size);来申请内存和内存的大小，另外还有大内存和小内存的区分，例如，以buffer.poolsize = 8 *1024来分配，这样就得到了一个8kb的内存。node其实就是以8KB为界限来区分Buffer是大对象还是小对象的。底层的代码是Buffer.poolSize = 8 * 1024;
// 这个8kb的值也是每个slab的大小值，在js层面以他作为单位单元进行内存分配。
// 1.如果指定的buffer的大小小于8kb，node会按照小对象的方式进行分配。buffer的分配过程中主要使用一个局部变量pool作为中间处理对象，处于分配状态的slab单元都会指向他，以下是分配一个全新的slab单元的操作，他会将新申请的SlowBuffer对象指向它：


// 字符串转成buffer

// 字符串转成buffer对象主要是用过构造函数完成
// Buffer对象可以和字符串进行相互转换，支持的编码类型有：ASCII、UTF-8、UTF-16LE/UCS-2、Base64、Binary、Hex
// new Buffer(str, [encoding]);
// encoding默认为utf-8类型的编码和存储。同时，因此buffer记录的都是一个一个的二进制元素，
// 或者说是汇编码，因此，可以将不同类型的buffer写入到buffer对象内，但是，因为是不同类型转为的buffer，
// 因此，再转回字符串的时候也需要使用相同的编码规范，否则就会出现乱码的情况，因此，不建议将不同类型的编码写入到一个buffer对象中
// buf.write(string,[offset],[length],[encoding])

// buffer转字符串
// buf.toString([encoding], [start], [end])
// var buf = new Buffer('luckfine')
// buf.toString('UTF-8', 0, 8)
// console.log(buf.toString('UTF-8', 0, 5)); //luckf
// start和end是转换时候的起始位置，之前通过写入不同编码的那种方式写入到buffer对象里的二进制元素，就可以通过这个方式重新读出了，不过，还是不要这样使用为好。

















