import Vue from 'vue'
import vuex from 'vuex'
import getters from "./getters";
import {indexByCons} from "../Gw/GwArray";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        suppRefreshFlag: false,
        brandRefreshFlag: false,
        goodsRefreshFlag: false,
        loginFlag: false,
        unitArray: null,
        goodsTypeArray: null,
        goodsBrandArray: null,
        ruleFunction: {},
        permissions: [],
        sysInstInfo: {},
        myPreSells:[
            {specGoodsId :'685085338930257920', goodsId :'685085338930257920', mainPicture:'M_687687512793292800.jpg', goodsName:'物资8',  specNowPrice:23, sellNum:2},
            {specGoodsId :'685085716216291328', goodsId :'685085716216291328', mainPicture:'M_687687287592722432.jpg', goodsName:'物资7',  specNowPrice:23, sellNum:3},
        ],
    },
    mutations: {
        loginIn(state) {
            state.loginFlag = true;
        },
        loginOut(state) {
            state.loginFlag = false;
        },
        setRuleFunction(state, ruleFunction) {
            state.ruleFunction = ruleFunction;
        },
        setUnitArray(state, unitArray) {
            state.unitArray = unitArray;
        },
        setGoodsTypeArray(state, goodsTypeArray) {
            state.goodsTypeArray = goodsTypeArray;
        },
        setGoodsBrandArray(state, goodsBrandArray) {
            state.goodsBrandArray = goodsBrandArray;
        },
        suppRefreshT(state) {
            state.suppRefreshFlag = true;
        },
        suppRefreshF(state) {
            state.suppRefreshFlag = false;
        },
        brandRefreshT(state) {
            state.brandRefreshFlag = true;
        },
        brandRefreshF(state) {
            state.brandRefreshFlag = false;
        },
        goodsRefreshT(state) {
            state.goodsRefreshFlag = true;
        },
        goodsRefreshF(state) {
            state.goodsRefreshFlag = false;
        },

        setPermissions(state, permissions) {
            state.permissions = permissions;
        },

        setSysInstInfo(state, sysInstInfo) {
            console.log('啦啦啦啦啦啦啦'); //debug
            state.sysInstInfo = sysInstInfo;
        },

        myPreSellsDeleteOne(state, index){
            state.myPreSells.splice(index, 1);
        },

        myPreSellsDeleteSelect(state, selects){
            selects.forEach(item=>{
                console.log('item', item);//debug
                let index=indexByCons(state.myPreSells, item, 'specGoodsId');
                console.log('index', index);//debug
                state.myPreSells.splice(index, 1);
            });
        },
    },

    actions: {},
    getters
})
