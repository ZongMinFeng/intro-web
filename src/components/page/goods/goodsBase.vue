<template>
    <div>
        <span v-if="create===true">新增物资</span>
        <div class="list-name">基础</div>
        <el-form :model="searchForm" ref="searchForm" label-width="80px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="名称" prop="goodsName">
                        <el-input v-model="searchForm.goodsName" placeholder="请输入物资名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="分类" prop="categoryId">
                        <category-selection @click="categoryClick" :placeholder="placeholder"></category-selection>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="单位">
                        <el-select v-model="searchForm.unitId" placeholder="请选择单位"
                                   style="width: 100%;"
                                   filterable allow-create
                                   @change="unitChange">
                            <el-option v-for="item in units" :key="item.unitId" :label="item.unitName"
                                       :value="item.unitId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="序号" prop="cq"
                                  :rules="[{required:true, message:'请输入物资序号', trigger:'blur'}, {validator:checkcq, trigger:'blur'}]">
                        <el-input v-model="searchForm.cq" placeholder="请输入物资序号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="型号" prop="goodsType">
                        <el-input v-model="searchForm.goodsType" placeholder="请输入物资型号"></el-input>
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
                    <el-button v-if="searchForm.imgs.length<1" size="small" type="primary"
                               @click="uploadButton($event)">新增图片
                    </el-button>
                    <el-button v-else size="small" type="primary" @click="uploadButton($event)">添加图片</el-button>
                </el-upload>
                <div v-if="searchForm.imgs.length > 0" class="drag-box-item">
                    <draggable v-model="searchForm.imgs" :options="dragOptions" :move="onMove">
                        <transition-group tag="div" id="searchForm.imgs" class="item-ul">
                            <div v-for="(item,index) in searchForm.imgs" :key="index" class="item">
                                <div class="drag-list">
                                    <img v-image-preview :src="pictureUrl+searchForm.goodsId+'/'+item"
                                         class="drag-list-img"/>
                                </div>
                                <!--目前默认轮播图的第一张为主图-->
                                <!--<el-button v-if="item === searchForm.mainPicture" class="drag-list-button"-->
                                <!--type="warning">此为主图-->
                                <!--</el-button>-->
                                <!--<el-button v-if="item !== searchForm.mainPicture&&!item.endsWith('.mp4')" type="primary"-->
                                <!--class="drag-list-button" @click="onMainPicTap(item)">设为主图-->
                                <!--</el-button>-->
                                <el-button v-if="index!==0" style="float: right;" type="danger"
                                           @click="deletePicTap(item, index)">删除
                                </el-button>
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
                        v-model="searchForm.memo" @change="onChangeTap">
                    </el-input>
                </el-col>
            </el-row>

            <el-form-item class="form-bot">
                <el-button v-if="addFlag===2" type="primary" :disabled="saveDisabled" @click="addConfirm">保存</el-button>
                <el-button v-else type="success" :disabled="addDisabled" @click="addConfirm">新增</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import * as cfg from "../../../config/cfg";
    import {
        addGooTGoodsinfo,
        addGooUnitinfo, getGooCategoryById,
        getGooTGoodsinfoById,
        listAllUnitinfos,
        sendPicture, updateGooTGoodsinfoById
    } from "../../../util/module";
    import draggable from 'vuedraggable';
    import CategorySelection from '../../common/selection/CategorySelection';
    import {aEb, inArrayOptionByCons, trimSpace} from "../../../Gw/GwArray";

    export default {
        name: "goodsBase",

        components: {
            draggable,
            CategorySelection
        },

        props: ['create', 'goodsId'],

        data() {
            return {
                searchForm: {
                    goodsId: null,
                    goodsImgs: null,
                    mainPicture: null,
                    imgs: [],
                    memo: null,
                    unitId: null,
                    goodsType: null,
                    version: null,
                    categoryId: null,
                    goodsName: null,
                    cq: null
                },
                searchFormOld: {
                    goodsId: null,
                    goodsImgs: null,
                    mainPicture: null,
                    imgs: [],
                    memo: null,
                    unitId: null,
                    goodsType: null,
                    version: null,
                    cq:null
                },
                pictureUrl: '',
                flag: 1,//1：新增主图
                time: '123456',
                dragOptions: {
                    animation: 120,
                    scroll: true,
                    group: 'sortlist',
                    ghostClass: 'ghost-style'
                },
                units: [],
                addFlag: 1,//1.新增   2.修改
                placeholder: '',
            }
        },

        computed: {
            addDisabled() {
                return !(this.searchForm.goodsId != null && this.searchForm.categoryId != null && this.searchForm.goodsName != null && this.searchForm.mainPicture != null && this.searchForm.imgs.length > 0 && this.searchForm.goodsType != null && this.searchForm.unitId != null && this.addFlag === 1 && this.searchForm.cq != null);
            },

            saveDisabled() {
                return this.create || aEb(this.searchFormOld, this.searchForm, this.funcArray());
            }
        },

        watch: {
            goodsId(val) {
                this.searchForm.goodsId = val;
            }
        },

        created() {
            if (this.create) {
                this.addFlag = 1;
            } else {
                this.addFlag = 2;
            }
            this.searchForm.goodsId = this.goodsId;
            this.pictureUrl = cfg.service.pictureUrl + '/';
            this.getUnits();
            if (this.addFlag === 2) {
                this.getGoods();
            }
        },

        methods: {
            funcArray() {
                let funcArray = [];
                funcArray['imgs'] = function (a, b) {
                    return a.join(',') === b.join(',');
                };
                return funcArray;
            },

            checkcq(rule, value, callback) {
                let reg = /^[1-9]\d{0,7}$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入序号，最大8位数字！'));
                    return;
                }
                callback();
            },

            getGoods() {
                let params = {};
                params.goodsId = this.searchForm.goodsId;
                getGooTGoodsinfoById(this, params).then(
                    res => {
                        console.log('获取物资信息', res);//debug
                        this.searchForm.categoryId = res.data.categoryId;
                        this.searchForm.goodsName = res.data.goodsName;
                        this.searchForm.mainPicture = res.data.mainPicture;
                        this.searchForm.goodsImgs = res.data.goodsImgs;
                        this.searchForm.goodsType = res.data.goodsType;
                        this.searchForm.unitId = res.data.unitId;
                        this.searchForm.memo = res.data.memo;
                        this.searchForm.cq=res.data.cq;
                        this.searchForm.version = res.data.version;
                        let tmp = [];
                        tmp = this.searchForm.goodsImgs.split(',');
                        this.searchForm.imgs = trimSpace(tmp);
                        console.log('图片', this.searchForm.imgs);//debug

                        //老数据
                        this.searchFormOld.goodsId = res.data.goodsId;
                        this.searchFormOld.categoryId = res.data.categoryId;
                        this.searchFormOld.goodsName = res.data.goodsName;
                        this.searchFormOld.mainPicture = res.data.mainPicture;
                        this.searchFormOld.goodsImgs = res.data.goodsImgs;
                        this.searchFormOld.goodsType = res.data.goodsType;
                        this.searchFormOld.unitId = res.data.unitId;
                        this.searchFormOld.memo = res.data.memo;
                        this.searchFormOld.cq=res.data.cq;
                        this.searchFormOld.version = res.data.version;
                        let tmp2 = [];
                        tmp2 = this.searchFormOld.goodsImgs.split(',');
                        this.searchFormOld.imgs = trimSpace(tmp2);

                        //处理分类信息
                        this.getCategoryName(this.searchFormOld.categoryId);
                    },

                    res => {

                    }
                ).catch();
            },

            getCategoryName(id) {
                let params = {};
                params.categoryId = id;
                getGooCategoryById(this, params).then(
                    res => {
                        this.placeholder = res.data.categoryName;
                    },
                    res => {

                    }
                ).catch();
            },

            testClick() {
                console.log("this.searchForm", this.searchForm);//debug
            },

            unitChange() {
                console.log('单位变化', this.searchForm.unitId);//debug
                //如果单位是新增的，那么发送新增单位交易
                if (inArrayOptionByCons(this.units, this.searchForm.unitId, 'unitId')) {
                    return;
                }
                let params = {};
                params.unitName = this.searchForm.unitId;
                addGooUnitinfo(this, params).then(
                    res => {
                        let unit = res.data;
                        this.units.push(unit);
                        this.$nextTick(() => {
                            this.searchForm.unitId = unit.unitId;
                        });
                    },
                    res => {
                        this.$nextTick(() => {
                            this.searchForm.unitId = null;
                        });
                    }
                ).catch();
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

            categoryClick(nodeInfo) {
                this.searchForm.categoryId = nodeInfo.categoryId;
            },

            addConfirm() {
                this.$refs.searchForm.validate((valid) => {
                    if (valid) {
                        this.formCommit();
                    } else {
                        return false;
                    }
                });
            },

            formCommit() {
                if (this.create) {
                    //新增
                    let params = {};
                    params.goodsId = this.searchForm.goodsId;
                    params.categoryId = this.searchForm.categoryId;
                    params.goodsName = this.searchForm.goodsName;
                    //第一张图作为主图
                    params.mainPicture = this.searchForm.imgs[0];
                    params.goodsImgs = this.searchForm.goodsImgs = this.searchForm.imgs.join(',');
                    params.goodsType = this.searchForm.goodsType;
                    params.unitId = this.searchForm.unitId;
                    params.memo = this.searchForm.memo;
                    params.cq=this.searchForm.cq;
                    addGooTGoodsinfo(this, params).then(
                        res => {
                            this.$message.success('新增成功!');
                            this.addFlag = 2;
                            this.$emit('createOk');
                            this.searchForm.version = res.data.version;
                        },
                        res => {

                        }
                    ).catch();
                } else {
                    //修改
                    let params = {};
                    params.goodsId = this.searchForm.goodsId;
                    params.version = this.searchForm.version;
                    if (this.searchForm.categoryId !== this.searchFormOld.categoryId) {
                        params.categoryId = this.searchForm.categoryId;
                    }
                    if (this.searchForm.goodsName !== this.searchFormOld.goodsName) {
                        params.goodsName = this.searchForm.goodsName;
                    }
                    if (this.searchForm.mainPicture !== this.searchFormOld.mainPicture) {
                        params.mainPicture = this.searchForm.mainPicture;
                    }
                    if (this.searchForm.imgs.join(',') !== this.searchFormOld.imgs.join(',')) {
                        params.goodsImgs = this.searchForm.goodsImgs = this.searchForm.imgs.join(',');
                    }
                    if (this.searchForm.goodsType !== this.searchFormOld.goodsType) {
                        params.goodsType = this.searchForm.goodsType;
                    }
                    if (this.searchForm.unitId !== this.searchFormOld.unitId) {
                        params.unitId = this.searchForm.unitId;
                    }
                    if (this.searchForm.cq !== this.searchFormOld.cq) {
                        params.cq=this.searchForm.cq;
                    }
                    if (this.searchForm.memo !== this.searchFormOld.memo) {
                        params.memo = this.searchForm.memo;
                    }
                    updateGooTGoodsinfoById(this, params).then(
                        res => {
                            this.$message.success('保存成功!');
                        },
                        res => {

                        }
                    ).catch();
                }

                //老数据
                this.searchFormOld.goodsId = this.searchForm.goodsId;
                this.searchFormOld.categoryId = this.searchForm.categoryId;
                this.searchFormOld.goodsName = this.searchForm.goodsName;
                this.searchFormOld.mainPicture = this.searchForm.mainPicture;
                this.searchFormOld.goodsImgs = this.searchForm.goodsImgs;
                this.searchFormOld.goodsType = this.searchForm.goodsType;
                this.searchFormOld.unitId = this.searchForm.unitId;
                this.searchFormOld.memo = this.searchForm.memo;
                this.searchFormOld.version = this.searchForm.version;
                this.searchFormOld.cq = this.searchForm.cq;
                let tmp2 = [];
                tmp2 = this.searchFormOld.goodsImgs.split(',');
                this.searchFormOld.imgs = trimSpace(tmp2);
            },

            handelPicturePost(data) {
                console.log("param:", data);
                let params = {};
                if (this.searchForm.mainPicture && !this.create) {
                    //修改主图
                    params.operFlag = '2';
                } else {
                    //新增主图
                    params.operFlag = '1';
                }
                this.time = this.getTime();
                params.goodsId = this.searchForm.goodsId;
                params.index = 'M';
                params.goodsFileNames = data.file;
                sendPicture(this, params).then(
                    res => {
                        this.searchForm.imgs.push(res.data.fileNames);
                        if (!this.searchForm.mainPicture || this.searchForm.mainPicture === '') {
                            console.log('修改main');//debug
                            this.searchForm.mainPicture = res.data.fileNames;
                        }
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

            handelPicturePostMain(data) {
                console.log("param:", data);
                let params = {};
                if (this.searchForm.mainPicture && !this.create) {
                    //修改主图
                    params.operFlag = '2';
                } else {
                    //新增主图
                    params.operFlag = '1';
                }
                this.time = this.getTime();
                params.goodsId = this.searchForm.goodsId;
                params.index = 'M';
                params.goodsFileNames = data.file;
                sendPicture(this, params).then(
                    res => {
                        this.searchForm.mainPicture = res.data.fileNames;
                    },
                    res => {

                    }
                ).catch();
            },

            beforeAvatarUploadMain(file) {
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

            getTime() {
                return new Date().getTime();
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

            checkUploadButton() {
                let num = this.searchForm.imgs.length;
                if (num < 5) {
                    return true;
                } else {
                    this.$message.error("物资轮播信息不能大于5条");
                    return false;
                }
            },

            onMainPicTap(row) {
                let end = row.substr(row.lastIndexOf(".") + 1);
                if (end !== 'jpg') {
                    this.$message.error("只能设置图片为主图");
                    return false;
                }
                this.searchForm.mainPicture = row;
            },

            deletePicTap(item, index) {
                this.searchForm.imgs.splice(index, 1);
            },

            onMove(relatedContext, draggedContext) {
            },

            onChangeTap() {
            },
        }
    }
</script>

<style scoped>
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

</style>
