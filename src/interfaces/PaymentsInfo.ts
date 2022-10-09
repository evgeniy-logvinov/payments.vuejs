import type { CardInfo } from './CardInfo'
// import type { TariffType } from './TariffType'

export interface PaymentsInfo {
  tariff?: null
  // newTariff: null | TariffType
  cardInfo?: null | CardInfo
}
