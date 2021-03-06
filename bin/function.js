//函数声明语句不能出现在循环、条件判断、try/catch/finally、with语句块中
//函数表达式可以出现在任何地方
//函数嵌套于其他函数中定义，可以访问当被定义时所处的作用域中的任何变量 —— 闭包。
//以表达式来定义函数只适用于它作为一个大的表达式的一部分，比如在赋值和调用过程中定义函数。
// 函数声明语句会被提升；函数表达式不会被提前（变量定义会被提前）。
//函数可以嵌套在其他函数里
//嵌套函数的诡异之处在于它的变量作用域规则：它们可以访问嵌套它们（或多重嵌套）的函数的参数和变量。
function hypotenuse(a, b) {
    function square(x) {
        //嵌套函数可以访问其外层函数中的参数和变量
        console.log(a, b);
        return x * x;
    }

    return Math.sqrt(square(a) + square(b));
}

//函数表达式在定义后可以立即执行
let tensquared = (function (x) {
    return x * x;
}(10));

//调用函数四种方式：
//  作为函数
//  作为方法
//  作为构造函数
//  通过call和apply()方法间接调用
//非严格模式下，函数调用上下文（函数中this）是全局对象；严格模式下为undefined
let isStrict = (function () {
    return !this;
}());
console.log(isStrict);
//方法与函数调用的区别在调用上下文。
//方法链：前一个方法的返回值是一个对象，这个对象可以再调用其他的方法，这种方法调用序列组成方法链。
//可以通过在方法中返回this，进行“链式调用”风格的编程。
//this是关键字，不允许给this赋值；this没有作用域限制，嵌套的函数不会从调用它的函数中继承this.
//如果嵌套函数作为方法调用，其this的值指向调动它的对象。如果嵌套函数作为函数调用，其this值不是全局对象就是undefined.
let x = {
    m: function () {
        let self = this;
        console.log(this === x);
        f();  //作为函数调用
        function f() {
            console.log(this === x); //嵌套函数作为函数调用，this值是全局对象或者undefined
            console.log(self === x);
        }
    }
};
x['m']();
//使用数组访问时，this
let func_array = [function () {
    console.log(this === func_array);
}];
func_array[0]();
//如果构造函数无参数，则调用时允许省略括号。构造函数中this（调用上下文）指代新创建的对象。
//构造函数不能使用return.如果显式使用return返回一个对象，则构造函数返回值就是此对象；如果返回原始值，则忽略。
//函数调用不检查传入的形参个数：如果在调用时传入的参数比形参个数少，则未传入的参数值均为undefined.
//所以在函数定义时对于一些可选参数应该赋予适当的默认值,且可选参数定义在实参列表最后，使用/*optional*/来强调形参可选。
function getPropertyNames(o, a) {
    if (a === undefined) a = [];  //设置默认值  a = a || [];
    for (let prop in o) a.push(prop);
    return a;
}

//可变长实参列表：使用arguments对象获取函数实参。不定实参函数的实参个数不能为0.
//除了将实参作为数组元素外，arguments还定义了callee、caller属性，callee指代当前正在执行的函数;caller指代调用当前正在执行的函数的函数。
//通过caller可以访问调用栈；callee属性可以用于在匿名函数中递归调用自身。
let factorial = function (x) {
    if (x <= 1) return 1;
    return x * arguments.callee(x - 1);
};
//间接调用
//Function.call(),Function.apply();
function flexisum(a) {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        let element = arguments[i], n;
        if (element == null) continue;
        if (Array.isArray(element))
            n = flexisum.apply(this, element);
        else if (typeof element === 'function')
            n = Number(element());
        else
            n = Number(element);
        if (isNaN(n))
            throw Error(`flexisum(): can't convert ${element} to number.`)
        total += n;
    }
    return total;
}

console.log(flexisum([1, 2, 3, [1, 2, 3]]));

//javascript中，可以将函数赋值给变量，存储在对象的属性或数组的元素中，作为参数传入另一个函数中。
//函数不是原始值，而是一种特殊的对象，函数也可以拥有属性。当函数需要一个变量在调用时保持某个值不变时，可以为函数定义一个属性保持此值。
uniqueInteger.counter = 0; //每次调用函数都返回递增的整数
function uniqueInteger() {
    return uniqueInteger.counter++;
}

//可以使用闭包重写
let uniqueInteger_1 = (function () {
    let counter = 0;
    return function () {
        return counter++;
    };
}());

//使用自身缓存计算中间结果，使计算更快。
function factorial_1(n) {
    if (isFinite(n) && n > 0 && n == Math.round(n)) {
        if (!(n in factorial_1))
            factorial_1[n] = n * factorial_1(n - 1);
        return factorial_1[n];
    }
    else return NaN;
}

factorial_1[1] = 1;
console.log(factorial_1(100));

