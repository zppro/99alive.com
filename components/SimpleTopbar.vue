<template lang="pug">
  .topbar.w100
    .mg-center.container.columns.hfx-center-v
      .column.is-three-quarters.hfx-center-v
        nav.channels.hfx-center-v
          .channel-item(v-for="item in channels", :class="{'channel-item-active': isActive(item.path)}")
            nuxt-link(:to="item.path") {{item.name}}
      .column
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['channels'])
    },
    methods: {
      isActive (channelPath) {
        return this.$route.path.startsWith(channelPath)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .topbar
    position fixed
    top 0
    left 0
    height 1.875rem
    z-index 999
    background-color #f1f1f1
    .channels
      .channel-item
        font-size 0.875rem
        mg l r, 1.25
        a
          color #888
      .channel-item-active
        a
          color #fc7205
</style>