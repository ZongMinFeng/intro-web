<template>
  <div>
    <el-form :model="searchForm" ref="searchForm">
      <el-row>
        <el-col :span="20">
          <el-form-item label="机构" label-width="80px" prop="instId">
            <inst-selection v-model="mainInstInfo" placeholder="请选择机构" @click="mainInstClicked"></inst-selection>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <h3 style="margin-top: 10px; margin-bottom: 5px">设备列表</h3>
    <el-table :data="tableData" border stripe
              ref="multipleTable"
              @select="handleSelect"
              @select-all="handleSelectAll">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="设备名称" prop="deviceName"></el-table-column>
      <el-table-column label="UUID" prop="deviceId"></el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange"
                     @size-change="handleSizeChange"
                     :page-sizes="[5, 10, 20, 30, 40]"
                     :page-size="pageSize"
                     :current-page.sync="page"
                     layout="total,sizes, prev, pager, next"
                     :total="AllCount">
      </el-pagination>
    </div>

    <hr style="height: 2px; background-color: #9A9A9A"/>
    <h3 style="margin-top: 10px; margin-bottom: 5px">此次已选设备</h3>
    <el-table :data="resouces" border stripe>
      <el-table-column label="设备名称" prop="deviceName"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button type="danger" @click="deleteResource(props.row)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="background-color: white; height: 20px;">
      <el-button type="success" class="el-button-commit" @click="returns">确定</el-button>
      <el-button class="el-button-commit" @click="returnsNull">取消</el-button>
    </div>
  </div>
</template>

<script>
  import InstSelection from '../../common/selection/InstSelection';
  import {
    resourceGetByCons,
    deviceGetByCons,
  } from '../../../util/module';
  import { Toast } from 'mint-ui';
  export default {
    name: "DevicesSelection",
    components:{
      InstSelection
    },
    data(){
      return {
        searchForm:{
          instId:null,
        },
        mainInstInfo:{},
        tableData:[],
        tableDataSelections:[],
        page:1,
        pageSize:5,
        AllCount:0,
        resouces:[]
      }
    },

    created(){
      this.mainInstInfo=JSON.parse(localStorage.getItem("sysInstInfo"));
      this.initData();
    },

    methods:{
      initData(){
        const params={};
        params.pageSize=this.pageSize;
        params.page=this.page;
        params.specInstId=this.mainInstInfo.instId;
        deviceGetByCons(this, params, Toast).then(
          (res)=>{
            this.tableData=res.data.rows;
            this.AllCount=res.data.records;
            this.page=res.data.page;
            this.$nextTick(()=>{
              this.checkAll();
            });
          },
          (res)=>{

          }
        ).catch();
      },

      checkAll(){
        this.tableDataSelections=[];
        this.tableData.forEach((value, index)=>{
          for(let i=0; i<this.resouces.length; i++){
            if (this.resouces[i].deviceId===value.deviceId){
              this.$refs.multipleTable.toggleRowSelection(value);
              this.tableDataSelections.push(value);
              break;
            }
          }
        });
      },

      mainInstClicked(nodeInfo){
        this.page=1;
        this.mainInstInfo=nodeInfo;
        this.initData();
      },

      handleSizeChange(options){
        this.pageSize=options;
        this.initData();
      },

      handleCurrentChange(options){
        this.page=options;
        this.initData();
      },

      handleSelect(selection, row){
        if(selection.length>this.tableDataSelections.length){
          this.resouces.push(row);
          this.tableDataSelections.push(row);
        }else{
          this.resouces.splice(this.indexOf(this.resouces, row), 1);
          this.tableDataSelections.splice(this.indexOf(this.tableDataSelections, row), 1);
        }
      },

      handleSelectAll(selection){
        if(selection.length>this.tableDataSelections.length){
          let selectionTmp=[];
          selection.forEach((value)=>{
            let haveIt=false;
            for(let i=0; i<this.tableDataSelections.length; i++){
              if(value.deviceId===this.tableDataSelections[i].deviceId){
                haveIt=true;
                break;
              }
            }
            if(!haveIt){
              selectionTmp.push(value);
            }
          });
          if(selectionTmp.length>0){
            this.tableDataSelections.push(...selectionTmp);
            this.resouces.push(...selectionTmp);
          }
        }else{
          this.tableDataSelections.forEach((value)=>{
            this.resouces.splice(this.indexOf(this.resouces, value), 1);
          });
          this.tableDataSelections=[];
        }
      },

      indexOf(array, row){
        let indexReturn=-1;
        if(!array instanceof Array){
          return -1;
        }

        array.forEach((item, index)=>{
          if (item.deviceId===row.deviceId) {
            indexReturn=index;
          }
          return false;
        });

        return indexReturn;
      },

      deleteResource(row){
        this.tableData.forEach((value)=>{
          if(value.deviceId===row.deviceId){
            this.$refs.multipleTable.toggleRowSelection(this.tableData[this.indexOf(this.tableData, value)]);
            this.tableDataSelections.splice(this.indexOf(this.tableDataSelections, value), 1);
            return false;
          }
        });
        this.resouces.splice(this.indexOf(this.resouces, row), 1);
      },

      returns(){
        if(this.resouces.length<1){
          this.$message.error('还未选择设备');
        }else{
          this.$emit('return', this.resouces);
        }
      },

      returnsNull(){
        this.$emit('return', []);
      },
    }
  }
</script>

<style scoped>
  .el-button-commit{
    float: right;
    margin-top: 10px;
    margin-left: 10px;
  }
</style>
