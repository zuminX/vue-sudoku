<template>
  <div class="actions">
    <div class="ui red cancel inverted button" @click="$emit('clickCancel')">
      <i class="remove icon"></i>取消
    </div>
    <div class="ui green ok inverted button" @click="$emit('clickCheck')">
      <i class="checkmark icon"></i>确认
    </div>
  </div>
</template>

<script>
export default {
  name: "OkOrCancelModalActions"
}
</script>