//在javascript中不存在块作用域（ES6之前，ES6中引入的let是块作用域）;
//在函数中定义的变量在整个函数中都是可见的，所以可以定义一个函数作为临时的命名空间，在此命名空间中顶一个的变量不会污染到全局命名空间。
//使用匿名立即执行函数定义一个命名空间
let extend = (function () {
    for (let p in {toString: null}) {
        //返回一个函数
        return function extend(o) {
            for (let i = 1; i < arguments.length; i++) {
                let source = arguments[i];
                for (let prop in source) o[prop] = source[prop];
            }
            return o;
        };
    }
    /**
     * for/in 无法运行，则返回补丁版本
     */
    return function patched_extend(o) {
        for (let i = 1; i < arguments.length; i++) {
            let source = arguments[i];
            let prop;
            for (prop in source) o[prop] = source[prop];
            for (let j = 0; j < protoprops.length; j++) {
                prop = protoprops[j];
                if (source.hasOwnProperty(prop)) o[prop] = source[prop];
            }
        }
        return o;
    };
    let protoprops = ['toString', 'valueOf', 'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumberable', 'toLocaleString'];
}());

//闭包
//函数对象可以通过作用域链相互关联起来，函数体内部的变量都可以保存在函数作用域内；这种特性在计算机科学文献中称为闭包。
//当一个函数嵌套另一个函数，外部函数将嵌套的函数对象作为返回值返回时，内部函数调用时闭包所指向的作用域链和定义函数时的作用域链不是同一个作用域链。
var scope = 'global scope';

function checkscope() {
    var scope = 'local scope';

    function f() {
        return scope;
    }

    return f;
}

console.log(checkscope()());  //local scope
//闭包可以捕捉到它定义时的作用域链中的局部变量，并一一保存下来，在执行时，仍然使用它定义时的作用域链。
//也就是说函数定义时的作用域链，在函数执行时依然有效;所以将函数返回后，内部函数在外部作用域内执行时，仍然使用定义时的作用域链，可以访问到内部变量。
//在方法调用前后打印日志
function trace(o, m) {
    let original = o[m];
    let outerThis = this;
    let outerArgs = arguments;
    o[m] = function () {
        console.log(new Date(), "Entering:", m);
        console.log(outerThis === this); //false
        console.log(outerArgs === arguments);//false
        let result = original.apply(this, arguments);//为什么使用this?不应该使用 o 吗？
        console.log(new Date(), "Existing:", m);
        return result;
    };
}

let o = {a: 'a', b: 'b'};
trace(o, 'toString');
o.toString();

//bind方法 将函数绑定到某个对象。当在函数f()上调用bind()方法并插入怒一个对象o作为参数，这个方法将返回一个函数，
//调用返回的函数将会把原始的函数f()当做o的方法来调用，传入新函数的任何实参都将传入原始函数。
//bind方法不仅会将函数绑定至一个对象，它还会将bind()的实参绑定至this,这是一种函数式编程技术，也称为“柯里化”。
function bind(f, o) {
    if (f.bind) return f.bind(o);
    else return function () {
        return f.apply(o, arguments);
    };
}

function f(y) {
    return this.x + y;
}

let o_1 = {x: 1};
let g = f.bind(o_1);
console.log(g(3));
//柯里化
let sum = function (x, y) {
    return x + y;
};
let succ = sum.bind(null, 1);//将方法绑定到null,将sum第一个参数绑定到1
console.log(succ(2));

function f_1(y, z) {
    return this.x + y + z;
}

let g_1 = f_1.bind({x: 1}, 2);
console.log(g_1(3));

//ECMAScript 3 版本中的Function.bind()方法
if (!Function.prototype.bind) {
    Function.prototype.bind = function (o /*,args*/) {
        let self = this, boundArgs = arguments;
        return function () {
            let args = [], i;
            //将bind方法调用时的第一个实参后的其它参数都作为实参传入原始函数
            for (i = 1; i < boundArgs.length; i++) args.push(boundArgs[i]);
            //将调用bind()方法返回的函数时传入的所有实参作为后续参数传入原始函数
            for (i = 0; i < arguments.length; i++) args.push(arguments[i]);
            return self.apply(o, args);  //在使用时：xx_function.bind(xxx_object,args..);所以这里self指的是调用上下文——xx_function.
        };
    };
}

//除了使用function关键字定义函数，还可以使用Function()构造函数来定义函数。
let x_1 = new Function("x", "y", "return x * y;");
//使用new Function()构造函数，可以实现在运行时动态编译函数；每次调用new Function()都会重新编译并创建一个新的函数对象，而函数定义语句和函数定义表达式则不会每次调用都重新编译。
//使用new Function()创建的函数并不是使用词法作用域，函数体代码的编译总是会在顶层（全局作用域）函数执行。
var scope_1 = 'global';

function constructFunction() {
    var scope_1 = 'local';
    return new Function('return scope_1;'); //Error:ReferenceError: scope_1 is not defined
}

console.log(constructFunction()());

//可调用对象：可以在函数调用表达式中调用的对象。所有函数都是可调用的，但并非所有的可调用对象都是函数。
//常用的可调用对象RegExp对象，建议不使用可调用对象。

//函数式编程
//可以在javascript中应用函数式编程技术：




















