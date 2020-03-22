<template>
    <div class="container">
        <div class="tellerInfo">
            <span>名字：{{tellerInfo.tellerName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID：{{tellerInfo.tellerId}}</span>
        </div>

        <div class="handle-box">
            <el-button type="success" icon="el-icon-plus" @click="onAddNewTap">新增兼职</el-button>
        </div>

        <el-table :data="tableData" border stripe class="el-table-plus">
            <el-table-column label="部门名字" prop="departmentName"></el-table-column>
            <el-table-column label="部门类型">
                <template slot-scope="props">
                    {{departmentFlagShow(props.row.departmentFlag)}}
                </template>
            </el-table-column>
            <el-table-column label="职位">
                <template slot-scope="props">
                    <ul class="table-ul">
                        <li v-for="item in props.row.positionAll" :key="item">
                            <el-button type="primary" @click="showPositionDetail(positionAll[item])">
                                {{positionAll[item].postionName}}
                            </el-button>
                        </li>
                    </ul>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="340">
                <template slot-scope="props">
                    <!--<el-button type="primary" @click="modifyTap(props.row)">修改</el-button>-->
                    <el-button v-if="props.row.departmentFlag==='2'" type="danger" @click="deleteTap(props.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="权限详情" :visible.sync="detailVisible">
            <div style="margin-bottom: 10px;">
                职位：{{detailForm.positionName}}
            </div>
            <!--<div>-->
                <!--权限值：{{detailForm.funcMap}}-->
            <!--</div>-->
            <position-selection v-model="detailForm.funcMap"></position-selection>
        </el-dialog>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
            <el-form :model="dialogForm" label-width="80px" ref="dialogForm">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="部门" prop="departmentId" :rules="[{required:true, message:'请选择部门', trigger:'change'}]">
                            <el-select v-model="dialogForm.departmentId" @change="chooseDepartment" placeholder="请选择部门"
                                       style="width: 100%;">
                                <el-option v-for="item in departments" :key="item.departmentId"
                                           :label="item.departmentName"
                                           :value="item.departmentId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="职位" prop="tellerPositionIds" :rules=" [{ type: 'array', required: true, message: '请至少选择一个职位', trigger: 'change' }]">
                            <el-select v-model="dialogForm.tellerPositionIds" multiple placeholder="请选择职位，可多选"
                                       style="width: 100%;">
                                <el-option v-for="item in positions" :key="item.positionId" :label="item.postionName"
                                           :value="item.positionId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog_footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="dialogFormConfirm">确定</el-button>
      </span>
        </el-dialog>

    </div>
</template>

<script>
    import {
        addTellerDepartment, deleteDepartmentTeller,
        getTellerInfoById,
        listDepartmentPosition,
        listInstDepartments
    } from "../../../util/module";
    import positionSelection from "../../common/selection/PositionSelection.vue";

    export default {
        name: "partTimeJob",
        components: {
            positionSelection,
        },
        data() {
            return {
                tableData: [],
                tellerId: null,
                specDepartmentId: null,
                tellerInfo: {
                    tellerName: null,
                    tellerId: null
                },
                //职位信息,key:职位id，value:职位详细信息
                positionAll: [],
                //新增时，选择部门后，部门的所有职位
                positions: [],
                detailVisible: false,
                detailForm: {
                    positionName: null,
                    funcMap: null,
                },
                dialogVisible: false,
                departments: [],
                dialogForm: {
                    departmentId: null,
                    tellerPositionIds: [],
                    specTellerId: null
                },
                instInfo: null,
                flag: 1,
            };
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
            this.tellerId = this.$route.query.tellerId;
            this.specDepartmentId = this.$route.query.specDepartmentId;
            this.initData();
            this.instInfo = JSON.parse(localStorage.getItem("sysInstInfo"));
            this.getDepartment();
        },

        methods: {
            initData() {
                this.getTellerDetail();
            },

            departmentFlagShow(flag) {
                if (flag === "1") {
                    return '主部门';
                }
                return '兼职部门';
            },

            deleteTap(item) {
                this.$confirm('此操作将删除兼职部门，是否确认?', '删除兼职部门', {
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
                params.specTellerId = this.tellerInfo.tellerId;
                params.specDepartmentId = item.departmentId;
                deleteDepartmentTeller(this, params).then(
                    res => {
                        this.$message.success('删除成功');
                        this.initData();
                    },
                    res => {
                    }
                ).catch();
            },

            dialogFormConfirm() {
                this.$refs.dialogForm.validate((valid) => {
                    if (valid) {
                        this.formCommit();
                    } else {
                        return false;
                    }
                });
            },

            formCommit() {
                let params = {};
                if (this.flag === 1) {
                    //新增
                    let params = {};
                    params.specDepartmentId = this.dialogForm.departmentId;
                    params.specTellerId = this.dialogForm.specTellerId;
                    params.tellerPositonList = this.dialogForm.tellerPositionIds;
                    addTellerDepartment(this, params).then(
                        res => {
                            this.$message.success('新增成功');
                            this.initData();
                            this.dialogVisible = false;
                        },
                        res => {
                        }
                    ).catch();
                }
            },

            chooseDepartment() {
                this.dialogForm.tellerPositionIds=[];
                this.getPositions();
            },

            getPositions() {
                let params = {};
                params.specDepartmentId = this.dialogForm.departmentId;
                listDepartmentPosition(this, params).then(
                    res => {
                        this.positions = [];
                        //去除管理员权限
                        res.data.forEach(item=>{
                            if (item.departmentId !== 'AdminSID200217000') {
                                this.positions.push(item);
                            }
                        });
                    }
                ).catch();
            },

            getDepartment() {
                let params = {};
                params.specInstId = this.instInfo.instId;
                listInstDepartments(this, params).then(
                    res => {
                        this.departments = res.data;
                    },
                    res => {

                    }
                ).catch();
            },

            onAddNewTap() {
                this.dialogForm={
                    departmentId: null,
                    tellerPositionIds: [],
                    specTellerId: null
                };
                if (this.$refs.dialogForm) {
                    this.$refs.dialogForm.clearValidate();
                }
                this.flag = 1;
                this.dialogForm.specTellerId = this.tellerInfo.tellerId;
                this.dialogForm.tellerPositionIds = [];
                this.dialogVisible = true;
            },

            showPositionDetail(position) {
                this.detailForm.positionName = position.postionName;
                this.detailForm.funcMap = position.funcMap;
                this.detailVisible = true;
            },

            getTellerDetail() {
                let params = {};
                params.specDepartmentId = this.specDepartmentId;
                params.specTellerId = this.tellerId;
                getTellerInfoById(this, params).then(
                    res => {
                        this.tellerInfo = res.data.sysTellerInfo;
                        let tableDataTmp = [];
                        let sysTellerInstInfoList = res.data.sysTellerInstInfoList;
                        sysTellerInstInfoList.forEach(item => {
                            let info = {};
                            let sysInstDepartment = item.sysInstDepartment;
                            info.departmentId = sysInstDepartment.departmentId;
                            info.departmentName = sysInstDepartment.departmentName;
                            info.positionAll = [];

                            let sysDepartmentPositions = item.sysDepartmentPositions;
                            sysDepartmentPositions.forEach(position => {
                                this.positionAll[position.positionId] = position;
                                info.positionAll.push(position.positionId);
                            });

                            let sysTellerInst = item.sysTellerInst;
                            info.departmentFlag = sysTellerInst.departmentFlag;

                            tableDataTmp.push(info);
                        });
                        this.tableData = tableDataTmp;
                    },
                    res => {

                    }
                ).catch();
            },
        }
    }
</script>

<style scoped>
    .table-ul {
        list-style-type: none;
    }

    .table-ul li {
        display: inline-block;
        margin-right: 5px;
    }

    .el-table-plus .el-button {
        margin-bottom: 3px;
    }

    .tellerInfo{
        background-color: rgb(255,244,230);
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        font-size: 14px;
        color: rgb(214,150,116);
    }

    .tellerInfo>span{

    }
</style>
