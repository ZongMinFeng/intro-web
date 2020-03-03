<template>
  <div class="container">
    <el-table :data="tableData" border stripe class="el-table-plus">
      <el-table-column label="部门名字" prop="departmentName"></el-table-column>
      <el-table-column label="部门类型">
        <template slot-scope="props">
          {{departmentFlagShow(props.row.departmentFlag)}}
        </template>
      </el-table-column>
      <el-table-column label="职位">
        <template slot-scope="props">
          <ul class="table-ul">
            <li v-for="item in props.row.positionAll" :key="item">
              <el-button type="primary" >{{positionAll[item].postionName}}
              </el-button>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="340" >
        <template slot-scope="props">
          <el-button  type="danger" @click="changeDepartmentTap(props.row)">切换部门</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {departmentLogin, getTellerInfoById} from "../../../util/module";
  import {handelPermission} from "../../../tool/permission";

  export default {
    name: "departmentLogin",
    data(){
      return {
        tellerId:null,
        departmentId:null,
        tellerInfo:{},
        tableData:[],
        positionAll:[],
      }
    },

    created() {
      this.tellerId = localStorage.getItem("tellerId")||'';
      this.departmentId=localStorage.getItem("departmentId");
      this.initData();
    },

    methods:{
      initData() {
        this.getTellerDetail();
      },

      changeDepartmentTap(item){
        this.$confirm('此操作将切换部门，是否确认?', '切换部门', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(
          () => {
            this.changeDepartment(item);
          }
        );
      },

      changeDepartment(item){
        let params={};
        params.specDepartmentId=item.departmentId;
        departmentLogin(this, params).then(
          res=>{
            console.log('啦啦啦啦', res);
            let sysTellerInfo = res.data.sysTellerInfo || '';
            let sysInstInfo = res.data.sysInstInfo || '';
            sysInstInfo.instName='我换部门啦';//debug
            let sysInstDepartment = res.data.sysInstDepartment || '';
            localStorage.setItem('sysTellerInfo', JSON.stringify(sysTellerInfo));
            localStorage.setItem('sysInstInfo', JSON.stringify(sysInstInfo));
            this.$store.commit('setSysInstInfo', sysInstInfo);
            localStorage.setItem('sysInstDepartment', JSON.stringify(sysInstDepartment));
            if (sysTellerInfo) {
              localStorage.setItem('tellerId', sysTellerInfo.tellerId)
            }
            if (sysInstInfo) {
              localStorage.setItem('instId', sysInstInfo.instId)
            }
            if (sysInstDepartment) {
              localStorage.setItem('departmentId', sysInstDepartment.departmentId)
            }
            // localStorage.setItem('macKey', res.data.macKey);
            this.$store.commit('loginIn');

            //如果登录的用户是顶级管理员，那么不管后台返回的权限是多少，都赋予顶级管理员最高权限
            // if (res.data.sysInstInfo.instLevel && res.data.sysInstInfo.instLevel === '1') {
            //   if (res.data.sysInstDepartment.departmentId && res.data.sysInstDepartment.departmentId.startsWith('Admin')) {
            //     res.data.funcMap='FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';
            //   }
            // }

            //处理权限
            handelPermission(res.data.funcMap);

            this.$router.push('/');
          },
          res=>{

          }
        ).catch();
      },

      departmentFlagShow(flag){
        if (flag === "1") {
          return '主部门';
        }
        return '兼职部门';
      },

      getTellerDetail() {
        if (this.tellerId === '') {
          return;
        }
        let params = {};
        params.specDepartmentId = this.departmentId;
        params.specTellerId = this.tellerId;
        getTellerInfoById(this, params).then(
          res => {
            this.tellerInfo = res.data.sysTellerInfo;
            let tableDataTmp = [];
            let sysTellerInstInfoList = res.data.sysTellerInstInfoList;
            sysTellerInstInfoList.forEach(item => {
              let info = {};
              let sysInstDepartment = item.sysInstDepartment;
              info.departmentId = sysInstDepartment.departmentId;
              info.departmentName = sysInstDepartment.departmentName;
              info.positionAll = [];

              let sysDepartmentPositions = item.sysDepartmentPositions;
              sysDepartmentPositions.forEach(position => {
                this.positionAll[position.positionId] = position;
                info.positionAll.push(position.positionId);
              });

              let sysTellerInst=item.sysTellerInst;
              info.departmentFlag=sysTellerInst.departmentFlag;

              tableDataTmp.push(info);
            });
            this.tableData = tableDataTmp;
            console.log("tableDataTmp", tableDataTmp);//debug
          },
          res => {

          }
        ).catch();
      },
    }
  }
</script>

<style scoped>
  .table-ul {
    list-style-type: none;
  }

  .table-ul li {
    display: inline-block;
    margin-right: 5px;
  }

  .el-table-plus .el-button{
    margin-bottom: 3px;
  }
</style>
