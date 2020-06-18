const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry:'./src/index.tsx',
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'main.js'
    },
    resolve:{
        extensions:['.ts','.tsx','.js']
    },
    devServer:{
        contentBase:'./dist'
    },
    module:{
        rules:[
            {
                test:/\.tsx?/,
                use:'ts-loader',
                exclude:/mode_modules/
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns:['./dist']
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
}