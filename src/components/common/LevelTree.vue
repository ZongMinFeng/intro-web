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
            <svg-icon class="svgname" icon-class="terrace" v-if="node.data.instLevel === '1'"/>
            <svg-icon class="svgname" icon-class="group" v-if="node.data.instLevel === '2'"/>
            <svg-icon class="svgname" icon-class="sub-institutional" v-if="node.data.instLevel === '3'"/>
            <svg-icon class="svgname" icon-class="village" v-if="node.data.instLevel === '4'"/>
            <svg-icon class="svgname" icon-class="building" v-if="node.data.instLevel === '5'"/>
           {{ node.label }}
         </span>
         <span>
          <el-button
            type="text"
            icon="el-icon-refresh"
            @click.stop="() => append(node,data)">
            刷新
          </el-button>
      </span>
      </span>
    </el-tree>

    <div class="svg-view">
      <span style="margin-right: 10px;">图例备注：</span>
      <div v-if="instLevel ==='1'" class="svg-view-cont">
        <svg-icon class="svgname" icon-class="terrace"/>
        <span class="svg-view-span">物业平台</span>
      </div>

      <div v-if="instLevel ==='1'||instLevel ==='2'" class="svg-view-cont">
        <svg-icon class="svgname" icon-class="group"/>
        <span class="svg-view-span">物业集团</span>
      </div>

      <div v-if="instLevel !=='4'&&instLevel !=='5'" class="svg-view-cont">
        <svg-icon class="svgname" icon-class="sub-institutional"/>
        <span class="svg-view-span">物业子机构</span>
      </div>


      <div v-if="instLevel !=='5'" class="svg-view-cont">
        <svg-icon class="svgname" icon-class="village"/>
        <span class="svg-view-span">物业小区</span>
      </div>

      <div class="svg-view-cont">
        <svg-icon class="svgname" icon-class="building"/>
        <span class="svg-view-span">物业楼栋</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { role } from '../../util/roleFunction'
  import { Toast } from 'mint-ui'
  import bus from './bus'
  import { instGetAllById, instGetById } from './../../util/module'
  import {getAllInstById, getInstById} from "../../util/module";
  export default {
    name: 'LevelTree',
    data () {
      return {
        sysInstInfoAll: [],
        instLevel: 0,
        props: {
          label: 'instName',
          children: [],
          isLeaf: 'leaf',
        }
      }
    },
    created () {
      let sysInstInfo = JSON.parse(localStorage.getItem('sysInstInfo'));
      this.instLevel = sysInstInfo.instLevel;
      let sysInstInfoAll = [];
      let sysInstInList = {
        aliasName: sysInstInfo.aliasName,
        instId: sysInstInfo.instId,
        parentInstId: sysInstInfo.parentInstId,
        instName: sysInstInfo.instName,
        isLeaf: sysInstInfo.isLeaf,
        instLevel: sysInstInfo.instLevel,
        status: sysInstInfo.status
      };
      if (sysInstInfo.isLeaf === 'N') {
        sysInstInList.leaf = false
      } else {
        sysInstInList.leaf = true
      }
      sysInstInfoAll.push(sysInstInList);
      this.sysInstInfoAll = sysInstInfoAll;
    },
    methods: {

      append (node, data) {
        let instId = data.instId;
        getInstById(this, instId, Toast).then((res) => {
          console.log('res', res);
          let data = res.data;
          if (!data) {
            Toast({
              message: res.msg,
              duration: 2000
            });
            node.isLeaf = true;
            return
          }
          let InstInList = {
            instId: res.data.instId,
            parentInstId: res.data.parentInstId,
            instName: res.data.instName,
            isLeaf: res.data.isLeaf,
            instLevel: res.data.instLevel,
            status: res.data.status
          };
          if (res.data.isLeaf === 'N') {
            InstInList.leaf = false;
            node.isLeaf = false
          } else {
            InstInList.leaf = true;
            node.isLeaf = true
          }
          var theChildren = node.childNodes;
          theChildren.splice(0, theChildren.length);
          node.loaded = false;
          node.expanded = false;
          node.data = InstInList;
          this.$message.success('更新成功');
          let instId = localStorage.getItem('instId') || '';
          if(res.data.instId === instId){
            localStorage.setItem('sysInstInfo', JSON.stringify(res.data));
            bus.$emit('tellerToParentInst', '');
            bus.$emit('sysInstInfo', '');
          }
        }, (res) => {
          console.log('res', res);
        })
      },

      handleNodeClick (node, data) {
        this.$emit('click', node);
      },


      loadNode (node, resolve) {
        console.log('node', node);
        if (node.level === 0) {
          this.requestTree(resolve)
        }
        if (node.level >= 1) {
          this.instGetAllByIdFun(node.data.instId, resolve, node)
        }
      },

      requestTree (resolve) {
        let that = this;
        resolve(that.sysInstInfoAll)
      },

      instGetAllByIdFun (instId, resolve, node) {
        getAllInstById(this, instId, Toast).then((res) => {
            console.log('res', res);
            let data = res.data;
            if (!data) {
              Toast({
                message: res.msg,
                duration: 2000
              });
              resolve([]);
              return
            }
            res.data.forEach(item => {
              if (item.isLeaf === 'N') {
                item.leaf = false
              } else {
                item.leaf = true
              }
            });
            resolve(res.data)
          }, (res) => {
            node.loading = false
            console.log('res', res)
          }
        )
      }
    },
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
