<template>
    <div class="container" ref="container">
        <div class="mainDiv">
            <div class="proinfoLeft">
                <div class="imgzoom-main">
                    <img v-if="goodsInfo.goodsId" :src="pictureUrl+goodsInfo.goodsId+'/'+imgShow">
                </div>
                <div class="imgzoom-thumb">
                    <ul>
                        <li v-for="(item, index) in goodsInfo.imgs" :key="item">
                            <img :class="{redBorder:index===imgIndex}" :src="pictureUrl+goodsInfo.goodsId+'/'+item"
                                 @mouseenter="mouseenter(item, index)" @mouseleave="mouseleave(index)">
                        </li>
                    </ul>
                </div>
            </div>

            <div class="proinfoMain">
                <div class="proinfo-title">
                    <h1>{{goodsInfo.goodsName}} {{goodsInfo.memo}}</h1>
                </div>
                <div class="goods-publish">
                    <el-row>
                        <el-col :span="6">
                            <span class="i-header">型号: </span><span>{{goodsInfo.goodsType}}</span>
                        </el-col>
                        <el-col :span="6">
                            <span class="i-header">颜色: </span><span>{{goodsInfo.specColor}}</span>
                        </el-col>
                        <el-col :span="6">
                            <span class="i-header">材质: </span><span>{{goodsInfo.specMaterial}}</span>
                        </el-col>
                        <el-col :span="6">
                            <span class="i-header">尺寸: </span><span>{{goodsInfo.specSize}}</span>
                        </el-col>
                    </el-row>
                </div>
                <div class="proinfo-focus">
                    <el-row>
                        <el-col :span="2">
                            <span class="i-header">定&nbsp;&nbsp;&nbsp;&nbsp;价</span>
                        </el-col>
                        <el-col :span="8">
                            <span class="mainPrice">₦{{formatPriceDot(goodsInfo.specNowPrice)}}</span>
                        </el-col>
                        <el-col :span="5">
                            <span class="minorPrice">￥</span><strong class="minorPrice">{{formatPriceDot(goodsInfo.specNowPrice/nalaRate)}}</strong>
                        </el-col>
                        <el-col :span="5">
                            <span class="minorPrice">$</span><strong class="minorPrice">{{formatPriceDot(goodsInfo.specNowPrice/dollarRate)}}
                        </strong></el-col>
                    </el-row>
                </div>
                <div class="proinfo-num">
                    <el-row style="margin-top: 10px; vertical-align: middle;">
                        <el-col :span="2">
                            <span class="i-header">数&nbsp;&nbsp;&nbsp;&nbsp;量</span>
                        </el-col>
                        <el-col :span="12">
                            <div :class="{numMinus:true, disabledDiv:numMinusDisableShow}" @click.stop="numMinus"
                                 onselectstart="return false">&nbsp;-&nbsp;
                            </div>&nbsp;
                            <el-input class="numBuy" v-model="numBuy" :disabled="noStock"/>
                            <div :class="{numplus:true, disabledDiv:numPlusDisableShow}" @click.stop="numPlus"
                                 onselectstart="return false">&nbsp;+&nbsp;
                            </div>
                            <span v-if="noStock"
                                  style="color: red; margin-left: 10px; border: 1px solid red;">暂无库存</span>
                        </el-col>
                    </el-row>
                </div>
                <div class="proinfoMainBtn">
                    <el-row>
                        <el-col :span="3">&nbsp;</el-col>
                        <el-col :span="6">
                            <el-button class="mainBtn buyBtn" @click="buyNow" :disabled="noStock">立即申请</el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-button class="mainBtn preBuyBtn" :disabled="noStock" @click="preBuy">加入预申请单</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>

        <div class="proinfoDetail">
            <el-tabs type="border-card" v-model="activeName">
                <el-tab-pane label="产品说明书" name="first">
                    <product-manual-show :specGoodsId="specGoodsId" flag="productManual"></product-manual-show>
                </el-tab-pane>
                <el-tab-pane label="产品质保证书" name="second">
                    <product-manual-show :specGoodsId="specGoodsId" flag="qualityCertificate"></product-manual-show>
                </el-tab-pane>
            </el-tabs>
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
                            v-model="memo">
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
    import {createOrder, getGoodsserialById} from "../../../util/module";
    import * as cfg from "../../../config/cfg";
    import {trimSpace} from "../../../Gw/GwArray";
    import _String from '@/util/string';
    import productManualShow from './productManualShow.vue';
    import {formatPrice, formatPriceDot} from "../../../tool/Format";

    export default {
        name: "goodsSale",
        components: {
            productManualShow
        },
        data() {
            return {
                goodsInfo: {
                    specGoodsId: '',
                    imgs: [],
                },
                specGoodsId: '',
                imgShow: '',
                pictureUrl: '',
                imgIndex: 0,
                timer: [],
                dollarRate: 1,
                nalaRate: 1,
                numBuy: 1,
                numPlusDisableShow: false,
                numMinusDisableShow: true,
                dialogVisible: false,
                memo: '',
                dialogForm: {},
                noStock: false,
                activeName: 'first',
                clickDisabled:false,
            }
        },

        watch: {
            numBuy(val) {
                let reg=/[^0-9+-.]/g;
                if (reg.test(val)) {
                    this.numBuy=this.numBuy.replace(/[^0-9+-.]/g, '');
                    return;
                }

                if (val === '') {
                    this.numBuy=1;
                    return;
                }

                let num = parseInt(val);
                if (num === 0) {
                    this.numPlusDisableShow = true;
                    return;
                }
                if (num > this.goodsInfo.innerStockNum - this.goodsInfo.innerLockNum - 0.005) {
                    this.numBuy = this.goodsInfo.innerStockNum - this.goodsInfo.innerLockNum;
                    this.numPlusDisableShow = true;
                } else {
                    this.numPlusDisableShow = false;
                }

                this.numMinusDisableShow = num < 1.005;

                if (num < 0.005) {
                    this.numBuy = 1;
                }
            }
        },

        created() {
            this.specGoodsId = this.$route.query.specGoodsId;
            this.pictureUrl = cfg.service.pictureUrl + '/';
            this.nalaRate = localStorage.getItem('nalaRate') || 1;
            this.dollarRate = localStorage.getItem('dollarRate') || 1;
            this.getGoodsInfo();
            this.$nextTick(()=>{
                //滚动到顶部
                this.$refs.container.scrollIntoView();
            });
        },

        methods: {
            buyNow() {
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

            formCommit: function () {
                let params = {};
                params.orderAmt = this.numBuy * this.goodsInfo.specNowPrice;
                params.goodsAllNum = this.numBuy;
                params.buyerMessage = this.memo;
                params.orderDetailList = [];
                let item = {};
                item.recycleSeq = '1';
                item.specGoodsId = this.goodsInfo.specGoodsId;
                item.specNowPrice = formatPrice(this.goodsInfo.specNowPrice);
                item.dealNum = this.numBuy + '';
                params.orderDetailList.push(item);
                createOrder(this, params).then(
                    res => {
                        this.$message.success('提交购买成功');
                        this.dialogVisible = false;
                        this.$router.push('/home');
                    },
                    res => {
                    }
                ).catch();

            },

            preBuy(){
                if (this.numBuy < 1) {
                    this.$message.error('没有库存');
                    return;
                }
                //防止多次点击
                if (this.clickDisabled) {
                    return;
                }
                this.clickDisabled=true;
                let preBuyItem={};
                preBuyItem.goodsId=this.goodsInfo.goodsId;
                preBuyItem.specGoodsId=this.goodsInfo.specGoodsId;
                preBuyItem.mainPicture=this.goodsInfo.mainPicture;
                preBuyItem.goodsName=this.goodsInfo.goodsName;
                preBuyItem.specNowPrice=this.goodsInfo.specNowPrice;
                preBuyItem.sellNum=this.numBuy;
                this.$store.commit('myPreSellsAdd', preBuyItem);
                this.$router.push({path:'/home', query:{showMypresell:true}})
            },

            getGoodsInfo() {
                let params = {};
                params.specGoodsId = this.specGoodsId;
                getGoodsserialById(this, params).then(
                    res => {
                        this.goodsInfo = res.data;
                        let tmp = [];
                        tmp = this.goodsInfo.goodsImgs.split(',');
                        this.goodsInfo.imgs = trimSpace(tmp);
                        this.imgShow = this.goodsInfo.mainPicture;
                        if (!this.goodsInfo.innerStockNum) {
                            this.noStock = true;
                            this.goodsInfo.innerStockNum = 0;
                            this.numBuy = 0;
                        }
                        if (!this.goodsInfo.innerLockNum) {
                            this.goodsInfo.innerLockNum = 0;
                        }
                        if (this.goodsInfo.innerStockNum - this.goodsInfo.innerLockNum < 0.005) {
                            this.noStock=true;
                            this.numBuy = 0;
                        }
                    },
                    res => {

                    }
                ).catch();
            },

            numMinus() {
                if (this.numBuy > 1.005) {
                    this.numBuy--;
                }
            },

            numPlus() {
                if (this.numBuy < this.goodsInfo.innerStockNum - this.goodsInfo.innerLockNum - 0.005) {
                    this.numBuy++;
                }
            },

            //格式化金额
            formatPrice(price) {
                return _String.number_format(price, 2, '.', '');
            },

            formatPriceDot(price){
                return formatPriceDot(price);
            },

            mouseenter(item, index) {
                this.timer[index] = setTimeout(() => {
                    this.imgShow = item;
                    this.imgIndex = index;
                }, 200);
            },

            mouseleave(index) {
                clearTimeout(this.timer[index]);
            }
        }
    }
</script>

<style scoped>
    .mainDiv {
        position: relative;
    }

    .proinfoLeft {
        position: absolute;
    }

    .imgzoom-main {
        border: 1px solid rgb(238, 238, 238);
        height: 400px;
        width: 400px;
    }

    .imgzoom-main img {
        height: 400px;
        width: 400px;
    }

    .imgzoom-thumb {
        width: 350px;
        margin: 15px 20px 0 20px;
        overflow: hidden;
    }

    .imgzoom-thumb ul {
        list-style-type: none;
    }

    .imgzoom-thumb li {
        display: inline-block;
        border: 2px solid transparent;
        margin-right: 5px;
        cursor: pointer;
    }

    .imgzoom-thumb li img {
        height: 60px;
        width: 60px;
    }


    .proinfoMain {
        height: 550px;
        margin-left: 400px;
        padding-left: 10px;
        font: normal 12px/1.5 Arial, Microsoft YaHei, SimSun;
        color: #666;
    }

    .proinfo-title {
        padding: 13px 10px 12px;
        background: #fff;
    }

    .proinfo-title h1 {
        font: 700 16px/1.5 \5FAE\8F6F\96C5\9ED1;
        color: #222;
        min-height: 24px;
    }

    .goods-publish {
        border-top: 1px dotted #ddd;
        padding: 12px 0 0;
        margin-bottom: 16px;
    }

    .i-header {
        color: #999;
        margin-left: 10px;
        height: 32px;
        line-height: 32px;
    }

    .proinfo-focus {
        padding: 14px 0 8px;
        margin-bottom: 15px;
        background-color: rgb(245, 245, 245);
    }

    .mainPrice {
        height: 28px;
        float: left;
        font: 700 30px/25px Tahoma;
        color: #e00;
    }

    .minorPrice {
        height: 28px;
        float: left;
        font: 400 20px/25px Tahoma;
    }

    .proinfo-num {
        border-top: 1px dotted #ddd;
        vertical-align: middle;
    }

    .numMinus, .numplus {
        display: inline-block;
        border: 1px solid rgb(221, 221, 221);
        height: 32px;
        width: 32px;
        vertical-align: middle;
        line-height: 32px;
        text-align: center;
        background-color: rgb(241, 241, 241);
        font-size: 20px;
    }

    .numplus {
        margin-left: 8px;
    }

    .numMinus:hover, .numplus:hover {
        cursor: pointer;
    }

    .disabledDiv {
        color: rgb(218, 218, 218);
    }

    .numBuy {
        display: inline-block;
        height: 32px;
        width: 64px;
        vertical-align: middle;
        line-height: 32px;
        text-align: center;
    }

    .redBorder {
        border: 2px solid red;
    }

    .proinfoMainBtn {
        padding: 8px 0 20px 80px;
        margin-top: 110px;
    }

    .mainBtn {
        height: 45px;
        width: 140px;
        font-size: 18px;
        color: white;
    }

    .buyBtn {
        background-color: rgb(102, 50, 0);
    }

    .buyBtn:hover {
        background-color: rgb(75, 37, 0);
    }

    .preBuyBtn {
        background-color: rgb(255, 85, 0);
    }

    .preBuyBtn:hover {
        background-color: rgb(255, 48, 0);
    }

    .proinfoDetail {
        /*margin-left: 400px;*/
    }
</style>

<style>
    /*修改浏览器代理的样式*/
    .numBuy input {
        text-align: center;
        vertical-align: middle;
    }
</style>
