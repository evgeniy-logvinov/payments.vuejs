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
  <el-container>
    <el-row class="w-full my-4"
      ><el-col :span="24">
        <el-card>
          <div v-if="isLoggedIn">
            <div class="card-header">Welcome, {{ userName }}</div>
            <div class="card-body"></div>
          </div>
          <div v-else class="alert alert-danger" role="alert">
            You are not logged in!
          </div>
        </el-card>
      </el-col></el-row
    >
  </el-container>
</template>
