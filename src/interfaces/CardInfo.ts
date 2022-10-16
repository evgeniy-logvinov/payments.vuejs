import type { TariffType } from './TariffType'

export interface CardInfo {
  tariff: TariffType
  cardNumber: number | null
  cardHolders: string | null
  until: {
    mm: number | null
    yy: number | null
  }
  cvv: number | null
}
