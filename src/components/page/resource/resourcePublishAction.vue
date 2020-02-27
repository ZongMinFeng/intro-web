<template>
  <div class="container">
    <el-row>
      <el-col :span="10">
        <el-row>
          <el-col :span="4">
            <h3 style="margin-bottom: 5px">已选资源</h3>
          </el-col>
          <el-col :span="20">
            <el-button style="margin-bottom: 5px" type="warning" @click="cleanAllResources">清除所有资源</el-button>
          </el-col>
        </el-row>
        <div class="left">
          <el-table :data="resourcesShow"
                    border
                    stripe
          >
            <el-table-column label="资源名称" prop="resourceName"></el-table-column>
            <el-table-column label="图片" width="120" align="center">
              <template slot-scope="scope">
                <img style="height: 80px; width: 80px;background-color: white;"  :preview="scope.$index" :src="uploadUrl + scope.row.resourceUrl" >
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="props">
                <el-button type="danger" @click="deleteResource(props.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>

      <el-col :span="4">
        <div style="height: 100px;">
          <div class="middle">
            <div class="button1">
              <el-button type="primary" @click="selectResource">选择资源</el-button>
            </div>
            <div class="button2">
              <el-button type="success" @click="selectDevice">选择设备</el-button>
            </div>
            <div class="button3">
              <el-button type="warning" @click="publishTap">发布资源</el-button>
            </div>
            <div class="input1">
              <!--<el-button type="warning" >播放间隔</el-button>-->
              <el-row>
                <el-col :span="6" style="margin-top: -5px">播放间隔</el-col>
                <el-col :span="16">
                  <el-input style="width: 90px;" v-model="playInterv" @change="inputChange"></el-input>
                </el-col>
                <el-col :span="2" style="margin-top: 4px">秒</el-col>
              </el-row>
            </div>
            <div class="button4">
              <el-button type="primary" @click="synTap">同步设备</el-button>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="10">
        <el-col :span="4">
          <h3 style="margin-bottom: 5px">已选设备</h3>
        </el-col>
        <el-col :span="20">
          <el-button style="margin-bottom: 5px" type="warning" @click="cleanAllDevices">清除所有设备</el-button>
        </el-col>
        <div class="right">
          <el-table :data="devicesShow"
                    border
                    stripe>
            <el-table-column label="设备名称" prop="deviceName"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="props">
                <el-button type="danger" @click="deleteDevice(props.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="resourceVisible" width="50%" title="请选择资源">
      <resources-selection @return="resourceSelection"></resources-selection>
    </el-dialog>

    <el-dialog :visible.sync="deviceVisible" width="50%" title="请选择设备">
      <devices-selection @return="deviceSelection"></devices-selection>
    </el-dialog>
  </div>
</template>

