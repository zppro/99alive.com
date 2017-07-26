<template lang="pug">
  nav.channels.hfx-center-v
    .channel-item.channel-item-active
      nuxt-link(to="/TPA") 为老机构
    .channel-item
      nuxt-link(to="/TNM") 照护人才
    .channel-item
      nuxt-link(to="/job") 招聘信息
</template>
<script>
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .channels
    .channel-item
      font-size 14px
      mg l r, 10
      a
        color #888
    .channel-item-active
      a
        color #fc7205
</style>