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
                    <el-button v-if="batchInfo.status==='9'||batchInfo.status==='8'" type="primary" @click="uptBatchInfoTap" style="float: right; margin-left: 5px;">提交运单号
                    </el-button>
                    <el-button v-if="batchInfo.status==='9'||batchInfo.status==='8'" type="success" icon="el-icon-plus" @click="onAddNewTap" style="float: right;">录入物资
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
                <el-col :span="6">提单号:{{batchInfo.ladingBill}}</el-col>
            </el-row>
        </div>

        <el-table :data="tableData" border stripe>
            <el-table-column label="名字" prop="batchName"></el-table-column>
            <el-table-column label="备注" prop="memo"></el-table-column>
            <el-table-column label="价格" prop="tellerBuyPrice"></el-table-column>
            <el-table-column label="采购数量" prop="tellerBuyCount"></el-table-column>
            <el-table-column v-if="batchInfo.status!=='9'" label="已入库数量" prop="realCount"></el-table-column>
            <el-table-column v-if="batchInfo.status!=='9'&&batchInfo.status!=='8'||batchInfo.status!=='7'||batchInfo.status!=='A'||batchInfo.status!=='B'" label="本地金额" prop="localPrice"></el-table-column>
            <el-table-column v-if="batchInfo.status==='9'" label="操作" width="340">
                <template slot-scope="props">
                    <el-button type="primary" @click="modifyTap(props.row)">修改</el-button>
                    <el-button type="danger" @click="deleteTap(props.row)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column v-if="batchInfo.status==='8'||batchInfo.status==='A'||batchInfo.status==='7'" label="入库数量      操作" width="340">
                <template slot-scope="props">
                    <el-input v-model="realCountIns[props.$index]" style="width: 55px; margin-right: 8px;"></el-input>
                    <el-button type="danger" @click="changeRealCount(props.row, props.$index)">入库</el-button>
                </template>
            </el-table-column>
            <el-table-column v-if="batchInfo.status==='7'||batchInfo.status==='B'||batchInfo.status==='6'" label="本地价格      操作" width="340">
                <template slot-scope="props">
                    <el-input v-model="localPrices[props.$index]" style="width: 55px; margin-right: 8px;"></el-input>
                    <el-button type="danger" @click="doSubmitLocalPrice(props.row, props.$index)">提交本地价格</el-button>
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

        <el-dialog title="提交订单号" :visible.sync="ladingVisible">
            <el-form :model="ladingForm" label-width="80px" ref="ladingForm">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="运单号" prop="ladingBill"
                                      :rules="[{required:true, message:'请输入采购价格', trigger: 'blur'}]">
                            <el-input v-model="ladingForm.ladingBill"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog_footer">
                <el-button @click="ladingVisible=false">取消</el-button>
                <el-button type="primary" @click="ladingFormConfirm">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {
        addBatchGoods,
        deleteBatchGoodsById,
        getBatchinfoById,
        listBatchGoodsByCon, submitLocalPrice,
        updateBatchGoodsById, uptBatchLadingBill, uptBatchRealCount
    } from "../../../util/module";
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
                    batchName: null
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
                    {id: '7', value: '物资已入库'},
                    {id: '8', value: '海运'},
                    {id: '9', value: '初始'},
                    {id: 'A', value: '物资正在入库'},
                    {id: 'B', value: '本地价格正在提交'},
                    {id: 'C', value: '建议价格计算中'},
                    {id: 'D', value: '零售价申报中'},
                    {id: 'E', value: '物资上架中'},
                ],
                flag: 1,//1.新增  2.修改
                dialogForm: {
                    id: null,
                    recycleSeq: null,
                    batchGoodsId: null,
                    tellerBuyPrice: null,
                    tellerBuyCount: null,
                    memo: null,
                    goodsName: null
                },
                dialogVisible: false,
                goodsVisible: false,
                currentPage: 1,
                pageSize: 10,
                AllCount: 0,
                tableData: [],
                ladingVisible: false,
                ladingForm: {
                    batchId: null,
                    version: null,
                    ladingBill: null,
                },
                realCountIns:[],//入库数量数组
                localPrices:[],//本地价格数组
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
            this.$route.query.batchId="BI685783182406328320";//debug
            if (this.$route.query.batchId) {
                this.searchForm.batchId = this.$route.query.batchId;
                this.getBatchInfo();
            }
        },

        methods: {
            initData() {
                this.getGoodsSerials();
            },

            changeRealCount(item, index){
                let params={};
                params.batchId=this.batchInfo.batchId;
                params.goodsList=[];
                let obj={};
                obj.recycleSeq='1';
                obj.batchGoodsId=item.batchGoodsId;
                obj.realCount=parseInt(this.realCountIns[index])+item.realCount;
                params.goodsList.push(obj);
                uptBatchRealCount(this, params).then(
                    res=>{
                       this.getBatchInfo();
                    },
                    res=>{

                    }
                ).catch();
            },

            uptBatchInfoTap() {
                this.ladingForm.batchId = this.batchInfo.batchId;
                this.ladingForm.version = this.batchInfo.version;
                this.ladingVisible = true;
            },

            doSubmitLocalPrice(item, index){
                console.log("本地价格",this.localPrices[index]);//debug
                let params={};
                params.batchId=this.batchInfo.batchId;
                params.goodsList=[];
                let obj={};
                obj.recycleSeq='1';
                obj.batchGoodsId=item.batchGoodsId;
                obj.localPrice=parseInt(this.localPrices[index]);
                params.goodsList.push(obj);
                submitLocalPrice(this, params).then(
                    res=>{
                        this.$message.success('提交成功!');
                        this.getBatchInfo();
                    },
                    res=>{

                    }
                ).catch();
            },

            ladingFormConfirm() {
                let params = {};
                params.batchId = this.ladingForm.batchId;
                params.version = this.ladingForm.version;
                params.ladingBill = this.ladingForm.ladingBill;
                uptBatchLadingBill(this, params).then(
                    res => {
                        this.$message.success('提交成功！');
                        this.ladingVisible=false;
                        this.getBatchInfo();
                    },
                    res => {

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

            modifyTap(item) {
                this.flag = 2;
                this.dialogForm.id = item.id;
                this.dialogForm.batchGoodsId = item.batchGoodsId;
                this.dialogForm.version = item.version;
                this.dialogForm.tellerBuyPrice = item.tellerBuyPrice;
                this.dialogForm.tellerBuyCount = item.tellerBuyCount;
                this.dialogForm.memo = item.memo;
                this.dialogVisible = true;
            },

            deleteTap(item) {
                this.$confirm('此操作将删除物资，是否确认?', '删除物资', {
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
                params.id = item.id;
                deleteBatchGoodsById(this, params).then(
                    res => {
                        this.$message.error('删除成功！');
                        this.initData();
                    },
                    res => {

                    }
                ).catch();
            },

            getGoodsSerials() {
                if (this.batchInfo.batchId == null || this.batchInfo.batchName == null) {
                    return;
                }
                let params = {};
                params.currentPage = this.currentPage;
                params.pageSize = this.pageSize;
                params.batchId = this.batchInfo.batchId;
                // params.batchName=this.batchInfo.batchName;
                listBatchGoodsByCon(this, params).then(
                    res => {
                        this.tableData = res.data.records;
                        for (let i = 0; i < this.tableData.length; i++) {
                            // this.tableData[i].realCountIn=this.tableData[i].tellerBuyCount-this.tableData[i].realCount;
                            this.$set(this.realCountIns, i, this.tableData[i].tellerBuyCount-this.tableData[i].realCount);
                        }
                        this.AllCount = res.data.total;
                    },
                    res => {

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
                    params.batchId = this.dialogForm.batchId;
                    params.goodsList = [];
                    let item = {};
                    item.recycleSeq = '1';
                    item.batchGoodsId = this.dialogForm.batchGoodsId;
                    item.tellerBuyPrice = this.dialogForm.tellerBuyPrice;
                    item.tellerBuyCount = this.dialogForm.tellerBuyCount;
                    item.memo = this.dialogForm.memo;
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

                if (this.flag === 2) {
                    //修改
                    params.id = this.dialogForm.id;
                    params.version = this.dialogForm.version;
                    params.tellerBuyPrice = this.dialogForm.tellerBuyPrice;
                    params.tellerBuyCount = this.dialogForm.tellerBuyCount;
                    params.memo = this.dialogForm.memo;
                    updateBatchGoodsById(this, params).then(
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

            dbClick(item) {
                this.dialogForm.batchGoodsId = item.specGoodsId;
                this.dialogForm.goodsName = item.goodsName;
                this.goodsVisible = false;
            },

            choiceTap() {
                this.goodsVisible = true;
            },

            onAddNewTap() {
                this.flag = 1;
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
