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
          path: '/categoryAction',
          component: resolve => require(['../components/page/goods/categoryAction.vue'], resolve),
          meta: {title: '物资分类' ,function: 'categoryAction'}
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
      ],
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
      ],
    },

    {
      icon: 'el-icon-office-building',
      index: '3',
      title: '房屋管理',
      flag: false,
      subs: [
        {
          index: 'houseAction',
          title: '房屋列表',
          flag: true,
          function: 'houseAction'
        },
        {
          index: 'houseBatchAction',
          title: '房屋批量导入',
          flag: true,
          function: 'houseBatchAction'
        },

        // {
        //   index: 'houseRoomerAction',
        //   title: '房屋住户',
        //   flag: true,
        //   function: 'houseRoomerAction'
        // },
      ],
    },

    {
      icon: 'el-icon-mobile-phone',
      index: '4',
      title: '设备管理',
      flag: false,
      subs: [
        {
          index: 'deviceAction',
          title: '设备列表',
          flag: true,
          function: 'deviceAction'
        },
      ],
    },

    {
      icon: 'el-icon-film',
      index: '5',
      title: '资源管理',
      flag: false,
      subs: [
        {
          index: 'resourceAction',
          title: '资源列表',
          flag: true,
          function: 'resourceAction'
        },

        {
          index: 'resourcePublishAction',
          title: '资源发布',
          flag: true,
          function: 'resourcePublishAction'
        },
      ],
    },

    {
      icon: 'el-icon-s-custom',
      index: '6',
      title: '住户管理',
      flag: false,
      subs: [
        {
          index: 'roomerAction',
          title: '住户列表',
          flag: true,
          function: 'roomerAction'
        },
        {
          index: 'roomerBatchAction',
          title: '住户批量导入',
          flag: true,
          function: 'roomerBatchAction'
        },
      ],
    },

    {
      icon: 'el-icon-postcard',
      index: '7',
      title: '门卡管理',
      flag: false,
      subs: [
        {
          index: 'CardListAction',
          title: '门卡列表',
          flag: true,
          function: 'CardListAction'
        },
      ],
    },

    {
      icon: 'el-icon-view',
      index: '8',
      title: '交易查询',
      flag: false,
      subs: [
        {
          index: 'BatcQueryhAction',
          title: '批量结果查询',
          flag: true,
          function: 'BatcQueryhAction'
        },
      ],
    },
  ]
};
