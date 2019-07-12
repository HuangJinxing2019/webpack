class AsyncSeriesHook { //异步并行
    constructor(args){
        this.tasks = [];
    }
    tapAsync(name,task){
        this.tasks.push(task)
    }
    callAsync(...args){
        let finalCallback = args.pop()//拿出最终的函数
        let index = 0

        let next = () =>{
            if(index === this.tasks.length){
                return finalCallback();
            }
            let task = this.tasks[index++];
            task(...args,next);
        }
        next();


    }
}

let hook = new AsyncSeriesHook(['name'])
let total = 0
hook.tapAsync('react',function (name,cd) {
    setTimeout(()=>{
        console.log('react',name)
        cd()
    },1000)

})
hook.tapAsync('hjx',function (name,cd) {
    console.log('hjx',name)
    cd()
})
hook.callAsync('hyh',function () {
    console.log('end')
});