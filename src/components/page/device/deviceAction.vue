<template>
  <div class="container">
    <el-form :model="searchForm" ref="searchForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="机构" label-width="80px" prop="instId" ref="instId">
            <inst-selection v-model="instInfo" @click="mainInstClickTap" placeholder="请选择机构"></inst-selection>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="deviceTable" border stripe>
      <!--<el-table-column type="selection" width="55"></el-table-column>-->
      <el-table-column label="设备UUID" prop="deviceId"></el-table-column>
      <el-table-column label="设备名称" prop="deviceName" ></el-table-column>
      <el-table-column  v-if="mainInstInfo.instLevel===2||mainInstInfo.instLevel===3" label="小区名称" prop="districtName"></el-table-column>
      <el-table-column  v-if="mainInstInfo.instLevel<=4&&mainInstInfo.instLevel!==1"  label="楼栋名称" prop="buildingsName"></el-table-column>
      <el-table-column label="单元名称" prop="unitName" ></el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="props">
          <p>{{deviceStatus(props.row.status)}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="380">
        <template slot-scope="props">
          <el-button type="primary" :disabled='modifyDisabled' @click="modifyTap(props.row)">修改</el-button>
          <el-button v-if="props.row.status===9" type="primary" :disabled='assignDisabled' @click="assignTap(props.row)">分配</el-button>
          <el-button v-if="props.row.status===1" type="warning" :disabled='unbindDisabled' @click="unbindTap(props.row)">解绑</el-button>
          <el-button v-if="props.row.status===8||props.row.status===2" type="primary" :disabled='bindDisabled' @click="bindTap(props.row)">绑定</el-button>
          <el-button v-if="props.row.status===1" type="danger" :disabled='deviceOpenTheDoorDisabled' @click="deviceOpenTheDoor(props.row)">开门</el-button>
          <el-button v-if="props.row.status===1" @click="resourceInfoTap(props.row)">资源</el-button>
          <el-button type="primary" v-if="props.row.status===1" :disabled="syncDisabled" @click="syncTap(props.row)">同步设备</el-button>
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

    <el-dialog :visible.sync="assignVisible" title="分配设备" width="55%">
      <el-form :model="assignForm" label-width="80px" ref="assignForm">
        <el-row>
          <el-col :span="24" style="text-align: center">
            将设备‘<span style="background-color: gray; color: blue; font-size:20px">{{deviceInfo.deviceName?deviceInfo.deviceName:deviceInfo.deviceId}}</span>’分配给
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="24">
            <el-form-item label="机构" label-width="80px" prop="instId">
              <inst-selection v-model="instInfo" @click="assignInstClickTap"></inst-selection>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="assignFormConfirm">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="bindVisible" title="绑定设备" width="40%">
      <el-form :model="bindForm" label-width="80px" ref="bindForm">
        <el-row>
          <el-col :span="24" style="text-align: center">
            将设备‘UUID:<span style="background-color: gray; color: blue; font-size:20px">{{deviceInfo.deviceId}}</span>’绑定到
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="24">
            <el-form-item label="机构" label-width="80px" prop="instId" ref="dialogInstId"
                          :rules="[{ validator: checkInstId, trigger: 'change' }]"
            >
              <inst-selection-new @click="bindInstClickTap" placeholder="请选择楼栋"></inst-selection-new>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sapn="24">
            <el-form-item label="单元" prop="unitId" :rules="[
                  {required: true, message:'请选择单元', trigger:'blur'}
                ]">
              <el-select v-model="bindForm.unitId" placeholder="请选择单元" style="width: 100%;">
                <el-option v-for="item in units" :key="item.unitId" :label="item.unitName" :value="item.unitId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button @click="bindVisible=false">取消</el-button>
        <el-button type="primary" @click="bindFormConfirmTap">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="modifyVisible" title="修改设备" width="40%">
      <el-form :model="modifyForm" label-width="80px" ref="modifyForm">
        <el-row>
          <el-col :span="24" style="text-align: center">
            修改设备‘UUID:<span style="background-color: gray; color: blue; font-size:20px">{{deviceInfo.deviceId}}</span>’信息
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="24">
            <el-form-item label="设备名称" label-width="80px" prop="deviceName">
              <el-input placeholder="请输入设备名称" v-model="modifyForm.deviceName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="24">
            <el-form-item label="状态" label-width="80px" prop="status">
              <el-select v-model="modifyForm.status" style="width: 100%;">
                <el-option v-for="item in statusOptions" :key="item.key" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button @click="modifyVisible=false">取消</el-button>
        <el-button type="primary" @click="modifyFormConfirmTap">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="resourceVisible" title="查看此单元设备资源">
      <el-button type="danger" style="margin-bottom: 10px; margin-top: -20px;" :disabled="deleteAllDisabled" @click="deleteResourceAllTap">全部删除</el-button>
      <el-table :data="resources" border stripe>
        <!--<el-table-column label="资源ID" prop="resourceId"></el-table-column>-->
        <el-table-column label="资源名称" prop="resourceName"></el-table-column>
        <el-table-column label="资源图片" width="120" align="center">
          <template slot-scope="scope">
            <img style="height: 80px; width: 80px;background-color: white;"  :src="uploadUrl + scope.row.resourceUrl" >
          </template>
        </el-table-column>
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
  import InstSelectionNew from '../../common/selection/InstSelectionNew';
  import {
    deviceGetByCons,
    assignDeviceModification,
    bindDeviceModification,
    unitGetByCons,
    deviceOpenDoorModification,
    deviceModification,
    devAndResGetByCons,
    devAndResClear,
    synchronizeDeviceModification
  } from '../../../util/module';
  import { Toast } from 'mint-ui';
  import { role } from '@/util/roleFunction';
  import cfg from '@/config/cfg.js';
  export default {
    name: 'deviceAction',
    components: {
      InstSelection,
      InstSelectionNew
    },
    data(){
      return {
        searchForm:{},
        instInfo:{},
        mainInstInfo:{},
        deviceTable:[],
        batchFlag:null,
        batchTypes:[
          {value:1, label:'分配设备'}
        ],
        page:1,
        pageSize:20,
        AllCount:0,
        assignForm:{},
        assignVisible:false,
        assignDisabled:true,
        deviceInfo:{},
        bindVisible:false,
        bindForm:{},
        units:{},
        unbindDisabled:true,
        bindDisabled:true,
        deviceOpenTheDoorDisabled:true,
        modifyVisible:false,
        modifyForm:{
          deviceId:null,
          deviceName:null,
          status:0,
        },
        modifyFormOld:{
          deviceId:null,
          deviceName:null,
          status:null,
        },
        modifyDisabled:true,
        statusOptions:[],
        resourceVisible:false,
        resources:[],
        uploadUrl:'',
        syncDisabled:true,
        deleteAllDisabled:true,
      }
    },

    created(){
      role(this);

      this.mainInstInfo=JSON.parse(localStorage.getItem("sysInstInfo"));
      this.searchForm.instId=this.mainInstInfo.instId;

      if (this.Function.assignDeviceModification && this.mainInstInfo.instLevel === 1) {
        this.assignDisabled = false
      } else {
        this.assignDisabled = true
      }

      if (this.Function.bindDeviceModification    && this.mainInstInfo.instLevel !== 1) {
        this.unbindDisabled = false;
        this.bindDisabled = false;
      } else {
        this.unbindDisabled = true;
        this.bindDisabled = true;
      }

      if (this.Function.deviceOpenDoorModification && this.mainInstInfo.instLevel !== 1) {
        this.deviceOpenTheDoorDisabled = false;
      } else {
        this.deviceOpenTheDoorDisabled = true;
      }

      if (this.Function.deviceModification  && this.mainInstInfo.instLevel !== 1) {
        this.modifyDisabled= false;
      } else {
        this.modifyDisabled= true;
      }

      if (this.Function.synchronizeDeviceModification  && this.mainInstInfo.instLevel !== 1) {
        this.syncDisabled= false;
      } else {
        this.syncDisabled= true;
      }

      if (this.Function.devAndResClear  && this.mainInstInfo.instLevel !== 1) {
        this.deleteAllDisabled= false;
      } else {
        this.deleteAllDisabled= true;
      }

      this.instInfo=JSON.parse(localStorage.getItem("sysInstInfo"));
      this.searchForm.instId=this.instInfo.instId;

      this.uploadUrl=cfg.service.uploadUrl;
      this.initData();
    },

    methods:{
      initData(){
        const params={};
        if(this.mainInstInfo.instLevel!==1){
          params.specInstId=this.searchForm.instId;
        }
        params.pageSize=this.pageSize;
        params.page=this.page;
        deviceGetByCons(this, params, Toast).then(
          (res)=>{
            this.deviceTable=res.data.rows;
            this.AllCount=res.data.records;
          },
          (res)=>{
            if(res==='timeout'){
              this.$message('刷新超时');
            }
          }
        ).catch(
          (res)=>{
            this.$message('交易异常,请刷新');
          }
        );
      },

      deviceStatus(status){
        var str="未知";
        switch(status){
          case 1:
          case '1':
            str='已绑定';
            break;
          case 2:
          case '2':
            str='已解绑';
            break;
          case 8:
          case '8':
            str='已分配';
            break;
          case 9:
          case '9':
            str='已激活'
            break;
        }
        return str;
      },

      unbindTap(row){
        this.$confirm("此操作将解绑设备，是否继续？", "解绑", {
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'error'
        }).then(
          ()=>{
            this.unbindDevice(row);
          }
        ).catch();
      },

      unbindDevice(row){
        let params={};
        params.deviceId=row.deviceId;
        params.unitId=row.unitId;
        params.operFlag='2';
        params.buildingInstId=row.buildingInstId;
        bindDeviceModification(this, params, Toast).then(
          (res)=>{
            this.$message.success('解绑成功');
            this.initData();
          },
          (res)=>{
            if(res==='timeout'){
              this.$message.error("交易超时，刷新页面，查看设备有没有被解绑！");
              this.initData();
            }
          }
        ).catch();
      },

      bindTap(row){
        this.deviceInfo=row;
        this.bindForm={};
        this.bindForm.deviceId=this.deviceInfo.deviceId;
        this.bindForm.operFlag='1';
        this.instInfo=this.mainInstInfo;
        this.bindForm.instId=this.instInfo.instId;
        this.units={};
        this.bindVisible=true;
        this.getUnits();
      },

      unuseTap(){
        this.$confirm("此操作将停用设备，是否继续？", "停用", {
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'error'
        }).then(
        ).catch();
      },

      useTap(){
        this.$confirm("此操作将启用设备，是否继续？", "启用", {
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'error'
        }).then(
        ).catch();
      },

      mainInstClickTap(nodeInfo){
        this.mainInstInfo=nodeInfo;
        this.searchForm.instId=this.mainInstInfo.instId;
        this.$refs.instId.$emit('el.form.change');
        this.initData();
      },

      handleSizeChange(){
        this.initData();
      },

      handleCurrentChange(options){
        this.page=options;
        this.initData();
      },

      assignTap(row){
        this.assignVisible=true;
        this.deviceInfo=row;
        this.assignForm.deviceId=this.deviceInfo.deviceId;
        this.assignForm.deviceName=this.deviceInfo.deviceName;
      },

      assignInstClickTap(nodeInfo){
        this.instInfo=nodeInfo;
        this.assignForm.instId=this.instInfo.instId;
      },

      bindInstClickTap(nodeInfo){
        this.instInfo=nodeInfo;
        this.bindForm.instId=this.instInfo.instId;
        this.$refs.dialogInstId.$emit('el.form.change');
        this.getUnits();
      },

      assignFormConfirm(){
        let params={};
        params.deviceId=this.assignForm.deviceId;
        params.deviceName=this.assignForm.deviceName;
        params.specInstId=this.assignForm.instId;
        assignDeviceModification(this, params, Toast).then(
          (res)=>{
            this.$message.success("分配成功");
            this.initData();
            this.assignVisible=false;
          },
          (res)=>{
            if(res==='timeout'){
              this.$message.error("交易超时，刷新页面，查看设备有没有被分配！");
              this.initData();
            }
          }
        ).catch(
          ()=>{
            this.$message.error('交易异常');
          }
        );
      },

      bindFormConfirmTap(){
        this.$refs.bindForm.validate((valid)=>{
          if(valid){
            this.bindFormConfirm();
          }else{
            return false;
          }
        });
      },

      bindFormConfirm(){
        let params={};
        params.deviceId=this.bindForm.deviceId;
        params.unitId=this.bindForm.unitId;
        params.operFlag=this.bindForm.operFlag;
        params.buildingInstId=this.bindForm.instId;
        bindDeviceModification(this, params, Toast).then(
          (res)=>{
            this.$message.success("绑定成功");
            this.initData();
            this.bindVisible=false;
          },
          (res)=>{
            if(res==='timeout'){
              this.$message.error("交易超时，刷新页面，查看设备有没有被绑定！");
              this.initData();
            }
          }
        ).catch(
          ()=>{
            this.$message.error('交易异常');
          }
        );
      },

      getUnits(){
        this.units={};
        if(this.instInfo.instLevel!==5){
          return;
        }
        let params={};
        params.buildingInstId =this.instInfo.instId;
        unitGetByCons(this, params, Toast).then(
          (res)=>{
            this.units=res.data;
          },
          (res)=>{

          }
        ).catch();
      },

      checkMainInstId(rule, value, callback){
        if(value===null||value===''){
          callback(new Error('请选择楼栋'));
          return;
        }
        if(this.mainInstInfo.instLevel!==5){
          callback(new Error('请选择楼栋'));
          return;
        }
        callback();
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

      deviceOpenTheDoor(row){
        this.$confirm('此操作将开门，是否确认?', '开门', {
          confirmButtonText:'确认',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=> {
            this.openDoor(row)
          }
        ).catch();
      },

      openDoor(row){
        let params={};
        params.deviceId=row.deviceId;
        params.unitId=row.unitId;
        deviceOpenDoorModification(this, params, Toast).then(
          (res)=>{
            this.$message.success('开门成功！');
          },
          (res)=>{
            if(res==='timeout'){
              this.$message.error("开门超时，请重试!");
            }
          }
        ).catch();
      },

      modifyTap(row){
        this.modifyVisible=true;
        this.deviceInfo=row;
        this.modifyForm.deviceId=this.deviceInfo.deviceId;
        this.modifyForm.deviceName=this.deviceInfo.deviceName;
        this.modifyForm.status=this.deviceInfo.status;
        this.modifyFormOld.deviceId=this.deviceInfo.deviceId;
        this.modifyFormOld.deviceName=this.deviceInfo.deviceName;
        this.modifyFormOld.status=this.deviceInfo.status;
        if(this.modifyForm.status===2){
          this.statusOptions=[
            {key:2, label:'已解绑', value: 2},
            {key:9, label:'已激活', value: 9},
          ];
        }else if (this.modifyForm.status===8){
          this.statusOptions=[
            {key:8, label:'已分配', value: 8},
            {key:9, label:'已激活', value: 9},
          ];
        }else if(this.modifyForm.status===1){
          this.statusOptions=[
            {key:1, label:'已绑定', value: 1},
          ];
        }else if(this.modifyForm.status===9){
          this.statusOptions=[
            {key:9, label:'已激活', value: 9},
          ];
        }
      },

      modifyFormConfirmTap(){
        if(this.modifyForm.deviceName===this.modifyFormOld.deviceName&&this.modifyForm.status===this.modifyFormOld.status){
          this.$message.error("没有变化，无需修改");
          return;
        }
        let params={};
        params.deviceId=this.modifyForm.deviceId;
        if(this.modifyForm.deviceName!==this.modifyFormOld.deviceName){
          params.deviceName=this.modifyForm.deviceName;
        }
        if(this.modifyForm.status!==this.modifyFormOld.status){
          params.status=this.modifyForm.status;
        }

        deviceModification(this, params, Toast).then(
          (res)=>{
            this.modifyVisible=false;
            this.$message.success('修改成功!');
            this.initData();
          },
          (res)=>{
            if(res==='timeout'){
              this.$message.error('超时，请重试！');
            }
            this.initData();
          }
        ).catch();
      },

      resourceInfoTap(row){
        this.deviceInfo=row;
        this.getDevResources();
      },

      getDevResources(){
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

      deleteResourceTap(row){
        this.$confirm('此操作将删除资源，是否确认？', '删除资源',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'danger'
        }).then(
          ()=>{
            this.deleteResource(row);
          }
        ).catch();
      },

      deleteResource(row){
        let params={};
        params.resourceId=row.resourceId;
        params.deviceId=row.deviceId;
        devAndResClear(this, params, Toast).then(
          (res)=>{
            this.$message.success('删除成功!');
            this.getDevResources();
          },
          (res)=>{
            this.getDevResources();
          }
        ).catch();
      },

      syncTap(row){
        let params={};
		params.deviceId=row.deviceId;
        synchronizeDeviceModification(this, params, Toast).then(
          (res)=>{
            this.$message.success('设备同步资源成功！');
            this.synOk=true;
          },

          (res)=>{
            if(res==='timeout'){
              this.$message.error('交易超时，请重试!');
            }
          }
        ).catch();
      },
    }
  }
</script>

<style scoped>

</style>
