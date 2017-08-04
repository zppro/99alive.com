<template lang="pug">
  .page
    | {{queryString}}
    search-box.search-box-in-query(:search-dimensions="searchDimensions", :query-string="queryString")
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
        searchDimensions: `${tpaPrefix}searchDimensions`
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
</style>