<template lang="pug">
  div
    headbar
    div.ua-page(:class="{'ua-page-hidden': visible}")
      nuxt
    footbar
</template>

<script>
  import Headbar from '~/components/user-admin/Header.vue'
  import Footbar from '~/components/user-admin/Footer.vue'
  import { uaPrefix } from '~/store/module-prefixs'
  export default {
    middleware: 'uaAuth',
    fetch () {
//      store.dispatch(`${uaPrefix}/token`, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsIm5hbWUiOiIxMjMiLCJpYXQiOjE1MDM1NTE5NTB9.ZKkD78Y_cFaOK_tlWhQwcM7FCzV5to5FrfxqYMGfunM')
    },
    watch: {
      $route: 'setStore'
    },
    computed: {
      visible () { return this.visibleHeader },
      visibleHeader () { return this.$store.state[uaPrefix].visibleHeader },
      visibleAffix () { return this.$store.state[uaPrefix].visibleAffix }
    },
    methods: {
      setStore () {
        if (this.visibleHeader) this.$store.commit(uaPrefix + '/toggle', 'visibleHeader')
        if (this.visibleAffix) this.$store.commit(uaPrefix + '/toggle', 'visibleAffix')
      }
    },
    components: {
      Headbar,
      Footbar
    }
  }
</script>

<style lang="stylus" scoped>
  .ua-page
    margin-bottom 3.75rem
    &-hidden
      display none
      @media (min-width: 992px)
        display block
</style>
