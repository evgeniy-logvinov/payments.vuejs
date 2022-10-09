<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUserStore } from '../stores/user'
import router from '../router'
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import { auth } from '../firebaseConfig'
// TODO: validation
// TODO: submit.prevent check
const email = ref('')
const password = ref('')
const error = ref<string | null>(null)

const form: {
  email: string
  password: string
} = reactive({
  email: '',
  password: ''
})
const signInWIthGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then((result) => {
      router.push({ name: 'Dashboard' })
    })
    .catch(() => console.log('error'))
}
async function onSignIn() {
  try {
    const { signIn } = useUserStore()
    await signIn({ ...form })
    router.push({ name: 'Dashboard' })
  } catch (err) {
    // TODO: error example on loading
    //     console.log(error)

    // this.$router.push({ name: '404Resource', params: { resource: 'event' } })

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
                <el-button type="primary" @click="onSignIn">SignIn</el-button>
                <el-button @click.prevent="signInWIthGoogle"
                  >SignIn with google</el-button
                >
              </el-form-item>
              <el-form-item>
                New to Fluenta?
                <el-button link @click="router.push({ name: 'SignUp' })"
                  >Create an account.</el-button
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
