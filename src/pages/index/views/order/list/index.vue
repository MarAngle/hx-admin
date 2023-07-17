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
        :editOption="{ usePageList: true }"
        @item="onItem"
      />
    </div>
    <ComplexModAutoModal
      :menuType="'default'"
      :optionProps="{
        width: 520,
        okText: '关闭'
      }"
      ref="info"
    >
      <InfoView
        slot-scope="slotScope"
        :maindata="maindata"
        :maxHeight="slotScope.height"
        ref="infoView"
      />
    </ComplexModAutoModal>
  </div>
</template>

<script>
import maindata from './maindata';
import InfoView from './mod/InfoView';

export default {
  name: "ItemList",
  components: {
    InfoView: InfoView
  },
  data: function() {
    return {
      maindata: maindata,
      itemOption: {
        list: [
          {
            type: 'menu',
            name: '查看',
            act: 'info-emit'
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
      if (act == 'info-emit') {
        this.maindata.triggerMethodByOperate('getInfo', record).then(() => {
          this.$refs.info.show('订单详情')
          this.$nextTick(() => {
            this.$refs.infoView.show(record)
          })
        }).catch(err => {
          console.error(err)
        })
      }
    }
  }
};
</script>