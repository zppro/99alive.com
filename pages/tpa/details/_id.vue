<template lang="pug">
  .page
    nav.breadcrumb(aria-label="breadcrumbs")
      ul
        li
          nuxt-link(to="/tpa") 养老机构
        li.is-active
          a(aria-current="page") {{currentAgency.name}}
    .columns
      .column.is-half
        slider.slider-in-details(:slider-items="sliders", :show-item-count="3")
      .column
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import { tpaPrefix } from '~/store/module-prefixs'
  import Slider from '~/components/Slider2'
  import Loading from '~/components/Loading'
  import Tabbar from '~/components/Tabbar'
  export default {
    async fetch ({store, params}) {
      await Promise.all([
        store.dispatch(`${tpaPrefix}fetchAgencyInDetails`, params.id)
      ])
    },
    computed: {
      ...mapGetters({
        $keys: '$keys',
        currentAgency: `${tpaPrefix}currentAgency`
      }),
      agencyId () {
        return this.$route.params.id
      },
      sliders () {
        return this.currentAgency.imgs.map(img => ({id: img.substr(img.lastIndexOf('/')) + '-' + (+Math.random()), img}))
      },
      tabs () {
        return [
          {id: 'intro', name: '机构介绍', data: this.intro},
          {id: 'link_info', name: '联系方式', data: this.link_info},
          {id: 'reputation', name: '口碑评价', data: this.reputation}
        ]
      }
    },
    components: {
      Loading,
      Slider,
      Tabbar
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/page.styl'
  .slider-in-details
    mg l, 1
</style>