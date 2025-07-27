'use client';

import { useEffect, useState } from 'react';

import SaturationCard from '@/components/SaturationCard';
import EmptyReservationCard from '@/components/EmptyReservationCard';
import EcoBanner from '@/components/EcoBanner';
import { reservationData as allReservationData } from '@/data/reservationData';
import { sensorData as allSensorData } from '@/data/sensorData';
import ReservationList from '@/components/ReservationList';
import BackgroundLayout from '@/components/layout/BackgroundLayout';
import MonthlyReservationCount from '@/components/MonthlyReservationCount';

export default function Dashboard() {
  const user_id = 'judy123';

  const [userReservations, setUserReservations] = useState<any[]>([]);
  const [sensorValue, setSensorValue] = useState<
    { type: 'glass' | 'plastic' | 'can'; value: number }[] | null
  >(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      // 예약 정보 필터
      const filteredReservations = allReservationData.filter(res => res.user_id === user_id);
      setUserReservations(filteredReservations);

      // 센서 데이터 필터
      const sensor = allSensorData.find(data => data.user_id === user_id);
      setSensorValue(sensor ? sensor.sensor_data : null);
    } catch (err) {
      console.error('데이터 로딩 실패:', err);
      setError(true);
    }
  }, []);

  const reservationCount = userReservations.length;

  // 각 포화도 추출
  const glassValue = sensorValue?.find(item => item.type === 'glass')?.value ?? null;
  const plasticValue = sensorValue?.find(item => item.type === 'plastic')?.value ?? null;
  const canValue = sensorValue?.find(item => item.type === 'can')?.value ?? null;

  return (
    <BackgroundLayout>
      {/* 최상단 고정 카드 */}
      <MonthlyReservationCount user_id={user_id} count={reservationCount} />

      <main className="flex-grow px-4 pb-20">
        {/* 포화도 카드 */}
        <div className="w-full flex justify-between gap-2 mb-6">
          <SaturationCard type="glass" value={glassValue ?? 0} />
          <SaturationCard type="plastic" value={plasticValue ?? 0} />
          <SaturationCard type="can" value={canValue ?? 0} />

        </div>

        {/* 섹션 제목 */}
        <div className="flex items-center justify-center gap-4 mb-2 h-[50px] pb-10">
          <div className="flex-grow h-px bg-primary" />
          <p className="text-sm font-semibold text-primary">포화도</p>
          <div className="flex-grow h-px bg-primary" />
        </div>

        {/* 예약 정보 카드 */}
        <div className="w-full mb-6">
          {error ? (
            <EmptyReservationCard />
          ) : userReservations.length === 0 ? (
            <EmptyReservationCard />
          ) : (
            <ReservationList data={userReservations} />
          )}
        </div>

        {/* 에코 배너 */}
        <div className="w-full">
          <EcoBanner />
        </div>
      </main>
    </BackgroundLayout>
  );
}
