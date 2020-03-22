<template>
    <div class="login-container-v" id="logo">
        <el-card style="width: 60%;height: 60%;margin-top: 5%;">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
                     label-position="left">
                <div class="title-container">
                    <h3 class="title">
                        修改操作员密码
                    </h3>
                </div>
                <!--用户名-->
                <el-form-item prop="username">
       <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
                    <!--<el-input-->
                    <!--maxlength="20"-->
                    <!--ref="username"-->
                    <!--v-model="loginForm.username"-->
                    <!--placeholder="请输入用户名"-->
                    <!--name="username"-->
                    <!--type="text"-->
                    <!--auto-complete="off"-->
                    <!--:disabled="true"-->
                    <!--/>-->
                    <span style="padding-left: 14px; font-size:14px">{{loginForm.username}}</span>
                </el-form-item>

                <!--输入密码框-->
                <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                    <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password"/>
          </span>
                        <el-input
                            maxlength="16"
                            :key="passwordType"
                            ref="password"
                            v-model="loginForm.password"
                            :type="passwordType"
                            placeholder="请输入原密码"
                            name="password"
                            @keyup.native="checkCapslock"
                            @blur="capsTooltip = false"
                            @keyup.enter.native="handleLogin"
                            auto-complete="off"

                        />
                        <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
          </span>
                    </el-form-item>
                </el-tooltip>


                <!--输入密码框-->
                <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                    <el-form-item prop="newPassword">
          <span class="svg-container">
            <svg-icon icon-class="password"/>
          </span>
                        <el-input
                            maxlength="16"
                            :key="newPasswordType"
                            ref="password"
                            v-model="loginForm.newPassword"
                            :type="newPasswordType"
                            placeholder="请输入新密码"
                            name="password"
                            @keyup.native="checkCapslock"
                            @blur="capsTooltip = false"
                            @keyup.enter.native="handleLogin"
                            auto-complete="off"

                        />
                        <span class="show-pwd" @click="newShowPwd">
            <svg-icon :icon-class="newPasswordType === 'password' ? 'eye' : 'eye-open'"/>
          </span>
                    </el-form-item>
                </el-tooltip>

                <!--再次输入密码框-->
                <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                    <el-form-item prop="newPassword2">
          <span class="svg-container">
            <svg-icon icon-class="password"/>
          </span>
                        <el-input
                            maxlength="16"
                            :key="newPasswordType"
                            ref="password"
                            v-model="loginForm.newPassword2"
                            :type="newPasswordType"
                            placeholder="请确认新密码"
                            name="password"
                            @keyup.native="checkCapslock"
                            @blur="capsTooltip = false"
                            @keyup.enter.native="handleLogin"
                            auto-complete="off"

                        />
                        <span class="show-pwd" @click="newShowPwd">
            <svg-icon :icon-class="newPasswordType === 'password' ? 'eye' : 'eye-open'"/>
          </span>
                    </el-form-item>
                </el-tooltip>

                <!--登陆按钮-->
                <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                           @click.native.prevent="handleLogin">
                    提交
                </el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {Toast, Indicator} from 'mint-ui'
    import * as cfg from "../../../config/cfg";
    import {sendServer} from "../../../util/common";
    import {SHA256} from "../../../util/jsonSha256";
    import {chgTellerPwd} from "../../../util/module";

    export default {
        data() {
            const validatePassword = (rule, value, callback) => {
                if (!value || value === '') {
                    callback(new Error('请输入原密码！'));
                }
                callback();
            };

            const validateNewPassword = (rule, value, callback) => {
                if (!this.loginForm.password) {
                    callback(new Error('请输入原密码！'));
                    return;
                }
                if (!this.loginForm.newPassword || this.loginForm.newPassword === '') {
                    callback(new Error('请输入新密码!'));
                    return;
                }
                // if (!checkPasswordFormat(value)) {
                //   callback(new Error('密码必须包含大写字母，小写字母，数字不能有特殊字符，且不少于8位！'));
                // }
                callback();
            };

            const validateNewPassword2 = (rule, value, callback) => {
                if (!this.loginForm.password) {
                    callback(new Error('请输入原密码！'));
                    return;
                }
                if (!this.loginForm.newPassword || this.loginForm.newPassword === '') {
                    callback(new Error('请输入新密码，再确认密码！'));
                    return;
                }
                if (!this.loginForm.newPassword2 || this.loginForm.newPassword2 === '') {
                    callback(new Error('请确认密码！'));
                    return;
                }
                if (this.loginForm.newPassword !== this.loginForm.newPassword2) {
                    callback(new Error('确认密码跟新密码不一致！'));
                    return;
                }
                callback();
            };

            const checkPasswordFormat = function (password) {
                let A = /[A-Z]/;
                let a = /[a-z]/;
                let num = /\d/;
                let pattern = /[`~!@#$^&*()=|{}':;',\[\]\\.<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]/;
                if (password.length < 8) {
                    return false;
                }
                if (!A.exec(password)) {
                    console.log('A');
                    return false;
                }
                if (!a.exec(password)) {
                    console.log('a');
                    return false;
                }
                if (!num.exec(password)) {
                    console.log('123');
                    return false;
                }
                if (pattern.test(password)) {
                    console.log('***');
                    return false;
                }
                return true;
            };

            return {
                loginPass: localStorage.getItem('loginPass'),
                loginForm: {
                    tellerId: '',
                    username: '',
                    password: '',
                    newPassword: '',
                    newPassword2: '',
                },

                loginRules: {
                    password: [{required: true, trigger: 'blur', validator: validatePassword}],
                    newPassword: [{required: true, trigger: 'blur', validator: validateNewPassword}],
                    newPassword2: [{required: true, trigger: 'blur', validator: validateNewPassword2}]
                },
                capsTooltip: false,
                loading: false,
                passwordType: 'password',
                newPasswordType: 'password',
            }
        },

        created() {
            let sysTellerInfo = JSON.parse(localStorage.getItem('sysTellerInfo'));
            this.tellerPhone = sysTellerInfo.tellerPhone;
            this.loginForm = {
                username: sysTellerInfo.tellerName || '',
                password: '',
                newPassword: '',
                address: sysTellerInfo.tellerAddr || ''
            }
            this.loginForm.tellerId = localStorage.getItem('tellerId');
        },

        methods: {
            checkCapslock({shiftKey, key} = {}) {
                if (key && key.length === 1) {
                    if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
                        this.capsTooltip = true
                    } else {
                        this.capsTooltip = false
                    }
                }
                if (key === 'CapsLock' && this.capsTooltip === true) {
                    this.capsTooltip = false
                }
            },

            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
                this.$nextTick(() => {
                    this.$refs.password.focus()
                })
            },
            newShowPwd() {
                if (this.newPasswordType === 'password') {
                    this.newPasswordType = ''
                } else {
                    this.newPasswordType = 'password'
                }
                this.$nextTick(() => {
                    this.$refs.password.focus()
                })
            },

            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.tellerModification()
                    } else {
                        console.log('error submit!!');
                        return false
                    }
                })
            },

            tellerModification() {
                let params = {};
                params.tellerId = this.loginForm.tellerId;
                params.oldPwd = this.loginForm.password;
                params.newPwd = this.loginForm.newPassword;
                chgTellerPwd(this, params).then(
                    res => {
                        this.$message.success('修改成功');
                        this.loginForm.password = '';
                        this.loginForm.newPassword = '';
                        this.loginForm.newPassword2 = '';

                        //退出登录
                        localStorage.removeItem('sysTellerInfo');
                        localStorage.removeItem('sysInstInfo');
                        localStorage.removeItem('sysInstDepartment');
                        localStorage.removeItem('tellerId');
                        localStorage.removeItem('instId');
                        localStorage.removeItem('departmentId');
                        localStorage.removeItem('macKey');
                        localStorage.removeItem('reqUuid');
                        this.$store.commit('loginOut');
                        this.$router.push('/login');
                    },
                    res => {

                    }
                ).catch();
            },

        }
    }
</script>


<style lang="scss">

    $bg: #fff;
    $light_gray: #fff;
    $cursor: #fff;

    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        .login-container-v .el-input input {
            color: #000;
        }
    }


    .login-container-v {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                height: 47px;
                caret-color: #000;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: #000 !important;
                }
            }
        }

        .el-form-item {
            border: 1px solid rgba(120, 120, 120, 0.2);
            background: rgba(0, 0, 0, 0);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>


<style lang="scss" scoped>
    .login-container-v {
        min-height: 100%;
        width: 100%;
        background-color: white;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-content: center;

        .login-form {
            position: relative;
            width: 520px;
            max-width: 100%;
            padding: 50px 35px 0;
            margin: 0 auto;
            overflow: hidden;
        }

        login-container-v.el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0);
            border-radius: 5px;
            color: #454545;
        }

        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }

            .set-language {
                color: #fff;
                position: absolute;
                top: 3px;
                font-size: 18px;
                right: 0px;
                cursor: pointer;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            cursor: pointer;
            user-select: none;
        }

        .thirdparty-button {
            position: absolute;
            right: 0;
            bottom: 6px;
        }

        @media only screen and (max-width: 470px) {
            .thirdparty-button {
                display: none;
            }
        }
    }

</style>

