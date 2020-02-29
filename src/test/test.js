/**
 * 用于代码测试
 */


/**
 * 成员
 {
   "tellerPositionList": [
   {
         "positionId": "test_position0001",
         "recycleSeq": "1"
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
const expandArray=function (signArray) {
  let signArrayNew={};
  for (let key in signArray) {
    if (signArray[key] instanceof Array && signArray[key].length>0 ) {
      signArray[key].forEach((item)=>{
        // signArray[key+item.recycleSeq]
        for(let key2 in item){
          signArrayNew[key+item.recycleSeq+key2]=item[key2];
        }
      });
    }else{
      signArrayNew[key]=signArray[key];
    }
  }
  return signArrayNew;
};

let test1={
  specDepartmentId: "AdminSID200217000",
  specTellerId: "lala",
  tellerName: "啦啦",
  tellerPhone: "17728782722",
  "tellerPositionList": [
    {
      "positionId": "testpostion_id",
      "recycleSeq": "1"
    }
  ]
};

let test2=expandArray(test1);
console.log(test2);
