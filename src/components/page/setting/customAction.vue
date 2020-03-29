<template>
    <div class="container">
        <el-table :data="tableData" border stripe>
            <el-table-column label="登录ID" prop="tellerId"></el-table-column>
            <el-table-column label="联系人" prop="linkMan"></el-table-column>
            <el-table-column label="职务" prop="position"></el-table-column>
            <el-table-column label="公司名称" prop="companyName"></el-table-column>
            <el-table-column label="公司地址" prop="companyAddress"></el-table-column>
            <el-table-column label="项目名称" prop="projectName"></el-table-column>
            <el-table-column label="项目地址" prop="projectAddress"></el-table-column>
            <el-table-column label="时间" width="200">
                <template slot-scope="props">
                    <p>申请时间：{{toDate(props.row.applyTime)}}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="props">
                    <el-button v-if="props.row.status==='9'" type="primary" @click="agreeTap(props.row)">批准</el-button>
                    <el-button v-if="props.row.status==='9'" type="warning" @click="refuseTap(props.row)">拒绝</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @current-change="handleCurrentChange"
                           @size-change="handleSizeChange"
                           :page-sizes="[10, 20, 30, 40]"
                           :page-size="pageSize"
                           layout="total,sizes, prev, pager, next"
                           :total="AllCount">
            </el-pagination>
        </div>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
            <el-form :model="dialogForm" label-width="80px" ref="dialogForm">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="原因" prop="memo">
                            <el-input v-model="dialogForm.memo" maxLength="64"></el-input>
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
    import {approveCustomer, listApproveCustomers} from "../../../util/module";
    import {toDate} from "../../../tool/Format";

    export default {
        name: "customAction",
        data(){
            return{
                tableData:[],
                currentPage: 1,
                pageSize: 10,
                AllCount: 0,
                dialogVisible:false,
                dialogForm:{
                    memo:null,
                    tellerId:null,
                },
            }
        },

        computed: {
            dialogTitle() {
                return '拒绝申请';
            }
        },

        created(){
            this.initData();
        },

        methods:{
            initData() {
                this.getCustom();
            },

            agreeTap(item){
                this.$confirm('同意申请，是否确认?', '顾客申请', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(
                    () => {
                        this.agreeCommit(item);
                    }
                );
            },

            agreeCommit(item){
                let params={};
                params.customerList=[];
                let paramsItem={};
                paramsItem.recycleSeq='1';
                paramsItem.tellerId=item.tellerId;
                paramsItem.status='1';
                params.customerList.push(paramsItem);
                approveCustomer(this, params).then(
                    res=>{
                        this.$message.success('批准成功！');
                        this.initData();
                    },
                    res=>{

                    }
                ).catch();
            },

            refuseTap(item){
                this.dialogForm={
                    memo:null,
                    tellerId:null,
                };
                this.dialogForm.tellerId=item.tellerId;
                this.dialogVisible=true;
            },

            toDate(dateStr){
                return toDate(dateStr);
            },

            getCustom(){
                let params={};
                params.currentPage=this.currentPage;
                params.pageSize=this.pageSize;
                listApproveCustomers(this, params).then(
                    res=>{
                        this.AllCount=res.data.total;
                        this.tableData=res.data.records;
                    },
                    res=>{

                    }
                ).catch();
            },

            handleSizeChange() {
                this.initData();
            },

            handleCurrentChange(options) {
                this.currentPage = options;
                this.initData();
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
                params.customerList=[];
                let item={};
                item.recycleSeq='1';
                item.tellerId=this.dialogForm.tellerId;
                item.status='8';
                item.memo=this.dialogForm.memo;
                params.customerList.push(item);
                approveCustomer(this, params).then(
                    res=>{
                       this.$message.success("拒绝成功！");
                       this.initData();
                       this.dialogVisible=false;
                    },
                    res=>{

                    }
                ).catch();
            },
        }
    }
</script>

<style scoped>

</style>
