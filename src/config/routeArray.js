module.exports = {
  routes: [
    {
      path: '',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      redirect: '/home',
      meta: { title: '自述文件' },
      children: [
        {
          path: '/home',
          component: resolve => require(['../components/page/home.vue'], resolve),
          meta: { title: '欢迎'}
        },

        {
          path: '/instAction',
          component: resolve => require(['../components/page/setting/instActionSet.vue'], resolve),
          meta: {title: '机构管理' ,function: 'instAction'}
        },

        {
          path: '/departmentAction',
          component: resolve => require(['../components/page/setting/departmentAction.vue'], resolve),
          meta: {title: '部门设置' ,function: 'departmentAction'}
        },

        {
          path: '/positionAction',
          component: resolve => require(['../components/page/setting/positionAction.vue'], resolve),
          meta: {title: '职位设置' ,function: 'positionAction'}
        },

        {
          path: '/tellerAction',
          component: resolve => require(['../components/page/setting/tellerAction.vue'], resolve),
          meta: {title: '人员管理' ,function: 'tellerAction'}
        },

        {
          path: '/categoryAction',
          component: resolve => require(['../components/page/goods/categoryAction.vue'], resolve),
          meta: {title: '物资分类' ,function: 'categoryAction'}
        },
        {
          path: '/unitAction',
          component: resolve => require(['../components/page/goods/unitAction.vue'], resolve),
          meta: {title: '单位管理' ,function: 'unitAction'}
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
      icon: 'el-icon-school',
      index: 'goods',
      title: '物资管理',
      flag: false,
      subs: [
        {
          index: 'categoryAction',
          title: '物资分类',
          flag: true,
          function: 'categoryAction',
          permissions:[
            'getGooCategoryById',
            'addGooCategory',
            'deleteGooCategoryById',
            'updateGooCategoryById'
          ]
        },
        {
          index: 'unitAction',
          title: '单位管理',
          flag: true,
          function: 'unitAction',
          permissions:[
            'addGooUnitinfo',
            'deleteGooUnitinfoById',
            'getGooUnitinfoById',
            'listAllUnitinfos'
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
          title: '机构设置',
          flag: false,
          function: 'instAction',
          permissions:[
            'addInst',
            'getAllInstById',
            'getInstById'
          ]
        },
        {
          index: 'departmentAction',
          title: '部门设置',
          flag: false,
          function: 'departmentAction',
          permissions:[
            'listInstDepartments',
            'addDepartmentInfo'
          ]
        },
        {
          index: 'positionAction',
          title: '职位设置',
          flag: false,
          function: 'positionAction',
          permissions:[
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
          permissions:[
            'addTellerInfo',
            'addTellerDepartment',
            'listDepartmentTeller',
            'getTellerInfoById',
            'updateTellerInfo',
            'deleteDepartmentTeller',
            'resetTellerPwd',
            'checkTellerId'
          ]
        },
      ],
    },
  ]
};
