<template>
  <div>
    <span v-if="create===true">新增物资</span>
    <span v-else>基础</span>
    <el-form :model="searchForm" ref="searchForm" label-width="80px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="名称" prop="goodsName">
            <el-input v-model="searchForm.goodsName" placeholder="请输入物资名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="picture">
        <div class="list-name">商品主图</div>
        <el-upload
          :action="pictureUrl"
          multiple
          list-type="fileList"
          :show-file-list="false"
          :http-request="handelPicturePostMain"
          :before-upload="beforeAvatarUploadMain">
          <el-button v-if="!searchForm.mainPicture" size="small" type="primary">新增主图</el-button>
          <el-button v-else size="small" type="primary">修改主图</el-button>
        </el-upload>
        <div v-if="searchForm.mainPicture!=null&&searchForm.mainPicture!==''" style="margin-top:5px;">
          <div class="drag-list">
            <img v-image-preview :src="pictureUrl+searchForm.goodsId+'/'+searchForm.mainPicture+'?'+time" class="drag-list-img"/>
          </div>
        </div>
      </div>

      <el-form-item class="form-bot">
        <el-button v-if="!create" type="primary" :disabled="saveDisabled" @click="addConfirm">保存</el-button>
        <el-button v-else type="success" :disabled="addDisabled" @click="addConfirm">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import * as cfg from "../../../config/cfg";
  import {sendPicture} from "../../../util/module";

  export default {
    name: "goodsBase",

    props:['create', 'goodsId'],

    data(){
      return {
        searchForm:{
          goodsId:null,
          goodsImgs:[],
          mainPicture:null,
        },
        addDisabled:true,
        saveDisabled:true,
        pictureUrl:'',
        flag:1,//1：新增主图
        time:'123456',
      }
    },

    watch:{
      goodsId(val){
        this.searchForm.goodsId=val;
      }
    },

    created() {
      this.searchForm.goodsId=this.goodsId;
      this.pictureUrl=cfg.service.uploadUrl+'/';
    },

    methods:{
      addConfirm(){

      },

        handelPicturePostMain(data) {
        console.log("param:", data);
        let params={};
        if (this.searchForm.mainPicture) {
          //修改主图
        }else{
          //新增主图
          this.time=this.getTime();
          params.goodsId=this.searchForm.goodsId;
          params.index='M';
          params.operFlag='1';
          params.goodsFileNames = data.file;
          sendPicture(this, params).then(
            res=>{
              this.searchForm.mainPicture=res.data.fileNames;
            },
            res=>{

            }
          ).catch();
        }

      },

      beforeAvatarUploadMain(file) {
        console.log("file:", file);
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 4;

        if (!isJPG) {
          this.$message.error('上传头像信息只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像信息大小不能超过 4MB!');
        }
        return isJPG && isLt2M;
      },

      getTime(){
        return new Date().getTime();
      },

    }
  }
</script>

<style scoped>
  .form-bot {
    text-align: right;
    margin-top:5px;
  }
</style>
