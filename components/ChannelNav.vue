<template lang="pug">
  nav.nav.w100
    .container
      .nav-item(v-for="item in columns", :class="{'nav-item-active': isActive(item.path)}")
        nuxt-link(:to="item.path") {{item.name}}
</template>
<script>
  export default {
    computed: {
      columns () {
        let channelId = this.$store.getters.currentChannelId
        return this.$store.getters[`${channelId}/columns`]
      }
    },
    methods: {
      isActive (columnPath) {
        return this.$route.path.endsWith(columnPath)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .nav
    height 3.75rem
    background-color #fc7205
    .nav-item
      width 6.25rem
      font-size 1.125rem
      pd l r, 0.625rem
      a
        color white
    .nav-item-active
      background-color #ffad00
</style>