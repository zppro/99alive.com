<template lang="pug">
  ul.menu
    li.menu-item
      nuxt-link.menu-item-link(to="/guide") 教程
    li.menu-item
      nuxt-link.menu-item-link(to="/api") API
    li.menu-item
      nuxt-link.menu-item-link(to="/examples") 示例
    li.menu-item
      nuxt-link.menu-item-link(to="/faq") 常见问题
    li.menu-item
      header-nav-menu-dropdown
</template>

<script>
import HeaderNavMenuDropdown from '~/components/user-admin/HeaderNavMenuDropdown.vue'

export default {
  components: {
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
        @media (min-width: 991px)
          height 4.9375rem
      .nuxt-link-active, .nuxt-link-active:hover
        color $link-active-color
</style>
