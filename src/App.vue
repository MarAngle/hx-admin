<style lang="less">
@import '~@style/index.less';

</style>

<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <TabLayout>
        <router-view />
      </TabLayout>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { TabLayout } from './layout';


export default {
  name: 'App',
  components: {
    TabLayout: TabLayout
  },
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>
