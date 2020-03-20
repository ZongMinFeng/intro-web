<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" :disabled='refDisabled' icon="el-icon-refresh" @click="onRefresh"
                           class="search-btn">
                    刷新
                </el-button>
            </div>

            <div width="100%" class="div-tree">
                <el-card class="form-container" shadow="never">
                    <level-tree v-if="DestroyIncomeStatistics === true" create @createTap="createTap"></level-tree>
                </el-card>
            </div>

            <el-dialog
                :title="dialogTitle"
                :visible.sync="dialogVisible"
                width="50%">
                <el-form ref="dialogForm" :model="dialogForm" :rules="rules" label-width="110px">
                    <el-form-item label="子公司名称" prop="instName">
                        <el-input v-model="dialogForm.instName" maxlength="64" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item v-if="flag===1" label="总经理登录名" prop="tellerId">
                        <el-input v-model="dialogForm.tellerId" maxlength="64" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item v-if="flag===1" label="总经理名称" prop="tellerName">
                        <el-input v-model="dialogForm.tellerName" maxlength="64" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item v-if="flag===1" label="总经理手机号" prop="tellerPhone">
                        <el-input v-model="dialogForm.tellerPhone" maxlength="11" auto-complete="off"></el-input>
                    </el-form-item>
                    <div>
                        <!--<el-form-item v-if="flag===1" label="管理员权限" prop="tellerFuncMap">-->
                        <div style="margin-bottom: 5px;">请赋予子公司总经理权限</div>
                        <position-selection v-model="dialogForm.tellerFuncMap"></position-selection>
                        <!--测试使用-->
                        <!--已选择：{{dialogForm.tellerFuncMap}}-->
                        <!--</el-form-item>-->
                    </div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleConfirm('instPreservationForm')">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="请记录登录信息" :visible.sync="passwordVisible">
                <div class="passWordDiv">
                    倒计时:&nbsp;{{passwordForm.time}}<br>
                    <br>
                    用户名:&nbsp;{{passwordForm.tellerId}}<br>
                    <br>
                    密&nbsp;&nbsp;&nbsp;&nbsp;码:&nbsp;{{passwordForm.tellerPwd}}
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="passwordVisible = false">确 定</el-button>
                </span>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    import {validUsername} from '../../../util/validate'
    import {sendServer} from '../../../util/common'
    import {addInst, checkTellerId, instGetAllById, updateInstInfo} from '../../../util/module'
    import cfg from '../../../config/cfg'
    import {Toast, Indicator} from 'mint-ui'
    import LevelTree from '../../common/LevelTree'
    import bus from '../../common/bus'
    import PositionSelection from "../../common/selection/PositionSelection";

    export default {
        name: 'instActionSet',
        components: {
            LevelTree,
            PositionSelection
        },
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!value) {
                    callback();
                }
                if (!validUsername(value)) {
                    callback(new Error('请填写纯数字手机号！'))
                } else if (value.substr(0, 1) !== '1') {
                    callback(new Error('手机号格式错误！'))
                } else if (value.length !== 11) {
                    callback(new Error('手机号必须为11位！'))
                } else {
                    callback()
                }
            };

            const validateInstName = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请填写公司名称！'))
                } else {
                    callback()
                }
            };

            const checkTellerId=(rule, value, callback)=>{
                if (!value || value === '') {
                    callback(new Error('请输入管理员登录名'));
                    return;
                }
                let reg=/^[\w]*$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入字母，数字或者下划线'));
                    return;
                }
                callback();
            };
            return {
                instArray: [],
                dialogVisible: false,
                instLevel: 0,
                titleStatus: 0,
                maxlength: 20,
                instPreservationForm: {
                    aliasName: '',
                    instName: '',
                    adminPhone: ''
                },
                DestroyIncomeStatistics: true,
                instId: '',
                addDisabled: false,
                refDisabled: false,
                uptDisabled: false,
                rules: {
                    instName: [{required: true, validate: '', trigger: 'blur', validator: validateInstName}],
                    tellerId: [{required: true,  trigger: 'blur', validator:checkTellerId}],
                    tellerPhone: [{required: false, trigger: 'blur', validator: validateUsername}]
                },
                dialogForm: {
                    specInstId: null,
                    instName: null,
                    instLevel: null,
                    tellerName: null,
                    tellerId: null,
                    tellerPhone: null,
                    tellerFuncMap: '',
                },
                flag: 1,
                passwordVisible: false,
                passwordForm: {
                    tellerId: '',
                    tellerPwd: '',
                    time:'',
                },
                timer:'',
                timerData:'',
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
            let sysInstInfo = JSON.parse(localStorage.getItem('sysInstInfo'));
            this.sysInstInfo = sysInstInfo;
            this.instLevel = sysInstInfo.instLevel;

            bus.$on('sysInstInfo', (red) => {
                let sysInstInfo = JSON.parse(localStorage.getItem('sysInstInfo'));
                this.sysInstInfo = sysInstInfo;
                this.instLevel = sysInstInfo.instLevel;
            });

        },

        filters: {
            instIsLeaf(isLeaf) {
                console.log('status', status);
                if (isLeaf === 'N') {
                    return '是'
                } else {
                    return '否'
                }
            }
        },


        beforeDestroy() {
            bus.$off('sysInstInfo');
            clearTimeout(this.timer);
        },

        methods: {
            instGetAllByIdFun() {
                instGetAllById(this, this.instId, Toast).then((res) => {
                    console.log('res', res);
                    let data = res.data;
                    if (!data) {
                        Toast({
                            message: res.msg,
                            duration: 2000
                        });
                        return
                    }
                    this.instArray = data
                }, (res) => {
                    console.log('res', res)
                })
            },

            //用于检测公司管理员ID，目前不检测
            checkSpecTellerId(rule, specTellerId, callback) {
                console.log("specTellerId", specTellerId);//debug
                let params = {};
                params.specDepartmentId = this.searchForm.departmentId;
                params.specTellerId = specTellerId;
                checkTellerId(this, params).then(
                    res => {
                        callback();
                    },
                    res => {
                        if (res.returnMsg) {
                            callback(new Error(res.returnMsg));
                        } else {
                            callback(new Error('用户已存在!'));
                        }
                    }
                ).catch();
            },

            onAddNewTap() {
                this.dialogVisible = true;
                this.dialogTitle = this.getDialogTitle('add');
                this.instPreservationForm.specInstId = this.sysInstInfo.instId;
                this.titleStatus = 0
            },

            onRefresh() {
                this.DestroyIncomeStatistics = false;
                this.dialogForm = {
                    instName: '',
                    tellerPhone: ''
                };
                this.$nextTick(() => {
                    this.DestroyIncomeStatistics = true
                })
            },

            handleConfirm(userAddForm) {
                this.$refs[userAddForm].validate((valid) => {
                    if (valid) {
                        this.formCommit();
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },

            formCommit() {
                let params = {};
                if (this.flag === 1) {
                    //新增
                    params.specInstId = this.dialogForm.specInstId;
                    params.instName = this.dialogForm.instName;
                    params.instLevel = this.dialogForm.instLevel;
                    params.tellerName = this.dialogForm.tellerName;
                    params.tellerId = this.dialogForm.tellerId;
                    params.tellerPhone = this.dialogForm.tellerPhone;
                    params.tellerFuncMap = this.dialogForm.tellerFuncMap;
                    addInst(this, params).then(
                        res => {
                            this.$message.success('新增成功');
                            this.passwordForm.tellerPwd = res.data.tellerPwd;
                            this.passwordForm.tellerId = this.dialogForm.tellerId;
                            this.onRefresh();
                            this.dialogVisible = false;
                            this.passwordVisible = true;

                            //倒计时
                            this.passwordForm.time=30;
                            this.timerData=setInterval(()=>{
                                this.passwordForm.time--;
                            }, 1000);
                            this.timer=setTimeout(()=>{
                                this.passwordVisible=false;
                                clearInterval(this.timerData);
                            }, 30000);
                        },
                        res => {
                        }
                    ).catch();
                }

                if (this.flag === 2) {
                    //修改
                    params.specInstId = this.dialogForm.specInstId;
                    params.version = this.dialogForm.version;
                    params.instName = this.dialogForm.instName;
                    updateInstInfo(this, params).then(
                        res => {
                            this.$message.success('修改成功');
                            let sysInstDepartment = res.data;
                            localStorage.setItem('sysInstDepartment', JSON.stringify(sysInstDepartment));
                            this.onRefresh();
                            this.dialogVisible = false;
                        },
                        res => {
                        }
                    ).catch();
                }
            },

            instPreservation() {
                let urlParams = {};
                let send = {};
                urlParams.url = cfg.service.instPreservation.url + '/' + cfg.service.instPreservation.action;
                urlParams.txnId = cfg.service.instPreservation.txnId;
                send.aliasName = this.instPreservationForm.aliasName;
                send.instName = this.instPreservationForm.instName;
                send.instLevel = parseInt(this.instLevel) + 1;
                send.adminPhone = this.instPreservationForm.adminPhone;
                urlParams.send = send;
                let singArray = {
                    instLevel: send.instLevel,
                    adminPhone: send.adminPhone
                };
                urlParams.singArray = singArray;
                let that = this;
                sendServer(urlParams, this, Toast).then(
                    (res) => {
                        console.log('res', res)
                        that.dialogVisible = false
                        if (!res.data) {
                            Toast({
                                message: res.msg,
                                duration: 2000
                            })
                            return
                        }
                        this.instPreservationForm = {
                            aliasName: '',
                            instName: '',
                            adminPhone: ''
                        }
                        if (res.data.tellerPwd) {
                            this.$confirm('新建成功，管理员的密码为：' + res.data.tellerPwd, 'Info', {
                                type: 'Info'
                            })
                                .then(_ => {
                                    this.DestroyIncomeStatistics = false
                                    this.$nextTick(() => {
                                        that.DestroyIncomeStatistics = true
                                    })
                                })
                                .catch(_ => {
                                    console.log('取消')
                                    this.DestroyIncomeStatistics = false
                                    this.$nextTick(() => {
                                        that.DestroyIncomeStatistics = true
                                    })
                                })
                        } else {
                            this.$message.success('创建成功')
                            this.DestroyIncomeStatistics = false
                            this.$nextTick(() => {
                                that.DestroyIncomeStatistics = true
                            })
                        }
                    }, (res) => {
                        this.dialogVisible = false
                        if (res === 'timeout') {
                            this.DestroyIncomeStatistics = false
                            this.$nextTick(() => {
                                that.DestroyIncomeStatistics = true
                            })
                        }
                    }
                )
            },


            instModification() {
                let urlParams = {};
                let send = {};
                urlParams.url = cfg.service.instModification.url + '/' + cfg.service.instModification.action
                urlParams.txnId = cfg.service.instModification.txnId

                if (this.instPreservationForm.aliasName !== this.sysInstInfo.aliasName) {
                    send.aliasName = this.instPreservationForm.aliasName
                }

                if (this.instPreservationForm.instName !== this.sysInstInfo.instName) {
                    send.instName = this.instPreservationForm.instName
                }

                urlParams.send = send
                let singArray = {}
                urlParams.singArray = singArray
                let that = this
                console.log('urlParams', urlParams)
                sendServer(urlParams, this, Toast).then(
                    (res) => {
                        console.log('res', res)
                        that.dialogVisible = false
                        if (!res.data) {
                            Toast({
                                message: res.msg,
                                duration: 2000
                            })
                            return
                        }

                        if (res.data.aliasName) {
                            this.sysInstInfo.aliasName = res.data.aliasName
                        }

                        if (res.data.instName) {
                            this.sysInstInfo.instName = res.data.instName
                        }
                        this.sysInstInfo.instId = res.data.instId
                        this.sysInstInfo.modiDate = res.data.modiDate
                        this.sysInstInfo.modiTellerId = res.data.modiTellerId

                        localStorage.setItem('sysInstInfo', JSON.stringify(this.sysInstInfo))
                        bus.$emit('tellerToParentInst', '')
                        this.$message.success('修改成功')
                        this.DestroyIncomeStatistics = false
                        this.instPreservationForm = {
                            aliasName: '',
                            instName: '',
                            adminPhone: ''
                        }
                        this.$nextTick(() => {
                            that.DestroyIncomeStatistics = true
                        })
                    }, (res) => {
                        console.log('res', res)
                        this.dialogVisible = false
                        if (res === 'timeout') {
                            this.DestroyIncomeStatistics = false
                            this.$nextTick(() => {
                                that.DestroyIncomeStatistics = true
                            })
                        }
                    }
                )
            },

            getDialogTitle(uptOradd) {
                if (uptOradd === 'add' && this.instLevel === 1) {
                    return '添加物业集团'
                } else if (uptOradd === 'add' && this.instLevel === 2) {
                    return '添加物业子机构 '
                } else if (uptOradd === 'add' && this.instLevel === 3) {
                    this.maxlength = 30
                    return '添加物业小区 '
                } else if (uptOradd === 'add' && this.instLevel === 4) {
                    this.maxlength = 10
                    return '添加物业楼栋 '
                } else if (uptOradd === 'upt' && this.instLevel === 1) {
                    return '修改物业平台'
                } else if (uptOradd === 'upt' && this.instLevel === 2) {
                    return '修改物业集团 '
                } else if (uptOradd === 'upt' && this.instLevel === 3) {
                    this.maxlength = 30
                    return '修改物业子机构 '
                } else if (uptOradd === 'upt' && this.instLevel === 4) {
                    this.maxlength = 10
                    return '修改物业小区 '
                } else if (uptOradd === 'upt' && this.instLevel === 5) {
                    this.maxlength = 10
                    return '修改物业楼栋 '
                }
            },

            createTap(instInfo) {
                if (this.$refs.dialogForm) {
                    this.$refs.dialogForm.clearValidate();
                }
                this.flag = 1;
                this.dialogForm={};
                this.dialogForm.specInstId = instInfo.instId;
                this.dialogForm.instLevel = parseInt(instInfo.instLevel) + 1 + '';
                this.dialogVisible = true;
            },

            updateTap(instInfo) {
                this.flag = 2;
                this.dialogForm.specInstId = instInfo.instId;
                this.dialogForm.version = instInfo.version;
                this.dialogForm.instName = instInfo.instName;
                this.dialogVisible = true;
            },
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-top: 10px;
        margin-bottom: 20px;
        display: inline-block;
        width: 100%;
    }

    .table {
        width: 100%;
    }

    .search-btn {
        float: right;
    }

    .form-container {
        width: 80%;
    }

    .div-tree {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
    }

    .passWordDiv {
        width: 120px;
        margin: 0 auto;
    }

</style>
