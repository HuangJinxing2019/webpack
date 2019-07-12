class AsyncParallelHook { //异步并行
    constructor(args){
        this.tasks = [];
    }
    tapAsync(name,task){
        this.tasks.push(task)
    }
    callAsync(...args){
        let finalCallback = args.pop()//拿出最终的函数
        let index = 0
        let done = () => {
            index++
            if(index === this.tasks.length){
                finalCallback();
            }
        }
        this.tasks.forEach(task=>{
            task(...args,done);
        })


    }
}

let hook = new AsyncParallelHook(['name'])
let total = 0
hook.tapAsync('react',function (name,cd) {
    setTimeout(()=>{
        console.log('react',name)
        cd()
    },1000)

})
hook.tapAsync('hjx',function (name,cd) {
    cd()
    console.log('hjx',name)
})
hook.callAsync('hyh',function () {
    console.log('end')
});