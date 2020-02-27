<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-refresh" @click="onRefresh" class="search-btn">
          刷新
        </el-button>
      </div>

      <div class="table-container">
        <el-table :data="tellerInstalArray"
                  style="width: 100%"
                  border
                  size="medium"
        >

          <el-table-column label="机构名" align="center">
            <template slot-scope="scope">
              <svg-icon v-if="scope.row.instId === instId" class="el-icon-i" icon-class="true"
                        style="color: red;font-weight: 600;"></svg-icon>

              {{scope.row.instName}}
            </template>
          </el-table-column>

          <el-table-column label="机构简称" align="center">
            <template slot-scope="scope">
              {{scope.row.aliasName}}
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="240px">
            <template slot-scope="scope">
              <div>
                <el-button
                  v-if="scope.row.instId !== instId"
                  size="mini"
                  type="danger"
                  @click="handleChange(scope.$index, scope.row)">切换机构
                </el-button>

                <el-button
                  type="primary"
                  size="mini"
                  @click="handleDetail(scope.$index, scope.row)">查看详情
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="svg-view">
        <span>图例备注：</span>
        <div class="svg-view-cont-inst">
          <svg-icon icon-class="true" style="color: red;font-weight: 600;"></svg-icon>
          <span class="svg-view-span">当前登录机构</span>
        </div>
      </div>


      <!--展示详情-->
      <el-dialog
        title="机构详情"
        :visible.sync="dialogVisible"
        width="30%">

        <div class="form-container-border">
          <el-row class="form-border-v">
            <el-col class="form-border form-left-bg font-small" :span="6">{{levelItel}}名</el-col>
            <el-col class="form-border font-small" :span="18">
              <div v-if="instDetail.groupName">
                <i class="el-icon-caret-bottom" style="color: #909399;"></i>
                <svg-icon icon-class="group"/>
                {{instDetail.groupName}}
              </div>

              <div v-if="instDetail.branchName">
                <i class="el-icon-caret-bottom" style="margin: 10px 0 0  15px; color: #909399;"></i>
                <svg-icon class="levle-line" icon-class="sub-institutional"/>
                {{instDetail.branchName}}
              </div>

              <div v-if="instDetail.districtName">
                <i class="el-icon-caret-bottom" style="margin: 10px 0 0 30px;color: #909399;"></i>
                <svg-icon class="levle-line" icon-class="village"/>
                {{instDetail.districtName}}
              </div>

              <div v-if="instDetail.instName">
                <svg-icon v-if="instDetail.instLevel==1" icon-class="terrace"/>
                <svg-icon v-if="instDetail.instLevel==2" icon-class="group"/>
                <label v-if="instDetail.instLevel==3">
                  <i class="el-icon-caret-bottom" style="margin: 10px 0 0 15px;color: #909399;"></i>
                  <svg-icon icon-class="sub-institutional"/>
                </label>
                <label v-if="instDetail.instLevel==4">
                  <i class="el-icon-caret-bottom" style="margin: 10px 0 0 30px;color: #909399;"></i>
                  <svg-icon icon-class="village"/>
                </label>
                <label v-if="instDetail.instLevel==5">
                  <i class="el-icon-caret-bottom" style="margin: 10px 0 0 45px;color: #909399;"></i>
                  <svg-icon icon-class="building"/>
                </label>

                {{instDetail.instName}}
              </div>
            </el-col>
          </el-row>


          <el-row class="form-border-v">
            <el-col class="form-border form-left-bg font-small" :span="6">{{levelItel}}别称</el-col>
            <el-col class="form-border font-small" :span="18">{{instDetail.aliasName}}</el-col>
          </el-row>

          <el-row class="form-border-v">
            <el-col class="form-border form-left-bg font-small" :span="6">当前层级</el-col>
            <el-col class="form-border font-small" :span="18">{{instDetail.instLevel}}</el-col>
          </el-row>
        </div>

        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
      </el-dialog>

    </div>
  </div>
</template>


