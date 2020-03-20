module.exports = {
    routes: [
        {
            path: '',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            redirect: '/home',
            meta: {title: '自述文件'},
            children: [
                {
                    path: '/home',
                    component: resolve => require(['../components/page/home.vue'], resolve),
                    meta: {title: '欢迎', keepAlive:true}
                },

                {
                    path: '/instAction',
                    component: resolve => require(['../components/page/setting/instAction.vue'], resolve),
                    meta: {title: '公司设置', function: 'instAction'}
                },

                {
                    path: '/departmentAction',
                    component: resolve => require(['../components/page/setting/departmentAction.vue'], resolve),
                    meta: {title: '部门设置', function: 'departmentAction'}
                },

                {
                    path: '/positionAction',
                    component: resolve => require(['../components/page/setting/positionAction.vue'], resolve),
                    meta: {title: '职位设置', function: 'positionAction'}
                },

                {
                    path: '/tellerAction',
                    component: resolve => require(['../components/page/setting/tellerAction.vue'], resolve),
                    meta: {title: '员工管理', function: 'tellerAction'}
                },

                {
                    path: '/categoryAction',
                    component: resolve => require(['../components/page/goods/categoryAction.vue'], resolve),
                    meta: {title: '物资分类', function: 'categoryAction'}
                },
                {
                    path: '/unitAction',
                    component: resolve => require(['../components/page/goods/unitAction.vue'], resolve),
                    meta: {title: '物资单位', function: 'unitAction'}
                },
                {
                    path: '/goodslistAction',
                    component: resolve => require(['../components/page/goods/goodslistAction.vue'], resolve),
                    meta: {title: '物资列表', function: 'goodslistAction'}
                },
                {
                    path: '/goodsInfos',
                    component: resolve => require(['../components/page/goods/goodsInfos.vue'], resolve),
                    meta: {title: '物资信息', function: 'goodsInfos'}
                },
                {
                    path: '/partTimeJob',
                    component: resolve => require(['../components/page/setting/partTimeJob.vue'], resolve),
                    meta: {title: '员工兼职', function: 'goodsInfos'}
                },
                {
                    path: '/userPassword',
                    component: resolve => require(['../components/page/setting/userPassword.vue'], resolve),
                    meta: {title: '修改密码', function: 'userPassword'}
                },
                {
                    path: '/departmentLogin',
                    component: resolve => require(['../components/page/setting/departmentLogin.vue'], resolve),
                    meta: {title: '切换部门', function: 'departmentLogin'}
                },
                {
                    path: '/goodsSerail',
                    component: resolve => require(['../components/page/goods/goodsSerail.vue'], resolve),
                    meta: {title: '物资系列', function: 'goodsSerail'}
                },
                {
                    path: '/batchListAction',
                    component: resolve => require(['../components/page/batch/batchListAction.vue'], resolve),
                    meta: {title: '批次列表', function: 'batchListAction'}
                },
                {
                    path: '/batchInfoAction',
                    component: resolve => require(['../components/page/batch/batchInfoAction.vue'], resolve),
                    meta: {title: '批次操作', function: 'batchInfoAction'}
                },
                {
                    path: '/goodsSale',
                    component: resolve => require(['../components/page/sale/goodsSale.vue'], resolve),
                    meta: {title: '商品销售', function: 'goodsSale', keepAlive:false}
                },
                {
                    path: '/orderlistAction',
                    component: resolve => require(['../components/page/order/orderlistAction.vue'], resolve),
                    meta: {title: '订单列表', function: 'orderlistAction', keepAlive:true}
                },
                {
                    path: '/myOrderAction',
                    component: resolve => require(['../components/page/order/myOrderAction.vue'], resolve),
                    meta: {title: '我的订单', function: 'myOrderAction', keepAlive:true}
                },
                {
                    path: '/test',
                    component: resolve => require(['../test/Test.vue'], resolve),
                    meta: {title: '测试页面', function: 'test'}
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ],

    //只需要存在permissions中的一个权限，那么就展示功能点
    //function是路由path
    //在Sidebar.vue中处理此Sidebar数组配置
    Sidebar: [
        {
            icon: 'el-icon-house',
            index: 'home',
            title: '欢迎',
            flag: true,
        },

        {
            icon: 'el-icon-tickets',
            index: 'order',
            title: '订单管理',
            flag: false,
            subs: [
                {
                    index: 'myOrderAction',
                    title: '我的订单',
                    flag: true,
                    function: 'myOrderAction',
                    permissions: [
                        'createOrder'
                    ]
                },
                {
                    index: 'orderlistAction',
                    title: '订单列表',
                    flag: true,
                    function: 'orderlistAction',
                    permissions: [
                        'listAllOrders',
                        'confirmOrderStock',
                        'confirmOrderPay',
                        'confirmOrderSend',
                        'closeOrder',
                    ]
                },
            ],
        },

        {
            icon: 'el-icon-shopping-bag-2',
            index: 'goods',
            title: '物资管理',
            flag: false,
            subs: [
                {
                    index: 'goodslistAction',
                    title: '物资列表',
                    flag: true,
                    function: 'goodslistAction',
                    permissions: [
                        'addGooTGoodsinfo',
                        'deleteGooTGoodsinfoById',
                        'updateGooTGoodsinfoById',
                        'getGooTGoodsinfoById',
                        'listGoodsinfosByConditions',
                        'addGoodsProductmanual',
                        'deleteGoodsProductmanualById',
                        'updateGoodsProductmanualById',
                        'getGoodsProductmanualById',
                        'addGoodsQualitycertify',
                        'deleteGoodsQualitycertifyById',
                        'updateGoodsQualitycertifyById',
                        'getGoodsQualitycertifyById',
                        'addGoodsserial',
                        'deleteGoodsserialById',
                        'deleteGoodsserialByGoodsId',
                        'updateGoodsserialById',
                        'getGoodsserialById',
                        'listGoodsserialsByGoodsId'
                    ]
                },
                {
                    index: 'categoryAction',
                    title: '物资分类',
                    flag: true,
                    function: 'categoryAction',
                    permissions: [
                        'getGooCategoryById',
                        'addGooCategory',
                        'deleteGooCategoryById',
                        'updateGooCategoryById',
                    ]
                },
                {
                    index: 'unitAction',
                    title: '物资单位',
                    flag: true,
                    function: 'unitAction',
                    permissions: [
                        'addGooUnitinfo',
                        'deleteGooUnitinfoById',
                        'getGooUnitinfoById',
                        'listAllUnitinfos'
                    ]
                },
            ],
        },

        {
            icon: 'el-icon-shopping-cart-full',
            index: 'batch',
            title: '采购管理',
            flag: false,
            subs: [
                {
                    index: 'batchListAction',
                    title: '批次列表',
                    flag: false,
                    function: 'batchListAction',
                    permissions: [
                        'listBatchsByCon',
                        'addBatchinfo',
                        'updateBatchinfo',
                        'deleteBatchinfoById',
                        'getBatchinfoById',
                        'listBatchGoodsByCon',
                    ]
                },
                {
                    index: 'batchInfoAction',
                    title: '批次操作',
                    flag: false,
                    function: 'batchInfoAction',
                    permissions: [
                        'addBatchGoods',
                        'updateBatchGoodsById',
                        'deleteBatchGoodsById',
                        'getBatchGoodsById',
                        'uptBatchLadingBill',
                        'uptBatchRealCount',
                        'listSerialsByConditions',
                        'submitLocalPrice',
                        'cacSuggestPrice'
                    ]
                },
            ],
        },

        {
            icon: 'el-icon-setting',
            index: 'setting',
            title: '系统设置',
            flag: false,
            subs: [
                {
                    index: 'instAction',
                    title: '公司设置',
                    flag: false,
                    function: 'instAction',
                    permissions: [
                        'updateInstInfo',
                        'getAllInstById',
                        'getInstById',
                        'chgInstAdmin',
                        'addInst'
                    ]
                },
                {
                    index: 'departmentAction',
                    title: '部门设置',
                    flag: false,
                    function: 'departmentAction',
                    permissions: [
                        'listInstDepartments',
                        'addDepartmentInfo',
                        'updateDepartmentInfo',
                        'deleteDepartmentInfo'
                    ]
                },
                {
                    index: 'positionAction',
                    title: '职位设置',
                    flag: false,
                    function: 'positionAction',
                    permissions: [
                        'addDepartmentPosition',
                        'listDepartmentPosition',
                        'updateDepartmentPosition',
                        'deleteDepartmentPosition'
                    ]
                },
                {
                    index: 'tellerAction',
                    title: '员工管理',
                    flag: false,
                    function: 'tellerAction',
                    permissions: [
                        'addTellerInfo',
                        'addTellerDepartment',
                        'listDepartmentTeller',
                        'getTellerInfoById',
                        'updateTellerInfo',
                        'deleteDepartmentTeller',
                        'resetTellerPwd',
                        'checkTellerId',
                        'departmentLogin',
                        'loginOut'
                    ]
                },
            ],
        },
    ]
};
