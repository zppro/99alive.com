<template lang="pug">
  footer.footer
    .footer-main.level.mg-center
      .level-item(v-for="item in commonNavItems")
        nuxt-link(:to="item.path") {{item.name}}
    .content.mg-center.has-text-centered &copyright 2017 99alive.com 版权所有
</template>
<script>
  import { mapGetters } from 'vuex'
  import HeaderCity from '~/components/HeaderCity.vue'
  import HeaderChannel from '~/components/HeaderChannel.vue'
  export default {
    computed: {
      ...mapGetters(['commonNavItems'])
    },
    components: {
      HeaderCity,
      HeaderChannel
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .footer
    background-color #f1f1f1
    height 4.625rem
    mg t, 2
    .footer-main
      a
        color #999
      a:hover
        text-decoration underline
      max-width 20rem
      mg b, 1.25rem
</style>