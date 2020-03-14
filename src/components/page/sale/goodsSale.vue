<template>
    <div class="container">
        <div class="mainDiv">
            <div class="proinfoLeft">
                <div class="imgzoom-main">
                    <img v-if="goodsInfo.goodsId" :src="pictureUrl+goodsInfo.goodsId+'/'+imgShow">
                </div>
                <div class="imgzoom-thumb">
                    <ul>
                        <li v-for="(item, index) in goodsInfo.imgs" :key="item">
                            <img :class="{redBorder:index===imgIndex}" :src="pictureUrl+goodsInfo.goodsId+'/'+item" @mouseenter="mouseenter(item, index)" @mouseleave="mouseleave(index)">
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
                            <span class="mainPrice">人民币: ￥{{formatPrice(goodsInfo.specNowPrice)}}</span>
                        </el-col>
                        <el-col :span="4">
                            <span class="minorPrice">泰拉 </span><strong class="minorPrice">{{formatPrice(goodsInfo.specNowPrice/nalaRate)}}</strong>
                        </el-col>
                        <el-col :span="4">
                            <span class="minorPrice">美元 $</span><strong class="minorPrice">{{formatPrice(goodsInfo.specNowPrice/dollarRate)}}
                        </strong></el-col>
                    </el-row>
                </div>
                <div class="proinfo-num">
                    <el-row style="margin-top: 10px; vertical-align: middle;">
                        <el-col :span="2">
                            <span class="i-header">数&nbsp;&nbsp;&nbsp;&nbsp;量</span>
                        </el-col>
                        <el-col :span="12">
                            <div class="num-">&nbsp;-&nbsp;</div>&nbsp;
                            <div class="numBuy">{{numBuy}}</div>
                            <div class="numplus">&nbsp;+&nbsp;</div>&nbsp;
                        </el-col>
                    </el-row>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {getGoodsserialById} from "../../../util/module";
    import * as cfg from "../../../config/cfg";
    import {trimSpace} from "../../../Gw/GwArray";
    import _String from '@/util/string';

    export default {
        name: "goodsSale",
        data(){
            return {
                goodsInfo:{
                    specGoodsId:'',
                    imgs:[],
                },
                specGoodsId:'',
                imgShow:'',
                pictureUrl:'',
                imgIndex:0,
                timer:[],
                dollarRate:1,
                nalaRate:1,
                numBuy:0,
            }
        },

        created(){
            this.specGoodsId=this.$route.query.specGoodsId;
            this.pictureUrl = cfg.service.uploadUrl + '/';
            this.nalaRate=localStorage.getItem('nalaRate')||1;
            this.dollarRate=localStorage.getItem('dollarRate')||1;
            this.getGoodsInfo();
        },

        methods:{
            getGoodsInfo() {
                let params={};
                params.specGoodsId=this.specGoodsId;
                getGoodsserialById(this, params).then(
                    res=>{
                        this.goodsInfo=res.data;
                        console.log('goodsInfo', this.goodsInfo);//debug
                        let tmp = [];
                        tmp = this.goodsInfo.goodsImgs.split(',');
                        this.goodsInfo.imgs=trimSpace(tmp);
                        this.imgShow=this.goodsInfo.mainPicture;
                    },
                    res=>{

                    }
                ).catch();
            },

            //格式化金额
            formatPrice(price) {
                return _String.number_format(price, 2);
            },

            mouseenter(item, index){
                this.timer[index]=setTimeout(()=>{
                    this.imgShow=item;
                    this.imgIndex=index;
                }, 200);
            },

            mouseleave(index){
                clearTimeout(this.timer[index]);
            }
        }
    }
</script>

<style scoped>
    .mainDiv{
        position: relative;
    }

    .proinfoLeft{
        position: absolute;
    }

    .imgzoom-main{
        border: 1px solid rgb(238,238,238);
        height: 400px;
        width: 400px;
    }

    .imgzoom-main img{
        height: 400px;
        width: 400px;
    }

    .imgzoom-thumb{
        width: 350px;
        margin: 15px 20px 0 20px;
        overflow: hidden;
    }

    .imgzoom-thumb ul{
        list-style-type: none;
    }

    .imgzoom-thumb li{
        display: inline-block;
        border:2px solid transparent;
        margin-right: 5px;
        cursor: pointer;
    }

    .imgzoom-thumb li img{
        height: 60px;
        width: 60px;
    }


    .proinfoMain{
        height: 692px;
        margin-left: 400px;
        padding-left: 10px;
        font: normal 12px/1.5 Arial,Microsoft YaHei,SimSun;
        color: #666;
    }

    .proinfo-title{
        padding: 13px 10px 12px;
        background: #fff;
    }

    .proinfo-title h1{
        font: 700 16px/1.5 \5FAE\8F6F\96C5\9ED1;
        color: #222;
        min-height: 24px;
    }

    .goods-publish{
        border-top: 1px dotted #ddd;
        padding: 12px 0 0;
        margin-bottom: 16px;
    }

    .i-header{
        color: #999;
        margin-left: 10px;
        height: 32px;
        line-height: 32px;
    }

    .proinfo-focus{
        padding: 14px 0 8px;
        margin-bottom: 15px;
        background-color: rgb(245,245,245);
    }

    .mainPrice{
        height: 28px;
        float: left;
        font: 700 30px/25px Tahoma;
        color: #e00;
    }

    .minorPrice{
        height: 28px;
        float: left;
        font: 400 20px/25px Tahoma;
    }

    .proinfo-num{
        border-top: 1px dotted #ddd;
        vertical-align: middle;
    }

    .num-{
        display: inline-block;
        border: 1px solid rgb(221,221,221);
        height: 32px;
        width: 32px;
        vertical-align: middle;
        line-height: 32px;
        text-align: center;
        background-color: rgb(241,241,241);
        font-size: 20px;
    }

    .numplus{
        display: inline-block;
        border: 1px solid rgb(221,221,221);
        height: 32px;
        width: 32px;
        vertical-align: middle;
        line-height: 32px;
        text-align: center;
        background-color: rgb(241,241,241);
        margin-left: 8px;
        font-size: 20px;
    }

    .numBuy{
        display: inline-block;
        border: 1px solid rgb(221,221,221);
        height: 32px;
        width: 64px;
        vertical-align: middle;
        line-height: 32px;
        text-align: center;
    }

    .redBorder{
        border: 2px solid red;
    }
</style>
