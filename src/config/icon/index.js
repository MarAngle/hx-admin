import Vue from 'vue'
import SvgIcon from './SvgIcon'// svg component

const requireContext = require.context('./data', false, /\.svg$/);

// register globally
Vue.component('svg-icon', SvgIcon)

export const init = function() {
  requireContext.keys().map(requireContext);
}
