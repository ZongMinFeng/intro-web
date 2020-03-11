<template>
    <div class="container">
    </div>
</template>

<script>
    import {wxIndexContent} from "../../util/module";

    export default {
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                AllCount: 0,
                goodsList:[],
            }
        },
        components: {},
        computed: {},
        created() {
            this.getOrders();
        },
        methods: {
            getOrders(){
                let params={};
                params.currentPage=this.currentPage;
                wxIndexContent(this, params).then(
                    res=>{
                        if (res.data.goodsList) {
                            this.goodsList=res.data.goodsList;
                        }
                        console.log('goodsList', this.goodsList)//debug
                    },
                    res=>{

                    }
                ).catch();
            },
        }
    }

</script>


<style scoped>
    .body-cont {
        /*width: 100%;*/
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        /*justify-content: space-around;*/
        justify-content: space-between;
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .cont-top {
        width: 100%;
        min-width: 350px;
    }

    .content-title {
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
        /*min-width: 400px;*/
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>
