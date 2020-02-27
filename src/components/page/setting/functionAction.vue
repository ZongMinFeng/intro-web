<template>
  <div class="container">
    <el-form :model="form">
      <el-form-item label="funcId" label-width="100px" prop="funcId">
        <el-input v-model="form.funcId"></el-input>
      </el-form-item>
      <el-form-item label="parentFuncId" label-width="100px" prop="funcId">
        <el-input v-model="form.parentFuncId"></el-input>
      </el-form-item>
      <el-form-item label="funcName" label-width="100px" prop="funcId">
        <el-input v-model="form.funcName"></el-input>
      </el-form-item>
      <el-form-item label="funcDesc" label-width="100px" prop="funcId">
        <el-input v-model="form.funcDesc"></el-input>
      </el-form-item>
      <div style="height: 30px;">
        <el-button type="success" style="float: right;" @click="commit">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {funcPreservation} from "@/util/module.js";
  import { Toast } from 'mint-ui';
    export default {
      name: "functionAction",
      data(){
        return {
          form:{
            funcId:'',
            parentFuncId:'',
            funcName:'',
            funcDesc:'',
          },
        }
      },

      methods:{
        commit(){
          let params={};
          params.funcId=this.form.funcId;
          params.parentFuncId=this.form.parentFuncId;
          params.funcName=this.form.funcName;
          params.funcDesc=this.form.funcDesc;
          funcPreservation(this, params, Toast).then(
            (res)=>{
              this.$message.success("添加成功");
            },

            (res)=>{

            }
          ).catch();
        },
      }
    }
</script>

<style scoped>

</style>
