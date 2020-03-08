<template>
    <div>
        <div class="list-name">质保证书</div>
        <div class="top-btn">
            <el-upload
                :action="pictureUrl"
                multiple
                list-type="fileList"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="handelPicturePost">
                <el-button size="small" type="primary">添加图片</el-button>
            </el-upload>
            <el-button size="small" type="primary" class="top-btn-right" @click="onAddTextTap">添加文字</el-button>
            <el-button size="small" type="primary" :disabled="saveDisabled" class="top-btn-right" @click="onSaveTap"
                       style="margin-left: 10px;">
                保存
            </el-button>
            <el-button size="small" type="danger" class="top-btn-right" @click="onTruncatTap"
                       style="margin-left: 10px;">清空
            </el-button>
        </div>
        <div class="list-name">质保证书展示</div>
        <div class="drag-box-item">
            <draggable v-model="goodsDesc" :move="onMove">
                <transition-group tag="div" id="goodsDesc" class="item-ul">
                    <div v-for="(item,index) in goodsDesc" :key="index" class="drag-list-desc">
                        <div v-if="item.flag===1" class="drag-list-img-div-desc">
                            <img :src="pictureUrl+item.cont" class="drag-list-img-desc"
                                 :class="index==0?'drag-list-top':(index==goodsDesc.length-1?'drag-list-bottom':'{}')"/>
                        </div>
                        <div v-else class="drag-list-text-desc"
                             :class="index==0?'drag-list-top':(index==goodsDesc.length-1?'drag-list-bottom':'{}')">
                            {{item.cont}}
                        </div>
                        <el-button type="danger" class="drag-list-button-desc" @click="deletePicTap(item, index)">删除
                        </el-button>
                    </div>
                </transition-group>
            </draggable>
        </div>
    </div>
</template>

