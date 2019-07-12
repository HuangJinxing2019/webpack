let {SyncHook} = require('tapable')
class Lesson {
    constructor(){
        this.hooks = {
            arch: new SyncHook(['name'])
        }
    }
    tap(){//注册监听函数
        this.hooks.arch.tap('hjx',function (name) {
            console.log('hjx',name)
        })
        this.hooks.arch.tap('react',function (name) {
            console.log('react',name)
        })
    }
    start(){
        this.hooks.arch.call('hyh')
    }
}
let l = new Lesson();
l.tap();//注册这两个时间
l.start() //启动钩子