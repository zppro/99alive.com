<template lang="pug">
  header.header
    nuxt-link.header-logo(to="/")
      img(src="~static/logo-nav.png")
      h1.header-logo-text 个人用户中心
    .header-toggler
      .header-toggler-button(@click="toggle")
        div(:class="{'icon menu': !visible, 'icon close': visible}")
    header-nav
</template>

<script>
import HeaderNav from '~/components/user-admin/HeaderNav.vue'

export default {
  computed: {
    visible () { return this.$store.state.visibleHeader }
  },
  methods: {
    toggle () { this.$store.commit('toggle', 'visibleHeader') }
  },
  components: {
    HeaderNav
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  $border-color = #dbdfe1
  .header
    top 0
    width 100%
    height 3.75rem
    z-index 995
    padding 0 .9375rem
    display flex
    position fixed
    flex-direction row
    background-color #fff
    border-bottom 1px solid $border-color
    @media (min-width: 991px)
      height 5rem
      padding 0 1.875rem
    &-logo
      display flex
      align-items center
      @media (min-width: 991px)
        width 189px
        border-right 1px solid $border-color
      &-text
        margin 0
        width 0
        overflow hidden
    &-toggler
      display flex
      flex 1
      align-items center
      justify-content flex-end
      @media (min-width: 991px)
        display none
      &-button
        display flex
        width 1.5625rem
        height 1.25rem
        cursor pointer
</style>
