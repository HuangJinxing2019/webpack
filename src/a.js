
module.exports = 'hjx'
require('@babel/polyfill')//编译高级语法 如（'aaa'.includes('a')）
class B {

}

function* gen(params) {
    yield 1;
}
console.log(gen().next(),'gen')


'aaa'.includes('a')