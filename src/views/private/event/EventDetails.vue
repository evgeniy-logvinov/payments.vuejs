<script setup lang="ts">
import type { EventInfo } from '@/interfaces/EventInfo'

const props = defineProps<{ event: EventInfo }>()
</script>

<template>
  <p>
    {{ props.event.time }} on {{ props.event.date }} @
    {{ props.event.location }}
  </p>
  <p>{{ props.event.description }}</p>
</template>
