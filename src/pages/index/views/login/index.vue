<style lang="less" scoped>
.login-index{
  width: 100%;
  min-height: 100%;
  background: #f0f2f5 url(~@/assets/login/background.svg) no-repeat 50%;
  background-size: 100%;
  //padding: 50px 0 84px;
  position: relative;
  padding-top: 100px;
  .login-form{
    width: 368px;
    margin: 0 auto;
    .login-form-title{
      h4{
        text-align: center;
        font-size: 20px;
        font-weight: bold;
      }
      margin-bottom: 24px;
    }
  }
  .login-footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;
    .copyright {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
  }
}
</style>
<template>
  <div class="login-index">
    <div class="login-form">
      <div class="login-form-title">
        <h4>{{ setting.page[type].title }}</h4>
      </div>
      <a-form :form="form" ref="login-form">
        <a-form-item>
          <a-input
            size="large"
            v-decorator="['username', rules.username]"
            type="text"
            placeholder="请输入帐户"
            addon-before="账户"
          >
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input-password
            v-decorator="['password', rules.password]"
            size="large"
            type="password"
            autocomplete="false"
            placeholder="请输入密码"
            addon-before="密码"
          >
          </a-input-password>
        </a-form-item>

        <a-form-item style="margin-top: 24px; text-align: center;">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="loading"
            @click.stop.prevent="onLogin"
            >登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="login-footer">
      <div class="copyright">
        Copyright &copy; {{ year }} {{ setting.page[type].company }}
      </div>
    </div>
  </div>
</template>

<script>
import user from '@index/main/data/user';
import setting from '@/setting'


export default {
  name: "LoginIndex",
  data() {
    return {
      year: new Date().getFullYear(),
      setting: setting,
      form: this.$form.createForm(this, { name: 'login' }),
      rules: {
        username: { rules: [{ required: true, message: '请输入用户名!' }] },
        password: { rules: [{ required: true, message: '请输入密码!', validator: 'click' }] }
      },
      loading: false
    }
  },
  computed: {
    type() {
      return this._func.$page
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