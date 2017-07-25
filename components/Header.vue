<template lang="pug">
  header.header
    .header-top
    .header-main.mg-center.container.columns
      .column.is-one-quarter
        nuxt-link.header-logo(to="/")
          img(src="~static/logo-nav.png")
      .column.mg-0
</template>
<script>
</script>
<style lang="stylus" scoped>
  .header
    height 100px
    .header-top
      height 30px
      background #f1f1f1
</style>