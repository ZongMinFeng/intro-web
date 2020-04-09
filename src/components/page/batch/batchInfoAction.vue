<template>
    <div class="container">
        <el-form :model="searchForm" ref="searchForm" label-width="80px">
            <el-row>
                <!--暂时不用单据号查询批次-->
                <!--<el-col :span="6">-->
                    <!--<el-form-item label="单据号" prop="batchId">-->
                        <!--<el-input v-model="searchForm.batchId" clearable placeholder="请输入单据号"></el-input>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="6">-->
                    <!--<el-button type="primary" @click="getBatchInfo">查询</el-button>-->
                <!--</el-col>-->
                <!--暂时替代单据号占位 begin-->
                <el-col :span="6">
                    &nbsp;
                </el-col>
                <el-col :span="6">
                    &nbsp;
                </el-col>
                <!--暂时替代单据号占位 end-->
                <el-col :span="6">
                    &nbsp;
                </el-col>
                <el-col :span="6">
                    <el-button v-if="batchInfo.batchFlag==='I'&&(batchInfo.status==='9'||batchInfo.status==='8')"
                               type="primary" @click="uptBatchInfoTap" style="float: right; margin-left: 5px;">提交运单号
                    </el-button>
                    <el-button v-if="batchInfo.status==='9'||batchInfo.status==='8'" type="success" icon="el-icon-plus"
                               @click="onAddNewTap" style="float: right;">录入物资
                    </el-button>
                </el-col>
            </el-row>
        </el-form>

        <div class="batchInfoDiv">
            <el-row style="margin-top: 10px;">
                <el-col :span="6" v-if="batchInfo.batchFlag==='I'">集装箱或批次号:<span class="batchInfoCol">{{batchInfo.batchName}}</span></el-col>
                <el-col :span="6" v-if="batchInfo.batchFlag==='O'">批次号:<span class="batchInfoCol">{{batchInfo.batchName}}</span></el-col>
                <el-col :span="6">采购区域:<span class="batchInfoCol">{{getBatchFlagName(batchInfo.batchFlag)}}</span></el-col>
                <el-col :span="6">提单号:<span class="batchInfoCol">{{batchInfo.ladingBill}}</span></el-col>
                <el-col :span="6">币种:<span class="batchInfoCol">{{batchCnyName(batchInfo.batchCny)}}</span></el-col>
            </el-row>
            <el-row style="margin-top: 5px;">
                <el-col :span="6">
                    创建者:<span class="batchInfoCol">{{batchInfo.createTellerId}}</span>
                </el-col>
                <el-col :span="6">
                    创建时间:<span class="batchInfoCol">{{toDate(batchInfo.createTime)}}</span>
                </el-col>
            </el-row>
            <el-row v-if="batchInfo.batchFlag==='I'" style="margin-top: 20px;">
                <el-steps :active="getStep(batchInfo.status)" finish-status="success" process-status="finish">
                    <el-step title="初始"></el-step>
                    <el-step title="海运"></el-step>
                    <el-step title="物资正在入库"></el-step>
                    <el-step title="物资已入库"></el-step>
                    <el-step title="本地价格提交中"></el-step>
                    <el-step title="本地价格已提交"></el-step>
                    <el-step title="建议价格计算中"></el-step>
                    <el-step title="建议价格已计算"></el-step>
                    <el-step title="零售价申报中"></el-step>
                    <el-step title="零售价已申报"></el-step>
                    <el-step title="物资上架中"></el-step>
                    <el-step title="上架"></el-step>
                </el-steps>
            </el-row>
            <el-row v-if="batchInfo.batchFlag==='O'" style="margin-top: 20px;">
                <el-steps :active="getStep(batchInfo.status)" finish-status="success" process-status="finish">
                    <el-step title="初始"></el-step>
                    <el-step title="物资正在入库"></el-step>
                    <el-step title="物资已入库"></el-step>
                    <el-step title="本地价格提交中"></el-step>
                    <el-step title="本地价格已提交"></el-step>
                    <el-step title="建议价格计算中"></el-step>
                    <el-step title="建议价格已计算"></el-step>
                    <el-step title="零售价申报中"></el-step>
                    <el-step title="零售价已申报"></el-step>
                    <el-step title="物资上架中"></el-step>
                    <el-step title="上架"></el-step>
                </el-steps>
            </el-row>
        </div>

        <el-table :data="tableData" border stripe>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <!--暂时不显示ID-->
                        <!--<el-form-item label="物资系列ID">-->
                            <!--<span>{{ props.row.batchGoodsId }}</span>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="主物资ID">-->
                            <!--<span>{{ props.row.goodsId }}</span>-->
                        <!--</el-form-item>-->
                        <el-form-item label="创建者">
                            <span>{{ props.row.createTellerId }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{toDate(props.row.createTime)}}</span>
                        </el-form-item>
                        <el-form-item label="修改者">
                            <span>{{ props.row.updateTellerId }}</span>
                        </el-form-item>
                        <el-form-item label="修改时间">
                            <span>{{toDate(props.row.updateTime)}}</span>
                        </el-form-item>
                        <el-form-item label="采购人员">
                            <span>{{props.row.putinTellerId}}</span>
                        </el-form-item>
                        <el-form-item label="运单号提交人员">
                            <span>{{props.row.ladingTellerId}}</span>
                        </el-form-item>
                        <el-form-item label="本地金额提交人员">
                            <span>{{props.row.localTellerId}}</span>
                        </el-form-item>
                        <el-form-item label="建议价提交人员">
                            <span>{{props.row.suggestTellerId}}</span>
                        </el-form-item>
                        <el-form-item label="零售价提交人员">
                            <span>{{props.row.reportTellerId}}</span>
                        </el-form-item>
                        <el-form-item label="物资上架人员">
                            <span>{{props.row.putonTellerId}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column key="1" label="名称" prop="goodsName"></el-table-column>
            <el-table-column label="系列主图" width="120" align="center" header-align="left">
                <template slot-scope="scope">
                    <img style="height: 50px; width: 50px;background-color: white;" :preview="scope.$index"
                         :src="pictureUrl + scope.row.goodsId + '/'+scope.row.mainPicture">
                </template>
            </el-table-column>
            <el-table-column key="3" label="采购价格" width="140" align="right" header-align="left">
                <template slot-scope="props">
                    <div v-if="batchInfo.batchCny==='1'">
                        <p>₦{{formatPriceDot(props.row.tellerBuyPrice)}}</p>
                    </div>
                    <div v-if="batchInfo.batchCny==='2'">
                        <p>￥{{formatPriceDot(props.row.tellerBuyPrice)}}</p>
                        <p>₦{{formatPriceDot(props.row.tellerBuyPrice*nalaRate)}}</p>
                    </div>
                    <div v-if="batchInfo.batchCny==='3'">
                        <p>${{formatPriceDot(props.row.tellerBuyPrice)}}</p>
                        <p>₦{{formatPriceDot(props.row.tellerBuyPrice*dollarRate)}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column key="4" label="采购数量" prop="tellerBuyCount" align="right" header-align="left"></el-table-column>
            <el-table-column key="5" label="采购单位" prop="buyBaseUnit" width="80px"></el-table-column>
            <el-table-column key="6" v-if="showRealCount" label="已入库数量" align="right" header-align="left">
                <template slot-scope="props">
                    {{props.row.realCount}}
                </template>
            </el-table-column>
            <el-table-column key="7" v-if="isShow(batchInfo.status, 'reportPrice')" label="内部数量" align="right" header-align="left">
                <template slot-scope="props">
                    {{props.row.companyCount}}
                </template>
            </el-table-column>
            <el-table-column key="8"
                             v-if="batchInfo.status!=='9'&&batchInfo.status!=='8'&&batchInfo.status!=='7'&&batchInfo.status!=='A'"
                             label="本地价格" align="right" header-align="left">
                <template slot-scope="props">
                    ₦{{formatPriceDot(props.row.localPrice)}}
                </template>
            </el-table-column>
            <el-table-column key="9" v-if="isShow(batchInfo.status, 'cacSuggestPrice')" label="建议价格" align="right" header-align="left">
                <template slot-scope="props">
                    ₦{{formatPriceDot(props.row.suggestPrice)}}
                </template>
            </el-table-column>
            <el-table-column key="10" v-if="isShow(batchInfo.status, 'reportPrice')" label="零售价" align="right" header-align="left">
                <template slot-scope="props">
                    ₦{{formatPriceDot(props.row.reportPrice)}}
                </template>
            </el-table-column>
            <el-table-column key="12" v-if="showOperation" label="操作" width="160">
                <template slot-scope="props">
                    <el-button type="primary" @click="modifyTap(props.row)">修改</el-button>
                    <el-button type="danger" @click="deleteTap(props.row)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column key="13" v-if="showRealCountIns"
                             label="入库数量      操作" width="200">
                <template slot-scope="props">
                    <el-input v-model="realCountIns[props.$index]" style="width: 80px; margin-right: 8px;"></el-input>
                    <el-button v-if="(!props.row.realCount)||props.row.realCount===''" type="primary" @click="changeRealCount(props.row, props.$index)">入库</el-button>
                    <el-button v-else type="danger" @click="changeRealCount(props.row, props.$index)">入库</el-button>
                </template>
            </el-table-column>
            <el-table-column key="14" v-if="showLocalPriceOperation" label="本地价格      操作" width="220">
                <template slot-scope="props">
                    <el-input v-model="localPrices[props.$index]" style="width: 78px; margin-right: 8px;"></el-input>
                    <el-button v-if="props.row.localPrice==null||props.row.localPrice===''" type="primary" @click="doSubmitLocalPrice(props.row, props.$index)">提交本地价格</el-button>
                    <el-button v-else type="danger" @click="doSubmitLocalPrice(props.row, props.$index)">提交本地价格</el-button>
                </template>
            </el-table-column>
            <el-table-column key="15" v-if="showSuggestPriceOperation" label="建议价格      操作" width="220">
                <template slot-scope="props">
                    <el-input v-model="suggestPrices[props.$index]" style="width: 78px; margin-right: 8px;"></el-input>
                    <el-button v-if="props.row.suggestPrice==null||props.row.suggestPrice===''" type="primary" @click="doSuggestPrice(props.row, props.$index)">提交建议价格</el-button>
                    <el-button v-else type="danger" @click="doSuggestPrice(props.row, props.$index)">提交建议价格</el-button>
                </template>
            </el-table-column>
            <el-table-column key="16" v-if="batchInfo.status==='5'||batchInfo.status==='D'||batchInfo.status==='4'"
                             label="零售价  内部数量 操作" width="260">
                <template slot-scope="props">
                    <el-input v-model="reportPrices[props.$index]" style="width: 78px; margin-right: 4px;"></el-input>
                    <el-input v-model="companyCounts[props.$index]" style="width: 68px; margin-right: 8px;"></el-input>
                    <el-button v-if="props.row.reportPrice==null||props.row.reportPrice===''" type="primary" @click="doReportPrices(props.row, props.$index)">提交零售</el-button>
                    <el-button v-else type="danger" @click="doReportPrices(props.row, props.$index)">提交零售</el-button>
                </template>
            </el-table-column>
            <el-table-column key="17" v-if="batchInfo.status==='4'||batchInfo.status==='E'||batchInfo.status==='1'"
                             label="操作"
                             width="80">
                <template slot-scope="props">
                    <el-button v-if="props.row.status==null" type="danger" @click="doPutonBatch(props.row)">上架</el-button>
                </template>
            </el-table-column>
            <el-table-column key="18" label="备注" prop="memo"></el-table-column>
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
                    <el-form-item label="物资名称" prop="batchGoodsId"
                                  :rules="[{required:true, message:'请选择物资', trigger: 'blur'}]">

                        <!--不允许手输入-->
                        <!--<el-col :span="15">-->
                        <!--<el-input v-model="dialogForm.batchGoodsId" style="display: inline-block;"></el-input>-->
                        <!--</el-col>-->
                        <el-col :span="6" v-if="dialogForm.goodsName">
                            {{dialogForm.goodsName}}
                        </el-col>
                        <el-col :span="3">
                            <el-button v-if="flag===1" type="primary" @click="choiceTap">选择</el-button>
                        </el-col>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="采购价格" prop="tellerBuyPrice"
                                      :rules="[{required:true, message:'请输入采购价格', trigger: 'blur'},{validator:checkCount, trigger:'blur'}]">
                            <span>{{tellerBuyPriceUnit}}</span>&nbsp;<el-input class="tellerBuyPriceClass"
                                                                               v-model="dialogForm.tellerBuyPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="采购数量" prop="count"
                                      :rules="[{required:true, message:'请输入采购数量', trigger: 'blur'}, {validator:checkCount, trigger:'blur'}]">
                            <el-input v-model="dialogForm.count"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-select v-model="dialogForm.unitName" placeholder="请选择单位"
                                   style="width: 100%;">
                            <el-option v-for="item in units" :key="item.unitName" :label="item.unitName"
                                       :value="item.unitName"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row
                    v-show="dialogForm.unitName&&dialogForm.buyBaseUnit &&dialogForm.unitName!==dialogForm.buyBaseUnit ">
                    <el-form-item label="单位换算" prop="thisChange"
                                  :rules="[{validator:checkthisChange, trigger:'blur'}]">
                        <el-col :span="1">&nbsp;</el-col>
                        <el-col :span="1">1</el-col>
                        <el-col :span="4">{{dialogForm.unitName}}</el-col>
                        <el-col :span="1">=</el-col>
                        <el-col :span="4">
                            <el-input v-model="dialogForm.thisChange"></el-input>
                        </el-col>
                        <el-col :span="1">&nbsp;</el-col>
                        <el-col :span="4">{{dialogForm.buyBaseUnit}}</el-col>
                    </el-form-item>
                </el-row>
                <div class="list-name">备注信息</div>
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-input
                            type="textarea"
                            class="goods-memo"
                            :autosize="{ minRows: 2}"
                            placeholder="请输入备注信息"
                            v-model="dialogForm.memo">
                        </el-input>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog_footer">
                <el-button @click="dialogVisible=false">取消</el-button>
                <el-button type="primary" @click="dialogFormConfirm">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="选择物资" :visible.sync="goodsVisible">
            <goods-selection @row-dblclick="dbClick"></goods-selection>
        </el-dialog>

        <el-dialog title="提交订单号" :visible.sync="ladingVisible">
            <el-form :model="ladingForm" label-width="80px" ref="ladingForm">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="运单号" prop="ladingBill"
                                      :rules="[{required:true, message:'请输入采购价格', trigger: 'blur'}]">
                            <el-input v-model="ladingForm.ladingBill"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog_footer">
                <el-button @click="ladingVisible=false">取消</el-button>
                <el-button type="primary" @click="ladingFormConfirm">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {
        addBatchGoods, cacSuggestPrice,
        deleteBatchGoodsById,
        getBatchinfoById, listAllUnitinfos,
        listBatchGoodsByCon, putonBatch, submitLocalPrice, submitReportPrice,
        updateBatchGoodsById, uptBatchLadingBill, uptBatchRealCount
    } from "../../../util/module";
    import GoodsSelection from "../../common/selection/GoodsSelection";
    import {formatPrice, formatPriceDot, toDate} from "../../../tool/Format";
    import {deepCopy} from "../../../Gw/GwDateUtil";
    import GwRegular from "@/Gw/GwRegular.js";
    import {batchCnys, batchCnysId} from "../../../tool/status"
    import _String from '../../../util/string';
    import * as cfg from "../../../config/cfg";

    export default {
        name: "batchInfoAction",
        components: {
            GoodsSelection
        },
        data() {
            return {
                searchForm: {
                    batchId: null,
                    batchName: null
                },
                batchInfo: {},
                batchFlags: [
                    {id: 'I', value: '国内采购'},
                    {id: 'O', value: '国外采购'},
                ],
                statuses: [
                    {id: '1', value: '上架'},
                    // {id:'2', value:'未知'},
                    // {id:'3', value:'未知'},
                    {id: '4', value: '零售价已申报'},
                    {id: '5', value: '建议价格已计算'},
                    {id: '6', value: '本地价格已提交'},
                    {id: '7', value: '物资已入库'},
                    {id: '8', value: '海运'},
                    {id: '9', value: '初始'},
                    {id: 'A', value: '物资正在入库'},
                    {id: 'B', value: '本地价格提交中'},
                    {id: 'C', value: '建议价格计算中'},
                    {id: 'D', value: '零售价申报中'},
                    {id: 'E', value: '物资上架中'},
                ],
                flag: 1,//1.新增  2.修改
                dialogForm: {
                    id: null,
                    recycleSeq: null,
                    batchGoodsId: null,
                    tellerBuyPrice: null,
                    count: null,
                    tellerBuyCount: null,
                    memo: null,
                    goodsName: null,
                    thisChange: 1,
                    baseUnitId: null,
                    unitId: null,
                    buyBaseUnit: null,
                    unitName: null,
                },
                dialogFormOld: {},
                dialogVisible: false,
                goodsVisible: false,
                currentPage: 1,
                pageSize: 10,
                AllCount: 0,
                tableData: [],
                ladingVisible: false,
                ladingForm: {
                    batchId: null,
                    version: null,
                    ladingBill: null,
                },
                realCountIns: [],//入库数量数组
                localPrices: [],//本地价格数组
                suggestPrices: [],//建议价格
                companyCounts: [],//内部数量
                reportPrices: [],//零售价
                units: [],
                goodsInfo: {},
                dollarRate: 1,
                nalaRate: 1,
                pictureUrl: '',
            }
        },

        computed: {
            dialogTitle() {
                if (this.flag === 1) {
                    return '新增';
                } else {
                    return '修改';
                }
            },

            showRealCount() {
                return this.batchInfo.status !== '9';
            },

            showOperation() {
                return this.batchInfo.status === '9';
            },

            showRealCountIns() {
                if (this.batchInfo.batchFlag === "I") {
                    // 国内
                    return this.batchInfo.status === '8' || this.batchInfo.status === 'A' || this.batchInfo.status === '7';
                } else {
                    // 国外
                    return this.batchInfo.status === '9' || this.batchInfo.status === 'A' || this.batchInfo.status === '7';
                }
            },

            showSuggestPriceOperation() {
                return this.batchInfo.status === '6' || this.batchInfo.status === 'C' || this.batchInfo.status === '5';
            },

            showLocalPriceOperation() {
                return this.batchInfo.status === '7' || this.batchInfo.status === 'B' || this.batchInfo.status === '6';
            },

            tellerBuyPriceUnit() {
                let str = '₦';
                if (!this.batchInfo.batchCny) {
                    return str;
                }
                if (this.batchInfo.batchCny === '2') {
                    str = '￥';
                }
                if (this.batchInfo.batchCny === '3') {
                    str = '$';
                }
                return str;
            },
        },

        created() {
            this.pictureUrl = cfg.service.uploadUrl + '/';
            this.nalaRate = localStorage.getItem('nalaRate') || 1;
            this.dollarRate = localStorage.getItem('dollarRate') || 1;
            this.getUnits();
            if (this.$route.query.batchId) {
                this.searchForm.batchId = this.$route.query.batchId;
                this.getBatchInfo();
            }
        },

        methods: {
            initData() {
                this.getGoodsSerials();
            },

            formatPriceDot(price){
                return formatPriceDot(price);
            },

            getStep(step){
                let nowStep=1;
                if (this.batchInfo.batchFlag === 'I') {
                    switch (step) {
                        case '9':
                            nowStep=0;
                            break;
                        case '8':
                            nowStep=1;
                            break;
                        case 'A':
                            nowStep=2;
                            break;
                        case '7':
                            nowStep=3;
                            break;
                        case 'B':
                            nowStep=4;
                            break;
                        case '6':
                            nowStep=5;
                            break;
                        case 'C':
                            nowStep=6;
                            break;
                        case '5':
                            nowStep=7;
                            break;
                        case 'D':
                            nowStep=8;
                            break;
                        case '4':
                            nowStep=9;
                            break;
                        case 'E':
                            nowStep=10;
                            break;
                        case '1':
                            nowStep=11;
                            break;
                    }
                }else{
                    switch (step) {
                        case '9':
                            nowStep=0;
                            break;
                        case 'A':
                            nowStep=1;
                            break;
                        case '7':
                            nowStep=2;
                            break;
                        case 'B':
                            nowStep=3;
                            break;
                        case '6':
                            nowStep=4;
                            break;
                        case 'C':
                            nowStep=5;
                            break;
                        case '5':
                            nowStep=6;
                            break;
                        case 'D':
                            nowStep=7;
                            break;
                        case '4':
                            nowStep=8;
                            break;
                        case 'E':
                            nowStep=9;
                            break;
                        case '1':
                            nowStep=10;
                            break;
                    }
                }
                return nowStep;
            },

            toDate(dateStr){
                return toDate(dateStr);
            },

            batchCnyName(batchCny) {
                let name = '';
                batchCnys.forEach(item => {
                    if (item.id === batchCny) {
                        name = item.value;
                        return false;
                    }
                });
                return name;
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

            checkCount(rule, value, callback) {
                if (!GwRegular.numeric2.test(value)) {
                    callback(new Error('请输入数字，最多两位小数!'));
                }
                callback();
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

            //如果条件符合shows中的任意一个条件，那么就返回true
            isShow(mStatus, tab) {
                let status = (mStatus + '').toUpperCase();
                const shows = [
                    {status: 'C', tab: 'cacSuggestPrice'},
                    {status: '5', tab: 'cacSuggestPrice'},
                    {status: 'D', tab: 'cacSuggestPrice'},
                    {status: '4', tab: 'cacSuggestPrice'},
                    {status: 'E', tab: 'cacSuggestPrice'},
                    {status: '1', tab: 'cacSuggestPrice'},
                    {status: 'D', tab: 'reportPrice'},
                    {status: '4', tab: 'reportPrice'},
                    {status: 'E', tab: 'reportPrice'},
                    {status: '1', tab: 'reportPrice'},
                ];

                let flag = false;

                shows.forEach(item => {
                    if (tab !== item.tab) {
                        return true;
                    }
                    if (item.max && item.min) {
                        if (status <= item.max && status >= item.min) {
                            flag = true;
                            return false;
                        }
                    }
                    if (item.max) {
                        if (status <= item.max) {
                            flag = true;
                            return false;
                        }
                    }
                    if (item.min) {
                        if (status >= item.min) {
                            flag = true;
                            return false;
                        }
                    }
                    if (item.status) {
                        if (status === item.status) {
                            flag = true;
                            return false;
                        }
                    }
                });


                return flag;

            },

            checkthisChange(rule, value, callback) {
                if (!GwRegular.numeric2.test(value)) {
                    callback(new Error('请输入数字，最多两位小数!'));
                }
                callback();
            },

            changeRealCount(item, index) {
                if (!GwRegular.numeric2_.test(this.realCountIns[index])) {
                    this.$message.error('请输入数字，最多两位小数');
                    return;
                }
                let params = {};
                params.batchId = this.batchInfo.batchId;
                params.goodsList = [];
                let obj = {};
                obj.recycleSeq = '1';
                obj.batchGoodsId = item.batchGoodsId;
                obj.realCount = parseFloat(this.realCountIns[index]) + item.realCount;
                if (obj.realCount < 0.005 || obj.realCount > item.tellerBuyCount) {
                    this.$message.error('请输入正确数量！');
                    return;
                }
                params.goodsList.push(obj);
                uptBatchRealCount(this, params).then(
                    res => {
                        this.getBatchInfo();
                    },
                    res => {

                    }
                ).catch();
            },

            uptBatchInfoTap() {
                this.ladingForm.batchId = this.batchInfo.batchId;
                this.ladingForm.version = this.batchInfo.version;
                this.ladingVisible = true;
            },

            doSubmitLocalPrice(item, index) {
                if (!GwRegular.numeric2.test(this.localPrices[index])) {
                    this.$message.error('请输入正确数字，最多两位小数');
                    return;
                }
                let params = {};
                params.batchId = this.batchInfo.batchId;
                params.goodsList = [];
                let obj = {};
                obj.recycleSeq = '1';
                obj.batchGoodsId = item.batchGoodsId;
                obj.localPrice = parseFloat(this.localPrices[index]);
                params.goodsList.push(obj);
                submitLocalPrice(this, params).then(
                    res => {
                        this.$message.success('提交成功!');
                        this.getBatchInfo();
                    },
                    res => {

                    }
                ).catch();
            },

            doSuggestPrice(item, index) {
                if (!GwRegular.numeric2.test(this.suggestPrices[index])) {
                    this.$message.error('请输入正确数字，最多两位小数');
                    return;
                }
                let params = {};
                params.batchId = this.batchInfo.batchId;
                params.goodsList = [];
                let obj = {};
                obj.recycleSeq = '1';
                obj.batchGoodsId = item.batchGoodsId;
                obj.suggestPrice = parseInt(this.suggestPrices[index]);
                params.goodsList.push(obj);
                cacSuggestPrice(this, params).then(
                    res => {
                        this.$message.success('提交成功!');
                        this.getBatchInfo();
                    },
                    res => {

                    }
                ).catch();
            },

            doReportPrices(item, index) {
                if (!this.reportPrices[index] || this.reportPrices[index] === '') {
                    this.$message.error('请输入零售价!');
                    return;
                }
                if (!GwRegular.numeric2.test(this.reportPrices[index])) {
                    this.$message.error('零售价请输入正确数字，最多两位小数');
                    return;
                }
                if (this.companyCounts[index]) {
                    if (!GwRegular.numeric2.test(this.companyCounts[index])) {
                        this.$message.error('内部数量请输入正确数字，最多两位小数');
                        return;
                    }
                }
                let params = {};
                params.batchId = this.batchInfo.batchId;
                params.goodsList = [];
                let obj = {};
                obj.recycleSeq = '1';
                obj.batchGoodsId = item.batchGoodsId;
                if (this.reportPrices[index] && this.reportPrices[index] !== '') {
                    obj.reportPrice = parseFloat(this.reportPrices[index]);
                }
                if (this.companyCounts[index] && this.companyCounts[index] !== '') {
                    obj.companyCount = parseFloat(this.companyCounts[index]);
                    if (obj.companyCount<0.005){
                        this.$message.error('内部数量不能输入负数');
                        return;
                    }
                    if (obj.companyCount-item.realCount>0.005){
                        this.$message.error('内部数量不能超过已入库数量！');
                        return;
                    }
                }
                params.goodsList.push(obj);
                submitReportPrice(this, params).then(
                    res => {
                        this.$message.success('提交成功!');
                        this.getBatchInfo();
                    },
                    res => {

                    }
                ).catch();
            },

            doPutonBatch(item) {
                let params = {};
                params.batchId = this.batchInfo.batchId;
                params.goodsList = [];
                let obj = {};
                obj.recycleSeq = '1';
                obj.batchGoodsId = item.batchGoodsId;
                params.goodsList.push(obj);
                putonBatch(this, params).then(
                    res => {
                        this.$message.success('提交成功!');
                        this.getBatchInfo();
                    },
                    res => {

                    }
                ).catch();
            },

            ladingFormConfirm() {
                let params = {};
                params.batchId = this.ladingForm.batchId;
                params.version = this.ladingForm.version;
                params.ladingBill = this.ladingForm.ladingBill;
                uptBatchLadingBill(this, params).then(
                    res => {
                        this.$message.success('提交成功！');
                        this.ladingVisible = false;
                        this.getBatchInfo();
                    },
                    res => {

                    }
                ).catch();
            },

            handleSizeChange() {
                //初始化数组
                for (let i = 0; i < this.reportPrices.length; i++) {
                    this.reportPrices[i]='';
                }
                for (let i = 0; i < this.realCountIns.length; i++) {
                    this.realCountIns[i]='';
                }
                for (let i = 0; i < this.suggestPrices.length; i++) {
                    this.suggestPrices[i]='';
                }
                for (let i = 0; i < this.companyCounts.length; i++) {
                    this.companyCounts[i]='';
                }
                this.initData();
            },

            handleCurrentChange(options) {
                this.currentPage = options;
                //初始化数组
                for (let i = 0; i < this.reportPrices.length; i++) {
                    this.reportPrices[i]='';
                }
                for (let i = 0; i < this.realCountIns.length; i++) {
                    this.realCountIns[i]='';
                }
                for (let i = 0; i < this.suggestPrices.length; i++) {
                    this.suggestPrices[i]='';
                }
                for (let i = 0; i < this.companyCounts.length; i++) {
                    this.companyCounts[i]='';
                }
                this.initData();
            },

            modifyTap(item) {
                this.dialogForm = {
                    id: null,
                    recycleSeq: null,
                    batchGoodsId: null,
                    tellerBuyPrice: null,
                    count: null,
                    tellerBuyCount: null,
                    memo: null,
                    goodsName: null,
                    thisChange: 1,
                    baseUnitId: null,
                    unitId: null,
                    buyBaseUnit: null,
                    unitName: null,
                };
                this.flag = 2;
                this.dialogForm.id = item.id;
                this.dialogForm.batchGoodsId = item.batchGoodsId;
                this.dialogForm.version = item.version;
                this.dialogForm.tellerBuyPrice = item.tellerBuyPrice;
                this.dialogForm.tellerBuyCount = item.tellerBuyCount;
                this.dialogForm.count = item.tellerBuyCount;
                this.dialogForm.goodsName = item.goodsName;
                this.dialogForm.buyBaseUnit = item.buyBaseUnit;
                this.dialogForm.unitName = item.buyBaseUnit;
                this.dialogForm.memo = item.memo;
                if (item.buyThisUnit) {
                    this.dialogForm.count = item.thisCount;
                    this.dialogForm.thisChange = item.thisChange;
                    this.dialogForm.unitName = item.buyThisUnit;
                }
                this.dialogFormOld = deepCopy(this.dialogForm);
                this.dialogVisible = true;
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
                params.id = item.id;
                deleteBatchGoodsById(this, params).then(
                    res => {
                        this.$message.error('删除成功！');
                        this.initData();
                    },
                    res => {

                    }
                ).catch();
            },

            getGoodsSerials() {
                if (this.batchInfo.batchId == null || this.batchInfo.batchName == null) {
                    return;
                }
                let params = {};
                params.currentPage = this.currentPage;
                params.pageSize = this.pageSize;
                params.batchId = this.batchInfo.batchId;
                listBatchGoodsByCon(this, params).then(
                    res => {
                        this.tableData = res.data.records;
                        for (let i = 0; i < this.tableData.length; i++) {
                            this.$set(this.realCountIns, i, formatPrice(this.tableData[i].tellerBuyCount - this.tableData[i].realCount));
                        }
                        this.AllCount = res.data.total;
                    },
                    res => {

                    }
                ).catch();
            },

            //格式化金额
            formatPrice(price) {
                return _String.number_format(price, 2, '.', '');
            },

            getBatchInfo() {
                let params = {};
                params.batchId = this.searchForm.batchId;
                getBatchinfoById(this, params).then(
                    res => {
                        this.batchInfo = res.data;
                        this.getGoodsSerials();
                    },
                    res => {
                        //无批次，将物资信息清空
                        this.tableData = [];
                    }
                ).catch();
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
                let params = {};
                if (this.flag === 1) {
                    //新增
                    params.batchId = this.dialogForm.batchId;
                    params.goodsList = [];
                    let item = {};
                    item.recycleSeq = '1';
                    item.batchGoodsId = this.dialogForm.batchGoodsId;
                    // 暂时不转换，直接上送
                    // if (this.batchInfo.batchCny === batchCnysId.RMB) {
                    //     //人民币
                    //     item.tellerBuyPrice =formatPrice(this.dialogForm.tellerBuyPrice*this.nalaRate);
                    // }else if (this.batchInfo.batchCny === batchCnysId.DOLS) {
                    //     // 美元
                    //     item.tellerBuyPrice =formatPrice(this.dialogForm.tellerBuyPrice*this.dollarRate);
                    // }else{
                    //     item.tellerBuyPrice = formatPrice(this.dialogForm.tellerBuyPrice);
                    // }
                    item.tellerBuyPrice = formatPrice(this.dialogForm.tellerBuyPrice);
                    item.tellerBuyCount = formatPrice(this.dialogForm.count * this.dialogForm.thisChange);
                    item.buyBaseUnit = this.dialogForm.buyBaseUnit;
                    if (this.dialogForm.unitName != null && this.dialogForm.buyBaseUnit != null && this.dialogForm.unitName !== this.dialogForm.buyBaseUnit) {
                        item.buyThisUnit = this.dialogForm.unitName;
                        item.thisCount = this.dialogForm.count;
                        item.thisChange = this.dialogForm.thisChange;
                    }
                    if (item.memo) {
                        item.memo = this.dialogForm.memo;
                    }
                    params.goodsList.push(item);
                    addBatchGoods(this, params).then(
                        res => {
                            this.$message.success('新增成功');
                            this.initData();
                            this.dialogVisible = false;
                        },
                        res => {
                        }
                    ).catch();
                }

                if (this.flag === 2) {
                    //修改
                    params.id = this.dialogForm.id;
                    params.version = this.dialogForm.version;
                    if (this.dialogForm.tellerBuyPrice !== this.dialogFormOld.tellerBuyPrice) {
                        params.tellerBuyPrice = formatPrice(this.dialogForm.tellerBuyPrice);
                    }
                    params.tellerBuyCount =formatPrice(this.dialogForm.count);
                    if (this.dialogForm.buyBaseUnit !== this.dialogFormOld.buyBaseUnit) {
                        params.buyBaseUnit = this.dialogForm.buyBaseUnit;
                    }
                    if (this.dialogForm.memo !== this.dialogFormOld.memo) {
                        params.memo = this.dialogForm.memo;
                    }
                    //有单位换算
                    if (this.dialogForm.buyBaseUnit!=null&&this.dialogForm.unitName !== this.dialogForm.buyBaseUnit) {
                        if (this.dialogForm.count !== this.dialogFormOld.count || this.dialogForm.unitName !== this.dialogFormOld.unitName || this.dialogForm.thisChange !== this.dialogFormOld.thisChange) {
                            params.thisChange = this.dialogForm.thisChange;
                            params.buyThisUnit = this.dialogForm.unitName;
                            params.thisCount = this.dialogForm.count;
                            params.tellerBuyCount=formatPrice(this.dialogForm.count * this.dialogForm.thisChange);
                        }
                    }else{
                        if (this.dialogForm.unitName !== this.dialogFormOld.unitName) {
                            params.buyThisUnit=this.dialogForm.unitName;
                        }
                    }
                    updateBatchGoodsById(this, params).then(
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

            dbClick(item) {
                this.goodsInfo = deepCopy(item);
                this.dialogForm.buyBaseUnit = this.getUnitName(item.unitId);
                this.dialogForm.batchGoodsId = item.specGoodsId;
                this.dialogForm.goodsName = item.goodsName;
                this.dialogForm.unitId = item.unitId;
                this.dialogForm.unitName = this.getUnitName(item.unitId);
                this.dialogForm.baseUnitId = item.unitId;
                this.dialogForm.count = '';
                this.dialogForm.tellerBuyPrice = '';
                this.dialogForm.thisChange = 1;
                this.goodsVisible = false;
            },

            choiceTap() {
                this.goodsVisible = true;
            },

            onAddNewTap() {
                this.flag=1;
                if (this.$refs.dialogForm) {
                    this.$refs.dialogForm.clearValidate();
                }
                this.dialogForm = {
                    id: null,
                    recycleSeq: null,
                    batchGoodsId: null,
                    tellerBuyPrice: null,
                    count: null,
                    tellerBuyCount: null,
                    memo: null,
                    goodsName: null,
                    baseCategory: null,
                    thisChange: 1,
                    baseUnitId: null,
                    unitId: null,
                    buyBaseUnit: null,
                    unitName: null,
                };
                this.flag = 1;
                this.dialogForm.batchId = this.batchInfo.batchId;
                this.dialogVisible = true;
            },

            getBatchFlagName(batchFlag) {
                if (batchFlag === 'I') {
                    return '国内';
                }
                if (batchFlag === 'O') {
                    return '国外'
                }
            },

            getStatusName(status) {
                let statusName = '';
                this.statuses.forEach(item => {
                    if (item.id === status) {
                        statusName = item.value;
                        return false;
                    }
                });
                return statusName;
            },
        }
    }
</script>

<style scoped>
    .batchInfoDiv {
        border: 1px solid rgb(235, 238, 245);
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 10px;
    }

    .batchInfoCol {
        line-height: 16px;
        color: rgb(144, 147, 153);
    }

    .tellerBuyPriceClass {
        width: 96%;
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

<style>
    .el-step__title{
        font-size: 12px;
    }
</style>
