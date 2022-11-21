<style lang="less" scoped>
.tab-layout{
  width: 100%;
  height: 100%;
  .sider-view{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  }
  .header-view{
    position: fixed;
    top: 0;
    right: 0;
    transition: left 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  }
  .tab-layout-router-area{
    width: 100%;
    height: 100%;
    transition: padding 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
    .tab-layout-router{
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }
}
</style>

<template>
  <div class="tab-layout">
    <template v-if="dependLoad == 'loaded'">
      <SiderView v-show="page.type != 'pure'" :style="siderStyle" :page="page" />
      <HeaderView v-show="page.type != 'pure'" :style="headerStyle" :page="page" />
    </template>
    <div class="tab-layout-router-area" :style="pageStyle">
      <div class="tab-layout-router">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import SiderView from "./components/SiderView"
import HeaderView from "./components/HeaderView"
import depend from '@/main/data/depend'

export default {
  name: 'TabLayout',
  components: {
    SiderView: SiderView,
    HeaderView: HeaderView
  },
  data() {
    return {
      page: this._func.page,
      depend: depend
    }
  },
  computed: {
    dependLoad() {
      return this.depend.getStatus('load').value
    },
    siderStyle() {
      return {
        width: this.page.mod.sider.width + 'px'
      }
    },
    headerStyle() {
      return {
        left: this.page.mod.sider.width + 'px',
        height: this.page.mod.header.height + 'px'
      }
    },
    pageStyle() {
      let pageStyle
      if (this.page.type == 'default' && this.dependLoad == 'loaded') {
        pageStyle = {
          paddingLeft: this.page.data.extra.width + 'px',
          paddingTop: this.page.data.extra.height + 'px'
        }
      } else {
        pageStyle = {
          paddingLeft: 0 + 'px',
          paddingTop: 0 + 'px'
        }
      }
      return {
        ...pageStyle,
        ...this.page.style.current
      }
    }
  }
}
</script>
