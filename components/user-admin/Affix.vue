<template lang="pug">
  nav.affix(:class="{'affix-hidden': !visible}")
    .affix-toggler(:class="{'affix-toggler-hidden': visible}", @click="toggle")
      i.fa.fa-bars.icon
    h2.affix-h
      .affix-h-title 欢迎您,{{user.name}}
      .affix-h-toggler(@click="toggle")
        i.fa.fa-close
    template(v-for="group in list")
      h3.affix-title {{ group.title }}
      ul.affix-list
        li.affix-list-item(v-for="link in group.links")
          nuxt-link.affix-list-item-link(:class="{'nuxt-link-active': path === menu + link.to}", :to="menu + link.to" exact) {{ link.name }}
          ul.affix-list-item-contents(v-if="path === menu + link.to")
            li.affix-list-item-contents-item(v-for="(content, index) in link.contents" )
              a.affix-list-item-contents-item-link(:href="menu + link.to + content.to", @click.prevent="scrollTo(content.to)", :class="{'affix-list-item-contents-item-link-active': current === index}") {{ content.name }}
</template>

<script>
  import { mapGetters } from 'vuex'
  import throttle from 'lodash.throttle'
  import { uaPrefix } from '~/store/module-prefixs'
  import { bodyHeight, scrollTop } from '~/assets/js/utils'

  export default {
    props: {
      list: {
        type: Array,
        required: true
      },
      category: {
        type: String,
        required: true
      }
    },
    mounted () {
      this.$nextTick(() => {
        window.addEventListener('scroll', throttle(() => this.scrolled(), 100))
        if (this.hashLength) {
          this.scrollTo(this.hash)
        }
        this.scrolled()
      })
    },
    data () {
      return {current: 0, setInter: null}
    },
    computed: {
      hash () {
        return this.$route.hash
      },
      hashLength () {
        return this.hash.length
      },
      visible () {
        return this.$store.state[uaPrefix].visibleAffix
      },
      path () {
        return this.$route.path.slice(-1) === '/' ? this.$route.path.slice(0, -1) : this.$route.path
      },
      menu () {
        return '/user-admin/' + this.category
      },
      contents () {
        let c = []
        this.list.forEach(group => {
          if (group.links && !c.length) {
            let l = group.links.find( link => this.path === this.menu + link.to)
            if (l && l.contents) {
              l.contents.forEach(content => {
                const el = document.getElementById(content.to.slice(1))
                if (el) {
                  c.push(el.offsetTop)
                }
              })
            }
          }
        })
        return c
      },
      ...mapGetters({
        user: `${uaPrefix}/user`
      })
    },
    watch: {
      '$route.fullPath': 'hashChanged'
    },
    methods: {
      hashChanged (toPath, fromPath) {
        toPath = toPath.split('#')
        fromPath = fromPath.split('#')
        if (toPath[0] !== fromPath[0] && this.hashLength) {
          this.$nextTick(() => this.scrollTo(this.$route.hash))
        }
      },
      toggle () {
        this.$store.commit(uaPrefix + '/toggle', 'visibleAffix')
      },
      scrolled () {
        let h = bodyHeight(),
          doc = document.documentElement,
          top = scrollTop() - (doc.clientTop || 0),
          el = this.contents.find((pos) => {
            return pos > top + (h / 2)
          })
        this.current = (el ? this.contents.indexOf(el) : this.contents.length) - 1
      },
      scrollTo (id) {
        if (this.visible) {
          this.toggle()
        }
        if (id !== this.hash) {
          this.$router.push(this.$route.fullPath.split('#')[0] + id)
        }
        this.$nextTick(() => {
          const el = document.getElementById(id.slice(1))
          if (!el) return
          let to = el.offsetTop - 25,
            doc = document.documentElement,
            top = scrollTop() - (doc.clientTop || 0),
            diff = (to > top ? to - top : top - to) / 25,
            i = 0
          window.clearInterval(this.setInter)
          this.setInter = window.setInterval(() => {
            top = (to > top) ? top + diff : top - diff
            window.scrollTo(0, top)
            i++
            if (i === 25) {
              window.clearInterval(this.setInter)
            }
          }, 10)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  $border-color = #dbdfe1
  $toggler-border-color = rgba(53, 73, 94, 0.70)
  $affix-text-color = #35495e
  .affix
    width 100%
    top 3.75rem
    left 0
    bottom 0
    position fixed
    padding 15px
    overflow-y auto
    background-color #fff
    z-index 990
    @media (min-width: 992px)
      top 5rem
      width 13.6875rem
      padding 1.25rem 1.875rem
      border-right 1px solid $border-color
    &-hidden
      left: -100%
      overflow-y visible
      @media (min-width: 992px)
        overflow-y auto
        left 0
    &-toggler
      background-color $toggler-border-color
      width 1.125rem
      height 1.875rem
      position fixed
      top 4.6875rem
      right 1.25rem
      z-index 980
      cursor pointer
      .icon
        color: #fff;
        padding-top: .3125rem
        margin-left: -.1875rem
      &:before, &:after
        content " "
        width 0
        height 0
        top 0
        position absolute
      &:before
        border-right .625rem solid
        border-top .9375rem solid transparent
        border-bottom .9375rem solid transparent
        left -.625rem
        border-right-color $toggler-border-color
      &:after
        border-left .625rem solid
        border-top .9375rem solid transparent
        border-bottom .9375rem solid transparent
        right -.625rem
        border-left-color $toggler-border-color
      &-hidden
        display none
      @media (min-width: 992px)
        display: none
    &-h
      position relative
      font-size .9375rem
      font-weight 400
      color $affix-text-color
      margin 0;
      padding .625rem 0
      /*text-transform uppercase*/
      letter-spacing 1px
      &-title
        font-size: .75rem
        font-style italic
        letter-spacing 3px
      &-toggler
        width 1.5625rem
        height 1.375rem
        cursor pointer
        display block
        float right
        @media (min-width: 992px)
          display none
    &-title
      margin .625rem 0
      // margin-top 1.875rem
      text-transform uppercase
      color #9aabb1
      font-weight 400
      font-size .9375rem
      letter-spacing 1px
    &-list
      list-style none
      margin 0
      margin-bottom 1.25rem
      padding 0
      &-item
        padding .125rem 0
        &-link
          display block
          font-size 1rem
          text-decoration none
          color $affix-text-color
          padding .125rem .375rem
          border-radius .25rem
          letter-spacing 0.25px
          &:hover
            color #111
            background-color #eee
        .nuxt-link-active
          color #fff
          background-color #41b883
        &-contents
          margin 0
          padding 0
          padding-top .1875rem
          padding-left 1.25rem
          list-style none
          &-item
            position relative
            padding .125rem 0
            &:before
              content " "
              width 0
              height 0
              top .5rem
              left -.8125rem
              position absolute
              border-left 5px solid #DBDFE1
              border-top 5px solid transparent
              border-bottom 5px solid transparent
            &-link
              display block
              font-size .875rem
              color lighten($affix-text-color, 5%)
              text-decoration none
              letter-spacing 0.25px
              &:hover, &--active
                color #41b883
</style>
