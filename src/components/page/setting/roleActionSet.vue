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
        <el-table :data="rolesArray"
                  style="width: 100%"
                  border
                  size="medium"
        >
          <el-table-column label="角色" align="center">
            <template slot-scope="scope">

              <div class="el-icon-i">
                <i v-if="scope.row.adminFlag === 'Admin'" class="el-icon-user-solid"
                   style="color: red;"></i>
                <i v-else class="el-icon-user " style="color: #5cb6ff;"></i>

                <svg-icon v-if="scope.row.roleFlag" icon-class="true"
                          style="color: red;font-weight: 600;margin-left: 5px;"></svg-icon>
              </div>
              {{scope.row.roleName}}
            </template>
          </el-table-column>

          <el-table-column label="角色描述" align="center">
            <template slot-scope="scope">{{scope.row.roleDesc}}</template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="250">
            <template slot-scope="scope">
              <div>
                <el-button
                  v-if="scope.row.adminFlag !== 'Admin'&&(tellerId ===scope.row.createTellerId||adminFlag === 'Admin')"
                  :disabled='uptDisabled'
                  size="mini"
                  @click="handleUpdate(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                  v-if="scope.row.adminFlag !== 'Admin'&&(adminFlag === 'Admin'||scope.row.createTellerId === tellerId)"
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
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
          <span class="svg-view-span">管理员角色</span>
        </div>

        <div class="svg-view-cont-inst svg-view-cont-margin">
          <i class="el-icon-user " style="color: #5cb6ff;font-weight: 600;"></i>
          <span class="svg-view-span">普通角色</span>
        </div>

        <div class="svg-view-cont-inst svg-view-cont-margin">
          <svg-icon icon-class="true" style="color: red;font-weight: 600;"></svg-icon>
          <span class="svg-view-span">当前登录操作员拥有角色</span>
        </div>
      </div>


      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form ref="instRoleForm" :model="instRoleForm" :rules="rules" label-width="120px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input :disabled="uptInput" v-model="instRoleForm.roleName" maxlength="20"
                      auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="角色描述" prop="roleDesc">
            <el-input :disabled="uptInput" v-model="instRoleForm.roleDesc" maxlength="35"
                      auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="权限">
            <el-tree
              :check-strictly="checkStrictly"
              :data="functionData"
              show-checkbox
              node-key="funcId"
              ref="tree"
              :props="defaultProps"
              :default-expanded-keys="functionData"
              :default-expand-all="true">
            </el-tree>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm('instRoleForm')">确 定</el-button>
      </span>
      </el-dialog>


      <el-dialog
        title="角色详情"
        :visible.sync="dialogDetailVisible"
        width="30%">

        <div class="form-container-border">
          <el-row class="form-border-v">
            <el-col class="form-border form-left-bg font-small" :span="6">角色名称</el-col>
            <el-col class="form-border font-small" :span="18">{{itemRoleArray.roleName}}</el-col>
          </el-row>

          <el-row class="form-border-v">
            <el-col class="form-border form-left-bg font-small" :span="6">角色描述</el-col>
            <el-col class="form-border font-small" :span="18">{{itemRoleArray.roleDesc}}</el-col>
          </el-row>


          <el-row>
            <el-col class="form-border form-left-bg font-small" :span="6">权限</el-col>
            <el-col class="form-border font-small" :span="18">
              <el-tree
                :data="itemRoleArray.funList"
                node-key="funcId"
                :props="defaultProps"
                :default-expanded-keys="itemRoleArray.funList"
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
  import {sendServer} from '../../../util/common'
  import {
    instRolesGetByCons,
    roleFuncsGetByCons,
    tellerFuncsGetByCons,
    tellerRolesGetByCons
  } from '../../../util/module'

  import {listToTree} from '../../../util/pub'
  import {treeSort} from '../../../util/jsonSha256'
  import cfg from '../../../config/cfg'
  import {Toast, Indicator} from 'mint-ui'
  import {role} from '../../../util/roleFunction'

  export default {
    data() {
      const validateRolesName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请填写角色名称！'))
        } else {
          callback()
        }
      }
      return {
        adminFlag: localStorage.getItem('adminFlag'),
        tellerId: localStorage.getItem('tellerId'),
        rolesArray: [],
        itemRoleArray: {},
        functionData: [],
        tellerFunctionData: [],
        dialogVisible: false,
        dialogDetailVisible: false,
        dialogTitle: '',
        instRoleForm: {
          roleName: '',
          roleDesc: '',
        },
        addDisabled: false,
        refDisabled: false,
        uptDisabled: false,
        uptInput: false,
        checkStrictly: false,
        rules: {
          roleName: [{required: true, validate: '', trigger: 'blur', validator: validateRolesName}],
        },
        defaultProps: {
          children: 'menuBeans',
          label: 'funcName',
        }
      }
    },

    created() {
      role(this)
      let funcList = JSON.parse(localStorage.getItem('funcArray'));
      let tree = listToTree('funcId', 'parentFuncId', funcList);
      tree = treeSort(tree);
      this.functionData = tree;
      this.tellerFunctionData = tree;

      if (this.Function.rolePreservation) {
        this.addDisabled = false
      } else {
        this.addDisabled = true
      }

      if (this.Function.roleFuncsModification) {
        this.uptDisabled = false
      } else {
        this.uptDisabled = true
      }

      if (this.Function.roleGetById) {
        this.refDisabled = false
        this.instRolesGetByConsFun();
      } else {
        this.refDisabled = true
      }
    },

    methods: {
      tellerRolesGetByCons() {
        let that = this
        tellerRolesGetByCons(this, that.tellerId, Toast).then((res) => {
          console.log('res2 tellerRolesGetByCons', res)
          let data = res.data
          if (!data) {
            Toast({
              message: res.msg,
              duration: 2000
            })
            return
          }
          let rolesArray = this.rolesArray;
          rolesArray.forEach(item => {
            data.forEach(itemData => {
              if (item.roleId === itemData.roleId) {
                item.roleFlag = true;
              }
            });
          });

          if (rolesArray.length > 1) {
            rolesArray.sort(function (a, b) {
              return a.adminFlag === 'Admin' ? 1 : 2;
            });
            rolesArray.sort(function (a, b) {
              return a.roleFlag === true ? -1 : 1;
            });
          }
          this.rolesArray = rolesArray;
        }, (res) => {
          console.log('res', res)
        })
      },


      instRolesGetByConsFun() {
        instRolesGetByCons(this, Toast).then((res) => {
          console.log('res1', res)
          let data = res.data
          if (!data) {
            Toast({
              message: res.msg,
              duration: 2000
            })
            return
          }
          this.rolesArray = data;
          if (this.Function.tellerGetById) {
            this.tellerRolesGetByCons();
          }
        }, (res) => {
          console.log('res', res)
        })
      },

      onAddNewTap() {
        this.functionData = this.tellerFunctionData
        this.dialogVisible = true
        this.dialogTitle = '添加角色'
        this.titleStatus = 0
        this.uptInput = false
      },

      handleUpdate(index, row) {
        this.functionData = this.tellerFunctionData
        this.titleStatus = 1
        this.uptInput = true
        this.dialogTitle = '编辑角色'
        this.roleId = row.roleId
        if (this.adminFlag === 'Admin') {
          if (this.tellerId === row.createTellerId) {
            this.checkStrictly = true
            this.instRoleForm = {
              roleName: row.roleName,
              roleDesc: row.roleDesc
            }
            this.roleFuncsGetByConsFun(row.roleId)
          } else {
            if (this.Function.tellerGetById) {
              tellerFuncsGetByCons(this, row.createTellerId, Toast).then((res) => {
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
                this.functionData = tree
                this.checkStrictly = true
                this.instRoleForm = {
                  roleName: row.roleName,
                  roleDesc: row.roleDesc
                }
                this.roleFuncsGetByConsFun(row.roleId)
              }, (res) => {
                let data = res.data
                if (!data) {
                  if (res.data.status !== 200 && res.data.status !== 400) {
                    this.$message.error('本角色创建者已被删除，无法编辑该角色！')
                  }
                }
                console.log('res', res)
              })
            } else {
              Toast({
                message: '抱歉,没有查询机构操作员的权限~'
              })
            }
          }
        } else {
          if (this.tellerId === row.createTellerId) {
            this.checkStrictly = true
            this.instRoleForm = {
              roleName: row.roleName,
              roleDesc: row.roleDesc
            }
            this.roleFuncsGetByConsFun(row.roleId)
          } else {
            Toast({
              message: '抱歉，你没有修改该角色权力~',
              duration: 2000
            })
          }
        }
      },

      handleDelete(index, row) {
        let content = '确认删除该角色？'
        if (this.adminFlag === 'Admin') {
          this.handleWarn(content, row.roleId)
        } else {
          if (this.tellerId === row.createTellerId) {
            this.handleWarn(content, row.roleId)
          } else {
            Toast({
              message: '抱歉，你没有删除该角色权力~',
              duration: 2000
            })
          }
        }
      },

      handleWarn(content, roleId) {
        let that = this
        this.$confirm(content, 'Warning', {
          type: 'warning'
        })
          .then(_ => {
            that.roleClear(roleId)
          })
          .catch(_ => {
            console.log('取消')
          })
      },

      onRefresh() {
        this.instRoleForm = {
          roleName: '',
          roleDesc: '',
        }
        let that = this
        this.$nextTick(() => {
          that.$refs.tree.setCheckedNodes([])
        })
        if (this.Function.roleGetById) {
          this.instRolesGetByConsFun()
        }
      },

      handleDetail(index, row) {
        this.titleStatus = 2
        this.rolesArray.forEach(item => {
          if (item.roleId === row.roleId) {
            if (this.Function.roleGetById) {
              this.roleFuncsGetByConsFun(row.roleId);
            }
          }
        })
      },


      roleFuncsGetByConsFun(roleId) {
        let that = this
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

          if (this.titleStatus === 2) {
            let tree = listToTree('funcId', 'parentFuncId', data)
            tree = treeSort(tree);
            this.rolesArray.forEach(item => {
              if (item.roleId === roleId) {
                item.funList = tree;
                this.itemRoleArray = item;
              }
            });
            this.dialogDetailVisible = true;
          } else {
            this.dialogVisible = true
            this.roleFuncsArray = data;
            this.$nextTick(() => {
              that.$refs.tree.setCheckedNodes(data)
              this.checkStrictly = false
            })
          }
        }, (res) => {
          console.log('res', res)
          this.checkStrictly = false
        })
      },

      handleConfirm(instRoleForm) {
        this.$refs[instRoleForm].validate((valid) => {
          if (valid) {
            if (this.titleStatus === 0) {
              this.rolePreservation()
            } else {
              let funCheck = this.$refs.tree.getCheckedNodes()
              let strList = []
              funCheck.forEach(item => {
                strList.push(item.funcId)
                if (item.parentFuncId != 'Root' && strList.indexOf(item.parentFuncId) == -1) {
                  strList.push(item.parentFuncId)
                }
              })

              const result = this.roleFuncsArray.length === strList.length && this.roleFuncsArray.every(a => strList.some(b => a.funcId === b)) && strList.every(_b => this.roleFuncsArray.some(_a => _a.funcId === _b))
              if (result) {
                this.dialogVisible = false
              } else {
                this.roleFuncsModification()
              }
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },

      /**
       * 新增角色
       */
      rolePreservation() {
        let urlParams = {}
        let send = {}
        urlParams.url = cfg.service.rolePreservation.url + '/' + cfg.service.rolePreservation.action
        urlParams.txnId = cfg.service.rolePreservation.txnId
        send.roleName = this.instRoleForm.roleName
        if (this.instRoleForm.roleDesc) {
          send.roleDesc = this.instRoleForm.roleDesc
        }
        let funCheck = this.$refs.tree.getCheckedNodes()
        let strList = []
        funCheck.forEach(item => {
          strList.push(item.funcId)
          if (item.parentFuncId != 'Root' && strList.indexOf(item.parentFuncId) == -1) {
            strList.push(item.parentFuncId)
          }
        })
        if (strList.length <= 0) {
          this.$message.warning('你还未选择权限~')
          return
        }

        let singArray = {}
        strList.forEach(strItem => {
          singArray[strItem] = strItem
        })
        send.strList = strList
        urlParams.send = send
        urlParams.singArray = singArray
        let that = this
        sendServer(urlParams, this, Toast).then(
          (res) => {
            console.log('res', res)
            that.$message.success('新建角色成功')
            that.dialogVisible = false
            that.instRolesGetByConsFun()
          }, (res) => {
            console.log('res', res)
            if (res === 'timeout') {
              that.dialogVisible = false
              that.instRolesGetByConsFun()
            }
          }
        )
      },


      roleFuncsModification() {
        let urlParams = {}
        let send = {}
        urlParams.url = cfg.service.roleFuncsModification.url + '/' + cfg.service.roleFuncsModification.action
        urlParams.txnId = cfg.service.roleFuncsModification.txnId
        send.roleId = this.roleId
        let funCheck = this.$refs.tree.getCheckedNodes()
        let strList = []
        funCheck.forEach(item => {
          strList.push(item.funcId)
          if (item.parentFuncId != 'Root' && strList.indexOf(item.parentFuncId) == -1) {
            strList.push(item.parentFuncId)
          }
        })
        if (strList.length <= 0) {
          this.$message.warning('你还未选择权限~')
          return
        }

        let singArray = {}
        strList.forEach(strItem => {
          singArray[strItem] = strItem
        })
        singArray.roleId = this.roleId
        console.log('singArray', singArray)
        send.strList = strList
        urlParams.send = send
        urlParams.singArray = singArray
        let that = this
        sendServer(urlParams, this, Toast).then(
          (res) => {
            console.log('res', res)
            that.$message.success('修改角色功能成功')
            that.dialogVisible = false
          }, (res) => {
            console.log('res', res)
            if (res === 'timeout') {
              that.dialogVisible = false
            }
          })
      },

      roleClear(roleId) {
        let urlParams = {}
        let send = {}
        urlParams.url = cfg.service.roleClear.url + '/' + cfg.service.roleClear.action
        urlParams.txnId = cfg.service.roleClear.txnId
        send.roleId = roleId
        let singArray = {
          roleId: send.roleId
        }
        urlParams.send = send
        urlParams.singArray = singArray
        let that = this
        sendServer(urlParams, this, Toast).then(
          (res) => {
            that.$message.success('删除角色功能成功')
            that.instRolesGetByConsFun()
          }, (res) => {
            console.log('res', res)
            if (res === 'timeout') {
              that.instRolesGetByConsFun()
            }
          })
      },
    }
  }
</script>

<style lang="scss">
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    /*width: 50%;*/
  }

  .el-checkbox:last-of-type {
    margin-right: 10px;
  }
</style>

<style lang="scss" scoped>

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

  .svg-view-cont {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: 30px;
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

  .form-border-v{
    border-bottom: 1px solid #DCDFE6;

  }

  .form-left-bg {
    background: #F2F6FC;
  }
</style>
