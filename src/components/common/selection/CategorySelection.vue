<template>
  <div class="tree-leve" style="width: 100%" id="box">
    <input :placeholder="placeholder" class="inputClass" :disabled="disabled===''" v-model="nodeInfo.categoryName"
           @focus="onFocus"/>
    <el-card v-show="treeVisible" :body-style="{ padding: '0px' } " style="width: 100%;">
      <category-tree @node-click="nodeClick"></category-tree>
    </el-card>
  </div>
</template>

<script>
  import CategoryTree from './CategoryTree';
  export default {
    name: "CategorySelection.vue",
    components:{
      CategoryTree
    },

    props:['disabled'],

    data() {
      return {
        nodeInfo:{
          categoryId:null,
          categoryName:null,
        },
        treeVisible:false,
        placeholder:'请选择物资分类',
      };
    },

    created() {
      document.addEventListener('click', (e) => {
        if (!this.$el.contains(e.target)) this.treeVisible = false
      });
    },

    methods:{
      onFocus() {
        this.treeVisible = true;
      },

      nodeClick(nodeInfo){
        this.nodeInfo.categoryName=nodeInfo.categoryName;
        this.nodeInfo.categoryId=nodeInfo.categoryId;
        this.treeVisible=false;
        this.$emit('click', nodeInfo);
      },
    }
  }
</script>

<style scoped>
  .inputClass {
    background-color: #FFF;
    border: 1px solid #DCDFE6;
    width: 94%;
    border-radius: 4px;
    line-height: 32px;
    padding: 0 15px;
    font-size: inherit;
    display: inline-block;
  }
</style>
