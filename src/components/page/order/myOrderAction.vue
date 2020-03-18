<template>
    <div class="container">
        <el-form :model="searchForm" ref="searchForm" label-width="100px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="订单状态">
                        <el-select v-model="searchForm.status" placeholder="请选择订单状态" style="width: 100%;">
                            <el-option v-for="item in statuses" :key="item.id" :label="item.value"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    &nbsp;
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="reflash" style="float: right;">刷新</el-button>
                </el-col>
            </el-row>
        </el-form>

        <el-table :data="tableData" border stripe>
            <el-table-column label="订单号" prop="orderId"></el-table-column>
            <el-table-column label="商品信息" width="170">
                <template slot-scope="props">
                    <div>
                        <div v-for="(item, index) in props.row.orderTDetailList" :key='item.specGoodsId'
                             style="width: 44px; margin-right: 5px; float: left; padding: 1px; margin-bottom: 5px;">
                            <div>
                                <img style="height: 40px; width: 40px; background-color: white;" :preview="index"
                                     :src="pictureUrl + item.goodsId + '/'+item.mainPicture">
                            </div>
                            <div style="font-size: 8px; line-height: 14px; margin-top: -4px;" :title="item.goodsName">{{item.goodsName.substring(0, 4)}}
                            </div>
                            <div style="font-size: 8px; line-height: 14px;">数量: {{item.dealNum}}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="订单金额" width="150" align="right" header-align="left">
                <template slot-scope="props">
                    <p><strong style="color:red">￥{{formatPrice(props.row.orderAmt)}}</strong></p>
                    <p>₦{{formatPrice(props.row.orderAmt/nalaRate)}}</p>
                    <p>${{formatPrice(props.row.orderAmt/dollarRate)}}</p>
                </template>
            </el-table-column>
            <el-table-column label="时间" width="225">
                <template slot-scope="props">
                    <p>创建时间：{{toDate(props.row.createTime)}}</p>
                    <p v-if="props.row.payTime">支付时间：{{toDate(props.row.payTime)}}</p>
                </template>
            </el-table-column>
            <el-table-column label="买家留言" prop="buyerMessage"></el-table-column>
            <el-table-column label="备注" prop="memo"></el-table-column>
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
    </div>
</template>

<script>
    import {
        closeOrder,
        confirmOrderPay,
        confirmOrderSend,
        confirmOrderStock,
        listAllOrders
    } from "../../../util/module";
    import _String from '../../../util/string';
    import * as cfg from "../../../config/cfg";

    export default {
        name: "orderlistAction",

        data() {
            return {
                searchForm: {
                    status: '9',
                },
                dialogForm:{
                    memo:'',
                },
                statuses: [
                    {id: '1', value: '已发货'},
                    {id: '2', value: '订单关闭'},
                    {id: '7', value: '已收款/确认'},
                    {id: '8', value: '已接单'},
                    {id: '9', value: '已下单'},
                ],
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                AllCount: 0,
                dollarRate: 1,
                nalaRate: 1,
                pictureUrl: '',
                dialogTitle:'',
                item:{},//当前要操作的行
                dialogVisible:false,
                flag:1,//1.接单 2.关闭订单
            }
        },

        watch: {
            searchForm: {
                handler() {
                    this.currentPage = 1;
                    this.initData();
                },
                deep: true
            }
        },

        created() {
            this.pictureUrl = cfg.service.uploadUrl + '/';
            this.nalaRate = localStorage.getItem('nalaRate') || 1;
            this.dollarRate = localStorage.getItem('dollarRate') || 1;
            this.initData();
        },

        methods: {
            initData() {
                this.getOrders();
            },

            reflash(){
                this.initData();
            },

            getOrders() {
                let params = {};
                params.currentPage = this.currentPage;
                params.pageSize = this.pageSize;
                params.status = this.searchForm.status;
                listAllOrders(this, params).then(
                    res => {
                        this.tableData = [];
                        this.AllCount = res.data.total;
                        res.data.records.forEach(item => {
                            item.orderTInfo.orderTDetailList = item.orderTDetailList;
                            this.tableData.push(item.orderTInfo);
                        });
                    },
                    res => {

                    }
                ).catch();
            },

            //格式化金额
            formatPrice(price) {
                return _String.number_format(price, 2);
            },

            handleSizeChange() {
                this.initData();
            },

            handleCurrentChange(options) {
                this.currentPage = options;
                this.initData();
            },

            toDate(dateStr) {
                if (dateStr == null) {
                    return '未知';
                }
                let Y = dateStr.substring(0, 4) + '-';
                let M = dateStr.substring(5, 7) + '-';
                let D = dateStr.substring(8, 10) + ' ';
                let h = dateStr.substring(11, 13) + ':';
                let m = dateStr.substring(14, 16) + ':';
                let s = dateStr.substring(17, 19);
                return Y + M + D + h + m + s;
            },

            dialogFormConfirm(){
                if (this.item.status === '9') {
                    if(this.flag===1){
                        this.confirmOrder(this.item);
                    }
                    if (this.flag === 2) {
                        this.closeOrder(this.item);
                    }
                }
                if (this.item.status === '8') {
                    this.confirmOrderPay(this.item);
                }
                if (this.item.status === '7') {
                    this.confirmOrderSend(this.item);
                }

            },

            confirmOrderTap(item){
                this.flag=1;
                this.dialogTitle='接单';
                this.dialogForm.memo=item.memo;
                this.item=item;
                this.dialogVisible=true;
            },

            confirmOrder(item){
                let params={};
                params.orderId=item.orderId;
                params.version=item.version;
                params.memo=this.dialogForm.memo;
                confirmOrderStock(this, params).then(
                    res=>{
                        this.$message.success('接单成功');
                        this.initData();
                        this.dialogVisible=false;
                    },
                    res=>{

                    }
                ).catch();
            },

            closeOrderTap(item){
                this.flag=2;
                this.dialogTitle='关闭订单';
                this.dialogForm.memo=item.memo;
                this.item=item;
                this.dialogVisible=true;
            },

            closeOrder(item){
                let params={};
                params.orderId=item.orderId;
                params.version=item.version;
                params.memo=this.dialogForm.memo;
                closeOrder(this, params).then(
                    res=>{
                        this.$message.success('关闭订单成功');
                        this.initData();
                        this.dialogVisible=false;
                    },
                    res=>{

                    }
                ).catch();
            },

            confirmOrderPayTap(item){
                this.dialogTitle='确认收款';
                this.dialogForm.memo=item.memo;
                this.item=item;
                this.dialogVisible=true;
            },

            confirmOrderPay(item){
                let params={};
                params.orderId=item.orderId;
                params.version=item.version;
                params.memo=this.dialogForm.memo;
                confirmOrderPay(this, params).then(
                    res=>{
                        this.$message.success('确认收款成功');
                        this.initData();
                        this.dialogVisible=false;
                    },
                    res=>{

                    }
                ).catch();
            },

            confirmOrderSendTap(item){
                this.dialogTitle='确认发货';
                this.dialogForm.memo=item.memo;
                this.item=item;
                this.dialogVisible=true;
            },

            confirmOrderSend(item){
                let params={};
                params.orderId=item.orderId;
                params.version=item.version;
                params.memo=this.dialogForm.memo;
                confirmOrderSend(this, params).then(
                    res=>{
                        this.$message.success('确认发货成功');
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
