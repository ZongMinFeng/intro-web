/**
 * 用于代码测试
 */
const PERMISSIONS={
  //1
  addSystemChannel:{
    index:1,
    name:'系统交易渠道信息表新增'
  },
  //2
  addInst:{
    index:2,
    name:'添加子公司'
  },
  //3
  listInstDepartments:{
    index:3,
    name:'查询公司所有部门'
  },
  //4
  addDepartmentInfo:{
    index:4,
    name:'新增部门'
  },
  //5
  addDepartmentPosition:{
    index:5,
    name:'新增部门职位'
  },
  //56
  listDepartmentPosition:{
    index:6,
    name:'查询部门职位'
  },
  //201
  addGooCategory:{
    index:201,
    name:'新增物资分类'
  },
  //202
  deleteGooCategoryById:{
    index:202,
    name:'删除物资分类'
  },
  //203
  updateGooCategoryById:{
    index:203,
    name:'根据主键修改物资分类'
  },
  //205
  getGooCategoryById:{
    index:205,
    name:'根据主键查询物资分类'
  },

  //无index
  genLoginId:{
    index:null,
    name:'获取PCWEB登陆二维码'
  },
  getLoginStatus:{
    index:null,
    name:'查询二维码登录状态'
  },
};
const position2funcMap=function (position) {
  let funcMapTmp=new Array(1024);
  for (let i = 0; i < 1024; i++){
    funcMapTmp[i]='0';
  }
  let max=0;
  position.forEach(item=>{
    if (PERMISSIONS[item]) {
      let index=PERMISSIONS[item].index;
      funcMapTmp[index-1]='1';
      if (max < index) {
        max=index;
      }
    }
  });
  let x8=parseInt(max/8+1);
  funcMapTmp.length=8*x8;
  console.log('funcMapTmp', funcMapTmp);//debug
  let funcMap='';
  for (let i = 0; i < x8*2; i++) {
    let funcStr=funcMapTmp[4*i]+funcMapTmp[4*i+1]+funcMapTmp[4*i+2]+funcMapTmp[4*i+3];
    switch (funcStr) {
      case '0000':
        funcMap+='0';
        break;
      case '0001':
        funcMap+='1';
        break;
      case '0010':
        funcMap+='2';
        break;
      case '0011':
        funcMap+='3';
        break;
      case '0100':
        funcMap+='4';
        break;
      case '0101':
        funcMap+='5';
        break;
      case '0110':
        funcMap+='6';
        break;
      case '0111':
        funcMap+='7';
        break;
      case '1000':
        funcMap+='8';
        break;
      case '1001':
        funcMap+='9';
        break;
      case '1010':
        funcMap+='A';
        break;
      case '1011':
        funcMap+='B';
        break;
      case '1100':
        funcMap+='C';
        break;
      case '1101':
        funcMap+='D';
        break;
      case '1110':
        funcMap+='E';
        break;
      case '1111':
        funcMap+='F';
        break;
      default:
        funcMap+='0';
    }
  }
  return funcMap;
};
let position=["listInstDepartments", "addInst"];
let funcMap=position2funcMap(position);
console.log(funcMap);
