//Array.splice()方法 可以从数组中删除元素、插入元素或者同时完成删除和插入操作；而且操作会影响到调用的数组
//splice()第一个参数制定了插入或删除的其实位置；第二个参数指定了应该从数组中删除的元素个数（如果省略此参数，则从起始点开始到数组结尾的所有元素都将删除）；
//splice()方法返回一个由删除元素组成的数组，或者如果没有删除元素就返回一个空数组。
//splice()的前两个参数制定了需要删除的数组元素；其后的任意个数的参数制定了需要插入到数组中的元素，从第一个参数指定的位置开始插入。
let a = [1, 2, 3, 4, 5, 6, 7, 8];
//printArray(a.splice(2,0,'a','b'));
//splice 与 unshift 一样，数组参数是一次性插入到原数组中，而不是一个一个插入（顺序相反）
printArray(a.splice(2, 2, [1, 2], 3));
printArray(a);

function printArray(a) {
    console.log(a.join(","));
}

//concat
let b = [];
printArray(b.concat([1, 2, 3]));

// push pop  unshift shift
let c = [1, 2];
c.unshift([-1, 0])
printArray(c);

//toString toLocaleString

//forEach  无法在遍历完所有元素之前结束，只有抛出异常，可以提前终止。
//forEach()  为每个元素调用指定的函数，该函数有三个参数：数组元素，元素的索引和数组本身；如果只关心数组的值，则可以传入一个参数的函数。

//map()  返回结果为一个数组（可能是稀疏数组）
//filter() 返回结果是一个稠密数组（会跳过稀疏数组中缺少的元素），可以用来压缩数组
//every()/some() 是数组的逻辑判定：它们对数组元素应用指定的函数进行判定，返回true或者false.
//在空数组上调用时，every返回true,some返回false
//reduce()和reduceRight()使用指定的函数将数组元素组合，生成单个值。（注入、折叠）
//如果不指定初始值，将自动使用数组第一个元素值作为初始值，所以对于空数组，不指定初始值调用reduce会出错。
let d = [1, 2];
console.log(d.reduce((accumulator, currentValue, currentIndex, array) => accumulator + currentValue + currentIndex + array.length, -8));
//reduceRight与reduce功能一致，不过遍历处理元素的顺序与reduce相反（从右至左）

//使用Array.isArray()判断是否是数组
const isArray = Array.isArray || function (o) {
    return typeof o === 'object' && Object.prototype.toString().call(o) === '[object Array]';
};

//类数组对象 Arguments对象  可以像访问数组元素一样访问类数组对象的属性
/**
 * 检测对象是否类数组对象
 * @param o 待检测对象
 */
function isArrayLike(o) {
    return !!(o                             // o非null,undefined等
        && typeof o === 'object'    //o是对象
        && isFinite(o.length)       //o.length 是有限数值
        && o.length >= 0            //o.length 是非负值
        && o.length === Math.floor(o.length)    //o是整数
        && o.length < Math.pow(2, 32));          //o.length < 2^32 (javascript中数组索引使用32位二进制整数表示)
}

//可以使用Function.call方法间接在类数组对象上调用数组方法。
let objectLikeArray = {'0': 'a', '1': 'b', '2': 'c', length: 3};
console.log(Array.isArray(objectLikeArray));
console.log(isArrayLike(""));
console.log(isArrayLike(objectLikeArray));
console.log(Array.prototype.join.call(objectLikeArray, "+"));
console.log(Array.prototype.slice.call(objectLikeArray, 0));
console.log(Array.prototype.map.call(objectLikeArray, x => x.toUpperCase()));

//字符串和数组  数组的通用方法可以在字符串上调用
let str = 'test';
console.log(str.charAt(0));
console.log(str[1]);
console.log(Array.prototype.join.call(str, " "));
console.log(Array.prototype.map.call(str, x => x.toUpperCase()).join(""));