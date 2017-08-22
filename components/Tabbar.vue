<template lang="pug">
  .tabbar-container
    .tabs
      ul
        li(v-for="item in tabItems", :class="{ 'is-active': isActive(item.id)}")
          a(@click="setActive(item.id)") {{item.name}}
    slot(:tab-id="currentTab.id", :data="currentTab.data")
</template>
<script>
  export default {
    data () {
      return {
        currentTab: {}
      }
    },
    computed: {
      tabCount () {
        return this.tabItems.length
      }
    },
    mounted () {
      if (this.activedTabId) {
        this.setActive(this.activedTabId)
      } else {
        this.tabCount > 0 && this.setActive(this.tabItems[0].id)
      }
    },
    props: {
      tabItems: {type: Array, default: []},
      activedTabId: {type: String},
    },
    watch: {
      activedTabId (val, oldVal) {
//        console.log('activedTabId:', val, oldVal)
        if(oldVal && val != oldVal) {
          this.setActive(val, true)
        }
      }
    },
    methods: {
      isActive (id) {
        return this.currentTab.id === id
      },
      setActive (id, forbidEmitEvent) {
        this.currentTab = this.tabItems.find(o => o.id === id) || {}
        !forbidEmitEvent && this.currentTab.id && this.$emit('tab-item-active', this.currentTab)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .tabbar-container
    li
      a
        font-size 1rem
        color #333
      a:hover
        bd b, #ffad00
      &.is-active
        a
          color #ffad00
          bd b, #ffad00, 2
    .tabs:not(:last-child)
      mg b, 0
</style>