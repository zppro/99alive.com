<template lang="pug">
  .city-choose.vfx-center
    .city-current.hfx-center-v 全国
    .city-choose-btn.hfx-center-v
      span 切换城市
</template>
<script>
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  text-color = #888
  .city-choose
    .city-current
      flex 1
      font-size 28px
    .city-choose-btn
      flex 1
      span
        color text-color
        bd a, text-color
        pd r l, 2
</style>