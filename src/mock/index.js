/*
定义接口
 */
import Mock from 'mockjs';

const genLoginId = {
  "returnCode": 200,
  "returnMsg": '0k',
  "data": "680472990714040320"
};
Mock.mock('/mock/pcMngLogin/genLoginId', 'post', genLoginId);

const getLoginStatus = {
  "data": {
    "adminFlag": "Admin",
    "funcMap": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
    "macKey": "12345678901234567890123456789012",
    "positionsArray": [
      {
        "createTime": "2019-08-26T15:18:36",
        "departmentId": "AdminSID200217000",
        "funcMap": "f",
        "instId": "I01System001",
        "positionId": "testpostion_id",
        "postionName": "总公司管理员",
        "status": "1",
        "version": 1
      }
    ],
    "sysInstDepartment": {
      "createTellerId": "System",
      "createTime": "2019-08-26T15:18:36",
      "departmentId": "AdminSID200217000",
      "departmentName": "南京总公司管理员部门",
      "instId": "I01System001",
      "status": "1",
      "updateTellerId": "System",
      "updateTime": "2019-09-20T11:41:54.009",
      "version": 1
    },
    "sysInstInfo": {
      "createTellerId": "System",
      "createTime": "2019-08-26T15:18:36",
      "instId": "I01System001",
      "instLevel": "1",
      "instName": "南京华创科技贸易有限公司",
      "isLeaf": "N",
      "linkPhone": "13814105055",
      "parentInstId": "I01System001",
      "status": "1",
      "tellerId": "SystemTel001",
      "updateTellerId": "System",
      "updateTime": "2019-09-20T11:41:54.009",
      "version": 1
    },
    "sysTellerInfo": {
      "createTellerId": "System",
      "createTime": "2019-08-26T15:18:36",
      "status": "1",
      "tellerAddr": "南京市江宁区东山街道金宝江宁大市场9区23号",
      "tellerFlag": "1",
      "tellerId": "hcj001",
      "tellerName": "何成江",
      "tellerPhone": "13814105055",
      "updateTellerId": "System",
      "updateTime": "2019-09-18T14:22:24.553",
      "version": 1
    }
  },
  "returnCode": 200,
  "returnMsg": "OK"
};
Mock.mock('/mock/pcMngLogin/getLoginStatus', 'post', getLoginStatus);

const addInst = {
  "returnCode": 200,
  "returnMsg": "OK",
  "data": {
    "newSysInstInfo": {        //新注册的子机构信息
      "instId": "I02190901DKWKTSXKP0",
      "instLevel": 2,
      "instName": "南京华创科技贸易有限公司",
      "parentInstId": "I01System001",
      "isLeaf": "Y",
      "createTime": 1567335995304,
      "createTellerId": "TELSystem001",
      "updateTimme": 1567335995304,
      "updateTellerId": "TELSystem001",
      "version": 1,
      "status": 1,
    },
    "tellerPwd": "uW3CuQx8",      // 子机构管理员生成的密码
  }
};
Mock.mock('/mock/system/addInst', 'post', addInst);

const getAllInstById = {
  "returnCode": 200,
  "returnMsg": "OK",
  "data": [
    {
      "instId": "I02190901DKWKTSXKP0",
      "instLevel": '2',
      "instName": "南京华创科技贸易有限公司1",
      "parentInstId": "I01System001",
      "isLeaf": "Y",
      "createTime": 1567335995304,
      "createTellerId": "TELSystem001",
      "updateTimme": 1567335995304,
      "updateTellerId": "TELSystem001",
      "version": 1,
      "status": 1,
    },
    {
      "instId": "I02190901DKWKTSXKP1",
      "instLevel": '2',
      "instName": "南京华创科技贸易有限公司2",
      "parentInstId": "I01System001",
      "isLeaf": "Y",
      "createTime": 1567335995304,
      "createTellerId": "TELSystem001",
      "updateTimme": 1567335995304,
      "updateTellerId": "TELSystem001",
      "version": 1,
      "status": 1,
    }
  ]
};
Mock.mock('/mock/system/getAllInstById', 'post', getAllInstById);

const getInstById = {
  "returnCode": 200,
  "returnMsg": "OK",
  "data": {
    "createTellerId": "System",
    "createTime": "2019-08-26T15:18:36",
    "instId": "I01System001",
    "instLevel": "1",
    "instName": "南京华创科技贸易有限公司",
    "isLeaf": "N",
    "linkPhone": "13814105055",
    "parentInstId": "I01System001",
    "status": "1",
    "tellerId": "SystemTel001",
    "updateTellerId": "System",
    "updateTime": "2019-09-20T11:41:54.009",
    "version": 1
  }
};
Mock.mock('/mock/system/getInstById', 'post', getInstById);

