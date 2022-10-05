<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import EventCounterBar from './EventCounterBar.vue'

// TS error Issue in volar
// interface Props {
//     limit: number;
//     alertMessageOnLimit?: string;
// }

// const props = withDefaults(defineProps<Props>(), { alertMessageOnLimit: 'default value' })

const props = withDefaults(
  defineProps<{
    limit: number
    alertMessageOnLimit?: string
  }>(),
  { alertMessageOnLimit: 'default value' }
)
// const props = defineProps<{
//     limit: number;
//     alertMessageOnLimit: string;
// }>()
// Bad version, but can be.
// const props = defineProps({
//     limit: { type: Number, require: true },
//     alertMessageOnLimit: { type: String, require: true },
// })

interface FetchCountCallback {
  // eslint-disable-next-line no-unused-vars
  (count: number): void
}

function addCount(num: number) {
  if (count.value !== null) {
    if (count.value >= props.limit) {
      alert(props.alertMessageOnLimit)
    } else {
      count.value += num
    }
  }
}

const nextCount = computed(() => {
  if (count.value !== null) {
    return count.value + 1
  }

  return null
})

const fetchCount = (cb: FetchCountCallback) => {
  cb(0)
}
const count = ref<number | null>(null)
onMounted(() => {
  fetchCount((initialCount) => {
    count.value = initialCount
  })
})
</script>

<template>
  <div>
    <p>{{ count }}</p>
    <p>{{ nextCount }}</p>
    <EventCounterBar
      @add-count="addCount"
      @reset-count="count = 0"
    ></EventCounterBar>
  </div>
</template>
