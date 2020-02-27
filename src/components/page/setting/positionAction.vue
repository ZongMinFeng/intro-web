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
      <el-table-column label="名称" prop="positionName"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button type="primary" @click="positionDetail(props.row)">权限明细</el-button>
          <el-button type="primary" @click="modifyTap(props.row)">修改</el-button>
          <el-button type="danger" @click="deleteTap(props.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
    </el-dialog>

    <position-selection v-model="position"></position-selection>
  </div>
</template>

<script>
  import InstSelection from '@/components/common/selection/InstSelection';
  import {listDepartmentPosition, listInstDepartments} from "../../../util/module";
  import PositionSelection from "../../common/selection/PositionSelection";

  export default {
    name: "positionAction",
    components: {
      PositionSelection,
      InstSelection,
    },
    data() {
      return {
        searchForm: {
          specInstId: null,
          departmentId: null,
        },
        instInfo: {},
        departments: [],
        tableData: [],
        position: '',
        superPosition: [],
        flag:1,
        dialogVisible:false,
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
      this.instInfo = JSON.parse(localStorage.getItem("sysInstInfo"));
      this.searchForm.specInstId = this.instInfo.instId;
      this.getDepartment();
      // this.position = ["listInstDepartments", "addInst"];//debug
      this.position ='03';//debug
    },

    methods: {
      initData() {

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

      getPositions() {
        let params = {};
        params.specDepartmentId = this.searchForm.departmentId;
        listDepartmentPosition(this, params).then(
          res => {
            this.tableData = res.data;
          }
        ).catch();
      },

      onAddNewTap() {
        if(this.searchForm.departmentId==null||this.searchForm.departmentId===''){
          this.$message.error('请选择部门');
          return;
        }
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
        this.getPositions();
      },

      positionDetail(item){

      },

      modifyTap(item){

      },

      deleteTap(item){

      }
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
