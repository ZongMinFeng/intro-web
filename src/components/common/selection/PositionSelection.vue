<template>
    <div>
        <div class="position-border my-css">
            <el-tree :data="treeData"
                     node-key="id"
                     show-checkbox
                     default-expand-all
                     ref='tree'
                     :props="props"
                     @check="check">
            </el-tree>
        </div>
    </div>
</template>

<script>
    import {Sidebar} from '@/config/routeArray.js';
    import {PERMISSIONS} from '@/tool/permission.js'
    import {funcMap2position, getPermissions, position2funcMap} from "../../../tool/permission";

    export default {
        name: "PositionSelection",
        //v-model即value绑定是权限数组Map 举例：'03'表示权限数组["addSystemChannel", "addInst", "listInstDepartments"]
        props: ['value', 'disabled'],

        data() {
            return {
                // treeData: [
                //     {
                //         id: 'setting',
                //         label: '系统设置',
                //         disabled:true,
                //         children: [
                //             {
                //                 id: 'instAction',
                //                 label: '机构设置',
                //                 disabled:true,
                //                 children: [
                //                     {
                //                         id: 'addInst',
                //                         label: '添加子公司',
                //                         disabled:true,
                //                         isPermission: 'Y'
                //                     },
                //                     {
                //                         id: 'getAllInstById',
                //                         label: '查询子机构',
                //                         disabled:true,
                //                         isPermission: 'Y'
                //                     },
                //                 ]
                //             },
                //             {
                //                 id: 'departmentAction',
                //                 label: '部门设置',
                //                 disabled:true,
                //                 children: [
                //                     {
                //                         id: 'listInstDepartments',
                //                         label: '查询公司所有部门',
                //                         disabled:true,
                //                         isPermission: 'Y'
                //                     },
                //                     {
                //                         id: 'addDepartmentInfo',
                //                         label: '新增部门',
                //                         disabled:true,
                //                         isPermission: 'Y'
                //                     },
                //                 ]
                //             },
                //         ]
                //     },
                //     {
                //         id: 'goods',
                //         label: '物资管理',
                //         disabled:true,
                //         children: [
                //             {
                //                 id: 'categoryAction',
                //                 label: '物资分类',
                //                 disabled:true,
                //                 children: [
                //                     {
                //                         id: 'getGooCategoryById',
                //                         label: '根据主键查询物资分类',
                //                         disabled:true,
                //                         isPermission: 'Y'
                //                     },
                //                     {
                //                         id: 'addGooCategory',
                //                         label: '新增物资分类',
                //                         disabled:true,
                //                         isPermission: 'Y'
                //                     },
                //                 ]
                //             },
                //         ]
                //     },
                // ],
                treeData:[],
                tableData:[],
                props: {
                    label: 'label',
                    children: 'children',
                },
                //选中的权限
                position: [],
                superPosition: []
            }
        },

        watch: {
            value: function (newValue, oldValue) {
                this.setChecked();
            }
        },

        created() {
            this.superPosition = getPermissions();
            this.initData();
        },

        methods: {
            initData() {
                this.superPosition2TreeData();
                this.$nextTick(() => {
                    this.setChecked();
                });
            },

            //根据Sidebar生成菜单，权限不在superPosition的菜单不加载，权限在position中，并且也在superPosition的默认选中。
            superPosition2TreeData() {
                let treeDataAll = [];
                Sidebar.forEach(level1 => {
                    let treeLevel1 = {};
                    treeLevel1.id = level1.index;
                    treeLevel1.label = level1.title;
                    treeLevel1.disabled=false;
                    let level1hasSuper = false;
                    if (level1.subs) {
                        treeLevel1.children = [];
                        level1.subs.forEach(level2 => {
                            let treeLevel2 = {};
                            treeLevel2.id = level2.index;
                            treeLevel2.label = level2.title;
                            treeLevel2.disabled=false;
                            let level2hasSuper = false;
                            if (level2.permissions) {
                                treeLevel2.children = [];
                                level2.permissions.forEach(permission => {
                                    let treeLevel3 = {};
                                    if (PERMISSIONS[permission]) {
                                        treeLevel3.id = permission;
                                        treeLevel3.label = PERMISSIONS[permission].name;
                                        treeLevel3.isPermission = 'Y';
                                        treeLevel3.disabled=false;
                                        if (this.superPosition.indexOf(permission) > -0.005) {
                                            treeLevel2.children.push(treeLevel3);
                                            level2hasSuper = true;
                                        }
                                    }
                                });
                            }
                            if (level2hasSuper) {
                                treeLevel1.children.push(treeLevel2);
                                level1hasSuper = true;
                            }
                        });
                    }
                    if (level1hasSuper) {
                        treeDataAll.push(treeLevel1);
                    }
                });
                if (this.disabled === '') {
                    this.disabledAll(this.treeData);
                }
                this.treeData=treeDataAll;
                console.log('treeDataAll', treeDataAll);//debug
            },

            setChecked() {
                if (!this.$refs.tree) {
                    return;
                }
                this.position = [];
                let positionTmp = funcMap2position(this.value);
                positionTmp.forEach(item => {
                    if (this.superPosition.indexOf(item) > -0.005) {
                        this.position.push(item);
                    }
                });
                this.$refs.tree.setCheckedKeys(this.position);
                if (this.disabled === '') {
                    this.disabledAll(this.treeData);
                }
            },

            check() {
                let permissionReady = this.$refs.tree.getCheckedKeys();
                let permissionNew = [];
                permissionReady.forEach(item => {
                    if (this.superPosition.indexOf(item) > -0.005) {
                        permissionNew.push(item);
                    }
                });
                let funcMap = position2funcMap(permissionNew);
                this.$emit('input', funcMap);
            },

            disabledAll(treeData){
                treeData.forEach(item=>{
                    item.disabled=true;
                    if (item.children instanceof Array && item.children.length > 0) {
                        this.disabledAll(item.children);
                    }
                });

            },
        }
    }
</script>

<style scoped>
    .position-border {
        border: 1px solid rgb(192,196,204);
    }
</style>
