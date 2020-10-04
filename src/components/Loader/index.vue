<template>
  <div :id="loaderId">
    <div class="ui inverted dimmer">
      <div class="ui text loader">加载中</div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    loaderId: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    show() {
      this.changeItemListDimmer()
    }
  },
  methods: {
    /**
       * 改变列表项的调光器的显示状态
       */
    changeItemListDimmer() {
      $(`#${this.loaderId}`).dimmer(this.show ? 'show' : 'hide')
    }
  }
}
</script>

<style scoped>

</style>
