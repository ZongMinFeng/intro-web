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
    if (array[i] === " " || array[i] == null || typeof (array[i]) == "undefined") {
      array.splice(i, 1);
      i = i - 1;

    }
  }
  return array;
}

/**
 * a对象和b对象按照a对象的成员对比，如果值一样，返回true
 * @param a
 * @param b
 * @returns {boolean}
 */
const aEb = function (a, b) {
  let isObj=a instanceof Object && b instanceof Object;
  if (!isObj) {
    return false;
  }
  for (let key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
};

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
