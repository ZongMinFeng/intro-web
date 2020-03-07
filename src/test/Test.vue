<template>
    <div class="container">
        测试啦啦啦<br>
        {{testInfo.goodsName}}
        <goods-selection @row-dblclick="dbClick"></goods-selection>
    </div>
</template>

<script>
    import CategoryTree from '../components/common/selection/CategoryTree.vue';
    import CategorySelection from '../components/common/selection/CategorySelection';
    import GoodsSelection from "../components/common/selection/GoodsSelection";

    export default {
        name: "Test",
        components: {
            GoodsSelection
        },

        data() {
            return {
                testInfo:{
                    goodsName:null,
                }
            }
        },

        created() {

        },

        methods: {
            categoryClick(nodeInfo) {
                console.log('选择了', nodeInfo.categoryName);//debug
            },
            dbClick(item){
                this.testInfo.goodsName=item.goodsName;
            },
        }
    }
</script>

<style scoped>

</style>
