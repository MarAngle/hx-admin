<style lang="less" scoped>

.local-mod-pic-view{
  display: flex;
  .local-mod-pic-view-item{
    width: auto;
    height: 100%;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
    margin-right: 10px;
    &:last-child{
      margin-right: 0px;
    }
  }
}
.local-mod-pic-view-modal{
  width: 100%;
  height: auto;
  img{
    width: 100%;
  }
}
</style>

<template>
  <div class="local-mod-pic-view">
    <div class="local-mod-pic-view-item" v-for="val in list" :key="val" :style="itemStyle" @click="setCurrent(val)" >
      <img :src="val" :style="imgStyle" alt="">
    </div>
    <ComplexModAutoModal
      :menuType="'default'"
      :optionProps="{
        width: 520,
        okText: '关闭'
      }"
      ref="modal"
    >
      <div class="local-mod-pic-view-modal">
        <img :src="current" alt="">
      </div>
    </ComplexModAutoModal>
  </div>
</template>

<script>
export default {
  name: 'PicView',
  props: {
    list: {
      required: true
    },
    delete: {
      required: false
    },
    itemStyle: {
      required: false
    },
    imgStyle: {
      required: false
    }
  },
  data() {
    return {
      current: undefined
    }
  },
  methods: {
    setCurrent(val) {
      this.current = val
      this.$refs.modal.show('图片查看')
    }
  }
}
</script>