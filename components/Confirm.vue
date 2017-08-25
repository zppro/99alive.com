<template lang="pug">
  .modal(:class="{'is-active': isActived}")
    //.modal-background
    .modal-card.confirm-card
      header.modal-card-head
        p.modal-card-title.title.is-5.has-text-left {{text}}
      // button.delete(aria-label="close")
      // section.modal-card-body
      //  slot
      footer.confirm-footer.modal-card-foot
        .button.is-success(@click="_confirm(true)") {{okButtonText}}
        .button.is-pulled-right(@click="_confirm(false)") {{cancelButtonText}}
</template>
<script>
  export default {
//    data () {
//      return {
//        isActived: this.show
//      }
//    },
    computed: {
      isActived () {
        return this.show
      }
    },
    props: {
      show: {type: Boolean, default: false},
      text: {type: String, default: '确定要执行当前操作?'},
      cancelButtonText: {type: String, default: '取消'},
      okButtonText: {type: String, default: '确定'}
    },
    methods: {
      _confirm (confirmed) {
        this.$emit('confirm-close', confirmed)
//        this.isActived = false
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/util.styl'
  .confirm-card
    width 20rem
    margin-bottom 30vh
    header
      border-bottom none
      padding .875rem
    footer
      padding .625rem
    .confirm-footer
      justify-content flex-end
</style>