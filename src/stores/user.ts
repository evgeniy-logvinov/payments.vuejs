import { reactive } from 'vue'
import { defineStore } from 'pinia'
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
  // UserCredential
} from 'firebase/auth'
import { auth } from '../firebaseConfig'

interface UserInfo {
  loggedIn: boolean
  // data: UserCredential
  data: any
}

export const useUserStore = defineStore('user', () => {
  const user: UserInfo = reactive({
    loggedIn: false,
    data: null
  })

  async function register({ email, password, name }) {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    if (response) {
      user.data = response
      // TODO: check
      // console.log(name)!!!!!
      // response.updateProfile({ displayName: name })
    } else {
      throw new Error('Unable to register user')
    }
  }

  async function logIn({ email, password }) {
    const response = await signInWithEmailAndPassword(auth, email, password)
    if (response) {
      user.data = response
    } else {
      throw new Error('login failed')
    }
  }

  async function logOut() {
    await signOut(auth)
    user.data = null
  }

  async function fetchUser(userInfo) {
    console.log(user)
    user.loggedIn = user !== null
    if (user) {
      user.data = {
        displayName: userInfo.displayName,
        email: userInfo.email
      }
    } else {
      user.data = null
    }
  }
  // function increment() {
  //   count.value++
  // }

  // return { user, doubleCount, increment }
  return { user, logIn, logOut, fetchUser, register }
})
