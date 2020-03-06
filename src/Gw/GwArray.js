const inArrayByCons = (objects, object, option) => {
    if (!objects instanceof Array) {
        return false;
    }
    if (object[option] == null) {
        return false;
    }
    let haveIt = false;
    objects.forEach((value) => {
        if (value[option] === object[option]) {
            haveIt = true;
            return false;
        }
    });
    if (haveIt) {
        return true;
    } else {
        return false;
    }
};

/**
 * 检查value是否在objects数组中
 * @param objects
 * @param value
 * @param option
 * @returns true 表示value在objects中
 */
const inArrayOptionByCons = (objects, value, option) => {
    if (!objects instanceof Array) {
        return false;
    }
    if (value == null) {
        return false;
    }
    let haveIt = false;
    objects.forEach((res) => {
        if (res[option] === value) {
            haveIt = true;
            return false;
        }
    });
    if (haveIt) {
        return true;
    } else {
        return false;
    }
};

const indexByCons = (objects, object, option) => {
    let indexReturn = -1;
    if (!objects instanceof Array) {
        return -1;
    }

    objects.forEach((item, index) => {
        if (item[option] === object[option]) {
            indexReturn = index;
        }
        return -1;
    });

    return indexReturn;
};


const sortByNum = (a, b) => {
    let numA = parseInt(a);
    let numB = parseInt(b);
    if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
    } else if (!isNaN(numA) && isNaN(numB)) {
        return -1;
    } else if (isNaN(numA) && !isNaN(numB)) {
        return 1;
    } else {
        return (a).localeCompare(b);
    }
};

const getArrayObjectByObject = (objects, object, option) => {
    let indexReturn = -1;
    if (!objects instanceof Array) {
        return null;
    }

    objects.forEach((item, index) => {
        if (item[option] === object[option]) {
            indexReturn = index;
        }
        return null;
    });

    return objects[indexReturn];
};

const getArrayObjectByCon = (objects, con, option) => {
    let indexReturn = -1;
    if (!objects instanceof Array) {
        return null;
    }

    objects.forEach((item, index) => {
        if (item[option] === con) {
            indexReturn = index;
        }
        return null;
    });

    return objects[indexReturn];
};

//去除数组空字符串
function trimSpace(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === "" || array[i] === " " || array[i] == null || typeof(array[i]) == "undefined") {
            array.splice(i, 1);
            i = i - 1;
        }
    }
    return array;
}

/**
 * 简单对比。a对象和b对象按照a对象的成员对比，如果值一样，返回true
 * funcArray提供了特殊成员的对比方法。比如有个成员为数组，z:[1, 2, 3]，可以将数组转成字符串对比
 * let funcArray=[];
 * funcArray['z']=function(a, b){
 *     return a.join(',')===b.join(',');
 * }
 * @param a
 * @param b
 * @returns {boolean}
 */
const aEb = function(a, b, funcArray) {
    console.log('------aEb开始啦----'); //debug
    let isObj = a instanceof Object && b instanceof Object;
    if (!isObj) {
        return false;
    }
    for (let key in a) {
        //特殊字段对比方法
        let _funcArray = funcArray || [];
        if (_funcArray[key]) {
            let equalFunc = _funcArray[key];
            if (!equalFunc(a[key], b[key])) {
                console.log(key, a[key], b[key]); //debug
                return false;
            }
        } else {
            //不对比数组成员
            if (a[key] instanceof Array) {
                continue;
            }
            //不对比对象成员
            if (a[key] instanceof Object) {
                continue;
            }
            if (a[key] !== b[key]) {
                console.log(key, a[key], b[key]); //debug
                return false;
            }
        }
    }
    return true;
};

//---------------------------测试--开始-------------------------
//export为es6语法，无法使用nodeJS直接运行，所以测试的时候，将export注释掉
/*
let a={
  x:1,
  y:2,
  z:[1, 2, 3]
};

let b={
  x:1,
  y:2,
  z:[1, 2, 3]
};

let equalFunc=function (a, b) {
  return a.join(',')===b.join(',');
};

let funcArray=[];
funcArray['z']=equalFunc;
console.log(aEb(a, b, funcArray));
*/
//---------------------------测试--结束-------------------------

export {
    inArrayByCons,
    inArrayOptionByCons,
    indexByCons,
    sortByNum,
    getArrayObjectByCon,
    getArrayObjectByObject,
    trimSpace,
    aEb
};
