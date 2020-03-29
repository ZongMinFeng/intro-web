<template>
    <div class="container">
        <div class="handle-box">
            <el-button type="success" icon="el-icon-plus" @click="onAddNewTap">新增</el-button>
            <el-button style="float: right;" type="primary" @click="refresh">刷新</el-button>
        </div>

        <el-form :model="searchForm" ref="searchForm" label-width="80px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="批次或集装箱号" prop="batchName" label-width="130px">
                        <el-input v-model="searchForm.batchName" clearable placeholder="请输入批次或集装箱号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="提单号" prop="ladingBill">
                        <el-input v-model="searchForm.ladingBill" clearable placeholder="请输入提单号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="采购区域">
                        <el-select v-model="searchForm.batchFlag" clearable placeholder="请选择采购区域" style="width: 100%;">
                            <el-option v-for="item in batchFlags" :key="item.id" :label="item.value"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="单据状态">
                        <el-select v-model="searchForm.status" clearable placeholder="请选择状态" style="width: 100%;">
                            <el-option v-for="item in statuses" :key="item.id" :label="item.value"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <el-table :data="tableData" border stripe>
            <!--暂时不显示单据号-->
            <!--<el-table-column label="单据号" prop="batchId"></el-table-column>-->
            <el-table-column label="批次或集装箱号" prop="batchName"></el-table-column>
            <el-table-column label="提单号" prop="ladingBill"></el-table-column>
            <el-table-column label="采购区域" prop="status">
                <template slot-scope="props">
                    {{getBatchFlagName(props.row.batchFlag)}}
                </template>
            </el-table-column>
            <el-table-column label="时间" width="200">
                <template slot-scope="props">
                    <p>创建时间：{{toDate(props.row.createTime)}}</p>
                    <!--暂时不显示更新时间-->
                    <!--<p>更新时间：{{toDate(props.row.updateTime)}}</p>-->
                </template>
            </el-table-column>
            <el-table-column label="创建者">
                <template slot-scope="props">
                    <p>{{props.row.createTellerId}}</p>
                </template>
            </el-table-column>
            <el-table-column label="币种" prop="batchCny">
                <template slot-scope="props">
                    {{batchCnyName(props.row.batchCny)}}
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="status">
                <template slot-scope="props">
                    {{getStatusName(props.row.status)}}
                </template>
            </el-table-column>
            <el-table-column label="备注" prop="memo"></el-table-column>
            <el-table-column label="操作" width="240">
                <template slot-scope="props">
                    <el-button v-if="props.row.status==='9'" type="primary" @click="modifyTap(props.row)">修改</el-button>
                    <el-button v-if="props.row.status==='9'" type="danger" @click="deleteTap(props.row)">删除</el-button>
                    <el-button type="primary" @click="detailTap(props.row)">单据操作</el-button>
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
            <el-form :model="dialogForm" label-width="130px" ref="dialogForm">
                <el-row v-if="flag===1">
                    <el-col :span="24">
                        <el-form-item label="采购区域" prop="batchFlag"
                                      :rules="[{required:true, message:'请选择采购区域', trigger: 'blur'}]">
                            <el-select v-model="dialogForm.batchFlag" placeholder="请选择采购区域" style="width: 100%;" @change="changeBatchFlag">
                                <el-option v-for="item in batchFlags" :key="item.id" :label="item.value"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="batchNameLabel" prop="batchName"
                                      :rules="[{required:true, message:batchNameMessage, trigger: 'blur'}]">
                            <el-input v-model="dialogForm.batchName" :placeholder=batchNameMessage></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="采购币种" prop="batchCny"
                                      :rules="[{required:true, message:'请选择采购区域', trigger: 'blur'}]">
                            <el-select v-model="dialogForm.batchCny" placeholder="请选择采购币种" style="width: 100%;">
                                <el-option v-for="item in batchCnys" :key="item.id" :label="item.value"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="备注信息" prop="batchCny">
                        <el-col :span="24">
                            <el-input
                                type="textarea"
                                class="goods-memo"
                                :autosize="{ minRows: 2}"
                                placeholder="请输入备注信息"
                                v-model="dialogForm.memo">
                            </el-input>
                        </el-col>
                    </el-form-item>
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
    import {addBatchinfo, deleteBatchinfoById, listBatchsByCon, updateBatchinfo} from "../../../util/module";
    import {toDate} from "../../../tool/Format";
    import {batchCnys} from "../../../tool/status"
    import {deepCopy} from "../../../Gw/GwDateUtil";

    export default {
        name: "batchListAction",
        data() {
            return {
                searchForm: {
                    batchName: null,
                    status: null,
                    batchFlag: null,
                    ladingBill: null,
                },
                batchFlags: [
                    {id: 'I', value: '国内采购'},
                    {id: 'O', value: '国外采购'},
                ],
                statuses: [
                    {id: '1', value: '上架'},
                    {id: 'E', value: '物资上架中'},
                    // {id:'2', value:'未知'},
                    // {id:'3', value:'未知'},
                    {id: '4', value: '零售价已申报'},
                    {id: 'D', value: '零售价申报中'},
                    {id: '5', value: '建议价格已计算'},
                    {id: 'C', value: '建议价格计算中'},
                    {id: '6', value: '本地价格已提交'},
                    {id: 'B', value: '本地价格正在提交'},
                    {id: '7', value: '物资已入库'},
                    {id: 'A', value: '物资正在入库'},
                    {id: '8', value: '海运'},
                    {id: '9', value: '初始'},
                ],
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                AllCount: 0,
                dialogForm: {
                    batchName: null,
                    batchFlag: null,
                    memo: null,
                    batchCny:"1",
                },
                dialogFormOld:{
                    batchName: null,
                    batchFlag: null,
                    memo: null,
                    batchCny:"1",
                },
                flag: 1,//1.新增  2.修改
                dialogVisible: false,
                batchCnys:batchCnys,
            };
        },

        computed: {
            dialogTitle() {
                if (this.flag === 1) {
                    return '新增';
                } else {
                    return '修改';
                }
            },

            batchNameMessage(){
                if (this.dialogForm.batchFlag === "I"){
                    return '请输入集装箱号或批次号';
                }
                if (this.dialogForm.batchFlag==="O"){
                    return '请输入批次号';
                }
                return '请输入单据号';
            },

            batchNameLabel(){
                if (this.dialogForm.batchFlag === "I"){
                    return '集装箱或批次号';
                }
                if (this.dialogForm.batchFlag==="O"){
                    return '批次号';
                }
                return '请输入单据号';
            },
        },

        watch: {
            searchForm: {
                handler() {
                    this.currentPage=1;
                    this.initData();
                },
                deep: true,
            }
        },

        created() {
            this.initData();
        },

        methods: {
            initData() {
                this.getBatchs();
            },

            refresh(){
                this.initData();
            },

            changeBatchFlag(val){
                //如果国内
                if (val === "I") {
                    this.dialogForm.batchCny="2";
                }
            },

            toDate(dateStr){
                return toDate(dateStr);
            },

            getBatchFlagName(batchFlag) {
                if (batchFlag === 'I') {
                    return '国内';
                } else {
                    return '国外';
                }
            },

            deleteTap(item) {
                this.$confirm('此操作将删除单据，是否确认?', '删除单据', {
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
                params.batchId = item.batchId;
                deleteBatchinfoById(this, params).then(
                    res => {
                        this.$message.success('删除成功');
                        this.initData();
                    },
                    res => {
                    }
                ).catch();
            },

            detailTap(item) {
                this.$router.push({path:'/batchInfoAction', query:{batchId:item.batchId}})
            },

            modifyTap(item) {
                //清除验证效果
                if (this.$refs.dialogForm) {
                    this.$refs.dialogForm.clearValidate();
                }
                //旧数据拷贝
                this.dialogFormOld=deepCopy(item);
                this.flag = 2;
                this.dialogForm.batchId = item.batchId;
                this.dialogForm.version = item.version;
                this.dialogForm.batchName = item.batchName;
                this.dialogForm.batchFlag = item.batchFlag;
                this.dialogForm.batchCny=item.batchCny;
                this.dialogForm.memo = item.memo;
                this.dialogVisible = true;
            },

            getStatusName(status) {
                let statusName = '';
                this.statuses.forEach(item => {
                    if (item.id === status) {
                        statusName = item.value;
                        return false;
                    }
                });
                return statusName;
            },

            batchCnyName(batchCny){
                let name='';
                batchCnys.forEach(item=>{
                    if (item.id === batchCny) {
                        name=item.value;
                        return false;
                    }
                });
                return name;
            },

            handleSizeChange() {
                this.initData();
            },

            handleCurrentChange(options) {
                this.currentPage = options;
                this.initData();
            },

            onAddNewTap() {
                this.dialogForm={
                    batchName: null,
                    batchFlag: null,
                    memo: null,
                    batchCny:"1"
                };
                if (this.$refs.dialogForm) {
                    this.$refs.dialogForm.clearValidate();
                }
                this.flag = 1;
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
                    params.batchFlag = this.dialogForm.batchFlag;
                    params.batchName = this.dialogForm.batchName;
                    params.batchCny=this.dialogForm.batchCny;
                    params.memo = this.dialogForm.memo;
                    addBatchinfo(this, params).then(
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
                    params.batchId = this.dialogForm.batchId;
                    params.version = this.dialogForm.version;
                    if (this.dialogForm.batchName !== this.dialogFormOld.batchName) {
                        params.batchName = this.dialogForm.batchName;
                    }
                    if (this.dialogForm.batchCny !== this.dialogFormOld.batchCny) {
                        params.batchCny=this.dialogForm.batchCny;
                    }
                    if (this.dialogForm.memo !== this.dialogFormOld.memo) {
                        params.memo = this.dialogForm.memo;
                    }
                    updateBatchinfo(this, params).then(
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

            getBatchs() {
                let params = {};
                params.status = this.searchForm.status;
                params.batchFlag = this.searchForm.batchFlag;
                params.batchName = this.searchForm.batchName;
                params.ladingBill = this.searchForm.ladingBill;
                params.currentPage = this.currentPage;
                params.pageSize = this.pageSize;
                listBatchsByCon(this, params).then(
                    res => {
                        this.tableData = res.data.records;
                        this.AllCount = res.data.total;
                    },
                    res => {

                    }
                ).catch();
            },
        }
    }
</script>

<style scoped>

</style>
