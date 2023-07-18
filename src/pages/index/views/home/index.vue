<style lang="less" scoped>
.home-index{
  padding: 16px;
  .home-index-main-card{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    .statistic-num{
      margin-bottom: 24px;
    }
  }
}
</style>
<template>
  <div class="home-index">
    <div class="home-index-main-card">
      <StatisticNum
        title="今日销售订单总额"
        :value="maindata.data.amount.day"
        :precision="2"
        suffix="元"
        :value-style="{ color: '#3f8600' }"
        style="margin-right: 50px"
      >
      </StatisticNum>
      <StatisticNum
        title="今日销售订单数量"
        :value="maindata.data.order.day"
        :precision="0"
        suffix="个"
        :value-style="{ color: '#3f8600' }"
        style="margin-right: 50px"
      >
      </StatisticNum>
      <StatisticNum
        title="今日下单数量"
        :value="maindata.data.order.dayOrder"
        :precision="0"
        suffix="个"
        :value-style="{ color: '#3f8600' }"
        style="margin-right: 50px"
      >
      </StatisticNum>
      <StatisticNum
        title="本月销售订单总额"
        :value="maindata.data.amount.month"
        :precision="2"
        suffix="元"
        :value-style="{ color: '#3f8600' }"
        style="margin-right: 50px"
      >
      </StatisticNum>
      <StatisticNum
        title="本月销售订单总数"
        :value="maindata.data.order.month"
        :precision="0"
        suffix="个"
        :value-style="{ color: '#3f8600' }"
        style="margin-right: 50px"
      >
      </StatisticNum>
    </div>
    <div class="home-index-main-card">
      <StatisticNum
        title="上架商品数"
        :value="maindata.data.product.increase"
        :precision="0"
        suffix="件"
        :value-style="{ color: '#3f8600' }"
        style="margin-right: 50px"
      >
      </StatisticNum>
      <StatisticNum
        title="销量"
        :value="maindata.data.product.sale"
        :precision="0"
        suffix="件"
        :value-style="{ color: '#3f8600' }"
        style="margin-right: 50px"
      >
      </StatisticNum>
      <StatisticNum
        title="销售商品总额"
        :value="maindata.data.amount.total"
        :precision="2"
        suffix="元"
        :value-style="{ color: '#3f8600' }"
        style="margin-right: 50px"
      >
      </StatisticNum>
    </div>
    <div class="home-index-main-card">
      <StatisticNum
        title="新增用户数"
        :value="maindata.data.user.increase"
        :precision="0"
        suffix="人"
        :value-style="{ color: '#3f8600' }"
        style="margin-right: 50px"
      >
      </StatisticNum>
      <StatisticNum
        title="累计用户数"
        :value="maindata.data.user.total"
        :precision="0"
        suffix="人"
        :value-style="{ color: '#3f8600' }"
        style="margin-right: 50px"
      >
      </StatisticNum>
    </div>
  </div>
</template>

<script>
import maindata from './maindata';
import StatisticNum from './mod/StatisticNum.vue';

export default {
  name: "HomeIndex",
  components: {
    StatisticNum
  },
  data() {
    return {
      maindata: maindata
    }
  },
  mounted() {
    maindata.reloadData(true)
  }
};
</script>