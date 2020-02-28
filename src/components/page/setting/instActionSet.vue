<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <!--<el-button type="success" :disabled='addDisabled' icon="el-icon-plus" @click="onAddNewTap">新增</el-button>-->
        <!--<el-button type="primary" :disabled='uptDisabled' icon="el-icon-edit" @click="onUpdateNewTap">修改</el-button>-->
        <el-button type="primary" :disabled='refDisabled' icon="el-icon-refresh" @click="onRefresh" class="search-btn">
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
        width="30%">
        <el-form ref="instPreservationForm" :model="instPreservationForm" :rules="rules" label-width="120px">
          <el-form-item label="名称" prop="instName">
            <el-input v-model="instPreservationForm.instName" maxlength="64" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item v-if="titleStatus===0" label="管理员手机号" prop="adminPhone">
            <el-input v-model="instPreservationForm.adminPhone" maxlength="11" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm('instPreservationForm')">确 定</el-button>
      </span>
      </el-dialog>


    </div>
  </div>
</template>

<script>
  import {validUsername} from '../../../util/validate'
  import {sendServer} from '../../../util/common'
  import {instGetAllById} from '../../../util/module'
  import cfg from '../../../config/cfg'
  import {Toast, Indicator} from 'mint-ui'
  import LevelTree from '../../common/LevelTree'
  import bus from '../../common/bus'

  export default {
    name: 'instActionSet',
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

      const validateAliasName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请填写简称！'))
        } else {
          callback()
        }
      }

      const validateInstName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请填写全称！'))
        } else {
          callback()
        }
      }
      return {
        instArray: [],
        dialogVisible: false,
        dialogTitle: '',
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
          aliasName: [{required: true, validate: '', trigger: 'blur', validator: validateAliasName}],
          instName: [{required: true, validate: '', trigger: 'blur', validator: validateInstName}],
          adminPhone: [{required: true, trigger: 'blur', validator: validateUsername}]
        },
        dialogForm:{

        },
      }
    },

    components: {
      LevelTree
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

      onAddNewTap() {
        this.dialogVisible = true;
        this.dialogTitle = this.getDialogTitle('add');
        this.instPreservationForm.specInstId=this.sysInstInfo.instId;
        this.titleStatus = 0
      },

      onUpdateNewTap() {
        this.dialogVisible = true;
        this.dialogTitle = this.getDialogTitle('upt');
        this.titleStatus = 1;
        this.instPreservationForm = {
          aliasName: this.sysInstInfo.aliasName,
          instName: this.sysInstInfo.instName,
          adminPhone: this.sysInstInfo.adminPhone
        }
      },

      onRefresh() {
        this.DestroyIncomeStatistics = false;
        this.instPreservationForm = {
          aliasName: '',
          instName: '',
          adminPhone: ''
        };
        this.$nextTick(() => {
          this.DestroyIncomeStatistics = true
        })
      },

      handleConfirm(userAddForm) {
        this.$refs[userAddForm].validate((valid) => {
          if (valid) {
            if (this.titleStatus === 0) {
              this.instPreservation()
            } else {
              if (this.instPreservationForm.aliasName === this.sysInstInfo.aliasName && this.instPreservationForm.instName === this.sysInstInfo.instName) {
                this.dialogVisible = false
              } else {
                this.instModification()
              }
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },


      instPreservation() {
        let urlParams = {}
        let send = {}
        urlParams.url = cfg.service.instPreservation.url + '/' + cfg.service.instPreservation.action
        urlParams.txnId = cfg.service.instPreservation.txnId
        send.aliasName = this.instPreservationForm.aliasName
        send.instName = this.instPreservationForm.instName
        send.instLevel = parseInt(this.instLevel) + 1
        send.adminPhone = this.instPreservationForm.adminPhone
        urlParams.send = send
        let singArray = {
          instLevel: send.instLevel,
          adminPhone: send.adminPhone
        }
        urlParams.singArray = singArray
        let that = this
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
        let urlParams = {}
        let send = {}
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

      createTap(instInfo){
        console.log('createTap instInfo', instInfo);//debug
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

</style>
