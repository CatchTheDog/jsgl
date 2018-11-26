// 对象——散列，散列表，字典，关联数组
// 对象除了可以保持自由的属性，还可以从原型对象继承属性；原型继承是javascript的核心特征。
// 除了字符串、数字，true，false,null和undefined外，其他值都是对象。
// 对象常见操作：创建、设置、查找、删除、检测和枚举其属性。
// 对象的属性名可以是包含空字符串在内的不重复的任意字符串。
// 每个属性都有一些与之相关的特性——属性特性：
//     可写，表名是否可以设置该属性的值；
//     可枚举，表名是否可以通过for/in循环返回该属性；
//     可配置，表名是否可以删除或者修改该属性。
// 每个对象还拥有三个相关的对象特性：
//     对象的原型，指向另一个对象，本对象的属性继承自它的原型对象。
//     对象的类时一个标志对象类型的字符串（typeof 返回此字符串）
//     对象的扩展标记指明了是否可以向该对象添加新属性。
// 对三类对象和两类属性做区分：
//     内置对象 规范定义的对象或类，如数组、函数、日期、正则表达式都是内置对象
//     宿主对象
//     自定义对象
//     自有属性
//     继承属性

// 创建对象：1.对象直接量 2.关键字new 3.Object.create()
// 原型：
//     每一个Javascript对象（除null和Object.prototype外）都和另外一个对象相关联。
//     每一个普通对象都从原型继承属性。
//     所有通过对象直接量创建的对象都具有同一个原型对象，并可以通过Object.prototype获得对原型对象的引用。
//     通过关键字new和构造函数调用创建的对象的原型就是构造函数的prototype属性的值——同使用{}创建对象一样，通过new Object() 创建的对象也继承自Object.prototype,
//     而构造函数的prototype属性所指向的对象也继承自Object.prototype; 这一系列链接的原型对象就是所谓的原型链。
let obj = Object.create({x: 1, y: 2});
console.log(obj.prototype);
console.log(Object.prototype && Object.prototype.prototype);
let inherit = require('./inherit');
let o = {x: "don't change this value!"};
let x = inherit.inherit(o);
console.log(x);
//delete运算符值能删除自有属性，不能删除继承属性（要删除继承属性必须从定义这个属性的原型对象上删除它，而且这会影响到所有继承自这个原型的对象）。
//delete只是断开属性与对象的联系，delete不能删除可配置性为false的属性，而且只能删除自有属性，不能删除继承属性。

//检测属性 in/hasOwnProperty()/propertyIsEnumerable()
//in 运算符 如果对象的自有属性或继承属性中包含这个属性则返回true
let in_o = {x: 1};
console.log("x" in in_o);
console.log("y" in in_o);
console.log("toString" in in_o);
//hasOwnProperty()方法用来检测给定的名字是否是对象的自有属性。
console.log(in_o.hasOwnProperty("x"));
console.log(in_o.hasOwnProperty("y"));
console.log(in_o.hasOwnProperty("toString"));
//propertyIsEnumerable() 只有检测到是自有属性且这个属性的可没举行为true时才返回true.
let in_o_2 = inherit.inherit({y: 2});
in_o_2.x = 1;
console.log(in_o_2.propertyIsEnumerable("x"));
console.log(in_o_2.propertyIsEnumerable("y"));
console.log(Object.prototype.propertyIsEnumerable("toString"));
//使用!== undefined 判断一个属性是否是undefined   !== 可以区分undefined 和 null; != 不能区分undefined 和null;

//枚举属性 for/in 循环可以在循环体重遍历对象中所有可枚举的属性（包括自有属性和继承属性）



