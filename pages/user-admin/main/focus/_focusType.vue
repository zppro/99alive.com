<template lang="pug">
  div {{focusType}}
</template>
<script>
  export default {
    layout: 'user-admin',
    validate ({ params }) {
      return params.focusType === 'tpa' || params.focusType === 'sfto' || params.focusType === 'care-man'
    },
    computed: {
      focusType () {
        return this.$route.params.focusType
      }
    },
    watch: {
      focusType: 'fetchData'
    },
    methods: {
      fetchData () {
        console.log('this.focusType', this.focusType)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/user-admin/index.styl'
</style>