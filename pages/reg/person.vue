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
                input.input(type="text", v-model="code", placeholder="您的账户名和登录名", @input="$validate('code')", @blur="$validate('code')", :class="{'is-success': validators.success('code'), 'is-danger': validators.error('code')}")
                span.icon.is-small.is-right
                  i.fa.fa-check-circle.help.is-success(v-show="code && validators.success('code')")
                  i.fa.fa-warning.help.is-danger(v-show="validators.error('code')")
            .field-tip
              span.hfx-center-v.help.is-danger(v-show="validators.error('code')")
                i.icon.fa.fa-info.hfx-center-v
                | {{$errors['code']}}
            .field
              <!--密码-->
              .control.has-icons-left.has-icons-right.has-label-left
                span.icon.is-small.is-left
                  i.fa.fa-key
                label.field-label.hfx-center-v 密码
                input.input(type="password", v-model="password", placeholder="建议至少使用两种字母组合", @input="$validate('password')", @blur="$validate('password')", :class="{'is-success': validators.success('password'), 'is-danger': validators.error('password')}")
                span.icon.is-small.is-right
                  i.fa.fa-check-circle.help.is-success(v-show="validators.success('password')")
                  i.fa.fa-warning.help.is-danger(v-show="validators.error('password')")
            .field-tip
              span.hfx-center-v.help.is-danger(v-show="validators.error('password')")
                i.icon.fa.fa-info.hfx-center-v
                | {{$errors['password']}}
            .field
              <!--确认密码-->
              .control.has-icons-left.has-icons-right.has-label-left
                span.icon.is-small.is-left
                  i.fa.fa-key
                label.field-label.hfx-center-v 确认密码
                input.input(type="password", v-model="password2", placeholder="请再次输入密码", @input="$validate('password2')", @blur="$validate('password2')", :class="{'is-success': validators.success('password2'), 'is-danger': validators.error('password2')}")
                span.icon.is-small.is-right
                  i.fa.fa-check-circle.help.is-success(v-show="validators.success('password2')")
                  i.fa.fa-warning.help.is-danger(v-show="validators.error('password2')")
            .field-tip
              span.hfx-center-v.help.is-danger(v-show="validators.error('password2')")
                i.icon.fa.fa-info.hfx-center-v
                | {{$errors['password2']}}
            .field
              <!--手机号-->
              .control.has-icons-left.has-icons-right.has-label-left
                span.icon.is-small.is-left
                  i.fa.fa-mobile
                label.field-label.hfx-center-v 手机号
                input.input(type="text", v-model="phone", placeholder="建议使用常用手机", @input="$validate('phone')", :class="{'is-success': validators.success('phone'), 'is-danger': validators.error('phone')}")
                span.icon.is-small.is-right
                  i.fa.fa-check-circle.help.is-success(v-show="validators.success('phone')")
                  i.fa.fa-warning.help.is-danger(v-show="validators.error('phone')")
            .field-tip
              span.hfx-center-v.help.is-danger(v-show="validators.error('phone')")
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
                    input.input(type="text", v-model="vcode", placeholder="请输入右边验证码", @input="$validate('vcode')", :class="{'is-success': validators.success('vcode'), 'is-danger': validators.error('vcode')}")
                    span.icon.is-small.is-right
                      i.fa.fa-check-circle.help.is-success(v-show="validators.success('vcode')")
                      i.fa.fa-warning.help.is-danger(v-show="validators.error('vcode')")
              .column.hfx-center
                  figure.image.vcode-image(@click="refreshVCode")
                    img(:src="api_base_url + 'share/vcode?t=' + vcode_ts")
            .field-tip
              span.hfx-center-v.help.is-danger(v-show="validators.error('vcode')")
                i.icon.fa.fa-info.hfx-center-v
                | {{$errors['vcode']}}
            .columns
              .column.is-two-thirds
                .field
                  .control.has-icons-left.has-icons-right.has-label-left
                    span.icon.is-small.is-left
                      i.fa.fa-info
                    label.field-label.hfx-center-v 手机验证码
                    input.input(type="text", v-model="mcode", placeholder="请输入手机验证码", @input="$validate('mcode')", :class="{'is-success': validators.success('mcode'), 'is-danger': validators.error('mcode')}")
                    span.icon.is-small.is-right
                      i.fa.fa-check-circle.help.is-success(v-show="validators.success('mcode')")
                      i.fa.fa-warning.help.is-danger(v-show="validators.error('mcode')")
              .column.hfx-center
                .button.is-primary(@click="getMCode", :disabled="!validators.phone.predicate(phone) || mcode_btn_disabled") {{mcode_btn_text}}
            .field-tip
              span.hfx-center-v.help.is-danger(v-show="validators.error('mcode')")
                i.icon.fa.fa-info.hfx-center-v
                | {{$errors['mcode']}}
            .field.field-bottom
              .control
                label.i-agree.checkbox.hfx-center-v
                  input(type="checkbox")
                  | 我已阅读并同意
                  nuxt-link.terms(to="/person-terms") 《{{siteName}}个人用户协议》
                  nuxt-link.terms(to="/statement") 《隐私政策》
            .btns.content
              .login-btn.button.is-large.hfx-center(@click="doReg") 注册
        .column
          .right-content
            p
              | 已有账号?
              nuxt-link.to-login(to="/login") 立即登录
            p
              nuxt-link.to-reg-agency(to="/reg/agency") 机构用户注册
