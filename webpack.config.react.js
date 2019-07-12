let path = require('path')  //打包react react-dom
let webpack = require('webpack')
module.exports = {
    mode:'development',
    entry: {
        react: ['react','react-dom'],
    },
    output: {
        filename: "_dll_[name].js",
        path: path.resolve(__dirname,'dist'),
        library: '_dll_[name]',//接收输出的结果
        // libraryTarget: 'commonjs',//当前的结果以export的方式输出
    },
    plugins: [
        new webpack.DllPlugin({ //name==_dll_[name]
            name: '_dll_[name]',
            path: path.resolve(__dirname,'dist','manifest.json')
        })
    ]
}