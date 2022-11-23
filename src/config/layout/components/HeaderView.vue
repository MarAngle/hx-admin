<style lang="less" scoped>
@height: 60px;
.header-view{
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  padding: 0 16px;
}
</style>

<template>
  <div class="header-view local-flex-line-main">
    <div class="header-view-area local-flex-line-item">
      <slot name="left" />
    </div>
    <div class="header-view-area local-flex-line-item">
      <slot name="right" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'HeaderView',
  data() {
    return {}
  }
}
</script>
