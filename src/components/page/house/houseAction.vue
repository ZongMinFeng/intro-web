<template>
  <div class="container">
    <div class="handle-box">
      <el-button type="success" icon="el-icon-plus" :disabled="addDisabled" @click="onAddNewTap">新增</el-button>
    </div>

    <el-form :model="searchForm" ref="searchForm" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="楼栋" prop="instId" :rules="[
              { validator: checkInstId, trigger: 'change' }
            ]"
                        ref="instId">
            <inst-selection v-model="instInfo" @click="instClickTap"></inst-selection>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单元" prop="unitId" :rules="[
              { required: true, message:'请选择单元', trigger: 'blur' },
            ]" ref="dialogUintId" >
            <el-select v-model="unitId" placeholder="请选择单元" style="width: 100%;" clearable @change="mainSelectCheck">
              <el-option v-for="item in units" :key="item.unitId" :label="item.unitName" :value="item.unitId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" border stripe>
      <!--<el-table-column label="单元号" prop="unitId"></el-table-column>-->
      <el-table-column label="单元名称" prop="unitName"></el-table-column>
      <el-table-column label="楼层" prop="floor"></el-table-column>
      <el-table-column label="门牌号" prop="houseNum"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="props">
          {{getStatus(props.row.status)}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button type="warning" :disabled="modifyDisabled" @click="modifyTap(props.row)">修改</el-button>
          <el-button type="danger" :disabled="deleteDisabled" @click="deleteTap(props.row)">删除</el-button>
          <el-button type="primary" @click="roomerTap(props.row)">住户</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <el-form :model="dialogForm" label-width="80px" ref="dialogForm">
        <el-row>
          <el-col :span="24">
            <el-form-item v-if="flag===1" label="机构" prop="instId" ref="dialogInstId"
                          :rules="[
              { validator: checkInstId, trigger: 'change' },
            ]"
            >
              <inst-selection v-model="instInfo" @click="instClickTap"></inst-selection>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sapn="24">
            <el-form-item label="单元" prop="unitId" :rules="[
              { required: true, message:'请选择单元', trigger: 'blur' },
            ]" ref="dialogUintId" >
              <el-select v-model="dialogForm.unitId" placeholder="请选择单元" style="width: 100%;" @change="selectCheck">
                <el-option v-for="item in units" :key="item.unitId" :label="item.unitName" :value="item.unitId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sapn="24">
            <el-form-item label="楼层" prop="floor"
            :rules="[{required: true, message: '请输入楼层', trigger: 'blur'},
            {validator:checkFloor, trigger:'blur'}]">
              <el-input v-model="dialogForm.floor" placeholder="请输入楼层" @change="loadQuerys"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sapn="24">
            <el-form-item label="门牌号" ref="dialogFormHouseNum" prop="houseNum"
                          :rules="[{required:true, message:'请输入门牌号', trigger:'blur'},
                          {validator:checkHouseNum, trigger:'blur'}]">
              <el-autocomplete style="width: 100%;" v-model="dialogForm.houseNum" :fetch-suggestions="querySearch"
                               @select="handleSelect"></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="flag===2">
          <el-col :sapn="24">
            <el-form-item label="状态" prop="status">
              <el-select v-model="dialogForm.status" placeholder="请选择状态" style="width: 100%;" @change="selectStatus">
                <el-option v-for="item in statuses" :key="item.id" :label="item.value" :value="item.id"></el-option>
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

    <el-dialog title="房屋住户" :visible.sync="roomersVisible">
      <roomers :house="house"></roomers>
    </el-dialog>
  </div>
</template>

