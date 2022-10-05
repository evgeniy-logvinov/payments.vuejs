<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (event: 'add-count', num: number): void
  (event: 'reset-count'): void
}>()
const isDisabled = ref(false)
</script>

<template>
  <p :class="{ disabledButton: isDisabled }">
    <button
      :class="[isDisabled ? 'disableButton' : '']"
      @click="emit('add-count', 1)"
    >
      Add
    </button>
    <button @click="emit('reset-count')">Reset</button>
  </p>
</template>
<style>
.disabledButton {
  background-color: red;
}
</style>
