<template>
  <div class="container">
    <div class="handle-box">
      <el-button type="success" icon="el-icon-plus" @click="onAddNewTap">新增</el-button>
    </div>

    <el-table :data="tableData" border stripe>
      <el-table-column label="颜色" prop="specColor"></el-table-column>
      <el-table-column label="系列主图" width="120" align="center" header-align="left">
        <template slot-scope="scope">
          <img style="height: 80px; width: 80px;background-color: white;" :preview="scope.$index"
               :src="pictureUrl + scope.row.goodsId + '/'+scope.row.mainPicture">
        </template>
      </el-table-column>
      <el-table-column label="系列价格" width="160" align="right" header-align="left">
        <template slot-scope="props">
          <p>￥{{formatPrice(props.row.specNowPrice)}}元</p>
        </template>
      </el-table-column>
      <el-table-column label="材质" prop="specMaterial"></el-table-column>
      <el-table-column label="尺寸" prop="specSize"></el-table-column>
    </el-table>

    <h3 style="margin-top:20px; color: #909399;">主商品信息</h3>
    <div class="line"></div>
    <el-form :model="goodsInfo" label-width="100px" class="goodInfo">
      <el-row>
        <el-col :sm="24" :md="12" :xl="8">
          <el-form-item label="名称">
            <el-input :disabled="true" v-model="goodsInfo.goodsName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :xl="8">
          <el-form-item label="ID">
            <el-input :disabled="true" v-model="goodsInfo.goodsId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :xl="8">
          <el-form-item label="型号">
            <el-input :disabled="true" v-model="goodsInfo.goodsType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :xl="8">
          <el-form-item label="单位">
            <el-input :disabled="true" v-model="goodsInfo.unitId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <el-form :model="dialogForm" label-width="80px" ref="dialogForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="颜色" prop="specColor" :rules="[{required:true, message:'请输入颜色', trigger: 'blur'} ]">
              <el-input v-model="dialogForm.specColor"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="材质" prop="specMaterial" :rules="[{required:true, message:'请输入材质', trigger: 'blur'} ]">
              <el-input v-model="dialogForm.specMaterial"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="尺寸" prop="specSize" :rules="[{required:true, message:'请输入尺寸', trigger: 'blur'} ]">
              <el-input v-model="dialogForm.specSize"></el-input>
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
            <el-button v-if="dialogForm.imgs.length<1" size="small" type="primary" @click="uploadButton($event)">新增图片
            </el-button>
            <el-button v-else size="small" type="primary" @click="uploadButton($event)">添加图片</el-button>
          </el-upload>
          <div v-if="dialogForm.imgs.length > 0" class="drag-box-item">
            <draggable v-model="dialogForm.imgs" :options="dragOptions" :move="onMove">
              <transition-group tag="div" id="dialogForm.imgs" class="item-ul">
                <div v-for="(item,index) in dialogForm.imgs" :key="index" class="item">
                  <div class="drag-list">
                    <img v-image-preview :src="pictureUrl+dialogForm.goodsId+'/'+item" class="drag-list-img"/>
                  </div>
                  <el-button v-if="item === dialogForm.mainPicture" class="drag-list-button" type="warning">此为主图
                  </el-button>
                  <el-button v-if="item.endsWith('.mp4')" class="drag-list-button">视频</el-button>
                  <!--目前不用设置主图，默认轮播图第一章为主图-->
                  <!--<el-button v-if="item !== dialogForm.mainPicture&&!item.endsWith('.mp4')" type="primary"-->
                             <!--class="drag-list-button" @click="onMainPicTap(item)">设为主图-->
                  <!--</el-button>-->
                  <el-button type="danger" @click="deletePicTap(item, index)">删除</el-button>
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="dialogFormConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {addGoodsserial, getGooTGoodsinfoById, listGoodsserialsByGoodsId, sendPicture} from "../../../util/module";
  import {trimSpace} from "../../../Gw/GwArray";
  import * as cfg from "../../../config/cfg";
  import _String from '../../../util/string';
  import draggable from 'vuedraggable';

  export default {
    name: "goodsSerail",
    components:{
      draggable
    },
    data() {
      return {
        goodsInfo: {
          goodsId: null,
          categoryId: null,
          goodsName: null,
          mainPicture: null,
          goodsImgs: null,
          goodsType: null,
          unitId: null,
          memo: null,
          version: null,
          pictureUrl: '',
        },
        goodsId: null,
        tableData: [],
        dialogVisible: false,
        dialogForm: {
          specColor: null,
          goodsId: null,
          imgs: [],
          mainPicture:null,
        },
        flag:1,//1.新增  2.修改
        dragOptions: {
          animation: 120,
          scroll: true,
          group: 'sortlist',
          ghostClass: 'ghost-style'
        },
      }
    },

    computed: {
      dialogTitle() {
        if (this.flag === 1) {
          return '新增';
        } else {
          return '修改';
        }
      }
    },

    created() {
      this.pictureUrl = cfg.service.uploadUrl + '/';
      this.goodsId = this.$route.query.goodsId;
      if (this.goodsId && this.goodsId !== '') {
        this.getGoodsInfo();
        this.getSerail();
      }
    },

    methods: {
      onAddNewTap() {
        this.dialogForm.goodsId = this.goodsInfo.goodsId;
        this.dialogForm.imgs = [];
        this.dialogForm.imgs.push(...this.goodsInfo.imgs);
        this.dialogVisible = true;
      },

      onMove({relatedContext, draggedContext}) {
        console.log("hello, move");//debug
      },

      deletePicTap(item, index) {
        //不处理主图
        // if (item === this.dialogForm.mainPicture) {
        //   this.$message.error("无法删除主图，请先选择其他图作为主图，然后再删除此图");
        //   return;
        // }
        this.searchForm.imgs.splice(index, 1);
      },

      dialogFormConfirm(){
        this.$refs.dialogForm.validate((valid) => {
          if (valid) {
            this.formCommit();
          } else {
            return false;
          }
        });
      },

      formCommit(){
        let params={};
        if (this.flag === 1) {
          //新增
          params.goodsId=this.dialogForm.goodsId;
          params.serialList=[];
          let serailInfo={};
          serailInfo.recycleSeq='1';
          serailInfo.goodsImgs=this.dialogForm.imgs.join(',');
          serailInfo.mainPicture=this.dialogForm.imgs[0];
          serailInfo.specColor=this.dialogForm.specColor;
          serailInfo.specSize=this.dialogForm.specSize;
          serailInfo.specMaterial=this.dialogForm.specMaterial;
          params.serialList.push(serailInfo);
          addGoodsserial(this, params).then(
            res=>{
              this.$message.success('新增成功');
              this.tableData=res.data;
              this.dialogVisible=false;
            },
            res=>{
            }
          ).catch();
        }

        if (this.flag === 2) {
        }
      },

      getTime() {
        return new Date().getTime();
      },

      handelPicturePost(data) {
        console.log("param:", data);
        let params = {};
        params.operFlag = '2';
        this.time = this.getTime();
        params.goodsId = this.dialogForm.goodsId;
        params.index = 'M';
        params.goodsFileNames = data.file;
        sendPicture(this, params).then(
          res => {
            this.dialogForm.imgs.push(res.data.fileNames);
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

      uploadButton(event) {
        //判断轮播信息数量，能否继续上传
        if (this.checkUploadButton()) {
          //能继续上传
        } else {
          //不能继续上传
          event.cancelBubble = true;
        }
      },

      checkUploadButton() {
        let num = this.dialogForm.imgs.length;
        if (num < 5) {
          return true;
        } else {
          this.$message.error("商品轮播信息不能大于5条");
          return false;
        }
      },

      //格式化金额
      formatPrice(price) {
        return _String.number_format(price, 2);
      },

      getSerail() {
        let params = {};
        params.goodsId = this.goodsId;
        listGoodsserialsByGoodsId(this, params).then(
          res => {
            this.tableData = res.data;
          },
          res => {

          }
        ).catch();
      },

      getGoodsInfo() {
        let params = {};
        params.goodsId = this.goodsId;
        getGooTGoodsinfoById(this, params).then(
          res => {
            console.log('获取物资信息', res);//debug
            this.goodsInfo.goodsId = res.data.goodsId;
            this.goodsInfo.categoryId = res.data.categoryId;
            this.goodsInfo.goodsName = res.data.goodsName;
            this.goodsInfo.mainPicture = res.data.mainPicture;
            this.goodsInfo.goodsImgs = res.data.goodsImgs;
            this.goodsInfo.goodsType = res.data.goodsType;
            this.goodsInfo.unitId = res.data.unitId;
            this.goodsInfo.memo = res.data.memo;
            this.goodsInfo.version = res.data.version;
            let tmp = [];
            tmp = this.goodsInfo.goodsImgs.split(',');
            this.goodsInfo.imgs = trimSpace(tmp);
          },

          res => {

          }
        ).catch();
      },
    }
  }
</script>

<style scoped>
  .table {
    width: 100%;
  }

  .line {
    border: 1px solid;
    height: 0px;
    color: #909399;
  }

  .goodInfo {
    margin-top: 10px;
  }

  .form-bot {
    text-align: right;
  }

  .spec-name-list span {
    font-size: 15px;
    color: #5F6165;
    padding-left: 10px;
  }

  .spec-list1 input {
    border-width: 0;
  }

  .barcode-ipt button {
    padding: 0 5px;
  }

  .spec-name-list-btn i {
    font-size: 15px;
    line-height: 42px;
    color: #429EFD;
  }

  .spec-name-list .spec-name-list-btn span {
    line-height: 42px;
    margin: 0;
    padding-left: 5px;
    color: #429EFD;
  }

  .showId {
    margin-bottom: 15px;
    margin-left: 28px;
    color: #606266;
  }

  .displayNon {
    display: none;
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

  .drag-list-img {
    height: 175px;
    width: 175px;
    border: 1px solid #EFF1F5;
  }

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

  .picture {
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
    margin-right: 10px;
  }

  .item {
    margin-right: 10px;
    margin-top: 10px;
    border: gray 1px solid;
    padding: 2px;
  }

  .item-ul::-webkit-scrollbar {
    width: 0;
  }
</style>
