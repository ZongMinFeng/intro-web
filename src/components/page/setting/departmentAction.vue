<template>
  <div class="container">
    <div class="handle-box">
      <el-button type="success" icon="el-icon-plus" @click="onAddNewTap">新增</el-button>
    </div>

    <el-form :model="searchForm" ref="searchForm" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="公司" prop="specInstId">
            <inst-selection v-model="instInfo" @click="instClickTap"></inst-selection>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" border stripe>
      <el-table-column label="部门名称" prop="departmentName"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <!--<el-button type="warning" @click="modifyTap(props.row)">修改</el-button>-->
          <!--<el-button type="danger" @click="deleteTap(props.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <el-form :model="dialogForm" label-width="80px" ref="dialogForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称" prop="departmentName" :rules="[{required:true, message:'请输入部门名称', trigger: 'blur'}]">
              <el-input v-model="dialogForm.departmentName"></el-input>
            </el-form-item>
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
  import InstSelection from '@/components/common/selection/InstSelection';
  import {addDepartmentInfo, listInstDepartments} from "../../../util/module";
  export default {
    name: "departmentAction",
    components: {
      InstSelection,
    },

    data(){
      return {
        searchForm:{
          specInstId:null,
        },
        instInfo:{},
        tableData:[],
        flag:1,
        dialogVisible:false,
        dialogForm:{
          departmentName:null,
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

    created(){
      this.instInfo=JSON.parse(localStorage.getItem("sysInstInfo"));
      this.searchForm.specInstId=this.instInfo.instId;
      this.initData();
    },

    methods:{
      initData() {
        this.getDepartment();
      },

      getDepartment(){
        let params={};
        params.specInstId=this.searchForm.specInstId;
        listInstDepartments(this, params).then(
          res=>{
            this.tableData=res.data;
          },
          res=>{

          }
        ).catch();
      },

      onAddNewTap(){
        this.dialogVisible=true;
        this.dialogForm.specInstId=this.searchForm.specInstId;
      },

      instClickTap(nodeInfo){
        this.searchForm.specInstId=nodeInfo.instId;
        this.initData();
      },

      modifyTap(item){

      },

      deleteTap(item){

      },

      dialogFormConfirm(){
        this.$refs.dialogForm.validate(valid=>{
          if (valid){
            this.formCommit();
          } else{
            return false;
          }
        });
      },

      formCommit(){
        let params={};
        params.specInstId=this.dialogForm.specInstId;
        params.departmentName=this.dialogForm.departmentName;
        addDepartmentInfo(this, params).then(
          res=>{
            this.$message.success('新增成功');
            this.initData();
            this.dialogVisible=false;
          },
          res=>{
          }
        ).catch();
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
</style>