<script>
  import {sendServer} from '../../../util/common'
  import {
    tellerInstsGetByCons,
    instGetById
  } from '../../../util/module'
  import cfg from '../../../config/cfg'
  import {Toast} from 'mint-ui'
  import {role} from '../../../util/roleFunction'
  import bus from '../../common/bus'

  export default {
    data() {
      return {
        adminFlag: localStorage.getItem('adminFlag'),  //当前登录机构操作员角色
        instId: localStorage.getItem('instId'),  //当前登录机构员Id
        tellerInstalArray: [], //机构数组
        instDetail: {},
        dialogVisible: false, //是否展示机构详情
        levelItel: ''
      }
    },

    created() {
      //查询操作员机构列表
      this.tellerInstsGetByConsFun()
    },

    methods: {
      //查询操作员机构信息
      tellerInstsGetByConsFun() {
        tellerInstsGetByCons(this, Toast).then((res) => {
          console.log('res', res)
          let data = res.data
          //若获取的数据为空，提示用户
          if (!data) {
            Toast({
              message: res.msg,
              duration: 2000
            })
            return
          }

          let instId = this.instId;
          if (data.length > 1) {
            data.sort(function (a, b) {
              return a.instId === instId ? -1 : 1
            });
          }
          this.tellerInstalArray = data
        }, (res) => {
          console.log('res', res)
        })
      },

      /**
       *提示用户确认切换机构
       * @param  content 提示框内容
       * @param roleId  机构d
       */
      handleChange(index, row) {
        let that = this
        this.$confirm('确认切换到该机构?', 'Warning', {
          type: 'warning'
        })
          .then(_ => {
            that.tellerSpecInstlogin(row.instId)
          })
          .catch(_ => {
            console.log('取消')
          })
      },

      //刷新
      onRefresh() {
        //查询操作员机构
        this.tellerInstsGetByConsFun()
      },

      //查看详情
      handleDetail(index, row) {
        this.instDetail = row; //展示机构详情
        this.dialogVisible = true
        if (row.instLevel === 1) {
          this.levelItel = '平台'
        } else if (row.instLevel === 2) {
          this.levelItel = '物业集团'
        } else if (row.instLevel === 3) {
          this.levelItel = '物业子机构'
        } else if (row.instLevel === 4) {
          this.levelItel = '物业小区'
        } else if (row.instLevel === 5) {
          this.levelItel = '物业楼栋'
        }
      },

      /**
       * 切换机构
       * @param tellerId 操作员Id
       */
      tellerSpecInstlogin(instId) {
        let urlParams = {}
        let send = {}
        urlParams.url = cfg.service.tellerSpecInstlogin.url + '/' + cfg.service.tellerSpecInstlogin.action
        urlParams.txnId = cfg.service.tellerSpecInstlogin.txnId
        send.specInstId = instId
        let singArray = {
          specInstId: send.specInstId
        }
        urlParams.send = send
        urlParams.singArray = singArray
        let that = this
        sendServer(urlParams, this, Toast).then(
          (res) => {
            that.$message.success('机构切换成功')
            // let sysTellerInfo = res.data.sysTellerInfo||''; //获取操作员信息
            let sysInstInfo = res.data.sysInstInfo || '' //获取机构信息
            let parentInstInfos = res.data.parentInstInfos || '' //获取父机构信息
            if (parentInstInfos) {
              localStorage.setItem('parentInstInfos', JSON.stringify(parentInstInfos)) //缓存当前登录机构的父级们
            } else {
              //切换机构时,没有父级机构数据,清空缓存中存储的切换前的机构的父机构信息
              localStorage.removeItem('parentInstInfos')
            }
            // if(sysTellerInfo){
            //   localStorage.setItem('tellerId', sysTellerInfo.tellerId); //缓存当前操作员Id
            // }
            if (sysInstInfo) {
              localStorage.setItem('instId', sysInstInfo.instId) //缓存当前机构Id
            }
            that.$store.commit('loginIn')
            localStorage.setItem('adminPcUuid', res.data.adminPcUuid) //缓存uuid
            localStorage.setItem('adminFlag', res.data.adminFlag) //缓存当前操作员标识
            localStorage.setItem('macKey', res.data.macKey) //缓存macKey
            localStorage.setItem('funcArray', JSON.stringify(res.data.funcArray)) //缓存当前机构操作员的权限
            // localStorage.setItem('sysTellerInfo',JSON.stringify(res.data.sysTellerInfo)); //缓存当前机构操作员的信息
            localStorage.setItem('sysInstInfo', JSON.stringify(res.data.sysInstInfo)) //缓存当前操作员的信息

            //向同父组件中的Header传值，触发bus，更新头部的用户名和当前层级及父级名称
            bus.$emit('tellerToParentInst', '')

            bus.$emit('tellerToParentInst', '')

            //解析功能权限
            let ruleFunction = []
            res.data.funcArray.forEach(item => {
              let functionInfo = {
                Id: item.funcId,
              }
              ruleFunction.push(functionInfo)
            })
            ruleFunction.forEach(item => {
              ruleFunction[item.Id] = true
            })
            that.$store.commit('setRuleFunction', ruleFunction)
            bus.$emit('tellerToSpec', '')

            this.instId = sysInstInfo.instId //更新当前机构Id
            //查询操作员机构列表
            this.tellerInstsGetByConsFun()
          }, (res) => {
            console.log('res', res)
            //若切换操作员机构请求超时,重新查询操作员机构列表
            if (res === 'timeout') {
              that.tellerInstsGetByConsFun()
            }
          })
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

  .table-container {
    margin-top: 10px;
  }


  .svg-view {
    display: flex;
    flex-direction: row;
    margin: 100px 0 0 30px;
  }

  .svg-view-cont-inst {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: 10px;
  }


  .svg-view-span {
    margin-left: 10px;
  }


  .font-small {
    font-size: 14px;
    color: #606266;
  }

  .form-border {
    border-right: 1px solid #DCDFE6;
    /*border-bottom: 1px solid #DCDFE6;*/
    padding: 10px;
  }

  .form-container-border {
    border: 1px solid #DCDFE6;
    /*border-top: 1px solid #DCDFE6;*/
    margin-top: 15px;
  }

  .form-border-v {
    border-bottom: 1px solid #DCDFE6;

  }

  .form-left-bg {
    background: #F2F6FC;
  }

</style>
