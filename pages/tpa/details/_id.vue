<template lang="pug">
  .page
    nav.breadcrumb.has-succeeds-separator(aria-label="breadcrumbs")
      ul
        li
          nuxt-link(to="/tpa") 养老机构
        li.is-active
          a(aria-current="page") {{currentAgency.name}}
    .columns
      .column.is-half
        slider.slider-in-details(:slider-items="sliders", :show-item-count="5", :can-scroll="true", :scroll-interval="5000")
      .column
        .content.base-info
          p.title.is-4 {{currentAgency.name}}
          p
            label 地　　址:
            span {{currentAgency.address}}
          p
            label 地　　区:
            span {{currentAgency.area}}
          p
            label 机构性质:
            span {{currentAgency.nature}}
          p
            label 机构类型:
            span {{currentAgency.type}}
          p
            label 服务对象:
            span {{currentAgency.service_object}}
          p
            label 成立时间:
            span {{currentAgency.publish_on}}
          p
            label 收费区间:
            span.fee_range {{currentAgency.fee_range}}
          p
            label 床位区间:
            span {{currentAgency.bed_num_range}}
          .p
            label 机构评级:
            rate(:value="rateValue", :allow-half="true", :show-text="true")
          p
          p
            label 　联系人:
            span {{currentAgency.link_man}}
          p
            .button.is-medium.is-striking {{currentAgency.link_phone}}
    tabbar#tabbar-in-details.container.tabbar-in-details(:tab-items="tabs", :actived-tab-id="activedTabId", :style="tabPosition", @tab-item-active="srollToTab")
    #intro.tab-content 机构介绍
    #link_info.tab-content 联系方式
    #reputation.tab-content 口碑评价
</template>
<script>
  import throttle from 'lodash.throttle'
  import { mapGetters, mapActions } from 'vuex'
  import { tpaPrefix } from '~/store/module-prefixs'
  import { scrollTop, offsetY } from '~/assets/js/utils'
  import Slider from '~/components/Slider2'
  import Rate from '~/components/Rate'
  import Loading from '~/components/Loading'
  import Tabbar from '~/components/Tabbar'

  export default {
    data () {
      return {
        rateValue: 2.5,
        tabOffSetY: 0,
        tabPosition: {},
        activedTabId: null,
        tabContents: {}
      }
    },
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
    mounted () {
      window.addEventListener('scroll', throttle(this.onScroll, 70))
      this.tabOffSetY = offsetY('tabbar-in-details')
//      console.log('mounted:', this.tabOffSetY)
      this.tabContents['intro'] = offsetY('intro') + 42
      this.tabContents['link_info'] = offsetY('link_info') + 42
      this.tabContents['reputation'] = offsetY('reputation') + 42
      console.log('mounted:', this.tabContents)
//      console.log('mounted:', document.getElementById('tabbar-in-details').offsetTop, document.getElementById('tabbar-in-details').scrollTop, document.getElementById('tabbar-in-details').clientTop)
    },
    methods: {
      onScroll() {
        let offsetY = scrollTop()
//        console.log(offsetY ,this.tabOffSetY)
        if (offsetY >= this.tabOffSetY) {
          this.tabPosition = {position: 'fixed', top: '28px'}
        } else {
          this.tabPosition = {position: "static", top: this.tabOffSetY + 'px'}
        }

        if (offsetY >= this.tabContents['intro'] && offsetY < this.tabContents['link_info']) {
          console.log('intro----')
          this.activedTabId = 'intro'
        } else if (offsetY >= this.tabContents['link_info'] && offsetY < this.tabContents['reputation']) {
          console.log('link_info----')
          this.activedTabId = 'link_info'
        } else if (offsetY >= this.tabContents['reputation']) {
          console.log('reputation----')
          this.activedTabId = 'reputation'
        }
      },
      srollToTab ({id}) {
        this.activedTabId = id
        let scrollToY = this.tabContents[id]
        if (id === 'intro') {
          // 第一个
          scrollToY += 28
        }
        document.body.scrollTop = document.documentElement.scrollTop  = scrollToY

      }
    },
    components: {
      Loading,
      Slider,
      Rate,
      Tabbar
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/page.styl'
  .breadcrumb
    li
      a
        font-size .875rem
  .slider-in-details
    margin 0 0 1rem 1rem
  .base-info
    padding .5rem 2rem
    p,.p
      label
        font-size .875rem
        width 7.5rem
      span
        font-size .875rem
        mg l, 1
      span.fee_range
        font-size 1.5rem
        color #ffad00
    .button.is-medium.is-striking
      background-color #ffad00
      color white
      cursor default
    .rate
      mg l, 1
  .tabbar-in-details
    mg t, .125
    width 100%
    background-color white
    z-index 999
  .tab-content
    height: 13rem
    padding .625rem
</style>