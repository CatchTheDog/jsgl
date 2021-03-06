let pattern = /s$/; //正则表达式直接量
let pattern_1 = new RegExp("s$"); //使用构造函数创建正则表达式对象
//正则表达式中的特殊符号：
//1.转义字符 \s \S \w \W \d \D \b
//2.
//  ^ $ . * + ? = ! : | \ / ( ) { } [ ]   如果要在正则表达式中使用这些字符的直接量进行匹配，需要对其进行转义;
//其他符号无特殊含义，按照直接量进行匹配。

// 1.字符类  将直接量字符单独放进方括号内就组成了字符类
let x_1 = /[abc]/;
let x_2 = /[^abc]/;
let x_3 = /[a-zA-Z0-9]/;
let x_4 = /[^a-zA-Z0-9]/;
//2.重复 贪婪匹配（尽可能多地匹配，而且允许后续的正则表达式继续匹配）： {n} {n,} {n,m} ? + *
//      非贪婪匹配：?? +? *? {m}? {m,}? {m,n}?

//选择、分组和引用
// | 用于选择
let x_5 = /\d{3}|[a-z]{4}/;
// () 第一个作用：把单独的项组合成子表达式，以便可以对该子表达式使用 | * + ? {m} {m,} {m,n}
let x_6 = /java(script)?/;
let x_7 = /(ab|cd)+|ef/;
//    第二个作用：在完整的模式中定义子模式——当一个正则表达式成功地和目标字符串匹配时，可以从目标串中抽出和圆括号中的子模式匹配的部分。
let x_8 = /[a-z]+\d+/;
//    第三个作用：允许在同意正则表达式的后部引用前面的子表达式——通过在字符"\"后加一位或者多为数字（此数字制定了带圆括号的子表达式在正则表达式中的位置，索引从1开始，以子表达式的左括号为计数依据）来实现。
let x_9 = /([Jj]ava([Ss]cript)?)\sis\s(fun\W*)/; // 此正则中，([Ss]cript)用\2来指代
//对子表达式的引用是对与子表达式匹配的文本的引用
let x_10 = /['"][^'"]*['"]/;  //匹配带有引号的字符串
let x_11 = /(['"][^'"]*\1)/;  //匹配带有引号的字符串，可以保证字符串两侧使用的引号是一致的（都是单引号或者都是双引号）
//不能再字符类中使用子表达式引用
let x_12 = /(['"])[^\1]*\1/;  //这种写法是不合法的，在[]中使用了\1
//也可以使用(?: 和) 来进行分组
let x_13 = /([Jj]ava(?:[Ss]cript)?)\sis\s(fun\W*)/;  //此模式中，(?:) 仅用于分组(不会记忆与该组匹配的字符)，所以(不用参与分组计数，所以使用\2引用与(fun\W*)匹配的文本
//正则表达式的锚：
// ^ 用来匹配字符串开始
// \b 用来匹配一个单词的边界
// $ 用来匹配字符串结束
// \B 把匹配的锚点定位在不是单词的边界之处
// (?=p)    零宽正向先行断言，要求接下来的字符都与p匹配，但不包括匹配p的那些字符
// (?!p)    零宽负向先行断言，要求接下来的字符不与p匹配
let x_14 = /^JavaScript$/;
let x_15 = /\bJava\b/; //\b 在字符类中表示退格
let x_16 = /\B[Ss]cript/;
//任意正则表达式都可以作为锚点条件。如果在符号(?=和)之间加入一个表达式，它就是一个先行断言，用以说明圆括号内的表达式必须正确匹配，但不是真正意义上的匹配。
let x_17 = /[Jj]ava([Ss]cript)?(?=\:)/; //字符串后有“:”存在才匹配
//(?!和) 的断言是负向先行断言，用以指定接下来的字符都不必匹配。
let x_18 = /Java(?! Script)([A-Z]\w*)/; //此模式可以匹配“Java"后跟随一个大写字母和任意多个ASCII单词，但Java后不能跟随"Script"

//修饰符：修饰符放在//符号之外——出现在第二条/之后，Javascript支持三个修饰符：
//      i 用于说明模式匹配不区分大小写
//      g 说明模式匹配应该是全局的——应该找出被检索字符串中所有的匹配
//      m 用以在多行模式中执行匹配，在此模式下，如果待检索的字符串包含多行，那么^和$锚字符除了匹配整个字符串的开始和结尾之外，环能匹配每行的开始和结尾。
//上述修饰符可以任意组合。
let x_19 = /\bjava\b/gi;
//用于模式匹配的String方法：
let str = 'JavasCript';
console.log(str.search(/script/i)); //返回第一个与模式匹配的子串的起始位置 4
console.log(str.replace(/javascript/gi, 'JavaScript'));

let quote = /"([^"]*)"/g;
console.log("qu'ot'e".replace(quote, '“$1”'));

let x_20 = "1 plus 2 equals 3";
console.log(x_20.match(/\d+/)); //返回匹配结果组成的数组,如果没有参数g，则只返回第一个匹配的结果和各个子表达式匹配的结果。

let url_pattern = /(\w+):\/\/([\w.]+)\/(\S*)/;
let text = "Visit my blog at http://www.example.com/~david";
let result = text.match(url_pattern);
for (let i = 0; i < result.length; i++)
    console.log(result[i]);

//split
let number_str = "123,456,789,0";
console.log(number_str.split(/\s*,\s*/)); // \s匹配任意不可见字符(空格，制表符，换页符等等)，

let zipcode = new RegExp("\\d{5}", "g");
//exec() 与String.match()方法类似

let pattern_2 = /Java/g;
let text_1 = "JavaScript is more fun than Java!";
let result_1;
while ((result_1 = pattern_2.exec(text_1)) != null) {
    console.log("Matched '" + result[0] + "' at position " + result.index + ";next search begins at " + pattern.lastIndex);
}

//test() 如果匹配一个结果，则返回true
