<template>
  <div class="container">
    <el-form :model="searchForm" ref="searchForm" label-width="80px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="机构" prop="instId" :rules="[
              { validator: checkInstId, trigger: 'change' }
            ]"
                        ref="instId">
            <inst-selection v-model="instInfo" @click="instClickTap"></inst-selection>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" border stripe @row-dblclick="selectRoomer">
      <el-table-column label="名字" prop="roomerName"></el-table-column>
      <el-table-column label="手机号" prop="roomerPhone"></el-table-column>
      <!--<el-table-column label="证件类型" prop="certType"></el-table-column>-->
      <el-table-column label="证件号码" prop="certNo"></el-table-column>
      <el-table-column label="所属人群" prop="groupType">
        <template slot-scope="props">
          {{getGroupTypeDetail(props.row.groupType)}}
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="sex">
        <template slot-scope="props">
          {{getSexDetail(props.row.sex)}}
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
  </div>
</template>

<script>
  import InstSelection from '@/components/common/selection/InstSelection';
  import { Toast } from 'mint-ui';
  import {roomerGetByCons, } from '../../../util/module';
  export default {
    name: "RoomerSelection",
    components:{
      InstSelection
    },
    data(){
      return {
        instInfo:{},
        searchForm:{},
        tableData:[],
        page:1,
        pageSize:10,
        AllCount:0,
      }
    },

    created(){
      this.instInfo=JSON.parse(localStorage.getItem("sysInstInfo"));
      this.initData();
    },

    methods:{
      initData(){
        this.tableData=[];
        this.getRoomers();
      },

      getRoomers(){
        if(this.instInfo.instLevel<4){
          return;
        }
        let params={};
        params.page=this.page;
        params.pageSize=this.pageSize;
        params.specInstId=this.instInfo.instId;
        if(this.searchForm.roomerPhone!=null){
          params.roomerPhone=this.searchForm.roomerPhone;
        }
        if(this.searchForm.roomerName!=null){
          params.roomerName=this.searchForm.roomerName;
        }
        roomerGetByCons(this, params, Toast).then(
          (res)=>{
            this.tableData=res.data.rows;
          },
          (res)=>{

          }
        ).catch();
      },

      instClickTap(nodeInfo){
        this.instInfo=nodeInfo;
        this.initData();
      },

      checkInstId(rule, value, callback){
        if(value===null||value===''){
          callback(new Error('请选择小区或者楼栋'));
          return;
        }
        if(this.instInfo.instLevel<4){
          callback(new Error('请选择小区或者楼栋'));
          return;
        }
        callback();
      },

      getGroupTypeDetail(type){
        let str='';
        switch (type) {
          case "1":
            str='非关注人群';
            break;
          case "2":
            str='涉黑人群';
            break;
          case "3":
            str='残障人士';
            break;
          case "4":
            str='独居老人';
            break;
        }
        return str;
      },

      getSexDetail(type){
        let str='未知';
        switch (type) {
          case "M":
            str='男';
            break;
          case "F":
            str='女';
            break;
        }
        return str;
      },

      handleSizeChange(){
        this.initData();
      },

      handleCurrentChange(options){
        this.page=options;
        this.initData();
      },

      selectRoomer(row){
        this.$emit("doubleClick", row);
      },

    }
  }
</script>

<style scoped>

</style>
