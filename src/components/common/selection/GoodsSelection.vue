<template>
    <div>
        <div>请双击选择物资</div>
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
            <el-table-column label="型号" prop="goodsType"></el-table-column>
            <el-table-column label="单位" width="80">
                <template slot-scope="props">
                    {{getUnitName(props.row.unitId)}}
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
    import CategorySelection from "./CategorySelection";
    import * as cfg from "../../../config/cfg";
    import {listAllUnitinfos, listSerialsByConditions} from "../../../util/module";

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
                },
                statusList: [
                    {id: '1', value: '正常--上架'},
                    {id: '2', value: '注销'},
                    {id: '3', value: '停用--下架'},
                    {id: '4', value: '新增--初始状态'},
                ],
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                AllCount: 0,
                pictureUrl: '',
                units:[],
            };
        },

        watch:{
            searchForm:{
                handler(){
                    this.initData();
                },
                deep:true
            }
        },

        created() {
            this.pictureUrl = cfg.service.uploadUrl + '/';
            this.getUnits();
            this.initData();
        },

        methods:{
            initData(){
                this.getSerails();
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
