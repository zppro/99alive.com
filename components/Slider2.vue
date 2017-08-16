<template lang="pug">
  .slider-container
      .huge
        transition(name="fade")
          figure.image.is-16by9(v-if="hugeShow")
            img(:src="currentSlider.img")
        .slider-index.has-text-centered.hfx-center {{sliderIndex + 1}} / {{sliderCount}}
      .level.slider-bar
        .level-left.slider-left-arrow
          .level-item.has-text-centered.hfx-center
            .sx-arrow-l
        .level-item.level.slider-items
          .level-item(v-for="item in showItems", :class="positionClass(item.id)")
            .slider-item.popover-up(v-show="isActive(item.id)")
              .arrow
              .popover-content
                figure.image.is-16by9
                  img(:src="item.img")
            .slider-item(v-show="!isActive(item.id)", @click="setActive(item.id)")
              figure.image.is-16by9
                img(:src="item.img")
        .level-right.slider-right-arrow
          .level-item
            .sx-arrow-r
</template>
<script>
  export default {
    data () {
      return {
        hugeShow: true,
        sliderIntervalId: null,
        currentSlider: {}
      }
    },
    computed: {
      showItems () {
        console.log('sliderIndex:',this.sliderIndex, this.sliderIds)
        let from = this.sliderIndex, to = from + this.showItemCount;
        if(to > this.sliderCount) {
          console.log('over-----------')
          to = this.sliderCount
          from = to - this.showItemCount
        }
        console.log('showItems:', from, ',', to)
        return this.sliderItems.slice(from, to)
      },
      sliderIndex () {
        return this.sliderIds.indexOf(this.currentSlider.id)
      },
      sliderCount () {
        return this.sliderItems.length
      },
      sliderIds () {
        return this.sliderItems.map(o => o.id)
      },
      sliderInterval () {
        return this.scrollInterval
      }
    },
    mounted () {
      this.currentSlider = this.sliderCount > 0 ? this.sliderItems[0] : {}
      if (this.canScroll === true) {
        this.sliderIntervalId = setInterval(() => {
          let index = this.sliderIndex
          index = index === this.sliderCount - 1 ? 0 : index + 1
          let nextId = this.sliderIds[index]
          console.log('--------------Slider-Scroll:', nextId)
          this.setActive(nextId)
        }, this.sliderInterval)
      }
    },
    beforeDestroy () {
      this.sliderIntervalId && clearInterval(this.sliderIntervalId)
    },
    props: {
      showItemCount:  {type: Number, default: 5},
      sliderItems: {type: Array, default: []},
      canScroll: {type: Boolean, default: false},
      scrollInterval: {type: Number, default: 3000}
    },
    methods: {
      positionClass (id) {
        if (this.sliderItems[0].id === id) {
          return 'left'
        } else if (this.sliderItems[this.sliderCount - 1].id === id) {
          return 'right'
        } else {
          return 'center'
        }
      },
      isActive (id) {
        return this.currentSlider.id === id
      },
      setActive (id) {
        this.hugeShow = false
        this.currentSlider = this.sliderItems.find(o => o.id === id) || {}
        this.$nextTick(()=>{
          this.hugeShow = true
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .slider-container
    .huge
      width 100%
      position relative
      .slider-index
        position absolute
        right 0
        bottom 0.2rem
        width 4.5rem
        height 1.5rem
        color white
        font-size 1rem
        background-color rgba(0, 0, 0, 0.3)
    .slider-bar
      width 100%
      .level-item
        align-self:stretch
    .slider-items
      cursor pointer
      background-color white
      .slider-left-arrow, .slider-right-arrow
      .slider-item
        margin-top: 11px
        width 100%
      .left
        pd r, 0.25
      .center
        pd l r, 0.25
      .right
        pd l, 0.25
  .fade-enter-active, .fade-leave-active
    transition opacity 1.5s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>