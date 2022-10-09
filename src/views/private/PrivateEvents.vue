<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue'
import type { EventInfo } from '../../interfaces/EventInfo'
import EventService from '@/services/EventService'
import EventCard from '../../components/EventCard.vue'

const events = ref<EventInfo[]>([])
const props = withDefaults(defineProps<{ page?: string | number }>(), {
  page: 1
})

const currentPage = computed((): number => {
  return typeof props.page === 'string' ? parseInt(props.page) : props.page
})
const perPage = ref(1)
const totalEvents = ref(0)
const hasNextPage = computed((): boolean => {
  // First, calculate total pages
  const totalPages = Math.ceil(totalEvents.value / perPage.value) // 2 is events per page

  // Then check to see if the current page is less than the total pages.
  return currentPage.value < totalPages
})
// onMounted(async () => {
//   const response = await EventService.getEvents(2, currentPage.value)
//   events.value = response.data
//   totalEvents.value = parseInt(response.headers['x-total-count'])
// })

watchEffect(() => {
  events.value = []
  EventService.getEvents(perPage.value, currentPage.value)
    .then((response) => {
      events.value = response.data
      totalEvents.value = parseInt(response.headers['x-total-count'])
    })
    .catch((error) => {
      console.log(error)
    })
})
// limit page
</script>
<template>
  <el-container>
    <el-row class="w-full my-4"
      ><el-col>
        <el-card>
          <div class="events">
            <h1>Events for good</h1>
            <EventCard
              v-for="event in events"
              :key="event.id"
              :event="event"
            ></EventCard>
            <div class="pagination">
              <router-link
                id="page-prev"
                :to="{ name: 'Events', query: { page: currentPage - 1 } }"
                rel="prev"
                v-if="page != 1"
                >Prev Page</router-link
              >

              <router-link
                id="page-next"
                :to="{ name: 'Events', query: { page: currentPage + 1 } }"
                rel="next"
                v-if="hasNextPage"
                >Next Page</router-link
              >
            </div>
          </div>
        </el-card>
      </el-col></el-row
    >
  </el-container>
</template>

<style>
@media (min-width: 1024px) {
  .events {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .pagination {
    display: flex;
    width: 290px;
  }
  .pagination a {
    flex: 1;
    text-decoration: none;
    /* color: var(--color-text); */
  }

  #page-prev {
    text-align: left;
  }

  #page-next {
    text-align: right;
  }
}
</style>
