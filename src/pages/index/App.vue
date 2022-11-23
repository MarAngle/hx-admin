<style lang="less">
@import '~@index/style/index.less';
</style>

<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <TabLayout :type="'index'" :user="user" :menu="menu" :depend="depend">
        <router-view />
      </TabLayout>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { TabLayout } from '@layout';
import user from '@index/main/data/user';
import menu from '@index/main/data/menu';
import depend from '@index/main/data/depend';


export default {
  name: 'App',
  components: {
    TabLayout: TabLayout
  },
  data() {
    return {
      locale: zhCN,
      user: user,
      menu: menu,
      depend: depend
    }
  }
}
</script>
