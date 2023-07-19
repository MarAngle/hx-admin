<style lang="less" scoped>
.statistic-num{

}
</style>
<template>
  <div class="statistic-num">
    <div class="statistic-num-title">
      <p>{{ title }}</p>
    </div>
    <div class="statistic-num-content">
      <NumberArea :data="value" :unit="suffix"  />
    </div>
  </div>
</template>

<script>
import NumberArea from '@/config/components/data/NumberArea.vue';


export default {
  name: "StatisticNum",
  components: {
    NumberArea
  },
  props: ['title', 'value', 'precision', 'suffix'],
}
</script>