// sensorData.ts

export interface SensorData {
  user_id: string;
  sensor_data: {
    type: 'glass' | 'plastic' | 'can';
    value: number; // 포화도 수치 (%)
  }[];
}

// 예시 더미 데이터 (user_id 하나만)
export const sensorData: SensorData[] = [
  {
    user_id: 'judy123',
    sensor_data: [
      { type: 'glass', value: 76 },
      { type: 'plastic', value: 42 },
      { type: 'can', value: 89 },
    ],
  },
  {
    user_id: 'hi567',
    sensor_data: [
      { type: 'glass', value: 60 },
      { type: 'plastic', value: 82 },
      { type: 'can', value: 55 },
    ],
  },
];
