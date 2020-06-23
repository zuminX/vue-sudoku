<template>
  <div class="actions">
    <div @click="$emit('clickCancel')" class="ui red cancel inverted button">
      <i class="remove icon"></i>取消
    </div>
    <div @click="$emit('clickCheck')" class="ui green ok inverted button">
      <i class="checkmark icon"></i>确认
    </div>
  </div>
</template>

<script>
  export default {
    name: "OkOrCancelModalActions"
  }
</script>
