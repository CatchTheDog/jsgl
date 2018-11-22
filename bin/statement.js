//可以使用{}将多条语句包含起来构成符合语句
//空语句 ;
let a = [1, 2, 34, 545, 45]
for (let i = 0; i < a.length; a[i++] = 0) ;//使用空语句
//函数定义不能出现在if/while/其他任何语句中，只能出现在锁嵌套函数的顶部。
//函数声明语句中的函数名时一个变量名，变量指向函数对象；函数定义语句中的函数被“提前”到脚本或者函数的顶部。变量提升只将
// 变量声明提前，但是函数声明提前则是将函数声明和函数体都提前。
//switch使用 ===运算符进行比较;case 关键字后可以跟随任意的表达式，但是建议使用数字和字符串直接量。

//循环语句：while do/while for  for/in(用于遍历对象属性)
// for(variable in object)
//     statement;
//在执行for/in语句的过程中，首先计算object表达式，若表达式置为null或者undefined，则跳过循环并继续执行后续代码；
//如果表达式等于一个原始值，此原始值将会被转换为与之对应的包装对象；否则(object是对象)，则依次枚举对象属性。
//在每次循环前，都会先计算variable表达式的值，并将属性名赋值给它。
let o = {x: 1, y: 2, z: 3};
let b = [], i = 0;
for (b[i++] in o) ;//在每次循环前，将属性名赋值给variable.
for (let e of b) {
    console.log(e);
}
//跳转到标签
//break 立即退出最内层的循环或者switch语句
let token = {};
// mainloop: while (null != token){
//     continue mainloop;//停止执行本次循环，转而执行下一次循环；continue只能在循环体内使用，可以跳出多层次嵌套的循环逻辑。
//     break mainloop; //跳转到这个标签锁标识的语句块的结束，或者直接终止这个闭合语句块的执行。但是跳转不能越过函数边界，不能从函数内部通过标签跳转到函数外部。
// }
//在不同的循环中，continue表现不同：
//在while中，在循环开始处指定的expression会重复检测循环体从头执行。
//在do/while中，程序的执行直接跳到循环结尾处，重新判断循环条件，然后继续下一次循环。
//在for中，首先计算自增表达式，然后再次检测test表达式，判断是否继续执行循环。
//在for in中，循环开始遍历下一个属性名，并将此属性名赋给变量。
//catch子句 中的标志符具有块级作用域，它只在catch块中可见。
//当由于return/continue/break语句跳出try语句块时，在执行新的目标代码之前先执行finally块中的逻辑；
//如果finally块使用了return,continue,break或者throw语句使程序发生跳转，或者通过调用了抛出异常的方法改变了程序执行流程，不管
//这个跳转使程序挂起还是继续执行，都会被忽略。

//with语句   只有在查找标志符时才会用到作用域链，创建新变量不会使用作用域链。
//with语句用于临时扩展作用域链
//with语句将object对象添加到作用域链的头部，然后执行statement,最后把作用域链恢复到初始状态。
// with(object)
// statement

//debugger语句
//debugger语句用来产生一个断点，代码的执行会停止在断点的位置。
function f(o) {
    if (o === undefined) debugger; //代码暂停在此处  只有在调试器启用时，此语句才有效。
}

let x = f(undefined);
console.log(x);

//use strict 是一条指令，其后代码会被解析为严格代码。