<style lang='less' scoped>
.data-view{
  width: 100%;
  padding-top: 10px;
  padding-bottom: 30px;
  .data-view-title{
    cursor: pointer;
    width: 100%;
    padding: 0 11px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .data-view-title-logo{
      width: 66px;
      height: 66px;
      img{
        margin: 10px;
        width: 46px;
        height: 46px;
        border-radius: 4px;
        box-shadow: 0 0 5px 2px #ccc;
      }
    }
    .data-view-title-content{
      h4{
        text-align: left;
        font-size: 20px;
        color: #353B50;
      }
      p{
        font-size: 12px;
        color: #353B50;
        opacity: 0.6;
      }
    }
  }
  .data-view-describe{
    p{
      padding: 0 20px;
      font-size: 14px;
      line-height: 20px;
      color: #353B50;
      word-wrap: break-word;
      word-break: break-all;
      text-overflow: ellipsis;
    }
  }
  .data-view-more{
    .data-view-more-title{
      text-align: left;
      padding-left: 20px;
      font-size: 14px;
      font-weight: bold;
      color: #353B50;
      margin-top: 25px;
      margin-bottom: 15px;
    }
    .data-view-more-list{
      width: 375px;
      overflow: auto;
      .data-view-more-list-area{
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 4px 10px;
        .data-view-more-item{
          flex: none;
          margin-right: 10px;
          box-sizing: content-box;
          &:last-child{
            padding-right: 10px;
          }
          img{
            width: 100%;
            border-radius: 4px;
            box-shadow: 0 0 5px 2px #ccc;
          }
        }
      }
    }
  }
  .data-view-code{
    margin-top: 30px;
    margin-bottom: 30px;
    .data-view-code-area{
      margin: 0 auto;
      width: 40%;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .data-view-menu{
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .data-view-menu-item{
      width: 160px;
      height: 40px;
      border-radius: 20px;
      box-sizing: border-box;
      &.choice{
        background: linear-gradient(90deg, #534FFF 0%, #15A1F1 100%, #00BDD3 100%);
      }
      &.unchoice{
        border: 1px solid #3577F8;
        p{
          color: #3774F9;
        }
      }
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .logo{
        width: 20px;
        height: 20px;
        margin-right: 3px;
      }
      p{
        font-size: 16px;
        line-height: 22px;
        color: #fff;
      }
    }
  }
}
</style>

<template>
  <div class="data-view">
    <div class="data-view-title">
      <div class="data-view-title-logo">
        <img :src="data.logo.src" :style="data.logo.style" alt="">
      </div>
      <div class="data-view-title-content">
        <h4>{{ data.name }}</h4>
        <p>更新时间: {{ data.updateTime }}</p>
      </div>
    </div>
    <div class="data-view-describe">
      <p>{{ data.describe }}</p>
    </div>
    <div class="data-view-more">
      <h4 class="data-view-more-title">更多介绍...</h4>
      <div class="data-view-more-list" ref="data-view-more-list">
        <div class="data-view-more-list-area">
          <div class="data-view-more-item" v-for="val in data.list.data" :key="val.src" :style="data.list.style" >
            <img :src="val.src" alt="">
          </div>
        </div>
      </div>
    </div>
    <div v-if="hasType('wx')" class="data-view-code">
      <div class="data-view-code-area">
        <img :src="data.type.wx.src" alt="">
      </div>
    </div>
    <div v-if="hasType('ios') || hasType('android')" class="data-view-menu">
      <div v-if="hasType('ios')" class="data-view-menu-item choice" @click="onMenu(data.type.ios)">
        <img class="logo" src="./../../../assets/icon/ios.png" alt="">
        <p>iPhone下载</p>
      </div>
      <div v-if="hasType('android')" class="data-view-menu-item unchoice" @click="onMenu(data.type.android)">
        <img class="logo" src="./../../../assets/icon/android.png" alt="">
        <p>Android下载</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "DataView",
  data: function() {
    return {}
  },
  props: {
    data: {
      type: Object,
      require: true
    }
  },
  methods: {
    syncData($route) {
      if (this.$refs['data-view-more-list']) {
        this.$refs['data-view-more-list'].scrollLeft = 0
      }
    },
    hasType(type) {
      if (this.data.type.data.indexOf(type) > -1) {
        return true
      } else {
        return false
      }
    },
    onMenu(item) {
      window.location.href = item.src
    }
  }
};
</script>