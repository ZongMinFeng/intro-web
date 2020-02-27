<template>
  <div class="container">
    <div class="handle-box">
      <el-button type="success" icon="el-icon-plus" :disabled="addDisabled" @click="onAddNewTap">新增</el-button>
    </div>

    <el-form :model="searchForm" ref="searchForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="机构" label-width="80px" prop="instId">
            <inst-selection v-model="instInfo" @click="instClickTap"></inst-selection>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" border stripe>
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
      <!--<el-table-column label="生日" prop="birthDate"></el-table-column>-->
      <!--<el-table-column label="国家" prop="nation"></el-table-column>-->
      <!--<el-table-column label="民族" prop="nationality"></el-table-column>-->
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button type="warning" :disabled="modifyDisabled" @click="modifyTap(props.row)">修改</el-button>
          <el-button type="danger" :disabled="deleteDisabled" @click="deleteTap(props.row)">删除</el-button>
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
            <el-form-item v-if="flag===1||flag===3" label="机构" prop="instId" ref="dialogInstId"
                          :rules="[
              { validator: checkInstId, trigger: 'change' },
            ]"
            >
              <inst-selection v-model="instInfo" @click="instClickTap"></inst-selection>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="名字" prop="roomerName" :rules="[{required:true, message:'请输入名字', trigger: 'blur'}]">
              <el-input v-model="dialogForm.roomerName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="手机号" prop="roomerPhone" :rules="[
            {required:true, message:'请输入手机号', trigger: 'blur'},
            {validator:checkPhone, trigger:'blur'}
            ]">
              <el-input v-model="dialogForm.roomerPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sapn="24">
            <el-form-item label="证件类型" prop="certType">
              <el-select v-model="dialogForm.certType" placeholder="请选择证件类型" style="width: 100%;">
                <el-option v-for="item in certTypes" :key="item.id" :label="item.value" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="证件号码" prop="certNo" :rules="[
            {required:true, message:'请输入证件号码', trigger: 'blur'},
            {validator:checkCertNo, trigger:'blur'}
            ]">
              <el-input v-model="dialogForm.certNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sapn="24">
            <el-form-item label="所属人群" prop="groupType">
              <el-select v-model="dialogForm.groupType" placeholder="请选择所属人群" style="width: 100%;">
                <el-option v-for="item in groupTypes" :key="item.id" :label="item.value" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sapn="24">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="dialogForm.sex" placeholder="请选择性别" style="width: 100%;">
                <el-option v-for="item in sexs" :key="item.id" :label="item.value" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="国家" prop="nation">
              <el-input v-model="dialogForm.nation"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="民族" prop="nationality">
              <el-input v-model="dialogForm.nationality"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="flag===1||flag===3">
          <el-col :span="3">
            <el-button type="primary" @click="houseSelectionTap">关联房屋</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="warning" @click="houseDeleteTap">删除关联</el-button>
          </el-col>
          <el-col :span="3">
            <div style="margin-top: 5px;">单元：{{dialogForm.unitName}}</div>
          </el-col>
          <el-col :span="3">
            <div style="margin-top: 5px;">楼层：{{dialogForm.floor}}</div>
          </el-col>
          <el-col :span="3">
            <div style="margin-top: 5px;">门牌号：{{dialogForm.houseNum}}</div>
          </el-col>
          <el-col :span="9">
            <el-form-item label="所有权" prop="property" :rules="[
              {validator:checkProperty, trigger:'blur'}
              ]">
              <el-select v-model="property" placeholder="请选择房屋所有权" style="width: 100%;" @change="propertyChange">
                <el-option v-for="item in propertys" :key="item.id" :label="item.value" :value="item.id" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" :disabled="dialogConfirmDisabled" @click="dialogFormConfirm">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="请双击选择房屋" :visible.sync="houseVisible">
      <house-selection :inst-info="instInfo" @return="houseSelected"></house-selection>
      <span slot="footer" class="dialog_footer">
        <el-button @click="houseVisible=false">取消</el-button>
        <el-button type="primary" :disabled="dialogConfirmDisabled" @click="dialogFormConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import InstSelection from '../../common/selection/InstSelection';
  import HouseSelection from '../../common/selection/HouseSelection';
  import { Toast } from 'mint-ui';
  import {roomerPreservation, roomerGetByCons, roomer2HousePreservation,
    roomerModification, roomerClear} from '../../../util/module';
  import { role } from '@/util/roleFunction';
  import GwRegular from '@/Gw/GwRegular.js';
  export default {
    name: "RoomerAction",
    components: {
      InstSelection,
      HouseSelection
    },
    data(){
      return {
        addDisabled:true,
        searchForm:{},
        instInfo:{},
        flag:1,
        dialogVisible:false,
        dialogForm:{
          specInstId:null,
          roomerName:null,
          roomerPhone:null,
          certType:"1",
          certNo:null,
          groupType:'1',
          sex:'M',
          nation:null,
          nationality:null,
          unitId:null,
          floor:null,
          houseNum:null,
          houseId:null,
          property:null,
        },
        certTypes:[
          {id:"1", value:'身份证'},
          {id:"2", value:'军人证'},
          {id:"3", value:'护照'},
        ],
        groupTypes:[
          {id:'1', value:'非关注人群'},
          {id:'2', value:'涉黑人群'},
          {id:'3', value:'残障人士'},
          {id:'4', value:'独居老人'},
        ],
        sexs:[
          {id:'M', value:'男'},
          {id:'F', value:'女'},
        ],
        dialogConfirmDisabled:false,
        tableData:[],
        page:1,
        pageSize:10,
        AllCount:0,
        houseVisible:false,
        house:{},
        propertys:[
          {id:'Owner', value:'房主'},
          {id:'Administrator', value:'管理员'},
          {id:'Roomer', value:'住户'},
          {id:'Tenant', value:'租户'},
        ],
        modifyDisabled:false,
        deleteDisabled:false,
        property:null,
      }
    },

    computed:{
      dialogTitle(){
        if(this.flag===1){
          return '新增住户-不关联房屋';
        }else if(this.flag===2){
          return '修改住户';
        }else{
          return '新增住户-关联房屋';
        }
      }
    },

    created(){
      this.instInfo=JSON.parse(localStorage.getItem("sysInstInfo"));

      role(this);
      if (this.Function.roomerPreservation && this.instInfo.instLevel !== 1) {
        this.addDisabled = false
      } else {
        this.addDisabled = true
      }

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
			this.AllCount=res.data.records;
          },
          (res)=>{

          }
        ).catch();
      },

      onAddNewTap(){
        this.property='Owner';
        this.dialogForm.property=this.property;

        if(this.flag===2){
          this.flag=1;
        }
        this.dialogForm.instId=this.instInfo.instId;
        this.dialogVisible=true;
      },

      instClickTap(nodeInfo){
        this.instInfo=nodeInfo;
        this.dialogForm.instId=this.instInfo.instId;
        if(this.$refs.dialogInstId!=null){
          this.$refs.dialogInstId.$emit('el.form.change');
        }
        this.initData();
      },

      checkInstId(rule, value, callback){
        if(this.dialogVisible===true){
          if(value===null||value===''){
            callback(new Error('请选择小区或楼栋'));
            return;
          }
          if(this.instInfo.instLevel<4){
            callback(new Error('请选择小区或楼栋'));
            return;
          }
          callback();
        }
      },

      dialogFormConfirm(){
        this.$refs.dialogForm.validate((valid)=>{
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
          params.specInstId=this.dialogForm.instId;
          params.roomerName=this.dialogForm.roomerName;
          params.roomerPhone=this.dialogForm.roomerPhone;
          params.certType=this.dialogForm.certType;
          params.certNo=this.dialogForm.certNo;
          params.groupType=this.dialogForm.groupType;
          if(this.dialogForm.sex!=null){
            params.sex=this.dialogForm.sex;
          }
          if(this.dialogForm.nation!==null){
            params.nation=this.dialogForm.nation;
          }
          if(this.dialogForm.nationality!==null){
            params.nationality=this.dialogForm.nationality;
          }
          roomerPreservation(this, params, Toast).then(
            (res)=>{
              this.$message.success('新增成功');
              this.dialogVisible=false;
              this.initData();
            },
            (res)=>{
              this.initData();
            }
          ).catch();
        }

        if(this.flag===2){
          let params={};
          params.roomerId=this.dialogForm.roomerId;
          params.roomerName=this.dialogForm.roomerName;
          params.roomerPhone=this.dialogForm.roomerPhone;
          params.certType=this.dialogForm.certType;
          params.certNo=this.dialogForm.certNo;
          params.groupType=this.dialogForm.groupType;
          if(this.dialogForm.sex!=null){
            params.sex=this.dialogForm.sex;
          }
          if(this.dialogForm.nation!==null){
            params.nation=this.dialogForm.nation;
          }
          if(this.dialogForm.nationality!==null){
            params.nationality=this.dialogForm.nationality;
          }
          roomerModification(this, params, Toast).then(
            (res)=>{
              this.$message.success('修改成功');
              this.dialogVisible=false;
              this.initData();
            },
            (res)=>{
              this.initData();
            }
          ).catch();
        }

        if(this.flag===3){
          let params={};
          params.houseId=this.dialogForm.houseId;
          params.buildingInstId=this.dialogForm.instId;
          params.property=this.dialogForm.property;
          params.roomerName=this.dialogForm.roomerName;
          params.roomerPhone=this.dialogForm.roomerPhone;
          params.certType=this.dialogForm.certType;
          params.certNo=this.dialogForm.certNo;
          params.groupType=this.dialogForm.groupType;
          if(this.dialogForm.sex!=null){
            params.sex=this.dialogForm.sex;
          }
          if(this.dialogForm.nation!==null){
            params.nation=this.dialogForm.nation;
          }
          if(this.dialogForm.nationality!==null){
            params.nationality=this.dialogForm.nationality;
          }
          roomer2HousePreservation(this, params, Toast).then(
            (res)=>{
              this.$message.success('新增成功');
              this.dialogVisible=false;
              this.initData();
            },
            (res)=>{
              this.initData();
            }
          ).catch();
        }
      },

      handleSizeChange(options){
        this.pageSize=options;
        this.initData();
      },

      handleCurrentChange(options){
        this.page=options;
        this.initData();
      },

      houseSelectionTap(){
        this.houseVisible=true;
      },

      houseSelected(house){
        this.house=house;
        this.houseVisible=false;
        this.dialogForm.unitName=this.house.unitName;
        this.dialogForm.unitId=this.house.unitId;
        this.dialogForm.floor=this.house.floor;
        this.dialogForm.houseNum=this.house.houseNum;
        this.dialogForm.houseId=this.house.houseId;
        this.flag=3;
      },

      houseDeleteTap(){
        this.house={};
        this.dialogForm.unitId=null;
        this.dialogForm.floor=null;
        this.dialogForm.houseNum=null;
        this.dialogForm.houseId=null;
        this.dialogForm.property=null;
        this.flag=1;
      },

      modifyTap(row){
        this.flag=2;
        this.dialogForm=row;
        this.dialogVisible=true;
      },

      deleteTap(row){
        this.$confirm('此操作将删除住户，是否确认？', '删除住户', {
          confirmButtonText:'确认',
          cancelButtonText:'取消',
          type:'warning'
        }).then(
          ()=>{
            this.deleteRoomer(row);
          }
        );
      },

      deleteRoomer(roomer){
        let params={};
        params.roomerId=roomer.roomerId;
        roomerClear(this, params, Toast).then(
          (res)=>{
            this.$message.success('删除成功!');
            this.initData();
          },
          (res)=>{
            if(res==='timeout'){
              this.initData();
            }
          }
        ).catch();
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

      checkPhone(rule, value, callback){
        if(!(/^1[3456789]\d{9}$/.test(value))){
          callback(new Error("手机号码有误，请重填"));
          return false;
        }
        callback();
      },

      checkCertNo(rule, value, callback){
        if (this.dialogForm.certType==="1"){
          if(!(GwRegular.certNo.test(value))){
            callback(new Error("身份证有误，请重填"));
            return false;
          }
        }
        callback();
      },

      checkProperty(rule, value, callback){
        if (this.dialogForm.unitName!=null){
          if(value==null){
            callback(new Error("请选择所有权"));
            return false;
          }
        }
        callback();
      },

      propertyChange(){
        this.dialogForm.property=this.property;
        this.$nextTick(()=>{
          this.$refs.dialogForm.validateField('property');
        });
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
