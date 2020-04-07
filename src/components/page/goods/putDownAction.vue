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
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="创建者">
                            <span>{{ props.row.createTellerId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ toDate(props.row.createTime) }}</span>
                        </el-form-item>
                        <el-form-item label="修改者">
                            <span>{{ props.row.updateTellerId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{ toDate(props.row.updateTime) }}</span>
                        </el-form-item>
                        <el-form-item label="销售数量">
                            <span>{{ props.row.specSellCount}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="系列名称" prop="goodsName"></el-table-column>
            <!--<el-table-column prop="goodsId" label="物资ID"></el-table-column>-->
            <el-table-column label="系列主图" width="120" align="center" header-align="left">
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
            <el-table-column label="库存" width="180px" align="right" header-align="left">
                <template slot-scope="props">
                    <p>
                        外部库存：{{props.row.stockNum}}&nbsp;
                        <i v-if="props.row.status==='1'" class="el-icon-edit icon-button" title="修改" @click="modiStock(props.row, 3)"></i>
                    </p>
                    <p style="color: red;">
                        外部锁定库存：{{props.row.lockNum==null?0:props.row.lockNum}}&nbsp;
                        <i v-if="props.row.status==='1'" class="el-icon-edit icon-button" title="修改" @click="modiStock(props.row, 4)"></i>
                    </p>
                    <p>
                        内部库存：{{props.row.innerStockNum==null?0:props.row.innerStockNum}}&nbsp;
                        <i v-if="props.row.status==='1'" class="el-icon-edit icon-button" title="修改" @click="modiStock(props.row, 5)"></i>
                    </p>
                    <p style="color: red;">
                        内部锁定库存：{{props.row.innerLockNum==null?0:props.row.innerLockNum}}&nbsp;
                        <i v-if="props.row.status==='1'" class="el-icon-edit icon-button" title="修改" @click="modiStock(props.row, 6)"></i>
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="型号" prop="goodsType"></el-table-column>
            <el-table-column label="单位" width="80">
                <template slot-scope="props">
                    {{getUnitName(props.row.unitId)}}
                </template>
            </el-table-column>
            <el-table-column label="分类序号" width="70px" prop="cq" align="right" header-align="left"></el-table-column>
            <el-table-column label="首页序号" width="70px" align="right" header-align="left">
                <template slot-scope="props">
                    {{props.row.pq}}
                    <i v-if="props.row.status==='1'" class="el-icon-edit icon-button" title="修改" @click="modifyTap(props.row, 7)"></i>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="80">
                <template slot-scope="props">
                    {{getStatusName(props.row.status)}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
                <template slot-scope="props">
                    <p>
                        <el-button v-if="props.row.status==='1'" type="primary" @click="modifyTap(props.row)">修改
                        </el-button>
                    </p>
                    <p style="margin-top: 3px;">
                        <el-button v-if="props.row.status==='1'" type="warning" @click="putDownTap(props.row)">下架
                        </el-button>
                    </p>
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
            <el-form :model="dialogForm" label-width="120px" ref="dialogForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="物资名称" prop="goodsName">
                            {{dialogForm.goodsName}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="flag===2">
                    <el-col :span="24">
                        <el-form-item label="上架价格" prop="specNowPrice"
                                      :rules="[{required:true, message:'请输入上架价格', trigger: 'blur'},{validator:checkCount, trigger:'blur'}]">
                            <el-row>
                                <el-col :span="1">
                                    <span>₦</span>
                                </el-col>
                                <el-col :span="23">
                                    <el-input class="tellerBuyPriceClass" v-model="dialogForm.specNowPrice"></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="flag===7">
                    <el-col :span="24">
                        <el-form-item label="首页序号" prop="pq"
                                      :rules="[{required:true, message:'请输入首页序号', trigger: 'blur'},{validator:checkPq, trigger:'blur'}]">
                            <el-input v-model="dialogForm.pq" maxlength="8"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog_footer">
                <el-button @click="dialogVisible=false">取消</el-button>
                <el-button type="primary" @click="dialogFormConfirm">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog :title="dialogTitle" :visible.sync="stockVisible">
            <el-form :model="stockForm" label-width="120px" ref="stockForm">
                <el-row v-if="flag===3">
                    <el-col :span="24">
                        <el-form-item label="对外库存" prop="stockNumEdit"
                                      :rules="[{validator: checkStockNumEdit, trigger: 'blur'} ]">
                            <el-row>
                                <el-col :span="4">
                                    {{stockForm.stockNum}}
                                </el-col>
                                <el-col :span="3">
                                    修改量:
                                </el-col>
                                <el-col :span="17">
                                    <el-input v-model="stockForm.stockNumEdit" placeholder="正数表示增加量，负数表示减少量"></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="flag===4">
                    <el-col :span="24">
                        <el-form-item label="对外锁定库存" prop="lockNumEdit"
                                      :rules="[{validator: checkLockNumEdit, trigger: 'blur'} ]">
                            <el-row>
                                <el-col :span="4">
                                    {{stockForm.lockNum}}&nbsp;
                                </el-col>
                                <el-col :span="3">
                                    修改量:
                                </el-col>
                                <el-col :span="17">
                                    <el-input v-model="stockForm.lockNumEdit"  placeholder="正数表示增加量，负数表示减少量"></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="flag===5">
                    <el-col :span="24">
                        <el-form-item label="内部库存" prop="innerStockNumEdit"
                                      :rules="[{validator: checkInnerStockNumEdit, trigger: 'blur'} ]">
                            <el-row>
                                <el-col :span="4">
                                    {{stockForm.innerStockNum}}
                                </el-col>
                                <el-col :span="3">
                                    修改量:
                                </el-col>
                                <el-col :span="17">
                                    <el-input v-model="stockForm.innerStockNumEdit"  placeholder="正数表示增加量，负数表示减少量"></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" v-if="flag===6">
                        <el-form-item label="内部锁定库存" prop="innerLockNumEdit"
                                      :rules="[{validator: checkInnerLockNumEdit, trigger: 'blur'} ]">
                            <el-row>
                                <el-col :span="4">
                                    {{stockForm.innerLockNum}}
                                </el-col>
                                <el-col :span="3">
                                    修改量:
                                </el-col>
                                <el-col :span="17">
                                    <el-input v-model="stockForm.innerLockNumEdit"  placeholder="正数表示增加量，负数表示减少量"></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog_footer">
                <el-button @click="stockVisible=false">取消</el-button>
                <el-button type="primary" @click="stockFormConfirm">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import CategorySelection from "../../common/selection/CategorySelection";
    import * as cfg from "../../../config/cfg";
    import {listAllUnitinfos, listSerialsByConditions, putDownIndex, uptPriceAndStock} from "../../../util/module";
    import _String from '../../../util/string';
    import GwRegular from '@/Gw/GwRegular.js';
    import {deepCopy} from "../../../Gw/GwDateUtil";
    import {toDate} from "../../../tool/Format";

    export default {
        name: "goodsSelection",
        components: {
            CategorySelection
        },
        data() {
            return {
                searchForm: {
                    categoryId: null,
                    goodsName: null,
                    goodsType: null,
                    status: '1',
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
                units: [],
                sysInstDepartment: {
                    departmentId: null
                },
                dollarRate: 1,
                nalaRate: 1,
                //2.价格修改  3.外部库存修改  4.外部锁定库存修改  5.内部库存修改  6.内部锁定库存修改  7.首页序号修改
                flag: 1,
                dialogVisible: false,
                dialogForm: {
                    goodsName: null,
                    specNowPrice:null,
                    stockNum: null,
                    lockNum: null,
                    innerLockNum: null,
                    innerStockNum: null,
                    stockNumEdit: null,
                    lockNumEdit: null,
                    innerLockNumEdit: null,
                    innerStockNumEdit: null,
                    pq:null
                },
                dialogFormOld:{},
                stockVisible:false,
                stockForm:{
                    goodsName: null,
                    specNowPrice:null,
                    stockNum: null,
                    lockNum: null,
                    innerLockNum: null,
                    innerStockNum: null,
                    stockNumEdit: null,
                    lockNumEdit: null,
                    innerLockNumEdit: null,
                    innerStockNumEdit: null,
                },
                stockFormOld:{},
            };
        },

        computed: {
            dialogTitle() {
                let str='';
                switch (this.flag) {
                    case 1:
                        str='新增';
                        break;
                    case 2:
                        str='修改';
                        break;
                    case 3:
                        str='修改外部库存';
                        break;
                    case 4:
                        str='修改外部锁定库存';
                        break;
                    case 5:
                        str='修改内部库存';
                        break;
                    case 6:
                        str='修改内部锁定库存';
                        break;
                    case 7:
                        str='修改首页序号';
                        break;
                    default:
                }
                return str;
            }
        },

        watch: {
            searchForm: {
                handler() {
                    this.currentPage = 1;
                    this.initData();
                },
                deep: true
            }
        },

        created() {
            this.sysInstDepartment = JSON.parse(localStorage.getItem("sysInstDepartment") || {});
            this.pictureUrl = cfg.service.uploadUrl + '/';
            this.nalaRate = localStorage.getItem('nalaRate') || 1;
            this.dollarRate = localStorage.getItem('dollarRate') || 1;
            this.getUnits();
            this.initData();
        },

        methods: {
            initData() {
                this.getSerails();
            },

            toDate(dateStr) {
                return toDate(dateStr);
            },

            checkStockNumEdit(rule, value, callback){
                if (value == null ||value===''|| value === '0') {
                    callback();
                    return;
                }
                if (!GwRegular.numeric2_.test(value)) {
                    callback(new Error('请输入数字，最多两位小数'));
                    return;
                }
                if (parseFloat(value) + parseFloat(this.stockForm.stockNum+'')<-0.005) {
                    callback(new Error('修改后数量不可为负数'));
                    return;
                }
                callback();
            },

            checkPq(rule, value, callback){
                if (value == null ||value===''|| value === '0') {
                    callback();
                    return;
                }
                if (!GwRegular.num8.test(value)) {
                    callback(new Error('请输入整数，最多8位'));
                    return;
                }
                callback();
            },

            checkLockNumEdit(rule, value, callback){
                if (value == null ||value===''|| value === '0') {
                    callback();
                    return;
                }
                if (!GwRegular.numeric2_.test(value)) {
                    callback(new Error('请输入数字，最多两位小数'));
                    return;
                }
                if (parseFloat(value) + parseFloat(this.stockForm.lockNum+'')<-0.005) {
                    callback(new Error('修改后数量不可为负数'));
                    return;
                }
                if (parseFloat(value) + parseFloat(this.stockForm.lockNum+'') - parseFloat(this.stockForm.stockNum+'')>0.005) {
                    callback(new Error('外部锁定库存不能大于外部库存！'));
                    return;
                }
                callback();
            },

            checkInnerStockNumEdit(rule, value, callback){
                if (value == null ||value===''|| value === '0') {
                    callback();
                    return;
                }
                if (!GwRegular.numeric2_.test(value)) {
                    callback(new Error('请输入数字，最多两位小数'));
                    return;
                }
                if (parseFloat(value) + parseFloat(this.stockForm.innerStockNum+'')<-0.005) {
                    callback(new Error('修改后数量不可为负数'));
                    return;
                }
                callback();
            },

            checkInnerLockNumEdit(rule, value, callback){
                if (value == null ||value===''|| value === '0') {
                    callback();
                    return;
                }
                if (!GwRegular.numeric2_.test(value)) {
                    callback(new Error('请输入数字，最多两位小数'));
                    return;
                }
                if (parseFloat(value) + parseFloat(this.stockForm.innerLockNum+'')<-0.005) {
                    callback(new Error('修改后数量不可为负数'));
                    return;
                }
                if (parseFloat(value) + parseFloat(this.stockForm.innerLockNum+'') - parseFloat(this.stockForm.innerStockNum+'')>0.005) {
                    callback(new Error('内部锁定库存不能大于内部库存！'));
                    return;
                }
                callback();
            },

            dialogFormConfirm(){
                this.$refs.dialogForm.validate((valid) => {
                    if (valid) {
                        this.formCommit();
                    } else {
                        return false;
                    }
                });
            },

            formCommit() {
                let params = {};
                if (this.flag === 1) {

                }

                if (this.flag === 2 || this.flag===7) {
                    //修改
                    params.specGoodsId = this.dialogForm.specGoodsId;
                    params.version = this.dialogForm.version;
                    if (this.dialogForm.specNowPrice !== this.dialogFormOld.specNowPrice) {
                        params.specNowPrice = this.dialogForm.specNowPrice;
                    }
                    if (this.dialogForm.stockNumEdit&&this.dialogForm.stockNumEdit!=='0') {
                        params.stockNum = this.dialogForm.stockNumEdit;
                    }
                    if (this.dialogForm.lockNumEdit&&this.dialogForm.lockNumEdit!=='0') {
                        params.lockNum = this.dialogForm.lockNumEdit;
                    }
                    if (this.dialogForm.innerLockNumEdit&&this.dialogForm.innerLockNumEdit!=='0') {
                        params.innerLockNum = this.dialogForm.innerLockNumEdit;
                    }
                    if (this.dialogForm.innerStockNumEdit&&this.dialogForm.innerStockNumEdit!=='0') {
                        params.innerStockNum = this.dialogForm.innerStockNumEdit;
                    }
                    if (this.dialogForm.pq!==this.dialogFormOld.pq) {
                        params.pq = this.dialogForm.pq;
                    }
                    uptPriceAndStock(this, params).then(
                        res => {
                            this.$message.success('修改成功');
                            this.initData();
                            this.dialogVisible = false;
                        },
                        res => {
                        }
                    ).catch();
                }
            },

            stockFormConfirm(){
                this.$refs.stockForm.validate((valid) => {
                    if (valid) {
                        this.stockFormCommit();
                    } else {
                        return false;
                    }
                });
            },

            stockFormCommit(){
                let change=false;
                let params={};
                params.specGoodsId = this.stockForm.specGoodsId;
                params.version = this.stockForm.version;
                if (this.stockForm.stockNumEdit&&this.stockForm.stockNumEdit!=='0') {
                    params.stockNum = this.stockForm.stockNumEdit;
                    change=true;
                }
                if (this.stockForm.lockNumEdit&&this.stockForm.lockNumEdit!=='0') {
                    params.lockNum = this.stockForm.lockNumEdit;
                    change=true;
                }
                if (this.stockForm.innerLockNumEdit&&this.stockForm.innerLockNumEdit!=='0') {
                    params.innerLockNum = this.stockForm.innerLockNumEdit;
                    change=true;
                }
                if (this.stockForm.innerStockNumEdit&&this.stockForm.innerStockNumEdit!=='0') {
                    params.innerStockNum = this.stockForm.innerStockNumEdit;
                    change=true;
                }
                if (change === false) {
                    this.$message.error('没有修改量，无需提交！');
                    return;
                }
                uptPriceAndStock(this, params).then(
                    res => {
                        this.$message.success('修改成功');
                        this.initData();
                        this.stockVisible = false;
                    },
                    res => {
                    }
                ).catch();
            },

            checkCount(rule, value, callback) {
                if (!GwRegular.numeric2.test(value)) {
                    callback(new Error('请输入数字，最多两位小数!'));
                }
                callback();
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

            putDownTap(item) {
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

            putDownCommit(item) {
                let params = {};
                params.goodsList = [];
                let paramsItem = {};
                paramsItem.recycleSeq = "1";
                paramsItem.specGoodsId = item.specGoodsId;
                params.goodsList.push(paramsItem);
                putDownIndex(this, params).then(
                    res => {
                        this.$message.success('下架成功');
                        this.initData();
                    },
                    res => {

                    }
                ).catch();
            },

            modifyTap(item, flag) {
                if (this.$refs.dialogForm) {
                    this.$refs.dialogForm.clearValidate();
                }
                this.dialogForm={
                    goodsName: null,
                    specNowPrice:null,
                    stockNum: null,
                    lockNum: null,
                    innerLockNum: null,
                    innerStockNum: null,
                    stockNumEdit: null,
                    lockNumEdit: null,
                    innerLockNumEdit: null,
                    innerStockNumEdit: null,
                    pq:null,
                };
                if (flag) {
                    this.flag=flag;
                }else{
                    this.flag = 2;
                }
                this.dialogForm.specGoodsId=item.specGoodsId;
                this.dialogForm.goodsName = item.goodsName;
                this.dialogForm.version=item.version;
                this.dialogForm.specNowPrice = item.specNowPrice;
                this.dialogForm.stockNum = item.stockNum;
                this.dialogForm.lockNum = item.lockNum;
                this.dialogForm.innerLockNum = item.innerLockNum;
                this.dialogForm.innerStockNum = item.innerStockNum;
                this.dialogForm.pq=item.pq||0;
                this.dialogFormOld=deepCopy(this.dialogForm);
                this.dialogVisible = true;
            },

            modiStock(item, flag){
                if (this.$refs.stockForm) {
                    this.$refs.stockForm.clearValidate();
                }
                this.stockForm={
                    goodsName: null,
                    specNowPrice:null,
                    stockNum: null,
                    lockNum: null,
                    innerLockNum: null,
                    innerStockNum: null,
                    stockNumEdit: null,
                    lockNumEdit: null,
                    innerLockNumEdit: null,
                    innerStockNumEdit: null,
                };
                if (flag === 3) {
                    this.flag = 3;
                }
                if (flag === 4) {
                    this.flag = 4;
                }
                if (flag === 5) {
                    this.flag = 5;
                }
                if (flag === 6) {
                    this.flag = 6;
                }
                this.stockForm.specGoodsId=item.specGoodsId;
                this.stockForm.goodsName = item.goodsName;
                this.stockForm.version=item.version;
                this.stockForm.stockNum = item.stockNum;
                this.stockForm.lockNum = item.lockNum;
                this.stockForm.innerLockNum = item.innerLockNum;
                this.stockForm.innerStockNum = item.innerStockNum;
                this.stockFormOld=deepCopy(this.stockForm);
                this.stockVisible = true;
            },

            getSerails() {
                let params = {};
                params.currentPage = this.currentPage;
                params.pageSize = this.pageSize;
                params.categoryId = this.searchForm.categoryId;
                params.goodsName = this.searchForm.goodsName;
                params.goodsType = this.searchForm.goodsType;
                params.status = this.searchForm.status;
                listSerialsByConditions(this, params).then(
                    res => {
                        if (res.returnCode === 400) {
                            this.tableData = [];
                            return;
                        }
                        this.AllCount = res.data.total;
                        this.tableData = res.data.records;
                    },
                    res => {

                    }
                ).catch();
            },

            categoryClick(nodeInfo) {
                this.searchForm.categoryId = nodeInfo.categoryId;
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

            dbCliick(item) {
                console.log('item', item);
                this.$emit('row-dblclick', item);
            },
        }
    }
</script>

<style scoped>
    .tellerBuyPriceClass {
    }

    .icon-button:hover{
        cursor: pointer;
    }

    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
