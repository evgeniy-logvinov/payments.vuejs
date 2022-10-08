<script setup lang="ts">
import { reactive } from 'vue'
import ReviewInfo from '../../components/ReviewInfo.vue'
import ReviewCounter from '../../components/ReviewCounter.vue'
import type { ReviewItem } from '@/interfaces/ReviewItem'

const reviews = reactive<ReviewItem[]>([])
const props = defineProps<{ showExtra: boolean }>()

function reviewSubmitted(review: ReviewItem) {
  reviews.push(review)
}
</script>
<template>
  <div class="review">
    <h1>Show extra: {{ props.showExtra }}</h1>
    <div v-if="reviews.length">Reviews: {{ reviews }}</div>
    <ReviewInfo @review-submitted="reviewSubmitted"></ReviewInfo>
    <ReviewCounter :limit="20"></ReviewCounter>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .review {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>
