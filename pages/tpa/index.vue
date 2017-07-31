<template lang="pug">
  .container
    .columns
      .column.is-one-third.card.quick-search-box
        header.card-header.hfx-center-v
          label 查找养老机构
          span.stat-count-wrapper
            | {{currentCityName}}共有
            span.stat-count-value []
            |家
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    async fetch ({store}) {
      store.dispatch('tpa/fetchStats')
    },
    computed: {
      ...mapGetters(['currentCityName'])
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/page.styl'
  .quick-search-box
    height 26.25rem
    pd l, 1.5
    pd t, 0.875
    .card-header
      height 2rem
      label
        font-size 0.875rem
        color #333
        font-weight bold
      .stat-count-wrapper
        mg l, 1rem
        color #999
        .stat-count-value
          color #fc7205
</style>