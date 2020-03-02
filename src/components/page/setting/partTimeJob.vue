<template>
  <div class="container">
    名字：{{tellerInfo.tellerName}}&nbsp;&nbsp;&nbsp;&nbsp;ID：{{tellerInfo.tellerId}}
    <div class="handle-box">
      <el-button type="success" icon="el-icon-plus" @click="onAddNewTap">新增兼职</el-button>
    </div>

    <el-table :data="tableData" border stripe>
      <el-table-column label="部门名字" prop="tellerName"></el-table-column>
    </el-table>

  </div>
</template>

<script>
  import {getTellerInfoById} from "../../../util/module";

  export default {
    name: "partTimeJob",
    data() {
      return {
        tableData:[],
        tellerId:null,
        specDepartmentId:null,
        tellerInfo:{
          tellerName:null,
          tellerId:null
        },
      };
    },

    created(){
      this.tellerId=this.$route.query.tellerId;
      this.specDepartmentId=this.$route.query.specDepartmentId;
      this.initData();
    },

    methods:{
      initData(){
        this.getTellerDetail();
      },

      onAddNewTap(){

      },

      getTellerDetail(){
        let params={};
        params.specDepartmentId=this.specDepartmentId;
        params.specTellerId=this.tellerId;
        getTellerInfoById(this, params).then(
          res=>{
            this.tellerInfo=res.data.sysTellerInfo;
            let info={};
            let sysTellerInstInfoList=res.data.sysTellerInstInfoList;
            sysTellerInstInfoList.forEach(item=>{

            });
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
