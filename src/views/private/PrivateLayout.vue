<script setup lang="ts">
import { computed } from 'vue'
import router from '../../router'
import { useUserStore } from '../../stores/user'
import { auth } from '../../firebaseConfig'
import { useRoute } from 'vue-router'

auth.onAuthStateChanged(async (user) => {
  const { fetchUser } = useUserStore()
  await fetchUser(user)
})

const userName = computed(() => {
  const { userName } = useUserStore()
  return userName
})

const route = useRoute()

const defaultActive = computed(() => {
  if (route.path.match('payments')) {
    return '/private/payments'
  }
  return route.path
})

const signOut = async () => {
  const { logOut } = useUserStore()
  await logOut()
  router.push({ name: 'SignIn' })
}
</script>

<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="defaultActive"
          router
          class="el-menu-vertical-demo"
        >
          <el-menu-item
            index="/private/dashboard"
            :route="{ name: 'Dashboard' }"
          >
            <el-icon><service /></el-icon>
            <span>Dashboard</span>
          </el-menu-item>
          <el-menu-item index="/private/payments" :route="{ name: 'Payments' }">
            <el-icon><money /></el-icon>
            <span>Payments</span>
          </el-menu-item>
          <el-menu-item index="/private/events" :route="{ name: 'Events' }">
            <el-icon><document /></el-icon>
            <span>Events</span>
          </el-menu-item>
          <el-menu-item index="/private/counter" :route="{ name: 'Counter' }">
            <el-icon><brush /></el-icon>
            <span>Counter</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Sign out</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-space wrap size="large">
            <span>{{ userName }}</span>
          </el-space>
          <el-button @click="signOut">Sign Out</el-button>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <RouterView :key="$route.fullPath" />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
  <!-- <el-row class="w-full">
    <el-col :span="12">
      <h5 class="mb-2">Default colors</h5>
      <el-menu default-active="/private/" router class="el-menu-vertical-demo">
        <el-menu-item index="/private/" :route="{ name: 'Dashboard' }">
          <el-icon><service /></el-icon>
          <span>Dashboard</span>
        </el-menu-item>
        <el-menu-item index="/private/payments" :route="{ name: 'Payments' }">
          <el-icon><money /></el-icon>
          <span>Payments</span>
        </el-menu-item>
        <el-menu-item index="/private/events" :route="{ name: 'Events' }">
          <el-icon><document /></el-icon>
          <span>Events</span>
        </el-menu-item>
        <el-menu-item index="/private/counter" :route="{ name: 'Counter' }">
          <el-icon><brush /></el-icon>
          <span>Counter</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col> <RouterView /> </el-col>
  </el-row> -->
</template>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  border: 1px solid var(--el-card-border-color);
  /* background-color: var(--el-color-primary-light-7); */
  /* color: var(--el-text-color-primary); */
}
.layout-container-demo .el-aside {
  /* color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8); */
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
header {
  width: 100%;
  line-height: 1.5;
  max-height: 100vh;
}
.el-scrollbar {
  background-color: #545c64;
}
/*
.logo {
  display: block;
  margin: 0 auto 2rem;
} */

/* .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
