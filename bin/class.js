/**
 * 用javascript模拟java：实例方法，实例属性和类方法，类属性
 * @type {*|void}
 */
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

/**
 *
 * @param constructor 构造函数
 * @param methods 实例方法，作为原型属性
 * @param statics 静态方法，作为构造函数属性
 */
function defineClass(constructor, methods, statics) {
    methods && extend(constructor.prototype, methods);
    statics && extend(constructor, statics);
    return constructor;
}

//检测对象的类型  原型是类的唯一标识，构造函数时类的公共标识，原型的constructor属性是构造函数
//instanceof运算符  o instanceof c（构造函数） 如果 对象o继承自c.prototype，则返回true. 本质是检测对象的继承关系，是否具有处在同一原型链上。
//可以使用isPrototypeOf()方法检测对象的原型链上是否存在某个特定的原型对象。
//constructor属性  并不是所有的函数都有constructor属性
function typeAndValue(x) {
    if (x == null) return '';
    switch (x.constructor) {
        case Number:
            return 'Number:' + x;
        case String:
            return 'String:' + x;
        case Date:
            return 'Date:' + x;
        case RegExp:
            return 'RegExp:' + x;
    }
}

//构造函数的名字
//使用instanceof运算符和constructor属性来检测对象所属的类的问题:在多个执行上下文中存在构造函数的多个副本的时候，这两种方法的检测结果会出错。
function type(o) {
    let t, c, n;
    if (o === null) return 'NULL';
    if (o !== o) return 'NAN';
    if ((t = typeof o) !== 'object') return t;
    if ((c = classof(o)) !== 'Object') return c;
    if (o.constructor && typeof o.constructor === 'function' && (n = o.constructor.getName())) return n;
    return 'Object';
}

function classof(o) {
    return Object.prototype.toString.call(o).slice(8, -1);
}

Function.prototype.getName = function () {
    if ('name' in this) return this[name];
    return this[name] = this.toString().match(/function\s*([^(]*)\(/)[1];
}