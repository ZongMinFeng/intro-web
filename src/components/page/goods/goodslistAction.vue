<template>
  <div class="container">
    <div class="handle-box">
      <el-button type="success" icon="el-icon-plus" @click="onAddNewTap">新增</el-button>
    </div>

    <el-form :model="searchForm" ref="searchForm" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="名称" prop="goodsName">
            <el-input v-model="searchForm.goodsName" placeholder="请输入物资名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="系列">
            <el-select v-model="searchForm.isSerial" placeholder="请选择是否有系列" style="width: 100%;">
              <el-option v-for="item in serialStatus" :key="item.id" :label="item.value"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="售价起始值" prop="begNowPrice">
            <el-input v-model="searchForm.begNowPrice" placeholder="请输入售价起始值"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="售价结束值" prop="endNowPrice">
            <el-input v-model="searchForm.endNowPrice" placeholder="请输入售价结束值"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态" style="width: 100%;">
              <el-option v-for="item in statusList" :key="item.id" :label="item.value"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" border stripe>
      <el-table-column label="名称" prop="goodsName"></el-table-column>
      <el-table-column label="类型" prop="goodsType"></el-table-column>
      <el-table-column label="操作" width="340" >
        <template slot-scope="props">
          <el-button type="primary" @click="doInfos(props.row, 2)">查看●修改</el-button>
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
  import {listGoodsinfosByConditions} from "../../../util/module";

  export default {
    name: "goodsinfoAction",
    data(){
      return {
        searchForm:{
          categoryId:null,
          goodsName:null,
          isSerial:null,
          begNowPrice:null,
          endNowPrice:null,
          status:null
        },
        serialStatus:[
          {id:'N', value:'无'},
          {id:'Y', value:'有'},
        ],
        statusList:[
          {id:'1', value:'正常--上架'},
          {id:'2', value:'注销'},
          {id:'3', value:'停用--下架'},
          {id:'4', value:'新增--初始状态'},
        ],
        tableData:[],
        currentPage:1,
        pageSize:10,
        AllCount:0,
      }
    },

    created() {
      this.initData();
    },

    methods:{
      initData(){
        this.goodsList();
      },

      goodsList(){
        let params={};
        params.currentPage=this.currentPage;
        params.pageSize=this.pageSize;
        params.categoryId=this.searchForm.categoryId;
        params.goodsName =this.searchForm.goodsName ;
        params.isSerial =this.searchForm.isSerial ;
        params.begNowPrice=this.searchForm.begNowPrice;
        params.endNowPrice=this.searchForm.endNowPrice;
        params.status =this.searchForm.status ;
        listGoodsinfosByConditions(this, params).then(
          res=>{
            this.AllCount=res.data.total;
            this.tableData=res.data.records;
          },
          res=>{
            console.log(res);//debug
          }
        ).catch(
          error=>{
            console.log(error);
          }
        );
      },

      onAddNewTap(){
        this.$router.push({path:'/goodsInfos'});
      },

      handleSizeChange(){
        this.initData();
      },

      handleCurrentChange(options){
        this.currentPage=options;
        this.initData();
      },

      doInfos(item){
        let goodsId=item.goodsId;
        this.$router.push({path:'/goodsInfos', query:{goodsId:goodsId}});
      },
    }
  }
</script>

<style scoped>

</style>
