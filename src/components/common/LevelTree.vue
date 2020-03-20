<template>
    <div class="tree-leve">
        <el-tree
            :props="props"
            :load="loadNode"
            node-key="instId"
            ref="tree"
            highlight-current
            :expand-on-click-node="false"
            lazy
            @node-click="handleNodeClick" style="padding:10px 0">
       <span class="custom-tree-node" slot-scope="{ node, data}">
            <span>
                <svg-icon class="svgname" icon-class="terrace" v-if="node.data.instLevel === '1'"/>
                <svg-icon class="svgname" icon-class="group" v-if="node.data.instLevel === '2'"/>
                <svg-icon class="svgname" icon-class="sub-institutional" v-if="node.data.instLevel === '3'"/>
                <svg-icon class="svgname" icon-class="village" v-if="node.data.instLevel === '4'"/>
                <svg-icon class="svgname" icon-class="building" v-if="node.data.instLevel === '5'"/>
                <span :title="node.label">{{ node.label.substring(0, 20) }}</span><span v-if="node.label.length>20">...</span>
            </span>
            <span style="font-size: 12px;">
                <span v-if="node.data.adminName">管理员:{{node.data.adminName}}</span>
                <span v-if="node.data.adminMobile">&nbsp;&nbsp;手机号:{{node.data.adminMobile}}</span>
            </span>
            <span>
                <el-button v-if="create!=null&&node.data.instLevel === '1'"
                           type="text"
                           icon="el-icon-circle-plus"
                           @click.stop="() => createNew(node,data)">
                新增子公司
                </el-button>
                <el-button v-if="create!=null&&node.data.instLevel !== '1'"
                           type="text"
                           icon="el-icon-s-custom"
                           @click.stop="() => changeAdmin(node,data)">
                更换管理员
                </el-button>
                <el-button v-if="create!=null"
                           type="text"
                           icon="el-icon-edit"
                           @click.stop="() => updateTap(node,data)">
                    修改公司
                </el-button>
            </span>
           <!--只有两层，不需要刷新-->
           <!--<span>-->
           <!--<el-button-->
           <!--type="text"-->
           <!--icon="el-icon-refresh"-->
           <!--@click.stop="() => append(node,data)">-->
           <!--刷新-->
           <!--</el-button>-->
           <!--</span>-->
      </span>
        </el-tree>

        <div class="svg-view">
            <span style="margin-right: 10px;">图例备注：</span>
            <div v-if="instLevel ==='1'" class="svg-view-cont">
                <svg-icon class="svgname" icon-class="terrace"/>
                <span class="svg-view-span">总公司</span>
            </div>

            <div v-if="instLevel ==='1'||instLevel ==='2'" class="svg-view-cont">
                <svg-icon class="svgname" icon-class="group"/>
                <span class="svg-view-span">子公司</span>
            </div>

            <!--目前只有两层-->
            <!--<div v-if="instLevel !=='4'&&instLevel !=='5'" class="svg-view-cont">-->
            <!--<svg-icon class="svgname" icon-class="sub-institutional"/>-->
            <!--<span class="svg-view-span">物业子机构</span>-->
            <!--</div>-->


            <!--<div v-if="instLevel !=='5'" class="svg-view-cont">-->
            <!--<svg-icon class="svgname" icon-class="village"/>-->
            <!--<span class="svg-view-span">物业小区</span>-->
            <!--</div>-->

            <!--<div class="svg-view-cont">-->
            <!--<svg-icon class="svgname" icon-class="building"/>-->
            <!--<span class="svg-view-span">物业楼栋</span>-->
            <!--</div>-->
        </div>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
            <el-form ref="dialogForm" :model="dialogForm" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="24" v-if="flag===2">
                        <el-form-item label="公司名称" prop="instName"
                                      :rules="[{required:true, message:'请输入名称', trigger: 'blur'}]">
                            <el-input v-model="dialogForm.instName" placeholder="请输入名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-form-item v-if="flag===3" label="总经理登录名" prop="tellerId">
                        <el-input v-model="dialogForm.tellerId" maxlength="64" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item v-if="flag===3" label="总经理名称" prop="tellerName">
                        <el-input v-model="dialogForm.tellerName" maxlength="64" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item v-if="flag===3" label="总经理手机号" prop="tellerPhone">
                        <el-input v-model="dialogForm.tellerPhone" maxlength="11" auto-complete="off"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog_footer">
                <el-button @click="dialogVisible=false">取消</el-button>
                <el-button type="primary" @click="dialogFormConfirm">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="请记录登录信息" :visible.sync="passwordVisible">
            <div class="passWordDiv">
                倒计时:&nbsp;<span style="color:red">{{passwordForm.time}}</span><br>
                <br>
                用户名:&nbsp;{{passwordForm.tellerId}}<br>
                <br>
                密&nbsp;&nbsp;&nbsp;&nbsp;码:&nbsp;<b>{{passwordForm.tellerPwd}}</b>
            </div>
            <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="passwordVisible = false">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import bus from './bus'
    import {chgInstAdmin, getAllInstById, getInstById, updateInstInfo} from "../../util/module";
    import {validUsername} from "../../util/validate";

    export default {
        name: 'LevelTree',
        props: ['create'],
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
                sysInstInfoAll: [],
                instLevel: 0,
                props: {
                    label: 'instName',
                    children: [],
                    isLeaf: 'leaf',
                },
                dialogVisible: false,
                flag: 1,//1.新增 2.修改 3.更换管理员
                dialogForm: {
                    specInstId: null,
                    version: null,
                    instName: null,
                    tellerId:null,
                    tellerName:null,
                    tellerPhone:null,
                    adminMobile:null,
                    adminName:null,
                },
                nodeNow: null,
                dataNow: null,
                rules: {
                    instName: [{required: true, validate: '', trigger: 'blur', validator: validateInstName}],
                    tellerId: [{required: true,  trigger: 'blur', validator:checkTellerId}],
                    tellerPhone: [{required: false, trigger: 'blur', validator: validateUsername}]
                },
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
                }
                
                if (this.flag===2){
                    return '修改';
                }

                if (this.flag === 3) {
                    return '更换管理员';
                }

                return '';
            }
        },

        created() {
            let sysInstInfo = JSON.parse(localStorage.getItem('sysInstInfo'));
            this.instLevel = sysInstInfo.instLevel;
            let sysInstInfoAll = [];
            let sysInstInList = {
                instId: sysInstInfo.instId,
                parentInstId: sysInstInfo.parentInstId,
                instName: sysInstInfo.instName,
                isLeaf: sysInstInfo.isLeaf,
                instLevel: sysInstInfo.instLevel,
                status: sysInstInfo.status,
                version: sysInstInfo.version,
                linkMan:sysInstInfo.linkMan,
                linkPhone:sysInstInfo.linkPhone,
            };
            if (sysInstInfo.isLeaf === 'N') {
                sysInstInList.leaf = false
            } else {
                sysInstInList.leaf = true
            }
            sysInstInfoAll.push(sysInstInList);
            this.sysInstInfoAll = sysInstInfoAll;
        },
        methods: {

            append(node, data) {
                let instId = data.instId;
                getInstById(this, instId, Toast).then((res) => {
                    console.log('res', res);
                    let data = res.data;
                    if (!data) {
                        Toast({
                            message: res.msg,
                            duration: 2000
                        });
                        node.isLeaf = true;
                        return
                    }
                    let InstInList = {
                        instId: res.data.instId,
                        parentInstId: res.data.parentInstId,
                        instName: res.data.instName,
                        isLeaf: res.data.isLeaf,
                        instLevel: res.data.instLevel,
                        status: res.data.status
                    };
                    if (res.data.isLeaf === 'N') {
                        InstInList.leaf = false;
                        node.isLeaf = false
                    } else {
                        InstInList.leaf = true;
                        node.isLeaf = true
                    }
                    var theChildren = node.childNodes;
                    theChildren.splice(0, theChildren.length);
                    node.loaded = false;
                    node.expanded = false;
                    node.data = InstInList;
                    this.$message.success('更新成功');
                    let instId = localStorage.getItem('instId') || '';
                    if (res.data.instId === instId) {
                        localStorage.setItem('sysInstInfo', JSON.stringify(res.data));
                        bus.$emit('tellerToParentInst', '');
                        bus.$emit('sysInstInfo', '');
                    }
                }, (res) => {
                    console.log('res', res);
                })
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
                }

                if (this.flag === 2) {
                    //修改
                    params.specInstId = this.dialogForm.specInstId;
                    params.version = this.dialogForm.version;
                    params.instName = this.dialogForm.instName;
                    updateInstInfo(this, params).then(
                        res => {
                            let sysInstDepartment = res.data;
                            localStorage.setItem('sysInstDepartment', JSON.stringify(sysInstDepartment));
                            this.dataNow.instName = sysInstDepartment.instName;
                            this.dataNow.version = sysInstDepartment.version;
                            this.$message.success('修改成功');
                            this.dialogVisible = false;
                        },
                        res => {
                        }
                    ).catch();
                }

                if (this.flag === 3) {
                    //更换管理员
                    params.specInstId = this.dialogForm.specInstId;
                    params.specTellerId = this.dialogForm.tellerId;
                    params.tellerName = this.dialogForm.tellerName;
                    params.tellerPhone = this.dialogForm.tellerPhone;
                    chgInstAdmin(this, params).then(
                        res => {
                            console.log('res', res);//debug
                            this.dataNow.adminName = this.dialogForm.tellerName;
                            this.dataNow.adminMobile = this.dialogForm.tellerPhone;
                            this.$message.success('更换成功');
                            this.dialogVisible = false;

                            //如果有密码，那么进行密码显示
                            if (res.data) {
                                this.passwordForm.tellerId=this.dialogForm.tellerId;
                                this.passwordForm.tellerPwd=res.data;
                                this.passwordVisible = true;
                                this.passwordForm.time=30;
                                this.timerData=setInterval(()=>{
                                    this.passwordForm.time--;
                                }, 1000);
                                this.timer=setTimeout(()=>{
                                    this.passwordVisible=false;
                                    clearInterval(this.timerData);
                                }, 30000);
                            }
                        },
                        res => {
                        }
                    ).catch();
                }
            },

            handleNodeClick(node, data) {
                this.$emit('click', node);
            },


            loadNode(node, resolve) {
                if (node.level === 0) {
                    this.requestTree(resolve)
                }
                if (node.level >= 1) {
                    this.instGetAllByIdFun(node.data.instId, resolve, node)
                }
            },

            requestTree(resolve) {
                let that = this;
                resolve(that.sysInstInfoAll)
            },

            instGetAllByIdFun(instId, resolve, node) {
                getAllInstById(this, instId, Toast).then((res) => {
                        let data = res.data;
                        if (!data) {
                            Toast({
                                message: res.msg,
                                duration: 2000
                            });
                            resolve([]);
                            return
                        }
                        res.data.forEach(item => {
                            if (item.isLeaf === 'N') {
                                item.leaf = false
                            } else {
                                item.leaf = true
                            }
                        });
                        resolve(res.data)
                    }, (res) => {
                        node.loading = false
                        console.log('res', res)
                    }
                )
            },

            createNew(node, data) {
                this.$emit('createTap', data);
            },

            changeAdmin(node, data){
                if (this.$refs.dialogForm) {
                    this.$refs.dialogForm.clearValidate();
                }
                this.dialogForm={
                    specInstId: null,
                    version: null,
                    instName: null,
                    tellerId:null,
                    tellerName:null,
                    tellerPhone:null,
                    adminMobile:null,
                    adminName:null,
                };
                this.nodeNow = node;
                this.dataNow = data;
                this.dialogForm.specInstId = data.instId;
                this.dialogForm.instName = data.instName;
                this.flag = 3;
                this.dialogVisible = true;

            },

            updateTap(node, data) {
                if (this.$refs.dialogForm) {
                    this.$refs.dialogForm.clearValidate();
                }
                this.dialogForm={
                    specInstId: null,
                    version: null,
                    instName: null,
                    tellerId:null,
                    tellerName:null,
                    tellerPhone:null,
                    adminMobile:null,
                    adminName:null,
                };
                this.nodeNow = node;
                this.dataNow = data;
                this.dialogForm.specInstId = data.instId;
                this.dialogForm.version = data.version;
                this.dialogForm.instName = data.instName;
                this.flag = 2;
                this.dialogVisible = true;
            },
        }
    }
