<template lang="pug">
  div
    topbar
    headbar
    .container.nuxt-page-wrapper.common-nav-container
      common-nav
      nuxt
    footbar
</template>

<script>
import Topbar from '~/components/Topbar.vue'
import Headbar from '~/components/Header.vue'
import CommonNav from '~/components/CommonNav.vue'
import Footbar from '~/components/Footer.vue'
export default {
  components: {
    Topbar,
    Headbar,
    CommonNav,
    Footbar
  }
}
</script>

<style lang="stylus" scoped>
</style>
