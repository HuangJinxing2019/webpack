class AsyncParallelHook { //异步并行
    constructor(args){
        this.tasks = [];
    }
    tapPromise(name,task){
        this.tasks.push(task)
    }
    promise(...args){

       let tasks = this.tasks.map(task=> task(...args))

        return Promise.all(tasks);

    }
}

let hook = new AsyncParallelHook(['name'])
let total = 0
hook.tapPromise('react',function (name) {

    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('react',name)
            resolve()
        },1000)
    })

})
hook.tapPromise('hjx',function (name) {
    return new Promise((resolve,reject)=>{
        console.log('hjx',name)
        resolve()
    })

})
hook.promise('hyh').then(function () {
    console.log('end')
});