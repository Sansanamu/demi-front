// src/data/reservationData.ts

export type Reservation = {
  type: 'plastic' | 'glass' | 'can'
  date: string
  time: string
}

export const reservationData: Reservation[] = [
  {
    type: 'plastic',
    date: '8월 1일',
    time: '오후 8시',
  },
]
