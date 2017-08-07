<template lang="pug">
  div
    topbar
    headbar
    channel-nav
    .container
      nuxt
    footbar
</template>

<script>
import Topbar from '~/components/Topbar.vue'
import Headbar from '~/components/Header.vue'
import ChannelNav from '~/components/ChannelNav.vue'
import Footbar from '~/components/Footer.vue'
export default {
  components: {
    Topbar,
    Headbar,
    ChannelNav,
    Footbar
  }
}
</script>

<style lang="stylus" scoped>
</style>
