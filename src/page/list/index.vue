<style lang='less' scoped>
.list-index{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  .list-index-bgc{
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    z-index: -1;
    img{
      width: 100%;
    }
  }
  .list-index-header{
    padding: 50px 0;
    background-color: transparent;
    h4,p{
      padding-left: 20px;
      color: #fff;
      text-align: left;
    }
    h4{
      font-size: 24px;
    }
    p{
      font-size: 14px;
    }
  }
  .list-index-tab{
    width: 80%;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
    /deep/ .van-tabs{
      .van-tabs__nav{
        background-color: rgba(255, 255, 255, 0.8);
      }
      .van-tabs__content{
        display: none;
      }
    }
  }
}
</style>

<template>
  <div class="list-index">
    <div class="list-index-bgc">
      <img src="./../../assets/main/home.png" alt="">
    </div>
    <div class="list-index-header">
      <h4>信息全方位 服务零距离</h4>
      <p>用科技照亮未来之路</p>
      <p>用心呵护您的健康和安全</p>
    </div>
    <div class="list-index-tab">
      <van-tabs v-model="mainData.data.current" swipe-threshold="4" @change="onTabChange" >
        <van-tab v-for="val in mainData.data.data" :key="val.prop" :name="val.prop" :title="val.shortName"></van-tab>
      </van-tabs>
    </div>
    <DataView v-if="currentData" ref="data-view" :data="currentData" ></DataView>
  </div>
</template>

<script>
import mainData from './mainData';
import DataView from './mod/DataView.vue';

export default {
  name: "ListIndex",
  components: {
    DataView: DataView
  },
  data: function() {
    return {
      mainData: mainData
    }
  },
  computed: {
    currentData() {
      let currentData = null
      if (this.mainData.data.current !== undefined) {
        currentData = this.mainData.data.data[this.mainData.data.current]
      }
      return currentData
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(val) {
        this.syncData(val)
      }
    }
  },
  mounted() {
    this.pageLoad()
  },
  methods: {
    syncData($route) {
      this.mainData.syncCurrent($route.query.prop)
      if (this.$refs['data-view']) {
        this.$refs['data-view'].syncData($route)
      }
    },
    pageLoad() {
      this.mainData.loadData().then(() => {}, err => { console.error(err) })
    },
    onTabChange(prop) {
      this.$router.push({
        name: this.$route.name,
        query: {
          prop: prop
        }
      })
    }
  }
};
</script>