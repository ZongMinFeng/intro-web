<template>
    <div class="container">
        <div>
            <ul class="levels">
                <li v-for="item in levels" :key="item.id">
                    <button @click="goToLevel(item)">{{item.label}}</button>
                    <span>&nbsp;>>&nbsp;&nbsp;</span>
                </li>
            </ul>
        </div>
        <div class="search">
            <el-row class="categoryDetail">
                <el-col :span="2">
                    <div class="attrKey label">分类</div>
                </el-col>
                <el-col :span="22">
                    <ul>
                        <li class="categoryItem" v-for="item in categories" :key="item.categoryId">
                            <div class="attrKeyItems itemLabel" @click="getChildren(item)">{{item.categoryName}}</div>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </div>
        <div>
            <ul class="itemUl">
                <li v-for="item in goodsListShow" :key="item.specGoodsId" class="item">
                    <a @click="goToBuy">
                        <div >
                            <div>
                                <img :src="pictureUrl + item.goodsId + '/'+item.mainPicture">
                            </div>
                            <div>
                                <div class="row1">
                                    <div class="price">
                                        <span>￥</span>
                                        <strong>{{item.specNowPrice}}</strong>
                                    </div>
                                </div>
                                <div class="row2">

                                </div>
                                <div class="row3">
                                    <span>{{item.goodsName}}</span>
                                </div>
                                <div class="row4">

                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
    import {getAllConfig, listGooCategorysByPid, wxIndexContent} from "../../util/module";
    import * as cfg from "../../config/cfg";
    import {getArrayObjectByCon, inArrayOptionByCons} from "../../Gw/GwArray";

    export default {
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                AllCount: 0,
                goodsList: [],
                goodsListShow:[],
                pictureUrl: '',
                levels: [
                    {
                        level: 0,
                        label: '全部',
                        categoryId: 'root',
                    },
                ],
                searchForm:{
                    categoryId: 'root',
                    categoryLevel: 1,
                },
                categories:[],
                categoryAll:[],
                categoryShow:[]
            }
        },

        components: {},

        computed: {},

        created() {
            this.pictureUrl = cfg.service.uploadUrl + '/';
            this.getGoods();
            this.getCategorys();
            this.getCategoryAll();
        },

        methods: {
            getGoods() {
                this.goodsList=[];
                this.getGoodsOnce();
            },

            getGoodsOnce(){
                let params = {};
                params.currentPage = this.currentPage;
                wxIndexContent(this, params).then(
                    res => {
                        if (res.data.goodsList) {
                            this.goodsList.push(...res.data.goodsList);
                            this.goodsListShow.push(...res.data.goodsList);
                            if (this.currentPage < res.data.totalPage&&this.currentPage<1000) {
                                this.currentPage++;
                                this.getGoodsOnce();
                            }
                        }
                    },
                    res => {

                    }
                ).catch();
            },

            categoryFilter(){
                this.categoryShow=[];
                this.getCategoryShow(this.searchForm.categoryId);
                console.log('categoryId',this.searchForm.categoryId);//debug
                console.log('goodsList', this.goodsList);//debug
                let goods=[];
                this.goodsList.forEach(item=>{
                    if (inArrayOptionByCons(this.categoryShow, item.categoryId, 'categoryId')>0) {
                        goods.push(item);
                    }
                });
                this.goodsListShow=goods;
            },

            goToBuy(){
                this.$router.push({path:'/goodsSale'});
            },

            goToLevel(item) {
                if (item.level === 0) {
                    this.searchForm.categoryLevel = 1;
                    this.searchForm.categoryId = 'root';
                } else {
                    this.searchForm.categoryId = item.categoryId;
                }
                this.levels.splice(item.level + 1, this.levels.length - item.level - 1);
                this.getCategorys();
                this.categoryFilter();
            },

            getCategorys() {
                let params = {};
                if (this.searchForm.categoryId !== 'root') {
                    params.categoryId = this.searchForm.categoryId;
                } else {
                    params.categoryLevel = this.searchForm.categoryLevel;
                }
                listGooCategorysByPid(this, params).then(
                    res => {
                        this.categories = res.data;
                    },
                    res => {
                        if (res.returnMsg) {
                            this.$message(res.returnMsg);
                        }
                    }
                ).catch();
            },

            getChildren(child) {
                let item = {};
                item.level = this.levels.length;
                item.label = child.categoryName;
                item.categoryId = child.categoryId;
                this.levels.push(item);
                this.searchForm.categoryId = child.categoryId;
                this.getCategorys();
                this.categoryFilter();
            },

            getCategoryAll(){
                let params={};
                getAllConfig(this, params).then(
                    res=>{
                        this.categoryAll=res.data.categoryList;
                        //将root节点加入
                        let category={
                            categoryId:'root',
                            parentCategory:'-1',
                            categoryName:'全部',
                            categoryLevel:'0',
                            sortOrder:-1,
                        };
                        this.categoryAll.push(category);
                    },
                    res=>{

                    }
                ).catch();
            },
            
            getCategoryShow(categoryId){
                this.categoryShow.push(getArrayObjectByCon(this.categoryAll, categoryId, 'categoryId'));
                this.categoryAll.forEach(item=>{
                    if (item.parentCategory === categoryId) {
                        this.getCategoryShow(item.categoryId);
                    }
                });
            },
        }
    }

</script>


<style scoped>
    ul{
        list-style-type: none;
    }

    li{
        display: inline-block;
    }

    .itemUl li{
        margin-bottom:20px;
    }

    .item {
        margin-right: 20px;
        width: 250px;
        height: 390px;
        border: 1px solid #ededed;;
    }

    .item:hover {
        border-color: rgb(255, 68, 0);
    }

    .item img {
        width: 250px;
        height: 250px;
    }

    .levels {
        margin-top: 5px;
        margin-bottom: 10px;
        list-style-type: none;
    }

    .levels li {
        display: inline-block;
        margin-bottom: 2px;
    }

    .levels li button:hover {
        color: red;
    }

    .categoryItem{
        margin-right: 15px;
    }

    .categoryItem .itemLabel:hover{
        color: red;
        cursor: pointer;
    }

    .search{
        margin-bottom: 20px;
    }

    .categoryDetail{
        border:1px solid rgb(230,226,225);
    }

    .attrKey{
        background-color: rgb(247,245,245);
        line-height: 16px;
        padding: 7px;
    }

    .attrKeyItems{
        line-height: 16px;
        padding: 7px;
    }

    .label{
        font-size: 14px;
        color: rgb(176,165,159);
    }

    .itemLabel{
        font-size: 14px;
        color: rgb(128,111,102);
    }



</style>
