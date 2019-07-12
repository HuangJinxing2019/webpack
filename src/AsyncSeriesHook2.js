let {AsyncSeriesHook} = require('_tapable@1.1.3@tapable') //串行的钩子异步

//注册方法tap()   同步方法
//注册方法tapAsyns() 异步方法

//tap库中有三种注册方法 tap()同步方法  tapAsyns()异步方法 tapPromise注册的是promise

//call  callAsync callPromise

class Lesson {
    constructor(){
        this.hooks = {
            arch: new AsyncSeriesHook(['name'])
        }
    }
    tap(){//注册监听函数
        this.hooks.arch.tapPromise('hjx',function (name,cd) {
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    console.log('hjx',name)
                    resolve()
                },1000)

            })

        })
        this.hooks.arch.tapPromise('react',function (name,cd) {
            return new Promise((resolve,reject)=>{
                console.log('react',name)
                resolve()
            })

        })
    }
    start(){
        this.hooks.arch.promise('hyh').then(function () {
            console.log('end')
        })
    }
}
let l = new Lesson();
l.tap();//注册这两个时间
l.start() //启动钩子