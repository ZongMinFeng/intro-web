<template>
  <div class="login-wrap">
    <div class="ms-title">测试管理系统</div>
    <div  class="ms-login" id="qrcode">
    </div>
    <div v-if="LoginStatus!=='0' " class="ms-mgs" :class="LoginStatus=='1'?'':'ms-mgs1'">
      <i class="el-icon-circle-check ms-mgs-i"></i>
      <span v-if="LoginStatus==='1'">请使用微信扫描</span>
      <span v-if="LoginStatus==='2'">扫描成功，请在微信上确认登录</span>
      <span v-else-if="LoginStatus==='3'">登陆成功</span>
      <span v-else-if="LoginStatus==='4'">登陆失败</span>
      <span v-else-if="LoginStatus==='5'">登陆超时</span>
      <span v-else-if="LoginStatus==='6'">二维码超时<p style="margin-top: 5px;" @click="refresh"><el-button type="success">刷新二维码</el-button></p></span>
    </div>
  </div>
</template>

<script>
  import {JSEncrypt} from 'jsencrypt';
  import {sendServer} from './../../util/common';
  import cfg from '../../config/cfg';
  import QRCode from 'qrcodejs2';
  import {handelPermission} from "../../tool/permission";
  export default {
    data: function () {
      return {
        infoMsg: '扫描成功',
        infoFlag: true,    // false:不显示，true：显示
        LoginId: '',
        LoginStatus: '0',   //1.未使用 2.已被扫码 3.登陆成功 4.登陆失败 5.登陆超时
        //登录次数，20次后不再向后台轮询登录状态
        loginTimes:0
      }
    },
    mounted() {
      this.login();
      let that = this;
      // 循环查询状态
      this.interval = setInterval(function () {
        if (that.LoginStatus === '3' || that.loginTimes > 60) {
          //二维码超时
          that.LoginStatus='6';
          clearInterval(that.interval);
        } else if (that.LoginStatus !== '0') {
          that.getLoginStatus().then(()=> {},()=> {});
        }
      }, 2000);
    },
    methods: {
      login() { // 登录
        let reqUuid = localStorage.getItem('reqUuid') || '';
        let macKey = localStorage.getItem('macKey') || '';

        if (!macKey || !reqUuid) {
          localStorage.removeItem('specNames');
          reqUuid='';
        }


        var that = this;
        if (reqUuid) {
          this.reqUuid = reqUuid;
          // 检查登录状态
          this.getLoginStatus().then((LoginStatus) => { // 回调成功
            if (LoginStatus === '3') {
              // 登录成功
            } else {
              // 重新获取LoginId
              that.genLoginId()
            }
          }, () => { // 回调失败
            that.genLoginId()
          })
        } else {
          that.genLoginId();
        }
      },
      qrcode(id) { // 生成二维码
        // let text = 'https://www.v-ss.com/weChat/a?Id=' + id + '&ChannelFlag=4';
        let text = 'https://www.v-uu.com/weChat/a?Id=' + id + '&ChannelFlag=4';
        let qrcode = new QRCode('qrcode', {
          width: 300,
          height: 300, // 高度
          text: text// 二维码内容
        })
        // console.log(qrcode)
      },
      getLoginStatus() {   // 获取LoginId的状态
        let that = this;
        return new Promise((resolve, reject) => {
          //登录次数+1
          that.loginTimes++;
          if (that.LoginStatus > '2' || !that.reqUuid ) { // 无需登录查询
            reject(true);
            return true;
          }
          // 需要登录查询
          let urlParams = {};
          let send = {};
          urlParams.url =cfg.service.getLoginStatus.url;
          urlParams.txnId =cfg.service.getLoginStatus.txnId;
          send.reqUuid = that.reqUuid;
          urlParams.send = send;
          sendServer(urlParams, that).then(
            (res) => {
              console.log("getLoginStatus", res);//debug
              // 成功
              // LoginStatus: '0'   //1.未使用 2.已被扫码 3.登陆成功 4.登陆失败 5.登陆超时
              if (res.returnCode !== 200 && res.returnCode !== 601) {
                if(this.loginTimes!==1){
                  that.$message.error(res.msg);
                }
                reject(false);
                return false;
              }
              if(res.returnCode === 601) {
                that.LoginStatus = '1';
              }
              if( res.returnCode === 200) {
                that.LoginStatus = '3'
              }
              if( res.returnCode === 503) {
                that.LoginStatus = '6'
              }
              if (that.LoginStatus === '3') {
                let sysTellerInfo = res.data.sysTellerInfo || '';
                let sysInstInfo = res.data.sysInstInfo || '';
                this.$store.commit('setSysInstInfo', sysInstInfo);
                let sysInstDepartment = res.data.sysInstDepartment || '';
                localStorage.setItem('sysTellerInfo', JSON.stringify(sysTellerInfo));
                localStorage.setItem('sysInstInfo', JSON.stringify(sysInstInfo));
                localStorage.setItem('sysInstDepartment', JSON.stringify(sysInstDepartment));
                if (sysTellerInfo) {
                  localStorage.setItem('tellerId', sysTellerInfo.tellerId)
                }
                if (sysInstInfo) {
                  localStorage.setItem('instId', sysInstInfo.instId)
                }
                if (sysInstDepartment) {
                  localStorage.setItem('departmentId', sysInstDepartment.departmentId)
                }
                localStorage.setItem('macKey', res.data.macKey);
                that.$store.commit('loginIn');

                //如果登录的用户是顶级管理员，那么不管后台返回的权限是多少，都赋予顶级管理员最高权限
                if (res.data.sysInstInfo.instLevel && res.data.sysInstInfo.instLevel === '1') {
                  if (res.data.sysInstDepartment.departmentId && res.data.sysInstDepartment.departmentId.startsWith('Admin')) {
                    res.data.funcMap='FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';
                  }
                }

                //处理权限
                handelPermission(res.data.funcMap);

                that.$router.push('/');
              }
              resolve(that.LoginStatus);
              return true;
            }, (res) => {
              // 失败
              // this.$message.error('请求失败');
              reject(false);
            }
          );
        });
      },

      genLoginId() { // 获取LoginId
        localStorage.removeItem('LoginId');
        let urlParams = {};
        let send = {};
        urlParams.url =cfg.service.genLoginId.url;
        urlParams.txnId = cfg.service.genLoginId.txnId;
        urlParams.send = send;
        var that = this;
        sendServer(urlParams, this).then(
          (res) => {
            console.log("res", res);//debug
            // 成功
            if (res.returnCode !== 200) {
              this.$message.error(res.msg);
              return false;
            }
            if (!res.returnMsg || !res.data) {
              this.$message.error('LoginId错误');
              return false;
            }

            that.reqUuid = res.data;
            localStorage.setItem('reqUuid', that.reqUuid);

            that.LoginStatus = '1';
            that.qrcode(that.reqUuid);
          }, (res) => {
            // 失败
            this.$message.error('请求失败');
          }
        );
      },

      refresh(){
        //刷新页面
        this.$router.go(0);
      },
    }
  }
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    /*background: -webkit-linear-gradient(left bottom, rgba(49, 64, 86, 1), rgba(49, 64, 86, 0.8));*/
    /*background: -o-linear-gradient(left bottom, rgba(49, 64, 86, 1), rgba(49, 64, 86, 0.8));*/
    /*background: -mos-linear-gradient(left bottom, rgba(49, 64, 86, 1), rgba(49, 64, 86, 0.8));*/
    /*background: -moz-linear-gradient(left bottom, rgba(49, 64, 86, 1), rgba(49, 64, 86, 0.8));*/
    /*background: linear-gradient(left bottom, rgba(49, 64, 86, 1), rgba(49, 64, 86, 0.8));*/
  }

  .ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;

  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    /*height:160px;*/
    height: 300px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }

  .ms-mgs {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    margin-top: 200px;
    margin-left: -150px;
    text-align: center;
    font-size: 16px;
    color: #000;
    /*color: #343434;*/
    background-color: rgba(255, 255, 255, 0.95);
  }

  .ms-mgs-i {
    color: #3CB73B;
  }

  .ms-mgs1 {

    margin-top: 130px;
    padding: 20px 0;
  }

  .ms-err {
    color: red;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
  }
</style>
