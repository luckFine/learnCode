class ChunkMap {
    constructor() {
        console.log('插件被使用额')
    }
    apply(compiler) {
        // compiler.hooks.emit.tap('compilation', (compilation) => {
        //     // compilation.assets为compilation里的静态资源
        //     // 如果需要加的话就直接在assets中挂在js  compilation.assets['a.txt']
        //     console.log(c)
        // })

        compiler.hooks.emit.tap('normalModuleFactory', (compilation) => {
            // compilation.assets为compilation里的静态资源
            // 如果需要加的话就直接在assets中挂在js  compilation.assets['a.txt']
            console.log(compilation)
        })
    }
}
module.exports = ChunkMap