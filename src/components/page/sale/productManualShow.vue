<template>
    <div class="container">
        <div class="drag-box-item">
            <div v-for="(item,index) in goodsDesc" :key="index" class="drag-list-desc">
                <div v-if="item.flag===1" class="drag-list-img-div-desc">
                    <img :src="pictureUrl+ '/' + goodsId + '/'+item.cont" class="drag-list-img-desc"
                         :class="index===0?'drag-list-top':(index===goodsDesc.length-1?'drag-list-bottom':'{}')"/>
                </div>
                <div v-else class="drag-list-text-desc"
                     :class="index===0?'drag-list-top':(index===goodsDesc.length-1?'drag-list-bottom':'{}')">
                    {{item.cont}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getSerialBySpecGoodsId} from "../../../util/module";
    import * as cfg from "../../../config/cfg";

    export default {
        name: "productManualShow",
        data() {
            return {
                goodsDesc: [],
                oper: 0,
                pictureUrl: '',
            }
        },

        props: ['specGoodsId', 'flag'],

        watch:{
            goodsId(){
                this.initData();
            },
        },

        created() {
            this.initData();
            this.pictureUrl = cfg.service.pictureUrl;
        },

        methods: {
            initData() {
                if (this.specGoodsId == null){
                    return;
                }

                let params = {};
                params.specGoodsId = this.specGoodsId;
                getSerialBySpecGoodsId(this, params).then(
                    (res) => {
                        this.goodsId=res.data.cacheSpecGoodsVo.goodsId;
                        if (this.flag === 'productManual') {
                            if (res.data.certifyAndMaualVo.productManual) {
                                this.goodsDesc= JSON.parse(res.data.certifyAndMaualVo.productManual || '[]');
                                console.log('goodsDesc', this.goodsDesc);//debug
                            }
                        }else{
                            if (res.data.certifyAndMaualVo.qualityCertificate) {
                                this.goodsDesc= JSON.parse(res.data.certifyAndMaualVo.qualityCertificate || '[]');
                                console.log('goodsDesc', this.goodsDesc);//debug
                            }
                        }

                    },
                    (res) => {
                        this.$message.error("获取商品详细信息失败");
                    });
            },
        }
    }
</script>

<style scoped>
    .drag-box-item {
        display: flex;
        flex-direction: column;
        margin-right: 16px;
    }

    .drag-list-desc {
        display: flex;
        list-style: none;
        background-color: #fff;
        border-radius: 6px;
        cursor: pointer;
        -webkit-transition: border .3s ease-in;
        transition: border .3s ease-in;
        /*width: 300px;*/
    }

    .drag-list-img-div-desc {
        float: left;
        width: 100%;
    }

    .drag-list-img-desc {
        border-left: 1px solid #e1e4e8;
        border-right: 1px solid #e1e4e8;
        width: 100%;
        height: auto;
        margin: 0px;
        padding: 0px;
        float: left;
    }
</style>
