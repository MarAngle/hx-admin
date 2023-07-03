
export default {
  itemApi: {
    name: '产品接口',
    url: '/tb_api/api/TradeItem.php',
    urlConfig: {
      pre: '',
      type: ''
    },
    method: 'post',
    data: ['data']
  },
  itemChange: {
    name: '产品修改',
    url: 'itemChange',
    urlConfig: {
      pre: '',
      type: ''
    },
    method: 'post',
    data: ['data']
  },
}