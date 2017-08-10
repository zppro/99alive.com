<template lang="pug">
  .page
    .container
      .login-box.box
        .title.is-4 账号登录
        .field
          .control.is-label-text-3.has-icons-left.has-label-left
            span.icon.is-small.is-left
              i.fa.fa-user
            label.field-label.hfx-center-v 账号
            input.input(v-model="code", type="text", placeholder="用户名/手机号/电子邮箱", @blur="$validate('code')")
        .field-tip
          span.error.hfx-center-v(v-show="validators.test('code')")
            i.icon.fa.fa-minus-circle.hfx-center-v
            | {{$errors['code']}}
        .field
          .control.is-label-text-3.has-icons-left.has-label-left
            span.icon.is-small.is-left
              i.fa.fa-key
            label.field-label.hfx-center-v 密码
            input.input(type="password", v-model="password", placeholder="账号对应的密码", @blur="$validate('password')")
        .field-tip
          span.error.hfx-center-v(v-show="validators.test('password')")
            i.icon.fa.fa-minus-circle.hfx-center-v
            | {{$errors['password']}}
        .field.field-bottom
          .control
            label.remember-password.checkbox.hfx-center-v
              input(type="checkbox")
              | 记住密码
            nuxt-link.forget-password.has-text-right(to="/forget-password") 忘记密码
        .content
          .login-btn.button.is-large.hfx-center(@click="doLogin") 登录
        .field
          .control.is-pulled-right
            nuxt-link.to-register(to="/reg/person") 立即注册
</template>
<script>
  export default {
    layout: 'sign',
    data () {
      return {
        code: '',
        password: '',
        validated: true,
        validators: {
//          $msgs: {
//            code: `请输入账号`,
//            password: `请输入密码`
//          },
          code: {
            name: '账号',
            required: true
          },
          password: {
            name: '密码',
            required: true
          }
        }
      }
    },
    methods: {
      checkLogin (){

      },
      doLogin () {
        if(this.$validate()) {
          console.log('do login...')
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/page.styl'
  .page
    background greenyellow
    .login-box
      width 22.5rem
      height 25.625rem
      position absolute
      top 3.125rem
      right 3.125rem
      .field
        &:not(:last-child)
          mg b, 0
        label
          color #333
        .input
          color #999
        .remember-password, .forget-password
          display inline-block
          width 50%
        .forget-password
          color #999
        .to-register
          color #fc7205
      .login-btn
        background-color #ffad00
        color white
</style>