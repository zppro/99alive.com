<template lang="pug">
  .slider-container
      .huge
        figure.image.is-2by1
          img(:src="currentSlider.img")
        .slider-items.level
          .level-item(v-for="item in sliderItems", :class="positionClass(item.id)")
            .slider-item.popover-up(v-if="isActive(item.id)")
              .arrow
              .popover-content
                figure.image.is-2by1
                  img(:src="item.img")
            .slider-item(v-if="!isActive(item.id)", @click="setActive(item.id)")
              figure.image.is-2by1
                img(:src="item.img")

</template>
<script>
  export default {
    data () {
      return {
        currentSlider: {}
      }
    },
    computed: {
      sliderCount () {
        return this.sliderItems.length
      }
    },
    mounted () {
      this.currentSlider = this.sliderCount > 0 ? this.sliderItems[0] : {}
    },
    props: ['sliderItems'],
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
        this.currentSlider = this.sliderItems.find(o => o.id === id) || {}
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .slider-container
    position relative
    .huge
      width 100%
    .slider-items
      cursor pointer
      width 100%
      position absolute
      left 0
      bottom 0
      background-color white
      .slider-item
        margin-top: 11px
        width 100%
      .left
        pd r, 0.25
      .center
        pd l r, 0.25
      .right
        pd l, 0.25
</style>