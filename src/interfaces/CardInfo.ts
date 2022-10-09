export interface CardInfo {
  cardNumber: number | null
  cardHolders: string | null
  until: {
    mm: number | null
    yy: number | null
  }
  cvv: number | null
}
