<template>
  <div class="ui modal" :id="modalId">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="actions"></slot>
  </div>
</template>

<script>
  export default {
    name: "Modal",
    props: {
      modalId: {
        type: String,
        required: true
      }
    }
  }
</script>

