<template>
    <div class="container">
        <el-table :data="tableData" border stripe>
            <el-table-column label="名称" prop="categoryName"></el-table-column>
            <el-table-column label="序号" prop="sortOrder"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="props">
                    <el-button type="primary" @click="modifyTap(props.row)">修改序号</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
            <el-form :model="dialogForm" label-width="80px" ref="dialogForm">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="名称" prop="categoryName">
                            <span>{{dialogForm.categoryName}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="序号" prop="sortOrder"
                                      :rules="[{required:true, message:'请输入分类序号', trigger: 'blur'}, {validator:checkSortOrde, trigger:'blur'}]">
                            <el-input v-model="dialogForm.sortOrder" maxLength="8"></el-input>
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
    import {listGooCategorysByPid, updateGooCategoryById} from "../../../util/module";

    export default {
        name: "categoryOrderAction",
        data() {
            return {
                tableData: [],
                categoryAll:[],
                dialogVisible:false,
                dialogForm:{
                    categoryName:null,
                    categoryId:null,
                    version:null,
                    sortOrder:null,
                },
            }
        },

        created() {
            this.initData();
        },

        computed:{
            dialogTitle(){
                return "修改序号";
            }
        },

        methods: {
            initData() {
                this.getCategoryAll();
            },

            getCategoryAll() {
                this.categoryAll = [];
                let i=1;
                this.getCategoryOnce(i);
            },

            getCategoryOnce(i) {
                if (i > 4) {
                    this.tableData=this.categoryAll.sort(this.sort);
                    return;
                }
                let params = {};
                params.categoryLevel = i;
                listGooCategorysByPid(this, params).then(
                    res => {
                        if (res.data instanceof Array) {
                            this.categoryAll.push(...res.data);
                        }
                        this.getCategoryOnce(i+1);
                    },
                    res => {
                    }
                ).catch();
            },

            sort(a, b){
                return a.sortOrder-b.sortOrder;
            },

            modifyTap(item){
                if (this.$refs.dialogForm) {
                    this.$refs.dialogForm.clearValidate();
                }
                this.flag=3;
                this.dialogForm.categoryId=item.categoryId;
                this.dialogForm.categoryName=item.categoryName;
                this.dialogForm.version=item.version;
                this.dialogForm.sortOrder=item.sortOrder;
                this.dialogVisible=true;
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

                //修改
                if (this.flag === 3) {
                    params.categoryId = this.dialogForm.categoryId;
                    params.version = this.dialogForm.version;
                    params.sortOrder = this.dialogForm.sortOrder;
                    updateGooCategoryById(this, params).then(
                        res => {
                            this.$message.success('修改成功');
                            this.dialogVisible = false;
                            this.initData();
                        },
                        res => {
                        }
                    ).catch();
                }
            },

            checkSortOrde(rule, value, callback){
                let reg=/^\d*$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正整数!'));
                }
                callback();
            },
        }
    }
</script>

<style scoped>

</style>
