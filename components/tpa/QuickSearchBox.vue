<template lang="pug">
  .card.quick-search-box
    header.card-header.hfx-center-v
      label 查找养老机构
      span.stat-count-wrapper
        | {{currentCityName}}共有
        span.stat-count-value {{tpaNumbers}}
        |家养老机构
    .card-content.search-dimension(v-for="dimension in searchDimensions")
      label {{dimension.name}}
      .search-dimension-content.is-clearfix
        nuxt-link.search-dimension-item-value.hfx-center-v(v-for="(item, key) in dimension.value", :key="key", :to="queryUrl(dimension.key, key)")
          | {{item.name}}
</template>
<script>
  export default {
    props: ['currentCityName', 'tpaNumbers', 'searchDimensions'],
    methods: {
      queryUrl (dimentionKey, value) {
        const arrQueryString = JSON.stringify([dimentionKey, value])
        return `/tpa/query/${arrQueryString}`
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .quick-search-box
    height 26.25rem
    pd l, 1.5
    pd t, 0.875
    label
      font-size 0.875rem
      color #333
      font-weight bold
    .card-header
      label
        font-size 1rem
      height 2rem
      .stat-count-wrapper
        mg l, 1rem
        color #999
        .stat-count-value
          color #fc7205
    .search-dimension
      padding 0.5rem
      .search-dimension-content
        .search-dimension-item-value
          height: 1.5rem
          mg r, 0.5rem
          float left
          color #666
          font-size 0.875rem
        .search-dimension-item-value:hover
          text-decoration underline
</style>