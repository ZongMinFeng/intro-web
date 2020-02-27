<template>
    <div>
      <div style="margin-bottom: 10px">
        <el-button type="success" :disabled="addDisabled" @click="onAddNewTap">新增</el-button>
      </div>

      <el-table :data="tableData" border stripe>
        <!--<el-table-column label="住户ID" prop="roomerId"></el-table-column>-->
        <el-table-column label="住户名字" prop="roomerName"></el-table-column>
        <el-table-column label="手机号" prop="roomerPhone"></el-table-column>
        <el-table-column label="所有权">
          <template slot-scope="props">
            {{getPropertyDetail(props.row.property)}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="props">
            <el-button type="warning" :disabled="modifyDisabled" @click="modifyTap(props.row)">修改</el-button>
            <el-button type="danger" :disabled="deleteDisabled" @click="deleteTap(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" append-to-body>
        <el-form :model="searchForm" ref="searchForm" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="住户" label-width="80px" prop="roomerId"
                            :rules="[{required:true, message:'请选择住户', trigger:'blur'}]">
                <el-button type="primary" :disabled="selectionDisabled" @click="selectionTap">请选择</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div style="margin-top:8px">名字:{{roomer.roomerName}}</div>
            </el-col>
            <el-col :span="14">
              <div style="margin-top:8px">手机号:{{roomer.roomerPhone}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="所有权" prop="property" :rules="[{required:true, message:'请选择所有权', trigger:'blur'}]">
                <el-select v-model="searchForm.property" placeholder="请选择房屋所有权" style="width: 100%;" @change="selectCheck">
                  <el-option v-for="item in propertys" :key="item.id" :label="item.value" :value="item.id"></el-option>
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

      <el-dialog title="请双击选择住户" :visible.sync="selectionDialogVisible" append-to-body>
        <roomer-selection @doubleClick="doubleClick"></roomer-selection>
      </el-dialog>
    </div>
</template>

<script>
  import {house2RoomerGetByCons, house2RoomerClear, house2RoomerPreservation, house2RoomerModification} from '@/util/module.js';
  import { Toast } from 'mint-ui';
  import RoomerSelection from "@/components/common/selection/RoomerSelection.vue";
  import { role } from '@/util/roleFunction';
  export default {
    name: "Roomers",
    components:{
      RoomerSelection,
    },
    props:['house'],

    data() {
      return {
        tableData:[],
        addDisabled:true,
        modifyDisabled:true,
        deleteDisabled:true,
        dialogVisible:false,
        flag:1,
        selectionDialogVisible:false,
        searchForm:{
          id:null,
          roomerId:null,
          property:null,
        },
        searchFormOld:{
          property:null,
        },
        roomer:{},
        propertys:[
          {id:'Owner', value:'房主'},
          {id:'Administrator', value:'管理员'},
          {id:'Roomer', value:'住户'},
          {id:'Tenant', value:'租户'},
        ],
        selectionDisabled:false,
        instInfo:{},
      }
    },

    computed:{
      dialogTitle(){
        if(this.flag===1){
          return '新增';
        }else{
          return '修改';
        }
      },
    },

    created(){
      role(this);
      this.instInfo=JSON.parse(localStorage.getItem("sysInstInfo"));
      if (this.Function.house2RoomerPreservation && this.instInfo.instLevel !== 1) {
        this.addDisabled = false
      } else {
        this.addDisabled = true
      }

      if (this.Function.house2RoomerModification && this.instInfo.instLevel !== 1) {
        this.modifyDisabled = false
      } else {
        this.modifyDisabled = true
      }

      if (this.Function.house2RoomerClear && this.instInfo.instLevel !== 1) {
        this.deleteDisabled = false
      } else {
        this.deleteDisabled = true;
      }

      this.initData();
    },

    watch:{
      house:{
        deep:true,
        handler:function (val, oldVal) {
          this.initData();
        }
      }
    },

    methods:{
      initData(){
        this.tableData=[];
        this.getRoomers();
      },

      getRoomers(){
        this.tableData=[];
        let params={};
        params.houseId=this.house.houseId;
        house2RoomerGetByCons(this, params, Toast).then(
          (res)=>{
            this.tableData=res.data;
          },
          (res)=>{
          }
        ).catch();
      },

      modifyTap(row){
        this.selectionDisabled=true;
        this.searchForm.roomerId=row.roomerId;
        this.roomer.roomerId=row.roomerId;
        this.roomer.roomerName=row.roomerName;
        this.roomer.roomerPhone=row.roomerPhone;
        this.searchForm.property=row.property;
        this.flag=2;
        this.dialogVisible=true;
        this.searchForm.id=row.id;

        this.searchFormOld.property=row.property;
      },

      deleteTap(row){
        this.$confirm('此操作将删除用户，是否继续？','删除用户', {
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(
          ()=>{
            this.deleteRoomer(row);
          }
        ).catch(
          (res)=>{
          }
        );
      },

      deleteRoomer(row){
        let params={};
        params.id=row.id;
        house2RoomerClear(this, params, Toast).then(
          (res)=>{
            this.initData();
          },
          (res)=>{

          }
        ).catch();
      },

      getPropertyDetail(property){
        let str="未知";
        switch (property) {
          case 'Owner':
            str='房主';
            break;
          case 'Administrator':
            str='管理员';
            break;
          case 'Roomer':
            str='住户';
            break;
          case 'Tenant':
            str='租户';
            break;
        }
        return str;
      },

      onAddNewTap(){
        this.selectionDisabled=false;
        this.flag=1;
        this.searchForm.roomerId="";
        this.searchForm.roomerName="";
        this.searchForm.roomerPhone="";
        this.searchForm.property="";
        this.roomer={};
        this.dialogVisible=true;
      },

      selectionTap(){
        this.selectionDialogVisible=true;
      },

      doubleClick(roomer){
        this.roomer=roomer;
        this.searchForm.roomerId=roomer.roomerId;
        this.selectionDialogVisible=false;
        this.$nextTick(()=>{
          this.$refs.searchForm.validateField('roomerId');
        });
      },

      dialogFormConfirm(){
        this.$refs.searchForm.validate((valid)=>{
          if(valid){
            this.formCommit();
          }else{
            return false;
          }
        });
      },

      formCommit(){
        if(this.flag===1){
          let params={};
          params.houseId=this.house.houseId;
          params.roomerId=this.searchForm.roomerId;
          params.property=this.searchForm.property;
          house2RoomerPreservation(this, params, Toast).then(
            (res)=>{
              this.$message.success('新增成功');
              this.initData();
              this.dialogVisible=false;
            },
            (res)=>{

            }
          ).catch();
        }

        if(this.flag===2){
          if(this.searchForm.property===this.searchFormOld.property){
            this.$message.warning('无任何修改！');
            return;
          }
          let params={};
          params.id=this.searchForm.id;
          params.property=this.searchForm.property;
          house2RoomerModification(this, params, Toast).then(
            (res)=>{
              this.$message.success('修改成功');
              this.initData();
              this.dialogVisible=false;
            },
            (res)=>{

            }
          ).catch();
        }

      },

      selectCheck(){
        this.$refs.searchForm.validateField('property');
      },
    }
  }
</script>

<style scoped>

</style>
