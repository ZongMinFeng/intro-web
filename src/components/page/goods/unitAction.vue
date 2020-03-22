<template>
    <div class="container">
        <div class="handle-box">
            <el-button type="success" icon="el-icon-plus" @click="onAddNewTap">新增</el-button>
        </div>

        <el-table :data="tableData" border stripe>
            <el-table-column label="名称" prop="unitName"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="props">
                    <el-button type="danger" @click="deleteTap(props.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
            <el-form :model="dialogForm" label-width="80px" ref="dialogForm">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="名称" prop="unitName"
                                      :rules="[{required:true, message:'请输入名称', trigger: 'blur'}]">
                            <el-input v-model="dialogForm.unitName"></el-input>
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
    import {addGooUnitinfo, deleteGooUnitinfoById, getAllConfig, listAllUnitinfos} from "../../../util/module";

    export default {
        name: "unitAction",
        data() {
            return {
                tableData: [],
                flag: 1,
                dialogVisible: false,
                dialogForm: {
                    unitName: null
                },
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
            this.initData();
        },

        methods: {
            initData() {
                this.getAllUnit();
            },



            getAllUnit() {
                let params = {};
                listAllUnitinfos(this, params).then(
                    res => {
                        this.tableData = res.data;
                    },
                    res => {
                        if (res.returnMsg) {
                            this.$message.error(res.returnMsg);
                        } else {
                            this.$message.error('查询单位失败');
                        }
                    }
                ).catch();
            },

            deleteTap(item) {
                this.$confirm('此操作将删除单位，是否确认?', '删除单位', {
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
                params.id = item.unitId;
                deleteGooUnitinfoById(this, params).then(
                    res => {
                        this.$message.success('删除成功');
                        this.initData();
                    },
                    res => {
                    }
                ).catch();
            },

            onAddNewTap() {
                this.dialogForm.unitName='';
                if (this.$refs.dialogForm) {
                    this.$refs.dialogForm.clearValidate();
                }
                this.dialogVisible = true;
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
                    params.unitName = this.dialogForm.unitName;
                    addGooUnitinfo(this, params).then(
                        res => {
                            this.$message.success('新增成功');
                            this.initData();
                            this.dialogVisible = false;
                        },
                        res => {
                        }
                    ).catch();
                }

                // if (this.flag === 2) {
                //   //修改
                //   params.specTellerId=this.dialogForm.specTellerId;
                //   params.specDepartmentId=this.dialogForm.specDepartmentId;
                //   params.tellerPhone=this.dialogForm.tellerPhone;
                //   params.tellerName=this.dialogForm.tellerName;
                //   params.tellerPositonIds=this.dialogForm.tellerPositonIds;
                //   updateTellerInfo(this, params).then(
                //     res=>{
                //       this.$message.success('修改成功');
                //       this.initData();
                //       this.dialogVisible=false;
                //     },
                //     res=>{
                //     }
                //   ).catch();
                // }
            },
        }
    }
</script>

<style scoped>

</style>
