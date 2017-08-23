<template lang="pug">
  .setting
    .setting-current(@click="show = !show")
      avatar.avatar(:username="user.name")
      <!--span.badge(data-badge="")-->
    ul.setting-list(:class="{ 'setting-list-visible': show }")
      li.setting-list-item(v-for="setting in settings")
        nuxt-link.setting-list-item-link(:to="setting.to") {{setting.name}}
</template>

<script>
  import { mapGetters } from 'vuex'
  import { uaPrefix } from '~/store/module-prefixs'
  import Avatar from 'vue-avatar/src/Avatar.vue'
  export default {
    data () {
      return {show: false}
    },
    computed: {
      settings () {
        return [...this.quickSettings, {to: '/user-admin/sign-out', name: '退出'}]
      },
      ...mapGetters({
        user: `${uaPrefix}/user`,
        quickSettings: `${uaPrefix}/quickSettings`
      })
    },
    components: {
      Avatar
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  $border-color = #dbdfe1
  $text-color = #35495e
  $text-active-color = #41b883
  .setting
    width 100%
    display flex
    flex-direction column
    @media (min-width: 991px)
      &:hover
        .setting-list
          display flex
    &-current
      height 3.75rem
      display flex
      cursor pointer
      align-items center
      justify-content center
      border-bottom 1px solid $border-color
      @media (min-width: 991px)
        padding 0
        height 4.9375rem
        border-bottom none
    &-list
      display none
      flex-direction column
      list-style none
      margin 0
      padding 0
      @media (min-width: 991px)
        width 5.125rem
        position absolute
        top 4.9375rem
        left -1px
        background-color #fff
        border-top 1px solid $border-color
        border-left 1px solid $border-color
        border-right 1px solid $border-color
      &-visible
        display flex
        @media (min-width: 991px)
          display none
      &-item
        height 60px
        display flex
        align-items center
        justify-content center
        border-bottom 1px solid $border-color
        &-link
          width 100%
          display flex
          color $text-color
          padding .75rem 0
          text-decoration none
          letter-spacing 0.25px
          align-items center
          justify-content center
          &:hover
            color $text-active-color
            transform scale(1.1)
</style>
