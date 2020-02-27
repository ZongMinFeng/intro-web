<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button type="success" :disabled='addDisabled' icon="el-icon-plus" @click="onAddNewTap">新增</el-button>
        <el-button type="primary" :disabled='refDisabled' icon="el-icon-refresh" @click="onRefresh" class="search-btn">
          刷新
        </el-button>
      </div>

      <div class="table-container">
        <el-table :data="tellersArray"
                  style="width: 100%"
                  border
                  size="medium">
          <el-table-column label="姓名" align="center">
            <template slot-scope="scope">

              <div class="el-icon-i">
                <i v-if="scope.row.adminFlag === 'Admin'" class="el-icon-user-solid"
                   style="color: red;"></i>
                <i v-else class="el-icon-user " style="color: #5cb6ff;"></i>

                <svg-icon v-if="scope.row.tellerId === tellerId" icon-class="true"
                          style="color: red;font-weight: 600;margin-left: 5px;"></svg-icon>
              </div>
              {{scope.row.tellerName}}
            </template>
          </el-table-column>
          <el-table-column label="手机号" align="center">
            <template slot-scope="scope">{{scope.row.tellerPhone}}</template>
          </el-table-column>
          <el-table-column label="地址" align="center">
            <template slot-scope="scope">{{scope.row.tellerAddr}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="350">
            <template slot-scope="scope">
              <div>
                <el-button
                  v-if="scope.row.adminFlag !== 'Admin'&&(tellerId ===scope.row.createTellerId||adminFlag === 'Admin')"
                  :disabled='uptDisabled'
                  size="mini"
                  @click="handleUpdate(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                  v-if="scope.row.adminFlag !== 'Admin'&&(tellerId ===scope.row.createTellerId||adminFlag === 'Admin')"
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>

                <el-button
                  v-if="scope.row.adminFlag !== 'Admin'&&(adminFlag === 'Admin'||scope.row.createTellerId === tellerId)"
                  size="mini"
                  type="success"
                  @click="handleRedset(scope.$index, scope.row)">重置
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
          <i class="el-icon-user-solid" style="color: red;font-weight: 600;"></i>
          <span class="svg-view-span">管理员</span>
        </div>

        <div class="svg-view-cont-inst svg-view-cont-margin">
          <i class="el-icon-user " style="color: #5cb6ff;font-weight: 600;"></i>
          <span class="svg-view-span">普通操作员</span>
        </div>

        <div class="svg-view-cont-inst svg-view-cont-margin">
          <svg-icon icon-class="true" style="color: red;font-weight: 600;"></svg-icon>
          <span class="svg-view-span">当前登录操作员</span>
        </div>
      </div>

      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form ref="instTellerForm" :model="instTellerForm" :rules="rules" label-width="120px">
          <el-form-item label="操作员姓名" prop="tellerName">
            <el-input :disabled="uptInput" v-model="instTellerForm.tellerName" maxlength="20"
                      auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="操作员手机号" prop="tellerPhone">
            <el-input :disabled="uptInput" v-model="instTellerForm.tellerPhone" maxlength="11"
                      auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item v-if="rolesData.length>0" label="角色">
            <el-checkbox-group v-model="checkList" class="role-list" size="medium" v-for="column in rolesData"
                               :key="column.roleId">
              <el-checkbox :label="column.roleId" v-if="column.adminFlag!=='Admin'">
                {{column.roleName}} <i v-if="!column.flag" class="el-icon-caret-bottom"  @click.prevent="() => handelHiddenNo(column)"></i>
                                    <i v-else class="el-icon-caret-top"  @click.prevent="() => handelHiddenOk(column)"></i>
              </el-checkbox>
              <el-tree
                style="margin-left: 20px;"
                v-if="column.flag"
                :data="column.funList"
                node-key="funcId"
                :props="defaultProps"
                :default-expanded-keys="column.funList"
                :default-expand-all="true">
              </el-tree>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm('instTellerForm')">确 定</el-button>
      </span>
      </el-dialog>


      <el-dialog
        title="操作员详情"
        :visible.sync="dialogDetailVisible"
        width="30%">

        <div class="form-container-border">
          <el-row class="form-border-v">
            <el-col class="form-border form-left-bg font-small" :span="6">姓名</el-col>
            <el-col class="form-border font-small" :span="18">{{itemTellerArray.tellerName}}</el-col>
          </el-row>

          <el-row class="form-border-v">
            <el-col class="form-border form-left-bg font-small" :span="6">手机号</el-col>
            <el-col class="form-border font-small" :span="18">{{itemTellerArray.tellerPhone}}</el-col>
          </el-row>

          <el-row class="form-border-v">
            <el-col class="form-border form-left-bg font-small" :span="6">地址</el-col>
            <el-col class="form-border font-small" :span="18">{{itemTellerArray.tellerAddr}}</el-col>
          </el-row>

          <el-row class="form-border-v">
            <el-col class="form-border form-left-bg font-small" :span="6">角色</el-col>
            <el-col class="form-border font-small" :span="18">
              <div v-for="column in tellerRolesArray1" :key="column.roleId" style="margin-top: 5px;">
                <i class="el-icon-circle-check" style="color: #409EFF;"/> {{column.roleName}}
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">权限</el-col>
            <el-col class="form-border font-small" :span="18">
              <el-tree
                :data="itemTellerArray.funList"
                node-key="funcId"
                :props="defaultProps"
                :default-expanded-keys="itemTellerArray.funList"
                :default-expand-all="true">
              </el-tree>
            </el-col>
          </el-row>
        </div>

        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailVisible = false">取 消</el-button>
      </span>
      </el-dialog>

    </div>
  </div>
</template>


<script>
  import {validUsername} from '../../../util/validate'
  import {sendServer} from '../../../util/common'
  import {
    instTellersGetByCons,
    instRolesGetByCons,
    tellerRolesGetByCons,
    tellerFuncsGetByCons,
    roleFuncsGetByCons
  } from '../../../util/module'
  import cfg from '../../../config/cfg'
  import {Toast, Indicator} from 'mint-ui'
  import {role} from '../../../util/roleFunction'
  import {listToTree} from '../../../util/pub'
  import {treeSort} from '../../../util/jsonSha256'

  export default {
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请填写纯数字手机号！'))
        } else if (value.substr(0, 1) !== '1') {
          callback(new Error('手机号格式错误！'))
        } else if (value.length !== 11) {
          callback(new Error('手机号必须为11位！'))
        } else {
          callback()
        }
      }

      return {
        adminFlag: localStorage.getItem('adminFlag'),
        tellerId: localStorage.getItem('tellerId'),
        tellerRolesArray1: [],
        tellersArray: [],
        itemTellerArray: {},
        rolesData: [],
        checkList: [],
        dialogVisible: false,
        dialogDetailVisible: false,
        dialogTitle: '',
        instTellerForm: {
          tellerName: '',
          tellerPhone: '',
        },
        defaultProps: {
          children: 'menuBeans',
          label: 'funcName',
        },
        addDisabled: false,
        refDisabled: false,
        uptDisabled: false,
        uptInput: false,
        rules: {
          tellerPhone: [{required: true, trigger: 'blur', validator: validateUsername}]
        },
      }
    },

    created() {
      role(this)
      let sysTellerInfo = JSON.parse(localStorage.getItem('sysTellerInfo'))
      this.tellerId = sysTellerInfo.tellerId

      if (this.Function.tellerPreservation) {
        this.addDisabled = false
      } else {
        this.addDisabled = true
      }

      if (this.Function.tellerModification) {
        this.uptDisabled = false
      } else {
        this.uptDisabled = true
      }

      if (this.Function.tellerGetById) {
        this.refDisabled = false
        this.instTellersGetByConsFun()
      } else {
        this.refDisabled = true
      }
    },

    methods: {
      instTellersGetByConsFun() {
        instTellersGetByCons(this, Toast).then((res) => {
          console.log('res', res)
          let data = res.data
          if (!data) {
            Toast({
              message: res.msg,
              duration: 2000
            })
            return
          }
          let tellerId = this.tellerId;
          if (data.length > 1) {
            data.sort(function (a, b) {
              return a.adminFlag === 'Admin' ? 1 : 2;
            });
            data.sort(function (a, b) {
              return a.tellerId === tellerId ? -1 : 1;
            });
          }
          this.tellersArray = data
        }, (res) => {
          console.log('res', res)
        })
      },

      onAddNewTap() {
        this.titleStatus = 0
        this.dialogTitle = '添加操作员'
        this.uptInput = false
        this.treeHidden = false;
        this.instRolesGetByCons(this.tellerId)
      },

      onRefresh() {
        this.instTellerForm = {
          tellerName: '',
          tellerPhone: '',
        }
        let that = this
        this.checkList = [];
        if (this.Function.tellerGetById) {
          this.instTellersGetByConsFun()
        }
      },

      handleDelete(index, row) {
        let content = '确认删除该操作员？'
        let conFiag = 0
        if (this.adminFlag === 'Admin') {
          this.handleWarn(content, conFiag, row.tellerId)
        } else {
          if (this.tellerId === row.createTellerId) {
            this.handleWarn(content, conFiag, row.tellerId)
          } else {
            Toast({
              message: '抱歉，你没有删除该操作员权力~',
              duration: 2000
            })
          }
        }
      },

      handleDetail(index, row) {
        this.titleStatus = 2
        this.tellersArray.forEach(item => {
          if (item.tellerId === row.tellerId) {
            this.tellerRolesGetByCons(row.tellerId)
            this.tellerFuncsGetByConsFun(row.tellerId);
          }
        })
      },

      handelHiddenNo(row){
        console.log('row',row)
        this.roleId = row.roleId;
        this.roleFuncsGetByConsFun(row.roleId);
      },

      handelHiddenOk(row){
        this.rolesData.forEach(item => {
          if(item.roleId === row.roleId){
            item.flag = false;
          }
        })
      },



      roleFuncsGetByConsFun(roleId) {
        roleFuncsGetByCons(this, roleId, Toast).then((res) => {
          console.log('res', res)
          let data = res.data
          if (!data) {
            Toast({
              message: res.msg,
              duration: 2000
            })
            return
          }

          let tree = listToTree('funcId', 'parentFuncId', data)
          tree = treeSort(tree);
          this.rolesData.forEach(item => {
            if(item.roleId === roleId){
              item.flag = true;
              item.funList = tree;
            }
          })
        }, (res) => {
          console.log('res', res)
        })
      },


      tellerFuncsGetByConsFun(tellerId) {
        tellerFuncsGetByCons(this, tellerId, Toast).then((res) => {
          let data = res.data
          if (!data) {
            Toast({
              message: res.msg,
              duration: 2000
            })
            return
          }
          let tree = listToTree('funcId', 'parentFuncId', data)
          tree = treeSort(tree);
          this.tellersArray.forEach(item => {
            if (item.tellerId === tellerId) {
              item.funList = tree;
              this.itemTellerArray = item;
            }
          });
          this.dialogDetailVisible = true;
        }, (res) => {
          let data = res.data
          if (!data) {
            if (res.data.status !== 200 && res.data.status !== 400) {
              this.$message.error('本角色创建者已被删除，无法编辑该角色！')
            }
          }
        })
      },


      handleRedset(index, row) {
        let content = '确认重置该操作员的密码？'
        let conFiag = 1
        if (this.adminFlag === 'Admin') {
          this.handleWarn(content, conFiag, row.tellerId)
        } else {
          if (this.tellerId === row.createTellerId) {
            this.handleWarn(content, conFiag, row.tellerId)
          } else {
            Toast({
              message: '抱歉，你没有重置该操作员密码的权力~',
              duration: 2000
            })
          }
        }
      },

      handleWarn(content, conFiag, tellerId) {
        let that = this
        this.$confirm(content, 'Warning', {
          type: 'warning'
        })
          .then(_ => {
            if (conFiag === 0) {
              that.tellerClear(tellerId)
            } else {
              that.resetTellerPwdModification(tellerId)
            }
          })
          .catch(_ => {
            console.log('取消')
          })
      },

      handleUpdate(index, row) {
        console.log('row', row)
        this.treeHidden = false;
        this.titleStatus = 1
        this.uptInput = true
        this.dialogTitle = '编辑操作员'
        this.instTellerForm = {
          tellerName: row.tellerName,
          tellerPhone: row.tellerPhone
        }

        this.tellerIdClick = row.tellerId
        if (this.adminFlag === 'Admin') {
          if (this.tellerId === row.createTellerId) {
            this.instRolesGetByCons(this.tellerId)
          } else {
            this.instRolesGetByCons(row.createTellerId)
          }
        } else {
          if (this.tellerId === row.createTellerId) {
            this.instRolesGetByCons(this.tellerId)
          } else {
            this.instTellerForm = {
              tellerName: '',
              tellerPhone: ''
            }
            Toast({
              message: '抱歉，你没有修改该操作员权力~',
              duration: 2000
            })
          }
        }
      },

      handleConfirm(instTellerForm) {
        this.$refs[instTellerForm].validate((valid) => {
          if (valid) {
            if (this.titleStatus === 0) {
              this.tellerPreservation()
            } else {
              const result = this.checkList.length === this.tellerRolesArray.length && this.checkList.every(a => this.tellerRolesArray.some(b => a === b)) && this.tellerRolesArray.every(_b => this.checkList.some(_a => _a === _b))
              if (result) {
                this.dialogVisible = false
              } else {
                this.tellerRolesModification()
              }
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },

      instRolesGetByCons(tellerId) {
        let that = this
        if (this.Function.roleGetById) {
          instRolesGetByCons(this, Toast).then((res) => {
            console.log('res', res)
            let data = res.data
            if (!data) {
              Toast({
                message: res.msg,
                duration: 2000
              })
              return
            }
            let roleArray = []
            data.forEach(item => {
              if (item.createTellerId === tellerId) {
                item.flag=false;
                roleArray.push(item)
              }
            })
            this.rolesData = roleArray
            if (this.titleStatus === 1) {
              this.tellerRolesGetByCons(that.tellerIdClick)
            } else {
              this.dialogVisible = true
            }
          }, (res) => {
            console.log('res', res)
          })
        } else {
          this.instTellerForm = {
            tellerName: '',
            tellerPhone: ''
          }
          Toast({
            message: '抱歉,你没有查询角色的权限~'
          })
        }
      },


      tellerRolesGetByCons(tellerId) {
        let that = this
        tellerRolesGetByCons(this, tellerId, Toast).then((res) => {
          console.log('res', res)
          let data = res.data
          if (!data) {
            Toast({
              message: res.msg,
              duration: 2000
            })
            return
          }

          if (this.titleStatus === 2) {
            this.tellerRolesArray1 = data
            this.dialogDetailVisible = true;
          } else {
            let checkList = [];
            this.dialogVisible = true;
            data.forEach(item => {
              checkList.push(item.roleId);
            });
            this.tellerRolesArray = checkList;
            this.checkList = checkList;
          }
        }, (res) => {
          console.log('res', res)
        })
      },


      tellerPreservation() {
        let urlParams = {}
        let send = {}
        urlParams.url = cfg.service.tellerPreservation.url + '/' + cfg.service.tellerPreservation.action
        urlParams.txnId = cfg.service.tellerPreservation.txnId
        send.tellerPhone = this.instTellerForm.tellerPhone
        if (this.instTellerForm.tellerName) {
          send.tellerName = this.instTellerForm.tellerName
        }
        if (this.checkList.length <= 0) {
          this.$message.warning('你还未选择角色')
          return
        }
        let singArray = {}
        singArray.tellerPhone = send.tellerPhone
        let Roles = []
        this.checkList.forEach(item => {
          Roles.push(item)
          singArray[item] = item
        })
        send.strList = Roles
        urlParams.send = send
        urlParams.singArray = singArray

        let that = this
        sendServer(urlParams, this, Toast).then(
          (res) => {
            console.log('res', res)
            that.dialogVisible = false

            if (res.data.newTellerPwd) {
              this.$confirm('新建操作员成功，密码为：' + res.data.newTellerPwd, 'Info', {
                type: 'Info'
              })
                .then(_ => {
                  that.instTellersGetByConsFun()
                })
                .catch(_ => {
                  console.log('取消')
                  that.instTellersGetByConsFun()
                })
            } else {
              that.$message.success('新建操作员成功')
              that.instTellersGetByConsFun()
            }

          }, (res) => {
            console.log('res', res)
            if (res === 'timeout') {
              that.dialogVisible = false
              that.instTellersGetByConsFun()
            }
          }
        )
      },


      tellerRolesModification() {
        let urlParams = {}
        let send = {}
        urlParams.url = cfg.service.tellerRolesModification.url + '/' + cfg.service.tellerRolesModification.action
        urlParams.txnId = cfg.service.tellerRolesModification.txnId
        send.specTellerId = this.tellerIdClick
        if (this.checkList.length <= 0) {
          this.$message.warning('你还未选择角色')
          return
        }
        let singArray = {}
        singArray.specTellerId = send.specTellerId
        let Roles = []
        this.checkList.forEach(item => {
          Roles.push(item)
          singArray[item] = item
        })
        send.strList = Roles
        urlParams.send = send
        urlParams.singArray = singArray
        let that = this
        sendServer(urlParams, this, Toast).then(
          (res) => {
            console.log('res', res)
            that.$message.success('修改操作员角色成功')
            that.dialogVisible = false
          }, (res) => {
            console.log('res', res)
            if (res === 'timeout') {
              that.dialogVisible = false
            }
          })
      },


      tellerClear(tellerId) {
        let urlParams = {}
        let send = {}
        urlParams.url = cfg.service.tellerClear.url + '/' + cfg.service.tellerClear.action
        urlParams.txnId = cfg.service.tellerClear.txnId
        send.specTellerId = tellerId
        let singArray = {
          specTellerId: send.specTellerId
        }
        urlParams.send = send
        urlParams.singArray = singArray
        let that = this
        sendServer(urlParams, this, Toast).then(
          (res) => {
            that.$message.success('删除操作员成功')
            that.instTellersGetByConsFun()
          }, (res) => {
            console.log('res', res)
            if (res === 'timeout') {
              that.instTellersGetByConsFun()
            }
          })
      },


      resetTellerPwdModification(tellerId) {
        let urlParams = {}
        let send = {}
        urlParams.url = cfg.service.resetTellerPwdModification.url + '/' + cfg.service.resetTellerPwdModification.action
        urlParams.txnId = cfg.service.resetTellerPwdModification.txnId
        send.specTellerId = tellerId
        let singArray = {
          specTellerId: send.specTellerId
        }
        urlParams.send = send
        urlParams.singArray = singArray
        let that = this
        sendServer(urlParams, this, Toast).then(
          (res) => {
            that.$message.success('密码重置成功')
            this.$confirm('重置的密码为：' + res.data, 'Info', {
              type: 'Info'
            })
              .then(_ => {

              })
              .catch(_ => {
                console.log('取消')
              })
          }, (res) => {
            console.log('res', res)
          })
      },

    }
  }
</script>


<style lang="scss">
  .el-dialog__body {
    padding: 15px 20px;
    color: #606266;
    line-height: 24px;
    font-size: 14px
  }
</style>


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

  .svg-view-cont-margin {
    margin-left: 40px;
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
    padding: 10px;
  }

  .form-container-border {
    border: 1px solid #DCDFE6;
    margin-top: 15px;
  }

  .form-border-v {
    border-bottom: 1px solid #DCDFE6;

  }

  .form-left-bg {
    background: #F2F6FC;
  }
</style>
