<template lang="pug">
  div 我的申请
</template>
<script>
  import { uaPrefix } from '~/store/module-prefixs'
  export default {
    layout: 'user-admin',
    async fetch ({store}) {
      await Promise.all([
        store.dispatch(`${uaPrefix}/fetchMyApplications`)
      ])
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/user-admin/index.styl'
</style>