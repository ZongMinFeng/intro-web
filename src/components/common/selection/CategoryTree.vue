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
           {{ node.label }}
         </span>
         <span v-if="create!=null">
          <el-button
            type="text"
            icon="el-icon-circle-plus"
            @click.stop="() => createNew(node,data)">
            新增子分类
          </el-button>
         </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import {listGooCategorysByPid} from "../../../util/module";

  export default {
    name: 'categoryTree',
    props: ['create'],
    data() {
      return {
        sysInstInfoAll: [],
        instLevel: 0,
        props: {
          label: 'categoryName',
          children: [],
          isLeaf: 'isLeaf',
        },
        searchForm:{
          categoryId:'root',
          categoryLevel:1,
        },
      }
    },

    created() {

    },
    methods: {

      handleNodeClick(node, data) {
        this.$emit('node-click', node);
      },


      loadNode(node, resolve) {
        console.log('node', node);
        if (node.level === 0) {
          this.searchForm.categoryId='root';
        }
        if (node.level >= 1) {
          this.searchForm.categoryId=node.data.categoryId;
        }
        this.goodsList(resolve);
      },

      goodsList(resolve) {
        let params = {};
        if (this.searchForm.categoryId !== 'root') {
          params.categoryId = this.searchForm.categoryId;
        } else {
          params.categoryLevel = this.searchForm.categoryLevel;
        }
        listGooCategorysByPid(this, params).then(
          res => {
            if (res.data instanceof Array) {
              let length=res.data.length;
              for (let i = 0; i < length; i++) {
                res.data[i].isLeaf = res.data[i].isLeaf === 'Y';
              }
            }
            resolve(res.data);
          },
          res => {
          }
        ).catch();
      },

      createNew(node, data) {
        console.log('createNew data', data);//debug
        this.$emit('createTap', data);
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
</style>
