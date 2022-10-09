import { reactive } from 'vue'
import { defineStore } from 'pinia'
// import type { TariffType } from '@/interfaces/TariffType'
import type { PaymentsInfo } from '@/interfaces/PaymentsInfo'
import type { CardInfo } from '@/interfaces/CardInfo'

export const usePaymentsStore = defineStore('payments', () => {
  const payments: PaymentsInfo = reactive({
    // newTariff: null
  })

  async function buy() {
    // const response = await createUserWithEmailAndPassword(auth, email, password)
    // if (response) {
    //   user.data = response
    //   // TODO: check
    //   // console.log(name)!!!!!
    //   // response.updateProfile({ displayName: name })
    // } else {
    //   throw new Error('Unable to register user')
    // }
    return 'Success'
  }

  async function confirmPayment(cardInfo: CardInfo) {
    payments.cardInfo = cardInfo
    alert({ ...payments.cardInfo })
  }

  // function chooseType(type: TariffType) {
  //   payments.newTariff = type
  // }

  return { payments, buy, confirmPayment }
  // return { payments, buy, chooseType, confirmPayment }
})
