<template lang="pug">
  nav.nav
    .container
      .nav-item(v-for="item in columns", :class="{'nav-item-active': isActive(item.path)}")
        nuxt-link(:to="item.path") {{item.name}}
</template>
<script>
  import { mapGetters } from 'vuex'
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
    height 60px
    background-color #fc7205
    .nav-item
      width 100px
      font-size 18px
      mg l r, 10
      a
        color white
    .nav-item-active
      background-color #ffad00
</style>