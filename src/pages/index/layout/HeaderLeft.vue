<style lang="less" scoped>
@import '~@index/style/option.less';

.header-left{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  .header-left-item{
    line-height: @LayoutHeaderHeight;
    p{
      margin: 0;
      line-height: @LayoutHeaderHeight;
      font-size: inherit;
    }
    &.header-left-item-title{
      margin-left: 16px;
      font-size: 18px;
    }
  }
}
</style>

<template>
  <div class="header-left">
    <div class="header-left-item header-left-item-title">
      <p></p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HeaderLeft',
  data() {
    return {}
  }
}
</script>
