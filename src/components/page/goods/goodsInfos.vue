<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" :before-leave="beforeLeave">
      <el-tab-pane label="基础" name="first">
        <goods-base :create="create" :goodsId="goodsId" @createOk="createOk"></goods-base>
      </el-tab-pane>
      <el-tab-pane label="产品说明书" name="second"  :disabled="create">
        <product-manual :goodsId="goodsId" :create="create"></product-manual>
      </el-tab-pane>
      <el-tab-pane label="质保证书" name="third" :disabled="create">
        <quality-certify :goodsId="goodsId" :create="create"></quality-certify>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import goodsBase from './goodsBase';
  import qualityCertify from './qualityCertify';
  import productManual from './productManual';
  import {genGoodsId} from "../../../util/module";

  export default {
    name: "goodsInfos",
    components: {
      productManual,
      goodsBase,
      qualityCertify,
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

      createOk(){
        console.log('createOk');//debug
        this.create=false;
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
