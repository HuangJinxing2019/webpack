let {AsyncSeriesWaterfallHook} = require('tapable') //串行瀑布的钩子异步

//注册方法tap()   同步方法
//注册方法tapAsyns() 异步方法

class Lesson {
    constructor(){
        this.hooks = {
            arch: new AsyncSeriesWaterfallHook(['name'])
        }
    }
    tap(){//注册监听函数
        this.hooks.arch.tapAsync('hjx',function (name,cd) {
            setTimeout(()=>{
                console.log('hjx',name)
                cd(null,'react')
            },1000)

        })
        this.hooks.arch.tapAsync('react',function (name,cd) {
            console.log('react',name)
            cd(null,'react')
        })
    }
    start(){
        this.hooks.arch.callAsync('hyh',function () {
            console.log('end')
        })
    }
}
let l = new Lesson();
l.tap();//注册这两个时间
l.start() //启动钩子