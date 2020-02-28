<template>
  <div class="container">
    <div class="handle-box">
      <el-button type="success" icon="el-icon-plus" @click="onAddNewTap">新增同级分类</el-button>
    </div>

    <ul class="levels">
      <li v-for="item in levels" :key="item.id">
        <button @click="goToLevel(item)">{{item.label}}</button>
        <span>&nbsp;>>&nbsp;&nbsp;</span>
      </li>
    </ul>
    <el-table :data="tableData" border stripe>
      <el-table-column label="名称" prop="categoryName"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="props">
          <span :class="getStatusClass(props.row.status)">{{getStatus(props.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button type="warning" @click="modifyTap(props.row)">修改</el-button>
          <el-button type="danger" @click="deleteTap(props.row)">删除</el-button>
          <el-button v-if="props.row.isLeaf==='N'" type="primary" @click="getChildren(props.row)">子类 &nbsp;&gt;&gt;&nbsp;</el-button>
          <el-button type="success" v-if="props.row.isLeaf==='Y'" @click="addChild(props.row)">新增子类</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <el-form :model="dialogForm" label-width="80px" ref="dialogForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="名称" prop="categoryName" :rules="[{required:true, message:'请输入分类名称', trigger: 'blur'}]">
              <el-input v-model="dialogForm.categoryName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="this.flag===3">
          <el-col :sapn="24">
            <el-form-item label="状态">
              <el-select v-model="dialogForm.status" placeholder="请选择状态" style="width: 100%;">
                <el-option v-for="item in allStatus" :key="item.id" :label="item.value" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog_footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="dialogFormConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    addGooCategory,
    deleteGooCategoryById,
    listGooCategorysByPid,
    updateGooCategoryById
  } from "../../../util/module";

  export default {
    name: "categoryAction",
    data() {
      return {
        levels: [
          {
            level: 0,
            label: '基础分类',
            categoryId: 'root',
          },
        ],
        tableData: [],
        searchForm: {
          categoryId: null,
          categoryLevel: 1,
        },
        flag: 1,
        dialogVisible: false,
        dialogForm: {
          categoryName: null,
          status: '1'
        },
        allStatus: [
          {id: '1', value: '正常'},
          {id: '2', value: '注销'},
          {id: '3', value: '停用'}
        ]
      };
    },

    computed: {
      dialogTitle() {
        if (this.flag === 1) {
          return '新增同级分类';
        } else if (this.flag === 2) {
          return '新增子类';
        } else {
          return '修改分类';
        }
      }
    },

    created() {
      this.initData();
    },

    methods: {
      initData() {
        this.goodsList();
      },

      goodsList() {
        let params = {};
        if (this.searchForm.categoryId !== 'root') {
          params.categoryId = this.searchForm.categoryId;
        } else {
          params.categoryLevel = this.searchForm.categoryLevel;
        }
        listGooCategorysByPid(this, params).then(
          res => {
            this.tableData = res.data;
          },
          res => {
            if (res.returnMsg) {
              this.$message(res.returnMsg);
            }
          }
        ).catch();
      },

      getStatus(status) {
        let str = '';
        switch (status) {
          case '1':
            str = '正常';
            break;
          case '2':
            str = '注销';
            break;
          case '3':
            str = '停用';
            break;
          default:
            str = '未知';
        }
        return str;
      },

      getStatusClass(status) {
        let str = '';
        switch (status) {
          case '1':
            str = 'green';
            break;
          case '2':
            str = 'red';
            break;
          case '3':
            str = 'red';
            break;
          default:
            str = '未知';
        }
        return str;
      },

      modifyTap(item) {
        this.flag = 3;
        this.dialogForm.categoryId = item.categoryId;
        this.dialogForm.version = item.version;
        this.dialogForm.sortOrder = item.sortOrder;
        this.dialogForm.status = item.status;
        this.dialogForm.categoryName = item.categoryName;
        this.dialogVisible = true;
      },

      deleteTap(item) {
        this.$confirm('此操作将删除分类，是否确认?', '删除分类', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(
          () => {
            this.deleteCategory(item);
          }
        );
      },

      deleteCategory(item) {
        let params = {};
        params.categoryId = item.categoryId;
        deleteGooCategoryById(this, params).then(
          res => {
            this.$message.success('删除成功');
            this.initData();
          },

          res => {
            if (res.returnMsg) {
              this.$message.error(res.returnMsg);
            } else {
              this.$message.error('删除失败');
            }
          }
        ).catch();
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
        console.log('flag', this.flag);//debug
        let params = {};
        //新增同级分类
        //新增子类
        if (this.flag === 1 || this.flag === 2) {
          params.categoryLevel = this.dialogForm.categoryLevel;
          params.parentCategory = this.dialogForm.parentCategory;
          params.categoryName = this.dialogForm.categoryName;
          addGooCategory(this, params).then(
            res => {
              this.$message.success('修改成功');
              this.dialogVisible = false;
              this.initData();
            },
            res => {
              if (res.returnMsg) {
                this.$message.error(res.returnMsg);
              }
            }
          ).catch();
        }

        //修改
        if (this.flag === 3) {
          params.categoryId = this.dialogForm.categoryId;
          params.version = this.dialogForm.version;
          params.categoryName = this.dialogForm.categoryName;
          params.sortOrder = this.dialogForm.sortOrder;
          params.status = this.dialogForm.status;
          updateGooCategoryById(this, params).then(
            res => {
              this.$message.success('新增成功');
              this.dialogVisible = false;
              this.initData();
            },
            res => {
              if (res.returnMsg) {
                this.$message.error(res.returnMsg);
              }
            }
          ).catch();
        }
      },

      onAddNewTap() {
        this.flag = 1;
        this.dialogForm.categoryName = '';
        this.dialogForm.categoryLevel = this.levels.length;
        this.dialogForm.parentCategory = this.levels[this.levels.length - 1].categoryId;
        this.dialogForm.sortOrder = this.nextOrder();
        this.dialogVisible = true;
      },

      addChild(item) {
        this.flag = 2;
        this.dialogForm.categoryName = '';
        this.dialogForm.categoryLevel = parseInt(item.categoryLevel) + 1 + '';
        this.dialogForm.parentCategory = item.categoryId;
        this.dialogVisible = true;
      },

      //获取当前tableData中最大sortOrder的下一个
      nextOrder() {
        if (this.tableData.length === 0) {
          return '1';
        }
        let sortOrder = '0';
        this.tableData.forEach(item => {
          if (sortOrder < item.sortOrder) {
            sortOrder = item.sortOrder;
          }
        });
        return parseInt(sortOrder) + 1 + '';
      },

      getChildren(child) {
        console.log('child', child);//debug
        let item = {};
        item.level = this.levels.length;
        item.label = child.categoryName;
        item.categoryId = child.categoryId;
        this.levels.push(item);
        this.searchForm.categoryId = child.categoryId;
        this.initData();
      },

      goToLevel(item) {
        if (item.level === 0) {
          this.searchForm.categoryLevel = 1;
          this.searchForm.categoryId = null;
        } else {
          this.searchForm.categoryId = item.categoryId;
        }
        this.levels.splice(item.level + 1, this.levels.length - item.level - 1);
        this.initData();
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

  .levels {
    margin-top: 5px;
    margin-bottom: 10px;
    list-style-type: none;
  }

  .levels li {
    display: inline-block;
    margin-bottom: 2px;
  }

  .levels li button:hover {
    color: red;
  }

  .green {
    color: green;
  }

  .red {
    color: red;
  }
</style>
