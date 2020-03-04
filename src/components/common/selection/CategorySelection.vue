<template>
  <div class="tree-leve" style="width: 100%" id="box">
  </div>
</template>

<script>
  import CategoryTree from './CategoryTree';
  export default {
    name: "CategorySelection.vue",
    components:{
      CategoryTree
    },
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
