<template>
  <div class="container">
    <el-form :model="searchForm" ref="searchForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="机构" label-width="80px" prop="instId" :rules="[
              { validator: checkMainInstId, trigger: 'change' }
            ]"
                        ref="instId">
            <inst-selection v-model="instInfo" @click="instClick"></inst-selection>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <div>&nbsp</div>
        </el-col>
        <el-col :span="11">
          <el-button type="danger" @click="openDoorsTap">批量开门</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import InstSelection from '../../common/selection/InstSelection';
  import { Toast } from 'mint-ui';
  import { role } from '@/util/roleFunction';
  import {instOpenDoorBatch} from '@/util/module.js';
  export default {
    name: "openDoorsAction",

    components:{
      InstSelection,
    },

    data(){
     return{
       instInfo:{},
       searchForm:{
         instId:null,
       }
     }
    },

    created(){
      role(this); 
      this.instInfo=JSON.parse(localStorage.getItem("sysInstInfo"));
      this.searchForm.instId=this.instInfo.instId;
    },

    methods:{
      checkMainInstId(rule, value, callback){
        if(value===null||value===''){
          callback(new Error('请选择机构'));
          return;
        }
        if(this.instInfo.instLevel<4){
          callback(new Error('请选择小区或者楼栋'));
          return;
        }
        callback();
      },

      instClick(nodeInfo){
        this.instInfo=nodeInfo;
        this.searchForm.instId=this.instInfo.instId;
        this.$refs.instId.$emit('el.form.change');
        this.initData();
      },

      openDoorsTap(){
        this.$refs['searchForm'].validate((valid)=>{
          if(valid){
            this.openDoorsCheck();
          }else{
            return false;
          }
        });
      },

      openDoorsCheck(){
        let str='此操作将打开机构【'+this.instInfo.aliasName+'】所有的门，是否确认？';
        this.$confirm(str, '批量开门', {
          confirmButtonText:'确认',
          cancelButtonText:'取消',
          type:'warning'
        }).then(
          ()=>{
            this.openDoors();
          }
        );
      },

      openDoors(){
        let params={};
        params.specInstId=this.searchForm.instId;
        instOpenDoorBatch(this, params, Toast).then(
          (res)=>{
            this.$message.success('操作成功！');
          },
          (res)=>{
            if(res==='timeout'){
              this.$message.error('超时，请重试！');
            }
          }
        ).catch();
      },
    }
  }
</script>

<style scoped>

</style>
