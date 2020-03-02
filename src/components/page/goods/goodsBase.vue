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
      <el-row>
        <el-col :span="24">
          <el-form-item label="型号" prop="goodsType">
            <el-input v-model="searchForm.goodsType" placeholder="请输入物资型号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="picture">
        <div class="list-name">商品轮播信息（拖动可调换顺序）</div>
        <el-upload
          :action="pictureUrl"
          multiple
          list-type="fileList"
          :show-file-list="false"
          :http-request="handelPicturePost"
          :before-upload="beforeAvatarUpload">
          <el-button v-if="searchForm.imgs.length<1" size="small" type="primary" @click="uploadButton($event)">新增图片</el-button>
          <el-button v-else size="small" type="primary" @click="uploadButton($event)">添加图片</el-button>
        </el-upload>
        <div v-if="searchForm.imgs.length > 0" class="drag-box-item">
          <draggable v-model="searchForm.imgs" :options="dragOptions" :move="onMove"  >
            <transition-group tag="div" id="searchForm.imgs" class="item-ul">
              <div v-for="(item,index) in searchForm.imgs" :key="index" class="item">
                <div class="drag-list">
                  <img v-image-preview :src="pictureUrl+searchForm.goodsId+'/'+item" class="drag-list-img"/>
                </div>
                <el-button v-if="item === searchForm.mainPicture" class="drag-list-button" type="warning">此为主图</el-button>
                <el-button v-if="item.endsWith('.mp4')" class="drag-list-button">视频</el-button>
                <el-button v-if="item !== searchForm.mainPicture&&!item.endsWith('.mp4')" type="primary" class="drag-list-button" @click="onMainPicTap(item)">设为主图</el-button>
                <el-button type="danger" @click="deletePicTap(item, index)">删除</el-button>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>

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
            <img v-image-preview :src="pictureUrl+searchForm.goodsId+'/'+searchForm.mainPicture+'?'+time"
                 class="drag-list-img"/>
          </div>
        </div>
      </div>

      <div class="list-name">备注信息</div>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-input
            type="textarea"
            class="goods-memo"
            :autosize="{ minRows: 2}"
            placeholder="请输入备注信息"
            v-model="searchForm.memo" @change="onChangeTap">
          </el-input>
        </el-col>
      </el-row>

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
  import draggable from 'vuedraggable';

  export default {
    name: "goodsBase",

    components: {
      draggable
    },

    props: ['create', 'goodsId'],

    data() {
      return {
        searchForm: {
          goodsId: null,
          goodsImgs: [],
          mainPicture: null,
          imgs:[],
          memo:''
        },
        addDisabled: true,
        saveDisabled: true,
        pictureUrl: '',
        flag: 1,//1：新增主图
        time: '123456',
        dragOptions: {
          animation: 120,
          scroll: true,
          group: 'sortlist',
          ghostClass: 'ghost-style'
        },
      }
    },

    watch: {
      goodsId(val) {
        this.searchForm.goodsId = val;
      }
    },

    created() {
      this.searchForm.goodsId = this.goodsId;
      this.pictureUrl = cfg.service.uploadUrl + '/';
    },

    methods: {
      addConfirm() {

      },

      handelPicturePost(data) {
        console.log("param:", data);
        let params = {};
        if (this.searchForm.mainPicture&&!this.create) {
          //修改主图
          params.operFlag = '2';
        } else {
          //新增主图
          params.operFlag = '1';
        }
        this.time = this.getTime();
        params.goodsId = this.searchForm.goodsId;
        params.index = 'M';
        params.goodsFileNames = data.file;
        sendPicture(this, params).then(
          res => {
            this.searchForm.imgs.push(res.data.fileNames);
          },
          res => {

          }
        ).catch();

      },

      beforeAvatarUpload(file) {
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

      handelPicturePostMain(data) {
        console.log("param:", data);
        let params = {};
        if (this.searchForm.mainPicture&&!this.create) {
          //修改主图
          params.operFlag = '2';
        } else {
          //新增主图
          params.operFlag = '1';
        }
        this.time = this.getTime();
        params.goodsId = this.searchForm.goodsId;
        params.index = 'M';
        params.goodsFileNames = data.file;
        sendPicture(this, params).then(
          res => {
            this.searchForm.mainPicture = res.data.fileNames;
          },
          res => {

          }
        ).catch();

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

      getTime() {
        return new Date().getTime();
      },

      uploadButton(event){
        //判断轮播信息数量，能否继续上传
        if(this.checkUploadButton()){
          //能继续上传
        }else{
          //不能继续上传
          event.cancelBubble=true;
        }
      },

      checkUploadButton(){
        let num=this.searchForm.imgs.length;
        if(num<5){
          return true;
        }else{
          this.$message.error("商品轮播信息不能大于5条");
          return false;
        }
      },

      onMainPicTap(row) {
        let end = row.substr(row.lastIndexOf(".")+1);
        if(end !== 'jpg') {
          this.$message.error("只能设置图片为主图");
          return false;
        }
        this.searchForm.mainPicture = row;
        this.saveDisabled=false;
      },

      deletePicTap(item, index){
        if(item===this.searchForm.mainPicture){
          this.$message.error("无法删除主图，请先选择其他图作为主图，然后再删除此图");
          return;
        }
        this.searchForm.imgs.splice(index, 1);
        this.saveDisabled=false;
      },

      onMove({ relatedContext, draggedContext }) {
        console.log("hello, move");//debug
        this.saveDisabled=false;
      },

      onChangeTap(){
        this.saveDisabled=false;
      },
    }
  }
</script>

<style scoped>
  .form-bot {
    text-align: right;
    margin-top: 5px;
  }

  .drag-list-height {
    height: 200px;
  }

  .drag-list {
    list-style: none;
    background-color: #fff;
    border-radius: 6px;
    cursor: pointer;
    -webkit-transition: border .3s ease-in;
    transition: border .3s ease-in;
    width: 175px;
  }

  .drag-list-video {
    list-style: none;
    border-radius: 6px;
    cursor: pointer;
    -webkit-transition: border .3s ease-in;
    transition: border .3s ease-in;
    width: 300px;
  }

  .drag-list-img {
    height: 175px;
    width: 175px;
    border: 1px solid #EFF1F5;
  }

  .drag-list-button {
    margin-right: 5px;
  }

  .picture{
    margin-bottom: 10px;
    background-color: #fff;
  }

  .list-name {
    color: #A0A0A0;

  }

  .item-ul {
    padding: 0 8px;
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    margin-right:10px;
  }

  .item{
    margin-right: 10px;
    margin-top:10px;
    border:gray 1px solid;
    padding:2px;
  }

  .item-ul::-webkit-scrollbar {
    width: 0;
  }

</style>
