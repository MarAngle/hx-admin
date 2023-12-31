<style lang='less' scoped>
.wz-complex-list-view{
  .wz-complex-list-view-header-menu{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    .wz-complex-list-view-header-menu-item{
      height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 19px;
      margin-right: 16px;
    }
  }
}
</style>
<template>
  <div class="wz-complex-list-view" >
    <div class="wz-complex-list-view-area">
      <a-spin :spinning="loadStatus == 'loading'">
        <ComplexModAutoMenu
          v-if="currentSearchOption.type"
          ref="autoMenu"
          :auto="{ menu: { style: { lineHeight: '40px' } } }"
          :height="pageMod.search.option.height"
          :defaultOpen="pageMod.search.option.open"
          @open="onSearchOpen"
        >
          <ComplexFormView
            v-if="currentSearchOption.type == 'form'"
            :form="maindata.getModule('search').form.build.form"
            :mainlist="maindata.getModule('search').form.build.mainlist"
            :layout="'inline'"
            :type="'build'"
            :footMenu="searchMenuList"
            @menu="onSearchMenu"
          >
          </ComplexFormView>
          <div v-else-if="currentSearchOption.type == 'list'">
            <div class="wz-complex-list-view-header-menu">
              <div class="wz-complex-list-view-header-menu-item">
                <a-button
                  v-for="val in currentSearchOption.list"
                  :key="val.act"
                  :type="val.type"
                  :icon="val.icon"
                  @click="onSearchMenu(val.act)"
                >{{ val.name }}</a-button>
              </div>
            </div>
          </div>
        </ComplexModAutoMenu>
        <ComplexTableView
          :maindata="maindata"
          :columnList="mainlist"
          :auto="tableAuto"
          :scrollOption="currentTableScrollOption"
          :tableOption="tableOption"
        >
          <div slot="menu" class="local-inline-menu-list" slot-scope="slotScope" >
            <slot name="menu" :slotScope="slotScope">
              <template v-for="(val) in currentItemOption.list" >
                <span class="local-inline-menu-item" v-if="formatItemShow(val, slotScope)" :key="val.act">
                  <a-dropdown
                    v-if="val.type == 'drop'"
                    :style="val.style"
                    :class="formatItemClass(val, slotScope)"
                  >
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                      {{ formatItemName(val, slotScope) }} <a-icon type="down" />
                    </a>
                    <a-menu slot="overlay">
                      <a-menu-item
                        v-for="(value) in val.list"
                        :key="value.act"
                        :style="value.style"
                        :class="formatItemClass(value, slotScope)"
                        @click="onItemMenu(slotScope, value.act)"
                      >
                        <a-icon v-if="value.icon" :type="value.icon" /> 
                        {{ formatItemName(value, slotScope) }}
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown>
                  <a
                    v-else
                    :style="val.style"
                    :class="formatItemClass(val, slotScope)"
                    @click="onItemMenu(slotScope, val.act)"
                  ><a-icon v-if="val.icon" :type="val.icon" /> {{ formatItemName(val, slotScope) }}</a>
                </span>
              </template>
            </slot>
          </div>
        </ComplexTableView>
      </a-spin>
    </div>
    <ComplexModAutoModal
      v-if="currentEditOption.type == 'local'"
      :optionProps="currentEditOption.optionProps"
      :auto="{
        ok: false
      }"
      :onEvent="onEditMenu"
      ref="edit"
    >
      <div slot-scope="slotScope">
        <slot name="edit" :slotScope="slotScope" ref="editView" />
      </div>
    </ComplexModAutoModal>
    <ComplexModAutoModal
      v-else
      :optionProps="currentEditOption.optionProps"
      :auto="{
        ok: false
      }"
      :onEvent="onEditMenu"
      ref="edit"
    >
      <EditView
        slot-scope="slotScope"
        :maindata="maindata"
        :maxHeight="slotScope.height"
        ref="editView"
        :eventCb="currentEditOption.eventCb"
        :usePageList="currentEditOption.usePageList"
        @event="onEditEvent"
        @eventEnd="onEditEventEnd"
      />
    </ComplexModAutoModal>
  </div>
</template>

<script>
import EditView from './EditView'

