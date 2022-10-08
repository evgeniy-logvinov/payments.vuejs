import { reactive } from 'vue'
import { defineStore } from 'pinia'
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  type User
} from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { computed } from 'vue'

interface UserInfo {
  loggedIn: boolean
  data: any
}

export const useUserStore = defineStore('user', () => {
  const user: UserInfo = reactive({
    loggedIn: false,
    data: null
  })

  async function signUp({
    email,
    password,
    name
  }: {
    email: string
    password: string
    name: string
  }) {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    if (response) {
      user.data = response
      // TODO: check
      // console.log(name)!!!!!
      // response.updateProfile({ displayName: name })
    } else {
      throw new Error('Unable to signup user')
    }
  }

  async function signIn({
    email,
    password
  }: {
    email: string
    password: string
  }) {
    const response = await signInWithEmailAndPassword(auth, email, password)
    if (response) {
      user.data = response
    } else {
      throw new Error('SignIn failed')
    }
  }

  async function logOut() {
    await signOut(auth)
    user.data = null
  }

  async function fetchUser(userInfo: User | null) {
    user.loggedIn = userInfo !== null
    if (userInfo) {
      user.data = {
        displayName: userInfo.displayName,
        email: userInfo.email
      }
    } else {
      user.data = null
    }
  }

  const isLoggedIn = computed(() => !!user.loggedIn)
  const userData = computed(() => user.data)
  return { user, userData, signIn, logOut, fetchUser, signUp, isLoggedIn }
})
