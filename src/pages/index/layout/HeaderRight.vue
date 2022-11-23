<style lang="less" scoped>
@import '~@index/style/option.less';
.header-right{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  .header-right-item{
    line-height: @LayoutHeaderHeight;
    p{
      margin: 0;
      line-height: @LayoutHeaderHeight;
      font-size: inherit;
    }
    &.header-right-item-name{
      margin-right: 16px;
      font-size: 18px;
    }
    &.header-right-item-menu{
      font-size: 24px;
    }
  }
}
</style>

<template>
  <div class="header-right">
    <div class="header-right-item header-right-item-name">
      <p>{{ user.getItem('name') }}</p>
    </div>
    <div class="header-right-item header-right-item-menu">
      <a-dropdown>
        <a-icon type="setting" />
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;" @click="handleChangePassword()">修改密码</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;" @click="logout()">注销登录</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HeaderRight',
  props: ['user'],
  data() {
    return {}
  },
  methods: {
    handleChangePassword() {
      this._func.showmsg('功能未开放！', 'warn')
    },
    logout() {
      this.user.logout()
    }
  }
}
</script>