</template>
<script>
  import { tpaPrefix } from '~/store/module-prefixs'
  import { mapGetters } from 'vuex'
  import { api } from '~/plugins/axios'
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
        mcode: '',
        mcode_btn_text: '获取手机验证码',
        mcode_btn_disabled: false,
        mcode_btn_countdown_seconds: 60,
        mcode_btn_countdown_id: null,
        validators: {
          $msgs: {
            code: `支持中文,字母,数字,"_","-"的组合 6-30个字符`,
            password: `建议使用字母,数字和符号两种及以上组合`,
            password2: `二次输入密码必须一致`,
            phone: `手机格式错误`,
            vcode: `验证码错误`,
            mcode: `手机验证码错误`
          },
          $valiatingWhen: {
            vcode: v => v && v.length === 5,
            mcode: v => v && v.length === 6
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
            predicate: this.verifyVCode
          },
          mcode: {
            name: '手机验证码',
            required: true,
            predicate: this.verifyMCode
          }
        }
      }
    },
    asyncData (ctx) {
      return { api_base_url: ctx.env.API_BASE_URL}
    },
    computed: {
      ...mapGetters(['siteName'])
    },
    methods: {
      refreshVCode () {
        this.vcode_ts = new Date()
      },
      async verifyVCode () {
        if(this.vcode.length === 5) {
          return await api.post(`/share/vcode/verify`, {vcode: this.vcode})
        } else {
          return false
        }
      },
      async getMCode () {
        this.mcode_btn_disabled = true
        return await api.post(`/share/mcode`, {phone: this.phone, msg: `${this.phone}用户,您正在注册个人会员,验证码:{{mcode}}`, signature: this.siteName }).then((ret) => {
          console.log('getMCode:', ret)
          this.mcode_btn_text = `${this.mcode_btn_countdown_seconds}再次获取`
          this.mcode_btn_countdown_id = setInterval(() => {
            this.mcode_btn_countdown_seconds--
            this.mcode_btn_text = `${this.mcode_btn_countdown_seconds}秒后再次获取`
          }, 1* 1000)

          setTimeout(() => {
            clearInterval(this.mcode_btn_countdown_id)
            this.mcode_btn_text = '获取手机验证码'
            this.mcode_btn_disabled = false
            this.mcode_btn_countdown_seconds = 60
          }, this.mcode_btn_countdown_seconds * 1000)

        }).catch(() => {
          this.mcode_btn_disabled = false
        })
      },
      async verifyMCode () {
        if(this.mcode.length === 6) {
          return await api.post(`/share/mcode/verify`, {mcode: this.mcode})
        } else {
          return false
        }
      },
      doReg () {
        if(this.$validate()) {
          console.log('do reg...')
        }
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