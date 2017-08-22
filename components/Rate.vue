<template lang="pug">
  .rate.mg-0.pd-0.inline-block.hfx-center-v(:class="classes", @mouseleave="handleMouseleave")
    .rate-star.mg-0.pd-0.inline-block(v-for="item in count", :class="starCls(item)", @mousemove="handleMousemove(item, $event)", @click="handleClick(item)")
      span.rate-star-content(type="half")
    .rate-text.inline-block.hfx-center-v(v-if="showText" v-show="currentValue > 0")
      slot
        span {{currentValue}}星
</template>
<script>
  export default {
    data () {
      return {
        hoverIndex: -1,
        isHover: false,
        isHalf: false,
        currentValue: this.value
      }
    },
    computed: {
      classes () {
        return [
          {
            [`rate-disabled`]: this.disabled
          }
        ]
      }
    },
    props: {
      count: {type: Number, default: 5},
      value: {type: Number, default: 0},
      allowHalf: {type: Boolean, default: false},
      disabled: {type: Boolean, default: false},
      showText: {type: Boolean, default: false}
    },
    watch: {
      value (val) {
        this.currentValue = val
      },
      currentValue (val) {
        this.setHalf(val)
      }
    },
    methods: {
      starCls (value) {
        const hoverIndex = this.hoverIndex
        const currentIndex = this.isHover ? hoverIndex : this.currentValue
        let full = false, isLast = false
        if (currentIndex >= value) full = true
        if (this.isHover) {
          isLast = currentIndex === value
        } else {
          isLast = Math.ceil(this.currentValue) === value
        }
        return [
          {
            [`rate-star-full`]: (!isLast && full) || (isLast && !this.isHalf),
            [`rate-star-half`]: isLast && this.isHalf,
            [`rate-star-zero`]: !full
          }
        ]
      },
      handleMousemove(value, event) {
        if (this.disabled) return
        this.isHover = true
        if (this.allowHalf) {
          const type = event.target.getAttribute('type') || false
          this.isHalf = type === 'half'
        } else {
          this.isHalf = false
        }
        this.hoverIndex = value
      },
      handleMouseleave () {
        if (this.disabled) return
        this.isHover = false
        this.setHalf(this.currentValue)
        this.hoverIndex = -1
      },
      setHalf (val) {
        this.isHalf = val.toString().indexOf('.') >= 0
      },
      handleClick (value) {
        if (this.disabled) return
//                 value++;
        if (this.isHalf) value -= 0.5
        this.currentValue = value
        this.$emit('input', value)
        this.$emit('on-change', value)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  $rate-star-color = #f5a623
  .rate
    font-size 1.25rem
    font-weight normal
    font-style normal
    &-disabled &-star
      &:before, &-content:before
        cursor default
      &:hover
        transform scale(1)
    &-star
      position relative
      font-family 'iconfont'
      transition all 0.3s ease
      &:hover
        transform scale(1.1)
      &:before, &-content:before
        color #e9e9e9
        cursor pointer
        content "\e673"
        transition all .2s ease-in-out
        display block
      &-content
        position absolute
        left 0
        top 0
        width 50%
        height 100%
        overflow hidden
        &:before
          color transparent
      &-half &-content:before, &-full:before
        color $rate-star-color

      &-half:hover &-content:before, &-full:hover:before
        color lighten($rate-star-color, 20%)
    &-text
      mg l, .5
      font-size .875rem
</style>