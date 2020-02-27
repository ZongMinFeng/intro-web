<template>
  <div class="login-container-v" id="logo">
    <!--<div style="margin: 10px 0 0 15px;">-->
      <!--<i class="el-icon-paperclip"/>-->
      <!--个人资料-->
    <!--</div>-->
    <el-card style="width: 60%;height: 60%;margin-top: 5%;">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
               label-position="left">
        <div class="title-container">
          <h3 class="title">
            修改操作员基础信息
          </h3>
        </div>
        <!--用户名-->
        <el-form-item prop="username">
       <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
          <el-input
            maxlength="20"
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            auto-complete="off"

          />
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
              placeholder="请输入登录密码"
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


        <el-form-item prop="address">
        <span class="svg-container">
          <svg-icon icon-class="addr"/>
        </span>
          <el-input
            maxlength="64"
            ref="username"
            v-model="loginForm.address"
            placeholder="请输入地址"
            name="username"
            auto-complete="off"

          />
        </el-form-item>

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
  import { validUsername, validPassword } from './../../util/validate'
  import { SHA256 } from './../../util/jsonSha256.js'
  import { Toast, Indicator } from 'mint-ui'
  import { sendServer } from './../../util/common'
  import cfg from '../../config/cfg'
  import bus from './../common/bus';

  export default {
    data () {
      const validatePassword = (rule, value, callback) => {
        if (!value&&this.loginForm.newPassword) {
        callback('请输入登录密码！')
        }else if(value&&value !==this.loginPass) {
          callback('登录密码错误！')
        }else{
          callback()
        }
      }

      const validateNewPassword = (rule, value, callback) => {
        if (!validPassword(value)&&this.loginForm.password) {
          callback(new Error('密码必须包含大写字母，小写字母，数字不能有特殊字符，且不少于8位！'))
        } else if (value&&(value.length < 8 || value.length > 16)) {
          callback(new Error('密码必须位8-16位'))
        } else if (value&&value ===this.loginPass) {
          callback(new Error('新密码不能与登录密码一致！'))
        } else {
          callback()
        }
      }

      return {
        loginPass: localStorage.getItem('loginPass'),
        loginForm: {
          username: '',
          password: '',
          newPassword: '',
          address: ''
        },

        loginRules: {
          password: [{ required: true, trigger: 'blur', validator: validatePassword }],
          newPassword: [{ required: true, trigger: 'blur', validator: validateNewPassword }]
        },
        capsTooltip: false,
        loading: false,
        passwordType: 'password', 
        newPasswordType: 'password', 
      }
    },

    created () {
      let sysTellerInfo = JSON.parse(localStorage.getItem('sysTellerInfo')); 
      this.tellerPhone = sysTellerInfo.tellerPhone;
      this.loginForm= {
        username: sysTellerInfo.tellerName||'',
          password: '',
          newPassword: '',
          address: sysTellerInfo.tellerAddr||''
      }
    },

    methods: {
      checkCapslock ({ shiftKey, key } = {}) {
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

      showPwd () {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      newShowPwd () {
        if (this.newPasswordType === 'password') {
          this.newPasswordType = ''
        } else {
          this.newPasswordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },

      handleLogin () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            if (this.loginForm.password&&!this.loginForm.newPassword) {
              Toast({
                message: '请输入新密码',
                duration: 2000
              })
              return false
            } else if (!this.loginForm.password&&this.loginForm.newPassword) {
              Toast({
                message: '请输入登录密码！',
                duration: 2000
              })
              return false
            }else if(!this.loginForm.password&&!this.loginForm.newPassword&&!this.loginForm.username&&!this.loginForm.address){
             return false;
            }

            this.tellerModification()  
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },

      tellerModification () {
        let urlParams = {};
        let send = {};
        let singArray = {};

        urlParams.url = cfg.service.tellerModification.url + '/' + cfg.service.tellerModification.action;
        urlParams.txnId = cfg.service.tellerModification.txnId;
        if(this.loginForm.password){
          let EncPwd = this.tellerPhone + this.loginForm.password.length + this.loginForm.password;
          let EncPwdSha = SHA256(this.tellerPhone + EncPwd);
          let EncPwdShaU = EncPwdSha.toUpperCase().substring(0, 32);
          send.tellerPwd = EncPwdShaU;
          singArray.tellerPwd = EncPwdShaU;
        }

        if(this.loginForm.newPassword){
          let EncNewPwd = this.tellerPhone + this.loginForm.newPassword.length + this.loginForm.newPassword;
          let EncNewPwdSha = SHA256(this.tellerPhone + EncNewPwd);
          let EncNewPwdShaU = EncNewPwdSha.toUpperCase().substring(0, 32);
          send.tellerNewPwd = EncNewPwdShaU;
          singArray.tellerNewPwd = EncNewPwdShaU;
        }

        if(this.loginForm.username){
          send.tellerName = this.loginForm.username;
        }

        if(this.loginForm.address){
          send.tellerAddr = this.loginForm.address;
        }

        urlParams.send = send;
        urlParams.singArray = singArray
        let that = this
        sendServer(urlParams, this, Toast).then(
          (res) => {
            console.log('res', res);
            this.$message.success('修改成功')
            if(this.loginForm.newPassword&&this.loginForm.password){
              console.log('res', res);
              localStorage.removeItem('adminPcUuid');
              localStorage.removeItem('macKey');
              localStorage.removeItem('instId');
              localStorage.removeItem('tellerId');
              localStorage.removeItem('adminFlag');
              localStorage.removeItem('funcArray');
              localStorage.removeItem('sysTellerInfo');
              localStorage.removeItem('sysInstInfo');
              localStorage.removeItem('loginPass');
              localStorage.removeItem('parentInstInfos');
              this.$store.commit('loginOut');
              this.$router.push('/login');
            }else{
              let sysTellerInfoArray = localStorage.getItem('sysTellerInfo')||'';
              let sysTellerInfo = JSON.parse(sysTellerInfoArray);
              if(this.loginForm.username){
                sysTellerInfo.tellerName = this.loginForm.username;
              }
              if(this.loginForm.address){
                sysTellerInfo.tellerAddr = this.loginForm.address;
              }
              localStorage.setItem('sysTellerInfo',JSON.stringify(sysTellerInfo)); 
              bus.$emit('tellerToParentInst','');
            }
          }, (res) => {
            console.log('res', res)
            if (res === 'timeout') {
              this.$router.push('/login');
            }

          }
        )
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

