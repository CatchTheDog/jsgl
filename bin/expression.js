//表达式
//原始表达式是表达式的最小单位，它们不包含其他表达式，原始表达式包含常量和直接量、关键字和变量。
//函数：函数声明（提升），函数定义表达式
let square = function (x) {
    return x * x;
}

//javascript中的运算符用于算数表达式，比较表达式，逻辑表达式，赋值表达式。
// + - * / %
// ++ --
// | & ~ ^ <<(左移，右边补0) >>(带符号右移，左边补符号) >>>(无符号右移，左边补0)
// delete typeof void
// ?:
// && || !
// == != === !== instanceof in
// =

//javascript运算符会根据需要将操作数转换为希望的类型。
//左值(lvalue) 指：表达式只能出现在赋值运算符的左侧。在javascript中，变量、对象属性、和数组元素均是左值。
console.log(3 + parseInt("2"));

// == 与 ===
// == 与 === 运算符用于比较两个值是否相等，都允许任意类型的操作数。=== 也称为严格相等运算符(恒等运算符)，它用来检测两个操作数
// 是否严格相等。 == 运算符乘坐相等运算符，它用来检测两个操作数是否相等（允许进行类型转换）。
// javascript对象的比较是引用比较，而不是值比较。对象和其本身相等，但和其他任何对象都不相等。
//
// ===首先计算其操作数的值，然后比较这两个值是否相等，比较过程中没有任何类型转换：如果两个值都是null或者都是undefined，则它们不相等。
//
// == 对类型相同的比较，同===；对类型不同的比较，则先进行类型转换，再比较。
//
// < > >= <= 比较操作符的操作数可能是任意类型；除数字和字符串之外的操作数都将进行类型转换。
//           如果两个操作数都是字符串，将按照字母表顺序进行比较；
//           如果有一个操作数不是字符串，则将所有操作数转换为数值进行比较。0 与 -0 相等，Infinity比任何除自身之外的数字大；
//              -Infinity比其他除其自身外的数字都小。如果其中一个操作数是NAN，则返回false.
// 对象默认转换规则：
//     如果valueOf()返回一个原始值，则使用此原始值；
//     否则，使用toString()的转换结果。
//
// 注：字符串比较其实比较字符串中字母的unicode编码大小，所以大小ASCII字母都小于小字ASCII字母。
//     String.localCompare()方法更可靠。对于不区分大小写字母的字符串比较，可以首先使用String.toLowerCase()或者toUpperCase()转换后再比较。
// + 运算符更偏向于字符串，而比较运算符更偏向于数字。
// <=  >= 运算符在判断相等时，并不依赖==和===的比较规则。小于等于运算符只是简单的不大于，大于等于只是简单的不小于。
//         而当其中人任一操作数是NAN时，比较运算符都返回false.

// in运算符
// instanceof  左操作数是一个对象，右操作数是一个类。如果左侧对象是右侧类的实例，则返回true,否则返回false.
//     所有对象都是Object的实例，使用instanceof判断对象是否是一个类的实例时，此判断会包含对父类的检测。如果左操作数不是对象，返回false.
//     如果右操作数不是函数，则抛出类型错误异常。
//         原理:为计算表达式o instanceof f，会首先计算f.prototype,然后在原型链中查找o,若找到，则返回true,否则返回false.
// 逻辑运算符：&& || !
let o = {x: 1};
let p = null;
console.log(o && o.x);
console.log(p && p.x);
//&& 三种理解：1.操作数均是布尔值  2.操作数不是布尔值（真值和假值），如果第一个是真值，则返回第一个真值；如果第一个是假值，则返回第一个假值。
//假值：false,null,undefined,0,-0,NAN和"",所有其他值均是真值。
function stop() {
    return "stopped!";
}

function stopable(identify) {
    //使用 && 的短路特性：如果identify为真，则会执行stop()并返回其返回值；如果identify为假，则直接返回identify。
    return identify && stop();
}

console.log(stopable({}));

// || 运算与 && 一样，也具有短路特性。
function getWidth(x) {
    return x.width || x.preferenceWidth || x.defaultWidth;
}

let x = {preferenceWidth: 0, defaultWidth: 10};
console.log(getWidth(x));

let z = NaN;
console.log(!z === z);
console.log(!!z);

// = 赋值操作左操作数 是一个左值：变量或者对象属性（数组元素），右操作数可以是任意类型的值。
//使用全局函数eval()来解释运行由javascript源代码组成的字符串，并产生一个值。
//如果传入eval的参数不是字符串，则直接返回该参数；如果是字符串，则将该字符串当做源码进行解释执行，并返回最后一条表达式或者语句的值/undefined。
//eval()使用了调用它的变量作用域环境——它茶渣走变量和定义新变量和函数的操作和局部作用域中的代码完全一样。
//eval()具有更改全局变量的能力，
console.log(eval("2+3"));

//typeof 是一元运算符，操作数类型可以是任意类型，返回值为表示操作数类型的一个字符串。
let y = {};
console.log((typeof y == 'object') ? "'" + y + "'" : y);

// delete 用于删除对象属性或者数组元素
//delete 的操作数期望是一个左值，如果不是左值，则不进行任何操作并返回true.\
//void 运算符，一元运算符，出现在操作数之前，操作数可以是任意类型。操作数会正常计算，但是返回结果为undefined
//, 逗号运算符， 二元运算符，操作数可以是任意类型。
let i = 0, j = 1, k = 2;