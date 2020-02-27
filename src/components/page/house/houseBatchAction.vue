<template>
  <div class="container">
    <el-form :model="searchForm" ref="searchForm" label-width="80px">
      <el-row>
        <el-col :span="6">
          &nbsp
        </el-col>
        <el-col :span="12">
          <el-form-item label="楼栋"  prop="instId" :rules="[
              { validator: checkMainInstId, trigger: 'change' }
            ]"
                        ref="instId">
            <inst-selection v-model="instInfo" @click="instClick"></inst-selection>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          &nbsp;
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          &nbsp;
        </el-col>
        <el-col :span="12">
          <el-form-item label="文件上传" ref="fileName" prop="fileName"
                        :rules="[{ required: true, message:'请选择房屋Excel文件', trigger: 'change' }]">
            <el-upload
              action="#"
              list-type="fileList"
              :show-file-list="false"
              :http-request="handelPicturePost"
              :before-upload="beforeAvatarUpload">
              <el-button type="primary">选择文件</el-button>
              <span v-show="uploadOk" style="margin-left: 10px;">文件名：{{originalFileName}}</span>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          &nbsp;
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          &nbsp
        </el-col>
        <el-col :span="12">
          <span>模板下载</span><a :href="houseTemplate" style="margin-left: 14px;  border: 1px solid gray;">房屋批量导入模板</a>
        </el-col>
        <el-col :span="6">
          &nbsp;
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="6">
        &nbsp;
      </el-col>
      <el-col :span="12">
        <div style="width: 100%;">
          <el-button type="success" class="confirmButton" @click="confirmTap">批量导入</el-button>
        </div>
      </el-col>
      <el-col :span="6">
        &nbsp;
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import InstSelection from '../../common/selection/InstSelection';
  import { Toast } from 'mint-ui';
  import {sendFile, houseInsBatch} from '@/util/module';
  import cfg from '@/config/cfg.js';
  export default {
    name: 'houseBatchAction',
    components:{
      InstSelection
    },

    data() {
      return {
        searchForm:{
          fileName:null,
        },
        instInfo:{},
        uploadOk:false,
        originalFileName:null,
        houseTemplate:null,
      };
    },

    created(){
      this.houseTemplate=cfg.service.uploadUrl+'/xlsSample/house.xlsx';
      this.instInfo=JSON.parse(localStorage.getItem("sysInstInfo"));
      this.searchForm.instId=this.instInfo.instId;
      this.$nextTick(()=>{
        this.$refs.instId.$emit('el.form.change');
      });
    },

    methods:{
      initData(){

      },

      checkMainInstId(rule, value, callback){
        if(value===null||value===''){
          callback(new Error('请选择楼栋'));
          return;
        }
        if(this.instInfo.instLevel!==5){
          callback(new Error('请选择楼栋'));
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

      beforeAvatarUpload(file){
        const isExcel = file.name.endsWith('.xlsx');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isExcel) {
          this.$message.error('上传Excel只能是\'.xlsx\'格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 2MB!');
        }
        return isExcel && isLt2M;
      },

      handelPicturePost(param) {
        console.log("param:", param);
        this.originalFileName=param.file.name;
        let params={};
        params.file=param.file;
        params.index='House';
        this.originalFileName=param.file.name;
        sendFile(this, params, Toast).then(
          (res)=>{
            if(res.status===400){
              this.$message.error(res.msg);
              return;
            }
            this.$message.success('文件上传成功!');
            let filenames = res.data;
            this.searchForm.fileName=filenames[0];
            this.uploadOk=true;
            this.$refs.fileName.clearValidate();
          },
          (res)=>{

          }
        ).catch();
      },

      confirmTap(){
        this.$refs.searchForm.validate((valid)=>{
          if(valid){
            this.doHouseBatch();
          }else{
            return false;
          }
        });
      },

      doHouseBatch(){
        let params={};
        params.buildingInstId=this.searchForm.instId;
        params.fileName=this.searchForm.fileName;
        params.uploadFileName=this.originalFileName.split('.')[0];
        houseInsBatch(this, params, Toast).then(
          (res)=>{
            if(res.status===400){
              this.$message.error(res.msg);
              return;
            }
            this.$message.success('交易处理中，请过一分钟进行结果查询');
          },

          (res)=>{
            if(res==='timeout'){
              this.$message.error('交易超时，请过几分钟查看导入结果!');
            }
          }
        ).catch();
      },
    }
  }
</script>

<style scoped>
  .confirmButton{
    float: right;
  }
</style>

