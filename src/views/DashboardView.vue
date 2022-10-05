<script lang="ts" setup>
import { computed } from 'vue'
import { auth } from '../firebaseConfig'
import { useUserStore } from '../stores/user'
import router from '../router'

auth.onAuthStateChanged((user) => {
  const { fetchUser } = useUserStore()
  fetchUser(user)
})

const user = computed(() => {
  const { user } = useUserStore()
  return user
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
          <div v-if="user.loggedIn">
            <div class="card-header">Welcome, {{ user.data.displayName }}</div>
            <div class="card-body">
              <div class="alert alert-success" role="alert">
                You are logged in!
                <div class="my-4">
                  <button @click.prevent="signOut" class="btn btn-primary">
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="alert alert-danger" role="alert">
            You are not logged in!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
