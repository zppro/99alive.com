<template lang="pug">
  .ua-category
    affix(:list="menu", category="main")
    .ua-category-content.ua-content.ua-content-hasCarbon(:class="{'category-content-hidden': visible}")
      nuxt-child
</template>
<script>
  import { uaPrefix } from '~/store/module-prefixs'
  import Affix from '~/components/user-admin/Affix.vue'

  export default {
    layout: 'user-admin',
    computed: {
      visible () { return this.$store.state[uaPrefix].visibleAffix },
      menu () { return this.$store.state[uaPrefix].menus.main }
    },
    components: {
      Affix
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/user-admin/index.styl'
</style>