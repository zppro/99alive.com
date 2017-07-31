<template lang="pug">
  .city-choose.vfx-center
    .city-current.hfx-center-v {{currentCityName}}
    .city-choose-btn.hfx-center-v
      a(@click="openDialog") 切换城市
    .modal(:class="{'is-active': dialogVisible}")
      .modal-background(@click="closeDialog")
      .modal-content.cities.container
        section.search-bar.columns.hfx-center-v
          label.column.is-2.hfx-center 按省份选择:
          .section-content.column
        section.hot.columns
          label.column.is-2.hfx-center 热门城市:
          ul.section-content.column.hfx-center-v
            li.city-item(v-for="city in hotCities", @click="switchCity(city._id).then(closeDialog)") {{city.name}}
        section.history.columns
          label.column.is-2.hfx-center 最近访问:
          .section-content.column
        section.alphabet
          ul
            li
              .popover
                .arrow
                .popover-content.hfx-center 按首字母排列
            li.by-first-letter.columns.hfx-center-v(v-for="(cities, key) in groupedCities")
              .column.is-1.hfx-center
                .first-letter.hfx-center {{key}}
              ul.column.hfx-center-v
                li.city-item(v-for="city in cities", @click="switchCity(city._id).then(closeDialog)") {{city.name}}
      button.modal-close.is-large(@click="closeDialog")
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
      ...mapGetters(['currentCityName', 'hotCities', 'groupedCities'])
    },
    methods: {
      ...mapActions(['switchCity']),
      openDialog () {
        this.dialogVisible = true
      },
      closeDialog () {
        this.dialogVisible = false
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  @import '~assets/stylus/components.styl'
  text-color = #888
  grey-bg = #f4f4f4
  .city-choose
    .city-current
      flex 1
      font-size 1.75rem
    .city-choose-btn
      flex 1
      a
        color text-color
        bd a, text-color
        pd r l, 0.125
  .cities
    background-color white
    width 50%
    height 80%
    min-height 30rem
    section
      bd t #ddd
      label
        font-size 1rem
        font-weight bolder
      .section-content
        flex: 1
    .search-bar
      height 3.75rem
      background-color grey-bg
    .hot, .history
      height 2.5rem
      max-height 5rem
    section.alphabet
      height 10rem
      padding 0.625rem
      .popover
        .arrow
          left 10%
      .by-first-letter
        padding 0.25rem
        .first-letter
          width 2.4rem
          height 2.4rem
          font-size 1.5rem
          background-color grey-bg
        &:hover
          background-color grey-bg
          bd l r, #EAEAEA
          .first-letter
            background-color rgba(252, 114, 5, 1)
            color white
  .city-item
    mg l r, 0.25
    cursor pointer
    color text-color
</style>