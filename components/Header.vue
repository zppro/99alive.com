<template lang="pug">
  header.header
    .header-main.mg-center.container.columns.hfx-center-v
      .column.is-one-quarter.hfx-center-v
        nuxt-link.header-logo(to="/")
          img(src="~static/logo-nav.png")
        header-city
      .column
        header-channel
</template>
<script>
  import HeaderCity from '~components/HeaderCity.vue'
  import HeaderChannel from '~components/HeaderChannel.vue'
  export default {
    components: {
      HeaderCity,
      HeaderChannel
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .header
    height 70px
    .header-main
      height 70px
      .header-logo
        mg r, 10
</style>