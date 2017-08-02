<template lang="pug">
  .container
    .columns
      .column.is-one-third
        quick-search-box(:current-city-name="currentCityName", :tpa-numbers="tpaNumbers", :search-dimensions="quickSearchDimensions")
      .column
        slider.slider-in-index(:slider-items="sliders")
        //.popover-up
        //  .arrow
        //  .popover-content.hfx-center 按首字母排列
</template>
<script>
  import { tpaPrefix } from '~/store/module-prefixs'
  import { mapGetters } from 'vuex'
  import QuickSearchBox from '~/components/tpa/QuickSearchBox'
  import Slider from '~/components/tpa/Slider'
  export default {
    async fetch ({store}) {
      await store.dispatch(`${tpaPrefix}fetchStats`)
    },
    computed: {
      ...mapGetters({
        currentCityName: 'currentCityName',
        tpaNumbers: `${tpaPrefix}numbers`,
        quickSearchDimensions: `${tpaPrefix}quickSearchDimensions`,
        sliders: `${tpaPrefix}sliders`
      })
    },
    components: {
      QuickSearchBox,
      Slider
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/page.styl'
  .slider-in-index
    mg l, 1
</style>