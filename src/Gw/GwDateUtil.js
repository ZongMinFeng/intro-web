/**
 * 对象深拷贝
 * @param oldVal
 * @returns {*}
 */
let deepCopy = function (oldVal) {
    let newVal;
    if (oldVal instanceof Object) {
        newVal = {};
        for (let key in oldVal) {
            newVal[key] = deepCopy(oldVal[key]);
        }
        return newVal;
    }

    if (oldVal instanceof Array) {
        let newVal = [];
        oldVal.forEach(oldItem => {
            let newItem;
            newItem = deepCopy(oldItem);
            newVal.push(newItem);
        });
        return newVal;
    }

    newVal = oldVal;

    return newVal;
};

export {
    deepCopy,
}

