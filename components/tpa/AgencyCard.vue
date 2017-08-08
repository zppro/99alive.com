<template lang="pug">
  nuxt-link.agency-card(:to="detailsUrl")
    .card.agency
      .card-image
        figure.image.is-2by1
          img(:src="agency.img")
      .card-content
        p.agency-name.title.is-6 {{agency.name}}
        p.agency-charge-interval 收费区间: {{agency.charge_interval}}
        p.agency-bed-nums
          |入住人数:
          span.bed-nums-value {{agency.bed_nums}}
          |人
</template>
<script>
  export default {
    computed: {
      detailsUrl () {
        return `/tpa/details/${this.agency.id}`
      }
    },
    props: {
      agency: {type: Object, default: {}}
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .agency-card
    display inline-block
    width 25%
    padding .5rem
    .card-content
      padding .5rem 1rem
      .agency-bed-nums
        font-size 0.875rem
        .bed-nums-value
          font-size 1.375rem
          color #ffad00
</style>