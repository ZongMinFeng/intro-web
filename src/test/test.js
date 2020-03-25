/**
 * 用于代码测试
 */

let objectCopy = function (oldVal) {
    let newVal;
    if (oldVal instanceof Object) {
        newVal = {};
        for (let key in oldVal) {
            newVal[key] = objectCopy(oldVal[key]);
        }
        return newVal;
    }

    if (oldVal instanceof Array) {
        let newVal = [];
        oldVal.forEach(oldItem => {
            let newItem;
            newItem = objectCopy(oldItem);
            newVal.push(newItem);
        });
        return newVal;
    }

    newVal = oldVal;

    return newVal;

};

let test = {
    a: 2,
    b: {
        b1: '哈哈',
        b2: 4,
    },
    c: "d"
};

let test2;
test2 = objectCopy(test);
let test3={};
test3.b=test.b;
test.b.b1 = '拉拉';
console.log(test2);
console.log(test3);
