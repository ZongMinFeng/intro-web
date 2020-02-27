<template>
    <div>
      <el-table :data="tableData" border stripe @row-dblclick="rowDblclick">
        <el-table-column label="单元名称" prop="unitName"></el-table-column>
        <el-table-column label="楼层" prop="floor"></el-table-column>
        <el-table-column label="门牌号" prop="houseNum"></el-table-column>
      </el-table>
    </div>
</template>

<script>
  import {houseGetByCons,} from '../../../util/module';
  export default {
    name: "HouseSelection",
    props:["instInfo"],
    data(){
      return {
        tableData:[],
      }
    },

    created(){
        this.initData();
    },

    watch:{
      'instInfo.instId':{
        deep:true,
        handler(){
          this.initData();
        }
      }
    },

    methods:{
      initData(){
        this.tableData=[];
        this.getHouse();
      },

      getHouse(){
        if(this.instInfo==null||this.instInfo.instLevel!==5){
          return;
        }
        const params={};
        params.buildingInstId=this.instInfo.instId;
        houseGetByCons(this, params).then(
          (res)=>{
            this.tableData=res.data;
          },
          (res)=>{

          }
        ).catch();
      },

      rowDblclick(row){
        this.$emit('return', row);
      },
    },
  }
</script>

<style scoped>

</style>
