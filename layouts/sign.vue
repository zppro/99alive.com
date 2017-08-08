<template lang="pug">
  div
    topbar
    headbar
    nuxt
    footbar
</template>

<script>
  import Topbar from '~/components/SimpleTopbar.vue'
  import Headbar from '~/components/SimpleHeader.vue'
  import Footbar from '~/components/Footer.vue'
  export default {
    components: {
      Topbar,
      Headbar,
      Footbar
    }
  }
</script>

<style lang="stylus" scoped>
</style>
