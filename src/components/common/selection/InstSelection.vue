<template>
  <div class="tree-leve" style="width: 100%" id="box">
    <input :placeholder="placeholder" class="inputClass" :disabled="disabled" v-model="value.instName"
                                    @focus="onFocus"/>
    <el-card v-show="treeVisible" :body-style="{ padding: '0px' } " style="width: 100%;">
      <level-tree @click="clicked"></level-tree>
    </el-card>
  </div>
</template>

<script>
  import LevelTree from '@/components/common/LevelTree.vue'

  export default {
    name: 'InstSelection',
    components: {LevelTree},
    props: ['placeholder', 'value', 'disabled', 'nameIn'],
    data() {
      return {
        name: null,
        treeVisible: false,
      }
    },

    created() {
      this.name = this.nameIn;
      document.addEventListener('click', (e) => {
        if (!this.$el.contains(e.target)) this.treeVisible = false
      });
    },

    methods: {
      onFocus() {
        this.treeVisible = true;
      },

      clicked(nodeInfo) {
        this.name = nodeInfo.instName;
        this.treeVisible = false;

        this.$emit('click', nodeInfo);
        this.$emit('input', nodeInfo);
      },

    }
  }
</script>

<style scoped>
  .inputClass {
    background-color: #FFF;
    border: 1px solid #DCDFE6;
    width: 94%;
    border-radius: 4px;
    line-height: 32px;
    padding: 0 15px;
    font-size: inherit;
    display: inline-block;
  }

</style>
