<template>
  <div class="container">
    <el-table :data="tableData" border stripe>
      <el-table-column label="名称" prop="unitName"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button type="danger" @click="deleteTap(props.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    import {listAllUnitinfos} from "../../../util/module";

    export default {
        name: "unitAction",
      data() {
        return {
          tableData:[],
        };
      },

      created() {
        this.initData();
      },

      methods:{
        initData(){
          this.getAllUnit();
        },

        getAllUnit(){
          let params={};
          listAllUnitinfos(this, params).then(
            res=>{
              this.tableData=res.data;
            },
            res=>{
              if (res.returnMsg) {
                this.$message.error(res.returnMsg);
              }else{
                this.$message.error('查询单位失败');
              }
            }
          ).catch();
        },

        deleteTap(item){

        },
      }
    }
</script>

<style scoped>

</style>
