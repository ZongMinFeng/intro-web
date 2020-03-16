<template>
    <div style="background-color: white;">
        <el-table :data="tableData" row-class-name="rowClass"
                  :row-key="tableData.specGoodsId"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <!--<el-table-column label="商品ID" align="right" header-align="right" prop="specGoodsId "></el-table-column>-->
            <el-table-column label="商品信息" align="center" header-align="center" width="200">
                <template slot-scope="props">
                    <div style="width: 80px; height: 80px; float: left;">
                        <img style="height: 80px; width: 80px;background-color: white;"
                             :src="pictureUrl + props.row.goodsId + '/'+props.row.mainPicture">
                    </div>
                    <div style="width: 80px; height: 80px; float: left;">
                        <span>{{props.row.goodsName}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="单价" align="right" header-align="right">
                <template slot-scope="props">
                    <p><strong>￥{{formatPrice(props.row.specNowPrice)}}</strong></p>
                    <p>₦{{formatPrice(props.row.specNowPrice/nalaRate)}}</p>
                    <p>${{formatPrice(props.row.specNowPrice/dollarRate)}}</p>
                </template>
            </el-table-column>
            <el-table-column label="数量" align="right" header-align="right">
                <template slot-scope="props">
                    <p>{{props.row.sellNum}}</p>
                </template>
            </el-table-column>
            <el-table-column label="小计" align="right" header-align="right">
                <template slot-scope="props">
                    <p><strong style="color:red">￥{{formatPrice(props.row.specNowPrice*props.row.sellNum)}}</strong></p>
                    <p>₦{{formatPrice(props.row.specNowPrice/nalaRate*props.row.sellNum)}}</p>
                    <p>${{formatPrice(props.row.specNowPrice/dollarRate*props.row.sellNum)}}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center"  width="340">
                <template slot-scope="props">
                    <el-button type="warning" @click="deleteTap(props.row, props.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="cart-toolbar-box">
            <el-row>
                <el-col :span="4">
                    <div class="cart-toolbar-deleteAll" @click="deleteAllTap">删除选中商品</div>
                </el-col>
                <el-col :span="12">
                    &nbsp;
                </el-col>
                <el-col :span="5">
                    <div class="split"></div>
                    <div style="margin-top: 4px;">
                        <p>
                            <span style="font-size: 14px;">总价：</span><b style="color: red;">￥{{formatPrice(allPrice())}}</b>
                        </p>
                        <p>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 14px;">₦ {{formatPrice(allPrice()/nalaRate)}}</span>
                        </p>
                        <p>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 14px;">$ {{formatPrice(allPrice()/dollarRate)}}</span>
                        </p>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="cart-checkout" @click="commitTap">去申请</div>
                </el-col>
            </el-row>
        </div>

        <el-dialog title="确认申请" :visible.sync="dialogVisible">
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
    import * as cfg from "../../../config/cfg";
    import _String from '../../../util/string';
    import {createOrder} from "../../../util/module";
    import {getArrayObjectByCon} from "../../../Gw/GwArray";

    export default {
        name: "presellList",
        data(){
            return {
                tableData:[],
                dollarRate: 1,
                nalaRate: 1,
                pictureUrl:'',
                goodsSelected:[],
                dialogVisible:false,
                dialogForm:{
                    memo:null,
                },
                goodsAllNum:0,
            }
        },

        computed:{
            myPreSells(){
                return this.$store.getters.myPreSells;
            }
        },

        watch:{
            myPreSells(){
                this.tableData=this.myPreSells;
            }
        },

        created(){
            this.pictureUrl = cfg.service.uploadUrl + '/';
            this.nalaRate = localStorage.getItem('nalaRate') || 1;
            this.dollarRate = localStorage.getItem('dollarRate') || 1;
            this.tableData=this.myPreSells;
        },

        methods:{
            //格式化金额
            formatPrice(price) {
                return _String.number_format(price, 2);
            },

            allPrice(){
                let all=0;
                let allNum=0;
                this.tableData.forEach(item=>{
                    all+=item.specNowPrice*item.sellNum;
                    allNum+=item.sellNum;
                });
                this.goodsAllNum=allNum;
                return all;
            },

            deleteTap(item, index){
                this.$confirm('确定要删除此商品吗?', '删除商品', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(
                    () => {
                        this.deleteCommit(item, index);
                    }
                );
            },

            deleteCommit(item, index) {
                this.$store.commit('myPreSellsDeleteOne', index);
            },

            handleSelectionChange(val){
                this.goodsSelected=[];
                val.forEach(item=>{
                    this.goodsSelected.push(item.specGoodsId);
                });
                console.log('goodsSelected', this.goodsSelected);//debug
            },

            deleteAllTap(){
                this.$confirm('确定要删除此商品吗?', '删除商品', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(
                    () => {
                        this.deleteAllCommit();
                    }
                );
            },

            deleteAllCommit(){
                this.$store.commit('myPreSellsDeleteSelect', this.goodsSelected);
            },

            commitTap(){
                if (this.goodsSelected.length < 1) {
                    this.$message.error('请选择商品');
                    return;
                }
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
                params.orderAmt = this.allPrice();
                params.goodsAllNum = this.goodsAllNum;
                params.buyerMessage = this.dialogForm.memo;
                params.orderDetailList = [];
                this.goodsSelected.forEach((specGoodsId, index)=>{
                    let goodsInfo=getArrayObjectByCon(this.tableData, specGoodsId, 'specGoodsId');
                    if (!goodsInfo) {
                        return true;
                    }
                    let item = {};
                    item.recycleSeq = index+1+'';
                    item.specGoodsId = goodsInfo.specGoodsId;
                    item.specNowPrice = goodsInfo.specNowPrice;
                    item.dealNum = goodsInfo.sellNum;
                    params.orderDetailList.push(item);
                });
                if (params.orderDetailList.length < 1) {
                    this.$message.error('请选择商品');
                    return;
                }
                createOrder(this, params).then(
                    res => {
                        this.$message.success('提交购买成功');
                        this.$store.commit('myPreSellsDeleteSelect', this.goodsSelected);
                        this.dialogVisible = false;
                    },
                    res => {
                    }
                ).catch();

            },
        }
    }
</script>

<style scoped>
    .cart-toolbar-box{
        margin-top: 20px;
        height: 66px;
        width: 100%;
        border: 1px solid #ddd;
    }

    .cart-toolbar-deleteAll{
        margin-left: 50px;
        width: 100px;
        line-height: 66px;
        color: #666;
        font-size: 14px;
    }

    .cart-toolbar-deleteAll:hover{
        cursor: pointer;
    }

    .split{
        float: left;
        width: 1px;
        height: 38px;
        margin-top: 12px;
        margin-right: 16px;
        font-size: 0;
        background: #ddd;
    }

    .cart-checkout{
        display: inline-block;
        line-height: 66px;
        text-align: center;
        width: 100%;
        border-left: 1px solid #ddd;
        margin-top: -1px;
        margin-right: -1px;
        font-size: 18px;
        font-weight: 700;
        font-family: "Microsoft YaHei";
        color: #fff;
        background-color: #f60;
    }

    .cart-checkout:hover{
        cursor: pointer;
    }
</style>

<style>
    .el-table .rowClass{
        background-color: rgb(255,251,242);
    }
</style>
