import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
let routeArray = require("./../config/routeArray.js");

export default new Router({
    routes:routeArray.routes
})
