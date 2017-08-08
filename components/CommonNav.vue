<template lang="pug">
  nav.nav.vfx-center
    .nav-item(v-for="item in commonNavItems", :class="{'nav-item-active': isActive(item.path)}")
      nuxt-link(:to="item.path") {{item.name}}
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['commonNavItems'])
    },
    methods: {
      isActive (columnPath) {
        return this.$route.path.endsWith(columnPath)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .nav
    min-width 15rem
    width 15rem
    justify-content: flex-start
    .nav-item
      bd a, #ddd
      width 100%
      height 3.75rem
      font-size 1.125rem
      a
        color #666
    .nav-item-active
      background-color #ffad00
      a
        color white
</style>