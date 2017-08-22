<template lang="pug">
  ul.menu
    li.menu-item
      nuxt-link.menu-item-link(to="/main") 首页
    li.menu-item
      nuxt-link.menu-item-link(to="/msg") 消息
        span.badge.menu-item-link-badge(v-if="hasNewMsg", data-badge="12")
    li.menu-item
      nuxt-link.menu-item-link(to="/faq") 常见问题
    li.menu-item
      header-nav-menu-dropdown
</template>

<script>
  import Avatar from 'vue-avatar/src/Avatar.vue'
  import { uaPrefix } from '~/store/module-prefixs'
  import HeaderNavMenuDropdown from '~/components/user-admin/HeaderNavMenuDropdown.vue'

  export default {
    computed: {
      hasNewMsg () {
        return this.$store.state[uaPrefix].hasNewMsg
      }
    },
    components: {
      Avatar,
      HeaderNavMenuDropdown
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  $border-color = #dbdfe1
  $link-active-color = #41b883
  .menu
    width 100%
    margin 0
    padding 0
    display flex
    flex-wrap wrap
    list-style none
    justify-content space-between
    @media (min-width: 991px)
      flex 1
      flex-wrap nowrap
      padding-left .9375rem
    &-item
      width 100%
      display flex
      border-bottom 1px solid $border-color
      @media (min-width: 991px)
        border-bottom: none
      &:last-child
        border-bottom: none
      &-link
        height 3.75rem
        display flex
        width 100%
        align-items center
        justify-content center
        color #35495e
        font-size 16px
        text-decoration none
        letter-spacing 0.5px
        &:hover
          color $link-active-color
          transform scale(1.1)
        @media (min-width: 991px)
          height 4.9375rem
        &-badge
          &[data-badge]::after, &:not([data-badge])::after
            background #00d1b2
            background-clip padding-box
            border-radius 100%
            box-shadow 0 0 0 0.2rem #fff
            color #fff
            content attr(data-badge)
            display inline-block
      .nuxt-link-active, .nuxt-link-active:hover
        color $link-active-color
</style>
