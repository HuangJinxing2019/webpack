// import $ from 'jquery'//expose-loader暴露jquery 还有更好的方式
// require('./index.css')
// require('./b.less')
// // require('./a.js')
//
// console.log($,'$')
// let fn =() =>{
//     console.log("-===-=-=--=-=-")
// }
// fn()
//
// @log
// class A {
//     a = 1
// }
// let a = new A()
// console.log(a.a,'aaaa')
//
// function log(target) {
//     console.log(target,123)
// }
//======================================================================================================================
//webpack打包我们的图片
//1)在js中创建图片来引入
//file-loader 默认会在内部生成一张图片，到build的目录下，把生成的图片的名字返回回来
// import urlstr from './images/123.png';//把图片引入 返回的结果是一个新的图片地址
// let image = new Image();
// image.src = urlstr
// document.body.appendChild(image)
// console.log("11111")
//=====================================================================================================
let xhr = new XMLHttpRequest();
xhr.open('GET','/user',true);
xhr.onload = function () {
    console.log(xhr.response)
}
xhr.send();

//=======================================================================================

require('bootstrap')
import moment from 'moment' //时间格式化包
//手动引入所需要的语言
import 'moment/locale/zh-cn';


moment.locale('zh-cn')//设置语言

let r = moment().endOf('day').fromNow();//打印相对时间

console.log(r,'时间')


let React = require('react')
let {render} = require('react-dom')


render(<h1>jsx</h1>,window.root)


//webpack 自带优化
//1)import 在生产环境下 会自动去除掉没用的代码 把没用的代码自动删除 require则不会


//scope hosting 作用域提升 自动省略可以简化的代码

//===============================================================================

//懒加载
// let button = document.createElement('button')
// button.innerHTML = '懒加载'
// button.addEventListener('click',function () {
//     //es6 草案中的语法 jsonp实现动态加载文件
//     import('./source.js').then(data=>(
//         console.log(data)
//     ))
//
// })
//
// document.body.appendChild(button)

//==========================================================================================================
//热更新的配置方式
import str from './source'

console.log(str)
if(module.hot){
    module.hot.accept('./source',()=>{
        let str = require('./source')
        console.log(str)
    })
}
