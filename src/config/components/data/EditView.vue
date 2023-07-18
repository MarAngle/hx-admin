<style scoped>

</style>
<template>
  <div class="wz-edit-view">
    <ComplexFormView
      :form="form"
      :mainlist="mainlist"
      :type="edit"
      :footMenu="menu"
      @event="onEvent"
      @eventEnd="onEventEnd"
    >
    </ComplexFormView>
  </div>
</template>

<script>

export default {
  name: `EditView`,
  data () {
    return {
      type: '',
      edit: '',
      triggerName: '',
      data: null,
      modlist: [],
      mainlist: [],
      form: {
        ref: null,
        data: {}
      },
      menu: []
    }
  },
  props: {
    maindata: {
      type: Object,
      required: true
    },
    usePageList: {
      type: Boolean,
      required: false
    },
    eventCb: {
      type: Function,
      required: false,
      default: function() {
        return () => {}
      }
    }
  },
  computed: {
    eventPayload() {
      return {
        target: this,
        type: this.type,
        edit: this.edit,
        originItem: this.data,
        form: this.form.data,
        formRef: this.form.ref,
        list: this.mainlist
      }
    }
  },
  methods: {
    onEvent(prop, name, ...args) {
      this.$emit('event', this.eventPayload, prop, name, ...args)
    },
    onEventEnd(prop, name, ...args) {
      this.$emit('eventEnd', this.eventPayload, prop, name, ...args)
    },
    show(type, edit, data, triggerName) {
      this.type = type
      this.edit = edit
      this.data = data
      this.triggerName = triggerName
      this.initData()
      this.$nextTick(() => {
        this.form.ref.clearValidate()
      })
    },
    initMainList() {
      this.modlist = this.maindata.getDictionaryModList(this.type)
      let mainlist = this.maindata.getDictionaryPageListByModList(this.type, this.modlist, {
        mod: this.edit,
        usePageList: this.usePageList
      })
      this.mainlist = mainlist
    },
    initData() {
      this.eventCb('init', this.eventPayload)
      this.initMainList()
      this.eventCb('mainlist', this.eventPayload)
      if (this.edit == 'change') {
        this.form.data = this.maindata.buildDictionaryFormData(this.modlist, this.type, this.data)
      } else if (this.edit == 'build') {
        this.form.data = this.maindata.buildDictionaryFormData(this.modlist, this.type)
      }
      if (this.usePageList) {
        this.mainlist.setData(this.form.data)
      }
      this.eventCb('inited', this.eventPayload)
    },
    handle(cb) {
      this.form.ref.validate(valid => {
        if (valid) {
          let postdata = this.maindata.getEditData(this.form.data, this.modlist, this.type)
          cb(this.maindata.triggerMethodByOperate(this.triggerName, { postdata: postdata, targetitem: this.data }))
        }
      })
    }
  }
}
</script>
