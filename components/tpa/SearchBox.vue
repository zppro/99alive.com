<template lang="pug">
  .card.search-box
    | {{queryObject}}
    .card-content.search-dimension(v-for="dimension in searchDimensions")
      .columns
        .column.is-1
          label.hfx-center-v {{dimension.name}}
        .column.search-dimension-content.is-clearfix
          a.search-dimension-item-value.hfx-center-v 不限
          nuxt-link.search-dimension-item-value.hfx-center-v(v-for="(item, key) in dimension.value", :key="key", :to="'/tpa/query/'+key")
            | {{item.name}}
</template>
<script>
  export default {
    computed: {
      queryObject () {
        return this.queryString.split(',')
      }
    },
    props: {
      searchDimensions: {type: Array, default: []},
      queryString: {type: String, default: ''}
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .search-box
    height 18.25rem
    padding .625rem 1.25rem
    label
      font-size 1rem
      color #333
      width 100%
    .search-dimension
      padding .8rem
      .search-dimension-content
        .search-dimension-item-value
          bd a, #ccc
          height: 1.5rem
          mg r, .5rem
          padding .8rem .5rem
          float left
          color #666
          font-size 0.875rem
        .search-dimension-item-value:hover
          color white
          background-color #fc7205
</style>