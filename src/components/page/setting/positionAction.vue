<template>
    <div class="container">
        <div class="handle-box">
            <el-button type="success" icon="el-icon-plus" @click="onAddNewTap">新增</el-button>
        </div>

        <el-form :model="searchForm" ref="searchForm" label-width="80px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="公司" prop="specInstId">
                        <inst-selection v-model="instInfo" @click="instClickTap"></inst-selection>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="部门">
                        <el-select v-model="searchForm.departmentId" placeholder="请选择部门" style="width: 100%;"
                                   @change="chooseDepartment">
                            <el-option v-for="item in departments" :key="item.departmentId" :label="item.departmentName"
                                       :value="item.departmentId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <el-table :data="tableData" border stripe>
            <el-table-column label="职位名称" prop="postionName"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="props">
                    <el-button type="primary" @click="positionDetail(props.row)">权限明细</el-button>
                    <!--总公司管理部门职位不可修改-->
                    <el-button type="primary"
                               v-if="!(searchForm.departmentId.startsWith('Admin'))||searchForm.specInstId!==sysInstInfo.instId"
                               @click="modifyTap(props.row)">修改
                    </el-button>
                    <!--总公司管理部门职位不可删除-->
                    <el-button type="danger"
                               v-if="!(searchForm.departmentId.startsWith('Admin'))"
                               @click="deleteTap(props.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
            <el-form :model="dialogForm" label-width="80px" ref="dialogForm">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="职位名称" prop="positionName"
                                      :rules="[{required:true, message:'请输入职位名称', trigger: 'blur'}]">
                            <el-input v-model="dialogForm.positionName" ref="positionName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        请选择选择权限:
                        <position-selection v-model="dialogForm.funcMap"></position-selection>
                        <!--测试使用-->
                        <!--已选择：{{dialogForm.funcMap}}-->
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog_footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="dialogFormConfirm">确定</el-button>
      </span>
        </el-dialog>

        <el-dialog title="权限详情" :visible.sync="detailVisible">
            <div>
                职位：{{detailForm.positionName}}
            </div>
            <!--测试的时候可以展示权限内容-->
            <!--<div>-->
            <!--权限值：{{detailForm.positionShow}}-->
            <!--</div>-->
            <position-selection disabled v-model="detailForm.positionShow"></position-selection>
        </el-dialog>
    </div>
</template>

