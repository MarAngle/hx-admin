import _func from 'complex-func'

let localData = [
  {
    name: '飞碟虫洞',
    prop: 'carOwner',
    shortName: '飞碟虫洞',
    logo: {
      src: require('./logo/carOwner.png'),
      style: {}
    },
    updateTime: '2021-09-10',
    describe: `飞碟虫洞，探索更多，不止于车，数字未来飞碟汽车与您同行。智能导航为您比选路线，在油耗与高速费用间选择成本最优路线，为您的收益保驾护航；搭载智慧车联网360°透视爱车车况，让您随时随地轻松了解爱车状况；全时检测运输路上的每一步，定期提醒您进站保养，还可预约维保，3年/20万公里整车质保线上线下双重保障；监测车辆运行状态坐每一位飞碟车主驾驶习惯，不断优化并未车主提供针对您个人健康特点的健康呵护，为关心您的家人尽一份心意。黑科技护航，零距离服务更贴心；“人、车、货”多维互通，网络纽带陪伴您运输路上的分分秒秒，数字空间联通您的梦想和未来。`,
    list: {
      style: {
        width: _func.$pxToVw(120, true)
      },
      data: [
        {
          src: require('./list/carOwner-01.jpg')
        },
        {
          src: require('./list/carOwner-02.jpg')
        },
        {
          src: require('./list/carOwner-03.png')
        },
        {
          src: require('./list/carOwner-04.jpg')
        }
      ]
    },
    type: {
      data: ['ios', 'android'],
      ios: {
        src: 'https://apps.apple.com/cn/app/%E9%A3%9E%E7%A2%9F%E8%99%AB%E6%B4%9E/id1531257360'
      },
      android: {
        type: 1,
        id: 1
      }
    }
  },
  {
    name: '五征智选',
    prop: 'tianwen',
    shortName: '五征智选',
    logo: {
      src: require('./logo/tianwen.png'),
      style: {}
    },
    updateTime: '2022-02-06',
    describe: `五征智选是五征集团贯彻“客户第一”理念，为用户量身打造的一款集产品介绍、车型对比、预约试驾，VR展厅、推荐购车赚佣金等多功能于一体的微信小程序。`,
    list: {
      style: {
        width: _func.$pxToVw(120, true)
      },
      data: [
        {
          src: require('./list/tianwen-01.jpg')
        },
        {
          src: require('./list/tianwen-02.jpg')
        },
        {
          src: require('./list/tianwen-03.jpg')
        },
        {
          src: require('./list/tianwen-04.jpg')
        }
      ]
    },
    type: {
      data: ['wx'],
      wx: {
        src: require('./../../assets/code/tianwen.jpg')
      }
    }
  },
  {
    name: '五征云服',
    prop: 'yunfu',
    shortName: '五征云服',
    logo: {
      src: require('./logo/yunfu.png'),
      style: {}
    },
    updateTime: '2021-09-09',
    describe: `本应用是为五征车主和使用者提供的车辆（设备）的移动端服务，旨在售后服务中服务方信息的获取、售后服务诉求的传递、配件选择的的接口、质量反馈和工单评价的表达等，以满足车主对售后业务便捷操作和交互上的友好体验。主要功能有：车辆管理、个人资料、系统设置、使用说明书和保养书册、服务业务中的服务商查询、预约维保、系统公告、紧急救援、维修指导、配件商城、服务评价、质量反馈等功能模块，实现车主（使用者）与相关方业务全链路信息的可视化和信息传递高效化、方式多元化。`,
    list: {
      style: {
        width: _func.$pxToVw(120, true)
      },
      data: [
        {
          src: require('./list/yunfu-01.jpg')
        },
        {
          src: require('./list/yunfu-02.jpg')
        },
        {
          src: require('./list/yunfu-03.jpg')
        },
        {
          src: require('./list/yunfu-04.png')
        }
      ]
    },
    type: {
      data: ['wx'],
      wx: {
        src: require('./../../assets/code/yunfu.png')
      }
    }
  },
  {
    name: '五征智慧环卫',
    prop: 'sanitation',
    shortName: '智慧环卫',
    logo: {
      src: require('./logo/sanitation.png'),
      style: {}
    },
    updateTime: '2021-12-09',
    describe: `五征智慧环卫app是由山东五征集团有限公司专为环卫行业推出的一款环卫项目运营管理专业工具，具有车辆、人员、设施管理；车辆油耗监测、分析；车辆作业效率分析等功能，能有效解决“人员考勤、告警提醒、作业复盘、视频监控”等诸多问题，极大提升环卫作业效率和质量，降低环卫运营成本，为环卫产业数字化转型助力赋能。`,
    list: {
      style: {
        width: _func.$pxToVw(120, true)
      },
      data: [
        {
          src: require('./list/sanitation-01.jpg')
        },
        {
          src: require('./list/sanitation-02.jpg')
        },
        {
          src: require('./list/sanitation-03.jpg')
        },
        {
          src: require('./list/sanitation-04.jpg')
        }
      ]
    },
    type: {
      data: ['ios', 'android'],
      ios: {
        src: 'https://apps.apple.com/us/app/五征智慧环卫/id1594986617'
      },
      android: {
        type: 1,
        id: 15
      }
    }
  },
  {
    name: '五征助手',
    prop: 'assistant',
    shortName: '五征助手',
    logo: {
      src: require('./logo/assistant.png'),
      style: {}
    },
    updateTime: '2022-09-30',
    describe: `五征助手APP，是联接人、车、活的移动端智慧位置服务(LBS)平台，V1.0.0版本包括个人实时作业信息、团队管理以及消息中心系统设置功能，未来会集成客户服务、人员监管、服务产品与销售、以及用车养车等增值服务功能，满足客户的“人员监管、活找车、车找活”等方面的服务需求，追求客户极致体验，敏捷迭代持续完善。`,
    list: {
      style: {
        width: _func.$pxToVw(120, true)
      },
      data: [
        {
          src: require('./list/assistant-01.png')
        },
        {
          src: require('./list/assistant-02.png')
        },
        {
          src: require('./list/assistant-03.png')
        },
        {
          src: require('./list/assistant-04.png')
        }
      ]
    },
    type: {
      data: ['android'],
      android: {
        type: 1,
        id: 16
      }
    }
  },
]

export default localData
