<template lang="pug">
  .page
    search-box.search-box-in-query(:search-dimensions="searchDimensions", :multi-check-dimension-ids="queryMultiDimensionIds", :query-string="queryString")
    .search-result
      .order-switch.level
        .level-left
          .order-item.level-item 默认排序
          .level-item |
          .order-item.level-item 最新加入
          .level-item |
          .order-item.level-item 收费标准
          .level-item |
          .order-item.level-item 床位数
      .search-content
</template>
<script>
  import { mapGetters } from 'vuex'
  import { tpaPrefix } from '~/store/module-prefixs'
  import SearchBox from '~/components/tpa/SearchBox'
  export default {
    async fetch ({store}) {

    },
    computed: {
      queryString () {
        return this.$route.params.query
      },
      ...mapGetters({
        searchDimensions: `${tpaPrefix}searchDimensions`,
        queryMultiDimensionIds: `${tpaPrefix}queryMultiDimensionIds`,
      })
    },
    components: {
      SearchBox
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/page.styl'
  .search-box-in-query
    mg t, .5
  .search-result
    mg t, .5
    .order-switch
      font-size .875rem
      padding .5rem 0
      bd b, #ccc
      .order-item
        color #333
      .order-item:hover, .order-item-active
        color #ffad00
</style>