<script>
    import InstSelection from '@/components/common/selection/InstSelection';
    import {
        addDepartmentPosition, deleteDepartmentPosition,
        listDepartmentPosition,
        listInstDepartments,
        updateDepartmentPosition
    } from "../../../util/module";
    import PositionSelection from "../../common/selection/PositionSelection";

    export default {
        name: "positionAction",
        components: {
            PositionSelection,
            InstSelection,
        },
        data() {
            return {
                searchForm: {
                    specInstId: null,
                    departmentId: null,
                },
                instInfo: {},
                departments: [],
                tableData: [],
                position: '',
                superPosition: [],
                flag: 1,
                dialogVisible: false,
                dialogForm: {
                    positionName: null,
                    funcMap: '',
                    version: null,
                },
                detailVisible: false,
                detailForm: {
                    positionName: null,
                    positionShow: null,
                },
                sysInstDepartment: {},
                sysInstInfo:{},
            }
        },

        computed: {
            dialogTitle() {
                if (this.flag === 1) {
                    return '新增';
                } else {
                    return '修改';
                }
            }
        },

        created() {
            this.instInfo = this.sysInstInfo = JSON.parse(localStorage.getItem("sysInstInfo"));
            this.searchForm.specInstId = this.instInfo.instId;
            this.sysInstDepartment = JSON.parse(localStorage.getItem('sysInstDepartment'));
            //如果不是管理员部门用户，那么只能修改本部门人员
            if (!this.sysInstDepartment.departmentId.startsWith('Admin')) {
                this.departments = [
                    this.sysInstDepartment
                ];
                this.searchForm.departmentId = this.sysInstDepartment.departmentId;
                this.chooseDepartment();
            } else {
                this.getDepartment();
            }
        },

        methods: {
            initData() {
                this.getPositions();
            },

            getDepartment() {
                let params = {};
                params.specInstId = this.searchForm.specInstId;
                listInstDepartments(this, params).then(
                    res => {
                        this.departments = res.data;
                    },
                    res => {

                    }
                ).catch();
            },

            getPositions() {
                let params = {};
                params.specDepartmentId = this.searchForm.departmentId;
                listDepartmentPosition(this, params).then(
                    res => {
                        this.tableData = res.data;
                    }
                ).catch();
            },

            onAddNewTap() {
                if (this.searchForm.departmentId == null || this.searchForm.departmentId === '') {
                    this.$message.error('请选择部门');
                    return;
                }
                if (this.$refs.dialogForm) {
                    this.$refs.dialogForm.clearValidate();
                }
                this.dialogForm = {
                    positionName: null,
                    funcMap: '',
                    version: null,
                };
                this.dialogForm.specDepartmentId = this.searchForm.departmentId;
                this.flag = 1;
                this.dialogVisible = true;
            },

            instClickTap(instInfo) {
                if (this.tableData.length > 0) {
                    this.tableData.splice(0, this.tableData.length);
                }
                this.searchForm.departmentId = '';
                this.searchForm.specInstId = instInfo.instId;
                this.getDepartment();
            },

            chooseDepartment() {
                this.getPositions();
            },

            positionDetail(item) {
                this.detailForm.positionShow = item.funcMap;
                this.detailForm.positionName = item.postionName;
                this.detailVisible = true;
            },

            modifyTap(item) {
                this.dialogForm.positionId = item.positionId;
                this.dialogForm.positionName = item.postionName;
                this.dialogForm.funcMap = item.funcMap;
                this.dialogForm.version = item.version;
                this.flag = 2;
                this.dialogVisible = true;
            },

            deleteTap(item) {
                this.$confirm('此操作将删除职位，是否确认?', '删除分类', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(
                    () => {
                        this.deleteCommit(item);
                    }
                );
            },

            deleteCommit(item) {
                let params = {};
                params.positionId = item.positionId;
                deleteDepartmentPosition(this, params).then(
                    res => {
                        this.$message.success('删除成功');
                        this.initData();
                    },
                    res => {
                    }
                ).catch();
            },

            dialogFormConfirm() {
                this.$refs.dialogForm.validate((valid, obj) => {
                    if (valid) {
                        this.formCommit();
                    } else {
                        let firstKey;
                        for (let key in obj) {
                            firstKey = key;
                            break;
                        }
                        this.$refs[firstKey].focus();
                        return false;
                    }
                });
            },

            formCommit() {
                let params = {};
                if (this.flag === 1) {
                    //新增
                    params.specDepartmentId = this.dialogForm.specDepartmentId;
                    params.positionName = this.dialogForm.positionName;
                    params.funcMap = this.dialogForm.funcMap;
                    addDepartmentPosition(this, params).then(
                        res => {
                            this.$message.success('新增成功');
                            this.initData();
                            this.dialogVisible = false;
                        },
                        res => {
                        }
                    ).catch();
                }

                if (this.flag === 2) {
                    //修改
                    params.positionId = this.dialogForm.positionId;
                    params.positionName = this.dialogForm.positionName;
                    params.funcMap = this.dialogForm.funcMap;
                    params.version = this.dialogForm.version;
                    updateDepartmentPosition(this, params).then(
                        res => {
                            this.$message.success('修改成功');
                            this.initData();
                            this.dialogVisible = false;
                        },
                        res => {
                        }
                    ).catch();
                }
            },
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-top: 10px;
        margin-bottom: 20px;
        display: inline-block;
        width: 100%;
    }
</style>