const addDepartmentInfo = {
  "returnCode": 200,
  "returnMsg": "OK",
  "data": {
    "departmentId": "SID682529849440604160",
    "departmentName": "depart0003",
    "instId": "I02682166034215604224",
    "memo": null,
    "createTime": "2020-02-27T10:09:56.9",
    "createTellerId": "hcj001",
    "updateTime": "2020-02-27T10:09:56.9",
    "updateTellerId": "hcj001",
    "version": 1,
    "status": "1"
  }
};
Mock.mock('/mock/system/addDepartmentInfo', 'post', addDepartmentInfo);

const listInstDepartments = {
  "returnCode": 200,
  "returnMsg": "OK",
  "data": [
    {
      "departmentName": "管理员部门",
      "instId": "I02682166034215604224",
      "createTellerId": "hcj001",
      "createTime": "2020-02-26T10:04:16.593",
      "departmentId": "AdminSID682166034232381440",
      "memo": null,
      "updateTellerId": "hcj001",
      "updateTime": "2020-02-26T10:04:16.593",
      "version": 1,
      "status": "1"
    },
    {
      "departmentName": "depart0001",
      "instId": "I02682166034215604224",
      "createTellerId": "hcj001",
      "createTime": "2020-02-26T10:19:53.247",
      "departmentId": "SID682169962844000256",
      "memo": null,
      "updateTellerId": "hcj001",
      "updateTime": "2020-02-26T10:19:53.247",
      "version": 1,
      "status": "1"
    },
    {
      "departmentName": "depart0002",
      "instId": "I02682166034215604224",
      "createTellerId": "hcj001",
      "createTime": "2020-02-26T10:26:23.787",
      "departmentId": "SID682171600816181248",
      "memo": null,
      "updateTellerId": "hcj001",
      "updateTime": "2020-02-26T10:26:23.787",
      "version": 1,
      "status": "1"
    }
  ]
};
Mock.mock('/mock/system/listInstDepartments', 'post', listInstDepartments);

const addDepartmentPosition = {
  "returnCode": 200,
  "returnMsg": "OK",
  "positionId": '123',
};
Mock.mock('/mock/system/addDepartmentPosition', 'post', addDepartmentPosition);

const listDepartmentPosition = {
  "returnCode": 200,
  "returnMsg": "OK",
  "data": [
    {
      "positionId": "I02190901DKWKTSXKP0",
      "positionName": "财务运行考核部主管",
      "departmentId": "SID200217001",
      "instId": "I01System001",
      "funcMap": "FFFA01",
      "createTime": 1567335995304,
      "createTellerId": "TELSystem001",
      "updateTimme": 1567335995304,
      "updateTellerId": "TELSystem001",
      "version": 1,
      "status": 1,
    },
    {
      "positionId": "I02190901DKWKTSXKP1",
      "positionName": "总经理",
      "departmentId": "SID200217001",
      "instId": "I01System001",
      "funcMap": "FFFA01",
      "createTime": 1567335995304,
      "createTellerId": "TELSystem001",
      "updateTimme": 1567335995304,
      "updateTellerId": "TELSystem001",
      "version": 1,
      "status": 1,
    },
  ]
};
Mock.mock('/mock/system/listDepartmentPosition', 'post', listDepartmentPosition);

const updateDepartmentPosition = {
  "returnCode": 200,
  "returnMsg": "OK",
};
Mock.mock('/mock/system/updateDepartmentPosition', 'post', updateDepartmentPosition);

const deleteDepartmentPosition = {
  "returnCode": 200,
  "returnMsg": "OK",
};
Mock.mock('/mock/system/deleteDepartmentPosition', 'post', deleteDepartmentPosition);

//员工管理
const addTellerInfo = {
  "returnCode": 200,
  "returnMsg": "OK",
  "tellerPwd": "123456",
};
Mock.mock('/mock/system/addTellerInfo', 'post', addTellerInfo);

const listDepartmentTeller = {
  "returnCode": 200,
  "returnMsg": "OK",
  "data": {
    "records": [
      {
        "tellerId": "wdj",
        "tellerFlag": "1",
        "tellerPhone": "18012345678",
        "tellerPwd": "674bcd2ee7f5006197e8c1fece5bf2f7",
        "tellerName": "飞马",
        "tellerImage": null,
        "tellerAddr": '哈哈国',
        "createTime": "2020-02-26T10:04:16.584",
        "createTellerId": "hcj001",
        "updateTime": "2020-02-26T10:04:16.584",
        "updateTellerId": "hcj001",
        "version": 1,
        "randomKey": "859055",
        "status": "1"
      },
      {
        "tellerId": "wdj",
        "tellerFlag": "1",
        "tellerPhone": "18012345678",
        "tellerPwd": "674bcd2ee7f5006197e8c1fece5bf2f7",
        "tellerName": "啦啦",
        "tellerImage": null,
        "tellerAddr": '哈哈国',
        "createTime": "2020-02-26T10:04:16.584",
        "createTellerId": "hcj001",
        "updateTime": "2020-02-26T10:04:16.584",
        "updateTellerId": "hcj001",
        "version": 1,
        "randomKey": "859055",
        "status": "1"
      },
    ],
    "total": 100,
    "size": 10,
    "current": 1,
    "orders": [],
    "searchCount": true,
    "pages": 1
  }
};
Mock.mock('/mock/system/listDepartmentTeller?currentPage=1&pageSize=10', 'post', listDepartmentTeller);

