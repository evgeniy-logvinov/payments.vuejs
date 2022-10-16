import { reactive } from 'vue'
import { defineStore } from 'pinia'
// import type { TariffType } from '@/interfaces/TariffType'
import type { PaymentsInfo } from '@/interfaces/PaymentsInfo'
import type { CardInfo } from '@/interfaces/CardInfo'
import PaymentsService from '@/services/PaymentsService'

export const usePaymentsStore = defineStore('payments', () => {
  const payments: PaymentsInfo = reactive({
    // newTariff: null
  })

  async function setPaymentsInfo() {
    const payments = await PaymentsService.getPayments()
    console.log('payments', payments)
    return 'Success'
  }

  async function getPaymentsInfo() {
    return 'Success'
  }

  async function confirmPayment(cardInfo: CardInfo) {
    payments.cardInfo = cardInfo
    try {
      await PaymentsService.setPaymentsInfo(cardInfo)
      alert('tariff saved')
    } catch (err) {
      console.log('err')
    }
  }

  return { payments, setPaymentsInfo, confirmPayment, getPaymentsInfo }
})
