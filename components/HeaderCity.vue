<template lang="pug">
  .city-choose.vfx-center
    .city-current.hfx-center-v {{currentCityName}}
    .city-choose-btn.hfx-center-v
      span(@click="openCityChooseDialog") 切换城市
    el-dialog(title="切换城市对话框", :visible.sync="dialogVisible", size="large")
      span 城市列表
      span(slot="footer" class="dialog-footer")
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        dialogVisible: false
      }
    },
    computed: {
      ...mapGetters(['currentCityName'])
    },
    methods: {
      ...mapActions(['switchCity']),
      openCityChooseDialog () {
        this.dialogVisible = true
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  text-color = #888
  .city-choose
    .city-current
      flex 1
      font-size 28px
    .city-choose-btn
      flex 1
      span
        color text-color
        bd a, text-color
        pd r l, 2
</style>