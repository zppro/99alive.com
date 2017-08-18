<template lang="pug">
  .lang
    .lang-current(@click="show = !show")
      .flag(:class="flag")
    ul.lang-list(:class="{ 'lang-list-visible': show }")
      li.lang-list-item(v-for="lang in langs" v-if="lang.iso !== $store.state.lang.iso")
        a.flag(:class="lang.class", :href="lang.url + $route.path")
</template>

<script>
export default {
  data () {
    return { show: false }
  },
  computed: {
    flag () { return 'flag-' + this.$store.state.lang.iso },
    langs () {
      return [
        { iso: 'en', class: 'flag-en', url: 'https://nuxtjs.org' },
        { iso: 'ja', class: 'flag-ja', url: 'https://ja.nuxtjs.org' },
        { iso: 'ko', class: 'flag-ko', url: 'https://ko.nuxtjs.org' },
        { iso: 'ru', class: 'flag-ru', url: 'https://ru.nuxtjs.org' },
        { iso: 'zh', class: 'flag-zh', url: 'https://zh.nuxtjs.org' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  $border-color = #dbdfe1
  .lang
    width 100%
    display flex
    flex-direction column
    @media (min-width: 991px)
      &:hover
        .lang-list
          display flex
    &-current
      height 3.75rem
      display flex
      cursor pointer
      align-items center
      justify-content center
      border-bottom 1px solid $border-color
      @media (min-width: 991px)
        padding 0
        height 4.9375rem
        border-bottom none
    &-list
      display none
      flex-direction column
      list-style none
      margin 0
      padding 0
      @media (min-width: 991px)
        width 5.125rem
        position absolute
        top 100%
        left -1px
        background-color #fff
        border-top 1px solid $border-color
        border-left 1px solid $border-color
        border-right 1px solid $border-color
      &-visible
        display flex
        @media (min-width: 991px)
          display none
      &-item
        height 60px
        display flex
        align-items center
        justify-content center
        border-bottom 1px solid $border-color
</style>
