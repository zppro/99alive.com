<template lang="pug">
  .container
    .columns
      .column.is-one-third.card.quick-search-box
        header.card-header.hfx-center-v
          label 查找养老机构
          span.stat-count-wrapper
            | {{currentCityName}}共有
            span.stat-count-value {{tpaNumbers}}
            |家养老机构
        section.bed-nums.card-content.search-dimension
          label 床位数
          .search-dimension-content
        section.charge.card-content.search-dimension
          label 收费标准
          .search-dimension-content
        section.rating.card-content.search-dimension
          label 机构评级
          .search-dimension-content
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    async fetch ({store}) {
      await store.dispatch('tpa/fetchStats')
    },
    computed: {
      ...mapGetters({
        currentCityName: 'currentCityName',
        tpaNumbers: 'tpa/numbers'
      })
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/page.styl'
  .quick-search-box
    height 26.25rem
    pd l, 1.5
    pd t, 0.875
    label
      font-size 0.875rem
      color #333
      font-weight bold
    .card-header
      height 2rem
      .stat-count-wrapper
        mg l, 1rem
        color #999
        .stat-count-value
          color #fc7205
    .search-dimension
      height 4rem
      .search-dimension-content
        color #E7E7E7
</style>