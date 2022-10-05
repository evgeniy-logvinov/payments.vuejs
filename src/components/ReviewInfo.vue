<script setup lang="ts">
import type { AppInfo } from '@/interfaces/AppInfo'
import { reactive, ref } from 'vue'

const emit = defineEmits<{
  (
    event: 'review-submitted',
    {
      name,
      rating,
      review
    }: {
      name: string
      review: string
      rating: number | null
    }
  ): void
}>()
const color = ref('#C8A2C8')
const name = ref<string>('')
const review = ref<string>('')
const rating = ref<number | null>(null)
const appInfo: AppInfo = reactive({
  name: 'Counter',
  slogan: 'some slogan'
})

function onSubmit() {
  if (name.value === '' || review.value === '' || rating.value === null) {
    alert('Please fill info firstly')
    return
  }
  emit('review-submitted', {
    name: name.value,
    review: review.value,
    rating: rating.value
  })
}
</script>
<template>
  <div
    :style="{
      backgroundColor: color,
      verticalAlign: 'middle',
      textAlign: 'center',
      margin: 'auto',
      height: '100%',
      width: '100%'
    }"
  >
    <h2>{{ appInfo.name }}</h2>
    <h2>{{ appInfo.slogan }}</h2>
    <form class="review-form" @submit.prevent="onSubmit">
      <h3>Leave a review</h3>
      <label for="name">Name:</label>
      <input id="name" v-model="name" />

      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>

      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>

      <input class="button" type="submit" value="Submit" />
    </form>
  </div>
</template>

<style></style>
