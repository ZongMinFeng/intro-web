<template>
    <div>
        <el-card shadow="hover" class="mgb20 cont-top">
            <!--<div class="user-info">-->
                <!--&lt;!&ndash;<img src="static/img/img.png" class="user-avator" alt="">&ndash;&gt;-->
                <!--<div class="user-info-cont">-->
                    <!--&lt;!&ndash;<div class="user-info-name">{{name}}</div>&ndash;&gt;-->
                    <!--<div>{{role}}</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="user-info-list">欢迎登录：<span>物业后台管理</span></div>-->
          <div class="user-info-list">欢迎登录：<span>用户测试系统</span></div>

        </el-card>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import {sendServer} from './../../util/common';
    import cfg from '../../config/cfg';
    import moment from 'moment'

    export default {
        data() {
            return {
                name: localStorage.getItem('adminFlag')
            }
        },
        components: {

            // Schart
        },
        computed: {
            role() {
                return this.name === 'Admin' ? '管理员' : '普通用户';
            }
        },
        created() {
        },
        methods: {

        }
    }

</script>


<style scoped>
    .body-cont {
        /*width: 100%;*/
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        /*justify-content: space-around;*/
        justify-content: space-between;
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .cont-top {
        width: 100%;
        min-width: 350px;
    }

    .content-title {
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
        /*min-width: 400px;*/
        word-break:keep-all;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }

</style>
