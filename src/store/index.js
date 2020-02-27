import Vue from 'vue'
import vuex from 'vuex'
import getters from "./getters";

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

    setPermissions(state, permissions){
      state.permissions=permissions;
    },
  },

  actions: {},
  getters
})
