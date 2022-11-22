import Vue from 'vue'

import '@/config/components'
const _currentviews = require.context('./current', false, /\.vue$/)

function LoadViews (contents, mod = '') {
  let list = contents.keys()
  list.forEach(item => {
    let viewitem = contents(item)
    let viewdata = viewitem.default || viewitem
    Vue.component(`Local${mod}${viewdata.name}`, viewdata)
  })
}

LoadViews(_currentviews, 'Current')
