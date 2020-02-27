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
          <el-form-item label="单元" prop="unitId" >
            <el-select v-model="unitId" placeholder="请选择单元" style="width: 100%;" clearable @change="mainSelectCheck">
              <el-option v-for="item in units" :key="item.unitId" :label="item.unitName" :value="item.unitId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="卡号" prop="cardId">
            <el-input v-model="searchForm.cardId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" border stripe>
      <el-table-column label="卡号" prop="cardId"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="props">
          <span>{{showCardStatus(props.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button v-if="props.row.status===9" type="primary" @click="cardSyn(props.row.cardId)">同步</el-button>
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
            <el-form-item label="楼栋" prop="instId" :rules="[
              { validator: checkInstId, trigger: 'change' }
            ]"
                          ref="dialogInstId">
              <inst-selection v-model="instInfo" @click="instClickTap"></inst-selection>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="单元" prop="unitId" ref="dialogUintId"
              :rules="[{required: true, message: '请输入楼层', trigger: 'blur'}]" >
              <el-select v-model="dialogUnitId" placeholder="请选择单元" style="width: 100%;" clearable @change="selectCheck">
                <el-option v-for="item in units" :key="item.unitId" :label="item.unitName" :value="item.unitId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="卡号" prop="cardId" :rules="[
            { required: true, message:'请输入卡号', trigger: 'blur' },
            ]">
              <el-input v-model="dialogForm.cardId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" :disabled="dialogConfirmDisabled" @click="dialogFormConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import InstSelection from '@/components/common/selection/InstSelection';
  import { Toast } from 'mint-ui';
  import { role } from '@/util/roleFunction';
  import {unitGetByCons, cardPreservation, cardGetByCons, synchronizeCardModification} from '@/util/module';
  import {sortByNum} from '@/Gw/GwArray.js'
  export default {
    name: "CardListAction",
    components:{
      InstSelection
    },

    computed:{
      dialogTitle(){
        return '新增卡片';
      }
    },

    data(){
      return{
        addDisabled:true,
        searchForm:{
          cardId:null,
          unitId:null,
          instId:null,
        },
        instInfo:{},
        unitId:null,
        units:[],
        dialogVisible:false,
        dialogForm:{
          unitId:null,
          cardId:null,
          instId:null,
        },
        dialogConfirmDisabled:false,
        dialogUnitId:null,
        page:1,
        pageSize:10,
        AllCount:0,
        tableData:[],
      }
    },

    created(){
      this.instInfo=JSON.parse(localStorage.getItem("sysInstInfo"));
      this.searchForm.instId=this.instInfo.instId;
      this.dialogForm.instId=this.instInfo.instId;

      role(this);
      if (this.Function.cardPreservation && this.instInfo.instLevel !== 1) {
        this.addDisabled = false
      } else {
        this.addDisabled = true
      }

      this.$nextTick(()=>{
        this.$refs.instId.$emit('el.form.change');
      });

      this.getUnits();
    },

    watch:{
      'searchForm.cardId':{
        deep:true,
        handler:function (val, oldVal) {
          if(val!=null&&val!==''){
            this.initData();
          }
          if(val===''&&this.searchForm.unitId!=null){
            this.initData();
          }
        }
      }
    },

    methods:{
      initData(){
        this.getCards();
      },

      getCards(){
        if(this.searchForm.unitId==null&&this.searchForm.cardId==null){
          return;
        }
        this.tableData=[];
        let params={};
        params.page=this.page;
        params.pageSize=this.pageSize;
        params.cardId=this.searchForm.cardId;
        params.unitId=this.searchForm.unitId;
        cardGetByCons(this, params, Toast).then(
          (res)=>{
            this.tableData=res.data.rows;
            this.AllCount=res.data.records;
          },
          (res)=>{
            if(res==='timeout'){
              this.$message.error('交易超时！');
            }
          }
        ).catch();
      },

      getUnits(){
        if(this.instInfo.instLevel!==5){
          return;
        }
        const params={};
        params.buildingInstId=this.instInfo.instId;
        unitGetByCons(this, params, Toast).then(
          (res)=>{
            if(res.data!=null&& res.data instanceof Array){
              this.units=res.data.sort((a, b)=>{
                return sortByNum(a.unitName, b.unitName);
              });
            }
          },
          (res)=>{

          }
        ).catch();
      },

      onAddNewTap(){
        this.dialogVisible=true;
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

      instClickTap(nodeInfo){
        this.instInfo=nodeInfo;
        this.searchForm.instId=this.instInfo.instId;
        this.dialogForm.instId=this.instInfo.instId;
        if(this.$refs.dialogInstId!=null){
          this.$refs.dialogInstId.$emit('el.form.change');
        }
        this.$refs.instId.$emit('el.form.change');
        this.getUnits();
      },

      mainSelectCheck(){
        this.$nextTick(()=>{
          if(this.$refs.dialogUintId!=null){
            this.$refs.dialogUintId.clearValidate();
          }
        });
        this.dialogUnitId=this.unitId;
        this.searchForm.unitId=this.unitId;
        this.dialogForm.unitId=this.dialogUnitId;
        this.getCards();
      },

      selectCheck(){
        this.unitId=this.dialogUnitId;
        this.searchForm.unitId=this.unitId;
        this.dialogForm.unitId=this.dialogUnitId;
        this.$nextTick(()=>{
          if(this.$refs.dialogUintId!=null){
            this.$refs.dialogUintId.clearValidate();
          }
        });
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
        let params={};
        params.cardId=this.dialogForm.cardId;
        params.unitId=this.dialogForm.unitId;
        cardPreservation(this, params, Toast).then(
          (res)=>{
            this.$message.success("新增成功！");
            this.dialogVisible=false;
            this.initData();
          },
          (res)=>{
            if(res==='timeout'){
              this.$message.error('超时，页面刷新');
              this.dialogVisible=false;
              this.initData();
            }
          }
        ).catch();
      },

      handleSizeChange(options){
		this.pageSize=options;
        this.initData();
      },

      handleCurrentChange(options){
        this.page=options;
        this.initData();
      },

      showCardStatus(status){
        let str='未知';
        switch (status) {
          case 1:
            str='正常';
            break;
          case 2:
            str='注销';
            break;
          case 3:
            str='停用';
            break;
          case 9:
            str='未同步设备';
            break;
        }
        return str;
      },

      cardSyn(cardId){
        let params={};
        params.cardId=cardId;
        synchronizeCardModification(this, params, Toast).then(
          (res)=>{
            this.$message.success("同步成功");
          },
          (res)=>{
            if(res==='timeout'){
              this.$message.error('交易超时，请查看结果，如果同步失败，请重试！');
              this.initData();
            }
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
