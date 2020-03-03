/**
 * 权限处理
 * 在Login.vue中，查询二维码登录状态成功，允许登录后调用handelPermission函数处理权限
 */
import {hex_to_bin} from "../Gw/GwString";
import store from '../store'

//所有权限
//属性index为funcMap位图的位置，从1开始；index为null表示此权限默认存在
const PERMISSIONS={
  //1
  addSystemChannel:{
    index:1,
    name:'系统交易渠道信息表新增'
  },
  //102
  addInst:{
    index:102,
    name:'添加子公司'
  },
  //105
  listInstDepartments:{
    index:105,
    name:'查询公司所有部门'
  },
  //104
  addDepartmentInfo:{
    index:104,
    name:'新增部门'
  },
  //107
  addDepartmentPosition:{
    index:107,
    name:'新增部门职位'
  },
  //106
  listDepartmentPosition:{
    index:106,
    name:'查询部门职位'
  },
  //108
  updateDepartmentPosition:{
    index:108,
    name:'修改部门职位'
  },
  //109
  deleteDepartmentPosition:{
    index:109,
    name:'删除部门职位'
  },
  //110
  listDepartmentTeller:{
    index:110,
    name:'查询部门所有员工'
  },
  //111
  addTellerInfo:{
    index:111,
    name:'新增部门员工'
  },
  //112
  getInstById:{
    index:112,
    name:'查询机构信息'
  },
  //113
  addTellerDepartment:{
    index:113,
    name:'员工兼职'
  },
  //115
  updateTellerInfo:{
    index:115,
    name:'修改部门员工'
  },
  //116
  deleteDepartmentTeller:{
    index:116,
    name:'删除部门员工'
  },
  //117
  resetTellerPwd:{
    index:117,
    name:'重置员工密码'
  },
  //118
  checkTellerId:{
    index:118,
    name:'检查用户注册情况'
  },
  //119
  chgTellerPwd:{
    index:119,
    name:'修改密码'
  },
  //120
  departmentLogin:{
    index:120,
    name:'部门切换'
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
  //206
  addGooUnitinfo:{
    index:206,
    name:'新增物资单位'
  },
  //207
  deleteGooUnitinfoById:{
    index:207,
    name:'删除物资单位'
  },
  //208
  getGooUnitinfoById:{
    index:208,
    name:'根据主键查询物资单位'
  },
  //209
  listAllUnitinfos:{
    index:209,
    name:'查询所有单位'
  },
  //210
  genGoodsId:{
    // 暂时不控制权限
    // index:210,
    name:'获取物资ID'
  },
  //211
  sendPicture:{
    // 暂时不控制权限
    // index:211,
    name:'获取物资ID'
  },
  //212
  addGooTGoodsinfo:{
    index:212,
    name:'新增物资基础信息'
  },
  //213
  deleteGooTGoodsinfoById:{
    index:213,
    name:'删除物资基础信息'
  },
  //214
  updateGooTGoodsinfoById:{
    index:214,
    name:'根据主键修改物资基础信息'
  },
  //215
  getGooTGoodsinfoById:{
    index:215,
    name:'根据主键查询物资基础信息'
  },
  //216
  listGoodsinfosByConditions:{
    index:216,
    name:'分页查询指定条件的物资信息'
  },
  //217
  addGoodsProductmanual:{
    index:217,
    name:'新增物资产品说明书'
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

const handelPermission=function (funcMap) {
  let permissions = funcMap2position(funcMap);
  //将权限数组存入store
  store.commit('setPermissions', permissions);
};

const getPermissions=function () {
  return store.getters.permissions;
};

/**
 * 将funcMap转成权限数组
 * @param funcMap
 * @returns {[]}
 */
const funcMap2position=function(funcMap){
  //权限数组permissions，以后每次交易查询此数组，看是否有权限。
  let permissions=[];
  let permissionMap=hex_to_bin(funcMap);
  console.log('permissionMap', permissionMap);//debug
  let length=permissionMap.length;
  //遍历所有权限配置，如果此权限在权限map有配置，那么此权限存入权限数组permissions
  for (let permission in PERMISSIONS) {
    let index=PERMISSIONS[permission].index;
    if (index) {
      if (index-1 < length) {
        if (permissionMap.substr(index-1, 1) === '1') {
          permissions.push(permission);
        }
      }
    }else {
      permissions.push(permission);
    }
  }
  console.log('funcMap转permissions', permissions);//debug
  return  permissions;
};

/**
 * 权限数组转funcMap
 * @param position
 * @returns {string}
 */
const position2funcMap=function (position) {
  let funcMapTmp=new Array(1024);
  for (let i = 0; i < 1024; i++){
    funcMapTmp[i]='0';
  }
  let max=0;
  position.forEach(item=>{
    if (PERMISSIONS[item]) {
      //注意：权限funcMap位置从1开始计算，但是数组下标是从0开始算的
      let index=PERMISSIONS[item].index;
      funcMapTmp[index-1]='1';
      if (max < index) {
        max=index;
      }
    }
  });
  let x8=parseInt(max/8+1);
  funcMapTmp.length=8*x8;
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

export {
  handelPermission,
  getPermissions,
  PERMISSIONS,
  funcMap2position,
  position2funcMap
}