<script>
  import ResourcesSelection from "@/components/common/selection/ResourcesSelection.vue";
  import {
    inArrayByCons,
    indexByCons,
  } from "@/Gw/GwArray.js";
  import DevicesSelection from "@/components/common/selection/DevicesSelection.vue";
  import {pubRes2DevPreservation, synchronizeResModification} from "@/util/module.js";
  import { Toast } from 'mint-ui';
  import cfg from '@/config/cfg.js';
  export default {
    name: "resourcePublish",
    components:{
      ResourcesSelection,
      DevicesSelection
    },
    data(){
      return {
        resourcesShow:[],
        resources:[],
        devicesShow:[
          {result:null}
        ],
        devices:[],
        errorResults:[
          {resourceName:'奶酪棒', deviceName:"测试设备6", cause:'未知'}
        ],
        resourceVisible:false,
        deviceVisible:false,
        synOk:true,
        playInterv:'5',
        playIntervOld:'5',
        uploadUrl:'',
      }
    },

    created(){
      this.devicesShow=[];
      this.uploadUrl=cfg.service.uploadUrl;
    },

    beforeRouteLeave: function(to, from , next){
      next(false);
      if(this.synOk){
        next();
        return;
      }
      this.$confirm('设备未同步资源， 是否同步', '设备同步资源',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(
        ()=>{
          this.synTap();
        }
      ).catch(
        ()=>{
          next();
        }
      );
    },

    methods:{
      selectResource(){
        this.resourceVisible=true;
      },

      selectDevice(){
        this.deviceVisible=true;
      },
      resourceSelection(resourcesReady){
        this.resourceVisible=false;
        let resourcesTmp=[];
        resourcesReady.forEach((value)=>{
          if(!inArrayByCons(this.resources, value, 'resourceId')){
            resourcesTmp.push(value);
          }
        });
        this.resources.push(...resourcesTmp);
        this.resourcesShow.push(...resourcesTmp);
      },

      deleteResource(row){
        this.resources.splice(this.indexOf(this.resources, row), 1);
        this.resourcesShow.splice(this.indexOf(this.resourcesShow, row), 1);
      },

      indexOf(array, row){
        let indexReturn=-1;
        if(!array instanceof Array){
          return -1;
        }

        array.forEach((item, index)=>{
          if (item.resourceId===row.resourceId) {
            indexReturn=index;
          }
          return -1;
        });

        return indexReturn;
      },

      deviceSelection(deviceReady){
        this.deviceVisible=false;
        let deviceTemp=[];
        deviceReady.forEach((value)=>{
          if(!inArrayByCons(this.devices, value, 'deviceId')){
            deviceTemp.push(value);
          }
        });
        this.devices.push(...deviceTemp);
        this.devicesShow.push(...deviceTemp);
      },

      deleteDevice(row){
        this.devices.splice(indexByCons(this.devices, row, 'deviceId'), 1);
        this.devicesShow.splice(indexByCons(this.devicesShow, row, 'deviceId'), 1);
      },

      publishTap(){
        if(this.resources.length<1){
          this.$message.error('请选择资源!');
          return;
        }
        if(this.devices.length<1){
          this.$message.error('请选择设备!');
          return;
        }
        this.$confirm('已选资源'+this.resources.length+'个'+', 已选设备'+this.devices.length+'个'+', 确定发布资源?', '发布资源', {
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          this.publish();
        }).catch();
      },

      publish(){
        let params={};
        params.playInterv=this.playInterv;
        params.resList=[];
        this.resources.forEach((resource)=>{
          params.resList.push(resource.resourceId);
        });
        params.devList=[];
        this.devices.forEach((device)=>{
          params.devList.push(device.deviceId);
        });
        pubRes2DevPreservation(this, params, Toast).then(
          (res)=>{
            if(res.status===400){
              this.$message.error(res.msg);
              return;
            }
            this.$nextTick(()=>{
              this.resources.forEach((value, index)=>{
                if(value.result!=='发布成功'){
                  this.resources[index].result='发布成功';
                }
              });
              this.resourcesShow.forEach((value, index)=>{
                if(value.result!=='发布成功'){
                  this.resourcesShow[index].result='发布成功';
                }
              });

              this.resourcesShow.push(...[]);
              this.$message.success('发布资源成功!');
              this.synOk=false;
            });
          },
          (res)=>{
            this.resources.forEach((value, index)=>{
              if(value.result!=='发布成功'){
                this.resources[index].result='发布失败';
              }
            });
            this.resourcesShow.forEach((value, index)=>{
              if(value.result!=='发布成功'){
                this.resourcesShow[index].result='发布失败';
              }
            });
            this.resourcesShow.push(...[]);
          }
        ).catch();
      },

      synTap(){
        if(this.devices.length<1){
          this.$message.error("没有设备，请先选择设备!");
          return;
        }
        let params={};
        params.strList=[];
        this.devices.forEach((value)=>{
          params.strList.push(value.deviceId);
        });
        synchronizeResModification(this, params, Toast).then(
          (res)=>{
            if(res.status===400){
              this.$message.error(res.msg);
              return;
            }
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

      inputChange(){
        let reg=/^[1-9]\d*$/;
        if(!reg.test(this.playInterv)){
          this.$message.error('请输入正整数');
          this.playInterv=this.playIntervOld;
        }else{
          this.playIntervOld=this.playInterv;
        }
      },

      cleanAllResources(){
        this.resources=[];
        this.resourcesShow=[];
      },

      cleanAllDevices(){
        this.devices=[];
        this.devicesShow=[];
      },
    }
  }
</script>

<style scoped>
  .middle{
    width: 100%;
    height: 550px;
    float: left;
  }

  .button1{
    position: absolute;
    top: 10%;
    left: 50%;
    margin-left: -50px;
  }

  .button2{
    position: absolute;
    top: 30%;
    left: 50%;
    margin-left: -50px;
  }

  .button3{
    position: absolute;
    top: 70%;
    left: 50%;
    margin-left: -50px;
  }

  .input1{
    position: absolute;
    top: 50%;
    left: 49%;
    margin-left: -60px;
    width: 12%;
  }

  .button4{
    position: absolute;
    top: 90%;
    left: 50%;
    margin-left: -50px;
  }

  .left{
    width: 100%;
    height: 550px;
    float: left;
    OVERFLOW-Y: auto;
    border: 2px solid gray;
    border-radius:10px;
  }

  .right{
    width: 100%;
    height: 550px;
    float: left;
    OVERFLOW-Y: auto;
    border: 2px solid gray;
    border-radius:10px;
  }
</style>
