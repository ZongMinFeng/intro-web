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
  let length=permissionMap.length;
  //遍历所有权限配置，如果此权限在权限map有配置，那么此权限存入权限数组permissions
  for (let permission in PERMISSIONS) {
    let index=PERMISSIONS[permission].index;
    if (index) {
      if (index < length) {
        if (permissionMap.substr(index, 1) === '1') {
          permissions.push(permission);
        }
      }
    }else {
      permissions.push(permission);
    }
  }
  return  permissions;
};

/**
 * 权限数组转funcMap
 * @param position
 * @returns {string}
 */
const position2funcMap=function (position) {
  let funcMap='FFF';
  return funcMap;
};


export {
  handelPermission,
  getPermissions,
  PERMISSIONS,
  funcMap2position,
  position2funcMap
}
