<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" :before-leave="beforeLeave">
      <el-tab-pane label="基础" name="first">
        <goods-base :create="create" :goodsId="goodsId"></goods-base>
      </el-tab-pane>
      <el-tab-pane label="详情" name="second">
        <goods-details :goodsId="goodsId"></goods-details>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import goodsBase from './goodsBase';
  import goodsDetails from './goodsDetails';
  import {genGoodsId} from "../../../util/module";

  export default {
    name: "goodsInfos",
    components: {
      goodsBase,
      goodsDetails
    },

    data() {
      return {
        goodsId: null,
        activeName: 'first',
        create:false,
      };
    },

    created() {
      this.activeName = 'first';
      this.goodsId = this.$route.query.goodsId;
      if (!this.goodsId||this.goodsId==='') {
        this.create=true;
        this.getGoodsId();
      }
    },

    methods: {
      beforeLeave() {

      },

      getGoodsId(){
        let params={};
        genGoodsId(this, params).then(
          res=>{
            this.goodsId=res.data;
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
