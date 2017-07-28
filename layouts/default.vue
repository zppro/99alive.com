<template lang="pug">
  div
    topbar
    headbar
    channel-nav
    div
      nuxt
</template>

<script>
import Topbar from '~/components/Topbar.vue'
import Headbar from '~/components/Header.vue'
import ChannelNav from '~/components/ChannelNav.vue'

export default {
  components: {
    Topbar,
    Headbar,
    ChannelNav
  }
}
</script>

<style lang="stylus" scoped>
</style>