</script>

<style lang="scss">
    .tree-leve {
        .el-tree-node__expand-icon {
            font-size: 20px;
        }

        .el-tree-node__content {
            height: 36px;
        }

        .el-tree-node {
            position: relative;
            padding-left: 16px;
        }

        .el-tree-node__children {
            padding-left: 16px;
        }

        .el-tree-node :last-child:before {
            height: 38px;
        }

        .el-tree > .el-tree-node:before {
            border-left: none;
        }

        .el-tree > .el-tree-node:after {
            border-top: none;
        }

        .el-tree-node:before, .el-tree-node:after {
            content: "";
            left: -4px;
            position: absolute;
            right: auto;
            border-width: 1px;
        }

        .tree :first-child .el-tree-node:before {
            border-left: none;
        }

        .el-tree-node:before {
            border-left: 1px dashed #909399;
            bottom: 0px;
            height: 100%;
            top: -20px;
            width: 1px;
        }

        .el-tree-node:after {
            border-top: 1px dashed #909399;
            height: 20px;
            top: 17px;
            width: 25px;
        }

        .el-tree-node__content {
            padding-left: 0px !important;
        }

        .el-tree-node__content > .el-tree-node__expand-icon {
            padding: 3px;
        }
    }
</style>

<style scoped>
    .svgname {
        width: 1.5em;
        height: 1.5em;
    }

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 17px;
    }

    .svg-view {
        display: flex;
        flex-direction: row;
        margin: 100px 0 0 10px;
    }

    .svg-view-cont {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-right: 30px;
    }

    .svg-view-span {
        margin-left: 10px;
    }

    .svgname {
        width: 1.5em;
        height: 1.5em;
    }

    .passWordDiv {
        width: 120px;
        margin: 0 auto;
    }
</style>
