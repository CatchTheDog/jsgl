//javascript原始类型
//数字  javascript不区分整数和浮点数，所有的数都是64位浮点数，但是对于一些整数操作（数组下标，位操作）则使用32位二进制整数数。
//Number方法
let n = 123456.789;
print(n.toString(16));//可以指定基数
print(n.toFixed(0));
print(n.toFixed(2));
print(n.toFixed(4));
print(n.toExponential(1));
print(n.toExponential(4));
print(n.toPrecision(4));
print(n.toPrecision(7));
print(n.toPrecision(10));

//两个全局方法  可以忽略前导空格，尽可能多的解析数字；也可以指定数字转换基数
print(parseInt("3 blind mice"));
print(parseInt("oxFF", 16));
print(parseFloat("  3.1415   926 53 meters"));
print(parseFloat(" .1232"))

function print(x) {
    console.log(x);
}

//对象到原始值
//所有对象转换到布尔值均为true(包括包装对象 new Boolean(false))。
//对象转换为字符串或者数字：toString()  valueOf()