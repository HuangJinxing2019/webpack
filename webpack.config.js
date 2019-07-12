let path = require('path')
let  webpack = require('webpack')
let  HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')//抽离css样式
let OptimizeCss = require('optimize-css-assets-webpack-plugin')//压缩css文件
// let Uglifyjs = require('uglifyjs-webpack-plugin')//压缩js文件
let TerserJSPlugin = require('terser-webpack-plugin')//压缩js文件
let CleanWebpackPlugin = require('clean-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')

//模块 happypack 可以实现多线程打包

let Happypack = require('happypack')

module.exports = {

    optimization: { //优化项
        minimizer: [
            new OptimizeCss({}),//压缩css文件
            new TerserJSPlugin({}),//压缩js文件
        ],
        splitChunks: {//抽离公用代码块
            cacheGroups: {//缓存组
                common:{ //公共的模块
                    chunks: 'initial',
                    minSize: 0,//文件最小值
                    minChunks: 2,//最小使用数
                },
                vendor:{//抽离第三方包模块
                    priority: 1, //权重 先抽离第三方在抽离公共的，不然会跟公共的同一个文件下
                    test: '/node_modules',//把你抽离出来
                    chunks: 'initial',
                    minSize: 0,//文件最小值
                    minChunks: 2,//最小使用数
                }
            }

        }
    },
    //webpack小插件
    //1)cleanWebpackPlugin
    //2)copyWebpackPlugin
    //3)bannerPlugin 内置
    mode: 'development',
    entry: './src/index.js',
    //1)源码映射会单独生成一个source-map文件出出错了会标识当前列和行
    //devtool: "source-map",//增加映射文件，可以调试源代码
    //2)不会产生单独的文件，但是可以显示行和列
    // devtool: "eval-source-map",
    //3) 不会产生列 但是是一个单独的映射文件,产生后你可以保留起来
    // devtool: "cheap-module-source-map",
    //4) 不会产生文件，集成在打包后的文件中，不会产生列
    // devtool: "cheap-module-eval-source-map",
    watch: true,//监听代码的改变
    watchOptions: {//监控的选项
        poll: 1000,//每秒问我一次
        aggregateTimeout:500, //防抖 我一直输入代码
        ignored: /node_modules/ //不需要进行监控那个文件

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {//解析第三方包common
        modules: [path.resolve('node_modules')],//在当前目下查找
        mainFields: ['style','main'],
        // mainFiles: [] //入口文件的名字 index.js
        // alias: {
        //     bootstrap: 'bootstrap/dist/css/bootstrap.css'
        // }
        //以上三种功能一致

        extensions: ['.js','.css','.json','.vue']//查找文件后缀，从左向右

    },
    devServer: { //开发服务器的配置
        hot: true, // 热更新操作
        port: 8080,
        contentBase: './dist',
        progress: true,
        open: true,

        //3)有服务端，不用代理来处理，能不在服务端中启动webpack，端口用服务器的端口
        //2)前端只想单纯模拟数据
        // before(app){
        //     app.get('/api/user',(req,res)=>{
        //         res.json({name:'huangjinxing-before'})
        //     })
        // },

        //1)
        // proxy:{
        //   '/api': {
        //       target:'http://localhost:3000', // 配置了一个代理（配置跨域）
        //       pathRewrite: {'/api':''} //url重写
        //   }
        // },
    },
    module: {
        noParse:/jquery/,//不去解析的jquery的关系
        rules: [

            {
                test: /\.html$/,   //引入打包后的图片地址
                use:'html-withimg-loader'
            },

            {
                test: /\.(png|jpg|gif)$/,
                //做一个限制，当我们的图片小于多少k的时候用base64来转化
                //否则用file-loader产生真实的图片
                use: {
                    loader:'url-loader',//file-loader也可以 一般不用
                    options: {
                        limit: 1, //设置图片限制大小
                        outputPath: '/img/',
                        // publicPath:'http://www.baidu,com' //加上前缀
                    }
                }
            },
            // {
            //     test: require.resolve('jquery'),//页面引入jquery是生成%对象 下面有更好的方案
            //     use: 'expose-loader?$'
            // },

            // {
            //     test: /\.js$/,
            //     use:{
            //         loader: 'eslint-loader',//js语法效验
            //         options: {
            //             enforce: 'prc' //强制优先执行
            //         }
            //     },
            //
            // },
            {
                test: /\.js$/,
                use: 'Happypack/loader?id=js',
                include: path.resolve(__dirname,'src'), //包括src下的js文件
                exclude: /node_modules/   //排除node_modules下的js文件
            },
            {  //css-loader接续@import这种语法， style-loader它是把css插入到head的标签中
                //loader的特点，希望单一
                //多个loader需要 []
                //loader的顺序 默认是从右向左执行 从下向上执行
                //loader还可以写成对象方式
                test: /\.css$/,
                use: [
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         insertAt: 'top'//样式插入顶部
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,//抽离一个文件main.css
                    'css-loader',
                    'postcss-loader',//给样式属性加上浏览器前缀 需要定义一个p ostcss.config.js配置文件 （cnpm install postcss-loader autoprefixer --save-dev）
                ],

            },
            {
                // 可以处理less文件    sass  stylus node-sass sass-loader
                // stylus stylus-loader
                test: /\.less$/,
                use: [
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         insertAt: 'top'//样式插入顶部
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,//抽离一个文件main.css
                    'css-loader',
                    'postcss-loader',//给样式属性加上浏览器前缀 需要定义一个p ostcss.config.js配置文件
                    'less-loader',//把less转为css文件
                ],
            },

        ]
    },
    // externals:{//打包时忽略
    //     jquery: '$'
    // },
    plugins: [// 放着所有的的webpack插件
        new Happypack({
            id: 'js',
            use:[{
                loader: "babel-loader",
                options: {//用babel-loader 需要把es6 转 es5
                    presets:[
                        '@babel/preset-env',//包含了es6 转 es5模块
                        '@babel/preset-react'
                    ],
                    plugins:[
                        [ '@babel/plugin-proposal-decorators',{'legacy':true}],
                        [ '@babel/plugin-proposal-class-properties',{'loose':true}],
                        ['@babel/plugin-transform-runtime'],
                        '@babel/plugin-syntax-dynamic-import',//实现懒加载
                    ],

                },

            },]
        }),

        new HtmlWebpackPlugin(
            {
                template: './src/index.html',
                filename: "index.html", //打包后的文件
                minify: { //压缩
                    // removeAttributeQuotes: true,//去除双引号
                    // collapseWhitespace: true,//变成一行
                },
                hash: true  //文件名后追加hash码
            }
        ),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new webpack.ProvidePlugin({//在每个模块中都注入$
            $:'jquery'
        }),
        // new CleanWebpackPlugin()
        // new CopyWebpackPlugin([
        //     {from:'./xxx',to:'./xxx'}
        // ])
        new webpack.BannerPlugin('make 2019 by hjx'),//版权注释
        new webpack.DefinePlugin({ //定义环境变量
            DEV:JSON.stringify('dev')
        }),
        new webpack.IgnorePlugin(/\.\/locale/,/moment/),//从moment中，如果引入了./locale/就把他忽略
        new webpack.DllReferencePlugin({ //动态连接库，打包查找dist/manifest.json下是否存在需要的文件 存在则不打包，
                                        // 不存在时才打包需要的文件
            manifest: path.resolve(__dirname,'dist','manifest.json')
        }),
        new webpack.NamedModulesPlugin({}), // 哪个模块更新了（打印更新的模块路径）
        new webpack.HotModuleReplacementPlugin()//热更新插件
    ]
}