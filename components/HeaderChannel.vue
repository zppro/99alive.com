<template lang="pug">
  nav.channels.hfx-center-v
    .channel-item(v-for="item in channels", :class="{'channel-item-active': isActive(item.path)}")
      nuxt-link(:to="item.path") {{item.name}}
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
  .channels
    .channel-item
      font-size 0.875rem
      mg l r, 0.625
      a
        color #888
    .channel-item-active
      a
        color #fc7205
</style>