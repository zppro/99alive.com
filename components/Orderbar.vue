<template lang="pug">
  .orderbar-container.level
    .level-left
      template(v-for="(item, index) in orderItems")
        .level-item(v-if="index > 0") |
        .order-item.level-item(:class="{ 'order-item-active': isActive(item.id)}", @click="setActive(item.id)") {{item.name}}
</template>
<script>
  export default {
    data () {
      return {
        currentOrder: {}
      }
    },
    computed: {
      orderCount () {
        return this.orderItems.length
      }
    },
    mounted () {
      this.orderCount > 0 && this.setActive(this.orderItems[0].id)
    },
    props: {
      orderItems: {type: Array, default: []}
    },
    methods: {
      isActive (id) {
        return this.currentOrder.id === id
      },
      setActive (id) {
        if (!this.isActive(id)) {
          this.currentOrder = this.orderItems.find(o => o.id === id) || {}
          this.currentOrder.id && this.$emit('order-change', this.currentOrder)
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .orderbar-container
    font-size .875rem
    padding .5rem 0
    bd b, #ccc
    .order-item
      color #333
      cursor pointer
    .order-item:hover, .order-item-active
      color #ffad00
</style>