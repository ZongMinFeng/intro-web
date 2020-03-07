<template>
  <div class="container">
    <div class="handle-box">
      <el-button type="success" icon="el-icon-plus" @click="onAddNewTap">新增</el-button>
    </div>

    <el-form :model="searchForm" ref="searchForm" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="单据号" prop="ladingBill">
            <el-input v-model="searchForm.ladingBill" clearable placeholder="请输入单据号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="单据名称" prop="batchName">
            <el-input v-model="searchForm.batchName" clearable placeholder="请输入集装箱号或批次名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="采购区域">
            <el-select v-model="searchForm.batchFlag" clearable placeholder="请选择采购区域" style="width: 100%;">
              <el-option v-for="item in batchFlags" :key="item.id" :label="item.value"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="单据状态">
            <el-select v-model="searchForm.status" clearable placeholder="请选择状态" style="width: 100%;">
              <el-option v-for="item in statuses" :key="item.id" :label="item.value"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" border stripe>
      <el-table-column label="单据号" prop="batchId"></el-table-column>
      <el-table-column label="单据名称" prop="batchName"></el-table-column>
      <el-table-column label="采购区域" prop="status">
        <template slot-scope="props">
          {{getBatchFlagName(props.row.batchFlag)}}
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="memo"></el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="props">
          {{getStatusName(props.row.status)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="340" >
        <template slot-scope="props">
          <el-button type="primary" @click="modifyTap(props.row)">修改</el-button>
          <el-button type="danger" @click="deleteTap(props.row)">删除</el-button>
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
            <el-form-item label="单据名称" prop="batchName" :rules="[{required:true, message:'请输入集装箱号或批次号', trigger: 'blur'}]">
              <el-input v-model="dialogForm.batchName" placeholder="请输入集装箱号或批次号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="flag===1">
          <el-col :span="24">
            <el-form-item label="采购区域" prop="batchFlag" :rules="[{required:true, message:'请选择采购区域', trigger: 'blur'}]">
              <el-select v-model="dialogForm.batchFlag" placeholder="请选择采购区域" style="width: 100%;">
                <el-option v-for="item in batchFlags" :key="item.id" :label="item.value"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="list-name">备注信息</div>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-input
              type="textarea"
              class="goods-memo"
              :autosize="{ minRows: 2}"
              placeholder="请输入备注信息"
              v-model="dialogForm.memo">
            </el-input>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="dialogFormConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {addBatchinfo, deleteBatchinfoById, listBatchsByCon, updateBatchinfo} from "../../../util/module";

  export default {
    name: "batchListAction",
    data() {
      return {
        searchForm:{
          batchName:null,
          status:null,
          batchFlag:null,
          ladingBill:null,
        },
        batchFlags:[
          {id:'I', value:'国内采购'},
          {id:'O', value:'国外采购'},
        ],
        statuses:[
          {id:'1', value:'上架'},
          // {id:'2', value:'未知'},
          // {id:'3', value:'未知'},
          {id:'4', value:'零售价已申报'},
          {id:'5', value:'建议价格已计算'},
          {id:'6', value:'本地价格已提交'},
          {id:'7', value:'入库'},
          {id:'8', value:'海运'},
          {id:'9', value:'初始'},
        ],
        tableData:[],
        currentPage: 1,
        pageSize: 10,
        AllCount: 0,
        dialogForm:{
          batchName:null,
          batchFlag:null,
          memo:null,
        },
        flag:1,//1.新增  2.修改
        dialogVisible:false,
      };
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

    watch:{
      searchForm: {
        handler() {
          this.initData();
        },
        deep:true,
      }
    },

    created() {
      this.initData();
    },

    methods:{
      initData() {
        this.getBatchs();
      },

      getBatchFlagName(batchFlag){
        if (batchFlag === 'I') {
          return '国内';
        }else{
          return '国外';
        }
      },

      deleteTap(item){
        this.$confirm('此操作将删除单据，是否确认?', '删除单据', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(
          () => {
            this.deleteCommit(item);
          }
        );
      },

      deleteCommit(item){
        let params={};
        params.batchId=item.batchId;
        deleteBatchinfoById(this, params).then(
          res=>{
            this.$message.success('删除成功');
            this.initData();
          },
          res=>{
          }
        ).catch();
      },

      modifyTap(item){
        this.flag=2;
        this.dialogForm.batchId =item.batchId ;
        this.dialogForm.version=item.version;
        this.dialogForm.batchName=item.batchName;
        this.dialogForm.batchFlag=item.batchFlag;
        this.dialogForm.memo=item.memo;
        this.dialogVisible=true;
      },

      getStatusName(status){
        let statusName='';
        this.statuses.forEach(item=>{
          if (item.id === status) {
            statusName=item.value;
            return false;
          }
        });
        return statusName;
      },

      handleSizeChange() {
        this.initData();
      },

      handleCurrentChange(options) {
        this.currentPage = options;
        this.initData();
      },

      onAddNewTap(){
        this.flag=1;
        this.dialogVisible=true;
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
          params.batchFlag =this.dialogForm.batchFlag ;
          params.batchName=this.dialogForm.batchName;
          params.memo=this.dialogForm.memo;
          addBatchinfo(this, params).then(
            res=>{
              this.$message.success('新增成功');
              this.initData();
              this.dialogVisible=false;
            },
            res=>{
            }
          ).catch();
        }

        if (this.flag === 2) {
          //修改
          params.batchId =this.dialogForm.batchId ;
          params.version=this.dialogForm.version;
          params.batchName=this.dialogForm.batchName;
          params.memo=this.dialogForm.memo;
          updateBatchinfo(this, params).then(
            res=>{
              this.$message.success('修改成功');
              this.initData();
              this.dialogVisible=false;
            },
            res=>{
            }
          ).catch();
        }
      },

      getBatchs(){
        let params={};
        params.status=this.searchForm.status;
        params.batchFlag=this.searchForm.batchFlag;
        params.batchName=this.searchForm.batchName;
        params.ladingBill=this.searchForm.ladingBill;
        params.currentPage = this.currentPage;
        params.pageSize = this.pageSize;
        listBatchsByCon(this, params).then(
          res=>{
            this.tableData=res.data.records;
            this.AllCount=res.data.total;
          },
          res=>{

          }
        ).catch();
      },
    }
  }
</script>

<style scoped>

</style>