const updateTellerInfo = {
  "returnCode": 200,
  "returnMsg": "OK",
};
Mock.mock('/mock/system/updateTellerInfo', 'post', updateTellerInfo);

const deleteDepartmentTeller = {
  "returnCode": 200,
  "returnMsg": "OK",
};
Mock.mock('/mock/system/deleteDepartmentTeller', 'post', deleteDepartmentTeller);

const resetTellerPwd = {
  "returnCode": 200,
  "returnMsg": "OK",
  "tellerPwd":"123456"
};
Mock.mock('/mock/system/resetTellerPwd', 'post', resetTellerPwd);

//物资管理
const addGooCategory = {
  "returnCode": 200,
  "returnMsg": "OK",
  "data": {
    "categoryId": "681522072006037504",
    "parentCategory": "681522072006037504",
    "categoryName": "测试分类3",
    "categoryLevel": "1",
    "sortOrder": 3,
    "isLeaf": "Y",
    "createTime": "2020-02-24T15:25:24.074",
    "createTellerId": "hcj001",
    "updateTime": "2020-02-24T15:25:24.074",
    "updateTellerId": "hcj001",
    "version": 1,
    "status": "1",
    "memo": null
  }
};
Mock.mock('/mock/goods/addGooCategory', 'post', addGooCategory);

const deleteGooCategoryById = {
  "returnCode": 200,
  "returnMsg": "OK",
};
Mock.mock('/mock/goods/deleteGooCategoryById', 'post', deleteGooCategoryById);

const updateGooCategoryById = {
  "returnCode": 200,
  "returnMsg": "OK",
  "data": {
    "categoryId": "681523774062989312",
    "parentCategory": "681521092971597824",
    "categoryName": "测试分类修改后2",
    "categoryLevel": "2",
    "sortOrder": 23,
    "isLeaf": "Y",
    "createTime": "2020-02-24T15:32:09.947",
    "createTellerId": "hcj001",
    "updateTime": "2020-02-24T17:05:00.167",
    "updateTellerId": "hcj001",
    "version": 3,
    "status": "1",
    "memo": null
  }
};
Mock.mock('/mock/goods/updateGooCategoryById', 'post', updateGooCategoryById);

const listGooCategorysByPid = {
  "returnCode": 200,
  "returnMsg": "OK",
  "data": [
    {
      "categoryId": "681523350140489728",
      "parentCategory": "681521092971597824",
      "categoryName": "测试分类21",
      "categoryLevel": "1",
      "sortOrder": 21,
      "isLeaf": "Y",
      "createTime": "2020-02-24T15:30:28.779",
      "createTellerId": "hcj001",
      "updateTime": "2020-02-24T15:30:28.779",
      "updateTellerId": "hcj001",
      "version": 1,
      "status": "1",
      "memo": null
    },
    {
      "categoryId": "681523774062989312",
      "parentCategory": "681521092971597824",
      "categoryName": "测试分类修改后2",
      "categoryLevel": "1",
      "sortOrder": 23,
      "isLeaf": "N",
      "createTime": "2020-02-24T15:32:09.947",
      "createTellerId": "hcj001",
      "updateTime": "2020-02-24T17:05:00.167",
      "updateTellerId": "hcj001",
      "version": 3,
      "status": "2",
      "memo": null
    }
  ]
};
Mock.mock('/mock/goods/listGooCategorysByPid', 'post', listGooCategorysByPid);

//物资单位
const listAllUnitinfos = {
  "returnCode": 200,
  "returnMsg": "OK",
  "data": [
    {
      "unitId": "681811686918852608",
      "unitName": "克",
      "createTime": "2020-02-25T10:36:13.666",
      "createTellerId": "hcj001",
      "updateTime": "2020-02-25T10:36:13.666",
      "updateTellerId": "hcj001",
      "version": 1,
      "memo": null
    },
    {
      "unitId": "681812442048761856",
      "unitName": "测试单位1",
      "createTime": "2020-02-25T10:39:13.654",
      "createTellerId": "hcj001",
      "updateTime": "2020-02-25T10:39:13.654",
      "updateTellerId": "hcj001",
      "version": 1,
      "memo": null
    }
  ]
};
Mock.mock('/mock/goods/listAllUnitinfos', 'post', listAllUnitinfos);
