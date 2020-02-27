<template>
  <div class="container">
    <div class="handle-box">
      <el-button type="success" :disabled='addDisabled' icon="el-icon-plus" @click="onAddNewTap">新增</el-button>
    </div>

    <el-form :model="searchForm" ref="searchForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="楼栋" label-width="80px" prop="instId" :rules="[
              { validator: checkMainInstId, trigger: 'change' }
            ]"
          ref="instId">
            <inst-selection v-model="instInfo" @click="instClick"></inst-selection>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="unitInfos" border stripe size="medium">
      <el-table-column label="单元名称" prop="unitName"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button type="primary" :disabled='modifyDisabled' @click="modifyUnitInfo(props.row)">修改</el-button>
          <!--在设备列表中体现-->
          <!--<el-button type="danger" :disabled='openDisabled' @click="openTheDoorTap(props.row)">开门</el-button>-->
          <!--在设备列表中体现-->
          <!--<el-button @click="resourceInfoTap(props.row)">资源</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="title">
      <el-form :model="unitForm" label-width="80px" ref="unitForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="楼栋" prop="instId"
            :rules="[
              { validator: checkInstId, trigger: 'change' }]"
                          ref="dialogInstId"
            >
              <inst-selection v-if="flag===1" v-model="instInfo"  placeholder="请选择楼栋"  @click="instClick" ></inst-selection>
              <inst-selection v-else v-model="instInfo" :disabled="true" ></inst-selection>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sapn="24">
            <el-form-item label="名称" ref="dialogFormHouseNum" prop="unitName"
                          :rules="[
                          {required: true, message:'请输入单元名称', trigger:'blur'},
                          {validator:unitNameUniqCheck, trigger:'blur'}
            ]">
              <el-autocomplete style="width: 100%;" v-model="unitForm.unitName" :fetch-suggestions="querySearch"
                               @select="handleSelect"></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="unitFormConfirm">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="resourceVisible" title="查看此单元设备资源">
      <el-button type="danger" style="margin-bottom: 10px; margin-top: -20px;" @click="deleteResourceAllTap">全部删除</el-button>
      <el-table :data="resources" border stripe>
        <!--<el-table-column label="资源ID" prop="resourceId"></el-table-column>-->
        <el-table-column label="资源名称" prop="resourceName"></el-table-column>
        <el-table-column label="播放时间（秒）" prop="playInterv"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="props">
            <el-button type="danger" :disabled='modifyDisabled' @click="deleteResourceTap(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import InstSelection from '../../common/selection/InstSelection';
  import {unitPreservation, unitGetByCons, deviceGetById, deviceOpenDoorModification,
    unitModification, devAndResGetByCons, devAndResClear} from '@/util/module.js';
  import { Toast } from 'mint-ui';
  import { role } from '@/util/roleFunction';
  import {inArrayOptionByCons} from '@/Gw/GwArray.js';
  export default {
    name: 'unit',
    data(){
      return {
        addDisabled:true,
        openDisabled:true,
        refDisabled:false,
        dialogVisible:false,
        unitForm:{
          instId:null,
          unitName:null,
        },
        unitInfos:[],
        title:'新增单元',
        flag:1,
        searchForm:{},
        instInfo:{},
        dialogFirst:true,
        deviceInfo:{},
        modifyDisabled:true,
        resources:[],
        resourceVisible:false,
        querys:[
          {value:'1单元'},
          {value:'2单元'},
          {value:'3单元'},
          {value:'4单元'},
          {value:'5单元'},
          {value:'6单元'},
          {value:'7单元'},
          {value:'8单元'},
          {value:'9单元'}
        ],
      }
    },

    components: {
      InstSelection
    },

    created(){
      role(this);

      this.instInfo=JSON.parse(localStorage.getItem("sysInstInfo"));
      this.initData();

      if (this.Function.unitPreservation && this.instInfo.instLevel !== 1) {
        this.addDisabled = false 
      } else {
        this.addDisabled = true  
      }

      if (this.Function.deviceOpenDoorModification && this.instInfo.instLevel !== 1) {
        this.openDisabled = false 
      } else {
        this.openDisabled = true  
      }

      if (this.Function.unitModification && this.instInfo.instLevel !== 1) {
        this.modifyDisabled = false 
      } else {
        this.modifyDisabled = true 
      }

      this.$nextTick(()=>{
        this.$refs.instId.$emit('el.form.change');
      });
    },

    methods:{
      initData(){
        this.unitInfos=[];
        if(this.instInfo.instLevel!==5){
          this.unitInfos=[];
          return;
        }
        const params={};
        params.buildingInstId=this.instInfo.instId;
        unitGetByCons(this, params, Toast).then(
          (res)=>{
            if(res.status===400){
              this.$message.error(res.msg);
              return;
            }
            this.unitInfos=res.data.sort(function(a,b){
              let numA=parseInt(a.unitName);
              let numB=parseInt(b.unitName);
              if(!isNaN(numA)&&!isNaN(numB)){
                return numA-numB;
              }else if(!isNaN(numA)&&isNaN(numB)){
                return -1;
              }else if(isNaN(numA)&&!isNaN(numB)){
                return 1;
              }else{
                return (a.unitName).localeCompare(b.unitName);
              }
            });
          },
          (res)=>{
            if(res==='timeout'){
              this.$message.error('交易超时');
            }else{
              this.$message.error(res.msg);
            }
          }
        ).catch(
          (res)=>{
            this.$message.error('交易异常');
          }
        );
      },

      onAddNewTap(){
        this.dialogVisible=true;
        this.title='新增单元';
        this.flag=1;
        this.unitForm.unitName=null;
        this.unitForm.instId=this.instInfo.instId;
        if(!this.dialogFirst){
          this.$refs.unitForm.resetFields();
        }else{
          this.dialogFirst=false;
        }
      },

      unitFormConfirm(){
        this.$refs['unitForm'].validate((valid)=>{
          if(valid){
            this.unitFormCommit();
          }else{
            return false;
          }
        });
      },

      unitFormCommit(){
        const params={};
        params.buildingInstId=this.unitForm.instId;
        params.unitName=this.unitForm.unitName;
        params.unitId=this.unitForm.unitId;
        if(this.flag===1){
          unitPreservation(this, params).then(
            (res)=>{
              this.dialogVisible=false;
              this.initData();
              this.$message.success('新增成功');
            },
            (res)=>{
              if(res==='timeout'){
                this.$message.error('交易超时，刷新页面');
                this.initData();
              }
            }
          ).catch();
        }else{
          unitModification(this, params).then(
            (res)=>{
              this.dialogVisible=false;
              this.initData();
              this.$message.success('修改成功');
            },
            (res)=>{
              if(res==='timeout'){
                this.$message.error('交易超时，刷新页面');
                this.initData();
              }
            }
          ).catch();
        }

      },

      modifyUnitInfo(row){
        this.title='修改单元';
        this.flag=2;
        this.instInfo.instId=this.instInfo.instId;
        this.instInfo.instLevel=this.instInfo.instLevel;
        this.instInfo.aliasName=this.instInfo.aliasName;
        this.unitForm.instId=row.buildingInstId;
        this.unitForm.unitName=row.unitName;
        this.unitForm.unitId=row.unitId;
        this.dialogVisible=true;
      },

      openTheDoorTap(row){
        this.$confirm('此操作将开门，是否确认?', '开门', {
          confirmButtonText:'确认',
          cancelButtonText:'取消',
          type:'error'
        }).then(()=> {
            this.openTheDoor(row)
          }
        ).catch();
      },

      openTheDoor(row){
        let params={};
        params.unitId=row.unitId;
        deviceGetById(this, params, Toast).then(
          (res)=>{
            if(res.data==null){
              this.$message.error(res.msg);
              return;
            }
            this.deviceInfo=res.data;
            params={};
            params.deviceId=this.deviceInfo.deviceId;
            params.unitId=this.deviceInfo.unitId;
            deviceOpenDoorModification(this, params, Toast).then(
              (res)=>{
                this.$message.success('开门成功！');
              },
              (res)=>{

              }
            ).catch();
          },
          (res)=>{
            if(res==='timeout'){
              this.$message.error('开门超时，请重新点击开门');
            }else{
              this.$message.error(res.msg);
            }
          }
        ).catch();
      },

      resourceInfoTap(row){
        let params={};
        params.unitId=row.unitId;
        deviceGetById(this, params, Toast).then(
          (res)=>{
            if(res.data==null){
              this.$message.error(res.msg);
              return;
            }
            this.deviceInfo=res.data;

            this.resources=[];
            let params={};
            params.deviceId=this.deviceInfo.deviceId;
            devAndResGetByCons(this, params, Toast).then(
              (res)=>{
                this.resources=res.data;
                this.resourceVisible=true;
              },

              (res)=>{
                if(res==='timeout'){
                  this.$message.error("交易超时，请重试!");
                }
              }
            ).catch();
          },
          (res)=>{
            if(res==='timeout'){
              this.$message.error('查看资源超时，请重新查看资源');
            }else{
              this.$message.error(res.msg);
            }
          }
        ).catch();
      },

      checkInstId(rule, value, callback){
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

      unitNameUniqCheck(rule, value, callback){
        if(value==null||value===''){
          callback(new Error('请输入单元名称！'));
        }
        if(inArrayOptionByCons(this.unitInfos, value, 'unitName')){
          callback(new Error('单元名称重复，请换一个名称！'));
          return;
        }
        callback();
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
        this.unitForm.instId=this.instInfo.instId;
        this.$refs.instId.$emit('el.form.change');
        if (this.$refs.dialogInstId != null) {
          this.$refs.dialogInstId.$emit('el.form.change');
        }
        this.initData();
      },

      deleteResourceAllTap(){
        this.$confirm('此操作将删除设备所有资源，是否确认？', '删除资源', {
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(
          ()=>{
            let params={};
            params.deviceId=this.deviceInfo.deviceId;
            devAndResClear(this, params, Toast).then(
              (res)=>{
                this.$message.success('删除成功!');
                this.resources=[];
              },

              (res)=>{
                if(res==='timeout'){
                  this.$message.error('删除失败，请重试！');
                }
              }
            ).catch();
          }
        ).catch();
      },

      deleteResourceTap(){
        this.$confirm('此操作将删除资源，是否确认？', '删除资源',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'danger'
        }).then();
      },

      deleteResource(){

      },

      createFilter(queryString) {
        return (query) => {
          return (query.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },

      querySearch(queryString, cb) {
        let querys = this.querys;
        let results = queryString ? querys.filter(this.createFilter(queryString)) : querys;
        cb(results);
      },

      handleSelect(){
        this.$refs.unitForm.validateField('unitName');
      },
    }
  }
</script>

<style scoped>
  .handle-box {
    margin-top: 10px;
    margin-bottom: 20px;
    display: inline-block;
    width: 100%;
  }

  .fresh-btn {
    float: right;
  }

  .form-container{
    margin: 0px;
    padding: 0px;
  }
</style>
