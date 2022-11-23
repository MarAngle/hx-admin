<style lang="less" scoped>
.logo-view{
  width: 100%;
  border-bottom: 1px rgba(255, 255, 255, 0.3) solid;
  cursor: pointer;
  h4{
    color: rgba(255, 255, 255, 0.85);
    text-align: center;
    line-height: inherit;
    font-size: 18px;
  }
}
</style>

<template>
  <div class="logo-view" :style="currentStyle">
    <h4>{{ collapsed ? setting.page.shortTitle : setting.page.title }}</h4>
  </div>
</template>

<script>
import setting from '@/pages/index/setting'

export default {
  name: 'LogoView',
  props: ['page', 'collapsed', 'width', 'height'],
  data() {
    return {
      setting: setting
    }
  },
  computed: {
    currentStyle() {
      let style = {
        height: this.height + 1 + 'px',
        lineHeight: this.height + 'px',
      }
      return style
    }
  }
}
</script>
