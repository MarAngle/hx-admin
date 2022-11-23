<style lang="less" scoped>
.login-index{
  padding-top: 100px;
  .login-form{
    width: 400px;
    margin: 0 auto;
  }
}
</style>
<template>
  <div class="login-index">
    <div class="login-form">
      <a-form :form="form" ref="login-form">
        <a-form-item>
          <a-input
            size="large"
            v-decorator="['username', rules.username]"
            type="text"
            placeholder="请输入帐户名"
          >
            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            v-decorator="['password', rules.password]"
            size="large"
            type="password"
            autocomplete="false"
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input>
        </a-form-item>

        <a-form-item style="margin-top: 24px; text-align: center;">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="loading"
            @click.stop.prevent="onLogin"
            >确定
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import user from '@index/main/data/user';


export default {
  name: "LoginIndex",
  data() {
    return {
      form: this.$form.createForm(this, { name: 'login' }),
      rules: {
        username: { rules: [{ required: true, message: '请输入用户名!' }] },
        password: { rules: [{ required: true, message: '请输入密码!', validator: 'click' }] }
      },
      loading: false
    }
  },
  beforeMount() {
    this._func.page.setType('pure')
  },
  methods: {
    success() {
      let redirect = this.$route.query.redirect || '/'
      this.$router.push(redirect)
    },
    onLogin() {
      this.loading = true
      this.form.validateFields(['username', 'password'], { force: true }, (err, values) => {
        if (!err) {
          let params = {
            ...values
          }
          user.login(params).then(res => {
            this.success()
          }, err => {
            this.loading = false
          })
        } else {
          this.loading = false
        }
      })
    }
  }
};
</script>