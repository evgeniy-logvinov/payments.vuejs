<script setup lang="ts">
import type { EventInfo } from '@/interfaces/EventInfo'
import EventService from '@/services/EventService.js'
import { onMounted, ref } from 'vue'

const props = defineProps<{ id: number | string }>()
const event = ref<EventInfo | null>()
onMounted(async () => {
  const response = await EventService.getEvent<EventInfo>(Number(props.id))
  event.value = response.data
})
</script>
<template>
  <el-container
    ><el-row class="w-full my-4"
      ><el-col>
        <el-card>
          <template #header>
            <div v-if="event">
              <el-space :size="100">
                <h1>{{ event.title }}</h1>
                <div id="nav">
                  <!-- Don't need ID here in params because it will get from parent -->
                  <router-link :to="{ name: 'EventDetails' }"
                    >Details</router-link
                  >
                  |
                  <router-link :to="{ name: 'EventRegister' }"
                    >Register</router-link
                  >
                  |
                  <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
                </div>
              </el-space>
            </div>
          </template>
          <div v-if="event">
            <router-view :event="event"></router-view></div
        ></el-card> </el-col></el-row
  ></el-container>
</template>
