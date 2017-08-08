<template lang="pug">
  .page.container
    .reg-box.box
      .tabs.is-boxed
        ul
          li.is-active
            a 个人用户注册
      .columns
        .column.is-half
          .left-content
            .field
              .control.has-icons-left.has-icons-right.has-label-left
                span.icon.is-small.is-left
                  i.fa.fa-user
                label.field-label.hfx-center-v 用户名
                input.input(type="text", placeholder="您的账户名和登录名", @focus="tips.code = true", @blur="tips.code = false")
                span.icon.is-small.is-right
                  i.fa.fa-check-circle
            .field-tip
              span.hfx-center-v(v-show="tips['code']")
                i.icon.fa.fa-info.hfx-center-v
                | 支持中文,字母,数字,"_","-"的组合 6-30个字符
            .field
              .control.has-icons-left.has-icons-right.has-label-left
                span.icon.is-small.is-left
                  i.fa.fa-key
                label.field-label.hfx-center-v 密码
                input.input(type="password", placeholder="建议至少使用两种字母组合", @focus="tips.password = true", @blur="tips.password = false")
            .field-tip
              span.hfx-center-v(v-show="tips['password']")
                i.icon.fa.fa-info.hfx-center-v
                | 建议使用字母,数字和符号两种及以上组合 6-30个字符
            .field.field-bottom
              .control.has-icons-left.has-icons-right.has-label-left
                span.icon.is-small.is-left
                  i.fa.fa-key
                label.field-label.hfx-center-v 确认密码
                input.input(type="password", placeholder="请再次输入密码")
            .field.field-bottom
              .control.has-icons-left.has-icons-right.has-label-left
                span.icon.is-small.is-left
                  i.fa.fa-mobile
                label.field-label.hfx-center-v 手机号
                input.input(type="text", placeholder="建议使用常用手机")
            .field.field-bottom
              .control.has-icons-left.has-icons-right.has-label-left
                span.icon.is-small.is-left
                  i.fa.fa-info
                label.field-label.hfx-center-v 验证码
                input.input(type="text", placeholder="请输入右边验证码")
            .field.field-bottom
              .control.has-icons-left.has-icons-right.has-label-left
                span.icon.is-small.is-left
                  i.fa.fa-info
                label.field-label.hfx-center-v 手机验证码
                input.input(type="text", placeholder="请输入手机验证码")
            .field
              .control
                label.i-agree.checkbox.hfx-center-v
                  input(type="checkbox")
                  | 我已阅读并同意
                  nuxt-link.terms(to="/person-terms") 《{{siteName}}个人用户协议》
                  nuxt-link.terms(to="/statement") 《隐私政策》
            .content
              .login-btn.button.is-large.hfx-center 登录
        .column
          .right-content
            p
              | 已有账号?
              nuxt-link.to-login(to="/login") 立即登录
            p
              nuxt-link.to-reg-agency(to="/reg/agency") 机构用户注册
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        tips: {
          code: false,
          password: false
        }
      }
    },
    layout: 'sign',
    computed: {
      ...mapGetters(['siteName'])
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/page.styl'
  .reg-box
    width 100%
    height 37.5rem
    .tabs.is-boxed
      ul
        border-color #ffad00
        li.is-active
          a
            color white
            border-color #ffad00
            background-color #ffad00
    .left-content
      bd r, #ddd
      pd l r, 4
      .field
        &:not(:last-child)
          mg b, 0
        label
          color #333
        .input
          color #999
        .terms
          font-size .875rem
          color #fc7205
        .terms:hover
          text-decoration underline
      .login-btn
        background-color #ffad00
        color white
    .right-content
      pd l, 2
      font-size 1rem
      color #999
      p
        padding .5rem
        .to-login
          mg l, 1
          font-size 1.25rem
          color #666
        .to-reg-agency
          font-size 1rem
          color #666
</style>