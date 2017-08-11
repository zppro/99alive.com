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
              <!--用户名-->
              .control.has-icons-left.has-icons-right.has-label-left
                span.icon.is-small.is-left
                  i.fa.fa-user
                label.field-label.hfx-center-v 用户名
                input.input(type="text", v-model="code", placeholder="您的账户名和登录名", @blur="$validate('code')", :class="{'is-success': code && validators.test('code'), 'is-danger': !validators.test('code')}")
                span.icon.is-small.is-right
                  i.fa.fa-check-circle.help.is-success(v-show="code && validators.test('code')")
                  i.fa.fa-warning.help.is-danger(v-show="!validators.test('code')")
            .field-tip
              span.hfx-center-v.help.is-danger(v-show="!validators.test('code')")
                i.icon.fa.fa-info.hfx-center-v
                | {{$errors['code']}}
            .field
              <!--密码-->
              .control.has-icons-left.has-icons-right.has-label-left
                span.icon.is-small.is-left
                  i.fa.fa-key
                label.field-label.hfx-center-v 密码
                input.input(type="password", v-model="password", placeholder="建议至少使用两种字母组合", @blur="$validate('password')", :class="{'is-success': password && validators.test('password'), 'is-danger': !validators.test('password')}")
                span.icon.is-small.is-right
                  i.fa.fa-check-circle.help.is-success(v-show="password && validators.test('password')")
                  i.fa.fa-warning.help.is-danger(v-show="!validators.test('password')")
            .field-tip
              span.hfx-center-v.help.is-danger(v-show="!validators.test('password')")
                i.icon.fa.fa-info.hfx-center-v
                | {{$errors['password']}}
            .field
              <!--确认密码-->
              .control.has-icons-left.has-icons-right.has-label-left
                span.icon.is-small.is-left
                  i.fa.fa-key
                label.field-label.hfx-center-v 确认密码
                input.input(type="password", v-model="password2", placeholder="请再次输入密码", @blur="$validate('password2')", :class="{'is-success': password2 && validators.test('password2'), 'is-danger': !validators.test('password2')}")
                span.icon.is-small.is-right
                  i.fa.fa-check-circle.help.is-success(v-show="password2 && validators.test('password2')")
                  i.fa.fa-warning.help.is-danger(v-show="!validators.test('password2')")
            .field-tip
              span.hfx-center-v.help.is-danger(v-show="!validators.test('password2')")
                i.icon.fa.fa-info.hfx-center-v
                | {{$errors['password2']}}
            .field
              <!--手机号-->
              .control.has-icons-left.has-icons-right.has-label-left
                span.icon.is-small.is-left
                  i.fa.fa-mobile
                label.field-label.hfx-center-v 手机号
                input.input(type="text", v-model="phone", placeholder="建议使用常用手机", @blur="$validate('phone')", :class="{'is-success': phone && validators.test('phone'), 'is-danger': !validators.test('phone')}")
                span.icon.is-small.is-right
                  i.fa.fa-check-circle.help.is-success(v-show="phone && validators.test('phone')")
                  i.fa.fa-warning.help.is-danger(v-show="!validators.test('phone')")
            .field-tip
              span.hfx-center-v.help.is-danger(v-show="!validators.test('phone')")
                i.icon.fa.fa-info.hfx-center-v
                | {{$errors['phone']}}
            .columns
              .column.is-two-thirds
                .field
                  <!--验证码-->
                  .control.has-icons-left.has-icons-right.has-label-left
                    span.icon.is-small.is-left
                      i.fa.fa-info
                    label.field-label.hfx-center-v 验证码
                    input.input(type="text", v-model="vcode", placeholder="请输入右边验证码", @blur="$validate('vcode')", :class="{'is-success': vcode && validators.test('vcode'), 'is-danger': !validators.test('vcode')}")
                    span.icon.is-small.is-right
                      i.fa.fa-check-circle.help.is-success(v-show="phone && validators.test('vcode')")
                      i.fa.fa-warning.help.is-danger(v-show="!validators.test('vcode')")
              .column.hfx-center
                  figure.image.vcode-image(@click="refreshVcode")
                    img(:src="api_url + '/share/vcode?t=' + vcode_ts")
            .field-tip
              span.hfx-center-v.help.is-danger(v-show="!validators.test('vcode')")
                i.icon.fa.fa-info.hfx-center-v
                | {{$errors['vcode']}}
            .field.field-bottom
              .control.has-icons-left.has-icons-right.has-label-left
                span.icon.is-small.is-left
                  i.fa.fa-info
                label.field-label.hfx-center-v 手机验证码
                input.input(type="text", placeholder="请输入手机验证码")
            .field.field-bottom
              .control
                label.i-agree.checkbox.hfx-center-v
                  input(type="checkbox")
                  | 我已阅读并同意
                  nuxt-link.terms(to="/person-terms") 《{{siteName}}个人用户协议》
                  nuxt-link.terms(to="/statement") 《隐私政策》
            .btns.content
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
  import { isPhone } from '~/assets/js/utils'
  export default {
    layout: 'sign',
    data () {
      return {
        code: '',
        password: '',
        password2: '',
        phone: '',
        rcode: 'ABC',
        vcode: '',
        vcode_ts: new Date(),
        validators: {
          $msgs: {
            code: `支持中文,字母,数字,"_","-"的组合 6-30个字符`,
            password: `建议使用字母,数字和符号两种及以上组合`,
            password2: `二次输入密码必须一致`,
            phone: `手机格式错误`,
            vcode: `验证码错误`
          },
          code: {
            name: '账号',
            required: true,
            pattern: /^[a-zA-Z0-9\u4e00-\u9fa5_-]+$/
          },
          password: {
            name: '密码',
            required: true
          },
          password2: {
            name: '确认密码',
            required: true,
            match: 'password', //'password' | {field: 'password', useEmpty: false}
          },
          phone: {
            name: '手机号',
            required: true,
            predicate: isPhone
          },
          vcode: {
            name: '验证码',
            required: true,
            match: 'rcode'
          }
        }
      }
    },
    asyncData (ctx) {
      console.log('----------------->>>', new Date())
      return { api_url: ctx.env.API_URL}
    },
    computed: {
      ...mapGetters(['siteName'])
    },
    methods: {
      refreshVcode () {
        this.vcode_ts = new Date()
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/page.styl'
  .reg-box
    width 100%
    min-height 37.5rem
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
      .btns
        margin-bottom .75rem
        .login-btn
          background-color #ffad00
          color white
      .vcode-image
        cursor pointer
        img
          height 2.25rem
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