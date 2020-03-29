<template>
    <div class="container">
        <div class="handle-box">
            <el-button type="success" icon="el-icon-plus" @click="onAddNewTap">新增</el-button>
            <el-button style="float: right;" type="primary" @click="refreshTap">刷新</el-button>
        </div>

        <el-form :model="searchForm" ref="searchForm" label-width="100px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="名称" prop="goodsName">
                        <el-input v-model="searchForm.goodsName" clearable placeholder="请输入物资名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="系列">
                        <el-select v-model="searchForm.isSerial" clearable placeholder="请选择是否有系列" style="width: 100%;">
                            <el-option v-for="item in serialStatus" :key="item.id" :label="item.value"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="分类" prop="categoryId ">
                        <category-selection @click="categoryClick"></category-selection>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <el-table :data="tableData" border stripe>
            <el-table-column label="名称" prop="goodsName"></el-table-column>
            <!--目前不展示-->
            <!--<el-table-column prop="goodsId" label="物资ID" width="170"></el-table-column>-->
            <el-table-column label="物资主图" width="120" align="center" header-align="left">
                <template slot-scope="scope">
                    <img style="height: 80px; width: 80px;background-color: white;" :preview="scope.$index"
                         :src="pictureUrl + scope.row.goodsId + '/'+scope.row.mainPicture">
                </template>
            </el-table-column>
            <el-table-column label="物资价格" width="160" align="right" header-align="left">
                <template slot-scope="props">
                    <div v-if="props.row.specNowPrice>0.005">
                        <p>₦{{formatPrice(props.row.specNowPrice)}}</p>
                        <p>￥{{formatPrice(props.row.specNowPrice/nalaRate)}}</p>
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
            <el-table-column label="分类">
                <template slot-scope="props">
                    {{getCategoryName(props.row.categoryId)}}
                </template>
            </el-table-column>
            <el-table-column label="状态" width="80">
                <template slot-scope="props">
                    {{getStatusName(props.row.status)}}
                </template>
            </el-table-column>
            <el-table-column label="备注" prop="memo"></el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="props">
                    <p>
                        <el-button type="primary" @click="doInfos(props.row, 2)">查看●修改</el-button>
                    </p>
                    <!--有系列、锁定库存不允许删除物资-->
                    <p style="margin-top: 5px;" v-if="canDelete(props.row)">
                        <el-button type="danger" style="width: 90px;" @click="deleteTap(props.row)">删除</el-button>
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="系列" width="80">
                <template slot-scope="props">
                    <el-button v-if="props.row.isSerial==='Y'" type="primary" @click="serialTap(props.row)">&gt;&gt;
                    </el-button>
                    <el-button v-else type="success" @click="addSerialTap(props.row)">新增</el-button>
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
    import {
        deleteGooTGoodsinfoById,
        getAllConfig,
        listAllUnitinfos,
        listGoodsinfosByConditions
    } from "../../../util/module";
    import * as cfg from "../../../config/cfg";
    import _String from '../../../util/string';
    import CategorySelection from '../../common/selection/CategorySelection';

    export default {
        name: "goodsinfoAction",
        components: {CategorySelection},
        data() {
            return {
                searchForm: {
                    categoryId: null,
                    goodsName: null,
                    isSerial: null,
                    begNowPrice: null,
                    endNowPrice: null,
                    status: null
                },
                serialStatus: [
                    {id: 'N', value: '无'},
                    {id: 'Y', value: '有'},
                ],
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
                units: [],
                dollarRate:1,
                nalaRate:1,
                categoryList:[],
            }
        },

        watch: {
            searchForm: {
                handler() {
                    this.currentPage=1;
                    this.initData();
                },
                deep: true
            }
        },

        created() {
            this.pictureUrl = cfg.service.uploadUrl + '/';
            this.nalaRate=localStorage.getItem('nalaRate')||1;
            this.dollarRate=localStorage.getItem('dollarRate')||1;
            this.getUnits();
            this.allConfig();
            this.initData();
        },

        methods: {
            initData() {
                this.goodsList();
            },

            refreshTap(){
                this.initData();
            },

            allConfig(){
                let params={};
                getAllConfig(this, params).then(
                    res=>{
                        let categoryList=res.data.categoryList;
                        this.categoryList=categoryList;
                    },
                    res=>{

                    }
                ).catch();
            },

            addSerialTap(item) {
                this.$router.push({path: 'goodsSerail', query: {goodsId: item.goodsId, create: true}});
            },

            serialTap(item) {
                this.$router.push({path: 'goodsSerail', query: {goodsId: item.goodsId}});
            },

            categoryClick(nodeInfo) {
                this.searchForm.categoryId = nodeInfo.categoryId;
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

            getUnitName(unitId) {
                let unitInfo = {};
                this.units.forEach(item => {
                    if (item.unitId === unitId) {
                        unitInfo = item;
                        return false;
                    }
                });
                return unitInfo.unitName;
            },

            getCategoryName(categoryId){
                let categoryInfo={};
                this.categoryList.forEach(item=>{
                    if (item.categoryId === categoryId) {
                        categoryInfo=item;
                        return false;
                    }
                });
                return categoryInfo.categoryName;
            },

            //格式化金额
            formatPrice(price) {
                return _String.number_format(price, 2);
            },

            deleteTap(item) {
                this.$confirm('此操作将删除物资，是否确认?', '删除物资', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(
                    () => {
                        this.deleteCommit(item);
                    }
                );
            },

            deleteCommit(item) {
                let params = {};
                params.goodsId = item.goodsId;
                deleteGooTGoodsinfoById(this, params).then(
                    res => {
                        this.$message.success('删除成功');
                        this.initData();
                    },
                    res => {
                    }
                ).catch();
            },

            canDelete(item) {
                //有如下状态，不可删除
                //上架状态
                if (item.status === '1') {
                    return false;
                }

                //锁定库存
                if (item.lockNum !=null && item.lockNum !== 0) {
                    return false;
                }

                //有系列
                if (item.isSerial === 'Y') {
                    return false;
                }

                return true;
            },

            goodsList() {
                let params = {};
                params.currentPage = this.currentPage;
                params.pageSize = this.pageSize;
                params.categoryId = this.searchForm.categoryId;
                params.goodsName = this.searchForm.goodsName;
                params.isSerial = this.searchForm.isSerial;
                params.begNowPrice = this.searchForm.begNowPrice;
                params.endNowPrice = this.searchForm.endNowPrice;
                params.status = this.searchForm.status;
                listGoodsinfosByConditions(this, params).then(
                    res => {
                        if (res.returnCode === 400) {
                            this.tableData = [];
                            return;
                        }
                        this.AllCount = res.data.total;
                        this.tableData = res.data.records;
                    },
                    res => {
                        console.log(res);//debug
                    }
                ).catch(
                    error => {
                        console.log(error);
                    }
                );
            },

            onAddNewTap() {
                this.$router.push({path: '/goodsInfos', query: {create: true}});
            },

            handleSizeChange() {
                this.initData();
            },

            handleCurrentChange(options) {
                this.currentPage = options;
                this.initData();
            },

            doInfos(item) {
                let goodsId = item.goodsId;
                this.$router.push({path: '/goodsInfos', query: {goodsId: goodsId}});
            },
        }
    }
</script>

<style scoped>

</style>
