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
      margin-right: 16px;
    }
  }
}
</style>
<template>
  <div class="home-index">
    <div class="home-index-main-card">
      <StatisticNum
        title="今日销售订单总额"
        :value="maindata.data.order.dayAmount"
        :precision="2"
        suffix="元"
        style="background-color: #1890ff; color: #fff;"
      >
      </StatisticNum>
      <StatisticNum
        title="今日销售订单数量"
        :value="maindata.data.order.dayNum"
        :precision="0"
        suffix="个"
        style="background-color: #52c41a; color: #fff;"
      >
      </StatisticNum>
      <StatisticNum
        title="今日下单数量"
        :value="maindata.data.order.dayOrder"
        :precision="0"
        suffix="个"
        style="background-color: #faad14; color: #fff;"
      >
      </StatisticNum>
      <StatisticNum
        title="本月销售订单总额"
        :value="maindata.data.order.monthAmount"
        :precision="2"
        suffix="元"
        style="background-color: #f5222d; color: #fff;"
      >
      </StatisticNum>
      <StatisticNum
        title="本月销售订单总数"
        :value="maindata.data.order.monthNum"
        :precision="0"
        suffix="个"
        style="background-color: #1890ff; color: #fff;"
      >
      </StatisticNum>
    </div>
    <div class="home-index-main-card">
      <StatisticNum
        title="上架商品数"
        :value="maindata.data.product.increase"
        :precision="0"
        suffix="件"
      >
      </StatisticNum>
      <StatisticNum
        title="销量"
        :value="maindata.data.product.sale"
        :precision="0"
        suffix="件"
      >
      </StatisticNum>
      <StatisticNum
        title="销售商品总额"
        :value="maindata.data.product.amount"
        :precision="2"
        suffix="元"
      >
      </StatisticNum>
    </div>
    <div class="home-index-main-card">
      <StatisticNum
        title="新增用户数"
        :value="maindata.data.user.increase"
        :precision="0"
        suffix="人"
      >
      </StatisticNum>
      <StatisticNum
        title="累计用户数"
        :value="maindata.data.user.num"
        :precision="0"
        suffix="人"
      >
      </StatisticNum>
    </div>
  </div>
</template>

<script>
import maindata from './maindata';
import StatisticNum from './components/StatisticNum.vue';

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