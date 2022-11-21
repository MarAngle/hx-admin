<style lang="less">
@import '~@style/index.less';

</style>

<template>
  <div id="app">
    <TabLayout>
      <router-view />
    </TabLayout>
  </div>
</template>

<script>
import { TabLayout } from './layout';


export default {
  name: 'App',
  components: {
    TabLayout: TabLayout
  }
}
</script>
