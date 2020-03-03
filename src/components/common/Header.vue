<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="header-name">
      <div class="collapse-btn" @click="collapseChage">
        <i class="el-icon-menu"></i>
      </div>
      <div class="logo">用户测试</div>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <div class="head-inst">
          <span class="div-sapn" v-if="tellerToParentInst">
            <span v-if="tellerName" class="span-tellername">{{tellerName}}</span> 你好，欢迎进入：
            <span class="span-iinstname">{{sysInstInfo.instName}}</span>
          </span>
        </div>
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        <i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/">
              <el-dropdown-item>
                首页
              </el-dropdown-item>
            </router-link>

            <router-link to="/userPassword">
              <el-dropdown-item>修改密码</el-dropdown-item>
            </router-link>

            <router-link to="/departmentLogin">
              <el-dropdown-item>切换部门</el-dropdown-item>
            </router-link>

            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
  import bus from './bus'
  import {Toast} from 'mint-ui'
  import {sendServer} from './../../util/common'
  import cfg from './../../config/cfg'
  import {loginOut} from "../../util/module";

  export default {
    data() {
      return {
        collapse: false,
        fullscreen: false,
        name: '',
        message: 2,
        tellerToParentInst: [],
        tellerName: '',
        sysInstInfo:{
          instName:null,
        },
      }
    },

    created() {
      this.sysInstInfo=JSON.parse(localStorage.getItem("sysInstInfo"));
      console.log('sysInstInfo', this.sysInstInfo);//debug
    },

    mounted() {
      console.log('mounted');
      this.dataChange();

      bus.$on('tellerToParentInst', (red) => {
        console.log('red', red);
        this.dataChange()
      })
    },

    computed: {
      username() {
        let UserName = localStorage.getItem('UserName')
        return UserName ? UserName : this.name
      }
    },

    beforeDestroy() {
      console.log('beforeDestroy');
      bus.$off('tellerToParentInst')
    },

    methods: {
      dataChange() {
        let parentInstInfosArray = localStorage.getItem('parentInstInfos') || ''
        let sysInstInfoArray = localStorage.getItem('sysInstInfo') || ''
        let sysTellerInfoArray = localStorage.getItem('sysTellerInfo') || ''
        let tellerToParentInst = []
        if (parentInstInfosArray) {
          let parentInstInfos = JSON.parse(parentInstInfosArray)
          if (parentInstInfos.length > 1) {
            parentInstInfos.sort(function (a, b) {
              return a.instLevel > b.instLevel ? 1 : -1
            });
          }
          parentInstInfos.forEach(item => {
            tellerToParentInst.push(item.aliasName)
          })
        }
        if (sysInstInfoArray) {
          let sysInstInfo = JSON.parse(sysInstInfoArray)
          tellerToParentInst.push(sysInstInfo.aliasName)
        }

        if (sysTellerInfoArray) {
          let sysTellerInfo = JSON.parse(sysTellerInfoArray)
          this.tellerName = sysTellerInfo.tellerName
        }
        console.log('tellerToParentInst', tellerToParentInst)
        this.tellerToParentInst = tellerToParentInst
      },

      handleCommand(command) {
        if (command === 'loginout') {
          let params = {};
          loginOut(this, params).then(
            res => {
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
        }
      },

      collapseChage() {
        this.collapse = !this.collapse
        bus.$emit('collapse', this.collapse)
      },
      handleFullScreen() {
        let element = document.documentElement
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen()
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen()
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen()
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen()
          }
        }
        this.fullscreen = !this.fullscreen
      }
    }
  }
</script>
<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    font-size: 18px;
    color: #fff;
  }


  .header-name {
    width: 200px;
  }


  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 60px;
  }

  .header .logo {
    float: left;
    width: 130px;
    line-height: 60px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-right {
    float: right;
    padding-right: 50px;
  }

  .header-user-con {
    display: flex;
    height: 60px;
    align-items: center;
  }

  .head-inst {
    display: flex;
    justify-content: flex-end;
    max-width: 1100px;
    /*width: 1350px;*/
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 60px;
    line-height: 60px;
  }

  .div-sapn {
    font-size: 15px;
    margin-right: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 5px;
  }

  .span-iinstname {
    border: white 1.5px solid;
    border-radius: 10px;
    padding: 5px 10px;
    /*background-color: white;*/
    color: #409EFF;
  }

  .span-tellername {
    border: white 1.5px solid;
    border-radius: 10px;
    padding: 5px 8px;
    color: #409EFF;
    font-size: 12px;

  }

  .i-tellerName {
    font-size: 15px;
    background-color: white;
    color: blue;
    padding: 5px;
  }

  .btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
  }

  .btn-bell, .btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }

  .btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }

  .btn-bell .el-icon-bell {
    color: #fff;
  }

  .user-name {
    margin-left: 10px;
  }

  .user-avator {
    margin-left: 20px;
  }

  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }

  .svgname {
    margin: 0 3px;
  }
</style>
