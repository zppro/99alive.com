<template lang="pug">
  .loading.button.is-loading.w100(:class="sizeClass")
</template>
<script>
  export default {
    computed: {
      sizeClass () {
        console.log('this.size:', this.size)
        return this.size === 'small' || this.size === 'medium' || this.size === 'large' ? `is-${this.size}` : ''
      }
    },
    props: {
      size: {type: String}
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .loading
    border: none
</style>