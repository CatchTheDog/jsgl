function extend(o, p) {
    for (let prop in p)
        o[prop] = p[prop];
    return o;
}


function merge(o, p) {
    for (let prop in p) {
        if (o.hasOwnProperty[prop])
            continue;
        o[prop] = p[prop];
    }
    return o;
}

function restrict(o, p) {
    for (let prop in o) {
        if (!(prop in p)) delete o[prop];
    }
    return o;
}

function subtract(o, p) {
    for (let prop in p) {
        delete o[prop];
    }
}

/**
 * 以下两种写法有差别吗？
 * @param o
 * @param p
 * @returns {*}
 */
function union(o, p) {
    return extend(extend({}, o), p);
    //return extend(o,p);
}

function keys(o) {
    if (typeof o != 'object') throw TypeError();
    let result = [];
    for (let prop in o) {
        if (o.hasOwnProperty(prop))
            result.push(prop);
    }
    return result;
}
