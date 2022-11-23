<style lang='less' scoped>
.system-user{
  padding: 20px 20px;
}
</style>

<template>
  <div class="local-default-list-page system-user">
    <div class="local-default-list-page-area">
      <LocalListView
        :maindata="maindata"
        :itemOption="itemOption"
        :editOption="{ usePageList: true }"
        @item="onItem"
      />
    </div>
  </div>
</template>

<script>
import maindata from './maindata';

export default {
  name: "SystemUser",
  data: function() {
    return {
      maindata: maindata,
      itemOption: {
        list: [
          {
            type: 'menu',
            name: '修改',
            act: 'change'
          },
          {
            type: 'menu',
            name: '删除',
            act: 'delete',
            classList: ['local-color-danger']
          }
        ]
      }
    }
  },
  mounted() {
    maindata.loadData()
  },
  methods: {
    onItem(act, record, index) {
      if (act == 'record-emit') {
        this._func.confirm('确认进行备案操作吗？', '警告', (act) => {
          if (act == 'ok') {
            this.maindata.triggerMethod('recordItem', record).then(() => {}, () => {})
          }
        })
      }
    }
  }
};
</script>