<script>
  import InstSelection from '@/components/common/selection/InstSelection';
  import Roomers from './component/Roomers';
  import {houseGetByCons, unitGetByCons, housePreservation, houseModification,
    houseGetById, houseClear} from '@/util/module';
  import { Toast } from 'mint-ui';
  import { role } from '@/util/roleFunction';
  import {sortByNum} from '@/Gw/GwArray.js';
  export default {
    name: 'houseAction',
    components: {
      InstSelection,
      Roomers
    },
    data(){
      return {
        tableData:[],
        searchForm:{},
        instInfo:{},
        dialogVisible:false,
        dialogForm:{
          floor:null,
          houseId:null,
          houseNum:null,
          buildingInstId:null,
          unitId:null,
          status:null,
        },
        dialogFormOld:{},
        flag:1,
        units:[],
        querys:[],
        querysAll:[],
        roomers:[],
        addDisabled:true,
        modifyDisabled:true,
        deleteDisabled:true,
        roomersVisible:false,
        house:{},
        unitId:null,
        statuses:[
          {id:1, value:'自住'},
          {id:2, value:'出租'},
        ],
        status:null,
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

      dialogConfirmDisabled(){
        if (this.flag===1){
          return false;
        }else{
          if (this.dialogForm.houseNum !== this.dialogFormOld.houseNum) {
            return false;
          }
          if(this.dialogForm.floor !== this.dialogFormOld.floor){
            return false;
          }
          if(this.dialogForm.unitId !== this.dialogFormOld.unitId){
            return false;
          }
          if(this.dialogForm.status !== this.dialogFormOld.status){
            return false;
          }
          return true;
        }
      }
    },

    created(){
      this.instInfo=JSON.parse(localStorage.getItem("sysInstInfo"));
      this.searchForm.instId=this.instInfo.instId;
      this.dialogForm.instId=this.instInfo.instId;

      role(this);
      if (this.Function.housePreservation && this.instInfo.instLevel !== 1) {
        this.addDisabled = false
      } else {
        this.addDisabled = true
      }

      if (this.Function.houseModification && this.instInfo.instLevel !== 1) {
        this.modifyDisabled = false
      } else {
        this.modifyDisabled = true
      }

      if (this.Function.houseClear && this.instInfo.instLevel !== 1) {
        this.deleteDisabled = false
      } else {
        this.deleteDisabled = true;
      }

      this.$nextTick(()=>{
        this.$refs.instId.$emit('el.form.change');
      });

      this.initData();
    },

    methods:{
      initData(){
        this.getHouse();
        this.getUnits();
      },

      getHouse(){
        this.tableData=[];
        if(this.instInfo.instLevel!==5){
          return;
        }
        const params={};
        if(this.searchForm.unitId!=null&&this.searchForm.unitId!==''){
          params.unitId=this.searchForm.unitId;
        }else{
          params.buildingInstId=this.searchForm.instId;
        }
        houseGetByCons(this, params).then(
          (res)=>{
            if(res.status===400){
              this.$message.error(res.msg);
              return;
            }
            let houses=res.data;
            houses.forEach((value)=>{
              if(value.floor.startsWith('0')&&value.floor.length===2){
                value.floor=value.floor.substr(1,1);
              }
              if(value.houseNum.startsWith('0')&&value.houseNum.length===4){
                value.houseNum=value.houseNum.substr(1,3);
              }
              this.tableData.push(value);
            });
          },
          (res)=>{

          }
        ).catch();
      },

      onAddNewTap(){
        this.flag=1;
        this.querys=this.loadAll();
        this.dialogVisible=true;
      },

      getUnits(){
        if(this.instInfo.instLevel!==5){
          return;
        }
        const params={};
        params.buildingInstId=this.instInfo.instId;
        unitGetByCons(this, params, Toast).then(
          (res)=>{
            if(res.status===400){
              this.$message.error(res.msg);
              return;
            }
            if (res.data!=null&&res.data instanceof Array){
              this.units=res.data.sort((a, b)=>{
                return sortByNum(a.unitName, b.unitName);
              });
            }
          },
          (res)=>{

          }
        ).catch();
      },

      modifyTap(row){
        this.flag=2;
        this.dialogVisible=true;

        this.dialogForm.houseId=row.houseId;
        this.dialogForm.unitId=row.unitId;
        this.dialogForm.floor=row.floor;
        this.dialogForm.houseNum=row.houseNum;
        this.dialogForm.status=row.status;

        this.dialogFormOld.houseId=row.houseId;
        this.dialogFormOld.unitId=row.unitId;
        this.dialogFormOld.floor=row.floor;
        this.dialogFormOld.houseNum=row.houseNum;
        this.dialogFormOld.status=row.status;
      },

      roomerTap(row){
        this.house=row;
        this.roomersVisible=true;
      },

      deleteTap(row){
        this.$confirm('此操作将删除房屋，是否继续？', '删除房屋', {
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(
          ()=>{
            this.deleteHouse(row);
          }
        ).catch(
          ()=>{

          }
        );
      },

      deleteHouse(row) {
        let params={};
        params.houseId=row.houseId;
        houseClear(this, params, Toast).then(
          (res)=>{
            if(res.status===400){
              this.$message.error(res.msg);
              return;
            }
            this.$message.success('删除成功');
            this.getHouse();
          },
          (res)=>{
            this.getHouse();
          }
        ).catch();
      },

      instClickTap(nodeInfo){
        this.units=[];
        this.unitId=null;
        this.searchForm.unitId=null;

        this.instInfo=nodeInfo;
        this.dialogForm.instId=this.instInfo.instId;
        this.searchForm.instId=this.instInfo.instId;
        if(this.$refs.dialogInstId!=null){
          this.$refs.dialogInstId.$emit('el.form.change');
        }
        this.$refs.instId.$emit('el.form.change');

        this.tableData=[];
        this.getHouse();
        this.getUnits();
      },

      checkFloor(rule, value, callback){
        let reg=/^[1-9]\d?$/;
        if (!reg.test(value)){
          callback(new Error('请输入整数，最大99’'));
        }
        callback();
      },

      checkHouseNum(rule, value, callback){
        let reg=/^[1-9]\d\d?\d$/;
        if (!reg.test(value)){
          callback(new Error('请输入整数，最大9999，最小101'));
        }
        callback();
      },

      loadAll() {
        return [
          {value:'101'},
          {value:'102'},
          {value:'103'},
          {value:'104'},
          {value:'105'},
          {value:'106'},
          {value:'107'},
          {value:'108'},
          {value:'109'},
          {value:'110'},
          {value:'111'},
          {value:'112'},
          {value:'113'},
          {value:'114'},
          {value:'115'},
          {value:'116'},
          {value:'117'},
          {value:'118'},
          {value:'119'},
          {value:'120'},
          {value:'201'},
          {value:'202'},
          {value:'203'},
          {value:'204'},
          {value:'205'},
          {value:'206'},
          {value:'207'},
          {value:'208'},
          {value:'209'},
          {value:'210'},
          {value:'211'},
          {value:'212'},
          {value:'213'},
          {value:'214'},
          {value:'215'},
          {value:'216'},
          {value:'217'},
          {value:'218'},
          {value:'219'},
          {value:'220'},
          {value:'301'},
          {value:'302'},
          {value:'303'},
          {value:'304'},
          {value:'305'},
          {value:'306'},
          {value:'307'},
          {value:'308'},
          {value:'309'},
          {value:'310'},
          {value:'311'},
          {value:'312'},
          {value:'313'},
          {value:'314'},
          {value:'315'},
          {value:'316'},
          {value:'317'},
          {value:'318'},
          {value:'319'},
          {value:'320'},
          {value:'401'},
          {value:'402'},
          {value:'403'},
          {value:'404'},
          {value:'405'},
          {value:'406'},
          {value:'407'},
          {value:'408'},
          {value:'409'},
          {value:'410'},
          {value:'411'},
          {value:'412'},
          {value:'413'},
          {value:'414'},
          {value:'415'},
          {value:'416'},
          {value:'417'},
          {value:'418'},
          {value:'419'},
          {value:'420'},
          {value:'501'},
          {value:'502'},
          {value:'503'},
          {value:'504'},
          {value:'505'},
          {value:'506'},
          {value:'507'},
          {value:'508'},
          {value:'509'},
          {value:'510'},
          {value:'511'},
          {value:'512'},
          {value:'513'},
          {value:'514'},
          {value:'515'},
          {value:'516'},
          {value:'517'},
          {value:'518'},
          {value:'519'},
          {value:'520'},
          {value:'601'},
          {value:'602'},
          {value:'603'},
          {value:'604'},
          {value:'605'},
          {value:'606'},
          {value:'607'},
          {value:'608'},
          {value:'609'},
          {value:'610'},
          {value:'611'},
          {value:'612'},
          {value:'613'},
          {value:'614'},
          {value:'615'},
          {value:'616'},
          {value:'617'},
          {value:'618'},
          {value:'619'},
          {value:'620'},
          {value:'701'},
          {value:'702'},
          {value:'703'},
          {value:'704'},
          {value:'705'},
          {value:'706'},
          {value:'707'},
          {value:'708'},
          {value:'709'},
          {value:'710'},
          {value:'711'},
          {value:'712'},
          {value:'713'},
          {value:'714'},
          {value:'715'},
          {value:'716'},
          {value:'717'},
          {value:'718'},
          {value:'719'},
          {value:'720'},
          {value:'801'},
          {value:'802'},
          {value:'803'},
          {value:'804'},
          {value:'805'},
          {value:'806'},
          {value:'807'},
          {value:'808'},
          {value:'809'},
          {value:'810'},
          {value:'811'},
          {value:'812'},
          {value:'813'},
          {value:'814'},
          {value:'815'},
          {value:'816'},
          {value:'817'},
          {value:'818'},
          {value:'819'},
          {value:'820'},
          {value:'901'},
          {value:'902'},
          {value:'903'},
          {value:'904'},
          {value:'905'},
          {value:'906'},
          {value:'907'},
          {value:'908'},
          {value:'909'},
          {value:'910'},
          {value:'911'},
          {value:'912'},
          {value:'913'},
          {value:'914'},
          {value:'915'},
          {value:'916'},
          {value:'917'},
          {value:'918'},
          {value:'919'},
          {value:'920'},
          {value:'1001'},
          {value:'1002'},
          {value:'1003'},
          {value:'1004'},
          {value:'1005'},
          {value:'1006'},
          {value:'1007'},
          {value:'1008'},
          {value:'1009'},
          {value:'1010'},
          {value:'1011'},
          {value:'1012'},
          {value:'1013'},
          {value:'1014'},
          {value:'1015'},
          {value:'1016'},
          {value:'1017'},
          {value:'1018'},
          {value:'1019'},
          {value:'1020'},
        ];
      },

      loadQuerys(){
        let querysAll=this.loadAll();
        let floor=this.dialogForm.floor;
        if(floor.startsWith('0')&&floor.length===2){
          floor=floor.substr(1,1);
        }
        let results = this.dialogForm.floor ? querysAll.filter(this.createFilter(floor)) : querysAll;
        this.querys=results;
      },

      querySearch(queryString, cb) {
        let querys = this.querys;
        let results = queryString ? querys.filter(this.createFilter(queryString)) : querys;
        cb(results);
      },
      createFilter(queryString) {
        return (query) => {
          return (query.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },

      handleSelect(item) {
        console.log(item);
        this.$refs.dialogForm.validateField('houseNum');
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
          params.unitId=this.dialogForm.unitId;
          params.buildingInstId=this.dialogForm.instId;
          params.floor=this.dialogForm.floor;
          params.houseNum=this.dialogForm.houseNum;
          if(params.floor<10){
            params.floor='0'+params.floor;
          }
          if(parseInt(params.houseNum)<999){
            params.houseNum='0'+this.dialogForm.houseNum;
          }
          housePreservation(this, params, Toast).then(
            (res)=>{
              if(res.status===400){
                this.$message.error(res.msg);
                return;
              }
              this.$message.success('新增成功');
              this.dialogVisible=false;
              this.initData();
            },

            (res)=>{
              if(res==='timeout'){
                this.$message.error('交易超时，请查看是否新增成功');
              }
              this.dialogVisible=false;
              this.initData();
            }
          ).catch();
        }else{
          let params={};
          params.houseId=this.dialogForm.houseId;
          if(this.dialogFormOld.floor!==this.dialogForm.floor){
            params.floor=this.dialogForm.floor;
          }
          if(this.dialogFormOld.houseNum!==this.dialogForm.houseNum){
            params.houseNum=this.dialogForm.houseNum;
          }
          if(this.dialogFormOld.status!==this.dialogForm.status){
            params.status=this.dialogForm.status;
          }
          houseModification(this, params, Toast).then(
            (res)=>{
              if(res.status===400){
                this.$message.error(res.msg);
                return;
              }
              this.$message.success('修改成功');
              this.dialogVisible=false;
              this.initData();
            },

            (res)=>{
              if(res==='timeout'){
                this.$message.error('交易超时，请查看是否修改成功');
              }
              this.dialogVisible=false;
              this.initData();
            }
          ).catch();
        }

      },

      checkInstId(rule, value, callback){
        if(value===null||value===''){
          callback(new Error('请选择楼栋'));
          return;
        }
        if(this.instInfo.instLevel!==5){
          callback(new Error('请选择楼栋'));
          return;
        }
        callback();
      },

      selectCheck(){
        this.$nextTick(()=>{
          this.$refs.dialogUintId.clearValidate();
        });
        this.searchForm.unitId=this.unitId;
      },

      selectStatus(){
      },

      mainSelectCheck(){
        this.$nextTick(()=>{
          this.$refs.dialogUintId.clearValidate();
        });
        this.searchForm.unitId=this.unitId;
        this.getHouse();
      },

      getStatus(status){
        let str='未知';
        switch (status) {
          case 1:
            str='自住';
            break;
          case 2:
            str='出租';
            break;
        }
        return str;
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
