<style lang="less" scoped>
@height: 60px;
.header-view{
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  padding: 0 16px;
  .header-view-area{
    .header-view-item{
      line-height: @height;
      p{
        margin: 0;
        line-height: @height;
        font-size: inherit;
      }
      &.header-view-item-title{
        font-size: 20px;
      }
      &.header-view-item-name{
        margin-right: 16px;
        font-size: 18px;
      }
      &.header-view-item-menu{
        font-size: 24px;
      }
    }
  }
}
</style>

<template>
  <div class="header-view local-flex-line-main">
    <div class="header-view-area local-flex-line-item">
      <div class="header-view-item header-view-item-title">
        <p>这是一个平台</p>
      </div>
    </div>
    <div class="header-view-area local-flex-line-item">
      <div class="header-view-item header-view-item-name">
        <p>{{ user.getItem('name') }}</p>
      </div>
      <div class="header-view-item header-view-item-menu">
        <a-dropdown>
          <a-icon type="setting" />
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;" @click="handleChangePassword()">修改密码</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import user from '@/main/data/user'

export default {
  name: 'HeaderView',
  props: ['page'],
  data() {
    return {
      user: user
    }
  },
  methods: {
    handleChangePassword() {
      this._func.showmsg('功能未开放！', 'warn')
    }
  }
}
</script>
