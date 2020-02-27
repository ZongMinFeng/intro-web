<template>
  <div class="container">
    <el-form :model="searchForm" ref="searchForm" label-width="80px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="楼栋" prop="instId" :rules="[
              { validator: checkInstId, trigger: 'change' }
            ]"
                        ref="instId">
            <inst-selection v-model="instInfo" @click="instClickTap"></inst-selection>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" border stripe>
      <el-table-column label="单元名称" prop="unitName"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import InstSelection from '@/components/common/selection/InstSelection';
  export default {
    name: "TellerSelection",
    components:{
      InstSelection
    },
    data(){
      return {
        instInfo:{},
        searchForm:{},
        tableData:[],
      }
    },

    methods:{
      initData(){

      },

      getTellers(){

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
    }
  }
</script>

<style scoped>

</style>
