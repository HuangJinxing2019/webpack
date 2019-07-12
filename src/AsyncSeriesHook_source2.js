class AsyncSeriesHook { //异步并行
    constructor(args){
        this.tasks = [];
    }
    tapPromise(name,task){
        this.tasks.push(task)
    }
    promise(...args){
        let [first,...others] = this.tasks
        return others.reduce((p,n)=>{
           return  p.then(() => n(...args))
        },first(...args));

       let tasks = this.tasks.map(task=> task(...args))

        return Promise.all(tasks);

    }
}

let hook = new AsyncSeriesHook(['name'])
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