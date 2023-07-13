
export default {
  itemApi: {
    name: '产品接口',
    url: '/tb_api/api/admin/admin_trade.php',
    urlConfig: {
      pre: '',
      type: ''
    },
    method: 'post',
    data: ['data']
  },
  itemImgUpload: {
    name: '产品图片上传接口',
    url: '/tb_api/api/admin/admin_trade.php',
    urlConfig: {
      pre: '',
      type: ''
    },
    method: 'postform',
    data: ['data']
  }
}