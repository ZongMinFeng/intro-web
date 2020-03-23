<template>
    <div class="tree-leve" style="width: 100%" id="box">
        <div class="inputClass">
            <input :placeholder="placeholder" :disabled="disabled===''" v-model="nodeInfo.categoryName"
                   @focus="onFocus"/>
            <i v-if="nodeInfo.categoryName!=null&&nodeInfo.categoryName!==''" class="el-icon-circle-close inputClassDiv" @click="clearNodeInfo"></i>
        </div>
        <el-card v-show="treeVisible" :body-style="{ padding: '0px' } " style="width: 100%;">
            <category-tree @node-click="nodeClick"></category-tree>
        </el-card>
    </div>
</template>

<script>
    import CategoryTree from './CategoryTree';

    export default {
        name: "CategorySelection.vue",
        components: {
            CategoryTree
        },

        props: ['disabled', 'placeholder'],

        data() {
            return {
                nodeInfo: {
                    categoryId: null,
                    categoryName: null,
                },
                treeVisible: false,
            };
        },

        created() {
            document.addEventListener('click', (e) => {
                if (!this.$el.contains(e.target)) this.treeVisible = false
            });
        },

        methods: {
            onFocus() {
                this.treeVisible = true;
            },

            clearNodeInfo(){
                this.nodeInfo.categoryId='';
                this.nodeInfo.categoryName='';
                this.$emit('click', this.nodeInfo);
            },

            nodeClick(nodeInfo) {
                this.nodeInfo.categoryName = nodeInfo.categoryName;
                this.nodeInfo.categoryId = nodeInfo.categoryId;
                this.treeVisible = false;
                this.$emit('click', nodeInfo);
            },
        }
    }
</script>

<style scoped>
    .inputClass {
        background-color: #FFF;
        border: 1px solid #DCDFE6;
        width: 100%;
        border-radius: 4px;
        font-size: inherit;
        line-height: 32px;
        padding-right: 15px;
    }

    .inputClass input {
        width: 94%;
        border: none;
        line-height: 32px;
        outline: none;
        padding-left: 10px;
    }

    .inputClassDiv {
        color: transparent;
    }

    .inputClass:hover .inputClassDiv{
        color: rgb(209,221,235);
    }

    .inputClass:hover .inputClassDiv:hover{
        color: rgb(161,160,194);
    }
</style>
