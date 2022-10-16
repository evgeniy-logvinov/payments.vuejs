import { apiClient } from '@/http'
import type { CardInfo } from '@/interfaces/CardInfo'

export default {
  getPayments<T>() {
    return apiClient.get<T>('/payments')
  },
  getPaymentsInfo<T>() {
    return apiClient.get<T>('/payments/info')
  },
  setPaymentsInfo<T>(cardInfo: CardInfo) {
    return apiClient.post<T>('/payments/info', cardInfo)
  }
}
