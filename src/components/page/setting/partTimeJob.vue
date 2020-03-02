<template>
  <div class="container">
    <div class="handle-box">
      <el-button type="success" icon="el-icon-plus" @click="onAddNewTap">新增兼职</el-button>
    </div>

    <el-table :data="tableData" border stripe>
      <el-table-column label="名字" prop="tellerName"></el-table-column>
    </el-table>

  </div>
</template>

<script>
  export default {
    name: "partTimeJob",
    data() {
      return {
        tableData:[],
      };
    },

    created(){

    },

    methods:{
      onAddNewTap(){

      },
    }
  }
</script>

<style scoped>

</style>
