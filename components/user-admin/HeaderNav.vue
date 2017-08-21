<template lang="pug">
  nav.nav(:class="{'nav-hidden': !visible}")
    .nav-search
      header-nav-search
    .nav-menu
      header-nav-menu
    .nav-lang
      header-nav-lang
</template>

<script>
import HeaderNavSearch from '~/components/user-admin/HeaderNavSearch.vue'
import HeaderNavMenu from '~/components/user-admin/HeaderNavMenu.vue'
import HeaderNavLang from '~/components/user-admin/HeaderNavSetting.vue'

export default {
  computed: {
    visible () { return this.$store.state.visibleHeader }
  },
  components: {
    HeaderNavSearch,
    HeaderNavMenu,
    HeaderNavLang
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  $border-color = #dbdfe1
  .nav
    display block
    position fixed
    z-index: 995
    top 3.75rem
    left 0
    right 0
    bottom 0
    overflow-y auto
    background-color #fff
    @media (min-width: 991px)
      display flex
      flex 1
      top 0
      flex-wrap nowrap
      overflow-y visible
      position relative
    &-hidden
      display none
      @media (min-width: 991px)
        display flex
    &-search
      width 100%
      height 3.75rem
      display flex
      border-bottom 1px solid $border-color
      @media (min-width: 991px)
        flex 3
        order 1
        height 4.9375rem
        border-bottom none
    &-lang
      width 100%
      display flex
      @media (min-width: 991px)
        width 5rem
        height 4.9375rem
    &-menu
      width 100%
      display flex
      border-bottom 1px solid $border-color
      @media (min-width: 991px)
        flex 4
        order 2
        height 79px
        border-bottom none
</style>