export default {
  name: `ListView`,
  components: {
    EditView
  },
  props: {
    maindata: {
      type: Object,
      required: true
    },
    actOption: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    },
    searchOption: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    },
    itemOption: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    },
    editOption: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    },
    tableAuto: {
      type: Object,
      required: false,
      default: function() {
        return undefined
      }
    },
    tableOption: {
      type: Object,
      required: false,
      default: function() {
        return undefined
      }
    },
    height: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      mainlist: [],
      pageMod: {
        search: {
          option: {
            open: true,
            height: 59
          },
          height: 0
        },
        table: {
          height: 0
        }
      }
    }
  },
  watch: {
    maindata: {
      immediate: true,
      handler: function() {
        this.pageLoad()
      }
    }
  },
  computed: {
    loadStatus () { // 数据加载判断值 'unload' 'loading' 'loaded'
      return this.maindata.getStatus('load').value
    },
    operateStatus () { // 操作判断值 operating operated
      return this.maindata.getStatus().value
    },
    choiceList() {
      return this.maindata.getChoiceData('list')
    },
    currentSearchOption() {
      let currentSearchOption = {
        ...this.searchOption
      }
      if (!currentSearchOption.list) {
        currentSearchOption.list = []
      }
      if (currentSearchOption.type === undefined) {
        if (this.maindata.getSearchInit()) {
          currentSearchOption.type = 'form'
        } else if (currentSearchOption.list.length > 0) {
          currentSearchOption.type = 'list'
        } else {
          currentSearchOption.type = ''
        }
      }
      return currentSearchOption
    },
    currentItemOption() {
      let currentItemOption = {
        ...this.itemOption
      }
      if (!currentItemOption.list) {
        currentItemOption.list = []
      }
      return currentItemOption
    },
    searchMenuList() {
      const list = this.maindata.getModule('search').menu.concat(this.currentSearchOption.list)
      let onlySearch = false
      if (this.maindata.getModule('search').form.build.mainlist.length === 0) {
        onlySearch = true
      }
      for (let i = 0; i < list.length; i++) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.$set(list[i], 'loading', this.operateStatus === 'operating')
        if (onlySearch && list[i].act === 'reset') {
          list.splice(i, 1)
          i--
        }
      }
      return list
    },
    currentEditOption() {
      const currentEditOption = {
        ...this.editOption
      }
      if (!currentEditOption.formatName) {
        currentEditOption.formatName = function(name) { return name }
      }
      if (!currentEditOption.optionProps) {
        currentEditOption.optionProps = {}
      }
      if (!currentEditOption.optionProps.width) {
        currentEditOption.optionProps.width = 520
      }
      if (!currentEditOption.optionProps.okText) {
        currentEditOption.optionProps.okText = '确认'
      }
      if (currentEditOption.optionProps.destroyOnClose === undefined) {
        currentEditOption.optionProps.destroyOnClose = true
      }
      if (currentEditOption.optionProps.maskClosable === undefined) {
        currentEditOption.optionProps.maskClosable = false
      }
      return currentEditOption
    },
    currentTableScrollOption() {
      let scrollOption = {
        recount: this._func.page.recount.data,
        width: {
          type: 'auto',
          layout: 'auto'
        }
      }
      if (this.pageMod.table.height) {
        scrollOption.height = {
          type: 'number',
          data: this.pageMod.table.height
        }
      }
      return scrollOption
    },
  },
  mounted () {
    this.countHeight()
  },
  methods: {
    countHeight() {
      if (this.height) {
        this.countSearchHeight()
        this.pageMod.table.height = this.height - this.pageMod.search.height
      } else {
        this.pageMod.table.height = 0
      }
    },
    countSearchHeight() {
      if (this.currentSearchOption.type) {
        if (this.pageMod.search.option.open) {
          this.pageMod.search.height = this.$refs['autoMenu'].$el.clientHeight
        } else {
          this.pageMod.search.height = this.pageMod.search.option.height
        }
      } else {
        this.pageMod.search.height = 0
      }
    },
    pageLoad () {
      this.buildMainList()
    },
    onSearchOpen(open) {
      this.pageMod.search.option.open = open
      this.$nextTick(() => {
        this.countHeight()
      })
    },
    onSearchMenu(act) {
      if (act.indexOf('emit') > -1) {
        this.$emit('search', act)
      } else if (act == 'search') {
        this.onDefaultMenuBySearch()
      } else if (act == 'reset') {
        this.onDefaultMenuByReset()
      } else if (act == 'build') {
        this.openEdit(this.currentEditOption.formatName('新增' + this.maindata.name, act), 'build', 'build', null, 'buildItem')
      } else if (act == 'change') {
        this.changeItem(this.currentEditOption.formatName('编辑' + this.maindata.name, act), this.choiceList[0])
      } else if (act == 'delete') {
        this._func.confirm(this.currentSearchOption.deleteMsg || '确认删除吗？', '警告', (act) => {
          if (act == 'ok') {
            this.maindata.triggerMethodByOperate('deleteItem', this.choiceList).then(() => {}, () => {})
          }
        })
      } else if (act == 'export') {
        this.maindata.triggerMethodByOperate('exportData').then(() => {}, () => {})
      } else if (act == 'import') {
        this.maindata.triggerMethodByOperate('importData').then(() => {}, () => {})
      }
      this.$emit('searchEnd', act)
    },
    changeItem(title, record) {
      if (!this.actOption.info) {
        this.openEdit(title, 'change', 'change', record, 'changeItem')
      } else {
        const methodName = this.actOption.info === true ? 'getInfo' : this.actOption.info
        this.maindata.triggerMethodByOperate(methodName, record).then(() => {
          this.openEdit(title, 'change', 'change', record, 'changeItem')
        }).catch(err => { console.error(err) })
      }
    },
    getEditView() {
      if (this.currentEditOption.type == 'local') {
        return this.$slots.edit[0].componentInstance
      } else {
        return this.$refs.editView
      }
    },
    openEdit(title, type, edit, data, triggerName) {
      this.$refs.edit.show(title)
      this.$nextTick(() => {
        this.getEditView().show(type, edit, data, triggerName)
      })
    },
    formatItemShow(item, { record, index }) {
      let show = true
      if (item.hidden !== undefined) {
        if (item.hidden === true) {
          show = false
        } else if (item.hidden !== false) {
          show = !item.hidden(record, index)
        }
      }
      return show
    },
    formatItemClass(item, { record, index }) {
      let classList = []
      if (item.getClassList) {
        classList = classList.concat(item.getClassList(record, index))
      }
      if (item.classList) {
        classList = classList.concat(item.classList)
      }
      return classList.join(' ')
    },
    formatItemName(item, { record, index }) {
      let name = item.name
      if (item.format) {
        name = item.format(name, record, index)
      }
      return name
    },
    onItemMenu({ record, index }, act) {
      if (act.indexOf('emit') > -1) {
        this.$emit('item', act, record, index)
      } else if (act == 'delete') {
        this._func.confirm(this.currentItemOption.deleteMsg || '确认删除吗？', '警告', (act) => {
          if (act == 'ok') {
            this.maindata.triggerMethodByOperate('deleteItem', record).then(() => {}, () => {})
          }
        })
      } else if (act == 'change') {
        this.changeItem(this.currentEditOption.formatName('编辑' + this.maindata.name, act), record)
      }
      this.$emit('itemEnd', act, record, index)
    },
    onDefaultMenuBySearch() {
      this.maindata.setSearch()
      this.maindata.reloadData({
        sync: true,
        page: true,
        choice: {
          from: 'search',
          act: 'set'
        }
      })
    },
    onDefaultMenuByReset() {
      this.maindata.resetSearch()
      this.maindata.reloadData({
        sync: true,
        page: true,
        choice: {
          from: 'search',
          act: 'reset'
        }
      })
    },
    buildMainList () {
      this.mainlist = this.maindata.getDictionaryPageList('list')
    },
    onEditEvent(...args) {
      this.$emit('editEvent', ...args)
    },
    onEditEventEnd(...args) {
      this.$emit('editEventEnd', ...args)
    },
    onEditMenu(act) {
      if (act == 'ok') {
        this.getEditView().handle((promise) => {
          if (promise) {
            promise.then(res => {
              this.$refs.edit.hide()
            }, err => {})
          }
        })
      }
    }
  }
}
</script>
