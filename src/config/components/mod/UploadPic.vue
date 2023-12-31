<style lang="less" scoped>
.complex-upload-pic{
  *{
    box-sizing: border-box;
  }
  width: 100%;
  .complex-upload-pic-data-area{
    border-radius: 1px;
    line-height: 28px;
    height: 28px;
    padding: 3px 5px 3px 5px;
    .complex-upload-pic-icon{
      visibility: hidden;
    }
    &:hover{
      background-color: #eee;
      .complex-upload-pic-icon{
        visibility: visible;
      }
    }
  }
  &.complex-upload-pic-bottom{
    display: inline-block;
    .complex-upload-pic-menu{
      display: block;
    }
    .complex-upload-pic-data{
      width: 100%;
      margin-top: 10px;
      display: block;
      .complex-upload-pic-data-area{
        display: block;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        >span{
          flex: auto;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        >.complex-upload-pic-icon{
          margin-left: 10px;
          flex: none;
        }
      }
    }
  }
  &.complex-upload-pic-end, &.complex-upload-pic-start{
    .complex-upload-pic-menu{
      display: inline;
    }
    .complex-upload-pic-icon{
      margin-left: 10px;
    }
  }
  &.complex-upload-pic-end{
    .complex-upload-pic-data{
      .complex-upload-pic-data-area{
        margin-left: 10px;
      }
    }
  }
  &.complex-upload-pic-disabled{
    cursor: not-allowed;
    .complex-upload-pic-data-area{
      &:hover{
        .complex-upload-pic-icon{
          visibility: hidden;
        }
      }
    }
  }
}
</style>
<template>
  <span class="complex-upload-pic" :class="currentLayoutClassName">
    <ComplexModInputFile
      style="display: none"
      ref="inputfile"
      :accept="accept"
      :multiple="multiple"
      :multipleAppend="multipleAppend"
      :maxNum="maxNum"
      :minNum="minNum"
      :maxSize="maxSize"
      @change="onChange"
    />
    <span class="complex-upload-pic-menu" @click="onOpen">
      <slot>
        <a-button class="complex-upload-pic-button" :loading="loading" :disabled="disabled" icon="upload" >{{ placeholder }}</a-button>
      </slot>
    </span>
    <span class="complex-upload-pic-data" v-show="hasData">
      <PicView :list="file.data ? [file.data] : []" :itemStyle="{ width: '80px' }" :imgStyle="{ height: 'auto' }" :remove="true" @remove="onRemove" />
    </span>
  </span>
</template>

<script>
import _func from 'complex-func'
import PicView from './PicView.vue'

export default {
  name: 'UploadPic',
  components: {
    PicView
  },
  data () {
    return {
      file: {
        data: this.multiple ? [] : undefined,
        name: '',
        url: '',
        list: []
      },
      loading: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function(data) {
        this.setData(data, 'value')
      }
    }
  },
  computed: {
    currentLayoutClassName() {
      let className = 'complex-upload-pic-' + this.layout
      if (this.disabled) {
        className = className + ' complex-upload-pic-disabled'
      }
      return className
    },
    hasData() {
      let hasData = false
      if (!this.multiple) {
        if (this.file.name) {
          hasData = true
        }
      } else if (this.file.list.length > 0) {
        hasData = true
      }
      return hasData
    }
  },
  props: {
    value: {
      type: [String, Number, File, Object, Array]
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    accept: {
      type: String,
      required: false,
      default: ''
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    multipleAppend: {
      type: Boolean,
      required: false,
      default: false
    },
    maxNum: {
      type: [Number],
      required: false,
      default: 0
    },
    minNum: {
      type: [Number],
      required: false,
      default: 0
    },
    maxSize: { // MB
      type: Number,
      required: false,
      default: 0
    },
    upload: {
      type: Boolean,
      required: false,
      default: false
    },
    fileUpload: { // MB
      type: [Function, Boolean],
      required: false,
      default: false
    },
    layout: {
      type: String,
      required: false,
      default: 'bottom'
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    // 传递数据
    emitData() {
      let data = this.file.data
      this.$emit('input', data)
      this.$emit('change', data)
    },
    // open文件选框
    onOpen() {
      if (!this.disabled) {
        this.$refs['inputfile'].$el.click()
      }
    },
    // 删除
    onDelete(index, item) {
      if (!this.disabled) {
        if (!this.multiple) {
          this.clearData()
          this.emitData()
        } else {
          this.file.data.splice(index, 1)
          this.file.list.splice(index, 1)
          this.emitData()
        }
      }
    },
    onRemove(index) {
      this.onDelete(index)
    },
    // loading
    onLoading(data) {
      this.loading = data
      this.$emit('loading', this.loading)
    },
    // 文件变更
    onChange(file) {
      if (!this.upload) {
        this.setData(file, 'origin')
      } else {
        if (this.fileUpload) {
          this.onLoading(true)
          this.fileUpload({ file }).then(res => {
            this.onLoading(false)
            this.setData(res, 'upload')
          }, err => {
            console.error(err)
            this.onLoading(false)
            this.clearData()
            this.emitData()
          })
        } else {
          _func.showmsg('未定义上传文件函数，请检查代码!', 'error')
        }
      }
    },
    // 设置当前数据
    setData(data, from, unemit) {
      if (!this.multiple) {
        // 单文件模式
        if (this.file.data === data) {
          // 当前数据与传递数据一致
          if (from == 'value') {
            unemit = true
          }
        } else if (data) {
          // 数据不一致切存在值时进行赋值操作
          this.buildFileData(this.file, data)
        } else {
          // 数据不一致，传值为空时进行clear操作
          // 理论上存在一个值=>非und与当前值为und时会出发到此处，进行上传操作避免问题
          this.clearData()
        }
      } else {
        // 多选模式
        let isEmpty = false
        let isArray = _func.isArray(data)
        // 传值为空或者为空数组时判断为空数据
        if (!data) {
          isEmpty = true
        } else if (isArray && data.length == 0) {
          isEmpty = true
        }
        if (isEmpty || !isArray) {
          // 当前数据为空数据或者不为数组数据时
          this.clearData(data)
          // if (from == 'value' && isArray) {
          //   // 空数组情况下
          //   // 可能出现外部原因修改值为空数组的情况时不触发change事件导致的rule失效，此问题根据具体项目要求制定
          //   unemit = true
          // }
        } else if (this.file.data === data) {
          // 当前数据与传递数据一致
          if (from == 'value') {
            unemit = true
          }
        } else {
          if (!this.checkFileList(data, from)) {
            // 传入列表和当前列表不相对一致
            if (this.maxNum && this.file.list.length + data.length > this.maxNum) {
              data.length = this.maxNum - this.file.list.length
              _func.showmsg(`文件数量限制${this.maxNum}!`, 'error')
            }
            // 添加不同新数据
            for (let n = 0; n < data.length; n++) {
              let oitem = data[n]
              this.file.list.push(oitem)
              this.file.data.push(oitem.data)
            }
          } else {
            // 此处说明传入列表的data与当前列表的data一致
            if (from == 'value') {
              unemit = true
            }
          }
        }
      }
      if (!unemit) {
        this.emitData()
      }
    },
    // 创建文件对象
    buildFileData(targetdata, origindata, type) {
      if (!type) {
        type = _func.getType(origindata, true)
      }
      if (type == 'file') {
        targetdata.name = origindata.name
        targetdata.data = origindata
        targetdata.url = ''
      } else if (type == 'object') {
        targetdata.data = origindata.data
        targetdata.name = origindata.name
        targetdata.url = origindata.url
      } else {
        targetdata.data = origindata
        targetdata.name = origindata
        targetdata.url = ''
      }
    },
    // 创建文件列表
    buildFileList(data, from) {
      // 考虑进行数据的额外判断减少依赖
      for (let n = 0; n < data.length; n++) {
        // 对传入的数组数据进行数据的格式化
        let oitem = data[n]
        let oitemType = _func.getType(oitem, true)
        if (oitemType != 'object') {
          let item = {}
          this.buildFileData(item, oitem, oitemType)
          data.splice(n, 1, item)
        }
      }
    },
    // 清楚数据
    clearData(data) {
      this.file.name = ''
      this.file.url = ''
      if (!this.multiple) {
        if (this.file.data !== undefined) {
          this.file.data = undefined
        }
      } else {
        data = data || []
        this.file.data = data
      }
      this.file.list = []
    },
    // 检查文件列表
    checkFileList(data, from) {
      // 此处不论是data还是fileList都应该是数组数据不需要进行额外检查
      this.buildFileList(data, from)
      for (let n = 0; n < this.file.list.length; n++) {
        let targetitem = this.file.list[n]
        for (let i = 0; i < data.length; i++) {
          let originitem = data[i]
          // 删除相同子数据
          if (targetitem.data == originitem.data) {
            data.splice(i, 1)
            i--
            break
          }
        }
      }
      if (data.length == 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
