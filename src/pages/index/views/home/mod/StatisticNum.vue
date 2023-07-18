<style lang="less" scoped>
.statistic-num{

}
</style>
<template>
  <div class="statistic-num">
    <a-card>
      <a-statistic
        :title="title"
        :value="value"
        :precision="precision"
        :suffix="suffix"
        :value-style="{ color: '#3f8600' }"
        style="margin-right: 24px"
      >
      </a-statistic>
    </a-card>
  </div>
</template>

<script>

export default {
  name: "StatisticNum",
  props: ['title', 'value', 'precision', 'suffix']
}
</script>