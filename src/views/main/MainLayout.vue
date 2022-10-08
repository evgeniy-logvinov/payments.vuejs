<script lang="ts" setup>
import { computed } from 'vue'
import router from '../../router'
import { useUserStore } from '../../stores/user'

const isLoggedIn = computed(() => {
  const { isLoggedIn } = useUserStore()
  return isLoggedIn
})

const signOut = async () => {
  const { logOut } = useUserStore()
  await logOut()
  router.push({ name: 'SignIn' })
}
</script>

<template>
  <!-- <header>
    <div class="wrapper">
      <nav> -->
  <!-- <RouterLink :to="{ name: 'Main' }">Home</RouterLink> -->
  <!-- <template v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Payments' }">Payments</RouterLink>
          <RouterLink :to="{ name: 'Dashboard' }">Dashboard</RouterLink>
          <RouterLink :to="{ name: 'Events' }">Events</RouterLink>
          <RouterLink :to="{ name: 'Counter' }">Counter</RouterLink>
        </template> -->
  <!-- <template v-else>
          <RouterLink :to="{ name: 'About', query: { e: 'true' } }"
            >About</RouterLink
          >
          <RouterLink :to="{ name: 'SignIn' }">SignIn</RouterLink>
          <RouterLink :to="{ name: 'SignUp' }">SignUp</RouterLink>
        </template> -->
  <!-- </nav>
      <div class="my-4" v-if="isLoggedIn">
        <button @click.prevent="signOut" class="btn btn-primary">
          Log Out
        </button>
      </div>
    </div>
  </header> -->

  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 100vh;
}

/* header {
  width: 100%;
  line-height: 1.5;
  max-height: 100vh;
}

.content {
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
