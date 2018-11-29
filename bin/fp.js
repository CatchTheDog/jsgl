//函数式编程
//高阶函数——操作函数的函数
function not(f) {
    return function () {
        return !f.apply(this, arguments);
    }
}

let even = function (x) {
    return x % 2 === 0;
};

let odd = not(even);

console.log([1, 2, 3, 4, 55].some(odd));

//call,apply区别在于参数 call使用不定参数，apply使用数组作为参数

//不完全函数
function array(a, n) {
    return Array.prototype.slice.call(a, n || 0);
}

function partialLeft(f/*,...*/) {
    let args = arguments;  //第一次调用参数
    return function () {
        let a = array(args, 1); //获取第一次调用第一个实参后的其他所有实参
        a = a.concat(array(arguments)); //第一次调用第一个实参后的其他所有实参+第二次调用的所有实参
        return f.apply(this, a);
    };
}

function partialRight(f, /*,...*/) {
    let args = arguments;
    return function () {
        let a = array(arguments);//获取第二次调用的所有实参
        a = a.concat(array(args, 1)); //获取第一次调用第一个实参后的其他所有参数
        return f.apply(this, a);
    };
}

function partial(f/*,...*/) {
    let args = arguments; //第一次调用参数
    return function () {
        let a = array(args, 1); //第一次调用第一个实参后的其他所有参数
        let i = 0, j = 0;
        for (; i < a.length; i++)
            if (a[i] === undefined) a[i] = arguments[j++];
        a = a.concat(array(arguments, j));
        return f.apply(this, a);
    };
}

let f = function (x, y, z) {
    return x * (y - z);
};
console.log(partialLeft(f, 2)(3, 4));  // -2 2*(3-4)
console.log(partialRight(f, 2)(3, 4)); // 6 3*(4-2)
console.log(partial(f, undefined, 2)(3, 4)); // -6 3*(2-4)


//记忆：将计算结果缓存起来的技巧
function memorize(f) {
    let cache = {};
    return function () {
        let key = arguments.length + Array.prototype.join.call(arguments, ",");
        if (key in cache) return cache[key];
        else return cache[key] = f.apply(this, arguments);
    };
}

/**
 * 返回两个整数的最大公约数
 * 使用欧几里得算法
 * @param a
 * @param b
 */
function gcd(a, b) {
    let t;
    if (a < b) t = b, b = a, a = t;
    while (b != 0) t = b, b = a % b, a = t;
    return a;
}

let gcddemo = memorize(gcd);
console.log(gcddemo(85, 187));

let factorial = memorize(function (n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
});
console.log(factorial(5));