<template lang="pug">
  .modal(:class="{'is-active': isActived}")
    .modal-background
    .modal-card
      header.modal-card-head
        p.modal-card-title title
        button.delete(aria-label="close")
      section.modal-card-body
        slot
      footer.modal-card-foot
        .button.is-success(@click="_confirm(true)") 保存
        .button(@click="_confirm(false)") 取消
</template>
<script>
  export default {
    data () {
      return {
        isActived: this.show
      }
    },
//    computed: {
//      isActived () {
//        return this.show
//      }
//    },
    props: {
      show: {type: Boolean, default: false}
    },
    methods: {
      _confirm (confirmed) {
        this.$emit('confirm-close', confirmed)
        this.isActived = false
      }
    }
  }
</script>
<style lang="stylus" scoped>
</style>