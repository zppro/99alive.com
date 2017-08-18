<template lang="pug">
  .search
    input#algolia.search-input(type="text" name="search", placeholder="搜索")
</template>

<script>
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  $border-color = #dbdfe1
  .search
    width 100%
    height 100%
    position relative
    &-input
      width 100%
      display block
      border none
      font-weight 400
      height 100%
      color #35495e
      font-size 1rem
      padding 0 .9375rem
      letter-spacing 0.5px
      background-color #fff
      @media (min-width: 991px)
        padding 0 30px
        border-left 1px solid $border-color
        border-right 1px solid $border-color
        &:focus, &:visited, &:active
          border-left 1px solid $border-color
          border-right 1px solid $border-color
</style>
