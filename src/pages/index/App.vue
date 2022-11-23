<style lang="less">
@import '~@index/style/index.less';
</style>

<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <TabLayout :page="page" :depend="depend">
        <SiderView slot="sider" slot-scope="slotScope" v-show="page.type != 'pure'" :style="slotScope.countStyle" :type="type" :menu="menu" :page="page">
          <LogoView slot="logo" slot-scope="slotScope" :collapsed="slotScope.collapsed" :width="slotScope.width" :height="slotScope.height" />
        </SiderView>
        <HeaderView slot="header" slot-scope="slotScope" v-show="page.type != 'pure'" :style="slotScope.countStyle" :user="user" :page="page" />
        <router-view />
      </TabLayout>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import TabLayout from '@layout/TabLayout';
import SiderView from "@layout/components/SiderView"
import HeaderView from "@layout/components/HeaderView"
import LogoView from "@index/main/components/data/LogoView.vue"
import user from '@index/main/data/user';
import menu from '@index/main/data/menu';
import depend from '@index/main/data/depend';


export default {
  name: 'App',
  components: {
    TabLayout: TabLayout,
    SiderView: SiderView,
    HeaderView: HeaderView,
    LogoView: LogoView
  },
  data() {
    return {
      locale: zhCN,
      user: user,
      menu: menu,
      depend: depend,
      page: this._func.page
    }
  },
  methods: {}
}
</script>
