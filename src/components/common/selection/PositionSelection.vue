<template>
  <div>
    <div class="position-border">
      <el-tree :data="treeData"
               node-key="id"
               show-checkbox
               default-expand-all
               ref='tree'
               :props="props"
               @check-change="handleCheckChange">
      </el-tree>
    </div>
  </div>
</template>

<script>
  import {Sidebar} from '@/config/routeArray.js';
  import {PERMISSIONS} from '@/tool/permission.js'
  export default {
    name: "PositionSelection",
    //v-model即value绑定是权限数组 举例：["addSystemChannel", "addInst", "listInstDepartments"]
    props: ['value', 'superPosition'],

    data(){
      return {
        treeData:[
          {
            id:'setting',
            label:'系统设置',
            children:[
              {
                id:'instAction',
                label:'机构设置',
                children:[
                  {
                    id:'addInst',
                    label:'添加子公司',
                    isPermission:'Y'
                  },
                  {
                    id:'getAllInstById',
                    label:'查询子机构',
                    isPermission:'Y'
                  },
                ]
              },
              {
                id:'departmentAction',
                label:'部门设置',
                children:[
                  {
                    id:'listInstDepartments',
                    label:'查询公司所有部门',
                    isPermission:'Y'
                  },
                  {
                    id:'addDepartmentInfo',
                    label:'新增部门',
                    isPermission:'Y'
                  },
                ]
              },
            ]
          },
          {
            id:'goods',
            label:'物资管理',
            children:[
              {
                id:'categoryAction',
                label:'物资分类',
                children:[
                  {
                    id:'getGooCategoryById',
                    label:'根据主键查询物资分类',
                    isPermission:'Y'
                  },
                  {
                    id:'addGooCategory',
                    label:'新增物资分类',
                    isPermission:'Y'
                  },
                ]
              },
            ]
          },
        ],
        props:{
          label:'label',
          children:'children'
        },
        //选中的权限
        position:[],
      }
    },

    watch: {
      superPosition:function (newValue, oldValue) {
        this.initData();
      },
      value:function (newValue, oldValue) {
        this.setChecked();
      }
    },

    created() {
      this.initData();
    },

    methods:{
      initData(){
        this.superPosition2TreeData();
        this.setChecked();
      },

      //根据Sidebar生成菜单，权限不在superPosition的菜单不加载，权限在position中，并且也在superPosition的默认选中。
      superPosition2TreeData(){
        console.log('superPosition', this.superPosition);//debug
        let treeDataAll=[];
        Sidebar.forEach(level1=>{
          let treeLevel1={};
          treeLevel1.id=level1.index;
          treeLevel1.label=level1.title;
          let level1hasSuper=false;
          if (level1.subs){
            treeLevel1.children=[];
            level1.subs.forEach(level2=>{
              let treeLevel2={};
              treeLevel2.id=level2.index;
              treeLevel2.label=level2.title;
              let level2hasSuper=false;
              if (level2.permissions) {
                treeLevel2.children=[];
                level2.permissions.forEach(permission=>{
                  let treeLevel3={};
                  if (PERMISSIONS[permission]) {
                    treeLevel3.id=permission;
                    treeLevel3.label=PERMISSIONS[permission].name;
                    treeLevel3.isPermission='Y';
                    if (this.superPosition.indexOf(permission)>0){
                      treeLevel2.children.push(treeLevel3);
                      level2hasSuper=true;
                    }
                  }
                });
              }
              if (level2hasSuper) {
                treeLevel1.children.push(treeLevel2);
                level1hasSuper=true;
              }
            });
          }
          if (level1hasSuper) {
            treeDataAll.push(treeLevel1);
          }
        });
        console.log('treeDataAll', treeDataAll);//debug
        this.treeData=treeDataAll;
      },

      setChecked(){
        if (!this.$refs.tree) {
          return;
        }
        this.position=[];
        this.value.forEach(item=>{
          if (this.superPosition.indexOf(item)>0){
            this.position.push(item);
          }
        });
        this.$refs.tree.setCheckedKeys(this.position);
      },

      handleCheckChange(data, checked, indeterminate) {
        // console.log('data', data);//debug
        // console.log('checked', checked);//debug
        // console.log('indeterminate', indeterminate);//debug
        console.log('all', this.$refs.tree.getCheckedKeys());
        let permissionReady=this.$refs.tree.getCheckedKeys();
        let permissionNew=[];
        permissionReady.forEach(item=>{
          if (this.superPosition.indexOf(item)>0) {
            permissionNew.push(item);
          }
        });
        if (this.isNew(permissionNew, this.position)) {
          this.$emit('input', permissionNew);
          console.log('啦啦，只执行一次啦');//debug
        }
      },

      //选中的权限是否有变化, 有变化返回true
      isNew(newPosition, oldPosition){
        if (newPosition.length !== oldPosition.length) {
          return true;
        }
        if (newPosition.length>0){
          newPosition.forEach(item=>{
            if (oldPosition.indexOf(item)<0){
              return true;
            }
          });
        }
        if (oldPosition.length>0){
          oldPosition.forEach(item=>{
            if (newPosition.indexOf(item)<0){
              return true;
            }
          });
        }
        return false;
      },
    }
  }
</script>

<style scoped>
  .position-border{
    border: 1px solid red;
  }
</style>
