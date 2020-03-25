<template>
    <div class="container">
        <el-table :data="tableData" border stripe>
            <el-table-column label="汇率名称" prop="name"></el-table-column>
            <el-table-column label="汇率值" prop="value"></el-table-column>
            <el-table-column label="操作" width="240">
                <template slot-scope="props">
                    <!--只有顶级公司管理员可以修改-->
                    <el-button v-if="sysInstDepartment.departmentId==='AdminSID200217000'" type="primary" @click="modifyTap(props.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
            <el-form :model="dialogForm" label-width="80px" ref="dialogForm">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="汇率名称">
                            <span>{{dialogForm.name}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="汇率值" prop="value"
                                      :rules="[{required:true, message:'请输入汇率值', trigger: 'blur'}, {validator:checkValue, trigger:'blur'}]">
                            <el-input v-model="dialogForm.value" placeholder="请输入汇率值"></el-input>
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
    import {getSysRate, updateSysRate} from "../../../util/module";
    import GwRegular from "@/Gw/GwRegular.js";

    export default {
        name: "rateAction",
        data(){
            return {
                tableData:[],
                dialogVisible:false,
                dialogForm:{
                    value:null,
                    name:null,
                    id:null
                },
                sysInstDepartment:{
                    departmentId:null
                },
            }
        },

        computed:{
            dialogTitle(){
                return '修改';
            }
        },

        created(){
            this.sysInstDepartment=JSON.parse(localStorage.getItem('sysInstDepartment'))||{};
            console.log('this.sysInstDepartment', this.sysInstDepartment);//debug
            this.initData();
        },

        methods:{
            initData(){
                this.getRates();
            },

            getRates(){
                let params={};
                getSysRate(this, params).then(
                    res=>{
                        this.tableData=[];
                        let item={};
                        item.id='dollarRate';
                        item.name='美元汇率';
                        item.value=res.data.dollarRate;
                        item.version=res.data.version;
                        this.tableData.push(item);

                        item={};
                        item.id='nalaRate';
                        item.name='人民币汇率';
                        item.value=res.data.nalaRate;
                        item.version=res.data.version;
                        this.tableData.push(item);
                    },

                    res=>{

                    }
                ).catch();
            },

            modifyTap(item){
                if (this.$refs.dialogForm) {
                    this.$refs.dialogForm.clearValidate();
                }
                this.dialogForm.id=item.id;
                this.dialogForm.name=item.name;
                this.dialogForm.value=item.value;
                this.dialogForm.version=item.version;
                this.dialogVisible=true;
            },

            checkValue(rule, value, callback){
                if (!GwRegular.numeric4.test(value)){
                    callback(new Error('请输入最多4位正小数'));
                }
                callback();
            },

            dialogFormConfirm() {
                this.$refs.dialogForm.validate((valid) => {
                    if (valid) {
                        this.formCommit();
                    } else {
                        return false;
                    }
                });
            },

            formCommit() {
                let params={};
                params.id='system';
                params.version=this.dialogForm.version;
                if (this.dialogForm.id==='dollarRate') {
                    params.dollarRate=this.dialogForm.value;
                }
                if (this.dialogForm.id === 'nalaRate') {
                    params.nalaRate=this.dialogForm.value;
                }
                updateSysRate(this, params).then(
                    res=>{
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

</style>
