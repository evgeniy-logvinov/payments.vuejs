export interface CardInfo {
  cardNumber: number | null
  until: {
    mm: number | null
    yy: number | null
  }
  cvv: number | null
}
