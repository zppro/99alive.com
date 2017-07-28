<template lang="pug">
  .topbar.w100
    .mg-center.container.columns.hfx-center-v
      .column
      .column.is-three-quarters.hfx-center-v.no-login
        | 欢迎来到99为老网 请
        nuxt-link.to-login(to="/login") 登录
        | 免费注册
</template>
<script>
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .topbar
    position fixed
    top 0
    left 0
    height 1.875rem
    z-index 999
    background-color #f1f1f1
    .no-login
      color #999
      justify-content flex-end
      .to-login
        color #fc7205
        mg l r, 0.25
</style>