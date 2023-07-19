<style lang="less" scoped>
.statistic-num{
  width: 160px;
  padding: 24px 0;
  border: 1px #ccc solid;
  border-radius: 8px;
  .statistic-num-title{
    text-align: center;
  }
  .statistic-num-content{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
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