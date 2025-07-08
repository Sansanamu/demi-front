//더미데이터, 데이터 연동 후 삭제 예정

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
  {
    type: 'glass',
    date: '8월 2일',
    time: '오후 9시',
  },
]