<script>
    import {
        addGoodsQualitycertify,
        getGoodsQualitycertifyById,
        sendPicture,
        updateGoodsQualitycertifyById
    } from '../../../util/module';
    import cfg from '../../../config/cfg';
    import draggable from 'vuedraggable'

    export default {
        data() {
            return {
                pictureUrl: '',
                oper: null,  // 1: 新增，2：修改
                goodsDesc: [],
                saveDisabled: true,
                version: null,
            }
        },

        props: ['create', 'goodsId'],

        watch: {
            goodsId(val) {
                this.pictureUrl = cfg.service.pictureUrl + '/' + this.goodsId + '/';
            }
        },

        created() {
            if (!this.create) {
                this.initData();
            } else {
                this.oper = 1;
            }
            this.pictureUrl = cfg.service.pictureUrl + '/' + this.goodsId + '/';
        },

        components: {
            draggable
        },

        methods: {
            initData() {
                let params = {};
                params.goodsId = this.goodsId;
                getGoodsQualitycertifyById(this, params).then(
                    (res) => {
                        if (res.data != null) {
                            try {
                                this.version = res.data.version;
                                this.goodsDesc = JSON.parse(res.data.qualityCertificate || '[]');
                            } catch (e) {
                                this.goodsDesc = [];
                            }
                            this.oper = 2;
                        } else {
                            this.oper = 1;
                            this.goodsDesc = [];
                        }
                    },
                    (res) => {
                        this.$message.error("获取商品详细信息失败");
                    });
            },

            beforeAvatarUpload(file) {
                console.log("file:", file);
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 4;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 4MB!');
                }
                return isJPG && isLt2M;
            },

            getTime() {
                return new Date().getTime();
            },

            handelPicturePost(data) {
                let params = {};
                params.operFlag = '1';
                this.time = this.getTime();
                params.goodsId = this.goodsId;
                params.index = 'P';
                params.goodsFileNames = data.file;
                sendPicture(this, params).then(
                    res => {
                        this.$message.success("上传成功");
                        let filenames = res.data.fileNames;
                        console.log("filenames:", filenames);
                        if (filenames) {
                            let fileArray = filenames.split(',');
                            if (!fileArray[fileArray.length - 1]) {
                                fileArray.splice(fileArray.length - 1, 1);
                            }
                            console.log("fileArray:", fileArray);
                            let goodsDesc = this.goodsDesc || [];
                            fileArray.forEach(item => {
                                let fileInfo = {
                                    flag: 1,
                                    cont: item
                                };
                                goodsDesc.push(fileInfo);
                            });
                            this.goodsDesc = goodsDesc;
                        }
                        this.saveDisabled = false;
                    },
                    res => {

                    }
                ).catch();
            },


            onAddTextTap() {
                this.$prompt('请输入文字', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '不能为空'
                }).then(({value}) => {
                    console.log("value:", value);
                    let goodsDesc = this.goodsDesc || [];
                    let fileInfo = {
                        flag: 2,
                        cont: value
                    };
                    goodsDesc.push(fileInfo);
                    this.goodsDesc = goodsDesc;
                    this.saveDisabled = false;
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },

            onSaveTap() {
                if (this.oper === 1) {
                    //新增
                    let params = {};
                    params.goodsId = this.goodsId;
                    params.qualityCertificate = JSON.stringify(this.goodsDesc);
                    addGoodsQualitycertify(this, params).then(
                        res => {
                            this.$message.success("新增成功");
                            this.oper = 2;
                            this.saveDisabled = true;
                            this.version = res.data.version;
                        },
                        res => {

                        }
                    ).catch();
                }

                if (this.oper === 2) {
                    //修改
                    let params = {};
                    params.goodsId = this.goodsId;
                    params.qualityCertificate = JSON.stringify(this.goodsDesc);
                    params.version = this.version;
                    updateGoodsQualitycertifyById(this, params).then(
                        res => {
                            this.$message.success("保存成功");
                            this.saveDisabled = true;
                            this.version = res.data.version;
                        },
                        res => {

                        }
                    ).catch();
                }

            },

            //清空数据
            onTruncatTap() {
                this.$confirm('是否清空数据? 确定清空后点击保存', "清空", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(
                    () => {
                        this.goodsDesc = [];
                        this.saveDisabled = false;
                    }
                ).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },

            deletePicTap(item, index) {
                console.log("index", index);//debug
                this.goodsDesc.splice(index, 1);
                this.saveDisabled = false;
            },

            onMove() {
                console.log("hello");//debug
                this.saveDisabled = false;
            }
        },

    }
</script>

<style>
    .list-name {
        color: #A0A0A0;
        padding: 10px 0;
    }

    .top-btn {
        display: flex;
        flex-direction: row;
        padding-bottom: 10px;
    }

    .top-btn-right {
        margin-left: 10px;
    }

    .drag-box-item {
        display: flex;
        flex-direction: column;
        margin-right: 16px;
    }

    .item-ul {
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
    }

    .drag-list-desc {
        display: flex;
        list-style: none;
        background-color: #fff;
        border-radius: 6px;
        cursor: pointer;
        -webkit-transition: border .3s ease-in;
        transition: border .3s ease-in;
        /*width: 300px;*/
    }

    .drag-list-img-div-desc {
        float: left;
        width: 300px;
    }

    .drag-list-img-desc {
        border-left: 1px solid #e1e4e8;
        border-right: 1px solid #e1e4e8;
        width: 100%;
        height: auto;
        margin: 0px;
        padding: 0px;
        float: left;
    }

    .drag-list-top {
        border-top: 1px solid #e1e4e8;
    }

    .drag-list-bottom {
        border-bottom: 1px solid #e1e4e8;
    }

    .drag-list-text-desc {
        float: left;
        border-left: 1px solid #e1e4e8;
        border-right: 1px solid #e1e4e8;
        text-align: center;
        padding: 10px 0;
        width: 300px;
    }

    .drag-list-text-desc > text {
        width: 300px;
    }

    .drag-list-button-desc {
        margin-left: 5px;
        float: left;
        height: 35px;
    }
</style>
