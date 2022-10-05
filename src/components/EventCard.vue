<script setup lang="ts">
import type { EventInfo } from '@/interfaces/EventInfo'

const props = defineProps<{
  event: EventInfo
}>()
</script>
<template>
  <router-link
    :to="{ name: 'EventDetails', params: { id: event.id } }"
    class="event-card"
  >
    <!-- Display event data -->
    <span>@{{ props.event.time }} on {{ props.event.date }}</span>
    <h4>{{ props.event.title }}</h4>
  </router-link>
</template>
<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
