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
        <el-col :span="12">
          <el-form-item label="部门">
            <el-select v-model="searchForm.departmentId" placeholder="请选择部门" style="width: 100%;"
                       @change="chooseDepartment">
              <el-option v-for="item in departments" :key="item.departmentId" :label="item.departmentName"
                         :value="item.departmentId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" border stripe>
      <el-table-column label="名字" prop="tellerName"></el-table-column>
      <el-table-column label="手机号" prop="tellerPhone"></el-table-column>
      <el-table-column label="住址" prop="tellerAddr"></el-table-column>
      <el-table-column label="部门类型">
        <template slot-scope="props">
          {{departmentFlagShow(props.row.departmentFlag)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="340" >
        <template slot-scope="props">
          <el-button type="primary" @click="resetPasswordTap(props.row)">重置密码</el-button>
          <el-button type="primary" @click="partTimeTap(props.row)">兼职</el-button>
          <el-button type="primary" @click="modifyTap(props.row)">修改</el-button>
          <el-button v-if="props.row.tellerId!==tellerId" type="danger" @click="deleteTap(props.row)">删除</el-button>
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
        <el-row v-if="flag===1">
          <el-col :span="24">
            <el-form-item label="账号" prop="specTellerId" :rules="[{required:true, message:'请输入账号,账号用于登录管理小程序', trigger: 'blur'}, {validator: checkSpecTellerId, trigger: 'blur'} ]">
              <el-input v-model="dialogForm.specTellerId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="姓名" prop="tellerName" :rules="[{required:true, message:'请输入名字', trigger: 'blur'}]">
              <el-input v-model="dialogForm.tellerName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="手机号" prop="tellerPhone" :rules="[{required:true, message:'请输入手机号', trigger: 'blur'}]">
              <el-input v-model="dialogForm.tellerPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="职位">
              <el-select v-model="dialogForm.tellerPositionIds" multiple  placeholder="请选择职位，可多选" style="width: 100%;">
                <el-option v-for="item in positions" :key="item.positionId" :label="item.postionName"
                           :value="item.positionId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="dialogFormConfirm">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新密码" :visible.sync="passwordVisible">
      {{passwordForm.tellerPwd}}
    </el-dialog>
  </div>
</template>

<script>
  import {
    addTellerInfo, checkTellerId, deleteDepartmentTeller,
    listDepartmentPosition,
    listDepartmentTeller,
    listInstDepartments, resetTellerPwd,
    updateTellerInfo
  } from "../../../util/module";
  import InstSelection from '@/components/common/selection/InstSelection';
  export default {
    name: "tellerAction",
    components:{InstSelection},
    data() {
      return {
        searchForm: {
          specInstId: null,
          departmentId: null,
        },
        instInfo: {},
        departments: [],
        tableData:[],
        currentPage:1,
        pageSize:10,
        AllCount:0,
        flag:1,
        dialogVisible:false,
        dialogForm:{
          specDepartmentId:null,
          version:null,
          specTellerId:null,
          tellerName:null,
          tellerPhone:null,
          tellerPositionIds:null,
        },
        positions:[],
        passwordVisible:false,
        passwordForm:{
          tellerPwd:null
        },
        tellerId:null,
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

    created() {
      this.tellerId=localStorage.getItem('tellerId')||'';
      this.instInfo = JSON.parse(localStorage.getItem("sysInstInfo"));
      this.searchForm.specInstId = this.instInfo.instId;
      this.getDepartment();
    },

    methods: {
      initData() {
        this.getTeller();
      },

      departmentFlagShow(flag){
        if (flag === "1") {
          return '本部门';
        }
        return '兼职';
      },

      checkSpecTellerId(rule, specTellerId, callback){
        console.log("specTellerId", specTellerId);//debug
        let params={};
        params.specDepartmentId=this.searchForm.departmentId;
        params.specTellerId=specTellerId;
        checkTellerId(this, params).then(
          res=>{
            callback();
          },
          res=>{
            if (res.returnMsg) {
              callback(new Error(res.returnMsg));
            }else{
              callback(new Error('用户已存在!'));
            }
          }
        ).catch();
      },

      onAddNewTap() {
        if (this.searchForm.departmentId == null || this.searchForm.departmentId === '') {
          this.$message.error('请选择部门！');
          return
        }
        this.flag=1;
        this.dialogForm.specDepartmentId=this.searchForm.departmentId;
        this.dialogVisible=true;
      },

      getDepartment() {
        let params = {};
        params.specInstId = this.searchForm.specInstId;
        listInstDepartments(this, params).then(
          res => {
            this.departments = res.data;
          },
          res => {

          }
        ).catch();
      },

      instClickTap(instInfo) {
        if (this.tableData.length > 0) {
          this.tableData.splice(0, this.tableData.length);
        }
        this.searchForm.departmentId = '';
        this.searchForm.specInstId = instInfo.instId;
        this.getDepartment();
      },

      chooseDepartment() {
        this.getTeller();
        this.getPositions();
      },

      getTeller(){
        if (this.searchForm.departmentId==null||this.searchForm.departmentId===''){
          this.$message.error('请选择部门');
          return;
        }
        let params={};
        params.currentPage=this.currentPage;
        params.pageSize=this.pageSize;
        params.specDepartmentId=this.searchForm.departmentId;
        listDepartmentTeller(this, params).then(
          res=>{
            console.log('res', res);//debug
            this.AllCount=res.data.total;
            let records=[];
            if (this.AllCount > 0) {
              res.data.records.forEach(item=>{
                item.sysTellerInfo.departmentFlag=item.sysTellerInst.departmentFlag;
                records.push(item.sysTellerInfo);
              });
            }
            this.tableData=records;
          },
          res=>{
          }
        ).catch();
      },

      handleSizeChange(){
        this.getTeller();
      },

      handleCurrentChange(options){
        this.currentPage=options;
        this.getTeller();
      },

      partTimeTap(item){
        this.$router.push({path:'/partTimeJob', query:{tellerId:item.tellerId, specDepartmentId:this.searchForm.departmentId}});
      },

      modifyTap(item){
        console.log("modifyTap item", item);//debug
        this.flag=2;
        this.dialogForm.specDepartmentId=this.searchForm.departmentId;
        this.dialogForm.version=item.version;
        this.dialogForm.specTellerId=item.tellerId;
        this.dialogForm.tellerPhone=item.tellerPhone;
        this.dialogForm.tellerName=item.tellerName;
        this.dialogForm.tellerPositionIds=item.tellerPositionIds;
        this.dialogVisible=true;
      },

      deleteTap(item){
        this.$confirm('此操作将删除操作员，是否确认?', '删除操作员', {
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
        params.specTellerId=item.tellerId;
        params.specDepartmentId=this.searchForm.departmentId;
        deleteDepartmentTeller(this, params).then(
          res=>{
            this.$message.success('删除成功');
            this.initData();
          },
          res=>{
          }
        ).catch();
      },

      resetPasswordTap(item){
        this.$confirm('此操作将重置操作员密码，是否确认?', '重置密码', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(
          () => {
            this.resetPassword(item);
          }
        );
      },

      resetPassword(item){
        let params={};
        params.specTellerId=item.tellerId;
        resetTellerPwd(this, params).then(
          res=>{
            this.$message.success('重置成功');
            this.passwordForm.tellerPwd=res.tellerPwd;
            this.passwordVisible=true;
          },
          res=>{
          }
        ).catch();
      },

      getPositions() {
        let params = {};
        params.specDepartmentId = this.searchForm.departmentId;
        listDepartmentPosition(this, params).then(
          res => {
            this.positions = res.data;
          }
        ).catch();
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
          params.specDepartmentId=this.dialogForm.specDepartmentId;
          params.specTellerId=this.dialogForm.specTellerId;
          params.tellerName=this.dialogForm.tellerName;
          params.tellerPhone =this.dialogForm.tellerPhone ;
          params.tellerPositionIds=this.dialogForm.tellerPositionIds;
          addTellerInfo(this, params).then(
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
          params.specTellerId=this.dialogForm.specTellerId;
          params.version=this.dialogForm.version;
          params.specDepartmentId=this.dialogForm.specDepartmentId;
          params.tellerPhone=this.dialogForm.tellerPhone;
          params.tellerName=this.dialogForm.tellerName;
          params.tellerPositionIds=this.dialogForm.tellerPositionIds;
          updateTellerInfo(this, params).then(
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
    }
  }
</script>

<style scoped>

</style>
