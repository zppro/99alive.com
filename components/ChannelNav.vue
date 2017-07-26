<template lang="pug">
  nav.nav
    .container
      .nav-item.nav-item-active
        nuxt-link(to="/TPA") 首页
      .nav-item
        nuxt-link(to="/TPA/find") 查找
      .nav-item
        nuxt-link(to="/TPA/compare") 对比
</template>
<script>
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .nav
    height 60px
    background-color #fc7205
    .nav-item
      width 100px
      font-size 18px
      mg l r, 10
      a
        color white
    .nav-item-active
      background-color #ffad00
</style>