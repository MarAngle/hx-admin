<style lang="less" scoped>
.login-index{
  width: 100%;
  min-height: 100%;
  background: #f0f2f5 url(~@/assets/login/background.svg) no-repeat 50%;
  background-size: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .login-form{
    width: 368px;
    padding: 60px 0;
    margin: 0 auto;
    .login-form-title{
      h4{
        text-align: center;
        font-size: 20px;
        font-weight: bold;
      }
      margin-bottom: 24px;
    }
    .code-menu{
      cursor: pointer;
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
            v-decorator="['phone', rules.phone]"
            type="text"
            placeholder="请输入手机号"
            addon-before="手机号"
          >
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            v-decorator="['code', rules.code]"
            size="large"
            type="code"
            autocomplete="false"
            placeholder="请输入验证码"
            addon-before="验证码"
          >
            <span
              class="code-menu"
              slot="addonAfter"
              @click="getCode"
            >{{ code.operate ? '发送中' : code.time === 0 ? '获取验证码' : code.time}}</span>
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
import api from '@/config/api';


export default {
  name: "LoginIndex",
  data() {
    return {
      year: new Date().getFullYear(),
      setting: setting,
      form: this.$form.createForm(this, { name: 'login' }),
      rules: {
        phone: { rules: [{ required: true, message: '请输入手机号!' }] },
        code: { rules: [{ required: true, message: '请输入验证码!', validator: 'click' }] }
      },
      code: {
        disabled: false,
        operate: false,
        time: 0
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
    getCode() {
      if (this.code.disabled || this.code.operate) {
        return
      }
      this.form.validateFields(['phone'], { force: true }, (err, values) => {
        if (!err) {
          this.code.operate = true
          api.login({
            status: 'getCode',
            mobile: values.phone
          }).then(res => {
            this.code.disabled = true
            this.code.operate = false
            this.startCodeTime()
          }, err => {
            this.code.operate = false
          })
            // this.code.disabled = true
            // this.code.operate = false
            // this.startCodeTime()
        }
      })
    },
    startCodeTime() {
      this.code.time = 60
      setTimeout(() => {
        this.countCodeTime()
      }, 1000)
    },
    countCodeTime() {
      this.code.time--
      if (this.code.time === 0) {
        this.code.disabled = false
      } else {
        setTimeout(() => {
          this.countCodeTime()
        }, 1000)
      }
    },
    onLogin() {
      this.loading = true
      this.form.validateFields(['phone', 'code'], { force: true }, (err, values) => {
        if (!err) {
          let params = {
            status: "login",
            mobile: values.phone,
            code: values.code
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