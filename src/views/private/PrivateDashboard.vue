<script lang="ts" setup>
import { computed } from 'vue'
import { useUserStore } from '../../stores/user'
import router from '../../router'

const userName = computed(() => {
  const { userName } = useUserStore()
  return userName
})

const isLoggedIn = computed(() => {
  const { isLoggedIn } = useUserStore()
  return isLoggedIn
})

const signOut = async () => {
  const { logOut } = useUserStore()
  await logOut()
  router.push('/')
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div v-if="isLoggedIn">
            <div class="card-header">Welcome, {{ userName }}</div>
            <div class="card-body"></div>
          </div>
          <div v-else class="alert alert-danger" role="alert">
            You are not logged in!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
