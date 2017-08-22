<template lang="pug">
  .dropdown
    .dropdown-title(:class="{'dropdown-title-mobile': show}", @click="show = !show") 更多
    ul.dropdown-list(:class="{ 'dropdown-list-visible': show }")
      li.dropdown-list-item(v-for="item in list")
        a.dropdown-list-item-link(:href="item.path", :target="item.target") {{ item.name }}
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  computed: {
    list () {
      return [
        {
          name: 'GitHub',
          path: 'https://github.com/nuxt',
          target: '_blank'
        },
        {
          name: 'Twitter',
          path: 'https://twitter.com/nuxt_js',
          target: '_blank'
        },
        {
          name: '聊天',
          path: 'https://gitter.im/nuxt/nuxt.js',
          target: '_blank'
        },
        {
          name: 'Vue.js',
          path: 'https://vuejs.org',
          target: '_blank'
        },
        {
          name: '工作机会',
          path: 'https://vuejobs.com/?ref=nuxtjs',
          target: '_blank'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  $border-color = #dbdfe1
  $arrow-border-color = #d9d9d9
  $text-color = #35495e
  $text-active-color = #41b883
  .dropdown
    width 100%
    display flex
    flex-direction column
    position relative
    @media (min-width: 991px)
      &:hover
        .dropdown-list
          display block
    &-title
      height 3.75rem
      width 100%
      display flex
      cursor pointer
      justify-content: center
      align-items center
      color $text-color
      font-size 1rem
      text-decoration none
      letter-spacing 0.25px
      @media (min-width: 991px)
        height 4.9375rem
        padding-right .9375rem
      &:after
        content " "
        width 0
        height 0
        top .125rem
        right -.625rem
        position relative
        border-right 6px solid transparent
        border-top 6px solid $text-color
        border-left 6px solid transparent
        @media (min-width: 991px)
          top 2.375rem
          right 0
          position absolute
      &:hover, &:focus
        color $text-active-color
        &:after
          border-top 6px solid $text-active-color
      &-mobile
        color $text-active-color
        &:after
          border-top 6px solid $text-active-color
        @media (min-width: 991px)
          color $text-color
          &:after
            border-top 6px solid $text-color
    &-list
      width 100%
      display none
      flex-wrap wrap
      position relative
      padding 0
      margin 0
      list-style none
      @media (min-width: 991px)
        min-width 100%
        position absolute
        background-color #fff
        border 1px solid $border-color
        border-top none
        top 100%
        right 0
        &::before
          display block
          position absolute
          content ""
          width: 14px
          height 14px
          background #fff
          z-index 2
          top -7px
          border-top 1px solid $arrow-border-color
          border-right 1px solid $arrow-border-color
          -webkit-transform rotate(-45deg)
          transform rotate(-45deg)
          border-radius 2px
          left 45%
      &-visible
        display flex
        @media (min-width: 991px)
          display none
      &-item
        width 100%
        display flex
        height 3.125rem
        border-top 1px solid $border-color
        &-link
          width 100%
          display flex
          color $text-color
          padding .75rem 0
          font-size .9375rem
          text-decoration none
          letter-spacing 0.25px
          align-items center
          justify-content center
          &:hover
            color $text-active-color
            transform scale(1.1)
</style>
