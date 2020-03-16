/**
 * 权限处理
 * 在Login.vue中，查询二维码登录状态成功，允许登录后调用handelPermission函数处理权限
 */
import {hex_to_bin} from "../Gw/GwString";
import store from '../store'
import * as cfg from "../config/cfg";

let BASE_URL = cfg.baseUrl;
let BASE_URL_API = cfg.baseUrlApi;

//所有权限
//属性index为funcMap位图的位置，从1开始；index为null表示此权限默认存在
const PERMISSIONS = {
    //1
    addSystemChannel: {
        index: 1,
        name: '系统交易渠道信息表新增',
        url: BASE_URL + '/system/addSystemChannel',
        txnId: 'addSystemChannel'
    },
    //10
    createOrder: {
        index: 10,
        name: '下单',
        url: BASE_URL_API + '/order/createOrder',
        txnId: 'createOrder'
    },
    //11
    listAllOrders: {
        index: 11,
        name: '查询所有订单',
        url: BASE_URL + '/orderMng/listAllOrders',
        txnId: 'listAllOrders'
    },
    //12
    confirmOrderStock: {
        index: 12,
        name: '接单',
        url: BASE_URL + '/orderMng/confirmOrderStock',
        txnId: 'confirmOrderStock'
    },
    //13
    confirmOrderPay: {
        index: 13,
        name: '确认订单收款',
        url: BASE_URL + '/orderMng/confirmOrderPay',
        txnId: 'confirmOrderPay'
    },
    //14
    confirmOrderSend: {
        index: 14,
        name: '确认订单发货',
        url: BASE_URL + '/orderMng/confirmOrderSend',
        txnId: 'confirmOrderSend'
    },
    //15
    closeOrder: {
        index: 15,
        name: '关闭订单',
        url: BASE_URL + '/orderMng/closeOrder',
        txnId: 'closeOrder'
    },
    //31
    listBatchsByCon: {
        index: 31,
        name: '查询所有批次信息',
        url: BASE_URL + '/batch/listBatchsByCon',
        txnId: 'listBatchsByCon'
    },
    //32
    addBatchinfo: {
        index: 32,
        name: '新增批次(集装箱)',
        url: BASE_URL + '/batch/addBatchinfo',
        txnId: 'addBatchinfo'
    },
    //33
    updateBatchinfo: {
        index: 33,
        name: '修改批次(集装箱)',
        url: BASE_URL + '/batch/updateBatchinfo',
        txnId: 'updateBatchinfo'
    },
    //34
    deleteBatchinfoById: {
        index: 34,
        name: '删除批次(集装箱)',
        url: BASE_URL + '/batch/deleteBatchinfoById',
        txnId: 'deleteBatchinfoById'
    },
    //31
    getBatchinfoById: {
        index: 35,
        name: '查询批次(集装箱)',
        url: BASE_URL + '/batch/getBatchinfoById',
        txnId: 'getBatchinfoById'
    },
    //36
    listBatchGoodsByCon: {
        index: 36,
        name: '查询所有批次(集装箱)对应物资',
        url: BASE_URL + '/batch/listBatchGoodsByCon',
        txnId: 'listBatchGoodsByCon'
    },
    //37
    addBatchGoods: {
        index: 37,
        name: '批次(集装箱)录入采购物资',
        url: BASE_URL + '/batch/addBatchGoods',
        txnId: 'addBatchGoods'
    },
    //38
    updateBatchGoodsById: {
        index: 38,
        name: '修改采购批次物资信息',
        url: BASE_URL + '/batch/updateBatchGoodsById',
        txnId: 'updateBatchGoodsById'
    },
    //39
    deleteBatchGoodsById: {
        index: 39,
        name: '删除批次物资',
        url: BASE_URL + '/batch/deleteBatchGoodsById',
        txnId: 'deleteBatchGoodsById'
    },
    //40
    getBatchGoodsById: {
        index: 40,
        name: '查询批次物资',
        url: BASE_URL + '/batch/getBatchGoodsById',
        txnId: 'getBatchGoodsById'
    },
    //41
    uptBatchLadingBill: {
        index: 41,
        name: '提交批次运单号',
        url: BASE_URL + '/batch/uptBatchLadingBill',
        txnId: 'uptBatchLadingBill'
    },
    //42
    uptBatchRealCount: {
        index: 42,
        name: '批次物资入库',
        url: BASE_URL + '/batch/uptBatchRealCount',
        txnId: 'uptBatchRealCount'
    },
    //43
    listSerialsByConditions: {
        index: 43,
        name: '查询所有指定条件的系列',
        url: BASE_URL + '/batch/listSerialsByConditions',
        txnId: 'listSerialsByConditions'
    },
    //51
    submitLocalPrice: {
        index: 51,
        name: '提交本地价格',
        url: BASE_URL + '/fixPrice/submitLocalPrice',
        txnId: 'submitLocalPrice'
    },
    //52
    cacSuggestPrice: {
        index: 52,
        name: '提交建议价格',
        url: BASE_URL + '/fixPrice/cacSuggestPrice',
        txnId: 'cacSuggestPrice'
    },
    //53
    submitReportPrice: {
        index: 53,
        name: '提交申报零售价',
        url: BASE_URL + '/fixPrice/submitReportPrice',
        txnId: 'submitReportPrice'
    },
    //54
    putonBatch: {
        index: 54,
        name: '批次物资上架',
        url: BASE_URL + '/fixPrice/putonBatch',
        txnId: 'putonBatch'
    },
    //102
    addInst: {
        index: 102,
        name: '添加子公司'
    },
    //105
    listInstDepartments: {
        index: 105,
        name: '查询公司所有部门'
    },
    //104
    addDepartmentInfo: {
        index: 104,
        name: '新增部门'
    },
    //107
    addDepartmentPosition: {
        index: 107,
        name: '新增部门职位'
    },
    //106
    listDepartmentPosition: {
        index: 106,
        name: '查询部门职位'
    },
    //108
    updateDepartmentPosition: {
        index: 108,
        name: '修改部门职位'
    },
    //109
    deleteDepartmentPosition: {
        index: 109,
        name: '删除部门职位'
    },
    //110
    listDepartmentTeller: {
        index: 110,
        name: '查询部门所有员工'
    },
    //111
    addTellerInfo: {
        index: 111,
        name: '新增部门员工'
    },
    //112
    getInstById: {
        index: 112,
        name: '查询公司信息'
    },
    //113
    addTellerDepartment: {
        index: 113,
        name: '员工兼职'
    },
    //115
    updateTellerInfo: {
        index: 115,
        name: '修改部门员工'
    },
    //116
    deleteDepartmentTeller: {
        index: 116,
        name: '删除部门员工'
    },
    //117
    resetTellerPwd: {
        index: 117,
        name: '重置员工密码'
    },
    //118
    checkTellerId: {
        index: 118,
        name: '检查用户注册情况'
    },
    //119
    chgTellerPwd: {
        index: 119,
        name: '修改密码'
    },
    //120
    departmentLogin: {
        index: 120,
        name: '部门切换'
    },
    //122
    updateInstInfo: {
        index: 122,
        name: '修改公司信息',
        url: BASE_URL + '/system/updateInstInfo',
        txnId: 'updateInstInfo'
    },
    //123
    updateDepartmentInfo: {
        index: 123,
        name: '修改部门信息',
        url: BASE_URL + '/system/updateDepartmentInfo',
        txnId: 'updateDepartmentInfo'
    },
    //124
    deleteDepartmentInfo: {
        index: 124,
        name: '删除部门信息',
        url: BASE_URL + '/system/deleteDepartmentInfo',
        txnId: 'deleteDepartmentInfo'
    },
    //201
    addGooCategory: {
        index: 201,
        name: '新增物资分类'
    },
    //202
    deleteGooCategoryById: {
        index: 202,
        name: '删除物资分类'
    },
    //203
    updateGooCategoryById: {
        index: 203,
        name: '修改物资分类'
    },
    //204
    getGooCategoryById: {
        index: 204,
        name: '查询物资分类',
        url: BASE_URL + '/goods/getGooCategoryById',
        txnId: 'getGooCategoryById'
    },
    //205
    listGooCategorysByPid: {
        index: 205,
        name: '查询物资所有子分类',
        url: BASE_URL + '/goods/listGooCategorysByPid',
        txnId: 'listGooCategorysByPid'
    },
    //206
    addGooUnitinfo: {
        index: 206,
        name: '新增物资单位'
    },
    //207
    deleteGooUnitinfoById: {
        index: 207,
        name: '删除物资单位'
    },
    //208
    getGooUnitinfoById: {
        index: 208,
        name: '查询物资单位'
    },
    //209
    listAllUnitinfos: {
        index: 209,
        name: '查询所有单位'
    },
    //210
    genGoodsId: {
        // 暂时不控制权限
        // index:210,
        name: '获取物资ID'
    },
    //211
    sendPicture: {
        // 暂时不控制权限
        // index:211,
        name: '上传图片'
    },
    //212
    addGooTGoodsinfo: {
        index: 212,
        name: '新增物资基础信息'
    },
    //213
    deleteGooTGoodsinfoById: {
        index: 213,
        name: '删除物资基础信息'
    },
    //214
    updateGooTGoodsinfoById: {
        index: 214,
        name: '修改物资基础信息'
    },
    //215
    getGooTGoodsinfoById: {
        index: 215,
        name: '查询物资基础信息'
    },
    //216
    listGoodsinfosByConditions: {
        index: 216,
        name: '查询所有物资信息'
    },
    //217
    addGoodsProductmanual: {
        index: 217,
        name: '新增物资产品说明书'
    },
    //218
    deleteGoodsProductmanualById: {
        index: 218,
        name: '删除物资产品说明书'
    },
    //219
    updateGoodsProductmanualById: {
        index: 219,
        name: '修改物资产品说明书'
    },
    //220
    getGoodsProductmanualById: {
        index: 220,
        name: '查询物资产品说明书'
    },
    //221
    addGoodsQualitycertify: {
        index: 221,
        name: '新增质保证书'
    },
    //222
    deleteGoodsQualitycertifyById: {
        index: 222,
        name: '删除质保证书'
    },
    //223
    updateGoodsQualitycertifyById: {
        index: 223,
        name: '修改质保证书'
    },
    //224
    getGoodsQualitycertifyById: {
        index: 224,
        name: '查询质保证书'
    },
    //225
    addGoodsserial: {
        index: 225,
        name: '新增物资系列信息'
    },
    //226
    deleteGoodsserialById: {
        index: 226,
        name: '删除物资系列信息'
    },
    //227
    deleteGoodsserialByGoodsId: {
        index: 227,
        name: '删除物资系列信息'
    },
    //228
    updateGoodsserialById: {
        index: 228,
        name: '修改物资系列信息'
    },
    //229
    getGoodsserialById: {
        index: 229,
        name: '查询物资系列信息',
        url: BASE_URL + '/goods/getGoodsserialById',
        txnId: 'getGoodsserialById'
    },
    //230
    listGoodsserialsByGoodsId: {
        index: 230,
        name: '查询系列信息'
    },

    //无index
    genLoginId: {
        index: null,
        name: '获取PCWEB登陆二维码'
    },
    getLoginStatus: {
        index: null,
        name: '查询二维码登录状态'
    },
    wxIndexContent: {
        name: '首页内容',
        url: BASE_URL_API + '/wxBase/wxIndexContent',
        txnId: 'wxIndexContent'
    },
    getAllConfig: {
        name: '获取所有配置',
        url: BASE_URL_API + '/wxCache/getAllConfig',
        txnId: 'getAllConfig'
    },
    getManualCertify: {
        name: '获取产品说明书和质保证书',
        url: BASE_URL_API + '/wxCache/getManualCertify',
        txnId: 'getManualCertify'
    },
    getSerialBySpecGoodsId: {
        name: '获取上架物资具体信息',
        url: BASE_URL_API + '/wxCache/getSerialBySpecGoodsId',
        txnId: 'getSerialBySpecGoodsId'
    },
    listMyOrders: {
        name: '我的订单',
        url: BASE_URL_API + '/wxCache/listMyOrders',
        txnId: 'listMyOrders'
    },
};

