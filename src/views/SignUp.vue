<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUserStore } from '../stores/user'
import router from '../router'

// const name = ref('')
// const email = ref('')
// const password = ref('')
const error = ref<string | null>(null)
const form: {
  name: string
  email: string
  password: string
} = reactive({
  name: '',
  email: '',
  password: ''
})
async function onSignUp() {
  try {
    const { signUp } = useUserStore()
    await signUp({ ...form })
    router.push({ name: 'Dashboard' })
  } catch (err) {
    error.value = (err as Error).message
  }
}
</script>

<template>
  <el-container>
    <el-main>
      <el-scrollbar>
        <el-row>
          <el-col :span="7" :offset="8">
            <el-form :model="form" label-width="120px" @submit.prevent>
              <el-form-item label="User name">
                <el-input v-model="form.name" />
              </el-form-item>
              <el-form-item
                prop="email"
                label="Email"
                :rules="[
                  {
                    required: true,
                    message: 'Please input email address',
                    trigger: 'blur'
                  },
                  {
                    type: 'email',
                    message: 'Please input correct email address',
                    trigger: ['blur', 'change']
                  }
                ]"
              >
                <el-input v-model="form.email" />
              </el-form-item>
              <el-form-item label="Password" prop="pass">
                <el-input
                  v-model="form.password"
                  type="password"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSignUp">SignUp</el-button>
              </el-form-item>
              <el-form-item>
                Already registered?
                <el-button link @click="router.push({ name: 'SignIn' })"
                  >to SignIn</el-button
                >
              </el-form-item>
            </el-form></el-col
          ></el-row
        >
      </el-scrollbar>
    </el-main>
  </el-container>
</template>
<style scoped>
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
  nav {
    text-align: left;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
