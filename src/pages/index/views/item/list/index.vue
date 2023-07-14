<style lang='less' scoped>
.item-list{
  padding: 0 0;
}
</style>

<template>
  <div class="local-default-list-page item-list">
    <div class="local-default-list-page-area">
      <LocalListView
        :maindata="maindata"
        :itemOption="itemOption"
        :editOption="editOption"
        @item="onItem"
      />
    </div>
  </div>
</template>

<script>
import maindata from './maindata';

export default {
  name: "ItemList",
  data: function() {
    return {
      maindata: maindata,
      editOption: {
        usePageList: true,
        optionProps: {
          width: 840
        }
      },
      itemOption: {
        list: [
          {
            type: 'menu',
            name: '修改',
            act: 'change'
          },
          // {
          //   type: 'menu',
          //   name: '删除',
          //   act: 'delete',
          //   classList: ['local-color-danger']
          // }
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