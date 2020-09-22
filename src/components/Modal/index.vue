<template>
  <div :id="modalId" class="ui modal">
    <slot name="header" />
    <slot />
    <slot name="actions" />
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    modalId: {
      type: String,
      required: true
    }
  }
}
</script>

