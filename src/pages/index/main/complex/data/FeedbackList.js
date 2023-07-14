import _func from 'complex-func'
import { ListData, } from 'complex-data'
import api from '@api/index'
import PicView from '@/config/components/mod/PicView.vue'

const defaultInitOption = {
  name: '意见反馈',
  prop: 'feedbackList',
  dictionary: {
    layout: {
      default: {
        label: 6,
        content: 18
      }
    },
    id: {
      prop: 'resourceniche_id',
      data: ''
    },
    list: [
      {
        prop: 'resourceniche_id',
        name: 'ID',
        originprop: 'resourceniche_id',
        originfrom: 'list',
        mod: {}
      },
      {
        prop: 'nickname',
        name: '名称',
        originprop: 'nickname',
        originfrom: 'list',
        mod: {
          list: {
            width: 100
          }
        }
      },
      {
        prop: 'avatar',
        name: '头像',
        originprop: 'avatar',
        originfrom: 'list',
        mod: {
          list: {
            customRender(text, record, index) {
              return _func.$EventBus.$createElement(PicView, {
                props: {
                  list: [text],
                  itemStyle: {
                    width: '50px',
                    margin: '0 auto'
                  }
                }
              })
            }
          }
        }
      },
      {
        prop: 'opinion_desc',
        name: '意见反馈',
        originprop: 'opinion_desc',
        originfrom: 'list',
        mod: {
          list: {
            width: 240
          }
        }
      },
    ]
  },
  search: {
    menu: {
      list: []
    },
    dictionary: {
      list: []
    }
  },
  extradata: {},
  pagination: true
}

class FeedbackList extends ListData {
  constructor(option = {}) {
    let initOption = _func.setDataByDefault(option.init, defaultInitOption)
    if (option.format) {
      option.format(initOption)
    }
    super(initOption)
  }
  getData () {
    return new Promise((resolve, reject) => {
      let postdata = this.getSearch()
      const pageData = this.getPageData()
      postdata.pageNumber = pageData.page
      postdata.pageSize = pageData.size
      postdata.status = 'showOpinion'
      api.adminApi(postdata).then(res => {
        this.formatData(res.data.data.list, res.data.data.total)
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }
}

FeedbackList.$name = 'FeedbackList'

export default FeedbackList
