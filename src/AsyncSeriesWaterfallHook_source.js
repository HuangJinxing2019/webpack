class AsyncSeriesWaterfallHook { //异步并行
    constructor(args){
        this.tasks = [];
    }
    tapAsync(name,task){
        this.tasks.push(task)
    }
    callAsync(...args){
        let finalCallback = args.pop()//拿出最终的函数
        let index = 0
        let next = (err,data) =>{

            let task = this.tasks[index++];
            if(!task){
                return finalCallback()
            }
            if(index===0){
                task(...args,next)
            }else {
                task(data,next)
            }
        }
        next();


    }
}

let hook = new AsyncSeriesWaterfallHook(['name'])
let total = 0
hook.tapAsync('react',function (name,cd) {
    setTimeout(()=>{
        console.log('react',name)
        cd(null,'结果')
    },1000)

})
hook.tapAsync('hjx',function (name,cd) {
    console.log('hjx',name)
    cd(null,'结果')
})
hook.callAsync('hyh',function () {
    console.log('end')
});