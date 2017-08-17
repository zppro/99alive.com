<template lang="pug">
  .page
    .columns
      .column.is-one-third
        quick-search-box(:current-city-name="currentCityName", :tpa-numbers="tpaNumbers", :search-dimensions="quickSearchDimensions")
      .column
        slider.slider-in-index(:slider-items="sliders", :can-scroll="true", :scroll-interval="5000")
    tabbar.tabbar-in-index(:tab-items="tabs", @tab-item-active="fetchAgenciesInIndex")
      template(scope="props")
        .agency-list(v-if="props.data !== $keys.LAZY_LOAD")
          agency-card(v-for="agency in props.data", :key="agency.id", :agency="agency")
        loading(size="large", v-if="props.data === $keys.LAZY_LOAD")
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import { tpaPrefix } from '~/store/module-prefixs'
  import Loading from '~/components/Loading'
  import Slider from '~/components/Slider'
  import Tabbar from '~/components/Tabbar'
  import QuickSearchBox from '~/components/tpa/QuickSearchBox'
  import AgencyCard from '~/components/tpa/AgencyCard'
  export default {
    async fetch ({store}) {
      await Promise.all([
        store.dispatch(`${tpaPrefix}fetchStats`),
        store.dispatch(`${tpaPrefix}fetchSlidersInIndex`),
        store.dispatch(`${tpaPrefix}fetchTabsInIndex`)
      ])
    },
    computed: {
      ...mapGetters({
        $keys: '$keys',
        currentCityName: 'currentCityName',
        tpaNumbers: `${tpaPrefix}numbers`,
        quickSearchDimensions: `${tpaPrefix}quickSearchDimensions`,
        sliders: `${tpaPrefix}sliders`,
        tabs: `${tpaPrefix}tabs`
      })
    },
    methods: {
      ...mapActions({
        fetchAgenciesInIndex: `${tpaPrefix}fetchAgenciesInIndex`
      })
    },
    components: {
      Loading,
      Slider,
      Tabbar,
      QuickSearchBox,
      AgencyCard
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/page.styl'
  .slider-in-index
    mg l, 1
  .tabbar-in-index
    mg t, 1
    min-height 50rem
</style>