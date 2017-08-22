<template lang="pug">
  footer.ua-footer(:class="{'ua-footer-fixed': isFooterFixed}")
    //.ua-footer-links.footer-block Links
    .ua-footer-author.footer-block &copyright 2017 {{siteName}} 版权所有
</template>
<script>
  import throttle from 'lodash.throttle'
  import { mapGetters } from 'vuex'
  import { bodyHeight, scrollTop, offsetY, isScrollBarY } from '~/assets/js/utils'
  export default {
    data () {
      return {
        isFooterFixed: false
      }
    },
    computed: {
      ...mapGetters(['siteName'])
    },
    mounted () {
//      console.log('isScrollY=>', isScrollBarY())
      this.isFooterFixed = !isScrollBarY()
//      window.addEventListener('resize', throttle(this.onResize, 70))
    }
  }
</script>
<style lang="stylus" scoped>
  $bg-link-color = #f1f1f1
  $link-color = #9aabb1
  .ua-footer
    background-color $bg-link-color
    width 100%
    display: block;
    @media (min-width: 992px)
    {
      display: none;
    }
    &-fixed
      position fixed
      bottom 0
      z-index 9999
    &-block
      padding: 0 .9375rem
      @media (min-width: 992px)
        padding: 0 1.875rem
      &:after
        content ""
        display table
        clear both
    &-links
      text-align center
      color #eee
      padding .9375rem
      letter-spacing 0.5px
    &-author
      width 100%
      margin 0
      font-size .875rem
      text-align center
      padding .9375rem
      color $link-color
      letter-spacing 0.5px
      font-weight 400
      a
        color $link-color
        &:hover
          color #41b883
</style>
