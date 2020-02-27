import Vue from 'vue'
import SvgIcon from '../components/SvgIcon'// svg组件

// register globally
Vue.component('svg-icon', SvgIcon);     // 将SvgIcon注册为全局组件，在别的组件中通过<svg-icon>标签使用SvgIcon组件

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
