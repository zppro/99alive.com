<template lang="pug">
  .topbar
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
    height 30px
    background-color #f1f1f1
    .no-login
      color #999
      justify-content flex-end
      .to-login
        color #fc7205
        mg l r, 4
</style>