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
                    meta: {title: '员工管理', function: 'tellerAction', keepAlive:true}
                },
                {
                    path: '/customAction',
                    component: resolve => require(['../components/page/setting/customAction.vue'], resolve),
                    meta: {title: '顾客管理', function: 'customAction'}
                },

                {
                    path: '/categoryAction',
                    component: resolve => require(['../components/page/goods/categoryAction.vue'], resolve),
                    meta: {title: '物资分类', function: 'categoryAction'}
                },
                {
                    path: '/categoryOrderAction',
                    component: resolve => require(['../components/page/goods/categoryOrderAction.vue'], resolve),
                    meta: {title: '分类排序', function: 'categoryOrderAction'}
                },
                {
                    path: '/unitAction',
                    component: resolve => require(['../components/page/goods/unitAction.vue'], resolve),
                    meta: {title: '物资单位', function: 'unitAction'}
                },
                {
                    path: '/goodslistAction',
                    component: resolve => require(['../components/page/goods/goodslistAction.vue'], resolve),
                    meta: {title: '物资基础信息', function: 'goodslistAction', keepAlive:true}
                },
                {
                    path: '/putDownAction',
                    component: resolve => require(['../components/page/goods/putDownAction.vue'], resolve),
                    meta: {title: '上下架管理', function: 'putDownAction'}
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
                    meta: {title: '批次列表', function: 'batchListAction', keepAlive:true}
                },
                {
                    path: '/batchInfoAction',
                    component: resolve => require(['../components/page/batch/batchInfoAction.vue'], resolve),
                    meta: {title: '批次操作', function: 'batchInfoAction'}
                },
                {
                    path: '/unusualBatchInfoAction',
                    component: resolve => require(['../components/page/batch/unusualBatchInfoAction.vue'], resolve),
                    meta: {title: '异常批次物资明细', function: 'unusualBatchInfoAction'}
                },
                {
                    path: '/unusualBatchListAction',
                    component: resolve => require(['../components/page/batch/unusualBatchListAction.vue'], resolve),
                    meta: {title: '异常批次', function: 'unusualBatchListAction', keepAlive:true}
                },
                {
                    path: '/goodsSale',
                    component: resolve => require(['../components/page/sale/goodsSale.vue'], resolve),
                    meta: {title: '商品销售', function: 'goodsSale', keepAlive:false}
                },
                {
                    path: '/orderlistAction',
                    component: resolve => require(['../components/page/order/orderlistAction.vue'], resolve),
                    meta: {title: '订单处理', function: 'orderlistAction', keepAlive:true}
                },
                {
                    path: '/unusualOrderAction',
                    component: resolve => require(['../components/page/order/unusualOrderAction.vue'], resolve),
                    meta: {title: '异常订单', function: 'unusualOrderAction'}
                },
                {
                    path: '/myOrderAction',
                    component: resolve => require(['../components/page/order/myOrderAction.vue'], resolve),
                    meta: {title: '我的订单', function: 'myOrderAction', keepAlive:true}
                },
                {
                    path: '/rateAction',
                    component: resolve => require(['../components/page/setting/rateAction.vue'], resolve),
                    meta: {title: '汇率管理', function: 'rateAction'}
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
                        'createOrder',
                    ]
                },
                {
                    index: 'orderlistAction',
                    title: '订单处理',
                    flag: true,
                    function: 'orderlistAction',
                    permissions: [
                        'listAllOrders',
                        'confirmOrderStock',
                        'confirmOrderPay',
                        'confirmOrderSend',
                        'closeOrder',
                        'killOrderById',
                    ]
                },
                {
                    index: 'unusualOrderAction',
                    title: '异常订单',
                    flag: true,
                    function: 'unusualOrderAction',
                    permissions: [
                        'listAllKilledOrders',
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
                    index: 'categoryAction',
                    title: '物资分类',
                    flag: true,
                    function: 'categoryAction',
                    permissions: [
                        'addGooCategory',
                        'deleteGooCategoryById',
                        'updateGooCategoryById',
                        'getGooCategoryById'
                    ]
                },
                {
                    index: 'unitAction',
                    title: '物资单位',
                    flag: true,
                    function: 'unitAction',
                    permissions: [
                        'listAllUnitinfos',
                        'addGooUnitinfo',
                        'deleteGooUnitinfoById',
                    ]
                },
                {
                    index: 'goodslistAction',
                    title: '物资基础信息',
                    flag: true,
                    function: 'goodslistAction',
                    permissions: [
                        'addGooTGoodsinfo',
                        'deleteGooTGoodsinfoById',
                        'updateGooTGoodsinfoById',
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

                    ]
                },
                {
                    index: 'putDownAction',
                    title: '上下架管理',
                    flag: true,
                    function: 'putDownAction',
                    permissions: [
                        'putDownIndex',
                        'uptPriceAndStock'
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
                    ]
                },
                {
                    index: 'batchInfoAction',
                    title: '批次操作',
                    flag: false,
                    function: 'batchInfoAction',
                    permissions: [
                        'listBatchGoodsByCon',
                        'addBatchGoods',
                        'updateBatchGoodsById',
                        'deleteBatchGoodsById',
                        'uptBatchLadingBill',
                        'uptBatchRealCount',

                        'submitLocalPrice',
                        'cacSuggestPrice',
                        'submitReportPrice',
                        'putonBatch',
                        'killBatchById',
                    ]
                },
                {
                    index: 'unusualBatchListAction',
                    title: '异常批次',
                    flag: false,
                    function: 'unusualBatchListAction',
                    permissions: [
                        'listKilledBatchsByCon',
                        'listKilledBatchGoodsByCon',
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
                        'getAllInstById',
                        'getInstById',
                        'updateInstInfo',
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
                        'listDepartmentPosition',
                        'addDepartmentPosition',
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
                        'listDepartmentTeller',
                        'addTellerInfo',
                        'addTellerDepartment',
                        'updateTellerInfo',
                        'deleteDepartmentTeller',
                        'resetTellerPwd',
                    ]
                },
                {
                    index: 'customAction',
                    title: '顾客管理',
                    flag: false,
                    function: 'customAction',
                    permissions: [
                        'listApproveCustomers',
                        'approveCustomer',
                    ]
                },
                {
                    index: 'rateAction',
                    title: '汇率管理',
                    flag: false,
                    function: 'rateAction',
                    permissions: [
                        'updateSysRate',
                    ]
                },
            ],
        },
    ]
};
