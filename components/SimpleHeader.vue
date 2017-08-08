<template lang="pug">
  header.header.container
    .header-main.mg-center.columns.hfx-center-v
      .column.is-one-quarter.hfx-center-v
        nuxt-link.header-logo(to="/")
          img(src="~static/logo-nav.png")
        .title.is-3 {{currentSign ? currentSign.name : ''}}
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['currentSign'])
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .header
    mg t, 1.875rem
    .header-main
      height 4.375rem
      .header-logo
        mg r, 0.625
</style>