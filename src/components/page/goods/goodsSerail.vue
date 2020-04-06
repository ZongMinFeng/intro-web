<template>
    <div class="container">
        <div class="handle-box">
            <el-button type="success" icon="el-icon-plus" @click="onAddNewTap">新增</el-button>
            <el-button type="danger" @click="onDeleteAllTap" style="float: right;">清空系列</el-button>
        </div>

        <el-table :data="tableData" border stripe>
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
                        <el-form-item label="总库存">
                            <span>{{ props.row.stockNum}}</span>
                        </el-form-item>
                        <el-form-item label="总锁定库存">
                            <span>{{ props.row.lockNum}}</span>
                        </el-form-item>
                        <el-form-item label="内部库存">
                            <span>{{ props.row.innerStockNum}}</span>
                        </el-form-item>
                        <el-form-item label="内部锁定库存">
                            <span>{{ props.row.innerLockNum}}</span>
                        </el-form-item>
                        <el-form-item label="销售数量">
                            <span>{{ props.row.specSellCount}}</span>
                        </el-form-item>
                        <el-form-item label="型号">
                            <span>{{ props.row.goodsType}}</span>
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ props.row.memo}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="名称" prop="goodsName"></el-table-column>
            <el-table-column label="系列主图" width="120" align="center" header-align="left">
                <template slot-scope="scope">
                    <img style="height: 80px; width: 80px;background-color: white;" :preview="scope.$index"
                         :src="pictureUrl + scope.row.goodsId + '/'+scope.row.mainPicture">
                </template>
            </el-table-column>
            <el-table-column label="颜色" prop="specColor"></el-table-column>
            <el-table-column label="系列价格" width="160" align="right" header-align="left">
                <template slot-scope="props">
                    <p>₦{{formatPriceDot(props.row.specNowPrice)}}</p>
                    <p>￥{{formatPriceDot(props.row.specNowPrice/nalaRate)}}</p>
                    <p>${{formatPriceDot(props.row.specNowPrice/dollarRate)}}</p>
                </template>
            </el-table-column>
            <el-table-column label="材质" prop="specMaterial"></el-table-column>
            <el-table-column label="尺寸" prop="specSize"></el-table-column>
            <el-table-column label="单位" prop="unitName"></el-table-column>
            <el-table-column label="分类" prop="categoryName"></el-table-column>
            <el-table-column label="分类序号" width="70px" prop="cq" align="right" header-align="left"></el-table-column>
            <el-table-column label="状态" width="80">
                <template slot-scope="props">
                    {{getStatusName(props.row.status)}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="props">
                    <el-button type="primary" @click="modifyTap(props.row)">修改</el-button>
                    <el-button type="danger" @click="deleteTap(props.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <h3 style="margin-top:20px; color: #909399;">主物资信息</h3>
        <div class="line"></div>
        <el-form :model="goodsInfo" label-width="100px" class="goodInfo">
            <el-row>
                <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="名称">
                        <el-input :disabled="true" v-model="goodsInfo.goodsName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="备注">
                        <el-input :disabled="true" v-model="goodsInfo.memo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="型号">
                        <el-input :disabled="true" v-model="goodsInfo.goodsType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="单位">
                        <div class="itemDisplayDiv">{{getUnitName(goodsInfo.unitId)}}</div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
            <el-form :model="dialogForm" label-width="80px" ref="dialogForm">
                <el-row v-if="flag===2">
                    <el-col :span="24">
                        <el-form-item label="名称" prop="goodsName"
                                      :rules="[{required:true, message:'请输入名称', trigger: 'blur'} ]">
                            <el-input v-model="dialogForm.goodsName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col v-if="flag===2" :span="24">
                        <el-form-item label="分类序号" prop="cq" :rules="[{required:true, message:'请输入物资分类序号', trigger:'blur'}, {validator:checkcq, trigger:'blur'}]">
                            <el-input v-model="dialogForm.cq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="颜色" prop="specColor">
                            <el-input v-model="dialogForm.specColor"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="材质" prop="specMaterial">
                            <el-input v-model="dialogForm.specMaterial"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="尺寸" prop="specSize">
                            <el-input v-model="dialogForm.specSize"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="分类" prop="categoryId">
                            <category-selection @click="categoryClick" :placeholder="placeholder"></category-selection>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="单位">
                            <el-select v-model="dialogForm.unitId" placeholder="请选择单位"
                                       style="width: 100%;"
                                       filterable allow-create
                                       @change="unitChange">
                                <el-option v-for="item in units" :key="item.unitId" :label="item.unitName"
                                           :value="item.unitId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="flag===2">
                    <el-col :span="24">
                        <el-form-item label="型号" prop="goodsType"
                                      :rules="[{required:true, message:'请输入型号', trigger: 'blur'} ]">
                            <el-input v-model="dialogForm.goodsType"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="picture">
                    <div class="list-name">物资轮播信息（拖动可调换顺序）</div>
                    <el-upload
                        :action="pictureUrl"
                        multiple
                        list-type="fileList"
                        :show-file-list="false"
                        :http-request="handelPicturePost"
                        :before-upload="beforeAvatarUpload">
                        <el-button v-if="dialogForm.imgs.length<1" size="small" type="primary"
                                   @click="uploadButton($event)">新增图片
                        </el-button>
                        <el-button v-else size="small" type="primary" @click="uploadButton($event)">添加图片</el-button>
                    </el-upload>
                    <div v-if="dialogForm.imgs.length > 0" class="drag-box-item">
                        <draggable v-model="dialogForm.imgs" :options="dragOptions" :move="onMove">
                            <transition-group tag="div" id="dialogForm.imgs" class="item-ul">
                                <div v-for="(item,index) in dialogForm.imgs" :key="index" class="item">
                                    <div class="drag-list">
                                        <img v-image-preview :src="pictureUrl+dialogForm.goodsId+'/'+item"
                                             class="drag-list-img"/>
                                    </div>
                                    <el-button v-if="item === dialogForm.mainPicture" class="drag-list-button"
                                               type="warning">此为主图
                                    </el-button>
                                    <el-button v-if="item.endsWith('.mp4')" class="drag-list-button">视频</el-button>
                                    <!--目前不用设置主图，默认轮播图第一章为主图-->
                                    <!--<el-button v-if="item !== dialogForm.mainPicture&&!item.endsWith('.mp4')" type="primary"-->
                                    <!--class="drag-list-button" @click="onMainPicTap(item)">设为主图-->
                                    <!--</el-button>-->
                                    <el-button type="danger" @click="deletePicTap(item, index)">删除</el-button>
                                </div>
                            </transition-group>
                        </draggable>
                    </div>
                </div>

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
    </div>
</template>

<script>
    import {
        addGoodsserial, addGooUnitinfo, deleteGoodsserialByGoodsId,
        deleteGoodsserialById,
        getGooTGoodsinfoById, listAllUnitinfos,
        listGoodsserialsByGoodsId,
        sendPicture, updateGoodsserialById
    } from "../../../util/module";
    import {inArrayOptionByCons, trimSpace} from "../../../Gw/GwArray";
    import * as cfg from "../../../config/cfg";
    import _String from '../../../util/string';
    import draggable from 'vuedraggable';
    import CategorySelection from '../../common/selection/CategorySelection';
    import {formatPriceDot, toDate} from "../../../tool/Format";

    export default {
        name: "goodsSerail",
        components: {
            draggable,
            CategorySelection
        },
        data() {
            return {
                goodsInfo: {
                    goodsId: null,
                    categoryId: null,
                    goodsName: null,
                    mainPicture: null,
                    goodsImgs: null,
                    goodsType: null,
                    unitId: null,
                    memo: null,
                    version: null,
                    cq:null
                },
                goodsId: null,
                tableData: [],
                dialogVisible: false,
                dialogForm: {
                    goodsId: null,
                    categoryId: null,
                    goodsName: null,
                    mainPicture: null,
                    goodsImgs: null,
                    goodsType: null,
                    unitId: null,
                    memo: null,
                    specColor: null,
                    imgs: [],
                    specSize: null,
                    specMaterial: null,
                    cq:null,
                },
                dialogFormOld: {
                    goodsId: null,
                    categoryId: null,
                    goodsName: null,
                    mainPicture: null,
                    goodsImgs: null,
                    goodsType: null,
                    unitId: null,
                    memo: null,
                    specColor: null,
                    imgs: [],
                    specSize: null,
                    specMaterial: null,
                    cq:null,
                },
                flag: 1,//1.新增  2.修改
                dragOptions: {
                    animation: 120,
                    scroll: true,
                    group: 'sortlist',
                    ghostClass: 'ghost-style'
                },
                pictureUrl: '',
                create: false,
                units: [],
                dollarRate:1,
                nalaRate:1,
                placeholder:null,
                statusList: [
                    {id: '1', value: '上架'},
                    {id: '2', value: '注销'},
                    {id: '3', value: '下架'},
                    {id: '4', value: '新增'},
                ],
            }
        },

        computed: {
            dialogTitle() {
                if (this.flag === 1) {
                    return '新增';
                } else {
                    return '修改';
                }
            }
        },

        created() {
            this.pictureUrl = cfg.service.uploadUrl + '/';
            this.nalaRate=localStorage.getItem('nalaRate')||1;
            this.dollarRate=localStorage.getItem('dollarRate')||1;
            this.goodsId = this.$route.query.goodsId;
            this.create = this.$route.query.create || false;
            if (this.goodsId && this.goodsId !== '') {
                this.getGoodsInfo();
                this.getSerail();
            }
            this.getUnits();
        },

        methods: {
            initData() {
                this.getSerail();
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

            formatPriceDot(price){
                return formatPriceDot(price);
            },

            toDate(dateStr) {
                return toDate(dateStr);
            },

            categoryClick(nodeInfo) {
                this.dialogForm.categoryId = nodeInfo.categoryId;
            },

            unitChange() {
                //如果单位是新增的，那么发送新增单位交易
                if (inArrayOptionByCons(this.units, this.dialogForm.unitId, 'unitId')) {
                    return;
                }
                let params = {};
                params.unitName = this.dialogForm.unitId;
                addGooUnitinfo(this, params).then(
                    res => {
                        let unit = res.data;
                        this.units.push(unit);
                        this.$nextTick(() => {
                            this.dialogForm.unitId = unit.unitId;
                        });
                    },
                    res => {
                        this.$nextTick(() => {
                            this.dialogForm.unitId = null;
                        });
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

            modifyTap(item) {
                if (this.$refs.dialogForm) {
                    this.$refs.dialogForm.clearValidate();
                }
                this.flag = 2;
                this.dialogForm.goodsId = item.goodsId;
                this.dialogForm.specGoodsId = item.specGoodsId;
                this.dialogForm.version = item.version;
                this.dialogForm.specColor = item.specColor;
                this.dialogForm.specSize = item.specSize;
                this.dialogForm.specMaterial = item.specMaterial;
                this.dialogForm.goodsImgs = item.goodsImgs;
                this.dialogForm.goodsName = item.goodsName;
                this.dialogForm.goodsType = item.goodsType;
                this.dialogForm.memo = item.memo;
                this.dialogForm.categoryId=item.categoryId;
                this.dialogForm.categoryName=item.categoryName;
                this.dialogForm.unitId=item.unitId;
                this.dialogForm.cq=item.cq;
                this.placeholder=item.categoryName;
                let tmp = [];
                tmp = item.goodsImgs.split(',');
                this.dialogForm.imgs = trimSpace(tmp);

                //老数据
                this.dialogFormOld.goodsId = item.goodsId;
                this.dialogFormOld.specGoodsId = item.specGoodsId;
                this.dialogFormOld.version = item.version;
                this.dialogFormOld.specColor = item.specColor;
                this.dialogFormOld.specSize = item.specSize;
                this.dialogFormOld.specMaterial = item.specMaterial;
                this.dialogFormOld.goodsImgs = item.goodsImgs;
                this.dialogFormOld.goodsName = item.goodsName;
                this.dialogFormOld.goodsType = item.goodsType;
                this.dialogFormOld.memo = item.memo;
                this.dialogFormOld.categoryId=item.categoryId;
                this.dialogFormOld.categoryName=item.categoryName;
                this.dialogFormOld.unitId=item.unitId;
                this.dialogFormOld.cq=item.cq;
                let tmpOld = [];
                tmpOld = item.goodsImgs.split(',');
                this.dialogFormOld.imgs = trimSpace(tmpOld);

                this.dialogVisible = true;
            },

            onAddNewTap() {
                if (this.$refs.dialogForm) {
                    this.$refs.dialogForm.clearValidate();
                }
                this.dialogForm={
                    goodsId: null,
                    categoryId: null,
                    goodsName: null,
                    mainPicture: null,
                    goodsImgs: null,
                    goodsType: null,
                    unitId: null,
                    memo: null,
                    specColor: null,
                    imgs: [],
                    specSize: null,
                    specMaterial: null,
                    cq:null,
                };
                this.dialogForm.categoryId=this.goodsInfo.categoryId;
                this.placeholder=this.goodsInfo.categoryName;
                this.dialogForm.goodsId = this.goodsInfo.goodsId;
                this.dialogForm.unitId=this.goodsInfo.unitId;
                this.dialogForm.imgs = [];
                this.dialogForm.imgs.push(...this.goodsInfo.imgs);
                this.flag = 1;
                this.dialogVisible = true;

                this.create = false;
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

            onDeleteAllTap() {
                this.$confirm('此操作将清空物资系列，是否确认?', '清空物资系列', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(
                    () => {
                        this.deleteAllCommit();
                    }
                );
            },

            deleteAllCommit() {
                let params = {};
                params.goodsId = this.goodsInfo.goodsId;
                deleteGoodsserialByGoodsId(this, params).then(
                    res => {
                        this.$message.success('清空成功！');
                        this.tableData = [];
                    },
                    res => {

                    }
                ).catch();
            },

            deleteTap(item) {
                this.$confirm('此操作将删除物资系列，是否确认?', '删除物资系列', {
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
                params.specGoodsId = item.specGoodsId;
                deleteGoodsserialById(this, params).then(
                    res => {
                        this.$message.success('删除成功');
                        this.initData();
                    },
                    res => {
                    }
                ).catch();
            },

            onMove({relatedContext, draggedContext}) {
                console.log("hello, move");//debug
            },

            deletePicTap(item, index) {
                //不处理主图
                // if (item === this.dialogForm.mainPicture) {
                //   this.$message.error("无法删除主图，请先选择其他图作为主图，然后再删除此图");
                //   return;
                // }
                this.dialogForm.imgs.splice(index, 1);
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
                console.log('this.dialogForm',this.dialogForm);//debug
                //颜色、尺寸、材质三个必须有一个
                if ((this.dialogForm.specColor==null||this.dialogForm.specColor === '') && (this.dialogForm.specSize==null||this.dialogForm.specSize === '') && (this.dialogForm.specMaterial==null||this.dialogForm.specMaterial === '')) {
                    this.$message.error('必须输入颜色、材质、尺寸其中一个条件！');
                    return;
                }
                //必须要有系列图
                if (this.dialogForm.imgs.length === 0) {
                    this.$message.error('请添加图片！');
                    return;
                }
                let params = {};
                if (this.flag === 1) {
                    //新增
                    params.goodsId = this.dialogForm.goodsId;
                    params.serialList = [];
                    let serailInfo = {};
                    serailInfo.recycleSeq = '1';
                    serailInfo.goodsImgs = this.dialogForm.imgs.join(',');
                    serailInfo.mainPicture = this.dialogForm.imgs[0];
                    serailInfo.specColor = this.dialogForm.specColor;
                    serailInfo.specSize = this.dialogForm.specSize;
                    serailInfo.specMaterial = this.dialogForm.specMaterial;
                    params.serialList.push(serailInfo);
                    addGoodsserial(this, params).then(
                        res => {
                            this.$message.success('新增成功');
                            this.tableData = res.data;
                            this.dialogVisible = false;
                        },
                        res => {
                        }
                    ).catch();
                }

                if (this.flag === 2) {
                    // 修改
                    params.specGoodsId = this.dialogForm.specGoodsId;
                    params.version = this.dialogForm.version;
                    if (this.dialogForm.specColor !== this.dialogFormOld.specColor) {
                        params.specColor = this.dialogForm.specColor;
                    }
                    if (this.dialogForm.specSize !== this.dialogFormOld.specSize) {
                        params.specSize = this.dialogForm.specSize;
                    }
                    if (this.dialogForm.specMaterial !== this.dialogFormOld.specMaterial) {
                        params.specMaterial = this.dialogForm.specMaterial;
                    }
                    this.dialogForm.goodsImgs = this.dialogForm.imgs.join(',');
                    if (this.dialogForm.goodsImgs !== this.dialogFormOld.goodsImgs) {
                        params.goodsImgs = this.dialogForm.goodsImgs;
                    }
                    if (this.dialogForm.goodsName !== this.dialogFormOld.goodsName) {
                        params.goodsName = this.dialogForm.goodsName;
                    }
                    if (this.dialogForm.goodsType !== this.dialogFormOld.goodsType) {
                        params.goodsType = this.dialogForm.goodsType;
                    }
                    if (this.dialogForm.memo !== this.dialogFormOld.memo) {
                        params.memo = this.dialogForm.memo;
                    }
                    if (this.dialogForm.categoryId !== this.dialogFormOld.categoryId) {
                        params.categoryId = this.dialogForm.categoryId;
                    }
                    if (this.dialogForm.unitId !== this.dialogFormOld.unitId) {
                        params.unitId = this.dialogForm.unitId;
                    }
                    if (this.dialogForm.cq !== this.dialogFormOld.cq) {
                        params.cq=this.dialogForm.cq;
                    }
                    updateGoodsserialById(this, params).then(
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

            getTime() {
                return new Date().getTime();
            },

            handelPicturePost(data) {
                console.log("param:", data);
                let params = {};
                params.operFlag = '2';
                this.time = this.getTime();
                params.goodsId = this.dialogForm.goodsId;
                params.index = 'M';
                params.goodsFileNames = data.file;
                sendPicture(this, params).then(
                    res => {
                        this.dialogForm.imgs.push(res.data.fileNames);
                    },
                    res => {

                    }
                ).catch();

            },

            beforeAvatarUpload(file) {
                console.log("file:", file);
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 4;

                if (!isJPG) {
                    this.$message.error('上传头像信息只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像信息大小不能超过 4MB!');
                }
                return isJPG && isLt2M;
            },

            uploadButton(event) {
                //判断轮播信息数量，能否继续上传
                if (this.checkUploadButton()) {
                    //能继续上传
                } else {
                    //不能继续上传
                    event.cancelBubble = true;
                }
            },

            checkcq(rule, value, callback) {
                let reg = /^[1-9]\d{0,7}$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入序号，最大8位数字！'));
                    return;
                }
                callback();
            },

            checkUploadButton() {
                let num = this.dialogForm.imgs.length;
                if (num < 5) {
                    return true;
                } else {
                    this.$message.error("物资轮播信息不能大于5条");
                    return false;
                }
            },

            //格式化金额
            formatPrice(price) {
                return _String.number_format(price, 2);
            },

            getSerail() {
                let params = {};
                params.goodsId = this.goodsId;
                listGoodsserialsByGoodsId(this, params).then(
                    res => {
                        this.tableData = res.data;
                    },
                    res => {

                    }
                ).catch();
            },

            getGoodsInfo() {
                let params = {};
                params.goodsId = this.goodsId;
                getGooTGoodsinfoById(this, params).then(
                    res => {
                        console.log('获取物资信息', res);//debug
                        this.goodsInfo.goodsId = res.data.goodsId;
                        this.goodsInfo.categoryId = res.data.categoryId;
                        this.goodsInfo.categoryName=res.data.categoryName;
                        this.goodsInfo.goodsName = res.data.goodsName;
                        this.goodsInfo.mainPicture = res.data.mainPicture;
                        this.goodsInfo.goodsImgs = res.data.goodsImgs;
                        this.goodsInfo.goodsType = res.data.goodsType;
                        this.goodsInfo.unitId = res.data.unitId;
                        this.goodsInfo.memo = res.data.memo;
                        this.goodsInfo.version = res.data.version;
                        let tmp = [];
                        tmp = this.goodsInfo.goodsImgs.split(',');
                        this.goodsInfo.imgs = trimSpace(tmp);
                        if (this.create) {
                            this.onAddNewTap();
                        }
                    },

                    res => {

                    }
                ).catch();
            },
        }
    }
</script>

<style scoped>
    .table {
        width: 100%;
    }

    .line {
        border: 1px solid;
        height: 0px;
        color: #909399;
    }

    .goodInfo {
        margin-top: 10px;
    }

    .form-bot {
        text-align: right;
    }

    .spec-name-list span {
        font-size: 15px;
        color: #5F6165;
        padding-left: 10px;
    }

    .spec-list1 input {
        border-width: 0;
    }

    .barcode-ipt button {
        padding: 0 5px;
    }

    .spec-name-list-btn i {
        font-size: 15px;
        line-height: 42px;
        color: #429EFD;
    }

    .spec-name-list .spec-name-list-btn span {
        line-height: 42px;
        margin: 0;
        padding-left: 5px;
        color: #429EFD;
    }

    .showId {
        margin-bottom: 15px;
        margin-left: 28px;
        color: #606266;
    }

    .displayNon {
        display: none;
    }

    .drag-list {
        list-style: none;
        background-color: #fff;
        border-radius: 6px;
        cursor: pointer;
        -webkit-transition: border .3s ease-in;
        transition: border .3s ease-in;
        width: 175px;
    }

    .drag-list-img {
        height: 175px;
        width: 175px;
        border: 1px solid #EFF1F5;
    }

    .form-bot {
        text-align: right;
        margin-top: 5px;
    }

    .drag-list-height {
        height: 200px;
    }

    .drag-list {
        list-style: none;
        background-color: #fff;
        border-radius: 6px;
        cursor: pointer;
        -webkit-transition: border .3s ease-in;
        transition: border .3s ease-in;
        width: 175px;
    }

    .drag-list-video {
        list-style: none;
        border-radius: 6px;
        cursor: pointer;
        -webkit-transition: border .3s ease-in;
        transition: border .3s ease-in;
        width: 300px;
    }

    .drag-list-img {
        height: 175px;
        width: 175px;
        border: 1px solid #EFF1F5;
    }

    .drag-list-button {
        margin-right: 5px;
    }

    .picture {
        margin-bottom: 10px;
        background-color: #fff;
    }

    .list-name {
        color: #A0A0A0;

    }

    .item-ul {
        padding: 0 8px;
        overflow-x: scroll;
        display: flex;
        flex-direction: row;
        margin-right: 10px;
    }

    .item {
        margin-right: 10px;
        margin-top: 10px;
        border: gray 1px solid;
        padding: 2px;
    }

    .item-ul::-webkit-scrollbar {
        width: 0;
    }

    .itemDisplayDiv {
        border: 1px solid rgb(228, 231, 237);
        width: 100%;
        padding-left: 15px;
        border-radius: 5px;
        height: 32px;
        line-height: 32px;
        background-color: rgb(245, 247, 250);
        color: rgb(192, 196, 204);
        font-size: 13.3333px;
        font-weight: 400;
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
