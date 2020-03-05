const baseUrl='/adminTest';//生产
// const baseUrl='/mock';//测试
// const baseUrl='';//DJ测试

module.exports = {
  service: {
    uploadUrl:'http://139.196.162.158:10081',//测试
    // uploadUrl:'http://139.196.162.158:10080',//生产 v-uu
    pictureUrl:'http://139.196.162.158:10081',//测试

    checkTellerId: {
      url: baseUrl+'/system/checkTellerId',
      txnId: 'checkTellerId'
    },

    chgTellerPwd: {
      url: baseUrl+'/system/chgTellerPwd',
      txnId: 'chgTellerPwd'
    },

    departmentLogin: {
      url: baseUrl+'/system/departmentLogin',
      txnId: 'departmentLogin'
    },

    addTellerDepartment: {
      url: baseUrl+'/system/addTellerDepartment',
      txnId: 'addTellerDepartment'
    },

    genLoginId: {
      url: baseUrl+'/system/genLoginId',
      txnId: 'genLoginId'
    },

    getLoginStatus: {
      url: baseUrl+'/system/getLoginStatus',
      txnId: 'getLoginStatus'
    },

    loginOut: {
      url: baseUrl+'/system/loginOut',
      txnId: 'loginOut'
    },

    getAllInstById: {
      url: baseUrl+'/system/getAllInstById',
      txnId: 'getAllInstById'
    },

    addInst: {
      url: baseUrl+'/system/addInst',
      txnId: 'addInst'
    },

    getInstById: {
      url: baseUrl+'/system/getInstById',
      txnId: 'getInstById'
    },

    listInstDepartments: {
      url: baseUrl+'/system/listInstDepartments',
      txnId: 'listInstDepartments'
    },

    addDepartmentInfo: {
      url: baseUrl+'/system/addDepartmentInfo',
      txnId: 'addDepartmentInfo'
    },

    addDepartmentPosition: {
      url: baseUrl+'/system/addDepartmentPosition',
      txnId: 'addDepartmentPosition'
    },

    listDepartmentPosition: {
      url: baseUrl+'/system/listDepartmentPosition',
      txnId: 'listDepartmentPosition'
    },

    updateDepartmentPosition: {
      url: baseUrl+'/system/updateDepartmentPosition',
      txnId: 'updateDepartmentPosition'
    },

    deleteDepartmentPosition: {
      url: baseUrl+'/system/deleteDepartmentPosition',
      txnId: 'deleteDepartmentPosition'
    },

    addTellerInfo: {
      url: baseUrl+'/system/addTellerInfo',
      txnId: 'addTellerInfo'
    },

    listDepartmentTeller: {
      url: baseUrl+'/system/listDepartmentTeller',
      txnId: 'listDepartmentTeller'
    },

    getTellerInfoById: {
      url: baseUrl+'/system/getTellerInfoById',
      txnId: 'getTellerInfoById'
    },

    updateTellerInfo: {
      url: baseUrl+'/system/updateTellerInfo',
      txnId: 'updateTellerInfo'
    },

    deleteDepartmentTeller: {
      url: baseUrl+'/system/deleteDepartmentTeller',
      txnId: 'deleteDepartmentTeller'
    },

    resetTellerPwd: {
      url: baseUrl+'/system/resetTellerPwd',
      txnId: 'resetTellerPwd'
    },

    listGooCategorysByPid: {
      url: baseUrl+'/goods/listGooCategorysByPid',
      txnId: 'listGooCategorysByPid'
    },

    addGooCategory: {
      url: baseUrl+'/goods/addGooCategory',
      txnId: 'addGooCategory'
    },

    deleteGooCategoryById: {
      url: baseUrl+'/goods/deleteGooCategoryById',
      txnId: 'deleteGooCategoryById'
    },

    updateGooCategoryById: {
      url: baseUrl+'/goods/updateGooCategoryById',
      txnId: 'updateGooCategoryById'
    },

    listAllUnitinfos: {
      url: baseUrl+'/goods/listAllUnitinfos',
      txnId: 'listAllUnitinfos'
    },

    addGooUnitinfo: {
      url: baseUrl+'/goods/addGooUnitinfo',
      txnId: 'addGooUnitinfo'
    },

    deleteGooUnitinfoById: {
      url: baseUrl+'/goods/deleteGooUnitinfoById',
      txnId: 'deleteGooUnitinfoById'
    },

    getGooUnitinfoById: {
      url: baseUrl+'/goods/getGooUnitinfoById',
      txnId: 'getGooUnitinfoById'
    },

    genGoodsId: {
      url: baseUrl+'/goods/genGoodsId',
      txnId: 'genGoodsId'
    },

    sendPicture: {
      url: baseUrl+'/goods/sendPicture',
      txnId: 'sendPicture'
    },

    listGoodsinfosByConditions: {
      url: baseUrl+'/goods/listGoodsinfosByConditions',
      txnId: 'listGoodsinfosByConditions'
    },

    addGooTGoodsinfo: {
      url: baseUrl+'/goods/addGooTGoodsinfo',
      txnId: 'addGooTGoodsinfo'
    },

    deleteGooTGoodsinfoById: {
      url: baseUrl+'/goods/deleteGooTGoodsinfoById',
      txnId: 'deleteGooTGoodsinfoById'
    },

    getGooTGoodsinfoById: {
      url: baseUrl+'/goods/getGooTGoodsinfoById',
      txnId: 'getGooTGoodsinfoById'
    },

    updateGooTGoodsinfoById: {
      url: baseUrl+'/goods/updateGooTGoodsinfoById',
      txnId: 'updateGooTGoodsinfoById'
    },
    addGoodsProductmanual: {
      url: baseUrl+'/goods/addGoodsProductmanual',
      txnId: 'addGoodsProductmanual'
    },
    deleteGoodsProductmanualById: {
      url: baseUrl+'/goods/deleteGoodsProductmanualById',
      txnId: 'deleteGoodsProductmanualById'
    },
    updateGoodsProductmanualById: {
      url: baseUrl+'/goods/updateGoodsProductmanualById',
      txnId: 'updateGoodsProductmanualById'
    },
    getGoodsProductmanualById: {
      url: baseUrl+'/goods/getGoodsProductmanualById',
      txnId: 'getGoodsProductmanualById'
    },





    funcPreservation: {
      url: baseUrl+'/Sys',
      action: 'funcPreservation',
      txnId: 'funcPreservation'
    },

    login: {
      url: baseUrl+'/PcMng',
      action: 'login',
      txnId: 'login'
    },

    logout: {
      url: baseUrl+'/PcMng',
      action: 'logout',
      txnId: 'logout'
    },

    instPreservation: {
      url: baseUrl+'/PcMng',
      action: 'instPreservation',
      txnId: 'instPreservation'
    },

    instGetAllById: {
      url: baseUrl+'/PcMng',
      action: 'instGetAllById',
      txnId: 'instGetAllById'
    },

    instGetById: {
      url: baseUrl+'/PcMng',
      action: 'instGetById',
      txnId: 'instGetById'
    },

    instTellersGetByCons: {
      url: baseUrl+'/PcMng',
      action: 'instTellersGetByCons',
      txnId: 'instTellersGetByCons'
    },

    tellerPreservation: {
      url: baseUrl+'/PcMng',
      action: 'tellerPreservation',
      txnId: 'tellerPreservation'
    },

    tellerRolesGetByCons: {
      url: baseUrl+'/PcMng',
      action: 'tellerRolesGetByCons',
      txnId: 'tellerRolesGetByCons'
    },

    instRolesGetByCons: {
      url: baseUrl+'/PcMng',
      action: 'instRolesGetByCons',
      txnId: 'instRolesGetByCons'
    },

	synchronizeDeviceModification: {
      url: baseUrl+'/PcMng',
      action: 'synchronizeDeviceModification',
      txnId: 'synchronizeDeviceModification'
    },

    rolePreservation: {
      url: baseUrl+'/PcMng',
      action: 'rolePreservation',
      txnId: 'rolePreservation'
    },

    roleFuncsGetByCons: {
      url: baseUrl+'/PcMng',
      action: 'roleFuncsGetByCons',
      txnId: 'roleFuncsGetByCons'
    },

    roleFuncsModification: {
      url: baseUrl+'/PcMng',
      action: 'roleFuncsModification',
      txnId: 'roleFuncsModification'
    },

    roleClear: {
      url: baseUrl+'/PcMng',
      action: 'roleClear',
      txnId: 'roleClear'
    },

    tellerFuncsGetByCons: {
      url: baseUrl+'/PcMng',
      action: 'tellerFuncsGetByCons',
      txnId: 'tellerFuncsGetByCons'
    },

    tellerRolesModification: {
      url: baseUrl+'/PcMng',
      action: 'tellerRolesModification',
      txnId: 'tellerRolesModification'
    },

    tellerClear: {
      url: baseUrl+'/PcMng',
      action: 'tellerClear',
      txnId: 'tellerClear'
    },

    resetTellerPwdModification: {
      url: baseUrl+'/PcMng',
      action: 'resetTellerPwdModification',
      txnId: 'resetTellerPwdModification'
    },

    tellerInstsGetByCons: {
      url: baseUrl+'/PcMng',
      action: 'tellerInstsGetByCons',
      txnId: 'tellerInstsGetByCons'
    },

    tellerModification: {
      url: baseUrl+'/PcMng',
      action: 'tellerModification',
      txnId: 'tellerModification'
    },

    tellerSpecInstlogin: {
      url: baseUrl+'/PcMng',
      action: 'tellerSpecInstlogin',
      txnId: 'tellerSpecInstlogin'
    },

    unitGetByCons: {
      url: baseUrl+'/PcMng',
      action: 'unitGetByCons',
      txnId: 'unitGetByCons'
    },

    unitModification: {
      url: baseUrl+'/PcMng',
      action: 'unitModification',
      txnId: 'unitModification'
    },

    deviceModification: {
      url: baseUrl+'/PcMng',
      action: 'deviceModification',
      txnId: 'deviceModification'
    },

    unitPreservation: {
      url: baseUrl+'/PcMng',
      action: 'unitPreservation',
      txnId: 'unitPreservation'
    },

    instModification: {
      url: baseUrl+'/PcMng',
      action: 'instModification',
      txnId: 'instModification'
    },

    deviceGetByCons: {
      url: baseUrl+'/PcMng',
      action: 'deviceGetByCons',
      txnId: 'deviceGetByCons'
    },

    resourceGetByCons: {
      url: baseUrl+'/PcMng',
      action: 'resourceGetByCons',
      txnId: 'resourceGetByCons'
    },

    roomerGetByCons: {
      url: baseUrl+'/PcMng',
      action: 'roomerGetByCons',
      txnId: 'roomerGetByCons'
    },

    houseGetByCons: {
      url: baseUrl+'/PcMng',
      action: 'houseGetByCons',
      txnId: 'houseGetByCons'
    },

    pubRes2DevPreservation: {
      url: baseUrl+'/PcMng',
      action: 'pubRes2DevPreservation',
      txnId: 'pubRes2DevPreservation'
    },

    devAndResGetByCons: {
      url: baseUrl+'/PcMng',
      action: 'devAndResGetByCons',
      txnId: 'devAndResGetByCons'
    },

    deviceGetById: {
      url: baseUrl+'/PcMng',
      action: 'deviceGetById',
      txnId: 'deviceGetById'
    },

    deviceOpenDoorModification: {
      url: baseUrl+'/PcMng',
      action: 'deviceOpenDoorModification',
      txnId: 'deviceOpenDoorModification'
    },

    instOpenDoorBatch: {
      url: baseUrl+'/PcMng',
      action: 'instOpenDoorBatch',
      txnId: 'instOpenDoorBatch'
    },

    resourcePreservation: {
      url: baseUrl+'/PcMng',
      action: 'resourcePreservation',
      txnId: 'resourcePreservation'
    },

    resourceModification: {
      url: baseUrl+'/PcMng',
      action: 'resourceModification',
      txnId: 'resourceModification'
    },

    assignDeviceModification: {
      url: baseUrl+'/PcMng',
      action: 'assignDeviceModification',
      txnId: 'assignDeviceModification'
    },

    bindDeviceModification: {
      url: baseUrl+'/PcMng',
      action: 'bindDeviceModification',
      txnId: 'bindDeviceModification'
    },

    sendFile: {
      url: baseUrl+'/PcMng',
      action: 'sendFile',
      txnId: 'sendFile'
    },

    synchronizeResModification: {
      url: baseUrl+'/PcMng',
      action: 'synchronizeResModification',
      txnId: 'synchronizeResModification'
    },

    devAndResClear: {
      url: baseUrl+'/PcMng',
      action: 'devAndResClear',
      txnId: 'devAndResClear'
    },

    housePreservation: {
      url: baseUrl+'/PcMng',
      action: 'housePreservation',
      txnId: 'housePreservation'
    },

    houseModification: {
      url: baseUrl+'/PcMng',
      action: 'houseModification',
      txnId: 'houseModification'
    },

    houseGetById: {
      url: baseUrl+'/PcMng',
      action: 'houseGetById',
      txnId: 'houseGetById'
    },

    houseClear: {
      url: baseUrl+'/PcMng',
      action: 'houseClear',
      txnId: 'houseClear'
    },

    houseInsBatch: {
      url: baseUrl+'/PcMng',
      action: 'houseInsBatch',
      txnId: 'houseInsBatch'
    },

    roomerInsBatch: {
      url: baseUrl+'/PcMng',
      action: 'roomerInsBatch',
      txnId: 'roomerInsBatch'
    },

    roomerPreservation: {
      url: baseUrl+'/PcMng',
      action: 'roomerPreservation',
      txnId: 'roomerPreservation'
    },

    roomer2HousePreservation: {
      url: baseUrl+'/PcMng',
      action: 'roomer2HousePreservation',
      txnId: 'roomer2HousePreservation'
    },

    roomerModification: {
      url: baseUrl+'/PcMng',
      action: 'roomerModification',
      txnId: 'roomerModification'
    },

    roomerClear: {
      url: baseUrl+'/PcMng',
      action: 'roomerClear',
      txnId: 'roomerClear'
    },

    house2RoomerClear: {
      url: baseUrl+'/PcMng',
      action: 'house2RoomerClear',
      txnId: 'house2RoomerClear'
    },

    house2RoomerGetByCons: {
      url: baseUrl+'/PcMng',
      action: 'house2RoomerGetByCons',
      txnId: 'house2RoomerGetByCons'
    },

    batchGetByCons: {
      url: baseUrl+'/PcMng',
      action: 'batchGetByCons',
      txnId: 'batchGetByCons'
    },

    cardGetByCons: {
      url: baseUrl+'/PcMng',
      action: 'cardGetByCons',
      txnId: 'cardGetByCons'
    },

    cardPreservation: {
      url: baseUrl+'/PcMng',
      action: 'cardPreservation',
      txnId: 'cardPreservation'
    },

    house2RoomerPreservation: {
      url: baseUrl+'/PcMng',
      action: 'house2RoomerPreservation',
      txnId: 'house2RoomerPreservation'
    },

    house2RoomerModification: {
      url: baseUrl+'/PcMng',
      action: 'house2RoomerModification',
      txnId: 'house2RoomerModification'
    },

    synchronizeCardModification: {
      url: baseUrl+'/PcMng',
      action: 'synchronizeCardModification',
      txnId: 'synchronizeCardModification'
    },

    resourceClear: {
      url: baseUrl+'/PcMng',
      action: 'resourceClear',
      txnId: 'resourceClear'
    },
  },

  resp: {
    success: {
      code: '0000',
      desc: '交易成功'
    },
  }
};
