import Vue from 'vue'

const contents = require.context('./data', false, /\.vue$/)

function LoadViews (contents) {
  let list = contents.keys()
  list.forEach(item => {
    let viewitem = contents(item)
    let viewdata = viewitem.default || viewitem
    Vue.component(`Local${viewdata.name}`, viewdata)
  })
}

LoadViews(contents)
