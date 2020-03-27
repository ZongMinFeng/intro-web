<template>
    <div class="container">
        <el-form :model="searchForm" ref="searchForm" label-width="80px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="名称" prop="goodsName">
                        <el-input v-model="searchForm.goodsName" clearable placeholder="请输入物资系列名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="型号" prop="goodsType">
                        <el-input v-model="searchForm.goodsType" clearable placeholder="请输入物资系列型号"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="分类" prop="categoryId ">
                        <category-selection @click="categoryClick"></category-selection>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="状态">
                        <el-select v-model="searchForm.status" placeholder="请选择状态" clearable style="width: 100%;">
                            <el-option v-for="item in statusList" :key="item.id" :label="item.value"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <el-table :data="tableData" border stripe @row-dblclick="dbCliick">
            <el-table-column label="系列名称" prop="goodsName"></el-table-column>
            <el-table-column prop="goodsId" label="系列ID"></el-table-column>
            <el-table-column label="系列主图" width="120" align="center" header-align="left">
                <template slot-scope="scope">
                    <img style="height: 80px; width: 80px;background-color: white;"  :preview="scope.$index" :src="pictureUrl + scope.row.goodsId + '/'+scope.row.mainPicture" >
                </template>
            </el-table-column>
            <el-table-column label="物资价格" width="160" align="right" header-align="left">
                <template slot-scope="props">
                    <div v-if="props.row.specNowPrice>0.005">
                        <p>￥{{formatPrice(props.row.specNowPrice)}}</p>
                        <p>₦{{formatPrice(props.row.specNowPrice/nalaRate)}}</p>
                        <p>${{formatPrice(props.row.specNowPrice/dollarRate)}}</p>
                    </div>
                    <div v-else style="color:red">
                        未定价
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="型号" prop="goodsType"></el-table-column>
            <el-table-column label="单位" width="80">
                <template slot-scope="props">
                    {{getUnitName(props.row.unitId)}}
                </template>
            </el-table-column>
            <el-table-column label="状态" width="80">
                <template slot-scope="props">
                    {{getStatusName(props.row.status)}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="props">
                    <el-button v-if="props.row.status==='1'&&sysInstDepartment.departmentId==='AdminSID200217000'" type="warning" @click="putDownTap(props.row)">下架</el-button>
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
    </div>
</template>

<script>
    import CategorySelection from "../../common/selection/CategorySelection";
    import * as cfg from "../../../config/cfg";
    import {listAllUnitinfos, listSerialsByConditions, putDownIndex} from "../../../util/module";
    import _String from '../../../util/string';

    export default {
        name: "goodsSelection",
        components:{
            CategorySelection
        },
        data() {
            return {
                searchForm:{
                    categoryId:null,
                    goodsName:null,
                    goodsType:null,
                    status:'1',
                },
                statusList: [
                    {id: '1', value: '上架'},
                    {id: '2', value: '注销'},
                    {id: '3', value: '下架'},
                    {id: '4', value: '新增'},
                ],
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                AllCount: 0,
                pictureUrl: '',
                units:[],
                sysInstDepartment:{
                    departmentId:null
                },
                dollarRate:1,
                nalaRate:1,
            };
        },

        watch:{
            searchForm:{
                handler(){
                    this.currentPage=1;
                    this.initData();
                },
                deep:true
            }
        },

        created() {
            this.sysInstDepartment=JSON.parse(localStorage.getItem("sysInstDepartment")||{});
            this.pictureUrl = cfg.service.uploadUrl + '/';
            this.nalaRate=localStorage.getItem('nalaRate')||1;
            this.dollarRate=localStorage.getItem('dollarRate')||1;
            this.getUnits();
            this.initData();
        },

        methods:{
            initData(){
                this.getSerails();
            },

            getStatusName(status) {
                let statusInfo = {id: -1, value: '未知状态'};
                this.statusList.forEach(item => {
                    if (item.id === status) {
                        statusInfo = item;
                        return false;
                    }
                });
                return statusInfo.value;
            },

            //格式化金额
            formatPrice(price) {
                return _String.number_format(price, 2);
            },

            putDownTap(item){
                this.$confirm('此操作将下架物资，是否确认?', '下架物资', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(
                    () => {
                        this.putDownCommit(item);
                    }
                );

            },

            putDownCommit(item){
                let params={};
                params.goodsList=[];
                let paramsItem={};
                paramsItem.recycleSeq="1";
                paramsItem.specGoodsId=item.specGoodsId;
                params.goodsList.push(paramsItem);
                putDownIndex(this, params).then(
                    res=>{
                        this.$message.success('下架成功');
                        this.initData();
                    },
                    res=>{

                    }
                ).catch();
            },

            getSerails(){
                let params={};
                params.currentPage = this.currentPage;
                params.pageSize = this.pageSize;
                params.categoryId=this.searchForm.categoryId;
                params.goodsName=this.searchForm.goodsName;
                params.goodsType=this.searchForm.goodsType;
                params.status=this.searchForm.status;
                listSerialsByConditions(this, params).then(
                    res=>{
                        if (res.returnCode === 400) {
                            this.tableData=[];
                            return;
                        }
                        this.AllCount = res.data.total;
                        this.tableData = res.data.records;
                    },
                    res=>{

                    }
                ).catch();
            },

            categoryClick(nodeInfo) {
                this.searchForm.categoryId = nodeInfo.categoryId;
            },

            getUnitName(unitId){
                let unitInfo={};
                this.units.forEach(item=>{
                    if (item.unitId === unitId) {
                        unitInfo=item;
                        return false;
                    }
                });
                return unitInfo.unitName;
            },

            getUnits() {
                let params = {};
                listAllUnitinfos(this, params).then(
                    res => {
                        this.units = res.data;
                    },
                    res => {

                    }
                ).catch();
            },

            handleSizeChange() {
                this.initData();
            },

            handleCurrentChange(options) {
                this.currentPage = options;
                this.initData();
            },

            dbCliick(item){
                console.log('item', item);
                this.$emit('row-dblclick', item);
            },
        }
    }
</script>

<style scoped>

</style>
