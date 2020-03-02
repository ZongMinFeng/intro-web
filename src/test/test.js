/**
 * 用于代码测试
 */


/**
 * 成员
 {
    "hehe":"hehehe",
   "tellerPositionList": [
   "我擦嘞",
   {
         "positionId": "test_position0001",
         "recycleSeq": "1",
         "child": [
           {
                 "lala": "test_position0001",
                 "recycleSeq": "1"
            },
            {
                 "lala": "test_position0002",
                 "recycleSeq": "2"
            },
          ]
     }
   ]
 }
 转成如下多个成员
 {
  tellerPositionList1positionId:test_position0001
  tellerPositionList1recycleSeq:1
 }
 * @param signArray
 */
const expandArray = function (signArray) {
  let signArrayNew = {};
  expandArrayOnce(signArrayNew, signArray, '');
  return signArrayNew;
};

const expandArrayOnce = function (signArrayNew, signArray, head) {
  for (let key in signArray) {
    if (signArray[key] instanceof Array && signArray[key].length > 0) {
      signArray[key].forEach(item=>{
        if (item instanceof Object) {
          expandArrayOnce(signArrayNew, item, head+key+item.recycleSeq);
        }
      });
    } else {
      signArrayNew[head + key] = signArray[key];
    }
  }
};

let test1 = {
  "hehe":"hehehe",
  "tellerPositionList": [
    "我擦嘞",
    {
      "positionId": "test_position0001",
      "recycleSeq": "1",
      "child": [
        {
          "lala": "test_position0001",
          "recycleSeq": "1"
        },
        {
          "lala": "test_position0002",
          "recycleSeq": "2"
        },
      ]
    }
  ]
};

let test2 = expandArray(test1);
console.log(test2);
