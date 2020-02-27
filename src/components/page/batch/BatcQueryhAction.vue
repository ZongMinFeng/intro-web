<template>
  <div class="container">
    <el-form :model="searchForm" ref="searchForm" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="批量类型" prop="batchType" >
            <el-select v-model="batchType" placeholder="请选择类型" style="width: 100%;" clearable @change="selectChange">
              <el-option v-for="item in batchTypes" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!--<el-col :span="12">-->
          <!--<el-form-item label="操作员" prop="specTellerId" >-->
            <!--<el-button type="primary" @click="selectTeller">请选择</el-button>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      </el-row>
    </el-form>

    <el-table :data="tableData" border stripe>
      <el-table-column label="批次号" prop="batchId"></el-table-column>
      <el-table-column label="上传文件名" prop="uploadFilename"></el-table-column>
      <el-table-column label="处理时间">
        <template slot-scope="props">
          <span>{{ssformatTime(new Date(props.row.createDate))}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="props">
          <span :class="{red:isRed(props.row.status)}">{{showStatus(props.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <a v-if="props.row.status===2" :href='uploadUrl+"/"+instId+"/"+getTypeName(props.row.batchType)+"/"+props.row.batchId+"_rslt.xlsx"' >下载解释文件</a>
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

    <el-dialog title="请双击选择操作员" :visible.sync="dialogVisible" width="60%">
      <teller-selection>

      </teller-selection>
    </el-dialog>
  </div>
</template>

<script>
  import {batchGetByCons} from '@/util/module';
  import {ssformatTime} from '@/util/util.js';
  import { Toast } from 'mint-ui';
  import cfg from '@/config/cfg.js';
  import TellerSelection from '@/components/common/selection/TellerSelection';
  export default {
    name: "BatcQueryhAction",
    components:{
      TellerSelection,
    },
    data(){
      return {
        searchForm:{},
        batchType:null,
        batchTypes:[
          {id:"1", value:'房屋资料导入'},
          {id:"2", value:'住户资料导入'},
          {id:"3", value:'批量开门'},
          {id:"4", value:'批量资源发布'},
        ],
        tableData:[],
        page:1,
        pageSize:10,
        AllCount:0,
        instId:null,
        instInfo:{},
        uploadUrl:null,
        dialogVisible:false,
      }
    },

    created(){
      this.instInfo=JSON.parse(localStorage.getItem("sysInstInfo"));
      this.instId=this.instInfo.instId;
      this.uploadUrl=cfg.service.uploadUrl;
      this.initData();
    },

    methods:{
      initData(){
        this.getBatch();
      },

      getBatch(){
        let params={};
        params.page=this.page;
        params.pageSize=this.pageSize;
        params.batchType=this.searchForm.batchType;
        let specTellerId=localStorage.getItem('tellerId') || '';
        if(specTellerId!==''){
          params.specTellerId=specTellerId;
        }
        batchGetByCons(this, params, Toast).then(
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

      handleSizeChange(){
        this.initData();
      },

      handleCurrentChange(options){
        this.page=options;
        this.initData();
      },

      selectChange(){
        this.searchForm.batchType=this.batchType;
        this.initData();
      },

      showStatus(status){
        let str='未知';
        switch (status) {
          case 1:
            str='成功';
            break;
          case 2:
            str='存在失败';
            break;
		  case 3:
			str='上送中';
			break;
        }
        return str;
      },

      ssformatTime(date){
        return ssformatTime(date);
      },

      getTypeName(type){
        let str='';
        switch (type) {
          case 1:
            str='House';
            break;
          case 2:
            str='Roomer';
            break;
        }
        return str;
      },

      isRed(status){
        if(status===1){
          return false;
        }else {
          return true;
        }
      },

      selectTeller(){
        this.dialogVisible=true;
      }
    }
  }
</script>

<style scoped>
  .red{
    color: red;
  }
</style>
