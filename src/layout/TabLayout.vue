<style lang="less" scoped>
.tab-layout{
  width: 100%;
  height: 100%;
  .sub-menu{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
  }
}
</style>

<template>
  <div class="tab-layout">
    <SiderMenu v-show="page.type != 'pure'" :page="page" />
    <HeaderTab v-show="page.type != 'pure'" :page="page" />
  </div>
</template>

<script>
import SiderMenu from "./SiderMenu"
import HeaderTab from "./HeaderTab"

export default {
  name: 'TabLayout',
  components: {
    SiderMenu: SiderMenu,
    HeaderTab: HeaderTab
  },
  data() {
    return {
      page: this._func.page
    }
  },
}
</script>
