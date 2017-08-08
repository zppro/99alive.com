<template lang="pug">
  .card.search-box
    .card-content.search-dimension(v-for="dimension in searchDimensions", :class="{'multi-search-dimension': isInMultiSelect(dimension.key)}")
      .columns
        .column.is-1
          label.hfx-center-v {{dimension.name}}
        .column
          template(v-if="isInMultiSelect(dimension.key)")
            .search-dimension-content.is-clearfix
              .search-dimension-item.value-multi.hfx-center-v(v-for="(item, key) in dimension.value", :key="key")
                label.checkbox.hfx-center-v
                  input(:value="key", type="checkbox", v-model="multiSelect[dimension.key].values")
                  | {{item.name}}
                //.checkbox
                  input(:id="dimension.key + '-' + key", :value="key", type="checkbox", v-model="multiSelect[dimension.key].values")
                //label(:for="dimension.key + '-' + key") {{item.name}}
            .is-in-multi-select.search-multi-action.has-text-centered(v-if="isInMultiSelect(dimension.key)")
              a.button.is-small(@click="confirmMulti(dimension.key)") 确定
              a.button.is-small(@click="cancelMulti(dimension.key)") 取消
          template(v-else)
            .search-dimension-content
              nuxt-link.search-dimension-item.value-single.hfx-center-v(:class="{'active': isActive(dimension.key)}", :to="queryUrl(dimension.key)") 不限
              nuxt-link.search-dimension-item.value-single.hfx-center-v(v-for="(item, key) in dimension.value", :key="key", :to="queryUrl(dimension.key, key)", :class="{'active': isActive(dimension.key, key)}")
                | {{item.name}}
        .column.is-1.has-text-right.search-multi-action(v-if="isMulti(dimension.key)")
          a.button.is-small(v-if="!isInMultiSelect(dimension.key)", @click="enterMulti(dimension.key)") +多选

</template>
<script>
  import { isString } from '~/assets/js/utils'
  export default {
    data () {
      let multiSelect = {}
      let arrQuery = JSON.parse(this.queryString)
      this.multiCheckDimensionIds.reduce((m, id) => {
        const findIndex = arrQuery.findIndex((o, idx) => {
          return idx % 2 === 0 && o === id
        })
        let values = []
        if (findIndex !== -1) {
          values = arrQuery[findIndex + 1]
          if (isString(values)) {
            values = [values]
          }
        }
        m[id] = {mode: 'off', values }
        return m
      }, multiSelect)
      return {
        multiSelect
      }
    },
    computed: {
      queryArray () {
        return JSON.parse(this.queryString)
      },
      queryObject () {
        let q = {}
        let arrQuery = this.queryArray
        for (let i = 0, len = arrQuery.length; i < len; i=i+2) {
          q[arrQuery[i]] = arrQuery[i + 1]
        }
        return q
      }
    },
    props: {
      searchDimensions: {type: Array, default: []},
      multiCheckDimensionIds: {type: Array, default: []},
      queryString: {type: String, default: '[]'}
    },
    methods: {
      queryUrl (dimentionKey, value) {
        let newQueryArray = Array.from(this.queryArray)
        let indexOfDimension = newQueryArray.findIndex( (o, idx) => {
          return idx % 2 === 0 && o === dimentionKey
        })
        if (value) {
          if (indexOfDimension !== -1) {
            newQueryArray[indexOfDimension+1] = value
          } else {
            newQueryArray.push(dimentionKey, value)
          }
        } else {
          if (indexOfDimension !== -1) {
            newQueryArray.splice(indexOfDimension, 2)
          }
        }
        const arrQueryString = JSON.stringify(newQueryArray)
        return newQueryArray.length > 0 ? `/tpa/query/${arrQueryString}` : '/tpa/query'
      },
      isMulti (dimentionKey) {
        return this.multiCheckDimensionIds.includes(dimentionKey)
      },
      isActive (dimentionKey, value) {
        let queryDimention = this.queryObject[dimentionKey]
        if(value) {
          if(Array.isArray(queryDimention)){
            return queryDimention.includes(value)
          } else if (isString(queryDimention)) {
            return queryDimention === value
          }
        } else {
          return !queryDimention
        }
        return false
      },
      isInMultiSelect (dimentionKey) {
        return this.multiSelect[dimentionKey] && this.multiSelect[dimentionKey].mode === 'on'
      },
      enterMulti (dimentionKey) {
        let keys = Object.keys(this.multiSelect)
        if (keys.includes(dimentionKey)) {
          for(let key of keys) {
            this.multiSelect[key].mode = 'off'
          }
          this.multiSelect[dimentionKey].mode = 'on'
        }
      },
      cancelMulti (dimentionKey) {
        let keys = Object.keys(this.multiSelect)
        if (keys.includes(dimentionKey)) {
          this.multiSelect[dimentionKey].mode = 'off'
        }
      },
      confirmMulti (dimentionKey) {
        let keys = Object.keys(this.queryObject)
        let newQueryArray = []
        if (!keys.includes(dimentionKey)) {
          newQueryArray.push(dimentionKey, this.multiSelect[dimentionKey].values)
        }
        for (let key of keys) {
          if (key === dimentionKey) {
            console.log('---->', key, this.multiSelect[key].values)
            newQueryArray.push(key, this.multiSelect[key].values)
          } else {
            console.log('---->', key, this.queryObject[key])
            newQueryArray.push(key, this.queryObject[key])
          }
        }

        const arrQueryString = JSON.stringify(newQueryArray)
        const queryUrl =  `/tpa/query/${arrQueryString}`
        console.log(queryUrl)
        this.$router.push(queryUrl)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .search-box
    min-height 18.25rem
    padding .625rem 1.25rem
    pd t, 0
    label
      font-size 1rem
      color #333
      width 100%
    .search-dimension
      padding .8rem
      mg t, .5rem
      .search-dimension-content
        .search-dimension-item
          height: 1.5rem
          mg r, .5rem
          padding .8rem .5rem
          float left
          color #666
          font-size 0.875rem
        .value-single
          bd a, #ccc
        .value-single:hover, .active
          color white
          background-color #fc7205
          bd a, #fc7205
        .value-multi
          border none
      .is-in-multi-select
        padding .8rem
        .button
          mg r, .5rem
    .multi-search-dimension
      bd a, #fc7205, 2
</style>