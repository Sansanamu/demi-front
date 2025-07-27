// reservationData.ts

export interface Reservation {
  user_id: string;
  collection_date: any;
  type_of_garbage: 'plastic' | 'glass' | 'can';
}

// 더미데이터, 데이터 연동 후 삭제 예정
export const reservationData: Reservation[] = [
  {
    user_id: 'judy123',
    collection_date: '2025-08-01T 10:10:00',
    type_of_garbage: 'glass',
  },
  {
    user_id: 'judy123',
    collection_date: '2025-08-03T 14:20:00',
    type_of_garbage: 'can',
  },
];
