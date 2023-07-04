<style lang="less" scoped>
@import '~@index/style/option.less';

.local-mod-pic-view{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .local-mod-pic-view-item{
    width: auto;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
    margin-right: 10px;
    &:last-child{
      margin-right: 0px;
    }
    .local-mod-pic-view-item-menu{
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      display: none;
      background-color: rgba(0, 0, 0, 0.6);
      height: 20px;
      width: 20px;
      line-height: 20px;
      text-align: center;
      .anticon{
        color: @LocalDangerColor;
      }
    }
    &:hover{
      .local-mod-pic-view-item-menu{
        display: block;
      }
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
    <div class="local-mod-pic-view-item" v-for="(val, index) in list" :key="index" :style="itemStyle" >
      <img :src="getPath(val)" :style="imgStyle" alt="" @click="setCurrent(val)">
      <div class="local-mod-pic-view-item-menu" v-if="remove" @click="onRemove(index)" >
        <a-icon type="close" ></a-icon>
      </div>
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
    complex: {
      required: false
    },
    remove: {
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
    getPath(val) {
      return this.complex ? typeof this.complex === 'string' ? val[this.complex] : this.complex(val) : val
    },
    setCurrent(val) {
      this.current = this.getPath(val)
      this.$refs.modal.show('图片查看')
    },
    onRemove(index) {
      this.$emit('remove', index, this.list)
    }
  }
}
</script>