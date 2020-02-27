module.exports = {
  Function: [
    {
      "funcDesc": "机构管理",
      "funcId": "instAction",
      "funcName": "机构管理",
      "parentFuncId": "Root",
      "status": 1
    },
    {
      "funcDesc": "新建子机构",
      "funcId": "instPreservation",
      "funcName": "新建子机构",
      "parentFuncId": "instAction",
      "status": 1
    },
    {
      "funcDesc": "修改子机构",
      "funcId": "instModification",
      "funcName": "修改子机构",
      "parentFuncId": "instAction",
      "status": 1
    },
    {
      "funcDesc": "查询指定机构",
      "funcId": "instGetById",
      "funcName": "查询指定机构",
      "parentFuncId": "instAction",
      "status": 1
    },


    {
      "funcDesc": "角色管理",
      "funcId": "roleAction",
      "funcName": "角色管理",
      "parentFuncId": "Root",
      "status": 1
    },
    {
      "funcDesc": "新建角色",
      "funcId": "rolePreservation",
      "funcName": "新建角色",
      "parentFuncId": "roleAction",
      "status": 1
    },
    {
      "funcDesc": "删除角色",
      "funcId": "roleClear",
      "funcName": "删除角色",
      "parentFuncId": "roleAction",
      "status": 1
    },
    {
      "funcDesc": "修改角色",
      "funcId": "roleModification",
      "funcName": "修改角色",
      "parentFuncId": "roleAction",
      "status": 1
    },
    {
      "funcDesc": "修改角色功能",
      "funcId": "roleFuncsModification",
      "funcName": "修改角色功能",
      "parentFuncId": "roleAction",
      "status": 1
    },
    {
      "funcDesc": "查询指定角色",
      "funcId": "roleGetById",
      "funcName": "查询指定角色",
      "parentFuncId": "roleAction",
      "status": 1
    },

    {
      "funcDesc": "操作员管理",
      "funcId": "tellerAction",
      "funcName": "操作员管理",
      "parentFuncId": "Root",
      "status": 1
    },
    {
      "funcDesc": "新建操作员",
      "funcId": "tellerPreservation",
      "funcName": "新建操作员",
      "parentFuncId": "tellerAction",
      "status": 1
    },
    {
      "funcDesc": "删除操作员",
      "funcId": "tellerClear",
      "funcName": "删除操作员",
      "parentFuncId": "tellerAction",
      "status": 1
    },

    {
      "funcDesc": "修改操作员",
      "funcId": "tellerModification",
      "funcName": "修改操作员",
      "parentFuncId": "tellerAction",
      "status": 1
    },

    {
      "funcDesc": "修改操作员角色",
      "funcId": "tellerRolesModification",
      "funcName": "修改操作员角色",
      "parentFuncId": "tellerAction",
      "status": 1
    },
    {
      "funcDesc": "查询指定操作员",
      "funcId": "tellerGetById",
      "funcName": "查询指定操作员",
      "parentFuncId": "tellerAction",
      "status": 1
    },
    {
      "funcDesc": "重置操作员密码",
      "funcId": "resetTellerPwdModification",
      "funcName": "重置操作员密码",
      "parentFuncId": "tellerAction",
      "status": 1
    },

    {
      "funcDesc": "单元门管理",
      "funcId": "unitAction",
      "funcName": "单元管理",
      "parentFuncId": "Root",
      "status": 1
    },
    {
      "funcDesc": "批量开门",
      "funcId": "openDoorsAction",
      "funcName": "批量开门",
      "parentFuncId": "Root",
      "status": 1
    },
    {
      "funcDesc": "查询单元门信息",
      "funcId": "unitGetById",
      "funcName": "查询单元",
      "parentFuncId": "unitAction",
      "status": 1
    },

    {
      "funcDesc": "房屋管理",
      "funcId": "houseAction",
      "funcName": "房屋管理",
      "parentFuncId": "Root",
      "status": 1
    },

    {
      "funcDesc": "房屋批量导入",
      "funcId": "houseBatchAction",
      "funcName": "房屋批量导入",
      "parentFuncId": "Root",
      "status": 1
    },

    {
      "funcDesc": "设备管理",
      "funcId": "deviceAction",
      "funcName": "设备管理",
      "parentFuncId": "Root",
      "status": 1
    },

    {
      "funcDesc": "分配设备",
      "funcId": "assignDeviceModification",
      "funcName": "分配设备",
      "parentFuncId": "deviceAction",
      "status": 1
    },

    {
      "funcDesc": "资源管理",
      "funcId": "resourceAction",
      "funcName": "资源管理",
      "parentFuncId": "Root",
      "status": 1
    },
    {
      "funcDesc": "资源发布",
      "funcId": "resourcePublishAction",
      "funcName": "资源发布",
      "parentFuncId": "Root",
      "status": 1
    },
    {
      "funcDesc": "住户管理",
      "funcId": "roomerAction",
      "funcName": "住户管理",
      "parentFuncId": "Root",
      "status": 1
    },
    {
      "funcDesc": "住户批量导入",
      "funcId": "roomerBatchAction",
      "funcName": "住户批量导入",
      "parentFuncId": "Root",
      "status": 1
    },

    {
      "funcDesc": "绑定解绑设备",
      "funcId": "bindDeviceModification",
      "funcName": "绑定解绑设备",
      "parentFuncId": "deviceAction",
      "status": 1
    },
    {
      "funcDesc": "门卡管理",
      "funcId": "CardListAction",
      "funcName": "门卡管理",
      "parentFuncId": "Root",
      "status": 1
    },
    {
      "funcDesc": "新增卡片",
      "funcId": "cardPreservation",
      "funcName": "新增卡片",
      "parentFuncId": "CardListAction",
      "status": 1
    },
    {
      "funcDesc": "删除单元门设备资源",
      "funcId": "devAndResClear",
      "funcName": "删除单元门设备资源",
      "parentFuncId": "unitAction",
      "status": 1
    },
    {
      "funcDesc": "设备信息修改",
      "funcId": "deviceModification",
      "funcName": "设备信息修改",
      "parentFuncId": "deviceAction",
      "status": 1
    },
    {
      "funcDesc": "单元设备开门",
      "funcId": "deviceOpenDoorModification",
      "funcName": "单元设备开门",
      "parentFuncId": "deviceAction",
      "status": 1
    },
    {
      "funcDesc": "删除房屋住户对应关系",
      "funcId": "house2RoomerClear",
      "funcName": "删除房屋住户对应关系",
      "parentFuncId": "houseAction",
      "status": 1
    },
    {
      "funcDesc": "修改房屋住户对应关系",
      "funcId": "house2RoomerModification",
      "funcName": "修改房屋住户对应关系",
      "parentFuncId": "houseAction",
      "status": 1
    },
    {
      "funcDesc": "新增房屋住户对应关系",
      "funcId": "house2RoomerPreservation",
      "funcName": "新增房屋住户对应关系",
      "parentFuncId": "houseAction",
      "status": 1
    },
    {
      "funcDesc": "删除房屋资料",
      "funcId": "houseClear",
      "funcName": "删除房屋资料",
      "parentFuncId": "houseAction",
      "status": 1
    },
    {
      "funcDesc": "新增房屋资料-批量",
      "funcId": "houseInsBatch",
      "funcName": "新增房屋资料-批量",
      "parentFuncId": "houseBatchAction",
      "status": 1
    },
    {
      "funcDesc": "修改房屋资料",
      "funcId": "houseModification",
      "funcName": "修改房屋资料",
      "parentFuncId": "houseAction",
      "status": 1
    },
    {
      "funcDesc": "新增房屋资料",
      "funcId": "housePreservation",
      "funcName": "新增房屋资料",
      "parentFuncId": "houseAction",
      "status": 1
    },
    {
      "funcDesc": "删除子机构",
      "funcId": "instClear",
      "funcName": "删除子机构",
      "parentFuncId": "instAction",
      "status": 1
    },
    {
      "funcDesc": "设备开门-批量",
      "funcId": "instOpenDoorBatch",
      "funcName": "设备开门-批量",
      "parentFuncId": "deviceAction",
      "status": 1
    },

    {
      "funcDesc": "资源发布单元门设备",
      "funcId": "pubRes2DevPreservation",
      "funcName": "资源发布单元门设备",
      "parentFuncId": "resourceAction",
      "status": 1
    },
    {
      "funcDesc": "删除资源",
      "funcId": "resourceClear",
      "funcName": "删除资源",
      "parentFuncId": "resourceAction",
      "status": 1
    },
    {
      "funcDesc": "资源修改",
      "funcId": "resourceModification",
      "funcName": "资源修改",
      "parentFuncId": "resourceAction",
      "status": 1
    },
    {
      "funcDesc": "资源新增",
      "funcId": "resourcePreservation",
      "funcName": "资源新增",
      "parentFuncId": "resourceAction",
      "status": 1
    },

    {
      "funcDesc": "新增住户资料-关联房屋",
      "funcId": "roomer2HousePreservation",
      "funcName": "新增住户资料-关联房屋",
      "parentFuncId": "roomerAction",
      "status": 1
    },

    {
      "funcDesc": "删除住户资料",
      "funcId": "roomerClear",
      "funcName": "删除住户资料",
      "parentFuncId": "roomerAction",
      "status": 1
    },
    {
      "funcDesc": "新增住户资料-批量",
      "funcId": "roomerInsBatch",
      "funcName": "新增住户资料-批量",
      "parentFuncId": "roomerBatchAction",
      "status": 1
    },
    {
      "funcDesc": "修改住户资料",
      "funcId": "roomerModification",
      "funcName": "修改住户资料",
      "parentFuncId": "roomerAction",
      "status": 1
    },
    {
      "funcDesc": "新增住户资料-不关联房屋",
      "funcId": "roomerPreservation",
      "funcName": "新增住户资料-不关联房屋",
      "parentFuncId": "roomerAction",
      "status": 1
    },
    {
      "funcDesc": "卡片信息设备同步",
      "funcId": "synchronizeCardModification",
      "funcName": "卡片信息设备同步",
      "parentFuncId": "CardListAction",
      "status": 1
    },
    {
      "funcDesc": "设备信息同步",
      "funcId": "synchronizeDeviceModification",
      "funcName": "设备信息同步",
      "parentFuncId": "deviceAction",
      "status": 1
    },
    {
      "funcDesc": "设备同步资源",
      "funcId": "synchronizeResModification",
      "funcName": "设备同步资源",
      "parentFuncId": "resourcePublishAction",
      "status": 1
    },
    {
      "funcDesc": "删除单元门信息",
      "funcId": "unitClear",
      "funcName": "删除单元",
      "parentFuncId": "unitAction",
      "status": 1
    },
    {
      "funcDesc": "修改单元门信息",
      "funcId": "unitModification",
      "funcName": "修改单元",
      "parentFuncId": "unitAction",
      "status": 1
    },
    {
      "funcDesc": "新增单元门信息",
      "funcId": "unitPreservation",
      "funcName": "新增单元",
      "parentFuncId": "unitAction",
      "status": 1
    },
    {
      "funcDesc": "批量结果查询",
      "funcId": "BatcQueryhAction",
      "funcName": "批量结果查询",
      "parentFuncId": "Root",
      "status": 1
    },
  ]
};
