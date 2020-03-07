<template>
    <div class="container">
        <el-form :model="searchForm" ref="searchForm" label-width="80px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="单据号" prop="batchId">
                        <el-input v-model="searchForm.batchId" clearable placeholder="请输入单据号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="getBatchInfo">查询</el-button>
                </el-col>
                <el-col :span="6">
                    &nbsp;
                </el-col>
                <el-col :span="6">
                    <el-button type="success" icon="el-icon-plus" @click="onAddNewTap" style="float: right;">录入物资
                    </el-button>
                </el-col>
            </el-row>
        </el-form>

        <div class="batchInfoDiv">
            <div>批次信息</div>
            <el-row>
                <el-col :span="6">ID:{{batchInfo.batchId}}</el-col>
                <el-col :span="6">名称:{{batchInfo.batchName}}</el-col>
                <el-col :span="6">采购区域:{{getBatchFlagName(batchInfo.batchFlag)}}</el-col>
                <el-col :span="6">状态:{{getStatusName(batchInfo.status)}}</el-col>
            </el-row>
        </div>

        <el-table :data="tableData" border stripe>
            <el-table-column label="名字" prop="batchName"></el-table-column>
            <el-table-column label="备注" prop="memo"></el-table-column>
            <el-table-column label="价格" prop="tellerBuyPrice"></el-table-column>
            <el-table-column label="数量" prop="tellerBuyCount"></el-table-column>
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
                    <el-form-item label="系列ID" prop="batchGoodsId"
                                  :rules="[{required:true, message:'请选择系列', trigger: 'blur'}]">

                        <el-col :span="15">
                            <el-input v-model="dialogForm.batchGoodsId" style="display: inline-block;"></el-input>
                        </el-col>
                        <el-col :span="6" v-if="dialogForm.goodsName">
                            系列名称：{{dialogForm.goodsName}}
                        </el-col>
                        <el-col :span="3">
                            <el-button type="primary" @click="choiceTap">选择</el-button>
                        </el-col>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="采购价格" prop="tellerBuyPrice"
                                      :rules="[{required:true, message:'请输入采购价格', trigger: 'blur'}]">
                            <el-input v-model="dialogForm.tellerBuyPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="采购数量" prop="tellerBuyCount"
                                      :rules="[{required:true, message:'请输入采购数量', trigger: 'blur'}]">
                            <el-input v-model="dialogForm.tellerBuyCount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="list-name">备注信息</div>
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-input
                            type="textarea"
                            class="goods-memo"
                            :autosize="{ minRows: 2}"
                            placeholder="请输入备注信息"
                            v-model="dialogForm.memo">
                        </el-input>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog_footer">
                <el-button @click="dialogVisible=false">取消</el-button>
                <el-button type="primary" @click="dialogFormConfirm">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="选择物资" :visible.sync="goodsVisible">
            <goods-selection @row-dblclick="dbClick"></goods-selection>
        </el-dialog>
    </div>
</template>

<script>
    import {addBatchGoods, getBatchinfoById, listBatchGoodsByCon} from "../../../util/module";
    import GoodsSelection from "../../common/selection/GoodsSelection";

    export default {
        name: "batchInfoAction",
        components: {
            GoodsSelection
        },
        data() {
            return {
                searchForm: {
                    batchId: null,
                    batchName:null
                },
                batchInfo: {},
                batchFlags: [
                    {id: 'I', value: '国内采购'},
                    {id: 'O', value: '国外采购'},
                ],
                statuses: [
                    {id: '1', value: '上架'},
                    // {id:'2', value:'未知'},
                    // {id:'3', value:'未知'},
                    {id: '4', value: '零售价已申报'},
                    {id: '5', value: '建议价格已计算'},
                    {id: '6', value: '本地价格已提交'},
                    {id: '7', value: '入库'},
                    {id: '8', value: '海运'},
                    {id: '9', value: '初始'},
                ],
                flag: 1,//1.新增  2.修改
                dialogForm: {
                    recycleSeq: null,
                    batchGoodsId: null,
                    tellerBuyPrice: null,
                    tellerBuyCount: null,
                    memo: null,
                    goodsName: null
                },
                dialogVisible: false,
                goodsVisible: false,
                currentPage:1,
                pageSize:10,
                AllCount:0,
                tableData:[],
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

        },

        methods: {
            initData(){
                this.getGoodsSerials();
            },

            getGoodsSerials(){
                if (this.batchInfo.batchId == null||this.batchInfo.batchName == null) {
                    return;
                }
                let params={};
                params.currentPage=this.currentPage;
                params.pageSize=this.pageSize;
                params.batchId=this.batchInfo.batchId;
                // params.batchName=this.batchInfo.batchName;
                listBatchGoodsByCon(this, params).then(
                    res=>{
                        this.tableData=res.data.records;
                        this.AllCount=res.data.total;
                    },
                    res=>{

                    }
                ).catch();
            },

            getBatchInfo() {
                let params = {};
                params.batchId = this.searchForm.batchId;
                getBatchinfoById(this, params).then(
                    res => {
                        this.batchInfo = res.data;
                        this.getGoodsSerials();
                    },
                    res => {

                    }
                ).catch();
            },

            dialogFormConfirm(){
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
                    params.batchId = this.dialogForm.batchId;
                    params.goodsList=[];
                    let item={};
                    item.recycleSeq='1';
                    item.batchGoodsId=this.dialogForm.batchGoodsId;
                    item.tellerBuyPrice=this.dialogForm.tellerBuyPrice;
                    item.tellerBuyCount=this.dialogForm.tellerBuyCount;
                    item.memo=this.dialogForm.memo;
                    params.goodsList.push(item);
                    addBatchGoods(this, params).then(
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

            dbClick(item) {
                this.dialogForm.batchGoodsId = item.specGoodsId;
                this.dialogForm.goodsName = item.goodsName;
                this.goodsVisible = false;
            },

            choiceTap() {
                this.goodsVisible = true;
            },

            onAddNewTap() {
                this.dialogForm.batchId = this.batchInfo.batchId;
                this.dialogVisible = true;
            },

            getBatchFlagName(batchFlag) {
                if (batchFlag === 'I') {
                    return '国内';
                }
                if (batchFlag === 'O') {
                    return '国外'
                }
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
        }
    }
</script>

<style scoped>
    .batchInfoDiv {
        border: 1px solid red;
        margin-bottom: 10px;
    }
</style>
