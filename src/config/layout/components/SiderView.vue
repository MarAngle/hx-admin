<style lang="less" scoped>
.sider-view{
  background-color: #001529;
  .sider-toggle{
    padding: 10px 0;
    text-align: center;
  }
}
</style>

<template>
  <div class="sider-view local-flex-full-area local-flex-full-area-column">
    <div class="sider-logo local-flex-full-item fixed">
      <LogoView :collapsed="collapsed" :width="page.mod.sider.width" :height="page.mod.header.height" />
    </div>
    <div class="local-flex-full-item auto">
      <SiderMenu
        mode="inline"
        theme="dark"
        :menu="menu.data.list"
        :selectedKeys="menu.data.menu"
        :collapsed="collapsed"
        @select="onSelect"
      ></SiderMenu>
    </div>
    <div class="sider-toggle local-flex-full-item fixed">
      <a-button type="primary" @click="changSiderType">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
    </div>  
  </div>
</template>

<script>
import LogoView from './LogoView';
import SiderMenu from './SiderMenu';

export default {
  name: 'SiderView',
  components: {
    LogoView: LogoView,
    SiderMenu: SiderMenu
  },
  props: ['menu', 'page'],
  data() {
    return {}
  },
  computed: {
    collapsed() {
      return this.page.mod.sider.type == 'mini'
    },
    currentMenu() {
      return this.formatMenu(this.menu.data.list)
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler(val) {
        this.menu.setCurrent([val.path])
      }
    }
  },
  methods: {
    formatMenu(menuList) {
      let list = []
      menuList.map(menuItem => {
        let item
        if (menuItem.meta.menu && !menuItem.meta.hidden) {
          item = {
            ...menuItem,
            children: undefined
          }
          if (menuItem.children && menuItem.children.length > 0) {
            item.children = this.formatMenu(menuItem.children)
          }
          list.push(item)
        }
      })
      return list
    },
    changSiderType() {
      let targetType = this.page.mod.sider.type == 'mini' ? 'default' : 'mini'
      this.page.triggerChange('sider', targetType)
    },
    onSelect({ key, item }) {
      if (key !== this.menu.data.menu) {
        this.$router.push(key)
      }
    }
  }
}
</script>
