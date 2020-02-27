<template>
  <div class="container">
    <div class="handle-box">
      <el-button type="success" icon="el-icon-plus" :disabled='addDisabled' @click="onAddNewTap">新增</el-button>
      <!--<el-button type="primary" :disabled='refDisabled' icon="el-icon-refresh" @click="onRefresh" class="fresh-btn">刷新</el-button>-->
    </div>

    <el-form :model="searchForm" ref="searchForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="机构" label-width="80px" prop="instId">
            <inst-selection v-model="mainInstInfo" placeholder="请选择机构" @click="mainInstClicked"></inst-selection>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" border stripe>
      <el-table-column label="资源名称" prop="resourceName" width="200"></el-table-column>
      <el-table-column label="资源图片" width="120" align="center">
        <template slot-scope="scope">
          <img style="height: 80px; width: 80px;background-color: white;"  :preview="scope.$index" :src="uploadUrl + scope.row.resourceUrl" >
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="props">
          <p>{{resourceStatus(props.row.status)}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button type="warning" :disabled='modifyDisabled' @click="modifiedTap(props.row)">修改</el-button>
          <el-button type="danger" :disabled='deleteDisabled' @click="deleteTap(props.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange"
                     @size-change="handleSizeChange"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageSize"
                     layout="total,sizes, prev, pager, next"
                     :total="AllCount">
      </el-pagination>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <el-form :model="dialogForm" label-width="80px" ref="dialogForm">
        <el-row>
          <el-col :span="24">
            <el-form-item v-if="flag===1" label="机构" prop="instId"
                          :rules="[{required: true, message:'请选择机构', trigger:'change'}]" ref="dialogInstId"
            >
              <inst-selection v-model="instInfo" placeholder="请选择机构"  @click="instClicked"></inst-selection>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="资源名称" prop="resourceName"
                          :rules="[
                          {required: true, message:'请输入资源名称', trigger:'blur'}
                          ]"
            >
              <el-input v-model="dialogForm.resourceName" placeholder="请输入资源名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="选择资源">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :http-request="handelPicturePostMain"
                :before-upload="beforeAvatarUpload">
                <img v-show="imgShow" :src="imageUrl"  class="avatar">
                <i v-if="dialogForm.resourceUrl==null" class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="flag===2">
          <el-col :span="24">
            <el-form-item label="状态" prop="status" :rules="[
              {required:true, message:'请选择状态', trigger:'blur'}
            ]">
              <el-select v-model="dialogForm.status" placeholder="请选择状态" style="width: 100%;">
                <el-option v-for="item in flags" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" type="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="dialogFormConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import InstSelection from '../../common/selection/InstSelection';
  import {
    resourceGetByCons,
    sendFile,
    resourcePreservation,
    resourceModification, resourceClear} from '@/util/module';
  import { Toast } from 'mint-ui';
  import { role } from '@/util/roleFunction';
  import cfg from '@/config/cfg.js';
  export default {
    name: 'sourceAction',
    components: {
      InstSelection
    },
    data(){
      return {
        searchForm:{},
        instInfo:{},
        mainInstInfo:{},
        tableData:[],
        flag:1,
        dialogVisible:false,
        dialogForm:{
          resourceName:null,
          instId:null,
          status:null,
          resourceUrl:null
        },
        flags:[
          {value:1, label:'正常'},
          {value:2, label:'注销'},
          {value:3, label:'停用'}
        ],
        imageUrl:null,
        uploadUrl:'',
        addDisabled:true,
        page:1,
        pageSize:10,
        AllCount:0,
        modifyDisabled:true,
        imgShow:false,
        deleteDisabled:false,
        orginInstInfo:{},
      }
    },

    computed:{
      dialogTitle(){
        if(this.flag===1){
          return '新增';
        }else{
          return '修改';
        }
      }
    },

    created(){
      role(this);
      if (this.Function.resourcePreservation  && this.mainInstInfo.instLevel !== 1) {
        this.addDisabled = false
      } else {
        this.addDisabled = true
      }

      if (this.Function.resourceModification  && this.mainInstInfo.instLevel !== 1) {
        this.modifyDisabled = false
      } else {
        this.modifyDisabled = true
      }

      if (this.Function.resourceClear  && this.mainInstInfo.instLevel !== 1) {
        this.deleteDisabled = false
      } else {
        this.deleteDisabled = true
      }

      this.orginInstInfo=JSON.parse(localStorage.getItem("sysInstInfo"));
      this.instInfo=JSON.parse(localStorage.getItem("sysInstInfo"));
      this.mainInstInfo=JSON.parse(localStorage.getItem("sysInstInfo"));
      this.uploadUrl=cfg.service.uploadUrl;
      this.initData();
    },

    methods:{
      initData(){
        const params={};
        params.pageSize=this.pageSize;
        params.page=this.page;
        params.specInstId=this.mainInstInfo.instId;
        resourceGetByCons(this, params, Toast).then(
          (res)=>{
            if(res.status===400){
              this.$message.error(res.msg);
              return;
            }
            this.tableData=res.data.rows;
            this.AllCount=res.data.records;
          },
          (res)=>{

          }
        ).catch();
      },

      resourceStatus(status){
        var str="未知";
        switch(status){
          case 1:
          case '1':
            str='正常';
            break;
          case 2:
          case '2':
            str='注销';
            break;
          case 3:
          case '3':
            str='停用';
            break;
        }
        return str;
      },

      onAddNewTap(row){
        this.flag=1;
        this.dialogVisible=true;
        this.dialogForm={
          resourceName:null,
          instId:null,
          status:1,
        };
        this.instInfo={};
        this.instInfo=this.mainInstInfo;
        this.dialogForm.instId=this.instInfo.instId;
        this.imgShow=false;
      },

      modifiedTap(row){
        this.imgShow=true;
        this.flag=2;
        this.dialogVisible=true;
        this.dialogForm.resourceId=row.resourceId;
        this.dialogForm.resourceName=row.resourceName;
        this.dialogForm.instId=row.instId;
        this.dialogForm.resourceType=row.resourceType;
        this.dialogForm.resourceUrl=row.resourceUrl;
        this.dialogForm.status=row.status;
        this.imageUrl=this.uploadUrl+this.dialogForm.resourceUrl;
      },

      deleteTap(row){
        this.$confirm('此操作将删除资源，是否确认', '删除资源', {
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          this.deleteResource(row);
        }).catch();
      },

      deleteResource(row){
        let params={};
        params.resourceId=row.resourceId;
        resourceClear(this, params, Toast).then(
          (res)=>{
            if(res.status===400){
              this.$message.error(res.msg);
              return;
            }
            this.$message.success('删除成功!');
            this.initData();
          },
          (res)=>{
            this.initData();
          }
        ).catch();
      },

      beforeAvatarUpload(file){
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      handelPicturePostMain(param) {
        console.log("param:", param);
        let params={};
        params.file=param.file;
        params.index='resource';
        sendFile(this, params, Toast).then(
          (res)=>{
            if(res.status===400){
              this.$message.error(res.msg);
              return;
            }
            this.$message.success('文件上传成功!');
            let filenames = res.data;
            let resourceUrl=filenames[0];
            this.dialogForm.resourceUrl="/"+this.orginInstInfo.instId+'/resource/'+resourceUrl;
            this.imageUrl=this.uploadUrl+this.dialogForm.resourceUrl;
            this.imgShow=true;
          },
          (res)=>{

          }
        ).catch();
      },

      mainInstClicked(nodeInfo){
        this.mainInstInfo=nodeInfo;
        this.initData();
      },

      instClicked(nodeInfo){
        this.instInfo=nodeInfo;
        this.dialogForm.instId=this.instInfo.instId;
        this.$refs.dialogInstId.$emit('el.form.change');
        this.imgShow=true;
      },

      dialogFormConfirm(){
        this.$refs['dialogForm'].validate((valid)=>{
          if(valid){
            this.dialogFormCommit();
          }else{
            return false;
          }
        });
      },

      dialogFormCommit(){
        let params={};
        if(this.dialogForm.resourceId!=null){
          params.resourceId=this.dialogForm.resourceId;
        }
        params.resourceName=this.dialogForm.resourceName;
        params.specInstId=this.dialogForm.instId;
        params.resourceType='1';
        params.resourceUrl =this.dialogForm.resourceUrl ;
        params.status=this.dialogForm.status;
        if(this.flag===1){
          resourcePreservation(this, params, Toast).then(
            (res)=>{
              if(res.status===400){
                this.$message.error(res.msg);
                return;
              }
              this.$message.success('新增成功!');
              this.dialogVisible=false;
              this.initData();
            },
            (res)=>{
              if(res==='timeout'){
                this.$message.error('交易超时，刷新页面');
              }
              this.initData();
            }
          ).catch();
        }else {
          resourceModification(this, params, Toast).then(
            (res)=>{
              if(res.status===400){
                this.$message.error(res.msg);
                return;
              }
              this.$message.success('修改成功!');
              this.dialogVisible=false;
              this.initData();
            },
            (res)=>{
              if(res==='timeout'){
                this.$message.error('交易超时，刷新页面');
              }
              this.initData();
            }
          ).catch();
        }

      },

      checkInstId(rule, value, callback){
        if(value===null||value===''){
          callback(new Error('请选择机构'));
          return;
        }
        callback();
      },

      handleSizeChange(){
        this.initData();
      },

      handleCurrentChange(options){
        this.page=options;
        this.initData();
      },

    }
  }
</script>

<style>
  .handle-box {
    margin-top: 10px;
    margin-bottom: 20px;
    display: inline-block;
    width: 100%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