const handelPermission = function (funcMap) {
    let permissions = funcMap2position(funcMap);
    //将权限数组存入store
    store.commit('setPermissions', permissions);
};

const getPermissions = function () {
    return store.getters.permissions;
};

/**
 * 将funcMap转成权限数组
 * @param funcMap
 * @returns {[]}
 */
const funcMap2position = function (funcMap) {
    //权限数组permissions，以后每次交易查询此数组，看是否有权限。
    let permissions = [];
    let permissionMap = hex_to_bin(funcMap);
    console.log('permissionMap', permissionMap); //debug
    let length = permissionMap.length;
    //遍历所有权限配置，如果此权限在权限map有配置，那么此权限存入权限数组permissions
    for (let permission in PERMISSIONS) {
        let index = PERMISSIONS[permission].index;
        if (index) {
            if (index - 1 < length) {
                if (permissionMap.substr(index - 1, 1) === '1') {
                    permissions.push(permission);
                }
            }
        } else {
            permissions.push(permission);
        }
    }
    console.log('funcMap转permissions', permissions); //debug
    return permissions;
};

/**
 * 权限数组转funcMap
 * @param position
 * @returns {string}
 */
const position2funcMap = function (position) {
    let funcMapTmp = new Array(1024);
    for (let i = 0; i < 1024; i++) {
        funcMapTmp[i] = '0';
    }
    let max = 0;
    position.forEach(item => {
        if (PERMISSIONS[item]) {
            //注意：权限funcMap位置从1开始计算，但是数组下标是从0开始算的
            let index = PERMISSIONS[item].index;
            funcMapTmp[index - 1] = '1';
            if (max < index) {
                max = index;
            }
        }
    });
    let x8 = parseInt(max / 8 + 1);
    funcMapTmp.length = 8 * x8;
    let funcMap = '';
    for (let i = 0; i < x8 * 2; i++) {
        let funcStr = funcMapTmp[4 * i] + funcMapTmp[4 * i + 1] + funcMapTmp[4 * i + 2] + funcMapTmp[4 * i + 3];
        switch (funcStr) {
            case '0000':
                funcMap += '0';
                break;
            case '0001':
                funcMap += '1';
                break;
            case '0010':
                funcMap += '2';
                break;
            case '0011':
                funcMap += '3';
                break;
            case '0100':
                funcMap += '4';
                break;
            case '0101':
                funcMap += '5';
                break;
            case '0110':
                funcMap += '6';
                break;
            case '0111':
                funcMap += '7';
                break;
            case '1000':
                funcMap += '8';
                break;
            case '1001':
                funcMap += '9';
                break;
            case '1010':
                funcMap += 'A';
                break;
            case '1011':
                funcMap += 'B';
                break;
            case '1100':
                funcMap += 'C';
                break;
            case '1101':
                funcMap += 'D';
                break;
            case '1110':
                funcMap += 'E';
                break;
            case '1111':
                funcMap += 'F';
                break;
            default:
                funcMap += '0';
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
