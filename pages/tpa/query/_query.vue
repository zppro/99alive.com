<template lang="pug">
  .page
    search-box.search-box-in-query(:search-dimensions="searchDimensions", :multi-check-dimension-ids="queryMultiDimensionIds", :query-string="queryString")
    .search-result
      orderbar(:order-items="queryOrders", @order-change="orderChanged")
        .level-left
          .order-item.level-item 默认排序
          .level-item |
          .order-item.level-item 最新加入
          .level-item |
          .order-item.level-item 收费标准
          .level-item |
          .order-item.level-item 床位数
      .search-content
        .agency-list(v-if="agencies.length > 0")
          agency-card(v-for="agency in agencies", :key="agency.id", :agency="agency")
        loading(size="large", v-if="isLoading")
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import { tpaPrefix } from '~/store/module-prefixs'
  import Loading from '~/components/Loading'
  import SearchBox from '~/components/tpa/SearchBox'
  import Orderbar from '~/components/Orderbar'
  import AgencyCard from '~/components/tpa/AgencyCard'
  export default {
    data () {
      return {
        isLoading: false
      }
    },
    async fetch ({store}) {

    },
    computed: {
      queryString () {
        return this.$route.params.query
      },
      ...mapGetters({
        searchDimensions: `${tpaPrefix}searchDimensions`,
        queryMultiDimensionIds: `${tpaPrefix}queryMultiDimensionIds`,
        queryOrders: `${tpaPrefix}queryOrders`,
        agencies: `${tpaPrefix}agencies`
      })
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        console.log(to,from)
      }
    },
    methods: {
      async orderChanged (order) {
        this.isLoading = true
        await this.fetchAgenciesInQuery(order)
        this.isLoading = false
      },
      ...mapActions({
        fetchAgenciesInQuery: `${tpaPrefix}fetchAgenciesInQuery`
      })
    },
    components: {
      Loading,
      SearchBox,
      Orderbar,
      AgencyCard
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