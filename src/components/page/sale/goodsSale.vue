<template>
    <div class="container">
        <div>
            <div class="proinfoLeft">
                <div class="imgzoom-main">
                    <img :src="pictureUrl+goodsInfo.goodsId+'/'+imgShow">
                </div>
                <ul class="imgzoom-thumb">
                    <li v-for="item in goodsInfo.imgs" :key="item">
                        <img :src="pictureUrl+goodsInfo.goodsId+'/'+item">
                    </li>
                </ul>
            </div>
            <div class="proinfoMain">

            </div>
        </div>
    </div>
</template>

<script>
    import {getGoodsserialById} from "../../../util/module";
    import * as cfg from "../../../config/cfg";
    import {trimSpace} from "../../../Gw/GwArray";

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
            }
        },

        created(){
            this.specGoodsId=this.$route.query.specGoodsId;
            this.pictureUrl = cfg.service.uploadUrl + '/';
            console.log('specGoodsId', this.specGoodsId);//debug
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
            }
        }
    }
</script>

<style scoped>
    .proinfoLeft{
        border: 1px solid red;
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
</style>
