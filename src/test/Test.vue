<template>
  <div class="container">
    测试啦啦啦
    <category-tree></category-tree>
    <category-selection @click="categoryClick"></category-selection>
  </div>
</template>

<script>
  import CategoryTree from '../components/common/selection/CategoryTree.vue';
  import CategorySelection from '../components/common/selection/CategorySelection';
  export default {
    name: "Test",
    components:{
      CategoryTree,
      CategorySelection
    },

    data(){
      return {

      }
    },

    created(){

    },

    methods:{
      categoryClick(nodeInfo){
        console.log('选择了', nodeInfo.categoryName);//debug
      },
    }
  }
</script>

<style scoped>

</style>
